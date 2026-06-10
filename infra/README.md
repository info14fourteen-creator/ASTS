# Infrastructure

## Local

Planned services:

- Postgres with pgvector.
- Redis.
- MinIO.
- FastAPI.
- Next.js.

## Production

Start simple:

- VPS or managed app platform.
- Managed Postgres if budget allows.
- S3-compatible object storage.
- Redis.
- Separate worker process.

## Secrets

Never commit:

- AI provider keys.
- SMTP passwords.
- Telegram bot token.
- S3 credentials.
- CRM tokens.
