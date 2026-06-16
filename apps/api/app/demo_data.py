import json
from pathlib import Path

from app.schemas import DocumentArtifact, TaskItem, TenderSummary

DEMO_DATA_PATH = Path(__file__).resolve().parents[3] / "packages" / "shared" / "demo-data" / "asts-demo.json"


def _load_demo_data() -> dict:
    with DEMO_DATA_PATH.open(encoding="utf-8") as demo_file:
        return json.load(demo_file)


def _source_by_tender_id(demo_data: dict) -> dict[str, dict]:
    return {tender["tender_id"]: tender["source"] for tender in demo_data["tenders"]}


def _document_source(document: dict, sources: dict[str, dict]) -> dict:
    if "source" in document:
        return document["source"]
    return sources[document["source_ref"]]


DEMO_DATA = _load_demo_data()
TENDER_SOURCES = _source_by_tender_id(DEMO_DATA)

DEMO_TENDERS = [TenderSummary(**tender) for tender in DEMO_DATA["tenders"]]
DEMO_DOCUMENTS = [
    DocumentArtifact(
        document_id=document["document_id"],
        tender_id=document["tender_id"],
        title=document["title"],
        status=document["status"],
        source=_document_source(document, TENDER_SOURCES),
        storage_path=document["storage_path"],
        mime_type=document["mime_type"],
    )
    for document in DEMO_DATA["documents"]
]
DEMO_TASKS = [
    TaskItem(
        task_id=task["task_id"],
        tender_id=task["tender_id"],
        title=task["title"],
        owner_role=task["owner_role"],
        priority=task["priority"],
        status=task["status"],
        due_at=task["due_at"],
        requires_human_approval=task["requires_human_approval"],
    )
    for task in DEMO_DATA["tasks"]
]
