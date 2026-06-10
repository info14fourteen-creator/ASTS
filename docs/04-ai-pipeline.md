# AI Pipeline

## Principle

AI output must be structured, reviewable, and traceable to source documents. The system should show confidence and source references instead of pretending every extraction is certain.

## Pipeline

### 1. Document Ingestion

Input:

- PDF
- DOCX
- XLSX
- ZIP archives
- Tender source URL

Output:

- Original file in object storage.
- Extracted text.
- Extracted tables.
- Document metadata.

### 2. Chunking and Indexing

Split documents into chunks by page, heading, table, and semantic section.

Store:

- chunk text
- document id
- page/sheet
- embedding
- detected section type

### 3. Structured Extraction

Extract into strict schemas:

- Tender facts.
- Requirements.
- Risks.
- Product/service positions.
- Dates and deadlines.
- Security deposits.
- Required documents.

Every extracted item should include:

- value
- confidence
- source reference
- reviewer status

### 4. AI Decision Card

Generate:

- short summary
- recommended action
- reasons to participate
- reasons to reject
- missing data
- specialist review tasks

Allowed recommendation values:

- participate
- reject
- manual_review

### 5. Supplier Request Generation

Generate a clear supplier email/request:

- tender context
- list of required positions
- response deadline
- link to quote form
- required attachments

Human approval is required before mass sending in MVP.

### 6. Quote Normalization

Supplier quotes may arrive through:

- public form
- email
- uploaded PDF/XLSX invoice

AI can normalize uploaded files into quote lines, but the purchasing specialist must approve imported prices before profitability calculation.

### 7. Tender Q&A

Users can ask questions over uploaded tender documents:

- "Какие требования к участнику?"
- "Есть обеспечение заявки?"
- "Какие сроки поставки?"
- "Какие документы нужно подать?"

Answers must include source document references.

## Safety Rules

- Do not auto-submit tenders.
- Do not hide low-confidence extraction.
- Do not overwrite supplier prices without audit trail.
- Do not make legal conclusions without review.
- Keep all AI prompts and responses logged for debug and audit.
