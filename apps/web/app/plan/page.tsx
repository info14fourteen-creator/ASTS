import { Sidebar } from "../app-shell";
import {
  fixtureCoverage,
  fixtureDriftChecks,
  fixtureDriftQuarantineCopy,
  fixtureDriftSummary,
} from "../../lib/mock-data";

const currentState = [
  ["PR", "#17 codex/app-site-shell", "CLEAN, checks green"],
  ["Web build", "19 static routes", "GitHub Actions проходят"],
  ["Shared validation", "schemas + fixture", "demo-data aligned"],
  ["API smoke", "FastAPI contracts", "CI ставит pinned deps; local SKIP допустим"],
  ["Automation", "asts-app-site-ru-12", "heartbeat каждые 12 минут"],
  ["Safety", "no push to main", "все изменения через PR"],
];

const planBlocks = [
  ["A", "Безопасная совместная работа", "PR, ветки, review, merge gates", "1-10"],
  ["B", "Mind map parity", "две воронки, причины отказа, AI handoff", "11-20"],
  ["C", "Web app", "маршруты, responsive, smoke, PWA", "21-45"],
  ["D", "Backend/API", "FastAPI, схемы, endpoints, service layer", "46-55"],
  ["E", "Первоисточники", "ЕИС, ФНС, ЭТП, raw/normalized storage", "56-65"],
  ["F", "AI routine removal", "facts, confidence, review queue, RAG", "66-75"],
  ["G", "Telegram, mobile, CRM", "Mini App, Expo, sync audit", "76-80"],
];

const nextIncrements = [
  ["1", "Добавить AI review receipt write docs failure copy", "показать owner-friendly текст при падении AI review write docs anchor"],
  ["2", "Добавить source freshness write docs failure copy", "показать owner-friendly текст при падении freshness write docs anchor"],
  ["3", "Добавить EIS real-network approval docs failure copy", "показать owner-friendly текст при падении EIS approval docs anchor"],
  ["4", "Добавить source owner receipt write rendered-route failure copy", "показать owner-friendly текст при падении rendered route coverage для write контракта"],
];

const cycleRules = [
  ["Check", "проверить ветку, PR, dirty tree"],
  ["Build", "запустить релевантную проверку"],
  ["Push", "только в PR ветку, не в main"],
  ["Report", "кратко: что сделано, что проверено, что дальше"],
];

const partnerQuickstart = [
  ["Clone", "git clone git@github.com:info14fourteen-creator/ASTS.git"],
  ["Branch", "git checkout -b codex/<short-task-name>"],
  ["Install", "cd apps/web && npm ci"],
  ["Build", "npm run build && npm run smoke -- --url http://127.0.0.1:4177/"],
];

const apiDependencyNotes = [
  ["Local", "`python3 scripts/smoke_connectors.py` может вернуть SKIP, если FastAPI не установлен"],
  ["CI", "`API smoke` ставит `apps/api/requirements-smoke.txt` и проверяет реальный endpoint"],
  ["Merge", "зелёный GitHub Actions важнее локального SKIP на чистой машине"],
];

const sharedValidationWorkflowHref =
  "https://github.com/info14fourteen-creator/ASTS/actions/workflows/shared-validation.yml";
const webBuildWorkflowHref = "https://github.com/info14fourteen-creator/ASTS/actions/workflows/web-build.yml";

const prGateBadges = [
  [
    "Web build",
    "frontend shell",
    "GitHub Actions собирает Next.js и держит /plan, /tenders, /execution в рабочем состоянии.",
    webBuildWorkflowHref,
    "green",
  ],
  [
    "Shared validation",
    "schemas + fixture",
    "Проверяет demo-data, чтобы web и API не разъезжались по структуре процедур.",
    sharedValidationWorkflowHref,
    "blue",
  ],
  [
    "API smoke",
    "backend gate",
    "Поднимает FastAPI с pinned deps и проверяет /v1/sources/connectors перед merge.",
    "https://github.com/info14fourteen-creator/ASTS/actions/workflows/api-smoke.yml",
    "amber",
  ],
];

const mergeChecklist = [
  ["Checks", "Web build, Shared validation и API smoke зелёные"],
  ["Funnels", "до победы `/tenders`, исполнение только в `/execution`"],
  ["Sources", "AI-выводы ссылаются на первоисточник, hash или confidence-rule"],
  ["Owner", "approval нужен для outcome, экономики, доступов и merge gates"],
];

const fixtureCoverageCards = [
  ["Pre-win rows", `${fixtureCoverage.preWinTenders}`, "проверяются в /tenders и /tenders/[id] smoke"],
  ["Execution rows", `${fixtureCoverage.executionTenders}`, "живут только во второй воронке /execution"],
  ["Documents", `${fixtureCoverage.documents}`, "raw artifacts из первоисточников и file vault"],
  ["Execution artifacts", `${fixtureCoverage.executionArtifacts}`, "handoff pack второй воронки"],
  ["Tasks", `${fixtureCoverage.tasks}`, "owner approval, SLA и эскалации"],
  [
    "Outcome states",
    `${fixtureCoverage.outcomeStates.suggested}/${fixtureCoverage.outcomeStates.locked}/${fixtureCoverage.outcomeStates.approved}`,
    "suggested / locked / approved под route smoke",
  ],
];

const schemaValidationCards = [
  [
    "Source owner receipts",
    "source-owner-receipts.schema.json",
    "freshness blockers, owner roles, resolution statuses, AI gates",
  ],
  [
    "FNS connector gate",
    "fns-connector-gate.schema.json",
    "Legal owner, contract-only network policy, exact approval checklist",
  ],
  [
    "AI review queue",
    "ai-review-queue.schema.json",
    "confidence thresholds, fact types, owner roles, zakupki.gov.ru evidence",
  ],
];

const schemaDocsHref =
  "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/packages/shared/README.md#shared-schema-index";

const sharedValidationBrowserLoop = {
  checkCount: 14,
  ciPaths: ["packages/shared/**", "docs/19-continuation-70-step-plan-ru.md", ".github/workflows/shared-validation.yml"],
  command: "cd packages/shared && npm run validate",
  selector: "[data-testid='schema-validation-summary-card'] [data-schema-id]",
  workflow: "Shared validation",
  checks: [
    ["Paths", "packages/shared/** запускает shared validation"],
    ["Plan", "docs/19-continuation-70-step-plan-ru.md держит milestones под тем же gate"],
    ["Workflow", ".github/workflows/shared-validation.yml проверяет сам gate"],
    ["Command", "npm run validate должен оставаться зеленым на 14 checks"],
  ],
};

const sharedValidationCiBadgeLink = {
  badgeLabel: "Shared validation",
  browserLoopSelector: "[data-testid='shared-validation-browser-loop']",
  checkCount: sharedValidationBrowserLoop.checkCount,
  ciPath: ".github/workflows/shared-validation.yml",
  command: sharedValidationBrowserLoop.command,
  prGateHref: sharedValidationWorkflowHref,
  workflowHref: sharedValidationWorkflowHref,
  workflowName: "Shared validation",
  checks: [
    ["Badge", "PR gate badge ведет на GitHub Actions workflow"],
    ["Browser loop", "shared validation browser loop закрепляет 14 checks и command"],
    ["Workflow file", ".github/workflows/shared-validation.yml входит в CI path notes"],
    ["Merge gate", "PR #17 остается CLEAN только с зеленым Shared validation"],
  ],
};

const sharedValidationWorkflowFileSmoke = {
  browserLoopSelector: "[data-testid='shared-validation-browser-loop']",
  command: sharedValidationBrowserLoop.command,
  expectedPaths: sharedValidationBrowserLoop.ciPaths,
  nodeVersion: "22",
  smokeCommand: "cd apps/web && npm run smoke:shared-validation-workflow",
  workflowName: "Shared validation",
  workflowPath: ".github/workflows/shared-validation.yml",
  workingDirectory: "packages/shared",
  checks: [
    ["Workflow name", "YAML должен называться Shared validation"],
    ["Trigger paths", "workflow запускается на packages/shared, plan doc и сам workflow file"],
    ["Runtime", "Node 22 и working-directory packages/shared закреплены в CI"],
    ["Command", "Validate step выполняет npm run validate"],
  ],
};

const sharedValidationWorkflowCiNote = {
  command: "npm run smoke:shared-validation-workflow",
  expectedPaths: sharedValidationWorkflowFileSmoke.expectedPaths,
  fileSmokeSelector: "[data-testid='shared-validation-workflow-file-smoke']",
  sourceSmokeCommand: sharedValidationWorkflowFileSmoke.smokeCommand,
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checkedWorkflowName: sharedValidationWorkflowFileSmoke.workflowName,
  checkedWorkflowPath: sharedValidationWorkflowFileSmoke.workflowPath,
  checks: [
    ["CI step", "Web build запускает workflow file smoke до route smoke"],
    ["Checked workflow", "smoke сверяет Shared validation workflow name, paths, Node 22 и command"],
    ["Plan marker", "`/plan` хранит selector workflow file smoke и expected paths"],
    ["Merge gate", "PR нельзя считать готовым, если shared validation workflow drift появился"],
  ],
};

const sharedValidationWorkflowStepSmoke = {
  command: "npm run smoke:shared-validation-workflow-step",
  fileSmokeSelector: sharedValidationWorkflowCiNote.fileSmokeSelector,
  sourceCiNoteSelector: "[data-testid='shared-validation-workflow-ci-note']",
  sourceSmokeCommand: sharedValidationWorkflowCiNote.command,
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checkedWorkflowName: sharedValidationWorkflowCiNote.checkedWorkflowName,
  checkedWorkflowPath: sharedValidationWorkflowCiNote.checkedWorkflowPath,
  checks: [
    ["Source step", "Web build сначала запускает shared validation workflow file smoke"],
    ["CI step", "Web build запускает smoke:shared-validation-workflow-step до route smoke"],
    ["Plan note", "shared-validation-workflow-ci-note остается источником command и checked workflow"],
    ["Merge gate", "drift между `/plan` note и Web build step должен падать до live route smoke"],
  ],
};

const sharedValidationLiveRouteGateNote = {
  command: "npm run smoke:shared-validation-live-route",
  browserLoopSelector: sharedValidationWorkflowFileSmoke.browserLoopSelector,
  checkCount: sharedValidationBrowserLoop.checkCount,
  markerSelector: "[data-testid='shared-validation-workflow-step-smoke']",
  routeSmokeCommand: "npm run smoke -- --url http://127.0.0.1:4177/",
  sourceSmokeCommand: sharedValidationWorkflowStepSmoke.command,
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checkedWorkflowPath: sharedValidationWorkflowStepSmoke.checkedWorkflowPath,
  checks: [
    ["Static workflow gate", "Web build сверяет Shared validation workflow file и step smoke"],
    ["Live route gate", "затем route smoke проверяет `/plan` shared validation markers на живом сервере"],
    ["Plan marker", "shared-validation-workflow-step-smoke остается источником command и checked workflow"],
    ["Merge gate", "shared validation drift должен падать до merge и быть видимым в workdesk"],
  ],
};

const sharedValidationWorkflowFailureCopy = {
  command: "npm run smoke:shared-validation-workflow-failure-copy",
  failingCommand: sharedValidationWorkflowStepSmoke.command,
  noMergeCopy:
    "Не мержить, пока .github/workflows/web-build.yml снова запускает shared validation workflow smoke и step smoke в правильном порядке",
  ownerRole: "Schema owner + CI owner",
  repairTargets:
    ".github/workflows/web-build.yml,.github/workflows/shared-validation.yml,/plan,[data-testid='shared-validation-workflow-step-smoke']",
  sourceMarkerSelector: "[data-testid='shared-validation-workflow-step-smoke']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checkedWorkflowName: sharedValidationWorkflowStepSmoke.checkedWorkflowName,
  checkedWorkflowPath: sharedValidationWorkflowStepSmoke.checkedWorkflowPath,
  checks: [
    ["Symptom", "падает shared validation workflow step smoke или Web build меняет порядок workflow checks"],
    ["Fix order", "сначала восстановить Shared validation workflow file smoke, затем step smoke и только потом live route gate"],
    ["Owner", "Schema owner подтверждает checked workflow, CI owner подтверждает порядок шагов Web build"],
    ["No merge", "не мержить, пока shared validation workflow smoke и step smoke снова не зеленые"],
  ],
};

const sharedValidationFailureCopy = {
  command: "npm run smoke:shared-validation-failure-copy",
  failingCommand: sharedValidationLiveRouteGateNote.command,
  noMergeCopy:
    "Не мержить, пока `/plan`, packages/shared/** и .github/workflows/shared-validation.yml снова не проходят 14 shared checks",
  ownerRole: "Schema owner + CI owner",
  repairTargets: "/plan,packages/shared/**,.github/workflows/shared-validation.yml,docs/19-continuation-70-step-plan-ru.md",
  sourceMarkerSelector: "[data-testid='shared-validation-live-route-gate-note']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checkedWorkflowPath: sharedValidationLiveRouteGateNote.checkedWorkflowPath,
  checkCount: sharedValidationLiveRouteGateNote.checkCount,
  checks: [
    ["Symptom", "падает shared validation workflow smoke, live route gate или `cd packages/shared && npm run validate`"],
    ["Fix order", "сначала восстановить schemas/fixtures на 14 checks, затем `/plan` markers и Web build step"],
    ["Owner", "Schema owner подтверждает data contract, CI owner подтверждает workflow order"],
    ["No merge", "не мержить, пока shared validation smoke и route smoke снова не зеленые"],
  ],
};

const sharedValidationRenderedRouteFailureCopy = {
  command: "npm run smoke:shared-validation-rendered-route-failure-copy",
  expectedRouteCount: 16,
  failingCommand: sharedValidationLiveRouteGateNote.routeSmokeCommand,
  noMergeCopy: "Не мержить, пока rendered routes smoke снова покрывает shared validation markers на живом `/plan`",
  ownerRole: "Schema owner + QA owner",
  repairTargets:
    "apps/web/scripts/smoke.mjs,apps/web/app/plan/page.tsx,packages/shared/**,/plan,[data-testid='shared-validation-failure-copy']",
  sourceMarkerSelector: "[data-testid='shared-validation-failure-copy']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checkCount: sharedValidationFailureCopy.checkCount,
  checks: [
    ["Symptom", "финальный rendered routes smoke не видит shared validation markers или no-merge copy на `/plan`"],
    ["Fix order", "сначала восстановить shared validation failure copy, затем route smoke expectations и 16 rendered routes"],
    ["Owner", "Schema owner подтверждает 14 shared checks, QA owner подтверждает живой route coverage"],
    ["No merge", "не мержить, пока shared validation markers снова не проходят rendered routes smoke"],
  ],
};

const fixtureSchemaChecklistSmoke = {
  readmeAnchor: "packages/shared/README.md#shared-schema-index",
  readmePath: "packages/shared/README.md",
  schemaIds: [
    "ai-schemas/tender-position-extraction.schema.json",
    "ai-schemas/supplier-quote-normalization.schema.json",
    "fixture-schemas/source-owner-receipts.schema.json",
    "fixture-schemas/fns-connector-gate.schema.json",
    "fixture-schemas/ai-review-queue.schema.json",
  ],
  commands: [
    "cd packages/shared && npm run validate",
    "cd apps/web && npm run smoke:owner-receipts",
    "cd apps/web && npm run smoke:fns-approvals",
    "cd apps/web && npm run smoke:ai-review-actions",
  ],
  surfaces: [
    ["Tender position extraction", "AI document extraction before workflow decisions"],
    ["Supplier quote normalization", "AI supplier quote parsing before economics"],
    ["Source owner receipts", "FastAPI `/v1/sources/owner-receipts`, `/sources` receipt UI"],
    ["FNS connector gate", "FastAPI `/v1/sources/connectors`, `/sources` Legal gate"],
    ["AI review queue", "FastAPI `/v1/ai/review-queue`, `/ai-review` owner queue"],
  ],
};

const sharedReadmeCommandParitySmoke = {
  checklistSelector: "[data-testid='fixture-schema-checklist-smoke']",
  commandCount: fixtureSchemaChecklistSmoke.commands.length,
  commands: fixtureSchemaChecklistSmoke.commands,
  readmePath: fixtureSchemaChecklistSmoke.readmePath,
  smokeCommand: "cd apps/web && npm run smoke:shared-readme-commands",
  checks: [
    ["README source", "Local validation commands в shared README остаются источником правды"],
    ["Plan checklist", "fixture checklist показывает те же 4 команды в `/plan`"],
    ["Smoke", "`smoke:shared-readme-commands` падает при любом расхождении порядка или текста"],
    ["Web build", "command parity smoke можно запускать до merge рядом с route smoke"],
  ],
};

const sharedReadmeCommandCiNote = {
  buildCommand: "npm run build",
  command: "npm run smoke:shared-readme-commands",
  paritySelector: "[data-testid='shared-readme-command-parity-smoke']",
  readmePath: sharedReadmeCommandParitySmoke.readmePath,
  smokeCommand: sharedReadmeCommandParitySmoke.smokeCommand,
  triggerPath: "packages/shared/README.md",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["CI step", "Web build запускает command parity smoke после shared fixture parity"],
    ["Trigger path", "packages/shared/README.md запускает web build, когда меняется README source"],
    ["Plan marker", "`/plan` хранит selector parity smoke и command"],
    ["Merge gate", "PR нельзя считать готовым, если README commands разъехались с `/plan`"],
  ],
};

const aiReviewSchemaApiSmokeMarker = {
  apiHref: "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#ai-review-queue-contract",
  apiReadmeAnchor: "AI Review Queue Contract",
  apiReadmePath: "apps/api/README.md",
  apiRoute: "/v1/ai/review-queue",
  apiSelector: "[data-testid='ai-review-receipt-api-link']",
  checkCount: 5,
  domParityCommand: "cd apps/web && npm run smoke:ai-review-api-readme -- --url http://127.0.0.1:4177",
  parityCommand: "cd apps/web && npm run smoke:ai-review-actions",
  protectedSurface: "/v1/ai/review-queue + /ai-review",
  schemaId: "https://asts.local/schemas/ai-review-queue.schema.json",
  schemaSelector: "[data-testid='ai-review-schema-summary']",
  sourceFixture: "packages/shared/ai-review-queue.json",
  checks: [
    ["Schema", "сверить schema id с `/ai-review` summary"],
    ["API route", "закрепить backend route `/v1/ai/review-queue`"],
    ["API docs", "вести на API README AI Review Queue Contract"],
    ["Parity smoke", "держать owner/action matrix через `smoke:ai-review-actions`"],
    ["DOM parity", "сравнить `/plan` marker с `/ai-review` API README link"],
  ],
};

const aiReviewApiReadmeCiNote = {
  apiReadmePath: aiReviewSchemaApiSmokeMarker.apiReadmePath,
  apiRoute: aiReviewSchemaApiSmokeMarker.apiRoute,
  apiSelector: aiReviewSchemaApiSmokeMarker.apiSelector,
  domParityCommand: "npm run smoke:ai-review-api-readme -- --url http://127.0.0.1:4177",
  markerSelector: "[data-testid='ai-review-schema-api-smoke-marker']",
  smokeCommand: aiReviewSchemaApiSmokeMarker.domParityCommand,
  triggerPath: "apps/api/README.md",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["CI step", "Web build запускает DOM parity smoke после route smoke"],
    ["Trigger path", "apps/api/README.md запускает web build при смене backend contract"],
    ["API link", "`/ai-review` должен вести на тот же API README anchor"],
    ["Plan marker", "`/plan` хранит route, selector и command для проверки"],
  ],
};

