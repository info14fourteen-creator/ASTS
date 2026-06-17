import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedApiRoute = "/v1/sources/owner-receipts";
const expectedBlockedUntilRestoredCount = 2;
const expectedCommand = "npm run smoke:owner-receipt-api-rendered-route-failure-copy";
const expectedDocsHref =
  "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#source-owner-receipt-contract";
const expectedHistoryCount = 4;
const expectedNoMergeCopy =
  "Не мержить, пока rendered routes smoke снова подтверждает owner receipt API route, shared fixture и `/sources` history markers";
const expectedParityCommand = "npm run smoke:owner-receipts";
const expectedPlanMarker = 'data-testid="owner-receipt-api-rendered-route-failure-copy"';
const expectedRepairTargets =
  "apps/api/app/main.py,apps/api/app/services/source_owner_receipts.py,packages/shared/source-owner-receipts.json,/sources,apps/web/scripts/smoke.mjs";
const expectedRouteCount = 16;
const expectedSourceMarker = 'data-testid="source-owner-receipt-history"';
const expectedWorkflowName = "Web build";
const expectedWorkflowPath = ".github/workflows/web-build.yml";

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(webRoot, "../..");
const apiMainPath = resolve(repoRoot, "apps/api/app/main.py");
const apiReadmePath = resolve(repoRoot, "apps/api/README.md");
const apiServicePath = resolve(repoRoot, "apps/api/app/services/source_owner_receipts.py");
const demoDataPath = resolve(repoRoot, "packages/shared/demo-data/asts-demo.json");
const fixturePath = resolve(repoRoot, "packages/shared/source-owner-receipts.json");
const planPagePath = resolve(webRoot, "app/plan/page.tsx");
const routeSmokePath = resolve(webRoot, "scripts/smoke.mjs");
const sourcesPagePath = resolve(webRoot, "app/sources/page.tsx");
const workflowPath = resolve(repoRoot, expectedWorkflowPath);

const apiMain = readFileSync(apiMainPath, "utf8");
const apiReadme = readFileSync(apiReadmePath, "utf8");
const apiService = readFileSync(apiServicePath, "utf8");
const demoData = JSON.parse(readFileSync(demoDataPath, "utf8"));
const fixture = JSON.parse(readFileSync(fixturePath, "utf8"));
const planPage = readFileSync(planPagePath, "utf8");
const routeSmoke = readFileSync(routeSmokePath, "utf8");
const sourcesPage = readFileSync(sourcesPagePath, "utf8");
const workflow = readFileSync(workflowPath, "utf8");
const preWinTenders = demoData.tenders.filter((tender) => tender.funnel === "pre_win");
const expectedRenderedRoutes = 9 + 3 + preWinTenders.length;
const failures = [];

assert(Array.isArray(fixture.rules), "owner receipt fixture must expose rules");
assert(Array.isArray(fixture.history), "owner receipt fixture must expose history");
assert(fixture.rules.length === expectedHistoryCount, "owner receipt fixture must keep 4 rules");
assert(fixture.history.length === expectedHistoryCount, "owner receipt fixture must keep 4 history rows");
assert(
  fixture.history.filter((receipt) => receipt.ai_gate === "blocked_until_restored").length ===
    expectedBlockedUntilRestoredCount,
  "owner receipt fixture must keep 2 blocked_until_restored history rows",
);
assert(expectedRenderedRoutes === expectedRouteCount, `route fixture must resolve to ${expectedRouteCount} rendered route checks`);

assert(apiMain.includes(`@app.get("${expectedApiRoute}"`), "FastAPI main must expose owner receipt route");
assert(apiMain.includes("response_model=SourceOwnerReceiptsResponse"), "FastAPI route must keep owner receipt response model");
assert(apiMain.includes("return get_source_owner_receipts()"), "FastAPI route must call owner receipt service");
assert(apiService.includes("SHARED_OWNER_RECEIPTS_PATH"), "API service must keep shared owner receipts path constant");
assert(apiService.includes("packages/shared/source-owner-receipts.json"), "API service must load shared owner receipt fixture");
assert(apiService.includes("history_blocked_until_restored"), "API service must keep blocked history summary");
assert(apiReadme.includes("## Source Owner Receipt Contract"), "API README must keep owner receipt contract anchor");
assert(apiReadme.includes(expectedApiRoute), "API README must mention owner receipt route");
assert(apiReadme.includes("summary.history_total=4"), "API README must keep owner receipt history count contract");
assert(apiReadme.includes("summary.history_blocked_until_restored=2"), "API README must keep blocked history count contract");

