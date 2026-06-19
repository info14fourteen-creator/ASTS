import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedApiRoute = "/v1/ai/review-queue";
const expectedCommand = "npm run smoke:ai-review-receipt-write-live-route-readme-workflow-copy";
const expectedDocsHref =
  "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#ai-review-receipt-write-api-draft";
const expectedFailingCommand = "npm run smoke:web-build-workflow";
const expectedNextDomainCommand = "npm run smoke:shared-readme-commands";
const expectedNoMergeCopy =
  "Не мержить, пока Web build снова запускает AI README rendered copy перед workflow failure и shared README checks.";
const expectedPlanMarker = 'data-testid="ai-review-receipt-write-live-route-readme-workflow-copy"';
const expectedReadmeRenderedCommand = "npm run smoke:ai-review-receipt-write-live-route-readme-rendered-copy";
const expectedRepairTargets =
  ".github/workflows/web-build.yml,/plan,apps/web/scripts/ai-review-receipt-write-live-route-readme-rendered-copy.mjs,apps/web/scripts/web-build-workflow-file.mjs";
const expectedSourceMarker = 'data-testid="ai-review-receipt-write-live-route-readme-rendered-copy"';
const expectedWorkflowFailureCommand = "npm run smoke:ai-review-receipt-write-workflow-failure-copy";
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
  packageJson.scripts?.["smoke:ai-review-receipt-write-live-route-readme-workflow-copy"] ===
    "node scripts/ai-review-receipt-write-live-route-readme-workflow-copy.mjs",
  "package.json must expose AI README workflow copy smoke",
);

assert(workflow.includes(`name: ${expectedWorkflowName}`), "workflow must keep Web build name");
assert(workflow.includes(`run: ${expectedReadmeRenderedCommand}`), "Web build must keep AI README rendered copy smoke");
assert(workflow.includes(`run: ${expectedCommand}`), "Web build must run AI README workflow copy");
assert(workflow.includes(`run: ${expectedWorkflowFailureCommand}`), "Web build must keep AI workflow failure copy");
assert(
  workflow.indexOf(`run: ${expectedReadmeRenderedCommand}`) < workflow.indexOf(`run: ${expectedCommand}`),
  "AI README workflow copy smoke must run after README rendered copy",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf(`run: ${expectedWorkflowFailureCommand}`),
  "AI README workflow copy smoke must run before workflow failure copy",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf(`run: ${expectedNextDomainCommand}`),
  "AI README workflow copy smoke must run before shared README checks",
);
assert(workflowFileSmoke.includes(expectedCommand), "workflow file smoke must count AI README workflow command");
assert(workflowFileSmoke.includes(expectedPlanMarker), "workflow file smoke must require AI README workflow marker");

assert(planPage.includes(expectedSourceMarker), "/plan must keep AI README rendered marker");
assert(planPage.includes(expectedPlanMarker), "/plan must expose AI README workflow marker");
assert(planPage.includes("aiReviewReceiptWriteLiveRouteReadmeWorkflowCopy"), "/plan must expose AI README workflow data");
assert(planPage.includes(expectedApiRoute), "/plan must expose AI review queue API route");
assert(planPage.includes(expectedCommand), "/plan must expose AI README workflow command");
assert(planPage.includes(expectedDocsHref), "/plan must expose AI write docs href");
assert(planPage.includes(expectedFailingCommand), "/plan must expose failing Web build workflow command");
assert(planPage.includes(expectedReadmeRenderedCommand), "/plan must expose AI README rendered command");
assert(planPage.includes(expectedWorkflowFailureCommand), "/plan must expose workflow failure command");
assert(planPage.includes(expectedRepairTargets), "/plan must expose AI README workflow repair targets");
assert(planPage.includes("AI workflow owner + CI owner + QA owner"), "/plan must expose AI README workflow owners");
assert(planPage.includes(expectedNoMergeCopy), "/plan must show AI README workflow no-merge copy");

assert(
  routeSmoke.includes('data-testid=\\"ai-review-receipt-write-live-route-readme-workflow-copy\\"'),
  "route smoke must require AI README workflow marker",
);
assert(routeSmoke.includes(`data-command=\\"${expectedCommand}\\"`), "route smoke must require AI README workflow command");
assert(
  routeSmoke.includes(`data-failing-command=\\"${expectedFailingCommand}\\"`),
  "route smoke must require Web build workflow command",
);
assert(
  routeSmoke.includes(`data-readme-rendered-command=\\"${expectedReadmeRenderedCommand}\\"`),
  "route smoke must require AI README rendered command",
);
assert(
  routeSmoke.includes(`data-workflow-failure-command=\\"${expectedWorkflowFailureCommand}\\"`),
  "route smoke must require workflow failure command",
);
assert(
  routeSmoke.includes(`data-no-merge-copy=\\"${expectedNoMergeCopy}\\"`),
  "route smoke must require AI README workflow no-merge copy",
);
assert(routeSmoke.includes("Что делать, если AI README workflow order упал"), "route smoke must require visible AI README workflow heading");
assert(routeSmoke.includes('data-expected-command-count=\\"93\\"'), "route smoke must require updated Web build command count");

if (failures.length > 0) {
  console.error("FAIL AI review receipt write live route README workflow copy");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS AI review receipt write live route README workflow copy (${expectedReadmeRenderedCommand})`);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
