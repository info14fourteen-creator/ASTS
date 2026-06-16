from fastapi import FastAPI

from app.config import settings
from app.schemas import ApiStatusResponse, HealthResponse, StackResponse, StatusCheck

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
