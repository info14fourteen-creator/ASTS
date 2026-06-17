from fastapi import FastAPI

from app.config import settings
from app.demo_data import DEMO_DOCUMENTS, DEMO_TASKS, DEMO_TENDERS
from app.schemas import (
    ApiContract,
    ApiContractsResponse,
    ApiStatusResponse,
    AiReviewQueueResponse,
    DocumentArtifact,
    HealthResponse,
    IngestionPolicyResponse,
    OutcomeReasonsResponse,
    OwnerApprovalHandoffResponse,
    SourceConnectorsResponse,
    SourceFreshnessResponse,
    SourceHealthResponse,
    SourceOwnerReceiptsResponse,
    StackResponse,
    StatusCheck,
    TaskItem,
    TenderSummary,
)
from app.services.ai_review import get_ai_review_queue
from app.services.connectors import get_source_connectors
from app.services.handoff import get_owner_approval_handoff
from app.services.ingestion import get_ingestion_policy
from app.services.outcomes import get_outcome_reasons
from app.services.source_freshness import get_source_freshness
from app.services.source_health import get_source_health
from app.services.source_owner_receipts import get_source_owner_receipts

app = FastAPI(title=settings.app_name, version=settings.app_version)


@app.get("/health", response_model=HealthResponse, tags=["system"])
def health() -> HealthResponse:
    return HealthResponse(status="ok", service="asts-api", version=settings.app_version)


@app.get("/v1/status", response_model=ApiStatusResponse, tags=["system"])
def status() -> ApiStatusResponse:
    return ApiStatusResponse(
        service="asts-api",
        version=settings.app_version,
        stage=settings.app_stage,
        source_policy="primary sources only: EIS, FNS, official ETP data, raw artifacts",
        funnels=["pre-win tender funnel", "post-win execution funnel"],
        modules=["sources", "tenders", "documents", "ai-review", "tasks", "integrations"],
        checks=[
            StatusCheck(
                name="source evidence",
                state="planned",
                detail="AI conclusions must link to source_url, raw artifact and checksum",
            ),
            StatusCheck(
                name="human approval",
                state="planned",
                detail="low-confidence AI results and deal-stage overrides require an owner",
            ),
            StatusCheck(
                name="web shell",
                state="ready",
                detail="app.site.ru prototype exposes 19 static routes in PR #17",
            ),
        ],
    )


@app.get("/v1/contracts", response_model=ApiContractsResponse, tags=["system"])
def contracts() -> ApiContractsResponse:
    evidence_fields = ["source_kind", "source_url", "raw_artifact_id", "checksum_sha256"]

    return ApiContractsResponse(
        version=settings.app_version,
        source_policy="No AI decision without SourceEvidence",
        contracts=[
            ApiContract(
                name="Tender summary",
                route="/v1/tenders",
                model="TenderSummary",
                required_evidence=evidence_fields,
            ),
            ApiContract(
                name="Document artifact",
                route="/v1/documents",
                model="DocumentArtifact",
                required_evidence=evidence_fields + ["raw_artifact", "storage_path"],
            ),
            ApiContract(
                name="Task item",
                route="/v1/tasks",
                model="TaskItem",
                required_evidence=["tender_id", "owner_role", "requires_human_approval"],
            ),
            ApiContract(
                name="Ingestion policy",
                route="/v1/ingestion/policy",
                model="IngestionPolicyResponse",
                required_evidence=evidence_fields + ["raw_storage", "retry_steps"],
            ),
            ApiContract(
                name="Source connectors",
                route="/v1/sources/connectors",
                model="SourceConnectorsResponse",
                required_evidence=[
                    "connector_id",
                    "source_kind",
                    "official_base_url",
                    "raw_storage_template",
                    "required_secrets",
                ],
            ),
            ApiContract(
                name="Source health",
                route="/v1/sources/health",
                model="SourceHealthResponse",
                required_evidence=[
                    "source_url",
                    "raw_artifact_id",
                    "status",
                    "ai_gate",
                    "reason",
                ],
            ),
            ApiContract(
                name="Source freshness",
                route="/v1/sources/freshness",
                model="SourceFreshnessResponse",
                required_evidence=[
                    "breach_type",
                    "source_url",
                    "raw_artifact_id",
                    "detected_at",
                    "required_action",
                    "ai_gate",
                ],
            ),
            ApiContract(
                name="Source owner receipts",
                route="/v1/sources/owner-receipts",
                model="SourceOwnerReceiptsResponse",
                required_evidence=[
                    "breach_type",
                    "owner_role",
                    "action",
                    "resolution_status",
                    "new_raw_artifact_id",
                    "new_checksum_sha256",
                    "audit_note",
                ],
            ),
            ApiContract(
                name="AI review queue",
                route="/v1/ai/review-queue",
                model="AiReviewQueueResponse",
                required_evidence=[
                    "confidence",
                    "threshold",
                    "owner_role",
                    "source",
                    "evidence_ref",
                    "required_action",
                ],
            ),
            ApiContract(
                name="Outcome reasons",
                route="/v1/outcomes",
                model="OutcomeReasonsResponse",
                required_evidence=["code", "funnel", "requires_owner_approval"],
            ),
            ApiContract(
                name="Owner approval handoff",
                route="/v1/handoff/owner-approval",
                model="OwnerApprovalHandoffResponse",
                required_evidence=[
                    "approved",
                    "owner_role",
                    "evidence_ref",
                    "receipt",
                    "source_evidence_present",
                ],
            ),
        ],
    )


