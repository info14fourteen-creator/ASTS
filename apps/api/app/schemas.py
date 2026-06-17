from typing import Literal

from pydantic import BaseModel, Field

DealFunnel = Literal["pre_win", "execution"]
DealStage = Literal[
    "inbox",
    "qualification",
    "positions",
    "supplier_quotes",
    "top3",
    "economics",
    "submission",
    "result",
    "contract",
    "payment",
    "purchase",
    "fulfillment",
    "closing_documents",
    "final_settlement",
]
SourceKind = Literal["eis", "fns", "etp", "gis_torgi", "fedresurs", "file_vault"]
SourceFreshness = Literal["fresh", "stale", "quarantine", "manual_review"]
DocumentStatus = Literal["raw", "downloaded", "ocr_ready", "parsed", "reviewed", "attached"]
RawArtifactCustodyStatus = Literal[
    "raw_saved",
    "checksum_verified",
    "parsed",
    "quarantine",
]
ConnectorMode = Literal["contract_only", "sandbox", "production"]
ConnectorStatus = Literal["planned", "stub", "ready", "blocked"]
SourceHealthStatus = Literal["ready", "quarantine", "unavailable"]
SourceHealthAiGate = Literal["allowed", "blocked"]
SourceFreshnessBreachType = Literal["stale", "missing", "parse_failed", "hash_mismatch"]
AiReviewFactType = Literal[
    "requirement",
    "deadline",
    "position",
    "supplier_quote",
    "economics",
    "execution_status",
]
AiReviewStatus = Literal["review_required", "blocked"]
OwnerHandoffReceipt = Literal["present", "missing"]
OwnerHandoffStatus = Literal["unlocked", "locked"]
OwnerHandoffSummaryStatus = Literal["ready", "locked"]
TaskPriority = Literal["normal", "warning", "critical"]
TaskStatus = Literal["open", "blocked", "done"]
IngestionAction = Literal["retry", "quarantine", "manual_review"]
QuarantineReason = Literal[
    "source_unavailable",
    "rate_limited",
    "checksum_mismatch",
    "schema_mismatch",
    "manual_review_required",
]
OutcomeCode = Literal[
    "won",
    "lost_competition",
    "rejected_before_submission",
    "deadline_expired",
    "unprofitable",
    "cancelled_by_customer",
    "manual_management",
    "not_paid",
    "not_accepted",
    "penalties",
    "refund",
    "partial_payment",
]


class HealthResponse(BaseModel):
    status: Literal["ok"]
    service: str
    version: str


class StackResponse(BaseModel):
    api: str
    database: str
    jobs: str
    files: str
    ai: str
    outputs: list[str]


class StatusCheck(BaseModel):
    name: str
    state: Literal["ready", "planned", "blocked"]
    detail: str


class ApiStatusResponse(BaseModel):
    service: str
    version: str
    stage: str
    source_policy: str
    funnels: list[str] = Field(min_length=2)
    modules: list[str]
    checks: list[StatusCheck]


class SourceEvidence(BaseModel):
    source_kind: SourceKind
    source_url: str
    raw_artifact_id: str
    checksum_sha256: str = Field(min_length=64, max_length=64)
    freshness: SourceFreshness


class RawArtifactManifest(BaseModel):
    artifact_id: str
    storage_path: str
    source_url: str
    checksum_sha256: str = Field(min_length=64, max_length=64)
    content_type: str
    collected_at: str
    custody_status: RawArtifactCustodyStatus


class DealOutcomeSnapshot(BaseModel):
    code: OutcomeCode
    funnel: DealFunnel
    title: str
    status: Literal["suggested", "approved", "locked"]
    requires_owner_approval: bool
    owner_role: str
    source_ref: str
    note: str


class AuditEvent(BaseModel):
    event_id: str
    tender_id: str
    action: str
    actor_role: str
    created_at: str
    evidence_ref: str


class TenderSummary(BaseModel):
    tender_id: str
    title: str
    customer_name: str
    source: SourceEvidence
    nmck_rub: int | None = Field(default=None, ge=0)
    region: str | None = None
    deadline_at: str | None = None
    funnel: DealFunnel
    stage: DealStage
    ai_confidence: float = Field(ge=0, le=1)
    outcome: DealOutcomeSnapshot | None = None
    audit_events: list[AuditEvent] = Field(default_factory=list)


class DocumentArtifact(BaseModel):
    document_id: str
    tender_id: str
    title: str
    status: DocumentStatus
    source: SourceEvidence
    raw_artifact: RawArtifactManifest
    storage_path: str
    mime_type: str


class ConnectorCapability(BaseModel):
    name: str
    description: str
    evidence_fields: list[str]


class ConnectorNetworkSmokeGate(BaseModel):
    status: Literal["contract_only", "ready_for_network"]
    ci_policy: str
    owner: str
    required_approvals: list[str]
    safe_test_pair_required: bool


class SourceConnector(BaseModel):
    connector_id: str
    source_kind: SourceKind
    display_name: str
    status: ConnectorStatus
    mode: ConnectorMode
    network_enabled: bool
    official_base_url: str
    schedule: str
    laws: list[str]
    supported_objects: list[str]
    raw_storage_template: str
    required_secrets: list[str]
    capabilities: list[ConnectorCapability]
    network_smoke_gate: ConnectorNetworkSmokeGate
    blocked_by: list[str]


