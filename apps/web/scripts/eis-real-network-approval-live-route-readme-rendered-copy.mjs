import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedApiRoute = "/v1/sources/connectors";
const expectedCommand = "npm run smoke:eis-real-network-approval-live-route-readme-rendered-copy";
const expectedDocsCommand = "npm run smoke:eis-real-network-approval-live-route-docs-copy";
const expectedDocsHref =
  "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#eis-real-network-approval-api-copy";
const expectedFailingCommand = "npm run smoke -- --url http://127.0.0.1:4177/";
const expectedNextDomainCommand = "npm run smoke:ai-review-actions";
const expectedNoMergeCopy =
  "Не мержить, пока rendered routes smoke снова подтверждает EIS README trigger copy, README path и Web build count.";
const expectedPlanMarker = 'data-testid="eis-real-network-approval-live-route-readme-rendered-copy"';
const expectedReadmeTriggerCommand = "npm run smoke:eis-real-network-approval-live-route-readme-trigger-copy";
const expectedRepairTargets =
  "apps/web/scripts/smoke.mjs,/plan,apps/web/scripts/eis-real-network-approval-live-route-readme-trigger-copy.mjs,.github/workflows/web-build.yml";
const expectedSourceMarker = 'data-testid="eis-real-network-approval-live-route-readme-trigger-copy"';
const expectedTriggerPath = "apps/api/README.md";
const expectedWorkflowFailureCommand = "npm run smoke:eis-real-network-approval-workflow-failure-copy";
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
  packageJson.scripts?.["smoke:eis-real-network-approval-live-route-readme-rendered-copy"] ===
    "node scripts/eis-real-network-approval-live-route-readme-rendered-copy.mjs",
  "package.json must expose EIS README rendered copy smoke",
);

assert(workflow.includes(`name: ${expectedWorkflowName}`), "workflow must keep Web build name");
assert(workflow.includes(`run: ${expectedReadmeTriggerCommand}`), "Web build must keep EIS README trigger copy");
assert(workflow.includes(`run: ${expectedCommand}`), "Web build must run EIS README rendered copy");
assert(workflow.includes(`run: ${expectedWorkflowFailureCommand}`), "Web build must keep EIS workflow failure copy");
assert(
  workflow.indexOf(`run: ${expectedReadmeTriggerCommand}`) < workflow.indexOf(`run: ${expectedCommand}`),
  "EIS README rendered copy smoke must run after README trigger copy",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf(`run: ${expectedWorkflowFailureCommand}`),
  "EIS README rendered copy smoke must run before workflow failure copy",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf(`run: ${expectedNextDomainCommand}`),
  "EIS README rendered copy smoke must run before AI review checks",
);
assert(workflowFileSmoke.includes(expectedCommand), "workflow file smoke must count EIS README rendered command");
assert(workflowFileSmoke.includes(expectedPlanMarker), "workflow file smoke must require EIS README rendered marker");

assert(planPage.includes(expectedSourceMarker), "/plan must keep EIS README trigger marker");
assert(planPage.includes(expectedPlanMarker), "/plan must expose EIS README rendered marker");
assert(
  planPage.includes("eisRealNetworkApprovalLiveRouteReadmeRenderedCopy"),
  "/plan must expose EIS README rendered copy data",
);
assert(planPage.includes(expectedApiRoute), "/plan must expose EIS connectors API route");
assert(planPage.includes(expectedCommand), "/plan must expose EIS README rendered command");
assert(planPage.includes(expectedDocsCommand), "/plan must expose EIS docs command");
assert(planPage.includes(expectedDocsHref), "/plan must expose EIS approval docs href");
assert(planPage.includes(expectedFailingCommand), "/plan must expose rendered route smoke command");
assert(planPage.includes(expectedReadmeTriggerCommand), "/plan must expose README trigger command");
assert(planPage.includes(expectedRepairTargets), "/plan must expose EIS README rendered repair targets");
assert(planPage.includes("Data owner + Docs owner + QA owner"), "/plan must expose EIS README rendered owners");
assert(planPage.includes(expectedNoMergeCopy), "/plan must show EIS README rendered no-merge copy");

assert(
  routeSmoke.includes('data-testid=\\"eis-real-network-approval-live-route-readme-trigger-copy\\"'),
  "route smoke must still require EIS README trigger marker",
);
assert(
  routeSmoke.includes(`data-command=\\"${expectedReadmeTriggerCommand}\\"`),
  "route smoke must still require EIS README trigger command",
);
assert(routeSmoke.includes(`data-trigger-path=\\"${expectedTriggerPath}\\"`), "route smoke must still require trigger path");
assert(
  routeSmoke.includes('data-testid=\\"eis-real-network-approval-live-route-readme-rendered-copy\\"'),
  "route smoke must require EIS README rendered marker",
);
assert(routeSmoke.includes(`data-command=\\"${expectedCommand}\\"`), "route smoke must require EIS README rendered command");
assert(
  routeSmoke.includes(`data-readme-trigger-command=\\"${expectedReadmeTriggerCommand}\\"`),
  "route smoke must require EIS README trigger command data",
);
assert(routeSmoke.includes(`data-failing-command=\\"${expectedFailingCommand}\\"`), "route smoke must require rendered smoke command");
assert(
  routeSmoke.includes(`data-no-merge-copy=\\"${expectedNoMergeCopy}\\"`),
  "route smoke must require EIS README rendered no-merge copy",
);
assert(
  routeSmoke.includes("Что делать, если EIS approval README trigger copy пропал в rendered routes"),
  "route smoke must require visible EIS README rendered heading",
);
assert(routeSmoke.includes('data-expected-command-count=\\"98\\"'), "route smoke must require updated Web build command count");

if (failures.length > 0) {
  console.error("FAIL EIS real-network approval live route README rendered copy");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS EIS real-network approval live route README rendered copy (${expectedRouteSmokeSummary()})`);

function expectedRouteSmokeSummary() {
  return `${expectedTriggerPath}, rendered routes`;
}

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
