import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedApiRoute = "/v1/sources/freshness";
const expectedCommand = "npm run smoke:source-freshness-write-workflow-failure-copy";
const expectedDocsHref =
  "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#source-freshness-write-api-draft";
const expectedFailingCommand = "npm run smoke:web-build-workflow";
const expectedNoMergeCopy =
  "Не мержить, пока Web build снова запускает source freshness write API, smoke, docs и rendered-route checks в правильном порядке перед source freshness rendered checks.";
const expectedPlanMarker = 'data-testid="source-freshness-write-workflow-failure-copy"';
const expectedRequestFieldCount = 12;
const expectedRouteCount = 16;
const expectedSourceMarker = 'data-testid="source-freshness-write-rendered-route-failure-copy"';
const expectedWorkflowName = "Web build";
const expectedWorkflowPath = ".github/workflows/web-build.yml";

const writeApiCommand = "npm run smoke:source-freshness-write-api-draft";
const writeSmokeCommand = "npm run smoke:source-freshness-write-smoke-failure-copy";
const writeDocsCommand = "npm run smoke:source-freshness-write-docs-failure-copy";
const writeRenderedCommand = "npm run smoke:source-freshness-write-rendered-route-failure-copy";
const nextDomainCommand = "npm run smoke:source-freshness-rendered-route-failure-copy";

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(webRoot, "../..");
const apiReadmePath = resolve(repoRoot, "apps/api/README.md");
const apiServicePath = resolve(repoRoot, "apps/api/app/services/source_freshness.py");
const demoDataPath = resolve(repoRoot, "packages/shared/demo-data/asts-demo.json");
const packagePath = resolve(webRoot, "package.json");
const planPagePath = resolve(webRoot, "app/plan/page.tsx");
const routeSmokePath = resolve(webRoot, "scripts/smoke.mjs");
const sourcesPagePath = resolve(webRoot, "app/sources/page.tsx");
const writeRenderedSmokePath = resolve(webRoot, "scripts/source-freshness-write-rendered-route-failure-copy.mjs");
const writeSmokePath = resolve(webRoot, "scripts/source-freshness-write-api-draft.mjs");
const workflowPath = resolve(repoRoot, expectedWorkflowPath);

const apiReadme = readFileSync(apiReadmePath, "utf8");
const apiService = readFileSync(apiServicePath, "utf8");
const demoData = JSON.parse(readFileSync(demoDataPath, "utf8"));
const packageJson = JSON.parse(readFileSync(packagePath, "utf8"));
const planPage = readFileSync(planPagePath, "utf8");
const routeSmoke = readFileSync(routeSmokePath, "utf8");
const sourcesPage = readFileSync(sourcesPagePath, "utf8");
const writeRenderedSmoke = readFileSync(writeRenderedSmokePath, "utf8");
const writeSmoke = readFileSync(writeSmokePath, "utf8");
const workflow = readFileSync(workflowPath, "utf8");
const preWinTenders = demoData.tenders.filter((tender) => tender.funnel === "pre_win");
const expectedRenderedRoutes = 9 + 3 + preWinTenders.length;
const failures = [];

assert(expectedRenderedRoutes === expectedRouteCount, `route fixture must resolve to ${expectedRouteCount} rendered route checks`);
assert(apiService.includes("SOURCE_FRESHNESS_WRITE_CONTRACT"), "API service must define source freshness write contract");
assert(apiService.includes(`"route": "${expectedApiRoute}"`), "API service must keep source freshness write route");
assert(apiService.includes('"method": "POST"'), "API service must keep POST method");
assert(apiService.includes('"status": "draft"'), "API service must keep draft status");
assert(apiService.includes('"idempotency_key_required": True'), "API service must require idempotency key");
assert(apiService.includes("breach_type"), "API service must keep breach type field");
assert(apiService.includes("new_raw_artifact_id"), "API service must keep restored raw artifact evidence");
assert(apiService.includes("new_checksum_sha256"), "API service must keep restored checksum evidence");

assert(apiReadme.includes("### Source Freshness Write API Draft"), "API README must keep freshness write draft heading anchor");
assert(apiReadme.includes("write_contract"), "API README must document write_contract");
assert(apiReadme.includes('method="POST"'), "API README must document POST method");
assert(apiReadme.includes("idempotency_key"), "API README must document idempotency key");
assert(apiReadme.includes("immutable freshness audit storage"), "API README must document immutable freshness audit storage");

assert(
  packageJson.scripts?.["smoke:source-freshness-write-workflow-failure-copy"] ===
    "node scripts/source-freshness-write-workflow-failure-copy.mjs",
  "package.json must expose source freshness write workflow failure smoke",
);
assert(writeSmoke.includes(expectedDocsHref), "freshness write API draft smoke must check write docs href");
assert(writeSmoke.includes("### Source Freshness Write API Draft"), "freshness write API draft smoke must check write README heading");
assert(writeRenderedSmoke.includes(writeRenderedCommand), "freshness write rendered route smoke must keep rendered route command");

