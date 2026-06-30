from urllib.parse import urlparse

from app.demo_data import DEMO_DATA
from app.schemas import SourceHealthResponse, SourceHealthState, SourceHealthSummary

SOURCE_LABELS = {
    "eis": "EIS / zakupki.gov.ru API",
    "etp": "Official ETP API",
    "fns": "FNS API",
    "gis_torgi": "GIS Torgi API",
    "fedresurs": "Fedresurs API",
    "file_vault": "File vault API",
}


def _tender_by_id(tender_id: str) -> dict:
    return next(tender for tender in DEMO_DATA["tenders"] if tender["tender_id"] == tender_id)


def _host_from_url(source_url: str) -> str:
    return urlparse(source_url).netloc or source_url


def _last_audit_time(tender: dict, fallback: str) -> str:
    audit_events = tender.get("audit_events", [])
    if not audit_events:
        return fallback
    return audit_events[-1].get("created_at", fallback)


def _health_state(
    tender: dict,
    *,
    status: str,
    last_checked: str | None = None,
    freshness: str,
    action: str,
    reason: str,
) -> SourceHealthState:
    source = tender["source"]
    source_kind = source["source_kind"]

    return SourceHealthState(
        id=tender["tender_id"],
        source_kind=source_kind,
        display_name=SOURCE_LABELS.get(source_kind, source_kind),
        host=_host_from_url(source["source_url"]),
        source_url=source["source_url"],
        raw_artifact_id=source["raw_artifact_id"],
        status=status,
        last_checked=last_checked or _last_audit_time(tender, "not checked"),
        freshness=freshness,
        owner_role=tender["outcome"]["owner_role"],
        ai_gate="allowed" if status == "ready" else "blocked",
        action=action,
        reason=reason,
    )


def get_source_health() -> SourceHealthResponse:
    states = [
        _health_state(
            _tender_by_id("0373100099926000012"),
            status="ready",
            freshness="fresh under 15 min",
            action="AI scoring allowed",
            reason="source_url, raw artifact and owner receipt match the shared fixture.",
        ),
        _health_state(
            _tender_by_id("0173200001426000044"),
            status="quarantine",
            freshness="schema drift",
            action="manual review before AI",
            reason="Primary source is reachable, but the normalizer cannot overwrite an old schema without owner review.",
        ),
        _health_state(
            _tender_by_id("exec-2026-0007"),
            status="unavailable",
            last_checked="no fresh response",
            freshness="connector timeout",
            action="retry 3x then escalate",
            reason="Official ETP status webhook is not confirmed, so execution AI and handoff stay blocked.",
        ),
    ]
    counts = {status: sum(1 for state in states if state.status == status) for status in ("ready", "quarantine", "unavailable")}

    return SourceHealthResponse(
        version="0.1.0",
        source_policy="Primary-source health gates AI access; aggregators cannot mark evidence ready.",
        summary=SourceHealthSummary(total=len(states), **counts),
        states=states,
    )
