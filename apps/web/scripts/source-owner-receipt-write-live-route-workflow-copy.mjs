import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedCommand = "npm run smoke:source-owner-receipt-write-live-route-workflow-copy";
const expectedFailingCommand = "npm run smoke:web-build-workflow";
const expectedLiveRenderedCommand = "npm run smoke:source-owner-receipt-write-live-route-rendered-copy";
const expectedWorkflowFailureCommand = "npm run smoke:source-owner-receipt-write-workflow-failure-copy";
const expectedNextDomainCommand = "npm run smoke:source-freshness-write-api-draft";
const expectedNoMergeCopy =
  "Не мержить, пока Web build снова запускает source owner receipt write live-route rendered copy перед workflow failure copy и source freshness checks.";
const expectedPlanMarker = 'data-testid="source-owner-receipt-write-live-route-workflow-copy"';
const expectedRepairTargets =
  ".github/workflows/web-build.yml,/plan,apps/web/scripts/source-owner-receipt-write-live-route-rendered-copy.mjs,apps/web/scripts/web-build-workflow-file.mjs";
const expectedSourceMarker = 'data-testid="source-owner-receipt-write-live-route-rendered-copy"';
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
  packageJson.scripts?.["smoke:source-owner-receipt-write-live-route-workflow-copy"] ===
    "node scripts/source-owner-receipt-write-live-route-workflow-copy.mjs",
  "package.json must expose source owner live route workflow copy smoke",
);

assert(workflow.includes(`name: ${expectedWorkflowName}`), "workflow must keep Web build name");
assert(
  workflow.includes(`run: ${expectedLiveRenderedCommand}`),
  "Web build must keep source owner live route rendered copy smoke",
);
assert(workflow.includes(`run: ${expectedCommand}`), "Web build must run source owner live route workflow copy smoke");
assert(
  workflow.includes(`run: ${expectedWorkflowFailureCommand}`),
  "Web build must keep source owner workflow failure copy smoke",
);
assert(
  workflow.indexOf(`run: ${expectedLiveRenderedCommand}`) < workflow.indexOf(`run: ${expectedCommand}`),
  "source owner live route workflow copy smoke must run after live route rendered copy smoke",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf(`run: ${expectedWorkflowFailureCommand}`),
  "source owner live route workflow copy smoke must run before workflow failure copy smoke",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf(`run: ${expectedNextDomainCommand}`),
  "source owner live route workflow copy smoke must run before source freshness write checks",
);
assert(
  workflowFileSmoke.includes(expectedCommand),
  "workflow file smoke must count source owner live route workflow copy command",
);
assert(
  workflowFileSmoke.includes(expectedPlanMarker),
  "workflow file smoke must require source owner live route workflow copy marker",
);

assert(planPage.includes(expectedSourceMarker), "/plan must keep source owner live route rendered marker");
assert(planPage.includes(expectedPlanMarker), "/plan must expose source owner live route workflow copy marker");
assert(
  planPage.includes("sourceOwnerReceiptWriteLiveRouteWorkflowCopy"),
  "/plan must expose source owner live route workflow copy data",
);
assert(planPage.includes(expectedCommand), "/plan must expose source owner live route workflow copy command");
assert(planPage.includes(expectedFailingCommand), "/plan must expose failing Web build workflow command");
assert(planPage.includes(expectedLiveRenderedCommand), "/plan must expose live route rendered command");
assert(planPage.includes(expectedWorkflowFailureCommand), "/plan must expose workflow failure command");
assert(planPage.includes(expectedRepairTargets), "/plan must expose source owner live route workflow copy repair targets");
assert(
  planPage.includes("Sources owner + CI owner + QA owner"),
  "/plan must expose source owner live route workflow owners",
);
assert(planPage.includes(expectedNoMergeCopy), "/plan must show source owner live route workflow no-merge copy");
assert(planPage.includes(`workflowPath: "${expectedWorkflowPath}"`), "/plan must expose Web build workflow path");

assert(
  routeSmoke.includes('data-testid=\\"source-owner-receipt-write-live-route-workflow-copy\\"'),
  "route smoke must require source owner live route workflow marker",
);
assert(routeSmoke.includes(`data-command=\\"${expectedCommand}\\"`), "route smoke must require source owner live route workflow command");
assert(
  routeSmoke.includes(`data-failing-command=\\"${expectedFailingCommand}\\"`),
  "route smoke must require Web build workflow command",
);
assert(
  routeSmoke.includes(`data-live-rendered-command=\\"${expectedLiveRenderedCommand}\\"`),
  "route smoke must require source owner live rendered command",
);
assert(
  routeSmoke.includes(`data-workflow-failure-command=\\"${expectedWorkflowFailureCommand}\\"`),
  "route smoke must require workflow failure command",
);
assert(
  routeSmoke.includes(`data-no-merge-copy=\\"${expectedNoMergeCopy}\\"`),
  "route smoke must require source owner live route workflow no-merge copy",
);
assert(
  routeSmoke.includes("Что делать, если source owner live-route workflow order упал"),
  "route smoke must require visible source owner live route workflow heading",
);
assert(routeSmoke.includes('data-expected-command-count=\\"89\\"'), "route smoke must require updated Web build command count");

if (failures.length > 0) {
  console.error("FAIL source owner receipt write live route workflow copy");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS source owner receipt write live route workflow copy (${expectedLiveRenderedCommand})`);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
