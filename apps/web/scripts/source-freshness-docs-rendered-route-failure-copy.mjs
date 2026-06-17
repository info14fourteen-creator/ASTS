import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedApiRoute = "/v1/sources/freshness";
const expectedBreachCount = 4;
const expectedCommand = "npm run smoke:source-freshness-docs-rendered-route-failure-copy";
const expectedDocsHref =
  "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#source-freshness-contract";
const expectedNoMergeCopy =
  "Не мержить, пока rendered routes smoke снова подтверждает source freshness docs link и API README anchor на живом `/sources`";
const expectedPlanMarker = 'data-testid="source-freshness-docs-rendered-route-failure-copy"';
const expectedRepairTargets =
  "/sources,apps/api/README.md#source-freshness-contract,apps/web/lib/mock-data.ts,apps/web/scripts/smoke.mjs";
const expectedRouteCount = 16;
const expectedSourceMarker = 'data-testid="source-freshness-docs-link"';

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(webRoot, "../..");
const apiReadmePath = resolve(repoRoot, "apps/api/README.md");
const demoDataPath = resolve(repoRoot, "packages/shared/demo-data/asts-demo.json");
const mockDataPath = resolve(webRoot, "lib/mock-data.ts");
const planPagePath = resolve(webRoot, "app/plan/page.tsx");
const routeSmokePath = resolve(webRoot, "scripts/smoke.mjs");
const sourcesPagePath = resolve(webRoot, "app/sources/page.tsx");
const workflowPath = resolve(repoRoot, ".github/workflows/web-build.yml");

const apiReadme = readFileSync(apiReadmePath, "utf8");
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
assert(apiReadme.includes("## Source Freshness Contract"), "API README must keep Source Freshness Contract anchor");
assert(apiReadme.includes(expectedApiRoute), "API README must mention source freshness route");
assert(apiReadme.includes("freshness breach queue"), "API README must keep freshness breach queue copy");
assert(mockData.includes("apiRoute: \"/v1/sources/freshness\""), "mock data must expose source freshness API route");
assert(mockData.includes(expectedDocsHref), "mock data must expose source freshness docs href");
assert(mockData.includes("sourceFreshnessBrowserLoop"), "mock data must keep source freshness browser loop");

assert(sourcesPage.includes(expectedSourceMarker), "/sources must keep source freshness docs link marker");
assert(sourcesPage.includes("data-api-route={sourceFreshnessBrowserLoop.apiRoute}"), "/sources docs link must expose freshness API route");
assert(sourcesPage.includes("href={sourceFreshnessBrowserLoop.docsHref}"), "/sources docs link must render freshness docs href");
assert(sourcesPage.includes("API README / freshness"), "/sources docs link text must stay visible");

assert(routeSmoke.includes('data-testid=\\"source-freshness-docs-link\\"'), "route smoke must require source freshness docs link marker");
assert(routeSmoke.includes(`href=\\"${expectedDocsHref}\\"`), "route smoke must require source freshness docs href");
assert(routeSmoke.includes(`data-api-route=\\"${expectedApiRoute}\\"`), "route smoke must require source freshness API route");
assert(routeSmoke.includes("API README / freshness"), "route smoke must require visible source freshness docs copy");

assert(workflow.includes(`run: ${expectedCommand}`), "Web build must run source freshness docs rendered route failure copy smoke");
assert(
  workflow.indexOf("run: npm run smoke:source-freshness-rendered-route-failure-copy") <
    workflow.indexOf(`run: ${expectedCommand}`),
  "source freshness docs smoke must run after source freshness rendered route smoke",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) <
    workflow.indexOf("run: npm run smoke:owner-receipt-docs-rendered-route-failure-copy"),
  "source freshness docs smoke must run before owner receipt docs rendered route smoke",
);

assert(planPage.includes(expectedPlanMarker), "/plan must expose source freshness docs rendered route failure copy marker");
assert(planPage.includes("sourceFreshnessDocsRenderedRouteFailureCopy"), "/plan must expose source freshness docs failure copy data");
assert(planPage.includes(expectedDocsHref), "/plan must expose source freshness docs href");
assert(planPage.includes("href={sourceFreshnessDocsRenderedRouteFailureCopy.docsHref}"), "/plan must render source freshness docs href");
assert(planPage.includes(expectedNoMergeCopy), "/plan must show source freshness docs no-merge copy");
assert(planPage.includes(expectedRepairTargets), "/plan must expose source freshness docs repair targets");
assert(planPage.includes("Sources owner + Docs owner + QA owner"), "/plan must expose source freshness docs owner role");
assert(
  planPage.includes("data-expected-breach-count={sourceFreshnessDocsRenderedRouteFailureCopy.expectedBreachCount}"),
  "/plan must expose expected freshness breach count",
);
assert(
  planPage.includes("data-source-marker-selector={sourceFreshnessDocsRenderedRouteFailureCopy.sourceMarkerSelector}"),
  "/plan must expose source freshness docs marker selector",
);

if (failures.length > 0) {
  console.error("FAIL source freshness docs rendered route failure copy");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS source freshness docs rendered route failure copy (${expectedRouteCount} routes, ${expectedBreachCount} breaches)`);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
