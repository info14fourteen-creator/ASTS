import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedCheckCount = 14;
const expectedFailingCommand = "npm run smoke -- --url http://127.0.0.1:4177/";
const expectedNoMergeCopy =
  "Не мержить, пока rendered routes smoke снова покрывает shared validation markers на живом `/plan`";
const expectedPlanMarker = 'data-testid="shared-validation-rendered-route-failure-copy"';
const expectedRepairTargets =
  "apps/web/scripts/smoke.mjs,apps/web/app/plan/page.tsx,packages/shared/**,/plan,[data-testid='shared-validation-failure-copy']";
const expectedRouteCount = 16;
const expectedSelfCommand = "npm run smoke:shared-validation-rendered-route-failure-copy";
const expectedSourceMarker = 'data-testid="shared-validation-failure-copy"';
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
assert(workflow.includes(`run: ${expectedSelfCommand}`), "Web build must run shared validation rendered route failure copy smoke");
assert(workflow.includes(expectedFailingCommand), "Web build must keep rendered route smoke command");
assert(
  workflow.indexOf(`run: ${expectedSelfCommand}`) < workflow.indexOf(expectedFailingCommand),
  "shared validation rendered route failure copy smoke must run before rendered route smoke starts the server",
);

assert(planPage.includes(expectedSourceMarker), "/plan must keep shared validation failure copy marker");
assert(planPage.includes(expectedPlanMarker), "/plan must expose shared validation rendered route failure copy marker");
assert(
  planPage.includes("sharedValidationRenderedRouteFailureCopy"),
  "/plan must expose shared validation rendered route failure copy data",
);
assert(planPage.includes(expectedFailingCommand), "/plan must expose failing rendered route smoke command");
assert(planPage.includes(expectedRepairTargets), "/plan must expose shared validation rendered route repair targets");
assert(planPage.includes("Schema owner + QA owner"), "/plan must expose shared validation rendered route owner role");
assert(
  planPage.includes("data-check-count={sharedValidationRenderedRouteFailureCopy.checkCount}"),
  "/plan must expose shared validation rendered route check count",
);
assert(
  planPage.includes("data-expected-route-count={sharedValidationRenderedRouteFailureCopy.expectedRouteCount}"),
  "/plan must expose expected route count",
);
assert(planPage.includes(expectedNoMergeCopy), "/plan must show owner-friendly no-merge copy");
assert(planPage.includes(`workflowPath: "${expectedWorkflowPath}"`), "/plan must expose Web build workflow path");
assert(expectedRenderedRoutes === expectedRouteCount, `route fixture must resolve to ${expectedRouteCount} rendered route checks`);
assert(planPage.includes(`checkCount: ${expectedCheckCount}`), "/plan must keep shared validation 14-check context");
assert(routeSmoke.includes("shared-validation-rendered-route-failure-copy"), "route smoke must require rendered copy marker");
assert(routeSmoke.includes("Что делать, если shared validation пропала в rendered routes"), "route smoke must require rendered copy title");

if (failures.length > 0) {
  console.error("FAIL shared validation rendered route failure copy");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS shared validation rendered route failure copy (${expectedRouteCount} routes, ${expectedCheckCount} checks)`);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
