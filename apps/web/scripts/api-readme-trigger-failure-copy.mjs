import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedFailingCommand = "npm run smoke:api-readme-trigger";
const expectedNoMergeCopy =
  "Не мержить, пока apps/api/README.md снова не запускает Web build в pull_request и push paths";
const expectedPlanMarker = 'data-testid="api-readme-trigger-failure-copy"';
const expectedRepairTargets =
  "apps/api/README.md,.github/workflows/web-build.yml,/plan,[data-testid='api-readme-trigger-smoke']";
const expectedSelfCommand = "npm run smoke:api-readme-trigger-failure-copy";
const expectedSourceMarker = 'data-testid="api-readme-trigger-smoke"';
const expectedTriggerPath = "apps/api/README.md";
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
assert(workflow.includes(`run: ${expectedSelfCommand}`), "Web build must run API README trigger failure copy smoke");
assert(workflow.includes(`run: ${expectedFailingCommand}`), "Web build must keep API README trigger smoke");
assert(countWorkflowPath(workflow, expectedTriggerPath) >= 2, "apps/api/README.md must trigger pull_request and push Web build");
assert(
  workflow.indexOf(`run: ${expectedFailingCommand}`) < workflow.indexOf(`run: ${expectedSelfCommand}`),
  "API README trigger failure copy smoke must run after trigger smoke",
);
assert(
  workflow.indexOf(`run: ${expectedSelfCommand}`) < workflow.indexOf("npm run smoke -- --url http://127.0.0.1:4177/"),
  "API README trigger failure copy smoke must run before live rendered route smoke",
);

assert(planPage.includes(expectedSourceMarker), "/plan must keep API README trigger smoke marker");
assert(planPage.includes(expectedPlanMarker), "/plan must expose API README trigger failure copy marker");
assert(planPage.includes("apiReadmeTriggerFailureCopy"), "/plan must expose API README trigger failure copy data");
assert(planPage.includes(expectedFailingCommand), "/plan must expose failing API README trigger command");
assert(planPage.includes(expectedRepairTargets), "/plan must expose API README trigger repair targets");
assert(planPage.includes("API owner + CI owner"), "/plan must expose API README trigger owner role");
assert(planPage.includes("data-expected-workflow-path-count={apiReadmeTriggerFailureCopy.expectedWorkflowPathCount}"), "/plan must expose workflow path count");
assert(planPage.includes(expectedNoMergeCopy), "/plan must show owner-friendly no-merge copy");
assert(planPage.includes(`workflowPath: "${expectedWorkflowPath}"`), "/plan must expose Web build workflow path");

if (failures.length > 0) {
  console.error("FAIL API README trigger failure copy");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS API README trigger failure copy (${expectedTriggerPath})`);

function countWorkflowPath(content, path) {
  return content.split(`- "${path}"`).length - 1;
}

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
