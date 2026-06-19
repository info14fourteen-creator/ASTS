import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedApiRoute = "/v1/sources/freshness";
const expectedCommand = "npm run smoke:source-freshness-write-live-route-readme-rendered-copy";
const expectedDocsCommand = "npm run smoke:source-freshness-write-live-route-docs-copy";
const expectedDocsHref =
  "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#source-freshness-write-api-draft";
const expectedFailingCommand = "npm run smoke -- --url http://127.0.0.1:4177/";
const expectedNextDomainCommand = "npm run smoke:source-freshness-rendered-route-failure-copy";
const expectedNoMergeCopy =
  "Не мержить, пока rendered routes smoke снова подтверждает freshness README trigger copy, README path и Web build count.";
const expectedPlanMarker = 'data-testid="source-freshness-write-live-route-readme-rendered-copy"';
const expectedReadmeTriggerCommand = "npm run smoke:source-freshness-write-live-route-readme-trigger-copy";
const expectedRepairTargets =
  "apps/web/scripts/smoke.mjs,/plan,apps/web/scripts/source-freshness-write-live-route-readme-trigger-copy.mjs,.github/workflows/web-build.yml";
const expectedSourceMarker = 'data-testid="source-freshness-write-live-route-readme-trigger-copy"';
const expectedTriggerPath = "apps/api/README.md";
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
  packageJson.scripts?.["smoke:source-freshness-write-live-route-readme-rendered-copy"] ===
    "node scripts/source-freshness-write-live-route-readme-rendered-copy.mjs",
  "package.json must expose source freshness README rendered copy smoke",
);

assert(workflow.includes(`name: ${expectedWorkflowName}`), "workflow must keep Web build name");
assert(workflow.includes(`run: ${expectedReadmeTriggerCommand}`), "Web build must keep source freshness README trigger copy");
assert(workflow.includes(`run: ${expectedCommand}`), "Web build must run source freshness README rendered copy");
assert(
  workflow.includes(`run: ${expectedWorkflowFailureCommand}`),
  "Web build must keep source freshness workflow failure copy",
);
assert(
  workflow.indexOf(`run: ${expectedReadmeTriggerCommand}`) < workflow.indexOf(`run: ${expectedCommand}`),
  "source freshness README rendered copy smoke must run after README trigger copy",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf(`run: ${expectedWorkflowFailureCommand}`),
  "source freshness README rendered copy smoke must run before workflow failure copy",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf(`run: ${expectedNextDomainCommand}`),
  "source freshness README rendered copy smoke must run before freshness rendered checks",
);
assert(workflowFileSmoke.includes(expectedCommand), "workflow file smoke must count source freshness README rendered command");
assert(workflowFileSmoke.includes(expectedPlanMarker), "workflow file smoke must require source freshness README rendered marker");

assert(planPage.includes(expectedSourceMarker), "/plan must keep source freshness README trigger marker");
assert(planPage.includes(expectedPlanMarker), "/plan must expose source freshness README rendered marker");
assert(
  planPage.includes("sourceFreshnessWriteLiveRouteReadmeRenderedCopy"),
  "/plan must expose source freshness README rendered copy data",
);
assert(planPage.includes(expectedApiRoute), "/plan must expose source freshness API route");
assert(planPage.includes(expectedCommand), "/plan must expose source freshness README rendered command");
assert(planPage.includes(expectedDocsCommand), "/plan must expose source freshness docs command");
assert(planPage.includes(expectedDocsHref), "/plan must expose source freshness write docs href");
assert(planPage.includes(expectedFailingCommand), "/plan must expose rendered route smoke command");
assert(planPage.includes(expectedReadmeTriggerCommand), "/plan must expose README trigger command");
assert(planPage.includes(expectedRepairTargets), "/plan must expose source freshness README rendered repair targets");
assert(planPage.includes("Sources owner + Docs owner + QA owner"), "/plan must expose source freshness README rendered owners");
assert(planPage.includes(expectedNoMergeCopy), "/plan must show source freshness README rendered no-merge copy");

assert(
  routeSmoke.includes('data-testid=\\"source-freshness-write-live-route-readme-trigger-copy\\"'),
  "route smoke must still require source freshness README trigger marker",
);
assert(
  routeSmoke.includes(`data-command=\\"${expectedReadmeTriggerCommand}\\"`),
  "route smoke must still require source freshness README trigger command",
);
assert(routeSmoke.includes(`data-trigger-path=\\"${expectedTriggerPath}\\"`), "route smoke must still require trigger path");
assert(
  routeSmoke.includes('data-testid=\\"source-freshness-write-live-route-readme-rendered-copy\\"'),
  "route smoke must require source freshness README rendered marker",
);
assert(routeSmoke.includes(`data-command=\\"${expectedCommand}\\"`), "route smoke must require source freshness README rendered command");
assert(
  routeSmoke.includes(`data-readme-trigger-command=\\"${expectedReadmeTriggerCommand}\\"`),
  "route smoke must require source freshness README trigger command data",
);
assert(routeSmoke.includes(`data-failing-command=\\"${expectedFailingCommand}\\"`), "route smoke must require rendered smoke command");
assert(
  routeSmoke.includes(`data-no-merge-copy=\\"${expectedNoMergeCopy}\\"`),
  "route smoke must require source freshness README rendered no-merge copy",
);
assert(
  routeSmoke.includes("Что делать, если freshness README trigger copy пропал в rendered routes"),
  "route smoke must require visible source freshness README rendered heading",
);
assert(routeSmoke.includes('data-expected-command-count=\\"92\\"'), "route smoke must require updated Web build command count");

if (failures.length > 0) {
  console.error("FAIL source freshness write live route README rendered copy");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS source freshness write live route README rendered copy (${expectedRouteSmokeSummary()})`);

function expectedRouteSmokeSummary() {
  return `${expectedTriggerPath}, rendered routes`;
}

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
