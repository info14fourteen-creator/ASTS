from app.demo_data import DEMO_DATA, TENDER_SOURCES
from app.schemas import AiReviewQueueItem, AiReviewQueueResponse, AiReviewQueueSummary

CONFIDENCE_THRESHOLD = 0.85


def _tender_by_id(tender_id: str) -> dict:
    return next(tender for tender in DEMO_DATA["tenders"] if tender["tender_id"] == tender_id)


def _document_by_id(document_id: str) -> dict:
    return next(document for document in DEMO_DATA["documents"] if document["document_id"] == document_id)


def _document_source(document: dict) -> dict:
    if "source" in document:
        return document["source"]
    return TENDER_SOURCES[document["source_ref"]]


def _review_item(
    *,
    tender_id: str,
    document_id: str | None,
    fact_type: str,
    title: str,
    extracted_value: str,
    confidence: float,
    owner_role: str,
    required_action: str,
    reason: str,
) -> AiReviewQueueItem:
    source = _document_source(_document_by_id(document_id)) if document_id else _tender_by_id(tender_id)["source"]
    status = "blocked" if confidence < 0.75 else "review_required"

    return AiReviewQueueItem(
        id=f"ai-review-{fact_type}-{tender_id}",
        tender_id=tender_id,
        document_id=document_id,
        fact_type=fact_type,
        title=title,
        extracted_value=extracted_value,
        confidence=confidence,
        threshold=CONFIDENCE_THRESHOLD,
        status=status,
        owner_role=owner_role,
        source=source,
        evidence_ref=source["raw_artifact_id"],
        required_action=required_action,
        reason=reason,
    )


def get_ai_review_queue() -> AiReviewQueueResponse:
    queue = [
        _review_item(
            tender_id="0373100042626000001",
            document_id="doc-0373100042626000001-tz",
            fact_type="requirement",
            title="Требование к поставке серверов",
            extracted_value="2 позиции требуют ручной проверки аналогов",
            confidence=0.82,
            owner_role="tender_manager",
            required_action="confirm requirement interpretation before supplier request",
            reason="Confidence is below automatic threshold and affects pre-win qualification.",
        ),
        _review_item(
            tender_id="322119845710000001",
            document_id=None,
            fact_type="supplier_quote",
            title="Логистика поставщика по двум регионам",
            extracted_value="нет подтверждения логистики ЦФО",
            confidence=0.64,
            owner_role="supplier_manager",
            required_action="request supplier clarification and keep economics blocked",
            reason="Supplier quote has missing logistics evidence, so AI cannot calculate margin safely.",
        ),
        _review_item(
            tender_id="0173200001426000044",
            document_id=None,
            fact_type="economics",
            title="Маржинальность после обеспечения",
            extracted_value="плановая маржа ниже внутреннего порога",
            confidence=0.74,
            owner_role="finance_owner",
            required_action="finance owner must approve or keep outcome locked",
            reason="Low-confidence economics already blocks submission until owner review.",
        ),
    ]

    return AiReviewQueueResponse(
        version="0.1.0",
        rule="Low-confidence AI facts require source evidence and owner review before workflow decisions.",
        confidence_threshold=CONFIDENCE_THRESHOLD,
        summary=AiReviewQueueSummary(
            total=len(queue),
            review_required=sum(1 for item in queue if item.status == "review_required"),
            blocked=sum(1 for item in queue if item.status == "blocked"),
            low_confidence=sum(1 for item in queue if item.confidence < item.threshold),
            source_evidence_present=sum(
                1
                for item in queue
                if item.source.source_url and item.source.raw_artifact_id and item.source.checksum_sha256
            ),
        ),
        queue=queue,
    )
