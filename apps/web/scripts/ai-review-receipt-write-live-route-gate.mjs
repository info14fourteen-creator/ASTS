import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedApiRoute = "/v1/ai/review-queue";
const expectedCommand = "npm run smoke:ai-review-receipt-write-live-route";
const expectedDocsHref =
  "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#ai-review-receipt-write-api-draft";
const expectedPlanMarker = 'data-testid="ai-review-receipt-write-live-route-gate-note"';
const expectedRenderedMarker = 'data-testid="ai-review-receipt-write-rendered-route-failure-copy"';
const expectedRenderedCommand = "npm run smoke:ai-review-receipt-write-rendered-route-failure-copy";
const expectedRouteSmokeCommand = "npm run smoke -- --url http://127.0.0.1:4177/";
const expectedSourceCommand = "npm run smoke:ai-review-receipt-write-api-draft";
const expectedWorkflowFailureCommand = "npm run smoke:ai-review-receipt-write-workflow-failure-copy";
const expectedWorkflowName = "Web build";
const expectedWorkflowPath = ".github/workflows/web-build.yml";
const expectedQueueCount = 3;
const expectedRequestFieldCount = 11;
const expectedRouteCount = 16;

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(webRoot, "../..");
const demoDataPath = resolve(repoRoot, "packages/shared/demo-data/asts-demo.json");
const fixturePath = resolve(repoRoot, "packages/shared/ai-review-queue.json");
const packagePath = resolve(webRoot, "package.json");
const planPagePath = resolve(webRoot, "app/plan/page.tsx");
const routeSmokePath = resolve(webRoot, "scripts/smoke.mjs");
const renderedSmokePath = resolve(webRoot, "scripts/ai-review-receipt-write-rendered-route-failure-copy.mjs");
const workflowPath = resolve(repoRoot, expectedWorkflowPath);

const demoData = JSON.parse(readFileSync(demoDataPath, "utf8"));
const fixture = JSON.parse(readFileSync(fixturePath, "utf8"));
const packageJson = JSON.parse(readFileSync(packagePath, "utf8"));
const planPage = readFileSync(planPagePath, "utf8");
const routeSmoke = readFileSync(routeSmokePath, "utf8");
const renderedSmoke = readFileSync(renderedSmokePath, "utf8");
const workflow = readFileSync(workflowPath, "utf8");
const preWinTenders = demoData.tenders.filter((tender) => tender.funnel === "pre_win");
const expectedRenderedRoutes = 9 + 3 + preWinTenders.length;
const failures = [];

assert(expectedRenderedRoutes === expectedRouteCount, `route fixture must resolve to ${expectedRouteCount} rendered route checks`);
assert(fixture.queue?.length === expectedQueueCount, "AI review queue fixture must keep 3 rows");
assert(
  packageJson.scripts?.["smoke:ai-review-receipt-write-live-route"] ===
    "node scripts/ai-review-receipt-write-live-route-gate.mjs",
  "package.json must expose AI review receipt write live route gate smoke",
);

assert(workflow.includes(`name: ${expectedWorkflowName}`), "workflow must keep Web build name");
assert(workflow.includes(`run: ${expectedSourceCommand}`), "Web build must keep AI write API draft smoke");
assert(workflow.includes(`run: ${expectedRenderedCommand}`), "Web build must keep AI write rendered route failure copy smoke");
assert(workflow.includes(`run: ${expectedCommand}`), "Web build must run AI write live route gate smoke");
assert(workflow.includes(`run: ${expectedWorkflowFailureCommand}`), "Web build must keep AI write workflow failure copy smoke");
assert(
  workflow.indexOf(`run: ${expectedSourceCommand}`) < workflow.indexOf(`run: ${expectedRenderedCommand}`),
  "AI write rendered route failure copy must run after AI write API draft smoke",
);
assert(
  workflow.indexOf(`run: ${expectedRenderedCommand}`) < workflow.indexOf(`run: ${expectedCommand}`),
  "AI write live route gate must run after rendered route failure copy smoke",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf(`run: ${expectedWorkflowFailureCommand}`),
  "AI write live route gate must run before workflow failure copy smoke",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf("run: npm run smoke:shared-readme-commands"),
  "AI write live route gate must run before shared README command parity",
);

assert(renderedSmoke.includes(expectedDocsHref), "AI rendered route failure smoke must keep write docs href");
assert(renderedSmoke.includes(expectedRouteSmokeCommand), "AI rendered route failure smoke must keep live route smoke command");

assert(planPage.includes(expectedRenderedMarker), "/plan must keep AI write rendered route marker");
assert(planPage.includes(expectedPlanMarker), "/plan must expose AI write live route gate note marker");
assert(planPage.includes("aiReviewReceiptWriteLiveRouteGateNote"), "/plan must expose AI write live route gate note data");
assert(planPage.includes(expectedCommand), "/plan must expose AI write live route gate command");
assert(planPage.includes(expectedDocsHref), "/plan must expose AI write docs href");
assert(planPage.includes(expectedRouteSmokeCommand), "/plan must expose live rendered route smoke command");
assert(planPage.includes(`workflowPath: "${expectedWorkflowPath}"`), "/plan must expose Web build workflow path");
assert(planPage.includes("Как live route smoke защищает AI write draft"), "/plan must expose AI live route gate heading");
assert(
  planPage.includes("data-marker-selector={aiReviewReceiptWriteLiveRouteGateNote.markerSelector}"),
  "/plan must expose AI write live route marker selector attr",
);

assert(routeSmoke.includes('data-testid=\\"ai-review-receipt-write-live-route-gate-note\\"'), "route smoke must require AI live route gate marker");
assert(routeSmoke.includes(`data-command=\\"${expectedCommand}\\"`), "route smoke must require AI live route gate command");
assert(routeSmoke.includes(`data-api-route=\\"${expectedApiRoute}\\"`), "route smoke must require AI write API route");
assert(routeSmoke.includes(`data-docs-href=\\"${expectedDocsHref}\\"`), "route smoke must require AI write docs href");
assert(routeSmoke.includes(`data-route-smoke-command=\\"${expectedRouteSmokeCommand}\\"`), "route smoke must require rendered route smoke command");
assert(routeSmoke.includes(`data-source-smoke-command=\\"${expectedSourceCommand}\\"`), "route smoke must require AI write source command");
assert(routeSmoke.includes('data-expected-queue-count=\\"3\\"'), "route smoke must require AI queue count");
assert(routeSmoke.includes('data-expected-request-field-count=\\"11\\"'), "route smoke must require AI write request field count");
assert(routeSmoke.includes('data-expected-route-count=\\"16\\"'), "route smoke must require rendered route count");
assert(routeSmoke.includes('data-expected-command-count=\\"73\\"'), "route smoke must require updated Web build command count");

if (failures.length > 0) {
  console.error("FAIL AI review receipt write live route gate");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS AI review receipt write live route gate (${expectedRouteCount} routes, ${expectedRequestFieldCount} fields)`);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