class SourceHealthState(BaseModel):
    id: str
    source_kind: SourceKind
    display_name: str
    host: str
    source_url: str
    raw_artifact_id: str
    status: SourceHealthStatus
    last_checked: str
    freshness: str
    owner_role: str
    ai_gate: SourceHealthAiGate
    action: str
    reason: str


class SourceHealthSummary(BaseModel):
    total: int = Field(ge=0)
    ready: int = Field(ge=0)
    quarantine: int = Field(ge=0)
    unavailable: int = Field(ge=0)


class SourceFreshnessQueueItem(BaseModel):
    id: str
    tender_id: str
    source_kind: SourceKind
    display_name: str
    source_url: str
    raw_artifact_id: str
    breach_type: SourceFreshnessBreachType
    detected_at: str
    last_success_at: str | None = None
    sla_minutes: int = Field(ge=0)
    age_minutes: int | None = Field(default=None, ge=0)
    owner_role: str
    ai_gate: SourceHealthAiGate
    required_action: str
    reason: str


class SourceFreshnessSummary(BaseModel):
    total: int = Field(ge=0)
    stale: int = Field(ge=0)
    missing: int = Field(ge=0)
    parse_failed: int = Field(ge=0)
    hash_mismatch: int = Field(ge=0)
    ai_blocked: int = Field(ge=0)


class AiReviewQueueItem(BaseModel):
    id: str
    tender_id: str
    document_id: str | None = None
    fact_type: AiReviewFactType
    title: str
    extracted_value: str
    confidence: float = Field(ge=0, le=1)
    threshold: float = Field(ge=0, le=1)
    status: AiReviewStatus
    owner_role: str
    source: SourceEvidence
    evidence_ref: str
    required_action: str
    reason: str


class AiReviewQueueSummary(BaseModel):
    total: int = Field(ge=0)
    review_required: int = Field(ge=0)
    blocked: int = Field(ge=0)
    low_confidence: int = Field(ge=0)
    source_evidence_present: int = Field(ge=0)


class OwnerApprovalHandoffLockRow(BaseModel):
    tender_id: str
    outcome: Literal["suggested", "approved", "locked"]
    owner_role: str
    evidence_ref: str
    receipt: OwnerHandoffReceipt
    source_evidence_present: bool
    status: OwnerHandoffStatus
    gate: str
    rule: str


class OwnerApprovalHandoffLockSummary(BaseModel):
    approved: int = Field(ge=0)
    with_receipt: int = Field(ge=0)
    without_receipt: int = Field(ge=0)
    execution_ready: int = Field(ge=0)
    blocked: int = Field(ge=0)
    status: OwnerHandoffSummaryStatus


class OwnerApprovalHandoffResponse(BaseModel):
    version: str
    rule: str
    summary: OwnerApprovalHandoffLockSummary
    rows: list[OwnerApprovalHandoffLockRow]


class TaskItem(BaseModel):
    task_id: str
    tender_id: str
    title: str
    owner_role: str
    priority: TaskPriority
    status: TaskStatus
    due_at: str | None = None
    requires_human_approval: bool = True


class RawArtifactContract(BaseModel):
    artifact_id: str
    source_kind: SourceKind
    source_url: str
    storage_path: str
    checksum_sha256: str = Field(min_length=64, max_length=64)
    content_type: str
    collected_at: str


class IngestionRetryStep(BaseModel):
    attempt: int = Field(ge=1)
    delay_seconds: int = Field(ge=0)
    action: IngestionAction


class IngestionPolicyResponse(BaseModel):
    source_policy: str
    raw_storage: str
    evidence_required: bool
    retry_steps: list[IngestionRetryStep]
    quarantine_reasons: list[QuarantineReason]


class OutcomeReason(BaseModel):
    code: OutcomeCode
    funnel: DealFunnel
    title: str
    terminal: bool
    ai_can_suggest: bool
    requires_owner_approval: bool
    description: str


class OutcomeReasonsResponse(BaseModel):
    version: str
    rules: list[str]
    reasons: list[OutcomeReason]


class SourceConnectorsResponse(BaseModel):
    version: str
    source_policy: str
    connectors: list[SourceConnector]


class SourceHealthResponse(BaseModel):
    version: str
    source_policy: str
    summary: SourceHealthSummary
    states: list[SourceHealthState]


class SourceFreshnessResponse(BaseModel):
    version: str
    source_policy: str
    sla: str
    summary: SourceFreshnessSummary
    queue: list[SourceFreshnessQueueItem]


class AiReviewQueueResponse(BaseModel):
    version: str
    rule: str
    confidence_threshold: float = Field(ge=0, le=1)
    summary: AiReviewQueueSummary
    queue: list[AiReviewQueueItem]


class ApiContract(BaseModel):
    name: str
    route: str
    model: str
    required_evidence: list[str]


class ApiContractsResponse(BaseModel):
    version: str
    source_policy: str
    contracts: list[ApiContract]
