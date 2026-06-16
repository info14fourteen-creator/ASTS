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
- `GET /stack` - planned technical stack and output types.
