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
  [
    "1",
    "Подготовить PR #17 release action items post-merge decision record copy",
    "описать post-merge decision record без записи record",
  ],
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

const sharedValidationReadmeWorkflowDocsRenderedRouteCopy = {
  checkedWorkflowPath: sharedValidationReadmeWorkflowDocsFailureCopy.checkedWorkflowPath,
  command: sharedValidationReadmeWorkflowDocsFailureCopy.command,
  docsHref: sharedValidationReadmeWorkflowDocsFailureCopy.docsHref,
  docsMarkerSelector: sharedValidationReadmeWorkflowDocsFailureCopy.docsMarkerSelector,
  expectedCheckCount: sharedValidationReadmeWorkflowDocsFailureCopy.expectedCheckCount,
  expectedRouteCount: sharedValidationReadmeWorkflowDocsFailureCopy.expectedRouteCount,
  failingCommand: sharedValidationReadmeRenderedRouteFailureCopy.command,
  linkSelector: sharedValidationReadmeWorkflowDocsFailureCopy.linkSelector,
  noMergeCopy:
    "Не мержить, пока rendered routes smoke снова подтверждает shared validation README workflow docs guard на живом `/plan`",
  ownerRole: "Schema owner + CI owner + Docs owner + QA owner",
  readmePath: sharedValidationReadmeWorkflowDocsFailureCopy.readmePath,
  repairTargets:
    "/plan,packages/shared/README.md#shared-schema-index,.github/workflows/shared-validation.yml,apps/web/scripts/smoke.mjs,[data-testid='shared-validation-readme-workflow-docs-failure-copy']",
  sourceMarkerSelector: "[data-testid='shared-validation-readme-workflow-docs-failure-copy']",
  workflowCommand: sharedValidationReadmeWorkflowDocsFailureCopy.workflowCommand,
  workflowDocsCommand: sharedValidationReadmeWorkflowDocsFailureCopy.workflowDocsCommand,
  workflowDocsFailureCommand: sharedValidationReadmeWorkflowDocsFailureCopy.workflowDocsFailureCommand,
  workflowFailureCommand: sharedValidationReadmeWorkflowDocsFailureCopy.workflowFailureCommand,
  workflowHref: sharedValidationReadmeWorkflowDocsFailureCopy.workflowHref,
  workflowName: sharedValidationReadmeWorkflowDocsFailureCopy.workflowName,
  workflowPath: sharedValidationReadmeWorkflowDocsFailureCopy.workflowPath,
  checks: [
    ["Symptom", "README workflow docs guard есть, но rendered routes smoke больше не видит shared workflow docs safety copy"],
    ["Fix order", "сначала восстановить shared-validation-readme-workflow-docs-failure-copy, затем route smoke expectations"],
    ["Owner", "Schema owner подтверждает README guard, CI owner подтверждает shared workflow, QA owner подтверждает `/plan`"],
    ["No merge", "не мержить, пока shared validation README workflow docs rendered-route guard снова не проходит route coverage"],
  ],
};

const sharedValidationReadmeWorkflowDocsBrowserLoopCopy = {
  browserLoopSelector: "[data-testid='shared-validation-readme-workflow-docs-rendered-route-copy']",
  browserUrl: "/plan",
  command: sharedValidationReadmeWorkflowDocsRenderedRouteCopy.command,
  consoleLevels: "error,warn",
  docsHref: sharedValidationReadmeWorkflowDocsRenderedRouteCopy.docsHref,
  expectedCheckCount: sharedValidationReadmeWorkflowDocsRenderedRouteCopy.expectedCheckCount,
  expectedRouteCount: sharedValidationReadmeWorkflowDocsRenderedRouteCopy.expectedRouteCount,
  linkSelector: sharedValidationReadmeWorkflowDocsRenderedRouteCopy.linkSelector,
  noMergeCopy:
    "Не мержить, пока Browser QA снова подтверждает shared validation README workflow docs rendered-route guard на живом `/plan`",
  ownerRole: "Schema owner + CI owner + QA owner",
  repairTargets:
    "/plan,apps/web/scripts/smoke.mjs,[data-testid='shared-validation-readme-workflow-docs-rendered-route-copy'],Browser DOM QA",
  screenshotRequired: "true",
  sourceMarkerSelector: "[data-testid='shared-validation-readme-workflow-docs-rendered-route-copy']",
  workflowHref: sharedValidationReadmeWorkflowDocsRenderedRouteCopy.workflowHref,
  workflowName: sharedValidationReadmeWorkflowDocsRenderedRouteCopy.workflowName,
  workflowPath: sharedValidationReadmeWorkflowDocsRenderedRouteCopy.workflowPath,
  checks: [
    ["Page identity", "Browser открывает `/plan` и видит ASTS app.site.ru без framework overlay"],
    ["DOM", "Browser DOM находит shared-validation-readme-workflow-docs-rendered-route-copy ровно один раз"],
    ["Workflow link", "scoped link ведет в Shared validation GitHub Actions workflow"],
    ["Console", "Browser console не содержит error/warn перед merge"],
  ],
};

const sharedValidationReadmeWorkflowDocsPrCheckCopy = {
  route: sharedValidationReadmeWorkflowDocsBrowserLoopCopy.browserUrl,
  checkedWorkflowPath: sharedValidationReadmeWorkflowDocsRenderedRouteCopy.checkedWorkflowPath,
  branch: "codex/app-site-shell",
  baseBranch: "main",
  command: "gh pr checks 17 --watch --interval 10",
  docsHref: sharedValidationReadmeWorkflowDocsBrowserLoopCopy.docsHref,
  expectedCheckCount: sharedValidationReadmeWorkflowDocsBrowserLoopCopy.expectedCheckCount,
  expectedCheckGroups: ["Web build", "API smoke", "Shared validation"],
  expectedConclusion: "SUCCESS",
  expectedMergeState: "CLEAN",
  expectedPrNumber: "17",
  expectedRouteCount: sharedValidationReadmeWorkflowDocsBrowserLoopCopy.expectedRouteCount,
  linkSelector: "[data-testid='shared-validation-readme-workflow-docs-pr-anchor']",
  noMergeCopy:
    "Не мержить, пока PR #17 снова показывает CLEAN и зеленые Web build, API smoke и Shared validation checks для shared validation README workflow docs guard",
  ownerRole: "Schema owner + CI owner + Docs owner + Release owner",
  prHref: "https://github.com/info14fourteen-creator/ASTS/pull/17",
  readmePath: sharedValidationReadmeWorkflowDocsRenderedRouteCopy.readmePath,
  repairTargets:
    "PR #17,gh pr checks 17,.github/workflows/shared-validation.yml,apps/web/scripts/smoke.mjs,/plan",
  sourceMarkerSelector: "[data-testid='shared-validation-readme-workflow-docs-browser-loop-copy']",
  status: "armed",
  workflowHref: sharedValidationReadmeWorkflowDocsBrowserLoopCopy.workflowHref,
  workflowName: sharedValidationReadmeWorkflowDocsBrowserLoopCopy.workflowName,
  workflowPath: sharedValidationReadmeWorkflowDocsBrowserLoopCopy.workflowPath,
  checks: [
    ["PR", "PR #17 остается на codex/app-site-shell -> main и mergeStateStatus CLEAN"],
    ["Checks", "gh pr checks 17 подтверждает Web build, API smoke и Shared validation SUCCESS"],
    ["Route guard", "route smoke продолжает видеть shared validation README workflow docs browser-loop copy"],
    ["No merge", "не мержить, пока PR-check guard снова не подтверждает clean rollup"],
  ],
};

const sharedValidationReadmeWorkflowDocsMergeStateCopy = {
  route: sharedValidationReadmeWorkflowDocsPrCheckCopy.route,
  checkedWorkflowPath: sharedValidationReadmeWorkflowDocsPrCheckCopy.checkedWorkflowPath,
  branch: sharedValidationReadmeWorkflowDocsPrCheckCopy.branch,
  baseBranch: sharedValidationReadmeWorkflowDocsPrCheckCopy.baseBranch,
  command: "gh pr view 17 --json headRefName,baseRefName,mergeStateStatus,statusCheckRollup",
  docsHref: sharedValidationReadmeWorkflowDocsPrCheckCopy.docsHref,
  expectedCheckCount: sharedValidationReadmeWorkflowDocsPrCheckCopy.expectedCheckCount,
  expectedCheckGroups: sharedValidationReadmeWorkflowDocsPrCheckCopy.expectedCheckGroups,
  expectedConclusion: sharedValidationReadmeWorkflowDocsPrCheckCopy.expectedConclusion,
  expectedMergeState: sharedValidationReadmeWorkflowDocsPrCheckCopy.expectedMergeState,
  expectedPrNumber: sharedValidationReadmeWorkflowDocsPrCheckCopy.expectedPrNumber,
  expectedRouteCount: sharedValidationReadmeWorkflowDocsPrCheckCopy.expectedRouteCount,
  linkSelector: "[data-testid='shared-validation-readme-workflow-docs-merge-anchor']",
  noMergeCopy:
    "Не мержить, пока PR #17 снова показывает mergeStateStatus CLEAN для shared validation README workflow docs guard",
  ownerRole: "Schema owner + CI owner + Release owner",
  prHref: sharedValidationReadmeWorkflowDocsPrCheckCopy.prHref,
  readmePath: sharedValidationReadmeWorkflowDocsPrCheckCopy.readmePath,
  repairTargets:
    "PR #17,gh pr view 17 --json mergeStateStatus,statusCheckRollup,apps/web/scripts/smoke.mjs,/plan",
  sourceMarkerSelector: "[data-testid='shared-validation-readme-workflow-docs-pr-check-copy']",
  status: sharedValidationReadmeWorkflowDocsPrCheckCopy.status,
  workflowHref: sharedValidationReadmeWorkflowDocsPrCheckCopy.workflowHref,
  workflowName: sharedValidationReadmeWorkflowDocsPrCheckCopy.workflowName,
  workflowPath: sharedValidationReadmeWorkflowDocsPrCheckCopy.workflowPath,
  checks: [
    ["Merge state", "PR #17 mergeStateStatus остается CLEAN перед merge"],
    ["Branch", "headRefName codex/app-site-shell и baseRefName main не меняются"],
    ["Checks", "statusCheckRollup остается SUCCESS для Web build, API smoke и Shared validation"],
    ["No merge", "не мержить, пока merge-state guard снова не подтверждает clean PR rollup"],
  ],
};

const sharedValidationReadmeWorkflowDocsReleaseNoteCopy = {
  route: sharedValidationReadmeWorkflowDocsMergeStateCopy.route,
  checkedWorkflowPath: sharedValidationReadmeWorkflowDocsMergeStateCopy.checkedWorkflowPath,
  branch: sharedValidationReadmeWorkflowDocsMergeStateCopy.branch,
  baseBranch: sharedValidationReadmeWorkflowDocsMergeStateCopy.baseBranch,
  command: "gh pr view 17 --json url,headRefName,baseRefName,mergeStateStatus,statusCheckRollup",
  docsHref: sharedValidationReadmeWorkflowDocsMergeStateCopy.docsHref,
  expectedCheckCount: sharedValidationReadmeWorkflowDocsMergeStateCopy.expectedCheckCount,
  expectedCheckGroups: sharedValidationReadmeWorkflowDocsMergeStateCopy.expectedCheckGroups,
  expectedConclusion: sharedValidationReadmeWorkflowDocsMergeStateCopy.expectedConclusion,
  expectedMergeState: sharedValidationReadmeWorkflowDocsMergeStateCopy.expectedMergeState,
  expectedPrNumber: sharedValidationReadmeWorkflowDocsMergeStateCopy.expectedPrNumber,
  expectedRouteCount: sharedValidationReadmeWorkflowDocsMergeStateCopy.expectedRouteCount,
  linkSelector: "[data-testid='shared-validation-readme-workflow-docs-release-anchor']",
  noMergeCopy:
    "Не выпускать release notes, пока PR #17 снова показывает CLEAN и зеленый statusCheckRollup для shared validation README workflow docs guard",
  ownerRole: "Schema owner + CI owner + Release owner",
  prHref: sharedValidationReadmeWorkflowDocsMergeStateCopy.prHref,
  readmePath: sharedValidationReadmeWorkflowDocsMergeStateCopy.readmePath,
  releaseNote:
    "Shared validation README workflow docs guard covered by browser-loop, PR-check and merge-state copy on `/plan`.",
  releaseScope: "shared validation README workflow docs",
  repairTargets:
    "PR #17,release notes,apps/web/scripts/smoke.mjs,/plan,[data-testid='shared-validation-readme-workflow-docs-merge-state-copy']",
  sourceMarkerSelector: "[data-testid='shared-validation-readme-workflow-docs-merge-state-copy']",
  status: sharedValidationReadmeWorkflowDocsMergeStateCopy.status,
  workflowHref: sharedValidationReadmeWorkflowDocsMergeStateCopy.workflowHref,
  workflowName: sharedValidationReadmeWorkflowDocsMergeStateCopy.workflowName,
  workflowPath: sharedValidationReadmeWorkflowDocsMergeStateCopy.workflowPath,
  checks: [
    ["Release note", "release notes явно упоминают shared validation README workflow docs guard"],
    ["Evidence", "handoff ссылается на PR #17, CLEAN mergeStateStatus и зеленый statusCheckRollup"],
    ["Scope", "handoff оставляет `/plan`, packages/shared README и Shared validation workflow в одном контексте"],
    ["No merge", "не выпускать release notes, пока release-note guard снова не подтверждает clean PR evidence"],
  ],
};

const sharedValidationReadmeWorkflowDocsFinalQaCopy = {
  route: sharedValidationReadmeWorkflowDocsReleaseNoteCopy.route,
  checkedWorkflowPath: sharedValidationReadmeWorkflowDocsReleaseNoteCopy.checkedWorkflowPath,
  branch: sharedValidationReadmeWorkflowDocsReleaseNoteCopy.branch,
  baseBranch: sharedValidationReadmeWorkflowDocsReleaseNoteCopy.baseBranch,
  command:
    "npm run build && npm run smoke -- --url http://127.0.0.1:4177/ && gh pr view 17 --json mergeStateStatus,statusCheckRollup",
  docsHref: sharedValidationReadmeWorkflowDocsReleaseNoteCopy.docsHref,
  expectedCheckCount: sharedValidationReadmeWorkflowDocsReleaseNoteCopy.expectedCheckCount,
  expectedCheckGroups: sharedValidationReadmeWorkflowDocsReleaseNoteCopy.expectedCheckGroups,
  expectedConclusion: sharedValidationReadmeWorkflowDocsReleaseNoteCopy.expectedConclusion,
  expectedMergeState: sharedValidationReadmeWorkflowDocsReleaseNoteCopy.expectedMergeState,
  expectedPrNumber: sharedValidationReadmeWorkflowDocsReleaseNoteCopy.expectedPrNumber,
  expectedRouteCount: sharedValidationReadmeWorkflowDocsReleaseNoteCopy.expectedRouteCount,
  finalQaScope: "shared validation README workflow docs",
  linkSelector: "[data-testid='shared-validation-readme-workflow-docs-final-qa-anchor']",
  noMergeCopy:
    "Не закрывать shared validation README workflow docs handoff, пока final QA снова не подтверждает build, smoke, Browser DOM и CLEAN PR evidence",
  ownerRole: "Schema owner + CI owner + QA owner + Release owner",
  prHref: sharedValidationReadmeWorkflowDocsReleaseNoteCopy.prHref,
  readmePath: sharedValidationReadmeWorkflowDocsReleaseNoteCopy.readmePath,
  releaseNote: sharedValidationReadmeWorkflowDocsReleaseNoteCopy.releaseNote,
  releaseScope: sharedValidationReadmeWorkflowDocsReleaseNoteCopy.releaseScope,
  repairTargets:
    "PR #17,apps/web/scripts/smoke.mjs,/plan,Browser DOM QA,[data-testid='shared-validation-readme-workflow-docs-release-note-copy']",
  sourceMarkerSelector: "[data-testid='shared-validation-readme-workflow-docs-release-note-copy']",
  status: sharedValidationReadmeWorkflowDocsReleaseNoteCopy.status,
  workflowHref: sharedValidationReadmeWorkflowDocsReleaseNoteCopy.workflowHref,
  workflowName: sharedValidationReadmeWorkflowDocsReleaseNoteCopy.workflowName,
  workflowPath: sharedValidationReadmeWorkflowDocsReleaseNoteCopy.workflowPath,
  checks: [
    ["Build", "production build проходит перед финальным handoff"],
    ["Smoke", "route smoke видит shared validation README workflow docs release-note guard"],
    ["Browser QA", "Browser DOM находит final QA и release-note guard без framework overlay и console errors"],
    ["PR", "PR #17 остается CLEAN с зеленым statusCheckRollup перед закрытием handoff"],
  ],
};

const sharedValidationReadmeWorkflowDocsOwnerHandoffCopy = {
  route: sharedValidationReadmeWorkflowDocsFinalQaCopy.route,
  checkedWorkflowPath: sharedValidationReadmeWorkflowDocsFinalQaCopy.checkedWorkflowPath,
  branch: sharedValidationReadmeWorkflowDocsFinalQaCopy.branch,
  baseBranch: sharedValidationReadmeWorkflowDocsFinalQaCopy.baseBranch,
  command: sharedValidationReadmeWorkflowDocsFinalQaCopy.command,
  docsHref: sharedValidationReadmeWorkflowDocsFinalQaCopy.docsHref,
  expectedCheckCount: sharedValidationReadmeWorkflowDocsFinalQaCopy.expectedCheckCount,
  expectedCheckGroups: sharedValidationReadmeWorkflowDocsFinalQaCopy.expectedCheckGroups,
  expectedConclusion: sharedValidationReadmeWorkflowDocsFinalQaCopy.expectedConclusion,
  expectedMergeState: sharedValidationReadmeWorkflowDocsFinalQaCopy.expectedMergeState,
  expectedPrNumber: sharedValidationReadmeWorkflowDocsFinalQaCopy.expectedPrNumber,
  expectedRouteCount: sharedValidationReadmeWorkflowDocsFinalQaCopy.expectedRouteCount,
  finalQaScope: sharedValidationReadmeWorkflowDocsFinalQaCopy.finalQaScope,
  handoffOwners: ["Schema owner", "CI owner", "QA owner", "Release owner"],
  handoffScope: "shared validation README workflow docs owner handoff",
  linkSelector: "[data-testid='shared-validation-readme-workflow-docs-owner-handoff-anchor']",
  noMergeCopy:
    "Не закрывать shared validation README workflow docs owner handoff, пока Schema, CI, QA и Release owners не приняли final QA evidence",
  ownerRole: sharedValidationReadmeWorkflowDocsFinalQaCopy.ownerRole,
  prHref: sharedValidationReadmeWorkflowDocsFinalQaCopy.prHref,
  readmePath: sharedValidationReadmeWorkflowDocsFinalQaCopy.readmePath,
  releaseNote: sharedValidationReadmeWorkflowDocsFinalQaCopy.releaseNote,
  releaseScope: sharedValidationReadmeWorkflowDocsFinalQaCopy.releaseScope,
  repairTargets:
    "PR #17,owner handoff,apps/web/scripts/smoke.mjs,/plan,[data-testid='shared-validation-readme-workflow-docs-final-qa-copy']",
  sourceMarkerSelector: "[data-testid='shared-validation-readme-workflow-docs-final-qa-copy']",
  status: sharedValidationReadmeWorkflowDocsFinalQaCopy.status,
  workflowHref: sharedValidationReadmeWorkflowDocsFinalQaCopy.workflowHref,
  workflowName: sharedValidationReadmeWorkflowDocsFinalQaCopy.workflowName,
  workflowPath: sharedValidationReadmeWorkflowDocsFinalQaCopy.workflowPath,
  checks: [
    ["Schema", "Schema owner принимает schema index, fixtures и 14 check count"],
    ["CI", "CI owner принимает Shared validation workflow и expected check groups"],
    ["QA", "QA owner принимает build, route smoke и Browser DOM QA evidence"],
    ["Release", "Release owner принимает PR #17 CLEAN и release note text"],
  ],
};

const sharedValidationReadmeWorkflowDocsReleaseChecklistCopy = {
  route: sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.route,
  checkedWorkflowPath: sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.checkedWorkflowPath,
  branch: sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.branch,
  baseBranch: sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.baseBranch,
  command: sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.command,
  checklistOwners: sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.handoffOwners,
  checklistScope: "shared validation README workflow docs release checklist",
  docsHref: sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.docsHref,
  expectedCheckCount: sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.expectedCheckCount,
  expectedCheckGroups: sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.expectedCheckGroups,
  expectedConclusion: sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.expectedConclusion,
  expectedMergeState: sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.expectedMergeState,
  expectedPrNumber: sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.expectedPrNumber,
  expectedRouteCount: sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.expectedRouteCount,
  finalQaScope: sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.finalQaScope,
  handoffScope: sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.handoffScope,
  linkSelector: "[data-testid='shared-validation-readme-workflow-docs-release-checklist-anchor']",
  noMergeCopy:
    "Не выпускать shared validation README workflow docs release, пока Schema, CI, QA и Release owners не приняли checklist evidence",
  ownerRole: sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.ownerRole,
  prHref: sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.prHref,
  readmePath: sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.readmePath,
  releaseNote: sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.releaseNote,
  releaseScope: sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.releaseScope,
  repairTargets:
    "PR #17,release checklist,apps/web/scripts/smoke.mjs,/plan,[data-testid='shared-validation-readme-workflow-docs-owner-handoff-copy']",
  sourceMarkerSelector: "[data-testid='shared-validation-readme-workflow-docs-owner-handoff-copy']",
  status: sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.status,
  workflowHref: sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.workflowHref,
  workflowName: sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.workflowName,
  workflowPath: sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.workflowPath,
  checks: [
    ["Schema", "Schema owner отмечает schema index, fixtures и 14 check count"],
    ["CI", "CI owner отмечает Shared validation workflow, expected check groups и smoke coverage"],
    ["QA", "QA owner отмечает build, route smoke и Browser DOM QA evidence"],
    ["Release", "Release owner отмечает PR #17 CLEAN, release note и owner handoff acceptance"],
  ],
};

const sharedValidationReadmeWorkflowDocsReleaseApprovalCopy = {
  route: sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.route,
  checkedWorkflowPath: sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.checkedWorkflowPath,
  branch: sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.branch,
  baseBranch: sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.baseBranch,
  command: sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.command,
  approvalOwners: sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.checklistOwners,
  approvalScope: "shared validation README workflow docs release approval",
  checklistScope: sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.checklistScope,
  docsHref: sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.docsHref,
  expectedCheckCount: sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.expectedCheckCount,
  expectedCheckGroups: sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.expectedCheckGroups,
  expectedConclusion: sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.expectedConclusion,
  expectedMergeState: sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.expectedMergeState,
  expectedPrNumber: sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.expectedPrNumber,
  expectedRouteCount: sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.expectedRouteCount,
  finalQaScope: sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.finalQaScope,
  handoffScope: sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.handoffScope,
  linkSelector: "[data-testid='shared-validation-readme-workflow-docs-release-approval-anchor']",
  noMergeCopy:
    "Не утверждать shared validation README workflow docs release, пока Schema, CI, QA и Release owners не приняли approval evidence",
  ownerRole: sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.ownerRole,
  prHref: sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.prHref,
  readmePath: sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.readmePath,
  releaseNote: sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.releaseNote,
  releaseScope: sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.releaseScope,
  repairTargets:
    "PR #17,release approval,apps/web/scripts/smoke.mjs,/plan,[data-testid='shared-validation-readme-workflow-docs-release-checklist-copy']",
  sourceMarkerSelector: "[data-testid='shared-validation-readme-workflow-docs-release-checklist-copy']",
  status: sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.status,
  workflowHref: sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.workflowHref,
  workflowName: sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.workflowName,
  workflowPath: sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.workflowPath,
  checks: [
    ["Schema", "Schema owner утверждает schema index, fixtures и 14 check count"],
    ["CI", "CI owner утверждает Shared validation workflow, expected check groups и smoke coverage"],
    ["QA", "QA owner утверждает build, route smoke и Browser DOM QA evidence"],
    ["Release", "Release owner утверждает PR #17 CLEAN, release note и checklist acceptance"],
  ],
};

const sharedValidationReadmeWorkflowDocsReleaseSignoffCopy = {
  route: sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.route,
  checkedWorkflowPath: sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.checkedWorkflowPath,
  branch: sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.branch,
  baseBranch: sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.baseBranch,
  command: sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.command,
  approvalScope: sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.approvalScope,
  docsHref: sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.docsHref,
  expectedCheckCount: sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.expectedCheckCount,
  expectedCheckGroups: sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.expectedCheckGroups,
  expectedConclusion: sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.expectedConclusion,
  expectedMergeState: sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.expectedMergeState,
  expectedPrNumber: sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.expectedPrNumber,
  expectedRouteCount: sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.expectedRouteCount,
  finalQaScope: sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.finalQaScope,
  handoffScope: sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.handoffScope,
  linkSelector: "[data-testid='shared-validation-readme-workflow-docs-release-signoff-anchor']",
  noMergeCopy:
    "Не подписывать shared validation README workflow docs release, пока Schema, CI, QA и Release owners не приняли signoff evidence",
  ownerRole: sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.ownerRole,
  prHref: sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.prHref,
  readmePath: sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.readmePath,
  releaseNote: sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.releaseNote,
  releaseScope: sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.releaseScope,
  repairTargets:
    "PR #17,release signoff,apps/web/scripts/smoke.mjs,/plan,[data-testid='shared-validation-readme-workflow-docs-release-approval-copy']",
  signoffOwners: sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.approvalOwners,
  signoffScope: "shared validation README workflow docs release signoff",
  sourceMarkerSelector: "[data-testid='shared-validation-readme-workflow-docs-release-approval-copy']",
  status: sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.status,
  workflowHref: sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.workflowHref,
  workflowName: sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.workflowName,
  workflowPath: sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.workflowPath,
  checks: [
    ["Schema", "Schema owner подписывает schema index, fixtures и 14 check count"],
    ["CI", "CI owner подписывает Shared validation workflow, expected check groups и smoke coverage"],
    ["QA", "QA owner подписывает build, route smoke и Browser DOM QA evidence"],
    ["Release", "Release owner подписывает PR #17 CLEAN, release note и approval acceptance"],
  ],
};

const sharedValidationReadmeWorkflowDocsArchiveCopy = {
  route: sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.route,
  checkedWorkflowPath: sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.checkedWorkflowPath,
  branch: sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.branch,
  baseBranch: sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.baseBranch,
  command: sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.command,
  approvalScope: sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.approvalScope,
  archiveOwners: sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.signoffOwners,
  archiveScope: "shared validation README workflow docs archive",
  docsHref: sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.docsHref,
  expectedCheckCount: sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.expectedCheckCount,
  expectedCheckGroups: sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.expectedCheckGroups,
  expectedConclusion: sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.expectedConclusion,
  expectedMergeState: sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.expectedMergeState,
  expectedPrNumber: sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.expectedPrNumber,
  expectedRouteCount: sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.expectedRouteCount,
  finalQaScope: sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.finalQaScope,
  handoffScope: sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.handoffScope,
  linkSelector: "[data-testid='shared-validation-readme-workflow-docs-archive-anchor']",
  noMergeCopy:
    "Не архивировать shared validation README workflow docs release, пока archive evidence не связывает signoff, release note, CLEAN PR и smoke coverage",
  ownerRole: sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.ownerRole,
  prHref: sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.prHref,
  readmePath: sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.readmePath,
  releaseNote: sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.releaseNote,
  releaseScope: sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.releaseScope,
  repairTargets:
    "PR #17,release archive,apps/web/scripts/smoke.mjs,/plan,[data-testid='shared-validation-readme-workflow-docs-release-signoff-copy']",
  signoffOwners: sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.signoffOwners,
  signoffScope: sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.signoffScope,
  sourceMarkerSelector: "[data-testid='shared-validation-readme-workflow-docs-release-signoff-copy']",
  status: sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.status,
  workflowHref: sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.workflowHref,
  workflowName: sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.workflowName,
  workflowPath: sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.workflowPath,
  checks: [
    ["Schema", "Schema owner архивирует schema index, fixtures и signoff evidence"],
    ["CI", "CI owner архивирует Shared validation workflow, expected check groups и smoke coverage"],
    ["QA", "QA owner архивирует build, route smoke и Browser DOM QA evidence"],
    ["Release", "Release owner архивирует PR #17 CLEAN, release note и signoff acceptance"],
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

const webBuildReadmeWorkflowDocsRenderedRouteCopy = {
  checkedWorkflowPath: webBuildReadmeWorkflowDocsFailureCopy.checkedWorkflowPath,
  command: webBuildReadmeWorkflowDocsFailureCopy.command,
  docsHref: webBuildReadmeWorkflowDocsFailureCopy.docsHref,
  docsMarkerSelector: webBuildReadmeWorkflowDocsFailureCopy.docsMarkerSelector,
  expectedCommandCount: webBuildReadmeWorkflowDocsFailureCopy.expectedCommandCount,
  expectedRouteCount: webBuildReadmeWorkflowDocsFailureCopy.expectedRouteCount,
  failingCommand: webBuildReadmeWorkflowDocsFailureCopy.command,
  linkSelector: webBuildReadmeWorkflowDocsFailureCopy.linkSelector,
  noMergeCopy:
    "Не мержить, пока rendered routes smoke снова подтверждает Web build README workflow docs guard на живом `/plan`",
  ownerRole: "Frontend owner + CI owner + Docs owner + QA owner",
  repairTargets:
    "/plan,.github/workflows/web-build.yml,apps/web/scripts/smoke.mjs,[data-testid='web-build-readme-workflow-docs-failure-copy']",
  sourceMarkerSelector: "[data-testid='web-build-readme-workflow-docs-failure-copy']",
  workflowCommand: webBuildReadmeWorkflowDocsFailureCopy.workflowCommand,
  workflowDocsCommand: webBuildReadmeWorkflowDocsFailureCopy.workflowDocsCommand,
  workflowDocsFailureCommand: webBuildReadmeWorkflowDocsFailureCopy.workflowDocsFailureCommand,
  workflowFailureCommand: webBuildReadmeWorkflowDocsFailureCopy.workflowFailureCommand,
  workflowHref: webBuildReadmeWorkflowDocsFailureCopy.workflowHref,
  workflowName: webBuildReadmeWorkflowDocsFailureCopy.workflowName,
  workflowPath: webBuildReadmeWorkflowDocsFailureCopy.workflowPath,
  checks: [
    ["Symptom", "README workflow docs guard есть, но rendered routes smoke больше не видит Web build workflow docs safety copy"],
    ["Fix order", "сначала восстановить web-build-readme-workflow-docs-failure-copy, затем route smoke expectations"],
    ["Owner", "Frontend owner подтверждает README guard, CI owner подтверждает Web build YAML, QA owner подтверждает `/plan`"],
    ["No merge", "не мержить, пока Web build README workflow docs rendered-route guard снова не проходит route coverage"],
  ],
};

const webBuildReadmeWorkflowDocsBrowserLoopCopy = {
  browserLoopSelector: "[data-testid='web-build-readme-workflow-docs-rendered-route-copy']",
  browserUrl: "/plan",
  command: webBuildReadmeWorkflowDocsRenderedRouteCopy.command,
  consoleLevels: "error,warn",
  docsHref: webBuildReadmeWorkflowDocsRenderedRouteCopy.docsHref,
  expectedCommandCount: webBuildReadmeWorkflowDocsRenderedRouteCopy.expectedCommandCount,
  expectedRouteCount: webBuildReadmeWorkflowDocsRenderedRouteCopy.expectedRouteCount,
  linkSelector: webBuildReadmeWorkflowDocsRenderedRouteCopy.linkSelector,
  noMergeCopy:
    "Не мержить, пока Browser QA снова подтверждает Web build README workflow docs rendered-route guard на живом `/plan`",
  ownerRole: "Frontend owner + CI owner + QA owner",
  repairTargets:
    "/plan,apps/web/scripts/smoke.mjs,[data-testid='web-build-readme-workflow-docs-rendered-route-copy'],Browser DOM QA",
  screenshotRequired: "true",
  sourceMarkerSelector: "[data-testid='web-build-readme-workflow-docs-rendered-route-copy']",
  workflowHref: webBuildReadmeWorkflowDocsRenderedRouteCopy.workflowHref,
  workflowName: webBuildReadmeWorkflowDocsRenderedRouteCopy.workflowName,
  workflowPath: webBuildReadmeWorkflowDocsRenderedRouteCopy.workflowPath,
  checks: [
    ["Page identity", "Browser открывает `/plan` и видит ASTS app.site.ru без framework overlay"],
    ["DOM", "Browser DOM находит web-build-readme-workflow-docs-rendered-route-copy ровно один раз"],
    ["Workflow link", "scoped link ведет в Web build GitHub Actions workflow"],
    ["Console", "Browser console не содержит error/warn перед merge"],
  ],
};

const webBuildReadmeWorkflowDocsPrCheckCopy = {
  route: webBuildReadmeWorkflowDocsBrowserLoopCopy.browserUrl,
  checkedWorkflowPath: webBuildReadmeWorkflowDocsRenderedRouteCopy.checkedWorkflowPath,
  branch: "codex/app-site-shell",
  baseBranch: "main",
  command: "gh pr checks 17 --watch --interval 10",
  docsHref: webBuildReadmeWorkflowDocsBrowserLoopCopy.docsHref,
  expectedCommandCount: webBuildReadmeWorkflowDocsBrowserLoopCopy.expectedCommandCount,
  expectedCheckGroups: ["Web build", "API smoke", "Shared validation"],
  expectedConclusion: "SUCCESS",
  expectedMergeState: "CLEAN",
  expectedPrNumber: "17",
  expectedRouteCount: webBuildReadmeWorkflowDocsBrowserLoopCopy.expectedRouteCount,
  linkSelector: "[data-testid='web-build-readme-workflow-docs-pr-anchor']",
  noMergeCopy:
    "Не мержить, пока PR #17 снова показывает CLEAN и зеленые Web build, API smoke и Shared validation checks для Web build README workflow docs guard",
  ownerRole: "Frontend owner + CI owner + Docs owner + Release owner",
  prHref: "https://github.com/info14fourteen-creator/ASTS/pull/17",
  repairTargets:
    "PR #17,gh pr checks 17,.github/workflows/web-build.yml,apps/web/scripts/smoke.mjs,/plan",
  sourceMarkerSelector: "[data-testid='web-build-readme-workflow-docs-browser-loop-copy']",
  status: "armed",
  workflowHref: webBuildReadmeWorkflowDocsBrowserLoopCopy.workflowHref,
  workflowName: webBuildReadmeWorkflowDocsBrowserLoopCopy.workflowName,
  workflowPath: webBuildReadmeWorkflowDocsBrowserLoopCopy.workflowPath,
  checks: [
    ["PR", "PR #17 остается на codex/app-site-shell -> main и mergeStateStatus CLEAN"],
    ["Checks", "gh pr checks 17 подтверждает Web build, API smoke и Shared validation SUCCESS"],
    ["Route guard", "route smoke продолжает видеть Web build README workflow docs browser-loop copy"],
    ["No merge", "не мержить, пока PR-check guard снова не подтверждает clean rollup"],
  ],
};

const webBuildReadmeWorkflowDocsMergeStateCopy = {
  route: webBuildReadmeWorkflowDocsPrCheckCopy.route,
  checkedWorkflowPath: webBuildReadmeWorkflowDocsPrCheckCopy.checkedWorkflowPath,
  branch: webBuildReadmeWorkflowDocsPrCheckCopy.branch,
  baseBranch: webBuildReadmeWorkflowDocsPrCheckCopy.baseBranch,
  command: "gh pr view 17 --json headRefName,baseRefName,mergeStateStatus,statusCheckRollup",
  docsHref: webBuildReadmeWorkflowDocsPrCheckCopy.docsHref,
  expectedCommandCount: webBuildReadmeWorkflowDocsPrCheckCopy.expectedCommandCount,
  expectedCheckGroups: webBuildReadmeWorkflowDocsPrCheckCopy.expectedCheckGroups,
  expectedConclusion: webBuildReadmeWorkflowDocsPrCheckCopy.expectedConclusion,
  expectedMergeState: webBuildReadmeWorkflowDocsPrCheckCopy.expectedMergeState,
  expectedPrNumber: webBuildReadmeWorkflowDocsPrCheckCopy.expectedPrNumber,
  expectedRouteCount: webBuildReadmeWorkflowDocsPrCheckCopy.expectedRouteCount,
  linkSelector: "[data-testid='web-build-readme-workflow-docs-merge-anchor']",
  noMergeCopy:
    "Не мержить, пока PR #17 снова показывает mergeStateStatus CLEAN для Web build README workflow docs guard",
  ownerRole: "Frontend owner + CI owner + Release owner",
  prHref: webBuildReadmeWorkflowDocsPrCheckCopy.prHref,
  repairTargets:
    "PR #17,gh pr view 17 --json mergeStateStatus,statusCheckRollup,apps/web/scripts/smoke.mjs,/plan",
  sourceMarkerSelector: "[data-testid='web-build-readme-workflow-docs-pr-check-copy']",
  status: webBuildReadmeWorkflowDocsPrCheckCopy.status,
  workflowHref: webBuildReadmeWorkflowDocsPrCheckCopy.workflowHref,
  workflowName: webBuildReadmeWorkflowDocsPrCheckCopy.workflowName,
  workflowPath: webBuildReadmeWorkflowDocsPrCheckCopy.workflowPath,
  checks: [
    ["Merge state", "PR #17 mergeStateStatus остается CLEAN перед merge"],
    ["Branch", "headRefName codex/app-site-shell и baseRefName main не меняются"],
    ["Checks", "statusCheckRollup остается SUCCESS для Web build, API smoke и Shared validation"],
    ["No merge", "не мержить, пока merge-state guard снова не подтверждает clean PR rollup"],
  ],
};

const webBuildReadmeWorkflowDocsReleaseNoteCopy = {
  route: webBuildReadmeWorkflowDocsMergeStateCopy.route,
  checkedWorkflowPath: webBuildReadmeWorkflowDocsMergeStateCopy.checkedWorkflowPath,
  branch: webBuildReadmeWorkflowDocsMergeStateCopy.branch,
  baseBranch: webBuildReadmeWorkflowDocsMergeStateCopy.baseBranch,
  command: "gh pr view 17 --json url,headRefName,baseRefName,mergeStateStatus,statusCheckRollup",
  docsHref: webBuildReadmeWorkflowDocsMergeStateCopy.docsHref,
  expectedCommandCount: webBuildReadmeWorkflowDocsMergeStateCopy.expectedCommandCount,
  expectedCheckGroups: webBuildReadmeWorkflowDocsMergeStateCopy.expectedCheckGroups,
  expectedConclusion: webBuildReadmeWorkflowDocsMergeStateCopy.expectedConclusion,
  expectedMergeState: webBuildReadmeWorkflowDocsMergeStateCopy.expectedMergeState,
  expectedPrNumber: webBuildReadmeWorkflowDocsMergeStateCopy.expectedPrNumber,
  expectedRouteCount: webBuildReadmeWorkflowDocsMergeStateCopy.expectedRouteCount,
  linkSelector: "[data-testid='web-build-readme-workflow-docs-release-anchor']",
  noMergeCopy:
    "Не выпускать release notes, пока PR #17 снова показывает CLEAN и зеленый statusCheckRollup для Web build README workflow docs guard",
  ownerRole: "Frontend owner + CI owner + Release owner",
  prHref: webBuildReadmeWorkflowDocsMergeStateCopy.prHref,
  releaseNote:
    "Web build README workflow docs guard covered by browser-loop, PR-check and merge-state copy on `/plan`.",
  releaseScope: "Web build README workflow docs",
  repairTargets:
    "PR #17,release notes,apps/web/scripts/smoke.mjs,/plan,[data-testid='web-build-readme-workflow-docs-merge-state-copy']",
  sourceMarkerSelector: "[data-testid='web-build-readme-workflow-docs-merge-state-copy']",
  status: webBuildReadmeWorkflowDocsMergeStateCopy.status,
  workflowHref: webBuildReadmeWorkflowDocsMergeStateCopy.workflowHref,
  workflowName: webBuildReadmeWorkflowDocsMergeStateCopy.workflowName,
  workflowPath: webBuildReadmeWorkflowDocsMergeStateCopy.workflowPath,
  checks: [
    ["Release note", "release notes явно упоминают Web build README workflow docs guard"],
    ["Evidence", "handoff ссылается на PR #17, CLEAN mergeStateStatus и зеленый statusCheckRollup"],
    ["Scope", "handoff оставляет `/plan`, Web build workflow и rendered route smoke в одном контексте"],
    ["No merge", "не выпускать release notes, пока release-note guard снова не подтверждает clean PR evidence"],
  ],
};

const webBuildReadmeWorkflowDocsFinalQaCopy = {
  route: webBuildReadmeWorkflowDocsReleaseNoteCopy.route,
  checkedWorkflowPath: webBuildReadmeWorkflowDocsReleaseNoteCopy.checkedWorkflowPath,
  branch: webBuildReadmeWorkflowDocsReleaseNoteCopy.branch,
  baseBranch: webBuildReadmeWorkflowDocsReleaseNoteCopy.baseBranch,
  command:
    "npm run build && npm run smoke -- --url http://127.0.0.1:4177/ && gh pr view 17 --json mergeStateStatus,statusCheckRollup",
  docsHref: webBuildReadmeWorkflowDocsReleaseNoteCopy.docsHref,
  expectedCommandCount: webBuildReadmeWorkflowDocsReleaseNoteCopy.expectedCommandCount,
  expectedCheckGroups: webBuildReadmeWorkflowDocsReleaseNoteCopy.expectedCheckGroups,
  expectedConclusion: webBuildReadmeWorkflowDocsReleaseNoteCopy.expectedConclusion,
  expectedMergeState: webBuildReadmeWorkflowDocsReleaseNoteCopy.expectedMergeState,
  expectedPrNumber: webBuildReadmeWorkflowDocsReleaseNoteCopy.expectedPrNumber,
  expectedRouteCount: webBuildReadmeWorkflowDocsReleaseNoteCopy.expectedRouteCount,
  finalQaScope: "Web build README workflow docs",
  linkSelector: "[data-testid='web-build-readme-workflow-docs-final-qa-anchor']",
  noMergeCopy:
    "Не закрывать Web build README workflow docs handoff, пока final QA снова не подтверждает build, smoke, Browser DOM и CLEAN PR evidence",
  ownerRole: "Frontend owner + CI owner + QA owner + Release owner",
  prHref: webBuildReadmeWorkflowDocsReleaseNoteCopy.prHref,
  releaseNote: webBuildReadmeWorkflowDocsReleaseNoteCopy.releaseNote,
  releaseScope: webBuildReadmeWorkflowDocsReleaseNoteCopy.releaseScope,
  repairTargets:
    "PR #17,apps/web/scripts/smoke.mjs,/plan,Browser DOM QA,[data-testid='web-build-readme-workflow-docs-release-note-copy']",
  sourceMarkerSelector: "[data-testid='web-build-readme-workflow-docs-release-note-copy']",
  status: webBuildReadmeWorkflowDocsReleaseNoteCopy.status,
  workflowHref: webBuildReadmeWorkflowDocsReleaseNoteCopy.workflowHref,
  workflowName: webBuildReadmeWorkflowDocsReleaseNoteCopy.workflowName,
  workflowPath: webBuildReadmeWorkflowDocsReleaseNoteCopy.workflowPath,
  checks: [
    ["Build", "production build проходит перед финальным handoff"],
    ["Smoke", "route smoke видит Web build README workflow docs release-note guard"],
    ["Browser QA", "Browser DOM находит final QA и release-note guard без framework overlay и console errors"],
    ["PR", "PR #17 остается CLEAN с зеленым statusCheckRollup перед закрытием handoff"],
  ],
};

const webBuildReadmeWorkflowDocsOwnerHandoffCopy = {
  route: webBuildReadmeWorkflowDocsFinalQaCopy.route,
  checkedWorkflowPath: webBuildReadmeWorkflowDocsFinalQaCopy.checkedWorkflowPath,
  branch: webBuildReadmeWorkflowDocsFinalQaCopy.branch,
  baseBranch: webBuildReadmeWorkflowDocsFinalQaCopy.baseBranch,
  command: webBuildReadmeWorkflowDocsFinalQaCopy.command,
  docsHref: webBuildReadmeWorkflowDocsFinalQaCopy.docsHref,
  expectedCommandCount: webBuildReadmeWorkflowDocsFinalQaCopy.expectedCommandCount,
  expectedCheckGroups: webBuildReadmeWorkflowDocsFinalQaCopy.expectedCheckGroups,
  expectedConclusion: webBuildReadmeWorkflowDocsFinalQaCopy.expectedConclusion,
  expectedMergeState: webBuildReadmeWorkflowDocsFinalQaCopy.expectedMergeState,
  expectedPrNumber: webBuildReadmeWorkflowDocsFinalQaCopy.expectedPrNumber,
  expectedRouteCount: webBuildReadmeWorkflowDocsFinalQaCopy.expectedRouteCount,
  finalQaScope: webBuildReadmeWorkflowDocsFinalQaCopy.finalQaScope,
  handoffOwners: ["Frontend owner", "CI owner", "QA owner", "Release owner"],
  handoffScope: "Web build README workflow docs owner handoff",
  linkSelector: "[data-testid='web-build-readme-workflow-docs-owner-handoff-anchor']",
  noMergeCopy:
    "Не закрывать Web build README workflow docs owner handoff, пока Frontend, CI, QA и Release owners не приняли final QA evidence",
  ownerRole: webBuildReadmeWorkflowDocsFinalQaCopy.ownerRole,
  prHref: webBuildReadmeWorkflowDocsFinalQaCopy.prHref,
  releaseNote: webBuildReadmeWorkflowDocsFinalQaCopy.releaseNote,
  releaseScope: webBuildReadmeWorkflowDocsFinalQaCopy.releaseScope,
  repairTargets:
    "PR #17,owner handoff,apps/web/scripts/smoke.mjs,/plan,[data-testid='web-build-readme-workflow-docs-final-qa-copy']",
  sourceMarkerSelector: "[data-testid='web-build-readme-workflow-docs-final-qa-copy']",
  status: webBuildReadmeWorkflowDocsFinalQaCopy.status,
  workflowHref: webBuildReadmeWorkflowDocsFinalQaCopy.workflowHref,
  workflowName: webBuildReadmeWorkflowDocsFinalQaCopy.workflowName,
  workflowPath: webBuildReadmeWorkflowDocsFinalQaCopy.workflowPath,
  checks: [
    ["Frontend", "Frontend owner принимает static routes, README docs и owner handoff"],
    ["CI", "CI owner принимает Web build workflow и expected command count"],
    ["QA", "QA owner принимает build, route smoke и Browser DOM QA evidence"],
    ["Release", "Release owner принимает PR #17 CLEAN и release note text"],
  ],
};

const webBuildReadmeWorkflowDocsReleaseChecklistCopy = {
  route: webBuildReadmeWorkflowDocsOwnerHandoffCopy.route,
  checkedWorkflowPath: webBuildReadmeWorkflowDocsOwnerHandoffCopy.checkedWorkflowPath,
  branch: webBuildReadmeWorkflowDocsOwnerHandoffCopy.branch,
  baseBranch: webBuildReadmeWorkflowDocsOwnerHandoffCopy.baseBranch,
  command: webBuildReadmeWorkflowDocsOwnerHandoffCopy.command,
  checklistOwners: webBuildReadmeWorkflowDocsOwnerHandoffCopy.handoffOwners,
  checklistScope: "Web build README workflow docs release checklist",
  docsHref: webBuildReadmeWorkflowDocsOwnerHandoffCopy.docsHref,
  expectedCommandCount: webBuildReadmeWorkflowDocsOwnerHandoffCopy.expectedCommandCount,
  expectedCheckGroups: webBuildReadmeWorkflowDocsOwnerHandoffCopy.expectedCheckGroups,
  expectedConclusion: webBuildReadmeWorkflowDocsOwnerHandoffCopy.expectedConclusion,
  expectedMergeState: webBuildReadmeWorkflowDocsOwnerHandoffCopy.expectedMergeState,
  expectedPrNumber: webBuildReadmeWorkflowDocsOwnerHandoffCopy.expectedPrNumber,
  expectedRouteCount: webBuildReadmeWorkflowDocsOwnerHandoffCopy.expectedRouteCount,
  finalQaScope: webBuildReadmeWorkflowDocsOwnerHandoffCopy.finalQaScope,
  handoffScope: webBuildReadmeWorkflowDocsOwnerHandoffCopy.handoffScope,
  linkSelector: "[data-testid='web-build-readme-workflow-docs-release-checklist-anchor']",
  noMergeCopy:
    "Не выпускать Web build README workflow docs release, пока Frontend, CI, QA и Release owners не приняли checklist evidence",
  ownerRole: webBuildReadmeWorkflowDocsOwnerHandoffCopy.ownerRole,
  prHref: webBuildReadmeWorkflowDocsOwnerHandoffCopy.prHref,
  releaseNote: webBuildReadmeWorkflowDocsOwnerHandoffCopy.releaseNote,
  releaseScope: webBuildReadmeWorkflowDocsOwnerHandoffCopy.releaseScope,
  repairTargets:
    "PR #17,release checklist,apps/web/scripts/smoke.mjs,/plan,[data-testid='web-build-readme-workflow-docs-owner-handoff-copy']",
  sourceMarkerSelector: "[data-testid='web-build-readme-workflow-docs-owner-handoff-copy']",
  status: webBuildReadmeWorkflowDocsOwnerHandoffCopy.status,
  workflowHref: webBuildReadmeWorkflowDocsOwnerHandoffCopy.workflowHref,
  workflowName: webBuildReadmeWorkflowDocsOwnerHandoffCopy.workflowName,
  workflowPath: webBuildReadmeWorkflowDocsOwnerHandoffCopy.workflowPath,
  checks: [
    ["Frontend", "Frontend owner отмечает static routes, README docs и owner handoff"],
    ["CI", "CI owner отмечает Web build workflow, expected command count и smoke coverage"],
    ["QA", "QA owner отмечает build, route smoke и Browser DOM QA evidence"],
    ["Release", "Release owner отмечает PR #17 CLEAN, release note и owner handoff acceptance"],
  ],
};

const webBuildReadmeWorkflowDocsReleaseApprovalCopy = {
  route: webBuildReadmeWorkflowDocsReleaseChecklistCopy.route,
  checkedWorkflowPath: webBuildReadmeWorkflowDocsReleaseChecklistCopy.checkedWorkflowPath,
  branch: webBuildReadmeWorkflowDocsReleaseChecklistCopy.branch,
  baseBranch: webBuildReadmeWorkflowDocsReleaseChecklistCopy.baseBranch,
  command: webBuildReadmeWorkflowDocsReleaseChecklistCopy.command,
  approvalOwners: webBuildReadmeWorkflowDocsReleaseChecklistCopy.checklistOwners,
  approvalScope: "Web build README workflow docs release approval",
  checklistScope: webBuildReadmeWorkflowDocsReleaseChecklistCopy.checklistScope,
  docsHref: webBuildReadmeWorkflowDocsReleaseChecklistCopy.docsHref,
  expectedCommandCount: webBuildReadmeWorkflowDocsReleaseChecklistCopy.expectedCommandCount,
  expectedCheckGroups: webBuildReadmeWorkflowDocsReleaseChecklistCopy.expectedCheckGroups,
  expectedConclusion: webBuildReadmeWorkflowDocsReleaseChecklistCopy.expectedConclusion,
  expectedMergeState: webBuildReadmeWorkflowDocsReleaseChecklistCopy.expectedMergeState,
  expectedPrNumber: webBuildReadmeWorkflowDocsReleaseChecklistCopy.expectedPrNumber,
  expectedRouteCount: webBuildReadmeWorkflowDocsReleaseChecklistCopy.expectedRouteCount,
  finalQaScope: webBuildReadmeWorkflowDocsReleaseChecklistCopy.finalQaScope,
  handoffScope: webBuildReadmeWorkflowDocsReleaseChecklistCopy.handoffScope,
  linkSelector: "[data-testid='web-build-readme-workflow-docs-release-approval-anchor']",
  noMergeCopy:
    "Не утверждать Web build README workflow docs release, пока Frontend, CI, QA и Release owners не приняли approval evidence",
  ownerRole: webBuildReadmeWorkflowDocsReleaseChecklistCopy.ownerRole,
  prHref: webBuildReadmeWorkflowDocsReleaseChecklistCopy.prHref,
  releaseNote: webBuildReadmeWorkflowDocsReleaseChecklistCopy.releaseNote,
  releaseScope: webBuildReadmeWorkflowDocsReleaseChecklistCopy.releaseScope,
  repairTargets:
    "PR #17,release approval,apps/web/scripts/smoke.mjs,/plan,[data-testid='web-build-readme-workflow-docs-release-checklist-copy']",
  sourceMarkerSelector: "[data-testid='web-build-readme-workflow-docs-release-checklist-copy']",
  status: webBuildReadmeWorkflowDocsReleaseChecklistCopy.status,
  workflowHref: webBuildReadmeWorkflowDocsReleaseChecklistCopy.workflowHref,
  workflowName: webBuildReadmeWorkflowDocsReleaseChecklistCopy.workflowName,
  workflowPath: webBuildReadmeWorkflowDocsReleaseChecklistCopy.workflowPath,
  checks: [
    ["Frontend", "Frontend owner утверждает static routes, README docs и checklist acceptance"],
    ["CI", "CI owner утверждает Web build workflow, expected command count и smoke coverage"],
    ["QA", "QA owner утверждает build, route smoke и Browser DOM QA evidence"],
    ["Release", "Release owner утверждает PR #17 CLEAN, release note и checklist acceptance"],
  ],
};

const webBuildReadmeWorkflowDocsReleaseSignoffCopy = {
  route: webBuildReadmeWorkflowDocsReleaseApprovalCopy.route,
  checkedWorkflowPath: webBuildReadmeWorkflowDocsReleaseApprovalCopy.checkedWorkflowPath,
  branch: webBuildReadmeWorkflowDocsReleaseApprovalCopy.branch,
  baseBranch: webBuildReadmeWorkflowDocsReleaseApprovalCopy.baseBranch,
  command: webBuildReadmeWorkflowDocsReleaseApprovalCopy.command,
  approvalScope: webBuildReadmeWorkflowDocsReleaseApprovalCopy.approvalScope,
  docsHref: webBuildReadmeWorkflowDocsReleaseApprovalCopy.docsHref,
  expectedCommandCount: webBuildReadmeWorkflowDocsReleaseApprovalCopy.expectedCommandCount,
  expectedCheckGroups: webBuildReadmeWorkflowDocsReleaseApprovalCopy.expectedCheckGroups,
  expectedConclusion: webBuildReadmeWorkflowDocsReleaseApprovalCopy.expectedConclusion,
  expectedMergeState: webBuildReadmeWorkflowDocsReleaseApprovalCopy.expectedMergeState,
  expectedPrNumber: webBuildReadmeWorkflowDocsReleaseApprovalCopy.expectedPrNumber,
  expectedRouteCount: webBuildReadmeWorkflowDocsReleaseApprovalCopy.expectedRouteCount,
  finalQaScope: webBuildReadmeWorkflowDocsReleaseApprovalCopy.finalQaScope,
  handoffScope: webBuildReadmeWorkflowDocsReleaseApprovalCopy.handoffScope,
  linkSelector: "[data-testid='web-build-readme-workflow-docs-release-signoff-anchor']",
  noMergeCopy:
    "Не подписывать Web build README workflow docs release, пока Frontend, CI, QA и Release owners не приняли signoff evidence",
  ownerRole: webBuildReadmeWorkflowDocsReleaseApprovalCopy.ownerRole,
  prHref: webBuildReadmeWorkflowDocsReleaseApprovalCopy.prHref,
  releaseNote: webBuildReadmeWorkflowDocsReleaseApprovalCopy.releaseNote,
  releaseScope: webBuildReadmeWorkflowDocsReleaseApprovalCopy.releaseScope,
  repairTargets:
    "PR #17,release signoff,apps/web/scripts/smoke.mjs,/plan,[data-testid='web-build-readme-workflow-docs-release-approval-copy']",
  signoffOwners: webBuildReadmeWorkflowDocsReleaseApprovalCopy.approvalOwners,
  signoffScope: "Web build README workflow docs release signoff",
  sourceMarkerSelector: "[data-testid='web-build-readme-workflow-docs-release-approval-copy']",
  status: webBuildReadmeWorkflowDocsReleaseApprovalCopy.status,
  workflowHref: webBuildReadmeWorkflowDocsReleaseApprovalCopy.workflowHref,
  workflowName: webBuildReadmeWorkflowDocsReleaseApprovalCopy.workflowName,
  workflowPath: webBuildReadmeWorkflowDocsReleaseApprovalCopy.workflowPath,
  checks: [
    ["Frontend", "Frontend owner подписывает static routes, README docs и approval acceptance"],
    ["CI", "CI owner подписывает Web build workflow, expected command count и smoke coverage"],
    ["QA", "QA owner подписывает build, route smoke и Browser DOM QA evidence"],
    ["Release", "Release owner подписывает PR #17 CLEAN, release note и approval acceptance"],
  ],
};

const webBuildReadmeWorkflowDocsArchiveCopy = {
  route: webBuildReadmeWorkflowDocsReleaseSignoffCopy.route,
  checkedWorkflowPath: webBuildReadmeWorkflowDocsReleaseSignoffCopy.checkedWorkflowPath,
  branch: webBuildReadmeWorkflowDocsReleaseSignoffCopy.branch,
  baseBranch: webBuildReadmeWorkflowDocsReleaseSignoffCopy.baseBranch,
  command: webBuildReadmeWorkflowDocsReleaseSignoffCopy.command,
  approvalScope: webBuildReadmeWorkflowDocsReleaseSignoffCopy.approvalScope,
  archiveOwners: webBuildReadmeWorkflowDocsReleaseSignoffCopy.signoffOwners,
  archiveScope: "Web build README workflow docs archive",
  docsHref: webBuildReadmeWorkflowDocsReleaseSignoffCopy.docsHref,
  expectedCommandCount: webBuildReadmeWorkflowDocsReleaseSignoffCopy.expectedCommandCount,
  expectedCheckGroups: webBuildReadmeWorkflowDocsReleaseSignoffCopy.expectedCheckGroups,
  expectedConclusion: webBuildReadmeWorkflowDocsReleaseSignoffCopy.expectedConclusion,
  expectedMergeState: webBuildReadmeWorkflowDocsReleaseSignoffCopy.expectedMergeState,
  expectedPrNumber: webBuildReadmeWorkflowDocsReleaseSignoffCopy.expectedPrNumber,
  expectedRouteCount: webBuildReadmeWorkflowDocsReleaseSignoffCopy.expectedRouteCount,
  finalQaScope: webBuildReadmeWorkflowDocsReleaseSignoffCopy.finalQaScope,
  handoffScope: webBuildReadmeWorkflowDocsReleaseSignoffCopy.handoffScope,
  linkSelector: "[data-testid='web-build-readme-workflow-docs-archive-anchor']",
  noMergeCopy:
    "Не архивировать Web build README workflow docs release, пока archive evidence не связывает signoff, release note, CLEAN PR и smoke coverage",
  ownerRole: webBuildReadmeWorkflowDocsReleaseSignoffCopy.ownerRole,
  prHref: webBuildReadmeWorkflowDocsReleaseSignoffCopy.prHref,
  releaseNote: webBuildReadmeWorkflowDocsReleaseSignoffCopy.releaseNote,
  releaseScope: webBuildReadmeWorkflowDocsReleaseSignoffCopy.releaseScope,
  repairTargets:
    "PR #17,release archive,apps/web/scripts/smoke.mjs,/plan,[data-testid='web-build-readme-workflow-docs-release-signoff-copy']",
  signoffOwners: webBuildReadmeWorkflowDocsReleaseSignoffCopy.signoffOwners,
  signoffScope: webBuildReadmeWorkflowDocsReleaseSignoffCopy.signoffScope,
  sourceMarkerSelector: "[data-testid='web-build-readme-workflow-docs-release-signoff-copy']",
  status: webBuildReadmeWorkflowDocsReleaseSignoffCopy.status,
  workflowHref: webBuildReadmeWorkflowDocsReleaseSignoffCopy.workflowHref,
  workflowName: webBuildReadmeWorkflowDocsReleaseSignoffCopy.workflowName,
  workflowPath: webBuildReadmeWorkflowDocsReleaseSignoffCopy.workflowPath,
  checks: [
    ["Frontend", "Frontend owner архивирует static routes, README docs и signoff evidence"],
    ["CI", "CI owner архивирует Web build workflow, expected command count и smoke coverage"],
    ["QA", "QA owner архивирует build, route smoke и Browser DOM QA evidence"],
    ["Release", "Release owner архивирует PR #17 CLEAN, release note и signoff acceptance"],
  ],
};

const finalPrHandoffAuditCopy = {
  route: "/plan",
  branch: "codex/app-site-shell",
  baseBranch: "main",
  command:
    "npm run build && npm run smoke -- --url http://127.0.0.1:4177/ && gh pr view 17 --json mergeStateStatus,statusCheckRollup",
  archiveCount: 4,
  archiveRoutes: ["/plan", "/ai-review", "/sources"],
  archiveSelectors: [
    "[data-testid='shared-validation-readme-workflow-docs-archive-copy']",
    "[data-testid='web-build-readme-workflow-docs-archive-copy']",
    "[data-testid='ai-review-queue-readme-workflow-docs-archive-copy']",
    "[data-testid='source-connectors-readme-workflow-docs-archive-copy']",
  ],
  auditOwners: ["Frontend owner", "Schema owner", "AI workflow owner", "Data owner", "QA owner", "Release owner"],
  auditScope: "PR #17 final handoff audit",
  expectedCheckGroups: ["Web build", "API smoke", "Shared validation"],
  expectedConclusion: "SUCCESS",
  expectedMergeState: "CLEAN",
  expectedPrNumber: 17,
  expectedRouteCount: 16,
  linkSelector: "[data-testid='final-pr-handoff-audit-anchor']",
  noMergeCopy:
    "Не закрывать финальный PR #17 handoff audit, пока четыре archive guards, CLEAN PR и зеленый statusCheckRollup не связаны в одном evidence trail",
  ownerRole: "Frontend owner + Schema owner + AI workflow owner + Data owner + QA owner + Release owner",
  prHref: "https://github.com/info14fourteen-creator/ASTS/pull/17",
  releaseScope: "ASTS app.site.ru PR #17",
  repairTargets:
    "PR #17,final handoff audit,apps/web/scripts/smoke.mjs,/plan,/ai-review,/sources,archive guards",
  sourceMarkerSelector: "[data-testid='web-build-readme-workflow-docs-archive-copy']",
  status: "armed",
  checks: [
    ["Archives", "Четыре archive guards покрывают shared validation, Web build, AI review queue и Source Connectors"],
    ["CI", "Web build, API smoke и Shared validation остаются SUCCESS на PR #17"],
    ["PR", "PR #17 остается CLEAN между codex/app-site-shell и main"],
    ["Handoff", "Release owner видит единый audit trail перед merge readiness note"],
  ],
};

const prMergeReadinessNoteCopy = {
  route: "/plan",
  branch: finalPrHandoffAuditCopy.branch,
  baseBranch: finalPrHandoffAuditCopy.baseBranch,
  command: finalPrHandoffAuditCopy.command,
  auditScope: finalPrHandoffAuditCopy.auditScope,
  auditSelector: "[data-testid='final-pr-handoff-audit-copy']",
  expectedArchiveCount: finalPrHandoffAuditCopy.archiveCount,
  expectedCheckGroups: finalPrHandoffAuditCopy.expectedCheckGroups,
  expectedConclusion: finalPrHandoffAuditCopy.expectedConclusion,
  expectedMergeState: finalPrHandoffAuditCopy.expectedMergeState,
  expectedPrNumber: finalPrHandoffAuditCopy.expectedPrNumber,
  expectedRouteCount: finalPrHandoffAuditCopy.expectedRouteCount,
  linkSelector: "[data-testid='pr-merge-readiness-note-anchor']",
  mergeReadinessScope: "PR #17 merge readiness note",
  noMergeCopy:
    "Не запрашивать merge readiness, пока final handoff audit, CLEAN PR, зеленый statusCheckRollup и review-thread check не лежат в одном handoff note",
  ownerRole: "Release owner + QA owner + Reviewer",
  prHref: finalPrHandoffAuditCopy.prHref,
  readinessOwners: ["Release owner", "QA owner", "Reviewer"],
  releaseScope: finalPrHandoffAuditCopy.releaseScope,
  repairTargets:
    "PR #17,merge readiness note,final handoff audit,review threads,apps/web/scripts/smoke.mjs,/plan",
  sourceMarkerSelector: "[data-testid='final-pr-handoff-audit-copy']",
  status: "armed",
  checks: [
    ["Audit", "Final handoff audit подтверждает четыре archive guards и единый evidence trail"],
    ["CI", "Status check rollup остается SUCCESS для Web build, API smoke и Shared validation"],
    ["Merge state", "PR #17 остается CLEAN между codex/app-site-shell и main"],
    ["Review", "Перед merge request отдельно проверить unresolved review threads"],
  ],
};

const prReviewThreadsCopy = {
  route: "/plan",
  branch: prMergeReadinessNoteCopy.branch,
  baseBranch: prMergeReadinessNoteCopy.baseBranch,
  command:
    "gh api graphql -f query='reviewThreads(first:100){totalCount nodes{isResolved isOutdated path line}}'",
  expectedReviewThreads: 0,
  expectedUnresolvedThreads: 0,
  expectedOutdatedThreads: 0,
  expectedPrComments: 0,
  expectedReviews: 0,
  linkSelector: "[data-testid='pr-review-threads-anchor']",
  mergeReadinessSelector: "[data-testid='pr-merge-readiness-note-copy']",
  noMergeCopy:
    "Не формировать merge request, пока reviewThreads.totalCount=0, unresolved=0 и PR #17 остается CLEAN с зелеными checks",
  ownerRole: "Reviewer + QA owner + Release owner",
  prHref: prMergeReadinessNoteCopy.prHref,
  reviewThreadScope: "PR #17 review threads check",
  reviewThreadSource: "GitHub GraphQL reviewThreads(first:100)",
  reviewThreadStatus: "no review threads",
  reviewOwners: ["Reviewer", "QA owner", "Release owner"],
  releaseScope: prMergeReadinessNoteCopy.releaseScope,
  repairTargets: "PR #17,review threads,merge readiness note,apps/web/scripts/smoke.mjs,/plan",
  sourceMarkerSelector: "[data-testid='pr-merge-readiness-note-copy']",
  status: "verified",
  checks: [
    ["Threads", "GitHub GraphQL вернул reviewThreads.totalCount=0 для PR #17"],
    ["Unresolved", "Нет unresolved или outdated review threads перед merge request"],
    ["Comments", "Top-level PR comments и reviews пустые по gh pr view"],
    ["Handoff", "Merge readiness note теперь ссылается на отдельную review-thread проверку"],
  ],
};

const prMergeRequestCopy = {
  route: "/plan",
  branch: prReviewThreadsCopy.branch,
  baseBranch: prReviewThreadsCopy.baseBranch,
  command:
    "gh pr view 17 --json mergeStateStatus,statusCheckRollup && gh api graphql reviewThreads(first:100)",
  expectedCheckGroups: prMergeReadinessNoteCopy.expectedCheckGroups,
  expectedConclusion: prMergeReadinessNoteCopy.expectedConclusion,
  expectedMergeState: prMergeReadinessNoteCopy.expectedMergeState,
  expectedReviewThreads: prReviewThreadsCopy.expectedReviewThreads,
  expectedUnresolvedThreads: prReviewThreadsCopy.expectedUnresolvedThreads,
  linkSelector: "[data-testid='pr-merge-request-anchor']",
  mergeRequestScope: "PR #17 merge request copy",
  mergeReadinessSelector: "[data-testid='pr-merge-readiness-note-copy']",
  noMergeCopy:
    "Не просить merge approval, пока CLEAN PR, зеленый statusCheckRollup и нулевые reviewThreads не отражены в одном merge request note",
  ownerRole: "Release owner + Reviewer + QA owner",
  prHref: prReviewThreadsCopy.prHref,
  releaseScope: prReviewThreadsCopy.releaseScope,
  repairTargets: "PR #17,merge request copy,review threads,statusCheckRollup,apps/web/scripts/smoke.mjs,/plan",
  requestOwners: ["Release owner", "Reviewer", "QA owner"],
  reviewThreadsSelector: "[data-testid='pr-review-threads-copy']",
  sourceMarkerSelector: "[data-testid='pr-review-threads-copy']",
  status: "ready",
  checks: [
    ["Merge state", "PR #17 остается CLEAN между codex/app-site-shell и main"],
    ["Checks", "Status check rollup SUCCESS для Web build, API smoke и Shared validation"],
    ["Review", "reviewThreads.totalCount=0 и unresolved=0 перед merge request"],
    ["Request", "Merge request copy связывает audit, readiness и review-thread evidence"],
  ],
};

const prFinalMergeHandoffCopy = {
  route: "/plan",
  branch: prMergeRequestCopy.branch,
  baseBranch: prMergeRequestCopy.baseBranch,
  command:
    "gh pr view 17 --json mergeStateStatus,statusCheckRollup,comments,reviews && gh api graphql reviewThreads(first:100)",
  expectedCheckGroups: prMergeRequestCopy.expectedCheckGroups,
  expectedConclusion: prMergeRequestCopy.expectedConclusion,
  expectedMergeState: prMergeRequestCopy.expectedMergeState,
  expectedPrComments: prReviewThreadsCopy.expectedPrComments,
  expectedReviews: prReviewThreadsCopy.expectedReviews,
  expectedReviewThreads: prMergeRequestCopy.expectedReviewThreads,
  expectedUnresolvedThreads: prMergeRequestCopy.expectedUnresolvedThreads,
  finalHandoffScope: "PR #17 final merge handoff copy",
  linkSelector: "[data-testid='pr-final-merge-handoff-anchor']",
  mergeRequestSelector: "[data-testid='pr-merge-request-copy']",
  noMergeCopy:
    "Не переводить PR #17 в merge approval, пока final handoff не показывает CLEAN, SUCCESS, reviewThreads=0, comments=0 и reviews=0",
  ownerRole: "Release owner + Reviewer + QA owner",
  prHref: prMergeRequestCopy.prHref,
  releaseScope: prMergeRequestCopy.releaseScope,
  repairTargets:
    "PR #17,final merge handoff,merge request copy,review threads,statusCheckRollup,apps/web/scripts/smoke.mjs,/plan",
  signoffOwners: ["Release owner", "Reviewer", "QA owner"],
  sourceMarkerSelector: "[data-testid='pr-merge-request-copy']",
  status: "ready",
  checks: [
    ["State", "PR #17 остается CLEAN между codex/app-site-shell и main"],
    ["CI", "Status check rollup SUCCESS покрывает Web build, API smoke и Shared validation"],
    ["Review", "reviewThreads=0, unresolved=0, comments=0 и reviews=0 перед approval request"],
    ["Handoff", "Final merge handoff связывает request copy с owner checklist"],
  ],
};

const prMergeApprovalChecklistCopy = {
  route: "/plan",
  branch: prFinalMergeHandoffCopy.branch,
  baseBranch: prFinalMergeHandoffCopy.baseBranch,
  command:
    "gh pr view 17 --json mergeStateStatus,statusCheckRollup,comments,reviews,reviewDecision && gh api graphql reviewThreads(first:100)",
  checklistScope: "PR #17 merge approval checklist copy",
  expectedCheckGroups: prFinalMergeHandoffCopy.expectedCheckGroups,
  expectedConclusion: prFinalMergeHandoffCopy.expectedConclusion,
  expectedMergeState: prFinalMergeHandoffCopy.expectedMergeState,
  expectedPrComments: prFinalMergeHandoffCopy.expectedPrComments,
  expectedReviewDecision: "none",
  expectedReviews: prFinalMergeHandoffCopy.expectedReviews,
  expectedReviewThreads: prFinalMergeHandoffCopy.expectedReviewThreads,
  expectedUnresolvedThreads: prFinalMergeHandoffCopy.expectedUnresolvedThreads,
  finalHandoffSelector: "[data-testid='pr-final-merge-handoff-copy']",
  linkSelector: "[data-testid='pr-merge-approval-checklist-anchor']",
  noMergeCopy:
    "Не отправлять approval request, пока checklist не подтверждает CLEAN, SUCCESS, reviewThreads=0, comments=0, reviews=0 и пустой reviewDecision",
  ownerRole: "Release owner + Reviewer + QA owner",
  prHref: prFinalMergeHandoffCopy.prHref,
  releaseScope: prFinalMergeHandoffCopy.releaseScope,
  repairTargets:
    "PR #17,merge approval checklist,final merge handoff,statusCheckRollup,reviewDecision,apps/web/scripts/smoke.mjs,/plan",
  signoffOwners: prFinalMergeHandoffCopy.signoffOwners,
  sourceMarkerSelector: "[data-testid='pr-final-merge-handoff-copy']",
  status: "ready",
  checks: [
    ["Preconditions", "CLEAN PR, SUCCESS checks и нулевые review threads уже собраны"],
    ["Review state", "reviewDecision пустой, reviews=0 и approval еще не запрошен"],
    ["Comments", "comments=0 и нет открытого reviewer feedback перед approval request"],
    ["Checklist", "Owner checklist готовит следующий approval request без merge action"],
  ],
};

const prMergeApprovalRequestCopy = {
  route: "/plan",
  branch: prMergeApprovalChecklistCopy.branch,
  baseBranch: prMergeApprovalChecklistCopy.baseBranch,
  command: prMergeApprovalChecklistCopy.command,
  approvalRequestScope: "PR #17 approval request copy",
  checklistSelector: "[data-testid='pr-merge-approval-checklist-copy']",
  expectedCheckGroups: prMergeApprovalChecklistCopy.expectedCheckGroups,
  expectedConclusion: prMergeApprovalChecklistCopy.expectedConclusion,
  expectedMergeState: prMergeApprovalChecklistCopy.expectedMergeState,
  expectedPrComments: prMergeApprovalChecklistCopy.expectedPrComments,
  expectedReviewDecision: prMergeApprovalChecklistCopy.expectedReviewDecision,
  expectedReviews: prMergeApprovalChecklistCopy.expectedReviews,
  expectedReviewThreads: prMergeApprovalChecklistCopy.expectedReviewThreads,
  expectedUnresolvedThreads: prMergeApprovalChecklistCopy.expectedUnresolvedThreads,
  linkSelector: "[data-testid='pr-approval-request-anchor']",
  noMergeCopy:
    "Approval request copy не выполняет merge action и не отправляет GitHub review без отдельного owner signoff",
  ownerRole: "Release owner + Reviewer",
  prHref: prMergeApprovalChecklistCopy.prHref,
  releaseScope: prMergeApprovalChecklistCopy.releaseScope,
  repairTargets:
    "PR #17,approval request copy,merge approval checklist,reviewDecision,statusCheckRollup,apps/web/scripts/smoke.mjs,/plan",
  requestChannel: "Owner handoff comment",
  requestCopy:
    "Прошу owner/reviewer approval для PR #17: branch codex/app-site-shell to main, checks SUCCESS, mergeState CLEAN, reviewThreads=0, comments=0, reviews=0, reviewDecision пустой; merge action не выполнять до отдельного owner signoff",
  requestOwners: ["Release owner", "Reviewer"],
  sourceMarkerSelector: "[data-testid='pr-merge-approval-checklist-copy']",
  status: "draft-ready",
  checks: [
    ["Scope", "Approval request ссылается на checklist, final handoff и PR #17"],
    ["Preconditions", "CLEAN, SUCCESS, reviewThreads=0, comments=0, reviews=0 уже подтверждены"],
    ["Request", "Текст просит reviewer approval без merge или auto-merge действия"],
    ["Guardrail", "Если reviewDecision изменится или появятся comments, вернуться к checklist"],
  ],
};

const prApprovalWaitStateCopy = {
  route: "/plan",
  branch: prMergeApprovalRequestCopy.branch,
  baseBranch: prMergeApprovalRequestCopy.baseBranch,
  command: prMergeApprovalRequestCopy.command,
  approvalRequestSelector: "[data-testid='pr-approval-request-copy']",
  waitStateScope: "PR #17 approval wait-state copy",
  expectedCheckGroups: prMergeApprovalRequestCopy.expectedCheckGroups,
  expectedConclusion: prMergeApprovalRequestCopy.expectedConclusion,
  expectedMergeState: prMergeApprovalRequestCopy.expectedMergeState,
  expectedPrComments: prMergeApprovalRequestCopy.expectedPrComments,
  expectedReviewDecision: prMergeApprovalRequestCopy.expectedReviewDecision,
  expectedReviews: prMergeApprovalRequestCopy.expectedReviews,
  expectedReviewThreads: prMergeApprovalRequestCopy.expectedReviewThreads,
  expectedUnresolvedThreads: prMergeApprovalRequestCopy.expectedUnresolvedThreads,
  linkSelector: "[data-testid='pr-approval-wait-state-anchor']",
  noMergeCopy:
    "Не выполнять merge, auto-merge или approval mutation, пока reviewDecision остается пустым и owner signoff не получен",
  ownerRole: "Release owner + Reviewer + QA owner",
  prHref: prMergeApprovalRequestCopy.prHref,
  releaseScope: prMergeApprovalRequestCopy.releaseScope,
  repairTargets:
    "PR #17,approval wait-state,approval request copy,reviewDecision,owner signoff,apps/web/scripts/smoke.mjs,/plan",
  responseOwners: ["Release owner", "Reviewer", "QA owner"],
  sourceMarkerSelector: "[data-testid='pr-approval-request-copy']",
  status: "waiting-for-approval",
  waitStateCopy:
    "PR #17 ожидает reviewer/owner approval: approval request подготовлен, reviewDecision пустой, comments=0, reviews=0; следующий шаг только после явного ответа owner/reviewer",
  checks: [
    ["Request", "Approval request copy готов и не отправляет merge action"],
    ["Decision", "reviewDecision пустой, поэтому PR остается в wait-state"],
    ["Feedback", "comments=0, reviews=0 и reviewThreads=0 перед ожиданием ответа"],
    ["Next step", "Любой owner/reviewer ответ сначала отражается в response copy"],
  ],
};

const prReviewerApprovalResponseCopy = {
  route: "/plan",
  branch: prApprovalWaitStateCopy.branch,
  baseBranch: prApprovalWaitStateCopy.baseBranch,
  command: prApprovalWaitStateCopy.command,
  approvalWaitStateSelector: "[data-testid='pr-approval-wait-state-copy']",
  responseScope: "PR #17 reviewer approval response copy",
  expectedCheckGroups: prApprovalWaitStateCopy.expectedCheckGroups,
  expectedConclusion: prApprovalWaitStateCopy.expectedConclusion,
  expectedMergeState: prApprovalWaitStateCopy.expectedMergeState,
  expectedPrComments: prApprovalWaitStateCopy.expectedPrComments,
  expectedReviewDecision: prApprovalWaitStateCopy.expectedReviewDecision,
  expectedReviews: prApprovalWaitStateCopy.expectedReviews,
  expectedReviewThreads: prApprovalWaitStateCopy.expectedReviewThreads,
  expectedUnresolvedThreads: prApprovalWaitStateCopy.expectedUnresolvedThreads,
  linkSelector: "[data-testid='pr-reviewer-approval-response-anchor']",
  noMergeCopy:
    "Reviewer approval response copy только описывает follow-up; merge, auto-merge и review submission остаются запрещены без явного owner signoff",
  ownerRole: "Release owner + Reviewer + QA owner",
  prHref: prApprovalWaitStateCopy.prHref,
  releaseScope: prApprovalWaitStateCopy.releaseScope,
  repairTargets:
    "PR #17,reviewer approval response,approval wait-state,reviewDecision,owner signoff,apps/web/scripts/smoke.mjs,/plan",
  responseOwners: prApprovalWaitStateCopy.responseOwners,
  responseCopy:
    "Если owner/reviewer approved: перейти к owner signoff checkpoint; если changes requested или comments появились: остановить merge path и вернуться к review follow-up; если ответа нет: оставить PR #17 в approval wait-state",
  sourceMarkerSelector: "[data-testid='pr-approval-wait-state-copy']",
  status: "response-playbook-ready",
  checks: [
    ["Approved", "Approved response ведет только к owner signoff checkpoint"],
    ["Changes", "Changes requested или comments переводят работу в review follow-up"],
    ["Waiting", "При пустом reviewDecision PR остается в approval wait-state"],
    ["Guardrail", "Ни один response branch не выполняет merge action автоматически"],
  ],
};

const prOwnerSignoffCheckpointCopy = {
  route: "/plan",
  branch: prReviewerApprovalResponseCopy.branch,
  baseBranch: prReviewerApprovalResponseCopy.baseBranch,
  command: prReviewerApprovalResponseCopy.command,
  reviewerResponseSelector: "[data-testid='pr-reviewer-approval-response-copy']",
  signoffScope: "PR #17 owner signoff checkpoint copy",
  expectedCheckGroups: prReviewerApprovalResponseCopy.expectedCheckGroups,
  expectedConclusion: prReviewerApprovalResponseCopy.expectedConclusion,
  expectedMergeState: prReviewerApprovalResponseCopy.expectedMergeState,
  expectedPrComments: prReviewerApprovalResponseCopy.expectedPrComments,
  expectedReviewDecision: prReviewerApprovalResponseCopy.expectedReviewDecision,
  expectedReviews: prReviewerApprovalResponseCopy.expectedReviews,
  expectedReviewThreads: prReviewerApprovalResponseCopy.expectedReviewThreads,
  expectedUnresolvedThreads: prReviewerApprovalResponseCopy.expectedUnresolvedThreads,
  linkSelector: "[data-testid='pr-owner-signoff-checkpoint-anchor']",
  noMergeCopy:
    "Owner signoff checkpoint фиксирует готовность к decision packet, но не выполняет merge, auto-merge или branch deletion",
  ownerRole: "Release owner + QA owner",
  prHref: prReviewerApprovalResponseCopy.prHref,
  releaseScope: prReviewerApprovalResponseCopy.releaseScope,
  repairTargets:
    "PR #17,owner signoff checkpoint,reviewer approval response,CLEAN,SUCCESS,reviewDecision,apps/web/scripts/smoke.mjs,/plan",
  signoffCopy:
    "Owner signoff checkpoint для PR #17: подтвердить CLEAN, SUCCESS checks, reviewThreads=0, comments=0, reviews=0, approved response или explicit owner signoff; затем собрать final merge decision packet без merge action",
  signoffOwners: ["Release owner", "QA owner"],
  sourceMarkerSelector: "[data-testid='pr-reviewer-approval-response-copy']",
  status: "checkpoint-ready",
  checks: [
    ["State", "PR #17 должен оставаться CLEAN между codex/app-site-shell и main"],
    ["Checks", "Web build, API smoke и Shared validation должны быть SUCCESS"],
    ["Review", "Owner signoff требует approved response или явный owner approval"],
    ["Handoff", "Checkpoint передает только final merge decision packet без merge action"],
  ],
};

const prFinalMergeDecisionPacketCopy = {
  route: "/plan",
  branch: prOwnerSignoffCheckpointCopy.branch,
  baseBranch: prOwnerSignoffCheckpointCopy.baseBranch,
  command: prOwnerSignoffCheckpointCopy.command,
  ownerSignoffSelector: "[data-testid='pr-owner-signoff-checkpoint-copy']",
  decisionScope: "PR #17 final merge decision packet copy",
  expectedCheckGroups: prOwnerSignoffCheckpointCopy.expectedCheckGroups,
  expectedConclusion: prOwnerSignoffCheckpointCopy.expectedConclusion,
  expectedMergeState: prOwnerSignoffCheckpointCopy.expectedMergeState,
  expectedPrComments: prOwnerSignoffCheckpointCopy.expectedPrComments,
  expectedReviewDecision: prOwnerSignoffCheckpointCopy.expectedReviewDecision,
  expectedReviews: prOwnerSignoffCheckpointCopy.expectedReviews,
  expectedReviewThreads: prOwnerSignoffCheckpointCopy.expectedReviewThreads,
  expectedUnresolvedThreads: prOwnerSignoffCheckpointCopy.expectedUnresolvedThreads,
  linkSelector: "[data-testid='pr-final-merge-decision-packet-anchor']",
  noMergeCopy:
    "Final merge decision packet только собирает decision evidence; merge, auto-merge, branch deletion и approval submission остаются отдельным owner action",
  ownerRole: "Release owner + QA owner + Reviewer",
  packetCopy:
    "Final merge decision packet для PR #17: CLEAN mergeState, SUCCESS Web build/API smoke/Shared validation, reviewThreads=0, comments=0, reviews=0, owner signoff checkpoint и explicit merge authorization должны быть подтверждены перед любым merge action",
  prHref: prOwnerSignoffCheckpointCopy.prHref,
  releaseScope: prOwnerSignoffCheckpointCopy.releaseScope,
  repairTargets:
    "PR #17,final merge decision packet,owner signoff checkpoint,CLEAN,SUCCESS,review counters,apps/web/scripts/smoke.mjs,/plan",
  sourceMarkerSelector: "[data-testid='pr-owner-signoff-checkpoint-copy']",
  status: "decision-packet-ready",
  decisionInputs: [
    "CLEAN mergeStateStatus",
    "SUCCESS Web build, API smoke, Shared validation",
    "reviewThreads=0, comments=0, reviews=0",
    "Owner signoff checkpoint or explicit owner approval",
  ],
  checks: [
    ["Ready", "Decision packet подтверждает, что PR #17 готов к owner merge authorization"],
    ["Blocked", "Любой non-SUCCESS check, comment или review thread останавливает merge path"],
    ["Decision", "Owner должен выбрать approve-to-merge, wait или return-to-review"],
    ["Action", "Этот packet не нажимает merge и не включает auto-merge"],
  ],
};

const prOwnerMergeAuthorizationCopy = {
  route: "/plan",
  branch: prFinalMergeDecisionPacketCopy.branch,
  baseBranch: prFinalMergeDecisionPacketCopy.baseBranch,
  command: prFinalMergeDecisionPacketCopy.command,
  decisionPacketSelector: "[data-testid='pr-final-merge-decision-packet-copy']",
  authorizationScope: "PR #17 owner merge authorization copy",
  expectedCheckGroups: prFinalMergeDecisionPacketCopy.expectedCheckGroups,
  expectedConclusion: prFinalMergeDecisionPacketCopy.expectedConclusion,
  expectedMergeState: prFinalMergeDecisionPacketCopy.expectedMergeState,
  expectedPrComments: prFinalMergeDecisionPacketCopy.expectedPrComments,
  expectedReviewDecision: prFinalMergeDecisionPacketCopy.expectedReviewDecision,
  expectedReviews: prFinalMergeDecisionPacketCopy.expectedReviews,
  expectedReviewThreads: prFinalMergeDecisionPacketCopy.expectedReviewThreads,
  expectedUnresolvedThreads: prFinalMergeDecisionPacketCopy.expectedUnresolvedThreads,
  linkSelector: "[data-testid='pr-owner-merge-authorization-anchor']",
  noMergeCopy:
    "Owner merge authorization copy только формулирует разрешение; фактический merge, auto-merge, squash/rebase choice и branch deletion остаются отдельной ручной операцией owner",
  ownerRole: "Release owner",
  authorizationCopy:
    "Owner merge authorization для PR #17 допустим только если final decision packet подтвержден: mergeState=CLEAN, checks=SUCCESS, reviewThreads/comments/reviews=0 и owner явно выбрал approve-to-merge; при wait или return-to-review merge path останавливается",
  prHref: prFinalMergeDecisionPacketCopy.prHref,
  releaseScope: prFinalMergeDecisionPacketCopy.releaseScope,
  repairTargets:
    "PR #17,owner merge authorization,final merge decision packet,CLEAN,SUCCESS,zero review counters,apps/web/scripts/smoke.mjs,/plan",
  sourceMarkerSelector: "[data-testid='pr-final-merge-decision-packet-copy']",
  status: "authorization-copy-ready",
  authorizationStates: ["approve-to-merge", "wait", "return-to-review"],
  checks: [
    ["Approve", "Owner approval должен быть явным и привязан к PR #17 final decision packet"],
    ["Wait", "Если reviewDecision пустой или owner не ответил, PR остается в wait-state"],
    ["Return", "Новые comments, reviews или reviewThreads переводят PR обратно в review follow-up"],
    ["Manual", "Этот authorization copy не выполняет merge action автоматически"],
  ],
};

const prPostAuthorizationMergeExecutionChecklistCopy = {
  route: "/plan",
  branch: prOwnerMergeAuthorizationCopy.branch,
  baseBranch: prOwnerMergeAuthorizationCopy.baseBranch,
  command: prOwnerMergeAuthorizationCopy.command,
  ownerAuthorizationSelector: "[data-testid='pr-owner-merge-authorization-copy']",
  checklistScope: "PR #17 post-authorization merge execution checklist copy",
  expectedCheckGroups: prOwnerMergeAuthorizationCopy.expectedCheckGroups,
  expectedConclusion: prOwnerMergeAuthorizationCopy.expectedConclusion,
  expectedMergeState: prOwnerMergeAuthorizationCopy.expectedMergeState,
  expectedPrComments: prOwnerMergeAuthorizationCopy.expectedPrComments,
  expectedReviewDecision: prOwnerMergeAuthorizationCopy.expectedReviewDecision,
  expectedReviews: prOwnerMergeAuthorizationCopy.expectedReviews,
  expectedReviewThreads: prOwnerMergeAuthorizationCopy.expectedReviewThreads,
  expectedUnresolvedThreads: prOwnerMergeAuthorizationCopy.expectedUnresolvedThreads,
  linkSelector: "[data-testid='pr-post-authorization-merge-execution-checklist-anchor']",
  noMergeCopy:
    "Post-authorization merge execution checklist описывает ручную sequence, но не выполняет merge, auto-merge, GitHub approval submission, branch deletion или push в main",
  ownerRole: "Release owner + Repo admin",
  checklistCopy:
    "Post-authorization merge execution checklist для PR #17: перед ручным merge повторно сверить owner approve-to-merge, CLEAN, SUCCESS checks, нулевые review counters, выбранный merge method и rollback contact; если любой пункт изменился, остановить execution",
  prHref: prOwnerMergeAuthorizationCopy.prHref,
  releaseScope: prOwnerMergeAuthorizationCopy.releaseScope,
  repairTargets:
    "PR #17,post-authorization merge execution checklist,owner merge authorization,CLEAN,SUCCESS,manual merge method,apps/web/scripts/smoke.mjs,/plan",
  sourceMarkerSelector: "[data-testid='pr-owner-merge-authorization-copy']",
  status: "execution-checklist-ready",
  executionSteps: [
    "Recheck owner approve-to-merge",
    "Recheck PR #17 CLEAN and SUCCESS checks",
    "Confirm merge method and rollback owner",
    "Stop if review counters or CI changed",
  ],
  checks: [
    ["Recheck", "Перед execution повторно проверить CLEAN, SUCCESS и review counters"],
    ["Method", "Owner должен явно выбрать merge method: squash, merge commit или rebase"],
    ["Rollback", "Назначить rollback contact до ручного merge action"],
    ["Stop", "Checklist останавливает execution при новых comments, reviews или failed checks"],
  ],
};

const prPostMergeVerificationChecklistCopy = {
  route: "/plan",
  branch: prPostAuthorizationMergeExecutionChecklistCopy.branch,
  baseBranch: prPostAuthorizationMergeExecutionChecklistCopy.baseBranch,
  command: prPostAuthorizationMergeExecutionChecklistCopy.command,
  executionChecklistSelector: "[data-testid='pr-post-authorization-merge-execution-checklist-copy']",
  verificationScope: "PR #17 post-merge verification checklist copy",
  expectedCheckGroups: prPostAuthorizationMergeExecutionChecklistCopy.expectedCheckGroups,
  expectedConclusion: prPostAuthorizationMergeExecutionChecklistCopy.expectedConclusion,
  expectedMergeState: prPostAuthorizationMergeExecutionChecklistCopy.expectedMergeState,
  expectedPrComments: prPostAuthorizationMergeExecutionChecklistCopy.expectedPrComments,
  expectedReviewDecision: prPostAuthorizationMergeExecutionChecklistCopy.expectedReviewDecision,
  expectedReviews: prPostAuthorizationMergeExecutionChecklistCopy.expectedReviews,
  expectedReviewThreads: prPostAuthorizationMergeExecutionChecklistCopy.expectedReviewThreads,
  expectedUnresolvedThreads: prPostAuthorizationMergeExecutionChecklistCopy.expectedUnresolvedThreads,
  linkSelector: "[data-testid='pr-post-merge-verification-checklist-anchor']",
  noMergeCopy:
    "Post-merge verification checklist является условным handoff после ручного merge; он не выполняет merge, не пушит main, не удаляет branch и не меняет release state",
  ownerRole: "Release owner + QA owner",
  verificationCopy:
    "Post-merge verification checklist для PR #17: после ручного merge проверить main Web build/API smoke/Shared validation, /plan smoke, отсутствие новых review counters, release note и rollback contact; если merge не выполнен, checklist остается standby",
  prHref: prPostAuthorizationMergeExecutionChecklistCopy.prHref,
  releaseScope: prPostAuthorizationMergeExecutionChecklistCopy.releaseScope,
  repairTargets:
    "PR #17,post-merge verification checklist,post-authorization merge execution checklist,main checks,release note,rollback contact,apps/web/scripts/smoke.mjs,/plan",
  sourceMarkerSelector: "[data-testid='pr-post-authorization-merge-execution-checklist-copy']",
  status: "verification-checklist-standby",
  verificationSteps: [
    "Confirm manual merge completed by owner",
    "Verify main Web build, API smoke, Shared validation",
    "Run /plan smoke after main deploy",
    "Record release note and rollback contact",
  ],
  checks: [
    ["Merge", "Verification starts only after owner confirms manual merge completed"],
    ["Main", "Проверить main checks и smoke после merge/deploy"],
    ["Release", "Зафиксировать release note, rollback contact и owner timestamp"],
    ["Standby", "До фактического merge этот checklist остается standby и ничего не меняет"],
  ],
};

const prReleaseArchiveHandoffCopy = {
  route: "/plan",
  branch: prPostMergeVerificationChecklistCopy.branch,
  baseBranch: prPostMergeVerificationChecklistCopy.baseBranch,
  command: prPostMergeVerificationChecklistCopy.command,
  postMergeVerificationSelector: "[data-testid='pr-post-merge-verification-checklist-copy']",
  archiveScope: "PR #17 release archive handoff copy",
  expectedCheckGroups: prPostMergeVerificationChecklistCopy.expectedCheckGroups,
  expectedConclusion: prPostMergeVerificationChecklistCopy.expectedConclusion,
  expectedMergeState: prPostMergeVerificationChecklistCopy.expectedMergeState,
  expectedPrComments: prPostMergeVerificationChecklistCopy.expectedPrComments,
  expectedReviewDecision: prPostMergeVerificationChecklistCopy.expectedReviewDecision,
  expectedReviews: prPostMergeVerificationChecklistCopy.expectedReviews,
  expectedReviewThreads: prPostMergeVerificationChecklistCopy.expectedReviewThreads,
  expectedUnresolvedThreads: prPostMergeVerificationChecklistCopy.expectedUnresolvedThreads,
  linkSelector: "[data-testid='pr-release-archive-handoff-anchor']",
  noBranchDeleteCopy:
    "Release archive handoff только описывает archive evidence; branch deletion, PR close, release tagging и main push остаются отдельными owner actions",
  ownerRole: "Release owner + QA owner + Repo admin",
  archiveCopy:
    "Release archive handoff для PR #17: после подтвержденного merge и post-merge verification сохранить release note, CI links, /plan smoke evidence, rollback contact и owner timestamp; если merge не выполнен, archive остается standby",
  prHref: prPostMergeVerificationChecklistCopy.prHref,
  releaseScope: prPostMergeVerificationChecklistCopy.releaseScope,
  repairTargets:
    "PR #17,release archive handoff,post-merge verification checklist,release note,CI links,rollback contact,apps/web/scripts/smoke.mjs,/plan",
  sourceMarkerSelector: "[data-testid='pr-post-merge-verification-checklist-copy']",
  status: "archive-handoff-standby",
  archiveEvidence: [
    "Release note",
    "CI links for Web build, API smoke, Shared validation",
    "/plan smoke evidence",
    "Rollback contact and owner timestamp",
  ],
  checks: [
    ["Evidence", "Archive требует release note, CI links, smoke evidence и rollback contact"],
    ["Timing", "Archive handoff активируется только после confirmed merge и post-merge verification"],
    ["Branch", "Branch deletion не выполняется этим handoff"],
    ["Closeout", "Следующий шаг готовит final PR closeout note без закрытия PR"],
  ],
};

const prFinalPrCloseoutNoteCopy = {
  route: "/plan",
  branch: prReleaseArchiveHandoffCopy.branch,
  baseBranch: prReleaseArchiveHandoffCopy.baseBranch,
  command: prReleaseArchiveHandoffCopy.command,
  archiveHandoffSelector: "[data-testid='pr-release-archive-handoff-copy']",
  closeoutScope: "PR #17 final PR closeout note copy",
  expectedCheckGroups: prReleaseArchiveHandoffCopy.expectedCheckGroups,
  expectedConclusion: prReleaseArchiveHandoffCopy.expectedConclusion,
  expectedMergeState: prReleaseArchiveHandoffCopy.expectedMergeState,
  expectedPrComments: prReleaseArchiveHandoffCopy.expectedPrComments,
  expectedReviewDecision: prReleaseArchiveHandoffCopy.expectedReviewDecision,
  expectedReviews: prReleaseArchiveHandoffCopy.expectedReviews,
  expectedReviewThreads: prReleaseArchiveHandoffCopy.expectedReviewThreads,
  expectedUnresolvedThreads: prReleaseArchiveHandoffCopy.expectedUnresolvedThreads,
  linkSelector: "[data-testid='pr-final-pr-closeout-note-anchor']",
  noCloseCopy:
    "Final PR closeout note только готовит owner-facing summary; PR close, merge, release tagging, branch deletion и main push остаются отдельными owner actions",
  ownerRole: "Release owner + Repo admin",
  closeoutCopy:
    "Final PR closeout note для PR #17: зафиксировать CLEAN PR, SUCCESS checks, review counters=0, archive handoff evidence и next owner action; если owner signoff/merge не выполнены, closeout остается standby",
  prHref: prReleaseArchiveHandoffCopy.prHref,
  releaseScope: prReleaseArchiveHandoffCopy.releaseScope,
  repairTargets:
    "PR #17,final PR closeout note,release archive handoff,CLEAN PR,SUCCESS checks,review counters,owner action,apps/web/scripts/smoke.mjs,/plan",
  sourceMarkerSelector: "[data-testid='pr-release-archive-handoff-copy']",
  status: "closeout-note-standby",
  closeoutEvidence: [
    "CLEAN PR",
    "SUCCESS statusCheckRollup",
    "reviewThreads=0 comments=0 reviews=0",
    "release archive handoff evidence",
    "next owner action",
  ],
  checks: [
    ["State", "Closeout note фиксирует CLEAN PR и SUCCESS checks без выполнения merge"],
    ["Counters", "Review counters остаются нулевыми перед owner closeout"],
    ["Archive", "Closeout ссылается на release archive handoff evidence"],
    ["Owner", "Следующий шаг описывает branch retention без удаления ветки"],
  ],
};

const prBranchRetentionNoticeCopy = {
  route: "/plan",
  branch: prFinalPrCloseoutNoteCopy.branch,
  baseBranch: prFinalPrCloseoutNoteCopy.baseBranch,
  command: prFinalPrCloseoutNoteCopy.command,
  closeoutSelector: "[data-testid='pr-final-pr-closeout-note-copy']",
  retentionScope: "PR #17 branch retention notice copy",
  expectedCheckGroups: prFinalPrCloseoutNoteCopy.expectedCheckGroups,
  expectedConclusion: prFinalPrCloseoutNoteCopy.expectedConclusion,
  expectedMergeState: prFinalPrCloseoutNoteCopy.expectedMergeState,
  expectedPrComments: prFinalPrCloseoutNoteCopy.expectedPrComments,
  expectedReviewDecision: prFinalPrCloseoutNoteCopy.expectedReviewDecision,
  expectedReviews: prFinalPrCloseoutNoteCopy.expectedReviews,
  expectedReviewThreads: prFinalPrCloseoutNoteCopy.expectedReviewThreads,
  expectedUnresolvedThreads: prFinalPrCloseoutNoteCopy.expectedUnresolvedThreads,
  linkSelector: "[data-testid='pr-branch-retention-notice-anchor']",
  noDeleteCopy:
    "Branch retention notice только фиксирует, что codex/app-site-shell остается доступной для audit trail; branch deletion, archive cleanup, release tagging и main push остаются отдельными owner actions",
  ownerRole: "Repo admin + Release owner",
  retentionCopy:
    "Branch retention notice для PR #17: после final closeout сохранить branch codex/app-site-shell до owner archive/rollback review, не удалять branch автоматически и не закрывать PR этим notice",
  prHref: prFinalPrCloseoutNoteCopy.prHref,
  releaseScope: prFinalPrCloseoutNoteCopy.releaseScope,
  repairTargets:
    "PR #17,branch retention notice,final PR closeout note,codex/app-site-shell,audit trail,rollback review,apps/web/scripts/smoke.mjs,/plan",
  sourceMarkerSelector: "[data-testid='pr-final-pr-closeout-note-copy']",
  status: "branch-retention-standby",
  retentionEvidence: [
    "codex/app-site-shell retained",
    "final closeout note linked",
    "audit trail preserved",
    "rollback review available",
  ],
  checks: [
    ["Branch", "codex/app-site-shell остается доступной для audit trail"],
    ["Delete", "Branch deletion не выполняется автоматически этим notice"],
    ["Rollback", "Rollback review сохраняет доступ к PR branch evidence"],
    ["Next", "Следующий шаг описывает release tag wait-state без создания tag"],
  ],
};

const prReleaseTagWaitStateCopy = {
  route: "/plan",
  branch: prBranchRetentionNoticeCopy.branch,
  baseBranch: prBranchRetentionNoticeCopy.baseBranch,
  command: prBranchRetentionNoticeCopy.command,
  branchRetentionSelector: "[data-testid='pr-branch-retention-notice-copy']",
  tagScope: "PR #17 release tag wait-state copy",
  expectedCheckGroups: prBranchRetentionNoticeCopy.expectedCheckGroups,
  expectedConclusion: prBranchRetentionNoticeCopy.expectedConclusion,
  expectedMergeState: prBranchRetentionNoticeCopy.expectedMergeState,
  expectedPrComments: prBranchRetentionNoticeCopy.expectedPrComments,
  expectedReviewDecision: prBranchRetentionNoticeCopy.expectedReviewDecision,
  expectedReviews: prBranchRetentionNoticeCopy.expectedReviews,
  expectedReviewThreads: prBranchRetentionNoticeCopy.expectedReviewThreads,
  expectedUnresolvedThreads: prBranchRetentionNoticeCopy.expectedUnresolvedThreads,
  linkSelector: "[data-testid='pr-release-tag-wait-state-anchor']",
  noTagCopy:
    "Release tag wait-state только описывает ожидание owner-created tag; git tag, git push --tags, GitHub release creation, deploy trigger и main push остаются отдельными owner actions",
  ownerRole: "Release owner + Repo admin",
  tagCopy:
    "Release tag wait-state для PR #17: после merge/closeout и branch retention ждать owner-created release tag, сверить tag name, source commit и rollback note; если tag не создан owner, wait-state остается standby",
  prHref: prBranchRetentionNoticeCopy.prHref,
  releaseScope: prBranchRetentionNoticeCopy.releaseScope,
  repairTargets:
    "PR #17,release tag wait-state,branch retention notice,owner-created tag,source commit,rollback note,apps/web/scripts/smoke.mjs,/plan",
  sourceMarkerSelector: "[data-testid='pr-branch-retention-notice-copy']",
  status: "release-tag-wait-standby",
  tagEvidence: [
    "owner-created release tag",
    "tag name",
    "source commit",
    "rollback note",
  ],
  checks: [
    ["Wait", "Wait-state активируется только после owner-created release tag"],
    ["Tag", "Этот copy не создает git tag и не пушит tags"],
    ["Source", "Tag evidence должен связать tag name, source commit и rollback note"],
    ["Next", "Следующий шаг описывает post-release monitor без запуска deploy"],
  ],
};

const prPostReleaseMonitorCopy = {
  route: "/plan",
  branch: prReleaseTagWaitStateCopy.branch,
  baseBranch: prReleaseTagWaitStateCopy.baseBranch,
  command: prReleaseTagWaitStateCopy.command,
  releaseTagWaitSelector: "[data-testid='pr-release-tag-wait-state-copy']",
  monitorScope: "PR #17 post-release monitor copy",
  expectedCheckGroups: prReleaseTagWaitStateCopy.expectedCheckGroups,
  expectedConclusion: prReleaseTagWaitStateCopy.expectedConclusion,
  expectedMergeState: prReleaseTagWaitStateCopy.expectedMergeState,
  expectedPrComments: prReleaseTagWaitStateCopy.expectedPrComments,
  expectedReviewDecision: prReleaseTagWaitStateCopy.expectedReviewDecision,
  expectedReviews: prReleaseTagWaitStateCopy.expectedReviews,
  expectedReviewThreads: prReleaseTagWaitStateCopy.expectedReviewThreads,
  expectedUnresolvedThreads: prReleaseTagWaitStateCopy.expectedUnresolvedThreads,
  linkSelector: "[data-testid='pr-post-release-monitor-anchor']",
  noDeployCopy:
    "Post-release monitor copy только описывает observation window; deploy, rollback, incident creation, alert changes и main push остаются отдельными owner actions",
  ownerRole: "Release owner + On-call observer",
  monitorCopy:
    "Post-release monitor для PR #17: после owner-created tag и release note наблюдать Web build, API smoke, shared validation, /plan smoke и rollback contact в течение owner-defined window; если release не выполнен, monitor остается standby",
  prHref: prReleaseTagWaitStateCopy.prHref,
  releaseScope: prReleaseTagWaitStateCopy.releaseScope,
  repairTargets:
    "PR #17,post-release monitor,release tag wait-state,Web build,API smoke,Shared validation,/plan smoke,rollback contact,apps/web/scripts/smoke.mjs,/plan",
  sourceMarkerSelector: "[data-testid='pr-release-tag-wait-state-copy']",
  status: "post-release-monitor-standby",
  monitorEvidence: [
    "Web build",
    "API smoke",
    "Shared validation",
    "/plan smoke",
    "rollback contact",
  ],
  checks: [
    ["Signals", "Monitor смотрит Web build, API smoke, Shared validation и /plan smoke"],
    ["Window", "Observation window задает owner после release tag и release note"],
    ["Deploy", "Этот copy не запускает deploy, rollback или incident"],
    ["Next", "Следующий шаг описывает release incident fallback без открытия incident"],
  ],
};

const prReleaseIncidentFallbackCopy = {
  route: "/plan",
  branch: prPostReleaseMonitorCopy.branch,
  baseBranch: prPostReleaseMonitorCopy.baseBranch,
  command: prPostReleaseMonitorCopy.command,
  postReleaseMonitorSelector: "[data-testid='pr-post-release-monitor-copy']",
  fallbackScope: "PR #17 release incident fallback copy",
  expectedCheckGroups: prPostReleaseMonitorCopy.expectedCheckGroups,
  expectedConclusion: prPostReleaseMonitorCopy.expectedConclusion,
  expectedMergeState: prPostReleaseMonitorCopy.expectedMergeState,
  expectedPrComments: prPostReleaseMonitorCopy.expectedPrComments,
  expectedReviewDecision: prPostReleaseMonitorCopy.expectedReviewDecision,
  expectedReviews: prPostReleaseMonitorCopy.expectedReviews,
  expectedReviewThreads: prPostReleaseMonitorCopy.expectedReviewThreads,
  expectedUnresolvedThreads: prPostReleaseMonitorCopy.expectedUnresolvedThreads,
  linkSelector: "[data-testid='pr-release-incident-fallback-anchor']",
  noIncidentCopy:
    "Release incident fallback copy только описывает escalation text; incident creation, rollback execution, alert changes, deploy changes и main push остаются отдельными owner actions",
  ownerRole: "Release owner + On-call observer",
  fallbackCopy:
    "Release incident fallback для PR #17: если post-release monitor видит failed check, broken /plan smoke или missing rollback contact, собрать signal summary, impacted surface, owner contact и rollback note; если сигналов нет, fallback остается standby",
  prHref: prPostReleaseMonitorCopy.prHref,
  releaseScope: prPostReleaseMonitorCopy.releaseScope,
  repairTargets:
    "PR #17,release incident fallback,post-release monitor,failed check,/plan smoke,rollback contact,owner contact,apps/web/scripts/smoke.mjs,/plan",
  sourceMarkerSelector: "[data-testid='pr-post-release-monitor-copy']",
  status: "incident-fallback-standby",
  fallbackEvidence: [
    "signal summary",
    "impacted surface",
    "owner contact",
    "rollback note",
  ],
  checks: [
    ["Signal", "Fallback описывает failed check, broken /plan smoke или missing rollback contact"],
    ["Summary", "Signal summary связывает impacted surface, owner contact и rollback note"],
    ["Action", "Этот copy не открывает incident и не выполняет rollback"],
    ["Next", "Следующий шаг описывает release retrospective note без docs issue"],
  ],
};

const prReleaseRetrospectiveNoteCopy = {
  route: "/plan",
  branch: prReleaseIncidentFallbackCopy.branch,
  baseBranch: prReleaseIncidentFallbackCopy.baseBranch,
  command: prReleaseIncidentFallbackCopy.command,
  incidentFallbackSelector: "[data-testid='pr-release-incident-fallback-copy']",
  retrospectiveScope: "PR #17 release retrospective note copy",
  expectedCheckGroups: prReleaseIncidentFallbackCopy.expectedCheckGroups,
  expectedConclusion: prReleaseIncidentFallbackCopy.expectedConclusion,
  expectedMergeState: prReleaseIncidentFallbackCopy.expectedMergeState,
  expectedPrComments: prReleaseIncidentFallbackCopy.expectedPrComments,
  expectedReviewDecision: prReleaseIncidentFallbackCopy.expectedReviewDecision,
  expectedReviews: prReleaseIncidentFallbackCopy.expectedReviews,
  expectedReviewThreads: prReleaseIncidentFallbackCopy.expectedReviewThreads,
  expectedUnresolvedThreads: prReleaseIncidentFallbackCopy.expectedUnresolvedThreads,
  linkSelector: "[data-testid='pr-release-retrospective-note-anchor']",
  noDocsIssueCopy:
    "Release retrospective note copy только фиксирует текст заметки; docs issue, GitHub issue, owner assignment, merge action и main push остаются отдельными owner actions",
  ownerRole: "Release owner + Delivery reviewer",
  retrospectiveCopy:
    "Release retrospective note для PR #17: собрать release result, CLEAN PR state, SUCCESS checks, /plan smoke evidence, review counters, rollback contact и standby incident fallback; если release еще не выполнен, note остается draft",
  prHref: prReleaseIncidentFallbackCopy.prHref,
  releaseScope: prReleaseIncidentFallbackCopy.releaseScope,
  repairTargets:
    "PR #17,release retrospective note,release incident fallback,CLEAN PR,SUCCESS checks,/plan smoke,review counters,rollback contact,apps/web/scripts/smoke.mjs,/plan",
  sourceMarkerSelector: "[data-testid='pr-release-incident-fallback-copy']",
  status: "retrospective-note-draft",
  retrospectiveEvidence: [
    "release result",
    "SUCCESS checks",
    "/plan smoke",
    "review counters",
    "rollback contact",
  ],
  checks: [
    ["Result", "Retrospective note связывает release result, CLEAN PR state и SUCCESS checks"],
    ["Evidence", "Note перечисляет /plan smoke, review counters, rollback contact и standby fallback"],
    ["Action", "Этот copy не создает docs issue, GitHub issue или owner assignment"],
    ["Next", "Следующий шаг описывает release lessons learned follow-up без owner actions"],
  ],
};

const prReleaseLessonsLearnedFollowUpCopy = {
  route: "/plan",
  branch: prReleaseRetrospectiveNoteCopy.branch,
  baseBranch: prReleaseRetrospectiveNoteCopy.baseBranch,
  command: prReleaseRetrospectiveNoteCopy.command,
  retrospectiveNoteSelector: "[data-testid='pr-release-retrospective-note-copy']",
  lessonsScope: "PR #17 release lessons learned follow-up copy",
  expectedCheckGroups: prReleaseRetrospectiveNoteCopy.expectedCheckGroups,
  expectedConclusion: prReleaseRetrospectiveNoteCopy.expectedConclusion,
  expectedMergeState: prReleaseRetrospectiveNoteCopy.expectedMergeState,
  expectedPrComments: prReleaseRetrospectiveNoteCopy.expectedPrComments,
  expectedReviewDecision: prReleaseRetrospectiveNoteCopy.expectedReviewDecision,
  expectedReviews: prReleaseRetrospectiveNoteCopy.expectedReviews,
  expectedReviewThreads: prReleaseRetrospectiveNoteCopy.expectedReviewThreads,
  expectedUnresolvedThreads: prReleaseRetrospectiveNoteCopy.expectedUnresolvedThreads,
  linkSelector: "[data-testid='pr-release-lessons-learned-anchor']",
  noOwnerActionCopy:
    "Release lessons learned follow-up copy только описывает follow-up text; owner actions, task creation, docs issue, backlog mutation, merge action и main push остаются отдельными owner actions",
  ownerRole: "Release owner + Delivery reviewer",
  lessonsCopy:
    "Release lessons learned follow-up для PR #17: после retrospective note собрать what worked, watchouts, evidence gaps, follow-up candidates и monitoring reminder; если release еще не выполнен, follow-up остается draft",
  prHref: prReleaseRetrospectiveNoteCopy.prHref,
  releaseScope: prReleaseRetrospectiveNoteCopy.releaseScope,
  repairTargets:
    "PR #17,release lessons learned,release retrospective note,what worked,watchouts,evidence gaps,follow-up candidates,monitoring reminder,apps/web/scripts/smoke.mjs,/plan",
  sourceMarkerSelector: "[data-testid='pr-release-retrospective-note-copy']",
  status: "lessons-learned-draft",
  lessonsEvidence: [
    "what worked",
    "watchouts",
    "evidence gaps",
    "follow-up candidates",
    "monitoring reminder",
  ],
  checks: [
    ["Learn", "Lessons learned связывает what worked, watchouts и evidence gaps"],
    ["Follow-up", "Follow-up candidates остаются текстом без task creation или backlog mutation"],
    ["Action", "Этот copy не назначает owner actions и не создает docs issue"],
    ["Next", "Следующий шаг описывает release action items backlog без создания задач"],
  ],
};

const prReleaseActionItemsBacklogCopy = {
  route: "/plan",
  branch: prReleaseLessonsLearnedFollowUpCopy.branch,
  baseBranch: prReleaseLessonsLearnedFollowUpCopy.baseBranch,
  command: prReleaseLessonsLearnedFollowUpCopy.command,
  lessonsLearnedSelector: "[data-testid='pr-release-lessons-learned-follow-up-copy']",
  backlogScope: "PR #17 release action items backlog copy",
  expectedCheckGroups: prReleaseLessonsLearnedFollowUpCopy.expectedCheckGroups,
  expectedConclusion: prReleaseLessonsLearnedFollowUpCopy.expectedConclusion,
  expectedMergeState: prReleaseLessonsLearnedFollowUpCopy.expectedMergeState,
  expectedPrComments: prReleaseLessonsLearnedFollowUpCopy.expectedPrComments,
  expectedReviewDecision: prReleaseLessonsLearnedFollowUpCopy.expectedReviewDecision,
  expectedReviews: prReleaseLessonsLearnedFollowUpCopy.expectedReviews,
  expectedReviewThreads: prReleaseLessonsLearnedFollowUpCopy.expectedReviewThreads,
  expectedUnresolvedThreads: prReleaseLessonsLearnedFollowUpCopy.expectedUnresolvedThreads,
  linkSelector: "[data-testid='pr-release-action-items-backlog-anchor']",
  noTaskCreationCopy:
    "Release action items backlog copy только описывает backlog text; task creation, GitHub issue creation, owner assignment, alert changes, merge action и main push остаются отдельными owner actions",
  ownerRole: "Release owner + Delivery reviewer",
  backlogCopy:
    "Release action items backlog для PR #17: из lessons learned выписать follow-up candidates, evidence gaps, monitoring reminder, owner-question и suggested priority; если release еще не выполнен, backlog остается draft",
  prHref: prReleaseLessonsLearnedFollowUpCopy.prHref,
  releaseScope: prReleaseLessonsLearnedFollowUpCopy.releaseScope,
  repairTargets:
    "PR #17,release action items backlog,release lessons learned,follow-up candidates,evidence gaps,monitoring reminder,owner-question,suggested priority,apps/web/scripts/smoke.mjs,/plan",
  sourceMarkerSelector: "[data-testid='pr-release-lessons-learned-follow-up-copy']",
  status: "action-items-backlog-draft",
  backlogEvidence: [
    "follow-up candidates",
    "evidence gaps",
    "monitoring reminder",
    "owner-question",
    "suggested priority",
  ],
  checks: [
    ["Backlog", "Backlog text связывает follow-up candidates, evidence gaps и monitoring reminder"],
    ["Question", "Owner-question и suggested priority остаются draft без assignment"],
    ["Action", "Этот copy не создает tasks, GitHub issues или alerts"],
    ["Next", "Следующий шаг описывает release action items triage без назначения owner"],
  ],
};

const prReleaseActionItemsTriageCopy = {
  route: "/plan",
  branch: prReleaseActionItemsBacklogCopy.branch,
  baseBranch: prReleaseActionItemsBacklogCopy.baseBranch,
  command: prReleaseActionItemsBacklogCopy.command,
  backlogSelector: "[data-testid='pr-release-action-items-backlog-copy']",
  triageScope: "PR #17 release action items triage copy",
  expectedCheckGroups: prReleaseActionItemsBacklogCopy.expectedCheckGroups,
  expectedConclusion: prReleaseActionItemsBacklogCopy.expectedConclusion,
  expectedMergeState: prReleaseActionItemsBacklogCopy.expectedMergeState,
  expectedPrComments: prReleaseActionItemsBacklogCopy.expectedPrComments,
  expectedReviewDecision: prReleaseActionItemsBacklogCopy.expectedReviewDecision,
  expectedReviews: prReleaseActionItemsBacklogCopy.expectedReviews,
  expectedReviewThreads: prReleaseActionItemsBacklogCopy.expectedReviewThreads,
  expectedUnresolvedThreads: prReleaseActionItemsBacklogCopy.expectedUnresolvedThreads,
  linkSelector: "[data-testid='pr-release-action-items-triage-anchor']",
  noOwnerAssignmentCopy:
    "Release action items triage copy только описывает triage text; owner assignment, task creation, GitHub issue creation, priority changes, merge action и main push остаются отдельными owner actions",
  ownerRole: "Release owner + Delivery reviewer",
  triageCopy:
    "Release action items triage для PR #17: из backlog draft разложить follow-up candidates по impact, evidence gap, owner-question, suggested priority и monitoring dependency; если release еще не выполнен, triage остается draft",
  prHref: prReleaseActionItemsBacklogCopy.prHref,
  releaseScope: prReleaseActionItemsBacklogCopy.releaseScope,
  repairTargets:
    "PR #17,release action items triage,release action items backlog,impact,evidence gap,owner-question,suggested priority,monitoring dependency,apps/web/scripts/smoke.mjs,/plan",
  sourceMarkerSelector: "[data-testid='pr-release-action-items-backlog-copy']",
  status: "action-items-triage-draft",
  triageEvidence: [
    "impact",
    "evidence gap",
    "owner-question",
    "suggested priority",
    "monitoring dependency",
  ],
  checks: [
    ["Impact", "Triage text связывает impact, evidence gap и monitoring dependency"],
    ["Question", "Owner-question остается вопросом без назначения owner"],
    ["Action", "Этот copy не создает tasks, GitHub issues или priority changes"],
    ["Next", "Следующий шаг описывает release action items owner question без назначения owner"],
  ],
};

const prReleaseActionItemsOwnerQuestionCopy = {
  route: "/plan",
  branch: prReleaseActionItemsTriageCopy.branch,
  baseBranch: prReleaseActionItemsTriageCopy.baseBranch,
  command: prReleaseActionItemsTriageCopy.command,
  triageSelector: "[data-testid='pr-release-action-items-triage-copy']",
  ownerQuestionScope: "PR #17 release action items owner question copy",
  expectedCheckGroups: prReleaseActionItemsTriageCopy.expectedCheckGroups,
  expectedConclusion: prReleaseActionItemsTriageCopy.expectedConclusion,
  expectedMergeState: prReleaseActionItemsTriageCopy.expectedMergeState,
  expectedPrComments: prReleaseActionItemsTriageCopy.expectedPrComments,
  expectedReviewDecision: prReleaseActionItemsTriageCopy.expectedReviewDecision,
  expectedReviews: prReleaseActionItemsTriageCopy.expectedReviews,
  expectedReviewThreads: prReleaseActionItemsTriageCopy.expectedReviewThreads,
  expectedUnresolvedThreads: prReleaseActionItemsTriageCopy.expectedUnresolvedThreads,
  linkSelector: "[data-testid='pr-release-action-items-owner-question-anchor']",
  noOwnerAssignmentCopy:
    "Release action items owner question copy только описывает owner question text; owner assignment, answer capture, task creation, GitHub issue creation, merge action и main push остаются отдельными owner actions",
  ownerRole: "Release owner + Delivery reviewer",
  ownerQuestionCopy:
    "Release action items owner question для PR #17: после triage draft задать owner-safe вопрос о нужном follow-up owner, acceptable evidence, priority signal и monitoring dependency; если owner еще не ответил, вопрос остается draft",
  prHref: prReleaseActionItemsTriageCopy.prHref,
  releaseScope: prReleaseActionItemsTriageCopy.releaseScope,
  repairTargets:
    "PR #17,release action items owner question,release action items triage,follow-up owner,acceptable evidence,priority signal,monitoring dependency,answer capture,apps/web/scripts/smoke.mjs,/plan",
  sourceMarkerSelector: "[data-testid='pr-release-action-items-triage-copy']",
  status: "action-items-owner-question-draft",
  ownerQuestionEvidence: [
    "follow-up owner",
    "acceptable evidence",
    "priority signal",
    "monitoring dependency",
    "answer capture",
  ],
  checks: [
    ["Owner", "Owner question связывает follow-up owner, acceptable evidence и priority signal"],
    ["Evidence", "Monitoring dependency остается частью вопроса без alert changes"],
    ["Action", "Этот copy не назначает owner и не сохраняет answer capture"],
    ["Next", "Следующий шаг описывает release action items owner answer states без назначения owner"],
  ],
};

const prReleaseActionItemsOwnerAnswerCopy = {
  route: "/plan",
  branch: prReleaseActionItemsOwnerQuestionCopy.branch,
  baseBranch: prReleaseActionItemsOwnerQuestionCopy.baseBranch,
  command: prReleaseActionItemsOwnerQuestionCopy.command,
  ownerQuestionSelector: "[data-testid='pr-release-action-items-owner-question-copy']",
  ownerAnswerScope: "PR #17 release action items owner answer copy",
  expectedCheckGroups: prReleaseActionItemsOwnerQuestionCopy.expectedCheckGroups,
  expectedConclusion: prReleaseActionItemsOwnerQuestionCopy.expectedConclusion,
  expectedMergeState: prReleaseActionItemsOwnerQuestionCopy.expectedMergeState,
  expectedPrComments: prReleaseActionItemsOwnerQuestionCopy.expectedPrComments,
  expectedReviewDecision: prReleaseActionItemsOwnerQuestionCopy.expectedReviewDecision,
  expectedReviews: prReleaseActionItemsOwnerQuestionCopy.expectedReviews,
  expectedReviewThreads: prReleaseActionItemsOwnerQuestionCopy.expectedReviewThreads,
  expectedUnresolvedThreads: prReleaseActionItemsOwnerQuestionCopy.expectedUnresolvedThreads,
  linkSelector: "[data-testid='pr-release-action-items-owner-answer-anchor']",
  noAnswerCaptureCopy:
    "Release action items owner answer copy только описывает answer-state text; answer capture, owner assignment, task creation, GitHub issue creation, merge action и main push остаются отдельными owner actions",
  ownerRole: "Release owner + Delivery reviewer",
  ownerAnswerCopy:
    "Release action items owner answer для PR #17: на owner question допустимые draft states — accept follow-up, defer until release, needs evidence и no action; если owner еще не ответил, answer остается unrecorded",
  prHref: prReleaseActionItemsOwnerQuestionCopy.prHref,
  releaseScope: prReleaseActionItemsOwnerQuestionCopy.releaseScope,
  repairTargets:
    "PR #17,release action items owner answer,release action items owner question,accept follow-up,defer until release,needs evidence,no action,unrecorded answer,apps/web/scripts/smoke.mjs,/plan",
  sourceMarkerSelector: "[data-testid='pr-release-action-items-owner-question-copy']",
  status: "action-items-owner-answer-draft",
  ownerAnswerStates: [
    "accept follow-up",
    "defer until release",
    "needs evidence",
    "no action",
    "unrecorded answer",
  ],
  checks: [
    ["Accept", "Owner answer states включают accept follow-up и defer until release"],
    ["Evidence", "Needs evidence остается draft state без изменения evidence gates"],
    ["Action", "Этот copy не записывает answer capture и не назначает owner"],
    ["Next", "Следующий шаг описывает release action items acceptance criteria без создания задач"],
  ],
};

const prReleaseActionItemsAcceptanceCriteriaCopy = {
  route: "/plan",
  branch: prReleaseActionItemsOwnerAnswerCopy.branch,
  baseBranch: prReleaseActionItemsOwnerAnswerCopy.baseBranch,
  command: prReleaseActionItemsOwnerAnswerCopy.command,
  ownerAnswerSelector: "[data-testid='pr-release-action-items-owner-answer-copy']",
  acceptanceCriteriaScope: "PR #17 release action items acceptance criteria copy",
  expectedCheckGroups: prReleaseActionItemsOwnerAnswerCopy.expectedCheckGroups,
  expectedConclusion: prReleaseActionItemsOwnerAnswerCopy.expectedConclusion,
  expectedMergeState: prReleaseActionItemsOwnerAnswerCopy.expectedMergeState,
  expectedPrComments: prReleaseActionItemsOwnerAnswerCopy.expectedPrComments,
  expectedReviewDecision: prReleaseActionItemsOwnerAnswerCopy.expectedReviewDecision,
  expectedReviews: prReleaseActionItemsOwnerAnswerCopy.expectedReviews,
  expectedReviewThreads: prReleaseActionItemsOwnerAnswerCopy.expectedReviewThreads,
  expectedUnresolvedThreads: prReleaseActionItemsOwnerAnswerCopy.expectedUnresolvedThreads,
  linkSelector: "[data-testid='pr-release-action-items-acceptance-criteria-anchor']",
  noTaskCreationCopy:
    "Release action items acceptance criteria copy только описывает criteria text; task creation, issue creation, owner assignment, alert changes, merge action и main push остаются отдельными owner actions",
  ownerRole: "Release owner + Delivery reviewer",
  acceptanceCriteriaCopy:
    "Release action items acceptance criteria для PR #17: action item draft считается готовым к owner action только когда есть accepted owner answer, evidence threshold, priority signal, monitoring dependency и rollback note; до этого criteria остаются draft",
  prHref: prReleaseActionItemsOwnerAnswerCopy.prHref,
  releaseScope: prReleaseActionItemsOwnerAnswerCopy.releaseScope,
  repairTargets:
    "PR #17,release action items acceptance criteria,release action items owner answer,accepted owner answer,evidence threshold,priority signal,monitoring dependency,rollback note,apps/web/scripts/smoke.mjs,/plan",
  sourceMarkerSelector: "[data-testid='pr-release-action-items-owner-answer-copy']",
  status: "action-items-acceptance-criteria-draft",
  acceptanceCriteria: [
    "accepted owner answer",
    "evidence threshold",
    "priority signal",
    "monitoring dependency",
    "rollback note",
  ],
  checks: [
    ["Ready", "Acceptance criteria связывают accepted owner answer и evidence threshold"],
    ["Priority", "Priority signal и monitoring dependency остаются criteria без alert changes"],
    ["Action", "Этот copy не создает tasks, issues или owner assignment"],
    ["Next", "Следующий шаг описывает release action items implementation guardrails без выполнения actions"],
  ],
};

const prReleaseActionItemsImplementationGuardrailsCopy = {
  route: "/plan",
  branch: prReleaseActionItemsAcceptanceCriteriaCopy.branch,
  baseBranch: prReleaseActionItemsAcceptanceCriteriaCopy.baseBranch,
  command: prReleaseActionItemsAcceptanceCriteriaCopy.command,
  acceptanceCriteriaSelector: "[data-testid='pr-release-action-items-acceptance-criteria-copy']",
  implementationGuardrailsScope: "PR #17 release action items implementation guardrails copy",
  expectedCheckGroups: prReleaseActionItemsAcceptanceCriteriaCopy.expectedCheckGroups,
  expectedConclusion: prReleaseActionItemsAcceptanceCriteriaCopy.expectedConclusion,
  expectedMergeState: prReleaseActionItemsAcceptanceCriteriaCopy.expectedMergeState,
  expectedPrComments: prReleaseActionItemsAcceptanceCriteriaCopy.expectedPrComments,
  expectedReviewDecision: prReleaseActionItemsAcceptanceCriteriaCopy.expectedReviewDecision,
  expectedReviews: prReleaseActionItemsAcceptanceCriteriaCopy.expectedReviews,
  expectedReviewThreads: prReleaseActionItemsAcceptanceCriteriaCopy.expectedReviewThreads,
  expectedUnresolvedThreads: prReleaseActionItemsAcceptanceCriteriaCopy.expectedUnresolvedThreads,
  linkSelector: "[data-testid='pr-release-action-items-implementation-guardrails-anchor']",
  noExecutionCopy:
    "Release action items implementation guardrails copy только описывает guardrails text; code changes, task creation, issue creation, owner assignment, merge action и main push остаются отдельными owner actions",
  ownerRole: "Release owner + Delivery reviewer",
  implementationGuardrailsCopy:
    "Release action items implementation guardrails для PR #17: перед любым action item implementation проверить accepted criteria, scoped change, dry-run check, owner confirmation и rollback path; пока owner action не подтвержден, implementation не выполняется",
  prHref: prReleaseActionItemsAcceptanceCriteriaCopy.prHref,
  releaseScope: prReleaseActionItemsAcceptanceCriteriaCopy.releaseScope,
  repairTargets:
    "PR #17,release action items implementation guardrails,release action items acceptance criteria,accepted criteria,scoped change,dry-run check,owner confirmation,rollback path,apps/web/scripts/smoke.mjs,/plan",
  sourceMarkerSelector: "[data-testid='pr-release-action-items-acceptance-criteria-copy']",
  status: "action-items-implementation-guardrails-draft",
  implementationGuardrails: [
    "accepted criteria",
    "scoped change",
    "dry-run check",
    "owner confirmation",
    "rollback path",
  ],
  checks: [
    ["Scope", "Guardrails связывают accepted criteria, scoped change и dry-run check"],
    ["Owner", "Owner confirmation остается prerequisite без выполнения actions"],
    ["Action", "Этот copy не меняет code, tasks, issues или main"],
    ["Next", "Следующий шаг описывает release action items tracking handoff без создания задач"],
  ],
};

const prReleaseActionItemsTrackingHandoffCopy = {
  route: "/plan",
  branch: prReleaseActionItemsImplementationGuardrailsCopy.branch,
  baseBranch: prReleaseActionItemsImplementationGuardrailsCopy.baseBranch,
  command: prReleaseActionItemsImplementationGuardrailsCopy.command,
  implementationGuardrailsSelector: "[data-testid='pr-release-action-items-implementation-guardrails-copy']",
  trackingHandoffScope: "PR #17 release action items tracking handoff copy",
  expectedCheckGroups: prReleaseActionItemsImplementationGuardrailsCopy.expectedCheckGroups,
  expectedConclusion: prReleaseActionItemsImplementationGuardrailsCopy.expectedConclusion,
  expectedMergeState: prReleaseActionItemsImplementationGuardrailsCopy.expectedMergeState,
  expectedPrComments: prReleaseActionItemsImplementationGuardrailsCopy.expectedPrComments,
  expectedReviewDecision: prReleaseActionItemsImplementationGuardrailsCopy.expectedReviewDecision,
  expectedReviews: prReleaseActionItemsImplementationGuardrailsCopy.expectedReviews,
  expectedReviewThreads: prReleaseActionItemsImplementationGuardrailsCopy.expectedReviewThreads,
  expectedUnresolvedThreads: prReleaseActionItemsImplementationGuardrailsCopy.expectedUnresolvedThreads,
  linkSelector: "[data-testid='pr-release-action-items-tracking-handoff-anchor']",
  noTaskCreationCopy:
    "Release action items tracking handoff copy только описывает tracking handoff text; tracker mutation, task creation, issue creation, owner assignment, merge action и main push остаются отдельными owner actions",
  ownerRole: "Release owner + Delivery reviewer",
  trackingHandoffCopy:
    "Release action items tracking handoff для PR #17: после implementation guardrails подготовить draft handoff с tracking target, status owner, evidence link, check cadence и rollback contact; пока owner action не подтвержден, tracker не изменяется",
  prHref: prReleaseActionItemsImplementationGuardrailsCopy.prHref,
  releaseScope: prReleaseActionItemsImplementationGuardrailsCopy.releaseScope,
  repairTargets:
    "PR #17,release action items tracking handoff,release action items implementation guardrails,tracking target,status owner,evidence link,check cadence,rollback contact,apps/web/scripts/smoke.mjs,/plan",
  sourceMarkerSelector: "[data-testid='pr-release-action-items-implementation-guardrails-copy']",
  status: "action-items-tracking-handoff-draft",
  trackingHandoffFields: [
    "tracking target",
    "status owner",
    "evidence link",
    "check cadence",
    "rollback contact",
  ],
  checks: [
    ["Target", "Tracking handoff связывает tracking target, status owner и evidence link"],
    ["Cadence", "Check cadence и rollback contact остаются handoff text без tracker mutation"],
    ["Action", "Этот copy не создает tasks, issues или owner assignment"],
    ["Next", "Следующий шаг описывает release action items status rollup без изменения статусов"],
  ],
};

const prReleaseActionItemsStatusRollupCopy = {
  route: "/plan",
  branch: prReleaseActionItemsTrackingHandoffCopy.branch,
  baseBranch: prReleaseActionItemsTrackingHandoffCopy.baseBranch,
  command: prReleaseActionItemsTrackingHandoffCopy.command,
  trackingHandoffSelector: "[data-testid='pr-release-action-items-tracking-handoff-copy']",
  statusRollupScope: "PR #17 release action items status rollup copy",
  expectedCheckGroups: prReleaseActionItemsTrackingHandoffCopy.expectedCheckGroups,
  expectedConclusion: prReleaseActionItemsTrackingHandoffCopy.expectedConclusion,
  expectedMergeState: prReleaseActionItemsTrackingHandoffCopy.expectedMergeState,
  expectedPrComments: prReleaseActionItemsTrackingHandoffCopy.expectedPrComments,
  expectedReviewDecision: prReleaseActionItemsTrackingHandoffCopy.expectedReviewDecision,
  expectedReviews: prReleaseActionItemsTrackingHandoffCopy.expectedReviews,
  expectedReviewThreads: prReleaseActionItemsTrackingHandoffCopy.expectedReviewThreads,
  expectedUnresolvedThreads: prReleaseActionItemsTrackingHandoffCopy.expectedUnresolvedThreads,
  linkSelector: "[data-testid='pr-release-action-items-status-rollup-anchor']",
  noStatusMutationCopy:
    "Release action items status rollup copy только описывает rollup text; tracker mutation, status field update, task closure, issue creation, merge action и main push остаются отдельными owner actions",
  ownerRole: "Release owner + Delivery reviewer",
  statusRollupCopy:
    "Release action items status rollup для PR #17: после tracking handoff подготовить draft rollup с current state, blocked reason, next owner action, evidence freshness и follow-up window; пока owner action не подтвержден, статусы не изменяются",
  prHref: prReleaseActionItemsTrackingHandoffCopy.prHref,
  releaseScope: prReleaseActionItemsTrackingHandoffCopy.releaseScope,
  repairTargets:
    "PR #17,release action items status rollup,release action items tracking handoff,current state,blocked reason,next owner action,evidence freshness,follow-up window,apps/web/scripts/smoke.mjs,/plan",
  sourceMarkerSelector: "[data-testid='pr-release-action-items-tracking-handoff-copy']",
  status: "action-items-status-rollup-draft",
  statusRollupFields: [
    "current state",
    "blocked reason",
    "next owner action",
    "evidence freshness",
    "follow-up window",
  ],
  checks: [
    ["State", "Status rollup связывает current state, blocked reason и next owner action"],
    ["Evidence", "Evidence freshness и follow-up window остаются rollup text без status update"],
    ["Action", "Этот copy не меняет tracker, tasks, issues или status fields"],
    ["Next", "Следующий шаг описывает release action items closure note без закрытия задач"],
  ],
};

const prReleaseActionItemsClosureNoteCopy = {
  route: "/plan",
  branch: prReleaseActionItemsStatusRollupCopy.branch,
  baseBranch: prReleaseActionItemsStatusRollupCopy.baseBranch,
  command: prReleaseActionItemsStatusRollupCopy.command,
  statusRollupSelector: "[data-testid='pr-release-action-items-status-rollup-copy']",
  closureNoteScope: "PR #17 release action items closure note copy",
  expectedCheckGroups: prReleaseActionItemsStatusRollupCopy.expectedCheckGroups,
  expectedConclusion: prReleaseActionItemsStatusRollupCopy.expectedConclusion,
  expectedMergeState: prReleaseActionItemsStatusRollupCopy.expectedMergeState,
  expectedPrComments: prReleaseActionItemsStatusRollupCopy.expectedPrComments,
  expectedReviewDecision: prReleaseActionItemsStatusRollupCopy.expectedReviewDecision,
  expectedReviews: prReleaseActionItemsStatusRollupCopy.expectedReviews,
  expectedReviewThreads: prReleaseActionItemsStatusRollupCopy.expectedReviewThreads,
  expectedUnresolvedThreads: prReleaseActionItemsStatusRollupCopy.expectedUnresolvedThreads,
  linkSelector: "[data-testid='pr-release-action-items-closure-note-anchor']",
  noClosureMutationCopy:
    "Release action items closure note copy только описывает closure note text; task closure, tracker mutation, status field update, issue closure, merge action и main push остаются отдельными owner actions",
  ownerRole: "Release owner + Delivery reviewer",
  closureNoteCopy:
    "Release action items closure note для PR #17: после status rollup подготовить draft note с closure condition, final evidence, owner signoff, residual risk и reopen trigger; пока owner action не подтвержден, задачи не закрываются",
  prHref: prReleaseActionItemsStatusRollupCopy.prHref,
  releaseScope: prReleaseActionItemsStatusRollupCopy.releaseScope,
  repairTargets:
    "PR #17,release action items closure note,release action items status rollup,closure condition,final evidence,owner signoff,residual risk,reopen trigger,apps/web/scripts/smoke.mjs,/plan",
  sourceMarkerSelector: "[data-testid='pr-release-action-items-status-rollup-copy']",
  status: "action-items-closure-note-draft",
  closureNoteFields: [
    "closure condition",
    "final evidence",
    "owner signoff",
    "residual risk",
    "reopen trigger",
  ],
  checks: [
    ["Condition", "Closure note связывает closure condition, final evidence и owner signoff"],
    ["Risk", "Residual risk и reopen trigger остаются note text без task closure"],
    ["Action", "Этот copy не закрывает tasks, issues, tracker или status fields"],
    ["Next", "Следующий шаг описывает release action items archive note без архивирования"],
  ],
};

const prReleaseActionItemsArchiveNoteCopy = {
  route: "/plan",
  branch: prReleaseActionItemsClosureNoteCopy.branch,
  baseBranch: prReleaseActionItemsClosureNoteCopy.baseBranch,
  command: prReleaseActionItemsClosureNoteCopy.command,
  closureNoteSelector: "[data-testid='pr-release-action-items-closure-note-copy']",
  archiveNoteScope: "PR #17 release action items archive note copy",
  expectedCheckGroups: prReleaseActionItemsClosureNoteCopy.expectedCheckGroups,
  expectedConclusion: prReleaseActionItemsClosureNoteCopy.expectedConclusion,
  expectedMergeState: prReleaseActionItemsClosureNoteCopy.expectedMergeState,
  expectedPrComments: prReleaseActionItemsClosureNoteCopy.expectedPrComments,
  expectedReviewDecision: prReleaseActionItemsClosureNoteCopy.expectedReviewDecision,
  expectedReviews: prReleaseActionItemsClosureNoteCopy.expectedReviews,
  expectedReviewThreads: prReleaseActionItemsClosureNoteCopy.expectedReviewThreads,
  expectedUnresolvedThreads: prReleaseActionItemsClosureNoteCopy.expectedUnresolvedThreads,
  linkSelector: "[data-testid='pr-release-action-items-archive-note-anchor']",
  noArchiveMutationCopy:
    "Release action items archive note copy только описывает archive note text; archive action, tracker mutation, status field update, task closure, merge action и main push остаются отдельными owner actions",
  ownerRole: "Release owner + Delivery reviewer",
  archiveNoteCopy:
    "Release action items archive note для PR #17: после closure note подготовить draft archive note с archive reason, retained evidence, owner record, lookup path и restore trigger; пока owner action не подтвержден, ничего не архивируется",
  prHref: prReleaseActionItemsClosureNoteCopy.prHref,
  releaseScope: prReleaseActionItemsClosureNoteCopy.releaseScope,
  repairTargets:
    "PR #17,release action items archive note,release action items closure note,archive reason,retained evidence,owner record,lookup path,restore trigger,apps/web/scripts/smoke.mjs,/plan",
  sourceMarkerSelector: "[data-testid='pr-release-action-items-closure-note-copy']",
  status: "action-items-archive-note-draft",
  archiveNoteFields: [
    "archive reason",
    "retained evidence",
    "owner record",
    "lookup path",
    "restore trigger",
  ],
  checks: [
    ["Reason", "Archive note связывает archive reason, retained evidence и owner record"],
    ["Restore", "Lookup path и restore trigger остаются note text без archive action"],
    ["Action", "Этот copy не архивирует tasks, issues, tracker или status fields"],
    ["Next", "Следующий шаг описывает release action items handover summary без передачи владения"],
  ],
};

const prReleaseActionItemsHandoverSummaryCopy = {
  route: "/plan",
  branch: prReleaseActionItemsArchiveNoteCopy.branch,
  baseBranch: prReleaseActionItemsArchiveNoteCopy.baseBranch,
  command: prReleaseActionItemsArchiveNoteCopy.command,
  archiveNoteSelector: "[data-testid='pr-release-action-items-archive-note-copy']",
  handoverSummaryScope: "PR #17 release action items handover summary copy",
  expectedCheckGroups: prReleaseActionItemsArchiveNoteCopy.expectedCheckGroups,
  expectedConclusion: prReleaseActionItemsArchiveNoteCopy.expectedConclusion,
  expectedMergeState: prReleaseActionItemsArchiveNoteCopy.expectedMergeState,
  expectedPrComments: prReleaseActionItemsArchiveNoteCopy.expectedPrComments,
  expectedReviewDecision: prReleaseActionItemsArchiveNoteCopy.expectedReviewDecision,
  expectedReviews: prReleaseActionItemsArchiveNoteCopy.expectedReviews,
  expectedReviewThreads: prReleaseActionItemsArchiveNoteCopy.expectedReviewThreads,
  expectedUnresolvedThreads: prReleaseActionItemsArchiveNoteCopy.expectedUnresolvedThreads,
  linkSelector: "[data-testid='pr-release-action-items-handover-summary-anchor']",
  noOwnerTransferCopy:
    "Release action items handover summary copy только описывает handover text; owner transfer, tracker mutation, status field update, assignment change, merge action и main push остаются отдельными owner actions",
  ownerRole: "Release owner + Delivery reviewer",
  handoverSummaryCopy:
    "Release action items handover summary для PR #17: после archive note подготовить draft summary с handover owner, active context, evidence packet, pending decision и return path; пока owner action не подтвержден, владение не передается",
  prHref: prReleaseActionItemsArchiveNoteCopy.prHref,
  releaseScope: prReleaseActionItemsArchiveNoteCopy.releaseScope,
  repairTargets:
    "PR #17,release action items handover summary,release action items archive note,handover owner,active context,evidence packet,pending decision,return path,apps/web/scripts/smoke.mjs,/plan",
  sourceMarkerSelector: "[data-testid='pr-release-action-items-archive-note-copy']",
  status: "action-items-handover-summary-draft",
  handoverSummaryFields: [
    "handover owner",
    "active context",
    "evidence packet",
    "pending decision",
    "return path",
  ],
  checks: [
    ["Owner", "Handover summary связывает handover owner, active context и evidence packet"],
    ["Decision", "Pending decision и return path остаются summary text без owner transfer"],
    ["Action", "Этот copy не меняет owner, assignments, tracker или status fields"],
    ["Next", "Следующий шаг описывает release action items audit trail без записи событий"],
  ],
};

const prReleaseActionItemsAuditTrailCopy = {
  route: "/plan",
  branch: prReleaseActionItemsHandoverSummaryCopy.branch,
  baseBranch: prReleaseActionItemsHandoverSummaryCopy.baseBranch,
  command: prReleaseActionItemsHandoverSummaryCopy.command,
  handoverSummarySelector: "[data-testid='pr-release-action-items-handover-summary-copy']",
  auditTrailScope: "PR #17 release action items audit trail copy",
  expectedCheckGroups: prReleaseActionItemsHandoverSummaryCopy.expectedCheckGroups,
  expectedConclusion: prReleaseActionItemsHandoverSummaryCopy.expectedConclusion,
  expectedMergeState: prReleaseActionItemsHandoverSummaryCopy.expectedMergeState,
  expectedPrComments: prReleaseActionItemsHandoverSummaryCopy.expectedPrComments,
  expectedReviewDecision: prReleaseActionItemsHandoverSummaryCopy.expectedReviewDecision,
  expectedReviews: prReleaseActionItemsHandoverSummaryCopy.expectedReviews,
  expectedReviewThreads: prReleaseActionItemsHandoverSummaryCopy.expectedReviewThreads,
  expectedUnresolvedThreads: prReleaseActionItemsHandoverSummaryCopy.expectedUnresolvedThreads,
  linkSelector: "[data-testid='pr-release-action-items-audit-trail-anchor']",
  noEventWriteCopy:
    "Release action items audit trail copy только описывает audit trail text; event creation, tracker mutation, status field update, assignment change, merge action и main push остаются отдельными owner actions",
  ownerRole: "Release owner + Delivery reviewer",
  auditTrailCopy:
    "Release action items audit trail для PR #17: после handover summary собрать draft chain с source note, evidence packet, owner handoff, decision point и verification link; пока owner action не подтвержден, события не записываются",
  prHref: prReleaseActionItemsHandoverSummaryCopy.prHref,
  releaseScope: prReleaseActionItemsHandoverSummaryCopy.releaseScope,
  repairTargets:
    "PR #17,release action items audit trail,release action items handover summary,source note,evidence packet,owner handoff,decision point,verification link,apps/web/scripts/smoke.mjs,/plan",
  sourceMarkerSelector: "[data-testid='pr-release-action-items-handover-summary-copy']",
  status: "action-items-audit-trail-draft",
  auditTrailFields: [
    "source note",
    "evidence packet",
    "owner handoff",
    "decision point",
    "verification link",
  ],
  checks: [
    ["Chain", "Audit trail связывает source note, evidence packet и owner handoff"],
    ["Decision", "Decision point и verification link остаются trail text без event write"],
    ["Action", "Этот copy не пишет events, tasks, tracker или status fields"],
    ["Next", "Следующий шаг описывает release action items merge readiness bridge без merge request"],
  ],
};

const prReleaseActionItemsMergeReadinessBridgeCopy = {
  route: "/plan",
  branch: prReleaseActionItemsAuditTrailCopy.branch,
  baseBranch: prReleaseActionItemsAuditTrailCopy.baseBranch,
  command: prReleaseActionItemsAuditTrailCopy.command,
  auditTrailSelector: "[data-testid='pr-release-action-items-audit-trail-copy']",
  mergeReadinessBridgeScope: "PR #17 release action items merge readiness bridge copy",
  expectedCheckGroups: prReleaseActionItemsAuditTrailCopy.expectedCheckGroups,
  expectedConclusion: prReleaseActionItemsAuditTrailCopy.expectedConclusion,
  expectedMergeState: prReleaseActionItemsAuditTrailCopy.expectedMergeState,
  expectedPrComments: prReleaseActionItemsAuditTrailCopy.expectedPrComments,
  expectedReviewDecision: prReleaseActionItemsAuditTrailCopy.expectedReviewDecision,
  expectedReviews: prReleaseActionItemsAuditTrailCopy.expectedReviews,
  expectedReviewThreads: prReleaseActionItemsAuditTrailCopy.expectedReviewThreads,
  expectedUnresolvedThreads: prReleaseActionItemsAuditTrailCopy.expectedUnresolvedThreads,
  linkSelector: "[data-testid='pr-release-action-items-merge-readiness-bridge-anchor']",
  noMergeRequestCopy:
    "Release action items merge readiness bridge copy только связывает readiness text; merge request, PR state change, tracker mutation, status field update, main push и branch deletion остаются отдельными owner actions",
  ownerRole: "Release owner + Delivery reviewer",
  bridgeCopy:
    "Release action items merge readiness bridge для PR #17: после audit trail связать readiness note, зеленый statusCheckRollup, review-thread check, owner confirmation и merge request boundary; пока owner action не подтвержден, merge не запрашивается",
  prHref: prReleaseActionItemsAuditTrailCopy.prHref,
  releaseScope: prReleaseActionItemsAuditTrailCopy.releaseScope,
  repairTargets:
    "PR #17,release action items merge readiness bridge,release action items audit trail,merge readiness note,statusCheckRollup,review-thread check,owner confirmation,merge request boundary,apps/web/scripts/smoke.mjs,/plan",
  sourceMarkerSelector: "[data-testid='pr-release-action-items-audit-trail-copy']",
  status: "action-items-merge-readiness-bridge-draft",
  bridgeFields: [
    "readiness note",
    "statusCheckRollup",
    "review-thread check",
    "owner confirmation",
    "merge request boundary",
  ],
  checks: [
    ["Bridge", "Bridge связывает audit trail, readiness note и statusCheckRollup"],
    ["Threads", "Review-thread check и owner confirmation остаются readiness text без merge request"],
    ["Action", "Этот copy не запрашивает merge, не меняет PR state, tracker или main"],
    ["Next", "Следующий шаг описывает release action items merge request handoff без выполнения merge"],
  ],
};

const prReleaseActionItemsMergeRequestHandoffCopy = {
  route: "/plan",
  branch: prReleaseActionItemsMergeReadinessBridgeCopy.branch,
  baseBranch: prReleaseActionItemsMergeReadinessBridgeCopy.baseBranch,
  command: prReleaseActionItemsMergeReadinessBridgeCopy.command,
  mergeReadinessBridgeSelector: "[data-testid='pr-release-action-items-merge-readiness-bridge-copy']",
  mergeRequestHandoffScope: "PR #17 release action items merge request handoff copy",
  expectedCheckGroups: prReleaseActionItemsMergeReadinessBridgeCopy.expectedCheckGroups,
  expectedConclusion: prReleaseActionItemsMergeReadinessBridgeCopy.expectedConclusion,
  expectedMergeState: prReleaseActionItemsMergeReadinessBridgeCopy.expectedMergeState,
  expectedPrComments: prReleaseActionItemsMergeReadinessBridgeCopy.expectedPrComments,
  expectedReviewDecision: prReleaseActionItemsMergeReadinessBridgeCopy.expectedReviewDecision,
  expectedReviews: prReleaseActionItemsMergeReadinessBridgeCopy.expectedReviews,
  expectedReviewThreads: prReleaseActionItemsMergeReadinessBridgeCopy.expectedReviewThreads,
  expectedUnresolvedThreads: prReleaseActionItemsMergeReadinessBridgeCopy.expectedUnresolvedThreads,
  linkSelector: "[data-testid='pr-release-action-items-merge-request-handoff-anchor']",
  noMergeExecutionCopy:
    "Release action items merge request handoff copy только описывает handoff text; merge execution, PR state change, tracker mutation, status field update, main push и branch deletion остаются отдельными owner actions",
  ownerRole: "Release owner + Delivery reviewer",
  handoffCopy:
    "Release action items merge request handoff для PR #17: после merge readiness bridge подготовить draft handoff с requester, readiness evidence, review-thread receipt, merge boundary и rollback contact; пока owner action не подтвержден, merge не выполняется",
  prHref: prReleaseActionItemsMergeReadinessBridgeCopy.prHref,
  releaseScope: prReleaseActionItemsMergeReadinessBridgeCopy.releaseScope,
  repairTargets:
    "PR #17,release action items merge request handoff,release action items merge readiness bridge,requester,readiness evidence,review-thread receipt,merge boundary,rollback contact,apps/web/scripts/smoke.mjs,/plan",
  sourceMarkerSelector: "[data-testid='pr-release-action-items-merge-readiness-bridge-copy']",
  status: "action-items-merge-request-handoff-draft",
  handoffFields: [
    "requester",
    "readiness evidence",
    "review-thread receipt",
    "merge boundary",
    "rollback contact",
  ],
  checks: [
    ["Requester", "Handoff связывает requester, readiness evidence и review-thread receipt"],
    ["Boundary", "Merge boundary и rollback contact остаются handoff text без merge execution"],
    ["Action", "Этот copy не выполняет merge, не меняет PR state, tracker или main"],
    ["Next", "Следующий шаг описывает release action items post-merge monitor handoff без выполнения merge"],
  ],
};

const prReleaseActionItemsPostMergeMonitorHandoffCopy = {
  route: "/plan",
  branch: prReleaseActionItemsMergeRequestHandoffCopy.branch,
  baseBranch: prReleaseActionItemsMergeRequestHandoffCopy.baseBranch,
  command: prReleaseActionItemsMergeRequestHandoffCopy.command,
  mergeRequestHandoffSelector: "[data-testid='pr-release-action-items-merge-request-handoff-copy']",
  postMergeMonitorHandoffScope: "PR #17 release action items post-merge monitor handoff copy",
  expectedCheckGroups: prReleaseActionItemsMergeRequestHandoffCopy.expectedCheckGroups,
  expectedConclusion: prReleaseActionItemsMergeRequestHandoffCopy.expectedConclusion,
  expectedMergeState: prReleaseActionItemsMergeRequestHandoffCopy.expectedMergeState,
  expectedPrComments: prReleaseActionItemsMergeRequestHandoffCopy.expectedPrComments,
  expectedReviewDecision: prReleaseActionItemsMergeRequestHandoffCopy.expectedReviewDecision,
  expectedReviews: prReleaseActionItemsMergeRequestHandoffCopy.expectedReviews,
  expectedReviewThreads: prReleaseActionItemsMergeRequestHandoffCopy.expectedReviewThreads,
  expectedUnresolvedThreads: prReleaseActionItemsMergeRequestHandoffCopy.expectedUnresolvedThreads,
  linkSelector: "[data-testid='pr-release-action-items-post-merge-monitor-handoff-anchor']",
  noMonitorExecutionCopy:
    "Release action items post-merge monitor handoff copy только описывает monitoring handoff text; merge execution, monitor activation, event creation, tracker mutation, status field update и main push остаются отдельными owner actions",
  ownerRole: "Release owner + Delivery reviewer",
  monitorHandoffCopy:
    "Release action items post-merge monitor handoff для PR #17: после merge request handoff подготовить draft handoff с monitor owner, check window, signal source, rollback trigger и evidence receipt path; пока owner action не подтвержден, post-merge monitoring не запускается",
  prHref: prReleaseActionItemsMergeRequestHandoffCopy.prHref,
  releaseScope: prReleaseActionItemsMergeRequestHandoffCopy.releaseScope,
  repairTargets:
    "PR #17,release action items post-merge monitor handoff,release action items merge request handoff,monitor owner,check window,signal source,rollback trigger,evidence receipt path,apps/web/scripts/smoke.mjs,/plan",
  sourceMarkerSelector: "[data-testid='pr-release-action-items-merge-request-handoff-copy']",
  status: "action-items-post-merge-monitor-handoff-draft",
  monitorHandoffFields: [
    "monitor owner",
    "check window",
    "signal source",
    "rollback trigger",
    "evidence receipt path",
  ],
  checks: [
    ["Owner", "Monitor handoff связывает monitor owner, check window и signal source"],
    ["Rollback", "Rollback trigger и evidence receipt path остаются handoff text без monitor activation"],
    ["Action", "Этот copy не выполняет merge, не запускает monitoring, не пишет events или tracker"],
    ["Next", "Следующий шаг описывает release action items post-merge evidence receipt без записи событий"],
  ],
};

const prReleaseActionItemsPostMergeEvidenceReceiptCopy = {
  route: "/plan",
  branch: prReleaseActionItemsPostMergeMonitorHandoffCopy.branch,
  baseBranch: prReleaseActionItemsPostMergeMonitorHandoffCopy.baseBranch,
  command: prReleaseActionItemsPostMergeMonitorHandoffCopy.command,
  postMergeMonitorHandoffSelector: "[data-testid='pr-release-action-items-post-merge-monitor-handoff-copy']",
  postMergeEvidenceReceiptScope: "PR #17 release action items post-merge evidence receipt copy",
  expectedCheckGroups: prReleaseActionItemsPostMergeMonitorHandoffCopy.expectedCheckGroups,
  expectedConclusion: prReleaseActionItemsPostMergeMonitorHandoffCopy.expectedConclusion,
  expectedMergeState: prReleaseActionItemsPostMergeMonitorHandoffCopy.expectedMergeState,
  expectedPrComments: prReleaseActionItemsPostMergeMonitorHandoffCopy.expectedPrComments,
  expectedReviewDecision: prReleaseActionItemsPostMergeMonitorHandoffCopy.expectedReviewDecision,
  expectedReviews: prReleaseActionItemsPostMergeMonitorHandoffCopy.expectedReviews,
  expectedReviewThreads: prReleaseActionItemsPostMergeMonitorHandoffCopy.expectedReviewThreads,
  expectedUnresolvedThreads: prReleaseActionItemsPostMergeMonitorHandoffCopy.expectedUnresolvedThreads,
  linkSelector: "[data-testid='pr-release-action-items-post-merge-evidence-receipt-anchor']",
  noEvidenceWriteCopy:
    "Release action items post-merge evidence receipt copy только описывает receipt text; event creation, monitoring activation, tracker mutation, status field update, audit append и main push остаются отдельными owner actions",
  ownerRole: "Release owner + Delivery reviewer",
  evidenceReceiptCopy:
    "Release action items post-merge evidence receipt для PR #17: после post-merge monitor handoff подготовить draft receipt с receipt owner, evidence source, timestamp expectation, status snapshot и storage path; пока owner action не подтвержден, события и tracker не записываются",
  prHref: prReleaseActionItemsPostMergeMonitorHandoffCopy.prHref,
  releaseScope: prReleaseActionItemsPostMergeMonitorHandoffCopy.releaseScope,
  repairTargets:
    "PR #17,release action items post-merge evidence receipt,release action items post-merge monitor handoff,receipt owner,evidence source,timestamp expectation,status snapshot,storage path,apps/web/scripts/smoke.mjs,/plan",
  sourceMarkerSelector: "[data-testid='pr-release-action-items-post-merge-monitor-handoff-copy']",
  status: "action-items-post-merge-evidence-receipt-draft",
  evidenceReceiptFields: [
    "receipt owner",
    "evidence source",
    "timestamp expectation",
    "status snapshot",
    "storage path",
  ],
  checks: [
    ["Receipt", "Evidence receipt связывает receipt owner, evidence source и timestamp expectation"],
    ["Snapshot", "Status snapshot и storage path остаются receipt text без event creation"],
    ["Action", "Этот copy не пишет events, не запускает monitoring, не меняет tracker или main"],
    ["Next", "Следующий шаг описывает release action items post-merge receipt review без изменения tracker"],
  ],
};

const prReleaseActionItemsPostMergeReceiptReviewCopy = {
  route: "/plan",
  branch: prReleaseActionItemsPostMergeEvidenceReceiptCopy.branch,
  baseBranch: prReleaseActionItemsPostMergeEvidenceReceiptCopy.baseBranch,
  command: prReleaseActionItemsPostMergeEvidenceReceiptCopy.command,
  postMergeEvidenceReceiptSelector: "[data-testid='pr-release-action-items-post-merge-evidence-receipt-copy']",
  postMergeReceiptReviewScope: "PR #17 release action items post-merge receipt review copy",
  expectedCheckGroups: prReleaseActionItemsPostMergeEvidenceReceiptCopy.expectedCheckGroups,
  expectedConclusion: prReleaseActionItemsPostMergeEvidenceReceiptCopy.expectedConclusion,
  expectedMergeState: prReleaseActionItemsPostMergeEvidenceReceiptCopy.expectedMergeState,
  expectedPrComments: prReleaseActionItemsPostMergeEvidenceReceiptCopy.expectedPrComments,
  expectedReviewDecision: prReleaseActionItemsPostMergeEvidenceReceiptCopy.expectedReviewDecision,
  expectedReviews: prReleaseActionItemsPostMergeEvidenceReceiptCopy.expectedReviews,
  expectedReviewThreads: prReleaseActionItemsPostMergeEvidenceReceiptCopy.expectedReviewThreads,
  expectedUnresolvedThreads: prReleaseActionItemsPostMergeEvidenceReceiptCopy.expectedUnresolvedThreads,
  linkSelector: "[data-testid='pr-release-action-items-post-merge-receipt-review-anchor']",
  noReviewWriteCopy:
    "Release action items post-merge receipt review copy только описывает review text; review outcome write, tracker mutation, event creation, status field update, audit append и owner assignment остаются отдельными owner actions",
  ownerRole: "Release owner + Delivery reviewer",
  receiptReviewCopy:
    "Release action items post-merge receipt review для PR #17: после evidence receipt подготовить draft review с reviewer, receipt completeness, stale evidence check, follow-up decision и tracker boundary; пока owner action не подтвержден, review outcome и tracker не изменяются",
  prHref: prReleaseActionItemsPostMergeEvidenceReceiptCopy.prHref,
  releaseScope: prReleaseActionItemsPostMergeEvidenceReceiptCopy.releaseScope,
  repairTargets:
    "PR #17,release action items post-merge receipt review,release action items post-merge evidence receipt,reviewer,receipt completeness,stale evidence check,follow-up decision,tracker boundary,apps/web/scripts/smoke.mjs,/plan",
  sourceMarkerSelector: "[data-testid='pr-release-action-items-post-merge-evidence-receipt-copy']",
  status: "action-items-post-merge-receipt-review-draft",
  receiptReviewFields: [
    "reviewer",
    "receipt completeness",
    "stale evidence check",
    "follow-up decision",
    "tracker boundary",
  ],
  checks: [
    ["Reviewer", "Receipt review связывает reviewer, receipt completeness и stale evidence check"],
    ["Decision", "Follow-up decision и tracker boundary остаются review text без tracker mutation"],
    ["Action", "Этот copy не пишет review outcome, не создает events и не назначает owner"],
    ["Next", "Следующий шаг описывает release action items post-merge follow-up decision без назначения actions"],
  ],
};

const prReleaseActionItemsPostMergeFollowUpDecisionCopy = {
  route: "/plan",
  branch: prReleaseActionItemsPostMergeReceiptReviewCopy.branch,
  baseBranch: prReleaseActionItemsPostMergeReceiptReviewCopy.baseBranch,
  command: prReleaseActionItemsPostMergeReceiptReviewCopy.command,
  postMergeReceiptReviewSelector: "[data-testid='pr-release-action-items-post-merge-receipt-review-copy']",
  postMergeFollowUpDecisionScope: "PR #17 release action items post-merge follow-up decision copy",
  expectedCheckGroups: prReleaseActionItemsPostMergeReceiptReviewCopy.expectedCheckGroups,
  expectedConclusion: prReleaseActionItemsPostMergeReceiptReviewCopy.expectedConclusion,
  expectedMergeState: prReleaseActionItemsPostMergeReceiptReviewCopy.expectedMergeState,
  expectedPrComments: prReleaseActionItemsPostMergeReceiptReviewCopy.expectedPrComments,
  expectedReviewDecision: prReleaseActionItemsPostMergeReceiptReviewCopy.expectedReviewDecision,
  expectedReviews: prReleaseActionItemsPostMergeReceiptReviewCopy.expectedReviews,
  expectedReviewThreads: prReleaseActionItemsPostMergeReceiptReviewCopy.expectedReviewThreads,
  expectedUnresolvedThreads: prReleaseActionItemsPostMergeReceiptReviewCopy.expectedUnresolvedThreads,
  linkSelector: "[data-testid='pr-release-action-items-post-merge-follow-up-decision-anchor']",
  noActionAssignmentCopy:
    "Release action items post-merge follow-up decision copy только описывает decision text; action assignment, tracker mutation, event creation, status field update, audit append и ownership transfer остаются отдельными owner actions",
  ownerRole: "Release owner + Delivery reviewer",
  followUpDecisionCopy:
    "Release action items post-merge follow-up decision для PR #17: после receipt review подготовить draft decision с decision owner, decision options, evidence reference, action boundary и deferral note; пока owner action не подтвержден, follow-up actions не назначаются",
  prHref: prReleaseActionItemsPostMergeReceiptReviewCopy.prHref,
  releaseScope: prReleaseActionItemsPostMergeReceiptReviewCopy.releaseScope,
  repairTargets:
    "PR #17,release action items post-merge follow-up decision,release action items post-merge receipt review,decision owner,decision options,evidence reference,action boundary,deferral note,apps/web/scripts/smoke.mjs,/plan",
  sourceMarkerSelector: "[data-testid='pr-release-action-items-post-merge-receipt-review-copy']",
  status: "action-items-post-merge-follow-up-decision-draft",
  followUpDecisionFields: [
    "decision owner",
    "decision options",
    "evidence reference",
    "action boundary",
    "deferral note",
  ],
  checks: [
    ["Owner", "Follow-up decision связывает decision owner, decision options и evidence reference"],
    ["Boundary", "Action boundary и deferral note остаются decision text без assignment"],
    ["Action", "Этот copy не назначает actions, не создает events и не меняет tracker"],
    ["Next", "Следующий шаг описывает release action items post-merge decision handoff без передачи ownership"],
  ],
};

const prReleaseActionItemsPostMergeDecisionHandoffCopy = {
  route: "/plan",
  branch: prReleaseActionItemsPostMergeFollowUpDecisionCopy.branch,
  baseBranch: prReleaseActionItemsPostMergeFollowUpDecisionCopy.baseBranch,
  command: prReleaseActionItemsPostMergeFollowUpDecisionCopy.command,
  postMergeFollowUpDecisionSelector: "[data-testid='pr-release-action-items-post-merge-follow-up-decision-copy']",
  postMergeDecisionHandoffScope: "PR #17 release action items post-merge decision handoff copy",
  expectedCheckGroups: prReleaseActionItemsPostMergeFollowUpDecisionCopy.expectedCheckGroups,
  expectedConclusion: prReleaseActionItemsPostMergeFollowUpDecisionCopy.expectedConclusion,
  expectedMergeState: prReleaseActionItemsPostMergeFollowUpDecisionCopy.expectedMergeState,
  expectedPrComments: prReleaseActionItemsPostMergeFollowUpDecisionCopy.expectedPrComments,
  expectedReviewDecision: prReleaseActionItemsPostMergeFollowUpDecisionCopy.expectedReviewDecision,
  expectedReviews: prReleaseActionItemsPostMergeFollowUpDecisionCopy.expectedReviews,
  expectedReviewThreads: prReleaseActionItemsPostMergeFollowUpDecisionCopy.expectedReviewThreads,
  expectedUnresolvedThreads: prReleaseActionItemsPostMergeFollowUpDecisionCopy.expectedUnresolvedThreads,
  linkSelector: "[data-testid='pr-release-action-items-post-merge-decision-handoff-anchor']",
  noOwnershipTransferCopy:
    "Release action items post-merge decision handoff copy только описывает handoff text; ownership transfer, action assignment, tracker mutation, event creation, status field update и audit append остаются отдельными owner actions",
  ownerRole: "Release owner + Delivery reviewer",
  decisionHandoffCopy:
    "Release action items post-merge decision handoff для PR #17: после follow-up decision подготовить draft handoff с handoff owner, decision summary, evidence packet, ownership boundary и return path; пока owner action не подтвержден, ownership не передается",
  prHref: prReleaseActionItemsPostMergeFollowUpDecisionCopy.prHref,
  releaseScope: prReleaseActionItemsPostMergeFollowUpDecisionCopy.releaseScope,
  repairTargets:
    "PR #17,release action items post-merge decision handoff,release action items post-merge follow-up decision,handoff owner,decision summary,evidence packet,ownership boundary,return path,apps/web/scripts/smoke.mjs,/plan",
  sourceMarkerSelector: "[data-testid='pr-release-action-items-post-merge-follow-up-decision-copy']",
  status: "action-items-post-merge-decision-handoff-draft",
  decisionHandoffFields: [
    "handoff owner",
    "decision summary",
    "evidence packet",
    "ownership boundary",
    "return path",
  ],
  checks: [
    ["Owner", "Decision handoff связывает handoff owner, decision summary и evidence packet"],
    ["Boundary", "Ownership boundary и return path остаются handoff text без transfer"],
    ["Action", "Этот copy не передает ownership, не назначает actions и не меняет tracker"],
    ["Next", "Следующий шаг описывает release action items post-merge decision acceptance без записи acceptance"],
  ],
};

const prReleaseActionItemsPostMergeDecisionAcceptanceCopy = {
  route: "/plan",
  branch: prReleaseActionItemsPostMergeDecisionHandoffCopy.branch,
  baseBranch: prReleaseActionItemsPostMergeDecisionHandoffCopy.baseBranch,
  command: prReleaseActionItemsPostMergeDecisionHandoffCopy.command,
  postMergeDecisionHandoffSelector: "[data-testid='pr-release-action-items-post-merge-decision-handoff-copy']",
  postMergeDecisionAcceptanceScope: "PR #17 release action items post-merge decision acceptance copy",
  expectedCheckGroups: prReleaseActionItemsPostMergeDecisionHandoffCopy.expectedCheckGroups,
  expectedConclusion: prReleaseActionItemsPostMergeDecisionHandoffCopy.expectedConclusion,
  expectedMergeState: prReleaseActionItemsPostMergeDecisionHandoffCopy.expectedMergeState,
  expectedPrComments: prReleaseActionItemsPostMergeDecisionHandoffCopy.expectedPrComments,
  expectedReviewDecision: prReleaseActionItemsPostMergeDecisionHandoffCopy.expectedReviewDecision,
  expectedReviews: prReleaseActionItemsPostMergeDecisionHandoffCopy.expectedReviews,
  expectedReviewThreads: prReleaseActionItemsPostMergeDecisionHandoffCopy.expectedReviewThreads,
  expectedUnresolvedThreads: prReleaseActionItemsPostMergeDecisionHandoffCopy.expectedUnresolvedThreads,
  linkSelector: "[data-testid='pr-release-action-items-post-merge-decision-acceptance-anchor']",
  noAcceptanceRecordCopy:
    "Release action items post-merge decision acceptance copy только описывает acceptance text; acceptance record, owner assignment, tracker mutation, event creation, status field update и audit append остаются отдельными owner actions",
  ownerRole: "Release owner + Delivery reviewer",
  decisionAcceptanceCopy:
    "Release action items post-merge decision acceptance для PR #17: после decision handoff подготовить draft acceptance с acceptance owner, accepted handoff, evidence packet, acceptance boundary и pending record note; пока owner action не подтвержден, acceptance не записывается",
  prHref: prReleaseActionItemsPostMergeDecisionHandoffCopy.prHref,
  releaseScope: prReleaseActionItemsPostMergeDecisionHandoffCopy.releaseScope,
  repairTargets:
    "PR #17,release action items post-merge decision acceptance,release action items post-merge decision handoff,acceptance owner,accepted handoff,evidence packet,acceptance boundary,pending record note,apps/web/scripts/smoke.mjs,/plan",
  sourceMarkerSelector: "[data-testid='pr-release-action-items-post-merge-decision-handoff-copy']",
  status: "action-items-post-merge-decision-acceptance-draft",
  decisionAcceptanceFields: [
    "acceptance owner",
    "accepted handoff",
    "evidence packet",
    "acceptance boundary",
    "pending record note",
  ],
  checks: [
    ["Owner", "Decision acceptance связывает acceptance owner, accepted handoff и evidence packet"],
    ["Boundary", "Acceptance boundary и pending record note остаются acceptance text без record"],
    ["Action", "Этот copy не пишет acceptance, не назначает owner и не меняет tracker"],
    ["Next", "Следующий шаг описывает release action items post-merge decision record без записи record"],
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
          data-checked-workflow-path={sharedValidationReadmeWorkflowDocsRenderedRouteCopy.checkedWorkflowPath}
          data-command={sharedValidationReadmeWorkflowDocsRenderedRouteCopy.command}
          data-docs-href={sharedValidationReadmeWorkflowDocsRenderedRouteCopy.docsHref}
          data-docs-marker-selector={sharedValidationReadmeWorkflowDocsRenderedRouteCopy.docsMarkerSelector}
          data-expected-check-count={sharedValidationReadmeWorkflowDocsRenderedRouteCopy.expectedCheckCount}
          data-expected-route-count={sharedValidationReadmeWorkflowDocsRenderedRouteCopy.expectedRouteCount}
          data-failing-command={sharedValidationReadmeWorkflowDocsRenderedRouteCopy.failingCommand}
          data-link-selector={sharedValidationReadmeWorkflowDocsRenderedRouteCopy.linkSelector}
          data-no-merge-copy={sharedValidationReadmeWorkflowDocsRenderedRouteCopy.noMergeCopy}
          data-owner-role={sharedValidationReadmeWorkflowDocsRenderedRouteCopy.ownerRole}
          data-readme-path={sharedValidationReadmeWorkflowDocsRenderedRouteCopy.readmePath}
          data-repair-targets={sharedValidationReadmeWorkflowDocsRenderedRouteCopy.repairTargets}
          data-source-marker-selector={sharedValidationReadmeWorkflowDocsRenderedRouteCopy.sourceMarkerSelector}
          data-testid="shared-validation-readme-workflow-docs-rendered-route-copy"
          data-workflow-command={sharedValidationReadmeWorkflowDocsRenderedRouteCopy.workflowCommand}
          data-workflow-docs-command={sharedValidationReadmeWorkflowDocsRenderedRouteCopy.workflowDocsCommand}
          data-workflow-docs-failure-command={sharedValidationReadmeWorkflowDocsRenderedRouteCopy.workflowDocsFailureCommand}
          data-workflow-failure-command={sharedValidationReadmeWorkflowDocsRenderedRouteCopy.workflowFailureCommand}
          data-workflow-href={sharedValidationReadmeWorkflowDocsRenderedRouteCopy.workflowHref}
          data-workflow-name={sharedValidationReadmeWorkflowDocsRenderedRouteCopy.workflowName}
          data-workflow-path={sharedValidationReadmeWorkflowDocsRenderedRouteCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Shared validation README workflow docs rendered-route copy</p>
              <h2>Что делать, если shared validation README workflow docs rendered-route guard упал</h2>
            </div>
            <a className="primary-link" href={sharedValidationReadmeWorkflowDocsRenderedRouteCopy.workflowHref}>
              {sharedValidationReadmeWorkflowDocsRenderedRouteCopy.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {sharedValidationReadmeWorkflowDocsRenderedRouteCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? "No merge"
                    : title === "Owner"
                      ? "Schema + CI + QA"
                      : title === "Fix order"
                        ? "workflow docs -> route"
                        : "Rendered route"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-browser-loop-selector={sharedValidationReadmeWorkflowDocsBrowserLoopCopy.browserLoopSelector}
          data-browser-url={sharedValidationReadmeWorkflowDocsBrowserLoopCopy.browserUrl}
          data-command={sharedValidationReadmeWorkflowDocsBrowserLoopCopy.command}
          data-console-levels={sharedValidationReadmeWorkflowDocsBrowserLoopCopy.consoleLevels}
          data-docs-href={sharedValidationReadmeWorkflowDocsBrowserLoopCopy.docsHref}
          data-expected-check-count={sharedValidationReadmeWorkflowDocsBrowserLoopCopy.expectedCheckCount}
          data-expected-route-count={sharedValidationReadmeWorkflowDocsBrowserLoopCopy.expectedRouteCount}
          data-link-selector={sharedValidationReadmeWorkflowDocsBrowserLoopCopy.linkSelector}
          data-no-merge-copy={sharedValidationReadmeWorkflowDocsBrowserLoopCopy.noMergeCopy}
          data-owner-role={sharedValidationReadmeWorkflowDocsBrowserLoopCopy.ownerRole}
          data-repair-targets={sharedValidationReadmeWorkflowDocsBrowserLoopCopy.repairTargets}
          data-screenshot-required={sharedValidationReadmeWorkflowDocsBrowserLoopCopy.screenshotRequired}
          data-source-marker-selector={sharedValidationReadmeWorkflowDocsBrowserLoopCopy.sourceMarkerSelector}
          data-testid="shared-validation-readme-workflow-docs-browser-loop-copy"
          data-workflow-href={sharedValidationReadmeWorkflowDocsBrowserLoopCopy.workflowHref}
          data-workflow-name={sharedValidationReadmeWorkflowDocsBrowserLoopCopy.workflowName}
          data-workflow-path={sharedValidationReadmeWorkflowDocsBrowserLoopCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Shared validation README workflow docs browser-loop copy</p>
              <h2>Как Browser QA подтверждает shared validation README workflow docs guard</h2>
            </div>
            <a className="primary-link" href={sharedValidationReadmeWorkflowDocsBrowserLoopCopy.workflowHref}>
              {sharedValidationReadmeWorkflowDocsBrowserLoopCopy.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {sharedValidationReadmeWorkflowDocsBrowserLoopCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Console"
                    ? "No errors"
                    : title === "Workflow link"
                      ? "Scoped link"
                      : title === "DOM"
                        ? "One guard"
                        : "Browser QA"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-base-branch={sharedValidationReadmeWorkflowDocsPrCheckCopy.baseBranch}
          data-branch={sharedValidationReadmeWorkflowDocsPrCheckCopy.branch}
          data-checked-workflow-path={sharedValidationReadmeWorkflowDocsPrCheckCopy.checkedWorkflowPath}
          data-command={sharedValidationReadmeWorkflowDocsPrCheckCopy.command}
          data-docs-href={sharedValidationReadmeWorkflowDocsPrCheckCopy.docsHref}
          data-expected-check-count={sharedValidationReadmeWorkflowDocsPrCheckCopy.expectedCheckCount}
          data-expected-check-groups={sharedValidationReadmeWorkflowDocsPrCheckCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={sharedValidationReadmeWorkflowDocsPrCheckCopy.expectedConclusion}
          data-expected-merge-state={sharedValidationReadmeWorkflowDocsPrCheckCopy.expectedMergeState}
          data-expected-pr-number={sharedValidationReadmeWorkflowDocsPrCheckCopy.expectedPrNumber}
          data-expected-route-count={sharedValidationReadmeWorkflowDocsPrCheckCopy.expectedRouteCount}
          data-link-selector={sharedValidationReadmeWorkflowDocsPrCheckCopy.linkSelector}
          data-no-merge-copy={sharedValidationReadmeWorkflowDocsPrCheckCopy.noMergeCopy}
          data-owner-role={sharedValidationReadmeWorkflowDocsPrCheckCopy.ownerRole}
          data-pr-href={sharedValidationReadmeWorkflowDocsPrCheckCopy.prHref}
          data-readme-path={sharedValidationReadmeWorkflowDocsPrCheckCopy.readmePath}
          data-repair-targets={sharedValidationReadmeWorkflowDocsPrCheckCopy.repairTargets}
          data-route={sharedValidationReadmeWorkflowDocsPrCheckCopy.route}
          data-source-marker-selector={sharedValidationReadmeWorkflowDocsPrCheckCopy.sourceMarkerSelector}
          data-status={sharedValidationReadmeWorkflowDocsPrCheckCopy.status}
          data-testid="shared-validation-readme-workflow-docs-pr-check-copy"
          data-workflow-href={sharedValidationReadmeWorkflowDocsPrCheckCopy.workflowHref}
          data-workflow-name={sharedValidationReadmeWorkflowDocsPrCheckCopy.workflowName}
          data-workflow-path={sharedValidationReadmeWorkflowDocsPrCheckCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Shared validation README workflow docs PR-check copy</p>
              <h2>Как PR #17 подтверждает shared validation README workflow docs guard</h2>
            </div>
            <a
              className="primary-link"
              data-testid="shared-validation-readme-workflow-docs-pr-anchor"
              href={sharedValidationReadmeWorkflowDocsPrCheckCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {sharedValidationReadmeWorkflowDocsPrCheckCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? "No merge"
                    : title === "Checks"
                      ? "CI green"
                      : title === "Route guard"
                        ? "Smoke route"
                        : "PR clean"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-base-branch={sharedValidationReadmeWorkflowDocsMergeStateCopy.baseBranch}
          data-branch={sharedValidationReadmeWorkflowDocsMergeStateCopy.branch}
          data-checked-workflow-path={sharedValidationReadmeWorkflowDocsMergeStateCopy.checkedWorkflowPath}
          data-command={sharedValidationReadmeWorkflowDocsMergeStateCopy.command}
          data-docs-href={sharedValidationReadmeWorkflowDocsMergeStateCopy.docsHref}
          data-expected-check-count={sharedValidationReadmeWorkflowDocsMergeStateCopy.expectedCheckCount}
          data-expected-check-groups={sharedValidationReadmeWorkflowDocsMergeStateCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={sharedValidationReadmeWorkflowDocsMergeStateCopy.expectedConclusion}
          data-expected-merge-state={sharedValidationReadmeWorkflowDocsMergeStateCopy.expectedMergeState}
          data-expected-pr-number={sharedValidationReadmeWorkflowDocsMergeStateCopy.expectedPrNumber}
          data-expected-route-count={sharedValidationReadmeWorkflowDocsMergeStateCopy.expectedRouteCount}
          data-link-selector={sharedValidationReadmeWorkflowDocsMergeStateCopy.linkSelector}
          data-no-merge-copy={sharedValidationReadmeWorkflowDocsMergeStateCopy.noMergeCopy}
          data-owner-role={sharedValidationReadmeWorkflowDocsMergeStateCopy.ownerRole}
          data-pr-href={sharedValidationReadmeWorkflowDocsMergeStateCopy.prHref}
          data-readme-path={sharedValidationReadmeWorkflowDocsMergeStateCopy.readmePath}
          data-repair-targets={sharedValidationReadmeWorkflowDocsMergeStateCopy.repairTargets}
          data-route={sharedValidationReadmeWorkflowDocsMergeStateCopy.route}
          data-source-marker-selector={sharedValidationReadmeWorkflowDocsMergeStateCopy.sourceMarkerSelector}
          data-status={sharedValidationReadmeWorkflowDocsMergeStateCopy.status}
          data-testid="shared-validation-readme-workflow-docs-merge-state-copy"
          data-workflow-href={sharedValidationReadmeWorkflowDocsMergeStateCopy.workflowHref}
          data-workflow-name={sharedValidationReadmeWorkflowDocsMergeStateCopy.workflowName}
          data-workflow-path={sharedValidationReadmeWorkflowDocsMergeStateCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Shared validation README workflow docs merge-state copy</p>
              <h2>Как PR #17 держит shared validation README workflow docs guard в CLEAN</h2>
            </div>
            <a
              className="primary-link"
              data-testid="shared-validation-readme-workflow-docs-merge-anchor"
              href={sharedValidationReadmeWorkflowDocsMergeStateCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {sharedValidationReadmeWorkflowDocsMergeStateCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? "No merge"
                    : title === "Checks"
                      ? "Rollup green"
                      : title === "Branch"
                        ? "PR branch"
                        : "CLEAN"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-base-branch={sharedValidationReadmeWorkflowDocsReleaseNoteCopy.baseBranch}
          data-branch={sharedValidationReadmeWorkflowDocsReleaseNoteCopy.branch}
          data-checked-workflow-path={sharedValidationReadmeWorkflowDocsReleaseNoteCopy.checkedWorkflowPath}
          data-command={sharedValidationReadmeWorkflowDocsReleaseNoteCopy.command}
          data-docs-href={sharedValidationReadmeWorkflowDocsReleaseNoteCopy.docsHref}
          data-expected-check-count={sharedValidationReadmeWorkflowDocsReleaseNoteCopy.expectedCheckCount}
          data-expected-check-groups={sharedValidationReadmeWorkflowDocsReleaseNoteCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={sharedValidationReadmeWorkflowDocsReleaseNoteCopy.expectedConclusion}
          data-expected-merge-state={sharedValidationReadmeWorkflowDocsReleaseNoteCopy.expectedMergeState}
          data-expected-pr-number={sharedValidationReadmeWorkflowDocsReleaseNoteCopy.expectedPrNumber}
          data-expected-route-count={sharedValidationReadmeWorkflowDocsReleaseNoteCopy.expectedRouteCount}
          data-link-selector={sharedValidationReadmeWorkflowDocsReleaseNoteCopy.linkSelector}
          data-no-merge-copy={sharedValidationReadmeWorkflowDocsReleaseNoteCopy.noMergeCopy}
          data-owner-role={sharedValidationReadmeWorkflowDocsReleaseNoteCopy.ownerRole}
          data-pr-href={sharedValidationReadmeWorkflowDocsReleaseNoteCopy.prHref}
          data-readme-path={sharedValidationReadmeWorkflowDocsReleaseNoteCopy.readmePath}
          data-release-note={sharedValidationReadmeWorkflowDocsReleaseNoteCopy.releaseNote}
          data-release-scope={sharedValidationReadmeWorkflowDocsReleaseNoteCopy.releaseScope}
          data-repair-targets={sharedValidationReadmeWorkflowDocsReleaseNoteCopy.repairTargets}
          data-route={sharedValidationReadmeWorkflowDocsReleaseNoteCopy.route}
          data-source-marker-selector={sharedValidationReadmeWorkflowDocsReleaseNoteCopy.sourceMarkerSelector}
          data-status={sharedValidationReadmeWorkflowDocsReleaseNoteCopy.status}
          data-testid="shared-validation-readme-workflow-docs-release-note-copy"
          data-workflow-href={sharedValidationReadmeWorkflowDocsReleaseNoteCopy.workflowHref}
          data-workflow-name={sharedValidationReadmeWorkflowDocsReleaseNoteCopy.workflowName}
          data-workflow-path={sharedValidationReadmeWorkflowDocsReleaseNoteCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Shared validation README workflow docs release-note copy</p>
              <h2>Что release notes должны сказать про shared validation README workflow docs guard</h2>
            </div>
            <a
              className="primary-link"
              data-testid="shared-validation-readme-workflow-docs-release-anchor"
              href={sharedValidationReadmeWorkflowDocsReleaseNoteCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {sharedValidationReadmeWorkflowDocsReleaseNoteCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? "No merge"
                    : title === "Evidence"
                      ? "Clean PR"
                      : title === "Scope"
                        ? "Release scope"
                        : "Release note"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-base-branch={sharedValidationReadmeWorkflowDocsFinalQaCopy.baseBranch}
          data-branch={sharedValidationReadmeWorkflowDocsFinalQaCopy.branch}
          data-checked-workflow-path={sharedValidationReadmeWorkflowDocsFinalQaCopy.checkedWorkflowPath}
          data-command={sharedValidationReadmeWorkflowDocsFinalQaCopy.command}
          data-docs-href={sharedValidationReadmeWorkflowDocsFinalQaCopy.docsHref}
          data-expected-check-count={sharedValidationReadmeWorkflowDocsFinalQaCopy.expectedCheckCount}
          data-expected-check-groups={sharedValidationReadmeWorkflowDocsFinalQaCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={sharedValidationReadmeWorkflowDocsFinalQaCopy.expectedConclusion}
          data-expected-merge-state={sharedValidationReadmeWorkflowDocsFinalQaCopy.expectedMergeState}
          data-expected-pr-number={sharedValidationReadmeWorkflowDocsFinalQaCopy.expectedPrNumber}
          data-expected-route-count={sharedValidationReadmeWorkflowDocsFinalQaCopy.expectedRouteCount}
          data-final-qa-scope={sharedValidationReadmeWorkflowDocsFinalQaCopy.finalQaScope}
          data-link-selector={sharedValidationReadmeWorkflowDocsFinalQaCopy.linkSelector}
          data-no-merge-copy={sharedValidationReadmeWorkflowDocsFinalQaCopy.noMergeCopy}
          data-owner-role={sharedValidationReadmeWorkflowDocsFinalQaCopy.ownerRole}
          data-pr-href={sharedValidationReadmeWorkflowDocsFinalQaCopy.prHref}
          data-readme-path={sharedValidationReadmeWorkflowDocsFinalQaCopy.readmePath}
          data-release-note={sharedValidationReadmeWorkflowDocsFinalQaCopy.releaseNote}
          data-release-scope={sharedValidationReadmeWorkflowDocsFinalQaCopy.releaseScope}
          data-repair-targets={sharedValidationReadmeWorkflowDocsFinalQaCopy.repairTargets}
          data-route={sharedValidationReadmeWorkflowDocsFinalQaCopy.route}
          data-source-marker-selector={sharedValidationReadmeWorkflowDocsFinalQaCopy.sourceMarkerSelector}
          data-status={sharedValidationReadmeWorkflowDocsFinalQaCopy.status}
          data-testid="shared-validation-readme-workflow-docs-final-qa-copy"
          data-workflow-href={sharedValidationReadmeWorkflowDocsFinalQaCopy.workflowHref}
          data-workflow-name={sharedValidationReadmeWorkflowDocsFinalQaCopy.workflowName}
          data-workflow-path={sharedValidationReadmeWorkflowDocsFinalQaCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Shared validation README workflow docs final QA copy</p>
              <h2>Как финально проверить shared validation README workflow docs handoff</h2>
            </div>
            <a
              className="primary-link"
              data-testid="shared-validation-readme-workflow-docs-final-qa-anchor"
              href={sharedValidationReadmeWorkflowDocsFinalQaCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {sharedValidationReadmeWorkflowDocsFinalQaCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "PR"
                    ? "PR clean"
                    : title === "Browser QA"
                      ? "DOM clean"
                      : title === "Smoke"
                        ? "Smoke green"
                        : "Build green"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-base-branch={sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.baseBranch}
          data-branch={sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.branch}
          data-checked-workflow-path={sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.checkedWorkflowPath}
          data-command={sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.command}
          data-docs-href={sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.docsHref}
          data-expected-check-count={sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.expectedCheckCount}
          data-expected-check-groups={sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.expectedConclusion}
          data-expected-merge-state={sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.expectedMergeState}
          data-expected-pr-number={sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.expectedPrNumber}
          data-expected-route-count={sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.expectedRouteCount}
          data-final-qa-scope={sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.finalQaScope}
          data-handoff-owners={sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.handoffOwners.join(",")}
          data-handoff-scope={sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.handoffScope}
          data-link-selector={sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.linkSelector}
          data-no-merge-copy={sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.noMergeCopy}
          data-owner-role={sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.ownerRole}
          data-pr-href={sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.prHref}
          data-readme-path={sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.readmePath}
          data-release-note={sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.releaseNote}
          data-release-scope={sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.releaseScope}
          data-repair-targets={sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.repairTargets}
          data-route={sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.route}
          data-source-marker-selector={sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.sourceMarkerSelector}
          data-status={sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.status}
          data-testid="shared-validation-readme-workflow-docs-owner-handoff-copy"
          data-workflow-href={sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.workflowHref}
          data-workflow-name={sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.workflowName}
          data-workflow-path={sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Shared validation README workflow docs owner handoff copy</p>
              <h2>Кто принимает shared validation README workflow docs handoff</h2>
            </div>
            <a
              className="primary-link"
              data-testid="shared-validation-readme-workflow-docs-owner-handoff-anchor"
              href={sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {sharedValidationReadmeWorkflowDocsOwnerHandoffCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Release"
                    ? "Release accepts"
                    : title === "QA"
                      ? "QA accepts"
                      : title === "CI"
                        ? "CI accepts"
                        : "Schema accepts"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-base-branch={sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.baseBranch}
          data-branch={sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.branch}
          data-checked-workflow-path={sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.checkedWorkflowPath}
          data-checklist-owners={sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.checklistOwners.join(",")}
          data-checklist-scope={sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.checklistScope}
          data-command={sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.command}
          data-docs-href={sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.docsHref}
          data-expected-check-count={sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.expectedCheckCount}
          data-expected-check-groups={sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.expectedConclusion}
          data-expected-merge-state={sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.expectedMergeState}
          data-expected-pr-number={sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.expectedPrNumber}
          data-expected-route-count={sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.expectedRouteCount}
          data-final-qa-scope={sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.finalQaScope}
          data-handoff-scope={sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.handoffScope}
          data-link-selector={sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.linkSelector}
          data-no-merge-copy={sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.noMergeCopy}
          data-owner-role={sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.ownerRole}
          data-pr-href={sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.prHref}
          data-readme-path={sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.readmePath}
          data-release-note={sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.releaseNote}
          data-release-scope={sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.releaseScope}
          data-repair-targets={sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.repairTargets}
          data-route={sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.route}
          data-source-marker-selector={sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.sourceMarkerSelector}
          data-status={sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.status}
          data-testid="shared-validation-readme-workflow-docs-release-checklist-copy"
          data-workflow-href={sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.workflowHref}
          data-workflow-name={sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.workflowName}
          data-workflow-path={sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Shared validation README workflow docs release checklist copy</p>
              <h2>Что отметить перед выпуском shared validation README workflow docs guard</h2>
            </div>
            <a
              className="primary-link"
              data-testid="shared-validation-readme-workflow-docs-release-checklist-anchor"
              href={sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {sharedValidationReadmeWorkflowDocsReleaseChecklistCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Release"
                    ? "Release checked"
                    : title === "QA"
                      ? "QA checked"
                      : title === "CI"
                        ? "CI checked"
                        : "Schema checked"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-approval-owners={sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.approvalOwners.join(",")}
          data-approval-scope={sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.approvalScope}
          data-base-branch={sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.baseBranch}
          data-branch={sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.branch}
          data-checked-workflow-path={sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.checkedWorkflowPath}
          data-checklist-scope={sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.checklistScope}
          data-command={sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.command}
          data-docs-href={sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.docsHref}
          data-expected-check-count={sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.expectedCheckCount}
          data-expected-check-groups={sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.expectedConclusion}
          data-expected-merge-state={sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.expectedMergeState}
          data-expected-pr-number={sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.expectedPrNumber}
          data-expected-route-count={sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.expectedRouteCount}
          data-final-qa-scope={sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.finalQaScope}
          data-handoff-scope={sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.handoffScope}
          data-link-selector={sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.linkSelector}
          data-no-merge-copy={sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.noMergeCopy}
          data-owner-role={sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.ownerRole}
          data-pr-href={sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.prHref}
          data-readme-path={sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.readmePath}
          data-release-note={sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.releaseNote}
          data-release-scope={sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.releaseScope}
          data-repair-targets={sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.repairTargets}
          data-route={sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.route}
          data-source-marker-selector={sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.sourceMarkerSelector}
          data-status={sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.status}
          data-testid="shared-validation-readme-workflow-docs-release-approval-copy"
          data-workflow-href={sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.workflowHref}
          data-workflow-name={sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.workflowName}
          data-workflow-path={sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Shared validation README workflow docs release approval copy</p>
              <h2>Кто утверждает выпуск shared validation README workflow docs guard</h2>
            </div>
            <a
              className="primary-link"
              data-testid="shared-validation-readme-workflow-docs-release-approval-anchor"
              href={sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Release"
                    ? "Release approved"
                    : title === "QA"
                      ? "QA approved"
                      : title === "CI"
                        ? "CI approved"
                        : "Schema approved"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line muted">{sharedValidationReadmeWorkflowDocsReleaseApprovalCopy.noMergeCopy}</p>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-approval-scope={sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.approvalScope}
          data-base-branch={sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.baseBranch}
          data-branch={sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.branch}
          data-checked-workflow-path={sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.checkedWorkflowPath}
          data-command={sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.command}
          data-docs-href={sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.docsHref}
          data-expected-check-count={sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.expectedCheckCount}
          data-expected-check-groups={sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.expectedConclusion}
          data-expected-merge-state={sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.expectedMergeState}
          data-expected-pr-number={sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.expectedPrNumber}
          data-expected-route-count={sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.expectedRouteCount}
          data-final-qa-scope={sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.finalQaScope}
          data-handoff-scope={sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.handoffScope}
          data-link-selector={sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.linkSelector}
          data-no-merge-copy={sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.noMergeCopy}
          data-owner-role={sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.ownerRole}
          data-pr-href={sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.prHref}
          data-readme-path={sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.readmePath}
          data-release-note={sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.releaseNote}
          data-release-scope={sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.releaseScope}
          data-repair-targets={sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.repairTargets}
          data-route={sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.route}
          data-signoff-owners={sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.signoffOwners.join(",")}
          data-signoff-scope={sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.signoffScope}
          data-source-marker-selector={sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.sourceMarkerSelector}
          data-status={sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.status}
          data-testid="shared-validation-readme-workflow-docs-release-signoff-copy"
          data-workflow-href={sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.workflowHref}
          data-workflow-name={sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.workflowName}
          data-workflow-path={sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Shared validation README workflow docs release signoff copy</p>
              <h2>Кто подписывает выпуск shared validation README workflow docs guard</h2>
            </div>
            <a
              className="primary-link"
              data-testid="shared-validation-readme-workflow-docs-release-signoff-anchor"
              href={sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Release"
                    ? "Release signed"
                    : title === "QA"
                      ? "QA signed"
                      : title === "CI"
                        ? "CI signed"
                        : "Schema signed"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line muted">{sharedValidationReadmeWorkflowDocsReleaseSignoffCopy.noMergeCopy}</p>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-approval-scope={sharedValidationReadmeWorkflowDocsArchiveCopy.approvalScope}
          data-archive-owners={sharedValidationReadmeWorkflowDocsArchiveCopy.archiveOwners.join(",")}
          data-archive-scope={sharedValidationReadmeWorkflowDocsArchiveCopy.archiveScope}
          data-base-branch={sharedValidationReadmeWorkflowDocsArchiveCopy.baseBranch}
          data-branch={sharedValidationReadmeWorkflowDocsArchiveCopy.branch}
          data-checked-workflow-path={sharedValidationReadmeWorkflowDocsArchiveCopy.checkedWorkflowPath}
          data-command={sharedValidationReadmeWorkflowDocsArchiveCopy.command}
          data-docs-href={sharedValidationReadmeWorkflowDocsArchiveCopy.docsHref}
          data-expected-check-count={sharedValidationReadmeWorkflowDocsArchiveCopy.expectedCheckCount}
          data-expected-check-groups={sharedValidationReadmeWorkflowDocsArchiveCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={sharedValidationReadmeWorkflowDocsArchiveCopy.expectedConclusion}
          data-expected-merge-state={sharedValidationReadmeWorkflowDocsArchiveCopy.expectedMergeState}
          data-expected-pr-number={sharedValidationReadmeWorkflowDocsArchiveCopy.expectedPrNumber}
          data-expected-route-count={sharedValidationReadmeWorkflowDocsArchiveCopy.expectedRouteCount}
          data-final-qa-scope={sharedValidationReadmeWorkflowDocsArchiveCopy.finalQaScope}
          data-handoff-scope={sharedValidationReadmeWorkflowDocsArchiveCopy.handoffScope}
          data-link-selector={sharedValidationReadmeWorkflowDocsArchiveCopy.linkSelector}
          data-no-merge-copy={sharedValidationReadmeWorkflowDocsArchiveCopy.noMergeCopy}
          data-owner-role={sharedValidationReadmeWorkflowDocsArchiveCopy.ownerRole}
          data-pr-href={sharedValidationReadmeWorkflowDocsArchiveCopy.prHref}
          data-readme-path={sharedValidationReadmeWorkflowDocsArchiveCopy.readmePath}
          data-release-note={sharedValidationReadmeWorkflowDocsArchiveCopy.releaseNote}
          data-release-scope={sharedValidationReadmeWorkflowDocsArchiveCopy.releaseScope}
          data-repair-targets={sharedValidationReadmeWorkflowDocsArchiveCopy.repairTargets}
          data-route={sharedValidationReadmeWorkflowDocsArchiveCopy.route}
          data-signoff-owners={sharedValidationReadmeWorkflowDocsArchiveCopy.signoffOwners.join(",")}
          data-signoff-scope={sharedValidationReadmeWorkflowDocsArchiveCopy.signoffScope}
          data-source-marker-selector={sharedValidationReadmeWorkflowDocsArchiveCopy.sourceMarkerSelector}
          data-status={sharedValidationReadmeWorkflowDocsArchiveCopy.status}
          data-testid="shared-validation-readme-workflow-docs-archive-copy"
          data-workflow-href={sharedValidationReadmeWorkflowDocsArchiveCopy.workflowHref}
          data-workflow-name={sharedValidationReadmeWorkflowDocsArchiveCopy.workflowName}
          data-workflow-path={sharedValidationReadmeWorkflowDocsArchiveCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Shared validation README workflow docs archive copy</p>
              <h2>Что архивирует shared validation README workflow docs guard</h2>
            </div>
            <a
              className="primary-link"
              data-testid="shared-validation-readme-workflow-docs-archive-anchor"
              href={sharedValidationReadmeWorkflowDocsArchiveCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {sharedValidationReadmeWorkflowDocsArchiveCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Release"
                    ? "Release archived"
                    : title === "QA"
                      ? "QA archived"
                      : title === "CI"
                        ? "CI archived"
                        : "Schema archived"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line muted">{sharedValidationReadmeWorkflowDocsArchiveCopy.noMergeCopy}</p>
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

        <section
          className="panel fixture-coverage-panel"
          data-checked-workflow-path={webBuildReadmeWorkflowDocsRenderedRouteCopy.checkedWorkflowPath}
          data-command={webBuildReadmeWorkflowDocsRenderedRouteCopy.command}
          data-docs-href={webBuildReadmeWorkflowDocsRenderedRouteCopy.docsHref}
          data-docs-marker-selector={webBuildReadmeWorkflowDocsRenderedRouteCopy.docsMarkerSelector}
          data-expected-command-count={webBuildReadmeWorkflowDocsRenderedRouteCopy.expectedCommandCount}
          data-expected-route-count={webBuildReadmeWorkflowDocsRenderedRouteCopy.expectedRouteCount}
          data-failing-command={webBuildReadmeWorkflowDocsRenderedRouteCopy.failingCommand}
          data-link-selector={webBuildReadmeWorkflowDocsRenderedRouteCopy.linkSelector}
          data-no-merge-copy={webBuildReadmeWorkflowDocsRenderedRouteCopy.noMergeCopy}
          data-owner-role={webBuildReadmeWorkflowDocsRenderedRouteCopy.ownerRole}
          data-repair-targets={webBuildReadmeWorkflowDocsRenderedRouteCopy.repairTargets}
          data-source-marker-selector={webBuildReadmeWorkflowDocsRenderedRouteCopy.sourceMarkerSelector}
          data-testid="web-build-readme-workflow-docs-rendered-route-copy"
          data-workflow-command={webBuildReadmeWorkflowDocsRenderedRouteCopy.workflowCommand}
          data-workflow-docs-command={webBuildReadmeWorkflowDocsRenderedRouteCopy.workflowDocsCommand}
          data-workflow-docs-failure-command={webBuildReadmeWorkflowDocsRenderedRouteCopy.workflowDocsFailureCommand}
          data-workflow-failure-command={webBuildReadmeWorkflowDocsRenderedRouteCopy.workflowFailureCommand}
          data-workflow-href={webBuildReadmeWorkflowDocsRenderedRouteCopy.workflowHref}
          data-workflow-name={webBuildReadmeWorkflowDocsRenderedRouteCopy.workflowName}
          data-workflow-path={webBuildReadmeWorkflowDocsRenderedRouteCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Web build README workflow docs rendered-route copy</p>
              <h2>Что делать, если Web build README workflow docs rendered-route guard упал</h2>
            </div>
            <a className="primary-link" href={webBuildReadmeWorkflowDocsRenderedRouteCopy.workflowHref}>
              {webBuildReadmeWorkflowDocsRenderedRouteCopy.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {webBuildReadmeWorkflowDocsRenderedRouteCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? "No merge"
                    : title === "Owner"
                      ? "Frontend + CI + QA"
                      : title === "Fix order"
                        ? "workflow docs -> route"
                        : "Rendered route"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-browser-loop-selector={webBuildReadmeWorkflowDocsBrowserLoopCopy.browserLoopSelector}
          data-browser-url={webBuildReadmeWorkflowDocsBrowserLoopCopy.browserUrl}
          data-command={webBuildReadmeWorkflowDocsBrowserLoopCopy.command}
          data-console-levels={webBuildReadmeWorkflowDocsBrowserLoopCopy.consoleLevels}
          data-docs-href={webBuildReadmeWorkflowDocsBrowserLoopCopy.docsHref}
          data-expected-command-count={webBuildReadmeWorkflowDocsBrowserLoopCopy.expectedCommandCount}
          data-expected-route-count={webBuildReadmeWorkflowDocsBrowserLoopCopy.expectedRouteCount}
          data-link-selector={webBuildReadmeWorkflowDocsBrowserLoopCopy.linkSelector}
          data-no-merge-copy={webBuildReadmeWorkflowDocsBrowserLoopCopy.noMergeCopy}
          data-owner-role={webBuildReadmeWorkflowDocsBrowserLoopCopy.ownerRole}
          data-repair-targets={webBuildReadmeWorkflowDocsBrowserLoopCopy.repairTargets}
          data-screenshot-required={webBuildReadmeWorkflowDocsBrowserLoopCopy.screenshotRequired}
          data-source-marker-selector={webBuildReadmeWorkflowDocsBrowserLoopCopy.sourceMarkerSelector}
          data-testid="web-build-readme-workflow-docs-browser-loop-copy"
          data-workflow-href={webBuildReadmeWorkflowDocsBrowserLoopCopy.workflowHref}
          data-workflow-name={webBuildReadmeWorkflowDocsBrowserLoopCopy.workflowName}
          data-workflow-path={webBuildReadmeWorkflowDocsBrowserLoopCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Web build README workflow docs browser-loop copy</p>
              <h2>Как Browser QA подтверждает Web build README workflow docs guard</h2>
            </div>
            <a
              className="primary-link"
              data-testid="web-build-workflow-docs-deep-link-anchor"
              href={webBuildReadmeWorkflowDocsBrowserLoopCopy.workflowHref}
            >
              {webBuildReadmeWorkflowDocsBrowserLoopCopy.workflowName}
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {webBuildReadmeWorkflowDocsBrowserLoopCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Console"
                    ? "No errors"
                    : title === "Workflow link"
                      ? "Scoped link"
                      : title === "DOM"
                        ? "One guard"
                        : "Browser QA"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-base-branch={webBuildReadmeWorkflowDocsPrCheckCopy.baseBranch}
          data-branch={webBuildReadmeWorkflowDocsPrCheckCopy.branch}
          data-checked-workflow-path={webBuildReadmeWorkflowDocsPrCheckCopy.checkedWorkflowPath}
          data-command={webBuildReadmeWorkflowDocsPrCheckCopy.command}
          data-docs-href={webBuildReadmeWorkflowDocsPrCheckCopy.docsHref}
          data-expected-command-count={webBuildReadmeWorkflowDocsPrCheckCopy.expectedCommandCount}
          data-expected-check-groups={webBuildReadmeWorkflowDocsPrCheckCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={webBuildReadmeWorkflowDocsPrCheckCopy.expectedConclusion}
          data-expected-merge-state={webBuildReadmeWorkflowDocsPrCheckCopy.expectedMergeState}
          data-expected-pr-number={webBuildReadmeWorkflowDocsPrCheckCopy.expectedPrNumber}
          data-expected-route-count={webBuildReadmeWorkflowDocsPrCheckCopy.expectedRouteCount}
          data-link-selector={webBuildReadmeWorkflowDocsPrCheckCopy.linkSelector}
          data-no-merge-copy={webBuildReadmeWorkflowDocsPrCheckCopy.noMergeCopy}
          data-owner-role={webBuildReadmeWorkflowDocsPrCheckCopy.ownerRole}
          data-pr-href={webBuildReadmeWorkflowDocsPrCheckCopy.prHref}
          data-repair-targets={webBuildReadmeWorkflowDocsPrCheckCopy.repairTargets}
          data-route={webBuildReadmeWorkflowDocsPrCheckCopy.route}
          data-source-marker-selector={webBuildReadmeWorkflowDocsPrCheckCopy.sourceMarkerSelector}
          data-status={webBuildReadmeWorkflowDocsPrCheckCopy.status}
          data-testid="web-build-readme-workflow-docs-pr-check-copy"
          data-workflow-href={webBuildReadmeWorkflowDocsPrCheckCopy.workflowHref}
          data-workflow-name={webBuildReadmeWorkflowDocsPrCheckCopy.workflowName}
          data-workflow-path={webBuildReadmeWorkflowDocsPrCheckCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Web build README workflow docs PR-check copy</p>
              <h2>Как PR #17 подтверждает Web build README workflow docs guard</h2>
            </div>
            <a
              className="primary-link"
              data-testid="web-build-readme-workflow-docs-pr-anchor"
              href={webBuildReadmeWorkflowDocsPrCheckCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {webBuildReadmeWorkflowDocsPrCheckCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? "No merge"
                    : title === "Checks"
                      ? "CI green"
                      : title === "Route guard"
                        ? "Smoke route"
                        : "PR clean"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-base-branch={webBuildReadmeWorkflowDocsMergeStateCopy.baseBranch}
          data-branch={webBuildReadmeWorkflowDocsMergeStateCopy.branch}
          data-checked-workflow-path={webBuildReadmeWorkflowDocsMergeStateCopy.checkedWorkflowPath}
          data-command={webBuildReadmeWorkflowDocsMergeStateCopy.command}
          data-docs-href={webBuildReadmeWorkflowDocsMergeStateCopy.docsHref}
          data-expected-command-count={webBuildReadmeWorkflowDocsMergeStateCopy.expectedCommandCount}
          data-expected-check-groups={webBuildReadmeWorkflowDocsMergeStateCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={webBuildReadmeWorkflowDocsMergeStateCopy.expectedConclusion}
          data-expected-merge-state={webBuildReadmeWorkflowDocsMergeStateCopy.expectedMergeState}
          data-expected-pr-number={webBuildReadmeWorkflowDocsMergeStateCopy.expectedPrNumber}
          data-expected-route-count={webBuildReadmeWorkflowDocsMergeStateCopy.expectedRouteCount}
          data-link-selector={webBuildReadmeWorkflowDocsMergeStateCopy.linkSelector}
          data-no-merge-copy={webBuildReadmeWorkflowDocsMergeStateCopy.noMergeCopy}
          data-owner-role={webBuildReadmeWorkflowDocsMergeStateCopy.ownerRole}
          data-pr-href={webBuildReadmeWorkflowDocsMergeStateCopy.prHref}
          data-repair-targets={webBuildReadmeWorkflowDocsMergeStateCopy.repairTargets}
          data-route={webBuildReadmeWorkflowDocsMergeStateCopy.route}
          data-source-marker-selector={webBuildReadmeWorkflowDocsMergeStateCopy.sourceMarkerSelector}
          data-status={webBuildReadmeWorkflowDocsMergeStateCopy.status}
          data-testid="web-build-readme-workflow-docs-merge-state-copy"
          data-workflow-href={webBuildReadmeWorkflowDocsMergeStateCopy.workflowHref}
          data-workflow-name={webBuildReadmeWorkflowDocsMergeStateCopy.workflowName}
          data-workflow-path={webBuildReadmeWorkflowDocsMergeStateCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Web build README workflow docs merge-state copy</p>
              <h2>Как PR #17 держит Web build README workflow docs guard в CLEAN</h2>
            </div>
            <a
              className="primary-link"
              data-testid="web-build-readme-workflow-docs-merge-anchor"
              href={webBuildReadmeWorkflowDocsMergeStateCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {webBuildReadmeWorkflowDocsMergeStateCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? "No merge"
                    : title === "Checks"
                      ? "Rollup green"
                      : title === "Branch"
                        ? "PR branch"
                        : "CLEAN"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-base-branch={webBuildReadmeWorkflowDocsReleaseNoteCopy.baseBranch}
          data-branch={webBuildReadmeWorkflowDocsReleaseNoteCopy.branch}
          data-checked-workflow-path={webBuildReadmeWorkflowDocsReleaseNoteCopy.checkedWorkflowPath}
          data-command={webBuildReadmeWorkflowDocsReleaseNoteCopy.command}
          data-docs-href={webBuildReadmeWorkflowDocsReleaseNoteCopy.docsHref}
          data-expected-command-count={webBuildReadmeWorkflowDocsReleaseNoteCopy.expectedCommandCount}
          data-expected-check-groups={webBuildReadmeWorkflowDocsReleaseNoteCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={webBuildReadmeWorkflowDocsReleaseNoteCopy.expectedConclusion}
          data-expected-merge-state={webBuildReadmeWorkflowDocsReleaseNoteCopy.expectedMergeState}
          data-expected-pr-number={webBuildReadmeWorkflowDocsReleaseNoteCopy.expectedPrNumber}
          data-expected-route-count={webBuildReadmeWorkflowDocsReleaseNoteCopy.expectedRouteCount}
          data-link-selector={webBuildReadmeWorkflowDocsReleaseNoteCopy.linkSelector}
          data-no-merge-copy={webBuildReadmeWorkflowDocsReleaseNoteCopy.noMergeCopy}
          data-owner-role={webBuildReadmeWorkflowDocsReleaseNoteCopy.ownerRole}
          data-pr-href={webBuildReadmeWorkflowDocsReleaseNoteCopy.prHref}
          data-release-note={webBuildReadmeWorkflowDocsReleaseNoteCopy.releaseNote}
          data-release-scope={webBuildReadmeWorkflowDocsReleaseNoteCopy.releaseScope}
          data-repair-targets={webBuildReadmeWorkflowDocsReleaseNoteCopy.repairTargets}
          data-route={webBuildReadmeWorkflowDocsReleaseNoteCopy.route}
          data-source-marker-selector={webBuildReadmeWorkflowDocsReleaseNoteCopy.sourceMarkerSelector}
          data-status={webBuildReadmeWorkflowDocsReleaseNoteCopy.status}
          data-testid="web-build-readme-workflow-docs-release-note-copy"
          data-workflow-href={webBuildReadmeWorkflowDocsReleaseNoteCopy.workflowHref}
          data-workflow-name={webBuildReadmeWorkflowDocsReleaseNoteCopy.workflowName}
          data-workflow-path={webBuildReadmeWorkflowDocsReleaseNoteCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Web build README workflow docs release-note copy</p>
              <h2>Что release notes должны сказать про Web build README workflow docs guard</h2>
            </div>
            <a
              className="primary-link"
              data-testid="web-build-readme-workflow-docs-release-anchor"
              href={webBuildReadmeWorkflowDocsReleaseNoteCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {webBuildReadmeWorkflowDocsReleaseNoteCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? "No merge"
                    : title === "Evidence"
                      ? "Clean PR"
                      : title === "Scope"
                        ? "Release scope"
                        : "Release note"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-base-branch={webBuildReadmeWorkflowDocsFinalQaCopy.baseBranch}
          data-branch={webBuildReadmeWorkflowDocsFinalQaCopy.branch}
          data-checked-workflow-path={webBuildReadmeWorkflowDocsFinalQaCopy.checkedWorkflowPath}
          data-command={webBuildReadmeWorkflowDocsFinalQaCopy.command}
          data-docs-href={webBuildReadmeWorkflowDocsFinalQaCopy.docsHref}
          data-expected-command-count={webBuildReadmeWorkflowDocsFinalQaCopy.expectedCommandCount}
          data-expected-check-groups={webBuildReadmeWorkflowDocsFinalQaCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={webBuildReadmeWorkflowDocsFinalQaCopy.expectedConclusion}
          data-expected-merge-state={webBuildReadmeWorkflowDocsFinalQaCopy.expectedMergeState}
          data-expected-pr-number={webBuildReadmeWorkflowDocsFinalQaCopy.expectedPrNumber}
          data-expected-route-count={webBuildReadmeWorkflowDocsFinalQaCopy.expectedRouteCount}
          data-final-qa-scope={webBuildReadmeWorkflowDocsFinalQaCopy.finalQaScope}
          data-link-selector={webBuildReadmeWorkflowDocsFinalQaCopy.linkSelector}
          data-no-merge-copy={webBuildReadmeWorkflowDocsFinalQaCopy.noMergeCopy}
          data-owner-role={webBuildReadmeWorkflowDocsFinalQaCopy.ownerRole}
          data-pr-href={webBuildReadmeWorkflowDocsFinalQaCopy.prHref}
          data-release-note={webBuildReadmeWorkflowDocsFinalQaCopy.releaseNote}
          data-release-scope={webBuildReadmeWorkflowDocsFinalQaCopy.releaseScope}
          data-repair-targets={webBuildReadmeWorkflowDocsFinalQaCopy.repairTargets}
          data-route={webBuildReadmeWorkflowDocsFinalQaCopy.route}
          data-source-marker-selector={webBuildReadmeWorkflowDocsFinalQaCopy.sourceMarkerSelector}
          data-status={webBuildReadmeWorkflowDocsFinalQaCopy.status}
          data-testid="web-build-readme-workflow-docs-final-qa-copy"
          data-workflow-href={webBuildReadmeWorkflowDocsFinalQaCopy.workflowHref}
          data-workflow-name={webBuildReadmeWorkflowDocsFinalQaCopy.workflowName}
          data-workflow-path={webBuildReadmeWorkflowDocsFinalQaCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Web build README workflow docs final QA copy</p>
              <h2>Как финально проверить Web build README workflow docs handoff</h2>
            </div>
            <a
              className="primary-link"
              data-testid="web-build-readme-workflow-docs-final-qa-anchor"
              href={webBuildReadmeWorkflowDocsFinalQaCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {webBuildReadmeWorkflowDocsFinalQaCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "PR"
                    ? "PR clean"
                    : title === "Browser QA"
                      ? "DOM clean"
                      : title === "Smoke"
                        ? "Smoke green"
                        : "Build green"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-base-branch={webBuildReadmeWorkflowDocsOwnerHandoffCopy.baseBranch}
          data-branch={webBuildReadmeWorkflowDocsOwnerHandoffCopy.branch}
          data-checked-workflow-path={webBuildReadmeWorkflowDocsOwnerHandoffCopy.checkedWorkflowPath}
          data-command={webBuildReadmeWorkflowDocsOwnerHandoffCopy.command}
          data-docs-href={webBuildReadmeWorkflowDocsOwnerHandoffCopy.docsHref}
          data-expected-command-count={webBuildReadmeWorkflowDocsOwnerHandoffCopy.expectedCommandCount}
          data-expected-check-groups={webBuildReadmeWorkflowDocsOwnerHandoffCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={webBuildReadmeWorkflowDocsOwnerHandoffCopy.expectedConclusion}
          data-expected-merge-state={webBuildReadmeWorkflowDocsOwnerHandoffCopy.expectedMergeState}
          data-expected-pr-number={webBuildReadmeWorkflowDocsOwnerHandoffCopy.expectedPrNumber}
          data-expected-route-count={webBuildReadmeWorkflowDocsOwnerHandoffCopy.expectedRouteCount}
          data-final-qa-scope={webBuildReadmeWorkflowDocsOwnerHandoffCopy.finalQaScope}
          data-handoff-owners={webBuildReadmeWorkflowDocsOwnerHandoffCopy.handoffOwners.join(",")}
          data-handoff-scope={webBuildReadmeWorkflowDocsOwnerHandoffCopy.handoffScope}
          data-link-selector={webBuildReadmeWorkflowDocsOwnerHandoffCopy.linkSelector}
          data-no-merge-copy={webBuildReadmeWorkflowDocsOwnerHandoffCopy.noMergeCopy}
          data-owner-role={webBuildReadmeWorkflowDocsOwnerHandoffCopy.ownerRole}
          data-pr-href={webBuildReadmeWorkflowDocsOwnerHandoffCopy.prHref}
          data-release-note={webBuildReadmeWorkflowDocsOwnerHandoffCopy.releaseNote}
          data-release-scope={webBuildReadmeWorkflowDocsOwnerHandoffCopy.releaseScope}
          data-repair-targets={webBuildReadmeWorkflowDocsOwnerHandoffCopy.repairTargets}
          data-route={webBuildReadmeWorkflowDocsOwnerHandoffCopy.route}
          data-source-marker-selector={webBuildReadmeWorkflowDocsOwnerHandoffCopy.sourceMarkerSelector}
          data-status={webBuildReadmeWorkflowDocsOwnerHandoffCopy.status}
          data-testid="web-build-readme-workflow-docs-owner-handoff-copy"
          data-workflow-href={webBuildReadmeWorkflowDocsOwnerHandoffCopy.workflowHref}
          data-workflow-name={webBuildReadmeWorkflowDocsOwnerHandoffCopy.workflowName}
          data-workflow-path={webBuildReadmeWorkflowDocsOwnerHandoffCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Web build README workflow docs owner handoff copy</p>
              <h2>Кто принимает Web build README workflow docs handoff</h2>
            </div>
            <a
              className="primary-link"
              data-testid="web-build-readme-workflow-docs-owner-handoff-anchor"
              href={webBuildReadmeWorkflowDocsOwnerHandoffCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {webBuildReadmeWorkflowDocsOwnerHandoffCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Release"
                    ? "Release accepts"
                    : title === "QA"
                      ? "QA accepts"
                      : title === "CI"
                        ? "CI accepts"
                        : "Frontend accepts"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-base-branch={webBuildReadmeWorkflowDocsReleaseChecklistCopy.baseBranch}
          data-branch={webBuildReadmeWorkflowDocsReleaseChecklistCopy.branch}
          data-checked-workflow-path={webBuildReadmeWorkflowDocsReleaseChecklistCopy.checkedWorkflowPath}
          data-checklist-owners={webBuildReadmeWorkflowDocsReleaseChecklistCopy.checklistOwners.join(",")}
          data-checklist-scope={webBuildReadmeWorkflowDocsReleaseChecklistCopy.checklistScope}
          data-command={webBuildReadmeWorkflowDocsReleaseChecklistCopy.command}
          data-docs-href={webBuildReadmeWorkflowDocsReleaseChecklistCopy.docsHref}
          data-expected-command-count={webBuildReadmeWorkflowDocsReleaseChecklistCopy.expectedCommandCount}
          data-expected-check-groups={webBuildReadmeWorkflowDocsReleaseChecklistCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={webBuildReadmeWorkflowDocsReleaseChecklistCopy.expectedConclusion}
          data-expected-merge-state={webBuildReadmeWorkflowDocsReleaseChecklistCopy.expectedMergeState}
          data-expected-pr-number={webBuildReadmeWorkflowDocsReleaseChecklistCopy.expectedPrNumber}
          data-expected-route-count={webBuildReadmeWorkflowDocsReleaseChecklistCopy.expectedRouteCount}
          data-final-qa-scope={webBuildReadmeWorkflowDocsReleaseChecklistCopy.finalQaScope}
          data-handoff-scope={webBuildReadmeWorkflowDocsReleaseChecklistCopy.handoffScope}
          data-link-selector={webBuildReadmeWorkflowDocsReleaseChecklistCopy.linkSelector}
          data-no-merge-copy={webBuildReadmeWorkflowDocsReleaseChecklistCopy.noMergeCopy}
          data-owner-role={webBuildReadmeWorkflowDocsReleaseChecklistCopy.ownerRole}
          data-pr-href={webBuildReadmeWorkflowDocsReleaseChecklistCopy.prHref}
          data-release-note={webBuildReadmeWorkflowDocsReleaseChecklistCopy.releaseNote}
          data-release-scope={webBuildReadmeWorkflowDocsReleaseChecklistCopy.releaseScope}
          data-repair-targets={webBuildReadmeWorkflowDocsReleaseChecklistCopy.repairTargets}
          data-route={webBuildReadmeWorkflowDocsReleaseChecklistCopy.route}
          data-source-marker-selector={webBuildReadmeWorkflowDocsReleaseChecklistCopy.sourceMarkerSelector}
          data-status={webBuildReadmeWorkflowDocsReleaseChecklistCopy.status}
          data-testid="web-build-readme-workflow-docs-release-checklist-copy"
          data-workflow-href={webBuildReadmeWorkflowDocsReleaseChecklistCopy.workflowHref}
          data-workflow-name={webBuildReadmeWorkflowDocsReleaseChecklistCopy.workflowName}
          data-workflow-path={webBuildReadmeWorkflowDocsReleaseChecklistCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Web build README workflow docs release checklist copy</p>
              <h2>Что отметить перед выпуском Web build README workflow docs guard</h2>
            </div>
            <a
              className="primary-link"
              data-testid="web-build-readme-workflow-docs-release-checklist-anchor"
              href={webBuildReadmeWorkflowDocsReleaseChecklistCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {webBuildReadmeWorkflowDocsReleaseChecklistCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Release"
                    ? "Release checked"
                    : title === "QA"
                      ? "QA checked"
                      : title === "CI"
                        ? "CI checked"
                        : "Frontend checked"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-approval-owners={webBuildReadmeWorkflowDocsReleaseApprovalCopy.approvalOwners.join(",")}
          data-approval-scope={webBuildReadmeWorkflowDocsReleaseApprovalCopy.approvalScope}
          data-base-branch={webBuildReadmeWorkflowDocsReleaseApprovalCopy.baseBranch}
          data-branch={webBuildReadmeWorkflowDocsReleaseApprovalCopy.branch}
          data-checked-workflow-path={webBuildReadmeWorkflowDocsReleaseApprovalCopy.checkedWorkflowPath}
          data-checklist-scope={webBuildReadmeWorkflowDocsReleaseApprovalCopy.checklistScope}
          data-command={webBuildReadmeWorkflowDocsReleaseApprovalCopy.command}
          data-docs-href={webBuildReadmeWorkflowDocsReleaseApprovalCopy.docsHref}
          data-expected-command-count={webBuildReadmeWorkflowDocsReleaseApprovalCopy.expectedCommandCount}
          data-expected-check-groups={webBuildReadmeWorkflowDocsReleaseApprovalCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={webBuildReadmeWorkflowDocsReleaseApprovalCopy.expectedConclusion}
          data-expected-merge-state={webBuildReadmeWorkflowDocsReleaseApprovalCopy.expectedMergeState}
          data-expected-pr-number={webBuildReadmeWorkflowDocsReleaseApprovalCopy.expectedPrNumber}
          data-expected-route-count={webBuildReadmeWorkflowDocsReleaseApprovalCopy.expectedRouteCount}
          data-final-qa-scope={webBuildReadmeWorkflowDocsReleaseApprovalCopy.finalQaScope}
          data-handoff-scope={webBuildReadmeWorkflowDocsReleaseApprovalCopy.handoffScope}
          data-link-selector={webBuildReadmeWorkflowDocsReleaseApprovalCopy.linkSelector}
          data-no-merge-copy={webBuildReadmeWorkflowDocsReleaseApprovalCopy.noMergeCopy}
          data-owner-role={webBuildReadmeWorkflowDocsReleaseApprovalCopy.ownerRole}
          data-pr-href={webBuildReadmeWorkflowDocsReleaseApprovalCopy.prHref}
          data-release-note={webBuildReadmeWorkflowDocsReleaseApprovalCopy.releaseNote}
          data-release-scope={webBuildReadmeWorkflowDocsReleaseApprovalCopy.releaseScope}
          data-repair-targets={webBuildReadmeWorkflowDocsReleaseApprovalCopy.repairTargets}
          data-route={webBuildReadmeWorkflowDocsReleaseApprovalCopy.route}
          data-source-marker-selector={webBuildReadmeWorkflowDocsReleaseApprovalCopy.sourceMarkerSelector}
          data-status={webBuildReadmeWorkflowDocsReleaseApprovalCopy.status}
          data-testid="web-build-readme-workflow-docs-release-approval-copy"
          data-workflow-href={webBuildReadmeWorkflowDocsReleaseApprovalCopy.workflowHref}
          data-workflow-name={webBuildReadmeWorkflowDocsReleaseApprovalCopy.workflowName}
          data-workflow-path={webBuildReadmeWorkflowDocsReleaseApprovalCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Web build README workflow docs release approval copy</p>
              <h2>Кто утверждает выпуск Web build README workflow docs guard</h2>
            </div>
            <a
              className="primary-link"
              data-testid="web-build-readme-workflow-docs-release-approval-anchor"
              href={webBuildReadmeWorkflowDocsReleaseApprovalCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {webBuildReadmeWorkflowDocsReleaseApprovalCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Release"
                    ? "Release approved"
                    : title === "QA"
                      ? "QA approved"
                      : title === "CI"
                        ? "CI approved"
                        : "Frontend approved"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line muted">{webBuildReadmeWorkflowDocsReleaseApprovalCopy.noMergeCopy}</p>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-approval-scope={webBuildReadmeWorkflowDocsReleaseSignoffCopy.approvalScope}
          data-base-branch={webBuildReadmeWorkflowDocsReleaseSignoffCopy.baseBranch}
          data-branch={webBuildReadmeWorkflowDocsReleaseSignoffCopy.branch}
          data-checked-workflow-path={webBuildReadmeWorkflowDocsReleaseSignoffCopy.checkedWorkflowPath}
          data-command={webBuildReadmeWorkflowDocsReleaseSignoffCopy.command}
          data-docs-href={webBuildReadmeWorkflowDocsReleaseSignoffCopy.docsHref}
          data-expected-command-count={webBuildReadmeWorkflowDocsReleaseSignoffCopy.expectedCommandCount}
          data-expected-check-groups={webBuildReadmeWorkflowDocsReleaseSignoffCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={webBuildReadmeWorkflowDocsReleaseSignoffCopy.expectedConclusion}
          data-expected-merge-state={webBuildReadmeWorkflowDocsReleaseSignoffCopy.expectedMergeState}
          data-expected-pr-number={webBuildReadmeWorkflowDocsReleaseSignoffCopy.expectedPrNumber}
          data-expected-route-count={webBuildReadmeWorkflowDocsReleaseSignoffCopy.expectedRouteCount}
          data-final-qa-scope={webBuildReadmeWorkflowDocsReleaseSignoffCopy.finalQaScope}
          data-handoff-scope={webBuildReadmeWorkflowDocsReleaseSignoffCopy.handoffScope}
          data-link-selector={webBuildReadmeWorkflowDocsReleaseSignoffCopy.linkSelector}
          data-no-merge-copy={webBuildReadmeWorkflowDocsReleaseSignoffCopy.noMergeCopy}
          data-owner-role={webBuildReadmeWorkflowDocsReleaseSignoffCopy.ownerRole}
          data-pr-href={webBuildReadmeWorkflowDocsReleaseSignoffCopy.prHref}
          data-release-note={webBuildReadmeWorkflowDocsReleaseSignoffCopy.releaseNote}
          data-release-scope={webBuildReadmeWorkflowDocsReleaseSignoffCopy.releaseScope}
          data-repair-targets={webBuildReadmeWorkflowDocsReleaseSignoffCopy.repairTargets}
          data-route={webBuildReadmeWorkflowDocsReleaseSignoffCopy.route}
          data-signoff-owners={webBuildReadmeWorkflowDocsReleaseSignoffCopy.signoffOwners.join(",")}
          data-signoff-scope={webBuildReadmeWorkflowDocsReleaseSignoffCopy.signoffScope}
          data-source-marker-selector={webBuildReadmeWorkflowDocsReleaseSignoffCopy.sourceMarkerSelector}
          data-status={webBuildReadmeWorkflowDocsReleaseSignoffCopy.status}
          data-testid="web-build-readme-workflow-docs-release-signoff-copy"
          data-workflow-href={webBuildReadmeWorkflowDocsReleaseSignoffCopy.workflowHref}
          data-workflow-name={webBuildReadmeWorkflowDocsReleaseSignoffCopy.workflowName}
          data-workflow-path={webBuildReadmeWorkflowDocsReleaseSignoffCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Web build README workflow docs release signoff copy</p>
              <h2>Кто подписывает выпуск Web build README workflow docs guard</h2>
            </div>
            <a
              className="primary-link"
              data-testid="web-build-readme-workflow-docs-release-signoff-anchor"
              href={webBuildReadmeWorkflowDocsReleaseSignoffCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {webBuildReadmeWorkflowDocsReleaseSignoffCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Release"
                    ? "Release signed"
                    : title === "QA"
                      ? "QA signed"
                      : title === "CI"
                        ? "CI signed"
                        : "Frontend signed"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line muted">{webBuildReadmeWorkflowDocsReleaseSignoffCopy.noMergeCopy}</p>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-approval-scope={webBuildReadmeWorkflowDocsArchiveCopy.approvalScope}
          data-archive-owners={webBuildReadmeWorkflowDocsArchiveCopy.archiveOwners.join(",")}
          data-archive-scope={webBuildReadmeWorkflowDocsArchiveCopy.archiveScope}
          data-base-branch={webBuildReadmeWorkflowDocsArchiveCopy.baseBranch}
          data-branch={webBuildReadmeWorkflowDocsArchiveCopy.branch}
          data-checked-workflow-path={webBuildReadmeWorkflowDocsArchiveCopy.checkedWorkflowPath}
          data-command={webBuildReadmeWorkflowDocsArchiveCopy.command}
          data-docs-href={webBuildReadmeWorkflowDocsArchiveCopy.docsHref}
          data-expected-command-count={webBuildReadmeWorkflowDocsArchiveCopy.expectedCommandCount}
          data-expected-check-groups={webBuildReadmeWorkflowDocsArchiveCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={webBuildReadmeWorkflowDocsArchiveCopy.expectedConclusion}
          data-expected-merge-state={webBuildReadmeWorkflowDocsArchiveCopy.expectedMergeState}
          data-expected-pr-number={webBuildReadmeWorkflowDocsArchiveCopy.expectedPrNumber}
          data-expected-route-count={webBuildReadmeWorkflowDocsArchiveCopy.expectedRouteCount}
          data-final-qa-scope={webBuildReadmeWorkflowDocsArchiveCopy.finalQaScope}
          data-handoff-scope={webBuildReadmeWorkflowDocsArchiveCopy.handoffScope}
          data-link-selector={webBuildReadmeWorkflowDocsArchiveCopy.linkSelector}
          data-no-merge-copy={webBuildReadmeWorkflowDocsArchiveCopy.noMergeCopy}
          data-owner-role={webBuildReadmeWorkflowDocsArchiveCopy.ownerRole}
          data-pr-href={webBuildReadmeWorkflowDocsArchiveCopy.prHref}
          data-release-note={webBuildReadmeWorkflowDocsArchiveCopy.releaseNote}
          data-release-scope={webBuildReadmeWorkflowDocsArchiveCopy.releaseScope}
          data-repair-targets={webBuildReadmeWorkflowDocsArchiveCopy.repairTargets}
          data-route={webBuildReadmeWorkflowDocsArchiveCopy.route}
          data-signoff-owners={webBuildReadmeWorkflowDocsArchiveCopy.signoffOwners.join(",")}
          data-signoff-scope={webBuildReadmeWorkflowDocsArchiveCopy.signoffScope}
          data-source-marker-selector={webBuildReadmeWorkflowDocsArchiveCopy.sourceMarkerSelector}
          data-status={webBuildReadmeWorkflowDocsArchiveCopy.status}
          data-testid="web-build-readme-workflow-docs-archive-copy"
          data-workflow-href={webBuildReadmeWorkflowDocsArchiveCopy.workflowHref}
          data-workflow-name={webBuildReadmeWorkflowDocsArchiveCopy.workflowName}
          data-workflow-path={webBuildReadmeWorkflowDocsArchiveCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Web build README workflow docs archive copy</p>
              <h2>Что архивирует Web build README workflow docs guard</h2>
            </div>
            <a
              className="primary-link"
              data-testid="web-build-readme-workflow-docs-archive-anchor"
              href={webBuildReadmeWorkflowDocsArchiveCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {webBuildReadmeWorkflowDocsArchiveCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Release"
                    ? "Release archived"
                    : title === "QA"
                      ? "QA archived"
                      : title === "CI"
                        ? "CI archived"
                        : "Frontend archived"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line muted">{webBuildReadmeWorkflowDocsArchiveCopy.noMergeCopy}</p>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-archive-count={finalPrHandoffAuditCopy.archiveCount}
          data-archive-routes={finalPrHandoffAuditCopy.archiveRoutes.join(",")}
          data-archive-selectors={finalPrHandoffAuditCopy.archiveSelectors.join(",")}
          data-audit-owners={finalPrHandoffAuditCopy.auditOwners.join(",")}
          data-audit-scope={finalPrHandoffAuditCopy.auditScope}
          data-base-branch={finalPrHandoffAuditCopy.baseBranch}
          data-branch={finalPrHandoffAuditCopy.branch}
          data-command={finalPrHandoffAuditCopy.command}
          data-expected-check-groups={finalPrHandoffAuditCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={finalPrHandoffAuditCopy.expectedConclusion}
          data-expected-merge-state={finalPrHandoffAuditCopy.expectedMergeState}
          data-expected-pr-number={finalPrHandoffAuditCopy.expectedPrNumber}
          data-expected-route-count={finalPrHandoffAuditCopy.expectedRouteCount}
          data-link-selector={finalPrHandoffAuditCopy.linkSelector}
          data-no-merge-copy={finalPrHandoffAuditCopy.noMergeCopy}
          data-owner-role={finalPrHandoffAuditCopy.ownerRole}
          data-pr-href={finalPrHandoffAuditCopy.prHref}
          data-release-scope={finalPrHandoffAuditCopy.releaseScope}
          data-repair-targets={finalPrHandoffAuditCopy.repairTargets}
          data-route={finalPrHandoffAuditCopy.route}
          data-source-marker-selector={finalPrHandoffAuditCopy.sourceMarkerSelector}
          data-status={finalPrHandoffAuditCopy.status}
          data-testid="final-pr-handoff-audit-copy"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Final PR handoff audit copy</p>
              <h2>Что связывает финальный PR #17 handoff audit</h2>
            </div>
            <a
              className="primary-link"
              data-testid="final-pr-handoff-audit-anchor"
              href={finalPrHandoffAuditCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {finalPrHandoffAuditCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Handoff"
                    ? "Audit trail"
                    : title === "PR"
                      ? "Merge state"
                      : title === "CI"
                        ? "Status checks"
                        : "Archive guards"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line muted">{finalPrHandoffAuditCopy.noMergeCopy}</p>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-audit-scope={prMergeReadinessNoteCopy.auditScope}
          data-audit-selector={prMergeReadinessNoteCopy.auditSelector}
          data-base-branch={prMergeReadinessNoteCopy.baseBranch}
          data-branch={prMergeReadinessNoteCopy.branch}
          data-command={prMergeReadinessNoteCopy.command}
          data-expected-archive-count={prMergeReadinessNoteCopy.expectedArchiveCount}
          data-expected-check-groups={prMergeReadinessNoteCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={prMergeReadinessNoteCopy.expectedConclusion}
          data-expected-merge-state={prMergeReadinessNoteCopy.expectedMergeState}
          data-expected-pr-number={prMergeReadinessNoteCopy.expectedPrNumber}
          data-expected-route-count={prMergeReadinessNoteCopy.expectedRouteCount}
          data-link-selector={prMergeReadinessNoteCopy.linkSelector}
          data-merge-readiness-scope={prMergeReadinessNoteCopy.mergeReadinessScope}
          data-no-merge-copy={prMergeReadinessNoteCopy.noMergeCopy}
          data-owner-role={prMergeReadinessNoteCopy.ownerRole}
          data-pr-href={prMergeReadinessNoteCopy.prHref}
          data-readiness-owners={prMergeReadinessNoteCopy.readinessOwners.join(",")}
          data-release-scope={prMergeReadinessNoteCopy.releaseScope}
          data-repair-targets={prMergeReadinessNoteCopy.repairTargets}
          data-route={prMergeReadinessNoteCopy.route}
          data-source-marker-selector={prMergeReadinessNoteCopy.sourceMarkerSelector}
          data-status={prMergeReadinessNoteCopy.status}
          data-testid="pr-merge-readiness-note-copy"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">PR merge readiness note copy</p>
              <h2>Что должно быть в PR #17 merge readiness note</h2>
            </div>
            <a
              className="primary-link"
              data-testid="pr-merge-readiness-note-anchor"
              href={prMergeReadinessNoteCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {prMergeReadinessNoteCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Review"
                    ? "Threads checked"
                    : title === "Merge state"
                      ? "CLEAN"
                      : title === "CI"
                        ? "Checks green"
                        : "Audit linked"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line muted">{prMergeReadinessNoteCopy.noMergeCopy}</p>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-base-branch={prReviewThreadsCopy.baseBranch}
          data-branch={prReviewThreadsCopy.branch}
          data-command={prReviewThreadsCopy.command}
          data-expected-outdated-threads={prReviewThreadsCopy.expectedOutdatedThreads}
          data-expected-pr-comments={prReviewThreadsCopy.expectedPrComments}
          data-expected-review-threads={prReviewThreadsCopy.expectedReviewThreads}
          data-expected-reviews={prReviewThreadsCopy.expectedReviews}
          data-expected-unresolved-threads={prReviewThreadsCopy.expectedUnresolvedThreads}
          data-link-selector={prReviewThreadsCopy.linkSelector}
          data-merge-readiness-selector={prReviewThreadsCopy.mergeReadinessSelector}
          data-no-merge-copy={prReviewThreadsCopy.noMergeCopy}
          data-owner-role={prReviewThreadsCopy.ownerRole}
          data-pr-href={prReviewThreadsCopy.prHref}
          data-release-scope={prReviewThreadsCopy.releaseScope}
          data-repair-targets={prReviewThreadsCopy.repairTargets}
          data-review-owners={prReviewThreadsCopy.reviewOwners.join(",")}
          data-review-thread-scope={prReviewThreadsCopy.reviewThreadScope}
          data-review-thread-source={prReviewThreadsCopy.reviewThreadSource}
          data-review-thread-status={prReviewThreadsCopy.reviewThreadStatus}
          data-route={prReviewThreadsCopy.route}
          data-source-marker-selector={prReviewThreadsCopy.sourceMarkerSelector}
          data-status={prReviewThreadsCopy.status}
          data-testid="pr-review-threads-copy"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">PR review threads copy</p>
              <h2>Что проверено по PR #17 review threads</h2>
            </div>
            <a className="primary-link" data-testid="pr-review-threads-anchor" href={prReviewThreadsCopy.prHref}>
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {prReviewThreadsCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Threads"
                    ? "0 threads"
                    : title === "Unresolved"
                      ? "0 unresolved"
                      : title === "Comments"
                        ? "0 comments"
                        : "Ready linked"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line muted">{prReviewThreadsCopy.noMergeCopy}</p>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-base-branch={prMergeRequestCopy.baseBranch}
          data-branch={prMergeRequestCopy.branch}
          data-command={prMergeRequestCopy.command}
          data-expected-check-groups={prMergeRequestCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={prMergeRequestCopy.expectedConclusion}
          data-expected-merge-state={prMergeRequestCopy.expectedMergeState}
          data-expected-review-threads={prMergeRequestCopy.expectedReviewThreads}
          data-expected-unresolved-threads={prMergeRequestCopy.expectedUnresolvedThreads}
          data-link-selector={prMergeRequestCopy.linkSelector}
          data-merge-readiness-selector={prMergeRequestCopy.mergeReadinessSelector}
          data-merge-request-scope={prMergeRequestCopy.mergeRequestScope}
          data-no-merge-copy={prMergeRequestCopy.noMergeCopy}
          data-owner-role={prMergeRequestCopy.ownerRole}
          data-pr-href={prMergeRequestCopy.prHref}
          data-release-scope={prMergeRequestCopy.releaseScope}
          data-repair-targets={prMergeRequestCopy.repairTargets}
          data-request-owners={prMergeRequestCopy.requestOwners.join(",")}
          data-review-threads-selector={prMergeRequestCopy.reviewThreadsSelector}
          data-route={prMergeRequestCopy.route}
          data-source-marker-selector={prMergeRequestCopy.sourceMarkerSelector}
          data-status={prMergeRequestCopy.status}
          data-testid="pr-merge-request-copy"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">PR merge request copy</p>
              <h2>Что должно быть в PR #17 merge request</h2>
            </div>
            <a className="primary-link" data-testid="pr-merge-request-anchor" href={prMergeRequestCopy.prHref}>
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {prMergeRequestCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Merge state"
                    ? "CLEAN"
                    : title === "Checks"
                      ? "SUCCESS"
                      : title === "Review"
                        ? "0 threads"
                        : "Request ready"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line muted">{prMergeRequestCopy.noMergeCopy}</p>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-base-branch={prFinalMergeHandoffCopy.baseBranch}
          data-branch={prFinalMergeHandoffCopy.branch}
          data-command={prFinalMergeHandoffCopy.command}
          data-expected-check-groups={prFinalMergeHandoffCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={prFinalMergeHandoffCopy.expectedConclusion}
          data-expected-merge-state={prFinalMergeHandoffCopy.expectedMergeState}
          data-expected-pr-comments={prFinalMergeHandoffCopy.expectedPrComments}
          data-expected-review-threads={prFinalMergeHandoffCopy.expectedReviewThreads}
          data-expected-reviews={prFinalMergeHandoffCopy.expectedReviews}
          data-expected-unresolved-threads={prFinalMergeHandoffCopy.expectedUnresolvedThreads}
          data-final-handoff-scope={prFinalMergeHandoffCopy.finalHandoffScope}
          data-link-selector={prFinalMergeHandoffCopy.linkSelector}
          data-merge-request-selector={prFinalMergeHandoffCopy.mergeRequestSelector}
          data-no-merge-copy={prFinalMergeHandoffCopy.noMergeCopy}
          data-owner-role={prFinalMergeHandoffCopy.ownerRole}
          data-pr-href={prFinalMergeHandoffCopy.prHref}
          data-release-scope={prFinalMergeHandoffCopy.releaseScope}
          data-repair-targets={prFinalMergeHandoffCopy.repairTargets}
          data-route={prFinalMergeHandoffCopy.route}
          data-signoff-owners={prFinalMergeHandoffCopy.signoffOwners.join(",")}
          data-source-marker-selector={prFinalMergeHandoffCopy.sourceMarkerSelector}
          data-status={prFinalMergeHandoffCopy.status}
          data-testid="pr-final-merge-handoff-copy"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">PR final merge handoff copy</p>
              <h2>Что фиксирует PR #17 final merge handoff</h2>
            </div>
            <a
              className="primary-link"
              data-testid="pr-final-merge-handoff-anchor"
              href={prFinalMergeHandoffCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {prFinalMergeHandoffCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "State"
                    ? "CLEAN"
                    : title === "CI"
                      ? "SUCCESS"
                      : title === "Review"
                        ? "0 open"
                        : "Owners ready"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line muted">{prFinalMergeHandoffCopy.noMergeCopy}</p>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-base-branch={prMergeApprovalChecklistCopy.baseBranch}
          data-branch={prMergeApprovalChecklistCopy.branch}
          data-checklist-scope={prMergeApprovalChecklistCopy.checklistScope}
          data-command={prMergeApprovalChecklistCopy.command}
          data-expected-check-groups={prMergeApprovalChecklistCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={prMergeApprovalChecklistCopy.expectedConclusion}
          data-expected-merge-state={prMergeApprovalChecklistCopy.expectedMergeState}
          data-expected-pr-comments={prMergeApprovalChecklistCopy.expectedPrComments}
          data-expected-review-decision={prMergeApprovalChecklistCopy.expectedReviewDecision}
          data-expected-review-threads={prMergeApprovalChecklistCopy.expectedReviewThreads}
          data-expected-reviews={prMergeApprovalChecklistCopy.expectedReviews}
          data-expected-unresolved-threads={prMergeApprovalChecklistCopy.expectedUnresolvedThreads}
          data-final-handoff-selector={prMergeApprovalChecklistCopy.finalHandoffSelector}
          data-link-selector={prMergeApprovalChecklistCopy.linkSelector}
          data-no-merge-copy={prMergeApprovalChecklistCopy.noMergeCopy}
          data-owner-role={prMergeApprovalChecklistCopy.ownerRole}
          data-pr-href={prMergeApprovalChecklistCopy.prHref}
          data-release-scope={prMergeApprovalChecklistCopy.releaseScope}
          data-repair-targets={prMergeApprovalChecklistCopy.repairTargets}
          data-route={prMergeApprovalChecklistCopy.route}
          data-signoff-owners={prMergeApprovalChecklistCopy.signoffOwners.join(",")}
          data-source-marker-selector={prMergeApprovalChecklistCopy.sourceMarkerSelector}
          data-status={prMergeApprovalChecklistCopy.status}
          data-testid="pr-merge-approval-checklist-copy"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">PR merge approval checklist copy</p>
              <h2>Что сверяет PR #17 approval checklist</h2>
            </div>
            <a
              className="primary-link"
              data-testid="pr-merge-approval-checklist-anchor"
              href={prMergeApprovalChecklistCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {prMergeApprovalChecklistCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Preconditions"
                    ? "Ready"
                    : title === "Review state"
                      ? "No approval"
                      : title === "Comments"
                        ? "0 comments"
                        : "Request next"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line muted">{prMergeApprovalChecklistCopy.noMergeCopy}</p>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-approval-request-scope={prMergeApprovalRequestCopy.approvalRequestScope}
          data-base-branch={prMergeApprovalRequestCopy.baseBranch}
          data-branch={prMergeApprovalRequestCopy.branch}
          data-checklist-selector={prMergeApprovalRequestCopy.checklistSelector}
          data-command={prMergeApprovalRequestCopy.command}
          data-expected-check-groups={prMergeApprovalRequestCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={prMergeApprovalRequestCopy.expectedConclusion}
          data-expected-merge-state={prMergeApprovalRequestCopy.expectedMergeState}
          data-expected-pr-comments={prMergeApprovalRequestCopy.expectedPrComments}
          data-expected-review-decision={prMergeApprovalRequestCopy.expectedReviewDecision}
          data-expected-review-threads={prMergeApprovalRequestCopy.expectedReviewThreads}
          data-expected-reviews={prMergeApprovalRequestCopy.expectedReviews}
          data-expected-unresolved-threads={prMergeApprovalRequestCopy.expectedUnresolvedThreads}
          data-link-selector={prMergeApprovalRequestCopy.linkSelector}
          data-no-merge-copy={prMergeApprovalRequestCopy.noMergeCopy}
          data-owner-role={prMergeApprovalRequestCopy.ownerRole}
          data-pr-href={prMergeApprovalRequestCopy.prHref}
          data-release-scope={prMergeApprovalRequestCopy.releaseScope}
          data-repair-targets={prMergeApprovalRequestCopy.repairTargets}
          data-request-channel={prMergeApprovalRequestCopy.requestChannel}
          data-request-copy={prMergeApprovalRequestCopy.requestCopy}
          data-request-owners={prMergeApprovalRequestCopy.requestOwners.join(",")}
          data-route={prMergeApprovalRequestCopy.route}
          data-source-marker-selector={prMergeApprovalRequestCopy.sourceMarkerSelector}
          data-status={prMergeApprovalRequestCopy.status}
          data-testid="pr-approval-request-copy"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">PR approval request copy</p>
              <h2>Что отправлять как PR #17 approval request</h2>
            </div>
            <a
              className="primary-link"
              data-testid="pr-approval-request-anchor"
              href={prMergeApprovalRequestCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {prMergeApprovalRequestCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Scope"
                    ? "PR #17"
                    : title === "Preconditions"
                      ? "Verified"
                      : title === "Request"
                        ? "Approval only"
                        : "Checklist first"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line">{prMergeApprovalRequestCopy.requestCopy}</p>
          <p className="stage-line muted">{prMergeApprovalRequestCopy.noMergeCopy}</p>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-approval-request-selector={prApprovalWaitStateCopy.approvalRequestSelector}
          data-base-branch={prApprovalWaitStateCopy.baseBranch}
          data-branch={prApprovalWaitStateCopy.branch}
          data-command={prApprovalWaitStateCopy.command}
          data-expected-check-groups={prApprovalWaitStateCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={prApprovalWaitStateCopy.expectedConclusion}
          data-expected-merge-state={prApprovalWaitStateCopy.expectedMergeState}
          data-expected-pr-comments={prApprovalWaitStateCopy.expectedPrComments}
          data-expected-review-decision={prApprovalWaitStateCopy.expectedReviewDecision}
          data-expected-review-threads={prApprovalWaitStateCopy.expectedReviewThreads}
          data-expected-reviews={prApprovalWaitStateCopy.expectedReviews}
          data-expected-unresolved-threads={prApprovalWaitStateCopy.expectedUnresolvedThreads}
          data-link-selector={prApprovalWaitStateCopy.linkSelector}
          data-no-merge-copy={prApprovalWaitStateCopy.noMergeCopy}
          data-owner-role={prApprovalWaitStateCopy.ownerRole}
          data-pr-href={prApprovalWaitStateCopy.prHref}
          data-release-scope={prApprovalWaitStateCopy.releaseScope}
          data-repair-targets={prApprovalWaitStateCopy.repairTargets}
          data-response-owners={prApprovalWaitStateCopy.responseOwners.join(",")}
          data-route={prApprovalWaitStateCopy.route}
          data-source-marker-selector={prApprovalWaitStateCopy.sourceMarkerSelector}
          data-status={prApprovalWaitStateCopy.status}
          data-wait-state-copy={prApprovalWaitStateCopy.waitStateCopy}
          data-wait-state-scope={prApprovalWaitStateCopy.waitStateScope}
          data-testid="pr-approval-wait-state-copy"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">PR approval wait-state copy</p>
              <h2>Что держит PR #17 в approval wait-state</h2>
            </div>
            <a
              className="primary-link"
              data-testid="pr-approval-wait-state-anchor"
              href={prApprovalWaitStateCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {prApprovalWaitStateCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Request"
                    ? "Ready"
                    : title === "Decision"
                      ? "Pending"
                      : title === "Feedback"
                        ? "0 open"
                        : "Response next"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line">{prApprovalWaitStateCopy.waitStateCopy}</p>
          <p className="stage-line muted">{prApprovalWaitStateCopy.noMergeCopy}</p>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-approval-wait-state-selector={prReviewerApprovalResponseCopy.approvalWaitStateSelector}
          data-base-branch={prReviewerApprovalResponseCopy.baseBranch}
          data-branch={prReviewerApprovalResponseCopy.branch}
          data-command={prReviewerApprovalResponseCopy.command}
          data-expected-check-groups={prReviewerApprovalResponseCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={prReviewerApprovalResponseCopy.expectedConclusion}
          data-expected-merge-state={prReviewerApprovalResponseCopy.expectedMergeState}
          data-expected-pr-comments={prReviewerApprovalResponseCopy.expectedPrComments}
          data-expected-review-decision={prReviewerApprovalResponseCopy.expectedReviewDecision}
          data-expected-review-threads={prReviewerApprovalResponseCopy.expectedReviewThreads}
          data-expected-reviews={prReviewerApprovalResponseCopy.expectedReviews}
          data-expected-unresolved-threads={prReviewerApprovalResponseCopy.expectedUnresolvedThreads}
          data-link-selector={prReviewerApprovalResponseCopy.linkSelector}
          data-no-merge-copy={prReviewerApprovalResponseCopy.noMergeCopy}
          data-owner-role={prReviewerApprovalResponseCopy.ownerRole}
          data-pr-href={prReviewerApprovalResponseCopy.prHref}
          data-release-scope={prReviewerApprovalResponseCopy.releaseScope}
          data-repair-targets={prReviewerApprovalResponseCopy.repairTargets}
          data-response-copy={prReviewerApprovalResponseCopy.responseCopy}
          data-response-owners={prReviewerApprovalResponseCopy.responseOwners.join(",")}
          data-response-scope={prReviewerApprovalResponseCopy.responseScope}
          data-route={prReviewerApprovalResponseCopy.route}
          data-source-marker-selector={prReviewerApprovalResponseCopy.sourceMarkerSelector}
          data-status={prReviewerApprovalResponseCopy.status}
          data-testid="pr-reviewer-approval-response-copy"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">PR reviewer approval response copy</p>
              <h2>Как реагировать на owner/reviewer ответ по PR #17</h2>
            </div>
            <a
              className="primary-link"
              data-testid="pr-reviewer-approval-response-anchor"
              href={prReviewerApprovalResponseCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {prReviewerApprovalResponseCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Approved"
                    ? "Signoff next"
                    : title === "Changes"
                      ? "Review path"
                      : title === "Waiting"
                        ? "Wait-state"
                        : "No merge"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line">{prReviewerApprovalResponseCopy.responseCopy}</p>
          <p className="stage-line muted">{prReviewerApprovalResponseCopy.noMergeCopy}</p>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-base-branch={prOwnerSignoffCheckpointCopy.baseBranch}
          data-branch={prOwnerSignoffCheckpointCopy.branch}
          data-command={prOwnerSignoffCheckpointCopy.command}
          data-expected-check-groups={prOwnerSignoffCheckpointCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={prOwnerSignoffCheckpointCopy.expectedConclusion}
          data-expected-merge-state={prOwnerSignoffCheckpointCopy.expectedMergeState}
          data-expected-pr-comments={prOwnerSignoffCheckpointCopy.expectedPrComments}
          data-expected-review-decision={prOwnerSignoffCheckpointCopy.expectedReviewDecision}
          data-expected-review-threads={prOwnerSignoffCheckpointCopy.expectedReviewThreads}
          data-expected-reviews={prOwnerSignoffCheckpointCopy.expectedReviews}
          data-expected-unresolved-threads={prOwnerSignoffCheckpointCopy.expectedUnresolvedThreads}
          data-link-selector={prOwnerSignoffCheckpointCopy.linkSelector}
          data-no-merge-copy={prOwnerSignoffCheckpointCopy.noMergeCopy}
          data-owner-role={prOwnerSignoffCheckpointCopy.ownerRole}
          data-pr-href={prOwnerSignoffCheckpointCopy.prHref}
          data-release-scope={prOwnerSignoffCheckpointCopy.releaseScope}
          data-repair-targets={prOwnerSignoffCheckpointCopy.repairTargets}
          data-reviewer-response-selector={prOwnerSignoffCheckpointCopy.reviewerResponseSelector}
          data-route={prOwnerSignoffCheckpointCopy.route}
          data-signoff-copy={prOwnerSignoffCheckpointCopy.signoffCopy}
          data-signoff-owners={prOwnerSignoffCheckpointCopy.signoffOwners.join(",")}
          data-signoff-scope={prOwnerSignoffCheckpointCopy.signoffScope}
          data-source-marker-selector={prOwnerSignoffCheckpointCopy.sourceMarkerSelector}
          data-status={prOwnerSignoffCheckpointCopy.status}
          data-testid="pr-owner-signoff-checkpoint-copy"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">PR owner signoff checkpoint copy</p>
              <h2>Что подтверждает owner signoff checkpoint PR #17</h2>
            </div>
            <a
              className="primary-link"
              data-testid="pr-owner-signoff-checkpoint-anchor"
              href={prOwnerSignoffCheckpointCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {prOwnerSignoffCheckpointCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "State"
                    ? "CLEAN"
                    : title === "Checks"
                      ? "SUCCESS"
                      : title === "Review"
                        ? "Signoff"
                        : "Packet next"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line">{prOwnerSignoffCheckpointCopy.signoffCopy}</p>
          <p className="stage-line muted">{prOwnerSignoffCheckpointCopy.noMergeCopy}</p>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-base-branch={prFinalMergeDecisionPacketCopy.baseBranch}
          data-branch={prFinalMergeDecisionPacketCopy.branch}
          data-command={prFinalMergeDecisionPacketCopy.command}
          data-decision-inputs={prFinalMergeDecisionPacketCopy.decisionInputs.join(",")}
          data-decision-scope={prFinalMergeDecisionPacketCopy.decisionScope}
          data-expected-check-groups={prFinalMergeDecisionPacketCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={prFinalMergeDecisionPacketCopy.expectedConclusion}
          data-expected-merge-state={prFinalMergeDecisionPacketCopy.expectedMergeState}
          data-expected-pr-comments={prFinalMergeDecisionPacketCopy.expectedPrComments}
          data-expected-review-decision={prFinalMergeDecisionPacketCopy.expectedReviewDecision}
          data-expected-review-threads={prFinalMergeDecisionPacketCopy.expectedReviewThreads}
          data-expected-reviews={prFinalMergeDecisionPacketCopy.expectedReviews}
          data-expected-unresolved-threads={prFinalMergeDecisionPacketCopy.expectedUnresolvedThreads}
          data-link-selector={prFinalMergeDecisionPacketCopy.linkSelector}
          data-no-merge-copy={prFinalMergeDecisionPacketCopy.noMergeCopy}
          data-owner-role={prFinalMergeDecisionPacketCopy.ownerRole}
          data-owner-signoff-selector={prFinalMergeDecisionPacketCopy.ownerSignoffSelector}
          data-packet-copy={prFinalMergeDecisionPacketCopy.packetCopy}
          data-pr-href={prFinalMergeDecisionPacketCopy.prHref}
          data-release-scope={prFinalMergeDecisionPacketCopy.releaseScope}
          data-repair-targets={prFinalMergeDecisionPacketCopy.repairTargets}
          data-route={prFinalMergeDecisionPacketCopy.route}
          data-source-marker-selector={prFinalMergeDecisionPacketCopy.sourceMarkerSelector}
          data-status={prFinalMergeDecisionPacketCopy.status}
          data-testid="pr-final-merge-decision-packet-copy"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">PR final merge decision packet copy</p>
              <h2>Что входит в final merge decision packet PR #17</h2>
            </div>
            <a
              className="primary-link"
              data-testid="pr-final-merge-decision-packet-anchor"
              href={prFinalMergeDecisionPacketCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {prFinalMergeDecisionPacketCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Ready"
                    ? "Authorize next"
                    : title === "Blocked"
                      ? "Stop"
                      : title === "Decision"
                        ? "Owner choice"
                        : "No merge"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line">{prFinalMergeDecisionPacketCopy.packetCopy}</p>
          <p className="stage-line muted">{prFinalMergeDecisionPacketCopy.noMergeCopy}</p>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-authorization-copy={prOwnerMergeAuthorizationCopy.authorizationCopy}
          data-authorization-scope={prOwnerMergeAuthorizationCopy.authorizationScope}
          data-authorization-states={prOwnerMergeAuthorizationCopy.authorizationStates.join(",")}
          data-base-branch={prOwnerMergeAuthorizationCopy.baseBranch}
          data-branch={prOwnerMergeAuthorizationCopy.branch}
          data-command={prOwnerMergeAuthorizationCopy.command}
          data-decision-packet-selector={prOwnerMergeAuthorizationCopy.decisionPacketSelector}
          data-expected-check-groups={prOwnerMergeAuthorizationCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={prOwnerMergeAuthorizationCopy.expectedConclusion}
          data-expected-merge-state={prOwnerMergeAuthorizationCopy.expectedMergeState}
          data-expected-pr-comments={prOwnerMergeAuthorizationCopy.expectedPrComments}
          data-expected-review-decision={prOwnerMergeAuthorizationCopy.expectedReviewDecision}
          data-expected-review-threads={prOwnerMergeAuthorizationCopy.expectedReviewThreads}
          data-expected-reviews={prOwnerMergeAuthorizationCopy.expectedReviews}
          data-expected-unresolved-threads={prOwnerMergeAuthorizationCopy.expectedUnresolvedThreads}
          data-link-selector={prOwnerMergeAuthorizationCopy.linkSelector}
          data-no-merge-copy={prOwnerMergeAuthorizationCopy.noMergeCopy}
          data-owner-role={prOwnerMergeAuthorizationCopy.ownerRole}
          data-pr-href={prOwnerMergeAuthorizationCopy.prHref}
          data-release-scope={prOwnerMergeAuthorizationCopy.releaseScope}
          data-repair-targets={prOwnerMergeAuthorizationCopy.repairTargets}
          data-route={prOwnerMergeAuthorizationCopy.route}
          data-source-marker-selector={prOwnerMergeAuthorizationCopy.sourceMarkerSelector}
          data-status={prOwnerMergeAuthorizationCopy.status}
          data-testid="pr-owner-merge-authorization-copy"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">PR owner merge authorization copy</p>
              <h2>Как owner авторизует merge PR #17</h2>
            </div>
            <a
              className="primary-link"
              data-testid="pr-owner-merge-authorization-anchor"
              href={prOwnerMergeAuthorizationCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {prOwnerMergeAuthorizationCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Approve"
                    ? "Owner yes"
                    : title === "Wait"
                      ? "Hold"
                      : title === "Return"
                        ? "Review path"
                        : "Manual"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line">{prOwnerMergeAuthorizationCopy.authorizationCopy}</p>
          <p className="stage-line muted">{prOwnerMergeAuthorizationCopy.noMergeCopy}</p>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-base-branch={prPostAuthorizationMergeExecutionChecklistCopy.baseBranch}
          data-branch={prPostAuthorizationMergeExecutionChecklistCopy.branch}
          data-checklist-copy={prPostAuthorizationMergeExecutionChecklistCopy.checklistCopy}
          data-checklist-scope={prPostAuthorizationMergeExecutionChecklistCopy.checklistScope}
          data-command={prPostAuthorizationMergeExecutionChecklistCopy.command}
          data-execution-steps={prPostAuthorizationMergeExecutionChecklistCopy.executionSteps.join(",")}
          data-expected-check-groups={prPostAuthorizationMergeExecutionChecklistCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={prPostAuthorizationMergeExecutionChecklistCopy.expectedConclusion}
          data-expected-merge-state={prPostAuthorizationMergeExecutionChecklistCopy.expectedMergeState}
          data-expected-pr-comments={prPostAuthorizationMergeExecutionChecklistCopy.expectedPrComments}
          data-expected-review-decision={prPostAuthorizationMergeExecutionChecklistCopy.expectedReviewDecision}
          data-expected-review-threads={prPostAuthorizationMergeExecutionChecklistCopy.expectedReviewThreads}
          data-expected-reviews={prPostAuthorizationMergeExecutionChecklistCopy.expectedReviews}
          data-expected-unresolved-threads={prPostAuthorizationMergeExecutionChecklistCopy.expectedUnresolvedThreads}
          data-link-selector={prPostAuthorizationMergeExecutionChecklistCopy.linkSelector}
          data-no-merge-copy={prPostAuthorizationMergeExecutionChecklistCopy.noMergeCopy}
          data-owner-authorization-selector={prPostAuthorizationMergeExecutionChecklistCopy.ownerAuthorizationSelector}
          data-owner-role={prPostAuthorizationMergeExecutionChecklistCopy.ownerRole}
          data-pr-href={prPostAuthorizationMergeExecutionChecklistCopy.prHref}
          data-release-scope={prPostAuthorizationMergeExecutionChecklistCopy.releaseScope}
          data-repair-targets={prPostAuthorizationMergeExecutionChecklistCopy.repairTargets}
          data-route={prPostAuthorizationMergeExecutionChecklistCopy.route}
          data-source-marker-selector={prPostAuthorizationMergeExecutionChecklistCopy.sourceMarkerSelector}
          data-status={prPostAuthorizationMergeExecutionChecklistCopy.status}
          data-testid="pr-post-authorization-merge-execution-checklist-copy"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">PR post-authorization merge execution checklist copy</p>
              <h2>Что проверить перед ручным merge execution PR #17</h2>
            </div>
            <a
              className="primary-link"
              data-testid="pr-post-authorization-merge-execution-checklist-anchor"
              href={prPostAuthorizationMergeExecutionChecklistCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {prPostAuthorizationMergeExecutionChecklistCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Recheck"
                    ? "Fresh gate"
                    : title === "Method"
                      ? "Method"
                      : title === "Rollback"
                        ? "Rollback"
                        : "Stop"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line">{prPostAuthorizationMergeExecutionChecklistCopy.checklistCopy}</p>
          <p className="stage-line muted">{prPostAuthorizationMergeExecutionChecklistCopy.noMergeCopy}</p>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-base-branch={prPostMergeVerificationChecklistCopy.baseBranch}
          data-branch={prPostMergeVerificationChecklistCopy.branch}
          data-command={prPostMergeVerificationChecklistCopy.command}
          data-execution-checklist-selector={prPostMergeVerificationChecklistCopy.executionChecklistSelector}
          data-expected-check-groups={prPostMergeVerificationChecklistCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={prPostMergeVerificationChecklistCopy.expectedConclusion}
          data-expected-merge-state={prPostMergeVerificationChecklistCopy.expectedMergeState}
          data-expected-pr-comments={prPostMergeVerificationChecklistCopy.expectedPrComments}
          data-expected-review-decision={prPostMergeVerificationChecklistCopy.expectedReviewDecision}
          data-expected-review-threads={prPostMergeVerificationChecklistCopy.expectedReviewThreads}
          data-expected-reviews={prPostMergeVerificationChecklistCopy.expectedReviews}
          data-expected-unresolved-threads={prPostMergeVerificationChecklistCopy.expectedUnresolvedThreads}
          data-link-selector={prPostMergeVerificationChecklistCopy.linkSelector}
          data-no-merge-copy={prPostMergeVerificationChecklistCopy.noMergeCopy}
          data-owner-role={prPostMergeVerificationChecklistCopy.ownerRole}
          data-pr-href={prPostMergeVerificationChecklistCopy.prHref}
          data-release-scope={prPostMergeVerificationChecklistCopy.releaseScope}
          data-repair-targets={prPostMergeVerificationChecklistCopy.repairTargets}
          data-route={prPostMergeVerificationChecklistCopy.route}
          data-source-marker-selector={prPostMergeVerificationChecklistCopy.sourceMarkerSelector}
          data-status={prPostMergeVerificationChecklistCopy.status}
          data-verification-copy={prPostMergeVerificationChecklistCopy.verificationCopy}
          data-verification-scope={prPostMergeVerificationChecklistCopy.verificationScope}
          data-verification-steps={prPostMergeVerificationChecklistCopy.verificationSteps.join(",")}
          data-testid="pr-post-merge-verification-checklist-copy"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">PR post-merge verification checklist copy</p>
              <h2>Что проверить после ручного merge PR #17</h2>
            </div>
            <a
              className="primary-link"
              data-testid="pr-post-merge-verification-checklist-anchor"
              href={prPostMergeVerificationChecklistCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {prPostMergeVerificationChecklistCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Merge"
                    ? "After merge"
                    : title === "Main"
                      ? "Main checks"
                      : title === "Release"
                        ? "Release note"
                        : "Standby"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line">{prPostMergeVerificationChecklistCopy.verificationCopy}</p>
          <p className="stage-line muted">{prPostMergeVerificationChecklistCopy.noMergeCopy}</p>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-archive-copy={prReleaseArchiveHandoffCopy.archiveCopy}
          data-archive-evidence={prReleaseArchiveHandoffCopy.archiveEvidence.join(",")}
          data-archive-scope={prReleaseArchiveHandoffCopy.archiveScope}
          data-base-branch={prReleaseArchiveHandoffCopy.baseBranch}
          data-branch={prReleaseArchiveHandoffCopy.branch}
          data-command={prReleaseArchiveHandoffCopy.command}
          data-expected-check-groups={prReleaseArchiveHandoffCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={prReleaseArchiveHandoffCopy.expectedConclusion}
          data-expected-merge-state={prReleaseArchiveHandoffCopy.expectedMergeState}
          data-expected-pr-comments={prReleaseArchiveHandoffCopy.expectedPrComments}
          data-expected-review-decision={prReleaseArchiveHandoffCopy.expectedReviewDecision}
          data-expected-review-threads={prReleaseArchiveHandoffCopy.expectedReviewThreads}
          data-expected-reviews={prReleaseArchiveHandoffCopy.expectedReviews}
          data-expected-unresolved-threads={prReleaseArchiveHandoffCopy.expectedUnresolvedThreads}
          data-link-selector={prReleaseArchiveHandoffCopy.linkSelector}
          data-no-branch-delete-copy={prReleaseArchiveHandoffCopy.noBranchDeleteCopy}
          data-owner-role={prReleaseArchiveHandoffCopy.ownerRole}
          data-post-merge-verification-selector={prReleaseArchiveHandoffCopy.postMergeVerificationSelector}
          data-pr-href={prReleaseArchiveHandoffCopy.prHref}
          data-release-scope={prReleaseArchiveHandoffCopy.releaseScope}
          data-repair-targets={prReleaseArchiveHandoffCopy.repairTargets}
          data-route={prReleaseArchiveHandoffCopy.route}
          data-source-marker-selector={prReleaseArchiveHandoffCopy.sourceMarkerSelector}
          data-status={prReleaseArchiveHandoffCopy.status}
          data-testid="pr-release-archive-handoff-copy"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">PR release archive handoff copy</p>
              <h2>Что сохранить в archive handoff PR #17</h2>
            </div>
            <a
              className="primary-link"
              data-testid="pr-release-archive-handoff-anchor"
              href={prReleaseArchiveHandoffCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {prReleaseArchiveHandoffCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Evidence"
                    ? "Archive set"
                    : title === "Timing"
                      ? "After verify"
                      : title === "Branch"
                        ? "Keep branch"
                        : "Closeout next"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line">{prReleaseArchiveHandoffCopy.archiveCopy}</p>
          <p className="stage-line muted">{prReleaseArchiveHandoffCopy.noBranchDeleteCopy}</p>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-archive-handoff-selector={prFinalPrCloseoutNoteCopy.archiveHandoffSelector}
          data-base-branch={prFinalPrCloseoutNoteCopy.baseBranch}
          data-branch={prFinalPrCloseoutNoteCopy.branch}
          data-closeout-copy={prFinalPrCloseoutNoteCopy.closeoutCopy}
          data-closeout-evidence={prFinalPrCloseoutNoteCopy.closeoutEvidence.join(",")}
          data-closeout-scope={prFinalPrCloseoutNoteCopy.closeoutScope}
          data-command={prFinalPrCloseoutNoteCopy.command}
          data-expected-check-groups={prFinalPrCloseoutNoteCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={prFinalPrCloseoutNoteCopy.expectedConclusion}
          data-expected-merge-state={prFinalPrCloseoutNoteCopy.expectedMergeState}
          data-expected-pr-comments={prFinalPrCloseoutNoteCopy.expectedPrComments}
          data-expected-review-decision={prFinalPrCloseoutNoteCopy.expectedReviewDecision}
          data-expected-review-threads={prFinalPrCloseoutNoteCopy.expectedReviewThreads}
          data-expected-reviews={prFinalPrCloseoutNoteCopy.expectedReviews}
          data-expected-unresolved-threads={prFinalPrCloseoutNoteCopy.expectedUnresolvedThreads}
          data-link-selector={prFinalPrCloseoutNoteCopy.linkSelector}
          data-no-close-copy={prFinalPrCloseoutNoteCopy.noCloseCopy}
          data-owner-role={prFinalPrCloseoutNoteCopy.ownerRole}
          data-pr-href={prFinalPrCloseoutNoteCopy.prHref}
          data-release-scope={prFinalPrCloseoutNoteCopy.releaseScope}
          data-repair-targets={prFinalPrCloseoutNoteCopy.repairTargets}
          data-route={prFinalPrCloseoutNoteCopy.route}
          data-source-marker-selector={prFinalPrCloseoutNoteCopy.sourceMarkerSelector}
          data-status={prFinalPrCloseoutNoteCopy.status}
          data-testid="pr-final-pr-closeout-note-copy"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">PR final closeout note copy</p>
              <h2>Что включить в final closeout note PR #17</h2>
            </div>
            <a
              className="primary-link"
              data-testid="pr-final-pr-closeout-note-anchor"
              href={prFinalPrCloseoutNoteCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {prFinalPrCloseoutNoteCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "State"
                    ? "Clean + green"
                    : title === "Counters"
                      ? "Counters zero"
                      : title === "Archive"
                        ? "Archive linked"
                        : "Owner next"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line">{prFinalPrCloseoutNoteCopy.closeoutCopy}</p>
          <p className="stage-line muted">{prFinalPrCloseoutNoteCopy.noCloseCopy}</p>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-base-branch={prBranchRetentionNoticeCopy.baseBranch}
          data-branch={prBranchRetentionNoticeCopy.branch}
          data-closeout-selector={prBranchRetentionNoticeCopy.closeoutSelector}
          data-command={prBranchRetentionNoticeCopy.command}
          data-expected-check-groups={prBranchRetentionNoticeCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={prBranchRetentionNoticeCopy.expectedConclusion}
          data-expected-merge-state={prBranchRetentionNoticeCopy.expectedMergeState}
          data-expected-pr-comments={prBranchRetentionNoticeCopy.expectedPrComments}
          data-expected-review-decision={prBranchRetentionNoticeCopy.expectedReviewDecision}
          data-expected-review-threads={prBranchRetentionNoticeCopy.expectedReviewThreads}
          data-expected-reviews={prBranchRetentionNoticeCopy.expectedReviews}
          data-expected-unresolved-threads={prBranchRetentionNoticeCopy.expectedUnresolvedThreads}
          data-link-selector={prBranchRetentionNoticeCopy.linkSelector}
          data-no-delete-copy={prBranchRetentionNoticeCopy.noDeleteCopy}
          data-owner-role={prBranchRetentionNoticeCopy.ownerRole}
          data-pr-href={prBranchRetentionNoticeCopy.prHref}
          data-release-scope={prBranchRetentionNoticeCopy.releaseScope}
          data-repair-targets={prBranchRetentionNoticeCopy.repairTargets}
          data-retention-copy={prBranchRetentionNoticeCopy.retentionCopy}
          data-retention-evidence={prBranchRetentionNoticeCopy.retentionEvidence.join(",")}
          data-retention-scope={prBranchRetentionNoticeCopy.retentionScope}
          data-route={prBranchRetentionNoticeCopy.route}
          data-source-marker-selector={prBranchRetentionNoticeCopy.sourceMarkerSelector}
          data-status={prBranchRetentionNoticeCopy.status}
          data-testid="pr-branch-retention-notice-copy"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">PR branch retention notice copy</p>
              <h2>Как сохранить branch после closeout PR #17</h2>
            </div>
            <a
              className="primary-link"
              data-testid="pr-branch-retention-notice-anchor"
              href={prBranchRetentionNoticeCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {prBranchRetentionNoticeCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Branch"
                    ? "Retained"
                    : title === "Delete"
                      ? "No delete"
                      : title === "Rollback"
                        ? "Review ready"
                        : "Tag wait next"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line">{prBranchRetentionNoticeCopy.retentionCopy}</p>
          <p className="stage-line muted">{prBranchRetentionNoticeCopy.noDeleteCopy}</p>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-base-branch={prReleaseTagWaitStateCopy.baseBranch}
          data-branch={prReleaseTagWaitStateCopy.branch}
          data-branch-retention-selector={prReleaseTagWaitStateCopy.branchRetentionSelector}
          data-command={prReleaseTagWaitStateCopy.command}
          data-expected-check-groups={prReleaseTagWaitStateCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={prReleaseTagWaitStateCopy.expectedConclusion}
          data-expected-merge-state={prReleaseTagWaitStateCopy.expectedMergeState}
          data-expected-pr-comments={prReleaseTagWaitStateCopy.expectedPrComments}
          data-expected-review-decision={prReleaseTagWaitStateCopy.expectedReviewDecision}
          data-expected-review-threads={prReleaseTagWaitStateCopy.expectedReviewThreads}
          data-expected-reviews={prReleaseTagWaitStateCopy.expectedReviews}
          data-expected-unresolved-threads={prReleaseTagWaitStateCopy.expectedUnresolvedThreads}
          data-link-selector={prReleaseTagWaitStateCopy.linkSelector}
          data-no-tag-copy={prReleaseTagWaitStateCopy.noTagCopy}
          data-owner-role={prReleaseTagWaitStateCopy.ownerRole}
          data-pr-href={prReleaseTagWaitStateCopy.prHref}
          data-release-scope={prReleaseTagWaitStateCopy.releaseScope}
          data-repair-targets={prReleaseTagWaitStateCopy.repairTargets}
          data-route={prReleaseTagWaitStateCopy.route}
          data-source-marker-selector={prReleaseTagWaitStateCopy.sourceMarkerSelector}
          data-status={prReleaseTagWaitStateCopy.status}
          data-tag-copy={prReleaseTagWaitStateCopy.tagCopy}
          data-tag-evidence={prReleaseTagWaitStateCopy.tagEvidence.join(",")}
          data-tag-scope={prReleaseTagWaitStateCopy.tagScope}
          data-testid="pr-release-tag-wait-state-copy"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">PR release tag wait-state copy</p>
              <h2>Как ждать release tag PR #17</h2>
            </div>
            <a
              className="primary-link"
              data-testid="pr-release-tag-wait-state-anchor"
              href={prReleaseTagWaitStateCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {prReleaseTagWaitStateCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Wait"
                    ? "Owner tag"
                    : title === "Tag"
                      ? "No tag push"
                      : title === "Source"
                        ? "Evidence"
                        : "Monitor next"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line">{prReleaseTagWaitStateCopy.tagCopy}</p>
          <p className="stage-line muted">{prReleaseTagWaitStateCopy.noTagCopy}</p>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-base-branch={prPostReleaseMonitorCopy.baseBranch}
          data-branch={prPostReleaseMonitorCopy.branch}
          data-command={prPostReleaseMonitorCopy.command}
          data-expected-check-groups={prPostReleaseMonitorCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={prPostReleaseMonitorCopy.expectedConclusion}
          data-expected-merge-state={prPostReleaseMonitorCopy.expectedMergeState}
          data-expected-pr-comments={prPostReleaseMonitorCopy.expectedPrComments}
          data-expected-review-decision={prPostReleaseMonitorCopy.expectedReviewDecision}
          data-expected-review-threads={prPostReleaseMonitorCopy.expectedReviewThreads}
          data-expected-reviews={prPostReleaseMonitorCopy.expectedReviews}
          data-expected-unresolved-threads={prPostReleaseMonitorCopy.expectedUnresolvedThreads}
          data-link-selector={prPostReleaseMonitorCopy.linkSelector}
          data-monitor-copy={prPostReleaseMonitorCopy.monitorCopy}
          data-monitor-evidence={prPostReleaseMonitorCopy.monitorEvidence.join(",")}
          data-monitor-scope={prPostReleaseMonitorCopy.monitorScope}
          data-no-deploy-copy={prPostReleaseMonitorCopy.noDeployCopy}
          data-owner-role={prPostReleaseMonitorCopy.ownerRole}
          data-pr-href={prPostReleaseMonitorCopy.prHref}
          data-release-scope={prPostReleaseMonitorCopy.releaseScope}
          data-release-tag-wait-selector={prPostReleaseMonitorCopy.releaseTagWaitSelector}
          data-repair-targets={prPostReleaseMonitorCopy.repairTargets}
          data-route={prPostReleaseMonitorCopy.route}
          data-source-marker-selector={prPostReleaseMonitorCopy.sourceMarkerSelector}
          data-status={prPostReleaseMonitorCopy.status}
          data-testid="pr-post-release-monitor-copy"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">PR post-release monitor copy</p>
              <h2>Что наблюдать после release PR #17</h2>
            </div>
            <a
              className="primary-link"
              data-testid="pr-post-release-monitor-anchor"
              href={prPostReleaseMonitorCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {prPostReleaseMonitorCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Signals"
                    ? "Watch"
                    : title === "Window"
                      ? "Owner window"
                      : title === "Deploy"
                        ? "No action"
                        : "Fallback next"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line">{prPostReleaseMonitorCopy.monitorCopy}</p>
          <p className="stage-line muted">{prPostReleaseMonitorCopy.noDeployCopy}</p>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-base-branch={prReleaseIncidentFallbackCopy.baseBranch}
          data-branch={prReleaseIncidentFallbackCopy.branch}
          data-command={prReleaseIncidentFallbackCopy.command}
          data-expected-check-groups={prReleaseIncidentFallbackCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={prReleaseIncidentFallbackCopy.expectedConclusion}
          data-expected-merge-state={prReleaseIncidentFallbackCopy.expectedMergeState}
          data-expected-pr-comments={prReleaseIncidentFallbackCopy.expectedPrComments}
          data-expected-review-decision={prReleaseIncidentFallbackCopy.expectedReviewDecision}
          data-expected-review-threads={prReleaseIncidentFallbackCopy.expectedReviewThreads}
          data-expected-reviews={prReleaseIncidentFallbackCopy.expectedReviews}
          data-expected-unresolved-threads={prReleaseIncidentFallbackCopy.expectedUnresolvedThreads}
          data-fallback-copy={prReleaseIncidentFallbackCopy.fallbackCopy}
          data-fallback-evidence={prReleaseIncidentFallbackCopy.fallbackEvidence.join(",")}
          data-fallback-scope={prReleaseIncidentFallbackCopy.fallbackScope}
          data-link-selector={prReleaseIncidentFallbackCopy.linkSelector}
          data-no-incident-copy={prReleaseIncidentFallbackCopy.noIncidentCopy}
          data-owner-role={prReleaseIncidentFallbackCopy.ownerRole}
          data-post-release-monitor-selector={prReleaseIncidentFallbackCopy.postReleaseMonitorSelector}
          data-pr-href={prReleaseIncidentFallbackCopy.prHref}
          data-release-scope={prReleaseIncidentFallbackCopy.releaseScope}
          data-repair-targets={prReleaseIncidentFallbackCopy.repairTargets}
          data-route={prReleaseIncidentFallbackCopy.route}
          data-source-marker-selector={prReleaseIncidentFallbackCopy.sourceMarkerSelector}
          data-status={prReleaseIncidentFallbackCopy.status}
          data-testid="pr-release-incident-fallback-copy"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">PR release incident fallback copy</p>
              <h2>Как описать fallback signals PR #17</h2>
            </div>
            <a
              className="primary-link"
              data-testid="pr-release-incident-fallback-anchor"
              href={prReleaseIncidentFallbackCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {prReleaseIncidentFallbackCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Signal"
                    ? "Watch signal"
                    : title === "Summary"
                      ? "Summary"
                      : title === "Action"
                        ? "No incident"
                        : "Retro next"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line">{prReleaseIncidentFallbackCopy.fallbackCopy}</p>
          <p className="stage-line muted">{prReleaseIncidentFallbackCopy.noIncidentCopy}</p>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-base-branch={prReleaseRetrospectiveNoteCopy.baseBranch}
          data-branch={prReleaseRetrospectiveNoteCopy.branch}
          data-command={prReleaseRetrospectiveNoteCopy.command}
          data-expected-check-groups={prReleaseRetrospectiveNoteCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={prReleaseRetrospectiveNoteCopy.expectedConclusion}
          data-expected-merge-state={prReleaseRetrospectiveNoteCopy.expectedMergeState}
          data-expected-pr-comments={prReleaseRetrospectiveNoteCopy.expectedPrComments}
          data-expected-review-decision={prReleaseRetrospectiveNoteCopy.expectedReviewDecision}
          data-expected-review-threads={prReleaseRetrospectiveNoteCopy.expectedReviewThreads}
          data-expected-reviews={prReleaseRetrospectiveNoteCopy.expectedReviews}
          data-expected-unresolved-threads={prReleaseRetrospectiveNoteCopy.expectedUnresolvedThreads}
          data-incident-fallback-selector={prReleaseRetrospectiveNoteCopy.incidentFallbackSelector}
          data-link-selector={prReleaseRetrospectiveNoteCopy.linkSelector}
          data-no-docs-issue-copy={prReleaseRetrospectiveNoteCopy.noDocsIssueCopy}
          data-owner-role={prReleaseRetrospectiveNoteCopy.ownerRole}
          data-pr-href={prReleaseRetrospectiveNoteCopy.prHref}
          data-release-scope={prReleaseRetrospectiveNoteCopy.releaseScope}
          data-repair-targets={prReleaseRetrospectiveNoteCopy.repairTargets}
          data-retrospective-copy={prReleaseRetrospectiveNoteCopy.retrospectiveCopy}
          data-retrospective-evidence={prReleaseRetrospectiveNoteCopy.retrospectiveEvidence.join(",")}
          data-retrospective-scope={prReleaseRetrospectiveNoteCopy.retrospectiveScope}
          data-route={prReleaseRetrospectiveNoteCopy.route}
          data-source-marker-selector={prReleaseRetrospectiveNoteCopy.sourceMarkerSelector}
          data-status={prReleaseRetrospectiveNoteCopy.status}
          data-testid="pr-release-retrospective-note-copy"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">PR release retrospective note copy</p>
              <h2>Как зафиксировать retrospective note PR #17</h2>
            </div>
            <a
              className="primary-link"
              data-testid="pr-release-retrospective-note-anchor"
              href={prReleaseRetrospectiveNoteCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {prReleaseRetrospectiveNoteCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Result"
                    ? "Result note"
                    : title === "Evidence"
                      ? "Evidence"
                      : title === "Action"
                        ? "No issue"
                        : "Lessons next"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line">{prReleaseRetrospectiveNoteCopy.retrospectiveCopy}</p>
          <p className="stage-line muted">{prReleaseRetrospectiveNoteCopy.noDocsIssueCopy}</p>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-base-branch={prReleaseLessonsLearnedFollowUpCopy.baseBranch}
          data-branch={prReleaseLessonsLearnedFollowUpCopy.branch}
          data-command={prReleaseLessonsLearnedFollowUpCopy.command}
          data-expected-check-groups={prReleaseLessonsLearnedFollowUpCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={prReleaseLessonsLearnedFollowUpCopy.expectedConclusion}
          data-expected-merge-state={prReleaseLessonsLearnedFollowUpCopy.expectedMergeState}
          data-expected-pr-comments={prReleaseLessonsLearnedFollowUpCopy.expectedPrComments}
          data-expected-review-decision={prReleaseLessonsLearnedFollowUpCopy.expectedReviewDecision}
          data-expected-review-threads={prReleaseLessonsLearnedFollowUpCopy.expectedReviewThreads}
          data-expected-reviews={prReleaseLessonsLearnedFollowUpCopy.expectedReviews}
          data-expected-unresolved-threads={prReleaseLessonsLearnedFollowUpCopy.expectedUnresolvedThreads}
          data-lessons-copy={prReleaseLessonsLearnedFollowUpCopy.lessonsCopy}
          data-lessons-evidence={prReleaseLessonsLearnedFollowUpCopy.lessonsEvidence.join(",")}
          data-lessons-scope={prReleaseLessonsLearnedFollowUpCopy.lessonsScope}
          data-link-selector={prReleaseLessonsLearnedFollowUpCopy.linkSelector}
          data-no-owner-action-copy={prReleaseLessonsLearnedFollowUpCopy.noOwnerActionCopy}
          data-owner-role={prReleaseLessonsLearnedFollowUpCopy.ownerRole}
          data-pr-href={prReleaseLessonsLearnedFollowUpCopy.prHref}
          data-release-scope={prReleaseLessonsLearnedFollowUpCopy.releaseScope}
          data-repair-targets={prReleaseLessonsLearnedFollowUpCopy.repairTargets}
          data-retrospective-note-selector={prReleaseLessonsLearnedFollowUpCopy.retrospectiveNoteSelector}
          data-route={prReleaseLessonsLearnedFollowUpCopy.route}
          data-source-marker-selector={prReleaseLessonsLearnedFollowUpCopy.sourceMarkerSelector}
          data-status={prReleaseLessonsLearnedFollowUpCopy.status}
          data-testid="pr-release-lessons-learned-follow-up-copy"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">PR release lessons learned follow-up copy</p>
              <h2>Как описать lessons learned PR #17</h2>
            </div>
            <a
              className="primary-link"
              data-testid="pr-release-lessons-learned-anchor"
              href={prReleaseLessonsLearnedFollowUpCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {prReleaseLessonsLearnedFollowUpCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Learn"
                    ? "Lessons"
                    : title === "Follow-up"
                      ? "Candidates"
                      : title === "Action"
                        ? "No owner action"
                        : "Backlog next"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line">{prReleaseLessonsLearnedFollowUpCopy.lessonsCopy}</p>
          <p className="stage-line muted">{prReleaseLessonsLearnedFollowUpCopy.noOwnerActionCopy}</p>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-backlog-copy={prReleaseActionItemsBacklogCopy.backlogCopy}
          data-backlog-evidence={prReleaseActionItemsBacklogCopy.backlogEvidence.join(",")}
          data-backlog-scope={prReleaseActionItemsBacklogCopy.backlogScope}
          data-base-branch={prReleaseActionItemsBacklogCopy.baseBranch}
          data-branch={prReleaseActionItemsBacklogCopy.branch}
          data-command={prReleaseActionItemsBacklogCopy.command}
          data-expected-check-groups={prReleaseActionItemsBacklogCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={prReleaseActionItemsBacklogCopy.expectedConclusion}
          data-expected-merge-state={prReleaseActionItemsBacklogCopy.expectedMergeState}
          data-expected-pr-comments={prReleaseActionItemsBacklogCopy.expectedPrComments}
          data-expected-review-decision={prReleaseActionItemsBacklogCopy.expectedReviewDecision}
          data-expected-review-threads={prReleaseActionItemsBacklogCopy.expectedReviewThreads}
          data-expected-reviews={prReleaseActionItemsBacklogCopy.expectedReviews}
          data-expected-unresolved-threads={prReleaseActionItemsBacklogCopy.expectedUnresolvedThreads}
          data-lessons-learned-selector={prReleaseActionItemsBacklogCopy.lessonsLearnedSelector}
          data-link-selector={prReleaseActionItemsBacklogCopy.linkSelector}
          data-no-task-creation-copy={prReleaseActionItemsBacklogCopy.noTaskCreationCopy}
          data-owner-role={prReleaseActionItemsBacklogCopy.ownerRole}
          data-pr-href={prReleaseActionItemsBacklogCopy.prHref}
          data-release-scope={prReleaseActionItemsBacklogCopy.releaseScope}
          data-repair-targets={prReleaseActionItemsBacklogCopy.repairTargets}
          data-route={prReleaseActionItemsBacklogCopy.route}
          data-source-marker-selector={prReleaseActionItemsBacklogCopy.sourceMarkerSelector}
          data-status={prReleaseActionItemsBacklogCopy.status}
          data-testid="pr-release-action-items-backlog-copy"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">PR release action items backlog copy</p>
              <h2>Как описать action items backlog PR #17</h2>
            </div>
            <a
              className="primary-link"
              data-testid="pr-release-action-items-backlog-anchor"
              href={prReleaseActionItemsBacklogCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {prReleaseActionItemsBacklogCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Backlog"
                    ? "Backlog"
                    : title === "Question"
                      ? "Draft"
                      : title === "Action"
                        ? "No tasks"
                        : "Triage next"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line">{prReleaseActionItemsBacklogCopy.backlogCopy}</p>
          <p className="stage-line muted">{prReleaseActionItemsBacklogCopy.noTaskCreationCopy}</p>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-backlog-selector={prReleaseActionItemsTriageCopy.backlogSelector}
          data-base-branch={prReleaseActionItemsTriageCopy.baseBranch}
          data-branch={prReleaseActionItemsTriageCopy.branch}
          data-command={prReleaseActionItemsTriageCopy.command}
          data-expected-check-groups={prReleaseActionItemsTriageCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={prReleaseActionItemsTriageCopy.expectedConclusion}
          data-expected-merge-state={prReleaseActionItemsTriageCopy.expectedMergeState}
          data-expected-pr-comments={prReleaseActionItemsTriageCopy.expectedPrComments}
          data-expected-review-decision={prReleaseActionItemsTriageCopy.expectedReviewDecision}
          data-expected-review-threads={prReleaseActionItemsTriageCopy.expectedReviewThreads}
          data-expected-reviews={prReleaseActionItemsTriageCopy.expectedReviews}
          data-expected-unresolved-threads={prReleaseActionItemsTriageCopy.expectedUnresolvedThreads}
          data-link-selector={prReleaseActionItemsTriageCopy.linkSelector}
          data-no-owner-assignment-copy={prReleaseActionItemsTriageCopy.noOwnerAssignmentCopy}
          data-owner-role={prReleaseActionItemsTriageCopy.ownerRole}
          data-pr-href={prReleaseActionItemsTriageCopy.prHref}
          data-release-scope={prReleaseActionItemsTriageCopy.releaseScope}
          data-repair-targets={prReleaseActionItemsTriageCopy.repairTargets}
          data-route={prReleaseActionItemsTriageCopy.route}
          data-source-marker-selector={prReleaseActionItemsTriageCopy.sourceMarkerSelector}
          data-status={prReleaseActionItemsTriageCopy.status}
          data-triage-copy={prReleaseActionItemsTriageCopy.triageCopy}
          data-triage-evidence={prReleaseActionItemsTriageCopy.triageEvidence.join(",")}
          data-triage-scope={prReleaseActionItemsTriageCopy.triageScope}
          data-testid="pr-release-action-items-triage-copy"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">PR release action items triage copy</p>
              <h2>Как описать action items triage PR #17</h2>
            </div>
            <a
              className="primary-link"
              data-testid="pr-release-action-items-triage-anchor"
              href={prReleaseActionItemsTriageCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {prReleaseActionItemsTriageCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Impact"
                    ? "Impact"
                    : title === "Question"
                      ? "Question"
                      : title === "Action"
                        ? "No assignment"
                        : "Owner next"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line">{prReleaseActionItemsTriageCopy.triageCopy}</p>
          <p className="stage-line muted">{prReleaseActionItemsTriageCopy.noOwnerAssignmentCopy}</p>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-base-branch={prReleaseActionItemsOwnerQuestionCopy.baseBranch}
          data-branch={prReleaseActionItemsOwnerQuestionCopy.branch}
          data-command={prReleaseActionItemsOwnerQuestionCopy.command}
          data-expected-check-groups={prReleaseActionItemsOwnerQuestionCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={prReleaseActionItemsOwnerQuestionCopy.expectedConclusion}
          data-expected-merge-state={prReleaseActionItemsOwnerQuestionCopy.expectedMergeState}
          data-expected-pr-comments={prReleaseActionItemsOwnerQuestionCopy.expectedPrComments}
          data-expected-review-decision={prReleaseActionItemsOwnerQuestionCopy.expectedReviewDecision}
          data-expected-review-threads={prReleaseActionItemsOwnerQuestionCopy.expectedReviewThreads}
          data-expected-reviews={prReleaseActionItemsOwnerQuestionCopy.expectedReviews}
          data-expected-unresolved-threads={prReleaseActionItemsOwnerQuestionCopy.expectedUnresolvedThreads}
          data-link-selector={prReleaseActionItemsOwnerQuestionCopy.linkSelector}
          data-no-owner-assignment-copy={prReleaseActionItemsOwnerQuestionCopy.noOwnerAssignmentCopy}
          data-owner-question-copy={prReleaseActionItemsOwnerQuestionCopy.ownerQuestionCopy}
          data-owner-question-evidence={prReleaseActionItemsOwnerQuestionCopy.ownerQuestionEvidence.join(",")}
          data-owner-question-scope={prReleaseActionItemsOwnerQuestionCopy.ownerQuestionScope}
          data-owner-role={prReleaseActionItemsOwnerQuestionCopy.ownerRole}
          data-pr-href={prReleaseActionItemsOwnerQuestionCopy.prHref}
          data-release-scope={prReleaseActionItemsOwnerQuestionCopy.releaseScope}
          data-repair-targets={prReleaseActionItemsOwnerQuestionCopy.repairTargets}
          data-route={prReleaseActionItemsOwnerQuestionCopy.route}
          data-source-marker-selector={prReleaseActionItemsOwnerQuestionCopy.sourceMarkerSelector}
          data-status={prReleaseActionItemsOwnerQuestionCopy.status}
          data-triage-selector={prReleaseActionItemsOwnerQuestionCopy.triageSelector}
          data-testid="pr-release-action-items-owner-question-copy"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">PR release action items owner question copy</p>
              <h2>Как описать action items owner question PR #17</h2>
            </div>
            <a
              className="primary-link"
              data-testid="pr-release-action-items-owner-question-anchor"
              href={prReleaseActionItemsOwnerQuestionCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {prReleaseActionItemsOwnerQuestionCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Owner"
                    ? "Question"
                    : title === "Evidence"
                      ? "Evidence"
                      : title === "Action"
                        ? "No answer"
                        : "Answer next"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line">{prReleaseActionItemsOwnerQuestionCopy.ownerQuestionCopy}</p>
          <p className="stage-line muted">{prReleaseActionItemsOwnerQuestionCopy.noOwnerAssignmentCopy}</p>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-base-branch={prReleaseActionItemsOwnerAnswerCopy.baseBranch}
          data-branch={prReleaseActionItemsOwnerAnswerCopy.branch}
          data-command={prReleaseActionItemsOwnerAnswerCopy.command}
          data-expected-check-groups={prReleaseActionItemsOwnerAnswerCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={prReleaseActionItemsOwnerAnswerCopy.expectedConclusion}
          data-expected-merge-state={prReleaseActionItemsOwnerAnswerCopy.expectedMergeState}
          data-expected-pr-comments={prReleaseActionItemsOwnerAnswerCopy.expectedPrComments}
          data-expected-review-decision={prReleaseActionItemsOwnerAnswerCopy.expectedReviewDecision}
          data-expected-review-threads={prReleaseActionItemsOwnerAnswerCopy.expectedReviewThreads}
          data-expected-reviews={prReleaseActionItemsOwnerAnswerCopy.expectedReviews}
          data-expected-unresolved-threads={prReleaseActionItemsOwnerAnswerCopy.expectedUnresolvedThreads}
          data-link-selector={prReleaseActionItemsOwnerAnswerCopy.linkSelector}
          data-no-answer-capture-copy={prReleaseActionItemsOwnerAnswerCopy.noAnswerCaptureCopy}
          data-owner-answer-copy={prReleaseActionItemsOwnerAnswerCopy.ownerAnswerCopy}
          data-owner-answer-scope={prReleaseActionItemsOwnerAnswerCopy.ownerAnswerScope}
          data-owner-answer-states={prReleaseActionItemsOwnerAnswerCopy.ownerAnswerStates.join(",")}
          data-owner-question-selector={prReleaseActionItemsOwnerAnswerCopy.ownerQuestionSelector}
          data-owner-role={prReleaseActionItemsOwnerAnswerCopy.ownerRole}
          data-pr-href={prReleaseActionItemsOwnerAnswerCopy.prHref}
          data-release-scope={prReleaseActionItemsOwnerAnswerCopy.releaseScope}
          data-repair-targets={prReleaseActionItemsOwnerAnswerCopy.repairTargets}
          data-route={prReleaseActionItemsOwnerAnswerCopy.route}
          data-source-marker-selector={prReleaseActionItemsOwnerAnswerCopy.sourceMarkerSelector}
          data-status={prReleaseActionItemsOwnerAnswerCopy.status}
          data-testid="pr-release-action-items-owner-answer-copy"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">PR release action items owner answer copy</p>
              <h2>Как описать action items owner answer PR #17</h2>
            </div>
            <a
              className="primary-link"
              data-testid="pr-release-action-items-owner-answer-anchor"
              href={prReleaseActionItemsOwnerAnswerCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {prReleaseActionItemsOwnerAnswerCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Accept"
                    ? "States"
                    : title === "Evidence"
                      ? "Evidence"
                      : title === "Action"
                        ? "No capture"
                        : "Criteria next"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line">{prReleaseActionItemsOwnerAnswerCopy.ownerAnswerCopy}</p>
          <p className="stage-line muted">{prReleaseActionItemsOwnerAnswerCopy.noAnswerCaptureCopy}</p>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-acceptance-criteria={prReleaseActionItemsAcceptanceCriteriaCopy.acceptanceCriteria.join(",")}
          data-acceptance-criteria-copy={prReleaseActionItemsAcceptanceCriteriaCopy.acceptanceCriteriaCopy}
          data-acceptance-criteria-scope={prReleaseActionItemsAcceptanceCriteriaCopy.acceptanceCriteriaScope}
          data-base-branch={prReleaseActionItemsAcceptanceCriteriaCopy.baseBranch}
          data-branch={prReleaseActionItemsAcceptanceCriteriaCopy.branch}
          data-command={prReleaseActionItemsAcceptanceCriteriaCopy.command}
          data-expected-check-groups={prReleaseActionItemsAcceptanceCriteriaCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={prReleaseActionItemsAcceptanceCriteriaCopy.expectedConclusion}
          data-expected-merge-state={prReleaseActionItemsAcceptanceCriteriaCopy.expectedMergeState}
          data-expected-pr-comments={prReleaseActionItemsAcceptanceCriteriaCopy.expectedPrComments}
          data-expected-review-decision={prReleaseActionItemsAcceptanceCriteriaCopy.expectedReviewDecision}
          data-expected-review-threads={prReleaseActionItemsAcceptanceCriteriaCopy.expectedReviewThreads}
          data-expected-reviews={prReleaseActionItemsAcceptanceCriteriaCopy.expectedReviews}
          data-expected-unresolved-threads={prReleaseActionItemsAcceptanceCriteriaCopy.expectedUnresolvedThreads}
          data-link-selector={prReleaseActionItemsAcceptanceCriteriaCopy.linkSelector}
          data-no-task-creation-copy={prReleaseActionItemsAcceptanceCriteriaCopy.noTaskCreationCopy}
          data-owner-answer-selector={prReleaseActionItemsAcceptanceCriteriaCopy.ownerAnswerSelector}
          data-owner-role={prReleaseActionItemsAcceptanceCriteriaCopy.ownerRole}
          data-pr-href={prReleaseActionItemsAcceptanceCriteriaCopy.prHref}
          data-release-scope={prReleaseActionItemsAcceptanceCriteriaCopy.releaseScope}
          data-repair-targets={prReleaseActionItemsAcceptanceCriteriaCopy.repairTargets}
          data-route={prReleaseActionItemsAcceptanceCriteriaCopy.route}
          data-source-marker-selector={prReleaseActionItemsAcceptanceCriteriaCopy.sourceMarkerSelector}
          data-status={prReleaseActionItemsAcceptanceCriteriaCopy.status}
          data-testid="pr-release-action-items-acceptance-criteria-copy"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">PR release action items acceptance criteria copy</p>
              <h2>Как описать action items acceptance criteria PR #17</h2>
            </div>
            <a
              className="primary-link"
              data-testid="pr-release-action-items-acceptance-criteria-anchor"
              href={prReleaseActionItemsAcceptanceCriteriaCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {prReleaseActionItemsAcceptanceCriteriaCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Ready"
                    ? "Criteria"
                    : title === "Priority"
                      ? "Signal"
                      : title === "Action"
                        ? "No tasks"
                        : "Guardrails next"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line">{prReleaseActionItemsAcceptanceCriteriaCopy.acceptanceCriteriaCopy}</p>
          <p className="stage-line muted">{prReleaseActionItemsAcceptanceCriteriaCopy.noTaskCreationCopy}</p>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-acceptance-criteria-selector={prReleaseActionItemsImplementationGuardrailsCopy.acceptanceCriteriaSelector}
          data-base-branch={prReleaseActionItemsImplementationGuardrailsCopy.baseBranch}
          data-branch={prReleaseActionItemsImplementationGuardrailsCopy.branch}
          data-command={prReleaseActionItemsImplementationGuardrailsCopy.command}
          data-expected-check-groups={prReleaseActionItemsImplementationGuardrailsCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={prReleaseActionItemsImplementationGuardrailsCopy.expectedConclusion}
          data-expected-merge-state={prReleaseActionItemsImplementationGuardrailsCopy.expectedMergeState}
          data-expected-pr-comments={prReleaseActionItemsImplementationGuardrailsCopy.expectedPrComments}
          data-expected-review-decision={prReleaseActionItemsImplementationGuardrailsCopy.expectedReviewDecision}
          data-expected-review-threads={prReleaseActionItemsImplementationGuardrailsCopy.expectedReviewThreads}
          data-expected-reviews={prReleaseActionItemsImplementationGuardrailsCopy.expectedReviews}
          data-expected-unresolved-threads={prReleaseActionItemsImplementationGuardrailsCopy.expectedUnresolvedThreads}
          data-implementation-guardrails={prReleaseActionItemsImplementationGuardrailsCopy.implementationGuardrails.join(",")}
          data-implementation-guardrails-copy={prReleaseActionItemsImplementationGuardrailsCopy.implementationGuardrailsCopy}
          data-implementation-guardrails-scope={prReleaseActionItemsImplementationGuardrailsCopy.implementationGuardrailsScope}
          data-link-selector={prReleaseActionItemsImplementationGuardrailsCopy.linkSelector}
          data-no-execution-copy={prReleaseActionItemsImplementationGuardrailsCopy.noExecutionCopy}
          data-owner-role={prReleaseActionItemsImplementationGuardrailsCopy.ownerRole}
          data-pr-href={prReleaseActionItemsImplementationGuardrailsCopy.prHref}
          data-release-scope={prReleaseActionItemsImplementationGuardrailsCopy.releaseScope}
          data-repair-targets={prReleaseActionItemsImplementationGuardrailsCopy.repairTargets}
          data-route={prReleaseActionItemsImplementationGuardrailsCopy.route}
          data-source-marker-selector={prReleaseActionItemsImplementationGuardrailsCopy.sourceMarkerSelector}
          data-status={prReleaseActionItemsImplementationGuardrailsCopy.status}
          data-testid="pr-release-action-items-implementation-guardrails-copy"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">PR release action items implementation guardrails copy</p>
              <h2>Как описать action items implementation guardrails PR #17</h2>
            </div>
            <a
              className="primary-link"
              data-testid="pr-release-action-items-implementation-guardrails-anchor"
              href={prReleaseActionItemsImplementationGuardrailsCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {prReleaseActionItemsImplementationGuardrailsCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Scope"
                    ? "Rules"
                    : title === "Owner"
                      ? "Owner gate"
                      : title === "Action"
                        ? "No action"
                        : "Handoff next"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line">{prReleaseActionItemsImplementationGuardrailsCopy.implementationGuardrailsCopy}</p>
          <p className="stage-line muted">{prReleaseActionItemsImplementationGuardrailsCopy.noExecutionCopy}</p>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-base-branch={prReleaseActionItemsTrackingHandoffCopy.baseBranch}
          data-branch={prReleaseActionItemsTrackingHandoffCopy.branch}
          data-command={prReleaseActionItemsTrackingHandoffCopy.command}
          data-expected-check-groups={prReleaseActionItemsTrackingHandoffCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={prReleaseActionItemsTrackingHandoffCopy.expectedConclusion}
          data-expected-merge-state={prReleaseActionItemsTrackingHandoffCopy.expectedMergeState}
          data-expected-pr-comments={prReleaseActionItemsTrackingHandoffCopy.expectedPrComments}
          data-expected-review-decision={prReleaseActionItemsTrackingHandoffCopy.expectedReviewDecision}
          data-expected-review-threads={prReleaseActionItemsTrackingHandoffCopy.expectedReviewThreads}
          data-expected-reviews={prReleaseActionItemsTrackingHandoffCopy.expectedReviews}
          data-expected-unresolved-threads={prReleaseActionItemsTrackingHandoffCopy.expectedUnresolvedThreads}
          data-implementation-guardrails-selector={
            prReleaseActionItemsTrackingHandoffCopy.implementationGuardrailsSelector
          }
          data-link-selector={prReleaseActionItemsTrackingHandoffCopy.linkSelector}
          data-no-task-creation-copy={prReleaseActionItemsTrackingHandoffCopy.noTaskCreationCopy}
          data-owner-role={prReleaseActionItemsTrackingHandoffCopy.ownerRole}
          data-pr-href={prReleaseActionItemsTrackingHandoffCopy.prHref}
          data-release-scope={prReleaseActionItemsTrackingHandoffCopy.releaseScope}
          data-repair-targets={prReleaseActionItemsTrackingHandoffCopy.repairTargets}
          data-route={prReleaseActionItemsTrackingHandoffCopy.route}
          data-source-marker-selector={prReleaseActionItemsTrackingHandoffCopy.sourceMarkerSelector}
          data-status={prReleaseActionItemsTrackingHandoffCopy.status}
          data-tracking-handoff-copy={prReleaseActionItemsTrackingHandoffCopy.trackingHandoffCopy}
          data-tracking-handoff-fields={prReleaseActionItemsTrackingHandoffCopy.trackingHandoffFields.join(",")}
          data-tracking-handoff-scope={prReleaseActionItemsTrackingHandoffCopy.trackingHandoffScope}
          data-testid="pr-release-action-items-tracking-handoff-copy"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">PR release action items tracking handoff copy</p>
              <h2>Как описать action items tracking handoff PR #17</h2>
            </div>
            <a
              className="primary-link"
              data-testid="pr-release-action-items-tracking-handoff-anchor"
              href={prReleaseActionItemsTrackingHandoffCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {prReleaseActionItemsTrackingHandoffCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Target"
                    ? "Handoff"
                    : title === "Cadence"
                      ? "Cadence"
                      : title === "Action"
                        ? "No tasks"
                        : "Rollup next"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line">{prReleaseActionItemsTrackingHandoffCopy.trackingHandoffCopy}</p>
          <p className="stage-line muted">{prReleaseActionItemsTrackingHandoffCopy.noTaskCreationCopy}</p>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-base-branch={prReleaseActionItemsStatusRollupCopy.baseBranch}
          data-branch={prReleaseActionItemsStatusRollupCopy.branch}
          data-command={prReleaseActionItemsStatusRollupCopy.command}
          data-expected-check-groups={prReleaseActionItemsStatusRollupCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={prReleaseActionItemsStatusRollupCopy.expectedConclusion}
          data-expected-merge-state={prReleaseActionItemsStatusRollupCopy.expectedMergeState}
          data-expected-pr-comments={prReleaseActionItemsStatusRollupCopy.expectedPrComments}
          data-expected-review-decision={prReleaseActionItemsStatusRollupCopy.expectedReviewDecision}
          data-expected-review-threads={prReleaseActionItemsStatusRollupCopy.expectedReviewThreads}
          data-expected-reviews={prReleaseActionItemsStatusRollupCopy.expectedReviews}
          data-expected-unresolved-threads={prReleaseActionItemsStatusRollupCopy.expectedUnresolvedThreads}
          data-link-selector={prReleaseActionItemsStatusRollupCopy.linkSelector}
          data-no-status-mutation-copy={prReleaseActionItemsStatusRollupCopy.noStatusMutationCopy}
          data-owner-role={prReleaseActionItemsStatusRollupCopy.ownerRole}
          data-pr-href={prReleaseActionItemsStatusRollupCopy.prHref}
          data-release-scope={prReleaseActionItemsStatusRollupCopy.releaseScope}
          data-repair-targets={prReleaseActionItemsStatusRollupCopy.repairTargets}
          data-route={prReleaseActionItemsStatusRollupCopy.route}
          data-source-marker-selector={prReleaseActionItemsStatusRollupCopy.sourceMarkerSelector}
          data-status={prReleaseActionItemsStatusRollupCopy.status}
          data-status-rollup-copy={prReleaseActionItemsStatusRollupCopy.statusRollupCopy}
          data-status-rollup-fields={prReleaseActionItemsStatusRollupCopy.statusRollupFields.join(",")}
          data-status-rollup-scope={prReleaseActionItemsStatusRollupCopy.statusRollupScope}
          data-testid="pr-release-action-items-status-rollup-copy"
          data-tracking-handoff-selector={prReleaseActionItemsStatusRollupCopy.trackingHandoffSelector}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">PR release action items status rollup copy</p>
              <h2>Как описать action items status rollup PR #17</h2>
            </div>
            <a
              className="primary-link"
              data-testid="pr-release-action-items-status-rollup-anchor"
              href={prReleaseActionItemsStatusRollupCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {prReleaseActionItemsStatusRollupCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "State"
                    ? "Rollup"
                    : title === "Evidence"
                      ? "Freshness"
                      : title === "Action"
                        ? "No status"
                        : "Closure next"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line">{prReleaseActionItemsStatusRollupCopy.statusRollupCopy}</p>
          <p className="stage-line muted">{prReleaseActionItemsStatusRollupCopy.noStatusMutationCopy}</p>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-base-branch={prReleaseActionItemsClosureNoteCopy.baseBranch}
          data-branch={prReleaseActionItemsClosureNoteCopy.branch}
          data-closure-note-copy={prReleaseActionItemsClosureNoteCopy.closureNoteCopy}
          data-closure-note-fields={prReleaseActionItemsClosureNoteCopy.closureNoteFields.join(",")}
          data-closure-note-scope={prReleaseActionItemsClosureNoteCopy.closureNoteScope}
          data-command={prReleaseActionItemsClosureNoteCopy.command}
          data-expected-check-groups={prReleaseActionItemsClosureNoteCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={prReleaseActionItemsClosureNoteCopy.expectedConclusion}
          data-expected-merge-state={prReleaseActionItemsClosureNoteCopy.expectedMergeState}
          data-expected-pr-comments={prReleaseActionItemsClosureNoteCopy.expectedPrComments}
          data-expected-review-decision={prReleaseActionItemsClosureNoteCopy.expectedReviewDecision}
          data-expected-review-threads={prReleaseActionItemsClosureNoteCopy.expectedReviewThreads}
          data-expected-reviews={prReleaseActionItemsClosureNoteCopy.expectedReviews}
          data-expected-unresolved-threads={prReleaseActionItemsClosureNoteCopy.expectedUnresolvedThreads}
          data-link-selector={prReleaseActionItemsClosureNoteCopy.linkSelector}
          data-no-closure-mutation-copy={prReleaseActionItemsClosureNoteCopy.noClosureMutationCopy}
          data-owner-role={prReleaseActionItemsClosureNoteCopy.ownerRole}
          data-pr-href={prReleaseActionItemsClosureNoteCopy.prHref}
          data-release-scope={prReleaseActionItemsClosureNoteCopy.releaseScope}
          data-repair-targets={prReleaseActionItemsClosureNoteCopy.repairTargets}
          data-route={prReleaseActionItemsClosureNoteCopy.route}
          data-source-marker-selector={prReleaseActionItemsClosureNoteCopy.sourceMarkerSelector}
          data-status={prReleaseActionItemsClosureNoteCopy.status}
          data-status-rollup-selector={prReleaseActionItemsClosureNoteCopy.statusRollupSelector}
          data-testid="pr-release-action-items-closure-note-copy"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">PR release action items closure note copy</p>
              <h2>Как описать action items closure note PR #17</h2>
            </div>
            <a
              className="primary-link"
              data-testid="pr-release-action-items-closure-note-anchor"
              href={prReleaseActionItemsClosureNoteCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {prReleaseActionItemsClosureNoteCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Condition"
                    ? "Closure"
                    : title === "Risk"
                      ? "Reopen"
                      : title === "Action"
                        ? "No close"
                        : "Archive next"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line">{prReleaseActionItemsClosureNoteCopy.closureNoteCopy}</p>
          <p className="stage-line muted">{prReleaseActionItemsClosureNoteCopy.noClosureMutationCopy}</p>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-archive-note-copy={prReleaseActionItemsArchiveNoteCopy.archiveNoteCopy}
          data-archive-note-fields={prReleaseActionItemsArchiveNoteCopy.archiveNoteFields.join(",")}
          data-archive-note-scope={prReleaseActionItemsArchiveNoteCopy.archiveNoteScope}
          data-base-branch={prReleaseActionItemsArchiveNoteCopy.baseBranch}
          data-branch={prReleaseActionItemsArchiveNoteCopy.branch}
          data-closure-note-selector={prReleaseActionItemsArchiveNoteCopy.closureNoteSelector}
          data-command={prReleaseActionItemsArchiveNoteCopy.command}
          data-expected-check-groups={prReleaseActionItemsArchiveNoteCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={prReleaseActionItemsArchiveNoteCopy.expectedConclusion}
          data-expected-merge-state={prReleaseActionItemsArchiveNoteCopy.expectedMergeState}
          data-expected-pr-comments={prReleaseActionItemsArchiveNoteCopy.expectedPrComments}
          data-expected-review-decision={prReleaseActionItemsArchiveNoteCopy.expectedReviewDecision}
          data-expected-review-threads={prReleaseActionItemsArchiveNoteCopy.expectedReviewThreads}
          data-expected-reviews={prReleaseActionItemsArchiveNoteCopy.expectedReviews}
          data-expected-unresolved-threads={prReleaseActionItemsArchiveNoteCopy.expectedUnresolvedThreads}
          data-link-selector={prReleaseActionItemsArchiveNoteCopy.linkSelector}
          data-no-archive-mutation-copy={prReleaseActionItemsArchiveNoteCopy.noArchiveMutationCopy}
          data-owner-role={prReleaseActionItemsArchiveNoteCopy.ownerRole}
          data-pr-href={prReleaseActionItemsArchiveNoteCopy.prHref}
          data-release-scope={prReleaseActionItemsArchiveNoteCopy.releaseScope}
          data-repair-targets={prReleaseActionItemsArchiveNoteCopy.repairTargets}
          data-route={prReleaseActionItemsArchiveNoteCopy.route}
          data-source-marker-selector={prReleaseActionItemsArchiveNoteCopy.sourceMarkerSelector}
          data-status={prReleaseActionItemsArchiveNoteCopy.status}
          data-testid="pr-release-action-items-archive-note-copy"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">PR release action items archive note copy</p>
              <h2>Как описать action items archive note PR #17</h2>
            </div>
            <a
              className="primary-link"
              data-testid="pr-release-action-items-archive-note-anchor"
              href={prReleaseActionItemsArchiveNoteCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {prReleaseActionItemsArchiveNoteCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Reason"
                    ? "Archive"
                    : title === "Restore"
                      ? "Restore"
                      : title === "Action"
                        ? "No archive"
                        : "Handover next"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line">{prReleaseActionItemsArchiveNoteCopy.archiveNoteCopy}</p>
          <p className="stage-line muted">{prReleaseActionItemsArchiveNoteCopy.noArchiveMutationCopy}</p>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-archive-note-selector={prReleaseActionItemsHandoverSummaryCopy.archiveNoteSelector}
          data-base-branch={prReleaseActionItemsHandoverSummaryCopy.baseBranch}
          data-branch={prReleaseActionItemsHandoverSummaryCopy.branch}
          data-command={prReleaseActionItemsHandoverSummaryCopy.command}
          data-expected-check-groups={prReleaseActionItemsHandoverSummaryCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={prReleaseActionItemsHandoverSummaryCopy.expectedConclusion}
          data-expected-merge-state={prReleaseActionItemsHandoverSummaryCopy.expectedMergeState}
          data-expected-pr-comments={prReleaseActionItemsHandoverSummaryCopy.expectedPrComments}
          data-expected-review-decision={prReleaseActionItemsHandoverSummaryCopy.expectedReviewDecision}
          data-expected-review-threads={prReleaseActionItemsHandoverSummaryCopy.expectedReviewThreads}
          data-expected-reviews={prReleaseActionItemsHandoverSummaryCopy.expectedReviews}
          data-expected-unresolved-threads={prReleaseActionItemsHandoverSummaryCopy.expectedUnresolvedThreads}
          data-handover-summary-copy={prReleaseActionItemsHandoverSummaryCopy.handoverSummaryCopy}
          data-handover-summary-fields={prReleaseActionItemsHandoverSummaryCopy.handoverSummaryFields.join(",")}
          data-handover-summary-scope={prReleaseActionItemsHandoverSummaryCopy.handoverSummaryScope}
          data-link-selector={prReleaseActionItemsHandoverSummaryCopy.linkSelector}
          data-no-owner-transfer-copy={prReleaseActionItemsHandoverSummaryCopy.noOwnerTransferCopy}
          data-owner-role={prReleaseActionItemsHandoverSummaryCopy.ownerRole}
          data-pr-href={prReleaseActionItemsHandoverSummaryCopy.prHref}
          data-release-scope={prReleaseActionItemsHandoverSummaryCopy.releaseScope}
          data-repair-targets={prReleaseActionItemsHandoverSummaryCopy.repairTargets}
          data-route={prReleaseActionItemsHandoverSummaryCopy.route}
          data-source-marker-selector={prReleaseActionItemsHandoverSummaryCopy.sourceMarkerSelector}
          data-status={prReleaseActionItemsHandoverSummaryCopy.status}
          data-testid="pr-release-action-items-handover-summary-copy"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">PR release action items handover summary copy</p>
              <h2>Как описать action items handover summary PR #17</h2>
            </div>
            <a
              className="primary-link"
              data-testid="pr-release-action-items-handover-summary-anchor"
              href={prReleaseActionItemsHandoverSummaryCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {prReleaseActionItemsHandoverSummaryCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Owner"
                    ? "Handover"
                    : title === "Decision"
                      ? "Return path"
                      : title === "Action"
                        ? "No transfer"
                        : "Audit next"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line">{prReleaseActionItemsHandoverSummaryCopy.handoverSummaryCopy}</p>
          <p className="stage-line muted">{prReleaseActionItemsHandoverSummaryCopy.noOwnerTransferCopy}</p>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-audit-trail-copy={prReleaseActionItemsAuditTrailCopy.auditTrailCopy}
          data-audit-trail-fields={prReleaseActionItemsAuditTrailCopy.auditTrailFields.join(",")}
          data-audit-trail-scope={prReleaseActionItemsAuditTrailCopy.auditTrailScope}
          data-base-branch={prReleaseActionItemsAuditTrailCopy.baseBranch}
          data-branch={prReleaseActionItemsAuditTrailCopy.branch}
          data-command={prReleaseActionItemsAuditTrailCopy.command}
          data-expected-check-groups={prReleaseActionItemsAuditTrailCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={prReleaseActionItemsAuditTrailCopy.expectedConclusion}
          data-expected-merge-state={prReleaseActionItemsAuditTrailCopy.expectedMergeState}
          data-expected-pr-comments={prReleaseActionItemsAuditTrailCopy.expectedPrComments}
          data-expected-review-decision={prReleaseActionItemsAuditTrailCopy.expectedReviewDecision}
          data-expected-review-threads={prReleaseActionItemsAuditTrailCopy.expectedReviewThreads}
          data-expected-reviews={prReleaseActionItemsAuditTrailCopy.expectedReviews}
          data-expected-unresolved-threads={prReleaseActionItemsAuditTrailCopy.expectedUnresolvedThreads}
          data-handover-summary-selector={prReleaseActionItemsAuditTrailCopy.handoverSummarySelector}
          data-link-selector={prReleaseActionItemsAuditTrailCopy.linkSelector}
          data-no-event-write-copy={prReleaseActionItemsAuditTrailCopy.noEventWriteCopy}
          data-owner-role={prReleaseActionItemsAuditTrailCopy.ownerRole}
          data-pr-href={prReleaseActionItemsAuditTrailCopy.prHref}
          data-release-scope={prReleaseActionItemsAuditTrailCopy.releaseScope}
          data-repair-targets={prReleaseActionItemsAuditTrailCopy.repairTargets}
          data-route={prReleaseActionItemsAuditTrailCopy.route}
          data-source-marker-selector={prReleaseActionItemsAuditTrailCopy.sourceMarkerSelector}
          data-status={prReleaseActionItemsAuditTrailCopy.status}
          data-testid="pr-release-action-items-audit-trail-copy"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">PR release action items audit trail copy</p>
              <h2>Как описать action items audit trail PR #17</h2>
            </div>
            <a
              className="primary-link"
              data-testid="pr-release-action-items-audit-trail-anchor"
              href={prReleaseActionItemsAuditTrailCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {prReleaseActionItemsAuditTrailCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Chain"
                    ? "Audit chain"
                    : title === "Decision"
                      ? "Verification"
                      : title === "Action"
                        ? "No events"
                        : "Bridge next"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line">{prReleaseActionItemsAuditTrailCopy.auditTrailCopy}</p>
          <p className="stage-line muted">{prReleaseActionItemsAuditTrailCopy.noEventWriteCopy}</p>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-audit-trail-selector={prReleaseActionItemsMergeReadinessBridgeCopy.auditTrailSelector}
          data-base-branch={prReleaseActionItemsMergeReadinessBridgeCopy.baseBranch}
          data-branch={prReleaseActionItemsMergeReadinessBridgeCopy.branch}
          data-bridge-copy={prReleaseActionItemsMergeReadinessBridgeCopy.bridgeCopy}
          data-bridge-fields={prReleaseActionItemsMergeReadinessBridgeCopy.bridgeFields.join(",")}
          data-command={prReleaseActionItemsMergeReadinessBridgeCopy.command}
          data-expected-check-groups={prReleaseActionItemsMergeReadinessBridgeCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={prReleaseActionItemsMergeReadinessBridgeCopy.expectedConclusion}
          data-expected-merge-state={prReleaseActionItemsMergeReadinessBridgeCopy.expectedMergeState}
          data-expected-pr-comments={prReleaseActionItemsMergeReadinessBridgeCopy.expectedPrComments}
          data-expected-review-decision={prReleaseActionItemsMergeReadinessBridgeCopy.expectedReviewDecision}
          data-expected-review-threads={prReleaseActionItemsMergeReadinessBridgeCopy.expectedReviewThreads}
          data-expected-reviews={prReleaseActionItemsMergeReadinessBridgeCopy.expectedReviews}
          data-expected-unresolved-threads={prReleaseActionItemsMergeReadinessBridgeCopy.expectedUnresolvedThreads}
          data-link-selector={prReleaseActionItemsMergeReadinessBridgeCopy.linkSelector}
          data-merge-readiness-bridge-scope={prReleaseActionItemsMergeReadinessBridgeCopy.mergeReadinessBridgeScope}
          data-no-merge-request-copy={prReleaseActionItemsMergeReadinessBridgeCopy.noMergeRequestCopy}
          data-owner-role={prReleaseActionItemsMergeReadinessBridgeCopy.ownerRole}
          data-pr-href={prReleaseActionItemsMergeReadinessBridgeCopy.prHref}
          data-release-scope={prReleaseActionItemsMergeReadinessBridgeCopy.releaseScope}
          data-repair-targets={prReleaseActionItemsMergeReadinessBridgeCopy.repairTargets}
          data-route={prReleaseActionItemsMergeReadinessBridgeCopy.route}
          data-source-marker-selector={prReleaseActionItemsMergeReadinessBridgeCopy.sourceMarkerSelector}
          data-status={prReleaseActionItemsMergeReadinessBridgeCopy.status}
          data-testid="pr-release-action-items-merge-readiness-bridge-copy"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">PR release action items merge readiness bridge copy</p>
              <h2>Как связать action items с merge readiness PR #17</h2>
            </div>
            <a
              className="primary-link"
              data-testid="pr-release-action-items-merge-readiness-bridge-anchor"
              href={prReleaseActionItemsMergeReadinessBridgeCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {prReleaseActionItemsMergeReadinessBridgeCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Bridge"
                    ? "Readiness"
                    : title === "Threads"
                      ? "Thread check"
                      : title === "Action"
                        ? "No merge"
                        : "Handoff next"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line">{prReleaseActionItemsMergeReadinessBridgeCopy.bridgeCopy}</p>
          <p className="stage-line muted">{prReleaseActionItemsMergeReadinessBridgeCopy.noMergeRequestCopy}</p>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-base-branch={prReleaseActionItemsMergeRequestHandoffCopy.baseBranch}
          data-branch={prReleaseActionItemsMergeRequestHandoffCopy.branch}
          data-command={prReleaseActionItemsMergeRequestHandoffCopy.command}
          data-expected-check-groups={prReleaseActionItemsMergeRequestHandoffCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={prReleaseActionItemsMergeRequestHandoffCopy.expectedConclusion}
          data-expected-merge-state={prReleaseActionItemsMergeRequestHandoffCopy.expectedMergeState}
          data-expected-pr-comments={prReleaseActionItemsMergeRequestHandoffCopy.expectedPrComments}
          data-expected-review-decision={prReleaseActionItemsMergeRequestHandoffCopy.expectedReviewDecision}
          data-expected-review-threads={prReleaseActionItemsMergeRequestHandoffCopy.expectedReviewThreads}
          data-expected-reviews={prReleaseActionItemsMergeRequestHandoffCopy.expectedReviews}
          data-expected-unresolved-threads={prReleaseActionItemsMergeRequestHandoffCopy.expectedUnresolvedThreads}
          data-handoff-copy={prReleaseActionItemsMergeRequestHandoffCopy.handoffCopy}
          data-handoff-fields={prReleaseActionItemsMergeRequestHandoffCopy.handoffFields.join(",")}
          data-link-selector={prReleaseActionItemsMergeRequestHandoffCopy.linkSelector}
          data-merge-readiness-bridge-selector={prReleaseActionItemsMergeRequestHandoffCopy.mergeReadinessBridgeSelector}
          data-merge-request-handoff-scope={prReleaseActionItemsMergeRequestHandoffCopy.mergeRequestHandoffScope}
          data-no-merge-execution-copy={prReleaseActionItemsMergeRequestHandoffCopy.noMergeExecutionCopy}
          data-owner-role={prReleaseActionItemsMergeRequestHandoffCopy.ownerRole}
          data-pr-href={prReleaseActionItemsMergeRequestHandoffCopy.prHref}
          data-release-scope={prReleaseActionItemsMergeRequestHandoffCopy.releaseScope}
          data-repair-targets={prReleaseActionItemsMergeRequestHandoffCopy.repairTargets}
          data-route={prReleaseActionItemsMergeRequestHandoffCopy.route}
          data-source-marker-selector={prReleaseActionItemsMergeRequestHandoffCopy.sourceMarkerSelector}
          data-status={prReleaseActionItemsMergeRequestHandoffCopy.status}
          data-testid="pr-release-action-items-merge-request-handoff-copy"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">PR release action items merge request handoff copy</p>
              <h2>Как описать action items merge request handoff PR #17</h2>
            </div>
            <a
              className="primary-link"
              data-testid="pr-release-action-items-merge-request-handoff-anchor"
              href={prReleaseActionItemsMergeRequestHandoffCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {prReleaseActionItemsMergeRequestHandoffCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Requester"
                    ? "Requester"
                    : title === "Boundary"
                      ? "Boundary"
                      : title === "Action"
                        ? "No merge"
                        : "Monitor next"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line">{prReleaseActionItemsMergeRequestHandoffCopy.handoffCopy}</p>
          <p className="stage-line muted">{prReleaseActionItemsMergeRequestHandoffCopy.noMergeExecutionCopy}</p>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-base-branch={prReleaseActionItemsPostMergeMonitorHandoffCopy.baseBranch}
          data-branch={prReleaseActionItemsPostMergeMonitorHandoffCopy.branch}
          data-command={prReleaseActionItemsPostMergeMonitorHandoffCopy.command}
          data-expected-check-groups={prReleaseActionItemsPostMergeMonitorHandoffCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={prReleaseActionItemsPostMergeMonitorHandoffCopy.expectedConclusion}
          data-expected-merge-state={prReleaseActionItemsPostMergeMonitorHandoffCopy.expectedMergeState}
          data-expected-pr-comments={prReleaseActionItemsPostMergeMonitorHandoffCopy.expectedPrComments}
          data-expected-review-decision={prReleaseActionItemsPostMergeMonitorHandoffCopy.expectedReviewDecision}
          data-expected-review-threads={prReleaseActionItemsPostMergeMonitorHandoffCopy.expectedReviewThreads}
          data-expected-reviews={prReleaseActionItemsPostMergeMonitorHandoffCopy.expectedReviews}
          data-expected-unresolved-threads={prReleaseActionItemsPostMergeMonitorHandoffCopy.expectedUnresolvedThreads}
          data-link-selector={prReleaseActionItemsPostMergeMonitorHandoffCopy.linkSelector}
          data-merge-request-handoff-selector={prReleaseActionItemsPostMergeMonitorHandoffCopy.mergeRequestHandoffSelector}
          data-monitor-handoff-copy={prReleaseActionItemsPostMergeMonitorHandoffCopy.monitorHandoffCopy}
          data-monitor-handoff-fields={prReleaseActionItemsPostMergeMonitorHandoffCopy.monitorHandoffFields.join(",")}
          data-no-monitor-execution-copy={prReleaseActionItemsPostMergeMonitorHandoffCopy.noMonitorExecutionCopy}
          data-owner-role={prReleaseActionItemsPostMergeMonitorHandoffCopy.ownerRole}
          data-post-merge-monitor-handoff-scope={prReleaseActionItemsPostMergeMonitorHandoffCopy.postMergeMonitorHandoffScope}
          data-pr-href={prReleaseActionItemsPostMergeMonitorHandoffCopy.prHref}
          data-release-scope={prReleaseActionItemsPostMergeMonitorHandoffCopy.releaseScope}
          data-repair-targets={prReleaseActionItemsPostMergeMonitorHandoffCopy.repairTargets}
          data-route={prReleaseActionItemsPostMergeMonitorHandoffCopy.route}
          data-source-marker-selector={prReleaseActionItemsPostMergeMonitorHandoffCopy.sourceMarkerSelector}
          data-status={prReleaseActionItemsPostMergeMonitorHandoffCopy.status}
          data-testid="pr-release-action-items-post-merge-monitor-handoff-copy"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">PR release action items post-merge monitor handoff copy</p>
              <h2>Как описать post-merge monitor handoff PR #17</h2>
            </div>
            <a
              className="primary-link"
              data-testid="pr-release-action-items-post-merge-monitor-handoff-anchor"
              href={prReleaseActionItemsPostMergeMonitorHandoffCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {prReleaseActionItemsPostMergeMonitorHandoffCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Owner"
                    ? "Monitor owner"
                    : title === "Rollback"
                      ? "Rollback"
                      : title === "Action"
                        ? "No monitor"
                        : "Receipt next"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line">{prReleaseActionItemsPostMergeMonitorHandoffCopy.monitorHandoffCopy}</p>
          <p className="stage-line muted">{prReleaseActionItemsPostMergeMonitorHandoffCopy.noMonitorExecutionCopy}</p>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-base-branch={prReleaseActionItemsPostMergeEvidenceReceiptCopy.baseBranch}
          data-branch={prReleaseActionItemsPostMergeEvidenceReceiptCopy.branch}
          data-command={prReleaseActionItemsPostMergeEvidenceReceiptCopy.command}
          data-evidence-receipt-copy={prReleaseActionItemsPostMergeEvidenceReceiptCopy.evidenceReceiptCopy}
          data-evidence-receipt-fields={prReleaseActionItemsPostMergeEvidenceReceiptCopy.evidenceReceiptFields.join(",")}
          data-expected-check-groups={prReleaseActionItemsPostMergeEvidenceReceiptCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={prReleaseActionItemsPostMergeEvidenceReceiptCopy.expectedConclusion}
          data-expected-merge-state={prReleaseActionItemsPostMergeEvidenceReceiptCopy.expectedMergeState}
          data-expected-pr-comments={prReleaseActionItemsPostMergeEvidenceReceiptCopy.expectedPrComments}
          data-expected-review-decision={prReleaseActionItemsPostMergeEvidenceReceiptCopy.expectedReviewDecision}
          data-expected-review-threads={prReleaseActionItemsPostMergeEvidenceReceiptCopy.expectedReviewThreads}
          data-expected-reviews={prReleaseActionItemsPostMergeEvidenceReceiptCopy.expectedReviews}
          data-expected-unresolved-threads={prReleaseActionItemsPostMergeEvidenceReceiptCopy.expectedUnresolvedThreads}
          data-link-selector={prReleaseActionItemsPostMergeEvidenceReceiptCopy.linkSelector}
          data-no-evidence-write-copy={prReleaseActionItemsPostMergeEvidenceReceiptCopy.noEvidenceWriteCopy}
          data-owner-role={prReleaseActionItemsPostMergeEvidenceReceiptCopy.ownerRole}
          data-post-merge-evidence-receipt-scope={
            prReleaseActionItemsPostMergeEvidenceReceiptCopy.postMergeEvidenceReceiptScope
          }
          data-post-merge-monitor-handoff-selector={
            prReleaseActionItemsPostMergeEvidenceReceiptCopy.postMergeMonitorHandoffSelector
          }
          data-pr-href={prReleaseActionItemsPostMergeEvidenceReceiptCopy.prHref}
          data-release-scope={prReleaseActionItemsPostMergeEvidenceReceiptCopy.releaseScope}
          data-repair-targets={prReleaseActionItemsPostMergeEvidenceReceiptCopy.repairTargets}
          data-route={prReleaseActionItemsPostMergeEvidenceReceiptCopy.route}
          data-source-marker-selector={prReleaseActionItemsPostMergeEvidenceReceiptCopy.sourceMarkerSelector}
          data-status={prReleaseActionItemsPostMergeEvidenceReceiptCopy.status}
          data-testid="pr-release-action-items-post-merge-evidence-receipt-copy"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">PR release action items post-merge evidence receipt copy</p>
              <h2>Как описать post-merge evidence receipt PR #17</h2>
            </div>
            <a
              className="primary-link"
              data-testid="pr-release-action-items-post-merge-evidence-receipt-anchor"
              href={prReleaseActionItemsPostMergeEvidenceReceiptCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {prReleaseActionItemsPostMergeEvidenceReceiptCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Receipt"
                    ? "Receipt owner"
                    : title === "Snapshot"
                      ? "Snapshot"
                      : title === "Action"
                        ? "No write"
                        : "Review next"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line">{prReleaseActionItemsPostMergeEvidenceReceiptCopy.evidenceReceiptCopy}</p>
          <p className="stage-line muted">{prReleaseActionItemsPostMergeEvidenceReceiptCopy.noEvidenceWriteCopy}</p>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-base-branch={prReleaseActionItemsPostMergeReceiptReviewCopy.baseBranch}
          data-branch={prReleaseActionItemsPostMergeReceiptReviewCopy.branch}
          data-command={prReleaseActionItemsPostMergeReceiptReviewCopy.command}
          data-expected-check-groups={prReleaseActionItemsPostMergeReceiptReviewCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={prReleaseActionItemsPostMergeReceiptReviewCopy.expectedConclusion}
          data-expected-merge-state={prReleaseActionItemsPostMergeReceiptReviewCopy.expectedMergeState}
          data-expected-pr-comments={prReleaseActionItemsPostMergeReceiptReviewCopy.expectedPrComments}
          data-expected-review-decision={prReleaseActionItemsPostMergeReceiptReviewCopy.expectedReviewDecision}
          data-expected-review-threads={prReleaseActionItemsPostMergeReceiptReviewCopy.expectedReviewThreads}
          data-expected-reviews={prReleaseActionItemsPostMergeReceiptReviewCopy.expectedReviews}
          data-expected-unresolved-threads={prReleaseActionItemsPostMergeReceiptReviewCopy.expectedUnresolvedThreads}
          data-link-selector={prReleaseActionItemsPostMergeReceiptReviewCopy.linkSelector}
          data-no-review-write-copy={prReleaseActionItemsPostMergeReceiptReviewCopy.noReviewWriteCopy}
          data-owner-role={prReleaseActionItemsPostMergeReceiptReviewCopy.ownerRole}
          data-post-merge-evidence-receipt-selector={
            prReleaseActionItemsPostMergeReceiptReviewCopy.postMergeEvidenceReceiptSelector
          }
          data-post-merge-receipt-review-scope={prReleaseActionItemsPostMergeReceiptReviewCopy.postMergeReceiptReviewScope}
          data-pr-href={prReleaseActionItemsPostMergeReceiptReviewCopy.prHref}
          data-receipt-review-copy={prReleaseActionItemsPostMergeReceiptReviewCopy.receiptReviewCopy}
          data-receipt-review-fields={prReleaseActionItemsPostMergeReceiptReviewCopy.receiptReviewFields.join(",")}
          data-release-scope={prReleaseActionItemsPostMergeReceiptReviewCopy.releaseScope}
          data-repair-targets={prReleaseActionItemsPostMergeReceiptReviewCopy.repairTargets}
          data-route={prReleaseActionItemsPostMergeReceiptReviewCopy.route}
          data-source-marker-selector={prReleaseActionItemsPostMergeReceiptReviewCopy.sourceMarkerSelector}
          data-status={prReleaseActionItemsPostMergeReceiptReviewCopy.status}
          data-testid="pr-release-action-items-post-merge-receipt-review-copy"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">PR release action items post-merge receipt review copy</p>
              <h2>Как описать post-merge receipt review PR #17</h2>
            </div>
            <a
              className="primary-link"
              data-testid="pr-release-action-items-post-merge-receipt-review-anchor"
              href={prReleaseActionItemsPostMergeReceiptReviewCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {prReleaseActionItemsPostMergeReceiptReviewCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Reviewer"
                    ? "Reviewer"
                    : title === "Decision"
                      ? "Decision"
                      : title === "Action"
                        ? "No review write"
                        : "Decision next"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line">{prReleaseActionItemsPostMergeReceiptReviewCopy.receiptReviewCopy}</p>
          <p className="stage-line muted">{prReleaseActionItemsPostMergeReceiptReviewCopy.noReviewWriteCopy}</p>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-base-branch={prReleaseActionItemsPostMergeFollowUpDecisionCopy.baseBranch}
          data-branch={prReleaseActionItemsPostMergeFollowUpDecisionCopy.branch}
          data-command={prReleaseActionItemsPostMergeFollowUpDecisionCopy.command}
          data-expected-check-groups={prReleaseActionItemsPostMergeFollowUpDecisionCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={prReleaseActionItemsPostMergeFollowUpDecisionCopy.expectedConclusion}
          data-expected-merge-state={prReleaseActionItemsPostMergeFollowUpDecisionCopy.expectedMergeState}
          data-expected-pr-comments={prReleaseActionItemsPostMergeFollowUpDecisionCopy.expectedPrComments}
          data-expected-review-decision={prReleaseActionItemsPostMergeFollowUpDecisionCopy.expectedReviewDecision}
          data-expected-review-threads={prReleaseActionItemsPostMergeFollowUpDecisionCopy.expectedReviewThreads}
          data-expected-reviews={prReleaseActionItemsPostMergeFollowUpDecisionCopy.expectedReviews}
          data-expected-unresolved-threads={prReleaseActionItemsPostMergeFollowUpDecisionCopy.expectedUnresolvedThreads}
          data-follow-up-decision-copy={prReleaseActionItemsPostMergeFollowUpDecisionCopy.followUpDecisionCopy}
          data-follow-up-decision-fields={prReleaseActionItemsPostMergeFollowUpDecisionCopy.followUpDecisionFields.join(",")}
          data-link-selector={prReleaseActionItemsPostMergeFollowUpDecisionCopy.linkSelector}
          data-no-action-assignment-copy={prReleaseActionItemsPostMergeFollowUpDecisionCopy.noActionAssignmentCopy}
          data-owner-role={prReleaseActionItemsPostMergeFollowUpDecisionCopy.ownerRole}
          data-post-merge-follow-up-decision-scope={
            prReleaseActionItemsPostMergeFollowUpDecisionCopy.postMergeFollowUpDecisionScope
          }
          data-post-merge-receipt-review-selector={
            prReleaseActionItemsPostMergeFollowUpDecisionCopy.postMergeReceiptReviewSelector
          }
          data-pr-href={prReleaseActionItemsPostMergeFollowUpDecisionCopy.prHref}
          data-release-scope={prReleaseActionItemsPostMergeFollowUpDecisionCopy.releaseScope}
          data-repair-targets={prReleaseActionItemsPostMergeFollowUpDecisionCopy.repairTargets}
          data-route={prReleaseActionItemsPostMergeFollowUpDecisionCopy.route}
          data-source-marker-selector={prReleaseActionItemsPostMergeFollowUpDecisionCopy.sourceMarkerSelector}
          data-status={prReleaseActionItemsPostMergeFollowUpDecisionCopy.status}
          data-testid="pr-release-action-items-post-merge-follow-up-decision-copy"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">PR release action items post-merge follow-up decision copy</p>
              <h2>Как описать post-merge follow-up decision PR #17</h2>
            </div>
            <a
              className="primary-link"
              data-testid="pr-release-action-items-post-merge-follow-up-decision-anchor"
              href={prReleaseActionItemsPostMergeFollowUpDecisionCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {prReleaseActionItemsPostMergeFollowUpDecisionCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Owner"
                    ? "Decision owner"
                    : title === "Boundary"
                      ? "Boundary"
                      : title === "Action"
                        ? "No assignment"
                        : "Handoff next"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line">{prReleaseActionItemsPostMergeFollowUpDecisionCopy.followUpDecisionCopy}</p>
          <p className="stage-line muted">{prReleaseActionItemsPostMergeFollowUpDecisionCopy.noActionAssignmentCopy}</p>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-base-branch={prReleaseActionItemsPostMergeDecisionHandoffCopy.baseBranch}
          data-branch={prReleaseActionItemsPostMergeDecisionHandoffCopy.branch}
          data-command={prReleaseActionItemsPostMergeDecisionHandoffCopy.command}
          data-decision-handoff-copy={prReleaseActionItemsPostMergeDecisionHandoffCopy.decisionHandoffCopy}
          data-decision-handoff-fields={prReleaseActionItemsPostMergeDecisionHandoffCopy.decisionHandoffFields.join(",")}
          data-expected-check-groups={prReleaseActionItemsPostMergeDecisionHandoffCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={prReleaseActionItemsPostMergeDecisionHandoffCopy.expectedConclusion}
          data-expected-merge-state={prReleaseActionItemsPostMergeDecisionHandoffCopy.expectedMergeState}
          data-expected-pr-comments={prReleaseActionItemsPostMergeDecisionHandoffCopy.expectedPrComments}
          data-expected-review-decision={prReleaseActionItemsPostMergeDecisionHandoffCopy.expectedReviewDecision}
          data-expected-review-threads={prReleaseActionItemsPostMergeDecisionHandoffCopy.expectedReviewThreads}
          data-expected-reviews={prReleaseActionItemsPostMergeDecisionHandoffCopy.expectedReviews}
          data-expected-unresolved-threads={prReleaseActionItemsPostMergeDecisionHandoffCopy.expectedUnresolvedThreads}
          data-link-selector={prReleaseActionItemsPostMergeDecisionHandoffCopy.linkSelector}
          data-no-ownership-transfer-copy={prReleaseActionItemsPostMergeDecisionHandoffCopy.noOwnershipTransferCopy}
          data-owner-role={prReleaseActionItemsPostMergeDecisionHandoffCopy.ownerRole}
          data-post-merge-decision-handoff-scope={prReleaseActionItemsPostMergeDecisionHandoffCopy.postMergeDecisionHandoffScope}
          data-post-merge-follow-up-decision-selector={
            prReleaseActionItemsPostMergeDecisionHandoffCopy.postMergeFollowUpDecisionSelector
          }
          data-pr-href={prReleaseActionItemsPostMergeDecisionHandoffCopy.prHref}
          data-release-scope={prReleaseActionItemsPostMergeDecisionHandoffCopy.releaseScope}
          data-repair-targets={prReleaseActionItemsPostMergeDecisionHandoffCopy.repairTargets}
          data-route={prReleaseActionItemsPostMergeDecisionHandoffCopy.route}
          data-source-marker-selector={prReleaseActionItemsPostMergeDecisionHandoffCopy.sourceMarkerSelector}
          data-status={prReleaseActionItemsPostMergeDecisionHandoffCopy.status}
          data-testid="pr-release-action-items-post-merge-decision-handoff-copy"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">PR release action items post-merge decision handoff copy</p>
              <h2>Как описать post-merge decision handoff PR #17</h2>
            </div>
            <a
              className="primary-link"
              data-testid="pr-release-action-items-post-merge-decision-handoff-anchor"
              href={prReleaseActionItemsPostMergeDecisionHandoffCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {prReleaseActionItemsPostMergeDecisionHandoffCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Owner"
                    ? "Handoff owner"
                    : title === "Boundary"
                      ? "Ownership boundary"
                      : title === "Action"
                        ? "No transfer"
                        : "Acceptance next"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line">{prReleaseActionItemsPostMergeDecisionHandoffCopy.decisionHandoffCopy}</p>
          <p className="stage-line muted">{prReleaseActionItemsPostMergeDecisionHandoffCopy.noOwnershipTransferCopy}</p>
        </section>

        <section
          className="panel fixture-coverage-panel"
          data-base-branch={prReleaseActionItemsPostMergeDecisionAcceptanceCopy.baseBranch}
          data-branch={prReleaseActionItemsPostMergeDecisionAcceptanceCopy.branch}
          data-command={prReleaseActionItemsPostMergeDecisionAcceptanceCopy.command}
          data-decision-acceptance-copy={prReleaseActionItemsPostMergeDecisionAcceptanceCopy.decisionAcceptanceCopy}
          data-decision-acceptance-fields={prReleaseActionItemsPostMergeDecisionAcceptanceCopy.decisionAcceptanceFields.join(",")}
          data-expected-check-groups={prReleaseActionItemsPostMergeDecisionAcceptanceCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={prReleaseActionItemsPostMergeDecisionAcceptanceCopy.expectedConclusion}
          data-expected-merge-state={prReleaseActionItemsPostMergeDecisionAcceptanceCopy.expectedMergeState}
          data-expected-pr-comments={prReleaseActionItemsPostMergeDecisionAcceptanceCopy.expectedPrComments}
          data-expected-review-decision={prReleaseActionItemsPostMergeDecisionAcceptanceCopy.expectedReviewDecision}
          data-expected-review-threads={prReleaseActionItemsPostMergeDecisionAcceptanceCopy.expectedReviewThreads}
          data-expected-reviews={prReleaseActionItemsPostMergeDecisionAcceptanceCopy.expectedReviews}
          data-expected-unresolved-threads={prReleaseActionItemsPostMergeDecisionAcceptanceCopy.expectedUnresolvedThreads}
          data-link-selector={prReleaseActionItemsPostMergeDecisionAcceptanceCopy.linkSelector}
          data-no-acceptance-record-copy={prReleaseActionItemsPostMergeDecisionAcceptanceCopy.noAcceptanceRecordCopy}
          data-owner-role={prReleaseActionItemsPostMergeDecisionAcceptanceCopy.ownerRole}
          data-post-merge-decision-acceptance-scope={
            prReleaseActionItemsPostMergeDecisionAcceptanceCopy.postMergeDecisionAcceptanceScope
          }
          data-post-merge-decision-handoff-selector={
            prReleaseActionItemsPostMergeDecisionAcceptanceCopy.postMergeDecisionHandoffSelector
          }
          data-pr-href={prReleaseActionItemsPostMergeDecisionAcceptanceCopy.prHref}
          data-release-scope={prReleaseActionItemsPostMergeDecisionAcceptanceCopy.releaseScope}
          data-repair-targets={prReleaseActionItemsPostMergeDecisionAcceptanceCopy.repairTargets}
          data-route={prReleaseActionItemsPostMergeDecisionAcceptanceCopy.route}
          data-source-marker-selector={prReleaseActionItemsPostMergeDecisionAcceptanceCopy.sourceMarkerSelector}
          data-status={prReleaseActionItemsPostMergeDecisionAcceptanceCopy.status}
          data-testid="pr-release-action-items-post-merge-decision-acceptance-copy"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">PR release action items post-merge decision acceptance copy</p>
              <h2>Как описать post-merge decision acceptance PR #17</h2>
            </div>
            <a
              className="primary-link"
              data-testid="pr-release-action-items-post-merge-decision-acceptance-anchor"
              href={prReleaseActionItemsPostMergeDecisionAcceptanceCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="fixture-coverage-grid">
            {prReleaseActionItemsPostMergeDecisionAcceptanceCopy.checks.map(([title, text]) => (
              <article className="fixture-coverage-card" key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Owner"
                    ? "Acceptance owner"
                    : title === "Boundary"
                      ? "Acceptance boundary"
                      : title === "Action"
                        ? "No record"
                        : "Record next"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="stage-line">{prReleaseActionItemsPostMergeDecisionAcceptanceCopy.decisionAcceptanceCopy}</p>
          <p className="stage-line muted">{prReleaseActionItemsPostMergeDecisionAcceptanceCopy.noAcceptanceRecordCopy}</p>
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
