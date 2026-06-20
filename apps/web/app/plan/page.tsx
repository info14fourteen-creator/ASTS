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
  ["1", "Добавить source connectors README workflow docs failure copy", "закрепить connectors README workflow docs guard в `/sources`"],
  ["2", "Добавить shared validation README workflow docs rendered-route copy", "закрепить shared README workflow docs rendered guard в `/plan`"],
  ["3", "Добавить web build README workflow docs rendered-route copy", "закрепить Web build README workflow docs rendered guard в `/plan`"],
  ["4", "Добавить AI review queue README workflow docs rendered-route copy", "закрепить AI queue README workflow docs rendered guard в `/ai-review`"],
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
const webBuildWorkflowDocsHref =
  "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/.github/workflows/web-build.yml";

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

const sharedValidationDocsDeepLink = {
  docsHref: schemaDocsHref,
  expectedCheckCount: sharedValidationBrowserLoop.checkCount,
  linkSelector: "[data-testid='schema-docs-link']",
  readmePath: "packages/shared/README.md",
  route: "/plan",
  sourceMarkerSelector: "[data-testid='shared-validation-rendered-route-failure-copy']",
  workflowName: "Shared validation",
  workflowPath: ".github/workflows/shared-validation.yml",
  checks: [
    ["Docs href", "держать явный deep-link на shared schema index рядом с shared validation gate"],
    ["Source marker", "связывать docs link с rendered-route failure marker"],
    ["Check count", "подтверждать 14 shared checks перед merge"],
    ["Route smoke", "rendered routes smoke должен видеть link selector, href и README path"],
  ],
};

const sharedValidationDocsRenderedRouteFailureCopy = {
  command: sharedValidationLiveRouteGateNote.routeSmokeCommand,
  docsHref: sharedValidationDocsDeepLink.docsHref,
  expectedCheckCount: sharedValidationDocsDeepLink.expectedCheckCount,
  expectedRouteCount: sharedValidationRenderedRouteFailureCopy.expectedRouteCount,
  failingCommand: sharedValidationLiveRouteGateNote.routeSmokeCommand,
  linkSelector: sharedValidationDocsDeepLink.linkSelector,
  noMergeCopy:
    "Не мержить, пока rendered routes smoke снова подтверждает shared validation docs deep-link и shared README anchor на живом `/plan`",
  ownerRole: "Schema owner + Docs owner + QA owner",
  readmePath: sharedValidationDocsDeepLink.readmePath,
  repairTargets:
    "/plan,packages/shared/README.md#shared-schema-index,apps/web/scripts/smoke.mjs,[data-testid='shared-validation-docs-deep-link']",
  sourceMarkerSelector: "[data-testid='shared-validation-docs-deep-link']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "rendered routes проходят частично, но `/plan` потерял shared README docs href или schema docs link selector"],
    ["Fix order", "сначала восстановить shared-validation-docs-deep-link, затем route smoke expectations"],
    ["Owner", "Schema owner подтверждает 14 shared checks, Docs owner подтверждает README anchor, QA owner подтверждает `/plan`"],
    ["No merge", "не мержить, пока shared validation docs link снова не проходит rendered route coverage"],
  ],
};

const sharedValidationWorkflowDocsFailureCopy = {
  checkedWorkflowPath: sharedValidationWorkflowFailureCopy.checkedWorkflowPath,
  command: sharedValidationLiveRouteGateNote.routeSmokeCommand,
  docsHref: sharedValidationDocsDeepLink.docsHref,
  docsMarkerSelector: "[data-testid='shared-validation-docs-deep-link']",
  expectedCheckCount: sharedValidationDocsDeepLink.expectedCheckCount,
  expectedRouteCount: sharedValidationRenderedRouteFailureCopy.expectedRouteCount,
  failingCommand: sharedValidationWorkflowFailureCopy.failingCommand,
  linkSelector: sharedValidationDocsDeepLink.linkSelector,
  noMergeCopy:
    "Не мержить, пока Shared validation workflow failure copy и shared README docs deep-link снова согласованы на живом `/plan`",
  ownerRole: "Schema owner + CI owner + Docs owner + QA owner",
  readmePath: sharedValidationDocsDeepLink.readmePath,
  repairTargets:
    "/plan,.github/workflows/shared-validation.yml,packages/shared/README.md#shared-schema-index,apps/web/scripts/smoke.mjs",
  sourceMarkerSelector: "[data-testid='shared-validation-workflow-failure-copy']",
  workflowHref: sharedValidationWorkflowHref,
  workflowName: "Shared validation",
  workflowPath: sharedValidationWorkflowFailureCopy.checkedWorkflowPath,
  checks: [
    ["Symptom", "workflow failure copy есть, но `/plan` потерял shared README docs href или workflow path"],
    ["Fix order", "сначала восстановить shared-validation-workflow-failure-copy, затем shared-validation-docs-deep-link"],
    ["Owner", "Schema owner подтверждает 14 checks, CI owner подтверждает workflow path, Docs owner подтверждает README anchor"],
    ["No merge", "не мержить, пока shared validation workflow docs guard снова не проходит route coverage"],
  ],
};

const sharedValidationLiveDocsWorkflowCopy = {
  checkedWorkflowPath: sharedValidationLiveRouteGateNote.checkedWorkflowPath,
  command: sharedValidationLiveRouteGateNote.routeSmokeCommand,
  docsHref: sharedValidationDocsDeepLink.docsHref,
  docsMarkerSelector: "[data-testid='shared-validation-docs-deep-link']",
  expectedCheckCount: sharedValidationDocsDeepLink.expectedCheckCount,
  expectedRouteCount: sharedValidationRenderedRouteFailureCopy.expectedRouteCount,
  failingCommand: sharedValidationLiveRouteGateNote.command,
  linkSelector: sharedValidationDocsDeepLink.linkSelector,
  noMergeCopy:
    "Не мержить, пока shared validation live route gate, shared README docs deep-link и Web build route smoke снова согласованы",
  ownerRole: "Schema owner + CI owner + Docs owner + QA owner",
  readmePath: sharedValidationDocsDeepLink.readmePath,
  repairTargets:
    "/plan,.github/workflows/web-build.yml,.github/workflows/shared-validation.yml,packages/shared/README.md#shared-schema-index",
  sourceMarkerSelector: "[data-testid='shared-validation-live-route-gate-note']",
  workflowCommand: sharedValidationLiveRouteGateNote.command,
  workflowHref: sharedValidationLiveRouteGateNote.workflowHref,
  workflowName: sharedValidationLiveRouteGateNote.workflowName,
  workflowPath: sharedValidationLiveRouteGateNote.workflowPath,
  checks: [
    ["Symptom", "live route gate есть, но docs deep-link или Web build route smoke больше не закрепляют shared validation"],
    ["Fix order", "сначала восстановить shared-validation-live-route-gate-note, затем shared-validation-docs-deep-link"],
    ["Owner", "Schema owner подтверждает 14 checks, CI owner подтверждает live route command, Docs owner подтверждает README anchor"],
    ["No merge", "не мержить, пока shared validation live docs workflow guard снова не проходит route coverage"],
  ],
};

const sharedValidationReadmeLiveDocsWorkflowCopy = {
  checkedWorkflowPath: sharedValidationLiveDocsWorkflowCopy.checkedWorkflowPath,
  command: sharedValidationLiveDocsWorkflowCopy.command,
  docsHref: sharedValidationLiveDocsWorkflowCopy.docsHref,
  docsMarkerSelector: sharedValidationLiveDocsWorkflowCopy.docsMarkerSelector,
  expectedCheckCount: sharedValidationLiveDocsWorkflowCopy.expectedCheckCount,
  expectedRouteCount: sharedValidationLiveDocsWorkflowCopy.expectedRouteCount,
  failingCommand: sharedValidationLiveDocsWorkflowCopy.failingCommand,
  linkSelector: sharedValidationLiveDocsWorkflowCopy.linkSelector,
  noMergeCopy:
    "Не мержить, пока shared validation README docs deep-link, live route gate и Web build route smoke снова согласованы",
  ownerRole: sharedValidationLiveDocsWorkflowCopy.ownerRole,
  readmePath: sharedValidationLiveDocsWorkflowCopy.readmePath,
  repairTargets:
    "/plan,packages/shared/README.md#shared-schema-index,.github/workflows/web-build.yml,.github/workflows/shared-validation.yml",
  sourceMarkerSelector: "[data-testid='shared-validation-live-docs-workflow-copy']",
  workflowCommand: sharedValidationLiveDocsWorkflowCopy.workflowCommand,
  workflowHref: sharedValidationLiveDocsWorkflowCopy.workflowHref,
  workflowName: sharedValidationLiveDocsWorkflowCopy.workflowName,
  workflowPath: sharedValidationLiveDocsWorkflowCopy.workflowPath,
  checks: [
    ["Symptom", "README deep-link есть, но live docs workflow guard больше не связывает shared README anchor с Web build"],
    ["Fix order", "сначала восстановить shared-validation-docs-deep-link, затем shared-validation-live-docs-workflow-copy"],
    ["Owner", "Schema owner подтверждает 14 checks, Docs owner подтверждает README anchor, CI owner подтверждает route smoke"],
    ["No merge", "не мержить, пока shared validation README live docs workflow guard снова не проходит route coverage"],
  ],
};

const sharedValidationReadmeWorkflowFailureCopy = {
  checkedWorkflowPath: sharedValidationReadmeLiveDocsWorkflowCopy.checkedWorkflowPath,
  command: sharedValidationReadmeLiveDocsWorkflowCopy.command,
  docsHref: sharedValidationReadmeLiveDocsWorkflowCopy.docsHref,
  docsMarkerSelector: sharedValidationReadmeLiveDocsWorkflowCopy.docsMarkerSelector,
  expectedCheckCount: sharedValidationReadmeLiveDocsWorkflowCopy.expectedCheckCount,
  expectedRouteCount: sharedValidationReadmeLiveDocsWorkflowCopy.expectedRouteCount,
  failingCommand: sharedValidationWorkflowFailureCopy.command,
  linkSelector: sharedValidationReadmeLiveDocsWorkflowCopy.linkSelector,
  noMergeCopy:
    "Не мержить, пока shared validation README workflow failure guard снова защищает README live docs workflow copy",
  ownerRole: sharedValidationReadmeLiveDocsWorkflowCopy.ownerRole,
  readmePath: sharedValidationReadmeLiveDocsWorkflowCopy.readmePath,
  readmeWorkflowCommand: sharedValidationReadmeLiveDocsWorkflowCopy.workflowCommand,
  repairTargets:
    "/plan,packages/shared/README.md#shared-schema-index,.github/workflows/web-build.yml,.github/workflows/shared-validation.yml,[data-testid='shared-validation-readme-live-docs-workflow-copy']",
  sourceMarkerSelector: "[data-testid='shared-validation-readme-live-docs-workflow-copy']",
  workflowCommand: sharedValidationReadmeLiveDocsWorkflowCopy.workflowCommand,
  workflowFailureCommand: sharedValidationWorkflowFailureCopy.command,
  workflowHref: sharedValidationReadmeLiveDocsWorkflowCopy.workflowHref,
  workflowName: sharedValidationReadmeLiveDocsWorkflowCopy.workflowName,
  workflowPath: sharedValidationReadmeLiveDocsWorkflowCopy.workflowPath,
  checks: [
    ["Symptom", "README live docs workflow copy есть, но failure guard больше не защищает порядок shared validation checks"],
    ["Fix order", "сначала восстановить shared-validation-readme-live-docs-workflow-copy, затем shared-validation-workflow-failure-copy"],
    ["Owner", "Schema owner подтверждает README workflow copy, Docs owner подтверждает anchor, CI owner подтверждает failure order"],
    ["No merge", "не мержить, пока shared validation README workflow failure guard снова не защищает README workflow copy"],
  ],
};

const sharedValidationReadmeRenderedRouteFailureCopy = {
  checkedWorkflowPath: sharedValidationReadmeWorkflowFailureCopy.checkedWorkflowPath,
  command: sharedValidationLiveRouteGateNote.routeSmokeCommand,
  docsHref: sharedValidationReadmeWorkflowFailureCopy.docsHref,
  docsMarkerSelector: sharedValidationReadmeWorkflowFailureCopy.docsMarkerSelector,
  expectedCheckCount: sharedValidationReadmeWorkflowFailureCopy.expectedCheckCount,
  expectedRouteCount: sharedValidationReadmeWorkflowFailureCopy.expectedRouteCount,
  failingCommand: sharedValidationLiveRouteGateNote.routeSmokeCommand,
  linkSelector: sharedValidationReadmeWorkflowFailureCopy.linkSelector,
  noMergeCopy:
    "Не мержить, пока rendered routes smoke снова подтверждает shared validation README workflow failure guard на живом `/plan`",
  ownerRole: "Schema owner + Docs owner + QA owner",
  readmePath: sharedValidationReadmeWorkflowFailureCopy.readmePath,
  repairTargets:
    "/plan,packages/shared/README.md#shared-schema-index,apps/web/scripts/smoke.mjs,[data-testid='shared-validation-readme-workflow-failure-copy']",
  sourceMarkerSelector: "[data-testid='shared-validation-readme-workflow-failure-copy']",
  workflowCommand: sharedValidationReadmeWorkflowFailureCopy.workflowCommand,
  workflowFailureCommand: sharedValidationReadmeWorkflowFailureCopy.workflowFailureCommand,
  workflowHref: sharedValidationReadmeWorkflowFailureCopy.workflowHref,
  workflowName: sharedValidationReadmeWorkflowFailureCopy.workflowName,
  workflowPath: sharedValidationReadmeWorkflowFailureCopy.workflowPath,
  checks: [
    ["Symptom", "README workflow failure copy есть, но rendered routes smoke больше не видит shared README guard"],
    ["Fix order", "сначала восстановить shared-validation-readme-workflow-failure-copy, затем route smoke expectations"],
    ["Owner", "Schema owner подтверждает README guard, Docs owner подтверждает anchor, QA owner подтверждает `/plan`"],
    ["No merge", "не мержить, пока shared validation README rendered-route guard снова не проходит route coverage"],
  ],
};

const sharedValidationReadmeWorkflowDocsFailureCopy = {
  checkedWorkflowPath: sharedValidationReadmeRenderedRouteFailureCopy.checkedWorkflowPath,
  command: sharedValidationReadmeRenderedRouteFailureCopy.command,
  docsHref: sharedValidationReadmeRenderedRouteFailureCopy.docsHref,
  docsMarkerSelector: sharedValidationReadmeRenderedRouteFailureCopy.docsMarkerSelector,
  expectedCheckCount: sharedValidationReadmeRenderedRouteFailureCopy.expectedCheckCount,
  expectedRouteCount: sharedValidationReadmeRenderedRouteFailureCopy.expectedRouteCount,
  failingCommand: sharedValidationWorkflowDocsFailureCopy.failingCommand,
  linkSelector: sharedValidationReadmeRenderedRouteFailureCopy.linkSelector,
  noMergeCopy:
    "Не мержить, пока shared validation README rendered-route guard и workflow docs guard снова согласованы на живом `/plan`",
  ownerRole: "Schema owner + CI owner + Docs owner + QA owner",
  readmePath: sharedValidationReadmeRenderedRouteFailureCopy.readmePath,
  repairTargets:
    "/plan,packages/shared/README.md#shared-schema-index,.github/workflows/shared-validation.yml,apps/web/scripts/smoke.mjs,[data-testid='shared-validation-readme-rendered-route-failure-copy']",
  sourceMarkerSelector: "[data-testid='shared-validation-readme-rendered-route-failure-copy']",
  workflowCommand: sharedValidationReadmeRenderedRouteFailureCopy.workflowCommand,
  workflowDocsCommand: sharedValidationWorkflowDocsFailureCopy.command,
  workflowDocsFailureCommand: sharedValidationWorkflowDocsFailureCopy.failingCommand,
  workflowFailureCommand: sharedValidationReadmeRenderedRouteFailureCopy.workflowFailureCommand,
  workflowHref: sharedValidationWorkflowDocsFailureCopy.workflowHref,
  workflowName: sharedValidationWorkflowDocsFailureCopy.workflowName,
  workflowPath: sharedValidationWorkflowDocsFailureCopy.workflowPath,
  checks: [
    ["Symptom", "README rendered-route guard есть, но workflow docs guard больше не связывает README anchor и shared validation workflow"],
    ["Fix order", "сначала восстановить shared-validation-readme-rendered-route-failure-copy, затем shared-validation-workflow-docs-failure-copy"],
    ["Owner", "Schema owner подтверждает README guard, CI owner подтверждает shared workflow, Docs owner подтверждает anchor"],
    ["No merge", "не мержить, пока shared validation README workflow docs guard снова не проходит route coverage"],
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

const aiReviewReceiptWriteDocsFailureCopy = {
  apiRoute: "/v1/ai/review-queue",
  command: "npm run smoke:ai-review-receipt-write-docs-failure-copy",
  docsHref:
    "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#ai-review-receipt-write-api-draft",
  expectedQueueCount: 3,
  expectedRequestFieldCount: 11,
  expectedRouteCount: 16,
  failingCommand: "npm run smoke:ai-review-receipt-write-api-draft",
  noMergeCopy:
    "Не мержить, пока AI review receipt write docs снова подтверждают README anchor, `/plan` docs href и immutable AI audit append.",
  ownerRole: "AI workflow owner + Docs owner + QA owner",
  parityCommand: "npm run smoke:ai-review-receipt-write-api-draft",
  repairTargets:
    "apps/api/README.md#ai-review-receipt-write-api-draft,/plan,apps/web/scripts/ai-review-receipt-write-api-draft.mjs,apps/web/scripts/ai-review-receipt-write-docs-failure-copy.mjs",
  sourceMarkerSelector: "[data-testid='ai-review-receipt-write-api-draft']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "AI write draft smoke проходит частично, но потерян README anchor или `/plan` docs href"],
    ["Fix order", "сначала восстановить API README anchor, затем `/plan` docsHref и route smoke expectations"],
    ["Owner", "Docs owner подтверждает README anchor, AI workflow owner подтверждает write contract, QA owner подтверждает smoke"],
    ["No merge", "не мержить, пока AI review receipt write docs снова не проходят contract-only gate"],
  ],
};

const aiReviewReceiptWriteRenderedRouteFailureCopy = {
  apiRoute: "/v1/ai/review-queue",
  command: "npm run smoke:ai-review-receipt-write-rendered-route-failure-copy",
  docsHref:
    "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#ai-review-receipt-write-api-draft",
  expectedQueueCount: 3,
  expectedRequestFieldCount: 11,
  expectedRouteCount: 16,
  failingCommand: "npm run smoke -- --url http://127.0.0.1:4177/",
  noMergeCopy:
    "Не мержить, пока rendered routes smoke снова подтверждает AI review receipt write draft marker, docs href, request schema и immutable AI audit append.",
  ownerRole: "AI workflow owner + API owner + QA owner",
  parityCommand: "npm run smoke:ai-review-receipt-write-api-draft",
  repairTargets:
    "/ai-review,/plan,apps/web/scripts/smoke.mjs,apps/web/scripts/ai-review-receipt-write-api-draft.mjs",
  sourceMarkerSelector: "[data-testid='ai-review-receipt-write-api-draft']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "rendered routes проходят частично, но `/ai-review` или `/plan` потеряли AI write draft marker, docs href или request schema"],
    ["Fix order", "сначала восстановить `/ai-review` write draft marker, затем `/plan` marker и route smoke expectations"],
    ["Owner", "AI workflow owner подтверждает decision fields, API owner подтверждает draft contract, QA owner подтверждает rendered routes"],
    ["No merge", "не мержить, пока AI review receipt write снова не проходит rendered route coverage"],
  ],
};

const aiReviewReceiptWriteWorkflowFailureCopy = {
  apiRoute: "/v1/ai/review-queue",
  command: "npm run smoke:ai-review-receipt-write-workflow-failure-copy",
  docsHref:
    "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#ai-review-receipt-write-api-draft",
  expectedQueueCount: 3,
  expectedRequestFieldCount: 11,
  expectedRouteCount: 16,
  failingCommand: "npm run smoke:web-build-workflow",
  noMergeCopy:
    "Не мержить, пока Web build снова запускает AI review receipt write API, smoke, docs и rendered-route checks в правильном порядке перед shared README checks.",
  ownerRole: "AI workflow owner + CI owner + QA owner",
  parityCommand: "npm run smoke:ai-review-receipt-write-api-draft",
  repairTargets:
    ".github/workflows/web-build.yml,/plan,apps/web/scripts/ai-review-receipt-write-api-draft.mjs,apps/web/scripts/ai-review-receipt-write-rendered-route-failure-copy.mjs",
  sourceMarkerSelector: "[data-testid='ai-review-receipt-write-rendered-route-failure-copy']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "AI write checks есть по отдельности, но Web build поменял порядок или выпустил один из write gates"],
    ["Fix order", "вернуть API draft, smoke failure, docs failure, rendered-route failure и workflow failure copy перед shared README checks"],
    ["Owner", "AI workflow owner подтверждает write contract, CI owner подтверждает порядок Web build, QA owner подтверждает route coverage"],
    ["No merge", "не мержить, пока AI review receipt write workflow order снова не защищает всю write цепочку"],
  ],
};

const aiReviewReceiptWriteLiveRouteGateNote = {
  apiRoute: aiReviewReceiptWriteRenderedRouteFailureCopy.apiRoute,
  command: "npm run smoke:ai-review-receipt-write-live-route",
  docsHref: aiReviewReceiptWriteRenderedRouteFailureCopy.docsHref,
  expectedQueueCount: aiReviewReceiptWriteRenderedRouteFailureCopy.expectedQueueCount,
  expectedRequestFieldCount: aiReviewReceiptWriteRenderedRouteFailureCopy.expectedRequestFieldCount,
  expectedRouteCount: aiReviewReceiptWriteRenderedRouteFailureCopy.expectedRouteCount,
  markerSelector: "[data-testid='ai-review-receipt-write-rendered-route-failure-copy']",
  parityCommand: aiReviewReceiptWriteRenderedRouteFailureCopy.parityCommand,
  routeSmokeCommand: "npm run smoke -- --url http://127.0.0.1:4177/",
  sourceSmokeCommand: aiReviewReceiptWriteApiDraft.command,
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Static write gate", "Web build сначала сверяет AI draft POST contract, docs href, request schema и rendered-route failure copy"],
    ["Live route gate", "затем route smoke проверяет `/plan` + `/ai-review` write markers на живом сервере"],
    ["Plan marker", "ai-review-receipt-write-rendered-route-failure-copy остается источником route, docsHref и parity command"],
    ["Merge gate", "AI write draft drift должен падать до shared README checks и до merge"],
  ],
};

const aiReviewReceiptWriteLiveRouteFailureCopy = {
  apiRoute: aiReviewReceiptWriteRenderedRouteFailureCopy.apiRoute,
  command: "npm run smoke:ai-review-receipt-write-live-route-failure-copy",
  docsHref: aiReviewReceiptWriteRenderedRouteFailureCopy.docsHref,
  expectedQueueCount: aiReviewReceiptWriteRenderedRouteFailureCopy.expectedQueueCount,
  expectedRequestFieldCount: aiReviewReceiptWriteRenderedRouteFailureCopy.expectedRequestFieldCount,
  expectedRouteCount: aiReviewReceiptWriteRenderedRouteFailureCopy.expectedRouteCount,
  failingCommand: aiReviewReceiptWriteLiveRouteGateNote.command,
  noMergeCopy:
    "Не мержить, пока Web build снова держит AI review receipt write live-route gate перед workflow failure copy и shared README checks.",
  ownerRole: "AI workflow owner + CI owner + QA owner",
  repairTargets:
    ".github/workflows/web-build.yml,/plan,apps/web/scripts/ai-review-receipt-write-live-route-gate.mjs,apps/web/scripts/smoke.mjs",
  routeSmokeCommand: aiReviewReceiptWriteLiveRouteGateNote.routeSmokeCommand,
  sourceMarkerSelector: "[data-testid='ai-review-receipt-write-live-route-gate-note']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "live route gate упал после AI rendered-route write checks или потерял `/plan` + `/ai-review` markers"],
    ["Fix order", "сначала восстановить AI write live route gate, затем workflow failure copy и shared README checks"],
    ["Owner", "AI workflow owner подтверждает write markers, CI owner подтверждает порядок Web build, QA owner подтверждает live route smoke"],
    ["No merge", "не мержить, пока AI write live-route gate снова не защищает write draft на живом сервере"],
  ],
};

const aiReviewReceiptWriteLiveRouteRenderedCopy = {
  apiRoute: aiReviewReceiptWriteRenderedRouteFailureCopy.apiRoute,
  command: "npm run smoke:ai-review-receipt-write-live-route-rendered-copy",
  docsHref: aiReviewReceiptWriteRenderedRouteFailureCopy.docsHref,
  expectedQueueCount: aiReviewReceiptWriteRenderedRouteFailureCopy.expectedQueueCount,
  expectedRequestFieldCount: aiReviewReceiptWriteRenderedRouteFailureCopy.expectedRequestFieldCount,
  expectedRouteCount: aiReviewReceiptWriteRenderedRouteFailureCopy.expectedRouteCount,
  failingCommand: aiReviewReceiptWriteLiveRouteGateNote.routeSmokeCommand,
  liveFailureCommand: aiReviewReceiptWriteLiveRouteFailureCopy.command,
  noMergeCopy:
    "Не мержить, пока rendered routes smoke снова подтверждает AI review write live-route failure copy, docs href и route smoke command.",
  ownerRole: "AI workflow owner + CI owner + QA owner",
  repairTargets:
    "/plan,apps/web/scripts/smoke.mjs,apps/web/scripts/ai-review-receipt-write-live-route-failure-copy.mjs,.github/workflows/web-build.yml",
  sourceMarkerSelector: "[data-testid='ai-review-receipt-write-live-route-failure-copy']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "route smoke проходит частично, но `/plan` потерял AI review live-route failure copy"],
    ["Fix order", "сначала восстановить live-route failure copy, затем rendered route smoke expectations и Web build порядок"],
    ["Owner", "AI workflow owner подтверждает write live-route copy, CI owner подтверждает workflow order, QA owner подтверждает rendered route smoke"],
    ["No merge", "не мержить, пока AI write live-route copy снова закреплен в rendered routes"],
  ],
};

const aiReviewReceiptWriteLiveRouteWorkflowCopy = {
  apiRoute: aiReviewReceiptWriteRenderedRouteFailureCopy.apiRoute,
  command: "npm run smoke:ai-review-receipt-write-live-route-workflow-copy",
  docsHref: aiReviewReceiptWriteRenderedRouteFailureCopy.docsHref,
  expectedQueueCount: aiReviewReceiptWriteRenderedRouteFailureCopy.expectedQueueCount,
  expectedRequestFieldCount: aiReviewReceiptWriteRenderedRouteFailureCopy.expectedRequestFieldCount,
  expectedRouteCount: aiReviewReceiptWriteRenderedRouteFailureCopy.expectedRouteCount,
  failingCommand: "npm run smoke:web-build-workflow",
  liveRenderedCommand: aiReviewReceiptWriteLiveRouteRenderedCopy.command,
  workflowFailureCommand: aiReviewReceiptWriteWorkflowFailureCopy.command,
  noMergeCopy:
    "Не мержить, пока Web build снова запускает AI review receipt write live-route rendered copy перед workflow failure copy и shared README checks.",
  ownerRole: "AI workflow owner + CI owner + QA owner",
  repairTargets:
    ".github/workflows/web-build.yml,/plan,apps/web/scripts/ai-review-receipt-write-live-route-rendered-copy.mjs,apps/web/scripts/web-build-workflow-file.mjs",
  sourceMarkerSelector: "[data-testid='ai-review-receipt-write-live-route-rendered-copy']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "AI live-route rendered copy есть на `/plan`, но Web build не держит его перед workflow failure copy"],
    ["Fix order", "сначала восстановить live-route rendered copy, затем live-route workflow copy и только потом workflow failure copy"],
    ["Owner", "AI workflow owner подтверждает live-route copy, CI owner подтверждает порядок Web build, QA owner подтверждает route smoke"],
    ["No merge", "не мержить, пока AI live-route workflow order снова не защищает rendered copy"],
  ],
};

const aiReviewReceiptWriteLiveRouteDocsCopy = {
  apiRoute: aiReviewReceiptWriteRenderedRouteFailureCopy.apiRoute,
  auditNote:
    "README anchor, /plan docs href and immutable AI audit append warning must drift before shared README checks.",
  command: "npm run smoke:ai-review-receipt-write-live-route-docs-copy",
  docsHref: aiReviewReceiptWriteRenderedRouteFailureCopy.docsHref,
  expectedQueueCount: aiReviewReceiptWriteRenderedRouteFailureCopy.expectedQueueCount,
  expectedRequestFieldCount: aiReviewReceiptWriteRenderedRouteFailureCopy.expectedRequestFieldCount,
  expectedRouteCount: aiReviewReceiptWriteRenderedRouteFailureCopy.expectedRouteCount,
  failingCommand: aiReviewReceiptWriteLiveRouteWorkflowCopy.command,
  liveWorkflowCommand: aiReviewReceiptWriteLiveRouteWorkflowCopy.command,
  noMergeCopy:
    "Не мержить, пока AI live-route workflow copy снова закреплен в API README audit note, `/plan` docs href и Web build.",
  ownerRole: "AI workflow owner + Docs owner + CI owner",
  repairTargets:
    "apps/api/README.md#ai-review-receipt-write-api-draft,/plan,apps/web/scripts/ai-review-receipt-write-live-route-workflow-copy.mjs,.github/workflows/web-build.yml",
  sourceMarkerSelector: "[data-testid='ai-review-receipt-write-live-route-workflow-copy']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "AI live-route workflow copy проходит, но API README или `/plan` больше не объясняют AI audit drift"],
    ["Fix order", "сначала восстановить README audit note, затем `/plan` docs copy и route smoke expectations"],
    ["Owner", "AI workflow owner подтверждает write audit note, Docs owner подтверждает README anchor, CI owner подтверждает Web build order"],
    ["No merge", "не мержить, пока AI live-route docs copy снова не защищает audit note"],
  ],
};

const aiReviewReceiptWriteLiveRouteReadmeTriggerCopy = {
  apiRoute: aiReviewReceiptWriteLiveRouteDocsCopy.apiRoute,
  command: "npm run smoke:ai-review-receipt-write-live-route-readme-trigger-copy",
  docsCommand: aiReviewReceiptWriteLiveRouteDocsCopy.command,
  docsHref: aiReviewReceiptWriteLiveRouteDocsCopy.docsHref,
  expectedQueueCount: aiReviewReceiptWriteLiveRouteDocsCopy.expectedQueueCount,
  expectedRequestFieldCount: aiReviewReceiptWriteLiveRouteDocsCopy.expectedRequestFieldCount,
  expectedRouteCount: aiReviewReceiptWriteLiveRouteDocsCopy.expectedRouteCount,
  expectedWorkflowPathCount: 2,
  failingCommand: aiReviewReceiptWriteLiveRouteDocsCopy.command,
  noMergeCopy:
    "Не мержить, пока AI live-route docs copy снова закреплен в apps/api/README.md trigger path и Web build.",
  ownerRole: "AI workflow owner + Docs owner + CI owner",
  readmePath: "apps/api/README.md",
  repairTargets:
    "apps/api/README.md,.github/workflows/web-build.yml,/plan,apps/web/scripts/ai-review-receipt-write-live-route-docs-copy.mjs",
  sourceMarkerSelector: "[data-testid='ai-review-receipt-write-live-route-docs-copy']",
  triggerPath: "apps/api/README.md",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "AI live-route docs copy есть, но apps/api/README.md больше не запускает Web build"],
    ["Fix order", "сначала вернуть README trigger path, затем `/plan` trigger note и Web build order"],
    ["Owner", "AI workflow owner подтверждает write docs, Docs owner подтверждает README path, CI owner подтверждает pull_request/push triggers"],
    ["No merge", "не мержить, пока AI README trigger copy снова не защищает docs-only drift"],
  ],
};

