import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedApiRoute = "/v1/sources/connectors";
const expectedApprovalCount = 5;
const expectedCommand = "npm run smoke:eis-real-network-approval-smoke-failure-copy";
const expectedDocsHref =
  "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#eis-real-network-approval-api-copy";
const expectedFailingCommand = "npm run smoke:eis-real-network-approval-api-copy";
const expectedNoMergeCopy =
  "Не мержить, пока EIS approval smoke снова подтверждает Data owner, protected secrets, safe EIS procedure, rate limits и checksum freshness receipt.";
const expectedApprovalNoMergeCopy =
  "Не мержить real-network EIS smoke, пока approval_api_copy подтверждает Data owner, protected secrets, safe EIS procedure, rate limits и checksum freshness receipt.";
const expectedPlanMarker = 'data-testid="eis-real-network-approval-smoke-failure-copy"';
const expectedRouteCount = 16;
const expectedSourceMarker = 'data-testid="eis-real-network-approval-api-copy"';
const expectedWorkflowName = "Web build";
const expectedWorkflowPath = ".github/workflows/web-build.yml";

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(webRoot, "../..");
const apiReadmePath = resolve(repoRoot, "apps/api/README.md");
const apiServicePath = resolve(repoRoot, "apps/api/app/services/connectors.py");
const apiSmokePath = resolve(repoRoot, "apps/api/scripts/smoke_connectors.py");
const demoDataPath = resolve(repoRoot, "packages/shared/demo-data/asts-demo.json");
const planPagePath = resolve(webRoot, "app/plan/page.tsx");
const routeSmokePath = resolve(webRoot, "scripts/smoke.mjs");
const sourcesPagePath = resolve(webRoot, "app/sources/page.tsx");
const workflowPath = resolve(repoRoot, expectedWorkflowPath);

const apiReadme = readFileSync(apiReadmePath, "utf8");
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

assert(apiService.includes('owner="Data"'), "API service must keep Data owner for EIS smoke gate");
assert(apiService.includes('request_copy="Request Data owner approval before enabling real EIS network smoke."'), "API service must expose EIS request copy");
assert(apiService.includes('blocked_copy="Do not enable EIS real-network smoke until all five approvals are recorded."'), "API service must expose EIS blocked copy");
assert(apiService.includes("safe test EIS procedure is recorded"), "API service must require safe EIS procedure approval");
assert(apiService.includes(expectedApprovalNoMergeCopy), "API service must expose EIS approval no-merge copy");

assert(apiSmoke.includes("EIS approval API copy route must stay /v1/sources/connectors"), "API smoke must assert EIS approval API route");
assert(apiSmoke.includes("EIS approval API no-merge copy must block unsafe merge"), "API smoke must assert EIS no-merge copy");
assert(apiSmoke.includes("safe test EIS procedure is recorded"), "API smoke must assert safe EIS procedure approval");

assert(apiReadme.includes("### EIS Real-Network Approval API Copy"), "API README must document EIS approval API copy");
assert(apiReadme.includes("network_smoke_gate.approval_api_copy"), "API README must name approval_api_copy");
assert(apiReadme.includes('request_copy="Request Data owner approval before enabling real EIS network smoke."'), "API README must include EIS request copy");
assert(apiReadme.includes("CI must keep this copy in"), "API README must keep contract-only CI note");

assert(sourcesPage.includes(expectedSourceMarker), "/sources must expose EIS approval API copy marker");
assert(sourcesPage.includes('data-testid="eis-real-network-smoke-gate"'), "/sources must expose EIS smoke gate marker");
assert(sourcesPage.includes("data-approval-api-route={eisRealNetworkSmokeGate.approvalApiCopy.route}"), "/sources must expose EIS approval API route");
assert(sourcesPage.includes("data-approval-api-no-merge-copy={eisRealNetworkSmokeGate.approvalApiCopy.no_merge_copy}"), "/sources must expose EIS no-merge copy");
assert(sourcesPage.includes("eisRealNetworkSmokeGate.approvalApiCopy.request_copy"), "/sources must render EIS request copy");
assert(sourcesPage.includes("eisRealNetworkSmokeGate.approvalApiCopy.blocked_copy"), "/sources must render EIS blocked copy");

assert(planPage.includes(expectedPlanMarker), "/plan must expose EIS approval smoke failure copy marker");
assert(planPage.includes(expectedCommand), "/plan must expose EIS approval failure copy command");
assert(planPage.includes(expectedDocsHref), "/plan must expose EIS approval docs href");
assert(planPage.includes(expectedFailingCommand), "/plan must expose failing EIS approval smoke command");
assert(planPage.includes(expectedNoMergeCopy), "/plan must expose EIS approval failure no-merge copy");
assert(planPage.includes("Data owner + API owner + QA owner"), "/plan must expose EIS approval failure owners");
assert(planPage.includes("data-failing-command={eisRealNetworkApprovalSmokeFailureCopy.failingCommand}"), "/plan must expose failing command data attr");
assert(planPage.includes("data-parity-command={eisRealNetworkApprovalSmokeFailureCopy.parityCommand}"), "/plan must expose parity command data attr");

assert(routeSmoke.includes('data-testid=\\"eis-real-network-approval-smoke-failure-copy\\"'), "route smoke must require EIS approval failure copy marker");
assert(routeSmoke.includes(`data-command=\\"${expectedCommand}\\"`), "route smoke must require EIS approval failure command");
assert(routeSmoke.includes(`data-failing-command=\\"${expectedFailingCommand}\\"`), "route smoke must require failing EIS approval command");
assert(routeSmoke.includes(`data-no-merge-copy=\\"${expectedNoMergeCopy}\\"`), "route smoke must require EIS approval failure no-merge copy");
assert(routeSmoke.includes("Что делать, если EIS approval smoke упал"), "route smoke must require visible EIS approval failure heading");

assert(workflow.includes(`name: ${expectedWorkflowName}`), "workflow must keep Web build name");
assert(workflow.includes(`run: ${expectedCommand}`), "Web build must run EIS approval failure copy smoke");
assert(
  workflow.indexOf(`run: ${expectedFailingCommand}`) < workflow.indexOf(`run: ${expectedCommand}`),
  "EIS approval failure copy smoke must run after EIS approval API copy smoke",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf("run: npm run smoke:ai-review-actions"),
  "EIS approval failure copy smoke must run before AI review action parity",
);

if (failures.length > 0) {
  console.error("FAIL EIS real-network approval smoke failure copy");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS EIS real-network approval smoke failure copy (${expectedRouteCount} routes, ${expectedApprovalCount} approvals)`);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
