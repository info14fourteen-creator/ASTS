import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedFailingCommand = "npm run smoke -- --url http://127.0.0.1:4177/";
const expectedNoMergeCopy =
  "Не мержить, пока rendered routes smoke снова проходит 16 маршрутов app.site.ru на живом сервере";
const expectedPlanMarker = 'data-testid="web-build-rendered-route-failure-copy"';
const expectedRepairTargets = "apps/web/scripts/smoke.mjs,apps/web/app/plan/page.tsx,.github/workflows/web-build.yml,/plan";
const expectedRouteCount = 16;
const expectedSelfCommand = "npm run smoke:web-build-rendered-route-failure-copy";
const expectedSourceMarker = 'data-testid="web-build-failure-copy"';
const expectedWorkflowPath = ".github/workflows/web-build.yml";
const expectedWorkflowName = "Web build";

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(webRoot, "../..");
const planPagePath = resolve(webRoot, "app/plan/page.tsx");
const routeSmokePath = resolve(webRoot, "scripts/smoke.mjs");
const demoDataPath = resolve(repoRoot, "packages/shared/demo-data/asts-demo.json");
const workflowPath = resolve(repoRoot, expectedWorkflowPath);

const demoData = JSON.parse(readFileSync(demoDataPath, "utf8"));
const planPage = readFileSync(planPagePath, "utf8");
const routeSmoke = readFileSync(routeSmokePath, "utf8");
const workflow = readFileSync(workflowPath, "utf8");
const preWinTenders = demoData.tenders.filter((tender) => tender.funnel === "pre_win");
const expectedRenderedRoutes = 9 + 3 + preWinTenders.length;
const failures = [];

assert(workflow.includes(`name: ${expectedWorkflowName}`), "workflow must keep Web build name");
assert(workflow.includes(`run: ${expectedSelfCommand}`), "Web build must run rendered route failure copy smoke");
assert(workflow.includes(expectedFailingCommand), "Web build must keep rendered route smoke command");
assert(
  workflow.indexOf(`run: ${expectedSelfCommand}`) < workflow.indexOf(expectedFailingCommand),
  "rendered route failure copy smoke must run before rendered route smoke starts the server",
);

assert(planPage.includes(expectedSourceMarker), "/plan must keep web build failure copy marker");
assert(planPage.includes(expectedPlanMarker), "/plan must expose rendered route failure copy marker");
assert(planPage.includes("webBuildRenderedRouteFailureCopy"), "/plan must expose rendered route failure copy data");
assert(planPage.includes(expectedFailingCommand), "/plan must expose failing rendered route smoke command");
assert(planPage.includes(expectedRepairTargets), "/plan must expose rendered route repair targets");
assert(planPage.includes("Frontend owner + QA owner"), "/plan must expose rendered route owner role");
assert(planPage.includes("data-expected-route-count={webBuildRenderedRouteFailureCopy.expectedRouteCount}"), "/plan must expose expected route count");
assert(planPage.includes(expectedNoMergeCopy), "/plan must show owner-friendly no-merge copy");
assert(planPage.includes(`workflowPath: "${expectedWorkflowPath}"`), "/plan must expose Web build workflow path");
assert(expectedRenderedRoutes === expectedRouteCount, `route fixture must resolve to ${expectedRouteCount} rendered route checks`);
assert(routeSmoke.includes("...outcomeFilterRouteChecks"), "route smoke must keep outcome filter route checks");
assert(routeSmoke.includes("...tenderDetailRouteChecks"), "route smoke must keep tender detail route checks");
assert(routeSmoke.includes("Smoke passed for"), "route smoke must keep success summary");

if (failures.length > 0) {
  console.error("FAIL web build rendered route failure copy");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS web build rendered route failure copy (${expectedRouteCount} routes)`);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
