import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedApiRoute = "/v1/sources/freshness";
const expectedCommand = "npm run smoke:source-freshness-write-live-route-readme-trigger-copy";
const expectedDocsCommand = "npm run smoke:source-freshness-write-live-route-docs-copy";
const expectedDocsHref =
  "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#source-freshness-write-api-draft";
const expectedWorkflowFailureCommand = "npm run smoke:source-freshness-write-workflow-failure-copy";
const expectedNextDomainCommand = "npm run smoke:source-freshness-rendered-route-failure-copy";
const expectedNoMergeCopy =
  "Не мержить, пока freshness live-route docs copy снова закреплен в apps/api/README.md trigger path и Web build.";
const expectedPlanMarker = 'data-testid="source-freshness-write-live-route-readme-trigger-copy"';
const expectedRepairTargets =
  "apps/api/README.md,.github/workflows/web-build.yml,/plan,apps/web/scripts/source-freshness-write-live-route-docs-copy.mjs";
const expectedSourceMarker = 'data-testid="source-freshness-write-live-route-docs-copy"';
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
  packageJson.scripts?.["smoke:source-freshness-write-live-route-readme-trigger-copy"] ===
    "node scripts/source-freshness-write-live-route-readme-trigger-copy.mjs",
  "package.json must expose source freshness live route README trigger copy smoke",
);

assert(apiReadme.includes("### Source Freshness Write API Draft"), "API README must keep freshness write draft anchor");
assert(apiReadme.includes(expectedSourceMarker), "API README must mention source freshness live route docs marker");
assert(apiReadme.includes(expectedDocsCommand), "API README must mention source freshness live route docs smoke");
assert(apiReadme.includes(expectedCommand), "API README must mention source freshness live route README trigger smoke");
assert(
  apiReadme.includes("docs-only source freshness write drift cannot skip CI"),
  "API README must explain docs-only source freshness write trigger protection",
);

assert(workflow.includes(`name: ${expectedWorkflowName}`), "workflow must keep Web build name");
assert(countWorkflowPath(workflow, expectedTriggerPath) >= 2, "apps/api/README.md must trigger pull_request and push Web build");
assert(workflow.includes(`run: ${expectedDocsCommand}`), "Web build must keep source freshness live route docs copy");
assert(workflow.includes(`run: ${expectedCommand}`), "Web build must run source freshness README trigger copy");
assert(
  workflow.includes(`run: ${expectedWorkflowFailureCommand}`),
  "Web build must keep source freshness workflow failure copy",
);
assert(
  workflow.indexOf(`run: ${expectedDocsCommand}`) < workflow.indexOf(`run: ${expectedCommand}`),
  "source freshness README trigger copy smoke must run after docs copy",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf(`run: ${expectedWorkflowFailureCommand}`),
  "source freshness README trigger copy smoke must run before workflow failure copy",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf(`run: ${expectedNextDomainCommand}`),
  "source freshness README trigger copy smoke must run before freshness rendered checks",
);
assert(workflowFileSmoke.includes(expectedCommand), "workflow file smoke must count source freshness README trigger command");
assert(workflowFileSmoke.includes(expectedPlanMarker), "workflow file smoke must require source freshness README trigger marker");

assert(planPage.includes(expectedSourceMarker), "/plan must keep source freshness live route docs marker");
assert(planPage.includes(expectedPlanMarker), "/plan must expose source freshness README trigger marker");
assert(
  planPage.includes("sourceFreshnessWriteLiveRouteReadmeTriggerCopy"),
  "/plan must expose source freshness README trigger copy data",
);
assert(planPage.includes(expectedApiRoute), "/plan must expose source freshness API route");
assert(planPage.includes(expectedCommand), "/plan must expose source freshness README trigger command");
assert(planPage.includes(expectedDocsCommand), "/plan must expose source freshness docs copy command");
assert(planPage.includes(expectedDocsHref), "/plan must expose source freshness write docs href");
assert(planPage.includes('readmePath: "apps/api/README.md"'), "/plan must expose API README trigger path");
assert(planPage.includes(expectedRepairTargets), "/plan must expose source freshness README trigger repair targets");
assert(planPage.includes("Sources owner + Docs owner + CI owner"), "/plan must expose README trigger owners");
assert(planPage.includes(expectedNoMergeCopy), "/plan must show source freshness README trigger no-merge copy");

assert(
  routeSmoke.includes('data-testid=\\"source-freshness-write-live-route-readme-trigger-copy\\"'),
  "route smoke must require source freshness README trigger marker",
);
assert(routeSmoke.includes(`data-command=\\"${expectedCommand}\\"`), "route smoke must require source freshness README trigger command");
assert(routeSmoke.includes(`data-docs-command=\\"${expectedDocsCommand}\\"`), "route smoke must require docs copy command");
assert(routeSmoke.includes(`data-docs-href=\\"${expectedDocsHref}\\"`), "route smoke must require source freshness docs href");
assert(routeSmoke.includes(`data-trigger-path=\\"${expectedTriggerPath}\\"`), "route smoke must require trigger path");
assert(routeSmoke.includes('data-expected-workflow-path-count=\\"2\\"'), "route smoke must require workflow path count");
assert(
  routeSmoke.includes(`data-no-merge-copy=\\"${expectedNoMergeCopy}\\"`),
  "route smoke must require source freshness README trigger no-merge copy",
);
assert(routeSmoke.includes("Что делать, если freshness README trigger copy упал"), "route smoke must require visible README trigger heading");
assert(routeSmoke.includes('data-expected-command-count=\\"97\\"'), "route smoke must require updated Web build command count");

if (failures.length > 0) {
  console.error("FAIL source freshness write live route README trigger copy");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS source freshness write live route README trigger copy (${expectedTriggerPath})`);

function countWorkflowPath(content, path) {
  return content.split(`- "${path}"`).length - 1;
}

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
