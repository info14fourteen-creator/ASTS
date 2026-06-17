import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedNodeVersion = "22";
const expectedWorkflowName = "Web build";
const expectedWorkflowPath = ".github/workflows/web-build.yml";
const expectedWorkingDirectory = "apps/web";
const expectedPaths = [
  "apps/api/README.md",
  "apps/web/**",
  "packages/shared/ai-review-queue.json",
  "packages/shared/fns-connector-gate.json",
  "packages/shared/README.md",
  "packages/shared/source-owner-receipts.json",
  ".github/workflows/web-build.yml",
];
const expectedCommands = [
  "npm run build",
  "npm run smoke:owner-receipts",
  "npm run smoke:fns-approvals",
  "npm run smoke:ai-review-actions",
  "npm run smoke:shared-readme-commands",
  "npm run smoke:schema-docs-readme",
  "npm run smoke:schema-docs-workflow",
  "npm run smoke:schema-docs-workflow-failure-copy",
  "npm run smoke:schema-docs-live-route",
  "npm run smoke:schema-docs-live-route-failure-copy",
  "npm run smoke:schema-docs-readme-failure-copy",
  "npm run smoke:shared-validation-workflow",
  "npm run smoke:shared-validation-workflow-step",
  "npm run smoke:shared-validation-workflow-failure-copy",
  "npm run smoke:shared-validation-live-route",
  "npm run smoke:shared-validation-failure-copy",
  "npm run smoke:shared-validation-rendered-route-failure-copy",
  "npm run smoke:web-build-workflow",
  "npm run smoke:web-build-self-check",
  "npm run smoke:web-build-live-route",
  "npm run smoke:web-build-failure-copy",
  "npm run smoke:api-readme-trigger",
  "npm run smoke:api-readme-trigger-failure-copy",
  "npm run smoke:api-readme-live-route",
  "npm run smoke:api-readme-live-route-failure-copy",
  "npm run smoke:ai-review-api-readme-failure-copy",
  "npm run smoke:web-build-rendered-route-failure-copy",
  "npm run smoke -- --url http://127.0.0.1:4177/",
  "npm run smoke:source-receipt-docs-link -- --url http://127.0.0.1:4177",
  "npm run smoke:ai-review-api-readme -- --url http://127.0.0.1:4177",
];
const expectedPlanMarkers = [
  'data-testid="shared-readme-command-ci-note"',
  'data-testid="ai-review-api-readme-ci-note"',
  'data-testid="api-readme-live-route-gate-note"',
  'data-testid="api-readme-live-route-failure-copy"',
  'data-testid="ai-review-api-readme-failure-copy"',
  'data-testid="api-readme-trigger-smoke"',
  'data-testid="api-readme-trigger-failure-copy"',
  'data-testid="schema-docs-readme-ci-note"',
  'data-testid="schema-docs-readme-workflow-smoke"',
  'data-testid="schema-docs-workflow-failure-copy"',
  'data-testid="schema-docs-readme-live-route-gate-note"',
  'data-testid="schema-docs-live-route-failure-copy"',
  'data-testid="schema-docs-readme-failure-copy"',
  'data-testid="shared-validation-workflow-ci-note"',
  'data-testid="shared-validation-workflow-step-smoke"',
  'data-testid="shared-validation-workflow-failure-copy"',
  'data-testid="shared-validation-live-route-gate-note"',
  'data-testid="shared-validation-failure-copy"',
  'data-testid="shared-validation-rendered-route-failure-copy"',
  'data-testid="web-build-workflow-self-check-note"',
  'data-testid="web-build-live-route-gate-note"',
  'data-testid="web-build-failure-copy"',
  'data-testid="web-build-rendered-route-failure-copy"',
  'data-testid="web-build-workflow-file-smoke"',
];

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(webRoot, "../..");
const planPagePath = resolve(webRoot, "app/plan/page.tsx");
const workflowPath = resolve(repoRoot, expectedWorkflowPath);

const planPage = readFileSync(planPagePath, "utf8");
const workflow = readFileSync(workflowPath, "utf8");
const failures = [];

assert(workflow.includes(`name: ${expectedWorkflowName}`), "workflow must keep Web build name");
assert(workflow.includes("pull_request:"), "workflow must run on pull_request");
assert(workflow.includes("push:"), "workflow must run on push");
assert(workflow.includes("workflow_dispatch:"), "workflow must keep manual dispatch");
assert(workflow.includes(`working-directory: ${expectedWorkingDirectory}`), "workflow must run in apps/web");
assert(workflow.includes(`node-version: ${expectedNodeVersion}`), "workflow must pin Node 22");

for (const path of expectedPaths) {
  assert(workflow.includes(`- "${path}"`), `workflow paths must include ${path}`);
}

for (const command of expectedCommands) {
  assert(workflow.includes(command), `workflow steps must include ${command}`);
}

for (const marker of expectedPlanMarkers) {
  assert(planPage.includes(marker), `/plan must expose ${marker}`);
}

assert(planPage.includes(`workflowPath: "${expectedWorkflowPath}"`), "/plan must expose Web build workflow path");
assert(planPage.includes(`workflowName: "${expectedWorkflowName}"`), "/plan must expose Web build workflow name");
assert(planPage.includes("webBuildWorkflowFileSmoke"), "/plan must expose web build workflow file smoke data");

if (failures.length > 0) {
  console.error("FAIL web build workflow file smoke");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS web build workflow file smoke (${expectedCommands.length} commands, ${expectedPaths.length} paths)`);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
