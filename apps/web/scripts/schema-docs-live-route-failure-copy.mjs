import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedFailingCommand = "npm run smoke:schema-docs-live-route";
const expectedNoMergeCopy =
  "Не мержить, пока Web build снова держит schema docs live-route gate перед rendered routes smoke";
const expectedPlanMarker = 'data-testid="schema-docs-live-route-failure-copy"';
const expectedReadmePath = "packages/shared/README.md";
const expectedRepairTargets =
  ".github/workflows/web-build.yml,/plan,packages/shared/README.md,[data-testid='schema-docs-link']";
const expectedSelfCommand = "npm run smoke:schema-docs-live-route-failure-copy";
const expectedSourceMarker = 'data-testid="schema-docs-readme-live-route-gate-note"';
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
assert(workflow.includes(`run: ${expectedSelfCommand}`), "Web build must run schema docs live route failure copy smoke");
assert(workflow.includes(`run: ${expectedFailingCommand}`), "Web build must keep schema docs live route gate smoke");
assert(
  workflow.indexOf(`run: ${expectedFailingCommand}`) < workflow.indexOf(`run: ${expectedSelfCommand}`),
  "schema docs live route failure copy smoke must run after schema docs live route gate smoke",
);
assert(
  workflow.indexOf(`run: ${expectedSelfCommand}`) < workflow.indexOf("npm run smoke:schema-docs-readme-failure-copy"),
  "schema docs live route failure copy smoke must run before schema docs README failure copy smoke",
);
assert(
  workflow.indexOf(`run: ${expectedSelfCommand}`) < workflow.indexOf("npm run smoke -- --url http://127.0.0.1:4177/"),
  "schema docs live route failure copy smoke must run before live rendered route smoke",
);

assert(planPage.includes(expectedSourceMarker), "/plan must keep schema docs live route gate marker");
assert(planPage.includes(expectedPlanMarker), "/plan must expose schema docs live route failure copy marker");
assert(planPage.includes("schemaDocsLiveRouteFailureCopy"), "/plan must expose schema docs live route failure copy data");
assert(planPage.includes(expectedFailingCommand), "/plan must expose failing schema docs live route command");
assert(planPage.includes(expectedReadmePath), "/plan must expose shared README path");
assert(planPage.includes(expectedRepairTargets), "/plan must expose schema docs live route repair targets");
assert(planPage.includes("Schema owner + CI owner"), "/plan must expose schema docs live route owner role");
assert(planPage.includes(expectedNoMergeCopy), "/plan must show owner-friendly no-merge copy");
assert(planPage.includes(`workflowPath: "${expectedWorkflowPath}"`), "/plan must expose Web build workflow path");

if (failures.length > 0) {
  console.error("FAIL schema docs live route failure copy");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS schema docs live route failure copy (${expectedFailingCommand})`);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
