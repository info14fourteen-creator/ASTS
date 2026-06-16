# Shared Package

Future home for generated API clients, shared TypeScript types, and cross-app schemas.

MVP can generate TypeScript types from FastAPI OpenAPI once backend schemas stabilize.

## Demo Data

- `demo-data/asts-demo.json` is the temporary shared fixture for the web shell and FastAPI prototype endpoints.
- Keep prototype tenders, documents and tasks here until PostgreSQL-backed seed data replaces it.
- The fixture keeps API fields plus UI labels so the web dashboard and `/v1/*` demo endpoints stay aligned.
