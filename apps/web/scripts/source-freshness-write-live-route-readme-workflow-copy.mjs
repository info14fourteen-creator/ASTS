import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedApiRoute = "/v1/sources/freshness";
const expectedCommand = "npm run smoke:source-freshness-write-live-route-readme-workflow-copy";
const expectedDocsHref =
  "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#source-freshness-write-api-draft";
const expectedFailingCommand = "npm run smoke:web-build-workflow";
const expectedNextDomainCommand = "npm run smoke:source-freshness-rendered-route-failure-copy";
const expectedNoMergeCopy =
  "Не мержить, пока Web build снова запускает freshness README rendered copy перед workflow failure и freshness rendered checks.";
const expectedPlanMarker = 'data-testid="source-freshness-write-live-route-readme-workflow-copy"';
const expectedReadmeRenderedCommand = "npm run smoke:source-freshness-write-live-route-readme-rendered-copy";
const expectedRepairTargets =
  ".github/workflows/web-build.yml,/plan,apps/web/scripts/source-freshness-write-live-route-readme-rendered-copy.mjs,apps/web/scripts/web-build-workflow-file.mjs";
const expectedSourceMarker = 'data-testid="source-freshness-write-live-route-readme-rendered-copy"';
const expectedWorkflowFailureCommand = "npm run smoke:source-freshness-write-workflow-failure-copy";
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
  packageJson.scripts?.["smoke:source-freshness-write-live-route-readme-workflow-copy"] ===
    "node scripts/source-freshness-write-live-route-readme-workflow-copy.mjs",
  "package.json must expose source freshness README workflow copy smoke",
);

assert(workflow.includes(`name: ${expectedWorkflowName}`), "workflow must keep Web build name");
assert(
  workflow.includes(`run: ${expectedReadmeRenderedCommand}`),
  "Web build must keep source freshness README rendered copy smoke",
);
assert(workflow.includes(`run: ${expectedCommand}`), "Web build must run source freshness README workflow copy");
assert(
  workflow.includes(`run: ${expectedWorkflowFailureCommand}`),
  "Web build must keep source freshness workflow failure copy",
);
assert(
  workflow.indexOf(`run: ${expectedReadmeRenderedCommand}`) < workflow.indexOf(`run: ${expectedCommand}`),
  "source freshness README workflow copy smoke must run after README rendered copy",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf(`run: ${expectedWorkflowFailureCommand}`),
  "source freshness README workflow copy smoke must run before workflow failure copy",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf(`run: ${expectedNextDomainCommand}`),
  "source freshness README workflow copy smoke must run before freshness rendered checks",
);
assert(workflowFileSmoke.includes(expectedCommand), "workflow file smoke must count source freshness README workflow command");
assert(workflowFileSmoke.includes(expectedPlanMarker), "workflow file smoke must require source freshness README workflow marker");

assert(planPage.includes(expectedSourceMarker), "/plan must keep source freshness README rendered marker");
assert(planPage.includes(expectedPlanMarker), "/plan must expose source freshness README workflow marker");
assert(
  planPage.includes("sourceFreshnessWriteLiveRouteReadmeWorkflowCopy"),
  "/plan must expose source freshness README workflow data",
);
assert(planPage.includes(expectedApiRoute), "/plan must expose source freshness API route");
assert(planPage.includes(expectedCommand), "/plan must expose source freshness README workflow command");
assert(planPage.includes(expectedDocsHref), "/plan must expose source freshness write docs href");
assert(planPage.includes(expectedFailingCommand), "/plan must expose failing Web build workflow command");
assert(planPage.includes(expectedReadmeRenderedCommand), "/plan must expose source freshness README rendered command");
assert(planPage.includes(expectedWorkflowFailureCommand), "/plan must expose workflow failure command");
assert(planPage.includes(expectedRepairTargets), "/plan must expose source freshness README workflow repair targets");
assert(planPage.includes("Sources owner + CI owner + QA owner"), "/plan must expose source freshness README workflow owners");
assert(planPage.includes(expectedNoMergeCopy), "/plan must show source freshness README workflow no-merge copy");

assert(
  routeSmoke.includes('data-testid=\\"source-freshness-write-live-route-readme-workflow-copy\\"'),
  "route smoke must require source freshness README workflow marker",
);
assert(
  routeSmoke.includes(`data-command=\\"${expectedCommand}\\"`),
  "route smoke must require source freshness README workflow command",
);
assert(
  routeSmoke.includes(`data-failing-command=\\"${expectedFailingCommand}\\"`),
  "route smoke must require Web build workflow command",
);
assert(
  routeSmoke.includes(`data-readme-rendered-command=\\"${expectedReadmeRenderedCommand}\\"`),
  "route smoke must require source freshness README rendered command",
);
assert(
  routeSmoke.includes(`data-workflow-failure-command=\\"${expectedWorkflowFailureCommand}\\"`),
  "route smoke must require workflow failure command",
);
assert(
  routeSmoke.includes(`data-no-merge-copy=\\"${expectedNoMergeCopy}\\"`),
  "route smoke must require source freshness README workflow no-merge copy",
);
assert(
  routeSmoke.includes("Что делать, если freshness README workflow order упал"),
  "route smoke must require visible source freshness README workflow heading",
);
assert(routeSmoke.includes('data-expected-command-count=\\"95\\"'), "route smoke must require updated Web build command count");

if (failures.length > 0) {
  console.error("FAIL source freshness write live route README workflow copy");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS source freshness write live route README workflow copy (${expectedReadmeRenderedCommand})`);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