const aiReviewReceiptWriteLiveRouteReadmeRenderedCopy = {
  apiRoute: aiReviewReceiptWriteLiveRouteReadmeTriggerCopy.apiRoute,
  command: "npm run smoke:ai-review-receipt-write-live-route-readme-rendered-copy",
  docsCommand: aiReviewReceiptWriteLiveRouteReadmeTriggerCopy.docsCommand,
  docsHref: aiReviewReceiptWriteLiveRouteReadmeTriggerCopy.docsHref,
  expectedQueueCount: aiReviewReceiptWriteLiveRouteReadmeTriggerCopy.expectedQueueCount,
  expectedRequestFieldCount: aiReviewReceiptWriteLiveRouteReadmeTriggerCopy.expectedRequestFieldCount,
  expectedRouteCount: aiReviewReceiptWriteLiveRouteReadmeTriggerCopy.expectedRouteCount,
  failingCommand: "npm run smoke -- --url http://127.0.0.1:4177/",
  noMergeCopy:
    "Не мержить, пока rendered routes smoke снова подтверждает AI README trigger copy, README path и Web build count.",
  ownerRole: "AI workflow owner + Docs owner + QA owner",
  readmeTriggerCommand: aiReviewReceiptWriteLiveRouteReadmeTriggerCopy.command,
  repairTargets:
    "apps/web/scripts/smoke.mjs,/plan,apps/web/scripts/ai-review-receipt-write-live-route-readme-trigger-copy.mjs,.github/workflows/web-build.yml",
  sourceMarkerSelector: "[data-testid='ai-review-receipt-write-live-route-readme-trigger-copy']",
  triggerPath: aiReviewReceiptWriteLiveRouteReadmeTriggerCopy.triggerPath,
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "AI README trigger copy есть в файлах, но rendered route smoke больше не требует этот `/plan` marker"],
    ["Fix order", "сначала вернуть AI README trigger block в route smoke, затем Web build count и workflow order"],
    ["Owner", "AI workflow owner подтверждает write docs, Docs owner подтверждает README trigger copy, QA owner подтверждает rendered route smoke"],
    ["No merge", "не мержить, пока AI README trigger copy снова не защищен rendered routes"],
  ],
};

const aiReviewReceiptWriteLiveRouteReadmeWorkflowCopy = {
  apiRoute: aiReviewReceiptWriteLiveRouteReadmeRenderedCopy.apiRoute,
  command: "npm run smoke:ai-review-receipt-write-live-route-readme-workflow-copy",
  docsHref: aiReviewReceiptWriteLiveRouteReadmeRenderedCopy.docsHref,
  expectedQueueCount: aiReviewReceiptWriteLiveRouteReadmeRenderedCopy.expectedQueueCount,
  expectedRequestFieldCount: aiReviewReceiptWriteLiveRouteReadmeRenderedCopy.expectedRequestFieldCount,
  expectedRouteCount: aiReviewReceiptWriteLiveRouteReadmeRenderedCopy.expectedRouteCount,
  failingCommand: "npm run smoke:web-build-workflow",
  noMergeCopy:
    "Не мержить, пока Web build снова запускает AI README rendered copy перед workflow failure и shared README checks.",
  ownerRole: "AI workflow owner + CI owner + QA owner",
  readmeRenderedCommand: aiReviewReceiptWriteLiveRouteReadmeRenderedCopy.command,
  repairTargets:
    ".github/workflows/web-build.yml,/plan,apps/web/scripts/ai-review-receipt-write-live-route-readme-rendered-copy.mjs,apps/web/scripts/web-build-workflow-file.mjs",
  sourceMarkerSelector: "[data-testid='ai-review-receipt-write-live-route-readme-rendered-copy']",
  workflowFailureCommand: aiReviewReceiptWriteWorkflowFailureCopy.command,
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "AI README rendered copy есть на `/plan`, но Web build не держит его перед workflow failure copy"],
    ["Fix order", "сначала восстановить AI README rendered copy, затем README workflow copy и только потом workflow failure copy"],
    ["Owner", "AI workflow owner подтверждает README rendered copy, CI owner подтверждает порядок Web build, QA owner подтверждает route smoke"],
    ["No merge", "не мержить, пока AI README workflow order снова не защищает rendered copy"],
  ],
};

const aiReviewReceiptWriteLiveRouteReadmeWorkflowFailureCopy = {
  apiRoute: aiReviewReceiptWriteLiveRouteReadmeWorkflowCopy.apiRoute,
  command: "npm run smoke:ai-review-receipt-write-live-route-readme-workflow-failure-copy",
  docsHref: aiReviewReceiptWriteLiveRouteReadmeWorkflowCopy.docsHref,
  expectedQueueCount: aiReviewReceiptWriteLiveRouteReadmeWorkflowCopy.expectedQueueCount,
  expectedRequestFieldCount: aiReviewReceiptWriteLiveRouteReadmeWorkflowCopy.expectedRequestFieldCount,
  expectedRouteCount: aiReviewReceiptWriteLiveRouteReadmeWorkflowCopy.expectedRouteCount,
  failingCommand: "npm run smoke:web-build-workflow",
  noMergeCopy:
    "Не мержить, пока Web build снова запускает AI README workflow copy перед workflow failure и shared README checks.",
  ownerRole: "AI workflow owner + CI owner + QA owner",
  readmeWorkflowCommand: aiReviewReceiptWriteLiveRouteReadmeWorkflowCopy.command,
  repairTargets:
    ".github/workflows/web-build.yml,/plan,apps/web/scripts/ai-review-receipt-write-live-route-readme-workflow-copy.mjs,apps/web/scripts/ai-review-receipt-write-workflow-failure-copy.mjs",
  sourceMarkerSelector: "[data-testid='ai-review-receipt-write-live-route-readme-workflow-copy']",
  workflowFailureCommand: aiReviewReceiptWriteWorkflowFailureCopy.command,
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "AI README workflow copy есть на `/plan`, но failure guard больше не защищает его порядок"],
    ["Fix order", "сначала вернуть AI README workflow copy, затем README workflow failure copy и только потом AI workflow failure"],
    ["Owner", "AI workflow owner подтверждает README workflow copy, CI owner подтверждает порядок Web build, QA owner подтверждает route smoke"],
    ["No merge", "не мержить, пока AI README workflow failure guard снова не защищает README workflow copy"],
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

const sourceOwnerReceiptWriteRenderedRouteFailureCopy = {
  apiRoute: "/v1/sources/owner-receipts",
  command: "npm run smoke:source-owner-receipt-write-rendered-route-failure-copy",
  docsHref:
    "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#source-owner-receipt-write-api-draft",
  expectedRequestFieldCount: 10,
  expectedRouteCount: 16,
  failingCommand: "npm run smoke -- --url http://127.0.0.1:4177/",
  noMergeCopy:
    "Не мержить, пока rendered routes smoke снова подтверждает source owner receipt write draft marker, docs href, request schema и immutable audit append.",
  ownerRole: "Sources owner + API owner + QA owner",
  parityCommand: "npm run smoke:source-owner-receipt-write-api-draft",
  repairTargets:
    "/sources,/plan,apps/web/scripts/smoke.mjs,apps/web/scripts/source-owner-receipt-write-api-draft.mjs",
  sourceMarkerSelector: "[data-testid='source-owner-receipt-write-api-draft']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "rendered routes проходят частично, но `/sources` или `/plan` потеряли write draft marker, docs href или request schema"],
    ["Fix order", "сначала восстановить `/sources` write draft marker, затем `/plan` marker и route smoke expectations"],
    ["Owner", "Sources owner подтверждает receipt fields, API owner подтверждает draft contract, QA owner подтверждает rendered routes"],
    ["No merge", "не мержить, пока source owner receipt write снова не проходит rendered route coverage"],
  ],
};

const sourceOwnerReceiptWriteWorkflowFailureCopy = {
  apiRoute: "/v1/sources/owner-receipts",
  command: "npm run smoke:source-owner-receipt-write-workflow-failure-copy",
  docsHref:
    "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#source-owner-receipt-write-api-draft",
  expectedRequestFieldCount: 10,
  expectedRouteCount: 16,
  failingCommand: "npm run smoke:web-build-workflow",
  noMergeCopy:
    "Не мержить, пока Web build снова запускает source owner receipt write API, smoke, docs и rendered-route checks в правильном порядке перед source freshness write.",
  ownerRole: "Sources owner + CI owner + QA owner",
  parityCommand: "npm run smoke:source-owner-receipt-write-api-draft",
  repairTargets:
    ".github/workflows/web-build.yml,/plan,apps/web/scripts/source-owner-receipt-write-api-draft.mjs,apps/web/scripts/source-owner-receipt-write-rendered-route-failure-copy.mjs",
  sourceMarkerSelector: "[data-testid='source-owner-receipt-write-rendered-route-failure-copy']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "source owner write checks есть по отдельности, но Web build поменял порядок или выпустил один из write gates"],
    ["Fix order", "вернуть API draft, smoke failure, docs failure, rendered-route failure и workflow failure copy перед source freshness write"],
    ["Owner", "Sources owner подтверждает write contract, CI owner подтверждает порядок Web build, QA owner подтверждает route coverage"],
    ["No merge", "не мержить, пока source owner receipt write workflow order снова не защищает всю write цепочку"],
  ],
};

const sourceOwnerReceiptWriteLiveRouteGateNote = {
  apiRoute: sourceOwnerReceiptWriteRenderedRouteFailureCopy.apiRoute,
  command: "npm run smoke:source-owner-receipt-write-live-route",
  docsHref: sourceOwnerReceiptWriteRenderedRouteFailureCopy.docsHref,
  expectedRequestFieldCount: sourceOwnerReceiptWriteRenderedRouteFailureCopy.expectedRequestFieldCount,
  expectedRouteCount: sourceOwnerReceiptWriteRenderedRouteFailureCopy.expectedRouteCount,
  markerSelector: "[data-testid='source-owner-receipt-write-rendered-route-failure-copy']",
  parityCommand: sourceOwnerReceiptWriteRenderedRouteFailureCopy.parityCommand,
  routeSmokeCommand: "npm run smoke -- --url http://127.0.0.1:4177/",
  sourceSmokeCommand: sourceOwnerReceiptWriteApiDraft.command,
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Static write gate", "Web build сначала сверяет draft POST contract, docs href, request schema и rendered-route failure copy"],
    ["Live route gate", "затем route smoke проверяет `/plan` + `/sources` write markers на живом сервере"],
    ["Plan marker", "source-owner-receipt-write-rendered-route-failure-copy остается источником route, docsHref и parity command"],
    ["Merge gate", "write draft drift должен падать до source freshness checks и до merge"],
  ],
};

const sourceOwnerReceiptWriteLiveRouteFailureCopy = {
  apiRoute: sourceOwnerReceiptWriteRenderedRouteFailureCopy.apiRoute,
  command: "npm run smoke:source-owner-receipt-write-live-route-failure-copy",
  docsHref: sourceOwnerReceiptWriteRenderedRouteFailureCopy.docsHref,
  expectedRequestFieldCount: sourceOwnerReceiptWriteRenderedRouteFailureCopy.expectedRequestFieldCount,
  expectedRouteCount: sourceOwnerReceiptWriteRenderedRouteFailureCopy.expectedRouteCount,
  failingCommand: sourceOwnerReceiptWriteLiveRouteGateNote.command,
  noMergeCopy:
    "Не мержить, пока Web build снова держит source owner receipt write live-route gate перед workflow failure copy и source freshness write checks.",
  ownerRole: "Sources owner + CI owner + QA owner",
  repairTargets:
    ".github/workflows/web-build.yml,/plan,apps/web/scripts/source-owner-receipt-write-live-route-gate.mjs,apps/web/scripts/smoke.mjs",
  routeSmokeCommand: sourceOwnerReceiptWriteLiveRouteGateNote.routeSmokeCommand,
  sourceMarkerSelector: "[data-testid='source-owner-receipt-write-live-route-gate-note']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "live route gate упал после rendered-route write checks или потерял `/plan` + `/sources` markers"],
    ["Fix order", "сначала восстановить source owner write live route gate, затем workflow failure copy и source freshness write checks"],
    ["Owner", "Sources owner подтверждает write markers, CI owner подтверждает порядок Web build, QA owner подтверждает live route smoke"],
    ["No merge", "не мержить, пока source owner write live-route gate снова не защищает write draft на живом сервере"],
  ],
};

const sourceOwnerReceiptWriteLiveRouteRenderedCopy = {
  apiRoute: sourceOwnerReceiptWriteRenderedRouteFailureCopy.apiRoute,
  command: "npm run smoke:source-owner-receipt-write-live-route-rendered-copy",
  docsHref: sourceOwnerReceiptWriteRenderedRouteFailureCopy.docsHref,
  expectedRequestFieldCount: sourceOwnerReceiptWriteRenderedRouteFailureCopy.expectedRequestFieldCount,
  expectedRouteCount: sourceOwnerReceiptWriteRenderedRouteFailureCopy.expectedRouteCount,
  failingCommand: sourceOwnerReceiptWriteLiveRouteGateNote.routeSmokeCommand,
  liveFailureCommand: sourceOwnerReceiptWriteLiveRouteFailureCopy.command,
  noMergeCopy:
    "Не мержить, пока rendered routes smoke снова подтверждает source owner write live-route failure copy, docs href и route smoke command.",
  ownerRole: "Sources owner + CI owner + QA owner",
  repairTargets:
    "/plan,apps/web/scripts/smoke.mjs,apps/web/scripts/source-owner-receipt-write-live-route-failure-copy.mjs,.github/workflows/web-build.yml",
  sourceMarkerSelector: "[data-testid='source-owner-receipt-write-live-route-failure-copy']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "route smoke проходит частично, но `/plan` потерял source owner live-route failure copy"],
    ["Fix order", "сначала восстановить live-route failure copy, затем rendered route smoke expectations и Web build порядок"],
    ["Owner", "Sources owner подтверждает write live-route copy, CI owner подтверждает workflow order, QA owner подтверждает rendered route smoke"],
    ["No merge", "не мержить, пока source owner live-route copy снова закреплен в rendered routes"],
  ],
};

const sourceOwnerReceiptWriteLiveRouteWorkflowCopy = {
  apiRoute: sourceOwnerReceiptWriteRenderedRouteFailureCopy.apiRoute,
  command: "npm run smoke:source-owner-receipt-write-live-route-workflow-copy",
  docsHref: sourceOwnerReceiptWriteRenderedRouteFailureCopy.docsHref,
  expectedRequestFieldCount: sourceOwnerReceiptWriteRenderedRouteFailureCopy.expectedRequestFieldCount,
  expectedRouteCount: sourceOwnerReceiptWriteRenderedRouteFailureCopy.expectedRouteCount,
  failingCommand: "npm run smoke:web-build-workflow",
  liveRenderedCommand: sourceOwnerReceiptWriteLiveRouteRenderedCopy.command,
  workflowFailureCommand: sourceOwnerReceiptWriteWorkflowFailureCopy.command,
  noMergeCopy:
    "Не мержить, пока Web build снова запускает source owner receipt write live-route rendered copy перед workflow failure copy и source freshness checks.",
  ownerRole: "Sources owner + CI owner + QA owner",
  repairTargets:
    ".github/workflows/web-build.yml,/plan,apps/web/scripts/source-owner-receipt-write-live-route-rendered-copy.mjs,apps/web/scripts/web-build-workflow-file.mjs",
  sourceMarkerSelector: "[data-testid='source-owner-receipt-write-live-route-rendered-copy']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "source owner live-route rendered copy есть на `/plan`, но Web build не держит его перед workflow failure copy"],
    ["Fix order", "сначала восстановить live-route rendered copy, затем live-route workflow copy и только потом workflow failure copy"],
    ["Owner", "Sources owner подтверждает live-route copy, CI owner подтверждает порядок Web build, QA owner подтверждает route smoke"],
    ["No merge", "не мержить, пока source owner live-route workflow order снова не защищает rendered copy"],
  ],
};

const sourceOwnerReceiptWriteLiveRouteDocsCopy = {
  apiRoute: sourceOwnerReceiptWriteRenderedRouteFailureCopy.apiRoute,
  auditNote:
    "README anchor, /plan docs href and immutable audit append warning must drift before source freshness checks.",
  command: "npm run smoke:source-owner-receipt-write-live-route-docs-copy",
  docsHref: sourceOwnerReceiptWriteRenderedRouteFailureCopy.docsHref,
  expectedRequestFieldCount: sourceOwnerReceiptWriteRenderedRouteFailureCopy.expectedRequestFieldCount,
  expectedRouteCount: sourceOwnerReceiptWriteRenderedRouteFailureCopy.expectedRouteCount,
  failingCommand: sourceOwnerReceiptWriteLiveRouteWorkflowCopy.command,
  liveWorkflowCommand: sourceOwnerReceiptWriteLiveRouteWorkflowCopy.command,
  noMergeCopy:
    "Не мержить, пока source owner live-route workflow copy снова закреплен в API README audit note, `/plan` docs href и Web build.",
  ownerRole: "Sources owner + Docs owner + CI owner",
  repairTargets:
    "apps/api/README.md#source-owner-receipt-write-api-draft,/plan,apps/web/scripts/source-owner-receipt-write-live-route-workflow-copy.mjs,.github/workflows/web-build.yml",
  sourceMarkerSelector: "[data-testid='source-owner-receipt-write-live-route-workflow-copy']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "source owner live-route workflow copy проходит, но API README или `/plan` больше не объясняют audit drift"],
    ["Fix order", "сначала восстановить README audit note, затем `/plan` docs copy и route smoke expectations"],
    ["Owner", "Sources owner подтверждает write audit note, Docs owner подтверждает README anchor, CI owner подтверждает Web build order"],
    ["No merge", "не мержить, пока source owner live-route docs copy снова не защищает audit note"],
  ],
};

const sourceOwnerReceiptWriteLiveRouteReadmeTriggerCopy = {
  apiRoute: sourceOwnerReceiptWriteLiveRouteDocsCopy.apiRoute,
  command: "npm run smoke:source-owner-receipt-write-live-route-readme-trigger-copy",
  docsCommand: sourceOwnerReceiptWriteLiveRouteDocsCopy.command,
  docsHref: sourceOwnerReceiptWriteLiveRouteDocsCopy.docsHref,
  expectedRequestFieldCount: sourceOwnerReceiptWriteLiveRouteDocsCopy.expectedRequestFieldCount,
  expectedRouteCount: sourceOwnerReceiptWriteLiveRouteDocsCopy.expectedRouteCount,
  expectedWorkflowPathCount: apiReadmeTriggerSmoke.expectedWorkflowPathCount,
  failingCommand: sourceOwnerReceiptWriteLiveRouteDocsCopy.command,
  noMergeCopy:
    "Не мержить, пока source owner live-route docs copy снова закреплен в apps/api/README.md trigger path и Web build.",
  ownerRole: "Sources owner + Docs owner + CI owner",
  readmePath: apiReadmeTriggerSmoke.triggerPath,
  repairTargets:
    "apps/api/README.md,.github/workflows/web-build.yml,/plan,apps/web/scripts/source-owner-receipt-write-live-route-docs-copy.mjs",
  sourceMarkerSelector: "[data-testid='source-owner-receipt-write-live-route-docs-copy']",
  triggerPath: apiReadmeTriggerSmoke.triggerPath,
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "source owner live-route docs copy есть, но apps/api/README.md больше не запускает Web build"],
    ["Fix order", "сначала вернуть README trigger path, затем `/plan` trigger note и Web build order"],
    ["Owner", "Sources owner подтверждает write docs, Docs owner подтверждает README path, CI owner подтверждает pull_request/push triggers"],
    ["No merge", "не мержить, пока source owner README trigger copy снова не защищает docs-only drift"],
  ],
};

const sourceOwnerReceiptWriteLiveRouteReadmeRenderedCopy = {
  apiRoute: sourceOwnerReceiptWriteLiveRouteReadmeTriggerCopy.apiRoute,
  command: "npm run smoke:source-owner-receipt-write-live-route-readme-rendered-copy",
  docsCommand: sourceOwnerReceiptWriteLiveRouteReadmeTriggerCopy.docsCommand,
  docsHref: sourceOwnerReceiptWriteLiveRouteReadmeTriggerCopy.docsHref,
  expectedRequestFieldCount: sourceOwnerReceiptWriteLiveRouteReadmeTriggerCopy.expectedRequestFieldCount,
  expectedRouteCount: sourceOwnerReceiptWriteLiveRouteReadmeTriggerCopy.expectedRouteCount,
  failingCommand: "npm run smoke -- --url http://127.0.0.1:4177/",
  noMergeCopy:
    "Не мержить, пока rendered routes smoke снова подтверждает source owner README trigger copy, README path и Web build count.",
  ownerRole: "Sources owner + Docs owner + QA owner",
  readmeTriggerCommand: sourceOwnerReceiptWriteLiveRouteReadmeTriggerCopy.command,
  repairTargets:
    "apps/web/scripts/smoke.mjs,/plan,apps/web/scripts/source-owner-receipt-write-live-route-readme-trigger-copy.mjs,.github/workflows/web-build.yml",
  sourceMarkerSelector: "[data-testid='source-owner-receipt-write-live-route-readme-trigger-copy']",
  triggerPath: sourceOwnerReceiptWriteLiveRouteReadmeTriggerCopy.triggerPath,
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "source owner README trigger copy есть в файлах, но rendered route smoke больше не требует этот `/plan` marker"],
    ["Fix order", "сначала вернуть README trigger block в route smoke, затем Web build count и workflow order"],
    ["Owner", "Sources owner подтверждает write docs, Docs owner подтверждает README trigger copy, QA owner подтверждает rendered route smoke"],
    ["No merge", "не мержить, пока source owner README trigger copy снова не защищен rendered routes"],
  ],
};

const sourceOwnerReceiptWriteLiveRouteReadmeWorkflowCopy = {
  apiRoute: sourceOwnerReceiptWriteLiveRouteReadmeRenderedCopy.apiRoute,
  command: "npm run smoke:source-owner-receipt-write-live-route-readme-workflow-copy",
  docsHref: sourceOwnerReceiptWriteLiveRouteReadmeRenderedCopy.docsHref,
  expectedRequestFieldCount: sourceOwnerReceiptWriteLiveRouteReadmeRenderedCopy.expectedRequestFieldCount,
  expectedRouteCount: sourceOwnerReceiptWriteLiveRouteReadmeRenderedCopy.expectedRouteCount,
  failingCommand: "npm run smoke:web-build-workflow",
  noMergeCopy:
    "Не мержить, пока Web build снова запускает source owner README rendered copy перед workflow failure и source freshness checks.",
  ownerRole: "Sources owner + CI owner + QA owner",
  readmeRenderedCommand: sourceOwnerReceiptWriteLiveRouteReadmeRenderedCopy.command,
  repairTargets:
    ".github/workflows/web-build.yml,/plan,apps/web/scripts/source-owner-receipt-write-live-route-readme-rendered-copy.mjs,apps/web/scripts/web-build-workflow-file.mjs",
  sourceMarkerSelector: "[data-testid='source-owner-receipt-write-live-route-readme-rendered-copy']",
  workflowFailureCommand: sourceOwnerReceiptWriteWorkflowFailureCopy.command,
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "source owner README rendered copy есть на `/plan`, но Web build не держит его перед workflow failure copy"],
    ["Fix order", "сначала восстановить README rendered copy, затем README workflow copy и только потом workflow failure copy"],
    ["Owner", "Sources owner подтверждает README rendered copy, CI owner подтверждает порядок Web build, QA owner подтверждает route smoke"],
    ["No merge", "не мержить, пока source owner README workflow order снова не защищает rendered copy"],
  ],
};

const sourceOwnerReceiptWriteLiveRouteReadmeWorkflowFailureCopy = {
  apiRoute: sourceOwnerReceiptWriteLiveRouteReadmeWorkflowCopy.apiRoute,
  command: "npm run smoke:source-owner-receipt-write-live-route-readme-workflow-failure-copy",
  docsHref: sourceOwnerReceiptWriteLiveRouteReadmeWorkflowCopy.docsHref,
  expectedRequestFieldCount: sourceOwnerReceiptWriteLiveRouteReadmeWorkflowCopy.expectedRequestFieldCount,
  expectedRouteCount: sourceOwnerReceiptWriteLiveRouteReadmeWorkflowCopy.expectedRouteCount,
  failingCommand: "npm run smoke:web-build-workflow",
  noMergeCopy:
    "Не мержить, пока Web build снова запускает source owner README workflow copy перед workflow failure и source freshness checks.",
  ownerRole: "Sources owner + CI owner + QA owner",
  readmeWorkflowCommand: sourceOwnerReceiptWriteLiveRouteReadmeWorkflowCopy.command,
  repairTargets:
    ".github/workflows/web-build.yml,/plan,apps/web/scripts/source-owner-receipt-write-live-route-readme-workflow-copy.mjs,apps/web/scripts/source-owner-receipt-write-workflow-failure-copy.mjs",
  sourceMarkerSelector: "[data-testid='source-owner-receipt-write-live-route-readme-workflow-copy']",
  workflowFailureCommand: sourceOwnerReceiptWriteWorkflowFailureCopy.command,
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "source owner README workflow copy есть на `/plan`, но failure guard больше не защищает его порядок"],
    ["Fix order", "сначала вернуть README workflow copy, затем README workflow failure copy и только потом source owner workflow failure"],
    ["Owner", "Sources owner подтверждает README workflow copy, CI owner подтверждает порядок Web build, QA owner подтверждает route smoke"],
    ["No merge", "не мержить, пока source owner README workflow failure guard снова не защищает README workflow copy"],
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

const sourceFreshnessWriteDocsFailureCopy = {
  apiRoute: "/v1/sources/freshness",
  command: "npm run smoke:source-freshness-write-docs-failure-copy",
  docsHref:
    "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#source-freshness-write-api-draft",
  expectedBreachCount: 4,
  expectedRequestFieldCount: 12,
  expectedRouteCount: 16,
  failingCommand: "npm run smoke:source-freshness-write-api-draft",
  noMergeCopy:
    "Не мержить, пока source freshness write docs снова подтверждают README anchor, `/plan` docs href и immutable freshness audit append.",
  ownerRole: "Sources owner + Docs owner + QA owner",
  parityCommand: "npm run smoke:source-freshness-write-api-draft",
  repairTargets:
    "apps/api/README.md#source-freshness-write-api-draft,/plan,apps/web/scripts/source-freshness-write-api-draft.mjs,apps/web/scripts/source-freshness-write-docs-failure-copy.mjs",
  sourceMarkerSelector: "[data-testid='source-freshness-write-api-draft']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "freshness write draft smoke проходит частично, но потерян README anchor или `/plan` docs href"],
    ["Fix order", "сначала восстановить API README anchor, затем `/plan` docsHref и route smoke expectations"],
    ["Owner", "Docs owner подтверждает README anchor, Sources owner подтверждает freshness write contract, QA owner подтверждает smoke"],
    ["No merge", "не мержить, пока source freshness write docs снова не проходят contract-only gate"],
  ],
};

const sourceFreshnessWriteRenderedRouteFailureCopy = {
  apiRoute: "/v1/sources/freshness",
  command: "npm run smoke:source-freshness-write-rendered-route-failure-copy",
  docsHref:
    "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#source-freshness-write-api-draft",
  expectedBreachCount: 4,
  expectedRequestFieldCount: 12,
  expectedRouteCount: 16,
  failingCommand: "npm run smoke -- --url http://127.0.0.1:4177/",
  noMergeCopy:
    "Не мержить, пока rendered routes smoke снова подтверждает source freshness write draft marker, docs href, request schema и immutable freshness audit append.",
  ownerRole: "Sources owner + API owner + QA owner",
  parityCommand: "npm run smoke:source-freshness-write-api-draft",
  repairTargets:
    "/sources,/plan,apps/web/scripts/smoke.mjs,apps/web/scripts/source-freshness-write-api-draft.mjs",
  sourceMarkerSelector: "[data-testid='source-freshness-write-api-draft']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "rendered routes проходят частично, но `/sources` или `/plan` потеряли freshness write draft marker, docs href или request schema"],
    ["Fix order", "сначала восстановить `/sources` freshness write marker, затем `/plan` marker и route smoke expectations"],
    ["Owner", "Sources owner подтверждает breach fields, API owner подтверждает draft contract, QA owner подтверждает rendered routes"],
    ["No merge", "не мержить, пока source freshness write снова не проходит rendered route coverage"],
  ],
};

const sourceFreshnessWriteWorkflowFailureCopy = {
  apiRoute: "/v1/sources/freshness",
  command: "npm run smoke:source-freshness-write-workflow-failure-copy",
  docsHref:
    "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#source-freshness-write-api-draft",
  expectedBreachCount: 4,
  expectedRequestFieldCount: 12,
  expectedRouteCount: 16,
  failingCommand: "npm run smoke:web-build-workflow",
  noMergeCopy:
    "Не мержить, пока Web build снова запускает source freshness write API, smoke, docs и rendered-route checks в правильном порядке перед source freshness rendered checks.",
  ownerRole: "Sources owner + CI owner + QA owner",
  parityCommand: "npm run smoke:source-freshness-write-api-draft",
  repairTargets:
    ".github/workflows/web-build.yml,/plan,apps/web/scripts/source-freshness-write-api-draft.mjs,apps/web/scripts/source-freshness-write-rendered-route-failure-copy.mjs",
  sourceMarkerSelector: "[data-testid='source-freshness-write-rendered-route-failure-copy']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "freshness write checks есть по отдельности, но Web build поменял порядок или выпустил один из write gates"],
    ["Fix order", "вернуть API draft, smoke failure, docs failure, rendered-route failure и workflow failure copy перед freshness rendered checks"],
    ["Owner", "Sources owner подтверждает freshness write contract, CI owner подтверждает порядок Web build, QA owner подтверждает route coverage"],
    ["No merge", "не мержить, пока source freshness write workflow order снова не защищает всю write цепочку"],
  ],
};

const sourceFreshnessWriteLiveRouteGateNote = {
  apiRoute: sourceFreshnessWriteRenderedRouteFailureCopy.apiRoute,
  command: "npm run smoke:source-freshness-write-live-route",
  docsHref: sourceFreshnessWriteRenderedRouteFailureCopy.docsHref,
  expectedBreachCount: sourceFreshnessWriteRenderedRouteFailureCopy.expectedBreachCount,
  expectedRequestFieldCount: sourceFreshnessWriteRenderedRouteFailureCopy.expectedRequestFieldCount,
  expectedRouteCount: sourceFreshnessWriteRenderedRouteFailureCopy.expectedRouteCount,
  markerSelector: "[data-testid='source-freshness-write-rendered-route-failure-copy']",
  parityCommand: sourceFreshnessWriteRenderedRouteFailureCopy.parityCommand,
  routeSmokeCommand: "npm run smoke -- --url http://127.0.0.1:4177/",
  sourceSmokeCommand: sourceFreshnessWriteApiDraft.command,
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Static write gate", "Web build сначала сверяет freshness draft POST contract, docs href, request schema и rendered-route failure copy"],
    ["Live route gate", "затем route smoke проверяет `/plan` + `/sources` freshness write markers на живом сервере"],
    ["Plan marker", "source-freshness-write-rendered-route-failure-copy остается источником route, docsHref и parity command"],
    ["Merge gate", "freshness write drift должен падать до freshness rendered checks и до merge"],
  ],
};

const sourceFreshnessWriteLiveRouteFailureCopy = {
  apiRoute: sourceFreshnessWriteRenderedRouteFailureCopy.apiRoute,
  command: "npm run smoke:source-freshness-write-live-route-failure-copy",
  docsHref: sourceFreshnessWriteRenderedRouteFailureCopy.docsHref,
  expectedBreachCount: sourceFreshnessWriteRenderedRouteFailureCopy.expectedBreachCount,
  expectedRequestFieldCount: sourceFreshnessWriteRenderedRouteFailureCopy.expectedRequestFieldCount,
  expectedRouteCount: sourceFreshnessWriteRenderedRouteFailureCopy.expectedRouteCount,
  failingCommand: sourceFreshnessWriteLiveRouteGateNote.command,
  noMergeCopy:
    "Не мержить, пока Web build снова держит source freshness write live-route gate перед workflow failure copy и source freshness rendered checks.",
  ownerRole: "Sources owner + CI owner + QA owner",
  repairTargets:
    ".github/workflows/web-build.yml,/plan,apps/web/scripts/source-freshness-write-live-route-gate.mjs,apps/web/scripts/smoke.mjs",
  routeSmokeCommand: sourceFreshnessWriteLiveRouteGateNote.routeSmokeCommand,
  sourceMarkerSelector: "[data-testid='source-freshness-write-live-route-gate-note']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "freshness write live-route gate падает: `/plan` или live route smoke потеряли freshness write marker"],
    ["Fix order", "сначала восстановить live-route gate note, затем route smoke expectations и Web build порядок"],
    ["Owner", "Sources owner подтверждает freshness write contract, CI owner подтверждает порядок Web build, QA owner подтверждает live route"],
    ["No merge", "не мержить, пока freshness write live-route gate снова не защищает write draft на живом сервере"],
  ],
};

