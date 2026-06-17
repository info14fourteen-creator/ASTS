import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedApiRoute = "/v1/ai/review-queue";
const expectedCommand = "npm run smoke:ai-review-receipt-write-smoke-failure-copy";
const expectedDocsHref =
  "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#ai-review-receipt-write-api-draft";
const expectedFailingCommand = "npm run smoke:ai-review-receipt-write-api-draft";
const expectedNoMergeCopy =
  "Не мержить, пока AI review receipt write smoke снова подтверждает draft POST contract, owner decision, idempotency key, source evidence и immutable AI audit append.";
const expectedPlanMarker = 'data-testid="ai-review-receipt-write-smoke-failure-copy"';
const expectedQueueCount = 3;
const expectedRequestFieldCount = 11;
const expectedRouteCount = 16;
const expectedSourceMarker = 'data-testid="ai-review-receipt-write-api-draft"';
const expectedWorkflowName = "Web build";
const expectedWorkflowPath = ".github/workflows/web-build.yml";

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(webRoot, "../..");
const aiReviewPagePath = resolve(webRoot, "app/ai-review/page.tsx");
const apiReadmePath = resolve(repoRoot, "apps/api/README.md");
const demoDataPath = resolve(repoRoot, "packages/shared/demo-data/asts-demo.json");
const fixturePath = resolve(repoRoot, "packages/shared/ai-review-queue.json");
const planPagePath = resolve(webRoot, "app/plan/page.tsx");
const routeSmokePath = resolve(webRoot, "scripts/smoke.mjs");
const workflowPath = resolve(repoRoot, expectedWorkflowPath);

const aiReviewPage = readFileSync(aiReviewPagePath, "utf8");
const apiReadme = readFileSync(apiReadmePath, "utf8");
const demoData = JSON.parse(readFileSync(demoDataPath, "utf8"));
const fixture = JSON.parse(readFileSync(fixturePath, "utf8"));
const planPage = readFileSync(planPagePath, "utf8");
const routeSmoke = readFileSync(routeSmokePath, "utf8");
const workflow = readFileSync(workflowPath, "utf8");
const preWinTenders = demoData.tenders.filter((tender) => tender.funnel === "pre_win");
const expectedRenderedRoutes = 9 + 3 + preWinTenders.length;
const writeContract = fixture.write_contract ?? {};
const failures = [];

assert(expectedRenderedRoutes === expectedRouteCount, `route fixture must resolve to ${expectedRouteCount} rendered route checks`);
assert(fixture.queue?.length === expectedQueueCount, "AI review queue fixture must keep 3 rows");
assert(writeContract.route === expectedApiRoute, "AI review write contract route changed");
assert(writeContract.method === "POST", "AI review write contract method must stay POST");
assert(writeContract.status === "draft", "AI review write contract must stay draft");
assert(writeContract.owner === "AI workflow owner", "AI review write contract owner changed");
assert(writeContract.idempotency_key_required === true, "AI review write contract must require idempotency key");
assert(writeContract.request_schema?.length === expectedRequestFieldCount, "AI review write contract must keep 11 request fields");
assert(writeContract.request_schema?.includes("decision"), "AI review write contract must include decision");
assert(writeContract.request_schema?.includes("source_checksum_sha256"), "AI review write contract must include source checksum");
assert(writeContract.no_merge_copy?.includes("immutable audit append"), "AI review write contract must keep no-merge audit copy");

assert(apiReadme.includes("### AI Review Receipt Write API Draft"), "API README must document AI review write draft");
assert(apiReadme.includes("idempotency_key"), "API README must mention idempotency key");
assert(apiReadme.includes("immutable AI audit storage"), "API README must mention immutable AI audit storage");

assert(aiReviewPage.includes(expectedSourceMarker), "/ai-review must expose write draft marker");
assert(
  aiReviewPage.includes("data-request-schema={aiReviewReceiptWriteContract.request_schema.join(\",\")}"),
  "/ai-review must expose request schema",
);
assert(aiReviewPage.includes("data-no-merge-copy={aiReviewReceiptWriteContract.no_merge_copy}"), "/ai-review must expose no-merge copy");

assert(planPage.includes(expectedPlanMarker), "/plan must expose AI review receipt write smoke failure copy marker");
assert(planPage.includes(expectedCommand), "/plan must expose AI write failure copy command");
assert(planPage.includes(expectedDocsHref), "/plan must expose AI write docs href");
assert(planPage.includes(expectedFailingCommand), "/plan must expose failing AI write smoke command");
assert(planPage.includes(expectedNoMergeCopy), "/plan must expose AI write failure no-merge copy");
assert(planPage.includes("AI workflow owner + API owner + QA owner"), "/plan must expose AI write failure owners");
assert(planPage.includes("data-failing-command={aiReviewReceiptWriteSmokeFailureCopy.failingCommand}"), "/plan must expose failing command data attr");
assert(planPage.includes("data-parity-command={aiReviewReceiptWriteSmokeFailureCopy.parityCommand}"), "/plan must expose parity command data attr");

assert(routeSmoke.includes('data-testid=\\"ai-review-receipt-write-smoke-failure-copy\\"'), "route smoke must require AI write failure copy marker");
assert(routeSmoke.includes(`data-command=\\"${expectedCommand}\\"`), "route smoke must require AI write failure command");
assert(routeSmoke.includes(`data-failing-command=\\"${expectedFailingCommand}\\"`), "route smoke must require failing AI write command");
assert(routeSmoke.includes(`data-no-merge-copy=\\"${expectedNoMergeCopy}\\"`), "route smoke must require AI write failure no-merge copy");
assert(routeSmoke.includes("Что делать, если AI write draft smoke упал"), "route smoke must require visible failure heading");

assert(workflow.includes(`name: ${expectedWorkflowName}`), "workflow must keep Web build name");
assert(workflow.includes(`run: ${expectedCommand}`), "Web build must run AI write failure copy smoke");
assert(
  workflow.indexOf(`run: ${expectedFailingCommand}`) < workflow.indexOf(`run: ${expectedCommand}`),
  "AI write failure copy smoke must run after AI write draft smoke",
);
assert(
  workflow.indexOf(`run: ${expectedCommand}`) < workflow.indexOf("run: npm run smoke:shared-readme-commands"),
  "AI write failure copy smoke must run before shared README command parity",
);

if (failures.length > 0) {
  console.error("FAIL AI review receipt write smoke failure copy");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(
  `PASS AI review receipt write smoke failure copy (${expectedRouteCount} routes, ${expectedRequestFieldCount} fields)`,
);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
