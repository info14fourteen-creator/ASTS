import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedSourceCommand = "npm run smoke:web-build-self-check";
const expectedRouteSmokeCommand = "npm run smoke -- --url http://127.0.0.1:4177/";
const expectedSelfCommand = "npm run smoke:web-build-live-route";
const expectedPlanMarker = 'data-testid="web-build-live-route-gate-note"';
const expectedSourceMarker = 'data-testid="web-build-workflow-self-check-note"';
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
assert(workflow.includes(`run: ${expectedSelfCommand}`), "Web build must run web build live route gate smoke");
assert(workflow.includes(`run: ${expectedSourceCommand}`), "Web build must keep web build self-check smoke");
assert(workflow.includes(expectedRouteSmokeCommand), "Web build must keep rendered route smoke");
assert(
  workflow.indexOf(`run: ${expectedSourceCommand}`) < workflow.indexOf(`run: ${expectedSelfCommand}`),
  "web build live route gate must run after web build self-check smoke",
);
assert(
  workflow.indexOf(`run: ${expectedSelfCommand}`) < workflow.indexOf(expectedRouteSmokeCommand),
  "web build live route gate must run before rendered route smoke starts the server",
);

assert(planPage.includes(expectedSourceMarker), "/plan must keep web build workflow self-check note marker");
assert(planPage.includes(expectedPlanMarker), "/plan must expose web build live route gate note marker");
assert(planPage.includes(expectedRouteSmokeCommand), "/plan must expose live rendered route smoke command");
assert(planPage.includes(`workflowPath: "${expectedWorkflowPath}"`), "/plan must expose Web build workflow path");
assert(planPage.includes("webBuildLiveRouteGateNote"), "/plan must expose web build live route gate note data");

if (failures.length > 0) {
  console.error("FAIL web build live route gate");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS web build live route gate (${expectedRouteSmokeCommand})`);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
