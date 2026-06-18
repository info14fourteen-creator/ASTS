import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedApiRoute = "/v1/sources/owner-receipts";
const expectedCommand = "npm run smoke:source-owner-receipt-write-live-route";
const expectedDocsHref =
  "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#source-owner-receipt-write-api-draft";
const expectedPlanMarker = 'data-testid="source-owner-receipt-write-live-route-gate-note"';
const expectedRenderedMarker = 'data-testid="source-owner-receipt-write-rendered-route-failure-copy"';
const expectedRenderedCommand = "npm run smoke:source-owner-receipt-write-rendered-route-failure-copy";
const expectedRouteSmokeCommand = "npm run smoke -- --url http://127.0.0.1:4177/";
const expectedSourceCommand = "npm run smoke:source-owner-receipt-write-api-draft";
const expectedWorkflowFailureCommand = "npm run smoke:source-owner-receipt-write-workflow-failure-copy";
const expectedWorkflowName = "Web build";
const expectedWorkflowPath = ".github/workflows/web-build.yml";
const expectedRequestFieldCount = 10;
const expectedRouteCount = 16;

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(webRoot, "../..");
const demoDataPath = resolve(repoRoot, "packages/shared/demo-data/asts-demo.json");
const packagePath = resolve(webRoot, "package.json");
const planPagePath = resolve(webRoot, "app/plan/page.tsx");
const routeSmokePath = resolve(webRoot, "scripts/smoke.mjs");
const renderedSmokePath = resolve(webRoot, "scripts/source-owner-receipt-write-rendered-route-failure-copy.mjs");
const workflowPath = resolve(repoRoot, expectedWorkflowPath);

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
assert(
  packageJson.scripts?.["smoke:source-owner-receipt-write-live-route"] ===
    "node scripts/source-owner-receipt-write-live-route-gate.mjs",
  "package.json must expose source owner receipt write live route gate smoke",
);

assert(workflow.includes(`name: ${expectedWorkflowName}`), "workflow must keep Web build name");
assert(workflow.includes(`run: ${expectedSourceCommand}`), "Web build must keep source owner write API draft smoke");
assert(workflow.includes(`run: ${expectedRenderedCommand}`), "Web build must keep source owner write rendered route failure copy smoke");
assert(workflow.includes(`run: ${expectedCommand}`), "Web build must run source owner write live route gate smoke");
assert(workflow.includes(`run: ${expectedWorkflowFailureCommand}`), "Web build must keep source owner write workflow failure copy smoke");
assert(
  workflow.indexOf(`run: ${expectedSourceCommand}`) < workflow.indexOf(`run: ${expectedRenderedCommand}`),
  "source owner write rendered route failure copy must run after write API draft smoke",
);
assert(
  workflow.indexOf(`run: ${expectedRenderedCommand}`) < workflow.indexOf(`run: ${expectedCommand}`),
  "source owner write live route gate must run after rendered route failure copy smoke",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf(`run: ${expectedWorkflowFailureCommand}`),
  "source owner write live route gate must run before workflow failure copy smoke",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf("run: npm run smoke:source-freshness-write-api-draft"),
  "source owner write live route gate must run before source freshness write draft smoke",
);

assert(renderedSmoke.includes(expectedDocsHref), "rendered route failure smoke must keep source owner write docs href");
assert(renderedSmoke.includes(expectedRouteSmokeCommand), "rendered route failure smoke must keep live route smoke command");

assert(planPage.includes(expectedRenderedMarker), "/plan must keep source owner write rendered route marker");
assert(planPage.includes(expectedPlanMarker), "/plan must expose source owner write live route gate note marker");
assert(planPage.includes("sourceOwnerReceiptWriteLiveRouteGateNote"), "/plan must expose source owner write live route gate note data");
assert(planPage.includes(expectedCommand), "/plan must expose source owner write live route gate command");
assert(planPage.includes(expectedDocsHref), "/plan must expose source owner write docs href");
assert(planPage.includes(expectedRouteSmokeCommand), "/plan must expose live rendered route smoke command");
assert(planPage.includes(`workflowPath: "${expectedWorkflowPath}"`), "/plan must expose Web build workflow path");
assert(planPage.includes("Как live route smoke защищает source owner write draft"), "/plan must expose live route gate heading");
assert(
  planPage.includes("data-marker-selector={sourceOwnerReceiptWriteLiveRouteGateNote.markerSelector}"),
  "/plan must expose source owner write live route marker selector attr",
);

assert(routeSmoke.includes('data-testid=\\"source-owner-receipt-write-live-route-gate-note\\"'), "route smoke must require live route gate marker");
assert(routeSmoke.includes(`data-command=\\"${expectedCommand}\\"`), "route smoke must require live route gate command");
assert(routeSmoke.includes(`data-api-route=\\"${expectedApiRoute}\\"`), "route smoke must require source owner write API route");
assert(routeSmoke.includes(`data-docs-href=\\"${expectedDocsHref}\\"`), "route smoke must require source owner write docs href");
assert(routeSmoke.includes(`data-route-smoke-command=\\"${expectedRouteSmokeCommand}\\"`), "route smoke must require rendered route smoke command");
assert(routeSmoke.includes(`data-source-smoke-command=\\"${expectedSourceCommand}\\"`), "route smoke must require source owner write source command");
assert(routeSmoke.includes('data-expected-request-field-count=\\"10\\"'), "route smoke must require source owner write request field count");
assert(routeSmoke.includes('data-expected-route-count=\\"16\\"'), "route smoke must require rendered route count");
assert(routeSmoke.includes('data-expected-command-count=\\"78\\"'), "route smoke must require updated Web build command count");

if (failures.length > 0) {
  console.error("FAIL source owner receipt write live route gate");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS source owner receipt write live route gate (${expectedRouteCount} routes, ${expectedRequestFieldCount} fields)`);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
