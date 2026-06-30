import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedCommand = "npm run smoke:schema-docs-readme";
const expectedPlanMarker = 'data-testid="schema-docs-readme-workflow-smoke"';
const expectedReadmePath = "packages/shared/README.md";
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
assert(countWorkflowPath(workflow, expectedReadmePath) >= 2, "packages/shared/README.md must trigger pull_request and push Web build");
assert(workflow.includes(expectedCommand), "Web build must run schema docs README smoke");
assert(
  workflow.indexOf(expectedCommand) < workflow.indexOf("npm run smoke -- --url http://127.0.0.1:4177/"),
  "schema docs README smoke must run before live rendered route smoke",
);

assert(planPage.includes(expectedSourceMarker), "/plan must keep schema docs README CI note marker");
assert(planPage.includes(expectedPlanMarker), "/plan must expose schema docs README workflow smoke marker");
assert(planPage.includes(expectedCommand), "/plan must expose schema docs README smoke command");
assert(planPage.includes(`readmePath: "${expectedReadmePath}"`), "/plan must expose shared README path");
assert(planPage.includes(`workflowPath: "${expectedWorkflowPath}"`), "/plan must expose Web build workflow path");
assert(planPage.includes("schemaDocsReadmeWorkflowSmoke"), "/plan must expose schema docs README workflow smoke data");

if (failures.length > 0) {
  console.error("FAIL schema docs README workflow smoke");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS schema docs README workflow smoke (${expectedCommand})`);

function countWorkflowPath(content, path) {
  return content.split(`- "${path}"`).length - 1;
}

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
