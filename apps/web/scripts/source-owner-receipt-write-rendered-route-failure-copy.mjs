import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedApiRoute = "/v1/sources/owner-receipts";
const expectedCommand = "npm run smoke:source-owner-receipt-write-rendered-route-failure-copy";
const expectedDocsHref =
  "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#source-owner-receipt-write-api-draft";
const expectedFailingCommand = "npm run smoke -- --url http://127.0.0.1:4177/";
const expectedNoMergeCopy =
  "Не мержить, пока rendered routes smoke снова подтверждает source owner receipt write draft marker, docs href, request schema и immutable audit append.";
const expectedPlanMarker = 'data-testid="source-owner-receipt-write-rendered-route-failure-copy"';
const expectedRequestFieldCount = 10;
const expectedRouteCount = 16;
const expectedSourceMarker = 'data-testid="source-owner-receipt-write-api-draft"';
const expectedWorkflowName = "Web build";
const expectedWorkflowPath = ".github/workflows/web-build.yml";

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(webRoot, "../..");
const apiReadmePath = resolve(repoRoot, "apps/api/README.md");
const demoDataPath = resolve(repoRoot, "packages/shared/demo-data/asts-demo.json");
const fixturePath = resolve(repoRoot, "packages/shared/source-owner-receipts.json");
const packagePath = resolve(webRoot, "package.json");
const planPagePath = resolve(webRoot, "app/plan/page.tsx");
const routeSmokePath = resolve(webRoot, "scripts/smoke.mjs");
const sourcesPagePath = resolve(webRoot, "app/sources/page.tsx");
const writeSmokePath = resolve(webRoot, "scripts/source-owner-receipt-write-api-draft.mjs");
const workflowPath = resolve(repoRoot, expectedWorkflowPath);

const apiReadme = readFileSync(apiReadmePath, "utf8");
const demoData = JSON.parse(readFileSync(demoDataPath, "utf8"));
const fixture = JSON.parse(readFileSync(fixturePath, "utf8"));
const packageJson = JSON.parse(readFileSync(packagePath, "utf8"));
const planPage = readFileSync(planPagePath, "utf8");
const routeSmoke = readFileSync(routeSmokePath, "utf8");
const sourcesPage = readFileSync(sourcesPagePath, "utf8");
const writeSmoke = readFileSync(writeSmokePath, "utf8");
const workflow = readFileSync(workflowPath, "utf8");
const preWinTenders = demoData.tenders.filter((tender) => tender.funnel === "pre_win");
const expectedRenderedRoutes = 9 + 3 + preWinTenders.length;
const writeContract = fixture.write_contract ?? {};
const failures = [];

assert(expectedRenderedRoutes === expectedRouteCount, `route fixture must resolve to ${expectedRouteCount} rendered route checks`);
assert(writeContract.route === expectedApiRoute, "owner receipt write contract route changed");
assert(writeContract.method === "POST", "owner receipt write contract method must stay POST");
assert(writeContract.status === "draft", "owner receipt write contract must stay draft");
assert(writeContract.request_schema?.length === expectedRequestFieldCount, "owner receipt write contract must keep 10 request fields");
assert(writeContract.request_schema?.includes("idempotency_key"), "owner receipt write contract must keep idempotency_key");
assert(writeContract.no_merge_copy?.includes("immutable audit append"), "owner receipt write contract must keep immutable audit copy");

assert(apiReadme.includes("### Source Owner Receipt Write API Draft"), "API README must keep write draft heading anchor");
assert(apiReadme.includes("write_contract"), "API README must document write_contract");
assert(apiReadme.includes('method="POST"'), "API README must document POST method");
assert(apiReadme.includes("idempotency_key"), "API README must document idempotency key");
assert(apiReadme.includes("immutable audit append"), "API README must document immutable audit append");

assert(
  packageJson.scripts?.["smoke:source-owner-receipt-write-rendered-route-failure-copy"] ===
    "node scripts/source-owner-receipt-write-rendered-route-failure-copy.mjs",
  "package.json must expose source owner receipt write rendered route smoke",
);
assert(writeSmoke.includes(expectedDocsHref), "write API draft smoke must check write docs href");
assert(writeSmoke.includes("### Source Owner Receipt Write API Draft"), "write API draft smoke must check write README heading");

assert(sourcesPage.includes(expectedSourceMarker), "/sources must expose write draft marker");
assert(sourcesPage.includes("data-request-schema={sourceOwnerReceiptWriteContract.request_schema.join(\",\")}"), "/sources must expose request schema");
assert(sourcesPage.includes("data-no-merge-copy={sourceOwnerReceiptWriteContract.no_merge_copy}"), "/sources must expose no-merge copy");

assert(planPage.includes(expectedPlanMarker), "/plan must expose source owner receipt write rendered route failure copy marker");
assert(planPage.includes(expectedCommand), "/plan must expose write rendered route failure copy command");
assert(planPage.includes(expectedDocsHref), "/plan must expose write rendered route docs href");
assert(planPage.includes(expectedFailingCommand), "/plan must expose failing rendered route smoke command");
assert(planPage.includes(expectedNoMergeCopy), "/plan must expose write rendered route no-merge copy");
assert(planPage.includes("Sources owner + API owner + QA owner"), "/plan must expose write rendered route owners");
assert(
  planPage.includes("data-failing-command={sourceOwnerReceiptWriteRenderedRouteFailureCopy.failingCommand}"),
  "/plan must expose rendered route failing command data attr",
);
assert(
  planPage.includes("data-parity-command={sourceOwnerReceiptWriteRenderedRouteFailureCopy.parityCommand}"),
  "/plan must expose rendered route parity command data attr",
);

assert(routeSmoke.includes('data-testid=\\"source-owner-receipt-write-rendered-route-failure-copy\\"'), "route smoke must require write rendered route marker");
assert(routeSmoke.includes(`data-command=\\"${expectedCommand}\\"`), "route smoke must require write rendered route command");
assert(routeSmoke.includes(`data-failing-command=\\"${expectedFailingCommand}\\"`), "route smoke must require failing rendered route command");
assert(routeSmoke.includes(`data-no-merge-copy=\\"${expectedNoMergeCopy}\\"`), "route smoke must require write rendered route no-merge copy");
assert(routeSmoke.includes("Что делать, если write draft пропал в rendered routes"), "route smoke must require visible write rendered route heading");
assert(routeSmoke.includes("data-expected-command-count=\\\"80\\\""), "route smoke must require updated Web build command count");

assert(workflow.includes(`name: ${expectedWorkflowName}`), "workflow must keep Web build name");
assert(workflow.includes(`run: ${expectedCommand}`), "Web build must run write rendered route failure copy smoke");
assert(
  workflow.indexOf("run: npm run smoke:source-owner-receipt-write-docs-failure-copy") <
    workflow.indexOf(`run: ${expectedCommand}`),
  "write rendered route failure copy smoke must run after write docs failure copy",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf("run: npm run smoke:source-freshness-write-api-draft"),
  "write rendered route failure copy smoke must run before source freshness write draft smoke",
);

if (failures.length > 0) {
  console.error("FAIL source owner receipt write rendered-route failure copy");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(
  `PASS source owner receipt write rendered-route failure copy (${expectedRouteCount} routes, ${expectedRequestFieldCount} fields)`,
);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