assert(workflow.includes(`name: ${expectedWorkflowName}`), "workflow must keep Web build name");
assert(workflow.includes(`run: ${expectedParityCommand}`), "Web build must keep owner receipt parity smoke");
assert(workflow.includes("run: npm run smoke:source-owner-receipts-rendered-route-failure-copy"), "Web build must keep source owner receipts rendered smoke");
assert(workflow.includes(`run: ${expectedCommand}`), "Web build must run owner receipt API rendered route failure copy smoke");
assert(
  workflow.indexOf("run: npm run smoke:source-owner-receipts-rendered-route-failure-copy") <
    workflow.indexOf(`run: ${expectedCommand}`),
  "owner receipt API rendered route smoke must run after source owner receipts rendered route smoke",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) <
    workflow.indexOf("run: npm run smoke:source-freshness-rendered-route-failure-copy"),
  "owner receipt API rendered route smoke must run before source freshness rendered route smoke",
);

assert(sourcesPage.includes(expectedSourceMarker), "/sources must keep owner receipt history marker");
assert(sourcesPage.includes("../../../../packages/shared/source-owner-receipts.json"), "/sources must import shared owner receipt fixture");
assert(sourcesPage.includes("data-api-route={sourceOwnerReceiptHistoryBrowserLoop.apiRoute}"), "/sources must expose owner receipt API route");
assert(sourcesPage.includes("data-history-count={sourceOwnerReceiptHistory.length}"), "/sources must expose owner receipt history count");
assert(sourcesPage.includes("data-blocked-count={sourceOwnerReceiptHistoryBrowserLoop.expectedBlockedCount}"), "/sources must expose blocked history count");
assert(routeSmoke.includes('data-testid=\\"source-owner-receipt-history\\"'), "route smoke must require owner receipt history marker");
assert(routeSmoke.includes(`data-history-count=\\"${expectedHistoryCount}\\"`), "route smoke must keep owner receipt history count");
assert(routeSmoke.includes(`data-blocked-count=\\"${expectedBlockedUntilRestoredCount}\\"`), "route smoke must keep blocked receipt count");
assert(routeSmoke.includes(expectedApiRoute), "route smoke must keep owner receipt API route");

assert(planPage.includes(expectedPlanMarker), "/plan must expose owner receipt API rendered route failure copy marker");
assert(planPage.includes("ownerReceiptApiRenderedRouteFailureCopy"), "/plan must expose owner receipt API failure copy data");
assert(planPage.includes(expectedDocsHref), "/plan must expose owner receipt docs href");
assert(planPage.includes("href={ownerReceiptApiRenderedRouteFailureCopy.docsHref}"), "/plan must render owner receipt docs href");
assert(planPage.includes(expectedNoMergeCopy), "/plan must show owner receipt API no-merge copy");
assert(planPage.includes(expectedParityCommand), "/plan must expose owner receipt parity command");
assert(planPage.includes(expectedRepairTargets), "/plan must expose owner receipt API repair targets");
assert(planPage.includes("API owner + Sources owner + QA owner"), "/plan must expose owner receipt API owner role");
assert(
  planPage.includes("data-expected-history-count={ownerReceiptApiRenderedRouteFailureCopy.expectedHistoryCount}"),
  "/plan must expose expected owner receipt history count",
);
assert(
  planPage.includes(
    "data-expected-blocked-until-restored-count={\n            ownerReceiptApiRenderedRouteFailureCopy.expectedBlockedUntilRestoredCount\n          }",
  ),
  "/plan must expose expected blocked_until_restored count",
);
assert(
  planPage.includes("data-api-service-path={ownerReceiptApiRenderedRouteFailureCopy.apiServicePath}"),
  "/plan must expose owner receipt API service path",
);

if (failures.length > 0) {
  console.error("FAIL owner receipt API rendered route failure copy");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(
  `PASS owner receipt API rendered route failure copy (${expectedRouteCount} routes, ${expectedHistoryCount} receipts)`,
);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
