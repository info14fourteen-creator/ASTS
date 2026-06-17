import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedFailingCommand = "npm run smoke:api-readme-live-route";
const expectedLiveCommand = "npm run smoke:ai-review-api-readme -- --url http://127.0.0.1:4177";
const expectedNoMergeCopy =
  "Не мержить, пока Web build снова держит API README live-route gate перед rendered routes parity checks";
const expectedPlanMarker = 'data-testid="api-readme-live-route-failure-copy"';
const expectedRepairTargets =
  ".github/workflows/web-build.yml,/plan,apps/web/scripts/api-readme-live-route-gate.mjs,apps/web/scripts/smoke.mjs";
const expectedSelfCommand = "npm run smoke:api-readme-live-route-failure-copy";
const expectedSourceMarker = 'data-testid="api-readme-live-route-gate-note"';
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
assert(workflow.includes(`run: ${expectedSelfCommand}`), "Web build must run API README live route failure copy smoke");
assert(workflow.includes(`run: ${expectedFailingCommand}`), "Web build must keep API README live route gate smoke");
assert(workflow.includes(expectedLiveCommand), "Web build must keep live AI review API README parity command");
assert(
  workflow.indexOf(`run: ${expectedFailingCommand}`) < workflow.indexOf(`run: ${expectedSelfCommand}`),
  "API README live route failure copy smoke must run after API README live route gate smoke",
);
assert(
  workflow.indexOf(`run: ${expectedSelfCommand}`) < workflow.indexOf(expectedLiveCommand),
  "API README live route failure copy smoke must run before rendered route live parity command",
);

assert(planPage.includes(expectedSourceMarker), "/plan must keep API README live route gate marker");
assert(planPage.includes(expectedPlanMarker), "/plan must expose API README live route failure copy marker");
assert(planPage.includes("apiReadmeLiveRouteFailureCopy"), "/plan must expose API README live route failure copy data");
assert(planPage.includes(expectedFailingCommand), "/plan must expose failing API README live route command");
assert(planPage.includes(expectedLiveCommand), "/plan must expose live parity command");
assert(planPage.includes(expectedRepairTargets), "/plan must expose API README live route repair targets");
assert(planPage.includes("API owner + CI owner"), "/plan must expose API README live route owner role");
assert(planPage.includes(expectedNoMergeCopy), "/plan must show owner-friendly no-merge copy");
assert(planPage.includes(`workflowPath: "${expectedWorkflowPath}"`), "/plan must expose Web build workflow path");

if (failures.length > 0) {
  console.error("FAIL API README live route failure copy");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS API README live route failure copy (${expectedFailingCommand})`);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
