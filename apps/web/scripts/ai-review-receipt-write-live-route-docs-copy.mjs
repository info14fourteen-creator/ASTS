import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedApiRoute = "/v1/ai/review-queue";
const expectedCommand = "npm run smoke:ai-review-receipt-write-live-route-docs-copy";
const expectedDocsHref =
  "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#ai-review-receipt-write-api-draft";
const expectedLiveWorkflowCommand = "npm run smoke:ai-review-receipt-write-live-route-workflow-copy";
const expectedWorkflowFailureCommand = "npm run smoke:ai-review-receipt-write-workflow-failure-copy";
const expectedNextDomainCommand = "npm run smoke:shared-readme-commands";
const expectedNoMergeCopy =
  "Не мержить, пока AI live-route workflow copy снова закреплен в API README audit note, `/plan` docs href и Web build.";
const expectedPlanMarker = 'data-testid="ai-review-receipt-write-live-route-docs-copy"';
const expectedRepairTargets =
  "apps/api/README.md#ai-review-receipt-write-api-draft,/plan,apps/web/scripts/ai-review-receipt-write-live-route-workflow-copy.mjs,.github/workflows/web-build.yml";
const expectedSourceMarker = 'data-testid="ai-review-receipt-write-live-route-workflow-copy"';
const expectedAuditNote =
  "README anchor, /plan docs href and immutable AI audit append warning must drift before shared README checks.";
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
  packageJson.scripts?.["smoke:ai-review-receipt-write-live-route-docs-copy"] ===
    "node scripts/ai-review-receipt-write-live-route-docs-copy.mjs",
  "package.json must expose AI review live route docs copy smoke",
);

assert(apiReadme.includes("### AI Review Receipt Write API Draft"), "API README must keep AI write draft anchor");
assert(apiReadme.includes(expectedPlanMarker), "API README must mention AI live route docs marker");
assert(apiReadme.includes(expectedCommand), "API README must mention AI live route docs smoke");
assert(apiReadme.includes("immutable AI audit append warning"), "API README must keep immutable AI audit append warning copy");

assert(workflow.includes(`name: ${expectedWorkflowName}`), "workflow must keep Web build name");
assert(workflow.includes(`run: ${expectedLiveWorkflowCommand}`), "Web build must keep AI live route workflow copy");
assert(workflow.includes(`run: ${expectedCommand}`), "Web build must run AI live route docs copy");
assert(workflow.includes(`run: ${expectedWorkflowFailureCommand}`), "Web build must keep AI workflow failure copy");
assert(
  workflow.indexOf(`run: ${expectedLiveWorkflowCommand}`) < workflow.indexOf(`run: ${expectedCommand}`),
  "AI live route docs copy smoke must run after live route workflow copy",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf(`run: ${expectedWorkflowFailureCommand}`),
  "AI live route docs copy smoke must run before workflow failure copy",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf(`run: ${expectedNextDomainCommand}`),
  "AI live route docs copy smoke must run before shared README checks",
);
assert(workflowFileSmoke.includes(expectedCommand), "workflow file smoke must count AI live route docs copy command");
assert(workflowFileSmoke.includes(expectedPlanMarker), "workflow file smoke must require AI live route docs marker");

assert(planPage.includes(expectedSourceMarker), "/plan must keep AI live route workflow marker");
assert(planPage.includes(expectedPlanMarker), "/plan must expose AI live route docs copy marker");
assert(planPage.includes("aiReviewReceiptWriteLiveRouteDocsCopy"), "/plan must expose AI live route docs copy data");
assert(planPage.includes(expectedApiRoute), "/plan must expose AI review API route");
assert(planPage.includes(expectedCommand), "/plan must expose AI live route docs copy command");
assert(planPage.includes(expectedDocsHref), "/plan must expose AI write docs href");
assert(planPage.includes(expectedLiveWorkflowCommand), "/plan must expose AI live workflow command");
assert(planPage.includes(expectedRepairTargets), "/plan must expose AI live route docs repair targets");
assert(planPage.includes("AI workflow owner + Docs owner + CI owner"), "/plan must expose AI docs copy owners");
assert(planPage.includes(expectedAuditNote), "/plan must expose AI live route docs audit note");
assert(planPage.includes(expectedNoMergeCopy), "/plan must show AI live route docs no-merge copy");

assert(
  routeSmoke.includes('data-testid=\\"ai-review-receipt-write-live-route-docs-copy\\"'),
  "route smoke must require AI live route docs marker",
);
assert(routeSmoke.includes(`data-command=\\"${expectedCommand}\\"`), "route smoke must require AI live route docs command");
assert(routeSmoke.includes(`data-docs-href=\\"${expectedDocsHref}\\"`), "route smoke must require AI live route docs href");
assert(
  routeSmoke.includes(`data-live-workflow-command=\\"${expectedLiveWorkflowCommand}\\"`),
  "route smoke must require AI live workflow command",
);
assert(routeSmoke.includes(`data-audit-note=\\"${expectedAuditNote}\\"`), "route smoke must require AI audit note");
assert(
  routeSmoke.includes(`data-no-merge-copy=\\"${expectedNoMergeCopy}\\"`),
  "route smoke must require AI live route docs no-merge copy",
);
assert(routeSmoke.includes("Что делать, если AI live-route docs copy упал"), "route smoke must require visible AI docs copy heading");
assert(routeSmoke.includes('data-expected-command-count=\\"92\\"'), "route smoke must require updated Web build command count");

if (failures.length > 0) {
  console.error("FAIL AI review receipt write live route docs copy");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS AI review receipt write live route docs copy (${expectedLiveWorkflowCommand})`);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
