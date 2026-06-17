import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const checks = [
  [
    "tender position schema",
    () => validateSchemaFile("ai-schemas/tender-position-extraction.schema.json", {
      requiredRootFields: ["schema_version", "tender_id", "source_document_id", "positions"],
      requiredEvidenceFields: ["document_id", "raw_artifact_id", "page_or_sheet", "quote"],
    }),
  ],
  [
    "supplier quote schema",
    () => validateSchemaFile("ai-schemas/supplier-quote-normalization.schema.json", {
      requiredRootFields: ["schema_version", "tender_id", "supplier", "quote_lines", "source_refs", "confidence"],
      requiredEvidenceFields: ["document_id", "raw_artifact_id", "page_or_sheet", "quote"],
    }),
  ],
  [
    "tender position example",
    () =>
      validateAgainstSchema(
        readJson("ai-schemas/examples/tender-position-extraction.example.json"),
        readJson("ai-schemas/tender-position-extraction.schema.json"),
        "tender-position-example",
      ),
  ],
  [
    "supplier quote example",
    () =>
      validateAgainstSchema(
        readJson("ai-schemas/examples/supplier-quote-normalization.example.json"),
        readJson("ai-schemas/supplier-quote-normalization.schema.json"),
        "supplier-quote-example",
      ),
  ],
  ["demo data fixture", validateDemoData],
  ["source owner receipts fixture", validateSourceOwnerReceipts],
  ["FNS connector gate fixture", validateFnsConnectorGate],
  ["AI review queue fixture", validateAiReviewQueue],
];

const failures = [];

for (const [label, check] of checks) {
  try {
    check();
    console.log(`PASS ${label}`);
  } catch (error) {
    failures.push(`${label}: ${error.message}`);
    console.error(`FAIL ${label}`);
    console.error(`  ${error.message}`);
  }
}

if (failures.length > 0) {
  console.error(`\nShared validation failed with ${failures.length} error(s).`);
  process.exit(1);
}

console.log(`Shared validation passed for ${checks.length} check(s).`);

function readJson(relativePath) {
  const absolutePath = resolve(packageRoot, relativePath);
  return JSON.parse(readFileSync(absolutePath, "utf8"));
}

function validateSchemaFile(relativePath, options) {
  const schema = readJson(relativePath);

  assert(schema.$schema?.includes("json-schema.org"), `${relativePath} must declare JSON Schema draft`);
  assert(schema.$id?.startsWith("https://asts.local/schemas/"), `${relativePath} must use ASTS schema id`);
  assert(schema.type === "object", `${relativePath} root type must be object`);
  assert(schema.additionalProperties === false, `${relativePath} root must reject additional properties`);
  assertArrayIncludes(schema.required, options.requiredRootFields, `${relativePath} root required fields`);

  const sourceRef = schema.definitions?.source_ref;
  assert(sourceRef, `${relativePath} must define source_ref`);
  assert(sourceRef.additionalProperties === false, `${relativePath} source_ref must reject additional properties`);
  assertArrayIncludes(sourceRef.required, options.requiredEvidenceFields, `${relativePath} source_ref required fields`);
}

