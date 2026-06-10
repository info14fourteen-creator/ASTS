from uuid import UUID

from app.tenders.models import TenderCreate, TenderRead, build_tender


class TenderRepository:
    def __init__(self) -> None:
        self._items: dict[UUID, TenderRead] = {}

    def list(self) -> list[TenderRead]:
        return sorted(self._items.values(), key=lambda tender: tender.created_at, reverse=True)

    def create(self, payload: TenderCreate) -> TenderRead:
        tender = build_tender(payload)
        self._items[tender.id] = tender
        return tender

    def clear(self) -> None:
        self._items.clear()


tender_repository = TenderRepository()
