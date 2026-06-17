import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(webRoot, "../..");

const fixturePath = resolve(repoRoot, "packages/shared/source-owner-receipts.json");
const apiServicePath = resolve(repoRoot, "apps/api/app/services/source_owner_receipts.py");
const sourcesPagePath = resolve(webRoot, "app/sources/page.tsx");

const fixture = JSON.parse(readFileSync(fixturePath, "utf8"));
const apiService = readFileSync(apiServicePath, "utf8");
const sourcesPage = readFileSync(sourcesPagePath, "utf8");

const failures = [];

if (!apiService.includes("packages/shared/source-owner-receipts.json")) {
  failures.push("API service must load packages/shared/source-owner-receipts.json");
}

if (!sourcesPage.includes("../../../../packages/shared/source-owner-receipts.json")) {
  failures.push("/sources page must import packages/shared/source-owner-receipts.json");
}

validateFixtureShape();
validateHistoryMatrix();
validateRuleMatrix();

if (failures.length > 0) {
  console.error("FAIL source owner receipt shared fixture parity");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS source owner receipt shared fixture parity (${fixture.rules.length} rules, ${fixture.history.length} history rows)`);

function validateFixtureShape() {
  assert(fixture.version === "0.1.0", "fixture version must stay 0.1.0");
  assert(typeof fixture.rule === "string" && fixture.rule.includes("explicit owner receipts"), "fixture rule must describe explicit owner receipts");
  assert(Array.isArray(fixture.receipt_required_fields), "fixture must include receipt_required_fields");
  assert(Array.isArray(fixture.rules) && fixture.rules.length === 4, "fixture must include 4 owner receipt rules");
  assert(Array.isArray(fixture.history) && fixture.history.length === 4, "fixture must include 4 owner receipt history rows");

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
    assert(fixture.receipt_required_fields.includes(field), `receipt_required_fields must include ${field}`);
  }
}

function validateRuleMatrix() {
  const expectedActions = {
    stale: "refresh_primary_payload",
    missing: "fetch_missing_artifact",
    parse_failed: "manual_schema_review",
    hash_mismatch: "refetch_and_compare",
  };
  const breachTypes = new Set();

  for (const rule of fixture.rules) {
    breachTypes.add(rule.breach_type);
    assert(rule.action === expectedActions[rule.breach_type], `wrong action for ${rule.breach_type}`);
    assert(Array.isArray(rule.allowed_resolution_statuses), `${rule.breach_type} must declare allowed statuses`);
    assert(rule.allowed_resolution_statuses.includes("restored"), `${rule.breach_type} must allow restored status`);
    assert(Array.isArray(rule.required_fields_extra), `${rule.breach_type} must declare extra required fields`);
    assert(rule.ai_gate_unlock_condition.includes('resolution_status="restored"'), `${rule.breach_type} must require restored unlock`);
    assert(typeof rule.evidence_rule === "string" && rule.evidence_rule.length > 0, `${rule.breach_type} must declare evidence rule`);
  }

  assert(
    equalSets(breachTypes, new Set(["stale", "missing", "parse_failed", "hash_mismatch"])),
    "rule breach types must be stale/missing/parse_failed/hash_mismatch",
  );
}

function validateHistoryMatrix() {
  const statuses = new Set();
  const aiGates = new Set();
  const ids = new Set();

  for (const receipt of fixture.history) {
    assert(!ids.has(receipt.id), `duplicate receipt id ${receipt.id}`);
    ids.add(receipt.id);
    statuses.add(receipt.resolution_status);
    aiGates.add(receipt.ai_gate);
    assert(receipt.raw_artifact_id, `${receipt.id} must keep raw_artifact_id`);
    assert(receipt.checksum_sha256, `${receipt.id} must keep checksum_sha256`);
    assert(receipt.audit_note, `${receipt.id} must keep audit_note`);
  }

  assert(equalSets(statuses, new Set(["restored", "accepted_with_note", "still_blocked"])), "history statuses must match contract");
  assert(equalSets(aiGates, new Set(["ready_after_receipt", "blocked_until_restored"])), "history AI gates must match contract");
  assert(
    fixture.history.filter((receipt) => receipt.ai_gate === "blocked_until_restored").length === 2,
    "history must keep exactly 2 blocked_until_restored rows",
  );
}

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}

function equalSets(left, right) {
  return left.size === right.size && [...left].every((value) => right.has(value));
}
