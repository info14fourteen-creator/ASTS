from fastapi.testclient import TestClient

from app.main import app
from app.tenders.repository import tender_repository

client = TestClient(app)


def setup_function() -> None:
    tender_repository.clear()


def test_health() -> None:
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok", "service": "asts-api"}


def test_create_and_list_tenders() -> None:
    payload = {
        "title": "Supply of cable products",
        "customer_name": "AO Ust-SrednekanGESstroy",
        "source_url": "https://example.com/tenders/123",
        "platform": "EETP",
        "initial_price": "215882785.19",
        "submission_deadline": "2026-07-01T10:00:00+03:00",
    }

    create_response = client.post("/tenders", json=payload)
    list_response = client.get("/tenders")

    assert create_response.status_code == 201
    created = create_response.json()
    assert created["id"]
    assert created["title"] == payload["title"]
    assert created["status"] == "new"

    assert list_response.status_code == 200
    tenders = list_response.json()
    assert len(tenders) == 1
    assert tenders[0]["id"] == created["id"]


def test_create_tender_requires_title() -> None:
    response = client.post("/tenders", json={"title": ""})

    assert response.status_code == 422
