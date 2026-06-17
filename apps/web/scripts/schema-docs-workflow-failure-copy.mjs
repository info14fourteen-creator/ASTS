import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedFailingCommand = "npm run smoke:schema-docs-workflow";
const expectedNoMergeCopy =
  "Не мержить, пока packages/shared/README.md снова не запускает Web build и schema docs workflow smoke";
const expectedPlanMarker = 'data-testid="schema-docs-workflow-failure-copy"';
const expectedReadmePath = "packages/shared/README.md";
const expectedRepairTargets =
  "packages/shared/README.md,.github/workflows/web-build.yml,/plan,[data-testid='schema-docs-readme-workflow-smoke']";
const expectedSelfCommand = "npm run smoke:schema-docs-workflow-failure-copy";
const expectedSourceMarker = 'data-testid="schema-docs-readme-workflow-smoke"';
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
assert(workflow.includes(`run: ${expectedSelfCommand}`), "Web build must run schema docs workflow failure copy smoke");
assert(workflow.includes(`run: ${expectedFailingCommand}`), "Web build must keep schema docs workflow smoke");
assert(countWorkflowPath(workflow, expectedReadmePath) >= 2, "packages/shared/README.md must trigger pull_request and push Web build");
assert(
  workflow.indexOf(`run: ${expectedFailingCommand}`) < workflow.indexOf(`run: ${expectedSelfCommand}`),
  "schema docs workflow failure copy smoke must run after schema docs workflow smoke",
);
assert(
  workflow.indexOf(`run: ${expectedSelfCommand}`) < workflow.indexOf("npm run smoke -- --url http://127.0.0.1:4177/"),
  "schema docs workflow failure copy smoke must run before live rendered route smoke",
);

assert(planPage.includes(expectedSourceMarker), "/plan must keep schema docs workflow smoke marker");
assert(planPage.includes(expectedPlanMarker), "/plan must expose schema docs workflow failure copy marker");
assert(planPage.includes("schemaDocsWorkflowFailureCopy"), "/plan must expose schema docs workflow failure copy data");
assert(planPage.includes(expectedFailingCommand), "/plan must expose failing schema docs workflow command");
assert(planPage.includes(expectedReadmePath), "/plan must expose shared README path");
assert(planPage.includes(expectedRepairTargets), "/plan must expose schema docs workflow repair targets");
assert(planPage.includes("Schema owner + CI owner"), "/plan must expose schema docs workflow owner role");
assert(planPage.includes("data-expected-workflow-path-count={schemaDocsWorkflowFailureCopy.expectedWorkflowPathCount}"), "/plan must expose workflow path count");
assert(planPage.includes(expectedNoMergeCopy), "/plan must show owner-friendly no-merge copy");
assert(planPage.includes(`workflowPath: "${expectedWorkflowPath}"`), "/plan must expose Web build workflow path");

if (failures.length > 0) {
  console.error("FAIL schema docs workflow failure copy");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS schema docs workflow failure copy (${expectedReadmePath})`);

function countWorkflowPath(content, path) {
  return content.split(`- "${path}"`).length - 1;
}

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