function validateDemoData() {
  const demoData = readJson("demo-data/asts-demo.json");
  assert(Array.isArray(demoData.tenders) && demoData.tenders.length > 0, "demo-data must include tenders");
  assert(Array.isArray(demoData.documents) && demoData.documents.length > 0, "demo-data must include documents");
  assert(Array.isArray(demoData.tasks) && demoData.tasks.length > 0, "demo-data must include tasks");

  const tenderIds = new Set();
  const tenderSources = new Map();
  const outcomeFunnels = {
    pre_win: new Set([
      "won",
      "lost_competition",
      "rejected_before_submission",
      "deadline_expired",
      "unprofitable",
      "cancelled_by_customer",
      "manual_management",
    ]),
    execution: new Set(["not_paid", "not_accepted", "penalties", "refund", "partial_payment"]),
  };

  for (const tender of demoData.tenders) {
    assertNonEmptyString(tender.tender_id, "tender.tender_id");
    assert(!tenderIds.has(tender.tender_id), `duplicate tender_id ${tender.tender_id}`);
    tenderIds.add(tender.tender_id);
    validateSourceEvidence(tender.source, `tender ${tender.tender_id}`);
    tenderSources.set(tender.tender_id, tender.source);
    assert(["pre_win", "execution"].includes(tender.funnel), `invalid funnel for ${tender.tender_id}`);
    assert(typeof tender.ai_confidence === "number", `missing ai_confidence for ${tender.tender_id}`);
    validateOutcome(tender.outcome, tender, outcomeFunnels);
    validateAuditEvents(tender.audit_events, tender);
  }

  for (const document of demoData.documents) {
    assert(tenderIds.has(document.tender_id), `document ${document.document_id} references unknown tender`);
    const source = document.source ?? tenderSources.get(document.source_ref);
    assert(source, `document ${document.document_id} must have source or source_ref`);
    validateSourceEvidence(source, `document ${document.document_id}`);
    validateRawArtifact(document.raw_artifact, `document ${document.document_id}`);
    assert(document.raw_artifact.artifact_id === source.raw_artifact_id, `artifact/source mismatch for ${document.document_id}`);
    assert(document.raw_artifact.storage_path === document.storage_path, `storage_path mismatch for ${document.document_id}`);
    assert(document.raw_artifact.checksum_sha256 === source.checksum_sha256, `checksum mismatch for ${document.document_id}`);
  }

  for (const task of demoData.tasks) {
    assert(tenderIds.has(task.tender_id), `task ${task.task_id} references unknown tender`);
    assert(typeof task.requires_human_approval === "boolean", `task ${task.task_id} must declare approval gate`);
  }
}

function validateSourceOwnerReceipts() {
  const fixture = readJson("source-owner-receipts.json");
  assert(fixture.version === "0.1.0", "source owner receipts version must stay 0.1.0");
  assertNonEmptyString(fixture.rule, "source owner receipts rule");
  assert(Array.isArray(fixture.receipt_required_fields), "source owner receipts must include receipt_required_fields");
  assert(Array.isArray(fixture.rules) && fixture.rules.length === 4, "source owner receipts must include 4 rules");
  assert(Array.isArray(fixture.history) && fixture.history.length === 4, "source owner receipts must include 4 history rows");

  const requiredFields = new Set(fixture.receipt_required_fields);
  for (const field of [
    "breach_id",
    "owner_id",
    "owner_role",
    "action",
    "resolution_status",
    "resolved_at",
    "new_raw_artifact_id",
    "new_checksum_sha256",
    "audit_note",
  ]) {
    assert(requiredFields.has(field), `source owner receipts missing required field ${field}`);
  }

  const expectedActions = {
    stale: "refresh_primary_payload",
    missing: "fetch_missing_artifact",
    parse_failed: "manual_schema_review",
    hash_mismatch: "refetch_and_compare",
  };
  const breachTypes = new Set();
  for (const rule of fixture.rules) {
    breachTypes.add(rule.breach_type);
    assert(expectedActions[rule.breach_type] === rule.action, `wrong owner receipt action for ${rule.breach_type}`);
    assertNonEmptyString(rule.owner_role, `owner receipt owner_role for ${rule.breach_type}`);
    assertArrayIncludes(rule.allowed_resolution_statuses, ["restored"], `owner receipt statuses for ${rule.breach_type}`);
    assert(Array.isArray(rule.required_fields_extra), `owner receipt extra fields for ${rule.breach_type}`);
    assert(
      rule.ai_gate_unlock_condition?.includes('resolution_status="restored"'),
      `owner receipt unlock condition for ${rule.breach_type} must require restored`,
    );
    assertNonEmptyString(rule.evidence_rule, `owner receipt evidence rule for ${rule.breach_type}`);
  }
  assertArrayIncludes([...breachTypes], ["stale", "missing", "parse_failed", "hash_mismatch"], "owner receipt breach types");

  const historyStatuses = new Set();
  const historyAiGates = new Set();
  const historyIds = new Set();
  for (const receipt of fixture.history) {
    assertNonEmptyString(receipt.id, "owner receipt history id");
    assert(!historyIds.has(receipt.id), `duplicate owner receipt history id ${receipt.id}`);
    historyIds.add(receipt.id);
    assert(expectedActions[receipt.breach_type] === receipt.action, `wrong owner receipt history action for ${receipt.breach_type}`);
    assertNonEmptyString(receipt.owner_role, `owner receipt history owner for ${receipt.id}`);
    assertNonEmptyString(receipt.raw_artifact_id, `owner receipt history raw artifact for ${receipt.id}`);
    assertNonEmptyString(receipt.checksum_sha256, `owner receipt history checksum for ${receipt.id}`);
    assertNonEmptyString(receipt.audit_note, `owner receipt history audit note for ${receipt.id}`);
    historyStatuses.add(receipt.resolution_status);
    historyAiGates.add(receipt.ai_gate);
  }
  assertArrayIncludes([...historyStatuses], ["restored", "accepted_with_note", "still_blocked"], "owner receipt history statuses");
  assertArrayIncludes([...historyAiGates], ["ready_after_receipt", "blocked_until_restored"], "owner receipt history AI gates");
  assert(
    fixture.history.filter((receipt) => receipt.ai_gate === "blocked_until_restored").length === 2,
    "owner receipt history must keep 2 blocked_until_restored rows",
  );
}

