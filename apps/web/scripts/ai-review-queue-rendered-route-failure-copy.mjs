import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedApiRoute = "/v1/ai/review-queue";
const expectedBlockedCount = 2;
const expectedCommand = "npm run smoke:ai-review-queue-rendered-route-failure-copy";
const expectedNoMergeCopy =
  "Не мержить, пока rendered routes smoke снова подтверждает AI review queue, owners и evidence на живом `/ai-review`";
const expectedParityCommand = "npm run smoke:ai-review-actions";
const expectedPlanMarker = 'data-testid="ai-review-queue-rendered-route-failure-copy"';
const expectedQueueCount = 3;
const expectedRepairTargets =
  "/ai-review,packages/shared/ai-review-queue.json,apps/web/scripts/ai-review-action-parity.mjs,apps/web/scripts/smoke.mjs";
const expectedRouteCount = 16;
const expectedSourceMarker = 'data-testid="ai-review-confidence-queue"';
const expectedWorkflowName = "Web build";
const expectedWorkflowPath = ".github/workflows/web-build.yml";

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(webRoot, "../..");
const aiReviewPagePath = resolve(webRoot, "app/ai-review/page.tsx");
const demoDataPath = resolve(repoRoot, "packages/shared/demo-data/asts-demo.json");
const fixturePath = resolve(repoRoot, "packages/shared/ai-review-queue.json");
const planPagePath = resolve(webRoot, "app/plan/page.tsx");
const routeSmokePath = resolve(webRoot, "scripts/smoke.mjs");
const workflowPath = resolve(repoRoot, expectedWorkflowPath);

const aiReviewPage = readFileSync(aiReviewPagePath, "utf8");
const demoData = JSON.parse(readFileSync(demoDataPath, "utf8"));
const fixture = JSON.parse(readFileSync(fixturePath, "utf8"));
const planPage = readFileSync(planPagePath, "utf8");
const routeSmoke = readFileSync(routeSmokePath, "utf8");
const workflow = readFileSync(workflowPath, "utf8");
const preWinTenders = demoData.tenders.filter((tender) => tender.funnel === "pre_win");
const expectedRenderedRoutes = 9 + 3 + preWinTenders.length;
const failures = [];

assert(Array.isArray(fixture.queue), "AI review fixture must expose queue");
assert(fixture.queue.length === expectedQueueCount, "AI review fixture must keep 3 queue rows");
assert(
  fixture.queue.filter((item) => item.confidence < fixture.blocked_below_confidence).length === expectedBlockedCount,
  "AI review fixture must keep 2 blocked rows",
);
assert(fixture.confidence_threshold === 0.85, "AI review threshold must stay 0.85");
assert(expectedRenderedRoutes === expectedRouteCount, `route fixture must resolve to ${expectedRouteCount} rendered route checks`);

assert(workflow.includes(`name: ${expectedWorkflowName}`), "workflow must keep Web build name");
assert(workflow.includes(`run: ${expectedParityCommand}`), "Web build must keep AI review action parity smoke");
assert(workflow.includes(`run: ${expectedCommand}`), "Web build must run AI review queue rendered route failure copy smoke");
assert(
  workflow.indexOf(`run: ${expectedParityCommand}`) < workflow.indexOf(`run: ${expectedCommand}`),
  "AI review queue rendered route smoke must run after AI review action parity",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf("run: npm run smoke:shared-readme-commands"),
  "AI review queue rendered route smoke must run before shared README command parity",
);

assert(aiReviewPage.includes("../../../../packages/shared/ai-review-queue.json"), "/ai-review must import shared AI review fixture");
assert(aiReviewPage.includes(expectedSourceMarker), "/ai-review must keep AI review confidence queue marker");
assert(aiReviewPage.includes("data-required-action={item.action}"), "/ai-review must keep owner action data attributes");
assert(routeSmoke.includes('data-testid=\\"ai-review-confidence-queue\\"'), "route smoke must require AI review queue marker");
assert(routeSmoke.includes(`data-total-count=\\"${expectedQueueCount}\\"`), "route smoke must keep AI review queue count");
assert(routeSmoke.includes(`data-blocked-count=\\"${expectedBlockedCount}\\"`), "route smoke must keep AI review blocked count");
assert(routeSmoke.includes("data-source-evidence-count=\\\"3\\\""), "route smoke must keep source evidence count");
assert(routeSmoke.includes("data-required-action=\\\"finance owner must approve or keep outcome locked\\\""), "route smoke must keep finance owner action");

assert(planPage.includes(expectedPlanMarker), "/plan must expose AI review queue rendered route failure copy marker");
assert(planPage.includes("aiReviewQueueRenderedRouteFailureCopy"), "/plan must expose AI review queue rendered route data");
assert(planPage.includes(expectedApiRoute), "/plan must expose AI review queue API route");
assert(planPage.includes(expectedNoMergeCopy), "/plan must show AI review queue no-merge copy");
assert(planPage.includes(expectedParityCommand), "/plan must expose AI review action parity command");
assert(planPage.includes(expectedRepairTargets), "/plan must expose AI review queue repair targets");
assert(planPage.includes("AI workflow owner + QA owner"), "/plan must expose AI review queue owner role");
assert(
  planPage.includes("data-expected-queue-count={aiReviewQueueRenderedRouteFailureCopy.expectedQueueCount}"),
  "/plan must expose expected AI review queue count",
);
assert(
  planPage.includes("data-expected-blocked-count={aiReviewQueueRenderedRouteFailureCopy.expectedBlockedCount}"),
  "/plan must expose expected AI review blocked count",
);
assert(
  planPage.includes("data-expected-route-count={aiReviewQueueRenderedRouteFailureCopy.expectedRouteCount}"),
  "/plan must expose expected route count",
);

if (failures.length > 0) {
  console.error("FAIL AI review queue rendered route failure copy");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS AI review queue rendered route failure copy (${expectedRouteCount} routes, ${expectedQueueCount} queue rows)`);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
