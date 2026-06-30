import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedApiRoute = "/v1/ai/review-queue";
const expectedApiServicePath = "apps/api/app/services/ai_review.py";
const expectedBlockedCount = 2;
const expectedCommand = "npm run smoke:ai-review-receipt-api-rendered-route-failure-copy";
const expectedDocsHref =
  "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#ai-review-queue-contract";
const expectedNoMergeCopy =
  "Не мержить, пока rendered routes smoke снова подтверждает AI review API route, shared fixture и `/ai-review` receipt markers";
const expectedOwnerCount = 3;
const expectedParityCommand = "npm run smoke:ai-review-actions";
const expectedPlanMarker = 'data-testid="ai-review-receipt-api-rendered-route-failure-copy"';
const expectedQueueCount = 3;
const expectedRepairTargets =
  "apps/api/app/main.py,apps/api/app/services/ai_review.py,packages/shared/ai-review-queue.json,/ai-review,apps/web/scripts/smoke.mjs";
const expectedRouteCount = 16;
const expectedSourceMarker = 'data-testid="ai-review-receipt-browser-loop"';

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(webRoot, "../..");
const aiReviewPagePath = resolve(webRoot, "app/ai-review/page.tsx");
const apiMainPath = resolve(repoRoot, "apps/api/app/main.py");
const apiReadmePath = resolve(repoRoot, "apps/api/README.md");
const apiServicePath = resolve(repoRoot, expectedApiServicePath);
const demoDataPath = resolve(repoRoot, "packages/shared/demo-data/asts-demo.json");
const fixturePath = resolve(repoRoot, "packages/shared/ai-review-queue.json");
const planPagePath = resolve(webRoot, "app/plan/page.tsx");
const routeSmokePath = resolve(webRoot, "scripts/smoke.mjs");
const workflowPath = resolve(repoRoot, ".github/workflows/web-build.yml");

const aiReviewPage = readFileSync(aiReviewPagePath, "utf8");
const apiMain = readFileSync(apiMainPath, "utf8");
const apiReadme = readFileSync(apiReadmePath, "utf8");
const apiService = readFileSync(apiServicePath, "utf8");
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
assert(new Set(fixture.queue.map((item) => item.owner_role)).size === expectedOwnerCount, "AI review fixture must keep 3 owners");
assert(fixture.confidence_threshold === 0.85, "AI review threshold must stay 0.85");
assert(expectedRenderedRoutes === expectedRouteCount, `route fixture must resolve to ${expectedRouteCount} rendered route checks`);

assert(apiMain.includes(`@app.get("${expectedApiRoute}"`), "FastAPI main must expose AI review queue route");
assert(apiMain.includes("response_model=AiReviewQueueResponse"), "FastAPI route must keep AI review response model");
assert(apiMain.includes("return get_ai_review_queue()"), "FastAPI route must call AI review service");
assert(apiService.includes("SHARED_AI_REVIEW_QUEUE_PATH"), "API service must keep shared AI review fixture path constant");
assert(apiService.includes("packages/shared/ai-review-queue.json"), "API service must load shared AI review fixture");
assert(apiReadme.includes("## AI Review Queue Contract"), "API README must keep AI review contract anchor");
assert(apiReadme.includes(expectedApiRoute), "API README must mention AI review queue route");
assert(apiReadme.includes('data-testid="ai-review-receipt-api-link"'), "API README must document AI review receipt API link");
assert(apiReadme.includes('data-api-route="/v1/ai/review-queue"'), "API README must document AI review route marker");

assert(workflow.includes(`run: ${expectedParityCommand}`), "Web build must keep AI review parity smoke");
assert(workflow.includes("run: npm run smoke:ai-review-queue-rendered-route-failure-copy"), "Web build must keep AI review queue rendered smoke");
assert(workflow.includes(`run: ${expectedCommand}`), "Web build must run AI review receipt API rendered route failure copy smoke");
assert(
  workflow.indexOf("run: npm run smoke:ai-review-queue-rendered-route-failure-copy") <
    workflow.indexOf(`run: ${expectedCommand}`),
  "AI review receipt API rendered route smoke must run after AI review queue rendered route smoke",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf("run: npm run smoke:shared-readme-commands"),
  "AI review receipt API rendered route smoke must run before shared README command parity",
);

assert(aiReviewPage.includes("../../../../packages/shared/ai-review-queue.json"), "/ai-review must import shared AI review fixture");
assert(aiReviewPage.includes(expectedSourceMarker), "/ai-review must keep receipt browser loop marker");
assert(aiReviewPage.includes("data-api-route={aiReviewReceiptBrowserLoop.apiRoute}"), "/ai-review must expose AI review API route");
assert(aiReviewPage.includes("data-api-href={aiReviewReceiptBrowserLoop.apiHref}"), "/ai-review must expose AI review API docs href");
assert(aiReviewPage.includes("data-owner-count={aiReviewReceiptBrowserLoop.expectedOwners.length}"), "/ai-review must expose receipt owner count");
assert(aiReviewPage.includes("data-rule-count={aiReviewReceiptBrowserLoop.expectedRuleCount}"), "/ai-review must expose receipt rule count");
assert(routeSmoke.includes('data-testid=\\"ai-review-receipt-browser-loop\\"'), "route smoke must require AI review receipt browser loop marker");
assert(routeSmoke.includes(`data-api-route=\\"${expectedApiRoute}\\"`), "route smoke must keep AI review API route");
assert(routeSmoke.includes(`data-owner-count=\\"${expectedOwnerCount}\\"`), "route smoke must keep AI review owner count");
assert(routeSmoke.includes("data-rule-count=\\\"3\\\""), "route smoke must keep AI review rule count");

assert(planPage.includes(expectedPlanMarker), "/plan must expose AI review receipt API rendered route failure copy marker");
assert(planPage.includes("aiReviewReceiptApiRenderedRouteFailureCopy"), "/plan must expose AI review receipt API failure copy data");
assert(planPage.includes(expectedDocsHref), "/plan must expose AI review docs href");
assert(planPage.includes("href={aiReviewReceiptApiRenderedRouteFailureCopy.docsHref}"), "/plan must render AI review docs href");
assert(planPage.includes(expectedNoMergeCopy), "/plan must show AI review receipt API no-merge copy");
assert(planPage.includes(expectedParityCommand), "/plan must expose AI review parity command");
assert(planPage.includes(expectedRepairTargets), "/plan must expose AI review receipt API repair targets");
assert(planPage.includes("API owner + AI workflow owner + QA owner"), "/plan must expose AI review receipt API owner role");
assert(
  planPage.includes("data-expected-owner-count={aiReviewReceiptApiRenderedRouteFailureCopy.expectedOwnerCount}"),
  "/plan must expose expected AI review receipt owner count",
);
assert(
  planPage.includes("data-api-service-path={aiReviewReceiptApiRenderedRouteFailureCopy.apiServicePath}"),
  "/plan must expose AI review API service path",
);

if (failures.length > 0) {
  console.error("FAIL AI review receipt API rendered route failure copy");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(
  `PASS AI review receipt API rendered route failure copy (${expectedRouteCount} routes, ${expectedQueueCount} queue rows)`,
);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
