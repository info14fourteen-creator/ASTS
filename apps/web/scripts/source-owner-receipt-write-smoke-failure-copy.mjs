import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedApiRoute = "/v1/sources/owner-receipts";
const expectedCommand = "npm run smoke:source-owner-receipt-write-smoke-failure-copy";
const expectedDocsHref =
  "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#source-owner-receipt-write-api-draft";
const expectedFailingCommand = "npm run smoke:source-owner-receipt-write-api-draft";
const expectedNoMergeCopy =
  "Не мержить, пока source owner receipt write smoke снова подтверждает draft POST contract, idempotency key, checksum evidence и immutable audit append.";
const expectedPlanMarker = 'data-testid="source-owner-receipt-write-smoke-failure-copy"';
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
const writeContract = fixture.write_contract ?? {};
const failures = [];

assert(expectedRenderedRoutes === expectedRouteCount, `route fixture must resolve to ${expectedRouteCount} rendered route checks`);
assert(writeContract.route === expectedApiRoute, "owner receipt write contract route changed");
assert(writeContract.method === "POST", "owner receipt write contract method must stay POST");
assert(writeContract.status === "draft", "owner receipt write contract must stay draft");
assert(writeContract.idempotency_key_required === true, "owner receipt write contract must require idempotency key");
assert(writeContract.request_schema?.length === expectedRequestFieldCount, "owner receipt write contract must keep 10 request fields");
assert(writeContract.no_merge_copy?.includes("immutable audit append"), "owner receipt write contract must keep no-merge audit copy");

assert(apiReadme.includes("### Source Owner Receipt Write API Draft"), "API README must document write draft");
assert(apiReadme.includes("idempotency_key"), "API README must mention idempotency key");
assert(apiReadme.includes("immutable audit append"), "API README must mention immutable audit append");

assert(sourcesPage.includes(expectedSourceMarker), "/sources must expose write draft marker");
assert(sourcesPage.includes("data-request-schema={sourceOwnerReceiptWriteContract.request_schema.join(\",\")}"), "/sources must expose request schema");
assert(sourcesPage.includes("data-no-merge-copy={sourceOwnerReceiptWriteContract.no_merge_copy}"), "/sources must expose no-merge copy");

assert(planPage.includes(expectedPlanMarker), "/plan must expose source owner receipt write smoke failure copy marker");
assert(planPage.includes(expectedCommand), "/plan must expose write failure copy command");
assert(planPage.includes(expectedDocsHref), "/plan must expose write docs href");
assert(planPage.includes(expectedFailingCommand), "/plan must expose failing write smoke command");
assert(planPage.includes(expectedNoMergeCopy), "/plan must expose write failure no-merge copy");
assert(planPage.includes("Sources owner + API owner + QA owner"), "/plan must expose write failure owners");
assert(planPage.includes("data-failing-command={sourceOwnerReceiptWriteSmokeFailureCopy.failingCommand}"), "/plan must expose failing command data attr");
assert(planPage.includes("data-parity-command={sourceOwnerReceiptWriteSmokeFailureCopy.parityCommand}"), "/plan must expose parity command data attr");

assert(routeSmoke.includes('data-testid=\\"source-owner-receipt-write-smoke-failure-copy\\"'), "route smoke must require write failure copy marker");
assert(routeSmoke.includes(`data-command=\\"${expectedCommand}\\"`), "route smoke must require write failure command");
assert(routeSmoke.includes(`data-failing-command=\\"${expectedFailingCommand}\\"`), "route smoke must require failing write command");
assert(routeSmoke.includes(`data-no-merge-copy=\\"${expectedNoMergeCopy}\\"`), "route smoke must require write failure no-merge copy");
assert(routeSmoke.includes("Что делать, если write draft smoke упал"), "route smoke must require visible failure heading");

assert(workflow.includes(`name: ${expectedWorkflowName}`), "workflow must keep Web build name");
assert(workflow.includes(`run: ${expectedCommand}`), "Web build must run write failure copy smoke");
assert(
  workflow.indexOf(`run: ${expectedFailingCommand}`) < workflow.indexOf(`run: ${expectedCommand}`),
  "write failure copy smoke must run after write draft smoke",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf("run: npm run smoke:source-freshness-write-api-draft"),
  "write failure copy smoke must run before source freshness write draft smoke",
);

if (failures.length > 0) {
  console.error("FAIL source owner receipt write smoke failure copy");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(
  `PASS source owner receipt write smoke failure copy (${expectedRouteCount} routes, ${expectedRequestFieldCount} fields)`,
);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
