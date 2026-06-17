import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedApiReadmePath = "apps/api/README.md";
const expectedDomParityCommand = "npm run smoke:ai-review-api-readme -- --url http://127.0.0.1:4177";
const expectedPlanMarker = 'data-testid="api-readme-trigger-smoke"';
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
assert(countWorkflowPath(workflow, expectedApiReadmePath) >= 2, "apps/api/README.md must trigger pull_request and push Web build");
assert(
  workflow.includes("npm run smoke:api-readme-trigger"),
  "Web build must run API README trigger smoke before rendered routes",
);
assert(
  workflow.includes(expectedDomParityCommand),
  "Web build must keep live AI review API README parity smoke",
);

assert(planPage.includes(expectedPlanMarker), "/plan must expose API README trigger smoke marker");
assert(planPage.includes(`triggerPath: "${expectedApiReadmePath}"`), "/plan must expose API README trigger path");
assert(planPage.includes(`workflowPath: "${expectedWorkflowPath}"`), "/plan must expose Web build workflow path");
assert(
  planPage.includes('sourceCiNoteSelector: "[data-testid=\'ai-review-api-readme-ci-note\']"'),
  "/plan must link API README trigger smoke to AI review API README CI note",
);
assert(planPage.includes("apiReadmeTriggerSmoke"), "/plan must expose API README trigger smoke data");

if (failures.length > 0) {
  console.error("FAIL API README trigger smoke");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS API README trigger smoke (${expectedApiReadmePath} -> ${expectedWorkflowName})`);

function countWorkflowPath(content, path) {
  return content.split(`- "${path}"`).length - 1;
}

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
