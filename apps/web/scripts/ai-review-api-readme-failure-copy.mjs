import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedLiveCommand = "npm run smoke:ai-review-api-readme -- --url http://127.0.0.1:4177";
const expectedPlanMarker = 'data-testid="ai-review-api-readme-failure-copy"';
const expectedSelfCommand = "npm run smoke:ai-review-api-readme-failure-copy";
const expectedSourceMarker = 'data-testid="api-readme-live-route-gate-note"';
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
assert(workflow.includes(`run: ${expectedSelfCommand}`), "Web build must run AI review API README failure copy smoke");
assert(workflow.includes(expectedLiveCommand), "Web build must keep live AI review API README parity command");
assert(
  workflow.indexOf(`run: ${expectedSelfCommand}`) < workflow.indexOf("npm run smoke -- --url http://127.0.0.1:4177/"),
  "AI review API README failure copy smoke must run before live rendered route smoke",
);

assert(planPage.includes(expectedSourceMarker), "/plan must keep API README live route gate marker");
assert(planPage.includes(expectedPlanMarker), "/plan must expose AI review API README failure copy marker");
assert(planPage.includes("apiReadmeFailureCopy"), "/plan must expose AI review API README failure copy data");
assert(planPage.includes(expectedLiveCommand), "/plan must expose failing live parity command");
assert(planPage.includes("Не мержить, пока `/plan`, `/ai-review` и apps/api/README.md снова не указывают на один anchor"), "/plan must show owner-friendly no-merge copy");
assert(planPage.includes(`workflowPath: "${expectedWorkflowPath}"`), "/plan must expose Web build workflow path");

if (failures.length > 0) {
  console.error("FAIL AI review API README failure copy");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS AI review API README failure copy (${expectedLiveCommand})`);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
