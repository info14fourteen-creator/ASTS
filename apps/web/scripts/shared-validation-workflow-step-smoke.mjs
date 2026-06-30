import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedCommand = "npm run smoke:shared-validation-workflow-step";
const expectedPlanMarker = 'data-testid="shared-validation-workflow-step-smoke"';
const expectedSourceCommandLine = "run: npm run smoke:shared-validation-workflow";
const expectedSourceMarker = 'data-testid="shared-validation-workflow-ci-note"';
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
assert(workflow.includes(expectedSourceCommandLine), "Web build must run shared validation workflow file smoke");
assert(workflow.includes(`run: ${expectedCommand}`), "Web build must run shared validation workflow step smoke");
assert(
  workflow.indexOf(expectedSourceCommandLine) < workflow.indexOf(`run: ${expectedCommand}`),
  "shared validation workflow step smoke must run after the source workflow file smoke",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf("npm run smoke -- --url http://127.0.0.1:4177/"),
  "shared validation workflow step smoke must run before live rendered route smoke",
);

assert(planPage.includes(expectedSourceMarker), "/plan must keep shared validation workflow CI note marker");
assert(planPage.includes(expectedPlanMarker), "/plan must expose shared validation workflow step smoke marker");
assert(planPage.includes(expectedCommand), "/plan must expose shared validation workflow step smoke command");
assert(planPage.includes(`workflowPath: "${expectedWorkflowPath}"`), "/plan must expose Web build workflow path");
assert(
  planPage.includes("sharedValidationWorkflowStepSmoke"),
  "/plan must expose shared validation workflow step smoke data",
);

if (failures.length > 0) {
  console.error("FAIL shared validation workflow step smoke");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS shared validation workflow step smoke (${expectedCommand})`);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
