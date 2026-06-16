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

## Source Freshness

Prototype route: `GET /v1/sources/freshness`.

Purpose: make primary-source freshness explicit before AI can score, summarize or move a deal. This endpoint is separate from `/v1/sources/health`: health says whether the source can be used at all, freshness says which evidence item is stale, missing, unparseable or checksum-broken.

Required response shape:

- `version` - API contract version.
- `source_policy` - primary-source-only rule.
- `sla` - human-readable freshness rule.
- `summary.total` - number of queue rows.
- `summary.stale`, `summary.missing`, `summary.parse_failed`, `summary.hash_mismatch` - blocker counts.
- `summary.ai_blocked` - number of rows that must block AI.
- `queue[].breach_type` - one of `stale`, `missing`, `parse_failed`, `hash_mismatch`.
- `queue[].source_url`, `queue[].raw_artifact_id` - evidence link and immutable raw artifact.
- `queue[].owner_role`, `queue[].required_action`, `queue[].reason` - owner handoff fields.
- `queue[].ai_gate` - must be `blocked` while the breach is unresolved.

Example:

```json
{
  "version": "0.1.0",
  "source_policy": "Primary-source freshness breaches block AI until raw evidence is restored.",
  "sla": "Tender intake evidence must be fresh, stored and checksum-verified before AI decisions.",
  "summary": {
    "total": 4,
    "stale": 1,
    "missing": 1,
    "parse_failed": 1,
    "hash_mismatch": 1,
    "ai_blocked": 4
  },
  "queue": [
    {
      "id": "freshness-stale-raw-eis-32211984571",
      "tender_id": "322119845710000001",
      "source_kind": "eis",
      "display_name": "EIS / zakupki.gov.ru API",
      "source_url": "https://zakupki.gov.ru/223/purchase/public/purchase/info/common-info.html?regNumber=32211984571",
      "raw_artifact_id": "raw-eis-32211984571",
      "breach_type": "stale",
      "detected_at": "2026-06-16T08:25:00+05:00",
      "last_success_at": "2026-06-16T07:45:00+05:00",
      "sla_minutes": 15,
      "age_minutes": 40,
      "owner_role": "supplier_manager",
      "ai_gate": "blocked",
      "required_action": "refresh primary-source payload before AI scoring",
      "reason": "EIS card is older than the 15 minute tender intake SLA."
    }
  ]
}
```

UI contract: `/sources` renders the same four breach types in `data-testid="source-freshness-breach-queue"` and exposes `data-ai-blocked-count`, `data-breach-types`, `data-source-url`, `data-raw-artifact-id` and `data-ai-gate`. Route smoke must fail if these markers disappear.

### Source Freshness Owner Actions

Freshness breaches are removed only by an explicit owner action. A new source
payload alone is not enough: the system must keep an audit receipt that explains
which blocker was resolved, which raw artifact replaced or repaired the broken
evidence, and who accepted the result.

Owner action matrix:

- `stale` - owner role `supplier_manager`; action `refresh_primary_payload`;
  required evidence is a newer official payload with a new checksum and
  `last_success_at` inside SLA.
- `missing` - owner role `document_owner`; action `fetch_missing_artifact`;
  required evidence is the missing raw artifact or official "not published"
  source response.
- `parse_failed` - owner role `data_steward`; action `manual_schema_review`;
  required evidence is a normalized payload version plus the quarantined raw
  payload kept unchanged.
- `hash_mismatch` - owner role `security_owner`; action `refetch_and_compare`;
  required evidence is a fresh official refetch, checksum comparison and a
  quarantine note for the mismatched artifact.

Every owner action receipt must include `breach_id`, `owner_id`,
`owner_role`, `action`, `resolution_status`, `resolved_at`, `new_raw_artifact_id`,
`new_checksum_sha256` and `audit_note`. `resolution_status` is one of
`restored`, `accepted_with_note` or `still_blocked`. AI gates can move from
`blocked` to `ready` only when `resolution_status="restored"` and the new raw
artifact is linked to the affected procedure.

## AI Review Queue

Prototype route: `GET /v1/ai/review-queue`.

Purpose: keep AI useful without letting it silently replace the proven tender
logic. Any extracted fact below the automatic confidence threshold must carry
primary-source evidence and wait for an owner review before it can move a deal,
trigger a supplier request or open the execution funnel.

Required response shape:

- `version` - API contract version.
- `rule` - human-readable owner-review rule.
- `confidence_threshold` - minimum confidence for automatic flow decisions.
- `summary.total` - number of low-confidence rows.
- `summary.review_required` - rows that need owner confirmation.
- `summary.blocked` - rows that cannot move forward without manual correction.
- `summary.low_confidence` - rows below `confidence_threshold`.
- `summary.source_evidence_present` - rows with embedded primary-source evidence.
- `queue[].fact_type` - one of `requirement`, `supplier_quote`,
  `economics` or another approved fact class.
- `queue[].confidence`, `queue[].threshold`, `queue[].status` - confidence
  decision fields. `status` is `review_required` for near-threshold facts and
  `blocked` for facts too weak to use.
- `queue[].owner_role`, `queue[].required_action`, `queue[].reason` - manual
  handoff fields.
- `queue[].source` - embedded `SourceEvidence` with `source_kind`,
  `source_url`, `raw_artifact_id`, `checksum_sha256` and `freshness`.
- `queue[].evidence_ref` - immutable raw artifact reference shown in UI.

Example:

```json
{
  "version": "0.1.0",
  "rule": "Low-confidence AI facts require source evidence and owner review before workflow decisions.",
  "confidence_threshold": 0.85,
  "summary": {
    "total": 3,
    "review_required": 1,
    "blocked": 2,
    "low_confidence": 3,
    "source_evidence_present": 3
  },
  "queue": [
    {
      "id": "ai-review-requirement-0373100042626000001",
      "tender_id": "0373100042626000001",
      "document_id": "doc-0373100042626000001-tz",
      "fact_type": "requirement",
      "title": "Требование к поставке серверов",
      "extracted_value": "2 позиции требуют ручной проверки аналогов",
      "confidence": 0.82,
      "threshold": 0.85,
      "status": "review_required",
      "owner_role": "tender_manager",
      "source": {
        "source_kind": "eis",
        "source_url": "https://zakupki.gov.ru/epz/order/notice/ea20/view/common-info.html?regNumber=0373100042626000001",
        "raw_artifact_id": "raw-eis-0373100042626000001",
        "checksum_sha256": "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "freshness": "fresh"
      },
      "evidence_ref": "raw-eis-0373100042626000001",
      "required_action": "confirm requirement interpretation before supplier request",
      "reason": "Confidence is below automatic threshold and affects pre-win qualification."
    }
  ]
}
```

UI contract: `/ai-review` renders this queue in
`data-testid="ai-review-confidence-queue"` and exposes
`data-total-count`, `data-review-required-count`, `data-blocked-count`,
`data-source-evidence-count`, `data-threshold`, `data-status`,
`data-evidence-ref` and `data-owner`. Route smoke also checks
`data-testid="ai-review-confidence-browser-loop"` so the owner-review browser
loop cannot disappear silently.

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
