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
- `GET /v1/sources/connectors` - connector registry starting with EIS / zakupki.gov.ru and FNS / EGRUL contract-only stubs.
- `GET /v1/sources/health` - primary-source health contract with `ready`, `quarantine` and `unavailable` AI gates.
- `GET /v1/sources/freshness` - primary-source freshness breach queue for `stale`, `missing`, `parse_failed` and `hash_mismatch` blockers.
- `GET /v1/sources/owner-receipts` - owner receipt rules required to clear source freshness blockers.
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

### Source Freshness Write API Draft

`GET /v1/sources/freshness` also exposes `write_contract` for the future
freshness receipt write endpoint. This is a draft contract only; the service
must not resolve freshness blockers until auth, idempotency, owner role
validation and immutable freshness audit storage are built.

- `route="/v1/sources/freshness"`;
- `method="POST"`;
- `status="draft"`;
- `owner="Sources owner"`;
- `idempotency_key_required=true`;
- `request_schema` requires `breach_id`, `tender_id`, `source_kind`,
  `owner_id`, `owner_role`, `breach_type`, `resolution_status`, `resolved_at`,
  `new_raw_artifact_id`, `new_checksum_sha256`, `audit_note` and
  `idempotency_key`;
- `blocked_copy="Write endpoint stays draft until auth, idempotency, owner role validation and immutable freshness audit storage are implemented."`;
- `no_merge_copy` blocks merging the write endpoint until owner role, breach
  type, idempotency key, restored evidence and immutable audit append are
  enforced.

When we implement the actual `POST`, it must append a freshness audit event and
keep AI blocked unless `resolution_status="restored"` points to verified raw
evidence with a checksum.

### Freshness Owner Actions

Freshness blockers are cleared by owner receipts, not by implicit retries.
Each breach type has a specific owner action:

- `stale` -> `refresh_primary_payload`;
- `missing` -> `fetch_missing_artifact`;
- `parse_failed` -> `manual_schema_review`;
- `hash_mismatch` -> `refetch_and_compare`.

The receipt must record `breach_id`, `owner_role`, `action`,
`resolution_status`, `new_raw_artifact_id`, `new_checksum_sha256` and
`audit_note`. API implementations must keep `ai_gate="blocked"` unless the
receipt is `resolution_status="restored"` and points to a verified raw artifact.

## Source Owner Receipt Contract

`GET /v1/sources/owner-receipts` is the read-only API contract that documents
how freshness blockers are cleared. It does not mutate receipts yet; it gives
web, mobile and future Telegram clients the same rulebook before we add writes.

The endpoint returns four source-owner rules:

- `stale` -> `refresh_primary_payload`;
- `missing` -> `fetch_missing_artifact`;
- `parse_failed` -> `manual_schema_review`;
- `hash_mismatch` -> `refetch_and_compare`.

Each rule names the responsible `owner_role`, allowed resolution statuses,
required receipt fields and the `ai_gate_unlock_condition`. The unlock rule is
deliberately strict: AI stays blocked unless the owner records
`resolution_status="restored"` and links verified raw evidence with a checksum.

The response also includes a read-only `history[]` fixture with four audit rows
that mirror the `/sources` owner receipt history seed. API smoke asserts
`summary.history_total=4`, `summary.history_blocked_until_restored=2`, the
three resolution statuses and both AI gates:
`ready_after_receipt` and `blocked_until_restored`.
The `/sources` UI mirrors this backend fixture through
`data-api-route="/v1/sources/owner-receipts"` on both
`source-owner-receipt-history` and `source-owner-receipt-history-browser-loop`.
The visible `/sources` history loop also links back here through
`data-testid="source-owner-receipt-docs-link"`, keeping the UI audit trace tied
to this source owner receipt contract.
Both this endpoint and the `/sources` UI read
`packages/shared/source-owner-receipts.json`; the web `npm run
smoke:owner-receipts` and shared validation checks keep owner/action,
resolution, raw artifact, checksum, AI gate and audit note changes from drifting
silently.

### Source Owner Receipt Write API Draft

`GET /v1/sources/owner-receipts` also exposes `write_contract` for the future
write endpoint. This is a draft contract only; the service must not mutate
receipt history until auth, idempotency and immutable audit append are built.

