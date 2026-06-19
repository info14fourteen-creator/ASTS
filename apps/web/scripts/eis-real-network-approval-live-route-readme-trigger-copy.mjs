import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedApiRoute = "/v1/sources/connectors";
const expectedCommand = "npm run smoke:eis-real-network-approval-live-route-readme-trigger-copy";
const expectedDocsCommand = "npm run smoke:eis-real-network-approval-live-route-docs-copy";
const expectedDocsHref =
  "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#eis-real-network-approval-api-copy";
const expectedWorkflowFailureCommand = "npm run smoke:eis-real-network-approval-workflow-failure-copy";
const expectedNextDomainCommand = "npm run smoke:ai-review-actions";
const expectedNoMergeCopy =
  "Не мержить, пока EIS live-route docs copy снова закреплен в apps/api/README.md trigger path и Web build.";
const expectedPlanMarker = 'data-testid="eis-real-network-approval-live-route-readme-trigger-copy"';
const expectedRepairTargets =
  "apps/api/README.md,.github/workflows/web-build.yml,/plan,apps/web/scripts/eis-real-network-approval-live-route-docs-copy.mjs";
const expectedSourceMarker = 'data-testid="eis-real-network-approval-live-route-docs-copy"';
const expectedTriggerPath = "apps/api/README.md";
const expectedWorkflowName = "Web build";
const expectedWorkflowPath = ".github/workflows/web-build.yml";

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(webRoot, "../..");
const apiReadmePath = resolve(repoRoot, "apps/api/README.md");
const packagePath = resolve(webRoot, "package.json");
const planPagePath = resolve(webRoot, "app/plan/page.tsx");
const routeSmokePath = resolve(webRoot, "scripts/smoke.mjs");
const workflowPath = resolve(repoRoot, expectedWorkflowPath);
const workflowFileSmokePath = resolve(webRoot, "scripts/web-build-workflow-file.mjs");

const apiReadme = readFileSync(apiReadmePath, "utf8");
const packageJson = JSON.parse(readFileSync(packagePath, "utf8"));
const planPage = readFileSync(planPagePath, "utf8");
const routeSmoke = readFileSync(routeSmokePath, "utf8");
const workflow = readFileSync(workflowPath, "utf8");
const workflowFileSmoke = readFileSync(workflowFileSmokePath, "utf8");
const failures = [];

assert(
  packageJson.scripts?.["smoke:eis-real-network-approval-live-route-readme-trigger-copy"] ===
    "node scripts/eis-real-network-approval-live-route-readme-trigger-copy.mjs",
  "package.json must expose EIS live route README trigger copy smoke",
);

assert(apiReadme.includes("### EIS Real-Network Approval API Copy"), "API README must keep EIS approval heading anchor");
assert(apiReadme.includes(expectedSourceMarker), "API README must mention EIS live route docs marker");
assert(apiReadme.includes(expectedDocsCommand), "API README must mention EIS live route docs smoke");
assert(apiReadme.includes(expectedCommand), "API README must mention EIS live route README trigger smoke");
assert(
  apiReadme.includes("docs-only EIS real-network approval drift cannot skip CI"),
  "API README must explain docs-only EIS approval trigger protection",
);

assert(workflow.includes(`name: ${expectedWorkflowName}`), "workflow must keep Web build name");
assert(countWorkflowPath(workflow, expectedTriggerPath) >= 2, "apps/api/README.md must trigger pull_request and push Web build");
assert(workflow.includes(`run: ${expectedDocsCommand}`), "Web build must keep EIS live route docs copy");
assert(workflow.includes(`run: ${expectedCommand}`), "Web build must run EIS README trigger copy");
assert(workflow.includes(`run: ${expectedWorkflowFailureCommand}`), "Web build must keep EIS workflow failure copy");
assert(
  workflow.indexOf(`run: ${expectedDocsCommand}`) < workflow.indexOf(`run: ${expectedCommand}`),
  "EIS README trigger copy smoke must run after docs copy",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf(`run: ${expectedWorkflowFailureCommand}`),
  "EIS README trigger copy smoke must run before workflow failure copy",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf(`run: ${expectedNextDomainCommand}`),
  "EIS README trigger copy smoke must run before AI review checks",
);
assert(workflowFileSmoke.includes(expectedCommand), "workflow file smoke must count EIS README trigger command");
assert(workflowFileSmoke.includes(expectedPlanMarker), "workflow file smoke must require EIS README trigger marker");

assert(planPage.includes(expectedSourceMarker), "/plan must keep EIS live route docs marker");
assert(planPage.includes(expectedPlanMarker), "/plan must expose EIS README trigger marker");
assert(
  planPage.includes("eisRealNetworkApprovalLiveRouteReadmeTriggerCopy"),
  "/plan must expose EIS README trigger copy data",
);
assert(planPage.includes(expectedApiRoute), "/plan must expose EIS connectors API route");
assert(planPage.includes(expectedCommand), "/plan must expose EIS README trigger command");
assert(planPage.includes(expectedDocsCommand), "/plan must expose EIS docs copy command");
assert(planPage.includes(expectedDocsHref), "/plan must expose EIS approval docs href");
assert(planPage.includes('readmePath: "apps/api/README.md"'), "/plan must expose API README trigger path");
assert(planPage.includes(expectedRepairTargets), "/plan must expose EIS README trigger repair targets");
assert(planPage.includes("Data owner + Docs owner + CI owner"), "/plan must expose EIS README trigger owners");
assert(planPage.includes(expectedNoMergeCopy), "/plan must show EIS README trigger no-merge copy");

assert(
  routeSmoke.includes('data-testid=\\"eis-real-network-approval-live-route-readme-trigger-copy\\"'),
  "route smoke must require EIS README trigger marker",
);
assert(routeSmoke.includes(`data-command=\\"${expectedCommand}\\"`), "route smoke must require EIS README trigger command");
assert(routeSmoke.includes(`data-docs-command=\\"${expectedDocsCommand}\\"`), "route smoke must require EIS docs copy command");
assert(routeSmoke.includes(`data-docs-href=\\"${expectedDocsHref}\\"`), "route smoke must require EIS docs href");
assert(routeSmoke.includes(`data-trigger-path=\\"${expectedTriggerPath}\\"`), "route smoke must require trigger path");
assert(routeSmoke.includes('data-expected-workflow-path-count=\\"2\\"'), "route smoke must require workflow path count");
assert(
  routeSmoke.includes(`data-no-merge-copy=\\"${expectedNoMergeCopy}\\"`),
  "route smoke must require EIS README trigger no-merge copy",
);
assert(routeSmoke.includes("Что делать, если EIS approval README trigger copy упал"), "route smoke must require visible README trigger heading");
assert(routeSmoke.includes('data-expected-command-count=\\"90\\"'), "route smoke must require updated Web build command count");

if (failures.length > 0) {
  console.error("FAIL EIS real-network approval live route README trigger copy");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS EIS real-network approval live route README trigger copy (${expectedTriggerPath})`);

function countWorkflowPath(content, path) {
  return content.split(`- "${path}"`).length - 1;
}

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
