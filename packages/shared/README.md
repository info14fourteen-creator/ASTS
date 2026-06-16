# Shared Package

Future home for generated API clients, shared TypeScript types, and cross-app schemas.

MVP can generate TypeScript types from FastAPI OpenAPI once backend schemas stabilize.

## Demo Data

- `demo-data/asts-demo.json` is the temporary shared fixture for the web shell and FastAPI prototype endpoints.
- Keep prototype tenders, documents and tasks here until PostgreSQL-backed seed data replaces it.
- The fixture keeps API fields plus UI labels so the web dashboard and `/v1/*` demo endpoints stay aligned.

## AI Schemas

- `ai-schemas/tender-position-extraction.schema.json` defines the AI output for tender positions, requirements, analog rules, confidence and source references.
- `ai-schemas/supplier-quote-normalization.schema.json` defines the AI output for supplier quote lines, prices, VAT, delivery timing, analog flags and source references.
- These schemas are source-evidence first: every extracted set must include document/raw artifact references before it can be used in workflow decisions.
- Run `npm run validate` in `packages/shared` to check schema shape, example AI outputs, demo fixture references and raw artifact custody links.
