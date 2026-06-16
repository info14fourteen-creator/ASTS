# ASTS API

Future FastAPI backend.

## Planned Modules

- `auth`
- `organizations`
- `users`
- `tenders`
- `documents`
- `ai`
- `suppliers`
- `quotes`
- `profitability`
- `tasks`
- `notifications`
- `exports`

## API Principles

- Strict Pydantic schemas.
- Background jobs for slow work.
- Audit log for important changes.
- AI output stored as structured data plus raw trace.
- Source references for extracted facts.

## Current Prototype Endpoints

- `GET /health` - liveness response with service name and API version.
- `GET /v1/status` - product/API status contract: stage, primary-source policy, two funnels, module readiness checks.
- `GET /v1/contracts` - first API contract registry for tender, document and task schemas.
- `GET /v1/tenders` - prototype tender list with source evidence and both deal funnels.
- `GET /v1/documents` - prototype document artifacts with raw storage paths and raw artifact custody manifest.
- `GET /v1/tasks` - prototype operator tasks with owners, priority and approval flags.
- `GET /v1/ingestion/policy` - service-layer contract for raw artifacts, retries and quarantine reasons.
- `GET /v1/sources/connectors` - connector registry starting with the EIS / zakupki.gov.ru contract-only stub.
- `GET /v1/sources/health` - primary-source health contract with `ready`, `quarantine` and `unavailable` AI gates.
- `GET /v1/sources/freshness` - primary-source freshness breach queue for `stale`, `missing`, `parse_failed` and `hash_mismatch` blockers.
- `GET /v1/ai/review-queue` - low-confidence AI fact queue with owner review and embedded source evidence.
- `GET /v1/outcomes` - structured outcome/reason dictionary for pre-win and execution funnels.
- `GET /v1/handoff/owner-approval` - owner receipt and source-evidence lock before opening the post-win execution funnel.
- `GET /stack` - planned technical stack and output types.

## Smoke Checks

- `python3 scripts/smoke_connectors.py` - checks `/v1/sources/connectors`, `/v1/sources/health`, `/v1/sources/freshness`, `/v1/ai/review-queue` and `/v1/handoff/owner-approval` when FastAPI dependencies are installed; prints `SKIP` locally if they are missing.
- `requirements-smoke.txt` pins the minimal dependency set used by GitHub Actions workflow `API smoke`.

## Source Freshness Contract

`GET /v1/sources/freshness` is the backend contract behind the `/sources`
freshness breach queue. It returns four blocker classes:

- `stale` - primary-source data is older than the SLA window.
- `missing` - expected raw artifact or source file is absent.
- `parse_failed` - official payload was fetched but cannot be normalized safely.
- `hash_mismatch` - stored raw artifact checksum differs from source evidence.

Every queue row must include `source_url`, `raw_artifact_id`, `owner_role`,
`required_action`, `reason` and `ai_gate="blocked"`. AI scoring and workflow
handoff stay blocked until the row is refreshed, refetched or manually reviewed.

The detailed DTO and example response live in `docs/05-api-contract.md`.