const apiReadmeLiveRouteGateNote = {
  command: "npm run smoke:api-readme-live-route",
  liveCommand: aiReviewApiReadmeCiNote.domParityCommand,
  markerSelector: "[data-testid='ai-review-api-readme-ci-note']",
  routeSmokeCommand: "npm run smoke -- --url http://127.0.0.1:4177/",
  sourceSmokeCommand: aiReviewApiReadmeCiNote.smokeCommand,
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Route smoke", "Web build сначала поднимает Next preview и проверяет 16 routes"],
    ["Live parity", "затем проверяет `/plan` + `/ai-review` API README link на живом сервере"],
    ["Plan marker", "ai-review-api-readme-ci-note остается источником route, selector и command"],
    ["Merge gate", "API docs link drift должен падать после старта preview, до merge"],
  ],
};

const apiReadmeLiveRouteFailureCopy = {
  command: "npm run smoke:api-readme-live-route-failure-copy",
  failingCommand: apiReadmeLiveRouteGateNote.command,
  liveCommand: apiReadmeLiveRouteGateNote.liveCommand,
  noMergeCopy:
    "Не мержить, пока Web build снова держит API README live-route gate перед rendered routes parity checks",
  ownerRole: "API owner + CI owner",
  repairTargets:
    ".github/workflows/web-build.yml,/plan,apps/web/scripts/api-readme-live-route-gate.mjs,apps/web/scripts/smoke.mjs",
  sourceMarkerSelector: "[data-testid='api-readme-live-route-gate-note']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "падает API README live-route gate или Web build меняет порядок live parity checks"],
    ["Fix order", "сначала восстановить api-readme-live-route gate, затем rendered routes и AI review API README parity"],
    ["Owner", "API owner подтверждает README anchor, CI owner подтверждает порядок шагов Web build"],
    ["No merge", "не мержить, пока API README live-route gate снова не зеленый"],
  ],
};

const apiReadmeFailureCopy = {
  command: "npm run smoke:ai-review-api-readme-failure-copy",
  failingCommand: aiReviewApiReadmeCiNote.domParityCommand,
  liveGateSelector: "[data-testid='api-readme-live-route-gate-note']",
  markerSelector: "[data-testid='ai-review-api-readme-ci-note']",
  noMergeCopy: "Не мержить, пока `/plan`, `/ai-review` и apps/api/README.md снова не указывают на один anchor",
  ownerRole: "API owner + Product owner",
  repairTargets: ["/plan", "/ai-review", "apps/api/README.md#ai-review-queue-contract"],
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "падает live parity command и показывает, какой marker или href разъехался"],
    ["Fix order", "сначала восстановить API README anchor, затем `/ai-review` link и `/plan` marker"],
    ["Owner", "API owner подтверждает backend contract, Product owner подтверждает visible copy"],
    ["No merge", "не мержить, пока live route smoke снова не зеленый на PR"],
  ],
};

const aiReviewApiReadmeRenderedRouteFailureCopy = {
  apiSelector: aiReviewApiReadmeCiNote.apiSelector,
  command: "npm run smoke:ai-review-api-readme-rendered-route-failure-copy",
  expectedRouteCount: 16,
  failingCommand: aiReviewApiReadmeCiNote.domParityCommand,
  liveGateSelector: "[data-testid='ai-review-api-readme-failure-copy']",
  markerSelector: aiReviewApiReadmeCiNote.markerSelector,
  noMergeCopy: "Не мержить, пока rendered routes smoke снова подтверждает `/plan` + `/ai-review` API README parity",
  ownerRole: "API owner + QA owner",
  repairTargets:
    "/plan,/ai-review,apps/api/README.md#ai-review-queue-contract,apps/web/scripts/ai-review-api-readme-parity.mjs",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "после старта preview падает AI review API README parity или `/ai-review` потерял README anchor"],
    ["Fix order", "сначала восстановить API README parity failure copy, затем live parity command внутри rendered routes"],
    ["Owner", "API owner подтверждает README anchor, QA owner подтверждает `/plan` + `/ai-review` на живом сервере"],
    ["No merge", "не мержить, пока AI review API README parity снова не зеленый внутри rendered routes smoke"],
  ],
};

const aiReviewQueueRenderedRouteFailureCopy = {
  apiRoute: aiReviewSchemaApiSmokeMarker.apiRoute,
  command: "npm run smoke:ai-review-queue-rendered-route-failure-copy",
  expectedBlockedCount: 2,
  expectedQueueCount: 3,
  expectedRouteCount: 16,
  failingCommand: "npm run smoke -- --url http://127.0.0.1:4177/",
  noMergeCopy: "Не мержить, пока rendered routes smoke снова подтверждает AI review queue, owners и evidence на живом `/ai-review`",
  ownerRole: "AI workflow owner + QA owner",
  parityCommand: "npm run smoke:ai-review-actions",
  repairTargets:
    "/ai-review,packages/shared/ai-review-queue.json,apps/web/scripts/ai-review-action-parity.mjs,apps/web/scripts/smoke.mjs",
  sourceMarkerSelector: "[data-testid='ai-review-confidence-queue']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "rendered routes проходят, но `/ai-review` потерял low-confidence queue, blocked facts или owner actions"],
    ["Fix order", "сначала восстановить AI review shared fixture parity, затем `/ai-review` rendered route expectations"],
    ["Owner", "AI workflow owner подтверждает queue/actions, QA owner подтверждает живой `/ai-review` route"],
    ["No merge", "не мержить, пока AI review queue снова не проходит rendered route coverage"],
  ],
};

const aiReviewReceiptApiRenderedRouteFailureCopy = {
  apiRoute: aiReviewSchemaApiSmokeMarker.apiRoute,
  apiServicePath: "apps/api/app/services/ai_review.py",
  command: "npm run smoke:ai-review-receipt-api-rendered-route-failure-copy",
  docsHref: aiReviewSchemaApiSmokeMarker.apiHref,
  expectedBlockedCount: 2,
  expectedOwnerCount: 3,
  expectedQueueCount: 3,
  expectedRouteCount: 16,
  failingCommand: "npm run smoke -- --url http://127.0.0.1:4177/",
  noMergeCopy:
    "Не мержить, пока rendered routes smoke снова подтверждает AI review API route, shared fixture и `/ai-review` receipt markers",
  ownerRole: "API owner + AI workflow owner + QA owner",
  parityCommand: "npm run smoke:ai-review-actions",
  repairTargets:
    "apps/api/app/main.py,apps/api/app/services/ai_review.py,packages/shared/ai-review-queue.json,/ai-review,apps/web/scripts/smoke.mjs",
  sourceMarkerSelector: "[data-testid='ai-review-receipt-browser-loop']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "rendered routes проходят, но API route, shared fixture или `/ai-review` receipt API link разъехались"],
    ["Fix order", "сначала восстановить FastAPI route и shared fixture, затем `/ai-review` receipt data-api-route"],
    ["Owner", "API owner подтверждает backend contract, AI workflow owner подтверждает receipt loop, QA owner подтверждает route smoke"],
    ["No merge", "не мержить, пока AI review receipt API снова не проходит rendered route coverage"],
  ],
};

const aiReviewReceiptWriteApiDraft = {
  apiRoute: "/v1/ai/review-queue",
  command: "npm run smoke:ai-review-receipt-write-api-draft",
  docsHref:
    "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#ai-review-receipt-write-api-draft",
  expectedQueueCount: 3,
  expectedRequestFieldCount: 11,
  expectedRouteCount: 16,
  fixturePath: "packages/shared/ai-review-queue.json",
  method: "POST",
  noMergeCopy:
    "Не мержить AI review receipt write endpoint, пока POST не проверяет owner role, decision, idempotency key, source evidence и immutable audit append.",
  ownerRole: "AI workflow owner + API owner + QA owner",
  repairTargets:
    "packages/shared/ai-review-queue.json,apps/api/app/services/ai_review.py,apps/api/README.md,/ai-review,apps/web/scripts/ai-review-receipt-write-api-draft.mjs",
  sourceMarkerSelector: "[data-testid='ai-review-receipt-write-api-draft']",
  status: "draft",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Draft", "GET `/v1/ai/review-queue` отдаёт write_contract, но backend не записывает owner receipt"],
    ["Idempotency", "future POST требует idempotency_key перед immutable AI audit append"],
    ["Evidence", "decision должен ссылаться на evidence_ref, confidence_at_review и source checksum"],
    ["No merge", "не мержить, пока write draft не проходит shared, API и web smoke"],
  ],
};

const aiReviewReceiptWriteSmokeFailureCopy = {
  apiRoute: "/v1/ai/review-queue",
  command: "npm run smoke:ai-review-receipt-write-smoke-failure-copy",
  docsHref:
    "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#ai-review-receipt-write-api-draft",
  expectedQueueCount: 3,
  expectedRequestFieldCount: 11,
  expectedRouteCount: 16,
  failingCommand: "npm run smoke:ai-review-receipt-write-api-draft",
  noMergeCopy:
    "Не мержить, пока AI review receipt write smoke снова подтверждает draft POST contract, owner decision, idempotency key, source evidence и immutable AI audit append.",
  ownerRole: "AI workflow owner + API owner + QA owner",
  parityCommand: "npm run smoke:ai-review-receipt-write-api-draft",
  repairTargets:
    "packages/shared/ai-review-queue.json,apps/api/app/services/ai_review.py,apps/api/README.md,/ai-review,/plan,apps/web/scripts/ai-review-receipt-write-api-draft.mjs",
  sourceMarkerSelector: "[data-testid='ai-review-receipt-write-api-draft']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "write draft smoke падает: пропал POST method, owner decision, source evidence или no-merge copy"],
    ["Fix order", "сначала восстановить shared write_contract, затем API README и `/ai-review` draft marker"],
    ["Owner", "AI workflow owner подтверждает decision fields, API owner подтверждает DTO, QA owner подтверждает smoke"],
    ["No merge", "не мержить, пока AI review receipt write smoke снова не проходит contract-only gate"],
  ],
};

const apiReadmeTriggerSmoke = {
  command: "npm run smoke:api-readme-trigger",
  domParityCommand: aiReviewApiReadmeCiNote.domParityCommand,
  expectedWorkflowPathCount: 2,
  sourceCiNoteSelector: "[data-testid='ai-review-api-readme-ci-note']",
  triggerPath: aiReviewApiReadmeCiNote.triggerPath,
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Trigger path", "apps/api/README.md должен быть в pull_request и push paths"],
    ["CI step", "Web build запускает smoke:api-readme-trigger до live route smoke"],
    ["Live parity", "AI review API README DOM parity остается live-проверкой после start"],
    ["Plan link", "`/plan` связывает trigger smoke с AI review API README CI note"],
  ],
};

const apiReadmeTriggerFailureCopy = {
  command: "npm run smoke:api-readme-trigger-failure-copy",
  failingCommand: apiReadmeTriggerSmoke.command,
  noMergeCopy: "Не мержить, пока apps/api/README.md снова не запускает Web build в pull_request и push paths",
  ownerRole: "API owner + CI owner",
  repairTargets: "apps/api/README.md,.github/workflows/web-build.yml,/plan,[data-testid='api-readme-trigger-smoke']",
  sourceMarkerSelector: "[data-testid='api-readme-trigger-smoke']",
  triggerPath: apiReadmeTriggerSmoke.triggerPath,
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  expectedWorkflowPathCount: apiReadmeTriggerSmoke.expectedWorkflowPathCount,
  checks: [
    ["Symptom", "падает API README trigger smoke или Web build не стартует при изменении backend contract docs"],
    ["Fix order", "сначала вернуть apps/api/README.md в pull_request/push paths, затем `/plan` trigger marker"],
    ["Owner", "API owner подтверждает contract docs path, CI owner подтверждает Web build triggers"],
    ["No merge", "не мержить, пока trigger smoke и live API README parity снова не зеленые"],
  ],
};

const apiReadmeTriggerRenderedRouteFailureCopy = {
  command: "npm run smoke:api-readme-trigger-rendered-route-failure-copy",
  domParityCommand: apiReadmeTriggerSmoke.domParityCommand,
  expectedRouteCount: 16,
  expectedWorkflowPathCount: apiReadmeTriggerSmoke.expectedWorkflowPathCount,
  failingCommand: apiReadmeTriggerSmoke.domParityCommand,
  noMergeCopy: "Не мержить, пока rendered routes smoke снова подтверждает API README trigger path и live parity chain",
  ownerRole: "API owner + QA owner",
  repairTargets:
    ".github/workflows/web-build.yml,/plan,apps/api/README.md,apps/web/scripts/api-readme-trigger-smoke.mjs",
  sourceMarkerSelector: "[data-testid='api-readme-trigger-failure-copy']",
  triggerPath: apiReadmeTriggerSmoke.triggerPath,
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "rendered routes проходят, но API README trigger path или live parity chain не видны на `/plan`"],
    ["Fix order", "сначала восстановить trigger smoke и failure copy, затем live parity command внутри rendered routes"],
    ["Owner", "API owner подтверждает backend README trigger, QA owner подтверждает живую `/plan` route"],
    ["No merge", "не мержить, пока API README trigger chain снова не зеленая внутри rendered routes smoke"],
  ],
};

const schemaDocsLinkParitySmoke = {
  anchor: "packages/shared/README.md#shared-schema-index",
  anchorSlug: "shared-schema-index",
  docsHref: schemaDocsHref,
  linkSelector: "[data-testid='schema-docs-link']",
  checklistSelector: "[data-testid='fixture-schema-checklist-smoke']",
  expectedSchemaCount: schemaValidationCards.length,
  expectedChecklistSchemaCount: fixtureSchemaChecklistSmoke.schemaIds.length,
  readmeHeading: "Shared Schema Index",
  readmePath: "packages/shared/README.md",
  checks: [
    ["Link href", "schema-docs-link должен вести на shared schema index"],
    ["Checklist anchor", "fixture checklist должен хранить тот же README anchor"],
    ["Schema count", "summary держит 3 fixture schemas, checklist держит 5 schema rows"],
    ["Smoke marker", "route smoke проверяет оба selector и один anchor"],
  ],
};

const schemaDocsReadmeExistenceSmoke = {
  anchor: schemaDocsLinkParitySmoke.anchor,
  anchorSlug: schemaDocsLinkParitySmoke.anchorSlug,
  expectedRows: fixtureSchemaChecklistSmoke.schemaIds.length,
  linkSelector: schemaDocsLinkParitySmoke.linkSelector,
  readmeHeading: schemaDocsLinkParitySmoke.readmeHeading,
  readmePath: schemaDocsLinkParitySmoke.readmePath,
  smokeCommand: "cd apps/web && npm run smoke:schema-docs-readme",
  checks: [
    ["README file", "packages/shared/README.md должен существовать"],
    ["Heading", "README держит `## Shared Schema Index` для GitHub anchor"],
    ["Rows", "индекс содержит все 5 schema rows из fixture checklist"],
    ["Plan link", "`/plan` marker ведет на тот же shared-schema-index anchor"],
  ],
};

const schemaDocsReadmeCiNote = {
  docsHref: schemaDocsLinkParitySmoke.docsHref,
  expectedRows: schemaDocsReadmeExistenceSmoke.expectedRows,
  linkSelector: schemaDocsReadmeExistenceSmoke.linkSelector,
  readmeHeading: schemaDocsReadmeExistenceSmoke.readmeHeading,
  readmePath: schemaDocsReadmeExistenceSmoke.readmePath,
  smokeCommand: "npm run smoke:schema-docs-readme",
  sourceSmokeCommand: schemaDocsReadmeExistenceSmoke.smokeCommand,
  triggerPath: "packages/shared/README.md",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["CI step", "Web build запускает README existence smoke до route smoke"],
    ["Trigger path", "packages/shared/README.md уже запускает web build при смене schema index"],
    ["Docs anchor", "README должен держать `## Shared Schema Index` и 5 rows"],
    ["Plan link", "`/plan` хранит docs href и schema-docs-link selector"],
  ],
};

const schemaDocsReadmeWorkflowSmoke = {
  command: "npm run smoke:schema-docs-workflow",
  expectedWorkflowPathCount: 2,
  readmePath: schemaDocsReadmeCiNote.readmePath,
  sourceCiNoteSelector: "[data-testid='schema-docs-readme-ci-note']",
  sourceSmokeCommand: schemaDocsReadmeCiNote.smokeCommand,
  triggerPath: schemaDocsReadmeCiNote.triggerPath,
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Trigger path", "packages/shared/README.md должен быть в pull_request и push paths"],
    ["CI step", "Web build запускает smoke:schema-docs-workflow после README existence smoke"],
    ["Source note", "schema-docs-readme-ci-note остается источником command, path и docs href"],
    ["Route order", "README existence smoke должен идти до live rendered route smoke"],
  ],
};

const schemaDocsWorkflowFailureCopy = {
  command: "npm run smoke:schema-docs-workflow-failure-copy",
  failingCommand: schemaDocsReadmeWorkflowSmoke.command,
  noMergeCopy:
    "Не мержить, пока packages/shared/README.md снова не запускает Web build и schema docs workflow smoke",
  ownerRole: "Schema owner + CI owner",
  readmePath: schemaDocsReadmeWorkflowSmoke.readmePath,
  repairTargets: "packages/shared/README.md,.github/workflows/web-build.yml,/plan,[data-testid='schema-docs-readme-workflow-smoke']",
  sourceMarkerSelector: "[data-testid='schema-docs-readme-workflow-smoke']",
  triggerPath: schemaDocsReadmeWorkflowSmoke.triggerPath,
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  expectedWorkflowPathCount: schemaDocsReadmeWorkflowSmoke.expectedWorkflowPathCount,
  checks: [
    ["Symptom", "падает schema docs workflow smoke или Web build не стартует при изменении shared schema index"],
    ["Fix order", "сначала вернуть packages/shared/README.md в pull_request/push paths, затем `/plan` workflow marker"],
    ["Owner", "Schema owner подтверждает README schema index, CI owner подтверждает Web build step/order"],
    ["No merge", "не мержить, пока schema docs workflow smoke и README existence smoke снова не зеленые"],
  ],
};

const schemaDocsReadmeLiveRouteGateNote = {
  command: "npm run smoke:schema-docs-live-route",
  linkSelector: schemaDocsReadmeCiNote.linkSelector,
  markerSelector: "[data-testid='schema-docs-readme-ci-note']",
  readmeCommand: schemaDocsReadmeCiNote.smokeCommand,
  readmePath: schemaDocsReadmeCiNote.readmePath,
  routeSmokeCommand: "npm run smoke -- --url http://127.0.0.1:4177/",
  sourceSmokeCommand: schemaDocsReadmeCiNote.sourceSmokeCommand,
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Static README gate", "Web build сначала сверяет shared README heading и 5 schema rows"],
    ["Live route gate", "затем route smoke проверяет `/plan` schema docs link на живом сервере"],
    ["Plan marker", "schema-docs-readme-ci-note остается источником path, selector и command"],
    ["Merge gate", "schema docs link drift должен падать до merge, а не после ручного просмотра"],
  ],
};

const schemaDocsLiveRouteFailureCopy = {
  command: "npm run smoke:schema-docs-live-route-failure-copy",
  failingCommand: schemaDocsReadmeLiveRouteGateNote.command,
  noMergeCopy:
    "Не мержить, пока Web build снова держит schema docs live-route gate перед rendered routes smoke",
  ownerRole: "Schema owner + CI owner",
  readmePath: schemaDocsReadmeLiveRouteGateNote.readmePath,
  repairTargets: ".github/workflows/web-build.yml,/plan,packages/shared/README.md,[data-testid='schema-docs-link']",
  sourceMarkerSelector: "[data-testid='schema-docs-readme-live-route-gate-note']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "падает schema docs live-route gate или Web build меняет порядок schema docs checks"],
    ["Fix order", "сначала восстановить schema docs live-route gate, затем README parity failure copy и rendered routes"],
    ["Owner", "Schema owner подтверждает README/schema link, CI owner подтверждает порядок шагов Web build"],
    ["No merge", "не мержить, пока schema docs live-route gate снова не зеленый"],
  ],
};

