import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedApiRoute = "/v1/sources/connectors";
const expectedApprovalCount = 5;
const expectedCommand = "npm run smoke:fns-approvals-docs-rendered-route-failure-copy";
const expectedDocsHref =
  "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#fns-smoke-contract";
const expectedNoMergeCopy =
  "Не мержить, пока rendered routes smoke снова подтверждает FNS docs link, Legal approvals и API README anchor на живом `/sources`";
const expectedParityCommand = "npm run smoke:fns-approvals";
const expectedPlanMarker = 'data-testid="fns-approvals-docs-rendered-route-failure-copy"';
const expectedRepairTargets =
  "/sources,apps/api/README.md#fns-smoke-contract,packages/shared/fns-connector-gate.json,apps/web/scripts/smoke.mjs";
const expectedRouteCount = 16;
const expectedSourceMarker = 'data-testid="fns-network-gate-docs-link"';
const expectedWorkflowName = "Web build";
const expectedWorkflowPath = ".github/workflows/web-build.yml";

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(webRoot, "../..");
const apiReadmePath = resolve(repoRoot, "apps/api/README.md");
const demoDataPath = resolve(repoRoot, "packages/shared/demo-data/asts-demo.json");
const fixturePath = resolve(repoRoot, "packages/shared/fns-connector-gate.json");
const planPagePath = resolve(webRoot, "app/plan/page.tsx");
const routeSmokePath = resolve(webRoot, "scripts/smoke.mjs");
const sourcesPagePath = resolve(webRoot, "app/sources/page.tsx");
const workflowPath = resolve(repoRoot, expectedWorkflowPath);

const apiReadme = readFileSync(apiReadmePath, "utf8");
const demoData = JSON.parse(readFileSync(demoDataPath, "utf8"));
const fixture = JSON.parse(readFileSync(fixturePath, "utf8"));
const planPage = readFileSync(planPagePath, "utf8");
const routeSmoke = readFileSync(routeSmokePath, "utf8");
const sourcesPage = readFileSync(sourcesPagePath, "utf8");
const workflow = readFileSync(workflowPath, "utf8");
const preWinTenders = demoData.tenders.filter((tender) => tender.funnel === "pre_win");
const expectedRenderedRoutes = 9 + 3 + preWinTenders.length;
const failures = [];

assert(fixture.owner === "Legal", "FNS fixture must keep Legal owner");
assert(fixture.required_approvals.length === expectedApprovalCount, "FNS fixture must keep 5 Legal approvals");
assert(fixture.safe_test_pair_required === true, "FNS fixture must require safe INN/OGRN pair");
assert(expectedRenderedRoutes === expectedRouteCount, `route fixture must resolve to ${expectedRouteCount} rendered route checks`);

assert(apiReadme.includes("## FNS Smoke Contract"), "API README must keep FNS smoke contract anchor");
assert(apiReadme.includes(expectedSourceMarker), "API README must mention FNS docs link marker");
assert(apiReadme.includes('data-api-route="/v1/sources/connectors"'), "API README must keep FNS API route trace");
assert(apiReadme.includes("CI must keep testing the contract shape"), "API README must keep no real-network CI policy");

assert(workflow.includes(`name: ${expectedWorkflowName}`), "workflow must keep Web build name");
assert(workflow.includes(`run: ${expectedParityCommand}`), "Web build must keep FNS approvals parity smoke");
assert(workflow.includes("run: npm run smoke:fns-approvals-rendered-route-failure-copy"), "Web build must keep FNS approvals rendered route smoke");
assert(workflow.includes(`run: ${expectedCommand}`), "Web build must run FNS approvals docs rendered route failure copy smoke");
assert(
  workflow.indexOf("run: npm run smoke:fns-approvals-rendered-route-failure-copy") <
    workflow.indexOf(`run: ${expectedCommand}`),
  "FNS approvals docs rendered route smoke must run after FNS approvals rendered route smoke",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf("run: npm run smoke:ai-review-actions"),
  "FNS approvals docs rendered route smoke must run before AI review action parity",
);

assert(sourcesPage.includes(expectedSourceMarker), "/sources must keep FNS network gate docs link marker");
assert(sourcesPage.includes(`href={fnsNetworkGateBrowserLoop.docsHref}`), "/sources must render FNS docs href from browser loop contract");
assert(sourcesPage.includes("data-api-route={fnsNetworkGateBrowserLoop.apiRoute}"), "/sources docs link must expose FNS API route");
assert(sourcesPage.includes("fnsNetworkGateBrowserLoop.expectedApprovalCount"), "/sources must keep approval count from browser loop contract");
assert(routeSmoke.includes('data-testid=\\"fns-network-gate-docs-link\\"'), "route smoke must require FNS docs link marker");
assert(routeSmoke.includes(`href=\\"${expectedDocsHref}\\"`), "route smoke must require FNS docs href");
assert(routeSmoke.includes(`data-approval-count=\\"${expectedApprovalCount}\\"`), "route smoke must keep FNS approval count");
assert(routeSmoke.includes("API README / Legal gate"), "route smoke must require visible FNS docs link copy");
assert(routeSmoke.includes("data-safe-test-pair-required=\\\"true\\\""), "route smoke must keep safe pair gate");

assert(planPage.includes(expectedPlanMarker), "/plan must expose FNS approvals docs rendered route failure copy marker");
assert(planPage.includes("fnsApprovalsDocsRenderedRouteFailureCopy"), "/plan must expose FNS approvals docs failure copy data");
assert(planPage.includes(expectedDocsHref), "/plan must expose FNS API README docs link");
assert(planPage.includes(expectedNoMergeCopy), "/plan must show FNS docs no-merge copy");
assert(planPage.includes(expectedParityCommand), "/plan must expose FNS parity command");
assert(planPage.includes(expectedRepairTargets), "/plan must expose FNS docs repair targets");
assert(planPage.includes("Legal owner + Docs owner + QA owner"), "/plan must expose FNS docs owner role");
assert(
  planPage.includes("data-expected-approval-count={fnsApprovalsDocsRenderedRouteFailureCopy.expectedApprovalCount}"),
  "/plan must expose expected FNS approval count",
);
assert(
  planPage.includes("data-source-marker-selector={fnsApprovalsDocsRenderedRouteFailureCopy.sourceMarkerSelector}"),
  "/plan must expose FNS docs source marker selector",
);

if (failures.length > 0) {
  console.error("FAIL FNS approvals docs rendered route failure copy");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS FNS approvals docs rendered route failure copy (${expectedRouteCount} routes, ${expectedApprovalCount} approvals)`);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
