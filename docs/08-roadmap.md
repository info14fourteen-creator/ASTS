# Roadmap

## Phase 0: Blueprint

Status: current.

Deliverables:

- Product vision.
- MVP scope.
- Architecture.
- Data model.
- AI pipeline.
- API contract.
- Output formats.
- Stack decision.

## Phase 1: Local MVP Skeleton

Target: 1-2 weeks.

Deliverables:

- Docker Compose with Postgres, Redis, MinIO.
- FastAPI app with health check.
- Next.js app with dashboard shell.
- Database models and migrations for tenders, documents, positions, suppliers, quotes, tasks.
- XLSX tender import from Tenderland-style files.

## Phase 2: Tender Analysis

Target: 2-4 weeks.

Deliverables:

- Document upload.
- Text extraction from PDF/DOCX/XLSX.
- AI extraction into structured schema.
- Tender decision card.
- Requirements register.
- Position table.

## Phase 3: Supplier Workflow

Target: 3-5 weeks.

Deliverables:

- Supplier directory.
- Supplier matching by category/OKPD2.
- Supplier request generation.
- Public quote form.
- Quote comparison.
- Uploaded quote file parsing.

## Phase 4: Profitability and Tasks

Target: 2-4 weeks.

Deliverables:

- Cost items.
- Profitability calculation.
- Role-based task templates.
- Telegram notifications.
- Deadline reminders and escalation.

## Phase 5: Pilot

Target: 1-2 real companies.

Deliverables:

- Process 20-50 real tenders.
- Measure time saved.
- Collect objections.
- Add missing exports.
- Prepare paid access.

## Phase 6: Commercial SaaS

Deliverables:

- Multi-tenant subscription.
- Billing.
- Audit logs.
- Permissions.
- CRM integrations.
- 1C export/import.
- Admin panel.