const sourceFreshnessWriteLiveRouteRenderedCopy = {
  apiRoute: sourceFreshnessWriteRenderedRouteFailureCopy.apiRoute,
  command: "npm run smoke:source-freshness-write-live-route-rendered-copy",
  docsHref: sourceFreshnessWriteRenderedRouteFailureCopy.docsHref,
  expectedBreachCount: sourceFreshnessWriteRenderedRouteFailureCopy.expectedBreachCount,
  expectedRequestFieldCount: sourceFreshnessWriteRenderedRouteFailureCopy.expectedRequestFieldCount,
  expectedRouteCount: sourceFreshnessWriteRenderedRouteFailureCopy.expectedRouteCount,
  failingCommand: sourceFreshnessWriteLiveRouteGateNote.routeSmokeCommand,
  liveFailureCommand: sourceFreshnessWriteLiveRouteFailureCopy.command,
  noMergeCopy:
    "Не мержить, пока rendered routes smoke снова подтверждает source freshness write live-route failure copy, docs href и route smoke command.",
  ownerRole: "Sources owner + CI owner + QA owner",
  repairTargets:
    "/plan,apps/web/scripts/smoke.mjs,apps/web/scripts/source-freshness-write-live-route-failure-copy.mjs,.github/workflows/web-build.yml",
  sourceMarkerSelector: "[data-testid='source-freshness-write-live-route-failure-copy']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "route smoke проходит частично, но `/plan` потерял freshness write live-route failure copy"],
    ["Fix order", "сначала восстановить live-route failure copy, затем rendered route smoke expectations и Web build порядок"],
    ["Owner", "Sources owner подтверждает freshness write live-route copy, CI owner подтверждает workflow order, QA owner подтверждает rendered route smoke"],
    ["No merge", "не мержить, пока freshness write live-route copy снова закреплен в rendered routes"],
  ],
};

const sourceFreshnessWriteLiveRouteWorkflowCopy = {
  apiRoute: sourceFreshnessWriteRenderedRouteFailureCopy.apiRoute,
  command: "npm run smoke:source-freshness-write-live-route-workflow-copy",
  docsHref: sourceFreshnessWriteRenderedRouteFailureCopy.docsHref,
  expectedBreachCount: sourceFreshnessWriteRenderedRouteFailureCopy.expectedBreachCount,
  expectedRequestFieldCount: sourceFreshnessWriteRenderedRouteFailureCopy.expectedRequestFieldCount,
  expectedRouteCount: sourceFreshnessWriteRenderedRouteFailureCopy.expectedRouteCount,
  failingCommand: "npm run smoke:web-build-workflow",
  liveRenderedCommand: sourceFreshnessWriteLiveRouteRenderedCopy.command,
  workflowFailureCommand: sourceFreshnessWriteWorkflowFailureCopy.command,
  noMergeCopy:
    "Не мержить, пока Web build снова запускает source freshness write live-route rendered copy перед workflow failure copy и source freshness rendered checks.",
  ownerRole: "Sources owner + CI owner + QA owner",
  repairTargets:
    ".github/workflows/web-build.yml,/plan,apps/web/scripts/source-freshness-write-live-route-rendered-copy.mjs,apps/web/scripts/web-build-workflow-file.mjs",
  sourceMarkerSelector: "[data-testid='source-freshness-write-live-route-rendered-copy']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "freshness live-route rendered copy есть на `/plan`, но Web build не держит его перед workflow failure copy"],
    ["Fix order", "сначала восстановить live-route rendered copy, затем live-route workflow copy и только потом workflow failure copy"],
    ["Owner", "Sources owner подтверждает freshness live-route copy, CI owner подтверждает порядок Web build, QA owner подтверждает route smoke"],
    ["No merge", "не мержить, пока freshness write live-route workflow order снова не защищает rendered copy"],
  ],
};

const sourceFreshnessWriteLiveRouteDocsCopy = {
  apiRoute: sourceFreshnessWriteRenderedRouteFailureCopy.apiRoute,
  auditNote:
    "README anchor, /plan docs href and immutable freshness audit append warning must drift before source freshness rendered checks.",
  command: "npm run smoke:source-freshness-write-live-route-docs-copy",
  docsHref: sourceFreshnessWriteRenderedRouteFailureCopy.docsHref,
  expectedBreachCount: sourceFreshnessWriteRenderedRouteFailureCopy.expectedBreachCount,
  expectedRequestFieldCount: sourceFreshnessWriteRenderedRouteFailureCopy.expectedRequestFieldCount,
  expectedRouteCount: sourceFreshnessWriteRenderedRouteFailureCopy.expectedRouteCount,
  failingCommand: sourceFreshnessWriteLiveRouteWorkflowCopy.command,
  liveWorkflowCommand: sourceFreshnessWriteLiveRouteWorkflowCopy.command,
  noMergeCopy:
    "Не мержить, пока freshness live-route workflow copy снова закреплен в API README audit note, `/plan` docs href и Web build.",
  ownerRole: "Sources owner + Docs owner + CI owner",
  repairTargets:
    "apps/api/README.md#source-freshness-write-api-draft,/plan,apps/web/scripts/source-freshness-write-live-route-workflow-copy.mjs,.github/workflows/web-build.yml",
  sourceMarkerSelector: "[data-testid='source-freshness-write-live-route-workflow-copy']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "freshness live-route workflow copy проходит, но API README или `/plan` больше не объясняют freshness audit drift"],
    ["Fix order", "сначала восстановить README audit note, затем `/plan` docs copy и route smoke expectations"],
    ["Owner", "Sources owner подтверждает freshness write audit note, Docs owner подтверждает README anchor, CI owner подтверждает Web build order"],
    ["No merge", "не мержить, пока freshness live-route docs copy снова не защищает audit note"],
  ],
};

const sourceFreshnessWriteLiveRouteReadmeTriggerCopy = {
  apiRoute: sourceFreshnessWriteLiveRouteDocsCopy.apiRoute,
  command: "npm run smoke:source-freshness-write-live-route-readme-trigger-copy",
  docsCommand: sourceFreshnessWriteLiveRouteDocsCopy.command,
  docsHref: sourceFreshnessWriteLiveRouteDocsCopy.docsHref,
  expectedBreachCount: sourceFreshnessWriteLiveRouteDocsCopy.expectedBreachCount,
  expectedRequestFieldCount: sourceFreshnessWriteLiveRouteDocsCopy.expectedRequestFieldCount,
  expectedRouteCount: sourceFreshnessWriteLiveRouteDocsCopy.expectedRouteCount,
  expectedWorkflowPathCount: 2,
  failingCommand: sourceFreshnessWriteLiveRouteDocsCopy.command,
  noMergeCopy:
    "Не мержить, пока freshness live-route docs copy снова закреплен в apps/api/README.md trigger path и Web build.",
  ownerRole: "Sources owner + Docs owner + CI owner",
  readmePath: "apps/api/README.md",
  repairTargets:
    "apps/api/README.md,.github/workflows/web-build.yml,/plan,apps/web/scripts/source-freshness-write-live-route-docs-copy.mjs",
  sourceMarkerSelector: "[data-testid='source-freshness-write-live-route-docs-copy']",
  triggerPath: "apps/api/README.md",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "freshness live-route docs copy есть, но apps/api/README.md больше не запускает Web build"],
    ["Fix order", "сначала вернуть README trigger path, затем `/plan` trigger note и Web build order"],
    ["Owner", "Sources owner подтверждает freshness write docs, Docs owner подтверждает README path, CI owner подтверждает pull_request/push triggers"],
    ["No merge", "не мержить, пока freshness README trigger copy снова не защищает docs-only drift"],
  ],
};

const sourceFreshnessWriteLiveRouteReadmeRenderedCopy = {
  apiRoute: sourceFreshnessWriteLiveRouteReadmeTriggerCopy.apiRoute,
  command: "npm run smoke:source-freshness-write-live-route-readme-rendered-copy",
  docsCommand: sourceFreshnessWriteLiveRouteReadmeTriggerCopy.docsCommand,
  docsHref: sourceFreshnessWriteLiveRouteReadmeTriggerCopy.docsHref,
  expectedBreachCount: sourceFreshnessWriteLiveRouteReadmeTriggerCopy.expectedBreachCount,
  expectedRequestFieldCount: sourceFreshnessWriteLiveRouteReadmeTriggerCopy.expectedRequestFieldCount,
  expectedRouteCount: sourceFreshnessWriteLiveRouteReadmeTriggerCopy.expectedRouteCount,
  failingCommand: "npm run smoke -- --url http://127.0.0.1:4177/",
  noMergeCopy:
    "Не мержить, пока rendered routes smoke снова подтверждает freshness README trigger copy, README path и Web build count.",
  ownerRole: "Sources owner + Docs owner + QA owner",
  readmeTriggerCommand: sourceFreshnessWriteLiveRouteReadmeTriggerCopy.command,
  repairTargets:
    "apps/web/scripts/smoke.mjs,/plan,apps/web/scripts/source-freshness-write-live-route-readme-trigger-copy.mjs,.github/workflows/web-build.yml",
  sourceMarkerSelector: "[data-testid='source-freshness-write-live-route-readme-trigger-copy']",
  triggerPath: sourceFreshnessWriteLiveRouteReadmeTriggerCopy.triggerPath,
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "freshness README trigger copy есть в файлах, но rendered route smoke больше не требует этот `/plan` marker"],
    ["Fix order", "сначала вернуть freshness README trigger block в route smoke, затем Web build count и workflow order"],
    ["Owner", "Sources owner подтверждает freshness write docs, Docs owner подтверждает README trigger copy, QA owner подтверждает rendered route smoke"],
    ["No merge", "не мержить, пока freshness README trigger copy снова не защищен rendered routes"],
  ],
};

const sourceFreshnessWriteLiveRouteReadmeWorkflowCopy = {
  apiRoute: sourceFreshnessWriteLiveRouteReadmeRenderedCopy.apiRoute,
  command: "npm run smoke:source-freshness-write-live-route-readme-workflow-copy",
  docsHref: sourceFreshnessWriteLiveRouteReadmeRenderedCopy.docsHref,
  expectedBreachCount: sourceFreshnessWriteLiveRouteReadmeRenderedCopy.expectedBreachCount,
  expectedRequestFieldCount: sourceFreshnessWriteLiveRouteReadmeRenderedCopy.expectedRequestFieldCount,
  expectedRouteCount: sourceFreshnessWriteLiveRouteReadmeRenderedCopy.expectedRouteCount,
  failingCommand: "npm run smoke:web-build-workflow",
  noMergeCopy:
    "Не мержить, пока Web build снова запускает freshness README rendered copy перед workflow failure и freshness rendered checks.",
  ownerRole: "Sources owner + CI owner + QA owner",
  readmeRenderedCommand: sourceFreshnessWriteLiveRouteReadmeRenderedCopy.command,
  repairTargets:
    ".github/workflows/web-build.yml,/plan,apps/web/scripts/source-freshness-write-live-route-readme-rendered-copy.mjs,apps/web/scripts/web-build-workflow-file.mjs",
  sourceMarkerSelector: "[data-testid='source-freshness-write-live-route-readme-rendered-copy']",
  workflowFailureCommand: sourceFreshnessWriteWorkflowFailureCopy.command,
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "freshness README rendered copy есть на `/plan`, но Web build не держит его перед workflow failure copy"],
    ["Fix order", "сначала восстановить freshness README rendered copy, затем README workflow copy и только потом workflow failure copy"],
    ["Owner", "Sources owner подтверждает freshness README rendered copy, CI owner подтверждает порядок Web build, QA owner подтверждает route smoke"],
    ["No merge", "не мержить, пока freshness README workflow order снова не защищает rendered copy"],
  ],
};

const sourceFreshnessWriteLiveRouteReadmeWorkflowFailureCopy = {
  apiRoute: sourceFreshnessWriteLiveRouteReadmeWorkflowCopy.apiRoute,
  command: "npm run smoke:source-freshness-write-live-route-readme-workflow-failure-copy",
  docsHref: sourceFreshnessWriteLiveRouteReadmeWorkflowCopy.docsHref,
  expectedBreachCount: sourceFreshnessWriteLiveRouteReadmeWorkflowCopy.expectedBreachCount,
  expectedRequestFieldCount: sourceFreshnessWriteLiveRouteReadmeWorkflowCopy.expectedRequestFieldCount,
  expectedRouteCount: sourceFreshnessWriteLiveRouteReadmeWorkflowCopy.expectedRouteCount,
  failingCommand: "npm run smoke:web-build-workflow",
  noMergeCopy:
    "Не мержить, пока Web build снова запускает freshness README workflow copy перед workflow failure и freshness rendered checks.",
  ownerRole: "Sources owner + CI owner + QA owner",
  readmeWorkflowCommand: sourceFreshnessWriteLiveRouteReadmeWorkflowCopy.command,
  repairTargets:
    ".github/workflows/web-build.yml,/plan,apps/web/scripts/source-freshness-write-live-route-readme-workflow-copy.mjs,apps/web/scripts/source-freshness-write-workflow-failure-copy.mjs",
  sourceMarkerSelector: "[data-testid='source-freshness-write-live-route-readme-workflow-copy']",
  workflowFailureCommand: sourceFreshnessWriteWorkflowFailureCopy.command,
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "freshness README workflow copy есть на `/plan`, но failure guard больше не защищает его порядок"],
    ["Fix order", "сначала вернуть freshness README workflow copy, затем README workflow failure copy и только потом freshness workflow failure"],
    ["Owner", "Sources owner подтверждает freshness README workflow copy, CI owner подтверждает порядок Web build, QA owner подтверждает route smoke"],
    ["No merge", "не мержить, пока freshness README workflow failure guard снова не защищает README workflow copy"],
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

const eisRealNetworkApprovalDocsFailureCopy = {
  apiRoute: "/v1/sources/connectors",
  command: "npm run smoke:eis-real-network-approval-docs-failure-copy",
  docsHref:
    "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#eis-real-network-approval-api-copy",
  expectedApprovalCount: 5,
  expectedRouteCount: 16,
  failingCommand: "npm run smoke:eis-real-network-approval-api-copy",
  noMergeCopy:
    "Не мержить, пока EIS approval docs снова подтверждают README anchor, `/plan` docs href, Data owner approvals, safe EIS procedure и checksum freshness receipt.",
  ownerRole: "Data owner + Docs owner + QA owner",
  parityCommand: "npm run smoke:eis-real-network-approval-api-copy",
  repairTargets:
    "apps/api/README.md#eis-real-network-approval-api-copy,/plan,apps/web/scripts/eis-real-network-approval-api-copy.mjs,apps/web/scripts/eis-real-network-approval-docs-failure-copy.mjs",
  sourceMarkerSelector: "[data-testid='eis-real-network-approval-api-copy']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "EIS approval smoke проходит частично, но потерян README anchor или `/plan` docs href"],
    ["Fix order", "сначала восстановить API README anchor, затем `/plan` docsHref и route smoke expectations"],
    ["Owner", "Docs owner подтверждает README anchor, Data owner подтверждает approvals, QA owner подтверждает smoke"],
    ["No merge", "не мержить, пока EIS approval docs снова не проходят contract-only gate"],
  ],
};

const eisRealNetworkApprovalRenderedRouteFailureCopy = {
  apiRoute: "/v1/sources/connectors",
  command: "npm run smoke:eis-real-network-approval-rendered-route-failure-copy",
  docsHref:
    "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#eis-real-network-approval-api-copy",
  expectedApprovalCount: 5,
  expectedRouteCount: 16,
  failingCommand: "npm run smoke -- --url http://127.0.0.1:4177/",
  noMergeCopy:
    "Не мержить, пока rendered routes smoke снова подтверждает EIS approval API marker, docs href, Data owner approvals, safe EIS procedure и checksum freshness receipt.",
  ownerRole: "Data owner + API owner + QA owner",
  parityCommand: "npm run smoke:eis-real-network-approval-api-copy",
  repairTargets:
    "/sources,/plan,apps/web/scripts/smoke.mjs,apps/web/scripts/eis-real-network-approval-api-copy.mjs",
  sourceMarkerSelector: "[data-testid='eis-real-network-approval-api-copy']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "rendered routes проходят частично, но `/sources` или `/plan` потеряли EIS approval marker, docs href или Data approvals"],
    ["Fix order", "сначала восстановить `/sources` EIS approval marker, затем `/plan` marker и route smoke expectations"],
    ["Owner", "Data owner подтверждает safe EIS procedure и rate limits, API owner подтверждает DTO, QA owner подтверждает rendered routes"],
    ["No merge", "не мержить, пока EIS approval снова не проходит rendered route coverage"],
  ],
};

const eisRealNetworkApprovalWorkflowFailureCopy = {
  apiRoute: "/v1/sources/connectors",
  command: "npm run smoke:eis-real-network-approval-workflow-failure-copy",
  docsHref:
    "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#eis-real-network-approval-api-copy",
  expectedApprovalCount: 5,
  expectedRouteCount: 16,
  failingCommand: "npm run smoke:web-build-workflow",
  noMergeCopy:
    "Не мержить, пока Web build снова запускает EIS real-network approval API, smoke, docs и rendered-route checks в правильном порядке перед AI review checks.",
  ownerRole: "Data owner + CI owner + QA owner",
  parityCommand: "npm run smoke:eis-real-network-approval-api-copy",
  repairTargets:
    ".github/workflows/web-build.yml,/plan,apps/web/scripts/eis-real-network-approval-api-copy.mjs,apps/web/scripts/eis-real-network-approval-rendered-route-failure-copy.mjs",
  sourceMarkerSelector: "[data-testid='eis-real-network-approval-rendered-route-failure-copy']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "EIS approval checks есть по отдельности, но Web build поменял порядок или выпустил один из approval gates"],
    ["Fix order", "вернуть API copy, smoke failure, docs failure, rendered-route failure и workflow failure copy перед AI review checks"],
    ["Owner", "Data owner подтверждает approvals, CI owner подтверждает порядок Web build, QA owner подтверждает route coverage"],
    ["No merge", "не мержить, пока EIS real-network approval workflow order снова не защищает всю approval цепочку"],
  ],
};

const eisRealNetworkApprovalLiveRouteGateNote = {
  apiRoute: eisRealNetworkApprovalRenderedRouteFailureCopy.apiRoute,
  command: "npm run smoke:eis-real-network-approval-live-route",
  docsHref: eisRealNetworkApprovalRenderedRouteFailureCopy.docsHref,
  expectedApprovalCount: eisRealNetworkApprovalRenderedRouteFailureCopy.expectedApprovalCount,
  expectedRouteCount: eisRealNetworkApprovalRenderedRouteFailureCopy.expectedRouteCount,
  markerSelector: "[data-testid='eis-real-network-approval-rendered-route-failure-copy']",
  parityCommand: eisRealNetworkApprovalRenderedRouteFailureCopy.parityCommand,
  routeSmokeCommand: "npm run smoke -- --url http://127.0.0.1:4177/",
  sourceSmokeCommand: eisRealNetworkApprovalApiCopy.command,
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Static approval gate", "Web build сначала сверяет EIS approval API copy, smoke failure, docs anchor и rendered-route failure copy"],
    ["Live route gate", "затем route smoke проверяет `/plan` + `/sources` EIS approval markers на живом сервере"],
    ["Plan marker", "eis-real-network-approval-rendered-route-failure-copy остается источником route, docsHref и parity command"],
    ["Merge gate", "EIS approval drift должен падать до workflow failure copy и до AI review checks"],
  ],
};

const eisRealNetworkApprovalLiveRouteFailureCopy = {
  apiRoute: eisRealNetworkApprovalRenderedRouteFailureCopy.apiRoute,
  command: "npm run smoke:eis-real-network-approval-live-route-failure-copy",
  docsHref: eisRealNetworkApprovalRenderedRouteFailureCopy.docsHref,
  expectedApprovalCount: eisRealNetworkApprovalRenderedRouteFailureCopy.expectedApprovalCount,
  expectedRouteCount: eisRealNetworkApprovalRenderedRouteFailureCopy.expectedRouteCount,
  failingCommand: eisRealNetworkApprovalLiveRouteGateNote.command,
  noMergeCopy:
    "Не мержить, пока Web build снова держит EIS real-network approval live-route gate перед workflow failure copy и AI review checks.",
  ownerRole: "Data owner + CI owner + QA owner",
  repairTargets:
    ".github/workflows/web-build.yml,/plan,apps/web/scripts/eis-real-network-approval-live-route-gate.mjs,apps/web/scripts/smoke.mjs",
  routeSmokeCommand: eisRealNetworkApprovalLiveRouteGateNote.routeSmokeCommand,
  sourceMarkerSelector: "[data-testid='eis-real-network-approval-live-route-gate-note']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "EIS approval live-route gate падает: `/plan` или live route smoke потеряли approval marker"],
    ["Fix order", "сначала восстановить live-route gate note, затем route smoke expectations и Web build порядок"],
    ["Owner", "Data owner подтверждает approval gate, CI owner подтверждает порядок Web build, QA owner подтверждает live route"],
    ["No merge", "не мержить, пока EIS approval live-route gate снова не защищает approval chain на живом сервере"],
  ],
};

const eisRealNetworkApprovalLiveRouteRenderedCopy = {
  apiRoute: eisRealNetworkApprovalRenderedRouteFailureCopy.apiRoute,
  command: "npm run smoke:eis-real-network-approval-live-route-rendered-copy",
  docsHref: eisRealNetworkApprovalRenderedRouteFailureCopy.docsHref,
  expectedApprovalCount: eisRealNetworkApprovalRenderedRouteFailureCopy.expectedApprovalCount,
  expectedRouteCount: eisRealNetworkApprovalRenderedRouteFailureCopy.expectedRouteCount,
  failingCommand: eisRealNetworkApprovalLiveRouteGateNote.routeSmokeCommand,
  liveFailureCommand: eisRealNetworkApprovalLiveRouteFailureCopy.command,
  noMergeCopy:
    "Не мержить, пока rendered routes smoke снова подтверждает EIS approval live-route failure copy, docs href и route smoke command.",
  ownerRole: "Data owner + CI owner + QA owner",
  repairTargets:
    "/plan,apps/web/scripts/smoke.mjs,apps/web/scripts/eis-real-network-approval-live-route-failure-copy.mjs,.github/workflows/web-build.yml",
  sourceMarkerSelector: "[data-testid='eis-real-network-approval-live-route-failure-copy']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "route smoke проходит частично, но `/plan` потерял EIS approval live-route failure copy"],
    ["Fix order", "сначала восстановить live-route failure copy, затем rendered route smoke expectations и Web build порядок"],
    ["Owner", "Data owner подтверждает EIS approval live-route copy, CI owner подтверждает workflow order, QA owner подтверждает rendered route smoke"],
    ["No merge", "не мержить, пока EIS approval live-route copy снова закреплен в rendered routes"],
  ],
};

const eisRealNetworkApprovalLiveRouteWorkflowCopy = {
  apiRoute: eisRealNetworkApprovalRenderedRouteFailureCopy.apiRoute,
  command: "npm run smoke:eis-real-network-approval-live-route-workflow-copy",
  docsHref: eisRealNetworkApprovalRenderedRouteFailureCopy.docsHref,
  expectedApprovalCount: eisRealNetworkApprovalRenderedRouteFailureCopy.expectedApprovalCount,
  expectedRouteCount: eisRealNetworkApprovalRenderedRouteFailureCopy.expectedRouteCount,
  failingCommand: "npm run smoke:web-build-workflow",
  liveRenderedCommand: eisRealNetworkApprovalLiveRouteRenderedCopy.command,
  workflowFailureCommand: eisRealNetworkApprovalWorkflowFailureCopy.command,
  noMergeCopy:
    "Не мержить, пока Web build снова запускает EIS real-network approval live-route rendered copy перед workflow failure copy и AI review checks.",
  ownerRole: "Data owner + CI owner + QA owner",
  repairTargets:
    ".github/workflows/web-build.yml,/plan,apps/web/scripts/eis-real-network-approval-live-route-rendered-copy.mjs,apps/web/scripts/web-build-workflow-file.mjs",
  sourceMarkerSelector: "[data-testid='eis-real-network-approval-live-route-rendered-copy']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "EIS approval live-route rendered copy есть на `/plan`, но Web build не держит его перед workflow failure copy"],
    ["Fix order", "сначала восстановить live-route rendered copy, затем live-route workflow copy и только потом workflow failure copy"],
    ["Owner", "Data owner подтверждает EIS approval live-route copy, CI owner подтверждает порядок Web build, QA owner подтверждает route smoke"],
    ["No merge", "не мержить, пока EIS approval live-route workflow order снова не защищает rendered copy"],
  ],
};

const eisRealNetworkApprovalLiveRouteDocsCopy = {
  apiRoute: eisRealNetworkApprovalRenderedRouteFailureCopy.apiRoute,
  auditNote:
    "README anchor, /plan docs href and Data owner approval warning must drift before AI review checks.",
  command: "npm run smoke:eis-real-network-approval-live-route-docs-copy",
  docsHref: eisRealNetworkApprovalRenderedRouteFailureCopy.docsHref,
  expectedApprovalCount: eisRealNetworkApprovalRenderedRouteFailureCopy.expectedApprovalCount,
  expectedRouteCount: eisRealNetworkApprovalRenderedRouteFailureCopy.expectedRouteCount,
  failingCommand: eisRealNetworkApprovalLiveRouteWorkflowCopy.command,
  liveWorkflowCommand: eisRealNetworkApprovalLiveRouteWorkflowCopy.command,
  noMergeCopy:
    "Не мержить, пока EIS live-route workflow copy снова закреплен в API README approval note, `/plan` docs href и Web build.",
  ownerRole: "Data owner + Docs owner + CI owner",
  repairTargets:
    "apps/api/README.md#eis-real-network-approval-api-copy,/plan,apps/web/scripts/eis-real-network-approval-live-route-workflow-copy.mjs,.github/workflows/web-build.yml",
  sourceMarkerSelector: "[data-testid='eis-real-network-approval-live-route-workflow-copy']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "EIS live-route workflow copy проходит, но API README или `/plan` больше не объясняют approval drift"],
    ["Fix order", "сначала восстановить README approval note, затем `/plan` docs copy и route smoke expectations"],
    ["Owner", "Data owner подтверждает approval warning, Docs owner подтверждает README anchor, CI owner подтверждает Web build order"],
    ["No merge", "не мержить, пока EIS live-route docs copy снова не защищает approval note"],
  ],
};

const eisRealNetworkApprovalLiveRouteReadmeTriggerCopy = {
  apiRoute: eisRealNetworkApprovalLiveRouteDocsCopy.apiRoute,
  auditNote: eisRealNetworkApprovalLiveRouteDocsCopy.auditNote,
  command: "npm run smoke:eis-real-network-approval-live-route-readme-trigger-copy",
  docsCommand: eisRealNetworkApprovalLiveRouteDocsCopy.command,
  docsHref: eisRealNetworkApprovalLiveRouteDocsCopy.docsHref,
  expectedApprovalCount: eisRealNetworkApprovalLiveRouteDocsCopy.expectedApprovalCount,
  expectedRouteCount: eisRealNetworkApprovalLiveRouteDocsCopy.expectedRouteCount,
  expectedWorkflowPathCount: 2,
  failingCommand: eisRealNetworkApprovalLiveRouteDocsCopy.command,
  noMergeCopy:
    "Не мержить, пока EIS live-route docs copy снова закреплен в apps/api/README.md trigger path и Web build.",
  ownerRole: "Data owner + Docs owner + CI owner",
  readmePath: "apps/api/README.md",
  repairTargets:
    "apps/api/README.md,.github/workflows/web-build.yml,/plan,apps/web/scripts/eis-real-network-approval-live-route-docs-copy.mjs",
  sourceMarkerSelector: "[data-testid='eis-real-network-approval-live-route-docs-copy']",
  triggerPath: "apps/api/README.md",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "EIS live-route docs copy есть, но apps/api/README.md больше не запускает Web build"],
    ["Fix order", "сначала вернуть README trigger path, затем `/plan` trigger note и Web build order"],
    ["Owner", "Data owner подтверждает EIS approval copy, Docs owner подтверждает README path, CI owner подтверждает pull_request/push triggers"],
    ["No merge", "не мержить, пока EIS README trigger copy снова не защищает docs-only drift"],
  ],
};

const eisRealNetworkApprovalLiveRouteReadmeRenderedCopy = {
  apiRoute: eisRealNetworkApprovalLiveRouteReadmeTriggerCopy.apiRoute,
  auditNote: eisRealNetworkApprovalLiveRouteReadmeTriggerCopy.auditNote,
  command: "npm run smoke:eis-real-network-approval-live-route-readme-rendered-copy",
  docsCommand: eisRealNetworkApprovalLiveRouteReadmeTriggerCopy.docsCommand,
  docsHref: eisRealNetworkApprovalLiveRouteReadmeTriggerCopy.docsHref,
  expectedApprovalCount: eisRealNetworkApprovalLiveRouteReadmeTriggerCopy.expectedApprovalCount,
  expectedRouteCount: eisRealNetworkApprovalLiveRouteReadmeTriggerCopy.expectedRouteCount,
  failingCommand: "npm run smoke -- --url http://127.0.0.1:4177/",
  noMergeCopy:
    "Не мержить, пока rendered routes smoke снова подтверждает EIS README trigger copy, README path и Web build count.",
  ownerRole: "Data owner + Docs owner + QA owner",
  readmeTriggerCommand: eisRealNetworkApprovalLiveRouteReadmeTriggerCopy.command,
  repairTargets:
    "apps/web/scripts/smoke.mjs,/plan,apps/web/scripts/eis-real-network-approval-live-route-readme-trigger-copy.mjs,.github/workflows/web-build.yml",
  sourceMarkerSelector: "[data-testid='eis-real-network-approval-live-route-readme-trigger-copy']",
  triggerPath: eisRealNetworkApprovalLiveRouteReadmeTriggerCopy.triggerPath,
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "EIS README trigger copy есть в файлах, но rendered route smoke больше не требует этот `/plan` marker"],
    ["Fix order", "сначала вернуть EIS README trigger block в route smoke, затем Web build count и workflow order"],
    ["Owner", "Data owner подтверждает approval copy, Docs owner подтверждает README trigger copy, QA owner подтверждает rendered route smoke"],
    ["No merge", "не мержить, пока EIS README trigger copy снова не защищен rendered routes"],
  ],
};

const eisRealNetworkApprovalLiveRouteReadmeWorkflowCopy = {
  apiRoute: eisRealNetworkApprovalLiveRouteReadmeRenderedCopy.apiRoute,
  auditNote: eisRealNetworkApprovalLiveRouteReadmeRenderedCopy.auditNote,
  command: "npm run smoke:eis-real-network-approval-live-route-readme-workflow-copy",
  docsCommand: eisRealNetworkApprovalLiveRouteReadmeRenderedCopy.docsCommand,
  docsHref: eisRealNetworkApprovalLiveRouteReadmeRenderedCopy.docsHref,
  expectedApprovalCount: eisRealNetworkApprovalLiveRouteReadmeRenderedCopy.expectedApprovalCount,
  expectedRouteCount: eisRealNetworkApprovalLiveRouteReadmeRenderedCopy.expectedRouteCount,
  failingCommand: "npm run smoke:web-build-workflow",
  noMergeCopy:
    "Не мержить, пока Web build снова запускает EIS README rendered copy перед workflow failure и AI review checks.",
  ownerRole: "Data owner + CI owner + QA owner",
  readmeRenderedCommand: eisRealNetworkApprovalLiveRouteReadmeRenderedCopy.command,
  repairTargets:
    ".github/workflows/web-build.yml,/plan,apps/web/scripts/eis-real-network-approval-live-route-readme-rendered-copy.mjs,apps/web/scripts/web-build-workflow-file.mjs",
  sourceMarkerSelector: "[data-testid='eis-real-network-approval-live-route-readme-rendered-copy']",
  triggerPath: eisRealNetworkApprovalLiveRouteReadmeRenderedCopy.triggerPath,
  workflowFailureCommand: eisRealNetworkApprovalWorkflowFailureCopy.command,
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "EIS README rendered copy есть на `/plan`, но Web build не держит его перед workflow failure copy"],
    ["Fix order", "сначала восстановить EIS README rendered copy, затем README workflow copy и только потом workflow failure copy"],
    ["Owner", "Data owner подтверждает approval copy, CI owner подтверждает порядок Web build, QA owner подтверждает route smoke"],
    ["No merge", "не мержить, пока EIS README workflow order снова не защищает rendered copy"],
  ],
};

