import json
from pathlib import Path

from app.schemas import (
    SourceOwnerReceiptHistoryItem,
    SourceOwnerReceiptRule,
    SourceOwnerReceiptsResponse,
    SourceOwnerReceiptSummary,
)

SHARED_OWNER_RECEIPTS_PATH = (
    Path(__file__).resolve().parents[4] / "packages/shared/source-owner-receipts.json"
)


def get_source_owner_receipts() -> SourceOwnerReceiptsResponse:
    fixture = _load_fixture()
    receipt_required_fields = fixture["receipt_required_fields"]
    rules = [
        SourceOwnerReceiptRule(
            breach_type=rule["breach_type"],
            owner_role=rule["owner_role"],
            action=rule["action"],
            allowed_resolution_statuses=rule["allowed_resolution_statuses"],
            required_fields=receipt_required_fields + rule["required_fields_extra"],
            ai_gate_unlock_condition=rule["ai_gate_unlock_condition"],
            evidence_rule=rule["evidence_rule"],
        )
        for rule in fixture["rules"]
    ]
    history = [
        SourceOwnerReceiptHistoryItem(
            id=receipt["id"],
            breach_type=receipt["breach_type"],
            owner_role=receipt["owner_role"],
            action=receipt["action"],
            resolution_status=receipt["resolution_status"],
            raw_artifact_id=receipt["raw_artifact_id"],
            checksum_sha256=receipt["checksum_sha256"],
            ai_gate=receipt["ai_gate"],
            audit_note=receipt["audit_note"],
        )
        for receipt in fixture["history"]
    ]

    return SourceOwnerReceiptsResponse(
        version=fixture["version"],
        rule=fixture["rule"],
        receipt_required_fields=receipt_required_fields,
        summary=SourceOwnerReceiptSummary(
            total=len(rules),
            restored_required=len(rules),
            blocked_until_receipt=len(rules),
            history_total=len(history),
            history_blocked_until_restored=sum(
                1 for receipt in history if receipt.ai_gate == "blocked_until_restored"
            ),
        ),
        rules=rules,
        history=history,
    )


def _load_fixture() -> dict:
    with SHARED_OWNER_RECEIPTS_PATH.open(encoding="utf-8") as fixture_file:
        return json.load(fixture_file)
