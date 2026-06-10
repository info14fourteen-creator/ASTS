# Local Development

## Requirements

- Docker Desktop or compatible Docker runtime.
- Node.js for the future web app.
- Python 3.12+ for the future API.

## Start Infrastructure

```bash
docker compose up -d postgres redis minio
```

Services:

- Postgres: `localhost:5432`
- Redis: `localhost:6379`
- MinIO API: `http://localhost:9000`
- MinIO console: `http://localhost:9001`

MinIO local credentials:

- user: `asts`
- password: `asts_local_password`

## Environment

```bash
cp .env.example .env
```

Then fill secrets:

- `OPENAI_API_KEY`
- `TELEGRAM_BOT_TOKEN`
- SMTP settings if email sending is enabled.

## First Implementation Order

1. Create FastAPI app in `apps/api`.
2. Add database models and migrations.
3. Add XLSX import script/endpoint.
4. Create Next.js app in `apps/web`.
5. Add tender list and tender card.
6. Add document upload.
7. Add AI analysis job.
