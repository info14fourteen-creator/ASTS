import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedApiRoute = "/v1/sources/connectors";
const expectedApprovalCount = 5;
const expectedCommand = "npm run smoke:fns-real-network-approval-api-copy";
const expectedDocsHref =
  "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#fns-real-network-approval-api-copy";
const expectedNoMergeCopy =
  "Не мержить real-network FNS smoke, пока approval_api_copy подтверждает Legal owner, protected secrets, safe INN/OGRN и checksum freshness receipt.";
const expectedPlanMarker = 'data-testid="fns-real-network-approval-api-copy"';
const expectedRouteCount = 16;
const expectedSourceMarker = 'data-testid="fns-real-network-approval-api-copy"';
const expectedWorkflowName = "Web build";
const expectedWorkflowPath = ".github/workflows/web-build.yml";

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(webRoot, "../..");
const apiReadmePath = resolve(repoRoot, "apps/api/README.md");
const apiSchemasPath = resolve(repoRoot, "apps/api/app/schemas.py");
const apiServicePath = resolve(repoRoot, "apps/api/app/services/connectors.py");
const apiSmokePath = resolve(repoRoot, "apps/api/scripts/smoke_connectors.py");
const demoDataPath = resolve(repoRoot, "packages/shared/demo-data/asts-demo.json");
const fixturePath = resolve(repoRoot, "packages/shared/fns-connector-gate.json");
const fixtureSchemaPath = resolve(repoRoot, "packages/shared/fixture-schemas/fns-connector-gate.schema.json");
const planPagePath = resolve(webRoot, "app/plan/page.tsx");
const routeSmokePath = resolve(webRoot, "scripts/smoke.mjs");
const sourcesPagePath = resolve(webRoot, "app/sources/page.tsx");
const workflowPath = resolve(repoRoot, expectedWorkflowPath);

const apiReadme = readFileSync(apiReadmePath, "utf8");
const apiSchemas = readFileSync(apiSchemasPath, "utf8");
const apiService = readFileSync(apiServicePath, "utf8");
const apiSmoke = readFileSync(apiSmokePath, "utf8");
const demoData = JSON.parse(readFileSync(demoDataPath, "utf8"));
const fixture = JSON.parse(readFileSync(fixturePath, "utf8"));
const fixtureSchema = readFileSync(fixtureSchemaPath, "utf8");
const planPage = readFileSync(planPagePath, "utf8");
const routeSmoke = readFileSync(routeSmokePath, "utf8");
const sourcesPage = readFileSync(sourcesPagePath, "utf8");
const workflow = readFileSync(workflowPath, "utf8");
const preWinTenders = demoData.tenders.filter((tender) => tender.funnel === "pre_win");
const expectedRenderedRoutes = 9 + 3 + preWinTenders.length;
const failures = [];

assert(expectedRenderedRoutes === expectedRouteCount, `route fixture must resolve to ${expectedRouteCount} rendered route checks`);
assert(fixture.owner === "Legal", "FNS fixture must keep Legal owner");
assert(fixture.status === "contract_only", "FNS fixture must stay contract_only");
assert(fixture.required_approvals.length === expectedApprovalCount, "FNS fixture must keep 5 Legal approvals");
assert(fixture.approval_api_copy?.route === expectedApiRoute, "FNS fixture approval_api_copy route changed");
assert(fixture.approval_api_copy?.status === "contract_only", "FNS fixture approval_api_copy status changed");
assert(fixture.approval_api_copy?.owner === "Legal", "FNS fixture approval_api_copy owner changed");
assert(fixture.approval_api_copy?.no_merge_copy === expectedNoMergeCopy, "FNS fixture approval_api_copy no-merge copy changed");

assert(fixtureSchema.includes('"approval_api_copy"'), "FNS fixture schema must require approval_api_copy");
assert(fixtureSchema.includes('"const": "/v1/sources/connectors"'), "FNS fixture schema must pin approval route");
assert(fixtureSchema.includes('"const": "Legal"'), "FNS fixture schema must pin Legal owner");

