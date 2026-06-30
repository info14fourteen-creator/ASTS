import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedApiRoute = "/v1/sources/owner-receipts";
const expectedDocsCommand = "npm run smoke:source-receipt-docs-link -- --url http://127.0.0.1:4177";
const expectedHistoryCount = 4;
const expectedNoMergeCopy =
  "Не мержить, пока rendered routes smoke снова подтверждает `/sources` owner receipt history и API docs link";
const expectedParityCommand = "npm run smoke:owner-receipts";
const expectedPlanMarker = 'data-testid="source-owner-receipts-rendered-route-failure-copy"';
const expectedRepairTargets =
  "/sources,packages/shared/source-owner-receipts.json,apps/web/scripts/source-receipt-docs-link-browser.mjs,apps/api/README.md#source-owner-receipt-contract";
const expectedRouteCount = 16;
const expectedSelfCommand = "npm run smoke:source-owner-receipts-rendered-route-failure-copy";
const expectedSourceMarker = 'data-testid="schema-docs-rendered-route-failure-copy"';
const expectedWorkflowPath = ".github/workflows/web-build.yml";
const expectedWorkflowName = "Web build";

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(webRoot, "../..");
const planPagePath = resolve(webRoot, "app/plan/page.tsx");
const routeSmokePath = resolve(webRoot, "scripts/smoke.mjs");
const demoDataPath = resolve(repoRoot, "packages/shared/demo-data/asts-demo.json");
const workflowPath = resolve(repoRoot, expectedWorkflowPath);

const demoData = JSON.parse(readFileSync(demoDataPath, "utf8"));
const planPage = readFileSync(planPagePath, "utf8");
const routeSmoke = readFileSync(routeSmokePath, "utf8");
const workflow = readFileSync(workflowPath, "utf8");
const preWinTenders = demoData.tenders.filter((tender) => tender.funnel === "pre_win");
const expectedRenderedRoutes = 9 + 3 + preWinTenders.length;
const failures = [];

assert(workflow.includes(`name: ${expectedWorkflowName}`), "workflow must keep Web build name");
assert(workflow.includes(`run: ${expectedParityCommand}`), "Web build must keep owner receipt parity smoke");
assert(workflow.includes(`run: ${expectedSelfCommand}`), "Web build must run source owner receipts rendered route failure copy smoke");
assert(workflow.includes(expectedDocsCommand), "Web build must keep live source receipt docs link command");
assert(
  workflow.indexOf(`run: ${expectedParityCommand}`) < workflow.indexOf(`run: ${expectedSelfCommand}`),
  "source owner receipts rendered route failure copy smoke must run after owner receipt parity smoke",
);
assert(
  workflow.indexOf(`run: ${expectedSelfCommand}`) < workflow.indexOf(expectedDocsCommand),
  "source owner receipts rendered route failure copy smoke must run before live docs link command",
);

assert(planPage.includes(expectedSourceMarker), "/plan must keep previous rendered route failure copy marker");
assert(planPage.includes(expectedPlanMarker), "/plan must expose source owner receipts rendered route failure copy marker");
assert(
  planPage.includes("sourceOwnerReceiptsRenderedRouteFailureCopy"),
  "/plan must expose source owner receipts rendered route failure copy data",
);
assert(planPage.includes(expectedDocsCommand), "/plan must expose failing live source receipt docs command");
assert(planPage.includes(expectedParityCommand), "/plan must expose owner receipt parity command");
assert(planPage.includes(expectedRepairTargets), "/plan must expose source owner receipts rendered route repair targets");
assert(planPage.includes("Sources owner + QA owner"), "/plan must expose source owner receipts rendered route owner role");
assert(
  planPage.includes("data-expected-route-count={sourceOwnerReceiptsRenderedRouteFailureCopy.expectedRouteCount}"),
  "/plan must expose expected route count",
);
assert(
  planPage.includes("data-expected-history-count={sourceOwnerReceiptsRenderedRouteFailureCopy.expectedHistoryCount}"),
  "/plan must expose expected history count",
);
assert(planPage.includes(expectedNoMergeCopy), "/plan must show owner-friendly no-merge copy");
assert(planPage.includes(`workflowPath: "${expectedWorkflowPath}"`), "/plan must expose Web build workflow path");
assert(expectedRenderedRoutes === expectedRouteCount, `route fixture must resolve to ${expectedRouteCount} rendered route checks`);
assert(routeSmoke.includes("source-owner-receipts-rendered-route-failure-copy"), "route smoke must require rendered copy marker");
assert(routeSmoke.includes("Что делать, если source owner receipts пропали в rendered routes"), "route smoke must require rendered copy title");
assert(
  routeSmoke.includes(`data-expected-history-count=\\"${expectedHistoryCount}\\"`),
  "route smoke must keep source owner receipts rendered route history count",
);
assert(routeSmoke.includes(expectedApiRoute), "route smoke must keep source owner receipts API route");

if (failures.length > 0) {
  console.error("FAIL source owner receipts rendered route failure copy");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS source owner receipts rendered route failure copy (${expectedRouteCount} routes, ${expectedHistoryCount} receipts)`);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
