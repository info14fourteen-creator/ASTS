from fastapi import FastAPI

from app.config import settings
from app.demo_data import DEMO_DOCUMENTS, DEMO_TASKS, DEMO_TENDERS
from app.schemas import (
    ApiContract,
    ApiContractsResponse,
    ApiStatusResponse,
    DocumentArtifact,
    HealthResponse,
    IngestionPolicyResponse,
    StackResponse,
    StatusCheck,
    TaskItem,
    TenderSummary,
)
from app.services.ingestion import get_ingestion_policy

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
                required_evidence=evidence_fields + ["storage_path"],
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
