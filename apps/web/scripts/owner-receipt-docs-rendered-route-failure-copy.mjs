import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedApiRoute = "/v1/sources/owner-receipts";
const expectedCommand = "npm run smoke:owner-receipt-docs-rendered-route-failure-copy";
const expectedDocsCommand = "npm run smoke:source-receipt-docs-link -- --url http://127.0.0.1:4177";
const expectedDocsHref =
  "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#source-owner-receipt-contract";
const expectedHistoryCount = 4;
const expectedNoMergeCopy =
  "Не мержить, пока rendered routes smoke снова подтверждает owner receipt docs link и browser loop на живом `/sources`";
const expectedParityCommand = "npm run smoke:owner-receipts";
const expectedPlanMarker = 'data-testid="owner-receipt-docs-rendered-route-failure-copy"';
const expectedRepairTargets =
  "/sources,apps/api/README.md#source-owner-receipt-contract,apps/web/scripts/source-receipt-docs-link-browser.mjs,apps/web/scripts/smoke.mjs";
const expectedRouteCount = 16;
const expectedSourceMarker = 'data-testid="source-owner-receipt-history-browser-loop"';
const expectedWorkflowName = "Web build";
const expectedWorkflowPath = ".github/workflows/web-build.yml";

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(webRoot, "../..");
const apiReadmePath = resolve(repoRoot, "apps/api/README.md");
const demoDataPath = resolve(repoRoot, "packages/shared/demo-data/asts-demo.json");
const docsLinkSmokePath = resolve(webRoot, "scripts/source-receipt-docs-link-browser.mjs");
const fixturePath = resolve(repoRoot, "packages/shared/source-owner-receipts.json");
const planPagePath = resolve(webRoot, "app/plan/page.tsx");
const routeSmokePath = resolve(webRoot, "scripts/smoke.mjs");
const sourcesPagePath = resolve(webRoot, "app/sources/page.tsx");
const workflowPath = resolve(repoRoot, expectedWorkflowPath);

const apiReadme = readFileSync(apiReadmePath, "utf8");
const demoData = JSON.parse(readFileSync(demoDataPath, "utf8"));
const docsLinkSmoke = readFileSync(docsLinkSmokePath, "utf8");
const fixture = JSON.parse(readFileSync(fixturePath, "utf8"));
const planPage = readFileSync(planPagePath, "utf8");
const routeSmoke = readFileSync(routeSmokePath, "utf8");
const sourcesPage = readFileSync(sourcesPagePath, "utf8");
const workflow = readFileSync(workflowPath, "utf8");
const preWinTenders = demoData.tenders.filter((tender) => tender.funnel === "pre_win");
const expectedRenderedRoutes = 9 + 3 + preWinTenders.length;
const failures = [];

assert(Array.isArray(fixture.history), "owner receipt fixture must expose history");
assert(fixture.history.length === expectedHistoryCount, "owner receipt fixture must keep 4 history rows");
assert(expectedRenderedRoutes === expectedRouteCount, `route fixture must resolve to ${expectedRouteCount} rendered route checks`);
assert(apiReadme.includes("## Source Owner Receipt Contract"), "API README must keep owner receipt contract anchor");
assert(apiReadme.includes("source-owner-receipt-docs-link"), "API README must mention docs link marker");

assert(workflow.includes(`name: ${expectedWorkflowName}`), "workflow must keep Web build name");
assert(workflow.includes(`run: ${expectedParityCommand}`), "Web build must keep owner receipt parity smoke");
assert(workflow.includes(`run: ${expectedCommand}`), "Web build must run owner receipt docs rendered route failure copy smoke");
assert(workflow.includes(expectedDocsCommand), "Web build must keep live source receipt docs link command");
assert(
  workflow.indexOf("run: npm run smoke:source-owner-receipts-rendered-route-failure-copy") <
    workflow.indexOf(`run: ${expectedCommand}`),
  "owner receipt docs rendered route smoke must run after source owner receipts rendered route smoke",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf("run: npm run smoke:fns-approvals"),
  "owner receipt docs rendered route smoke must run before FNS approvals parity",
);

assert(sourcesPage.includes(expectedSourceMarker), "/sources must keep owner receipt browser loop marker");
assert(sourcesPage.includes("source-owner-receipt-docs-link"), "/sources must keep owner receipt docs link marker");
assert(sourcesPage.includes(expectedDocsHref), "/sources must keep owner receipt docs href");
assert(docsLinkSmoke.includes(expectedDocsHref), "live docs link smoke must check owner receipt docs href");
assert(docsLinkSmoke.includes("source-owner-receipt-history-browser-loop"), "live docs link smoke must check browser loop panel");
assert(routeSmoke.includes('data-testid=\\"source-owner-receipt-docs-link\\"'), "route smoke must require owner receipt docs link marker");
assert(routeSmoke.includes('data-testid=\\"source-owner-receipt-history-browser-loop\\"'), "route smoke must require owner receipt browser loop marker");
assert(routeSmoke.includes(`data-history-count=\\"${expectedHistoryCount}\\"`), "route smoke must keep owner receipt history count");
assert(routeSmoke.includes(expectedApiRoute), "route smoke must keep owner receipt API route");

assert(planPage.includes(expectedPlanMarker), "/plan must expose owner receipt docs rendered route failure copy marker");
assert(planPage.includes("ownerReceiptDocsRenderedRouteFailureCopy"), "/plan must expose owner receipt docs rendered route data");
assert(planPage.includes(expectedDocsHref), "/plan must expose owner receipt docs href");
assert(planPage.includes(expectedDocsCommand), "/plan must expose failing docs-link command");
assert(planPage.includes(expectedNoMergeCopy), "/plan must show owner receipt docs no-merge copy");
assert(planPage.includes(expectedRepairTargets), "/plan must expose owner receipt docs repair targets");
assert(planPage.includes("Sources owner + Docs owner + QA owner"), "/plan must expose owner receipt docs owner role");
assert(
  planPage.includes("data-expected-history-count={ownerReceiptDocsRenderedRouteFailureCopy.expectedHistoryCount}"),
  "/plan must expose expected owner receipt history count",
);
assert(
  planPage.includes("data-expected-route-count={ownerReceiptDocsRenderedRouteFailureCopy.expectedRouteCount}"),
  "/plan must expose expected route count",
);

if (failures.length > 0) {
  console.error("FAIL owner receipt docs rendered route failure copy");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS owner receipt docs rendered route failure copy (${expectedRouteCount} routes, ${expectedHistoryCount} receipts)`);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
