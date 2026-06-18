import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedCommand = "npm run smoke:ai-review-receipt-write-live-route-workflow-copy";
const expectedFailingCommand = "npm run smoke:web-build-workflow";
const expectedLiveRenderedCommand = "npm run smoke:ai-review-receipt-write-live-route-rendered-copy";
const expectedWorkflowFailureCommand = "npm run smoke:ai-review-receipt-write-workflow-failure-copy";
const expectedNextDomainCommand = "npm run smoke:shared-readme-commands";
const expectedNoMergeCopy =
  "Не мержить, пока Web build снова запускает AI review receipt write live-route rendered copy перед workflow failure copy и shared README checks.";
const expectedPlanMarker = 'data-testid="ai-review-receipt-write-live-route-workflow-copy"';
const expectedRepairTargets =
  ".github/workflows/web-build.yml,/plan,apps/web/scripts/ai-review-receipt-write-live-route-rendered-copy.mjs,apps/web/scripts/web-build-workflow-file.mjs";
const expectedSourceMarker = 'data-testid="ai-review-receipt-write-live-route-rendered-copy"';
const expectedWorkflowName = "Web build";
const expectedWorkflowPath = ".github/workflows/web-build.yml";

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(webRoot, "../..");
const packagePath = resolve(webRoot, "package.json");
const planPagePath = resolve(webRoot, "app/plan/page.tsx");
const routeSmokePath = resolve(webRoot, "scripts/smoke.mjs");
const workflowPath = resolve(repoRoot, expectedWorkflowPath);
const workflowFileSmokePath = resolve(webRoot, "scripts/web-build-workflow-file.mjs");

const packageJson = JSON.parse(readFileSync(packagePath, "utf8"));
const planPage = readFileSync(planPagePath, "utf8");
const routeSmoke = readFileSync(routeSmokePath, "utf8");
const workflow = readFileSync(workflowPath, "utf8");
const workflowFileSmoke = readFileSync(workflowFileSmokePath, "utf8");
const failures = [];

assert(
  packageJson.scripts?.["smoke:ai-review-receipt-write-live-route-workflow-copy"] ===
    "node scripts/ai-review-receipt-write-live-route-workflow-copy.mjs",
  "package.json must expose AI review live route workflow copy smoke",
);

assert(workflow.includes(`name: ${expectedWorkflowName}`), "workflow must keep Web build name");
assert(workflow.includes(`run: ${expectedLiveRenderedCommand}`), "Web build must keep AI review live route rendered copy smoke");
assert(workflow.includes(`run: ${expectedCommand}`), "Web build must run AI review live route workflow copy smoke");
assert(workflow.includes(`run: ${expectedWorkflowFailureCommand}`), "Web build must keep AI review workflow failure copy smoke");
assert(
  workflow.indexOf(`run: ${expectedLiveRenderedCommand}`) < workflow.indexOf(`run: ${expectedCommand}`),
  "AI review live route workflow copy smoke must run after live route rendered copy smoke",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf(`run: ${expectedWorkflowFailureCommand}`),
  "AI review live route workflow copy smoke must run before workflow failure copy smoke",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf(`run: ${expectedNextDomainCommand}`),
  "AI review live route workflow copy smoke must run before shared README checks",
);
assert(workflowFileSmoke.includes(expectedCommand), "workflow file smoke must count AI review live route workflow copy command");
assert(workflowFileSmoke.includes(expectedPlanMarker), "workflow file smoke must require AI review live route workflow copy marker");

assert(planPage.includes(expectedSourceMarker), "/plan must keep AI review live route rendered marker");
assert(planPage.includes(expectedPlanMarker), "/plan must expose AI review live route workflow copy marker");
assert(
  planPage.includes("aiReviewReceiptWriteLiveRouteWorkflowCopy"),
  "/plan must expose AI review live route workflow copy data",
);
assert(planPage.includes(expectedCommand), "/plan must expose AI review live route workflow copy command");
assert(planPage.includes(expectedFailingCommand), "/plan must expose failing Web build workflow command");
assert(planPage.includes(expectedLiveRenderedCommand), "/plan must expose live route rendered command");
assert(planPage.includes(expectedWorkflowFailureCommand), "/plan must expose workflow failure command");
assert(planPage.includes(expectedRepairTargets), "/plan must expose AI review live route workflow copy repair targets");
assert(planPage.includes("AI workflow owner + CI owner + QA owner"), "/plan must expose AI review live route workflow owners");
assert(planPage.includes(expectedNoMergeCopy), "/plan must show AI review live route workflow no-merge copy");
assert(planPage.includes(`workflowPath: "${expectedWorkflowPath}"`), "/plan must expose Web build workflow path");

assert(
  routeSmoke.includes('data-testid=\\"ai-review-receipt-write-live-route-workflow-copy\\"'),
  "route smoke must require AI review live route workflow marker",
);
assert(routeSmoke.includes(`data-command=\\"${expectedCommand}\\"`), "route smoke must require AI review live route workflow command");
assert(routeSmoke.includes(`data-failing-command=\\"${expectedFailingCommand}\\"`), "route smoke must require Web build workflow command");
assert(
  routeSmoke.includes(`data-live-rendered-command=\\"${expectedLiveRenderedCommand}\\"`),
  "route smoke must require AI review live rendered command",
);
assert(
  routeSmoke.includes(`data-workflow-failure-command=\\"${expectedWorkflowFailureCommand}\\"`),
  "route smoke must require workflow failure command",
);
assert(
  routeSmoke.includes(`data-no-merge-copy=\\"${expectedNoMergeCopy}\\"`),
  "route smoke must require AI review live route workflow no-merge copy",
);
assert(
  routeSmoke.includes("Что делать, если AI live-route workflow order упал"),
  "route smoke must require visible AI review live route workflow heading",
);
assert(routeSmoke.includes('data-expected-command-count=\\"77\\"'), "route smoke must require updated Web build command count");

if (failures.length > 0) {
  console.error("FAIL AI review receipt write live route workflow copy");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS AI review receipt write live route workflow copy (${expectedLiveRenderedCommand})`);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
