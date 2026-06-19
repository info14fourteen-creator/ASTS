import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedApiRoute = "/v1/sources/owner-receipts";
const expectedCommand = "npm run smoke:source-owner-receipt-write-live-route-readme-workflow-failure-copy";
const expectedDocsHref =
  "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#source-owner-receipt-write-api-draft";
const expectedFailingCommand = "npm run smoke:web-build-workflow";
const expectedNextDomainCommand = "npm run smoke:source-freshness-write-api-draft";
const expectedNoMergeCopy =
  "Не мержить, пока Web build снова запускает source owner README workflow copy перед workflow failure и source freshness checks.";
const expectedPlanMarker = 'data-testid="source-owner-receipt-write-live-route-readme-workflow-failure-copy"';
const expectedReadmeWorkflowCommand = "npm run smoke:source-owner-receipt-write-live-route-readme-workflow-copy";
const expectedRepairTargets =
  ".github/workflows/web-build.yml,/plan,apps/web/scripts/source-owner-receipt-write-live-route-readme-workflow-copy.mjs,apps/web/scripts/source-owner-receipt-write-workflow-failure-copy.mjs";
const expectedSourceMarker = 'data-testid="source-owner-receipt-write-live-route-readme-workflow-copy"';
const expectedWorkflowFailureCommand = "npm run smoke:source-owner-receipt-write-workflow-failure-copy";
const expectedWorkflowName = "Web build";
const expectedWorkflowPath = ".github/workflows/web-build.yml";

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(webRoot, "../..");
const packagePath = resolve(webRoot, "package.json");
const planPagePath = resolve(webRoot, "app/plan/page.tsx");
const routeSmokePath = resolve(webRoot, "scripts/smoke.mjs");
const workflowPath = resolve(repoRoot, expectedWorkflowPath);
const workflowFileSmokePath = resolve(webRoot, "scripts/web-build-workflow-file.mjs");

const packageJson = JSON.parse(readFileSync(packagePath, "utf8"));
const planPage = readFileSync(planPagePath, "utf8");
const routeSmoke = readFileSync(routeSmokePath, "utf8");
const workflow = readFileSync(workflowPath, "utf8");
const workflowFileSmoke = readFileSync(workflowFileSmokePath, "utf8");
const failures = [];

assert(
  packageJson.scripts?.["smoke:source-owner-receipt-write-live-route-readme-workflow-failure-copy"] ===
    "node scripts/source-owner-receipt-write-live-route-readme-workflow-failure-copy.mjs",
  "package.json must expose source owner README workflow failure copy smoke",
);

assert(workflow.includes(`name: ${expectedWorkflowName}`), "workflow must keep Web build name");
assert(
  workflow.includes(`run: ${expectedReadmeWorkflowCommand}`),
  "Web build must keep source owner README workflow copy smoke",
);
assert(workflow.includes(`run: ${expectedCommand}`), "Web build must run source owner README workflow failure copy");
assert(
  workflow.includes(`run: ${expectedWorkflowFailureCommand}`),
  "Web build must keep source owner workflow failure copy",
);
assert(
  workflow.indexOf(`run: ${expectedReadmeWorkflowCommand}`) < workflow.indexOf(`run: ${expectedCommand}`),
  "source owner README workflow failure copy smoke must run after README workflow copy",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf(`run: ${expectedWorkflowFailureCommand}`),
  "source owner README workflow failure copy smoke must run before workflow failure copy",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf(`run: ${expectedNextDomainCommand}`),
  "source owner README workflow failure copy smoke must run before source freshness write checks",
);
assert(workflowFileSmoke.includes(expectedCommand), "workflow file smoke must count source owner README workflow failure command");
assert(workflowFileSmoke.includes(expectedPlanMarker), "workflow file smoke must require source owner README workflow failure marker");

assert(planPage.includes(expectedSourceMarker), "/plan must keep source owner README workflow marker");
assert(planPage.includes(expectedPlanMarker), "/plan must expose source owner README workflow failure marker");
assert(
  planPage.includes("sourceOwnerReceiptWriteLiveRouteReadmeWorkflowFailureCopy"),
  "/plan must expose source owner README workflow failure data",
);
assert(planPage.includes(expectedApiRoute), "/plan must expose owner receipts API route");
assert(planPage.includes(expectedCommand), "/plan must expose source owner README workflow failure command");
assert(planPage.includes(expectedDocsHref), "/plan must expose source owner write docs href");
assert(planPage.includes(expectedFailingCommand), "/plan must expose failing Web build workflow command");
assert(planPage.includes(expectedReadmeWorkflowCommand), "/plan must expose source owner README workflow command");
assert(planPage.includes(expectedWorkflowFailureCommand), "/plan must expose workflow failure command");
assert(planPage.includes(expectedRepairTargets), "/plan must expose source owner README workflow failure repair targets");
assert(planPage.includes("Sources owner + CI owner + QA owner"), "/plan must expose source owner README workflow failure owners");
assert(planPage.includes(expectedNoMergeCopy), "/plan must show source owner README workflow failure no-merge copy");

assert(
  routeSmoke.includes('data-testid=\\"source-owner-receipt-write-live-route-readme-workflow-failure-copy\\"'),
  "route smoke must require source owner README workflow failure marker",
);
assert(
  routeSmoke.includes(`data-command=\\"${expectedCommand}\\"`),
  "route smoke must require source owner README workflow failure command",
);
assert(
  routeSmoke.includes(`data-failing-command=\\"${expectedFailingCommand}\\"`),
  "route smoke must require Web build workflow command",
);
assert(
  routeSmoke.includes(`data-readme-workflow-command=\\"${expectedReadmeWorkflowCommand}\\"`),
  "route smoke must require source owner README workflow command",
);
assert(
  routeSmoke.includes(`data-workflow-failure-command=\\"${expectedWorkflowFailureCommand}\\"`),
  "route smoke must require workflow failure command",
);
assert(
  routeSmoke.includes(`data-no-merge-copy=\\"${expectedNoMergeCopy}\\"`),
  "route smoke must require source owner README workflow failure no-merge copy",
);
assert(
  routeSmoke.includes("Что делать, если source owner README workflow failure guard упал"),
  "route smoke must require visible source owner README workflow failure heading",
);
assert(routeSmoke.includes('data-expected-command-count=\\"97\\"'), "route smoke must require updated Web build command count");

if (failures.length > 0) {
  console.error("FAIL source owner receipt write live route README workflow failure copy");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS source owner receipt write live route README workflow failure copy (${expectedReadmeWorkflowCommand})`);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
