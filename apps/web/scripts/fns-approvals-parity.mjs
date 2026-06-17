import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(webRoot, "../..");

const fixturePath = resolve(repoRoot, "packages/shared/fns-connector-gate.json");
const apiServicePath = resolve(repoRoot, "apps/api/app/services/connectors.py");
const sourcesPagePath = resolve(webRoot, "app/sources/page.tsx");

const fixture = JSON.parse(readFileSync(fixturePath, "utf8"));
const apiService = readFileSync(apiServicePath, "utf8");
const sourcesPage = readFileSync(sourcesPagePath, "utf8");
const failures = [];

if (!apiService.includes("packages/shared/fns-connector-gate.json")) {
  failures.push("API connectors service must load packages/shared/fns-connector-gate.json");
}

if (!sourcesPage.includes("../../../../packages/shared/fns-connector-gate.json")) {
  failures.push("/sources page must import packages/shared/fns-connector-gate.json");
}

validateFixture();

if (failures.length > 0) {
  console.error("FAIL FNS approvals shared fixture parity");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS FNS approvals shared fixture parity (${fixture.required_approvals.length} approvals)`);

function validateFixture() {
  assert(fixture.connector_id === "fns-egrul-nalog-ru", "FNS gate connector_id must stay fns-egrul-nalog-ru");
  assert(fixture.source_kind === "fns", "FNS gate source_kind must stay fns");
  assert(fixture.status === "contract_only", "FNS gate status must stay contract_only");
  assert(fixture.owner === "Legal", "FNS gate owner must stay Legal");
  assert(fixture.safe_test_pair_required === true, "FNS gate must require safe INN/OGRN pair");
  assert(
    fixture.ci_policy === "CI must not call FNS until the real-network gate is explicitly approved.",
    "FNS gate CI policy changed",
  );
  assert(Array.isArray(fixture.required_approvals), "FNS gate must include required_approvals");

  const expectedApprovals = [
    "approved official access terms",
    "approved request volume limits",
    "GitHub secrets are present in protected environment",
    "safe test INN and OGRN pair is recorded",
    "raw artifact checksum and freshness receipt are asserted",
  ];
  assert(
    fixture.required_approvals.join("\n") === expectedApprovals.join("\n"),
    "FNS required approvals must match the contract exactly and keep order",
  );
}

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
