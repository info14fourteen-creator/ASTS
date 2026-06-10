# Risks

## Market Risks

### Competing with Tender Search Platforms

Risk: established players already own search and monitoring.

Mitigation: position ASTS as the operational workflow after discovery.

### Long Sales Cycle

Risk: tender departments may require trust before adopting.

Mitigation: sell pilot on a narrow measurable workflow: tender analysis and supplier quote collection.

## Product Risks

### AI Hallucinations

Risk: wrong extraction can cause bad business decisions.

Mitigation:

- source references
- confidence scores
- manual review status
- audit log
- no automatic final decision

### Document Complexity

Risk: tender documents are messy, scanned, archived, and inconsistent.

Mitigation:

- accept partial extraction
- show missing data
- support manual correction
- use OCR only as fallback

### Supplier Adoption

Risk: suppliers may ignore public quote forms and answer by email.

Mitigation:

- support manual quote entry
- support uploaded invoices
- later add email parsing

## Legal and Compliance Risks

### Tender Advice Liability

Risk: users may treat the system as a legal authority.

Mitigation:

- label AI outputs as assistant recommendations
- keep legal review tasks
- require human approval

### Personal and Commercial Data

Risk: supplier contacts, prices, and customer data are sensitive.

Mitigation:

- organization-level data isolation
- audit logs
- access roles
- encryption for files and secrets

## Technical Risks

### Integration Scope Creep

Risk: Bitrix24, AmoCRM, 1C, email, Telegram, and tender platforms can consume months.

Mitigation:

- MVP uses XLSX import/export and Telegram only
- add integrations after pilots prove demand

### Background Job Reliability

Risk: document parsing and reminders must be reliable.

Mitigation:

- job status table
- retry policy
- dead-letter queue later
- visible job progress in UI
