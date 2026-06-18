import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedApiRoute = "/v1/sources/freshness";
const expectedCommand = "npm run smoke:source-freshness-write-live-route";
const expectedDocsHref =
  "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#source-freshness-write-api-draft";
const expectedPlanMarker = 'data-testid="source-freshness-write-live-route-gate-note"';
const expectedRenderedMarker = 'data-testid="source-freshness-write-rendered-route-failure-copy"';
const expectedRenderedCommand = "npm run smoke:source-freshness-write-rendered-route-failure-copy";
const expectedRouteSmokeCommand = "npm run smoke -- --url http://127.0.0.1:4177/";
const expectedSourceCommand = "npm run smoke:source-freshness-write-api-draft";
const expectedWorkflowFailureCommand = "npm run smoke:source-freshness-write-workflow-failure-copy";
const expectedWorkflowName = "Web build";
const expectedWorkflowPath = ".github/workflows/web-build.yml";
const expectedBreachCount = 4;
const expectedRequestFieldCount = 12;
const expectedRouteCount = 16;

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(webRoot, "../..");
const apiServicePath = resolve(repoRoot, "apps/api/app/services/source_freshness.py");
const demoDataPath = resolve(repoRoot, "packages/shared/demo-data/asts-demo.json");
const packagePath = resolve(webRoot, "package.json");
const planPagePath = resolve(webRoot, "app/plan/page.tsx");
const routeSmokePath = resolve(webRoot, "scripts/smoke.mjs");
const renderedSmokePath = resolve(webRoot, "scripts/source-freshness-write-rendered-route-failure-copy.mjs");
const workflowPath = resolve(repoRoot, expectedWorkflowPath);

const apiService = readFileSync(apiServicePath, "utf8");
const demoData = JSON.parse(readFileSync(demoDataPath, "utf8"));
const packageJson = JSON.parse(readFileSync(packagePath, "utf8"));
const planPage = readFileSync(planPagePath, "utf8");
const routeSmoke = readFileSync(routeSmokePath, "utf8");
const renderedSmoke = readFileSync(renderedSmokePath, "utf8");
const workflow = readFileSync(workflowPath, "utf8");
const preWinTenders = demoData.tenders.filter((tender) => tender.funnel === "pre_win");
const expectedRenderedRoutes = 9 + 3 + preWinTenders.length;
const failures = [];

assert(expectedRenderedRoutes === expectedRouteCount, `route fixture must resolve to ${expectedRouteCount} rendered route checks`);
assert(apiService.includes("SOURCE_FRESHNESS_WRITE_CONTRACT"), "API service must define source freshness write contract");
assert(apiService.includes("breach_type"), "API service must keep breach type field");
assert(apiService.includes("new_raw_artifact_id"), "API service must keep restored raw artifact evidence");
assert(
  packageJson.scripts?.["smoke:source-freshness-write-live-route"] ===
    "node scripts/source-freshness-write-live-route-gate.mjs",
  "package.json must expose source freshness write live route gate smoke",
);

assert(workflow.includes(`name: ${expectedWorkflowName}`), "workflow must keep Web build name");
assert(workflow.includes(`run: ${expectedSourceCommand}`), "Web build must keep source freshness write API draft smoke");
assert(workflow.includes(`run: ${expectedRenderedCommand}`), "Web build must keep freshness write rendered route failure copy smoke");
assert(workflow.includes(`run: ${expectedCommand}`), "Web build must run freshness write live route gate smoke");
assert(workflow.includes(`run: ${expectedWorkflowFailureCommand}`), "Web build must keep freshness write workflow failure copy smoke");
assert(
  workflow.indexOf(`run: ${expectedSourceCommand}`) < workflow.indexOf(`run: ${expectedRenderedCommand}`),
  "freshness write rendered route failure copy must run after write API draft smoke",
);
assert(
  workflow.indexOf(`run: ${expectedRenderedCommand}`) < workflow.indexOf(`run: ${expectedCommand}`),
  "freshness write live route gate must run after rendered route failure copy smoke",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf(`run: ${expectedWorkflowFailureCommand}`),
  "freshness write live route gate must run before workflow failure copy smoke",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf("run: npm run smoke:source-freshness-rendered-route-failure-copy"),
  "freshness write live route gate must run before source freshness rendered route smoke",
);

assert(renderedSmoke.includes(expectedDocsHref), "freshness rendered route failure smoke must keep write docs href");
assert(renderedSmoke.includes(expectedRouteSmokeCommand), "freshness rendered route failure smoke must keep live route smoke command");

assert(planPage.includes(expectedRenderedMarker), "/plan must keep freshness write rendered route marker");
assert(planPage.includes(expectedPlanMarker), "/plan must expose freshness write live route gate note marker");
assert(planPage.includes("sourceFreshnessWriteLiveRouteGateNote"), "/plan must expose freshness write live route gate note data");
assert(planPage.includes(expectedCommand), "/plan must expose freshness write live route gate command");
assert(planPage.includes(expectedDocsHref), "/plan must expose freshness write docs href");
assert(planPage.includes(expectedRouteSmokeCommand), "/plan must expose live rendered route smoke command");
assert(planPage.includes(`workflowPath: "${expectedWorkflowPath}"`), "/plan must expose Web build workflow path");
assert(planPage.includes("Как live route smoke защищает freshness write draft"), "/plan must expose freshness live route gate heading");
assert(
  planPage.includes("data-marker-selector={sourceFreshnessWriteLiveRouteGateNote.markerSelector}"),
  "/plan must expose freshness write live route marker selector attr",
);

assert(routeSmoke.includes('data-testid=\\"source-freshness-write-live-route-gate-note\\"'), "route smoke must require freshness live route gate marker");
assert(routeSmoke.includes(`data-command=\\"${expectedCommand}\\"`), "route smoke must require freshness live route gate command");
assert(routeSmoke.includes(`data-api-route=\\"${expectedApiRoute}\\"`), "route smoke must require freshness write API route");
assert(routeSmoke.includes(`data-docs-href=\\"${expectedDocsHref}\\"`), "route smoke must require freshness write docs href");
assert(routeSmoke.includes(`data-route-smoke-command=\\"${expectedRouteSmokeCommand}\\"`), "route smoke must require rendered route smoke command");
assert(routeSmoke.includes(`data-source-smoke-command=\\"${expectedSourceCommand}\\"`), "route smoke must require freshness write source command");
assert(routeSmoke.includes('data-expected-breach-count=\\"4\\"'), "route smoke must require freshness breach count");
assert(routeSmoke.includes('data-expected-request-field-count=\\"12\\"'), "route smoke must require freshness write request field count");
assert(routeSmoke.includes('data-expected-route-count=\\"16\\"'), "route smoke must require rendered route count");
assert(routeSmoke.includes('data-expected-command-count=\\"78\\"'), "route smoke must require updated Web build command count");

if (failures.length > 0) {
  console.error("FAIL source freshness write live route gate");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS source freshness write live route gate (${expectedRouteCount} routes, ${expectedRequestFieldCount} fields)`);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
