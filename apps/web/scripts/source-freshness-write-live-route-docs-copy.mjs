import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedApiRoute = "/v1/sources/freshness";
const expectedCommand = "npm run smoke:source-freshness-write-live-route-docs-copy";
const expectedDocsHref =
  "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#source-freshness-write-api-draft";
const expectedLiveWorkflowCommand = "npm run smoke:source-freshness-write-live-route-workflow-copy";
const expectedWorkflowFailureCommand = "npm run smoke:source-freshness-write-workflow-failure-copy";
const expectedNextDomainCommand = "npm run smoke:source-freshness-rendered-route-failure-copy";
const expectedNoMergeCopy =
  "Не мержить, пока freshness live-route workflow copy снова закреплен в API README audit note, `/plan` docs href и Web build.";
const expectedPlanMarker = 'data-testid="source-freshness-write-live-route-docs-copy"';
const expectedRepairTargets =
  "apps/api/README.md#source-freshness-write-api-draft,/plan,apps/web/scripts/source-freshness-write-live-route-workflow-copy.mjs,.github/workflows/web-build.yml";
const expectedSourceMarker = 'data-testid="source-freshness-write-live-route-workflow-copy"';
const expectedAuditNote =
  "README anchor, /plan docs href and immutable freshness audit append warning must drift before source freshness rendered checks.";
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
  packageJson.scripts?.["smoke:source-freshness-write-live-route-docs-copy"] ===
    "node scripts/source-freshness-write-live-route-docs-copy.mjs",
  "package.json must expose source freshness live route docs copy smoke",
);

assert(apiReadme.includes("### Source Freshness Write API Draft"), "API README must keep freshness write draft anchor");
assert(apiReadme.includes(expectedPlanMarker), "API README must mention source freshness live route docs marker");
assert(apiReadme.includes(expectedCommand), "API README must mention source freshness live route docs smoke");
assert(
  apiReadme.includes("immutable freshness audit append warning"),
  "API README must keep immutable freshness audit append warning copy",
);

assert(workflow.includes(`name: ${expectedWorkflowName}`), "workflow must keep Web build name");
assert(workflow.includes(`run: ${expectedLiveWorkflowCommand}`), "Web build must keep freshness live route workflow copy");
assert(workflow.includes(`run: ${expectedCommand}`), "Web build must run freshness live route docs copy");
assert(
  workflow.includes(`run: ${expectedWorkflowFailureCommand}`),
  "Web build must keep freshness workflow failure copy",
);
assert(
  workflow.indexOf(`run: ${expectedLiveWorkflowCommand}`) < workflow.indexOf(`run: ${expectedCommand}`),
  "freshness live route docs copy smoke must run after live route workflow copy",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf(`run: ${expectedWorkflowFailureCommand}`),
  "freshness live route docs copy smoke must run before workflow failure copy",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf(`run: ${expectedNextDomainCommand}`),
  "freshness live route docs copy smoke must run before source freshness rendered checks",
);
assert(workflowFileSmoke.includes(expectedCommand), "workflow file smoke must count freshness live route docs copy command");
assert(workflowFileSmoke.includes(expectedPlanMarker), "workflow file smoke must require freshness live route docs marker");

assert(planPage.includes(expectedSourceMarker), "/plan must keep source freshness live route workflow marker");
assert(planPage.includes(expectedPlanMarker), "/plan must expose source freshness live route docs copy marker");
assert(
  planPage.includes("sourceFreshnessWriteLiveRouteDocsCopy"),
  "/plan must expose source freshness live route docs copy data",
);
assert(planPage.includes(expectedApiRoute), "/plan must expose source freshness API route");
assert(planPage.includes(expectedCommand), "/plan must expose source freshness live route docs copy command");
assert(planPage.includes(expectedDocsHref), "/plan must expose source freshness write docs href");
assert(planPage.includes(expectedLiveWorkflowCommand), "/plan must expose live workflow command");
assert(planPage.includes(expectedRepairTargets), "/plan must expose source freshness live route docs repair targets");
assert(planPage.includes("Sources owner + Docs owner + CI owner"), "/plan must expose freshness docs copy owners");
assert(planPage.includes(expectedAuditNote), "/plan must expose freshness live route docs audit note");
assert(planPage.includes(expectedNoMergeCopy), "/plan must show freshness live route docs no-merge copy");

assert(
  routeSmoke.includes('data-testid=\\"source-freshness-write-live-route-docs-copy\\"'),
  "route smoke must require source freshness live route docs marker",
);
assert(routeSmoke.includes(`data-command=\\"${expectedCommand}\\"`), "route smoke must require freshness live route docs command");
assert(routeSmoke.includes(`data-docs-href=\\"${expectedDocsHref}\\"`), "route smoke must require freshness live route docs href");
assert(
  routeSmoke.includes(`data-live-workflow-command=\\"${expectedLiveWorkflowCommand}\\"`),
  "route smoke must require freshness live workflow command",
);
assert(routeSmoke.includes(`data-audit-note=\\"${expectedAuditNote}\\"`), "route smoke must require freshness audit note");
assert(
  routeSmoke.includes(`data-no-merge-copy=\\"${expectedNoMergeCopy}\\"`),
  "route smoke must require freshness live route docs no-merge copy",
);
assert(routeSmoke.includes("Что делать, если freshness live-route docs copy упал"), "route smoke must require visible freshness docs copy heading");
assert(routeSmoke.includes('data-expected-command-count=\\"94\\"'), "route smoke must require updated Web build command count");

if (failures.length > 0) {
  console.error("FAIL source freshness write live route docs copy");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS source freshness write live route docs copy (${expectedLiveWorkflowCommand})`);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
