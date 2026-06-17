import json
from pathlib import Path

from app.demo_data import DEMO_DATA, TENDER_SOURCES
from app.schemas import (
    AiReviewQueueItem,
    AiReviewQueueResponse,
    AiReviewQueueSummary,
    AiReviewReceiptWriteContract,
)

SHARED_AI_REVIEW_QUEUE_PATH = (
    Path(__file__).resolve().parents[4] / "packages/shared/ai-review-queue.json"
)


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
    confidence_threshold: float,
    blocked_below_confidence: float,
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
    status = "blocked" if confidence < blocked_below_confidence else "review_required"

    return AiReviewQueueItem(
        id=f"ai-review-{fact_type}-{tender_id}",
        tender_id=tender_id,
        document_id=document_id,
        fact_type=fact_type,
        title=title,
        extracted_value=extracted_value,
        confidence=confidence,
        threshold=confidence_threshold,
        status=status,
        owner_role=owner_role,
        source=source,
        evidence_ref=source["raw_artifact_id"],
        required_action=required_action,
        reason=reason,
    )


def get_ai_review_queue() -> AiReviewQueueResponse:
    fixture = _load_fixture()
    confidence_threshold = fixture["confidence_threshold"]
    blocked_below_confidence = fixture["blocked_below_confidence"]
    queue = [
        _review_item(
            confidence_threshold=confidence_threshold,
            blocked_below_confidence=blocked_below_confidence,
            tender_id=item["tender_id"],
            document_id=item["document_id"],
            fact_type=item["fact_type"],
            title=item["title"],
            extracted_value=item["extracted_value"],
            confidence=item["confidence"],
            owner_role=item["owner_role"],
            required_action=item["required_action"],
            reason=item["reason"],
        )
        for item in fixture["queue"]
    ]

    return AiReviewQueueResponse(
        version=fixture["version"],
        rule=fixture["rule"],
        confidence_threshold=confidence_threshold,
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
        write_contract=AiReviewReceiptWriteContract(**fixture["write_contract"]),
        queue=queue,
    )


def _load_fixture() -> dict:
    with SHARED_AI_REVIEW_QUEUE_PATH.open(encoding="utf-8") as fixture_file:
        return json.load(fixture_file)
