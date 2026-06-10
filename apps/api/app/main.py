from fastapi import FastAPI

from app.config import settings
from app.tenders import router as tenders_router

app = FastAPI(title=settings.app_name, version="0.1.0")
app.include_router(tenders_router)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "asts-api"}


@app.get("/stack")
def stack() -> dict[str, object]:
    return {
        "api": "FastAPI",
        "database": "PostgreSQL + pgvector",
        "jobs": "Redis + Celery/RQ",
        "files": "S3-compatible storage / MinIO locally",
        "ai": "provider abstraction with structured extraction",
        "outputs": [
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
    }
