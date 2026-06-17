import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const expectedFailingCommand = "npm run smoke -- --url http://127.0.0.1:4177/";
const expectedNoMergeCopy =
  "Не мержить, пока rendered routes smoke снова подтверждает schema docs link и shared README parity на живом `/plan`";
const expectedPlanMarker = 'data-testid="schema-docs-rendered-route-failure-copy"';
const expectedReadmePath = "packages/shared/README.md";
const expectedRepairTargets =
  "/plan,packages/shared/README.md#shared-schema-index,apps/web/scripts/smoke.mjs,[data-testid='schema-docs-link']";
const expectedRouteCount = 16;
const expectedSelfCommand = "npm run smoke:schema-docs-rendered-route-failure-copy";
const expectedSourceMarker = 'data-testid="schema-docs-readme-failure-copy"';
const expectedWorkflowPath = ".github/workflows/web-build.yml";
const expectedWorkflowName = "Web build";

const webRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = resolve(webRoot, "../..");
const planPagePath = resolve(webRoot, "app/plan/page.tsx");
const routeSmokePath = resolve(webRoot, "scripts/smoke.mjs");
const demoDataPath = resolve(repoRoot, "packages/shared/demo-data/asts-demo.json");
const workflowPath = resolve(repoRoot, expectedWorkflowPath);

const demoData = JSON.parse(readFileSync(demoDataPath, "utf8"));
const planPage = readFileSync(planPagePath, "utf8");
const routeSmoke = readFileSync(routeSmokePath, "utf8");
const workflow = readFileSync(workflowPath, "utf8");
const preWinTenders = demoData.tenders.filter((tender) => tender.funnel === "pre_win");
const expectedRenderedRoutes = 9 + 3 + preWinTenders.length;
const failures = [];

assert(workflow.includes(`name: ${expectedWorkflowName}`), "workflow must keep Web build name");
assert(workflow.includes(`run: ${expectedSelfCommand}`), "Web build must run schema docs rendered route failure copy smoke");
assert(workflow.includes(expectedFailingCommand), "Web build must keep rendered route smoke command");
assert(
  workflow.indexOf("run: npm run smoke:schema-docs-readme-failure-copy") < workflow.indexOf(`run: ${expectedSelfCommand}`),
  "schema docs rendered route failure copy smoke must run after schema docs README failure copy smoke",
);
assert(
  workflow.indexOf(`run: ${expectedSelfCommand}`) < workflow.indexOf(expectedFailingCommand),
  "schema docs rendered route failure copy smoke must run before rendered route smoke starts the server",
);

assert(planPage.includes(expectedSourceMarker), "/plan must keep schema docs README failure copy marker");
assert(planPage.includes(expectedPlanMarker), "/plan must expose schema docs rendered route failure copy marker");
assert(planPage.includes("schemaDocsRenderedRouteFailureCopy"), "/plan must expose schema docs rendered route failure copy data");
assert(planPage.includes(expectedFailingCommand), "/plan must expose failing rendered route smoke command");
assert(planPage.includes(expectedReadmePath), "/plan must expose shared README path");
assert(planPage.includes(expectedRepairTargets), "/plan must expose schema docs rendered route repair targets");
assert(planPage.includes("Schema owner + QA owner"), "/plan must expose schema docs rendered route owner role");
assert(
  planPage.includes("data-expected-route-count={schemaDocsRenderedRouteFailureCopy.expectedRouteCount}"),
  "/plan must expose expected route count",
);
assert(planPage.includes(expectedNoMergeCopy), "/plan must show owner-friendly no-merge copy");
assert(planPage.includes(`workflowPath: "${expectedWorkflowPath}"`), "/plan must expose Web build workflow path");
assert(expectedRenderedRoutes === expectedRouteCount, `route fixture must resolve to ${expectedRouteCount} rendered route checks`);
assert(routeSmoke.includes("schema-docs-rendered-route-failure-copy"), "route smoke must require rendered copy marker");
assert(routeSmoke.includes("Что делать, если schema docs пропали в rendered routes"), "route smoke must require rendered copy title");

if (failures.length > 0) {
  console.error("FAIL schema docs rendered route failure copy");
  for (const failure of failures) {
    console.error(`  ${failure}`);
  }
  process.exit(1);
}

console.log(`PASS schema docs rendered route failure copy (${expectedRouteCount} routes)`);

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}
