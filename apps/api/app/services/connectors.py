import json
from pathlib import Path

from app.schemas import (
    ConnectorApprovalApiCopy,
    ConnectorCapability,
    ConnectorNetworkSmokeGate,
    SourceConnector,
    SourceConnectorsResponse,
)


SHARED_FNS_CONNECTOR_GATE_PATH = (
    Path(__file__).resolve().parents[4] / "packages/shared/fns-connector-gate.json"
)


def get_source_connectors() -> SourceConnectorsResponse:
    fns_network_gate = _load_fns_network_gate()
    return SourceConnectorsResponse(
        version="0.1.0",
        source_policy="Primary-source connectors only; no aggregator as source of truth",
        connectors=[
            SourceConnector(
                connector_id="eis-zakupki-gov-ru",
                source_kind="eis",
                display_name="EIS / zakupki.gov.ru",
                status="stub",
                mode="contract_only",
                network_enabled=False,
                official_base_url="https://zakupki.gov.ru/",
                schedule="every 15 minutes after credentials and limits are approved",
                laws=["44-FZ", "223-FZ"],
                supported_objects=[
                    "purchase notices",
                    "lots",
                    "procurement documents",
                    "protocols",
                    "contract registry entries",
                    "organization registry entries",
                ],
                raw_storage_template="raw/eis/{external_id}/{artifact_id}",
                required_secrets=[
                    "EIS_API_BASE_URL",
                    "EIS_API_TOKEN",
                ],
                capabilities=[
                    ConnectorCapability(
                        name="fetch_index",
                        description="Collect changed purchase identifiers for a time window.",
                        evidence_fields=["source_url", "external_id", "fetched_at"],
                    ),
                    ConnectorCapability(
                        name="fetch_entity",
                        description="Fetch a purchase card or registry entity by official identifier.",
                        evidence_fields=["raw_artifact_id", "checksum_sha256", "source_url"],
                    ),
                    ConnectorCapability(
                        name="fetch_documents",
                        description="Fetch original procurement files and keep immutable raw artifacts.",
                        evidence_fields=["storage_path", "checksum_sha256", "content_type"],
                    ),
                    ConnectorCapability(
                        name="normalize",
                        description="Map raw EIS payloads into ASTS tender, document and organization records.",
                        evidence_fields=["normalization_version", "freshness", "manual_review_reason"],
                    ),
                ],
                network_smoke_gate=ConnectorNetworkSmokeGate(
                    status="contract_only",
                    ci_policy="CI validates connector contract shape until access terms and secrets are approved.",
                    owner="Data",
                    required_approvals=[
                        "approved official EIS access terms",
                        "approved request volume limits",
                        "GitHub secrets are present in protected environment",
                        "safe test EIS procedure is recorded",
                        "raw artifact checksum and freshness receipt are asserted",
                    ],
                    safe_test_pair_required=True,
                    approval_api_copy=ConnectorApprovalApiCopy(
                        route="/v1/sources/connectors",
                        status="contract_only",
                        owner="Data",
                        request_copy="Request Data owner approval before enabling real EIS network smoke.",
                        blocked_copy="Do not enable EIS real-network smoke until all five approvals are recorded.",
                        next_action="Create protected environment secrets and record safe test zakupki.gov.ru procedure after Data approval.",
                        no_merge_copy="Не мержить real-network EIS smoke, пока approval_api_copy подтверждает Data owner, protected secrets, safe EIS procedure, rate limits и checksum freshness receipt.",
                    ),
                ),
                blocked_by=[
                    "confirm official access terms",
                    "add GitHub secrets for approved credentials",
                    "add rate-limit and schema-drift tests",
                ],
            ),
            SourceConnector(
                connector_id="fns-egrul-nalog-ru",
                source_kind="fns",
                display_name="FNS / EGRUL",
                status="stub",
                mode="contract_only",
                network_enabled=False,
                official_base_url="https://egrul.nalog.ru/",
                schedule="on organization profile change and before supplier/customer risk decisions",
                laws=["129-FZ", "152-FZ"],
                supported_objects=[
                    "legal entity profile by INN",
                    "legal entity profile by OGRN",
                    "EGRUL extract",
                    "company status",
                    "registration and liquidation markers",
                    "director and address risk evidence",
                ],
                raw_storage_template="raw/fns/{inn}/{artifact_id}",
                required_secrets=[
                    "FNS_API_BASE_URL",
                    "FNS_API_TOKEN",
                ],
                capabilities=[
                    ConnectorCapability(
                        name="fetch_by_inn",
                        description="Fetch official company profile and EGRUL metadata by taxpayer identifier.",
                        evidence_fields=["inn", "source_url", "fetched_at"],
                    ),
                    ConnectorCapability(
                        name="fetch_by_ogrn",
                        description="Fetch official company profile by state registration number.",
                        evidence_fields=["ogrn", "source_url", "fetched_at"],
                    ),
                    ConnectorCapability(
                        name="fetch_extract",
                        description="Store original EGRUL extract payload or file as immutable raw evidence.",
                        evidence_fields=["raw_artifact_id", "checksum_sha256", "content_type"],
                    ),
                    ConnectorCapability(
                        name="normalize",
                        description="Map raw FNS payloads into ASTS organization, counterparty and risk records.",
                        evidence_fields=["normalization_version", "freshness", "manual_review_reason"],
                    ),
                ],
                network_smoke_gate=ConnectorNetworkSmokeGate(
                    status=fns_network_gate["status"],
                    ci_policy=fns_network_gate["ci_policy"],
                    owner=fns_network_gate["owner"],
                    required_approvals=fns_network_gate["required_approvals"],
                    safe_test_pair_required=fns_network_gate["safe_test_pair_required"],
                    approval_api_copy=ConnectorApprovalApiCopy(**fns_network_gate["approval_api_copy"]),
                ),
                blocked_by=[
                    "confirm official FNS access terms and allowed request volume",
                    "add GitHub secrets for approved FNS credentials",
                    "add INN/OGRN validation and freshness tests",
                ],
            )
        ],
    )


def _load_fns_network_gate() -> dict:
    with SHARED_FNS_CONNECTOR_GATE_PATH.open(encoding="utf-8") as fixture_file:
        return json.load(fixture_file)