assert(apiSchemas.includes("class ConnectorApprovalApiCopy"), "API schemas must expose ConnectorApprovalApiCopy");
assert(apiSchemas.includes("approval_api_copy: ConnectorApprovalApiCopy | None = None"), "API network gate schema must expose approval_api_copy");
assert(apiService.includes('ConnectorApprovalApiCopy(**fns_network_gate["approval_api_copy"])'), "API service must map fixture approval_api_copy into DTO");
assert(apiSmoke.includes("FNS approval API copy route must stay /v1/sources/connectors"), "API smoke must assert approval API route");
assert(apiSmoke.includes("FNS approval API no-merge copy must block unsafe merge"), "API smoke must assert no-merge copy");

assert(apiReadme.includes("### FNS Real-Network Approval API Copy"), "API README must document FNS approval API copy");
assert(apiReadme.includes("network_smoke_gate.approval_api_copy"), "API README must name approval_api_copy");
assert(apiReadme.includes('request_copy="Request Legal approval before enabling real FNS network smoke."'), "API README must include request copy");
assert(apiReadme.includes("CI must keep this copy in"), "API README must keep contract-only CI note");

assert(sourcesPage.includes(expectedSourceMarker), "/sources must expose FNS approval API copy marker");
assert(sourcesPage.includes("data-approval-api-route={fnsRealNetworkSmokeGate.approvalApiCopy.route}"), "/sources must expose approval API route");
assert(sourcesPage.includes("data-approval-api-no-merge-copy={fnsRealNetworkSmokeGate.approvalApiCopy.no_merge_copy}"), "/sources must expose no-merge copy");
assert(sourcesPage.includes("fnsRealNetworkSmokeGate.approvalApiCopy.request_copy"), "/sources must render request copy");
assert(sourcesPage.includes("fnsRealNetworkSmokeGate.approvalApiCopy.blocked_copy"), "/sources must render blocked copy");

assert(planPage.includes(expectedPlanMarker), "/plan must expose FNS approval API copy marker");
assert(planPage.includes(expectedCommand), "/plan must expose FNS approval API copy command");
assert(planPage.includes(expectedDocsHref), "/plan must expose FNS approval API docs href");
assert(planPage.includes(expectedNoMergeCopy), "/plan must expose FNS approval API no-merge copy");
assert(planPage.includes("Legal owner + API owner + QA owner"), "/plan must expose FNS approval API owner role");
assert(planPage.includes("packages/shared/fns-connector-gate.json,apps/api/app/services/connectors.py"), "/plan must expose repair targets");

assert(routeSmoke.includes('data-testid=\\"fns-real-network-approval-api-copy\\"'), "route smoke must require FNS approval API copy marker");
assert(routeSmoke.includes(`data-command=\\"${expectedCommand}\\"`), "route smoke must require FNS approval API copy command");
assert(routeSmoke.includes(`data-docs-href=\\"${expectedDocsHref}\\"`), "route smoke must require FNS approval API docs href");
assert(routeSmoke.includes(`data-no-merge-copy=\\"${expectedNoMergeCopy}\\"`), "route smoke must require FNS approval API no-merge copy");
assert(routeSmoke.includes("Request Legal approval before enabling real FNS network smoke."), "route smoke must require visible request copy");

assert(workflow.includes(`name: ${expectedWorkflowName}`), "workflow must keep Web build name");
assert(workflow.includes(`run: ${expectedCommand}`), "Web build must run FNS approval API copy smoke");
assert(
  workflow.indexOf("run: npm run smoke:fns-approvals-docs-rendered-route-failure-copy") < workflow.indexOf(`run: ${expectedCommand}`),
  "FNS approval API copy smoke must run after FNS docs rendered route smoke",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf("run: npm run smoke:ai-review-actions"),
  "FNS approval API copy smoke must run before AI review action parity",
);

if (failures.length > 0) {
  console.error("FAIL FNS real-network approval API copy");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS FNS real-network approval API copy (${expectedRouteCount} routes, ${expectedApprovalCount} approvals)`);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
