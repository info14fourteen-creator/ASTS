from __future__ import annotations

import sys
from pathlib import Path


APP_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(APP_ROOT))


def main() -> int:
    try:
        from fastapi.testclient import TestClient

        from app.main import app
    except ModuleNotFoundError as error:
        print(f"SKIP /v1/sources/connectors smoke: missing dependency {error.name}")
        return 0

    client = TestClient(app)

    response = client.get("/v1/sources/connectors")
    if response.status_code != 200:
        print(f"FAIL /v1/sources/connectors HTTP {response.status_code}")
        return 1

    payload = response.json()
    connectors = payload.get("connectors", [])
    if not connectors:
        print("FAIL /v1/sources/connectors returned no connectors")
        return 1

    eis = next(
        (connector for connector in connectors if connector.get("connector_id") == "eis-zakupki-gov-ru"),
        None,
    )
    if eis is None:
        print("FAIL EIS connector not found")
        return 1

    expected = {
        "source_kind": "eis",
        "mode": "contract_only",
        "network_enabled": False,
        "raw_storage_template": "raw/eis/{external_id}/{artifact_id}",
    }
    for field, value in expected.items():
        if eis.get(field) != value:
            print(f"FAIL EIS connector {field}: expected {value!r}, got {eis.get(field)!r}")
            return 1

    required_secrets = set(eis.get("required_secrets", []))
    if not {"EIS_API_BASE_URL", "EIS_API_TOKEN"}.issubset(required_secrets):
        print("FAIL EIS connector required secrets are incomplete")
        return 1

    capability_names = {capability.get("name") for capability in eis.get("capabilities", [])}
    if not {"fetch_index", "fetch_entity", "fetch_documents", "normalize"}.issubset(
        capability_names
    ):
        print("FAIL EIS connector capabilities are incomplete")
        return 1

    fns = next(
        (connector for connector in connectors if connector.get("connector_id") == "fns-egrul-nalog-ru"),
        None,
    )
    if fns is None:
        print("FAIL FNS connector not found")
        return 1

    expected_fns = {
        "source_kind": "fns",
        "mode": "contract_only",
        "network_enabled": False,
        "raw_storage_template": "raw/fns/{inn}/{artifact_id}",
    }
    for field, value in expected_fns.items():
        if fns.get(field) != value:
            print(f"FAIL FNS connector {field}: expected {value!r}, got {fns.get(field)!r}")
            return 1

    fns_required_secrets = set(fns.get("required_secrets", []))
    if not {"FNS_API_BASE_URL", "FNS_API_TOKEN"}.issubset(fns_required_secrets):
        print("FAIL FNS connector required secrets are incomplete")
        return 1

    fns_supported_objects = set(fns.get("supported_objects", []))
    if not {"legal entity profile by INN", "EGRUL extract", "company status"}.issubset(fns_supported_objects):
        print("FAIL FNS connector supported objects are incomplete")
        return 1

    fns_capability_names = {capability.get("name") for capability in fns.get("capabilities", [])}
    if not {"fetch_by_inn", "fetch_by_ogrn", "fetch_extract", "normalize"}.issubset(fns_capability_names):
        print("FAIL FNS connector capabilities are incomplete")
        return 1

    health_response = client.get("/v1/sources/health")
    if health_response.status_code != 200:
        print(f"FAIL /v1/sources/health HTTP {health_response.status_code}")
        return 1

    health_payload = health_response.json()
    health_states = health_payload.get("states", [])
    statuses = {state.get("status") for state in health_states}
    if statuses != {"ready", "quarantine", "unavailable"}:
        got_statuses = sorted(str(status) for status in statuses)
        print(f"FAIL /v1/sources/health statuses: expected ready/quarantine/unavailable, got {got_statuses}")
        return 1

    summary = health_payload.get("summary", {})
    expected_counts = {"total": 3, "ready": 1, "quarantine": 1, "unavailable": 1}
    for field, value in expected_counts.items():
        if summary.get(field) != value:
            print(f"FAIL /v1/sources/health summary {field}: expected {value!r}, got {summary.get(field)!r}")
            return 1

    ready_state = next((state for state in health_states if state.get("status") == "ready"), {})
    blocked_states = [state for state in health_states if state.get("status") in {"quarantine", "unavailable"}]
    if ready_state.get("ai_gate") != "allowed":
        print("FAIL /v1/sources/health ready state must allow AI gate")
        return 1

    if any(state.get("ai_gate") != "blocked" for state in blocked_states):
        print("FAIL /v1/sources/health quarantine/unavailable states must block AI gate")
        return 1

    freshness_response = client.get("/v1/sources/freshness")
    if freshness_response.status_code != 200:
        print(f"FAIL /v1/sources/freshness HTTP {freshness_response.status_code}")
        return 1

    freshness_payload = freshness_response.json()
    freshness_queue = freshness_payload.get("queue", [])
    breach_types = {item.get("breach_type") for item in freshness_queue}
    expected_breaches = {"stale", "missing", "parse_failed", "hash_mismatch"}
    if breach_types != expected_breaches:
        got_breaches = sorted(str(breach_type) for breach_type in breach_types)
        print(f"FAIL /v1/sources/freshness breach types: expected all four, got {got_breaches}")
        return 1

    freshness_summary = freshness_payload.get("summary", {})
    expected_freshness_counts = {
        "total": 4,
        "stale": 1,
        "missing": 1,
        "parse_failed": 1,
        "hash_mismatch": 1,
        "ai_blocked": 4,
    }
    for field, value in expected_freshness_counts.items():
        if freshness_summary.get(field) != value:
            print(
                f"FAIL /v1/sources/freshness summary {field}: "
                f"expected {value!r}, got {freshness_summary.get(field)!r}"
            )
            return 1

    if any(item.get("ai_gate") != "blocked" for item in freshness_queue):
        print("FAIL /v1/sources/freshness all breach rows must block AI gate")
        return 1

    if any(not item.get("source_url") or not item.get("raw_artifact_id") for item in freshness_queue):
        print("FAIL /v1/sources/freshness rows must keep source_url and raw_artifact_id")
        return 1

    ai_review_response = client.get("/v1/ai/review-queue")
    if ai_review_response.status_code != 200:
        print(f"FAIL /v1/ai/review-queue HTTP {ai_review_response.status_code}")
        return 1

    ai_review_payload = ai_review_response.json()
    ai_review_queue = ai_review_payload.get("queue", [])
    ai_review_summary = ai_review_payload.get("summary", {})
    expected_ai_review_counts = {
        "total": 3,
        "review_required": 1,
        "blocked": 2,
        "low_confidence": 3,
        "source_evidence_present": 3,
    }
    for field, value in expected_ai_review_counts.items():
        if ai_review_summary.get(field) != value:
            print(
                f"FAIL /v1/ai/review-queue summary {field}: "
                f"expected {value!r}, got {ai_review_summary.get(field)!r}"
            )
            return 1

    fact_types = {item.get("fact_type") for item in ai_review_queue}
    if fact_types != {"requirement", "supplier_quote", "economics"}:
        got_fact_types = sorted(str(fact_type) for fact_type in fact_types)
        print(f"FAIL /v1/ai/review-queue fact types: expected requirement/supplier_quote/economics, got {got_fact_types}")
        return 1

    if any(item.get("confidence", 1) >= item.get("threshold", 0) for item in ai_review_queue):
        print("FAIL /v1/ai/review-queue rows must be below confidence threshold")
        return 1

    if any(not item.get("owner_role") or not item.get("evidence_ref") for item in ai_review_queue):
        print("FAIL /v1/ai/review-queue rows must keep owner_role and evidence_ref")
        return 1

    for item in ai_review_queue:
        source = item.get("source", {})
        if not source.get("source_url") or not source.get("raw_artifact_id") or not source.get("checksum_sha256"):
            print("FAIL /v1/ai/review-queue rows must embed source evidence")
            return 1

    handoff_response = client.get("/v1/handoff/owner-approval")
    if handoff_response.status_code != 200:
        print(f"FAIL /v1/handoff/owner-approval HTTP {handoff_response.status_code}")
        return 1

    handoff_payload = handoff_response.json()
    handoff_summary = handoff_payload.get("summary", {})
    expected_handoff_counts = {
        "approved": 1,
        "with_receipt": 1,
        "without_receipt": 0,
        "execution_ready": 1,
        "blocked": 3,
    }
    for field, value in expected_handoff_counts.items():
        if handoff_summary.get(field) != value:
            print(
                f"FAIL /v1/handoff/owner-approval summary {field}: "
                f"expected {value!r}, got {handoff_summary.get(field)!r}"
            )
            return 1

    if handoff_summary.get("status") != "ready":
        print("FAIL /v1/handoff/owner-approval summary status must be ready")
        return 1

    handoff_rows = handoff_payload.get("rows", [])
    approved_ready = next((row for row in handoff_rows if row.get("outcome") == "approved"), {})
    if approved_ready.get("status") != "unlocked" or approved_ready.get("receipt") != "present":
        print("FAIL /v1/handoff/owner-approval approved row must be unlocked with present receipt")
        return 1

    if approved_ready.get("source_evidence_present") is not True:
        print("FAIL /v1/handoff/owner-approval approved row must carry source evidence")
        return 1

    blocked_rows = [row for row in handoff_rows if row.get("status") == "locked"]
    if len(blocked_rows) != 3 or any(row.get("receipt") != "missing" for row in blocked_rows):
        print("FAIL /v1/handoff/owner-approval locked rows must have missing receipts")
        return 1

    print("PASS source connector, health, freshness, AI review and owner handoff contracts")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
