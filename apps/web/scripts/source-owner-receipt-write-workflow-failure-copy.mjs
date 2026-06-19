import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedApiRoute = "/v1/sources/owner-receipts";
const expectedCommand = "npm run smoke:source-owner-receipt-write-workflow-failure-copy";
const expectedDocsHref =
  "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#source-owner-receipt-write-api-draft";
const expectedFailingCommand = "npm run smoke:web-build-workflow";
const expectedNoMergeCopy =
  "Не мержить, пока Web build снова запускает source owner receipt write API, smoke, docs и rendered-route checks в правильном порядке перед source freshness write.";
const expectedPlanMarker = 'data-testid="source-owner-receipt-write-workflow-failure-copy"';
const expectedRequestFieldCount = 10;
const expectedRouteCount = 16;
const expectedSourceMarker = 'data-testid="source-owner-receipt-write-rendered-route-failure-copy"';
const expectedWorkflowName = "Web build";
const expectedWorkflowPath = ".github/workflows/web-build.yml";

const writeApiCommand = "npm run smoke:source-owner-receipt-write-api-draft";
const writeSmokeCommand = "npm run smoke:source-owner-receipt-write-smoke-failure-copy";
const writeDocsCommand = "npm run smoke:source-owner-receipt-write-docs-failure-copy";
const writeRenderedCommand = "npm run smoke:source-owner-receipt-write-rendered-route-failure-copy";
const nextDomainCommand = "npm run smoke:source-freshness-write-api-draft";

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(webRoot, "../..");
const apiReadmePath = resolve(repoRoot, "apps/api/README.md");
const demoDataPath = resolve(repoRoot, "packages/shared/demo-data/asts-demo.json");
const packagePath = resolve(webRoot, "package.json");
const planPagePath = resolve(webRoot, "app/plan/page.tsx");
const routeSmokePath = resolve(webRoot, "scripts/smoke.mjs");
const writeRenderedSmokePath = resolve(webRoot, "scripts/source-owner-receipt-write-rendered-route-failure-copy.mjs");
const writeSmokePath = resolve(webRoot, "scripts/source-owner-receipt-write-api-draft.mjs");
const workflowPath = resolve(repoRoot, expectedWorkflowPath);

const apiReadme = readFileSync(apiReadmePath, "utf8");
const demoData = JSON.parse(readFileSync(demoDataPath, "utf8"));
const packageJson = JSON.parse(readFileSync(packagePath, "utf8"));
const planPage = readFileSync(planPagePath, "utf8");
const routeSmoke = readFileSync(routeSmokePath, "utf8");
const writeRenderedSmoke = readFileSync(writeRenderedSmokePath, "utf8");
const writeSmoke = readFileSync(writeSmokePath, "utf8");
const workflow = readFileSync(workflowPath, "utf8");
const preWinTenders = demoData.tenders.filter((tender) => tender.funnel === "pre_win");
const expectedRenderedRoutes = 9 + 3 + preWinTenders.length;
const failures = [];

assert(expectedRenderedRoutes === expectedRouteCount, `route fixture must resolve to ${expectedRouteCount} rendered route checks`);

assert(apiReadme.includes("### Source Owner Receipt Write API Draft"), "API README must keep owner receipt write draft heading anchor");
assert(apiReadme.includes("write_contract"), "API README must document write_contract");
assert(apiReadme.includes('method="POST"'), "API README must document POST method");
assert(apiReadme.includes("idempotency_key"), "API README must document idempotency key");
assert(apiReadme.includes("immutable audit append"), "API README must document immutable audit append");

assert(
  packageJson.scripts?.["smoke:source-owner-receipt-write-workflow-failure-copy"] ===
    "node scripts/source-owner-receipt-write-workflow-failure-copy.mjs",
  "package.json must expose source owner receipt write workflow failure smoke",
);
assert(writeSmoke.includes(expectedDocsHref), "write API draft smoke must check write docs href");
assert(writeSmoke.includes("### Source Owner Receipt Write API Draft"), "write API draft smoke must check write README heading");
assert(writeRenderedSmoke.includes(writeRenderedCommand), "write rendered route smoke must keep rendered route command");

