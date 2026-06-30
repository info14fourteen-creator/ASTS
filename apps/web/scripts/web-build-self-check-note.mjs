import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedFileSmokeCommand = "npm run smoke:web-build-workflow";
const expectedPlanMarker = 'data-testid="web-build-workflow-self-check-note"';
const expectedSelfCommand = "npm run smoke:web-build-self-check";
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
assert(countWorkflowPath(workflow, expectedWorkflowPath) >= 2, "web-build.yml must trigger pull_request and push Web build");
assert(workflow.includes(`run: ${expectedFileSmokeCommand}`), "Web build must run web build workflow file smoke");
assert(workflow.includes(`run: ${expectedSelfCommand}`), "Web build must run web build self-check smoke");
assert(
  workflow.indexOf(`run: ${expectedFileSmokeCommand}`) < workflow.indexOf(`run: ${expectedSelfCommand}`),
  "web build self-check must run after the workflow file smoke",
);
assert(
  workflow.indexOf(`run: ${expectedSelfCommand}`) < workflow.indexOf("npm run smoke -- --url http://127.0.0.1:4177/"),
  "web build self-check must run before live rendered route smoke",
);

assert(planPage.includes('data-testid="web-build-workflow-file-smoke"'), "/plan must keep web build workflow file smoke marker");
assert(planPage.includes(expectedPlanMarker), "/plan must expose web build workflow self-check note marker");
assert(planPage.includes(expectedSelfCommand), "/plan must expose web build self-check command");
assert(planPage.includes(`workflowPath: "${expectedWorkflowPath}"`), "/plan must expose Web build workflow path");
assert(planPage.includes("webBuildWorkflowSelfCheckNote"), "/plan must expose web build workflow self-check note data");

if (failures.length > 0) {
  console.error("FAIL web build workflow self-check note");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS web build workflow self-check note (${expectedSelfCommand})`);

function countWorkflowPath(content, path) {
  return content.split(`- "${path}"`).length - 1;
}

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