const schemaDocsReadmeFailureCopy = {
  command: "npm run smoke:schema-docs-readme-failure-copy",
  failingCommand: schemaDocsReadmeLiveRouteGateNote.command,
  noMergeCopy: "Не мержить, пока `/plan` и packages/shared/README.md#shared-schema-index снова не показывают один schema index",
  ownerRole: "Schema owner + Product owner",
  readmePath: schemaDocsReadmeCiNote.readmePath,
  repairTargets: "/plan,packages/shared/README.md#shared-schema-index,[data-testid='schema-docs-link']",
  sourceMarkerSelector: "[data-testid='schema-docs-readme-live-route-gate-note']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "падает schema docs README parity или route smoke показывает missing schema docs marker"],
    ["Fix order", "сначала восстановить `## Shared Schema Index` и 5 schema rows, затем `/plan` schema-docs-link"],
    ["Owner", "Schema owner подтверждает README/schema rows, Product owner подтверждает visible copy"],
    ["No merge", "не мержить, пока schema docs smoke и route smoke снова не зеленые"],
  ],
};

const schemaDocsRenderedRouteFailureCopy = {
  command: "npm run smoke:schema-docs-rendered-route-failure-copy",
  expectedRouteCount: 16,
  failingCommand: schemaDocsReadmeLiveRouteGateNote.routeSmokeCommand,
  linkSelector: schemaDocsReadmeLiveRouteGateNote.linkSelector,
  noMergeCopy: "Не мержить, пока rendered routes smoke снова подтверждает schema docs link и shared README parity на живом `/plan`",
  ownerRole: "Schema owner + QA owner",
  readmePath: schemaDocsReadmeCiNote.readmePath,
  repairTargets:
    "/plan,packages/shared/README.md#shared-schema-index,apps/web/scripts/smoke.mjs,[data-testid='schema-docs-link']",
  sourceMarkerSelector: "[data-testid='schema-docs-readme-failure-copy']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "rendered routes проходят, но `/plan` потерял schema docs link, README rows или failure copy"],
    ["Fix order", "сначала восстановить schema docs README failure copy, затем route smoke expectations и 16 routes"],
    ["Owner", "Schema owner подтверждает README/schema rows, QA owner подтверждает живой `/plan` route"],
    ["No merge", "не мержить, пока schema docs markers снова не проходят rendered routes smoke"],
  ],
};

const sourceOwnerReceiptsRenderedRouteFailureCopy = {
  apiRoute: "/v1/sources/owner-receipts",
  command: "npm run smoke:source-owner-receipts-rendered-route-failure-copy",
  docsCommand: "npm run smoke:source-receipt-docs-link -- --url http://127.0.0.1:4177",
  expectedHistoryCount: 4,
  expectedRouteCount: 16,
  failingCommand: "npm run smoke:source-receipt-docs-link -- --url http://127.0.0.1:4177",
  noMergeCopy: "Не мержить, пока rendered routes smoke снова подтверждает `/sources` owner receipt history и API docs link",
  ownerRole: "Sources owner + QA owner",
  parityCommand: "npm run smoke:owner-receipts",
  repairTargets:
    "/sources,packages/shared/source-owner-receipts.json,apps/web/scripts/source-receipt-docs-link-browser.mjs,apps/api/README.md#source-owner-receipt-contract",
  sourceMarkerSelector: "[data-testid='schema-docs-rendered-route-failure-copy']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "rendered routes проходят, но `/sources` потерял owner receipt history или API README link"],
    ["Fix order", "сначала восстановить owner receipt parity, затем `/sources` docs link browser assertion"],
    ["Owner", "Sources owner подтверждает shared receipt fixture, QA owner подтверждает живой `/sources` route"],
    ["No merge", "не мержить, пока source owner receipts снова не проходят rendered route coverage"],
  ],
};

const ownerReceiptApiRenderedRouteFailureCopy = {
  apiRoute: "/v1/sources/owner-receipts",
  apiServicePath: "apps/api/app/services/source_owner_receipts.py",
  command: "npm run smoke:owner-receipt-api-rendered-route-failure-copy",
  docsHref: "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#source-owner-receipt-contract",
  expectedBlockedUntilRestoredCount: 2,
  expectedHistoryCount: 4,
  expectedRouteCount: 16,
  failingCommand: "npm run smoke -- --url http://127.0.0.1:4177/",
  noMergeCopy:
    "Не мержить, пока rendered routes smoke снова подтверждает owner receipt API route, shared fixture и `/sources` history markers",
  ownerRole: "API owner + Sources owner + QA owner",
  parityCommand: "npm run smoke:owner-receipts",
  repairTargets:
    "apps/api/app/main.py,apps/api/app/services/source_owner_receipts.py,packages/shared/source-owner-receipts.json,/sources,apps/web/scripts/smoke.mjs",
  sourceMarkerSelector: "[data-testid='source-owner-receipt-history']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "rendered routes проходят, но API route, shared fixture или `/sources` history marker разъехались"],
    ["Fix order", "сначала восстановить FastAPI route и shared fixture, затем `/sources` history data-api-route"],
    ["Owner", "API owner подтверждает backend contract, Sources owner подтверждает UI history seed, QA owner подтверждает route smoke"],
    ["No merge", "не мержить, пока owner receipt API снова не проходит rendered route coverage"],
  ],
};

const sourceOwnerReceiptWriteApiDraft = {
  apiRoute: "/v1/sources/owner-receipts",
  command: "npm run smoke:source-owner-receipt-write-api-draft",
  docsHref:
    "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#source-owner-receipt-write-api-draft",
  expectedRequestFieldCount: 10,
  expectedRouteCount: 16,
  fixturePath: "packages/shared/source-owner-receipts.json",
  method: "POST",
  noMergeCopy:
    "Не мержить source owner receipt write endpoint, пока POST не проверяет owner role, idempotency key, checksum evidence и immutable audit append.",
  ownerRole: "Sources owner + API owner + QA owner",
  repairTargets:
    "packages/shared/source-owner-receipts.json,apps/api/app/services/source_owner_receipts.py,apps/api/README.md,/sources,apps/web/scripts/source-owner-receipt-write-api-draft.mjs",
  sourceMarkerSelector: "[data-testid='source-owner-receipt-write-api-draft']",
  status: "draft",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Draft", "GET `/v1/sources/owner-receipts` отдаёт write_contract, но backend не мутирует history"],
    ["Idempotency", "future POST требует idempotency_key и immutable audit append"],
    ["Evidence", "AI unlock остается только после restored receipt и checksum evidence"],
    ["No merge", "не мержить, пока write draft не проходит shared, API и web smoke"],
  ],
};

const sourceOwnerReceiptWriteSmokeFailureCopy = {
  apiRoute: "/v1/sources/owner-receipts",
  command: "npm run smoke:source-owner-receipt-write-smoke-failure-copy",
  docsHref:
    "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#source-owner-receipt-write-api-draft",
  expectedRequestFieldCount: 10,
  expectedRouteCount: 16,
  failingCommand: "npm run smoke:source-owner-receipt-write-api-draft",
  noMergeCopy:
    "Не мержить, пока source owner receipt write smoke снова подтверждает draft POST contract, idempotency key, checksum evidence и immutable audit append.",
  ownerRole: "Sources owner + API owner + QA owner",
  parityCommand: "npm run smoke:source-owner-receipt-write-api-draft",
  repairTargets:
    "packages/shared/source-owner-receipts.json,apps/api/app/services/source_owner_receipts.py,apps/api/README.md,/sources,/plan,apps/web/scripts/source-owner-receipt-write-api-draft.mjs",
  sourceMarkerSelector: "[data-testid='source-owner-receipt-write-api-draft']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "write draft smoke падает: пропал POST method, request schema, idempotency key или no-merge copy"],
    ["Fix order", "сначала восстановить shared write_contract, затем API README и `/sources` draft marker"],
    ["Owner", "Sources owner подтверждает receipt fields, API owner подтверждает DTO, QA owner подтверждает smoke"],
    ["No merge", "не мержить, пока source owner receipt write smoke снова не проходит contract-only gate"],
  ],
};

const sourceOwnerReceiptWriteDocsFailureCopy = {
  apiRoute: "/v1/sources/owner-receipts",
  command: "npm run smoke:source-owner-receipt-write-docs-failure-copy",
  docsHref:
    "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#source-owner-receipt-write-api-draft",
  expectedRequestFieldCount: 10,
  expectedRouteCount: 16,
  failingCommand: "npm run smoke:source-owner-receipt-write-api-draft",
  noMergeCopy:
    "Не мержить, пока source owner receipt write docs снова подтверждают README anchor, `/plan` docs href и immutable audit append.",
  ownerRole: "Sources owner + Docs owner + QA owner",
  parityCommand: "npm run smoke:source-owner-receipt-write-api-draft",
  repairTargets:
    "apps/api/README.md#source-owner-receipt-write-api-draft,/plan,apps/web/scripts/source-owner-receipt-write-api-draft.mjs,apps/web/scripts/source-owner-receipt-write-docs-failure-copy.mjs",
  sourceMarkerSelector: "[data-testid='source-owner-receipt-write-api-draft']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "write draft smoke проходит частично, но потерян README anchor или `/plan` docs href"],
    ["Fix order", "сначала восстановить API README anchor, затем `/plan` docsHref и route smoke expectations"],
    ["Owner", "Docs owner подтверждает README anchor, Sources owner подтверждает write contract, QA owner подтверждает smoke"],
    ["No merge", "не мержить, пока source owner receipt write docs снова не проходят contract-only gate"],
  ],
};

const sourceFreshnessWriteApiDraft = {
  apiRoute: "/v1/sources/freshness",
  command: "npm run smoke:source-freshness-write-api-draft",
  docsHref:
    "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#source-freshness-write-api-draft",
  expectedBreachCount: 4,
  expectedRequestFieldCount: 12,
  expectedRouteCount: 16,
  method: "POST",
  noMergeCopy:
    "Не мержить source freshness write endpoint, пока POST не проверяет owner role, breach type, idempotency key, restored evidence и immutable audit append.",
  ownerRole: "Sources owner + API owner + QA owner",
  repairTargets:
    "apps/api/app/services/source_freshness.py,apps/api/app/schemas.py,apps/api/README.md,/sources,apps/web/scripts/source-freshness-write-api-draft.mjs",
  sourceMarkerSelector: "[data-testid='source-freshness-write-api-draft']",
  status: "draft",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Draft", "GET `/v1/sources/freshness` отдаёт write_contract, но backend не снимает freshness blockers"],
    ["Idempotency", "future POST требует idempotency_key перед immutable freshness audit append"],
    ["Evidence", "resolution_status=restored должен ссылаться на new_raw_artifact_id и checksum"],
    ["No merge", "не мержить, пока write draft не проходит API, web и route smoke"],
  ],
};

const sourceFreshnessWriteSmokeFailureCopy = {
  apiRoute: "/v1/sources/freshness",
  command: "npm run smoke:source-freshness-write-smoke-failure-copy",
  docsHref:
    "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#source-freshness-write-api-draft",
  expectedBreachCount: 4,
  expectedRequestFieldCount: 12,
  expectedRouteCount: 16,
  failingCommand: "npm run smoke:source-freshness-write-api-draft",
  noMergeCopy:
    "Не мержить, пока source freshness write smoke снова подтверждает draft POST contract, breach type, idempotency key, restored evidence и immutable freshness audit append.",
  ownerRole: "Sources owner + API owner + QA owner",
  parityCommand: "npm run smoke:source-freshness-write-api-draft",
  repairTargets:
    "apps/api/app/services/source_freshness.py,apps/api/app/schemas.py,apps/api/README.md,/sources,/plan,apps/web/scripts/source-freshness-write-api-draft.mjs",
  sourceMarkerSelector: "[data-testid='source-freshness-write-api-draft']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "write draft smoke падает: пропал POST method, breach type, restored evidence или no-merge copy"],
    ["Fix order", "сначала восстановить SOURCE_FRESHNESS_WRITE_CONTRACT, затем API README и `/sources` draft marker"],
    ["Owner", "Sources owner подтверждает breach fields, API owner подтверждает DTO, QA owner подтверждает smoke"],
    ["No merge", "не мержить, пока source freshness write smoke снова не проходит contract-only gate"],
  ],
};

const sourceFreshnessRenderedRouteFailureCopy = {
  apiRoute: "/v1/sources/freshness",
  breachTypes: "stale,missing,parse_failed,hash_mismatch",
  command: "npm run smoke:source-freshness-rendered-route-failure-copy",
  docsHref: "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#source-freshness-contract",
  expectedBlockedCount: 4,
  expectedBreachCount: 4,
  expectedRouteCount: 16,
  failingCommand: "npm run smoke -- --url http://127.0.0.1:4177/",
  noMergeCopy:
    "Не мержить, пока rendered routes smoke снова подтверждает source freshness queue, breach types и AI gate на живом `/sources`",
  ownerRole: "Sources owner + QA owner",
  repairTargets: "/sources,apps/web/lib/mock-data.ts,apps/web/scripts/smoke.mjs,apps/api/README.md#source-freshness-contract",
  sourceMarkerSelector: "[data-testid='source-freshness-breach-queue']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "rendered routes проходят, но `/sources` потерял freshness queue, breach types или blocked AI gate"],
    ["Fix order", "сначала восстановить source freshness fixture, затем `/sources` rendered route expectations"],
    ["Owner", "Sources owner подтверждает breach queue, QA owner подтверждает живой `/sources` route"],
    ["No merge", "не мержить, пока source freshness снова не проходит rendered route coverage"],
  ],
};

const sourceFreshnessDocsRenderedRouteFailureCopy = {
  apiRoute: sourceFreshnessRenderedRouteFailureCopy.apiRoute,
  command: "npm run smoke:source-freshness-docs-rendered-route-failure-copy",
  docsHref: sourceFreshnessRenderedRouteFailureCopy.docsHref,
  expectedBreachCount: sourceFreshnessRenderedRouteFailureCopy.expectedBreachCount,
  expectedRouteCount: sourceFreshnessRenderedRouteFailureCopy.expectedRouteCount,
  failingCommand: "npm run smoke -- --url http://127.0.0.1:4177/",
  noMergeCopy:
    "Не мержить, пока rendered routes smoke снова подтверждает source freshness docs link и API README anchor на живом `/sources`",
  ownerRole: "Sources owner + Docs owner + QA owner",
  repairTargets:
    "/sources,apps/api/README.md#source-freshness-contract,apps/web/lib/mock-data.ts,apps/web/scripts/smoke.mjs",
  sourceMarkerSelector: "[data-testid='source-freshness-docs-link']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "rendered routes проходят, но `/sources` потерял freshness docs link или API README anchor"],
    ["Fix order", "сначала восстановить API README Source Freshness Contract, затем `/sources` docs link"],
    ["Owner", "Sources owner подтверждает queue, Docs owner подтверждает README anchor, QA owner подтверждает `/sources`"],
    ["No merge", "не мержить, пока source freshness docs link снова не проходит rendered route coverage"],
  ],
};

const fnsApprovalsRenderedRouteFailureCopy = {
  apiRoute: "/v1/sources/connectors",
  command: "npm run smoke:fns-approvals-rendered-route-failure-copy",
  docsHref: "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#fns-smoke-contract",
  expectedApprovalCount: 5,
  expectedRouteCount: 16,
  failingCommand: "npm run smoke -- --url http://127.0.0.1:4177/",
  noMergeCopy: "Не мержить, пока rendered routes smoke снова подтверждает FNS Legal approvals на живом `/sources`",
  ownerRole: "Legal owner + QA owner",
  parityCommand: "npm run smoke:fns-approvals",
  repairTargets:
    "/sources,packages/shared/fns-connector-gate.json,apps/web/scripts/fns-approvals-parity.mjs,apps/web/scripts/smoke.mjs",
  sourceMarkerSelector: "[data-testid='fns-real-network-smoke-gate']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "rendered routes проходят, но `/sources` потерял FNS Legal approvals, safe pair или CI no-network policy"],
    ["Fix order", "сначала восстановить shared FNS fixture parity, затем `/sources` rendered route expectations"],
    ["Owner", "Legal owner подтверждает approvals, QA owner подтверждает живой `/sources` route"],
    ["No merge", "не мержить, пока FNS approvals снова не проходят rendered route coverage"],
  ],
};

const fnsApprovalsDocsRenderedRouteFailureCopy = {
  apiRoute: "/v1/sources/connectors",
  command: "npm run smoke:fns-approvals-docs-rendered-route-failure-copy",
  docsHref: "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#fns-smoke-contract",
  expectedApprovalCount: 5,
  expectedRouteCount: 16,
  failingCommand: "npm run smoke -- --url http://127.0.0.1:4177/",
  noMergeCopy:
    "Не мержить, пока rendered routes smoke снова подтверждает FNS docs link, Legal approvals и API README anchor на живом `/sources`",
  ownerRole: "Legal owner + Docs owner + QA owner",
  parityCommand: "npm run smoke:fns-approvals",
  repairTargets:
    "/sources,apps/api/README.md#fns-smoke-contract,packages/shared/fns-connector-gate.json,apps/web/scripts/smoke.mjs",
  sourceMarkerSelector: "[data-testid='fns-network-gate-docs-link']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "rendered routes проходят, но `/sources` потерял FNS docs link или README anchor"],
    ["Fix order", "сначала восстановить API README FNS anchor, затем `/sources` docs link и Legal approvals"],
    ["Owner", "Legal owner подтверждает approvals, Docs owner подтверждает README anchor, QA owner подтверждает `/sources`"],
    ["No merge", "не мержить, пока FNS docs link снова не проходит rendered route coverage"],
  ],
};

const fnsRealNetworkApprovalApiCopy = {
  apiRoute: "/v1/sources/connectors",
  command: "npm run smoke:fns-real-network-approval-api-copy",
  docsHref:
    "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#fns-real-network-approval-api-copy",
  expectedApprovalCount: 5,
  expectedRouteCount: 16,
  fixturePath: "packages/shared/fns-connector-gate.json",
  noMergeCopy:
    "Не мержить real-network FNS smoke, пока approval_api_copy подтверждает Legal owner, protected secrets, safe INN/OGRN и checksum freshness receipt.",
  ownerRole: "Legal owner + API owner + QA owner",
  repairTargets:
    "packages/shared/fns-connector-gate.json,apps/api/app/services/connectors.py,apps/api/README.md,/sources,apps/web/scripts/fns-real-network-approval-api-copy.mjs",
  sourceMarkerSelector: "[data-testid='fns-real-network-approval-api-copy']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["API copy", "GET `/v1/sources/connectors` отдаёт approval_api_copy внутри network_smoke_gate"],
    ["Blocked", "copy запрещает включать FNS real-network smoke до пяти Legal approvals"],
    ["Owner", "Legal owner подтверждает доступ, API owner держит DTO, QA owner подтверждает `/sources`"],
    ["No merge", "не мержить, пока approval API copy не проходит backend, shared и web smoke"],
  ],
};

const eisRealNetworkApprovalApiCopy = {
  apiRoute: "/v1/sources/connectors",
  command: "npm run smoke:eis-real-network-approval-api-copy",
  docsHref:
    "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#eis-real-network-approval-api-copy",
  expectedApprovalCount: 5,
  expectedRouteCount: 16,
  noMergeCopy:
    "Не мержить real-network EIS smoke, пока approval_api_copy подтверждает Data owner, protected secrets, safe EIS procedure, rate limits и checksum freshness receipt.",
  ownerRole: "Data owner + API owner + QA owner",
  repairTargets:
    "apps/api/app/services/connectors.py,apps/api/README.md,/sources,/plan,apps/web/scripts/eis-real-network-approval-api-copy.mjs",
  sourceMarkerSelector: "[data-testid='eis-real-network-approval-api-copy']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["API copy", "GET `/v1/sources/connectors` отдаёт EIS approval_api_copy внутри network_smoke_gate"],
    ["Blocked", "copy запрещает включать EIS real-network smoke до пяти Data approvals"],
    ["Owner", "Data owner подтверждает доступ и лимиты, API owner держит DTO, QA owner подтверждает `/sources`"],
    ["No merge", "не мержить, пока EIS approval API copy не проходит backend и web smoke"],
  ],
};

