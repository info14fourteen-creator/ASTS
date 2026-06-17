from app.schemas import SourceOwnerReceiptRule, SourceOwnerReceiptsResponse, SourceOwnerReceiptSummary


RECEIPT_REQUIRED_FIELDS = [
    "breach_id",
    "owner_id",
    "owner_role",
    "action",
    "resolution_status",
    "resolved_at",
    "new_raw_artifact_id",
    "new_checksum_sha256",
    "audit_note",
]


def get_source_owner_receipts() -> SourceOwnerReceiptsResponse:
    rules = [
        SourceOwnerReceiptRule(
            breach_type="stale",
            owner_role="supplier_manager",
            action="refresh_primary_payload",
            allowed_resolution_statuses=["restored", "accepted_with_note", "still_blocked"],
            required_fields=RECEIPT_REQUIRED_FIELDS + ["last_success_at"],
            ai_gate_unlock_condition='resolution_status="restored" and new raw artifact is inside SLA',
            evidence_rule="newer official payload with checksum and last_success_at inside freshness SLA",
        ),
        SourceOwnerReceiptRule(
            breach_type="missing",
            owner_role="document_owner",
            action="fetch_missing_artifact",
            allowed_resolution_statuses=["restored", "accepted_with_note", "still_blocked"],
            required_fields=RECEIPT_REQUIRED_FIELDS + ["source_absence_note"],
            ai_gate_unlock_condition='resolution_status="restored" and missing artifact is stored or officially absent',
            evidence_rule="missing raw artifact or official source response proving the artifact is not published",
        ),
        SourceOwnerReceiptRule(
            breach_type="parse_failed",
            owner_role="data_steward",
            action="manual_schema_review",
            allowed_resolution_statuses=["restored", "accepted_with_note", "still_blocked"],
            required_fields=RECEIPT_REQUIRED_FIELDS + ["normalization_version"],
            ai_gate_unlock_condition='resolution_status="restored" and normalized payload version is linked',
            evidence_rule="normalized payload version plus unchanged quarantined raw payload",
        ),
        SourceOwnerReceiptRule(
            breach_type="hash_mismatch",
            owner_role="security_owner",
            action="refetch_and_compare",
            allowed_resolution_statuses=["restored", "accepted_with_note", "still_blocked"],
            required_fields=RECEIPT_REQUIRED_FIELDS + ["quarantine_note"],
            ai_gate_unlock_condition='resolution_status="restored" and checksum comparison matches official refetch',
            evidence_rule="fresh official refetch, checksum comparison and quarantine note for mismatched artifact",
        ),
    ]

    return SourceOwnerReceiptsResponse(
        version="0.1.0",
        rule="Source freshness blockers are cleared only by explicit owner receipts.",
        receipt_required_fields=RECEIPT_REQUIRED_FIELDS,
        summary=SourceOwnerReceiptSummary(
            total=len(rules),
            restored_required=len(rules),
            blocked_until_receipt=len(rules),
        ),
        rules=rules,
    )
