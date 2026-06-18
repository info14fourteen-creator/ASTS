import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedCommand = "npm run smoke:ai-review-receipt-write-live-route-rendered-copy";
const expectedFailingCommand = "npm run smoke -- --url http://127.0.0.1:4177/";
const expectedLiveFailureCommand = "npm run smoke:ai-review-receipt-write-live-route-failure-copy";
const expectedNoMergeCopy =
  "Не мержить, пока rendered routes smoke снова подтверждает AI review write live-route failure copy, docs href и route smoke command.";
const expectedPlanMarker = 'data-testid="ai-review-receipt-write-live-route-rendered-copy"';
const expectedRepairTargets =
  "/plan,apps/web/scripts/smoke.mjs,apps/web/scripts/ai-review-receipt-write-live-route-failure-copy.mjs,.github/workflows/web-build.yml";
const expectedSourceMarker = 'data-testid="ai-review-receipt-write-live-route-failure-copy"';
const expectedWorkflowFailureCommand = "npm run smoke:ai-review-receipt-write-workflow-failure-copy";
const expectedWorkflowName = "Web build";
const expectedWorkflowPath = ".github/workflows/web-build.yml";

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(webRoot, "../..");
const packagePath = resolve(webRoot, "package.json");
const planPagePath = resolve(webRoot, "app/plan/page.tsx");
const routeSmokePath = resolve(webRoot, "scripts/smoke.mjs");
const workflowPath = resolve(repoRoot, expectedWorkflowPath);

const packageJson = JSON.parse(readFileSync(packagePath, "utf8"));
const planPage = readFileSync(planPagePath, "utf8");
const routeSmoke = readFileSync(routeSmokePath, "utf8");
const workflow = readFileSync(workflowPath, "utf8");
const failures = [];

assert(
  packageJson.scripts?.["smoke:ai-review-receipt-write-live-route-rendered-copy"] ===
    "node scripts/ai-review-receipt-write-live-route-rendered-copy.mjs",
  "package.json must expose AI review write live route rendered copy smoke",
);

assert(workflow.includes(`name: ${expectedWorkflowName}`), "workflow must keep Web build name");
assert(workflow.includes(`run: ${expectedLiveFailureCommand}`), "Web build must keep AI review write live route failure copy smoke");
assert(workflow.includes(`run: ${expectedCommand}`), "Web build must run AI review write live route rendered copy smoke");
assert(workflow.includes(`run: ${expectedWorkflowFailureCommand}`), "Web build must keep AI review write workflow failure copy smoke");
assert(
  workflow.indexOf(`run: ${expectedLiveFailureCommand}`) < workflow.indexOf(`run: ${expectedCommand}`),
  "AI review write live route rendered copy smoke must run after live route failure copy smoke",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf(`run: ${expectedWorkflowFailureCommand}`),
  "AI review write live route rendered copy smoke must run before workflow failure copy smoke",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf("run: npm run smoke:shared-readme-commands"),
  "AI review write live route rendered copy smoke must run before shared README checks",
);

assert(planPage.includes(expectedSourceMarker), "/plan must keep AI review write live route failure marker");
assert(planPage.includes(expectedPlanMarker), "/plan must expose AI review write live route rendered copy marker");
assert(planPage.includes("aiReviewReceiptWriteLiveRouteRenderedCopy"), "/plan must expose AI review write live route rendered copy data");
assert(planPage.includes(expectedCommand), "/plan must expose AI review write live route rendered command");
assert(planPage.includes(expectedFailingCommand), "/plan must expose failing rendered route smoke command");
assert(planPage.includes(expectedLiveFailureCommand), "/plan must expose live route failure copy command");
assert(planPage.includes(expectedRepairTargets), "/plan must expose AI review write live route rendered repair targets");
assert(planPage.includes("AI workflow owner + CI owner + QA owner"), "/plan must expose AI review write live route rendered owners");
assert(planPage.includes(expectedNoMergeCopy), "/plan must show rendered no-merge copy");
assert(planPage.includes(`workflowPath: "${expectedWorkflowPath}"`), "/plan must expose Web build workflow path");

assert(routeSmoke.includes('data-testid=\\"ai-review-receipt-write-live-route-rendered-copy\\"'), "route smoke must require AI review write live route rendered marker");
assert(routeSmoke.includes(`data-command=\\"${expectedCommand}\\"`), "route smoke must require AI review write live route rendered command");
assert(routeSmoke.includes(`data-failing-command=\\"${expectedFailingCommand}\\"`), "route smoke must require rendered route failing command");
assert(routeSmoke.includes(`data-live-failure-command=\\"${expectedLiveFailureCommand}\\"`), "route smoke must require live route failure copy command");
assert(routeSmoke.includes(`data-no-merge-copy=\\"${expectedNoMergeCopy}\\"`), "route smoke must require AI review write live route rendered no-merge copy");
assert(routeSmoke.includes("Что делать, если AI write live-route copy пропал в rendered routes"), "route smoke must require visible AI review write live route rendered heading");
assert(routeSmoke.includes('data-expected-command-count=\\"84\\"'), "route smoke must require updated Web build command count");

if (failures.length > 0) {
  console.error("FAIL AI review receipt write live route rendered copy");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS AI review receipt write live route rendered copy (${expectedLiveFailureCommand})`);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
