from app.demo_data import DEMO_DATA
from app.schemas import (
    OwnerApprovalHandoffLockRow,
    OwnerApprovalHandoffLockSummary,
    OwnerApprovalHandoffResponse,
)


def _last_audit_event(tender: dict) -> dict | None:
    audit_events = tender.get("audit_events", [])
    if not audit_events:
        return None
    return audit_events[-1]


def _handoff_lock_row(tender: dict) -> OwnerApprovalHandoffLockRow:
    outcome = tender["outcome"]
    source = tender["source"]
    last_audit = _last_audit_event(tender)
    evidence_ref = (last_audit or {}).get("evidence_ref", outcome["source_ref"])
    has_owner_receipt = (
        outcome["status"] == "approved"
        and last_audit is not None
        and last_audit.get("action") == "outcome_approved"
        and last_audit.get("actor_role") == outcome["owner_role"]
        and bool(evidence_ref)
    )
    source_evidence_present = evidence_ref == source["raw_artifact_id"] == outcome["source_ref"]
    is_execution_ready = outcome["status"] == "approved" and has_owner_receipt and source_evidence_present

    return OwnerApprovalHandoffLockRow(
        tender_id=tender["tender_id"],
        outcome=outcome["status"],
        owner_role=outcome["owner_role"],
        evidence_ref=evidence_ref,
        receipt="present" if has_owner_receipt else "missing",
        source_evidence_present=source_evidence_present,
        status="unlocked" if is_execution_ready else "locked",
        gate="execution handoff allowed" if is_execution_ready else "execution handoff locked",
        rule=(
            "Approved outcome has owner receipt and source evidence, so post-win execution can be prepared."
            if is_execution_ready
            else "Approved outcome without owner receipt and source evidence cannot enter execution; suggested/locked stay pre-win."
        ),
    )


def get_owner_approval_handoff() -> OwnerApprovalHandoffResponse:
    rows = [
        _handoff_lock_row(tender)
        for tender in DEMO_DATA["tenders"]
        if tender["funnel"] == "pre_win"
    ]
    approved_rows = [row for row in rows if row.outcome == "approved"]
    with_receipt = [row for row in approved_rows if row.receipt == "present"]
    without_receipt = [row for row in approved_rows if row.receipt == "missing"]
    execution_ready = [row for row in rows if row.status == "unlocked"]
    blocked = [row for row in rows if row.status == "locked"]

    return OwnerApprovalHandoffResponse(
        version="0.1.0",
        rule="Post-win execution opens only after approved outcome, owner receipt and source evidence match.",
        summary=OwnerApprovalHandoffLockSummary(
            approved=len(approved_rows),
            with_receipt=len(with_receipt),
            without_receipt=len(without_receipt),
            execution_ready=len(execution_ready),
            blocked=len(blocked),
            status="locked" if without_receipt else "ready",
        ),
        rows=rows,
    )
