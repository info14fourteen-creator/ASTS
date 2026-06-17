import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedFailingCommand = "npm run smoke:ai-review-api-readme -- --url http://127.0.0.1:4177";
const expectedNoMergeCopy =
  "Не мержить, пока rendered routes smoke снова подтверждает `/plan` + `/ai-review` API README parity";
const expectedPlanMarker = 'data-testid="ai-review-api-readme-rendered-route-failure-copy"';
const expectedRepairTargets =
  "/plan,/ai-review,apps/api/README.md#ai-review-queue-contract,apps/web/scripts/ai-review-api-readme-parity.mjs";
const expectedRouteCount = 16;
const expectedSelfCommand = "npm run smoke:ai-review-api-readme-rendered-route-failure-copy";
const expectedSourceMarker = 'data-testid="ai-review-api-readme-failure-copy"';
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
assert(workflow.includes(`run: ${expectedSelfCommand}`), "Web build must run AI review API README rendered route failure copy smoke");
assert(workflow.includes(expectedFailingCommand), "Web build must keep live AI review API README parity command");
assert(
  workflow.indexOf(`run: ${expectedSelfCommand}`) < workflow.indexOf(expectedFailingCommand),
  "AI review API README rendered route failure copy smoke must run before live parity command",
);

assert(planPage.includes(expectedSourceMarker), "/plan must keep AI review API README failure copy marker");
assert(planPage.includes(expectedPlanMarker), "/plan must expose AI review API README rendered route failure copy marker");
assert(
  planPage.includes("aiReviewApiReadmeRenderedRouteFailureCopy"),
  "/plan must expose AI review API README rendered route failure copy data",
);
assert(planPage.includes(expectedFailingCommand), "/plan must expose failing live parity command");
assert(planPage.includes(expectedRepairTargets), "/plan must expose AI review API README rendered route repair targets");
assert(planPage.includes("API owner + QA owner"), "/plan must expose AI review API README rendered route owner role");
assert(
  planPage.includes("data-expected-route-count={aiReviewApiReadmeRenderedRouteFailureCopy.expectedRouteCount}"),
  "/plan must expose expected route count",
);
assert(planPage.includes(expectedNoMergeCopy), "/plan must show owner-friendly no-merge copy");
assert(planPage.includes(`workflowPath: "${expectedWorkflowPath}"`), "/plan must expose Web build workflow path");
assert(expectedRenderedRoutes === expectedRouteCount, `route fixture must resolve to ${expectedRouteCount} rendered route checks`);
assert(routeSmoke.includes("ai-review-api-readme-rendered-route-failure-copy"), "route smoke must require rendered copy marker");
assert(
  routeSmoke.includes("Что делать, если AI review API README parity упала в rendered routes"),
  "route smoke must require rendered copy title",
);

if (failures.length > 0) {
  console.error("FAIL AI review API README rendered route failure copy");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS AI review API README rendered route failure copy (${expectedRouteCount} routes)`);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