assert(sourcesPage.includes('data-testid="source-freshness-write-api-draft"'), "/sources must expose source freshness write draft marker");
assert(sourcesPage.includes("data-request-schema={sourceFreshnessWriteContract.requestSchema.join(\",\")}"), "/sources must expose request schema");
assert(sourcesPage.includes("data-no-merge-copy={sourceFreshnessWriteContract.noMergeCopy}"), "/sources must expose no-merge copy");

assert(workflow.includes(`name: ${expectedWorkflowName}`), "workflow must keep Web build name");
assert(workflow.includes(`run: ${expectedCommand}`), "Web build must run source freshness write workflow failure copy smoke");
assert(workflow.includes(`run: ${writeApiCommand}`), "Web build must keep source freshness write API draft smoke");
assert(workflow.includes(`run: ${writeSmokeCommand}`), "Web build must keep source freshness write smoke failure copy");
assert(workflow.includes(`run: ${writeDocsCommand}`), "Web build must keep source freshness write docs failure copy");
assert(workflow.includes(`run: ${writeRenderedCommand}`), "Web build must keep source freshness write rendered route failure copy");
assert(
  workflow.indexOf(`run: ${writeApiCommand}`) < workflow.indexOf(`run: ${writeSmokeCommand}`),
  "source freshness write smoke failure copy must run after source freshness write API draft",
);
assert(
  workflow.indexOf(`run: ${writeSmokeCommand}`) < workflow.indexOf(`run: ${writeDocsCommand}`),
  "source freshness write docs failure copy must run after source freshness write smoke failure copy",
);
assert(
  workflow.indexOf(`run: ${writeDocsCommand}`) < workflow.indexOf(`run: ${writeRenderedCommand}`),
  "source freshness write rendered route failure copy must run after source freshness write docs failure copy",
);
assert(
  workflow.indexOf(`run: ${writeRenderedCommand}`) < workflow.indexOf(`run: ${expectedCommand}`),
  "source freshness write workflow failure copy must run after source freshness write rendered route failure copy",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf(`run: ${nextDomainCommand}`),
  "source freshness write workflow failure copy must run before source freshness rendered route smoke",
);

assert(planPage.includes(expectedSourceMarker), "/plan must keep source freshness write rendered route marker");
assert(planPage.includes(expectedPlanMarker), "/plan must expose source freshness write workflow failure copy marker");
assert(planPage.includes("sourceFreshnessWriteWorkflowFailureCopy"), "/plan must expose source freshness write workflow failure copy data");
assert(planPage.includes(expectedCommand), "/plan must expose source freshness write workflow failure command");
assert(planPage.includes(expectedDocsHref), "/plan must expose source freshness write docs href");
assert(planPage.includes(expectedFailingCommand), "/plan must expose failing web build workflow command");
assert(planPage.includes(expectedNoMergeCopy), "/plan must expose source freshness write workflow no-merge copy");
assert(planPage.includes("Sources owner + CI owner + QA owner"), "/plan must expose source freshness write workflow owners");
assert(
  planPage.includes("data-failing-command={sourceFreshnessWriteWorkflowFailureCopy.failingCommand}"),
  "/plan must expose workflow failing command data attr",
);
assert(
  planPage.includes("data-parity-command={sourceFreshnessWriteWorkflowFailureCopy.parityCommand}"),
  "/plan must expose workflow parity command data attr",
);

assert(routeSmoke.includes('data-testid=\\"source-freshness-write-workflow-failure-copy\\"'), "route smoke must require source freshness write workflow marker");
assert(routeSmoke.includes(`data-command=\\"${expectedCommand}\\"`), "route smoke must require source freshness write workflow command");
assert(routeSmoke.includes(`data-failing-command=\\"${expectedFailingCommand}\\"`), "route smoke must require failing web build workflow command");
assert(routeSmoke.includes(`data-no-merge-copy=\\"${expectedNoMergeCopy}\\"`), "route smoke must require source freshness write workflow no-merge copy");
assert(routeSmoke.includes("Что делать, если freshness write workflow order упал"), "route smoke must require visible source freshness write workflow heading");
assert(routeSmoke.includes("не мержить, пока source freshness write workflow order снова не защищает всю write цепочку"), "route smoke must require visible source freshness write workflow no-merge text");
assert(routeSmoke.includes('data-expected-command-count=\\"82\\"'), "route smoke must require updated Web build command count");

if (failures.length > 0) {
  console.error("FAIL source freshness write workflow failure copy");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS source freshness write workflow failure copy (${expectedRouteCount} routes, ${expectedRequestFieldCount} fields)`);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
