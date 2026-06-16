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

    print("PASS source connector, health and owner handoff contracts")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
