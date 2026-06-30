import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedCommand = "npm run validate";
const expectedNodeVersion = "22";
const expectedPaths = [
  "packages/shared/**",
  "docs/19-continuation-70-step-plan-ru.md",
  ".github/workflows/shared-validation.yml",
];
const expectedWorkflowName = "Shared validation";
const expectedWorkflowPath = ".github/workflows/shared-validation.yml";
const expectedWorkingDirectory = "packages/shared";

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(webRoot, "../..");
const planPagePath = resolve(webRoot, "app/plan/page.tsx");
const workflowPath = resolve(repoRoot, expectedWorkflowPath);

const planPage = readFileSync(planPagePath, "utf8");
const workflow = readFileSync(workflowPath, "utf8");
const failures = [];

assert(workflow.includes(`name: ${expectedWorkflowName}`), "workflow must keep Shared validation name");
assert(workflow.includes("pull_request:"), "workflow must run on pull_request");
assert(workflow.includes("push:"), "workflow must run on push");
assert(workflow.includes("workflow_dispatch:"), "workflow must keep manual dispatch");
assert(workflow.includes(`working-directory: ${expectedWorkingDirectory}`), "workflow must run in packages/shared");
assert(workflow.includes(`node-version: ${expectedNodeVersion}`), "workflow must pin Node 22");
assert(workflow.includes(`run: ${expectedCommand}`), "workflow Validate step must run npm run validate");

for (const path of expectedPaths) {
  assert(workflow.includes(`- "${path}"`), `workflow paths must include ${path}`);
}

assert(
  planPage.includes('data-testid="shared-validation-workflow-file-smoke"'),
  "/plan must expose shared-validation-workflow-file-smoke marker",
);
assert(planPage.includes(`workflowPath: "${expectedWorkflowPath}"`), "/plan must expose shared validation workflow path");
assert(planPage.includes(`workflowName: "${expectedWorkflowName}"`), "/plan must expose shared validation workflow name");
assert(planPage.includes(`nodeVersion: "${expectedNodeVersion}"`), "/plan must expose Node version");
assert(
  planPage.includes(`workingDirectory: "${expectedWorkingDirectory}"`),
  "/plan must expose shared workflow working directory",
);
assert(planPage.includes(expectedCommand), "/plan must expose shared validation command");

if (failures.length > 0) {
  console.error("FAIL shared validation workflow file smoke");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS shared validation workflow file smoke (${expectedPaths.length} trigger paths)`);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