function validateFnsConnectorGate() {
  const fixture = readJson("fns-connector-gate.json");
  assert(fixture.connector_id === "fns-egrul-nalog-ru", "FNS connector gate connector_id must stay fns-egrul-nalog-ru");
  assert(fixture.source_kind === "fns", "FNS connector gate source_kind must stay fns");
  assert(fixture.status === "contract_only", "FNS connector gate status must stay contract_only");
  assert(fixture.owner === "Legal", "FNS connector gate owner must stay Legal");
  assert(fixture.safe_test_pair_required === true, "FNS connector gate must require safe test pair");
  assert(
    fixture.ci_policy === "CI must not call FNS until the real-network gate is explicitly approved.",
    "FNS connector gate CI policy changed",
  );
  assert(Array.isArray(fixture.required_approvals), "FNS connector gate must include approvals");
  assertArrayIncludes(
    fixture.required_approvals,
    [
      "approved official access terms",
      "approved request volume limits",
      "GitHub secrets are present in protected environment",
      "safe test INN and OGRN pair is recorded",
      "raw artifact checksum and freshness receipt are asserted",
    ],
    "FNS connector gate approvals",
  );
  assert(fixture.required_approvals.length === 5, "FNS connector gate must keep exactly 5 approvals");
}

function validateAiReviewQueue() {
  const fixture = readJson("ai-review-queue.json");
  assert(fixture.version === "0.1.0", "AI review queue version must stay 0.1.0");
  assertNonEmptyString(fixture.rule, "AI review queue rule");
  assert(fixture.confidence_threshold === 0.85, "AI review queue threshold must stay 0.85");
  assert(fixture.blocked_below_confidence === 0.75, "AI review blocked threshold must stay 0.75");
  assert(Array.isArray(fixture.queue) && fixture.queue.length === 3, "AI review queue must include 3 rows");

  const expectedMatrix = {
    requirement: ["tender_manager", "confirm requirement interpretation before supplier request", "review_required", 0.82],
    supplier_quote: ["supplier_manager", "request supplier clarification and keep economics blocked", "blocked", 0.64],
    economics: ["finance_owner", "finance owner must approve or keep outcome locked", "blocked", 0.74],
  };
  const factTypes = new Set();

  for (const item of fixture.queue) {
    const expected = expectedMatrix[item.fact_type];
    assert(expected, `unexpected AI review fact type ${item.fact_type}`);
    if (!expected) {
      continue;
    }

    factTypes.add(item.fact_type);
    assertNonEmptyString(item.tender_id, `AI review tender_id for ${item.fact_type}`);
    assert(Object.hasOwn(item, "document_id"), `AI review document_id for ${item.fact_type} must be present`);
    assertNonEmptyString(item.title, `AI review title for ${item.fact_type}`);
    assertNonEmptyString(item.extracted_value, `AI review extracted_value for ${item.fact_type}`);
    assert(item.confidence === expected[3], `AI review confidence for ${item.fact_type}`);
    assert(item.confidence < fixture.confidence_threshold, `AI review ${item.fact_type} must stay below threshold`);
    assert(item.owner_role === expected[0], `AI review owner_role for ${item.fact_type}`);
    assert(item.required_action === expected[1], `AI review action for ${item.fact_type}`);
    assert(
      (item.confidence < fixture.blocked_below_confidence ? "blocked" : "review_required") === expected[2],
      `AI review derived status for ${item.fact_type}`,
    );
    assertNonEmptyString(item.reason, `AI review reason for ${item.fact_type}`);
    assert(item.source_host === "zakupki.gov.ru", `AI review source_host for ${item.fact_type}`);
  }

  assertArrayIncludes([...factTypes], ["requirement", "supplier_quote", "economics"], "AI review fact types");
}

