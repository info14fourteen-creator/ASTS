import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedApiRoute = "/v1/sources/connectors";
const expectedApprovalCount = 5;
const expectedCommand = "npm run smoke:eis-real-network-approval-live-route";
const expectedDocsHref =
  "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#eis-real-network-approval-api-copy";
const expectedPlanMarker = 'data-testid="eis-real-network-approval-live-route-gate-note"';
const expectedRenderedMarker = 'data-testid="eis-real-network-approval-rendered-route-failure-copy"';
const expectedRenderedCommand = "npm run smoke:eis-real-network-approval-rendered-route-failure-copy";
const expectedRouteSmokeCommand = "npm run smoke -- --url http://127.0.0.1:4177/";
const expectedSourceCommand = "npm run smoke:eis-real-network-approval-api-copy";
const expectedWorkflowFailureCommand = "npm run smoke:eis-real-network-approval-workflow-failure-copy";
const expectedWorkflowName = "Web build";
const expectedWorkflowPath = ".github/workflows/web-build.yml";
const expectedRouteCount = 16;

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(webRoot, "../..");
const apiReadmePath = resolve(repoRoot, "apps/api/README.md");
const apiServicePath = resolve(repoRoot, "apps/api/app/services/connectors.py");
const demoDataPath = resolve(repoRoot, "packages/shared/demo-data/asts-demo.json");
const packagePath = resolve(webRoot, "package.json");
const planPagePath = resolve(webRoot, "app/plan/page.tsx");
const renderedSmokePath = resolve(webRoot, "scripts/eis-real-network-approval-rendered-route-failure-copy.mjs");
const routeSmokePath = resolve(webRoot, "scripts/smoke.mjs");
const workflowPath = resolve(repoRoot, expectedWorkflowPath);

const apiReadme = readFileSync(apiReadmePath, "utf8");
const apiService = readFileSync(apiServicePath, "utf8");
const demoData = JSON.parse(readFileSync(demoDataPath, "utf8"));
const packageJson = JSON.parse(readFileSync(packagePath, "utf8"));
const planPage = readFileSync(planPagePath, "utf8");
const renderedSmoke = readFileSync(renderedSmokePath, "utf8");
const routeSmoke = readFileSync(routeSmokePath, "utf8");
const workflow = readFileSync(workflowPath, "utf8");
const preWinTenders = demoData.tenders.filter((tender) => tender.funnel === "pre_win");
const expectedRenderedRoutes = 9 + 3 + preWinTenders.length;
const failures = [];

assert(expectedRenderedRoutes === expectedRouteCount, `route fixture must resolve to ${expectedRouteCount} rendered route checks`);
assert(apiService.includes('owner="Data"'), "API service must keep Data owner for EIS smoke gate");
assert(apiService.includes('request_copy="Request Data owner approval before enabling real EIS network smoke."'), "API service must expose EIS request copy");
assert(apiService.includes("safe test EIS procedure is recorded"), "API service must require safe EIS procedure approval");
assert(apiService.includes("checksum freshness receipt"), "API service must mention checksum freshness receipt");

assert(apiReadme.includes("### EIS Real-Network Approval API Copy"), "API README must keep EIS approval heading anchor");
assert(apiReadme.includes("network_smoke_gate.approval_api_copy"), "API README must document approval_api_copy");
assert(apiReadme.includes("safe test zakupki.gov.ru procedure"), "API README must document safe EIS procedure approval");

assert(
  packageJson.scripts?.["smoke:eis-real-network-approval-live-route"] ===
    "node scripts/eis-real-network-approval-live-route-gate.mjs",
  "package.json must expose EIS approval live route gate smoke",
);

assert(workflow.includes(`name: ${expectedWorkflowName}`), "workflow must keep Web build name");
assert(workflow.includes(`run: ${expectedSourceCommand}`), "Web build must keep EIS approval API copy smoke");
assert(workflow.includes(`run: ${expectedRenderedCommand}`), "Web build must keep EIS approval rendered route smoke");
assert(workflow.includes(`run: ${expectedCommand}`), "Web build must run EIS approval live route gate smoke");
assert(workflow.includes(`run: ${expectedWorkflowFailureCommand}`), "Web build must keep EIS approval workflow failure copy smoke");
assert(
  workflow.indexOf(`run: ${expectedSourceCommand}`) < workflow.indexOf(`run: ${expectedRenderedCommand}`),
  "EIS approval rendered route smoke must run after approval API copy smoke",
);
assert(
  workflow.indexOf(`run: ${expectedRenderedCommand}`) < workflow.indexOf(`run: ${expectedCommand}`),
  "EIS approval live route gate must run after rendered route smoke",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf(`run: ${expectedWorkflowFailureCommand}`),
  "EIS approval live route gate must run before workflow failure copy smoke",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf("run: npm run smoke:ai-review-actions"),
  "EIS approval live route gate must run before AI review action parity",
);

assert(renderedSmoke.includes(expectedDocsHref), "EIS rendered route smoke must keep approval docs href");
assert(renderedSmoke.includes(expectedRouteSmokeCommand), "EIS rendered route smoke must keep live route smoke command");

assert(planPage.includes(expectedRenderedMarker), "/plan must keep EIS approval rendered route marker");
assert(planPage.includes(expectedPlanMarker), "/plan must expose EIS approval live route gate note marker");
assert(planPage.includes("eisRealNetworkApprovalLiveRouteGateNote"), "/plan must expose EIS approval live route gate note data");
assert(planPage.includes(expectedCommand), "/plan must expose EIS approval live route gate command");
assert(planPage.includes(expectedDocsHref), "/plan must expose EIS approval docs href");
assert(planPage.includes(expectedRouteSmokeCommand), "/plan must expose live rendered route smoke command");
assert(planPage.includes(`workflowPath: "${expectedWorkflowPath}"`), "/plan must expose Web build workflow path");
assert(planPage.includes("Как live route smoke защищает EIS approval chain"), "/plan must expose EIS live route gate heading");
assert(
  planPage.includes("data-marker-selector={eisRealNetworkApprovalLiveRouteGateNote.markerSelector}"),
  "/plan must expose EIS live route marker selector attr",
);

assert(routeSmoke.includes('data-testid=\\"eis-real-network-approval-live-route-gate-note\\"'), "route smoke must require EIS live route gate marker");
assert(routeSmoke.includes(`data-command=\\"${expectedCommand}\\"`), "route smoke must require EIS live route gate command");
assert(routeSmoke.includes(`data-api-route=\\"${expectedApiRoute}\\"`), "route smoke must require EIS approval API route");
assert(routeSmoke.includes(`data-docs-href=\\"${expectedDocsHref}\\"`), "route smoke must require EIS approval docs href");
assert(routeSmoke.includes(`data-route-smoke-command=\\"${expectedRouteSmokeCommand}\\"`), "route smoke must require rendered route smoke command");
assert(routeSmoke.includes(`data-source-smoke-command=\\"${expectedSourceCommand}\\"`), "route smoke must require EIS approval source command");
assert(routeSmoke.includes('data-expected-approval-count=\\"5\\"'), "route smoke must require EIS approval count");
assert(routeSmoke.includes('data-expected-route-count=\\"16\\"'), "route smoke must require rendered route count");
assert(routeSmoke.includes('data-expected-command-count=\\"70\\"'), "route smoke must require updated Web build command count");

if (failures.length > 0) {
  console.error("FAIL EIS real-network approval live route gate");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS EIS real-network approval live route gate (${expectedRouteCount} routes, ${expectedApprovalCount} approvals)`);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
