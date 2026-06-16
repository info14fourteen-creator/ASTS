from datetime import UTC, datetime
from decimal import Decimal
from enum import StrEnum
from uuid import UUID, uuid4

from pydantic import BaseModel, ConfigDict, Field, HttpUrl


class TenderStatus(StrEnum):
    NEW = "new"
    ANALYZING = "analyzing"
    MANUAL_REVIEW = "manual_review"
    READY_FOR_DECISION = "ready_for_decision"
    DECLINED = "declined"
    IN_PROGRESS = "in_progress"


class AiRecommendation(StrEnum):
    PARTICIPATE = "participate"
    DECLINE = "decline"
    MANUAL_REVIEW = "manual_review"


class TenderBase(BaseModel):
    title: str = Field(min_length=1, max_length=500)
    customer_name: str | None = Field(default=None, max_length=300)
    source_url: HttpUrl | None = None
    platform: str | None = Field(default=None, max_length=120)
    initial_price: Decimal | None = Field(default=None, ge=0)
    currency: str = Field(default="RUB", min_length=3, max_length=3)
    submission_deadline: datetime | None = None


class TenderCreate(TenderBase):
    external_id: str | None = Field(default=None, max_length=120)
    source_system: str | None = Field(default=None, max_length=120)


class TenderRead(TenderBase):
    id: UUID
    external_id: str | None = None
    source_system: str | None = None
    status: TenderStatus = TenderStatus.NEW
    ai_score: int | None = Field(default=None, ge=0, le=100)
    ai_recommendation: AiRecommendation | None = None
    ai_summary: str | None = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


def build_tender(payload: TenderCreate) -> TenderRead:
    now = datetime.now(UTC)
    return TenderRead(
        id=uuid4(),
        created_at=now,
        updated_at=now,
        **payload.model_dump(),
    )
