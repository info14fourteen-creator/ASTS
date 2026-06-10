# MVP Scope

## MVP Goal

Create a local working product that can process real tender data and demonstrate measurable value to a first customer.

## In Scope

### Tender Intake

- Import from XLSX exported by Tenderland or similar systems.
- Manual tender creation by URL.
- Upload tender documentation: PDF, DOCX, XLSX, ZIP.
- Store original source links and files.

### AI Tender Analysis

- Extract tender title, customer, price, deadline, platform, law/type, region, delivery place, security deposits, key requirements, and risks.
- Extract product/service positions when possible.
- Suggest OKPD2/category matches with confidence score.
- Produce a short decision summary.

### Decision Workflow

- Statuses: new, analyzing, review_required, accepted, rejected, supplier_requests, quotes_received, profitability_check, ready_to_submit, archived.
- Decision options: participate, reject, need specialist review.
- Manual override with reason.

### Supplier Workflow

- Supplier list per tender position/category.
- Public quote request page for suppliers.
- Supplier can enter price, VAT, delivery time, analog/comment, validity period, and upload invoice/file.
- Quote comparison table.

### Profitability

- Purchase cost.
- Logistics.
- Platform/customer deductions.
- Travel/other expenses.
- Employee/customer bonus placeholders.
- Initial margin and margin percentage.

### Task Control

- Role assignment.
- Deadline-aware task timers.
- Telegram notifications.
- Escalation to manager after missed reminders.

## Out of Scope for First MVP

- Full automatic submission to tender platforms.
- Full 1C integration.
- Full legal compliance automation.
- Deep competitor analytics.
- Paid billing/subscription engine.
- Marketplace of freelancers.

## Demo Scenario

1. Import XLSX with several tenders.
2. Open one tender card.
3. Upload documentation.
4. Run AI analysis.
5. See decision card and extracted positions.
6. Create supplier request link.
7. Enter supplier quote through public form.
8. See quote comparison and preliminary margin.
