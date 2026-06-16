from typing import Literal

from pydantic import BaseModel, Field


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
