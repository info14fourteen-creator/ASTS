# Shared Package

Future home for generated API clients, shared TypeScript types, and cross-app schemas.

MVP can generate TypeScript types from FastAPI OpenAPI once backend schemas stabilize.

## Demo Data

- `demo-data/asts-demo.json` is the temporary shared fixture for the web shell and FastAPI prototype endpoints.
- Keep prototype tenders, documents and tasks here until PostgreSQL-backed seed data replaces it.
- The fixture keeps API fields plus UI labels so the web dashboard and `/v1/*` demo endpoints stay aligned.
- `source-owner-receipts.json` is the shared owner receipt fixture used by both
  FastAPI `/v1/sources/owner-receipts` and the `/sources` web history/rules UI.
  It keeps freshness blocker rules, required receipt fields and audit history in
  one place until the data moves into PostgreSQL.
- `fns-connector-gate.json` is the shared Legal approval gate for the FNS
  connector. FastAPI `/v1/sources/connectors`, `/sources` UI and web parity smoke
  read the same contract-only status, CI policy, safe INN/OGRN requirement and
  approval list.
- `ai-review-queue.json` is the shared low-confidence owner review queue. FastAPI
  `/v1/ai/review-queue`, `/ai-review` UI and web parity smoke read the same
  threshold, fact types, owner/action matrix and reasons.

## AI Schemas

- `ai-schemas/tender-position-extraction.schema.json` defines the AI output for tender positions, requirements, analog rules, confidence and source references.
- `ai-schemas/supplier-quote-normalization.schema.json` defines the AI output for supplier quote lines, prices, VAT, delivery timing, analog flags and source references.
- These schemas are source-evidence first: every extracted set must include document/raw artifact references before it can be used in workflow decisions.
- Run `npm run validate` in `packages/shared` to check schema shape, example AI outputs, demo fixture references and raw artifact custody links.
- Shared validation also checks `source-owner-receipts.json` rule/history shape,
  owner/action matrix, restored unlock conditions and blocked AI gate counts.
- It also checks `fns-connector-gate.json` for the Legal owner, contract-only
  status, CI policy and exact five approval gates.
- It checks `ai-review-queue.json` for the three low-confidence fact types,
  threshold, derived status and owner/action matrix.
- GitHub Actions workflow `Shared validation` runs the same check for shared schema and fixture changes.