const eisRealNetworkApprovalLiveRouteReadmeWorkflowFailureCopy = {
  apiRoute: eisRealNetworkApprovalLiveRouteReadmeWorkflowCopy.apiRoute,
  auditNote: eisRealNetworkApprovalLiveRouteReadmeWorkflowCopy.auditNote,
  command: "npm run smoke:eis-real-network-approval-live-route-readme-workflow-failure-copy",
  docsCommand: eisRealNetworkApprovalLiveRouteReadmeWorkflowCopy.docsCommand,
  docsHref: eisRealNetworkApprovalLiveRouteReadmeWorkflowCopy.docsHref,
  expectedApprovalCount: eisRealNetworkApprovalLiveRouteReadmeWorkflowCopy.expectedApprovalCount,
  expectedRouteCount: eisRealNetworkApprovalLiveRouteReadmeWorkflowCopy.expectedRouteCount,
  failingCommand: "npm run smoke:web-build-workflow",
  noMergeCopy:
    "Не мержить, пока Web build снова запускает EIS README workflow copy перед workflow failure и AI review checks.",
  ownerRole: "Data owner + CI owner + QA owner",
  readmeWorkflowCommand: eisRealNetworkApprovalLiveRouteReadmeWorkflowCopy.command,
  repairTargets:
    ".github/workflows/web-build.yml,/plan,apps/web/scripts/eis-real-network-approval-live-route-readme-workflow-copy.mjs,apps/web/scripts/eis-real-network-approval-workflow-failure-copy.mjs",
  sourceMarkerSelector: "[data-testid='eis-real-network-approval-live-route-readme-workflow-copy']",
  triggerPath: eisRealNetworkApprovalLiveRouteReadmeWorkflowCopy.triggerPath,
  workflowFailureCommand: eisRealNetworkApprovalWorkflowFailureCopy.command,
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "EIS README workflow copy есть на `/plan`, но failure guard больше не защищает его порядок"],
    ["Fix order", "сначала вернуть EIS README workflow copy, затем README workflow failure copy и только потом EIS workflow failure"],
    ["Owner", "Data owner подтверждает EIS README workflow copy, CI owner подтверждает порядок Web build, QA owner подтверждает route smoke"],
    ["No merge", "не мержить, пока EIS README workflow failure guard снова не защищает README workflow copy"],
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
  expectedCommandCount: 99,
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
    "[data-testid='ai-review-receipt-write-docs-failure-copy']",
    "[data-testid='ai-review-receipt-write-rendered-route-failure-copy']",
    "[data-testid='ai-review-receipt-write-live-route-gate-note']",
    "[data-testid='ai-review-receipt-write-live-route-failure-copy']",
    "[data-testid='ai-review-receipt-write-live-route-rendered-copy']",
    "[data-testid='ai-review-receipt-write-live-route-workflow-copy']",
    "[data-testid='ai-review-receipt-write-live-route-docs-copy']",
    "[data-testid='ai-review-receipt-write-live-route-readme-trigger-copy']",
    "[data-testid='ai-review-receipt-write-live-route-readme-rendered-copy']",
    "[data-testid='ai-review-receipt-write-live-route-readme-workflow-copy']",
    "[data-testid='ai-review-receipt-write-live-route-readme-workflow-failure-copy']",
    "[data-testid='ai-review-receipt-write-workflow-failure-copy']",
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
    "[data-testid='source-owner-receipt-write-rendered-route-failure-copy']",
    "[data-testid='source-owner-receipt-write-live-route-gate-note']",
    "[data-testid='source-owner-receipt-write-live-route-failure-copy']",
    "[data-testid='source-owner-receipt-write-live-route-rendered-copy']",
    "[data-testid='source-owner-receipt-write-live-route-workflow-copy']",
    "[data-testid='source-owner-receipt-write-live-route-docs-copy']",
    "[data-testid='source-owner-receipt-write-live-route-readme-trigger-copy']",
    "[data-testid='source-owner-receipt-write-live-route-readme-rendered-copy']",
    "[data-testid='source-owner-receipt-write-live-route-readme-workflow-copy']",
    "[data-testid='source-owner-receipt-write-live-route-readme-workflow-failure-copy']",
    "[data-testid='source-owner-receipt-write-workflow-failure-copy']",
    "[data-testid='source-freshness-write-api-draft']",
    "[data-testid='source-freshness-write-smoke-failure-copy']",
    "[data-testid='source-freshness-write-docs-failure-copy']",
    "[data-testid='source-freshness-write-rendered-route-failure-copy']",
    "[data-testid='source-freshness-write-live-route-gate-note']",
    "[data-testid='source-freshness-write-live-route-failure-copy']",
    "[data-testid='source-freshness-write-live-route-rendered-copy']",
    "[data-testid='source-freshness-write-live-route-workflow-copy']",
    "[data-testid='source-freshness-write-live-route-docs-copy']",
    "[data-testid='source-freshness-write-live-route-readme-trigger-copy']",
    "[data-testid='source-freshness-write-live-route-readme-rendered-copy']",
    "[data-testid='source-freshness-write-live-route-readme-workflow-copy']",
    "[data-testid='source-freshness-write-live-route-readme-workflow-failure-copy']",
    "[data-testid='source-freshness-write-workflow-failure-copy']",
    "[data-testid='source-freshness-rendered-route-failure-copy']",
    "[data-testid='source-freshness-docs-rendered-route-failure-copy']",
    "[data-testid='fns-approvals-rendered-route-failure-copy']",
    "[data-testid='fns-approvals-docs-rendered-route-failure-copy']",
    "[data-testid='fns-real-network-approval-api-copy']",
    "[data-testid='eis-real-network-approval-api-copy']",
    "[data-testid='eis-real-network-approval-smoke-failure-copy']",
    "[data-testid='eis-real-network-approval-docs-failure-copy']",
    "[data-testid='eis-real-network-approval-rendered-route-failure-copy']",
    "[data-testid='eis-real-network-approval-live-route-gate-note']",
    "[data-testid='eis-real-network-approval-live-route-failure-copy']",
    "[data-testid='eis-real-network-approval-live-route-rendered-copy']",
    "[data-testid='eis-real-network-approval-live-route-workflow-copy']",
    "[data-testid='eis-real-network-approval-live-route-docs-copy']",
    "[data-testid='eis-real-network-approval-live-route-readme-trigger-copy']",
    "[data-testid='eis-real-network-approval-live-route-readme-rendered-copy']",
    "[data-testid='eis-real-network-approval-live-route-readme-workflow-copy']",
    "[data-testid='eis-real-network-approval-live-route-readme-workflow-failure-copy']",
    "[data-testid='eis-real-network-approval-workflow-failure-copy']",
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
    ["Commands", "сверяет 99 build/smoke commands, включая live route smoke"],
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

const webBuildWorkflowDocsDeepLink = {
  docsHref: webBuildWorkflowDocsHref,
  expectedCommandCount: webBuildWorkflowFileSmoke.expectedCommandCount,
  fileSmokeSelector: "[data-testid='web-build-workflow-file-smoke']",
  route: "/plan",
  sourceMarkerSelector: "[data-testid='web-build-rendered-route-failure-copy']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: webBuildWorkflowFileSmoke.workflowPath,
  checks: [
    ["Docs href", "вести на реальный workflow YAML, а не только на Actions UI"],
    ["File smoke", "связывать docs link с web-build-workflow-file-smoke"],
    ["Command count", "подтверждать 99 build/smoke commands перед merge"],
    ["Route smoke", "rendered route smoke должен видеть docs href, selector и workflow path"],
  ],
};

const webBuildDocsRenderedRouteFailureCopy = {
  command: webBuildLiveRouteGateNote.routeSmokeCommand,
  docsHref: webBuildWorkflowDocsDeepLink.docsHref,
  expectedCommandCount: webBuildWorkflowDocsDeepLink.expectedCommandCount,
  expectedRouteCount: webBuildRenderedRouteFailureCopy.expectedRouteCount,
  failingCommand: webBuildLiveRouteGateNote.routeSmokeCommand,
  linkSelector: "[data-testid='web-build-workflow-docs-deep-link-anchor']",
  noMergeCopy:
    "Не мержить, пока rendered routes smoke снова подтверждает Web build workflow YAML deep-link на живом `/plan`",
  ownerRole: "Frontend owner + CI owner + QA owner",
  repairTargets:
    "/plan,.github/workflows/web-build.yml,apps/web/scripts/smoke.mjs,[data-testid='web-build-workflow-docs-deep-link']",
  sourceMarkerSelector: "[data-testid='web-build-workflow-docs-deep-link']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: webBuildWorkflowFileSmoke.workflowPath,
  checks: [
    ["Symptom", "rendered routes проходят частично, но `/plan` потерял Web build workflow YAML href или docs anchor"],
    ["Fix order", "сначала восстановить web-build-workflow-docs-deep-link, затем route smoke expectations"],
    ["Owner", "Frontend owner подтверждает `/plan`, CI owner подтверждает workflow YAML, QA owner подтверждает route smoke"],
    ["No merge", "не мержить, пока Web build workflow docs link снова не проходит rendered route coverage"],
  ],
};

const webBuildWorkflowDocsFailureCopy = {
  command: webBuildLiveRouteGateNote.routeSmokeCommand,
  docsHref: webBuildWorkflowDocsDeepLink.docsHref,
  docsMarkerSelector: "[data-testid='web-build-workflow-docs-deep-link']",
  expectedCommandCount: webBuildWorkflowDocsDeepLink.expectedCommandCount,
  expectedRouteCount: webBuildRenderedRouteFailureCopy.expectedRouteCount,
  failingCommand: webBuildFailureCopy.failingCommand,
  linkSelector: "[data-testid='web-build-workflow-docs-deep-link-anchor']",
  noMergeCopy:
    "Не мержить, пока Web build failure copy и workflow YAML docs deep-link снова согласованы на живом `/plan`",
  ownerRole: "Frontend owner + CI owner + Docs owner + QA owner",
  repairTargets:
    "/plan,.github/workflows/web-build.yml,apps/web/scripts/smoke.mjs,[data-testid='web-build-workflow-docs-deep-link']",
  sourceMarkerSelector: "[data-testid='web-build-failure-copy']",
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: webBuildWorkflowFileSmoke.workflowPath,
  checks: [
    ["Symptom", "workflow failure copy есть, но `/plan` потерял Web build workflow YAML href или docs anchor"],
    ["Fix order", "сначала восстановить web-build-failure-copy, затем web-build-workflow-docs-deep-link"],
    [
      "Owner",
      "Frontend owner подтверждает `/plan`, CI owner подтверждает workflow path, Docs owner подтверждает YAML deep-link",
    ],
    ["No merge", "не мержить, пока Web build workflow docs guard снова не проходит route coverage"],
  ],
};

const webBuildLiveDocsWorkflowCopy = {
  checkedWorkflowPath: webBuildWorkflowFileSmoke.workflowPath,
  command: webBuildLiveRouteGateNote.routeSmokeCommand,
  docsHref: webBuildWorkflowDocsDeepLink.docsHref,
  docsMarkerSelector: "[data-testid='web-build-workflow-docs-deep-link']",
  expectedCommandCount: webBuildWorkflowDocsDeepLink.expectedCommandCount,
  expectedRouteCount: webBuildRenderedRouteFailureCopy.expectedRouteCount,
  failingCommand: webBuildLiveRouteGateNote.command,
  linkSelector: webBuildDocsRenderedRouteFailureCopy.linkSelector,
  noMergeCopy:
    "Не мержить, пока Web build live route gate, workflow YAML docs deep-link и rendered route smoke снова согласованы",
  ownerRole: "Frontend owner + CI owner + Docs owner + QA owner",
  repairTargets:
    "/plan,.github/workflows/web-build.yml,apps/web/scripts/smoke.mjs,[data-testid='web-build-workflow-docs-deep-link']",
  sourceMarkerSelector: "[data-testid='web-build-live-route-gate-note']",
  workflowCommand: webBuildLiveRouteGateNote.command,
  workflowHref: webBuildWorkflowHref,
  workflowName: "Web build",
  workflowPath: webBuildWorkflowFileSmoke.workflowPath,
  checks: [
    ["Symptom", "live route gate есть, но workflow YAML docs deep-link или rendered route smoke больше не закрепляют Web build"],
    ["Fix order", "сначала восстановить web-build-live-route-gate-note, затем web-build-workflow-docs-deep-link"],
    ["Owner", "Frontend owner подтверждает `/plan`, CI owner подтверждает workflow path, Docs owner подтверждает YAML deep-link"],
    ["No merge", "не мержить, пока Web build live docs workflow guard снова не проходит route coverage"],
  ],
};

const webBuildReadmeLiveDocsWorkflowCopy = {
  checkedWorkflowPath: webBuildLiveDocsWorkflowCopy.checkedWorkflowPath,
  command: webBuildLiveDocsWorkflowCopy.command,
  docsHref: webBuildLiveDocsWorkflowCopy.docsHref,
  docsMarkerSelector: webBuildLiveDocsWorkflowCopy.docsMarkerSelector,
  expectedCommandCount: webBuildLiveDocsWorkflowCopy.expectedCommandCount,
  expectedRouteCount: webBuildLiveDocsWorkflowCopy.expectedRouteCount,
  failingCommand: webBuildLiveDocsWorkflowCopy.failingCommand,
  linkSelector: webBuildLiveDocsWorkflowCopy.linkSelector,
  noMergeCopy:
    "Не мержить, пока Web build README docs deep-link, live route gate и workflow YAML route smoke снова согласованы",
  ownerRole: webBuildLiveDocsWorkflowCopy.ownerRole,
  repairTargets:
    "/plan,.github/workflows/web-build.yml,apps/web/scripts/smoke.mjs,[data-testid='web-build-live-docs-workflow-copy']",
  sourceMarkerSelector: "[data-testid='web-build-live-docs-workflow-copy']",
  workflowCommand: webBuildLiveDocsWorkflowCopy.workflowCommand,
  workflowHref: webBuildLiveDocsWorkflowCopy.workflowHref,
  workflowName: webBuildLiveDocsWorkflowCopy.workflowName,
  workflowPath: webBuildLiveDocsWorkflowCopy.workflowPath,
  checks: [
    ["Symptom", "YAML docs link есть, но live docs workflow guard больше не связывает Web build с route smoke"],
    ["Fix order", "сначала восстановить web-build-workflow-docs-deep-link, затем web-build-live-docs-workflow-copy"],
    ["Owner", "Frontend owner подтверждает `/plan`, CI owner подтверждает workflow YAML, Docs owner подтверждает deep-link"],
    ["No merge", "не мержить, пока Web build README live docs workflow guard снова не проходит route coverage"],
  ],
};

const webBuildReadmeWorkflowFailureCopy = {
  checkedWorkflowPath: webBuildReadmeLiveDocsWorkflowCopy.checkedWorkflowPath,
  command: webBuildReadmeLiveDocsWorkflowCopy.command,
  docsHref: webBuildReadmeLiveDocsWorkflowCopy.docsHref,
  docsMarkerSelector: webBuildReadmeLiveDocsWorkflowCopy.docsMarkerSelector,
  expectedCommandCount: webBuildReadmeLiveDocsWorkflowCopy.expectedCommandCount,
  expectedRouteCount: webBuildReadmeLiveDocsWorkflowCopy.expectedRouteCount,
  failingCommand: webBuildFailureCopy.command,
  linkSelector: webBuildReadmeLiveDocsWorkflowCopy.linkSelector,
  noMergeCopy:
    "Не мержить, пока Web build README workflow failure guard снова защищает README live docs workflow copy",
  ownerRole: webBuildReadmeLiveDocsWorkflowCopy.ownerRole,
  readmeWorkflowCommand: webBuildReadmeLiveDocsWorkflowCopy.workflowCommand,
  repairTargets:
    "/plan,.github/workflows/web-build.yml,apps/web/scripts/smoke.mjs,[data-testid='web-build-readme-live-docs-workflow-copy']",
  sourceMarkerSelector: "[data-testid='web-build-readme-live-docs-workflow-copy']",
  workflowCommand: webBuildReadmeLiveDocsWorkflowCopy.workflowCommand,
  workflowFailureCommand: webBuildFailureCopy.command,
  workflowHref: webBuildReadmeLiveDocsWorkflowCopy.workflowHref,
  workflowName: webBuildReadmeLiveDocsWorkflowCopy.workflowName,
  workflowPath: webBuildReadmeLiveDocsWorkflowCopy.workflowPath,
  checks: [
    ["Symptom", "README live docs workflow copy есть, но failure guard больше не защищает Web build workflow order"],
    ["Fix order", "сначала восстановить web-build-readme-live-docs-workflow-copy, затем web-build-failure-copy"],
    ["Owner", "Frontend owner подтверждает README workflow copy, CI owner подтверждает Web build order, Docs owner подтверждает YAML"],
    ["No merge", "не мержить, пока Web build README workflow failure guard снова не защищает README workflow copy"],
  ],
};

const webBuildReadmeRenderedRouteFailureCopy = {
  checkedWorkflowPath: webBuildReadmeWorkflowFailureCopy.checkedWorkflowPath,
  command: webBuildLiveRouteGateNote.routeSmokeCommand,
  docsHref: webBuildReadmeWorkflowFailureCopy.docsHref,
  docsMarkerSelector: webBuildReadmeWorkflowFailureCopy.docsMarkerSelector,
  expectedCommandCount: webBuildReadmeWorkflowFailureCopy.expectedCommandCount,
  expectedRouteCount: webBuildReadmeWorkflowFailureCopy.expectedRouteCount,
  failingCommand: webBuildLiveRouteGateNote.routeSmokeCommand,
  linkSelector: webBuildReadmeWorkflowFailureCopy.linkSelector,
  noMergeCopy:
    "Не мержить, пока rendered routes smoke снова подтверждает Web build README workflow failure guard на живом `/plan`",
  ownerRole: "Frontend owner + CI owner + QA owner",
  repairTargets:
    "/plan,.github/workflows/web-build.yml,apps/web/scripts/smoke.mjs,[data-testid='web-build-readme-workflow-failure-copy']",
  sourceMarkerSelector: "[data-testid='web-build-readme-workflow-failure-copy']",
  workflowCommand: webBuildReadmeWorkflowFailureCopy.workflowCommand,
  workflowFailureCommand: webBuildReadmeWorkflowFailureCopy.workflowFailureCommand,
  workflowHref: webBuildReadmeWorkflowFailureCopy.workflowHref,
  workflowName: webBuildReadmeWorkflowFailureCopy.workflowName,
  workflowPath: webBuildReadmeWorkflowFailureCopy.workflowPath,
  checks: [
    ["Symptom", "README workflow failure copy есть, но rendered routes smoke больше не видит Web build README guard"],
    ["Fix order", "сначала восстановить web-build-readme-workflow-failure-copy, затем route smoke expectations"],
    ["Owner", "Frontend owner подтверждает README guard, CI owner подтверждает workflow YAML, QA owner подтверждает `/plan`"],
    ["No merge", "не мержить, пока Web build README rendered-route guard снова не проходит route coverage"],
  ],
};

