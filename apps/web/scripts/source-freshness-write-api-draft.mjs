import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedApiRoute = "/v1/sources/freshness";
const expectedCommand = "npm run smoke:source-freshness-write-api-draft";
const expectedDocsHref =
  "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#source-freshness-write-api-draft";
const expectedFieldCount = 12;
const expectedMethod = "POST";
const expectedNoMergeCopy =
  "Не мержить source freshness write endpoint, пока POST не проверяет owner role, breach type, idempotency key, restored evidence и immutable audit append.";
const expectedPlanMarker = 'data-testid="source-freshness-write-api-draft"';
const expectedRouteCount = 16;
const expectedStatus = "draft";
const expectedWorkflowPath = ".github/workflows/web-build.yml";

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(webRoot, "../..");
const apiReadmePath = resolve(repoRoot, "apps/api/README.md");
const apiSchemasPath = resolve(repoRoot, "apps/api/app/schemas.py");
const apiServicePath = resolve(repoRoot, "apps/api/app/services/source_freshness.py");
const apiSmokePath = resolve(repoRoot, "apps/api/scripts/smoke_connectors.py");
const demoDataPath = resolve(repoRoot, "packages/shared/demo-data/asts-demo.json");
const planPagePath = resolve(webRoot, "app/plan/page.tsx");
const routeSmokePath = resolve(webRoot, "scripts/smoke.mjs");
const sourcesPagePath = resolve(webRoot, "app/sources/page.tsx");
const workflowPath = resolve(repoRoot, expectedWorkflowPath);

const apiReadme = readFileSync(apiReadmePath, "utf8");
const apiSchemas = readFileSync(apiSchemasPath, "utf8");
const apiService = readFileSync(apiServicePath, "utf8");
const apiSmoke = readFileSync(apiSmokePath, "utf8");
const demoData = JSON.parse(readFileSync(demoDataPath, "utf8"));
const planPage = readFileSync(planPagePath, "utf8");
const routeSmoke = readFileSync(routeSmokePath, "utf8");
const sourcesPage = readFileSync(sourcesPagePath, "utf8");
const workflow = readFileSync(workflowPath, "utf8");
const preWinTenders = demoData.tenders.filter((tender) => tender.funnel === "pre_win");
const expectedRenderedRoutes = 9 + 3 + preWinTenders.length;
const failures = [];

assert(expectedRenderedRoutes === expectedRouteCount, `route fixture must resolve to ${expectedRouteCount} rendered route checks`);
assert(apiSchemas.includes("class SourceFreshnessWriteContract"), "API schemas must expose SourceFreshnessWriteContract");
assert(apiSchemas.includes("write_contract: SourceFreshnessWriteContract"), "API response must expose write_contract");
assert(apiService.includes("SOURCE_FRESHNESS_WRITE_CONTRACT"), "API service must define source freshness write contract");
assert(apiService.includes(`"route": "${expectedApiRoute}"`), "API service must keep write contract route");
assert(apiService.includes(`"method": "${expectedMethod}"`), "API service must keep POST method");
assert(apiService.includes(`"status": "${expectedStatus}"`), "API service must keep draft status");
assert(apiService.includes('"idempotency_key_required": True'), "API service must require idempotency key");
assert(apiService.includes("write_contract=SourceFreshnessWriteContract(**SOURCE_FRESHNESS_WRITE_CONTRACT)"), "API service must map write contract into DTO");
assert(apiService.includes(expectedNoMergeCopy), "API service must keep source freshness no-merge copy");

assert(apiSmoke.includes("/v1/sources/freshness write contract method must stay POST"), "API smoke must assert POST write contract");
assert(apiSmoke.includes("/v1/sources/freshness write contract must require idempotency key"), "API smoke must assert idempotency key");

assert(apiReadme.includes("### Source Freshness Write API Draft"), "API README must document source freshness write draft");
assert(apiReadme.includes("write_contract"), "API README must mention write_contract");
assert(apiReadme.includes('method="POST"'), "API README must document POST method");
assert(apiReadme.includes("immutable freshness audit storage"), "API README must document immutable freshness audit storage");

assert(sourcesPage.includes("sourceFreshnessWriteContract"), "/sources must expose write contract data object");
assert(sourcesPage.includes(expectedPlanMarker), "/sources must expose source freshness write draft marker");
assert(sourcesPage.includes("data-idempotency-key-required={String(sourceFreshnessWriteContract.idempotencyKeyRequired)}"), "/sources must expose idempotency key requirement");
assert(sourcesPage.includes("data-request-schema={sourceFreshnessWriteContract.requestSchema.join(\",\")}"), "/sources must expose request schema");

assert(planPage.includes(expectedPlanMarker), "/plan must expose source freshness write draft marker");
assert(planPage.includes(expectedCommand), "/plan must expose source freshness write draft command");
assert(planPage.includes(expectedDocsHref), "/plan must expose source freshness write docs href");
assert(planPage.includes(expectedNoMergeCopy), "/plan must expose source freshness write no-merge copy");
assert(planPage.includes("Sources owner + API owner + QA owner"), "/plan must expose source freshness write owners");

assert(routeSmoke.includes('data-testid=\\"source-freshness-write-api-draft\\"'), "route smoke must require source freshness write draft marker");
assert(routeSmoke.includes(`data-command=\\"${expectedCommand}\\"`), "route smoke must require source freshness write draft command");
assert(routeSmoke.includes(`data-docs-href=\\"${expectedDocsHref}\\"`), "route smoke must require source freshness write draft docs href");
assert(routeSmoke.includes(`data-method=\\"${expectedMethod}\\"`), "route smoke must require POST method");
assert(routeSmoke.includes(`data-status=\\"${expectedStatus}\\"`), "route smoke must require draft status");
assert(routeSmoke.includes("Write endpoint stays draft until auth"), "route smoke must require visible blocked copy");

assert(workflow.includes(`run: ${expectedCommand}`), "Web build must run source freshness write draft smoke");
assert(
  workflow.indexOf("run: npm run smoke:source-owner-receipt-write-api-draft") < workflow.indexOf(`run: ${expectedCommand}`),
  "source freshness write draft smoke must run after source owner receipt write draft smoke",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf("run: npm run smoke:source-freshness-rendered-route-failure-copy"),
  "source freshness write draft smoke must run before source freshness rendered route smoke",
);

if (failures.length > 0) {
  console.error("FAIL source freshness write API draft");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS source freshness write API draft (${expectedRouteCount} routes, ${expectedFieldCount} request fields)`);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
