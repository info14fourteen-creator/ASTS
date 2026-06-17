import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedApiRoute = "/v1/sources/freshness";
const expectedCommand = "npm run smoke:source-freshness-write-smoke-failure-copy";
const expectedDocsHref =
  "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#source-freshness-write-api-draft";
const expectedFailingCommand = "npm run smoke:source-freshness-write-api-draft";
const expectedNoMergeCopy =
  "Не мержить, пока source freshness write smoke снова подтверждает draft POST contract, breach type, idempotency key, restored evidence и immutable freshness audit append.";
const expectedPlanMarker = 'data-testid="source-freshness-write-smoke-failure-copy"';
const expectedRequestFieldCount = 12;
const expectedRouteCount = 16;
const expectedSourceMarker = 'data-testid="source-freshness-write-api-draft"';
const expectedWorkflowName = "Web build";
const expectedWorkflowPath = ".github/workflows/web-build.yml";

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(webRoot, "../..");
const apiReadmePath = resolve(repoRoot, "apps/api/README.md");
const apiServicePath = resolve(repoRoot, "apps/api/app/services/source_freshness.py");
const demoDataPath = resolve(repoRoot, "packages/shared/demo-data/asts-demo.json");
const planPagePath = resolve(webRoot, "app/plan/page.tsx");
const routeSmokePath = resolve(webRoot, "scripts/smoke.mjs");
const sourcesPagePath = resolve(webRoot, "app/sources/page.tsx");
const workflowPath = resolve(repoRoot, expectedWorkflowPath);

const apiReadme = readFileSync(apiReadmePath, "utf8");
const apiService = readFileSync(apiServicePath, "utf8");
const demoData = JSON.parse(readFileSync(demoDataPath, "utf8"));
const planPage = readFileSync(planPagePath, "utf8");
const routeSmoke = readFileSync(routeSmokePath, "utf8");
const sourcesPage = readFileSync(sourcesPagePath, "utf8");
const workflow = readFileSync(workflowPath, "utf8");
const preWinTenders = demoData.tenders.filter((tender) => tender.funnel === "pre_win");
const expectedRenderedRoutes = 9 + 3 + preWinTenders.length;
const failures = [];

assert(expectedRenderedRoutes === expectedRouteCount, `route fixture must resolve to ${expectedRouteCount} rendered route checks`);
assert(apiService.includes("SOURCE_FRESHNESS_WRITE_CONTRACT"), "API service must define source freshness write contract");
assert(apiService.includes(`"route": "${expectedApiRoute}"`), "API service must keep write route");
assert(apiService.includes('"method": "POST"'), "API service must keep POST method");
assert(apiService.includes('"status": "draft"'), "API service must keep draft status");
assert(apiService.includes('"idempotency_key_required": True'), "API service must require idempotency key");
assert(apiService.includes("breach_type"), "API service must keep breach type field");
assert(apiService.includes("new_raw_artifact_id"), "API service must keep restored raw artifact evidence");
assert(apiService.includes("new_checksum_sha256"), "API service must keep restored checksum evidence");

assert(apiReadme.includes("### Source Freshness Write API Draft"), "API README must document freshness write draft");
assert(apiReadme.includes("idempotency_key"), "API README must mention idempotency key");
assert(apiReadme.includes("immutable freshness audit storage"), "API README must mention immutable freshness audit storage");

assert(sourcesPage.includes(expectedSourceMarker), "/sources must expose freshness write draft marker");
assert(
  sourcesPage.includes("data-request-schema={sourceFreshnessWriteContract.requestSchema.join(\",\")}"),
  "/sources must expose request schema",
);
assert(sourcesPage.includes("data-no-merge-copy={sourceFreshnessWriteContract.noMergeCopy}"), "/sources must expose no-merge copy");

assert(planPage.includes(expectedPlanMarker), "/plan must expose source freshness write smoke failure copy marker");
assert(planPage.includes(expectedCommand), "/plan must expose freshness write failure copy command");
assert(planPage.includes(expectedDocsHref), "/plan must expose freshness write docs href");
assert(planPage.includes(expectedFailingCommand), "/plan must expose failing freshness write smoke command");
assert(planPage.includes(expectedNoMergeCopy), "/plan must expose freshness write failure no-merge copy");
assert(planPage.includes("Sources owner + API owner + QA owner"), "/plan must expose freshness write failure owners");
assert(planPage.includes("data-failing-command={sourceFreshnessWriteSmokeFailureCopy.failingCommand}"), "/plan must expose failing command data attr");
assert(planPage.includes("data-parity-command={sourceFreshnessWriteSmokeFailureCopy.parityCommand}"), "/plan must expose parity command data attr");

assert(routeSmoke.includes('data-testid=\\"source-freshness-write-smoke-failure-copy\\"'), "route smoke must require freshness write failure copy marker");
assert(routeSmoke.includes(`data-command=\\"${expectedCommand}\\"`), "route smoke must require freshness write failure command");
assert(routeSmoke.includes(`data-failing-command=\\"${expectedFailingCommand}\\"`), "route smoke must require failing freshness write command");
assert(routeSmoke.includes(`data-no-merge-copy=\\"${expectedNoMergeCopy}\\"`), "route smoke must require freshness write failure no-merge copy");
assert(routeSmoke.includes("Что делать, если freshness write smoke упал"), "route smoke must require visible failure heading");

assert(workflow.includes(`name: ${expectedWorkflowName}`), "workflow must keep Web build name");
assert(workflow.includes(`run: ${expectedCommand}`), "Web build must run freshness write failure copy smoke");
assert(
  workflow.indexOf(`run: ${expectedFailingCommand}`) < workflow.indexOf(`run: ${expectedCommand}`),
  "freshness write failure copy smoke must run after freshness write draft smoke",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf("run: npm run smoke:source-freshness-rendered-route-failure-copy"),
  "freshness write failure copy smoke must run before freshness rendered route smoke",
);

if (failures.length > 0) {
  console.error("FAIL source freshness write smoke failure copy");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(
  `PASS source freshness write smoke failure copy (${expectedRouteCount} routes, ${expectedRequestFieldCount} fields)`,
);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
