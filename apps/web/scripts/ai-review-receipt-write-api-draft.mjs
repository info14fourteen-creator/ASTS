import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedApiRoute = "/v1/ai/review-queue";
const expectedCommand = "npm run smoke:ai-review-receipt-write-api-draft";
const expectedDocsHref =
  "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#ai-review-receipt-write-api-draft";
const expectedFieldCount = 11;
const expectedMethod = "POST";
const expectedNoMergeCopy =
  "Не мержить AI review receipt write endpoint, пока POST не проверяет owner role, decision, idempotency key, source evidence и immutable audit append.";
const expectedPlanMarker = 'data-testid="ai-review-receipt-write-api-draft"';
const expectedRouteCount = 16;
const expectedStatus = "draft";
const expectedWorkflowPath = ".github/workflows/web-build.yml";

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(webRoot, "../..");
const apiReadmePath = resolve(repoRoot, "apps/api/README.md");
const apiSchemasPath = resolve(repoRoot, "apps/api/app/schemas.py");
const apiServicePath = resolve(repoRoot, "apps/api/app/services/ai_review.py");
const apiSmokePath = resolve(repoRoot, "apps/api/scripts/smoke_connectors.py");
const demoDataPath = resolve(repoRoot, "packages/shared/demo-data/asts-demo.json");
const fixturePath = resolve(repoRoot, "packages/shared/ai-review-queue.json");
const fixtureSchemaPath = resolve(repoRoot, "packages/shared/fixture-schemas/ai-review-queue.schema.json");
const aiReviewPagePath = resolve(webRoot, "app/ai-review/page.tsx");
const planPagePath = resolve(webRoot, "app/plan/page.tsx");
const routeSmokePath = resolve(webRoot, "scripts/smoke.mjs");
const workflowPath = resolve(repoRoot, expectedWorkflowPath);

const apiReadme = readFileSync(apiReadmePath, "utf8");
const apiSchemas = readFileSync(apiSchemasPath, "utf8");
const apiService = readFileSync(apiServicePath, "utf8");
const apiSmoke = readFileSync(apiSmokePath, "utf8");
const demoData = JSON.parse(readFileSync(demoDataPath, "utf8"));
const fixture = JSON.parse(readFileSync(fixturePath, "utf8"));
const fixtureSchema = readFileSync(fixtureSchemaPath, "utf8");
const aiReviewPage = readFileSync(aiReviewPagePath, "utf8");
const planPage = readFileSync(planPagePath, "utf8");
const routeSmoke = readFileSync(routeSmokePath, "utf8");
const workflow = readFileSync(workflowPath, "utf8");
const preWinTenders = demoData.tenders.filter((tender) => tender.funnel === "pre_win");
const expectedRenderedRoutes = 9 + 3 + preWinTenders.length;
const failures = [];

assert(expectedRenderedRoutes === expectedRouteCount, `route fixture must resolve to ${expectedRouteCount} rendered route checks`);
assert(fixture.write_contract?.route === expectedApiRoute, "AI review write contract route changed");
assert(fixture.write_contract?.method === expectedMethod, "AI review write contract method changed");
assert(fixture.write_contract?.status === expectedStatus, "AI review write contract status changed");
assert(fixture.write_contract?.owner === "AI workflow owner", "AI review write contract owner changed");
assert(fixture.write_contract?.idempotency_key_required === true, "AI review write contract must require idempotency key");
assert(fixture.write_contract?.request_schema?.length === expectedFieldCount, "AI review write contract must keep 11 request fields");
assert(fixture.write_contract?.request_schema?.includes("idempotency_key"), "AI review write contract must include idempotency_key");
assert(fixture.write_contract?.no_merge_copy === expectedNoMergeCopy, "AI review write no-merge copy changed");

assert(fixtureSchema.includes('"write_contract"'), "AI review queue schema must require write_contract");
assert(fixtureSchema.includes('"const": "POST"'), "AI review queue schema must pin POST method");
assert(fixtureSchema.includes('"const": "draft"'), "AI review queue schema must pin draft status");
assert(fixtureSchema.includes('"idempotency_key"'), "AI review queue schema must require idempotency_key");

assert(apiSchemas.includes("class AiReviewReceiptWriteContract"), "API schemas must expose AiReviewReceiptWriteContract");
assert(apiSchemas.includes("write_contract: AiReviewReceiptWriteContract"), "API response must expose write_contract");
assert(
  apiService.includes('write_contract=AiReviewReceiptWriteContract(**fixture["write_contract"])'),
  "API service must map write_contract fixture into DTO",
);
assert(apiSmoke.includes("write contract method must stay POST"), "API smoke must assert POST write contract");
assert(apiSmoke.includes("write contract must require idempotency key"), "API smoke must assert idempotency key");

assert(apiReadme.includes("### AI Review Receipt Write API Draft"), "API README must document AI review receipt write draft");
assert(apiReadme.includes("write_contract"), "API README must mention write_contract");
assert(apiReadme.includes('method="POST"'), "API README must document POST method");
assert(apiReadme.includes("immutable AI audit storage"), "API README must document immutable AI audit storage");

assert(aiReviewPage.includes("aiReviewReceiptWriteContract"), "/ai-review must expose write contract data object");
assert(aiReviewPage.includes(expectedPlanMarker), "/ai-review must expose AI review receipt write draft marker");
assert(
  aiReviewPage.includes("data-idempotency-key-required={String(aiReviewReceiptWriteContract.idempotency_key_required)}"),
  "/ai-review must expose idempotency key requirement",
);
assert(
  aiReviewPage.includes("data-request-schema={aiReviewReceiptWriteContract.request_schema.join(\",\")}"),
  "/ai-review must expose request schema",
);

assert(planPage.includes(expectedPlanMarker), "/plan must expose AI review receipt write draft marker");
assert(planPage.includes(expectedCommand), "/plan must expose AI review receipt write draft command");
assert(planPage.includes(expectedDocsHref), "/plan must expose AI review receipt write docs href");
assert(planPage.includes(expectedNoMergeCopy), "/plan must expose AI review receipt write no-merge copy");
assert(planPage.includes("AI workflow owner + API owner + QA owner"), "/plan must expose AI review receipt write owners");

assert(routeSmoke.includes('data-testid=\\"ai-review-receipt-write-api-draft\\"'), "route smoke must require write draft marker");
assert(routeSmoke.includes(`data-command=\\"${expectedCommand}\\"`), "route smoke must require write draft command");
assert(routeSmoke.includes(`data-docs-href=\\"${expectedDocsHref}\\"`), "route smoke must require write draft docs href");
assert(routeSmoke.includes(`data-method=\\"${expectedMethod}\\"`), "route smoke must require POST method");
assert(routeSmoke.includes(`data-status=\\"${expectedStatus}\\"`), "route smoke must require draft status");
assert(routeSmoke.includes("Write endpoint stays draft until auth"), "route smoke must require visible blocked copy");

assert(workflow.includes(`run: ${expectedCommand}`), "Web build must run AI review receipt write draft smoke");
assert(
  workflow.indexOf("run: npm run smoke:ai-review-receipt-api-rendered-route-failure-copy") < workflow.indexOf(`run: ${expectedCommand}`),
  "AI review receipt write draft smoke must run after AI review receipt API rendered route smoke",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf("run: npm run smoke:shared-readme-commands"),
  "AI review receipt write draft smoke must run before shared README command parity",
);

if (failures.length > 0) {
  console.error("FAIL AI review receipt write API draft");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS AI review receipt write API draft (${expectedRouteCount} routes, ${expectedFieldCount} request fields)`);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
