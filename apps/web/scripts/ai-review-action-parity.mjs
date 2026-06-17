import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(webRoot, "../..");

const fixturePath = resolve(repoRoot, "packages/shared/ai-review-queue.json");
const apiServicePath = resolve(repoRoot, "apps/api/app/services/ai_review.py");
const aiReviewPagePath = resolve(webRoot, "app/ai-review/page.tsx");

const fixture = JSON.parse(readFileSync(fixturePath, "utf8"));
const apiService = readFileSync(apiServicePath, "utf8");
const aiReviewPage = readFileSync(aiReviewPagePath, "utf8");
const failures = [];

if (!apiService.includes("packages/shared/ai-review-queue.json")) {
  failures.push("API AI review service must load packages/shared/ai-review-queue.json");
}

if (!aiReviewPage.includes("../../../../packages/shared/ai-review-queue.json")) {
  failures.push("/ai-review page must import packages/shared/ai-review-queue.json");
}

if (!aiReviewPage.includes("data-required-action={item.action}")) {
  failures.push("/ai-review cards must expose data-required-action for browser smoke and handoff traceability");
}

validateFixture();

if (failures.length > 0) {
  console.error("FAIL AI review shared fixture parity");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS AI review shared fixture parity (${fixture.queue.length} rows)`);

function validateFixture() {
  assert(fixture.version === "0.1.0", "AI review fixture version must stay 0.1.0");
  assert(fixture.confidence_threshold === 0.85, "AI review confidence threshold must stay 0.85");
  assert(fixture.blocked_below_confidence === 0.75, "AI review blocked threshold must stay 0.75");
  assert(Array.isArray(fixture.queue) && fixture.queue.length === 3, "AI review fixture must include 3 rows");

  const expectedMatrix = {
    requirement: {
      owner_role: "tender_manager",
      required_action: "confirm requirement interpretation before supplier request",
      status: "review_required",
      confidence: 0.82,
    },
    supplier_quote: {
      owner_role: "supplier_manager",
      required_action: "request supplier clarification and keep economics blocked",
      status: "blocked",
      confidence: 0.64,
    },
    economics: {
      owner_role: "finance_owner",
      required_action: "finance owner must approve or keep outcome locked",
      status: "blocked",
      confidence: 0.74,
    },
  };
  const seenFacts = new Set();

  for (const item of fixture.queue) {
    const expected = expectedMatrix[item.fact_type];
    assert(Boolean(expected), `unexpected AI review fact_type ${item.fact_type}`);
    if (!expected) {
      continue;
    }

    seenFacts.add(item.fact_type);
    assert(item.owner_role === expected.owner_role, `wrong owner_role for ${item.fact_type}`);
    assert(item.required_action === expected.required_action, `wrong required_action for ${item.fact_type}`);
    assert(item.confidence === expected.confidence, `wrong confidence for ${item.fact_type}`);
    assert(
      statusForConfidence(item.confidence) === expected.status,
      `wrong derived status for ${item.fact_type}`,
    );
    assert(item.confidence < fixture.confidence_threshold, `${item.fact_type} must stay below confidence threshold`);
    assert(item.tender_id, `${item.fact_type} must keep tender_id`);
    assert(Object.hasOwn(item, "document_id"), `${item.fact_type} must declare document_id even when null`);
    assert(item.title, `${item.fact_type} must keep title`);
    assert(item.extracted_value, `${item.fact_type} must keep extracted_value`);
    assert(item.reason, `${item.fact_type} must keep reason`);
    assert(item.source_host === "zakupki.gov.ru", `${item.fact_type} must keep source_host`);
  }

  assert(equalSets(seenFacts, new Set(["requirement", "supplier_quote", "economics"])), "AI review fact types must match contract");
}

function statusForConfidence(confidence) {
  return confidence < fixture.blocked_below_confidence ? "blocked" : "review_required";
}

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}

function equalSets(left, right) {
  return left.size === right.size && [...left].every((value) => right.has(value));
}
