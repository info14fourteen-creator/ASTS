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


class DocumentArtifact(BaseModel):
    document_id: str
    tender_id: str
    title: str
    status: DocumentStatus
    source: SourceEvidence
    storage_path: str
    mime_type: str


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


class ApiContract(BaseModel):
    name: str
    route: str
    model: str
    required_evidence: list[str]


class ApiContractsResponse(BaseModel):
    version: str
    source_policy: str
    contracts: list[ApiContract]
