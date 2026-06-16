from app.schemas import IngestionPolicyResponse, IngestionRetryStep


def get_ingestion_policy() -> IngestionPolicyResponse:
    return IngestionPolicyResponse(
        source_policy="primary sources only; aggregators cannot become source of truth",
        raw_storage="raw/{source_kind}/{external_id}/{artifact_id}",
        evidence_required=True,
        retry_steps=[
            IngestionRetryStep(attempt=1, delay_seconds=60, action="retry"),
            IngestionRetryStep(attempt=2, delay_seconds=300, action="retry"),
            IngestionRetryStep(attempt=3, delay_seconds=900, action="quarantine"),
        ],
        quarantine_reasons=[
            "source_unavailable",
            "rate_limited",
            "checksum_mismatch",
            "schema_mismatch",
            "manual_review_required",
        ],
    )
