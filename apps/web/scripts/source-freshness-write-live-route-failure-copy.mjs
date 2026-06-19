import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedCommand = "npm run smoke:source-freshness-write-live-route-failure-copy";
const expectedFailingCommand = "npm run smoke:source-freshness-write-live-route";
const expectedNoMergeCopy =
  "Не мержить, пока Web build снова держит source freshness write live-route gate перед workflow failure copy и source freshness rendered checks.";
const expectedPlanMarker = 'data-testid="source-freshness-write-live-route-failure-copy"';
const expectedRepairTargets =
  ".github/workflows/web-build.yml,/plan,apps/web/scripts/source-freshness-write-live-route-gate.mjs,apps/web/scripts/smoke.mjs";
const expectedRouteSmokeCommand = "npm run smoke -- --url http://127.0.0.1:4177/";
const expectedSourceMarker = 'data-testid="source-freshness-write-live-route-gate-note"';
const expectedWorkflowFailureCommand = "npm run smoke:source-freshness-write-workflow-failure-copy";
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
  packageJson.scripts?.["smoke:source-freshness-write-live-route-failure-copy"] ===
    "node scripts/source-freshness-write-live-route-failure-copy.mjs",
  "package.json must expose source freshness write live route failure copy smoke",
);

assert(workflow.includes(`name: ${expectedWorkflowName}`), "workflow must keep Web build name");
assert(workflow.includes(`run: ${expectedFailingCommand}`), "Web build must keep freshness write live route gate smoke");
assert(workflow.includes(`run: ${expectedCommand}`), "Web build must run freshness write live route failure copy smoke");
assert(workflow.includes(`run: ${expectedWorkflowFailureCommand}`), "Web build must keep freshness write workflow failure copy smoke");
assert(
  workflow.indexOf(`run: ${expectedFailingCommand}`) < workflow.indexOf(`run: ${expectedCommand}`),
  "freshness write live route failure copy smoke must run after live route gate smoke",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf(`run: ${expectedWorkflowFailureCommand}`),
  "freshness write live route failure copy smoke must run before workflow failure copy smoke",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf("run: npm run smoke:source-freshness-rendered-route-failure-copy"),
  "freshness write live route failure copy smoke must run before source freshness rendered checks",
);

assert(planPage.includes(expectedSourceMarker), "/plan must keep freshness write live route gate marker");
assert(planPage.includes(expectedPlanMarker), "/plan must expose freshness write live route failure copy marker");
assert(planPage.includes("sourceFreshnessWriteLiveRouteFailureCopy"), "/plan must expose freshness write live route failure copy data");
assert(planPage.includes(expectedCommand), "/plan must expose freshness write live route failure command");
assert(planPage.includes(expectedFailingCommand), "/plan must expose failing live route gate command");
assert(planPage.includes(expectedRouteSmokeCommand), "/plan must expose rendered route smoke command");
assert(planPage.includes(expectedRepairTargets), "/plan must expose freshness write live route repair targets");
assert(planPage.includes("Sources owner + CI owner + QA owner"), "/plan must expose freshness write live route owner role");
assert(planPage.includes(expectedNoMergeCopy), "/plan must show owner-friendly no-merge copy");
assert(planPage.includes(`workflowPath: "${expectedWorkflowPath}"`), "/plan must expose Web build workflow path");

assert(routeSmoke.includes('data-testid=\\"source-freshness-write-live-route-failure-copy\\"'), "route smoke must require freshness write live route failure marker");
assert(routeSmoke.includes(`data-command=\\"${expectedCommand}\\"`), "route smoke must require freshness write live route failure command");
assert(routeSmoke.includes(`data-failing-command=\\"${expectedFailingCommand}\\"`), "route smoke must require failing live route gate command");
assert(routeSmoke.includes(`data-route-smoke-command=\\"${expectedRouteSmokeCommand}\\"`), "route smoke must require rendered route smoke command");
assert(routeSmoke.includes(`data-no-merge-copy=\\"${expectedNoMergeCopy}\\"`), "route smoke must require freshness write live route no-merge copy");
assert(routeSmoke.includes("Что делать, если freshness write live-route gate упал"), "route smoke must require visible freshness write live route heading");
assert(routeSmoke.includes('data-expected-command-count=\\"96\\"'), "route smoke must require updated Web build command count");

if (failures.length > 0) {
  console.error("FAIL source freshness write live route failure copy");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS source freshness write live route failure copy (${expectedFailingCommand})`);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