function validateOutcome(outcome, tender, outcomeFunnels) {
  assert(outcome, `tender ${tender.tender_id} must include outcome snapshot`);
  assert(outcome.funnel === tender.funnel, `outcome funnel mismatch for ${tender.tender_id}`);
  assert(outcomeFunnels[tender.funnel].has(outcome.code), `invalid outcome code ${outcome.code} for ${tender.funnel}`);
  assert(["suggested", "approved", "locked"].includes(outcome.status), `invalid outcome status for ${tender.tender_id}`);
  assert(typeof outcome.requires_owner_approval === "boolean", `outcome approval gate missing for ${tender.tender_id}`);
  assertNonEmptyString(outcome.owner_role, `outcome owner missing for ${tender.tender_id}`);
  assertNonEmptyString(outcome.source_ref, `outcome source_ref missing for ${tender.tender_id}`);
  assertNonEmptyString(outcome.note, `outcome note missing for ${tender.tender_id}`);
}

function validateAuditEvents(auditEvents, tender) {
  assert(Array.isArray(auditEvents) && auditEvents.length > 0, `tender ${tender.tender_id} must include audit events`);
  for (const event of auditEvents) {
    assertNonEmptyString(event.event_id, `audit event_id missing for ${tender.tender_id}`);
    assert(event.tender_id === tender.tender_id, `audit tender_id mismatch for ${event.event_id}`);
    assertNonEmptyString(event.action, `audit action missing for ${event.event_id}`);
    assertNonEmptyString(event.actor_role, `audit actor_role missing for ${event.event_id}`);
    assertNonEmptyString(event.created_at, `audit created_at missing for ${event.event_id}`);
    assertNonEmptyString(event.evidence_ref, `audit evidence_ref missing for ${event.event_id}`);
  }
}

function validateAgainstSchema(data, schema, label) {
  validateNode(data, schema, schema, label);
}

function validateNode(value, node, rootSchema, path) {
  if (node.$ref) {
    return validateNode(value, resolveRef(rootSchema, node.$ref), rootSchema, path);
  }

  if (node.const !== undefined) {
    assert(value === node.const, `${path} must equal ${JSON.stringify(node.const)}`);
  }

  if (node.enum) {
    assert(node.enum.includes(value), `${path} must be one of ${node.enum.join(", ")}`);
  }

  if (node.type) {
    validateType(value, node.type, path);
  }

  if (typeof value === "string") {
    if (node.minLength !== undefined) {
      assert(value.length >= node.minLength, `${path} must have length >= ${node.minLength}`);
    }
    if (node.format === "date") {
      assert(/^\d{4}-\d{2}-\d{2}$/.test(value), `${path} must be YYYY-MM-DD`);
    }
  }

  if (typeof value === "number") {
    if (node.minimum !== undefined) {
      assert(value >= node.minimum, `${path} must be >= ${node.minimum}`);
    }
    if (node.maximum !== undefined) {
      assert(value <= node.maximum, `${path} must be <= ${node.maximum}`);
    }
    if (node.exclusiveMinimum !== undefined) {
      assert(value > node.exclusiveMinimum, `${path} must be > ${node.exclusiveMinimum}`);
    }
  }

  if (Array.isArray(value)) {
    if (node.minItems !== undefined) {
      assert(value.length >= node.minItems, `${path} must contain at least ${node.minItems} item(s)`);
    }
    if (node.items) {
      value.forEach((item, index) => validateNode(item, node.items, rootSchema, `${path}[${index}]`));
    }
  }

  if (value && typeof value === "object" && !Array.isArray(value)) {
    if (node.required) {
      for (const field of node.required) {
        assert(Object.hasOwn(value, field), `${path}.${field} is required`);
      }
    }
    if (node.additionalProperties === false && node.properties) {
      for (const field of Object.keys(value)) {
        assert(Object.hasOwn(node.properties, field), `${path}.${field} is not allowed`);
      }
    }
    if (node.properties) {
      for (const [field, childNode] of Object.entries(node.properties)) {
        if (Object.hasOwn(value, field)) {
          validateNode(value[field], childNode, rootSchema, `${path}.${field}`);
        }
      }
    }
  }
}

