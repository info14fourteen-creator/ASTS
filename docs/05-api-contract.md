# API Contract

This is the first REST shape for the MVP. Exact schemas will be generated from backend Pydantic models later.

## Auth

- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/me`

## Tenders

- `GET /tenders`
- `POST /tenders`
- `GET /tenders/{tender_id}`
- `PATCH /tenders/{tender_id}`
- `POST /tenders/import/xlsx`
- `POST /tenders/{tender_id}/documents`
- `POST /tenders/{tender_id}/analyze`
- `GET /tenders/{tender_id}/analysis`
- `POST /tenders/{tender_id}/decision`

## Tender Positions

- `GET /tenders/{tender_id}/positions`
- `POST /tenders/{tender_id}/positions`
- `PATCH /positions/{position_id}`
- `DELETE /positions/{position_id}`

## Suppliers

- `GET /suppliers`
- `POST /suppliers`
- `GET /suppliers/{supplier_id}`
- `PATCH /suppliers/{supplier_id}`
- `POST /suppliers/import/xlsx`
- `GET /suppliers/match?tender_id=...`

## Supplier Requests

- `POST /tenders/{tender_id}/supplier-requests`
- `GET /tenders/{tender_id}/supplier-requests`
- `POST /supplier-requests/{request_id}/send`
- `GET /public/quote/{token}`
- `POST /public/quote/{token}`

## Quotes

- `GET /tenders/{tender_id}/quotes`
- `POST /tenders/{tender_id}/quotes/import`
- `PATCH /quotes/{quote_id}`
- `POST /quotes/{quote_id}/approve`

## Costs and Profitability

- `GET /tenders/{tender_id}/costs`
- `POST /tenders/{tender_id}/costs`
- `PATCH /costs/{cost_id}`
- `POST /tenders/{tender_id}/profitability/calculate`
- `GET /tenders/{tender_id}/profitability`

## Tasks

- `GET /tasks`
- `GET /tenders/{tender_id}/tasks`
- `POST /tenders/{tender_id}/tasks`
- `PATCH /tasks/{task_id}`
- `POST /tasks/{task_id}/complete`

## Reports and Export

- `GET /tenders/{tender_id}/report`
- `GET /tenders/{tender_id}/export/xlsx`
- `GET /tenders/{tender_id}/export/pdf`
- `POST /tenders/{tender_id}/crm-export`

## Example Tender Analysis Response

```json
{
  "tender_id": "ten_123",
  "recommendation": "manual_review",
  "score": 72,
  "summary": "Tender looks potentially profitable, but delivery terms and participant requirements need review.",
  "facts": {
    "initial_price": 215882785.19,
    "submission_deadline": "2023-05-04T21:59:59",
    "platform": "АО ЕЭТП",
    "customer_name": "АО Усть-СреднеканГЭСстрой"
  },
  "risks": [
    {
      "title": "Large security deposit",
      "severity": "medium",
      "confidence": 0.84,
      "source": {
        "document_id": "doc_1",
        "page": 12
      }
    }
  ],
  "positions": [
    {
      "name": "Cable products",
      "okpd2_code": "27.3",
      "confidence": 0.78
    }
  ]
}
```