const webBuildReadmeWorkflowDocsFailureCopy = {
  checkedWorkflowPath: webBuildReadmeRenderedRouteFailureCopy.checkedWorkflowPath,
  command: webBuildReadmeRenderedRouteFailureCopy.command,
  docsHref: webBuildReadmeRenderedRouteFailureCopy.docsHref,
  docsMarkerSelector: webBuildReadmeRenderedRouteFailureCopy.docsMarkerSelector,
  expectedCommandCount: webBuildReadmeRenderedRouteFailureCopy.expectedCommandCount,
  expectedRouteCount: webBuildReadmeRenderedRouteFailureCopy.expectedRouteCount,
  failingCommand: webBuildWorkflowDocsFailureCopy.failingCommand,
  linkSelector: webBuildReadmeRenderedRouteFailureCopy.linkSelector,
  noMergeCopy:
    "Не мержить, пока Web build README rendered-route guard и workflow docs guard снова согласованы на живом `/plan`",
  ownerRole: "Frontend owner + CI owner + Docs owner + QA owner",
  repairTargets:
    "/plan,.github/workflows/web-build.yml,apps/web/scripts/smoke.mjs,[data-testid='web-build-readme-rendered-route-failure-copy']",
  sourceMarkerSelector: "[data-testid='web-build-readme-rendered-route-failure-copy']",
  workflowCommand: webBuildReadmeRenderedRouteFailureCopy.workflowCommand,
  workflowDocsCommand: webBuildWorkflowDocsFailureCopy.command,
  workflowDocsFailureCommand: webBuildWorkflowDocsFailureCopy.failingCommand,
  workflowFailureCommand: webBuildReadmeRenderedRouteFailureCopy.workflowFailureCommand,
  workflowHref: webBuildWorkflowDocsFailureCopy.workflowHref,
  workflowName: webBuildWorkflowDocsFailureCopy.workflowName,
  workflowPath: webBuildWorkflowDocsFailureCopy.workflowPath,
  checks: [
    ["Symptom", "README rendered-route guard есть, но workflow docs guard больше не связывает README guard и Web build YAML"],
    ["Fix order", "сначала восстановить web-build-readme-rendered-route-failure-copy, затем web-build-workflow-docs-failure-copy"],
    ["Owner", "Frontend owner подтверждает README guard, CI owner подтверждает Web build YAML, Docs owner подтверждает workflow docs link"],
    ["No merge", "не мержить, пока Web build README workflow docs guard снова не проходит route coverage"],
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
          data-docs-href={sharedValidationDocsDeepLink.docsHref}
          data-expected-check-count={sharedValidationDocsDeepLink.expectedCheckCount}
          data-link-selector={sharedValidationDocsDeepLink.linkSelector}
          data-readme-path={sharedValidationDocsDeepLink.readmePath}
          data-route={sharedValidationDocsDeepLink.route}
          data-source-marker-selector={sharedValidationDocsDeepLink.sourceMarkerSelector}
          data-testid="shared-validation-docs-deep-link"
          data-workflow-name={sharedValidationDocsDeepLink.workflowName}
          data-workflow-path={sharedValidationDocsDeepLink.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Shared validation API docs deep-link</p>
              <h2>Где проверять shared schema docs gate</h2>
            </div>
            <a
              className="primary-link"
              data-link-selector={sharedValidationDocsDeepLink.linkSelector}
              data-testid="shared-validation-docs-deep-link-anchor"
              href={sharedValidationDocsDeepLink.docsHref}
            >
              Shared README / schema index
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {sharedValidationDocsDeepLink.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>{sharedValidationDocsDeepLink.readmePath}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-checked-workflow-path={sharedValidationWorkflowDocsFailureCopy.checkedWorkflowPath}
          data-command={sharedValidationWorkflowDocsFailureCopy.command}
          data-docs-href={sharedValidationWorkflowDocsFailureCopy.docsHref}
          data-docs-marker-selector={sharedValidationWorkflowDocsFailureCopy.docsMarkerSelector}
          data-expected-check-count={sharedValidationWorkflowDocsFailureCopy.expectedCheckCount}
          data-expected-route-count={sharedValidationWorkflowDocsFailureCopy.expectedRouteCount}
          data-failing-command={sharedValidationWorkflowDocsFailureCopy.failingCommand}
          data-link-selector={sharedValidationWorkflowDocsFailureCopy.linkSelector}
          data-no-merge-copy={sharedValidationWorkflowDocsFailureCopy.noMergeCopy}
          data-owner-role={sharedValidationWorkflowDocsFailureCopy.ownerRole}
          data-readme-path={sharedValidationWorkflowDocsFailureCopy.readmePath}
          data-repair-targets={sharedValidationWorkflowDocsFailureCopy.repairTargets}
          data-source-marker-selector={sharedValidationWorkflowDocsFailureCopy.sourceMarkerSelector}
          data-testid="shared-validation-workflow-docs-failure-copy"
          data-workflow-href={sharedValidationWorkflowDocsFailureCopy.workflowHref}
          data-workflow-name={sharedValidationWorkflowDocsFailureCopy.workflowName}
          data-workflow-path={sharedValidationWorkflowDocsFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Shared validation workflow docs failure copy</p>
              <h2>Что делать, если shared validation workflow docs drift упал</h2>
            </div>
            <a className="primary-link" href={sharedValidationWorkflowDocsFailureCopy.workflowHref}>
              {sharedValidationWorkflowDocsFailureCopy.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {sharedValidationWorkflowDocsFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? sharedValidationWorkflowDocsFailureCopy.noMergeCopy
                    : sharedValidationWorkflowDocsFailureCopy.workflowPath}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-command={sharedValidationDocsRenderedRouteFailureCopy.command}
          data-docs-href={sharedValidationDocsRenderedRouteFailureCopy.docsHref}
          data-expected-check-count={sharedValidationDocsRenderedRouteFailureCopy.expectedCheckCount}
          data-expected-route-count={sharedValidationDocsRenderedRouteFailureCopy.expectedRouteCount}
          data-failing-command={sharedValidationDocsRenderedRouteFailureCopy.failingCommand}
          data-link-selector={sharedValidationDocsRenderedRouteFailureCopy.linkSelector}
          data-no-merge-copy={sharedValidationDocsRenderedRouteFailureCopy.noMergeCopy}
          data-owner-role={sharedValidationDocsRenderedRouteFailureCopy.ownerRole}
          data-readme-path={sharedValidationDocsRenderedRouteFailureCopy.readmePath}
          data-repair-targets={sharedValidationDocsRenderedRouteFailureCopy.repairTargets}
          data-source-marker-selector={sharedValidationDocsRenderedRouteFailureCopy.sourceMarkerSelector}
          data-testid="shared-validation-docs-rendered-route-failure-copy"
          data-workflow-href={sharedValidationDocsRenderedRouteFailureCopy.workflowHref}
          data-workflow-name={sharedValidationDocsRenderedRouteFailureCopy.workflowName}
          data-workflow-path={sharedValidationDocsRenderedRouteFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Shared validation docs rendered-route failure copy</p>
              <h2>Что делать, если shared validation docs пропали в rendered routes</h2>
            </div>
            <a className="primary-link" href={sharedValidationDocsRenderedRouteFailureCopy.workflowHref}>
              {sharedValidationDocsRenderedRouteFailureCopy.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {sharedValidationDocsRenderedRouteFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? sharedValidationDocsRenderedRouteFailureCopy.noMergeCopy
                    : sharedValidationDocsRenderedRouteFailureCopy.readmePath}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-checked-workflow-path={sharedValidationLiveDocsWorkflowCopy.checkedWorkflowPath}
          data-command={sharedValidationLiveDocsWorkflowCopy.command}
          data-docs-href={sharedValidationLiveDocsWorkflowCopy.docsHref}
          data-docs-marker-selector={sharedValidationLiveDocsWorkflowCopy.docsMarkerSelector}
          data-expected-check-count={sharedValidationLiveDocsWorkflowCopy.expectedCheckCount}
          data-expected-route-count={sharedValidationLiveDocsWorkflowCopy.expectedRouteCount}
          data-failing-command={sharedValidationLiveDocsWorkflowCopy.failingCommand}
          data-link-selector={sharedValidationLiveDocsWorkflowCopy.linkSelector}
          data-no-merge-copy={sharedValidationLiveDocsWorkflowCopy.noMergeCopy}
          data-owner-role={sharedValidationLiveDocsWorkflowCopy.ownerRole}
          data-readme-path={sharedValidationLiveDocsWorkflowCopy.readmePath}
          data-repair-targets={sharedValidationLiveDocsWorkflowCopy.repairTargets}
          data-source-marker-selector={sharedValidationLiveDocsWorkflowCopy.sourceMarkerSelector}
          data-testid="shared-validation-live-docs-workflow-copy"
          data-workflow-command={sharedValidationLiveDocsWorkflowCopy.workflowCommand}
          data-workflow-href={sharedValidationLiveDocsWorkflowCopy.workflowHref}
          data-workflow-name={sharedValidationLiveDocsWorkflowCopy.workflowName}
          data-workflow-path={sharedValidationLiveDocsWorkflowCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Shared validation live docs workflow copy</p>
              <h2>Что делать, если shared validation live docs workflow drift упал</h2>
            </div>
            <a className="primary-link" href={sharedValidationLiveDocsWorkflowCopy.workflowHref}>
              {sharedValidationLiveDocsWorkflowCopy.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {sharedValidationLiveDocsWorkflowCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? sharedValidationLiveDocsWorkflowCopy.noMergeCopy
                    : sharedValidationLiveDocsWorkflowCopy.workflowCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-checked-workflow-path={sharedValidationReadmeLiveDocsWorkflowCopy.checkedWorkflowPath}
          data-command={sharedValidationReadmeLiveDocsWorkflowCopy.command}
          data-docs-href={sharedValidationReadmeLiveDocsWorkflowCopy.docsHref}
          data-docs-marker-selector={sharedValidationReadmeLiveDocsWorkflowCopy.docsMarkerSelector}
          data-expected-check-count={sharedValidationReadmeLiveDocsWorkflowCopy.expectedCheckCount}
          data-expected-route-count={sharedValidationReadmeLiveDocsWorkflowCopy.expectedRouteCount}
          data-failing-command={sharedValidationReadmeLiveDocsWorkflowCopy.failingCommand}
          data-link-selector={sharedValidationReadmeLiveDocsWorkflowCopy.linkSelector}
          data-no-merge-copy={sharedValidationReadmeLiveDocsWorkflowCopy.noMergeCopy}
          data-owner-role={sharedValidationReadmeLiveDocsWorkflowCopy.ownerRole}
          data-readme-path={sharedValidationReadmeLiveDocsWorkflowCopy.readmePath}
          data-repair-targets={sharedValidationReadmeLiveDocsWorkflowCopy.repairTargets}
          data-source-marker-selector={sharedValidationReadmeLiveDocsWorkflowCopy.sourceMarkerSelector}
          data-testid="shared-validation-readme-live-docs-workflow-copy"
          data-workflow-command={sharedValidationReadmeLiveDocsWorkflowCopy.workflowCommand}
          data-workflow-href={sharedValidationReadmeLiveDocsWorkflowCopy.workflowHref}
          data-workflow-name={sharedValidationReadmeLiveDocsWorkflowCopy.workflowName}
          data-workflow-path={sharedValidationReadmeLiveDocsWorkflowCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Shared validation README live docs workflow copy</p>
              <h2>Что делать, если shared validation README live docs workflow drift упал</h2>
            </div>
            <a className="primary-link" href={sharedValidationReadmeLiveDocsWorkflowCopy.workflowHref}>
              {sharedValidationReadmeLiveDocsWorkflowCopy.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {sharedValidationReadmeLiveDocsWorkflowCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? "No merge"
                    : title === "Owner"
                      ? "Schema + Docs + CI"
                      : title === "Fix order"
                        ? "docs -> live guard"
                        : "README link"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-checked-workflow-path={sharedValidationReadmeWorkflowFailureCopy.checkedWorkflowPath}
          data-command={sharedValidationReadmeWorkflowFailureCopy.command}
          data-docs-href={sharedValidationReadmeWorkflowFailureCopy.docsHref}
          data-docs-marker-selector={sharedValidationReadmeWorkflowFailureCopy.docsMarkerSelector}
          data-expected-check-count={sharedValidationReadmeWorkflowFailureCopy.expectedCheckCount}
          data-expected-route-count={sharedValidationReadmeWorkflowFailureCopy.expectedRouteCount}
          data-failing-command={sharedValidationReadmeWorkflowFailureCopy.failingCommand}
          data-link-selector={sharedValidationReadmeWorkflowFailureCopy.linkSelector}
          data-no-merge-copy={sharedValidationReadmeWorkflowFailureCopy.noMergeCopy}
          data-owner-role={sharedValidationReadmeWorkflowFailureCopy.ownerRole}
          data-readme-path={sharedValidationReadmeWorkflowFailureCopy.readmePath}
          data-readme-workflow-command={sharedValidationReadmeWorkflowFailureCopy.readmeWorkflowCommand}
          data-repair-targets={sharedValidationReadmeWorkflowFailureCopy.repairTargets}
          data-source-marker-selector={sharedValidationReadmeWorkflowFailureCopy.sourceMarkerSelector}
          data-testid="shared-validation-readme-workflow-failure-copy"
          data-workflow-command={sharedValidationReadmeWorkflowFailureCopy.workflowCommand}
          data-workflow-failure-command={sharedValidationReadmeWorkflowFailureCopy.workflowFailureCommand}
          data-workflow-href={sharedValidationReadmeWorkflowFailureCopy.workflowHref}
          data-workflow-name={sharedValidationReadmeWorkflowFailureCopy.workflowName}
          data-workflow-path={sharedValidationReadmeWorkflowFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Shared validation README workflow failure copy</p>
              <h2>Что делать, если shared validation README workflow failure guard упал</h2>
            </div>
            <a className="primary-link" href={sharedValidationReadmeWorkflowFailureCopy.workflowHref}>
              {sharedValidationReadmeWorkflowFailureCopy.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {sharedValidationReadmeWorkflowFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? "No merge"
                    : title === "Owner"
                      ? "Schema + Docs + CI"
                      : title === "Fix order"
                        ? "README -> failure"
                        : "README workflow"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-checked-workflow-path={sharedValidationReadmeRenderedRouteFailureCopy.checkedWorkflowPath}
          data-command={sharedValidationReadmeRenderedRouteFailureCopy.command}
          data-docs-href={sharedValidationReadmeRenderedRouteFailureCopy.docsHref}
          data-docs-marker-selector={sharedValidationReadmeRenderedRouteFailureCopy.docsMarkerSelector}
          data-expected-check-count={sharedValidationReadmeRenderedRouteFailureCopy.expectedCheckCount}
          data-expected-route-count={sharedValidationReadmeRenderedRouteFailureCopy.expectedRouteCount}
          data-failing-command={sharedValidationReadmeRenderedRouteFailureCopy.failingCommand}
          data-link-selector={sharedValidationReadmeRenderedRouteFailureCopy.linkSelector}
          data-no-merge-copy={sharedValidationReadmeRenderedRouteFailureCopy.noMergeCopy}
          data-owner-role={sharedValidationReadmeRenderedRouteFailureCopy.ownerRole}
          data-readme-path={sharedValidationReadmeRenderedRouteFailureCopy.readmePath}
          data-repair-targets={sharedValidationReadmeRenderedRouteFailureCopy.repairTargets}
          data-source-marker-selector={sharedValidationReadmeRenderedRouteFailureCopy.sourceMarkerSelector}
          data-testid="shared-validation-readme-rendered-route-failure-copy"
          data-workflow-command={sharedValidationReadmeRenderedRouteFailureCopy.workflowCommand}
          data-workflow-failure-command={sharedValidationReadmeRenderedRouteFailureCopy.workflowFailureCommand}
          data-workflow-href={sharedValidationReadmeRenderedRouteFailureCopy.workflowHref}
          data-workflow-name={sharedValidationReadmeRenderedRouteFailureCopy.workflowName}
          data-workflow-path={sharedValidationReadmeRenderedRouteFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Shared validation README rendered-route failure copy</p>
              <h2>Что делать, если shared validation README rendered-route guard упал</h2>
            </div>
            <a className="primary-link" href={sharedValidationReadmeRenderedRouteFailureCopy.workflowHref}>
              {sharedValidationReadmeRenderedRouteFailureCopy.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {sharedValidationReadmeRenderedRouteFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? "No merge"
                    : title === "Owner"
                      ? "Schema + Docs + QA"
                      : title === "Fix order"
                        ? "README -> route smoke"
                        : "Rendered route"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-checked-workflow-path={sharedValidationReadmeWorkflowDocsFailureCopy.checkedWorkflowPath}
          data-command={sharedValidationReadmeWorkflowDocsFailureCopy.command}
          data-docs-href={sharedValidationReadmeWorkflowDocsFailureCopy.docsHref}
          data-docs-marker-selector={sharedValidationReadmeWorkflowDocsFailureCopy.docsMarkerSelector}
          data-expected-check-count={sharedValidationReadmeWorkflowDocsFailureCopy.expectedCheckCount}
          data-expected-route-count={sharedValidationReadmeWorkflowDocsFailureCopy.expectedRouteCount}
          data-failing-command={sharedValidationReadmeWorkflowDocsFailureCopy.failingCommand}
          data-link-selector={sharedValidationReadmeWorkflowDocsFailureCopy.linkSelector}
          data-no-merge-copy={sharedValidationReadmeWorkflowDocsFailureCopy.noMergeCopy}
          data-owner-role={sharedValidationReadmeWorkflowDocsFailureCopy.ownerRole}
          data-readme-path={sharedValidationReadmeWorkflowDocsFailureCopy.readmePath}
          data-repair-targets={sharedValidationReadmeWorkflowDocsFailureCopy.repairTargets}
          data-source-marker-selector={sharedValidationReadmeWorkflowDocsFailureCopy.sourceMarkerSelector}
          data-testid="shared-validation-readme-workflow-docs-failure-copy"
          data-workflow-command={sharedValidationReadmeWorkflowDocsFailureCopy.workflowCommand}
          data-workflow-docs-command={sharedValidationReadmeWorkflowDocsFailureCopy.workflowDocsCommand}
          data-workflow-docs-failure-command={sharedValidationReadmeWorkflowDocsFailureCopy.workflowDocsFailureCommand}
          data-workflow-failure-command={sharedValidationReadmeWorkflowDocsFailureCopy.workflowFailureCommand}
          data-workflow-href={sharedValidationReadmeWorkflowDocsFailureCopy.workflowHref}
          data-workflow-name={sharedValidationReadmeWorkflowDocsFailureCopy.workflowName}
          data-workflow-path={sharedValidationReadmeWorkflowDocsFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Shared validation README workflow docs failure copy</p>
              <h2>Что делать, если shared validation README workflow docs guard упал</h2>
            </div>
            <a className="primary-link" href={sharedValidationReadmeWorkflowDocsFailureCopy.workflowHref}>
              {sharedValidationReadmeWorkflowDocsFailureCopy.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {sharedValidationReadmeWorkflowDocsFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? "No merge"
                    : title === "Owner"
                      ? "Schema + CI + Docs"
                      : title === "Fix order"
                        ? "README -> workflow docs"
                        : "Workflow docs"}
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
          data-api-route={aiReviewReceiptWriteDocsFailureCopy.apiRoute}
          data-command={aiReviewReceiptWriteDocsFailureCopy.command}
          data-docs-href={aiReviewReceiptWriteDocsFailureCopy.docsHref}
          data-expected-queue-count={aiReviewReceiptWriteDocsFailureCopy.expectedQueueCount}
          data-expected-request-field-count={aiReviewReceiptWriteDocsFailureCopy.expectedRequestFieldCount}
          data-expected-route-count={aiReviewReceiptWriteDocsFailureCopy.expectedRouteCount}
          data-failing-command={aiReviewReceiptWriteDocsFailureCopy.failingCommand}
          data-no-merge-copy={aiReviewReceiptWriteDocsFailureCopy.noMergeCopy}
          data-owner-role={aiReviewReceiptWriteDocsFailureCopy.ownerRole}
          data-parity-command={aiReviewReceiptWriteDocsFailureCopy.parityCommand}
          data-repair-targets={aiReviewReceiptWriteDocsFailureCopy.repairTargets}
          data-source-marker-selector={aiReviewReceiptWriteDocsFailureCopy.sourceMarkerSelector}
          data-testid="ai-review-receipt-write-docs-failure-copy"
          data-workflow-href={aiReviewReceiptWriteDocsFailureCopy.workflowHref}
          data-workflow-name={aiReviewReceiptWriteDocsFailureCopy.workflowName}
          data-workflow-path={aiReviewReceiptWriteDocsFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI review receipt write docs failure copy</p>
              <h2>Что делать, если AI write docs anchor упал</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={aiReviewReceiptWriteDocsFailureCopy.workflowHref}>
                {aiReviewReceiptWriteDocsFailureCopy.workflowName}
              </a>
              <a className="primary-link" href={aiReviewReceiptWriteDocsFailureCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {aiReviewReceiptWriteDocsFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge" ? aiReviewReceiptWriteDocsFailureCopy.noMergeCopy : aiReviewReceiptWriteDocsFailureCopy.docsHref}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={aiReviewReceiptWriteRenderedRouteFailureCopy.apiRoute}
          data-command={aiReviewReceiptWriteRenderedRouteFailureCopy.command}
          data-docs-href={aiReviewReceiptWriteRenderedRouteFailureCopy.docsHref}
          data-expected-queue-count={aiReviewReceiptWriteRenderedRouteFailureCopy.expectedQueueCount}
          data-expected-request-field-count={aiReviewReceiptWriteRenderedRouteFailureCopy.expectedRequestFieldCount}
          data-expected-route-count={aiReviewReceiptWriteRenderedRouteFailureCopy.expectedRouteCount}
          data-failing-command={aiReviewReceiptWriteRenderedRouteFailureCopy.failingCommand}
          data-no-merge-copy={aiReviewReceiptWriteRenderedRouteFailureCopy.noMergeCopy}
          data-owner-role={aiReviewReceiptWriteRenderedRouteFailureCopy.ownerRole}
          data-parity-command={aiReviewReceiptWriteRenderedRouteFailureCopy.parityCommand}
          data-repair-targets={aiReviewReceiptWriteRenderedRouteFailureCopy.repairTargets}
          data-source-marker-selector={aiReviewReceiptWriteRenderedRouteFailureCopy.sourceMarkerSelector}
          data-testid="ai-review-receipt-write-rendered-route-failure-copy"
          data-workflow-href={aiReviewReceiptWriteRenderedRouteFailureCopy.workflowHref}
          data-workflow-name={aiReviewReceiptWriteRenderedRouteFailureCopy.workflowName}
          data-workflow-path={aiReviewReceiptWriteRenderedRouteFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI review receipt write rendered-route failure copy</p>
              <h2>Что делать, если AI write draft пропал в rendered routes</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={aiReviewReceiptWriteRenderedRouteFailureCopy.workflowHref}>
                {aiReviewReceiptWriteRenderedRouteFailureCopy.workflowName}
              </a>
              <a className="primary-link" href={aiReviewReceiptWriteRenderedRouteFailureCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {aiReviewReceiptWriteRenderedRouteFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? aiReviewReceiptWriteRenderedRouteFailureCopy.noMergeCopy
                    : aiReviewReceiptWriteRenderedRouteFailureCopy.failingCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={aiReviewReceiptWriteWorkflowFailureCopy.apiRoute}
          data-command={aiReviewReceiptWriteWorkflowFailureCopy.command}
          data-docs-href={aiReviewReceiptWriteWorkflowFailureCopy.docsHref}
          data-expected-queue-count={aiReviewReceiptWriteWorkflowFailureCopy.expectedQueueCount}
          data-expected-request-field-count={aiReviewReceiptWriteWorkflowFailureCopy.expectedRequestFieldCount}
          data-expected-route-count={aiReviewReceiptWriteWorkflowFailureCopy.expectedRouteCount}
          data-failing-command={aiReviewReceiptWriteWorkflowFailureCopy.failingCommand}
          data-no-merge-copy={aiReviewReceiptWriteWorkflowFailureCopy.noMergeCopy}
          data-owner-role={aiReviewReceiptWriteWorkflowFailureCopy.ownerRole}
          data-parity-command={aiReviewReceiptWriteWorkflowFailureCopy.parityCommand}
          data-repair-targets={aiReviewReceiptWriteWorkflowFailureCopy.repairTargets}
          data-source-marker-selector={aiReviewReceiptWriteWorkflowFailureCopy.sourceMarkerSelector}
          data-testid="ai-review-receipt-write-workflow-failure-copy"
          data-workflow-href={aiReviewReceiptWriteWorkflowFailureCopy.workflowHref}
          data-workflow-name={aiReviewReceiptWriteWorkflowFailureCopy.workflowName}
          data-workflow-path={aiReviewReceiptWriteWorkflowFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI review receipt write workflow failure copy</p>
              <h2>Что делать, если AI write workflow order упал</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={aiReviewReceiptWriteWorkflowFailureCopy.workflowHref}>
                {aiReviewReceiptWriteWorkflowFailureCopy.workflowName}
              </a>
              <a className="primary-link" href={aiReviewReceiptWriteWorkflowFailureCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {aiReviewReceiptWriteWorkflowFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? aiReviewReceiptWriteWorkflowFailureCopy.noMergeCopy
                    : aiReviewReceiptWriteWorkflowFailureCopy.failingCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={aiReviewReceiptWriteLiveRouteGateNote.apiRoute}
          data-command={aiReviewReceiptWriteLiveRouteGateNote.command}
          data-docs-href={aiReviewReceiptWriteLiveRouteGateNote.docsHref}
          data-expected-queue-count={aiReviewReceiptWriteLiveRouteGateNote.expectedQueueCount}
          data-expected-request-field-count={aiReviewReceiptWriteLiveRouteGateNote.expectedRequestFieldCount}
          data-expected-route-count={aiReviewReceiptWriteLiveRouteGateNote.expectedRouteCount}
          data-marker-selector={aiReviewReceiptWriteLiveRouteGateNote.markerSelector}
          data-parity-command={aiReviewReceiptWriteLiveRouteGateNote.parityCommand}
          data-route-smoke-command={aiReviewReceiptWriteLiveRouteGateNote.routeSmokeCommand}
          data-source-smoke-command={aiReviewReceiptWriteLiveRouteGateNote.sourceSmokeCommand}
          data-testid="ai-review-receipt-write-live-route-gate-note"
          data-workflow-href={aiReviewReceiptWriteLiveRouteGateNote.workflowHref}
          data-workflow-name={aiReviewReceiptWriteLiveRouteGateNote.workflowName}
          data-workflow-path={aiReviewReceiptWriteLiveRouteGateNote.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI review receipt write live route gate note</p>
              <h2>Как live route smoke защищает AI write draft</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={aiReviewReceiptWriteLiveRouteGateNote.workflowHref}>
                {aiReviewReceiptWriteLiveRouteGateNote.workflowName}
              </a>
              <a className="primary-link" href={aiReviewReceiptWriteLiveRouteGateNote.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {aiReviewReceiptWriteLiveRouteGateNote.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Live route gate"
                    ? aiReviewReceiptWriteLiveRouteGateNote.routeSmokeCommand
                    : aiReviewReceiptWriteLiveRouteGateNote.sourceSmokeCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={aiReviewReceiptWriteLiveRouteFailureCopy.apiRoute}
          data-command={aiReviewReceiptWriteLiveRouteFailureCopy.command}
          data-docs-href={aiReviewReceiptWriteLiveRouteFailureCopy.docsHref}
          data-expected-queue-count={aiReviewReceiptWriteLiveRouteFailureCopy.expectedQueueCount}
          data-expected-request-field-count={aiReviewReceiptWriteLiveRouteFailureCopy.expectedRequestFieldCount}
          data-expected-route-count={aiReviewReceiptWriteLiveRouteFailureCopy.expectedRouteCount}
          data-failing-command={aiReviewReceiptWriteLiveRouteFailureCopy.failingCommand}
          data-no-merge-copy={aiReviewReceiptWriteLiveRouteFailureCopy.noMergeCopy}
          data-owner-role={aiReviewReceiptWriteLiveRouteFailureCopy.ownerRole}
          data-repair-targets={aiReviewReceiptWriteLiveRouteFailureCopy.repairTargets}
          data-route-smoke-command={aiReviewReceiptWriteLiveRouteFailureCopy.routeSmokeCommand}
          data-source-marker-selector={aiReviewReceiptWriteLiveRouteFailureCopy.sourceMarkerSelector}
          data-testid="ai-review-receipt-write-live-route-failure-copy"
          data-workflow-href={aiReviewReceiptWriteLiveRouteFailureCopy.workflowHref}
          data-workflow-name={aiReviewReceiptWriteLiveRouteFailureCopy.workflowName}
          data-workflow-path={aiReviewReceiptWriteLiveRouteFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI review receipt write live-route failure copy</p>
              <h2>Что делать, если AI write live-route gate упал</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={aiReviewReceiptWriteLiveRouteFailureCopy.workflowHref}>
                {aiReviewReceiptWriteLiveRouteFailureCopy.workflowName}
              </a>
              <a className="primary-link" href={aiReviewReceiptWriteLiveRouteFailureCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {aiReviewReceiptWriteLiveRouteFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge" ? aiReviewReceiptWriteLiveRouteFailureCopy.noMergeCopy : aiReviewReceiptWriteLiveRouteFailureCopy.failingCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={aiReviewReceiptWriteLiveRouteRenderedCopy.apiRoute}
          data-command={aiReviewReceiptWriteLiveRouteRenderedCopy.command}
          data-docs-href={aiReviewReceiptWriteLiveRouteRenderedCopy.docsHref}
          data-expected-queue-count={aiReviewReceiptWriteLiveRouteRenderedCopy.expectedQueueCount}
          data-expected-request-field-count={aiReviewReceiptWriteLiveRouteRenderedCopy.expectedRequestFieldCount}
          data-expected-route-count={aiReviewReceiptWriteLiveRouteRenderedCopy.expectedRouteCount}
          data-failing-command={aiReviewReceiptWriteLiveRouteRenderedCopy.failingCommand}
          data-live-failure-command={aiReviewReceiptWriteLiveRouteRenderedCopy.liveFailureCommand}
          data-no-merge-copy={aiReviewReceiptWriteLiveRouteRenderedCopy.noMergeCopy}
          data-owner-role={aiReviewReceiptWriteLiveRouteRenderedCopy.ownerRole}
          data-repair-targets={aiReviewReceiptWriteLiveRouteRenderedCopy.repairTargets}
          data-source-marker-selector={aiReviewReceiptWriteLiveRouteRenderedCopy.sourceMarkerSelector}
          data-testid="ai-review-receipt-write-live-route-rendered-copy"
          data-workflow-href={aiReviewReceiptWriteLiveRouteRenderedCopy.workflowHref}
          data-workflow-name={aiReviewReceiptWriteLiveRouteRenderedCopy.workflowName}
          data-workflow-path={aiReviewReceiptWriteLiveRouteRenderedCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI review receipt write live-route rendered copy</p>
              <h2>Что делать, если AI write live-route copy пропал в rendered routes</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={aiReviewReceiptWriteLiveRouteRenderedCopy.workflowHref}>
                {aiReviewReceiptWriteLiveRouteRenderedCopy.workflowName}
              </a>
              <a className="primary-link" href={aiReviewReceiptWriteLiveRouteRenderedCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {aiReviewReceiptWriteLiveRouteRenderedCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? aiReviewReceiptWriteLiveRouteRenderedCopy.noMergeCopy
                    : aiReviewReceiptWriteLiveRouteRenderedCopy.failingCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={aiReviewReceiptWriteLiveRouteWorkflowCopy.apiRoute}
          data-command={aiReviewReceiptWriteLiveRouteWorkflowCopy.command}
          data-docs-href={aiReviewReceiptWriteLiveRouteWorkflowCopy.docsHref}
          data-expected-queue-count={aiReviewReceiptWriteLiveRouteWorkflowCopy.expectedQueueCount}
          data-expected-request-field-count={aiReviewReceiptWriteLiveRouteWorkflowCopy.expectedRequestFieldCount}
          data-expected-route-count={aiReviewReceiptWriteLiveRouteWorkflowCopy.expectedRouteCount}
          data-failing-command={aiReviewReceiptWriteLiveRouteWorkflowCopy.failingCommand}
          data-live-rendered-command={aiReviewReceiptWriteLiveRouteWorkflowCopy.liveRenderedCommand}
          data-no-merge-copy={aiReviewReceiptWriteLiveRouteWorkflowCopy.noMergeCopy}
          data-owner-role={aiReviewReceiptWriteLiveRouteWorkflowCopy.ownerRole}
          data-repair-targets={aiReviewReceiptWriteLiveRouteWorkflowCopy.repairTargets}
          data-source-marker-selector={aiReviewReceiptWriteLiveRouteWorkflowCopy.sourceMarkerSelector}
          data-testid="ai-review-receipt-write-live-route-workflow-copy"
          data-workflow-failure-command={aiReviewReceiptWriteLiveRouteWorkflowCopy.workflowFailureCommand}
          data-workflow-href={aiReviewReceiptWriteLiveRouteWorkflowCopy.workflowHref}
          data-workflow-name={aiReviewReceiptWriteLiveRouteWorkflowCopy.workflowName}
          data-workflow-path={aiReviewReceiptWriteLiveRouteWorkflowCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI review receipt write live-route workflow copy</p>
              <h2>Что делать, если AI live-route workflow order упал</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={aiReviewReceiptWriteLiveRouteWorkflowCopy.workflowHref}>
                {aiReviewReceiptWriteLiveRouteWorkflowCopy.workflowName}
              </a>
              <a className="primary-link" href={aiReviewReceiptWriteLiveRouteWorkflowCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {aiReviewReceiptWriteLiveRouteWorkflowCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? aiReviewReceiptWriteLiveRouteWorkflowCopy.noMergeCopy
                    : aiReviewReceiptWriteLiveRouteWorkflowCopy.liveRenderedCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={aiReviewReceiptWriteLiveRouteDocsCopy.apiRoute}
          data-audit-note={aiReviewReceiptWriteLiveRouteDocsCopy.auditNote}
          data-command={aiReviewReceiptWriteLiveRouteDocsCopy.command}
          data-docs-href={aiReviewReceiptWriteLiveRouteDocsCopy.docsHref}
          data-expected-queue-count={aiReviewReceiptWriteLiveRouteDocsCopy.expectedQueueCount}
          data-expected-request-field-count={aiReviewReceiptWriteLiveRouteDocsCopy.expectedRequestFieldCount}
          data-expected-route-count={aiReviewReceiptWriteLiveRouteDocsCopy.expectedRouteCount}
          data-failing-command={aiReviewReceiptWriteLiveRouteDocsCopy.failingCommand}
          data-live-workflow-command={aiReviewReceiptWriteLiveRouteDocsCopy.liveWorkflowCommand}
          data-no-merge-copy={aiReviewReceiptWriteLiveRouteDocsCopy.noMergeCopy}
          data-owner-role={aiReviewReceiptWriteLiveRouteDocsCopy.ownerRole}
          data-repair-targets={aiReviewReceiptWriteLiveRouteDocsCopy.repairTargets}
          data-source-marker-selector={aiReviewReceiptWriteLiveRouteDocsCopy.sourceMarkerSelector}
          data-testid="ai-review-receipt-write-live-route-docs-copy"
          data-workflow-href={aiReviewReceiptWriteLiveRouteDocsCopy.workflowHref}
          data-workflow-name={aiReviewReceiptWriteLiveRouteDocsCopy.workflowName}
          data-workflow-path={aiReviewReceiptWriteLiveRouteDocsCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI review receipt write live-route docs copy</p>
              <h2>Что делать, если AI live-route docs copy упал</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={aiReviewReceiptWriteLiveRouteDocsCopy.workflowHref}>
                {aiReviewReceiptWriteLiveRouteDocsCopy.workflowName}
              </a>
              <a className="primary-link" href={aiReviewReceiptWriteLiveRouteDocsCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {aiReviewReceiptWriteLiveRouteDocsCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? aiReviewReceiptWriteLiveRouteDocsCopy.noMergeCopy
                    : aiReviewReceiptWriteLiveRouteDocsCopy.liveWorkflowCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={aiReviewReceiptWriteLiveRouteReadmeTriggerCopy.apiRoute}
          data-command={aiReviewReceiptWriteLiveRouteReadmeTriggerCopy.command}
          data-docs-command={aiReviewReceiptWriteLiveRouteReadmeTriggerCopy.docsCommand}
          data-docs-href={aiReviewReceiptWriteLiveRouteReadmeTriggerCopy.docsHref}
          data-expected-queue-count={aiReviewReceiptWriteLiveRouteReadmeTriggerCopy.expectedQueueCount}
          data-expected-request-field-count={aiReviewReceiptWriteLiveRouteReadmeTriggerCopy.expectedRequestFieldCount}
          data-expected-route-count={aiReviewReceiptWriteLiveRouteReadmeTriggerCopy.expectedRouteCount}
          data-expected-workflow-path-count={aiReviewReceiptWriteLiveRouteReadmeTriggerCopy.expectedWorkflowPathCount}
          data-failing-command={aiReviewReceiptWriteLiveRouteReadmeTriggerCopy.failingCommand}
          data-no-merge-copy={aiReviewReceiptWriteLiveRouteReadmeTriggerCopy.noMergeCopy}
          data-owner-role={aiReviewReceiptWriteLiveRouteReadmeTriggerCopy.ownerRole}
          data-readme-path={aiReviewReceiptWriteLiveRouteReadmeTriggerCopy.readmePath}
          data-repair-targets={aiReviewReceiptWriteLiveRouteReadmeTriggerCopy.repairTargets}
          data-source-marker-selector={aiReviewReceiptWriteLiveRouteReadmeTriggerCopy.sourceMarkerSelector}
          data-testid="ai-review-receipt-write-live-route-readme-trigger-copy"
          data-trigger-path={aiReviewReceiptWriteLiveRouteReadmeTriggerCopy.triggerPath}
          data-workflow-href={aiReviewReceiptWriteLiveRouteReadmeTriggerCopy.workflowHref}
          data-workflow-name={aiReviewReceiptWriteLiveRouteReadmeTriggerCopy.workflowName}
          data-workflow-path={aiReviewReceiptWriteLiveRouteReadmeTriggerCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI review receipt write live-route README trigger copy</p>
              <h2>Что делать, если AI README trigger copy упал</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={aiReviewReceiptWriteLiveRouteReadmeTriggerCopy.workflowHref}>
                {aiReviewReceiptWriteLiveRouteReadmeTriggerCopy.workflowName}
              </a>
              <a className="primary-link" href={aiReviewReceiptWriteLiveRouteReadmeTriggerCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {aiReviewReceiptWriteLiveRouteReadmeTriggerCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? aiReviewReceiptWriteLiveRouteReadmeTriggerCopy.noMergeCopy
                    : aiReviewReceiptWriteLiveRouteReadmeTriggerCopy.triggerPath}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={aiReviewReceiptWriteLiveRouteReadmeRenderedCopy.apiRoute}
          data-command={aiReviewReceiptWriteLiveRouteReadmeRenderedCopy.command}
          data-docs-command={aiReviewReceiptWriteLiveRouteReadmeRenderedCopy.docsCommand}
          data-docs-href={aiReviewReceiptWriteLiveRouteReadmeRenderedCopy.docsHref}
          data-expected-queue-count={aiReviewReceiptWriteLiveRouteReadmeRenderedCopy.expectedQueueCount}
          data-expected-request-field-count={aiReviewReceiptWriteLiveRouteReadmeRenderedCopy.expectedRequestFieldCount}
          data-expected-route-count={aiReviewReceiptWriteLiveRouteReadmeRenderedCopy.expectedRouteCount}
          data-failing-command={aiReviewReceiptWriteLiveRouteReadmeRenderedCopy.failingCommand}
          data-no-merge-copy={aiReviewReceiptWriteLiveRouteReadmeRenderedCopy.noMergeCopy}
          data-owner-role={aiReviewReceiptWriteLiveRouteReadmeRenderedCopy.ownerRole}
          data-readme-trigger-command={aiReviewReceiptWriteLiveRouteReadmeRenderedCopy.readmeTriggerCommand}
          data-repair-targets={aiReviewReceiptWriteLiveRouteReadmeRenderedCopy.repairTargets}
          data-source-marker-selector={aiReviewReceiptWriteLiveRouteReadmeRenderedCopy.sourceMarkerSelector}
          data-testid="ai-review-receipt-write-live-route-readme-rendered-copy"
          data-trigger-path={aiReviewReceiptWriteLiveRouteReadmeRenderedCopy.triggerPath}
          data-workflow-href={aiReviewReceiptWriteLiveRouteReadmeRenderedCopy.workflowHref}
          data-workflow-name={aiReviewReceiptWriteLiveRouteReadmeRenderedCopy.workflowName}
          data-workflow-path={aiReviewReceiptWriteLiveRouteReadmeRenderedCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI review receipt write live-route README rendered copy</p>
              <h2>Что делать, если AI README trigger copy пропал в rendered routes</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={aiReviewReceiptWriteLiveRouteReadmeRenderedCopy.workflowHref}>
                {aiReviewReceiptWriteLiveRouteReadmeRenderedCopy.workflowName}
              </a>
              <a className="primary-link" href={aiReviewReceiptWriteLiveRouteReadmeRenderedCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {aiReviewReceiptWriteLiveRouteReadmeRenderedCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? aiReviewReceiptWriteLiveRouteReadmeRenderedCopy.noMergeCopy
                    : aiReviewReceiptWriteLiveRouteReadmeRenderedCopy.readmeTriggerCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={aiReviewReceiptWriteLiveRouteReadmeWorkflowCopy.apiRoute}
          data-command={aiReviewReceiptWriteLiveRouteReadmeWorkflowCopy.command}
          data-docs-href={aiReviewReceiptWriteLiveRouteReadmeWorkflowCopy.docsHref}
          data-expected-queue-count={aiReviewReceiptWriteLiveRouteReadmeWorkflowCopy.expectedQueueCount}
          data-expected-request-field-count={aiReviewReceiptWriteLiveRouteReadmeWorkflowCopy.expectedRequestFieldCount}
          data-expected-route-count={aiReviewReceiptWriteLiveRouteReadmeWorkflowCopy.expectedRouteCount}
          data-failing-command={aiReviewReceiptWriteLiveRouteReadmeWorkflowCopy.failingCommand}
          data-no-merge-copy={aiReviewReceiptWriteLiveRouteReadmeWorkflowCopy.noMergeCopy}
          data-owner-role={aiReviewReceiptWriteLiveRouteReadmeWorkflowCopy.ownerRole}
          data-readme-rendered-command={aiReviewReceiptWriteLiveRouteReadmeWorkflowCopy.readmeRenderedCommand}
          data-repair-targets={aiReviewReceiptWriteLiveRouteReadmeWorkflowCopy.repairTargets}
          data-source-marker-selector={aiReviewReceiptWriteLiveRouteReadmeWorkflowCopy.sourceMarkerSelector}
          data-testid="ai-review-receipt-write-live-route-readme-workflow-copy"
          data-workflow-failure-command={aiReviewReceiptWriteLiveRouteReadmeWorkflowCopy.workflowFailureCommand}
          data-workflow-href={aiReviewReceiptWriteLiveRouteReadmeWorkflowCopy.workflowHref}
          data-workflow-name={aiReviewReceiptWriteLiveRouteReadmeWorkflowCopy.workflowName}
          data-workflow-path={aiReviewReceiptWriteLiveRouteReadmeWorkflowCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI review receipt write live-route README workflow copy</p>
              <h2>Что делать, если AI README workflow order упал</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={aiReviewReceiptWriteLiveRouteReadmeWorkflowCopy.workflowHref}>
                {aiReviewReceiptWriteLiveRouteReadmeWorkflowCopy.workflowName}
              </a>
              <a className="primary-link" href={aiReviewReceiptWriteLiveRouteReadmeWorkflowCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {aiReviewReceiptWriteLiveRouteReadmeWorkflowCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? aiReviewReceiptWriteLiveRouteReadmeWorkflowCopy.noMergeCopy
                    : aiReviewReceiptWriteLiveRouteReadmeWorkflowCopy.readmeRenderedCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={aiReviewReceiptWriteLiveRouteReadmeWorkflowFailureCopy.apiRoute}
          data-command={aiReviewReceiptWriteLiveRouteReadmeWorkflowFailureCopy.command}
          data-docs-href={aiReviewReceiptWriteLiveRouteReadmeWorkflowFailureCopy.docsHref}
          data-expected-queue-count={aiReviewReceiptWriteLiveRouteReadmeWorkflowFailureCopy.expectedQueueCount}
          data-expected-request-field-count={
            aiReviewReceiptWriteLiveRouteReadmeWorkflowFailureCopy.expectedRequestFieldCount
          }
          data-expected-route-count={aiReviewReceiptWriteLiveRouteReadmeWorkflowFailureCopy.expectedRouteCount}
          data-failing-command={aiReviewReceiptWriteLiveRouteReadmeWorkflowFailureCopy.failingCommand}
          data-no-merge-copy={aiReviewReceiptWriteLiveRouteReadmeWorkflowFailureCopy.noMergeCopy}
          data-owner-role={aiReviewReceiptWriteLiveRouteReadmeWorkflowFailureCopy.ownerRole}
          data-readme-workflow-command={aiReviewReceiptWriteLiveRouteReadmeWorkflowFailureCopy.readmeWorkflowCommand}
          data-repair-targets={aiReviewReceiptWriteLiveRouteReadmeWorkflowFailureCopy.repairTargets}
          data-source-marker-selector={aiReviewReceiptWriteLiveRouteReadmeWorkflowFailureCopy.sourceMarkerSelector}
          data-testid="ai-review-receipt-write-live-route-readme-workflow-failure-copy"
          data-workflow-failure-command={aiReviewReceiptWriteLiveRouteReadmeWorkflowFailureCopy.workflowFailureCommand}
          data-workflow-href={aiReviewReceiptWriteLiveRouteReadmeWorkflowFailureCopy.workflowHref}
          data-workflow-name={aiReviewReceiptWriteLiveRouteReadmeWorkflowFailureCopy.workflowName}
          data-workflow-path={aiReviewReceiptWriteLiveRouteReadmeWorkflowFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI review receipt write live-route README workflow failure copy</p>
              <h2>Что делать, если AI README workflow failure guard упал</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={aiReviewReceiptWriteLiveRouteReadmeWorkflowFailureCopy.workflowHref}>
                {aiReviewReceiptWriteLiveRouteReadmeWorkflowFailureCopy.workflowName}
              </a>
              <a className="primary-link" href={aiReviewReceiptWriteLiveRouteReadmeWorkflowFailureCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {aiReviewReceiptWriteLiveRouteReadmeWorkflowFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? aiReviewReceiptWriteLiveRouteReadmeWorkflowFailureCopy.noMergeCopy
                    : aiReviewReceiptWriteLiveRouteReadmeWorkflowFailureCopy.readmeWorkflowCommand}
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
          data-api-route={sourceOwnerReceiptWriteRenderedRouteFailureCopy.apiRoute}
          data-command={sourceOwnerReceiptWriteRenderedRouteFailureCopy.command}
          data-docs-href={sourceOwnerReceiptWriteRenderedRouteFailureCopy.docsHref}
          data-expected-request-field-count={sourceOwnerReceiptWriteRenderedRouteFailureCopy.expectedRequestFieldCount}
          data-expected-route-count={sourceOwnerReceiptWriteRenderedRouteFailureCopy.expectedRouteCount}
          data-failing-command={sourceOwnerReceiptWriteRenderedRouteFailureCopy.failingCommand}
          data-no-merge-copy={sourceOwnerReceiptWriteRenderedRouteFailureCopy.noMergeCopy}
          data-owner-role={sourceOwnerReceiptWriteRenderedRouteFailureCopy.ownerRole}
          data-parity-command={sourceOwnerReceiptWriteRenderedRouteFailureCopy.parityCommand}
          data-repair-targets={sourceOwnerReceiptWriteRenderedRouteFailureCopy.repairTargets}
          data-source-marker-selector={sourceOwnerReceiptWriteRenderedRouteFailureCopy.sourceMarkerSelector}
          data-testid="source-owner-receipt-write-rendered-route-failure-copy"
          data-workflow-href={sourceOwnerReceiptWriteRenderedRouteFailureCopy.workflowHref}
          data-workflow-name={sourceOwnerReceiptWriteRenderedRouteFailureCopy.workflowName}
          data-workflow-path={sourceOwnerReceiptWriteRenderedRouteFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source owner receipt write rendered-route failure copy</p>
              <h2>Что делать, если write draft пропал в rendered routes</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={sourceOwnerReceiptWriteRenderedRouteFailureCopy.workflowHref}>
                {sourceOwnerReceiptWriteRenderedRouteFailureCopy.workflowName}
              </a>
              <a className="primary-link" href={sourceOwnerReceiptWriteRenderedRouteFailureCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {sourceOwnerReceiptWriteRenderedRouteFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? sourceOwnerReceiptWriteRenderedRouteFailureCopy.noMergeCopy
                    : sourceOwnerReceiptWriteRenderedRouteFailureCopy.failingCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={sourceOwnerReceiptWriteWorkflowFailureCopy.apiRoute}
          data-command={sourceOwnerReceiptWriteWorkflowFailureCopy.command}
          data-docs-href={sourceOwnerReceiptWriteWorkflowFailureCopy.docsHref}
          data-expected-request-field-count={sourceOwnerReceiptWriteWorkflowFailureCopy.expectedRequestFieldCount}
          data-expected-route-count={sourceOwnerReceiptWriteWorkflowFailureCopy.expectedRouteCount}
          data-failing-command={sourceOwnerReceiptWriteWorkflowFailureCopy.failingCommand}
          data-no-merge-copy={sourceOwnerReceiptWriteWorkflowFailureCopy.noMergeCopy}
          data-owner-role={sourceOwnerReceiptWriteWorkflowFailureCopy.ownerRole}
          data-parity-command={sourceOwnerReceiptWriteWorkflowFailureCopy.parityCommand}
          data-repair-targets={sourceOwnerReceiptWriteWorkflowFailureCopy.repairTargets}
          data-source-marker-selector={sourceOwnerReceiptWriteWorkflowFailureCopy.sourceMarkerSelector}
          data-testid="source-owner-receipt-write-workflow-failure-copy"
          data-workflow-href={sourceOwnerReceiptWriteWorkflowFailureCopy.workflowHref}
          data-workflow-name={sourceOwnerReceiptWriteWorkflowFailureCopy.workflowName}
          data-workflow-path={sourceOwnerReceiptWriteWorkflowFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source owner receipt write workflow failure copy</p>
              <h2>Что делать, если source owner write workflow order упал</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={sourceOwnerReceiptWriteWorkflowFailureCopy.workflowHref}>
                {sourceOwnerReceiptWriteWorkflowFailureCopy.workflowName}
              </a>
              <a className="primary-link" href={sourceOwnerReceiptWriteWorkflowFailureCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {sourceOwnerReceiptWriteWorkflowFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? sourceOwnerReceiptWriteWorkflowFailureCopy.noMergeCopy
                    : sourceOwnerReceiptWriteWorkflowFailureCopy.failingCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={sourceOwnerReceiptWriteLiveRouteGateNote.apiRoute}
          data-command={sourceOwnerReceiptWriteLiveRouteGateNote.command}
          data-docs-href={sourceOwnerReceiptWriteLiveRouteGateNote.docsHref}
          data-expected-request-field-count={sourceOwnerReceiptWriteLiveRouteGateNote.expectedRequestFieldCount}
          data-expected-route-count={sourceOwnerReceiptWriteLiveRouteGateNote.expectedRouteCount}
          data-marker-selector={sourceOwnerReceiptWriteLiveRouteGateNote.markerSelector}
          data-parity-command={sourceOwnerReceiptWriteLiveRouteGateNote.parityCommand}
          data-route-smoke-command={sourceOwnerReceiptWriteLiveRouteGateNote.routeSmokeCommand}
          data-source-smoke-command={sourceOwnerReceiptWriteLiveRouteGateNote.sourceSmokeCommand}
          data-testid="source-owner-receipt-write-live-route-gate-note"
          data-workflow-href={sourceOwnerReceiptWriteLiveRouteGateNote.workflowHref}
          data-workflow-name={sourceOwnerReceiptWriteLiveRouteGateNote.workflowName}
          data-workflow-path={sourceOwnerReceiptWriteLiveRouteGateNote.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source owner receipt write live route gate note</p>
              <h2>Как live route smoke защищает source owner write draft</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={sourceOwnerReceiptWriteLiveRouteGateNote.workflowHref}>
                {sourceOwnerReceiptWriteLiveRouteGateNote.workflowName}
              </a>
              <a className="primary-link" href={sourceOwnerReceiptWriteLiveRouteGateNote.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {sourceOwnerReceiptWriteLiveRouteGateNote.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Live route gate"
                    ? sourceOwnerReceiptWriteLiveRouteGateNote.routeSmokeCommand
                    : sourceOwnerReceiptWriteLiveRouteGateNote.sourceSmokeCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={sourceOwnerReceiptWriteLiveRouteFailureCopy.apiRoute}
          data-command={sourceOwnerReceiptWriteLiveRouteFailureCopy.command}
          data-docs-href={sourceOwnerReceiptWriteLiveRouteFailureCopy.docsHref}
          data-expected-request-field-count={sourceOwnerReceiptWriteLiveRouteFailureCopy.expectedRequestFieldCount}
          data-expected-route-count={sourceOwnerReceiptWriteLiveRouteFailureCopy.expectedRouteCount}
          data-failing-command={sourceOwnerReceiptWriteLiveRouteFailureCopy.failingCommand}
          data-no-merge-copy={sourceOwnerReceiptWriteLiveRouteFailureCopy.noMergeCopy}
          data-owner-role={sourceOwnerReceiptWriteLiveRouteFailureCopy.ownerRole}
          data-repair-targets={sourceOwnerReceiptWriteLiveRouteFailureCopy.repairTargets}
          data-route-smoke-command={sourceOwnerReceiptWriteLiveRouteFailureCopy.routeSmokeCommand}
          data-source-marker-selector={sourceOwnerReceiptWriteLiveRouteFailureCopy.sourceMarkerSelector}
          data-testid="source-owner-receipt-write-live-route-failure-copy"
          data-workflow-href={sourceOwnerReceiptWriteLiveRouteFailureCopy.workflowHref}
          data-workflow-name={sourceOwnerReceiptWriteLiveRouteFailureCopy.workflowName}
          data-workflow-path={sourceOwnerReceiptWriteLiveRouteFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source owner receipt write live-route failure copy</p>
              <h2>Что делать, если source owner write live-route gate упал</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={sourceOwnerReceiptWriteLiveRouteFailureCopy.workflowHref}>
                {sourceOwnerReceiptWriteLiveRouteFailureCopy.workflowName}
              </a>
              <a className="primary-link" href={sourceOwnerReceiptWriteLiveRouteFailureCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {sourceOwnerReceiptWriteLiveRouteFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? sourceOwnerReceiptWriteLiveRouteFailureCopy.noMergeCopy
                    : sourceOwnerReceiptWriteLiveRouteFailureCopy.failingCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={sourceOwnerReceiptWriteLiveRouteRenderedCopy.apiRoute}
          data-command={sourceOwnerReceiptWriteLiveRouteRenderedCopy.command}
          data-docs-href={sourceOwnerReceiptWriteLiveRouteRenderedCopy.docsHref}
          data-expected-request-field-count={sourceOwnerReceiptWriteLiveRouteRenderedCopy.expectedRequestFieldCount}
          data-expected-route-count={sourceOwnerReceiptWriteLiveRouteRenderedCopy.expectedRouteCount}
          data-failing-command={sourceOwnerReceiptWriteLiveRouteRenderedCopy.failingCommand}
          data-live-failure-command={sourceOwnerReceiptWriteLiveRouteRenderedCopy.liveFailureCommand}
          data-no-merge-copy={sourceOwnerReceiptWriteLiveRouteRenderedCopy.noMergeCopy}
          data-owner-role={sourceOwnerReceiptWriteLiveRouteRenderedCopy.ownerRole}
          data-repair-targets={sourceOwnerReceiptWriteLiveRouteRenderedCopy.repairTargets}
          data-source-marker-selector={sourceOwnerReceiptWriteLiveRouteRenderedCopy.sourceMarkerSelector}
          data-testid="source-owner-receipt-write-live-route-rendered-copy"
          data-workflow-href={sourceOwnerReceiptWriteLiveRouteRenderedCopy.workflowHref}
          data-workflow-name={sourceOwnerReceiptWriteLiveRouteRenderedCopy.workflowName}
          data-workflow-path={sourceOwnerReceiptWriteLiveRouteRenderedCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source owner receipt write live-route rendered copy</p>
              <h2>Что делать, если source owner live-route copy пропал в rendered routes</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={sourceOwnerReceiptWriteLiveRouteRenderedCopy.workflowHref}>
                {sourceOwnerReceiptWriteLiveRouteRenderedCopy.workflowName}
              </a>
              <a className="primary-link" href={sourceOwnerReceiptWriteLiveRouteRenderedCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {sourceOwnerReceiptWriteLiveRouteRenderedCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? sourceOwnerReceiptWriteLiveRouteRenderedCopy.noMergeCopy
                    : sourceOwnerReceiptWriteLiveRouteRenderedCopy.liveFailureCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={sourceOwnerReceiptWriteLiveRouteWorkflowCopy.apiRoute}
          data-command={sourceOwnerReceiptWriteLiveRouteWorkflowCopy.command}
          data-docs-href={sourceOwnerReceiptWriteLiveRouteWorkflowCopy.docsHref}
          data-expected-request-field-count={sourceOwnerReceiptWriteLiveRouteWorkflowCopy.expectedRequestFieldCount}
          data-expected-route-count={sourceOwnerReceiptWriteLiveRouteWorkflowCopy.expectedRouteCount}
          data-failing-command={sourceOwnerReceiptWriteLiveRouteWorkflowCopy.failingCommand}
          data-live-rendered-command={sourceOwnerReceiptWriteLiveRouteWorkflowCopy.liveRenderedCommand}
          data-no-merge-copy={sourceOwnerReceiptWriteLiveRouteWorkflowCopy.noMergeCopy}
          data-owner-role={sourceOwnerReceiptWriteLiveRouteWorkflowCopy.ownerRole}
          data-repair-targets={sourceOwnerReceiptWriteLiveRouteWorkflowCopy.repairTargets}
          data-source-marker-selector={sourceOwnerReceiptWriteLiveRouteWorkflowCopy.sourceMarkerSelector}
          data-testid="source-owner-receipt-write-live-route-workflow-copy"
          data-workflow-failure-command={sourceOwnerReceiptWriteLiveRouteWorkflowCopy.workflowFailureCommand}
          data-workflow-href={sourceOwnerReceiptWriteLiveRouteWorkflowCopy.workflowHref}
          data-workflow-name={sourceOwnerReceiptWriteLiveRouteWorkflowCopy.workflowName}
          data-workflow-path={sourceOwnerReceiptWriteLiveRouteWorkflowCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source owner receipt write live-route workflow copy</p>
              <h2>Что делать, если source owner live-route workflow order упал</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={sourceOwnerReceiptWriteLiveRouteWorkflowCopy.workflowHref}>
                {sourceOwnerReceiptWriteLiveRouteWorkflowCopy.workflowName}
              </a>
              <a className="primary-link" href={sourceOwnerReceiptWriteLiveRouteWorkflowCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {sourceOwnerReceiptWriteLiveRouteWorkflowCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? sourceOwnerReceiptWriteLiveRouteWorkflowCopy.noMergeCopy
                    : sourceOwnerReceiptWriteLiveRouteWorkflowCopy.liveRenderedCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={sourceOwnerReceiptWriteLiveRouteDocsCopy.apiRoute}
          data-audit-note={sourceOwnerReceiptWriteLiveRouteDocsCopy.auditNote}
          data-command={sourceOwnerReceiptWriteLiveRouteDocsCopy.command}
          data-docs-href={sourceOwnerReceiptWriteLiveRouteDocsCopy.docsHref}
          data-expected-request-field-count={sourceOwnerReceiptWriteLiveRouteDocsCopy.expectedRequestFieldCount}
          data-expected-route-count={sourceOwnerReceiptWriteLiveRouteDocsCopy.expectedRouteCount}
          data-failing-command={sourceOwnerReceiptWriteLiveRouteDocsCopy.failingCommand}
          data-live-workflow-command={sourceOwnerReceiptWriteLiveRouteDocsCopy.liveWorkflowCommand}
          data-no-merge-copy={sourceOwnerReceiptWriteLiveRouteDocsCopy.noMergeCopy}
          data-owner-role={sourceOwnerReceiptWriteLiveRouteDocsCopy.ownerRole}
          data-repair-targets={sourceOwnerReceiptWriteLiveRouteDocsCopy.repairTargets}
          data-source-marker-selector={sourceOwnerReceiptWriteLiveRouteDocsCopy.sourceMarkerSelector}
          data-testid="source-owner-receipt-write-live-route-docs-copy"
          data-workflow-href={sourceOwnerReceiptWriteLiveRouteDocsCopy.workflowHref}
          data-workflow-name={sourceOwnerReceiptWriteLiveRouteDocsCopy.workflowName}
          data-workflow-path={sourceOwnerReceiptWriteLiveRouteDocsCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source owner receipt write live-route docs copy</p>
              <h2>Что делать, если source owner live-route docs copy упал</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={sourceOwnerReceiptWriteLiveRouteDocsCopy.workflowHref}>
                {sourceOwnerReceiptWriteLiveRouteDocsCopy.workflowName}
              </a>
              <a className="primary-link" href={sourceOwnerReceiptWriteLiveRouteDocsCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {sourceOwnerReceiptWriteLiveRouteDocsCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? sourceOwnerReceiptWriteLiveRouteDocsCopy.noMergeCopy
                    : sourceOwnerReceiptWriteLiveRouteDocsCopy.liveWorkflowCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={sourceOwnerReceiptWriteLiveRouteReadmeTriggerCopy.apiRoute}
          data-command={sourceOwnerReceiptWriteLiveRouteReadmeTriggerCopy.command}
          data-docs-command={sourceOwnerReceiptWriteLiveRouteReadmeTriggerCopy.docsCommand}
          data-docs-href={sourceOwnerReceiptWriteLiveRouteReadmeTriggerCopy.docsHref}
          data-expected-request-field-count={sourceOwnerReceiptWriteLiveRouteReadmeTriggerCopy.expectedRequestFieldCount}
          data-expected-route-count={sourceOwnerReceiptWriteLiveRouteReadmeTriggerCopy.expectedRouteCount}
          data-expected-workflow-path-count={sourceOwnerReceiptWriteLiveRouteReadmeTriggerCopy.expectedWorkflowPathCount}
          data-failing-command={sourceOwnerReceiptWriteLiveRouteReadmeTriggerCopy.failingCommand}
          data-no-merge-copy={sourceOwnerReceiptWriteLiveRouteReadmeTriggerCopy.noMergeCopy}
          data-owner-role={sourceOwnerReceiptWriteLiveRouteReadmeTriggerCopy.ownerRole}
          data-readme-path={sourceOwnerReceiptWriteLiveRouteReadmeTriggerCopy.readmePath}
          data-repair-targets={sourceOwnerReceiptWriteLiveRouteReadmeTriggerCopy.repairTargets}
          data-source-marker-selector={sourceOwnerReceiptWriteLiveRouteReadmeTriggerCopy.sourceMarkerSelector}
          data-testid="source-owner-receipt-write-live-route-readme-trigger-copy"
          data-trigger-path={sourceOwnerReceiptWriteLiveRouteReadmeTriggerCopy.triggerPath}
          data-workflow-href={sourceOwnerReceiptWriteLiveRouteReadmeTriggerCopy.workflowHref}
          data-workflow-name={sourceOwnerReceiptWriteLiveRouteReadmeTriggerCopy.workflowName}
          data-workflow-path={sourceOwnerReceiptWriteLiveRouteReadmeTriggerCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source owner receipt write live-route README trigger copy</p>
              <h2>Что делать, если source owner README trigger copy упал</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={sourceOwnerReceiptWriteLiveRouteReadmeTriggerCopy.workflowHref}>
                {sourceOwnerReceiptWriteLiveRouteReadmeTriggerCopy.workflowName}
              </a>
              <a className="primary-link" href={sourceOwnerReceiptWriteLiveRouteReadmeTriggerCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {sourceOwnerReceiptWriteLiveRouteReadmeTriggerCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? sourceOwnerReceiptWriteLiveRouteReadmeTriggerCopy.noMergeCopy
                    : sourceOwnerReceiptWriteLiveRouteReadmeTriggerCopy.triggerPath}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={sourceOwnerReceiptWriteLiveRouteReadmeRenderedCopy.apiRoute}
          data-command={sourceOwnerReceiptWriteLiveRouteReadmeRenderedCopy.command}
          data-docs-command={sourceOwnerReceiptWriteLiveRouteReadmeRenderedCopy.docsCommand}
          data-docs-href={sourceOwnerReceiptWriteLiveRouteReadmeRenderedCopy.docsHref}
          data-expected-request-field-count={sourceOwnerReceiptWriteLiveRouteReadmeRenderedCopy.expectedRequestFieldCount}
          data-expected-route-count={sourceOwnerReceiptWriteLiveRouteReadmeRenderedCopy.expectedRouteCount}
          data-failing-command={sourceOwnerReceiptWriteLiveRouteReadmeRenderedCopy.failingCommand}
          data-no-merge-copy={sourceOwnerReceiptWriteLiveRouteReadmeRenderedCopy.noMergeCopy}
          data-owner-role={sourceOwnerReceiptWriteLiveRouteReadmeRenderedCopy.ownerRole}
          data-readme-trigger-command={sourceOwnerReceiptWriteLiveRouteReadmeRenderedCopy.readmeTriggerCommand}
          data-repair-targets={sourceOwnerReceiptWriteLiveRouteReadmeRenderedCopy.repairTargets}
          data-source-marker-selector={sourceOwnerReceiptWriteLiveRouteReadmeRenderedCopy.sourceMarkerSelector}
          data-testid="source-owner-receipt-write-live-route-readme-rendered-copy"
          data-trigger-path={sourceOwnerReceiptWriteLiveRouteReadmeRenderedCopy.triggerPath}
          data-workflow-href={sourceOwnerReceiptWriteLiveRouteReadmeRenderedCopy.workflowHref}
          data-workflow-name={sourceOwnerReceiptWriteLiveRouteReadmeRenderedCopy.workflowName}
          data-workflow-path={sourceOwnerReceiptWriteLiveRouteReadmeRenderedCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source owner receipt write live-route README rendered copy</p>
              <h2>Что делать, если source owner README trigger copy пропал в rendered routes</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={sourceOwnerReceiptWriteLiveRouteReadmeRenderedCopy.workflowHref}>
                {sourceOwnerReceiptWriteLiveRouteReadmeRenderedCopy.workflowName}
              </a>
              <a className="primary-link" href={sourceOwnerReceiptWriteLiveRouteReadmeRenderedCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {sourceOwnerReceiptWriteLiveRouteReadmeRenderedCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? sourceOwnerReceiptWriteLiveRouteReadmeRenderedCopy.noMergeCopy
                    : sourceOwnerReceiptWriteLiveRouteReadmeRenderedCopy.readmeTriggerCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={sourceOwnerReceiptWriteLiveRouteReadmeWorkflowCopy.apiRoute}
          data-command={sourceOwnerReceiptWriteLiveRouteReadmeWorkflowCopy.command}
          data-docs-href={sourceOwnerReceiptWriteLiveRouteReadmeWorkflowCopy.docsHref}
          data-expected-request-field-count={sourceOwnerReceiptWriteLiveRouteReadmeWorkflowCopy.expectedRequestFieldCount}
          data-expected-route-count={sourceOwnerReceiptWriteLiveRouteReadmeWorkflowCopy.expectedRouteCount}
          data-failing-command={sourceOwnerReceiptWriteLiveRouteReadmeWorkflowCopy.failingCommand}
          data-no-merge-copy={sourceOwnerReceiptWriteLiveRouteReadmeWorkflowCopy.noMergeCopy}
          data-owner-role={sourceOwnerReceiptWriteLiveRouteReadmeWorkflowCopy.ownerRole}
          data-readme-rendered-command={sourceOwnerReceiptWriteLiveRouteReadmeWorkflowCopy.readmeRenderedCommand}
          data-repair-targets={sourceOwnerReceiptWriteLiveRouteReadmeWorkflowCopy.repairTargets}
          data-source-marker-selector={sourceOwnerReceiptWriteLiveRouteReadmeWorkflowCopy.sourceMarkerSelector}
          data-testid="source-owner-receipt-write-live-route-readme-workflow-copy"
          data-workflow-failure-command={sourceOwnerReceiptWriteLiveRouteReadmeWorkflowCopy.workflowFailureCommand}
          data-workflow-href={sourceOwnerReceiptWriteLiveRouteReadmeWorkflowCopy.workflowHref}
          data-workflow-name={sourceOwnerReceiptWriteLiveRouteReadmeWorkflowCopy.workflowName}
          data-workflow-path={sourceOwnerReceiptWriteLiveRouteReadmeWorkflowCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source owner receipt write live-route README workflow copy</p>
              <h2>Что делать, если source owner README workflow order упал</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={sourceOwnerReceiptWriteLiveRouteReadmeWorkflowCopy.workflowHref}>
                {sourceOwnerReceiptWriteLiveRouteReadmeWorkflowCopy.workflowName}
              </a>
              <a className="primary-link" href={sourceOwnerReceiptWriteLiveRouteReadmeWorkflowCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {sourceOwnerReceiptWriteLiveRouteReadmeWorkflowCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? sourceOwnerReceiptWriteLiveRouteReadmeWorkflowCopy.noMergeCopy
                    : sourceOwnerReceiptWriteLiveRouteReadmeWorkflowCopy.readmeRenderedCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={sourceOwnerReceiptWriteLiveRouteReadmeWorkflowFailureCopy.apiRoute}
          data-command={sourceOwnerReceiptWriteLiveRouteReadmeWorkflowFailureCopy.command}
          data-docs-href={sourceOwnerReceiptWriteLiveRouteReadmeWorkflowFailureCopy.docsHref}
          data-expected-request-field-count={
            sourceOwnerReceiptWriteLiveRouteReadmeWorkflowFailureCopy.expectedRequestFieldCount
          }
          data-expected-route-count={sourceOwnerReceiptWriteLiveRouteReadmeWorkflowFailureCopy.expectedRouteCount}
          data-failing-command={sourceOwnerReceiptWriteLiveRouteReadmeWorkflowFailureCopy.failingCommand}
          data-no-merge-copy={sourceOwnerReceiptWriteLiveRouteReadmeWorkflowFailureCopy.noMergeCopy}
          data-owner-role={sourceOwnerReceiptWriteLiveRouteReadmeWorkflowFailureCopy.ownerRole}
          data-readme-workflow-command={sourceOwnerReceiptWriteLiveRouteReadmeWorkflowFailureCopy.readmeWorkflowCommand}
          data-repair-targets={sourceOwnerReceiptWriteLiveRouteReadmeWorkflowFailureCopy.repairTargets}
          data-source-marker-selector={sourceOwnerReceiptWriteLiveRouteReadmeWorkflowFailureCopy.sourceMarkerSelector}
          data-testid="source-owner-receipt-write-live-route-readme-workflow-failure-copy"
          data-workflow-failure-command={sourceOwnerReceiptWriteLiveRouteReadmeWorkflowFailureCopy.workflowFailureCommand}
          data-workflow-href={sourceOwnerReceiptWriteLiveRouteReadmeWorkflowFailureCopy.workflowHref}
          data-workflow-name={sourceOwnerReceiptWriteLiveRouteReadmeWorkflowFailureCopy.workflowName}
          data-workflow-path={sourceOwnerReceiptWriteLiveRouteReadmeWorkflowFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source owner receipt write live-route README workflow failure copy</p>
              <h2>Что делать, если source owner README workflow failure guard упал</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={sourceOwnerReceiptWriteLiveRouteReadmeWorkflowFailureCopy.workflowHref}>
                {sourceOwnerReceiptWriteLiveRouteReadmeWorkflowFailureCopy.workflowName}
              </a>
              <a className="primary-link" href={sourceOwnerReceiptWriteLiveRouteReadmeWorkflowFailureCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {sourceOwnerReceiptWriteLiveRouteReadmeWorkflowFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? sourceOwnerReceiptWriteLiveRouteReadmeWorkflowFailureCopy.noMergeCopy
                    : sourceOwnerReceiptWriteLiveRouteReadmeWorkflowFailureCopy.readmeWorkflowCommand}
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
          data-api-route={sourceFreshnessWriteDocsFailureCopy.apiRoute}
          data-command={sourceFreshnessWriteDocsFailureCopy.command}
          data-docs-href={sourceFreshnessWriteDocsFailureCopy.docsHref}
          data-expected-breach-count={sourceFreshnessWriteDocsFailureCopy.expectedBreachCount}
          data-expected-request-field-count={sourceFreshnessWriteDocsFailureCopy.expectedRequestFieldCount}
          data-expected-route-count={sourceFreshnessWriteDocsFailureCopy.expectedRouteCount}
          data-failing-command={sourceFreshnessWriteDocsFailureCopy.failingCommand}
          data-no-merge-copy={sourceFreshnessWriteDocsFailureCopy.noMergeCopy}
          data-owner-role={sourceFreshnessWriteDocsFailureCopy.ownerRole}
          data-parity-command={sourceFreshnessWriteDocsFailureCopy.parityCommand}
          data-repair-targets={sourceFreshnessWriteDocsFailureCopy.repairTargets}
          data-source-marker-selector={sourceFreshnessWriteDocsFailureCopy.sourceMarkerSelector}
          data-testid="source-freshness-write-docs-failure-copy"
          data-workflow-href={sourceFreshnessWriteDocsFailureCopy.workflowHref}
          data-workflow-name={sourceFreshnessWriteDocsFailureCopy.workflowName}
          data-workflow-path={sourceFreshnessWriteDocsFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source freshness write docs failure copy</p>
              <h2>Что делать, если freshness write docs anchor упал</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={sourceFreshnessWriteDocsFailureCopy.workflowHref}>
                {sourceFreshnessWriteDocsFailureCopy.workflowName}
              </a>
              <a className="primary-link" href={sourceFreshnessWriteDocsFailureCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {sourceFreshnessWriteDocsFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge" ? sourceFreshnessWriteDocsFailureCopy.noMergeCopy : sourceFreshnessWriteDocsFailureCopy.docsHref}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={sourceFreshnessWriteRenderedRouteFailureCopy.apiRoute}
          data-command={sourceFreshnessWriteRenderedRouteFailureCopy.command}
          data-docs-href={sourceFreshnessWriteRenderedRouteFailureCopy.docsHref}
          data-expected-breach-count={sourceFreshnessWriteRenderedRouteFailureCopy.expectedBreachCount}
          data-expected-request-field-count={sourceFreshnessWriteRenderedRouteFailureCopy.expectedRequestFieldCount}
          data-expected-route-count={sourceFreshnessWriteRenderedRouteFailureCopy.expectedRouteCount}
          data-failing-command={sourceFreshnessWriteRenderedRouteFailureCopy.failingCommand}
          data-no-merge-copy={sourceFreshnessWriteRenderedRouteFailureCopy.noMergeCopy}
          data-owner-role={sourceFreshnessWriteRenderedRouteFailureCopy.ownerRole}
          data-parity-command={sourceFreshnessWriteRenderedRouteFailureCopy.parityCommand}
          data-repair-targets={sourceFreshnessWriteRenderedRouteFailureCopy.repairTargets}
          data-source-marker-selector={sourceFreshnessWriteRenderedRouteFailureCopy.sourceMarkerSelector}
          data-testid="source-freshness-write-rendered-route-failure-copy"
          data-workflow-href={sourceFreshnessWriteRenderedRouteFailureCopy.workflowHref}
          data-workflow-name={sourceFreshnessWriteRenderedRouteFailureCopy.workflowName}
          data-workflow-path={sourceFreshnessWriteRenderedRouteFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source freshness write rendered-route failure copy</p>
              <h2>Что делать, если freshness write draft пропал в rendered routes</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={sourceFreshnessWriteRenderedRouteFailureCopy.workflowHref}>
                {sourceFreshnessWriteRenderedRouteFailureCopy.workflowName}
              </a>
              <a className="primary-link" href={sourceFreshnessWriteRenderedRouteFailureCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {sourceFreshnessWriteRenderedRouteFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? sourceFreshnessWriteRenderedRouteFailureCopy.noMergeCopy
                    : sourceFreshnessWriteRenderedRouteFailureCopy.failingCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={sourceFreshnessWriteWorkflowFailureCopy.apiRoute}
          data-command={sourceFreshnessWriteWorkflowFailureCopy.command}
          data-docs-href={sourceFreshnessWriteWorkflowFailureCopy.docsHref}
          data-expected-breach-count={sourceFreshnessWriteWorkflowFailureCopy.expectedBreachCount}
          data-expected-request-field-count={sourceFreshnessWriteWorkflowFailureCopy.expectedRequestFieldCount}
          data-expected-route-count={sourceFreshnessWriteWorkflowFailureCopy.expectedRouteCount}
          data-failing-command={sourceFreshnessWriteWorkflowFailureCopy.failingCommand}
          data-no-merge-copy={sourceFreshnessWriteWorkflowFailureCopy.noMergeCopy}
          data-owner-role={sourceFreshnessWriteWorkflowFailureCopy.ownerRole}
          data-parity-command={sourceFreshnessWriteWorkflowFailureCopy.parityCommand}
          data-repair-targets={sourceFreshnessWriteWorkflowFailureCopy.repairTargets}
          data-source-marker-selector={sourceFreshnessWriteWorkflowFailureCopy.sourceMarkerSelector}
          data-testid="source-freshness-write-workflow-failure-copy"
          data-workflow-href={sourceFreshnessWriteWorkflowFailureCopy.workflowHref}
          data-workflow-name={sourceFreshnessWriteWorkflowFailureCopy.workflowName}
          data-workflow-path={sourceFreshnessWriteWorkflowFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source freshness write workflow failure copy</p>
              <h2>Что делать, если freshness write workflow order упал</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={sourceFreshnessWriteWorkflowFailureCopy.workflowHref}>
                {sourceFreshnessWriteWorkflowFailureCopy.workflowName}
              </a>
              <a className="primary-link" href={sourceFreshnessWriteWorkflowFailureCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {sourceFreshnessWriteWorkflowFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? sourceFreshnessWriteWorkflowFailureCopy.noMergeCopy
                    : sourceFreshnessWriteWorkflowFailureCopy.failingCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={sourceFreshnessWriteLiveRouteGateNote.apiRoute}
          data-command={sourceFreshnessWriteLiveRouteGateNote.command}
          data-docs-href={sourceFreshnessWriteLiveRouteGateNote.docsHref}
          data-expected-breach-count={sourceFreshnessWriteLiveRouteGateNote.expectedBreachCount}
          data-expected-request-field-count={sourceFreshnessWriteLiveRouteGateNote.expectedRequestFieldCount}
          data-expected-route-count={sourceFreshnessWriteLiveRouteGateNote.expectedRouteCount}
          data-marker-selector={sourceFreshnessWriteLiveRouteGateNote.markerSelector}
          data-parity-command={sourceFreshnessWriteLiveRouteGateNote.parityCommand}
          data-route-smoke-command={sourceFreshnessWriteLiveRouteGateNote.routeSmokeCommand}
          data-source-smoke-command={sourceFreshnessWriteLiveRouteGateNote.sourceSmokeCommand}
          data-testid="source-freshness-write-live-route-gate-note"
          data-workflow-href={sourceFreshnessWriteLiveRouteGateNote.workflowHref}
          data-workflow-name={sourceFreshnessWriteLiveRouteGateNote.workflowName}
          data-workflow-path={sourceFreshnessWriteLiveRouteGateNote.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source freshness write live route gate note</p>
              <h2>Как live route smoke защищает freshness write draft</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={sourceFreshnessWriteLiveRouteGateNote.workflowHref}>
                {sourceFreshnessWriteLiveRouteGateNote.workflowName}
              </a>
              <a className="primary-link" href={sourceFreshnessWriteLiveRouteGateNote.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {sourceFreshnessWriteLiveRouteGateNote.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Live route gate"
                    ? sourceFreshnessWriteLiveRouteGateNote.routeSmokeCommand
                    : sourceFreshnessWriteLiveRouteGateNote.sourceSmokeCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={sourceFreshnessWriteLiveRouteFailureCopy.apiRoute}
          data-command={sourceFreshnessWriteLiveRouteFailureCopy.command}
          data-docs-href={sourceFreshnessWriteLiveRouteFailureCopy.docsHref}
          data-expected-breach-count={sourceFreshnessWriteLiveRouteFailureCopy.expectedBreachCount}
          data-expected-request-field-count={sourceFreshnessWriteLiveRouteFailureCopy.expectedRequestFieldCount}
          data-expected-route-count={sourceFreshnessWriteLiveRouteFailureCopy.expectedRouteCount}
          data-failing-command={sourceFreshnessWriteLiveRouteFailureCopy.failingCommand}
          data-no-merge-copy={sourceFreshnessWriteLiveRouteFailureCopy.noMergeCopy}
          data-owner-role={sourceFreshnessWriteLiveRouteFailureCopy.ownerRole}
          data-repair-targets={sourceFreshnessWriteLiveRouteFailureCopy.repairTargets}
          data-route-smoke-command={sourceFreshnessWriteLiveRouteFailureCopy.routeSmokeCommand}
          data-source-marker-selector={sourceFreshnessWriteLiveRouteFailureCopy.sourceMarkerSelector}
          data-testid="source-freshness-write-live-route-failure-copy"
          data-workflow-href={sourceFreshnessWriteLiveRouteFailureCopy.workflowHref}
          data-workflow-name={sourceFreshnessWriteLiveRouteFailureCopy.workflowName}
          data-workflow-path={sourceFreshnessWriteLiveRouteFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source freshness write live-route failure copy</p>
              <h2>Что делать, если freshness write live-route gate упал</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={sourceFreshnessWriteLiveRouteFailureCopy.workflowHref}>
                {sourceFreshnessWriteLiveRouteFailureCopy.workflowName}
              </a>
              <a className="primary-link" href={sourceFreshnessWriteLiveRouteFailureCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {sourceFreshnessWriteLiveRouteFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? sourceFreshnessWriteLiveRouteFailureCopy.noMergeCopy
                    : sourceFreshnessWriteLiveRouteFailureCopy.failingCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={sourceFreshnessWriteLiveRouteRenderedCopy.apiRoute}
          data-command={sourceFreshnessWriteLiveRouteRenderedCopy.command}
          data-docs-href={sourceFreshnessWriteLiveRouteRenderedCopy.docsHref}
          data-expected-breach-count={sourceFreshnessWriteLiveRouteRenderedCopy.expectedBreachCount}
          data-expected-request-field-count={sourceFreshnessWriteLiveRouteRenderedCopy.expectedRequestFieldCount}
          data-expected-route-count={sourceFreshnessWriteLiveRouteRenderedCopy.expectedRouteCount}
          data-failing-command={sourceFreshnessWriteLiveRouteRenderedCopy.failingCommand}
          data-live-failure-command={sourceFreshnessWriteLiveRouteRenderedCopy.liveFailureCommand}
          data-no-merge-copy={sourceFreshnessWriteLiveRouteRenderedCopy.noMergeCopy}
          data-owner-role={sourceFreshnessWriteLiveRouteRenderedCopy.ownerRole}
          data-repair-targets={sourceFreshnessWriteLiveRouteRenderedCopy.repairTargets}
          data-source-marker-selector={sourceFreshnessWriteLiveRouteRenderedCopy.sourceMarkerSelector}
          data-testid="source-freshness-write-live-route-rendered-copy"
          data-workflow-href={sourceFreshnessWriteLiveRouteRenderedCopy.workflowHref}
          data-workflow-name={sourceFreshnessWriteLiveRouteRenderedCopy.workflowName}
          data-workflow-path={sourceFreshnessWriteLiveRouteRenderedCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source freshness write live-route rendered copy</p>
              <h2>Что делать, если freshness write live-route copy пропал в rendered routes</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={sourceFreshnessWriteLiveRouteRenderedCopy.workflowHref}>
                {sourceFreshnessWriteLiveRouteRenderedCopy.workflowName}
              </a>
              <a className="primary-link" href={sourceFreshnessWriteLiveRouteRenderedCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {sourceFreshnessWriteLiveRouteRenderedCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? sourceFreshnessWriteLiveRouteRenderedCopy.noMergeCopy
                    : sourceFreshnessWriteLiveRouteRenderedCopy.failingCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={sourceFreshnessWriteLiveRouteWorkflowCopy.apiRoute}
          data-command={sourceFreshnessWriteLiveRouteWorkflowCopy.command}
          data-docs-href={sourceFreshnessWriteLiveRouteWorkflowCopy.docsHref}
          data-expected-breach-count={sourceFreshnessWriteLiveRouteWorkflowCopy.expectedBreachCount}
          data-expected-request-field-count={sourceFreshnessWriteLiveRouteWorkflowCopy.expectedRequestFieldCount}
          data-expected-route-count={sourceFreshnessWriteLiveRouteWorkflowCopy.expectedRouteCount}
          data-failing-command={sourceFreshnessWriteLiveRouteWorkflowCopy.failingCommand}
          data-live-rendered-command={sourceFreshnessWriteLiveRouteWorkflowCopy.liveRenderedCommand}
          data-no-merge-copy={sourceFreshnessWriteLiveRouteWorkflowCopy.noMergeCopy}
          data-owner-role={sourceFreshnessWriteLiveRouteWorkflowCopy.ownerRole}
          data-repair-targets={sourceFreshnessWriteLiveRouteWorkflowCopy.repairTargets}
          data-source-marker-selector={sourceFreshnessWriteLiveRouteWorkflowCopy.sourceMarkerSelector}
          data-testid="source-freshness-write-live-route-workflow-copy"
          data-workflow-failure-command={sourceFreshnessWriteLiveRouteWorkflowCopy.workflowFailureCommand}
          data-workflow-href={sourceFreshnessWriteLiveRouteWorkflowCopy.workflowHref}
          data-workflow-name={sourceFreshnessWriteLiveRouteWorkflowCopy.workflowName}
          data-workflow-path={sourceFreshnessWriteLiveRouteWorkflowCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source freshness write live-route workflow copy</p>
              <h2>Что делать, если freshness write live-route workflow order упал</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={sourceFreshnessWriteLiveRouteWorkflowCopy.workflowHref}>
                {sourceFreshnessWriteLiveRouteWorkflowCopy.workflowName}
              </a>
              <a className="primary-link" href={sourceFreshnessWriteLiveRouteWorkflowCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {sourceFreshnessWriteLiveRouteWorkflowCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? sourceFreshnessWriteLiveRouteWorkflowCopy.noMergeCopy
                    : sourceFreshnessWriteLiveRouteWorkflowCopy.liveRenderedCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={sourceFreshnessWriteLiveRouteDocsCopy.apiRoute}
          data-audit-note={sourceFreshnessWriteLiveRouteDocsCopy.auditNote}
          data-command={sourceFreshnessWriteLiveRouteDocsCopy.command}
          data-docs-href={sourceFreshnessWriteLiveRouteDocsCopy.docsHref}
          data-expected-breach-count={sourceFreshnessWriteLiveRouteDocsCopy.expectedBreachCount}
          data-expected-request-field-count={sourceFreshnessWriteLiveRouteDocsCopy.expectedRequestFieldCount}
          data-expected-route-count={sourceFreshnessWriteLiveRouteDocsCopy.expectedRouteCount}
          data-failing-command={sourceFreshnessWriteLiveRouteDocsCopy.failingCommand}
          data-live-workflow-command={sourceFreshnessWriteLiveRouteDocsCopy.liveWorkflowCommand}
          data-no-merge-copy={sourceFreshnessWriteLiveRouteDocsCopy.noMergeCopy}
          data-owner-role={sourceFreshnessWriteLiveRouteDocsCopy.ownerRole}
          data-repair-targets={sourceFreshnessWriteLiveRouteDocsCopy.repairTargets}
          data-source-marker-selector={sourceFreshnessWriteLiveRouteDocsCopy.sourceMarkerSelector}
          data-testid="source-freshness-write-live-route-docs-copy"
          data-workflow-href={sourceFreshnessWriteLiveRouteDocsCopy.workflowHref}
          data-workflow-name={sourceFreshnessWriteLiveRouteDocsCopy.workflowName}
          data-workflow-path={sourceFreshnessWriteLiveRouteDocsCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source freshness write live-route docs copy</p>
              <h2>Что делать, если freshness live-route docs copy упал</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={sourceFreshnessWriteLiveRouteDocsCopy.workflowHref}>
                {sourceFreshnessWriteLiveRouteDocsCopy.workflowName}
              </a>
              <a className="primary-link" href={sourceFreshnessWriteLiveRouteDocsCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {sourceFreshnessWriteLiveRouteDocsCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? sourceFreshnessWriteLiveRouteDocsCopy.noMergeCopy
                    : sourceFreshnessWriteLiveRouteDocsCopy.liveWorkflowCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={sourceFreshnessWriteLiveRouteReadmeTriggerCopy.apiRoute}
          data-command={sourceFreshnessWriteLiveRouteReadmeTriggerCopy.command}
          data-docs-command={sourceFreshnessWriteLiveRouteReadmeTriggerCopy.docsCommand}
          data-docs-href={sourceFreshnessWriteLiveRouteReadmeTriggerCopy.docsHref}
          data-expected-breach-count={sourceFreshnessWriteLiveRouteReadmeTriggerCopy.expectedBreachCount}
          data-expected-request-field-count={sourceFreshnessWriteLiveRouteReadmeTriggerCopy.expectedRequestFieldCount}
          data-expected-route-count={sourceFreshnessWriteLiveRouteReadmeTriggerCopy.expectedRouteCount}
          data-expected-workflow-path-count={sourceFreshnessWriteLiveRouteReadmeTriggerCopy.expectedWorkflowPathCount}
          data-failing-command={sourceFreshnessWriteLiveRouteReadmeTriggerCopy.failingCommand}
          data-no-merge-copy={sourceFreshnessWriteLiveRouteReadmeTriggerCopy.noMergeCopy}
          data-owner-role={sourceFreshnessWriteLiveRouteReadmeTriggerCopy.ownerRole}
          data-readme-path={sourceFreshnessWriteLiveRouteReadmeTriggerCopy.readmePath}
          data-repair-targets={sourceFreshnessWriteLiveRouteReadmeTriggerCopy.repairTargets}
          data-source-marker-selector={sourceFreshnessWriteLiveRouteReadmeTriggerCopy.sourceMarkerSelector}
          data-testid="source-freshness-write-live-route-readme-trigger-copy"
          data-trigger-path={sourceFreshnessWriteLiveRouteReadmeTriggerCopy.triggerPath}
          data-workflow-href={sourceFreshnessWriteLiveRouteReadmeTriggerCopy.workflowHref}
          data-workflow-name={sourceFreshnessWriteLiveRouteReadmeTriggerCopy.workflowName}
          data-workflow-path={sourceFreshnessWriteLiveRouteReadmeTriggerCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source freshness write live-route README trigger copy</p>
              <h2>Что делать, если freshness README trigger copy упал</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={sourceFreshnessWriteLiveRouteReadmeTriggerCopy.workflowHref}>
                {sourceFreshnessWriteLiveRouteReadmeTriggerCopy.workflowName}
              </a>
              <a className="primary-link" href={sourceFreshnessWriteLiveRouteReadmeTriggerCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {sourceFreshnessWriteLiveRouteReadmeTriggerCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? sourceFreshnessWriteLiveRouteReadmeTriggerCopy.noMergeCopy
                    : sourceFreshnessWriteLiveRouteReadmeTriggerCopy.triggerPath}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={sourceFreshnessWriteLiveRouteReadmeRenderedCopy.apiRoute}
          data-command={sourceFreshnessWriteLiveRouteReadmeRenderedCopy.command}
          data-docs-command={sourceFreshnessWriteLiveRouteReadmeRenderedCopy.docsCommand}
          data-docs-href={sourceFreshnessWriteLiveRouteReadmeRenderedCopy.docsHref}
          data-expected-breach-count={sourceFreshnessWriteLiveRouteReadmeRenderedCopy.expectedBreachCount}
          data-expected-request-field-count={sourceFreshnessWriteLiveRouteReadmeRenderedCopy.expectedRequestFieldCount}
          data-expected-route-count={sourceFreshnessWriteLiveRouteReadmeRenderedCopy.expectedRouteCount}
          data-failing-command={sourceFreshnessWriteLiveRouteReadmeRenderedCopy.failingCommand}
          data-no-merge-copy={sourceFreshnessWriteLiveRouteReadmeRenderedCopy.noMergeCopy}
          data-owner-role={sourceFreshnessWriteLiveRouteReadmeRenderedCopy.ownerRole}
          data-readme-trigger-command={sourceFreshnessWriteLiveRouteReadmeRenderedCopy.readmeTriggerCommand}
          data-repair-targets={sourceFreshnessWriteLiveRouteReadmeRenderedCopy.repairTargets}
          data-source-marker-selector={sourceFreshnessWriteLiveRouteReadmeRenderedCopy.sourceMarkerSelector}
          data-testid="source-freshness-write-live-route-readme-rendered-copy"
          data-trigger-path={sourceFreshnessWriteLiveRouteReadmeRenderedCopy.triggerPath}
          data-workflow-href={sourceFreshnessWriteLiveRouteReadmeRenderedCopy.workflowHref}
          data-workflow-name={sourceFreshnessWriteLiveRouteReadmeRenderedCopy.workflowName}
          data-workflow-path={sourceFreshnessWriteLiveRouteReadmeRenderedCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source freshness write live-route README rendered copy</p>
              <h2>Что делать, если freshness README trigger copy пропал в rendered routes</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={sourceFreshnessWriteLiveRouteReadmeRenderedCopy.workflowHref}>
                {sourceFreshnessWriteLiveRouteReadmeRenderedCopy.workflowName}
              </a>
              <a className="primary-link" href={sourceFreshnessWriteLiveRouteReadmeRenderedCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {sourceFreshnessWriteLiveRouteReadmeRenderedCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? sourceFreshnessWriteLiveRouteReadmeRenderedCopy.noMergeCopy
                    : sourceFreshnessWriteLiveRouteReadmeRenderedCopy.readmeTriggerCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={sourceFreshnessWriteLiveRouteReadmeWorkflowCopy.apiRoute}
          data-command={sourceFreshnessWriteLiveRouteReadmeWorkflowCopy.command}
          data-docs-href={sourceFreshnessWriteLiveRouteReadmeWorkflowCopy.docsHref}
          data-expected-breach-count={sourceFreshnessWriteLiveRouteReadmeWorkflowCopy.expectedBreachCount}
          data-expected-request-field-count={sourceFreshnessWriteLiveRouteReadmeWorkflowCopy.expectedRequestFieldCount}
          data-expected-route-count={sourceFreshnessWriteLiveRouteReadmeWorkflowCopy.expectedRouteCount}
          data-failing-command={sourceFreshnessWriteLiveRouteReadmeWorkflowCopy.failingCommand}
          data-no-merge-copy={sourceFreshnessWriteLiveRouteReadmeWorkflowCopy.noMergeCopy}
          data-owner-role={sourceFreshnessWriteLiveRouteReadmeWorkflowCopy.ownerRole}
          data-readme-rendered-command={sourceFreshnessWriteLiveRouteReadmeWorkflowCopy.readmeRenderedCommand}
          data-repair-targets={sourceFreshnessWriteLiveRouteReadmeWorkflowCopy.repairTargets}
          data-source-marker-selector={sourceFreshnessWriteLiveRouteReadmeWorkflowCopy.sourceMarkerSelector}
          data-testid="source-freshness-write-live-route-readme-workflow-copy"
          data-workflow-failure-command={sourceFreshnessWriteLiveRouteReadmeWorkflowCopy.workflowFailureCommand}
          data-workflow-href={sourceFreshnessWriteLiveRouteReadmeWorkflowCopy.workflowHref}
          data-workflow-name={sourceFreshnessWriteLiveRouteReadmeWorkflowCopy.workflowName}
          data-workflow-path={sourceFreshnessWriteLiveRouteReadmeWorkflowCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source freshness write live-route README workflow copy</p>
              <h2>Что делать, если freshness README workflow order упал</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={sourceFreshnessWriteLiveRouteReadmeWorkflowCopy.workflowHref}>
                {sourceFreshnessWriteLiveRouteReadmeWorkflowCopy.workflowName}
              </a>
              <a className="primary-link" href={sourceFreshnessWriteLiveRouteReadmeWorkflowCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {sourceFreshnessWriteLiveRouteReadmeWorkflowCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? sourceFreshnessWriteLiveRouteReadmeWorkflowCopy.noMergeCopy
                    : sourceFreshnessWriteLiveRouteReadmeWorkflowCopy.readmeRenderedCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={sourceFreshnessWriteLiveRouteReadmeWorkflowFailureCopy.apiRoute}
          data-command={sourceFreshnessWriteLiveRouteReadmeWorkflowFailureCopy.command}
          data-docs-href={sourceFreshnessWriteLiveRouteReadmeWorkflowFailureCopy.docsHref}
          data-expected-breach-count={sourceFreshnessWriteLiveRouteReadmeWorkflowFailureCopy.expectedBreachCount}
          data-expected-request-field-count={sourceFreshnessWriteLiveRouteReadmeWorkflowFailureCopy.expectedRequestFieldCount}
          data-expected-route-count={sourceFreshnessWriteLiveRouteReadmeWorkflowFailureCopy.expectedRouteCount}
          data-failing-command={sourceFreshnessWriteLiveRouteReadmeWorkflowFailureCopy.failingCommand}
          data-no-merge-copy={sourceFreshnessWriteLiveRouteReadmeWorkflowFailureCopy.noMergeCopy}
          data-owner-role={sourceFreshnessWriteLiveRouteReadmeWorkflowFailureCopy.ownerRole}
          data-readme-workflow-command={sourceFreshnessWriteLiveRouteReadmeWorkflowFailureCopy.readmeWorkflowCommand}
          data-repair-targets={sourceFreshnessWriteLiveRouteReadmeWorkflowFailureCopy.repairTargets}
          data-source-marker-selector={sourceFreshnessWriteLiveRouteReadmeWorkflowFailureCopy.sourceMarkerSelector}
          data-testid="source-freshness-write-live-route-readme-workflow-failure-copy"
          data-workflow-failure-command={sourceFreshnessWriteLiveRouteReadmeWorkflowFailureCopy.workflowFailureCommand}
          data-workflow-href={sourceFreshnessWriteLiveRouteReadmeWorkflowFailureCopy.workflowHref}
          data-workflow-name={sourceFreshnessWriteLiveRouteReadmeWorkflowFailureCopy.workflowName}
          data-workflow-path={sourceFreshnessWriteLiveRouteReadmeWorkflowFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source freshness write live-route README workflow failure copy</p>
              <h2>Что делать, если freshness README workflow failure guard упал</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={sourceFreshnessWriteLiveRouteReadmeWorkflowFailureCopy.workflowHref}>
                {sourceFreshnessWriteLiveRouteReadmeWorkflowFailureCopy.workflowName}
              </a>
              <a className="primary-link" href={sourceFreshnessWriteLiveRouteReadmeWorkflowFailureCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {sourceFreshnessWriteLiveRouteReadmeWorkflowFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? sourceFreshnessWriteLiveRouteReadmeWorkflowFailureCopy.noMergeCopy
                    : sourceFreshnessWriteLiveRouteReadmeWorkflowFailureCopy.readmeWorkflowCommand}
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
          data-api-route={eisRealNetworkApprovalDocsFailureCopy.apiRoute}
          data-command={eisRealNetworkApprovalDocsFailureCopy.command}
          data-docs-href={eisRealNetworkApprovalDocsFailureCopy.docsHref}
          data-expected-approval-count={eisRealNetworkApprovalDocsFailureCopy.expectedApprovalCount}
          data-expected-route-count={eisRealNetworkApprovalDocsFailureCopy.expectedRouteCount}
          data-failing-command={eisRealNetworkApprovalDocsFailureCopy.failingCommand}
          data-no-merge-copy={eisRealNetworkApprovalDocsFailureCopy.noMergeCopy}
          data-owner-role={eisRealNetworkApprovalDocsFailureCopy.ownerRole}
          data-parity-command={eisRealNetworkApprovalDocsFailureCopy.parityCommand}
          data-repair-targets={eisRealNetworkApprovalDocsFailureCopy.repairTargets}
          data-source-marker-selector={eisRealNetworkApprovalDocsFailureCopy.sourceMarkerSelector}
          data-testid="eis-real-network-approval-docs-failure-copy"
          data-workflow-href={eisRealNetworkApprovalDocsFailureCopy.workflowHref}
          data-workflow-name={eisRealNetworkApprovalDocsFailureCopy.workflowName}
          data-workflow-path={eisRealNetworkApprovalDocsFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">EIS real-network approval docs failure copy</p>
              <h2>Что делать, если EIS approval docs anchor упал</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={eisRealNetworkApprovalDocsFailureCopy.workflowHref}>
                {eisRealNetworkApprovalDocsFailureCopy.workflowName}
              </a>
              <a className="primary-link" href={eisRealNetworkApprovalDocsFailureCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {eisRealNetworkApprovalDocsFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge" ? eisRealNetworkApprovalDocsFailureCopy.noMergeCopy : eisRealNetworkApprovalDocsFailureCopy.docsHref}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={eisRealNetworkApprovalRenderedRouteFailureCopy.apiRoute}
          data-command={eisRealNetworkApprovalRenderedRouteFailureCopy.command}
          data-docs-href={eisRealNetworkApprovalRenderedRouteFailureCopy.docsHref}
          data-expected-approval-count={eisRealNetworkApprovalRenderedRouteFailureCopy.expectedApprovalCount}
          data-expected-route-count={eisRealNetworkApprovalRenderedRouteFailureCopy.expectedRouteCount}
          data-failing-command={eisRealNetworkApprovalRenderedRouteFailureCopy.failingCommand}
          data-no-merge-copy={eisRealNetworkApprovalRenderedRouteFailureCopy.noMergeCopy}
          data-owner-role={eisRealNetworkApprovalRenderedRouteFailureCopy.ownerRole}
          data-parity-command={eisRealNetworkApprovalRenderedRouteFailureCopy.parityCommand}
          data-repair-targets={eisRealNetworkApprovalRenderedRouteFailureCopy.repairTargets}
          data-source-marker-selector={eisRealNetworkApprovalRenderedRouteFailureCopy.sourceMarkerSelector}
          data-testid="eis-real-network-approval-rendered-route-failure-copy"
          data-workflow-href={eisRealNetworkApprovalRenderedRouteFailureCopy.workflowHref}
          data-workflow-name={eisRealNetworkApprovalRenderedRouteFailureCopy.workflowName}
          data-workflow-path={eisRealNetworkApprovalRenderedRouteFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">EIS real-network approval rendered-route failure copy</p>
              <h2>Что делать, если EIS approval пропал в rendered routes</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={eisRealNetworkApprovalRenderedRouteFailureCopy.workflowHref}>
                {eisRealNetworkApprovalRenderedRouteFailureCopy.workflowName}
              </a>
              <a className="primary-link" href={eisRealNetworkApprovalRenderedRouteFailureCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {eisRealNetworkApprovalRenderedRouteFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? eisRealNetworkApprovalRenderedRouteFailureCopy.noMergeCopy
                    : eisRealNetworkApprovalRenderedRouteFailureCopy.failingCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={eisRealNetworkApprovalLiveRouteGateNote.apiRoute}
          data-command={eisRealNetworkApprovalLiveRouteGateNote.command}
          data-docs-href={eisRealNetworkApprovalLiveRouteGateNote.docsHref}
          data-expected-approval-count={eisRealNetworkApprovalLiveRouteGateNote.expectedApprovalCount}
          data-expected-route-count={eisRealNetworkApprovalLiveRouteGateNote.expectedRouteCount}
          data-marker-selector={eisRealNetworkApprovalLiveRouteGateNote.markerSelector}
          data-parity-command={eisRealNetworkApprovalLiveRouteGateNote.parityCommand}
          data-route-smoke-command={eisRealNetworkApprovalLiveRouteGateNote.routeSmokeCommand}
          data-source-smoke-command={eisRealNetworkApprovalLiveRouteGateNote.sourceSmokeCommand}
          data-testid="eis-real-network-approval-live-route-gate-note"
          data-workflow-href={eisRealNetworkApprovalLiveRouteGateNote.workflowHref}
          data-workflow-name={eisRealNetworkApprovalLiveRouteGateNote.workflowName}
          data-workflow-path={eisRealNetworkApprovalLiveRouteGateNote.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">EIS real-network approval live-route gate note</p>
              <h2>Как live route smoke защищает EIS approval chain</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={eisRealNetworkApprovalLiveRouteGateNote.workflowHref}>
                {eisRealNetworkApprovalLiveRouteGateNote.workflowName}
              </a>
              <a className="primary-link" href={eisRealNetworkApprovalLiveRouteGateNote.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {eisRealNetworkApprovalLiveRouteGateNote.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Live route gate"
                    ? eisRealNetworkApprovalLiveRouteGateNote.routeSmokeCommand
                    : eisRealNetworkApprovalLiveRouteGateNote.command}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={eisRealNetworkApprovalLiveRouteFailureCopy.apiRoute}
          data-command={eisRealNetworkApprovalLiveRouteFailureCopy.command}
          data-docs-href={eisRealNetworkApprovalLiveRouteFailureCopy.docsHref}
          data-expected-approval-count={eisRealNetworkApprovalLiveRouteFailureCopy.expectedApprovalCount}
          data-expected-route-count={eisRealNetworkApprovalLiveRouteFailureCopy.expectedRouteCount}
          data-failing-command={eisRealNetworkApprovalLiveRouteFailureCopy.failingCommand}
          data-no-merge-copy={eisRealNetworkApprovalLiveRouteFailureCopy.noMergeCopy}
          data-owner-role={eisRealNetworkApprovalLiveRouteFailureCopy.ownerRole}
          data-repair-targets={eisRealNetworkApprovalLiveRouteFailureCopy.repairTargets}
          data-route-smoke-command={eisRealNetworkApprovalLiveRouteFailureCopy.routeSmokeCommand}
          data-source-marker-selector={eisRealNetworkApprovalLiveRouteFailureCopy.sourceMarkerSelector}
          data-testid="eis-real-network-approval-live-route-failure-copy"
          data-workflow-href={eisRealNetworkApprovalLiveRouteFailureCopy.workflowHref}
          data-workflow-name={eisRealNetworkApprovalLiveRouteFailureCopy.workflowName}
          data-workflow-path={eisRealNetworkApprovalLiveRouteFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">EIS real-network approval live-route failure copy</p>
              <h2>Что делать, если EIS approval live-route gate упал</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={eisRealNetworkApprovalLiveRouteFailureCopy.workflowHref}>
                {eisRealNetworkApprovalLiveRouteFailureCopy.workflowName}
              </a>
              <a className="primary-link" href={eisRealNetworkApprovalLiveRouteFailureCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {eisRealNetworkApprovalLiveRouteFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? eisRealNetworkApprovalLiveRouteFailureCopy.noMergeCopy
                    : eisRealNetworkApprovalLiveRouteFailureCopy.failingCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={eisRealNetworkApprovalLiveRouteRenderedCopy.apiRoute}
          data-command={eisRealNetworkApprovalLiveRouteRenderedCopy.command}
          data-docs-href={eisRealNetworkApprovalLiveRouteRenderedCopy.docsHref}
          data-expected-approval-count={eisRealNetworkApprovalLiveRouteRenderedCopy.expectedApprovalCount}
          data-expected-route-count={eisRealNetworkApprovalLiveRouteRenderedCopy.expectedRouteCount}
          data-failing-command={eisRealNetworkApprovalLiveRouteRenderedCopy.failingCommand}
          data-live-failure-command={eisRealNetworkApprovalLiveRouteRenderedCopy.liveFailureCommand}
          data-no-merge-copy={eisRealNetworkApprovalLiveRouteRenderedCopy.noMergeCopy}
          data-owner-role={eisRealNetworkApprovalLiveRouteRenderedCopy.ownerRole}
          data-repair-targets={eisRealNetworkApprovalLiveRouteRenderedCopy.repairTargets}
          data-source-marker-selector={eisRealNetworkApprovalLiveRouteRenderedCopy.sourceMarkerSelector}
          data-testid="eis-real-network-approval-live-route-rendered-copy"
          data-workflow-href={eisRealNetworkApprovalLiveRouteRenderedCopy.workflowHref}
          data-workflow-name={eisRealNetworkApprovalLiveRouteRenderedCopy.workflowName}
          data-workflow-path={eisRealNetworkApprovalLiveRouteRenderedCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">EIS real-network approval live-route rendered copy</p>
              <h2>Что делать, если EIS approval live-route copy пропал в rendered routes</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={eisRealNetworkApprovalLiveRouteRenderedCopy.workflowHref}>
                {eisRealNetworkApprovalLiveRouteRenderedCopy.workflowName}
              </a>
              <a className="primary-link" href={eisRealNetworkApprovalLiveRouteRenderedCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {eisRealNetworkApprovalLiveRouteRenderedCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? eisRealNetworkApprovalLiveRouteRenderedCopy.noMergeCopy
                    : eisRealNetworkApprovalLiveRouteRenderedCopy.failingCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={eisRealNetworkApprovalLiveRouteWorkflowCopy.apiRoute}
          data-command={eisRealNetworkApprovalLiveRouteWorkflowCopy.command}
          data-docs-href={eisRealNetworkApprovalLiveRouteWorkflowCopy.docsHref}
          data-expected-approval-count={eisRealNetworkApprovalLiveRouteWorkflowCopy.expectedApprovalCount}
          data-expected-route-count={eisRealNetworkApprovalLiveRouteWorkflowCopy.expectedRouteCount}
          data-failing-command={eisRealNetworkApprovalLiveRouteWorkflowCopy.failingCommand}
          data-live-rendered-command={eisRealNetworkApprovalLiveRouteWorkflowCopy.liveRenderedCommand}
          data-no-merge-copy={eisRealNetworkApprovalLiveRouteWorkflowCopy.noMergeCopy}
          data-owner-role={eisRealNetworkApprovalLiveRouteWorkflowCopy.ownerRole}
          data-repair-targets={eisRealNetworkApprovalLiveRouteWorkflowCopy.repairTargets}
          data-source-marker-selector={eisRealNetworkApprovalLiveRouteWorkflowCopy.sourceMarkerSelector}
          data-testid="eis-real-network-approval-live-route-workflow-copy"
          data-workflow-failure-command={eisRealNetworkApprovalLiveRouteWorkflowCopy.workflowFailureCommand}
          data-workflow-href={eisRealNetworkApprovalLiveRouteWorkflowCopy.workflowHref}
          data-workflow-name={eisRealNetworkApprovalLiveRouteWorkflowCopy.workflowName}
          data-workflow-path={eisRealNetworkApprovalLiveRouteWorkflowCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">EIS real-network approval live-route workflow copy</p>
              <h2>Что делать, если EIS approval live-route workflow order упал</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={eisRealNetworkApprovalLiveRouteWorkflowCopy.workflowHref}>
                {eisRealNetworkApprovalLiveRouteWorkflowCopy.workflowName}
              </a>
              <a className="primary-link" href={eisRealNetworkApprovalLiveRouteWorkflowCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {eisRealNetworkApprovalLiveRouteWorkflowCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? eisRealNetworkApprovalLiveRouteWorkflowCopy.noMergeCopy
                    : eisRealNetworkApprovalLiveRouteWorkflowCopy.liveRenderedCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={eisRealNetworkApprovalLiveRouteDocsCopy.apiRoute}
          data-audit-note={eisRealNetworkApprovalLiveRouteDocsCopy.auditNote}
          data-command={eisRealNetworkApprovalLiveRouteDocsCopy.command}
          data-docs-href={eisRealNetworkApprovalLiveRouteDocsCopy.docsHref}
          data-expected-approval-count={eisRealNetworkApprovalLiveRouteDocsCopy.expectedApprovalCount}
          data-expected-route-count={eisRealNetworkApprovalLiveRouteDocsCopy.expectedRouteCount}
          data-failing-command={eisRealNetworkApprovalLiveRouteDocsCopy.failingCommand}
          data-live-workflow-command={eisRealNetworkApprovalLiveRouteDocsCopy.liveWorkflowCommand}
          data-no-merge-copy={eisRealNetworkApprovalLiveRouteDocsCopy.noMergeCopy}
          data-owner-role={eisRealNetworkApprovalLiveRouteDocsCopy.ownerRole}
          data-repair-targets={eisRealNetworkApprovalLiveRouteDocsCopy.repairTargets}
          data-source-marker-selector={eisRealNetworkApprovalLiveRouteDocsCopy.sourceMarkerSelector}
          data-testid="eis-real-network-approval-live-route-docs-copy"
          data-workflow-href={eisRealNetworkApprovalLiveRouteDocsCopy.workflowHref}
          data-workflow-name={eisRealNetworkApprovalLiveRouteDocsCopy.workflowName}
          data-workflow-path={eisRealNetworkApprovalLiveRouteDocsCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">EIS real-network approval live-route docs copy</p>
              <h2>Что делать, если EIS approval live-route docs copy упал</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={eisRealNetworkApprovalLiveRouteDocsCopy.workflowHref}>
                {eisRealNetworkApprovalLiveRouteDocsCopy.workflowName}
              </a>
              <a className="primary-link" href={eisRealNetworkApprovalLiveRouteDocsCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {eisRealNetworkApprovalLiveRouteDocsCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? eisRealNetworkApprovalLiveRouteDocsCopy.noMergeCopy
                    : eisRealNetworkApprovalLiveRouteDocsCopy.liveWorkflowCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={eisRealNetworkApprovalLiveRouteReadmeTriggerCopy.apiRoute}
          data-audit-note={eisRealNetworkApprovalLiveRouteReadmeTriggerCopy.auditNote}
          data-command={eisRealNetworkApprovalLiveRouteReadmeTriggerCopy.command}
          data-docs-command={eisRealNetworkApprovalLiveRouteReadmeTriggerCopy.docsCommand}
          data-docs-href={eisRealNetworkApprovalLiveRouteReadmeTriggerCopy.docsHref}
          data-expected-approval-count={eisRealNetworkApprovalLiveRouteReadmeTriggerCopy.expectedApprovalCount}
          data-expected-route-count={eisRealNetworkApprovalLiveRouteReadmeTriggerCopy.expectedRouteCount}
          data-expected-workflow-path-count={eisRealNetworkApprovalLiveRouteReadmeTriggerCopy.expectedWorkflowPathCount}
          data-failing-command={eisRealNetworkApprovalLiveRouteReadmeTriggerCopy.failingCommand}
          data-no-merge-copy={eisRealNetworkApprovalLiveRouteReadmeTriggerCopy.noMergeCopy}
          data-owner-role={eisRealNetworkApprovalLiveRouteReadmeTriggerCopy.ownerRole}
          data-readme-path={eisRealNetworkApprovalLiveRouteReadmeTriggerCopy.readmePath}
          data-repair-targets={eisRealNetworkApprovalLiveRouteReadmeTriggerCopy.repairTargets}
          data-source-marker-selector={eisRealNetworkApprovalLiveRouteReadmeTriggerCopy.sourceMarkerSelector}
          data-testid="eis-real-network-approval-live-route-readme-trigger-copy"
          data-trigger-path={eisRealNetworkApprovalLiveRouteReadmeTriggerCopy.triggerPath}
          data-workflow-href={eisRealNetworkApprovalLiveRouteReadmeTriggerCopy.workflowHref}
          data-workflow-name={eisRealNetworkApprovalLiveRouteReadmeTriggerCopy.workflowName}
          data-workflow-path={eisRealNetworkApprovalLiveRouteReadmeTriggerCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">EIS real-network approval live-route README trigger copy</p>
              <h2>Что делать, если EIS approval README trigger copy упал</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={eisRealNetworkApprovalLiveRouteReadmeTriggerCopy.workflowHref}>
                {eisRealNetworkApprovalLiveRouteReadmeTriggerCopy.workflowName}
              </a>
              <a className="primary-link" href={eisRealNetworkApprovalLiveRouteReadmeTriggerCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {eisRealNetworkApprovalLiveRouteReadmeTriggerCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? eisRealNetworkApprovalLiveRouteReadmeTriggerCopy.noMergeCopy
                    : eisRealNetworkApprovalLiveRouteReadmeTriggerCopy.docsCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={eisRealNetworkApprovalLiveRouteReadmeRenderedCopy.apiRoute}
          data-audit-note={eisRealNetworkApprovalLiveRouteReadmeRenderedCopy.auditNote}
          data-command={eisRealNetworkApprovalLiveRouteReadmeRenderedCopy.command}
          data-docs-command={eisRealNetworkApprovalLiveRouteReadmeRenderedCopy.docsCommand}
          data-docs-href={eisRealNetworkApprovalLiveRouteReadmeRenderedCopy.docsHref}
          data-expected-approval-count={eisRealNetworkApprovalLiveRouteReadmeRenderedCopy.expectedApprovalCount}
          data-expected-route-count={eisRealNetworkApprovalLiveRouteReadmeRenderedCopy.expectedRouteCount}
          data-failing-command={eisRealNetworkApprovalLiveRouteReadmeRenderedCopy.failingCommand}
          data-no-merge-copy={eisRealNetworkApprovalLiveRouteReadmeRenderedCopy.noMergeCopy}
          data-owner-role={eisRealNetworkApprovalLiveRouteReadmeRenderedCopy.ownerRole}
          data-readme-trigger-command={eisRealNetworkApprovalLiveRouteReadmeRenderedCopy.readmeTriggerCommand}
          data-repair-targets={eisRealNetworkApprovalLiveRouteReadmeRenderedCopy.repairTargets}
          data-source-marker-selector={eisRealNetworkApprovalLiveRouteReadmeRenderedCopy.sourceMarkerSelector}
          data-testid="eis-real-network-approval-live-route-readme-rendered-copy"
          data-trigger-path={eisRealNetworkApprovalLiveRouteReadmeRenderedCopy.triggerPath}
          data-workflow-href={eisRealNetworkApprovalLiveRouteReadmeRenderedCopy.workflowHref}
          data-workflow-name={eisRealNetworkApprovalLiveRouteReadmeRenderedCopy.workflowName}
          data-workflow-path={eisRealNetworkApprovalLiveRouteReadmeRenderedCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">EIS real-network approval live-route README rendered copy</p>
              <h2>Что делать, если EIS approval README trigger copy пропал в rendered routes</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={eisRealNetworkApprovalLiveRouteReadmeRenderedCopy.workflowHref}>
                {eisRealNetworkApprovalLiveRouteReadmeRenderedCopy.workflowName}
              </a>
              <a className="primary-link" href={eisRealNetworkApprovalLiveRouteReadmeRenderedCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {eisRealNetworkApprovalLiveRouteReadmeRenderedCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? eisRealNetworkApprovalLiveRouteReadmeRenderedCopy.noMergeCopy
                    : eisRealNetworkApprovalLiveRouteReadmeRenderedCopy.readmeTriggerCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={eisRealNetworkApprovalLiveRouteReadmeWorkflowCopy.apiRoute}
          data-audit-note={eisRealNetworkApprovalLiveRouteReadmeWorkflowCopy.auditNote}
          data-command={eisRealNetworkApprovalLiveRouteReadmeWorkflowCopy.command}
          data-docs-command={eisRealNetworkApprovalLiveRouteReadmeWorkflowCopy.docsCommand}
          data-docs-href={eisRealNetworkApprovalLiveRouteReadmeWorkflowCopy.docsHref}
          data-expected-approval-count={eisRealNetworkApprovalLiveRouteReadmeWorkflowCopy.expectedApprovalCount}
          data-expected-route-count={eisRealNetworkApprovalLiveRouteReadmeWorkflowCopy.expectedRouteCount}
          data-failing-command={eisRealNetworkApprovalLiveRouteReadmeWorkflowCopy.failingCommand}
          data-no-merge-copy={eisRealNetworkApprovalLiveRouteReadmeWorkflowCopy.noMergeCopy}
          data-owner-role={eisRealNetworkApprovalLiveRouteReadmeWorkflowCopy.ownerRole}
          data-readme-rendered-command={eisRealNetworkApprovalLiveRouteReadmeWorkflowCopy.readmeRenderedCommand}
          data-repair-targets={eisRealNetworkApprovalLiveRouteReadmeWorkflowCopy.repairTargets}
          data-source-marker-selector={eisRealNetworkApprovalLiveRouteReadmeWorkflowCopy.sourceMarkerSelector}
          data-testid="eis-real-network-approval-live-route-readme-workflow-copy"
          data-trigger-path={eisRealNetworkApprovalLiveRouteReadmeWorkflowCopy.triggerPath}
          data-workflow-failure-command={eisRealNetworkApprovalLiveRouteReadmeWorkflowCopy.workflowFailureCommand}
          data-workflow-href={eisRealNetworkApprovalLiveRouteReadmeWorkflowCopy.workflowHref}
          data-workflow-name={eisRealNetworkApprovalLiveRouteReadmeWorkflowCopy.workflowName}
          data-workflow-path={eisRealNetworkApprovalLiveRouteReadmeWorkflowCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">EIS real-network approval live-route README workflow copy</p>
              <h2>Что делать, если EIS approval README workflow order упал</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={eisRealNetworkApprovalLiveRouteReadmeWorkflowCopy.workflowHref}>
                {eisRealNetworkApprovalLiveRouteReadmeWorkflowCopy.workflowName}
              </a>
              <a className="primary-link" href={eisRealNetworkApprovalLiveRouteReadmeWorkflowCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {eisRealNetworkApprovalLiveRouteReadmeWorkflowCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? eisRealNetworkApprovalLiveRouteReadmeWorkflowCopy.noMergeCopy
                    : eisRealNetworkApprovalLiveRouteReadmeWorkflowCopy.readmeRenderedCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={eisRealNetworkApprovalLiveRouteReadmeWorkflowFailureCopy.apiRoute}
          data-audit-note={eisRealNetworkApprovalLiveRouteReadmeWorkflowFailureCopy.auditNote}
          data-command={eisRealNetworkApprovalLiveRouteReadmeWorkflowFailureCopy.command}
          data-docs-command={eisRealNetworkApprovalLiveRouteReadmeWorkflowFailureCopy.docsCommand}
          data-docs-href={eisRealNetworkApprovalLiveRouteReadmeWorkflowFailureCopy.docsHref}
          data-expected-approval-count={eisRealNetworkApprovalLiveRouteReadmeWorkflowFailureCopy.expectedApprovalCount}
          data-expected-route-count={eisRealNetworkApprovalLiveRouteReadmeWorkflowFailureCopy.expectedRouteCount}
          data-failing-command={eisRealNetworkApprovalLiveRouteReadmeWorkflowFailureCopy.failingCommand}
          data-no-merge-copy={eisRealNetworkApprovalLiveRouteReadmeWorkflowFailureCopy.noMergeCopy}
          data-owner-role={eisRealNetworkApprovalLiveRouteReadmeWorkflowFailureCopy.ownerRole}
          data-readme-workflow-command={eisRealNetworkApprovalLiveRouteReadmeWorkflowFailureCopy.readmeWorkflowCommand}
          data-repair-targets={eisRealNetworkApprovalLiveRouteReadmeWorkflowFailureCopy.repairTargets}
          data-source-marker-selector={eisRealNetworkApprovalLiveRouteReadmeWorkflowFailureCopy.sourceMarkerSelector}
          data-testid="eis-real-network-approval-live-route-readme-workflow-failure-copy"
          data-trigger-path={eisRealNetworkApprovalLiveRouteReadmeWorkflowFailureCopy.triggerPath}
          data-workflow-failure-command={eisRealNetworkApprovalLiveRouteReadmeWorkflowFailureCopy.workflowFailureCommand}
          data-workflow-href={eisRealNetworkApprovalLiveRouteReadmeWorkflowFailureCopy.workflowHref}
          data-workflow-name={eisRealNetworkApprovalLiveRouteReadmeWorkflowFailureCopy.workflowName}
          data-workflow-path={eisRealNetworkApprovalLiveRouteReadmeWorkflowFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">EIS real-network approval live-route README workflow failure copy</p>
              <h2>Что делать, если EIS approval README workflow failure guard упал</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={eisRealNetworkApprovalLiveRouteReadmeWorkflowFailureCopy.workflowHref}>
                {eisRealNetworkApprovalLiveRouteReadmeWorkflowFailureCopy.workflowName}
              </a>
              <a className="primary-link" href={eisRealNetworkApprovalLiveRouteReadmeWorkflowFailureCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {eisRealNetworkApprovalLiveRouteReadmeWorkflowFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? eisRealNetworkApprovalLiveRouteReadmeWorkflowFailureCopy.noMergeCopy
                    : eisRealNetworkApprovalLiveRouteReadmeWorkflowFailureCopy.readmeWorkflowCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-api-route={eisRealNetworkApprovalWorkflowFailureCopy.apiRoute}
          data-command={eisRealNetworkApprovalWorkflowFailureCopy.command}
          data-docs-href={eisRealNetworkApprovalWorkflowFailureCopy.docsHref}
          data-expected-approval-count={eisRealNetworkApprovalWorkflowFailureCopy.expectedApprovalCount}
          data-expected-route-count={eisRealNetworkApprovalWorkflowFailureCopy.expectedRouteCount}
          data-failing-command={eisRealNetworkApprovalWorkflowFailureCopy.failingCommand}
          data-no-merge-copy={eisRealNetworkApprovalWorkflowFailureCopy.noMergeCopy}
          data-owner-role={eisRealNetworkApprovalWorkflowFailureCopy.ownerRole}
          data-parity-command={eisRealNetworkApprovalWorkflowFailureCopy.parityCommand}
          data-repair-targets={eisRealNetworkApprovalWorkflowFailureCopy.repairTargets}
          data-source-marker-selector={eisRealNetworkApprovalWorkflowFailureCopy.sourceMarkerSelector}
          data-testid="eis-real-network-approval-workflow-failure-copy"
          data-workflow-href={eisRealNetworkApprovalWorkflowFailureCopy.workflowHref}
          data-workflow-name={eisRealNetworkApprovalWorkflowFailureCopy.workflowName}
          data-workflow-path={eisRealNetworkApprovalWorkflowFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">EIS real-network approval workflow failure copy</p>
              <h2>Что делать, если EIS approval workflow order упал</h2>
            </div>
            <div className="panel-actions">
              <a className="primary-link" href={eisRealNetworkApprovalWorkflowFailureCopy.workflowHref}>
                {eisRealNetworkApprovalWorkflowFailureCopy.workflowName}
              </a>
              <a className="primary-link" href={eisRealNetworkApprovalWorkflowFailureCopy.docsHref}>
                API contract
              </a>
            </div>
          </div>
          <div className="fixture-coverage-grid">
            {eisRealNetworkApprovalWorkflowFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? eisRealNetworkApprovalWorkflowFailureCopy.noMergeCopy
                    : eisRealNetworkApprovalWorkflowFailureCopy.failingCommand}
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

        <section
          className="panel fixture-coverage-panel"
          data-docs-href={webBuildWorkflowDocsDeepLink.docsHref}
          data-expected-command-count={webBuildWorkflowDocsDeepLink.expectedCommandCount}
          data-file-smoke-selector={webBuildWorkflowDocsDeepLink.fileSmokeSelector}
          data-route={webBuildWorkflowDocsDeepLink.route}
          data-source-marker-selector={webBuildWorkflowDocsDeepLink.sourceMarkerSelector}
          data-testid="web-build-workflow-docs-deep-link"
          data-workflow-href={webBuildWorkflowDocsDeepLink.workflowHref}
          data-workflow-name={webBuildWorkflowDocsDeepLink.workflowName}
          data-workflow-path={webBuildWorkflowDocsDeepLink.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Web build workflow API docs deep-link</p>
              <h2>Где проверять Web build workflow YAML</h2>
            </div>
            <a
              className="primary-link"
              data-workflow-path={webBuildWorkflowDocsDeepLink.workflowPath}
              data-testid="web-build-workflow-docs-deep-link-anchor"
              href={webBuildWorkflowDocsDeepLink.docsHref}
            >
              Web build workflow YAML
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {webBuildWorkflowDocsDeepLink.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>{webBuildWorkflowDocsDeepLink.workflowPath}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-command={webBuildDocsRenderedRouteFailureCopy.command}
          data-docs-href={webBuildDocsRenderedRouteFailureCopy.docsHref}
          data-expected-command-count={webBuildDocsRenderedRouteFailureCopy.expectedCommandCount}
          data-expected-route-count={webBuildDocsRenderedRouteFailureCopy.expectedRouteCount}
          data-failing-command={webBuildDocsRenderedRouteFailureCopy.failingCommand}
          data-link-selector={webBuildDocsRenderedRouteFailureCopy.linkSelector}
          data-no-merge-copy={webBuildDocsRenderedRouteFailureCopy.noMergeCopy}
          data-owner-role={webBuildDocsRenderedRouteFailureCopy.ownerRole}
          data-repair-targets={webBuildDocsRenderedRouteFailureCopy.repairTargets}
          data-source-marker-selector={webBuildDocsRenderedRouteFailureCopy.sourceMarkerSelector}
          data-testid="web-build-docs-rendered-route-failure-copy"
          data-workflow-href={webBuildDocsRenderedRouteFailureCopy.workflowHref}
          data-workflow-name={webBuildDocsRenderedRouteFailureCopy.workflowName}
          data-workflow-path={webBuildDocsRenderedRouteFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Web build docs rendered-route failure copy</p>
              <h2>Что делать, если Web build docs пропали в rendered routes</h2>
            </div>
            <a className="primary-link" href={webBuildDocsRenderedRouteFailureCopy.workflowHref}>
              {webBuildDocsRenderedRouteFailureCopy.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {webBuildDocsRenderedRouteFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? webBuildDocsRenderedRouteFailureCopy.noMergeCopy
                    : webBuildDocsRenderedRouteFailureCopy.workflowPath}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-command={webBuildWorkflowDocsFailureCopy.command}
          data-docs-href={webBuildWorkflowDocsFailureCopy.docsHref}
          data-docs-marker-selector={webBuildWorkflowDocsFailureCopy.docsMarkerSelector}
          data-expected-command-count={webBuildWorkflowDocsFailureCopy.expectedCommandCount}
          data-expected-route-count={webBuildWorkflowDocsFailureCopy.expectedRouteCount}
          data-failing-command={webBuildWorkflowDocsFailureCopy.failingCommand}
          data-link-selector={webBuildWorkflowDocsFailureCopy.linkSelector}
          data-no-merge-copy={webBuildWorkflowDocsFailureCopy.noMergeCopy}
          data-owner-role={webBuildWorkflowDocsFailureCopy.ownerRole}
          data-repair-targets={webBuildWorkflowDocsFailureCopy.repairTargets}
          data-source-marker-selector={webBuildWorkflowDocsFailureCopy.sourceMarkerSelector}
          data-testid="web-build-workflow-docs-failure-copy"
          data-workflow-href={webBuildWorkflowDocsFailureCopy.workflowHref}
          data-workflow-name={webBuildWorkflowDocsFailureCopy.workflowName}
          data-workflow-path={webBuildWorkflowDocsFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Web build workflow docs failure copy</p>
              <h2>Что делать, если Web build workflow docs drift упал</h2>
            </div>
            <a className="primary-link" href={webBuildWorkflowDocsFailureCopy.workflowHref}>
              {webBuildWorkflowDocsFailureCopy.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {webBuildWorkflowDocsFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? webBuildWorkflowDocsFailureCopy.noMergeCopy
                    : webBuildWorkflowDocsFailureCopy.workflowPath}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-checked-workflow-path={webBuildLiveDocsWorkflowCopy.checkedWorkflowPath}
          data-command={webBuildLiveDocsWorkflowCopy.command}
          data-docs-href={webBuildLiveDocsWorkflowCopy.docsHref}
          data-docs-marker-selector={webBuildLiveDocsWorkflowCopy.docsMarkerSelector}
          data-expected-command-count={webBuildLiveDocsWorkflowCopy.expectedCommandCount}
          data-expected-route-count={webBuildLiveDocsWorkflowCopy.expectedRouteCount}
          data-failing-command={webBuildLiveDocsWorkflowCopy.failingCommand}
          data-link-selector={webBuildLiveDocsWorkflowCopy.linkSelector}
          data-no-merge-copy={webBuildLiveDocsWorkflowCopy.noMergeCopy}
          data-owner-role={webBuildLiveDocsWorkflowCopy.ownerRole}
          data-repair-targets={webBuildLiveDocsWorkflowCopy.repairTargets}
          data-source-marker-selector={webBuildLiveDocsWorkflowCopy.sourceMarkerSelector}
          data-testid="web-build-live-docs-workflow-copy"
          data-workflow-command={webBuildLiveDocsWorkflowCopy.workflowCommand}
          data-workflow-href={webBuildLiveDocsWorkflowCopy.workflowHref}
          data-workflow-name={webBuildLiveDocsWorkflowCopy.workflowName}
          data-workflow-path={webBuildLiveDocsWorkflowCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Web build live docs workflow copy</p>
              <h2>Что делать, если Web build live docs workflow drift упал</h2>
            </div>
            <a className="primary-link" href={webBuildLiveDocsWorkflowCopy.workflowHref}>
              {webBuildLiveDocsWorkflowCopy.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {webBuildLiveDocsWorkflowCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge" ? webBuildLiveDocsWorkflowCopy.noMergeCopy : webBuildLiveDocsWorkflowCopy.workflowCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-checked-workflow-path={webBuildReadmeLiveDocsWorkflowCopy.checkedWorkflowPath}
          data-command={webBuildReadmeLiveDocsWorkflowCopy.command}
          data-docs-href={webBuildReadmeLiveDocsWorkflowCopy.docsHref}
          data-docs-marker-selector={webBuildReadmeLiveDocsWorkflowCopy.docsMarkerSelector}
          data-expected-command-count={webBuildReadmeLiveDocsWorkflowCopy.expectedCommandCount}
          data-expected-route-count={webBuildReadmeLiveDocsWorkflowCopy.expectedRouteCount}
          data-failing-command={webBuildReadmeLiveDocsWorkflowCopy.failingCommand}
          data-link-selector={webBuildReadmeLiveDocsWorkflowCopy.linkSelector}
          data-no-merge-copy={webBuildReadmeLiveDocsWorkflowCopy.noMergeCopy}
          data-owner-role={webBuildReadmeLiveDocsWorkflowCopy.ownerRole}
          data-repair-targets={webBuildReadmeLiveDocsWorkflowCopy.repairTargets}
          data-source-marker-selector={webBuildReadmeLiveDocsWorkflowCopy.sourceMarkerSelector}
          data-testid="web-build-readme-live-docs-workflow-copy"
          data-workflow-command={webBuildReadmeLiveDocsWorkflowCopy.workflowCommand}
          data-workflow-href={webBuildReadmeLiveDocsWorkflowCopy.workflowHref}
          data-workflow-name={webBuildReadmeLiveDocsWorkflowCopy.workflowName}
          data-workflow-path={webBuildReadmeLiveDocsWorkflowCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Web build README live docs workflow copy</p>
              <h2>Что делать, если Web build README live docs workflow drift упал</h2>
            </div>
            <a className="primary-link" href={webBuildReadmeLiveDocsWorkflowCopy.workflowHref}>
              {webBuildReadmeLiveDocsWorkflowCopy.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {webBuildReadmeLiveDocsWorkflowCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? "No merge"
                    : title === "Owner"
                      ? "Frontend + CI + Docs"
                      : title === "Fix order"
                        ? "docs -> live guard"
                        : "Workflow YAML"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-checked-workflow-path={webBuildReadmeWorkflowFailureCopy.checkedWorkflowPath}
          data-command={webBuildReadmeWorkflowFailureCopy.command}
          data-docs-href={webBuildReadmeWorkflowFailureCopy.docsHref}
          data-docs-marker-selector={webBuildReadmeWorkflowFailureCopy.docsMarkerSelector}
          data-expected-command-count={webBuildReadmeWorkflowFailureCopy.expectedCommandCount}
          data-expected-route-count={webBuildReadmeWorkflowFailureCopy.expectedRouteCount}
          data-failing-command={webBuildReadmeWorkflowFailureCopy.failingCommand}
          data-link-selector={webBuildReadmeWorkflowFailureCopy.linkSelector}
          data-no-merge-copy={webBuildReadmeWorkflowFailureCopy.noMergeCopy}
          data-owner-role={webBuildReadmeWorkflowFailureCopy.ownerRole}
          data-readme-workflow-command={webBuildReadmeWorkflowFailureCopy.readmeWorkflowCommand}
          data-repair-targets={webBuildReadmeWorkflowFailureCopy.repairTargets}
          data-source-marker-selector={webBuildReadmeWorkflowFailureCopy.sourceMarkerSelector}
          data-testid="web-build-readme-workflow-failure-copy"
          data-workflow-command={webBuildReadmeWorkflowFailureCopy.workflowCommand}
          data-workflow-failure-command={webBuildReadmeWorkflowFailureCopy.workflowFailureCommand}
          data-workflow-href={webBuildReadmeWorkflowFailureCopy.workflowHref}
          data-workflow-name={webBuildReadmeWorkflowFailureCopy.workflowName}
          data-workflow-path={webBuildReadmeWorkflowFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Web build README workflow failure copy</p>
              <h2>Что делать, если Web build README workflow failure guard упал</h2>
            </div>
            <a className="primary-link" href={webBuildReadmeWorkflowFailureCopy.workflowHref}>
              {webBuildReadmeWorkflowFailureCopy.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {webBuildReadmeWorkflowFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? "No merge"
                    : title === "Owner"
                      ? "Frontend + CI + Docs"
                      : title === "Fix order"
                        ? "README -> failure"
                        : "README workflow"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-checked-workflow-path={webBuildReadmeRenderedRouteFailureCopy.checkedWorkflowPath}
          data-command={webBuildReadmeRenderedRouteFailureCopy.command}
          data-docs-href={webBuildReadmeRenderedRouteFailureCopy.docsHref}
          data-docs-marker-selector={webBuildReadmeRenderedRouteFailureCopy.docsMarkerSelector}
          data-expected-command-count={webBuildReadmeRenderedRouteFailureCopy.expectedCommandCount}
          data-expected-route-count={webBuildReadmeRenderedRouteFailureCopy.expectedRouteCount}
          data-failing-command={webBuildReadmeRenderedRouteFailureCopy.failingCommand}
          data-link-selector={webBuildReadmeRenderedRouteFailureCopy.linkSelector}
          data-no-merge-copy={webBuildReadmeRenderedRouteFailureCopy.noMergeCopy}
          data-owner-role={webBuildReadmeRenderedRouteFailureCopy.ownerRole}
          data-repair-targets={webBuildReadmeRenderedRouteFailureCopy.repairTargets}
          data-source-marker-selector={webBuildReadmeRenderedRouteFailureCopy.sourceMarkerSelector}
          data-testid="web-build-readme-rendered-route-failure-copy"
          data-workflow-command={webBuildReadmeRenderedRouteFailureCopy.workflowCommand}
          data-workflow-failure-command={webBuildReadmeRenderedRouteFailureCopy.workflowFailureCommand}
          data-workflow-href={webBuildReadmeRenderedRouteFailureCopy.workflowHref}
          data-workflow-name={webBuildReadmeRenderedRouteFailureCopy.workflowName}
          data-workflow-path={webBuildReadmeRenderedRouteFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Web build README rendered-route failure copy</p>
              <h2>Что делать, если Web build README rendered-route guard упал</h2>
            </div>
            <a className="primary-link" href={webBuildReadmeRenderedRouteFailureCopy.workflowHref}>
              {webBuildReadmeRenderedRouteFailureCopy.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {webBuildReadmeRenderedRouteFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? "No merge"
                    : title === "Owner"
                      ? "Frontend + CI + QA"
                      : title === "Fix order"
                        ? "README -> route smoke"
                        : "Rendered route"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-checked-workflow-path={webBuildReadmeWorkflowDocsFailureCopy.checkedWorkflowPath}
          data-command={webBuildReadmeWorkflowDocsFailureCopy.command}
          data-docs-href={webBuildReadmeWorkflowDocsFailureCopy.docsHref}
          data-docs-marker-selector={webBuildReadmeWorkflowDocsFailureCopy.docsMarkerSelector}
          data-expected-command-count={webBuildReadmeWorkflowDocsFailureCopy.expectedCommandCount}
          data-expected-route-count={webBuildReadmeWorkflowDocsFailureCopy.expectedRouteCount}
          data-failing-command={webBuildReadmeWorkflowDocsFailureCopy.failingCommand}
          data-link-selector={webBuildReadmeWorkflowDocsFailureCopy.linkSelector}
          data-no-merge-copy={webBuildReadmeWorkflowDocsFailureCopy.noMergeCopy}
          data-owner-role={webBuildReadmeWorkflowDocsFailureCopy.ownerRole}
          data-repair-targets={webBuildReadmeWorkflowDocsFailureCopy.repairTargets}
          data-source-marker-selector={webBuildReadmeWorkflowDocsFailureCopy.sourceMarkerSelector}
          data-testid="web-build-readme-workflow-docs-failure-copy"
          data-workflow-command={webBuildReadmeWorkflowDocsFailureCopy.workflowCommand}
          data-workflow-docs-command={webBuildReadmeWorkflowDocsFailureCopy.workflowDocsCommand}
          data-workflow-docs-failure-command={webBuildReadmeWorkflowDocsFailureCopy.workflowDocsFailureCommand}
          data-workflow-failure-command={webBuildReadmeWorkflowDocsFailureCopy.workflowFailureCommand}
          data-workflow-href={webBuildReadmeWorkflowDocsFailureCopy.workflowHref}
          data-workflow-name={webBuildReadmeWorkflowDocsFailureCopy.workflowName}
          data-workflow-path={webBuildReadmeWorkflowDocsFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Web build README workflow docs failure copy</p>
              <h2>Что делать, если Web build README workflow docs guard упал</h2>
            </div>
            <a className="primary-link" href={webBuildReadmeWorkflowDocsFailureCopy.workflowHref}>
              {webBuildReadmeWorkflowDocsFailureCopy.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {webBuildReadmeWorkflowDocsFailureCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? "No merge"
                    : title === "Owner"
                      ? "Frontend + CI + Docs"
                      : title === "Fix order"
                        ? "README -> workflow docs"
                        : "Workflow docs"}
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