function resolveRef(rootSchema, ref) {
  const parts = ref.split("/");
  assert(parts[0] === "#" && parts[1] === "definitions", `unsupported ref ${ref}`);
  const definition = rootSchema.definitions?.[parts[2]];
  assert(definition, `missing definition ${ref}`);
  return definition;
}

function validateType(value, type, path) {
  const types = Array.isArray(type) ? type : [type];
  const valid = types.some((candidate) => {
    if (candidate === "array") return Array.isArray(value);
    if (candidate === "integer") return Number.isInteger(value);
    if (candidate === "null") return value === null;
    if (candidate === "number") return typeof value === "number" && Number.isFinite(value);
    if (candidate === "object") return value !== null && typeof value === "object" && !Array.isArray(value);
    return typeof value === candidate;
  });
  assert(valid, `${path} must be type ${types.join(" or ")}`);
}

function validateSourceEvidence(source, label) {
  assert(source, `${label} must include source evidence`);
  assertNonEmptyString(source.source_kind, `${label}.source_kind`);
  assertNonEmptyString(source.source_url, `${label}.source_url`);
  assertNonEmptyString(source.raw_artifact_id, `${label}.raw_artifact_id`);
  assertChecksum(source.checksum_sha256, `${label}.checksum_sha256`);
  assertNonEmptyString(source.freshness, `${label}.freshness`);
}

function validateRawArtifact(rawArtifact, label) {
  const custodyStatuses = new Set(["raw_saved", "checksum_verified", "parsed", "quarantine"]);

  assert(rawArtifact, `${label} must include raw_artifact`);
  assertNonEmptyString(rawArtifact.artifact_id, `${label}.raw_artifact.artifact_id`);
  assertNonEmptyString(rawArtifact.storage_path, `${label}.raw_artifact.storage_path`);
  assertNonEmptyString(rawArtifact.source_url, `${label}.raw_artifact.source_url`);
  assertChecksum(rawArtifact.checksum_sha256, `${label}.raw_artifact.checksum_sha256`);
  assertNonEmptyString(rawArtifact.content_type, `${label}.raw_artifact.content_type`);
  assertNonEmptyString(rawArtifact.collected_at, `${label}.raw_artifact.collected_at`);
  assertNonEmptyString(rawArtifact.custody_status, `${label}.raw_artifact.custody_status`);
  assert(
    custodyStatuses.has(rawArtifact.custody_status),
    `${label}.raw_artifact.custody_status must be raw_saved, checksum_verified, parsed or quarantine`,
  );
}

function assertArrayIncludes(actual, expected, label) {
  assert(Array.isArray(actual), `${label} must be an array`);
  for (const item of expected) {
    assert(actual.includes(item), `${label} must include ${item}`);
  }
}

function assertNonEmptyString(value, label) {
  assert(typeof value === "string" && value.length > 0, `${label} must be a non-empty string`);
}

function assertChecksum(value, label) {
  assert(typeof value === "string" && /^[a-f0-9]{64}$/.test(value), `${label} must be sha256 hex`);
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}
