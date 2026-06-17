import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedApiRoute = "/v1/sources/connectors";
const expectedApprovalCount = 5;
const expectedCommand = "npm run smoke:fns-approvals-rendered-route-failure-copy";
const expectedDocsHref =
  "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#fns-smoke-contract";
const expectedNoMergeCopy =
  "Не мержить, пока rendered routes smoke снова подтверждает FNS Legal approvals на живом `/sources`";
const expectedParityCommand = "npm run smoke:fns-approvals";
const expectedPlanMarker = 'data-testid="fns-approvals-rendered-route-failure-copy"';
const expectedRepairTargets =
  "/sources,packages/shared/fns-connector-gate.json,apps/web/scripts/fns-approvals-parity.mjs,apps/web/scripts/smoke.mjs";
const expectedRouteCount = 16;
const expectedSourceMarker = 'data-testid="fns-real-network-smoke-gate"';
const expectedWorkflowName = "Web build";
const expectedWorkflowPath = ".github/workflows/web-build.yml";

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(webRoot, "../..");
const demoDataPath = resolve(repoRoot, "packages/shared/demo-data/asts-demo.json");
const fixturePath = resolve(repoRoot, "packages/shared/fns-connector-gate.json");
const planPagePath = resolve(webRoot, "app/plan/page.tsx");
const routeSmokePath = resolve(webRoot, "scripts/smoke.mjs");
const sourcesPagePath = resolve(webRoot, "app/sources/page.tsx");
const workflowPath = resolve(repoRoot, expectedWorkflowPath);

const demoData = JSON.parse(readFileSync(demoDataPath, "utf8"));
const fixture = JSON.parse(readFileSync(fixturePath, "utf8"));
const planPage = readFileSync(planPagePath, "utf8");
const routeSmoke = readFileSync(routeSmokePath, "utf8");
const sourcesPage = readFileSync(sourcesPagePath, "utf8");
const workflow = readFileSync(workflowPath, "utf8");
const preWinTenders = demoData.tenders.filter((tender) => tender.funnel === "pre_win");
const expectedRenderedRoutes = 9 + 3 + preWinTenders.length;
const failures = [];

assert(fixture.connector_id === "fns-egrul-nalog-ru", "FNS fixture must keep connector id");
assert(fixture.owner === "Legal", "FNS fixture must keep Legal owner");
assert(fixture.required_approvals.length === expectedApprovalCount, "FNS fixture must keep 5 required approvals");
assert(fixture.safe_test_pair_required === true, "FNS fixture must require a safe INN/OGRN pair");
assert(expectedRenderedRoutes === expectedRouteCount, `route fixture must resolve to ${expectedRouteCount} rendered route checks`);

assert(workflow.includes(`name: ${expectedWorkflowName}`), "workflow must keep Web build name");
assert(workflow.includes(`run: ${expectedParityCommand}`), "Web build must keep FNS approvals parity smoke");
assert(workflow.includes(`run: ${expectedCommand}`), "Web build must run FNS approvals rendered route failure copy smoke");
assert(
  workflow.indexOf(`run: ${expectedParityCommand}`) < workflow.indexOf(`run: ${expectedCommand}`),
  "FNS rendered route failure copy smoke must run after FNS approvals parity",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf("run: npm run smoke:ai-review-actions"),
  "FNS rendered route failure copy smoke must run before AI review action parity",
);

assert(sourcesPage.includes(expectedSourceMarker), "/sources must keep FNS real-network smoke gate marker");
assert(sourcesPage.includes("fnsConnectorGate.required_approvals"), "/sources must render FNS approvals from the shared fixture");
assert(routeSmoke.includes('data-testid=\\"fns-real-network-smoke-gate\\"'), "route smoke must require FNS real-network smoke gate marker");
assert(routeSmoke.includes(`data-approval-count=\\"${expectedApprovalCount}\\"`), "route smoke must keep FNS approval count");
assert(routeSmoke.includes(expectedApiRoute), "route smoke must keep FNS connector API route");
assert(routeSmoke.includes("CI must not call FNS until the real-network gate is explicitly approved."), "route smoke must keep FNS CI no-network policy");

assert(planPage.includes(expectedPlanMarker), "/plan must expose FNS approvals rendered route failure copy marker");
assert(planPage.includes("fnsApprovalsRenderedRouteFailureCopy"), "/plan must expose FNS approvals rendered route data");
assert(planPage.includes("/apps/api/README.md#fns-smoke-contract"), "/plan must expose FNS API README docs link");
assert(planPage.includes(expectedNoMergeCopy), "/plan must show FNS no-merge copy");
assert(planPage.includes(expectedParityCommand), "/plan must expose FNS parity command");
assert(planPage.includes(expectedRepairTargets), "/plan must expose FNS repair targets");
assert(planPage.includes("Legal owner + QA owner"), "/plan must expose FNS owner role");
assert(
  planPage.includes("data-expected-approval-count={fnsApprovalsRenderedRouteFailureCopy.expectedApprovalCount}"),
  "/plan must expose expected FNS approval count",
);
assert(
  planPage.includes("data-expected-route-count={fnsApprovalsRenderedRouteFailureCopy.expectedRouteCount}"),
  "/plan must expose expected route count",
);

if (failures.length > 0) {
  console.error("FAIL FNS approvals rendered route failure copy");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS FNS approvals rendered route failure copy (${expectedRouteCount} routes, ${expectedApprovalCount} approvals)`);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