assert(workflow.includes(`name: ${expectedWorkflowName}`), "workflow must keep Web build name");
assert(workflow.includes(`run: ${expectedCommand}`), "Web build must run source owner receipt write workflow failure copy smoke");
assert(workflow.includes(`run: ${writeApiCommand}`), "Web build must keep write API draft smoke");
assert(workflow.includes(`run: ${writeSmokeCommand}`), "Web build must keep write smoke failure copy");
assert(workflow.includes(`run: ${writeDocsCommand}`), "Web build must keep write docs failure copy");
assert(workflow.includes(`run: ${writeRenderedCommand}`), "Web build must keep write rendered route failure copy");
assert(
  workflow.indexOf(`run: ${writeApiCommand}`) < workflow.indexOf(`run: ${writeSmokeCommand}`),
  "write smoke failure copy must run after write API draft",
);
assert(
  workflow.indexOf(`run: ${writeSmokeCommand}`) < workflow.indexOf(`run: ${writeDocsCommand}`),
  "write docs failure copy must run after write smoke failure copy",
);
assert(
  workflow.indexOf(`run: ${writeDocsCommand}`) < workflow.indexOf(`run: ${writeRenderedCommand}`),
  "write rendered route failure copy must run after write docs failure copy",
);
assert(
  workflow.indexOf(`run: ${writeRenderedCommand}`) < workflow.indexOf(`run: ${expectedCommand}`),
  "write workflow failure copy must run after write rendered route failure copy",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf(`run: ${nextDomainCommand}`),
  "write workflow failure copy must run before source freshness write draft smoke",
);

assert(planPage.includes(expectedSourceMarker), "/plan must keep source owner write rendered route marker");
assert(planPage.includes(expectedPlanMarker), "/plan must expose source owner write workflow failure copy marker");
assert(planPage.includes("sourceOwnerReceiptWriteWorkflowFailureCopy"), "/plan must expose source owner write workflow failure copy data");
assert(planPage.includes(expectedCommand), "/plan must expose source owner write workflow failure command");
assert(planPage.includes(expectedDocsHref), "/plan must expose source owner write docs href");
assert(planPage.includes(expectedFailingCommand), "/plan must expose failing web build workflow command");
assert(planPage.includes(expectedNoMergeCopy), "/plan must expose source owner write workflow no-merge copy");
assert(planPage.includes("Sources owner + CI owner + QA owner"), "/plan must expose source owner write workflow owners");
assert(planPage.includes("data-failing-command={sourceOwnerReceiptWriteWorkflowFailureCopy.failingCommand}"), "/plan must expose workflow failing command data attr");
assert(planPage.includes("data-parity-command={sourceOwnerReceiptWriteWorkflowFailureCopy.parityCommand}"), "/plan must expose workflow parity command data attr");

assert(routeSmoke.includes('data-testid=\\"source-owner-receipt-write-workflow-failure-copy\\"'), "route smoke must require source owner write workflow marker");
assert(routeSmoke.includes(`data-command=\\"${expectedCommand}\\"`), "route smoke must require source owner write workflow command");
assert(routeSmoke.includes(`data-failing-command=\\"${expectedFailingCommand}\\"`), "route smoke must require failing web build workflow command");
assert(routeSmoke.includes(`data-no-merge-copy=\\"${expectedNoMergeCopy}\\"`), "route smoke must require source owner write workflow no-merge copy");
assert(routeSmoke.includes("Что делать, если source owner write workflow order упал"), "route smoke must require visible source owner write workflow heading");
assert(routeSmoke.includes('data-expected-command-count=\\"92\\"'), "route smoke must require updated Web build command count");

if (failures.length > 0) {
  console.error("FAIL source owner receipt write workflow failure copy");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS source owner receipt write workflow failure copy (${expectedRouteCount} routes, ${expectedRequestFieldCount} fields)`);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
