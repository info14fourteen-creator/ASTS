import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedApiRoute = "/v1/sources/owner-receipts";
const expectedCommand = "npm run smoke:source-owner-receipt-write-api-draft";
const expectedDocsHref =
  "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#source-owner-receipt-write-api-draft";
const expectedFieldCount = 10;
const expectedMethod = "POST";
const expectedNoMergeCopy =
  "Не мержить source owner receipt write endpoint, пока POST не проверяет owner role, idempotency key, checksum evidence и immutable audit append.";
const expectedPlanMarker = 'data-testid="source-owner-receipt-write-api-draft"';
const expectedRouteCount = 16;
const expectedStatus = "draft";
const expectedWorkflowPath = ".github/workflows/web-build.yml";

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(webRoot, "../..");
const apiReadmePath = resolve(repoRoot, "apps/api/README.md");
const apiSchemasPath = resolve(repoRoot, "apps/api/app/schemas.py");
const apiServicePath = resolve(repoRoot, "apps/api/app/services/source_owner_receipts.py");
const apiSmokePath = resolve(repoRoot, "apps/api/scripts/smoke_connectors.py");
const demoDataPath = resolve(repoRoot, "packages/shared/demo-data/asts-demo.json");
const fixturePath = resolve(repoRoot, "packages/shared/source-owner-receipts.json");
const fixtureSchemaPath = resolve(repoRoot, "packages/shared/fixture-schemas/source-owner-receipts.schema.json");
const planPagePath = resolve(webRoot, "app/plan/page.tsx");
const routeSmokePath = resolve(webRoot, "scripts/smoke.mjs");
const sourcesPagePath = resolve(webRoot, "app/sources/page.tsx");
const workflowPath = resolve(repoRoot, expectedWorkflowPath);

const apiReadme = readFileSync(apiReadmePath, "utf8");
const apiSchemas = readFileSync(apiSchemasPath, "utf8");
const apiService = readFileSync(apiServicePath, "utf8");
const apiSmoke = readFileSync(apiSmokePath, "utf8");
const demoData = JSON.parse(readFileSync(demoDataPath, "utf8"));
const fixture = JSON.parse(readFileSync(fixturePath, "utf8"));
const fixtureSchema = readFileSync(fixtureSchemaPath, "utf8");
const planPage = readFileSync(planPagePath, "utf8");
const routeSmoke = readFileSync(routeSmokePath, "utf8");
const sourcesPage = readFileSync(sourcesPagePath, "utf8");
const workflow = readFileSync(workflowPath, "utf8");
const preWinTenders = demoData.tenders.filter((tender) => tender.funnel === "pre_win");
const expectedRenderedRoutes = 9 + 3 + preWinTenders.length;
const failures = [];

assert(expectedRenderedRoutes === expectedRouteCount, `route fixture must resolve to ${expectedRouteCount} rendered route checks`);
assert(fixture.write_contract?.route === expectedApiRoute, "source owner write contract route changed");
assert(fixture.write_contract?.method === expectedMethod, "source owner write contract method changed");
assert(fixture.write_contract?.status === expectedStatus, "source owner write contract status changed");
assert(fixture.write_contract?.owner === "Sources owner", "source owner write contract owner changed");
assert(fixture.write_contract?.idempotency_key_required === true, "source owner write contract must require idempotency key");
assert(fixture.write_contract?.request_schema?.length === expectedFieldCount, "source owner write contract must keep 10 request fields");
assert(fixture.write_contract?.request_schema?.includes("idempotency_key"), "source owner write contract must include idempotency_key");
assert(fixture.write_contract?.no_merge_copy === expectedNoMergeCopy, "source owner write no-merge copy changed");

assert(fixtureSchema.includes('"write_contract"'), "source owner receipt schema must require write_contract");
assert(fixtureSchema.includes('"const": "POST"'), "source owner receipt schema must pin POST method");
assert(fixtureSchema.includes('"const": "draft"'), "source owner receipt schema must pin draft status");
assert(fixtureSchema.includes('"idempotency_key"'), "source owner receipt schema must require idempotency_key");

assert(apiSchemas.includes("class SourceOwnerReceiptWriteContract"), "API schemas must expose SourceOwnerReceiptWriteContract");
assert(apiSchemas.includes("write_contract: SourceOwnerReceiptWriteContract"), "API response must expose write_contract");
assert(apiService.includes('write_contract=SourceOwnerReceiptWriteContract(**fixture["write_contract"])'), "API service must map write_contract fixture into DTO");
assert(apiSmoke.includes("write contract method must stay POST"), "API smoke must assert POST write contract");
assert(apiSmoke.includes("write contract must require idempotency key"), "API smoke must assert idempotency key");

assert(apiReadme.includes("### Source Owner Receipt Write API Draft"), "API README must document source owner receipt write draft");
assert(apiReadme.includes("write_contract"), "API README must mention write_contract");
assert(apiReadme.includes('method="POST"'), "API README must document POST method");
assert(apiReadme.includes("immutable audit append"), "API README must document immutable audit append");

assert(sourcesPage.includes("sourceOwnerReceiptWriteContract"), "/sources must expose write contract data object");
assert(sourcesPage.includes(expectedPlanMarker), "/sources must expose source owner receipt write draft marker");
assert(sourcesPage.includes("data-idempotency-key-required={String(sourceOwnerReceiptWriteContract.idempotency_key_required)}"), "/sources must expose idempotency key requirement");
assert(sourcesPage.includes("data-request-schema={sourceOwnerReceiptWriteContract.request_schema.join(\",\")}"), "/sources must expose request schema");

assert(planPage.includes(expectedPlanMarker), "/plan must expose source owner receipt write draft marker");
assert(planPage.includes(expectedCommand), "/plan must expose source owner receipt write draft command");
assert(planPage.includes(expectedDocsHref), "/plan must expose source owner receipt write docs href");
assert(planPage.includes(expectedNoMergeCopy), "/plan must expose source owner receipt write no-merge copy");
assert(planPage.includes("Sources owner + API owner + QA owner"), "/plan must expose source owner receipt write owners");

assert(routeSmoke.includes('data-testid=\\"source-owner-receipt-write-api-draft\\"'), "route smoke must require write draft marker");
assert(routeSmoke.includes(`data-command=\\"${expectedCommand}\\"`), "route smoke must require write draft command");
assert(routeSmoke.includes(`data-docs-href=\\"${expectedDocsHref}\\"`), "route smoke must require write draft docs href");
assert(routeSmoke.includes(`data-method=\\"${expectedMethod}\\"`), "route smoke must require POST method");
assert(routeSmoke.includes(`data-status=\\"${expectedStatus}\\"`), "route smoke must require draft status");
assert(routeSmoke.includes("Write endpoint stays draft until auth"), "route smoke must require visible blocked copy");

assert(workflow.includes(`run: ${expectedCommand}`), "Web build must run source owner receipt write draft smoke");
assert(
  workflow.indexOf("run: npm run smoke:owner-receipt-api-rendered-route-failure-copy") < workflow.indexOf(`run: ${expectedCommand}`),
  "source owner receipt write draft smoke must run after owner receipt API rendered route smoke",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf("run: npm run smoke:source-freshness-rendered-route-failure-copy"),
  "source owner receipt write draft smoke must run before source freshness rendered route smoke",
);

if (failures.length > 0) {
  console.error("FAIL source owner receipt write API draft");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS source owner receipt write API draft (${expectedRouteCount} routes, ${expectedFieldCount} request fields)`);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
