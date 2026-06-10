from fastapi import APIRouter, status

from app.tenders.models import TenderCreate, TenderRead
from app.tenders.repository import tender_repository

router = APIRouter(prefix="/tenders", tags=["tenders"])


@router.get("", response_model=list[TenderRead])
def list_tenders() -> list[TenderRead]:
    return tender_repository.list()


@router.post("", response_model=TenderRead, status_code=status.HTTP_201_CREATED)
def create_tender(payload: TenderCreate) -> TenderRead:
    return tender_repository.create(payload)