const eisRealNetworkApprovalSmokeFailureCopy = {
  apiRoute: "/v1/sources/connectors",
  command: "npm run smoke:eis-real-network-approval-smoke-failure-copy",
  docsHref:
    "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#eis-real-network-approval-api-copy",
  expectedApprovalCount: 5,
  expectedRouteCount: 16,
  failingCommand: "npm run smoke:eis-real-network-approval-api-copy",
  noMergeCopy:
    "Не мержить, пока EIS approval smoke снова подтверждает Data owner, protected secrets, safe EIS procedure, rate limits и checksum freshness receipt.",
  ownerRole: "Data owner + API owner + QA owner",
  parityCommand: "npm run smoke:eis-real-network-approval-api-copy",
  repairTargets:
    "apps/api/app/services/connectors.py,apps/api/README.md,/sources,/plan,apps/web/scripts/eis-real-network-approval-api-copy.mjs",
  sourceMarkerSelector: "[data-testid='eis-real-network-approval-api-copy']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "EIS approval smoke падает: пропал Data owner, approvals, safe procedure или no-merge copy"],
    ["Fix order", "сначала восстановить API network_smoke_gate.approval_api_copy, затем `/sources` и `/plan` markers"],
    ["Owner", "Data owner подтверждает safe EIS procedure и rate limits, API owner подтверждает DTO, QA owner подтверждает smoke"],
    ["No merge", "не мержить, пока EIS approval smoke снова не проходит contract-only gate"],
  ],
};

const ownerReceiptDocsRenderedRouteFailureCopy = {
  apiRoute: "/v1/sources/owner-receipts",
  command: "npm run smoke:owner-receipt-docs-rendered-route-failure-copy",
  docsHref: "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#source-owner-receipt-contract",
  expectedHistoryCount: 4,
  expectedRouteCount: 16,
  failingCommand: "npm run smoke:source-receipt-docs-link -- --url http://127.0.0.1:4177",
  noMergeCopy: "Не мержить, пока rendered routes smoke снова подтверждает owner receipt docs link и browser loop на живом `/sources`",
  ownerRole: "Sources owner + Docs owner + QA owner",
  parityCommand: "npm run smoke:owner-receipts",
  repairTargets:
    "/sources,apps/api/README.md#source-owner-receipt-contract,apps/web/scripts/source-receipt-docs-link-browser.mjs,apps/web/scripts/smoke.mjs",
  sourceMarkerSelector: "[data-testid='source-owner-receipt-history-browser-loop']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "rendered routes проходят, но `/sources` потерял owner receipt docs link или browser loop selector"],
    ["Fix order", "сначала восстановить `/sources` docs link, затем live docs-link assertion и rendered route expectations"],
    ["Owner", "Sources owner подтверждает receipt history, Docs owner подтверждает README anchor, QA owner подтверждает `/sources`"],
    ["No merge", "не мержить, пока owner receipt docs снова не проходят rendered route coverage"],
  ],
};

const webBuildWorkflowFileSmoke = {
  command: "npm run smoke:web-build-workflow",
  expectedCommandCount: 52,
  expectedPathCount: 7,
  nodeVersion: "22",
  smokeCommand: "cd apps/web && npm run smoke:web-build-workflow",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  workingDirectory: "apps/web",
  ciNoteSelectors: [
    "[data-testid='shared-readme-command-ci-note']",
    "[data-testid='ai-review-api-readme-ci-note']",
    "[data-testid='ai-review-queue-rendered-route-failure-copy']",
    "[data-testid='ai-review-receipt-api-rendered-route-failure-copy']",
    "[data-testid='ai-review-receipt-write-api-draft']",
    "[data-testid='ai-review-receipt-write-smoke-failure-copy']",
    "[data-testid='api-readme-live-route-gate-note']",
    "[data-testid='api-readme-live-route-failure-copy']",
    "[data-testid='ai-review-api-readme-failure-copy']",
    "[data-testid='ai-review-api-readme-rendered-route-failure-copy']",
    "[data-testid='api-readme-trigger-smoke']",
    "[data-testid='api-readme-trigger-failure-copy']",
    "[data-testid='api-readme-trigger-rendered-route-failure-copy']",
    "[data-testid='schema-docs-readme-ci-note']",
    "[data-testid='schema-docs-readme-workflow-smoke']",
    "[data-testid='schema-docs-workflow-failure-copy']",
    "[data-testid='schema-docs-readme-live-route-gate-note']",
    "[data-testid='schema-docs-live-route-failure-copy']",
    "[data-testid='schema-docs-readme-failure-copy']",
    "[data-testid='schema-docs-rendered-route-failure-copy']",
    "[data-testid='source-owner-receipts-rendered-route-failure-copy']",
    "[data-testid='owner-receipt-api-rendered-route-failure-copy']",
    "[data-testid='source-owner-receipt-write-api-draft']",
    "[data-testid='source-owner-receipt-write-smoke-failure-copy']",
    "[data-testid='source-owner-receipt-write-docs-failure-copy']",
    "[data-testid='source-freshness-write-api-draft']",
    "[data-testid='source-freshness-write-smoke-failure-copy']",
    "[data-testid='source-freshness-rendered-route-failure-copy']",
    "[data-testid='source-freshness-docs-rendered-route-failure-copy']",
    "[data-testid='fns-approvals-rendered-route-failure-copy']",
    "[data-testid='fns-approvals-docs-rendered-route-failure-copy']",
    "[data-testid='fns-real-network-approval-api-copy']",
    "[data-testid='eis-real-network-approval-api-copy']",
    "[data-testid='eis-real-network-approval-smoke-failure-copy']",
    "[data-testid='owner-receipt-docs-rendered-route-failure-copy']",
    "[data-testid='shared-validation-workflow-ci-note']",
    "[data-testid='shared-validation-workflow-step-smoke']",
    "[data-testid='shared-validation-workflow-failure-copy']",
    "[data-testid='shared-validation-live-route-gate-note']",
    "[data-testid='shared-validation-failure-copy']",
    "[data-testid='shared-validation-rendered-route-failure-copy']",
    "[data-testid='web-build-workflow-self-check-note']",
    "[data-testid='web-build-live-route-gate-note']",
    "[data-testid='web-build-failure-copy']",
    "[data-testid='web-build-rendered-route-failure-copy']",
  ],
  checks: [
    ["Workflow file", "проверяет Web build name, triggers, Node 22 и working-directory"],
    ["Paths", "сверяет 7 trigger paths, включая API README, shared README и сам workflow"],
    ["Commands", "сверяет 52 build/smoke commands, включая live route smoke"],
    ["Plan notes", "требует все CI-note markers на `/plan`, чтобы merge gate был видимым"],
  ],
};

const webBuildWorkflowSelfCheckNote = {
  command: "npm run smoke:web-build-self-check",
  fileSmokeCommand: webBuildWorkflowFileSmoke.command,
  fileSmokeSelector: "[data-testid='web-build-workflow-file-smoke']",
  sourceSmokeCommand: webBuildWorkflowFileSmoke.smokeCommand,
  triggerPath: ".github/workflows/web-build.yml",
  workflowHref: webBuildWorkflowHref,
  workflowName: webBuildWorkflowFileSmoke.workflowName,
  workflowPath: webBuildWorkflowFileSmoke.workflowPath,
  checks: [
    ["Self trigger", ".github/workflows/web-build.yml запускает Web build при изменении workflow"],
    ["File smoke", "Web build сначала запускает smoke:web-build-workflow"],
    ["Self-check step", "Web build затем запускает smoke:web-build-self-check до route smoke"],
    ["Plan marker", "`/plan` показывает, что workflow smoke защищает собственный CI"],
  ],
};

const webBuildLiveRouteGateNote = {
  command: "npm run smoke:web-build-live-route",
  fileSmokeSelector: webBuildWorkflowSelfCheckNote.fileSmokeSelector,
  markerSelector: "[data-testid='web-build-workflow-self-check-note']",
  routeSmokeCommand: "npm run smoke -- --url http://127.0.0.1:4177/",
  sourceSmokeCommand: webBuildWorkflowSelfCheckNote.command,
  triggerPath: webBuildWorkflowSelfCheckNote.triggerPath,
  workflowHref: webBuildWorkflowHref,
  workflowName: webBuildWorkflowSelfCheckNote.workflowName,
  workflowPath: webBuildWorkflowSelfCheckNote.workflowPath,
  checks: [
    ["Static workflow gate", "Web build сверяет workflow file smoke и self-check step"],
    ["Live route gate", "затем route smoke проверяет `/plan` web build markers на живом сервере"],
    ["Plan marker", "web-build-workflow-self-check-note остается источником command и trigger path"],
    ["Merge gate", "workflow drift должен падать до merge и быть понятным в workdesk"],
  ],
};

const webBuildFailureCopy = {
  command: "npm run smoke:web-build-failure-copy",
  failingCommand: webBuildLiveRouteGateNote.command,
  noMergeCopy:
    "Не мержить, пока Web build, `/plan` и .github/workflows/web-build.yml снова не показывают один workflow gate",
  ownerRole: "Frontend owner + CI owner",
  repairTargets: "/plan,.github/workflows/web-build.yml,apps/web/scripts/web-build-workflow-file.mjs,apps/web/scripts/smoke.mjs",
  sourceMarkerSelector: "[data-testid='web-build-live-route-gate-note']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  expectedCommandCount: webBuildWorkflowFileSmoke.expectedCommandCount,
  checks: [
    ["Symptom", "падает Web build workflow smoke, self-check, live route gate или rendered routes smoke"],
    ["Fix order", "сначала восстановить workflow command list, затем `/plan` markers и route smoke expectations"],
    ["Owner", "Frontend owner подтверждает `/plan`, CI owner подтверждает workflow step/order"],
    ["No merge", "не мержить, пока Web build smoke и route smoke снова не зеленые"],
  ],
};

const webBuildRenderedRouteFailureCopy = {
  command: "npm run smoke:web-build-rendered-route-failure-copy",
  expectedRouteCount: 16,
  failingCommand: webBuildLiveRouteGateNote.routeSmokeCommand,
  noMergeCopy: "Не мержить, пока rendered routes smoke снова проходит 16 маршрутов app.site.ru на живом сервере",
  ownerRole: "Frontend owner + QA owner",
  repairTargets: "apps/web/scripts/smoke.mjs,apps/web/app/plan/page.tsx,.github/workflows/web-build.yml,/plan",
  sourceMarkerSelector: "[data-testid='web-build-failure-copy']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "падает финальный rendered routes smoke после поднятия `next start` на 127.0.0.1:4177"],
    ["Fix order", "сначала восстановить route list и HTML markers, затем повторить live smoke на 16 маршрутах"],
    ["Owner", "Frontend owner подтверждает `/plan` и routes, QA owner подтверждает маршрутное покрытие"],
    ["No merge", "не мержить, пока rendered routes smoke снова не зеленый на PR"],
  ],
};

