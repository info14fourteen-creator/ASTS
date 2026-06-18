import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedApiRoute = "/v1/sources/connectors";
const expectedApprovalCount = 5;
const expectedCommand = "npm run smoke:eis-real-network-approval-workflow-failure-copy";
const expectedDocsHref =
  "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#eis-real-network-approval-api-copy";
const expectedFailingCommand = "npm run smoke:web-build-workflow";
const expectedNoMergeCopy =
  "Не мержить, пока Web build снова запускает EIS real-network approval API, smoke, docs и rendered-route checks в правильном порядке перед AI review checks.";
const expectedPlanMarker = 'data-testid="eis-real-network-approval-workflow-failure-copy"';
const expectedRouteCount = 16;
const expectedSourceMarker = 'data-testid="eis-real-network-approval-rendered-route-failure-copy"';
const expectedWorkflowName = "Web build";
const expectedWorkflowPath = ".github/workflows/web-build.yml";

const approvalApiCommand = "npm run smoke:eis-real-network-approval-api-copy";
const approvalSmokeCommand = "npm run smoke:eis-real-network-approval-smoke-failure-copy";
const approvalDocsCommand = "npm run smoke:eis-real-network-approval-docs-failure-copy";
const approvalRenderedCommand = "npm run smoke:eis-real-network-approval-rendered-route-failure-copy";
const nextDomainCommand = "npm run smoke:ai-review-actions";

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(webRoot, "../..");
const apiReadmePath = resolve(repoRoot, "apps/api/README.md");
const apiServicePath = resolve(repoRoot, "apps/api/app/services/connectors.py");
const demoDataPath = resolve(repoRoot, "packages/shared/demo-data/asts-demo.json");
const packagePath = resolve(webRoot, "package.json");
const planPagePath = resolve(webRoot, "app/plan/page.tsx");
const routeSmokePath = resolve(webRoot, "scripts/smoke.mjs");
const sourcesPagePath = resolve(webRoot, "app/sources/page.tsx");
const writeRenderedSmokePath = resolve(webRoot, "scripts/eis-real-network-approval-rendered-route-failure-copy.mjs");
const writeSmokePath = resolve(webRoot, "scripts/eis-real-network-approval-api-copy.mjs");
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
assert(apiService.includes('owner="Data"'), "API service must keep Data owner for EIS smoke gate");
assert(apiService.includes('request_copy="Request Data owner approval before enabling real EIS network smoke."'), "API service must expose EIS request copy");
assert(apiService.includes('blocked_copy="Do not enable EIS real-network smoke until all five approvals are recorded."'), "API service must expose EIS blocked copy");
assert(apiService.includes("safe test EIS procedure is recorded"), "API service must require safe EIS procedure approval");
assert(apiService.includes("rate limits"), "API service must mention rate limits");
assert(apiService.includes("checksum freshness receipt"), "API service must mention checksum freshness receipt");

assert(apiReadme.includes("### EIS Real-Network Approval API Copy"), "API README must keep EIS approval heading anchor");
assert(apiReadme.includes("network_smoke_gate.approval_api_copy"), "API README must document approval_api_copy");
assert(apiReadme.includes('request_copy="Request Data owner approval before enabling real EIS network smoke."'), "API README must include EIS request copy");
assert(apiReadme.includes("safe test zakupki.gov.ru procedure"), "API README must document safe EIS procedure approval");
assert(apiReadme.includes("checksum freshness receipt"), "API README must document checksum freshness receipt");

assert(
  packageJson.scripts?.["smoke:eis-real-network-approval-workflow-failure-copy"] ===
    "node scripts/eis-real-network-approval-workflow-failure-copy.mjs",
  "package.json must expose EIS approval workflow failure smoke",
);
assert(writeSmoke.includes(expectedDocsHref), "EIS approval API copy smoke must check docs href");
assert(writeSmoke.includes("### EIS Real-Network Approval API Copy"), "EIS approval API copy smoke must check README heading");
assert(writeRenderedSmoke.includes(approvalRenderedCommand), "EIS approval rendered route smoke must keep rendered route command");

assert(sourcesPage.includes('data-testid="eis-real-network-approval-api-copy"'), "/sources must expose EIS approval API copy marker");
assert(sourcesPage.includes('data-testid="eis-real-network-smoke-gate"'), "/sources must expose EIS smoke gate marker");
assert(sourcesPage.includes("data-approval-api-route={eisRealNetworkSmokeGate.approvalApiCopy.route}"), "/sources must expose EIS approval API route");
assert(sourcesPage.includes("data-approval-api-no-merge-copy={eisRealNetworkSmokeGate.approvalApiCopy.no_merge_copy}"), "/sources must expose EIS no-merge copy");

