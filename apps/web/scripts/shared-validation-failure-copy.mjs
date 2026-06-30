import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedFailingCommand = "npm run smoke:shared-validation-live-route";
const expectedNoMergeCopy =
  "Не мержить, пока `/plan`, packages/shared/** и .github/workflows/shared-validation.yml снова не проходят 14 shared checks";
const expectedPlanMarker = 'data-testid="shared-validation-failure-copy"';
const expectedRepairTargets = "/plan,packages/shared/**,.github/workflows/shared-validation.yml,docs/19-continuation-70-step-plan-ru.md";
const expectedSelfCommand = "npm run smoke:shared-validation-failure-copy";
const expectedSourceMarker = 'data-testid="shared-validation-live-route-gate-note"';
const expectedWorkflowPath = ".github/workflows/web-build.yml";
const expectedWorkflowName = "Web build";

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(webRoot, "../..");
const planPagePath = resolve(webRoot, "app/plan/page.tsx");
const workflowPath = resolve(repoRoot, expectedWorkflowPath);

const planPage = readFileSync(planPagePath, "utf8");
const workflow = readFileSync(workflowPath, "utf8");
const failures = [];

assert(workflow.includes(`name: ${expectedWorkflowName}`), "workflow must keep Web build name");
assert(workflow.includes(`run: ${expectedSelfCommand}`), "Web build must run shared validation failure copy smoke");
assert(workflow.includes(`run: ${expectedFailingCommand}`), "Web build must keep shared validation live route gate command");
assert(
  workflow.indexOf(`run: ${expectedFailingCommand}`) < workflow.indexOf(`run: ${expectedSelfCommand}`),
  "shared validation failure copy smoke must run after live route gate smoke",
);
assert(
  workflow.indexOf(`run: ${expectedSelfCommand}`) < workflow.indexOf("npm run smoke -- --url http://127.0.0.1:4177/"),
  "shared validation failure copy smoke must run before live rendered route smoke",
);

assert(planPage.includes(expectedSourceMarker), "/plan must keep shared validation live route gate marker");
assert(planPage.includes(expectedPlanMarker), "/plan must expose shared validation failure copy marker");
assert(planPage.includes("sharedValidationFailureCopy"), "/plan must expose shared validation failure copy data");
assert(planPage.includes(expectedFailingCommand), "/plan must expose failing shared validation command");
assert(planPage.includes(expectedRepairTargets), "/plan must expose shared validation repair targets");
assert(planPage.includes("Schema owner + CI owner"), "/plan must expose shared validation owner role");
assert(planPage.includes("data-check-count={sharedValidationFailureCopy.checkCount}"), "/plan must expose shared validation check count");
assert(planPage.includes(expectedNoMergeCopy), "/plan must show owner-friendly no-merge copy");
assert(planPage.includes(`workflowPath: "${expectedWorkflowPath}"`), "/plan must expose Web build workflow path");

if (failures.length > 0) {
  console.error("FAIL shared validation failure copy");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS shared validation failure copy (${expectedFailingCommand})`);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