- `route="/v1/sources/owner-receipts"`;
- `method="POST"`;
- `status="draft"`;
- `owner="Sources owner"`;
- `idempotency_key_required=true`;
- `request_schema` extends the receipt fields with `idempotency_key`;
- `blocked_copy="Write endpoint stays draft until auth, idempotency and immutable audit storage are implemented."`;
- `no_merge_copy` blocks merging the write endpoint until owner role,
  idempotency key, checksum evidence and immutable audit append are enforced.

When we implement the actual `POST`, it must append a receipt audit row rather
than overwrite history, and AI unlock remains tied to
`resolution_status="restored"` plus verified raw evidence.

The web cabinet keeps that draft write path auditable through
`data-testid="source-owner-receipt-write-live-route-docs-copy"` on `/plan`.
Web build must run
`npm run smoke:source-owner-receipt-write-live-route-docs-copy` after the
source owner live-route workflow copy so the README anchor, `/plan` docs href
and immutable audit append warning drift before source freshness checks.

## AI Review Queue Contract

`GET /v1/ai/review-queue` is the backend contract behind the `/ai-review`
owner-review surface. It returns low-confidence AI facts that must not affect
workflow decisions until a human owner confirms or corrects them.

Every queue row must include:

- `fact_type`, `confidence`, `threshold` and `status`;
- `owner_role`, `required_action` and `reason`;
- embedded primary-source `source` evidence with `source_url`,
  `raw_artifact_id`, `checksum_sha256` and `freshness`;
- `evidence_ref`, matching the immutable raw artifact shown to the reviewer.

Smoke checks verify that every row is below the automatic threshold and that
all rows keep source evidence present. Facts can be shown as
`review_required`, but flow-moving actions stay blocked for rows with
`status="blocked"` until owner review is recorded.
API smoke also asserts the exact owner/action matrix for `requirement`,
`supplier_quote` and `economics`, and verifies that `evidence_ref` matches the
embedded source `raw_artifact_id`.

The detailed DTO and example response live in `docs/05-api-contract.md`.

The `/ai-review` UI links its `ai-review-receipt-browser-loop` block back to
this section through `data-testid="ai-review-receipt-api-link"` and
`data-api-route="/v1/ai/review-queue"` so owner receipt rules stay traceable
from the visible workdesk to the backend contract.
The web `npm run smoke:ai-review-actions` parity check compares the backend
`packages/shared/ai-review-queue.json` fixture with the `/ai-review` UI seed and
visible `data-required-action` markers, so handoff actions cannot drift silently.

### AI Review Receipt Write API Draft

`GET /v1/ai/review-queue` also exposes `write_contract` for the future AI review
receipt write endpoint. This is a draft contract only; the service must not
record reviewer decisions until auth, idempotency, owner role validation and
immutable AI audit storage are built.

- `route="/v1/ai/review-queue"`;
- `method="POST"`;
- `status="draft"`;
- `owner="AI workflow owner"`;
- `idempotency_key_required=true`;
- `request_schema` requires `review_id`, `fact_id`, `owner_id`, `owner_role`,
  `action`, `decision`, `evidence_ref`, `confidence_at_review`,
  `source_checksum_sha256`, `audit_note` and `idempotency_key`;
- `blocked_copy="Write endpoint stays draft until auth, idempotency, owner role validation and immutable AI audit storage are implemented."`;
- `no_merge_copy` blocks merging the write endpoint until owner role, decision,
  idempotency key, source evidence and immutable audit append are enforced.

When we implement the actual `POST`, it must append an AI review receipt audit
row rather than overwrite the queue item. Workflow-moving actions remain blocked
unless the receipt decision is backed by source evidence and checksum.

### AI Review Owner Actions

Low-confidence AI facts are cleared by owner receipts, not by overwriting the
AI confidence result. Each fact class has an owner:

- `requirement` -> `tender_manager`;
- `supplier_quote` -> `supplier_manager`;
- `economics` -> `finance_owner`.

The receipt must record `review_id`, `fact_id`, `owner_role`, `action`,
`decision`, `evidence_ref`, `confidence_at_review`, `source_checksum_sha256`
and `audit_note`. API implementations must keep workflow actions blocked unless
`decision` is `confirmed` or `corrected` and the receipt points to source
evidence.

## FNS Connector Contract

`GET /v1/sources/connectors` now includes `connector_id="fns-egrul-nalog-ru"`
in `contract_only` mode. It defines:

- source kind `fns`;
- official base URL `https://egrul.nalog.ru/`;
- raw storage template `raw/fns/{inn}/{artifact_id}`;
- required secrets `FNS_API_BASE_URL` and `FNS_API_TOKEN`;
- capabilities `fetch_by_inn`, `fetch_by_ogrn`, `fetch_extract`, `normalize`;
- `network_smoke_gate.status="contract_only"` with Legal owner approval
  required before real network calls;
- evidence fields for `inn`, `ogrn`, `raw_artifact_id`, `checksum_sha256`,
  `content_type`, `normalization_version` and `freshness`.

The connector must stay `network_enabled=false` until access terms, request
limits, secrets and INN/OGRN freshness tests are approved.

### FNS Smoke Contract

Current `API smoke` is contract-only and must not call the public network. It
verifies that the FNS connector is present, disabled for network use and ready
to accept approved credentials later:

- `connector_id="fns-egrul-nalog-ru"`;
- `source_kind="fns"`;
- `mode="contract_only"` and `network_enabled=false`;
- raw storage template `raw/fns/{inn}/{artifact_id}`;
- required secrets `FNS_API_BASE_URL` and `FNS_API_TOKEN`;
- supported objects `legal entity profile by INN`, `EGRUL extract` and
  `company status`;
- capabilities `fetch_by_inn`, `fetch_by_ogrn`, `fetch_extract` and
  `normalize`.
- `network_smoke_gate.status="contract_only"`;
- `network_smoke_gate.owner="Legal"`;
- `safe_test_pair_required=true`;
- approvals for access terms, request volume limits, protected GitHub secrets,
  safe INN/OGRN pair, raw artifact checksum and freshness receipt.

Real INN/OGRN smoke is a separate future gate. It can be enabled only after the
owner records every `network_smoke_gate.required_approvals` item. Until then,
CI must keep testing the contract shape, not external FNS availability.

The `/sources` UI links its `fns-network-gate-browser-loop` block back to this
section through `data-testid="fns-network-gate-docs-link"` and
`data-api-route="/v1/sources/connectors"` so Legal approval rules and CI
behavior stay traceable from the visible workdesk to the connector contract.
The web `npm run smoke:fns-approvals` parity check compares
`packages/shared/fns-connector-gate.json` with this API service and the
`/sources` UI gate so Legal owner, status, CI policy, safe test pair and
approval order cannot drift silently.

### FNS Real-Network Approval API Copy

`GET /v1/sources/connectors` exposes
`network_smoke_gate.approval_api_copy` for the future FNS real-network smoke
approval. It is intentionally copy-only while `status="contract_only"`:

- `route="/v1/sources/connectors"`;
- `status="contract_only"`;
- `owner="Legal"`;
- `request_copy="Request Legal approval before enabling real FNS network smoke."`;
- `blocked_copy="Do not enable FNS real-network smoke until all five approvals are recorded."`;
- `next_action="Create protected environment secrets and record safe test INN/OGRN pair after Legal approval."`;
- `no_merge_copy` blocks merging real-network FNS smoke until Legal owner,
  protected secrets, safe INN/OGRN and checksum freshness receipt are visible.

This copy is part of the API contract so the workdesk can show the same
approval language that backend smoke tests enforce. CI must keep this copy in
contract-only mode until Legal explicitly approves network access.

### EIS Real-Network Approval API Copy

`GET /v1/sources/connectors` exposes
`network_smoke_gate.approval_api_copy` for the future EIS real-network smoke
approval. It is intentionally copy-only while `status="contract_only"`:

- `route="/v1/sources/connectors"`;
- `status="contract_only"`;
- `owner="Data"`;
- `request_copy="Request Data owner approval before enabling real EIS network smoke."`;
- `blocked_copy="Do not enable EIS real-network smoke until all five approvals are recorded."`;
- `next_action="Create protected environment secrets and record safe test zakupki.gov.ru procedure after Data approval."`;
- `no_merge_copy` blocks merging real-network EIS smoke until Data owner,
  protected secrets, safe EIS procedure, rate limits and checksum freshness
  receipt are visible.

This copy is part of the API contract so the workdesk can show the same
approval language that backend smoke tests enforce. CI must keep this copy in
contract-only mode until Data explicitly approves network access.