assert(workflow.includes(`name: ${expectedWorkflowName}`), "workflow must keep Web build name");
assert(workflow.includes(`run: ${expectedCommand}`), "Web build must run EIS approval workflow failure copy smoke");
assert(workflow.includes(`run: ${approvalApiCommand}`), "Web build must keep EIS approval API copy smoke");
assert(workflow.includes(`run: ${approvalSmokeCommand}`), "Web build must keep EIS approval smoke failure copy");
assert(workflow.includes(`run: ${approvalDocsCommand}`), "Web build must keep EIS approval docs failure copy");
assert(workflow.includes(`run: ${approvalRenderedCommand}`), "Web build must keep EIS approval rendered route failure copy");
assert(
  workflow.indexOf(`run: ${approvalApiCommand}`) < workflow.indexOf(`run: ${approvalSmokeCommand}`),
  "EIS approval smoke failure copy must run after EIS approval API copy",
);
assert(
  workflow.indexOf(`run: ${approvalSmokeCommand}`) < workflow.indexOf(`run: ${approvalDocsCommand}`),
  "EIS approval docs failure copy must run after EIS approval smoke failure copy",
);
assert(
  workflow.indexOf(`run: ${approvalDocsCommand}`) < workflow.indexOf(`run: ${approvalRenderedCommand}`),
  "EIS approval rendered route failure copy must run after EIS approval docs failure copy",
);
assert(
  workflow.indexOf(`run: ${approvalRenderedCommand}`) < workflow.indexOf(`run: ${expectedCommand}`),
  "EIS approval workflow failure copy must run after EIS approval rendered route failure copy",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf(`run: ${nextDomainCommand}`),
  "EIS approval workflow failure copy must run before AI review action parity",
);

assert(planPage.includes(expectedSourceMarker), "/plan must keep EIS approval rendered route marker");
assert(planPage.includes(expectedPlanMarker), "/plan must expose EIS approval workflow failure copy marker");
assert(planPage.includes("eisRealNetworkApprovalWorkflowFailureCopy"), "/plan must expose EIS approval workflow failure copy data");
assert(planPage.includes(expectedCommand), "/plan must expose EIS approval workflow failure command");
assert(planPage.includes(expectedDocsHref), "/plan must expose EIS approval docs href");
assert(planPage.includes(expectedFailingCommand), "/plan must expose failing web build workflow command");
assert(planPage.includes(expectedNoMergeCopy), "/plan must expose EIS approval workflow no-merge copy");
assert(planPage.includes("Data owner + CI owner + QA owner"), "/plan must expose EIS approval workflow owners");
assert(
  planPage.includes("data-failing-command={eisRealNetworkApprovalWorkflowFailureCopy.failingCommand}"),
  "/plan must expose workflow failing command data attr",
);
assert(
  planPage.includes("data-parity-command={eisRealNetworkApprovalWorkflowFailureCopy.parityCommand}"),
  "/plan must expose workflow parity command data attr",
);

assert(routeSmoke.includes('data-testid=\\"eis-real-network-approval-workflow-failure-copy\\"'), "route smoke must require EIS approval workflow marker");
assert(routeSmoke.includes(`data-command=\\"${expectedCommand}\\"`), "route smoke must require EIS approval workflow command");
assert(routeSmoke.includes(`data-failing-command=\\"${expectedFailingCommand}\\"`), "route smoke must require failing web build workflow command");
assert(routeSmoke.includes(`data-no-merge-copy=\\"${expectedNoMergeCopy}\\"`), "route smoke must require EIS approval workflow no-merge copy");
assert(routeSmoke.includes("Что делать, если EIS approval workflow order упал"), "route smoke must require visible EIS approval workflow heading");
assert(routeSmoke.includes("не мержить, пока EIS real-network approval workflow order снова не защищает всю approval цепочку"), "route smoke must require visible EIS approval workflow no-merge text");
assert(routeSmoke.includes('data-expected-command-count=\\"78\\"'), "route smoke must require updated Web build command count");

if (failures.length > 0) {
  console.error("FAIL EIS real-network approval workflow failure copy");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS EIS real-network approval workflow failure copy (${expectedRouteCount} routes, ${expectedApprovalCount} approvals)`);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