export default function PlanPage() {
  return (
    <main className="app-shell">
      <Sidebar active="plan" />
      <section className="workspace">
        <header className="topline">
          <div>
            <p className="eyebrow">Continuation plan</p>
            <h1>План разработки ASTS</h1>
          </div>
          <a className="primary-link" href="https://github.com/info14fourteen-creator/ASTS/pull/17">
            PR #17
          </a>
        </header>

        <section className="plan-state-grid" aria-label="Текущее состояние">
          {currentState.map(([title, value, note]) => (
            <article className="metric" key={title}>
              <span>{title}</span>
              <strong>{value}</strong>
              <small>{note}</small>
            </article>
          ))}
        </section>

        <section className="panel pr-gates-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">PR gate badges</p>
              <h2>Что держит merge в безопасности</h2>
            </div>
            <span className="status-pill green">PR #17</span>
          </div>
          <div className="pr-gate-grid">
            {prGateBadges.map(([title, badge, text, href, tone]) => (
              <a className={`pr-gate-card ${tone}`} href={href} key={title}>
                <span>{badge}</span>
                <strong>{title}</strong>
                <p>{text}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="panel plan-cycle-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">12-minute loop</p>
              <h2>Как продолжаем без потерь</h2>
            </div>
            <span className="status-pill green">asts-app-site-ru-12</span>
          </div>
          <div className="plan-cycle-grid">
            {cycleRules.map(([title, text]) => (
              <article className="plan-cycle-card" key={title}>
                <strong>{title}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel partner-quickstart-panel"
          data-branch-prefix="codex/"
          data-step-count={partnerQuickstart.length}
          data-testid="partner-quickstart"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Partner quickstart</p>
              <h2>Как второму разработчику начать без риска для main</h2>
            </div>
            <span className="status-pill green">codex/* branch</span>
          </div>
          <div className="partner-access-grid">
            {partnerQuickstart.map(([title, text]) => (
              <article className="partner-access-card" key={title}>
                <strong>{title}</strong>
                <span>{text}</span>
              </article>
            ))}
          </div>
          <div className="partner-prompt">
            <span>Prompt for partner Codex</span>
            <p>
              Подключись к репозиторию ASTS, работай только в своей ветке codex/&lt;short-task-name&gt;, перед PR
              запусти build/smoke и не пушь напрямую в main.
            </p>
          </div>
        </section>

        <section className="panel plan-api-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">API dependency note</p>
              <h2>Почему локальный SKIP не ломает smoke</h2>
            </div>
            <span className="status-pill green">CI pinned deps</span>
          </div>
          <div className="plan-api-grid">
            {apiDependencyNotes.map(([title, text]) => (
              <article className="plan-api-card" key={title}>
                <strong>{title}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel plan-block-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">80-point plan</p>
              <h2>Большие блоки работ</h2>
            </div>
            <span className="status-pill">docs/19</span>
          </div>
          <div className="plan-block-grid">
            {planBlocks.map(([code, title, text, range]) => (
              <article className="plan-block-card" key={code}>
                <span>{code}</span>
                <strong>{title}</strong>
                <p>{text}</p>
                <em>пункты {range}</em>
              </article>
            ))}
          </div>
        </section>

        <section className="panel merge-readiness-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">PR review checklist</p>
              <h2>Что нельзя пропустить перед merge</h2>
            </div>
            <span className="status-pill green">owner approval</span>
          </div>
          <div className="merge-checklist">
            {mergeChecklist.map(([title, text]) => (
              <article className="merge-check" key={title}>
                <strong>{title}</strong>
                <span>{text}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="panel fixture-coverage-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Fixture coverage</p>
              <h2>Что сейчас покрыто demo-data и smoke</h2>
            </div>
            <span className={`status-pill ${fixtureDriftSummary.status === "aligned" ? "green" : "amber"}`}>
              {fixtureDriftSummary.status === "aligned" ? "shared fixture counts" : "fixture drift"}
            </span>
          </div>
          <div className="fixture-coverage-grid">
            {fixtureCoverageCards.map(([title, value, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>{value}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div
            className={`fixture-drift-guard ${fixtureDriftSummary.status}`}
            data-aligned-count={fixtureDriftSummary.aligned}
            data-status={fixtureDriftSummary.status}
            data-testid="fixture-drift-warning"
            data-total-count={fixtureDriftSummary.total}
          >
            <div>
              <p className="eyebrow">Fixture drift guard</p>
              <h3>{fixtureDriftSummary.status === "aligned" ? "Нет дрейфа между smoke и fixture" : "Есть дрейф данных"}</h3>
              <p>
                Если route smoke или UI начнут считать строки иначе, этот блок станет warning до merge и покажет
                конкретный расходящийся count.
              </p>
            </div>
            <div className="fixture-drift-list">
              {fixtureDriftChecks.map((check) => (
                <article
                  className={`fixture-drift-row ${check.status}`}
                  data-actual={check.actual}
                  data-drift-status={check.status}
                  data-expected={check.expected}
                  key={check.label}
                >
                  <span>{check.label}</span>
                  <strong>
                    {check.actual} / {check.expected}
                  </strong>
                  <p>{check.rule}</p>
                </article>
              ))}
            </div>
          </div>
          <div
            className={`fixture-drift-quarantine ${fixtureDriftQuarantineCopy.status}`}
            data-action-count={fixtureDriftQuarantineCopy.steps.length}
            data-evidence={fixtureDriftQuarantineCopy.evidence}
            data-owner={fixtureDriftQuarantineCopy.owner}
            data-status={fixtureDriftQuarantineCopy.status}
            data-testid="fixture-drift-quarantine-copy"
          >
            <div>
              <p className="eyebrow">Fixture drift quarantine copy</p>
              <h3>
                {fixtureDriftQuarantineCopy.status === "standby"
                  ? "Quarantine готов, но не включен"
                  : "Quarantine включен до решения владельца"}
              </h3>
              <p>{fixtureDriftQuarantineCopy.aiGate}</p>
              <p>{fixtureDriftQuarantineCopy.mergeGate}</p>
              <em>{fixtureDriftQuarantineCopy.evidence}</em>
            </div>
            <div className="fixture-drift-quarantine-steps">
              {fixtureDriftQuarantineCopy.steps.map(([title, text]) => (
                <article key={title}>
                  <strong>{title}</strong>
                  <span>{text}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-check-count="14"
          data-docs-href={schemaDocsHref}
          data-schema-count={schemaValidationCards.length}
          data-schema-ids={schemaValidationCards.map(([, schema]) => schema).join(",")}
          data-testid="schema-validation-summary-card"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Schema validation summary</p>
              <h2>Какие fixture schemas уже защищены</h2>
            </div>
            <a
              className="primary-link"
              data-docs-href={schemaDocsHref}
              data-testid="schema-docs-link"
              href={schemaDocsHref}
            >
              Shared schema index
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {schemaValidationCards.map(([title, schema, text]) => (
              <article className="fixture-coverage-card" data-schema-id={schema} key={schema}>
                <span>{title}</span>
                <strong>{schema}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-check-count={sharedValidationBrowserLoop.checkCount}
          data-ci-paths={sharedValidationBrowserLoop.ciPaths.join(",")}
          data-command={sharedValidationBrowserLoop.command}
          data-selector={sharedValidationBrowserLoop.selector}
          data-testid="shared-validation-browser-loop"
          data-workflow={sharedValidationBrowserLoop.workflow}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Shared validation browser loop</p>
              <h2>Как `/plan` закрепляет shared checks</h2>
            </div>
            <span className="status-pill green">{sharedValidationBrowserLoop.checkCount} shared checks</span>
          </div>
          <div className="fixture-coverage-grid">
            {sharedValidationBrowserLoop.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>{title === "Command" ? "npm run validate" : title}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-badge-label={sharedValidationCiBadgeLink.badgeLabel}
          data-browser-loop-selector={sharedValidationCiBadgeLink.browserLoopSelector}
          data-check-count={sharedValidationCiBadgeLink.checkCount}
          data-command={sharedValidationCiBadgeLink.command}
          data-ci-path={sharedValidationCiBadgeLink.ciPath}
          data-pr-gate-href={sharedValidationCiBadgeLink.prGateHref}
          data-testid="shared-validation-ci-badge-link"
          data-workflow-href={sharedValidationCiBadgeLink.workflowHref}
          data-workflow-name={sharedValidationCiBadgeLink.workflowName}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Shared validation CI badge link</p>
              <h2>Как browser loop связан с GitHub Actions</h2>
            </div>
            <a className="primary-link" href={sharedValidationCiBadgeLink.workflowHref}>
              Shared validation workflow
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {sharedValidationCiBadgeLink.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>{sharedValidationCiBadgeLink.workflowName}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-browser-loop-selector={sharedValidationWorkflowFileSmoke.browserLoopSelector}
          data-command={sharedValidationWorkflowFileSmoke.command}
          data-expected-paths={sharedValidationWorkflowFileSmoke.expectedPaths.join(",")}
          data-node-version={sharedValidationWorkflowFileSmoke.nodeVersion}
          data-smoke-command={sharedValidationWorkflowFileSmoke.smokeCommand}
          data-testid="shared-validation-workflow-file-smoke"
          data-workflow-name={sharedValidationWorkflowFileSmoke.workflowName}
          data-workflow-path={sharedValidationWorkflowFileSmoke.workflowPath}
          data-working-directory={sharedValidationWorkflowFileSmoke.workingDirectory}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Shared validation workflow file smoke</p>
              <h2>Как `/plan` сверяет реальный GitHub Actions файл</h2>
            </div>
            <span className="status-pill green">{sharedValidationWorkflowFileSmoke.workflowName}</span>
          </div>
          <div className="fixture-coverage-grid">
            {sharedValidationWorkflowFileSmoke.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>{sharedValidationWorkflowFileSmoke.workflowPath}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-checked-workflow-name={sharedValidationWorkflowCiNote.checkedWorkflowName}
          data-checked-workflow-path={sharedValidationWorkflowCiNote.checkedWorkflowPath}
          data-command={sharedValidationWorkflowCiNote.command}
          data-expected-paths={sharedValidationWorkflowCiNote.expectedPaths.join(",")}
          data-file-smoke-selector={sharedValidationWorkflowCiNote.fileSmokeSelector}
          data-source-smoke-command={sharedValidationWorkflowCiNote.sourceSmokeCommand}
          data-testid="shared-validation-workflow-ci-note"
          data-workflow-href={sharedValidationWorkflowCiNote.workflowHref}
          data-workflow-name={sharedValidationWorkflowCiNote.workflowName}
          data-workflow-path={sharedValidationWorkflowCiNote.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Shared validation workflow CI note</p>
              <h2>Как workflow file smoke входит в Web build</h2>
            </div>
            <a className="primary-link" href={sharedValidationWorkflowCiNote.workflowHref}>
              {sharedValidationWorkflowCiNote.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {sharedValidationWorkflowCiNote.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Checked workflow"
                    ? sharedValidationWorkflowCiNote.checkedWorkflowPath
                    : sharedValidationWorkflowCiNote.command}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-checked-workflow-name={sharedValidationWorkflowStepSmoke.checkedWorkflowName}
          data-checked-workflow-path={sharedValidationWorkflowStepSmoke.checkedWorkflowPath}
          data-command={sharedValidationWorkflowStepSmoke.command}
          data-file-smoke-selector={sharedValidationWorkflowStepSmoke.fileSmokeSelector}
          data-source-ci-note-selector={sharedValidationWorkflowStepSmoke.sourceCiNoteSelector}
          data-source-smoke-command={sharedValidationWorkflowStepSmoke.sourceSmokeCommand}
          data-testid="shared-validation-workflow-step-smoke"
          data-workflow-href={sharedValidationWorkflowStepSmoke.workflowHref}
          data-workflow-name={sharedValidationWorkflowStepSmoke.workflowName}
          data-workflow-path={sharedValidationWorkflowStepSmoke.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Shared validation workflow step smoke</p>
              <h2>Как Shared validation note сверяется с Web build</h2>
            </div>
            <a className="primary-link" href={sharedValidationWorkflowStepSmoke.workflowHref}>
              {sharedValidationWorkflowStepSmoke.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {sharedValidationWorkflowStepSmoke.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Source step"
                    ? sharedValidationWorkflowStepSmoke.checkedWorkflowPath
                    : sharedValidationWorkflowStepSmoke.command}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-checked-workflow-name={sharedValidationWorkflowFailureCopy.checkedWorkflowName}
          data-checked-workflow-path={sharedValidationWorkflowFailureCopy.checkedWorkflowPath}
          data-command={sharedValidationWorkflowFailureCopy.command}
          data-failing-command={sharedValidationWorkflowFailureCopy.failingCommand}
          data-no-merge-copy={sharedValidationWorkflowFailureCopy.noMergeCopy}
          data-owner-role={sharedValidationWorkflowFailureCopy.ownerRole}
          data-repair-targets={sharedValidationWorkflowFailureCopy.repairTargets}
          data-source-marker-selector={sharedValidationWorkflowFailureCopy.sourceMarkerSelector}
          data-testid="shared-validation-workflow-failure-copy"
          data-workflow-href={sharedValidationWorkflowFailureCopy.workflowHref}
          data-workflow-name={sharedValidationWorkflowFailureCopy.workflowName}
          data-workflow-path={sharedValidationWorkflowFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Shared validation workflow failure copy</p>
              <h2>Что делать, если shared validation workflow упал</h2>
            </div>
            <a className="primary-link" href={sharedValidationWorkflowFailureCopy.workflowHref}>
              {sharedValidationWorkflowFailureCopy.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {sharedValidationWorkflowFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? sharedValidationWorkflowFailureCopy.noMergeCopy
                    : sharedValidationWorkflowFailureCopy.checkedWorkflowPath}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-browser-loop-selector={sharedValidationLiveRouteGateNote.browserLoopSelector}
          data-checked-workflow-path={sharedValidationLiveRouteGateNote.checkedWorkflowPath}
          data-check-count={sharedValidationLiveRouteGateNote.checkCount}
          data-command={sharedValidationLiveRouteGateNote.command}
          data-marker-selector={sharedValidationLiveRouteGateNote.markerSelector}
          data-route-smoke-command={sharedValidationLiveRouteGateNote.routeSmokeCommand}
          data-source-smoke-command={sharedValidationLiveRouteGateNote.sourceSmokeCommand}
          data-testid="shared-validation-live-route-gate-note"
          data-workflow-href={sharedValidationLiveRouteGateNote.workflowHref}
          data-workflow-name={sharedValidationLiveRouteGateNote.workflowName}
          data-workflow-path={sharedValidationLiveRouteGateNote.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Shared validation live route gate note</p>
              <h2>Как live route smoke защищает shared validation</h2>
            </div>
            <a className="primary-link" href={sharedValidationLiveRouteGateNote.workflowHref}>
              {sharedValidationLiveRouteGateNote.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {sharedValidationLiveRouteGateNote.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Live route gate"
                    ? sharedValidationLiveRouteGateNote.routeSmokeCommand
                    : sharedValidationLiveRouteGateNote.checkedWorkflowPath}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-checked-workflow-path={sharedValidationFailureCopy.checkedWorkflowPath}
          data-check-count={sharedValidationFailureCopy.checkCount}
          data-command={sharedValidationFailureCopy.command}
          data-failing-command={sharedValidationFailureCopy.failingCommand}
          data-no-merge-copy={sharedValidationFailureCopy.noMergeCopy}
          data-owner-role={sharedValidationFailureCopy.ownerRole}
          data-repair-targets={sharedValidationFailureCopy.repairTargets}
          data-source-marker-selector={sharedValidationFailureCopy.sourceMarkerSelector}
          data-testid="shared-validation-failure-copy"
          data-workflow-href={sharedValidationFailureCopy.workflowHref}
          data-workflow-name={sharedValidationFailureCopy.workflowName}
          data-workflow-path={sharedValidationFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Shared validation failure copy</p>
              <h2>Что делать, если shared validation drift упал</h2>
            </div>
            <a className="primary-link" href={sharedValidationFailureCopy.workflowHref}>
              {sharedValidationFailureCopy.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {sharedValidationFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>{title === "No merge" ? sharedValidationFailureCopy.noMergeCopy : sharedValidationFailureCopy.command}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-check-count={sharedValidationRenderedRouteFailureCopy.checkCount}
          data-command={sharedValidationRenderedRouteFailureCopy.command}
          data-expected-route-count={sharedValidationRenderedRouteFailureCopy.expectedRouteCount}
          data-failing-command={sharedValidationRenderedRouteFailureCopy.failingCommand}
          data-no-merge-copy={sharedValidationRenderedRouteFailureCopy.noMergeCopy}
          data-owner-role={sharedValidationRenderedRouteFailureCopy.ownerRole}
          data-repair-targets={sharedValidationRenderedRouteFailureCopy.repairTargets}
          data-source-marker-selector={sharedValidationRenderedRouteFailureCopy.sourceMarkerSelector}
          data-testid="shared-validation-rendered-route-failure-copy"
          data-workflow-href={sharedValidationRenderedRouteFailureCopy.workflowHref}
          data-workflow-name={sharedValidationRenderedRouteFailureCopy.workflowName}
          data-workflow-path={sharedValidationRenderedRouteFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Shared validation rendered-route failure copy</p>
              <h2>Что делать, если shared validation пропала в rendered routes</h2>
            </div>
            <a className="primary-link" href={sharedValidationRenderedRouteFailureCopy.workflowHref}>
              {sharedValidationRenderedRouteFailureCopy.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {sharedValidationRenderedRouteFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? sharedValidationRenderedRouteFailureCopy.noMergeCopy
                    : sharedValidationRenderedRouteFailureCopy.failingCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-command-count={fixtureSchemaChecklistSmoke.commands.length}
          data-commands={fixtureSchemaChecklistSmoke.commands.join(" | ")}
          data-readme-anchor={fixtureSchemaChecklistSmoke.readmeAnchor}
          data-readme-path={fixtureSchemaChecklistSmoke.readmePath}
          data-schema-count={fixtureSchemaChecklistSmoke.schemaIds.length}
          data-schema-ids={fixtureSchemaChecklistSmoke.schemaIds.join(",")}
          data-testid="fixture-schema-checklist-smoke"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Fixture schema checklist smoke</p>
              <h2>Что `/plan` сверяет с shared README</h2>
            </div>
            <span className="status-pill green">{fixtureSchemaChecklistSmoke.schemaIds.length} schema ids</span>
          </div>
          <div className="fixture-coverage-grid">
            {fixtureSchemaChecklistSmoke.schemaIds.map((schemaId, index) => (
              <article className="fixture-coverage-card" data-schema-id={schemaId} key={schemaId}>
                <span>{fixtureSchemaChecklistSmoke.surfaces[index][0]}</span>
                <strong>{schemaId}</strong>
                <p>{fixtureSchemaChecklistSmoke.surfaces[index][1]}</p>
              </article>
            ))}
          </div>
          <div className="plan-next-list">
            {fixtureSchemaChecklistSmoke.commands.map((command, index) => (
              <article className="plan-next-row" data-command={command} key={command}>
                <span>{index + 1}</span>
                <strong>{command}</strong>
                <p>{fixtureSchemaChecklistSmoke.readmeAnchor}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-checklist-selector={sharedReadmeCommandParitySmoke.checklistSelector}
          data-command-count={sharedReadmeCommandParitySmoke.commandCount}
          data-commands={sharedReadmeCommandParitySmoke.commands.join(" | ")}
          data-readme-path={sharedReadmeCommandParitySmoke.readmePath}
          data-smoke-command={sharedReadmeCommandParitySmoke.smokeCommand}
          data-testid="shared-readme-command-parity-smoke"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Shared README command parity smoke</p>
              <h2>Как `/plan` сверяет команды с shared README</h2>
            </div>
            <span className="status-pill green">{sharedReadmeCommandParitySmoke.commandCount} commands</span>
          </div>
          <div className="fixture-coverage-grid">
            {sharedReadmeCommandParitySmoke.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>{sharedReadmeCommandParitySmoke.readmePath}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-build-command={sharedReadmeCommandCiNote.buildCommand}
          data-command={sharedReadmeCommandCiNote.command}
          data-parity-selector={sharedReadmeCommandCiNote.paritySelector}
          data-readme-path={sharedReadmeCommandCiNote.readmePath}
          data-smoke-command={sharedReadmeCommandCiNote.smokeCommand}
          data-testid="shared-readme-command-ci-note"
          data-trigger-path={sharedReadmeCommandCiNote.triggerPath}
          data-workflow-href={sharedReadmeCommandCiNote.workflowHref}
          data-workflow-name={sharedReadmeCommandCiNote.workflowName}
          data-workflow-path={sharedReadmeCommandCiNote.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Shared README command CI note</p>
              <h2>Как command parity smoke входит в Web build</h2>
            </div>
            <a className="primary-link" href={sharedReadmeCommandCiNote.workflowHref}>
              {sharedReadmeCommandCiNote.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {sharedReadmeCommandCiNote.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>{title === "Trigger path" ? sharedReadmeCommandCiNote.triggerPath : sharedReadmeCommandCiNote.command}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-href={aiReviewSchemaApiSmokeMarker.apiHref}
          data-api-readme-anchor={aiReviewSchemaApiSmokeMarker.apiReadmeAnchor}
          data-api-readme-path={aiReviewSchemaApiSmokeMarker.apiReadmePath}
          data-api-route={aiReviewSchemaApiSmokeMarker.apiRoute}
          data-api-selector={aiReviewSchemaApiSmokeMarker.apiSelector}
          data-check-count={aiReviewSchemaApiSmokeMarker.checkCount}
          data-dom-parity-command={aiReviewSchemaApiSmokeMarker.domParityCommand}
          data-parity-command={aiReviewSchemaApiSmokeMarker.parityCommand}
          data-protected-surface={aiReviewSchemaApiSmokeMarker.protectedSurface}
          data-schema-id={aiReviewSchemaApiSmokeMarker.schemaId}
          data-schema-selector={aiReviewSchemaApiSmokeMarker.schemaSelector}
          data-source-fixture={aiReviewSchemaApiSmokeMarker.sourceFixture}
          data-testid="ai-review-schema-api-smoke-marker"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI review schema API smoke marker</p>
              <h2>Как schema summary связан с backend contract</h2>
            </div>
            <a className="primary-link" href={aiReviewSchemaApiSmokeMarker.apiHref}>
              API review queue contract
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {aiReviewSchemaApiSmokeMarker.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>{title === "Schema" ? aiReviewSchemaApiSmokeMarker.schemaId : aiReviewSchemaApiSmokeMarker.apiRoute}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-readme-path={aiReviewApiReadmeCiNote.apiReadmePath}
          data-api-route={aiReviewApiReadmeCiNote.apiRoute}
          data-api-selector={aiReviewApiReadmeCiNote.apiSelector}
          data-dom-parity-command={aiReviewApiReadmeCiNote.domParityCommand}
          data-marker-selector={aiReviewApiReadmeCiNote.markerSelector}
          data-smoke-command={aiReviewApiReadmeCiNote.smokeCommand}
          data-testid="ai-review-api-readme-ci-note"
          data-trigger-path={aiReviewApiReadmeCiNote.triggerPath}
          data-workflow-href={aiReviewApiReadmeCiNote.workflowHref}
          data-workflow-name={aiReviewApiReadmeCiNote.workflowName}
          data-workflow-path={aiReviewApiReadmeCiNote.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI review API README CI note</p>
              <h2>Как DOM parity smoke входит в Web build</h2>
            </div>
            <a className="primary-link" href={aiReviewApiReadmeCiNote.workflowHref}>
              {aiReviewApiReadmeCiNote.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {aiReviewApiReadmeCiNote.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>{title === "Trigger path" ? aiReviewApiReadmeCiNote.triggerPath : aiReviewApiReadmeCiNote.apiRoute}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-command={apiReadmeLiveRouteGateNote.command}
          data-live-command={apiReadmeLiveRouteGateNote.liveCommand}
          data-marker-selector={apiReadmeLiveRouteGateNote.markerSelector}
          data-route-smoke-command={apiReadmeLiveRouteGateNote.routeSmokeCommand}
          data-source-smoke-command={apiReadmeLiveRouteGateNote.sourceSmokeCommand}
          data-testid="api-readme-live-route-gate-note"
          data-workflow-href={apiReadmeLiveRouteGateNote.workflowHref}
          data-workflow-name={apiReadmeLiveRouteGateNote.workflowName}
          data-workflow-path={apiReadmeLiveRouteGateNote.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">API README live route gate note</p>
              <h2>Как live DOM parity защищает API docs links</h2>
            </div>
            <a className="primary-link" href={apiReadmeLiveRouteGateNote.workflowHref}>
              {apiReadmeLiveRouteGateNote.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {apiReadmeLiveRouteGateNote.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>{title === "Route smoke" ? apiReadmeLiveRouteGateNote.routeSmokeCommand : apiReadmeLiveRouteGateNote.liveCommand}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-command={apiReadmeLiveRouteFailureCopy.command}
          data-failing-command={apiReadmeLiveRouteFailureCopy.failingCommand}
          data-live-command={apiReadmeLiveRouteFailureCopy.liveCommand}
          data-no-merge-copy={apiReadmeLiveRouteFailureCopy.noMergeCopy}
          data-owner-role={apiReadmeLiveRouteFailureCopy.ownerRole}
          data-repair-targets={apiReadmeLiveRouteFailureCopy.repairTargets}
          data-source-marker-selector={apiReadmeLiveRouteFailureCopy.sourceMarkerSelector}
          data-testid="api-readme-live-route-failure-copy"
          data-workflow-href={apiReadmeLiveRouteFailureCopy.workflowHref}
          data-workflow-name={apiReadmeLiveRouteFailureCopy.workflowName}
          data-workflow-path={apiReadmeLiveRouteFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">API README live-route failure copy</p>
              <h2>Что делать, если API README live-route gate упал</h2>
            </div>
            <a className="primary-link" href={apiReadmeLiveRouteFailureCopy.workflowHref}>
              {apiReadmeLiveRouteFailureCopy.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {apiReadmeLiveRouteFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge" ? apiReadmeLiveRouteFailureCopy.noMergeCopy : apiReadmeLiveRouteFailureCopy.failingCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-command={apiReadmeFailureCopy.command}
          data-failing-command={apiReadmeFailureCopy.failingCommand}
          data-live-gate-selector={apiReadmeFailureCopy.liveGateSelector}
          data-marker-selector={apiReadmeFailureCopy.markerSelector}
          data-no-merge-copy={apiReadmeFailureCopy.noMergeCopy}
          data-owner-role={apiReadmeFailureCopy.ownerRole}
          data-repair-targets={apiReadmeFailureCopy.repairTargets.join(",")}
          data-testid="ai-review-api-readme-failure-copy"
          data-workflow-href={apiReadmeFailureCopy.workflowHref}
          data-workflow-name={apiReadmeFailureCopy.workflowName}
          data-workflow-path={apiReadmeFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI review API README failure copy</p>
              <h2>Что делать, если API README parity падает</h2>
            </div>
            <a className="primary-link" href={apiReadmeFailureCopy.workflowHref}>
              {apiReadmeFailureCopy.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {apiReadmeFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>{title === "No merge" ? apiReadmeFailureCopy.noMergeCopy : apiReadmeFailureCopy.failingCommand}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-selector={aiReviewApiReadmeRenderedRouteFailureCopy.apiSelector}
          data-command={aiReviewApiReadmeRenderedRouteFailureCopy.command}
          data-expected-route-count={aiReviewApiReadmeRenderedRouteFailureCopy.expectedRouteCount}
          data-failing-command={aiReviewApiReadmeRenderedRouteFailureCopy.failingCommand}
          data-live-gate-selector={aiReviewApiReadmeRenderedRouteFailureCopy.liveGateSelector}
          data-marker-selector={aiReviewApiReadmeRenderedRouteFailureCopy.markerSelector}
          data-no-merge-copy={aiReviewApiReadmeRenderedRouteFailureCopy.noMergeCopy}
          data-owner-role={aiReviewApiReadmeRenderedRouteFailureCopy.ownerRole}
          data-repair-targets={aiReviewApiReadmeRenderedRouteFailureCopy.repairTargets}
          data-testid="ai-review-api-readme-rendered-route-failure-copy"
          data-workflow-href={aiReviewApiReadmeRenderedRouteFailureCopy.workflowHref}
          data-workflow-name={aiReviewApiReadmeRenderedRouteFailureCopy.workflowName}
          data-workflow-path={aiReviewApiReadmeRenderedRouteFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI review API README rendered-route failure copy</p>
              <h2>Что делать, если AI review API README parity упала в rendered routes</h2>
            </div>
            <a className="primary-link" href={aiReviewApiReadmeRenderedRouteFailureCopy.workflowHref}>
              {aiReviewApiReadmeRenderedRouteFailureCopy.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {aiReviewApiReadmeRenderedRouteFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? aiReviewApiReadmeRenderedRouteFailureCopy.noMergeCopy
                    : aiReviewApiReadmeRenderedRouteFailureCopy.failingCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={aiReviewQueueRenderedRouteFailureCopy.apiRoute}
          data-command={aiReviewQueueRenderedRouteFailureCopy.command}
          data-expected-blocked-count={aiReviewQueueRenderedRouteFailureCopy.expectedBlockedCount}
          data-expected-queue-count={aiReviewQueueRenderedRouteFailureCopy.expectedQueueCount}
          data-expected-route-count={aiReviewQueueRenderedRouteFailureCopy.expectedRouteCount}
          data-failing-command={aiReviewQueueRenderedRouteFailureCopy.failingCommand}
          data-no-merge-copy={aiReviewQueueRenderedRouteFailureCopy.noMergeCopy}
          data-owner-role={aiReviewQueueRenderedRouteFailureCopy.ownerRole}
          data-parity-command={aiReviewQueueRenderedRouteFailureCopy.parityCommand}
          data-repair-targets={aiReviewQueueRenderedRouteFailureCopy.repairTargets}
          data-source-marker-selector={aiReviewQueueRenderedRouteFailureCopy.sourceMarkerSelector}
          data-testid="ai-review-queue-rendered-route-failure-copy"
          data-workflow-href={aiReviewQueueRenderedRouteFailureCopy.workflowHref}
          data-workflow-name={aiReviewQueueRenderedRouteFailureCopy.workflowName}
          data-workflow-path={aiReviewQueueRenderedRouteFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI review queue rendered-route failure copy</p>
              <h2>Что делать, если AI review queue пропала в rendered routes</h2>
            </div>
            <a className="primary-link" href={aiReviewQueueRenderedRouteFailureCopy.workflowHref}>
              {aiReviewQueueRenderedRouteFailureCopy.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {aiReviewQueueRenderedRouteFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? aiReviewQueueRenderedRouteFailureCopy.noMergeCopy
                    : aiReviewQueueRenderedRouteFailureCopy.apiRoute}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={aiReviewReceiptApiRenderedRouteFailureCopy.apiRoute}
          data-api-service-path={aiReviewReceiptApiRenderedRouteFailureCopy.apiServicePath}
          data-command={aiReviewReceiptApiRenderedRouteFailureCopy.command}
          data-docs-href={aiReviewReceiptApiRenderedRouteFailureCopy.docsHref}
          data-expected-blocked-count={aiReviewReceiptApiRenderedRouteFailureCopy.expectedBlockedCount}
          data-expected-owner-count={aiReviewReceiptApiRenderedRouteFailureCopy.expectedOwnerCount}
          data-expected-queue-count={aiReviewReceiptApiRenderedRouteFailureCopy.expectedQueueCount}
          data-expected-route-count={aiReviewReceiptApiRenderedRouteFailureCopy.expectedRouteCount}
          data-failing-command={aiReviewReceiptApiRenderedRouteFailureCopy.failingCommand}
          data-no-merge-copy={aiReviewReceiptApiRenderedRouteFailureCopy.noMergeCopy}
          data-owner-role={aiReviewReceiptApiRenderedRouteFailureCopy.ownerRole}
          data-parity-command={aiReviewReceiptApiRenderedRouteFailureCopy.parityCommand}
          data-repair-targets={aiReviewReceiptApiRenderedRouteFailureCopy.repairTargets}
          data-source-marker-selector={aiReviewReceiptApiRenderedRouteFailureCopy.sourceMarkerSelector}
          data-testid="ai-review-receipt-api-rendered-route-failure-copy"
          data-workflow-href={aiReviewReceiptApiRenderedRouteFailureCopy.workflowHref}
          data-workflow-name={aiReviewReceiptApiRenderedRouteFailureCopy.workflowName}
          data-workflow-path={aiReviewReceiptApiRenderedRouteFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI review receipt API rendered-route failure copy</p>
              <h2>Что делать, если AI review receipt API пропал в rendered routes</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={aiReviewReceiptApiRenderedRouteFailureCopy.workflowHref}>
                {aiReviewReceiptApiRenderedRouteFailureCopy.workflowName}
              </a>
              <a className="primary-link" href={aiReviewReceiptApiRenderedRouteFailureCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {aiReviewReceiptApiRenderedRouteFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? aiReviewReceiptApiRenderedRouteFailureCopy.noMergeCopy
                    : aiReviewReceiptApiRenderedRouteFailureCopy.apiRoute}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={aiReviewReceiptWriteApiDraft.apiRoute}
          data-command={aiReviewReceiptWriteApiDraft.command}
          data-docs-href={aiReviewReceiptWriteApiDraft.docsHref}
          data-expected-queue-count={aiReviewReceiptWriteApiDraft.expectedQueueCount}
          data-expected-request-field-count={aiReviewReceiptWriteApiDraft.expectedRequestFieldCount}
          data-expected-route-count={aiReviewReceiptWriteApiDraft.expectedRouteCount}
          data-fixture-path={aiReviewReceiptWriteApiDraft.fixturePath}
          data-method={aiReviewReceiptWriteApiDraft.method}
          data-no-merge-copy={aiReviewReceiptWriteApiDraft.noMergeCopy}
          data-owner-role={aiReviewReceiptWriteApiDraft.ownerRole}
          data-repair-targets={aiReviewReceiptWriteApiDraft.repairTargets}
          data-source-marker-selector={aiReviewReceiptWriteApiDraft.sourceMarkerSelector}
          data-status={aiReviewReceiptWriteApiDraft.status}
          data-testid="ai-review-receipt-write-api-draft"
          data-workflow-href={aiReviewReceiptWriteApiDraft.workflowHref}
          data-workflow-name={aiReviewReceiptWriteApiDraft.workflowName}
          data-workflow-path={aiReviewReceiptWriteApiDraft.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI review receipt write API draft</p>
              <h2>Как будущий POST сохранит AI review receipt без потери audit</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={aiReviewReceiptWriteApiDraft.workflowHref}>
                {aiReviewReceiptWriteApiDraft.workflowName}
              </a>
              <a className="primary-link" href={aiReviewReceiptWriteApiDraft.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {aiReviewReceiptWriteApiDraft.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge" ? aiReviewReceiptWriteApiDraft.noMergeCopy : aiReviewReceiptWriteApiDraft.apiRoute}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={aiReviewReceiptWriteSmokeFailureCopy.apiRoute}
          data-command={aiReviewReceiptWriteSmokeFailureCopy.command}
          data-docs-href={aiReviewReceiptWriteSmokeFailureCopy.docsHref}
          data-expected-queue-count={aiReviewReceiptWriteSmokeFailureCopy.expectedQueueCount}
          data-expected-request-field-count={aiReviewReceiptWriteSmokeFailureCopy.expectedRequestFieldCount}
          data-expected-route-count={aiReviewReceiptWriteSmokeFailureCopy.expectedRouteCount}
          data-failing-command={aiReviewReceiptWriteSmokeFailureCopy.failingCommand}
          data-no-merge-copy={aiReviewReceiptWriteSmokeFailureCopy.noMergeCopy}
          data-owner-role={aiReviewReceiptWriteSmokeFailureCopy.ownerRole}
          data-parity-command={aiReviewReceiptWriteSmokeFailureCopy.parityCommand}
          data-repair-targets={aiReviewReceiptWriteSmokeFailureCopy.repairTargets}
          data-source-marker-selector={aiReviewReceiptWriteSmokeFailureCopy.sourceMarkerSelector}
          data-testid="ai-review-receipt-write-smoke-failure-copy"
          data-workflow-href={aiReviewReceiptWriteSmokeFailureCopy.workflowHref}
          data-workflow-name={aiReviewReceiptWriteSmokeFailureCopy.workflowName}
          data-workflow-path={aiReviewReceiptWriteSmokeFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI review receipt write smoke failure copy</p>
              <h2>Что делать, если AI write draft smoke упал</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={aiReviewReceiptWriteSmokeFailureCopy.workflowHref}>
                {aiReviewReceiptWriteSmokeFailureCopy.workflowName}
              </a>
              <a className="primary-link" href={aiReviewReceiptWriteSmokeFailureCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {aiReviewReceiptWriteSmokeFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? aiReviewReceiptWriteSmokeFailureCopy.noMergeCopy
                    : aiReviewReceiptWriteSmokeFailureCopy.failingCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-command={apiReadmeTriggerSmoke.command}
          data-dom-parity-command={apiReadmeTriggerSmoke.domParityCommand}
          data-expected-workflow-path-count={apiReadmeTriggerSmoke.expectedWorkflowPathCount}
          data-source-ci-note-selector={apiReadmeTriggerSmoke.sourceCiNoteSelector}
          data-testid="api-readme-trigger-smoke"
          data-trigger-path={apiReadmeTriggerSmoke.triggerPath}
          data-workflow-href={apiReadmeTriggerSmoke.workflowHref}
          data-workflow-name={apiReadmeTriggerSmoke.workflowName}
          data-workflow-path={apiReadmeTriggerSmoke.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">API README trigger smoke</p>
              <h2>Как backend README запускает web parity</h2>
            </div>
            <a className="primary-link" href={apiReadmeTriggerSmoke.workflowHref}>
              {apiReadmeTriggerSmoke.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {apiReadmeTriggerSmoke.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>{title === "Trigger path" ? apiReadmeTriggerSmoke.triggerPath : apiReadmeTriggerSmoke.command}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-command={apiReadmeTriggerFailureCopy.command}
          data-expected-workflow-path-count={apiReadmeTriggerFailureCopy.expectedWorkflowPathCount}
          data-failing-command={apiReadmeTriggerFailureCopy.failingCommand}
          data-no-merge-copy={apiReadmeTriggerFailureCopy.noMergeCopy}
          data-owner-role={apiReadmeTriggerFailureCopy.ownerRole}
          data-repair-targets={apiReadmeTriggerFailureCopy.repairTargets}
          data-source-marker-selector={apiReadmeTriggerFailureCopy.sourceMarkerSelector}
          data-testid="api-readme-trigger-failure-copy"
          data-trigger-path={apiReadmeTriggerFailureCopy.triggerPath}
          data-workflow-href={apiReadmeTriggerFailureCopy.workflowHref}
          data-workflow-name={apiReadmeTriggerFailureCopy.workflowName}
          data-workflow-path={apiReadmeTriggerFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">API README trigger failure copy</p>
              <h2>Что делать, если backend README trigger упал</h2>
            </div>
            <a className="primary-link" href={apiReadmeTriggerFailureCopy.workflowHref}>
              {apiReadmeTriggerFailureCopy.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {apiReadmeTriggerFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>{title === "No merge" ? apiReadmeTriggerFailureCopy.noMergeCopy : apiReadmeTriggerFailureCopy.triggerPath}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-command={apiReadmeTriggerRenderedRouteFailureCopy.command}
          data-dom-parity-command={apiReadmeTriggerRenderedRouteFailureCopy.domParityCommand}
          data-expected-route-count={apiReadmeTriggerRenderedRouteFailureCopy.expectedRouteCount}
          data-expected-workflow-path-count={apiReadmeTriggerRenderedRouteFailureCopy.expectedWorkflowPathCount}
          data-failing-command={apiReadmeTriggerRenderedRouteFailureCopy.failingCommand}
          data-no-merge-copy={apiReadmeTriggerRenderedRouteFailureCopy.noMergeCopy}
          data-owner-role={apiReadmeTriggerRenderedRouteFailureCopy.ownerRole}
          data-repair-targets={apiReadmeTriggerRenderedRouteFailureCopy.repairTargets}
          data-source-marker-selector={apiReadmeTriggerRenderedRouteFailureCopy.sourceMarkerSelector}
          data-testid="api-readme-trigger-rendered-route-failure-copy"
          data-trigger-path={apiReadmeTriggerRenderedRouteFailureCopy.triggerPath}
          data-workflow-href={apiReadmeTriggerRenderedRouteFailureCopy.workflowHref}
          data-workflow-name={apiReadmeTriggerRenderedRouteFailureCopy.workflowName}
          data-workflow-path={apiReadmeTriggerRenderedRouteFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">API README trigger rendered-route failure copy</p>
              <h2>Что делать, если API README trigger chain пропала в rendered routes</h2>
            </div>
            <a className="primary-link" href={apiReadmeTriggerRenderedRouteFailureCopy.workflowHref}>
              {apiReadmeTriggerRenderedRouteFailureCopy.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {apiReadmeTriggerRenderedRouteFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? apiReadmeTriggerRenderedRouteFailureCopy.noMergeCopy
                    : apiReadmeTriggerRenderedRouteFailureCopy.triggerPath}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-anchor={schemaDocsLinkParitySmoke.anchor}
          data-anchor-slug={schemaDocsLinkParitySmoke.anchorSlug}
          data-checklist-schema-count={schemaDocsLinkParitySmoke.expectedChecklistSchemaCount}
          data-checklist-selector={schemaDocsLinkParitySmoke.checklistSelector}
          data-docs-href={schemaDocsLinkParitySmoke.docsHref}
          data-link-selector={schemaDocsLinkParitySmoke.linkSelector}
          data-readme-heading={schemaDocsLinkParitySmoke.readmeHeading}
          data-readme-path={schemaDocsLinkParitySmoke.readmePath}
          data-schema-count={schemaDocsLinkParitySmoke.expectedSchemaCount}
          data-testid="schema-docs-link-parity-smoke"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Schema docs link parity smoke</p>
              <h2>Как `/plan` сверяет ссылку на shared README</h2>
            </div>
            <a className="primary-link" href={schemaDocsLinkParitySmoke.docsHref}>
              Shared schema README
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {schemaDocsLinkParitySmoke.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>{schemaDocsLinkParitySmoke.anchor}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-anchor={schemaDocsReadmeExistenceSmoke.anchor}
          data-anchor-slug={schemaDocsReadmeExistenceSmoke.anchorSlug}
          data-expected-rows={schemaDocsReadmeExistenceSmoke.expectedRows}
          data-link-selector={schemaDocsReadmeExistenceSmoke.linkSelector}
          data-readme-heading={schemaDocsReadmeExistenceSmoke.readmeHeading}
          data-readme-path={schemaDocsReadmeExistenceSmoke.readmePath}
          data-smoke-command={schemaDocsReadmeExistenceSmoke.smokeCommand}
          data-testid="schema-docs-readme-existence-smoke"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Schema docs README existence smoke</p>
              <h2>Как `/plan` проверяет существование shared schema index</h2>
            </div>
            <span className="status-pill green">{schemaDocsReadmeExistenceSmoke.expectedRows} rows</span>
          </div>
          <div className="fixture-coverage-grid">
            {schemaDocsReadmeExistenceSmoke.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>{schemaDocsReadmeExistenceSmoke.readmePath}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-docs-href={schemaDocsReadmeCiNote.docsHref}
          data-expected-rows={schemaDocsReadmeCiNote.expectedRows}
          data-link-selector={schemaDocsReadmeCiNote.linkSelector}
          data-readme-heading={schemaDocsReadmeCiNote.readmeHeading}
          data-readme-path={schemaDocsReadmeCiNote.readmePath}
          data-smoke-command={schemaDocsReadmeCiNote.smokeCommand}
          data-source-smoke-command={schemaDocsReadmeCiNote.sourceSmokeCommand}
          data-testid="schema-docs-readme-ci-note"
          data-trigger-path={schemaDocsReadmeCiNote.triggerPath}
          data-workflow-href={schemaDocsReadmeCiNote.workflowHref}
          data-workflow-name={schemaDocsReadmeCiNote.workflowName}
          data-workflow-path={schemaDocsReadmeCiNote.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Schema docs README CI note</p>
              <h2>Как README existence smoke входит в Web build</h2>
            </div>
            <a className="primary-link" href={schemaDocsReadmeCiNote.workflowHref}>
              {schemaDocsReadmeCiNote.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {schemaDocsReadmeCiNote.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>{title === "Trigger path" ? schemaDocsReadmeCiNote.triggerPath : schemaDocsReadmeCiNote.readmePath}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-command={schemaDocsReadmeWorkflowSmoke.command}
          data-expected-workflow-path-count={schemaDocsReadmeWorkflowSmoke.expectedWorkflowPathCount}
          data-readme-path={schemaDocsReadmeWorkflowSmoke.readmePath}
          data-source-ci-note-selector={schemaDocsReadmeWorkflowSmoke.sourceCiNoteSelector}
          data-source-smoke-command={schemaDocsReadmeWorkflowSmoke.sourceSmokeCommand}
          data-testid="schema-docs-readme-workflow-smoke"
          data-trigger-path={schemaDocsReadmeWorkflowSmoke.triggerPath}
          data-workflow-href={schemaDocsReadmeWorkflowSmoke.workflowHref}
          data-workflow-name={schemaDocsReadmeWorkflowSmoke.workflowName}
          data-workflow-path={schemaDocsReadmeWorkflowSmoke.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Schema docs README workflow smoke</p>
              <h2>Как schema docs note сверяется с Web build</h2>
            </div>
            <a className="primary-link" href={schemaDocsReadmeWorkflowSmoke.workflowHref}>
              {schemaDocsReadmeWorkflowSmoke.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {schemaDocsReadmeWorkflowSmoke.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Trigger path" ? schemaDocsReadmeWorkflowSmoke.triggerPath : schemaDocsReadmeWorkflowSmoke.command}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-command={schemaDocsWorkflowFailureCopy.command}
          data-expected-workflow-path-count={schemaDocsWorkflowFailureCopy.expectedWorkflowPathCount}
          data-failing-command={schemaDocsWorkflowFailureCopy.failingCommand}
          data-no-merge-copy={schemaDocsWorkflowFailureCopy.noMergeCopy}
          data-owner-role={schemaDocsWorkflowFailureCopy.ownerRole}
          data-readme-path={schemaDocsWorkflowFailureCopy.readmePath}
          data-repair-targets={schemaDocsWorkflowFailureCopy.repairTargets}
          data-source-marker-selector={schemaDocsWorkflowFailureCopy.sourceMarkerSelector}
          data-testid="schema-docs-workflow-failure-copy"
          data-trigger-path={schemaDocsWorkflowFailureCopy.triggerPath}
          data-workflow-href={schemaDocsWorkflowFailureCopy.workflowHref}
          data-workflow-name={schemaDocsWorkflowFailureCopy.workflowName}
          data-workflow-path={schemaDocsWorkflowFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Schema docs workflow failure copy</p>
              <h2>Что делать, если schema docs workflow упал</h2>
            </div>
            <a className="primary-link" href={schemaDocsWorkflowFailureCopy.workflowHref}>
              {schemaDocsWorkflowFailureCopy.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {schemaDocsWorkflowFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>{title === "No merge" ? schemaDocsWorkflowFailureCopy.noMergeCopy : schemaDocsWorkflowFailureCopy.readmePath}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-command={schemaDocsReadmeLiveRouteGateNote.command}
          data-link-selector={schemaDocsReadmeLiveRouteGateNote.linkSelector}
          data-marker-selector={schemaDocsReadmeLiveRouteGateNote.markerSelector}
          data-readme-command={schemaDocsReadmeLiveRouteGateNote.readmeCommand}
          data-readme-path={schemaDocsReadmeLiveRouteGateNote.readmePath}
          data-route-smoke-command={schemaDocsReadmeLiveRouteGateNote.routeSmokeCommand}
          data-source-smoke-command={schemaDocsReadmeLiveRouteGateNote.sourceSmokeCommand}
          data-testid="schema-docs-readme-live-route-gate-note"
          data-workflow-href={schemaDocsReadmeLiveRouteGateNote.workflowHref}
          data-workflow-name={schemaDocsReadmeLiveRouteGateNote.workflowName}
          data-workflow-path={schemaDocsReadmeLiveRouteGateNote.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Schema docs README live route gate note</p>
              <h2>Как live route smoke защищает schema docs links</h2>
            </div>
            <a className="primary-link" href={schemaDocsReadmeLiveRouteGateNote.workflowHref}>
              {schemaDocsReadmeLiveRouteGateNote.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {schemaDocsReadmeLiveRouteGateNote.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Live route gate"
                    ? schemaDocsReadmeLiveRouteGateNote.routeSmokeCommand
                    : schemaDocsReadmeLiveRouteGateNote.readmePath}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-command={schemaDocsLiveRouteFailureCopy.command}
          data-failing-command={schemaDocsLiveRouteFailureCopy.failingCommand}
          data-no-merge-copy={schemaDocsLiveRouteFailureCopy.noMergeCopy}
          data-owner-role={schemaDocsLiveRouteFailureCopy.ownerRole}
          data-readme-path={schemaDocsLiveRouteFailureCopy.readmePath}
          data-repair-targets={schemaDocsLiveRouteFailureCopy.repairTargets}
          data-source-marker-selector={schemaDocsLiveRouteFailureCopy.sourceMarkerSelector}
          data-testid="schema-docs-live-route-failure-copy"
          data-workflow-href={schemaDocsLiveRouteFailureCopy.workflowHref}
          data-workflow-name={schemaDocsLiveRouteFailureCopy.workflowName}
          data-workflow-path={schemaDocsLiveRouteFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Schema docs live-route failure copy</p>
              <h2>Что делать, если schema docs live-route gate упал</h2>
            </div>
            <a className="primary-link" href={schemaDocsLiveRouteFailureCopy.workflowHref}>
              {schemaDocsLiveRouteFailureCopy.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {schemaDocsLiveRouteFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge" ? schemaDocsLiveRouteFailureCopy.noMergeCopy : schemaDocsLiveRouteFailureCopy.readmePath}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-command={schemaDocsReadmeFailureCopy.command}
          data-failing-command={schemaDocsReadmeFailureCopy.failingCommand}
          data-no-merge-copy={schemaDocsReadmeFailureCopy.noMergeCopy}
          data-owner-role={schemaDocsReadmeFailureCopy.ownerRole}
          data-readme-path={schemaDocsReadmeFailureCopy.readmePath}
          data-repair-targets={schemaDocsReadmeFailureCopy.repairTargets}
          data-source-marker-selector={schemaDocsReadmeFailureCopy.sourceMarkerSelector}
          data-testid="schema-docs-readme-failure-copy"
          data-workflow-href={schemaDocsReadmeFailureCopy.workflowHref}
          data-workflow-name={schemaDocsReadmeFailureCopy.workflowName}
          data-workflow-path={schemaDocsReadmeFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Schema docs README failure copy</p>
              <h2>Что делать, если schema docs parity упал</h2>
            </div>
            <a className="primary-link" href={schemaDocsReadmeFailureCopy.workflowHref}>
              {schemaDocsReadmeFailureCopy.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {schemaDocsReadmeFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>{title === "No merge" ? schemaDocsReadmeFailureCopy.noMergeCopy : schemaDocsReadmeFailureCopy.readmePath}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-command={schemaDocsRenderedRouteFailureCopy.command}
          data-expected-route-count={schemaDocsRenderedRouteFailureCopy.expectedRouteCount}
          data-failing-command={schemaDocsRenderedRouteFailureCopy.failingCommand}
          data-link-selector={schemaDocsRenderedRouteFailureCopy.linkSelector}
          data-no-merge-copy={schemaDocsRenderedRouteFailureCopy.noMergeCopy}
          data-owner-role={schemaDocsRenderedRouteFailureCopy.ownerRole}
          data-readme-path={schemaDocsRenderedRouteFailureCopy.readmePath}
          data-repair-targets={schemaDocsRenderedRouteFailureCopy.repairTargets}
          data-source-marker-selector={schemaDocsRenderedRouteFailureCopy.sourceMarkerSelector}
          data-testid="schema-docs-rendered-route-failure-copy"
          data-workflow-href={schemaDocsRenderedRouteFailureCopy.workflowHref}
          data-workflow-name={schemaDocsRenderedRouteFailureCopy.workflowName}
          data-workflow-path={schemaDocsRenderedRouteFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Schema docs rendered-route failure copy</p>
              <h2>Что делать, если schema docs пропали в rendered routes</h2>
            </div>
            <a className="primary-link" href={schemaDocsRenderedRouteFailureCopy.workflowHref}>
              {schemaDocsRenderedRouteFailureCopy.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {schemaDocsRenderedRouteFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? schemaDocsRenderedRouteFailureCopy.noMergeCopy
                    : schemaDocsRenderedRouteFailureCopy.readmePath}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={sourceOwnerReceiptsRenderedRouteFailureCopy.apiRoute}
          data-command={sourceOwnerReceiptsRenderedRouteFailureCopy.command}
          data-docs-command={sourceOwnerReceiptsRenderedRouteFailureCopy.docsCommand}
          data-expected-history-count={sourceOwnerReceiptsRenderedRouteFailureCopy.expectedHistoryCount}
          data-expected-route-count={sourceOwnerReceiptsRenderedRouteFailureCopy.expectedRouteCount}
          data-failing-command={sourceOwnerReceiptsRenderedRouteFailureCopy.failingCommand}
          data-no-merge-copy={sourceOwnerReceiptsRenderedRouteFailureCopy.noMergeCopy}
          data-owner-role={sourceOwnerReceiptsRenderedRouteFailureCopy.ownerRole}
          data-parity-command={sourceOwnerReceiptsRenderedRouteFailureCopy.parityCommand}
          data-repair-targets={sourceOwnerReceiptsRenderedRouteFailureCopy.repairTargets}
          data-source-marker-selector={sourceOwnerReceiptsRenderedRouteFailureCopy.sourceMarkerSelector}
          data-testid="source-owner-receipts-rendered-route-failure-copy"
          data-workflow-href={sourceOwnerReceiptsRenderedRouteFailureCopy.workflowHref}
          data-workflow-name={sourceOwnerReceiptsRenderedRouteFailureCopy.workflowName}
          data-workflow-path={sourceOwnerReceiptsRenderedRouteFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source owner receipts rendered-route failure copy</p>
              <h2>Что делать, если source owner receipts пропали в rendered routes</h2>
            </div>
            <a className="primary-link" href={sourceOwnerReceiptsRenderedRouteFailureCopy.workflowHref}>
              {sourceOwnerReceiptsRenderedRouteFailureCopy.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {sourceOwnerReceiptsRenderedRouteFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? sourceOwnerReceiptsRenderedRouteFailureCopy.noMergeCopy
                    : sourceOwnerReceiptsRenderedRouteFailureCopy.apiRoute}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={ownerReceiptApiRenderedRouteFailureCopy.apiRoute}
          data-api-service-path={ownerReceiptApiRenderedRouteFailureCopy.apiServicePath}
          data-command={ownerReceiptApiRenderedRouteFailureCopy.command}
          data-docs-href={ownerReceiptApiRenderedRouteFailureCopy.docsHref}
          data-expected-blocked-until-restored-count={
            ownerReceiptApiRenderedRouteFailureCopy.expectedBlockedUntilRestoredCount
          }
          data-expected-history-count={ownerReceiptApiRenderedRouteFailureCopy.expectedHistoryCount}
          data-expected-route-count={ownerReceiptApiRenderedRouteFailureCopy.expectedRouteCount}
          data-failing-command={ownerReceiptApiRenderedRouteFailureCopy.failingCommand}
          data-no-merge-copy={ownerReceiptApiRenderedRouteFailureCopy.noMergeCopy}
          data-owner-role={ownerReceiptApiRenderedRouteFailureCopy.ownerRole}
          data-parity-command={ownerReceiptApiRenderedRouteFailureCopy.parityCommand}
          data-repair-targets={ownerReceiptApiRenderedRouteFailureCopy.repairTargets}
          data-source-marker-selector={ownerReceiptApiRenderedRouteFailureCopy.sourceMarkerSelector}
          data-testid="owner-receipt-api-rendered-route-failure-copy"
          data-workflow-href={ownerReceiptApiRenderedRouteFailureCopy.workflowHref}
          data-workflow-name={ownerReceiptApiRenderedRouteFailureCopy.workflowName}
          data-workflow-path={ownerReceiptApiRenderedRouteFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Owner receipt API rendered-route failure copy</p>
              <h2>Что делать, если owner receipt API пропал в rendered routes</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={ownerReceiptApiRenderedRouteFailureCopy.workflowHref}>
                {ownerReceiptApiRenderedRouteFailureCopy.workflowName}
              </a>
              <a className="primary-link" href={ownerReceiptApiRenderedRouteFailureCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {ownerReceiptApiRenderedRouteFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? ownerReceiptApiRenderedRouteFailureCopy.noMergeCopy
                    : ownerReceiptApiRenderedRouteFailureCopy.apiRoute}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={sourceOwnerReceiptWriteApiDraft.apiRoute}
          data-command={sourceOwnerReceiptWriteApiDraft.command}
          data-docs-href={sourceOwnerReceiptWriteApiDraft.docsHref}
          data-expected-request-field-count={sourceOwnerReceiptWriteApiDraft.expectedRequestFieldCount}
          data-expected-route-count={sourceOwnerReceiptWriteApiDraft.expectedRouteCount}
          data-fixture-path={sourceOwnerReceiptWriteApiDraft.fixturePath}
          data-method={sourceOwnerReceiptWriteApiDraft.method}
          data-no-merge-copy={sourceOwnerReceiptWriteApiDraft.noMergeCopy}
          data-owner-role={sourceOwnerReceiptWriteApiDraft.ownerRole}
          data-repair-targets={sourceOwnerReceiptWriteApiDraft.repairTargets}
          data-source-marker-selector={sourceOwnerReceiptWriteApiDraft.sourceMarkerSelector}
          data-status={sourceOwnerReceiptWriteApiDraft.status}
          data-testid="source-owner-receipt-write-api-draft"
          data-workflow-href={sourceOwnerReceiptWriteApiDraft.workflowHref}
          data-workflow-name={sourceOwnerReceiptWriteApiDraft.workflowName}
          data-workflow-path={sourceOwnerReceiptWriteApiDraft.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source owner receipt write API draft</p>
              <h2>Как будущий POST сохранит receipt без потери audit</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={sourceOwnerReceiptWriteApiDraft.workflowHref}>
                {sourceOwnerReceiptWriteApiDraft.workflowName}
              </a>
              <a className="primary-link" href={sourceOwnerReceiptWriteApiDraft.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {sourceOwnerReceiptWriteApiDraft.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge" ? sourceOwnerReceiptWriteApiDraft.noMergeCopy : sourceOwnerReceiptWriteApiDraft.apiRoute}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={sourceOwnerReceiptWriteSmokeFailureCopy.apiRoute}
          data-command={sourceOwnerReceiptWriteSmokeFailureCopy.command}
          data-docs-href={sourceOwnerReceiptWriteSmokeFailureCopy.docsHref}
          data-expected-request-field-count={sourceOwnerReceiptWriteSmokeFailureCopy.expectedRequestFieldCount}
          data-expected-route-count={sourceOwnerReceiptWriteSmokeFailureCopy.expectedRouteCount}
          data-failing-command={sourceOwnerReceiptWriteSmokeFailureCopy.failingCommand}
          data-no-merge-copy={sourceOwnerReceiptWriteSmokeFailureCopy.noMergeCopy}
          data-owner-role={sourceOwnerReceiptWriteSmokeFailureCopy.ownerRole}
          data-parity-command={sourceOwnerReceiptWriteSmokeFailureCopy.parityCommand}
          data-repair-targets={sourceOwnerReceiptWriteSmokeFailureCopy.repairTargets}
          data-source-marker-selector={sourceOwnerReceiptWriteSmokeFailureCopy.sourceMarkerSelector}
          data-testid="source-owner-receipt-write-smoke-failure-copy"
          data-workflow-href={sourceOwnerReceiptWriteSmokeFailureCopy.workflowHref}
          data-workflow-name={sourceOwnerReceiptWriteSmokeFailureCopy.workflowName}
          data-workflow-path={sourceOwnerReceiptWriteSmokeFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source owner receipt write smoke failure copy</p>
              <h2>Что делать, если write draft smoke упал</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={sourceOwnerReceiptWriteSmokeFailureCopy.workflowHref}>
                {sourceOwnerReceiptWriteSmokeFailureCopy.workflowName}
              </a>
              <a className="primary-link" href={sourceOwnerReceiptWriteSmokeFailureCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {sourceOwnerReceiptWriteSmokeFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? sourceOwnerReceiptWriteSmokeFailureCopy.noMergeCopy
                    : sourceOwnerReceiptWriteSmokeFailureCopy.failingCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={sourceOwnerReceiptWriteDocsFailureCopy.apiRoute}
          data-command={sourceOwnerReceiptWriteDocsFailureCopy.command}
          data-docs-href={sourceOwnerReceiptWriteDocsFailureCopy.docsHref}
          data-expected-request-field-count={sourceOwnerReceiptWriteDocsFailureCopy.expectedRequestFieldCount}
          data-expected-route-count={sourceOwnerReceiptWriteDocsFailureCopy.expectedRouteCount}
          data-failing-command={sourceOwnerReceiptWriteDocsFailureCopy.failingCommand}
          data-no-merge-copy={sourceOwnerReceiptWriteDocsFailureCopy.noMergeCopy}
          data-owner-role={sourceOwnerReceiptWriteDocsFailureCopy.ownerRole}
          data-parity-command={sourceOwnerReceiptWriteDocsFailureCopy.parityCommand}
          data-repair-targets={sourceOwnerReceiptWriteDocsFailureCopy.repairTargets}
          data-source-marker-selector={sourceOwnerReceiptWriteDocsFailureCopy.sourceMarkerSelector}
          data-testid="source-owner-receipt-write-docs-failure-copy"
          data-workflow-href={sourceOwnerReceiptWriteDocsFailureCopy.workflowHref}
          data-workflow-name={sourceOwnerReceiptWriteDocsFailureCopy.workflowName}
          data-workflow-path={sourceOwnerReceiptWriteDocsFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source owner receipt write docs failure copy</p>
              <h2>Что делать, если write docs anchor упал</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={sourceOwnerReceiptWriteDocsFailureCopy.workflowHref}>
                {sourceOwnerReceiptWriteDocsFailureCopy.workflowName}
              </a>
              <a className="primary-link" href={sourceOwnerReceiptWriteDocsFailureCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {sourceOwnerReceiptWriteDocsFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? sourceOwnerReceiptWriteDocsFailureCopy.noMergeCopy
                    : sourceOwnerReceiptWriteDocsFailureCopy.docsHref}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={sourceFreshnessWriteApiDraft.apiRoute}
          data-command={sourceFreshnessWriteApiDraft.command}
          data-docs-href={sourceFreshnessWriteApiDraft.docsHref}
          data-expected-breach-count={sourceFreshnessWriteApiDraft.expectedBreachCount}
          data-expected-request-field-count={sourceFreshnessWriteApiDraft.expectedRequestFieldCount}
          data-expected-route-count={sourceFreshnessWriteApiDraft.expectedRouteCount}
          data-method={sourceFreshnessWriteApiDraft.method}
          data-no-merge-copy={sourceFreshnessWriteApiDraft.noMergeCopy}
          data-owner-role={sourceFreshnessWriteApiDraft.ownerRole}
          data-repair-targets={sourceFreshnessWriteApiDraft.repairTargets}
          data-source-marker-selector={sourceFreshnessWriteApiDraft.sourceMarkerSelector}
          data-status={sourceFreshnessWriteApiDraft.status}
          data-testid="source-freshness-write-api-draft"
          data-workflow-href={sourceFreshnessWriteApiDraft.workflowHref}
          data-workflow-name={sourceFreshnessWriteApiDraft.workflowName}
          data-workflow-path={sourceFreshnessWriteApiDraft.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source freshness write API draft</p>
              <h2>Как будущий POST снимет freshness blocker без потери audit</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={sourceFreshnessWriteApiDraft.workflowHref}>
                {sourceFreshnessWriteApiDraft.workflowName}
              </a>
              <a className="primary-link" href={sourceFreshnessWriteApiDraft.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {sourceFreshnessWriteApiDraft.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge" ? sourceFreshnessWriteApiDraft.noMergeCopy : sourceFreshnessWriteApiDraft.apiRoute}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={sourceFreshnessWriteSmokeFailureCopy.apiRoute}
          data-command={sourceFreshnessWriteSmokeFailureCopy.command}
          data-docs-href={sourceFreshnessWriteSmokeFailureCopy.docsHref}
          data-expected-breach-count={sourceFreshnessWriteSmokeFailureCopy.expectedBreachCount}
          data-expected-request-field-count={sourceFreshnessWriteSmokeFailureCopy.expectedRequestFieldCount}
          data-expected-route-count={sourceFreshnessWriteSmokeFailureCopy.expectedRouteCount}
          data-failing-command={sourceFreshnessWriteSmokeFailureCopy.failingCommand}
          data-no-merge-copy={sourceFreshnessWriteSmokeFailureCopy.noMergeCopy}
          data-owner-role={sourceFreshnessWriteSmokeFailureCopy.ownerRole}
          data-parity-command={sourceFreshnessWriteSmokeFailureCopy.parityCommand}
          data-repair-targets={sourceFreshnessWriteSmokeFailureCopy.repairTargets}
          data-source-marker-selector={sourceFreshnessWriteSmokeFailureCopy.sourceMarkerSelector}
          data-testid="source-freshness-write-smoke-failure-copy"
          data-workflow-href={sourceFreshnessWriteSmokeFailureCopy.workflowHref}
          data-workflow-name={sourceFreshnessWriteSmokeFailureCopy.workflowName}
          data-workflow-path={sourceFreshnessWriteSmokeFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source freshness write smoke failure copy</p>
              <h2>Что делать, если freshness write smoke упал</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={sourceFreshnessWriteSmokeFailureCopy.workflowHref}>
                {sourceFreshnessWriteSmokeFailureCopy.workflowName}
              </a>
              <a className="primary-link" href={sourceFreshnessWriteSmokeFailureCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {sourceFreshnessWriteSmokeFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? sourceFreshnessWriteSmokeFailureCopy.noMergeCopy
                    : sourceFreshnessWriteSmokeFailureCopy.failingCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={sourceFreshnessRenderedRouteFailureCopy.apiRoute}
          data-breach-types={sourceFreshnessRenderedRouteFailureCopy.breachTypes}
          data-command={sourceFreshnessRenderedRouteFailureCopy.command}
          data-docs-href={sourceFreshnessRenderedRouteFailureCopy.docsHref}
          data-expected-blocked-count={sourceFreshnessRenderedRouteFailureCopy.expectedBlockedCount}
          data-expected-breach-count={sourceFreshnessRenderedRouteFailureCopy.expectedBreachCount}
          data-expected-route-count={sourceFreshnessRenderedRouteFailureCopy.expectedRouteCount}
          data-failing-command={sourceFreshnessRenderedRouteFailureCopy.failingCommand}
          data-no-merge-copy={sourceFreshnessRenderedRouteFailureCopy.noMergeCopy}
          data-owner-role={sourceFreshnessRenderedRouteFailureCopy.ownerRole}
          data-repair-targets={sourceFreshnessRenderedRouteFailureCopy.repairTargets}
          data-source-marker-selector={sourceFreshnessRenderedRouteFailureCopy.sourceMarkerSelector}
          data-testid="source-freshness-rendered-route-failure-copy"
          data-workflow-href={sourceFreshnessRenderedRouteFailureCopy.workflowHref}
          data-workflow-name={sourceFreshnessRenderedRouteFailureCopy.workflowName}
          data-workflow-path={sourceFreshnessRenderedRouteFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source freshness rendered-route failure copy</p>
              <h2>Что делать, если source freshness пропала в rendered routes</h2>
            </div>
            <a className="primary-link" href={sourceFreshnessRenderedRouteFailureCopy.workflowHref}>
              {sourceFreshnessRenderedRouteFailureCopy.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {sourceFreshnessRenderedRouteFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? sourceFreshnessRenderedRouteFailureCopy.noMergeCopy
                    : sourceFreshnessRenderedRouteFailureCopy.apiRoute}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={sourceFreshnessDocsRenderedRouteFailureCopy.apiRoute}
          data-command={sourceFreshnessDocsRenderedRouteFailureCopy.command}
          data-docs-href={sourceFreshnessDocsRenderedRouteFailureCopy.docsHref}
          data-expected-breach-count={sourceFreshnessDocsRenderedRouteFailureCopy.expectedBreachCount}
          data-expected-route-count={sourceFreshnessDocsRenderedRouteFailureCopy.expectedRouteCount}
          data-failing-command={sourceFreshnessDocsRenderedRouteFailureCopy.failingCommand}
          data-no-merge-copy={sourceFreshnessDocsRenderedRouteFailureCopy.noMergeCopy}
          data-owner-role={sourceFreshnessDocsRenderedRouteFailureCopy.ownerRole}
          data-repair-targets={sourceFreshnessDocsRenderedRouteFailureCopy.repairTargets}
          data-source-marker-selector={sourceFreshnessDocsRenderedRouteFailureCopy.sourceMarkerSelector}
          data-testid="source-freshness-docs-rendered-route-failure-copy"
          data-workflow-href={sourceFreshnessDocsRenderedRouteFailureCopy.workflowHref}
          data-workflow-name={sourceFreshnessDocsRenderedRouteFailureCopy.workflowName}
          data-workflow-path={sourceFreshnessDocsRenderedRouteFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source freshness docs rendered-route failure copy</p>
              <h2>Что делать, если source freshness docs пропали в rendered routes</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={sourceFreshnessDocsRenderedRouteFailureCopy.workflowHref}>
                {sourceFreshnessDocsRenderedRouteFailureCopy.workflowName}
              </a>
              <a className="primary-link" href={sourceFreshnessDocsRenderedRouteFailureCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {sourceFreshnessDocsRenderedRouteFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? sourceFreshnessDocsRenderedRouteFailureCopy.noMergeCopy
                    : sourceFreshnessDocsRenderedRouteFailureCopy.apiRoute}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={fnsApprovalsDocsRenderedRouteFailureCopy.apiRoute}
          data-command={fnsApprovalsDocsRenderedRouteFailureCopy.command}
          data-docs-href={fnsApprovalsDocsRenderedRouteFailureCopy.docsHref}
          data-expected-approval-count={fnsApprovalsDocsRenderedRouteFailureCopy.expectedApprovalCount}
          data-expected-route-count={fnsApprovalsDocsRenderedRouteFailureCopy.expectedRouteCount}
          data-failing-command={fnsApprovalsDocsRenderedRouteFailureCopy.failingCommand}
          data-no-merge-copy={fnsApprovalsDocsRenderedRouteFailureCopy.noMergeCopy}
          data-owner-role={fnsApprovalsDocsRenderedRouteFailureCopy.ownerRole}
          data-parity-command={fnsApprovalsDocsRenderedRouteFailureCopy.parityCommand}
          data-repair-targets={fnsApprovalsDocsRenderedRouteFailureCopy.repairTargets}
          data-source-marker-selector={fnsApprovalsDocsRenderedRouteFailureCopy.sourceMarkerSelector}
          data-testid="fns-approvals-docs-rendered-route-failure-copy"
          data-workflow-href={fnsApprovalsDocsRenderedRouteFailureCopy.workflowHref}
          data-workflow-name={fnsApprovalsDocsRenderedRouteFailureCopy.workflowName}
          data-workflow-path={fnsApprovalsDocsRenderedRouteFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">FNS approvals docs rendered-route failure copy</p>
              <h2>Что делать, если FNS approvals docs пропали в rendered routes</h2>
            </div>
            <a className="primary-link" href={fnsApprovalsDocsRenderedRouteFailureCopy.workflowHref}>
              {fnsApprovalsDocsRenderedRouteFailureCopy.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {fnsApprovalsDocsRenderedRouteFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? fnsApprovalsDocsRenderedRouteFailureCopy.noMergeCopy
                    : fnsApprovalsDocsRenderedRouteFailureCopy.docsHref}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={fnsRealNetworkApprovalApiCopy.apiRoute}
          data-command={fnsRealNetworkApprovalApiCopy.command}
          data-docs-href={fnsRealNetworkApprovalApiCopy.docsHref}
          data-expected-approval-count={fnsRealNetworkApprovalApiCopy.expectedApprovalCount}
          data-expected-route-count={fnsRealNetworkApprovalApiCopy.expectedRouteCount}
          data-fixture-path={fnsRealNetworkApprovalApiCopy.fixturePath}
          data-no-merge-copy={fnsRealNetworkApprovalApiCopy.noMergeCopy}
          data-owner-role={fnsRealNetworkApprovalApiCopy.ownerRole}
          data-repair-targets={fnsRealNetworkApprovalApiCopy.repairTargets}
          data-source-marker-selector={fnsRealNetworkApprovalApiCopy.sourceMarkerSelector}
          data-testid="fns-real-network-approval-api-copy"
          data-workflow-href={fnsRealNetworkApprovalApiCopy.workflowHref}
          data-workflow-name={fnsRealNetworkApprovalApiCopy.workflowName}
          data-workflow-path={fnsRealNetworkApprovalApiCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">FNS real-network approval API copy</p>
              <h2>Что должен сказать API перед включением сетевого smoke</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={fnsRealNetworkApprovalApiCopy.workflowHref}>
                {fnsRealNetworkApprovalApiCopy.workflowName}
              </a>
              <a className="primary-link" href={fnsRealNetworkApprovalApiCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {fnsRealNetworkApprovalApiCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge" ? fnsRealNetworkApprovalApiCopy.noMergeCopy : fnsRealNetworkApprovalApiCopy.apiRoute}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={eisRealNetworkApprovalApiCopy.apiRoute}
          data-command={eisRealNetworkApprovalApiCopy.command}
          data-docs-href={eisRealNetworkApprovalApiCopy.docsHref}
          data-expected-approval-count={eisRealNetworkApprovalApiCopy.expectedApprovalCount}
          data-expected-route-count={eisRealNetworkApprovalApiCopy.expectedRouteCount}
          data-no-merge-copy={eisRealNetworkApprovalApiCopy.noMergeCopy}
          data-owner-role={eisRealNetworkApprovalApiCopy.ownerRole}
          data-repair-targets={eisRealNetworkApprovalApiCopy.repairTargets}
          data-source-marker-selector={eisRealNetworkApprovalApiCopy.sourceMarkerSelector}
          data-testid="eis-real-network-approval-api-copy"
          data-workflow-href={eisRealNetworkApprovalApiCopy.workflowHref}
          data-workflow-name={eisRealNetworkApprovalApiCopy.workflowName}
          data-workflow-path={eisRealNetworkApprovalApiCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">EIS real-network approval API copy</p>
              <h2>Что должен сказать API перед включением сетевого smoke ЕИС</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={eisRealNetworkApprovalApiCopy.workflowHref}>
                {eisRealNetworkApprovalApiCopy.workflowName}
              </a>
              <a className="primary-link" href={eisRealNetworkApprovalApiCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {eisRealNetworkApprovalApiCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge" ? eisRealNetworkApprovalApiCopy.noMergeCopy : eisRealNetworkApprovalApiCopy.apiRoute}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={eisRealNetworkApprovalSmokeFailureCopy.apiRoute}
          data-command={eisRealNetworkApprovalSmokeFailureCopy.command}
          data-docs-href={eisRealNetworkApprovalSmokeFailureCopy.docsHref}
          data-expected-approval-count={eisRealNetworkApprovalSmokeFailureCopy.expectedApprovalCount}
          data-expected-route-count={eisRealNetworkApprovalSmokeFailureCopy.expectedRouteCount}
          data-failing-command={eisRealNetworkApprovalSmokeFailureCopy.failingCommand}
          data-no-merge-copy={eisRealNetworkApprovalSmokeFailureCopy.noMergeCopy}
          data-owner-role={eisRealNetworkApprovalSmokeFailureCopy.ownerRole}
          data-parity-command={eisRealNetworkApprovalSmokeFailureCopy.parityCommand}
          data-repair-targets={eisRealNetworkApprovalSmokeFailureCopy.repairTargets}
          data-source-marker-selector={eisRealNetworkApprovalSmokeFailureCopy.sourceMarkerSelector}
          data-testid="eis-real-network-approval-smoke-failure-copy"
          data-workflow-href={eisRealNetworkApprovalSmokeFailureCopy.workflowHref}
          data-workflow-name={eisRealNetworkApprovalSmokeFailureCopy.workflowName}
          data-workflow-path={eisRealNetworkApprovalSmokeFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">EIS real-network approval smoke failure copy</p>
              <h2>Что делать, если EIS approval smoke упал</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={eisRealNetworkApprovalSmokeFailureCopy.workflowHref}>
                {eisRealNetworkApprovalSmokeFailureCopy.workflowName}
              </a>
              <a className="primary-link" href={eisRealNetworkApprovalSmokeFailureCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {eisRealNetworkApprovalSmokeFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? eisRealNetworkApprovalSmokeFailureCopy.noMergeCopy
                    : eisRealNetworkApprovalSmokeFailureCopy.failingCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={ownerReceiptDocsRenderedRouteFailureCopy.apiRoute}
          data-command={ownerReceiptDocsRenderedRouteFailureCopy.command}
          data-docs-href={ownerReceiptDocsRenderedRouteFailureCopy.docsHref}
          data-expected-history-count={ownerReceiptDocsRenderedRouteFailureCopy.expectedHistoryCount}
          data-expected-route-count={ownerReceiptDocsRenderedRouteFailureCopy.expectedRouteCount}
          data-failing-command={ownerReceiptDocsRenderedRouteFailureCopy.failingCommand}
          data-no-merge-copy={ownerReceiptDocsRenderedRouteFailureCopy.noMergeCopy}
          data-owner-role={ownerReceiptDocsRenderedRouteFailureCopy.ownerRole}
          data-parity-command={ownerReceiptDocsRenderedRouteFailureCopy.parityCommand}
          data-repair-targets={ownerReceiptDocsRenderedRouteFailureCopy.repairTargets}
          data-source-marker-selector={ownerReceiptDocsRenderedRouteFailureCopy.sourceMarkerSelector}
          data-testid="owner-receipt-docs-rendered-route-failure-copy"
          data-workflow-href={ownerReceiptDocsRenderedRouteFailureCopy.workflowHref}
          data-workflow-name={ownerReceiptDocsRenderedRouteFailureCopy.workflowName}
          data-workflow-path={ownerReceiptDocsRenderedRouteFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Owner receipt docs rendered-route failure copy</p>
              <h2>Что делать, если owner receipt docs пропали в rendered routes</h2>
            </div>
            <a className="primary-link" href={ownerReceiptDocsRenderedRouteFailureCopy.workflowHref}>
              {ownerReceiptDocsRenderedRouteFailureCopy.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {ownerReceiptDocsRenderedRouteFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? ownerReceiptDocsRenderedRouteFailureCopy.noMergeCopy
                    : ownerReceiptDocsRenderedRouteFailureCopy.apiRoute}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={fnsApprovalsRenderedRouteFailureCopy.apiRoute}
          data-command={fnsApprovalsRenderedRouteFailureCopy.command}
          data-docs-href={fnsApprovalsRenderedRouteFailureCopy.docsHref}
          data-expected-approval-count={fnsApprovalsRenderedRouteFailureCopy.expectedApprovalCount}
          data-expected-route-count={fnsApprovalsRenderedRouteFailureCopy.expectedRouteCount}
          data-failing-command={fnsApprovalsRenderedRouteFailureCopy.failingCommand}
          data-no-merge-copy={fnsApprovalsRenderedRouteFailureCopy.noMergeCopy}
          data-owner-role={fnsApprovalsRenderedRouteFailureCopy.ownerRole}
          data-parity-command={fnsApprovalsRenderedRouteFailureCopy.parityCommand}
          data-repair-targets={fnsApprovalsRenderedRouteFailureCopy.repairTargets}
          data-source-marker-selector={fnsApprovalsRenderedRouteFailureCopy.sourceMarkerSelector}
          data-testid="fns-approvals-rendered-route-failure-copy"
          data-workflow-href={fnsApprovalsRenderedRouteFailureCopy.workflowHref}
          data-workflow-name={fnsApprovalsRenderedRouteFailureCopy.workflowName}
          data-workflow-path={fnsApprovalsRenderedRouteFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">FNS approvals rendered-route failure copy</p>
              <h2>Что делать, если FNS approvals пропали в rendered routes</h2>
            </div>
            <a className="primary-link" href={fnsApprovalsRenderedRouteFailureCopy.workflowHref}>
              {fnsApprovalsRenderedRouteFailureCopy.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {fnsApprovalsRenderedRouteFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? fnsApprovalsRenderedRouteFailureCopy.noMergeCopy
                    : fnsApprovalsRenderedRouteFailureCopy.apiRoute}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-ci-note-selectors={webBuildWorkflowFileSmoke.ciNoteSelectors.join(",")}
          data-command={webBuildWorkflowFileSmoke.command}
          data-expected-command-count={webBuildWorkflowFileSmoke.expectedCommandCount}
          data-expected-path-count={webBuildWorkflowFileSmoke.expectedPathCount}
          data-node-version={webBuildWorkflowFileSmoke.nodeVersion}
          data-smoke-command={webBuildWorkflowFileSmoke.smokeCommand}
          data-testid="web-build-workflow-file-smoke"
          data-workflow-href={webBuildWorkflowFileSmoke.workflowHref}
          data-workflow-name={webBuildWorkflowFileSmoke.workflowName}
          data-workflow-path={webBuildWorkflowFileSmoke.workflowPath}
          data-working-directory={webBuildWorkflowFileSmoke.workingDirectory}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Web build workflow file smoke</p>
              <h2>Как `/plan` сверяет реальный Web build workflow</h2>
            </div>
            <a className="primary-link" href={webBuildWorkflowFileSmoke.workflowHref}>
              {webBuildWorkflowFileSmoke.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {webBuildWorkflowFileSmoke.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>{title === "Commands" ? webBuildWorkflowFileSmoke.command : webBuildWorkflowFileSmoke.workflowPath}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-command={webBuildWorkflowSelfCheckNote.command}
          data-file-smoke-command={webBuildWorkflowSelfCheckNote.fileSmokeCommand}
          data-file-smoke-selector={webBuildWorkflowSelfCheckNote.fileSmokeSelector}
          data-source-smoke-command={webBuildWorkflowSelfCheckNote.sourceSmokeCommand}
          data-testid="web-build-workflow-self-check-note"
          data-trigger-path={webBuildWorkflowSelfCheckNote.triggerPath}
          data-workflow-href={webBuildWorkflowSelfCheckNote.workflowHref}
          data-workflow-name={webBuildWorkflowSelfCheckNote.workflowName}
          data-workflow-path={webBuildWorkflowSelfCheckNote.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Web build workflow self-check note</p>
              <h2>Как Web build проверяет собственный workflow</h2>
            </div>
            <a className="primary-link" href={webBuildWorkflowSelfCheckNote.workflowHref}>
              {webBuildWorkflowSelfCheckNote.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {webBuildWorkflowSelfCheckNote.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Self trigger" ? webBuildWorkflowSelfCheckNote.triggerPath : webBuildWorkflowSelfCheckNote.command}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-command={webBuildLiveRouteGateNote.command}
          data-file-smoke-selector={webBuildLiveRouteGateNote.fileSmokeSelector}
          data-marker-selector={webBuildLiveRouteGateNote.markerSelector}
          data-route-smoke-command={webBuildLiveRouteGateNote.routeSmokeCommand}
          data-source-smoke-command={webBuildLiveRouteGateNote.sourceSmokeCommand}
          data-testid="web-build-live-route-gate-note"
          data-trigger-path={webBuildLiveRouteGateNote.triggerPath}
          data-workflow-href={webBuildLiveRouteGateNote.workflowHref}
          data-workflow-name={webBuildLiveRouteGateNote.workflowName}
          data-workflow-path={webBuildLiveRouteGateNote.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Web build live route gate note</p>
              <h2>Как live route smoke защищает Web build</h2>
            </div>
            <a className="primary-link" href={webBuildLiveRouteGateNote.workflowHref}>
              {webBuildLiveRouteGateNote.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {webBuildLiveRouteGateNote.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Live route gate" ? webBuildLiveRouteGateNote.routeSmokeCommand : webBuildLiveRouteGateNote.triggerPath}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-command={webBuildFailureCopy.command}
          data-expected-command-count={webBuildFailureCopy.expectedCommandCount}
          data-failing-command={webBuildFailureCopy.failingCommand}
          data-no-merge-copy={webBuildFailureCopy.noMergeCopy}
          data-owner-role={webBuildFailureCopy.ownerRole}
          data-repair-targets={webBuildFailureCopy.repairTargets}
          data-source-marker-selector={webBuildFailureCopy.sourceMarkerSelector}
          data-testid="web-build-failure-copy"
          data-workflow-href={webBuildFailureCopy.workflowHref}
          data-workflow-name={webBuildFailureCopy.workflowName}
          data-workflow-path={webBuildFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Web build failure copy</p>
              <h2>Что делать, если Web build gate упал</h2>
            </div>
            <a className="primary-link" href={webBuildFailureCopy.workflowHref}>
              {webBuildFailureCopy.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {webBuildFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>{title === "No merge" ? webBuildFailureCopy.noMergeCopy : webBuildFailureCopy.command}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-command={webBuildRenderedRouteFailureCopy.command}
          data-expected-route-count={webBuildRenderedRouteFailureCopy.expectedRouteCount}
          data-failing-command={webBuildRenderedRouteFailureCopy.failingCommand}
          data-no-merge-copy={webBuildRenderedRouteFailureCopy.noMergeCopy}
          data-owner-role={webBuildRenderedRouteFailureCopy.ownerRole}
          data-repair-targets={webBuildRenderedRouteFailureCopy.repairTargets}
          data-source-marker-selector={webBuildRenderedRouteFailureCopy.sourceMarkerSelector}
          data-testid="web-build-rendered-route-failure-copy"
          data-workflow-href={webBuildRenderedRouteFailureCopy.workflowHref}
          data-workflow-name={webBuildRenderedRouteFailureCopy.workflowName}
          data-workflow-path={webBuildRenderedRouteFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Web build rendered-route failure copy</p>
              <h2>Что делать, если rendered routes упали</h2>
            </div>
            <a className="primary-link" href={webBuildRenderedRouteFailureCopy.workflowHref}>
              {webBuildRenderedRouteFailureCopy.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {webBuildRenderedRouteFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? webBuildRenderedRouteFailureCopy.noMergeCopy
                    : webBuildRenderedRouteFailureCopy.failingCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel plan-next-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Next increments</p>
              <h2>Что брать следующими маленькими шагами</h2>
            </div>
            <span className="status-pill green">one by one</span>
          </div>
          <div className="plan-next-list">
            {nextIncrements.map(([order, title, note]) => (
              <article className="plan-next-row" key={order}>
                <span>{order}</span>
                <strong>{title}</strong>
                <p>{note}</p>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
