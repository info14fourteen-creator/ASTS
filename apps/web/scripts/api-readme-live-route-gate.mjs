import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedLiveCommand = "npm run smoke:ai-review-api-readme -- --url http://127.0.0.1:4177";
const expectedPlanMarker = 'data-testid="api-readme-live-route-gate-note"';
const expectedRouteSmokeCommand = "npm run smoke -- --url http://127.0.0.1:4177/";
const expectedSelfCommand = "npm run smoke:api-readme-live-route";
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
assert(workflow.includes(`run: ${expectedSelfCommand}`), "Web build must run API README live route gate smoke");
assert(workflow.includes(expectedRouteSmokeCommand), "Web build must keep rendered route smoke");
assert(workflow.includes(expectedLiveCommand), "Web build must keep live AI review API README parity command");
assert(
  workflow.indexOf(expectedRouteSmokeCommand) < workflow.indexOf(expectedLiveCommand),
  "AI review API README live parity must run after rendered route smoke starts the server",
);

assert(planPage.includes('data-testid="ai-review-api-readme-ci-note"'), "/plan must keep AI review API README CI note marker");
assert(planPage.includes(expectedPlanMarker), "/plan must expose API README live route gate note marker");
assert(planPage.includes(expectedLiveCommand), "/plan must expose live AI review API README command");
assert(planPage.includes(`workflowPath: "${expectedWorkflowPath}"`), "/plan must expose Web build workflow path");
assert(planPage.includes("apiReadmeLiveRouteGateNote"), "/plan must expose API README live route gate note data");

if (failures.length > 0) {
  console.error("FAIL API README live route gate");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS API README live route gate (${expectedLiveCommand})`);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
