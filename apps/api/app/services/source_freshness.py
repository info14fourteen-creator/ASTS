from app.demo_data import DEMO_DATA
from app.schemas import SourceFreshnessQueueItem, SourceFreshnessResponse, SourceFreshnessSummary
from app.services.source_health import SOURCE_LABELS


def _tender_by_id(tender_id: str) -> dict:
    return next(tender for tender in DEMO_DATA["tenders"] if tender["tender_id"] == tender_id)


def _queue_item(
    tender_id: str,
    *,
    breach_type: str,
    detected_at: str,
    last_success_at: str | None,
    sla_minutes: int,
    age_minutes: int | None,
    required_action: str,
    reason: str,
) -> SourceFreshnessQueueItem:
    tender = _tender_by_id(tender_id)
    source = tender["source"]
    source_kind = source["source_kind"]

    return SourceFreshnessQueueItem(
        id=f"freshness-{breach_type}-{source['raw_artifact_id']}",
        tender_id=tender["tender_id"],
        source_kind=source_kind,
        display_name=SOURCE_LABELS.get(source_kind, source_kind),
        source_url=source["source_url"],
        raw_artifact_id=source["raw_artifact_id"],
        breach_type=breach_type,
        detected_at=detected_at,
        last_success_at=last_success_at,
        sla_minutes=sla_minutes,
        age_minutes=age_minutes,
        owner_role=tender["outcome"]["owner_role"],
        ai_gate="blocked",
        required_action=required_action,
        reason=reason,
    )


def get_source_freshness() -> SourceFreshnessResponse:
    queue = [
        _queue_item(
            "322119845710000001",
            breach_type="stale",
            detected_at="2026-06-16T08:25:00+05:00",
            last_success_at="2026-06-16T07:45:00+05:00",
            sla_minutes=15,
            age_minutes=40,
            required_action="refresh primary-source payload before AI scoring",
            reason="EIS card is older than the 15 minute tender intake SLA.",
        ),
        _queue_item(
            "0373100042626000001",
            breach_type="missing",
            detected_at="2026-06-16T08:28:00+05:00",
            last_success_at=None,
            sla_minutes=15,
            age_minutes=None,
            required_action="fetch and store the missing procurement document raw artifact",
            reason="Tender card exists, but the original specification file is not in raw storage.",
        ),
        _queue_item(
            "0173200001426000044",
            breach_type="parse_failed",
            detected_at="2026-06-16T08:31:00+05:00",
            last_success_at="2026-06-16T08:15:00+05:00",
            sla_minutes=15,
            age_minutes=16,
            required_action="send the payload to manual schema review and keep AI blocked",
            reason="Primary source is reachable, but normalizer version cannot parse the changed EIS schema.",
        ),
        _queue_item(
            "exec-2026-0007",
            breach_type="hash_mismatch",
            detected_at="2026-06-16T08:33:00+05:00",
            last_success_at="2026-06-16T08:20:00+05:00",
            sla_minutes=15,
            age_minutes=13,
            required_action="quarantine artifact and refetch from official ETP API",
            reason="Stored artifact checksum does not match the source evidence checksum.",
        ),
    ]
    counts = {
        breach_type: sum(1 for item in queue if item.breach_type == breach_type)
        for breach_type in ("stale", "missing", "parse_failed", "hash_mismatch")
    }

    return SourceFreshnessResponse(
        version="0.1.0",
        source_policy="Primary-source freshness breaches block AI until raw evidence is restored.",
        sla="Tender intake evidence must be fresh, stored and checksum-verified before AI decisions.",
        summary=SourceFreshnessSummary(
            total=len(queue),
            ai_blocked=sum(1 for item in queue if item.ai_gate == "blocked"),
            **counts,
        ),
        queue=queue,
    )
