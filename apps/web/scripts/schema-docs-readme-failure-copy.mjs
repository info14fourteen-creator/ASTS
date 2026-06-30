import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedFailingCommand = "npm run smoke:schema-docs-live-route";
const expectedNoMergeCopy =
  "Не мержить, пока `/plan` и packages/shared/README.md#shared-schema-index снова не показывают один schema index";
const expectedPlanMarker = 'data-testid="schema-docs-readme-failure-copy"';
const expectedReadmePath = "packages/shared/README.md";
const expectedRepairTargets = "/plan,packages/shared/README.md#shared-schema-index,[data-testid='schema-docs-link']";
const expectedSelfCommand = "npm run smoke:schema-docs-readme-failure-copy";
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
assert(workflow.includes(`run: ${expectedSelfCommand}`), "Web build must run schema docs README failure copy smoke");
assert(workflow.includes(`run: ${expectedFailingCommand}`), "Web build must keep schema docs live route gate command");
assert(
  workflow.indexOf(`run: ${expectedSelfCommand}`) < workflow.indexOf("npm run smoke -- --url http://127.0.0.1:4177/"),
  "schema docs README failure copy smoke must run before live rendered route smoke",
);

assert(planPage.includes(expectedSourceMarker), "/plan must keep schema docs live route gate marker");
assert(planPage.includes(expectedPlanMarker), "/plan must expose schema docs README failure copy marker");
assert(planPage.includes("schemaDocsReadmeFailureCopy"), "/plan must expose schema docs README failure copy data");
assert(planPage.includes(expectedFailingCommand), "/plan must expose failing schema docs parity command");
assert(planPage.includes(expectedReadmePath), "/plan must expose shared README path");
assert(planPage.includes(expectedRepairTargets), "/plan must expose schema docs repair targets");
assert(planPage.includes("Schema owner + Product owner"), "/plan must expose schema docs owner role");
assert(planPage.includes(expectedNoMergeCopy), "/plan must show owner-friendly no-merge copy");
assert(planPage.includes(`workflowPath: "${expectedWorkflowPath}"`), "/plan must expose Web build workflow path");

if (failures.length > 0) {
  console.error("FAIL schema docs README failure copy");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS schema docs README failure copy (${expectedFailingCommand})`);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
