import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedReadmeCommand = "npm run smoke:schema-docs-readme";
const expectedRouteSmokeCommand = "npm run smoke -- --url http://127.0.0.1:4177/";
const expectedSelfCommand = "npm run smoke:schema-docs-live-route";
const expectedPlanMarker = 'data-testid="schema-docs-readme-live-route-gate-note"';
const expectedSourceMarker = 'data-testid="schema-docs-readme-ci-note"';
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
assert(workflow.includes(`run: ${expectedSelfCommand}`), "Web build must run schema docs live route gate smoke");
assert(workflow.includes(expectedReadmeCommand), "Web build must keep schema docs README existence smoke");
assert(workflow.includes(expectedRouteSmokeCommand), "Web build must keep rendered route smoke");
assert(
  workflow.indexOf(expectedSelfCommand) < workflow.indexOf(expectedRouteSmokeCommand),
  "schema docs live route gate note must run before rendered route smoke starts the server",
);

assert(planPage.includes(expectedSourceMarker), "/plan must keep schema docs README CI note marker");
assert(planPage.includes(expectedPlanMarker), "/plan must expose schema docs live route gate note marker");
assert(planPage.includes(expectedRouteSmokeCommand), "/plan must expose live rendered route smoke command");
assert(planPage.includes(`workflowPath: "${expectedWorkflowPath}"`), "/plan must expose Web build workflow path");
assert(planPage.includes("schemaDocsReadmeLiveRouteGateNote"), "/plan must expose schema docs live route gate note data");

if (failures.length > 0) {
  console.error("FAIL schema docs live route gate");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS schema docs live route gate (${expectedRouteSmokeCommand})`);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