@app.get("/v1/tenders", response_model=list[TenderSummary], tags=["tenders"])
def list_tenders() -> list[TenderSummary]:
    return DEMO_TENDERS


@app.get("/v1/documents", response_model=list[DocumentArtifact], tags=["documents"])
def list_documents() -> list[DocumentArtifact]:
    return DEMO_DOCUMENTS


@app.get("/v1/tasks", response_model=list[TaskItem], tags=["tasks"])
def list_tasks() -> list[TaskItem]:
    return DEMO_TASKS


@app.get("/v1/ingestion/policy", response_model=IngestionPolicyResponse, tags=["ingestion"])
def ingestion_policy() -> IngestionPolicyResponse:
    return get_ingestion_policy()


@app.get("/v1/sources/connectors", response_model=SourceConnectorsResponse, tags=["sources"])
def source_connectors() -> SourceConnectorsResponse:
    return get_source_connectors()


@app.get("/v1/sources/health", response_model=SourceHealthResponse, tags=["sources"])
def source_health() -> SourceHealthResponse:
    return get_source_health()


@app.get("/v1/sources/freshness", response_model=SourceFreshnessResponse, tags=["sources"])
def source_freshness() -> SourceFreshnessResponse:
    return get_source_freshness()


@app.get("/v1/sources/owner-receipts", response_model=SourceOwnerReceiptsResponse, tags=["sources"])
def source_owner_receipts() -> SourceOwnerReceiptsResponse:
    return get_source_owner_receipts()


@app.get("/v1/ai/review-queue", response_model=AiReviewQueueResponse, tags=["ai"])
def ai_review_queue() -> AiReviewQueueResponse:
    return get_ai_review_queue()


@app.get("/v1/outcomes", response_model=OutcomeReasonsResponse, tags=["workflow"])
def outcome_reasons() -> OutcomeReasonsResponse:
    return get_outcome_reasons()


@app.get("/v1/handoff/owner-approval", response_model=OwnerApprovalHandoffResponse, tags=["workflow"])
def owner_approval_handoff() -> OwnerApprovalHandoffResponse:
    return get_owner_approval_handoff()


@app.get("/stack", response_model=StackResponse, tags=["system"])
def stack() -> StackResponse:
    return StackResponse(
        api="FastAPI",
        database="PostgreSQL + pgvector",
        jobs="Redis + Celery/RQ",
        files="S3-compatible storage / MinIO locally",
        ai="provider abstraction with structured extraction",
        outputs=[
            "tender card",
            "decision card",
            "requirements register",
            "position table",
            "supplier request",
            "quote comparison",
            "profitability sheet",
            "task board",
            "XLSX/PDF/JSON exports",
        ],
    )
