# Stack Decision

## Decision

Use Next.js + FastAPI + PostgreSQL as the initial stack.

## Why

### Next.js for Web

Tender teams need a dense operational UI: tables, filters, tender cards, quote comparison, forms, and dashboards. Next.js with TypeScript is a strong fit for this.

### FastAPI for Backend

The system has many AI, document, parsing, and data tasks. Python has the best ecosystem for:

- document parsing
- OCR
- spreadsheet processing
- AI orchestration
- data validation
- background jobs

FastAPI gives a clean typed API surface and generates OpenAPI documentation naturally.

### PostgreSQL for Core Data

Tender operations are relational: organizations, users, tenders, positions, suppliers, quotes, tasks, costs. PostgreSQL fits this better than document-only storage.

pgvector allows us to keep semantic search in the same database for MVP, without adding a separate vector database too early.

### Redis for Jobs and Timers

Parsing files, running AI extraction, sending notifications, and reminder escalation should happen asynchronously.

### S3/MinIO for Files

Tender documentation and supplier files can become large. They should not live inside the database.

## Rejected for MVP

### Full Node.js Backend

Possible, but Python is stronger for document and AI pipelines.

### Django

Good framework, but FastAPI keeps the API layer lighter and easier to pair with generated frontend clients.

### Microservices

Too much operational overhead for the first version.

### Separate Vector Database

Can be added later if document volume grows. PostgreSQL + pgvector is enough for MVP.

## First Local Stack

```text
apps/web       Next.js TypeScript
apps/api       FastAPI Python
postgres       relational data + pgvector
redis          background jobs
minio          object storage
telegram bot   notifications
smtp           supplier requests
```
