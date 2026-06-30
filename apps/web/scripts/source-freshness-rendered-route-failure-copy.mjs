import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedApiRoute = "/v1/sources/freshness";
const expectedBlockedCount = 4;
const expectedBreachCount = 4;
const expectedBreachTypes = ["stale", "missing", "parse_failed", "hash_mismatch"];
const expectedCommand = "npm run smoke:source-freshness-rendered-route-failure-copy";
const expectedDocsHref =
  "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#source-freshness-contract";
const expectedNoMergeCopy =
  "Не мержить, пока rendered routes smoke снова подтверждает source freshness queue, breach types и AI gate на живом `/sources`";
const expectedPlanMarker = 'data-testid="source-freshness-rendered-route-failure-copy"';
const expectedRepairTargets =
  "/sources,apps/web/lib/mock-data.ts,apps/web/scripts/smoke.mjs,apps/api/README.md#source-freshness-contract";
const expectedRouteCount = 16;
const expectedSourceMarker = 'data-testid="source-freshness-breach-queue"';
const expectedWorkflowName = "Web build";
const expectedWorkflowPath = ".github/workflows/web-build.yml";

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(webRoot, "../..");
const apiReadmePath = resolve(repoRoot, "apps/api/README.md");
const apiServicePath = resolve(repoRoot, "apps/api/app/services/source_freshness.py");
const demoDataPath = resolve(repoRoot, "packages/shared/demo-data/asts-demo.json");
const mockDataPath = resolve(webRoot, "lib/mock-data.ts");
const planPagePath = resolve(webRoot, "app/plan/page.tsx");
const routeSmokePath = resolve(webRoot, "scripts/smoke.mjs");
const sourcesPagePath = resolve(webRoot, "app/sources/page.tsx");
const workflowPath = resolve(repoRoot, expectedWorkflowPath);

const apiReadme = readFileSync(apiReadmePath, "utf8");
const apiService = readFileSync(apiServicePath, "utf8");
const demoData = JSON.parse(readFileSync(demoDataPath, "utf8"));
const mockData = readFileSync(mockDataPath, "utf8");
const planPage = readFileSync(planPagePath, "utf8");
const routeSmoke = readFileSync(routeSmokePath, "utf8");
const sourcesPage = readFileSync(sourcesPagePath, "utf8");
const workflow = readFileSync(workflowPath, "utf8");
const preWinTenders = demoData.tenders.filter((tender) => tender.funnel === "pre_win");
const expectedRenderedRoutes = 9 + 3 + preWinTenders.length;
const failures = [];

assert(expectedRenderedRoutes === expectedRouteCount, `route fixture must resolve to ${expectedRouteCount} rendered route checks`);
assert(apiReadme.includes("## Source Freshness Contract"), "API README must keep source freshness contract anchor");
assert(apiReadme.includes(expectedApiRoute), "API README must mention source freshness API route");
assert(apiReadme.includes('ai_gate="blocked"'), "API README must keep blocked AI gate copy");
assert(apiService.includes("def get_source_freshness()"), "API service must keep source freshness endpoint service");
assert(apiService.includes("Primary-source freshness breaches block AI"), "API service must keep primary-source policy copy");

for (const breachType of expectedBreachTypes) {
  assert(mockData.includes(`breachType: "${breachType}"`), `mock data must keep ${breachType} breach row`);
  assert(apiService.includes(`breach_type="${breachType}"`), `API service must keep ${breachType} breach row`);
}

assert(sourcesPage.includes(expectedSourceMarker), "/sources must keep source freshness breach queue marker");
assert(
  sourcesPage.includes("sourceFreshnessBreachQueue.filter((item) => item.aiGate === \"blocked\").length"),
  "/sources must derive blocked count from freshness queue",
);
assert(sourcesPage.includes("data-source-url={item.sourceUrl}"), "/sources must expose source URL evidence");
assert(sourcesPage.includes("data-raw-artifact-id={item.rawArtifactId}"), "/sources must expose raw artifact evidence");
assert(routeSmoke.includes('data-testid=\\"source-freshness-breach-queue\\"'), "route smoke must require freshness queue marker");
assert(routeSmoke.includes(`data-total-count=\\"${expectedBreachCount}\\"`), "route smoke must keep freshness total count");
assert(routeSmoke.includes(`data-ai-blocked-count=\\"${expectedBlockedCount}\\"`), "route smoke must keep freshness blocked count");
assert(
  routeSmoke.includes('data-breach-types=\\"stale,missing,parse_failed,hash_mismatch\\"'),
  "route smoke must keep all four freshness breach types",
);
assert(routeSmoke.includes("data-source-url"), "route smoke must require source URL evidence");
assert(routeSmoke.includes("data-raw-artifact-id"), "route smoke must require raw artifact evidence");

assert(workflow.includes(`name: ${expectedWorkflowName}`), "workflow must keep Web build name");
assert(workflow.includes(`run: ${expectedCommand}`), "Web build must run source freshness rendered route failure copy smoke");
assert(
  workflow.indexOf("run: npm run smoke:source-owner-receipts-rendered-route-failure-copy") <
    workflow.indexOf(`run: ${expectedCommand}`),
  "source freshness rendered route smoke must run after source owner receipts rendered route smoke",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) <
    workflow.indexOf("run: npm run smoke:owner-receipt-docs-rendered-route-failure-copy"),
  "source freshness rendered route smoke must run before owner receipt docs rendered route smoke",
);

assert(planPage.includes(expectedPlanMarker), "/plan must expose source freshness rendered route failure copy marker");
assert(planPage.includes("sourceFreshnessRenderedRouteFailureCopy"), "/plan must expose source freshness failure copy data");
assert(planPage.includes(expectedApiRoute), "/plan must expose source freshness API route");
assert(planPage.includes(expectedDocsHref), "/plan must expose source freshness docs link");
assert(planPage.includes(expectedNoMergeCopy), "/plan must show source freshness no-merge copy");
assert(planPage.includes(expectedRepairTargets), "/plan must expose source freshness repair targets");
assert(planPage.includes("Sources owner + QA owner"), "/plan must expose source freshness owner role");
assert(
  planPage.includes("data-expected-breach-count={sourceFreshnessRenderedRouteFailureCopy.expectedBreachCount}"),
  "/plan must expose expected freshness breach count",
);
assert(
  planPage.includes("data-expected-blocked-count={sourceFreshnessRenderedRouteFailureCopy.expectedBlockedCount}"),
  "/plan must expose expected freshness blocked count",
);
assert(
  planPage.includes("data-expected-route-count={sourceFreshnessRenderedRouteFailureCopy.expectedRouteCount}"),
  "/plan must expose expected route count",
);

if (failures.length > 0) {
  console.error("FAIL source freshness rendered route failure copy");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS source freshness rendered route failure copy (${expectedRouteCount} routes, ${expectedBreachCount} breaches)`);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
