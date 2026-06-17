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
  ["1", "Добавить AI review API README DOM parity smoke", "сравнить /plan marker с /ai-review API link"],
  ["2", "Добавить schema docs README existence smoke", "проверить anchor в packages/shared/README.md"],
  ["3", "Добавить shared validation workflow file smoke", "сверить /plan badge с .github/workflows/shared-validation.yml"],
  ["4", "Добавить shared README command CI note", "показать, что command parity smoke входит в Web build"],
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

const prGateBadges = [
  [
    "Web build",
    "frontend shell",
    "GitHub Actions собирает Next.js и держит /plan, /tenders, /execution в рабочем состоянии.",
    "https://github.com/info14fourteen-creator/ASTS/actions/workflows/web-build.yml",
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

const aiReviewSchemaApiSmokeMarker = {
  apiHref: "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#ai-review-queue-contract",
  apiRoute: "/v1/ai/review-queue",
  apiSelector: "[data-testid='ai-review-receipt-api-link']",
  checkCount: 4,
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
  ],
};

const schemaDocsLinkParitySmoke = {
  anchor: "packages/shared/README.md#shared-schema-index",
  docsHref: schemaDocsHref,
  linkSelector: "[data-testid='schema-docs-link']",
  checklistSelector: "[data-testid='fixture-schema-checklist-smoke']",
  expectedSchemaCount: schemaValidationCards.length,
  expectedChecklistSchemaCount: fixtureSchemaChecklistSmoke.schemaIds.length,
  checks: [
    ["Link href", "schema-docs-link должен вести на shared schema index"],
    ["Checklist anchor", "fixture checklist должен хранить тот же README anchor"],
    ["Schema count", "summary держит 3 fixture schemas, checklist держит 5 schema rows"],
    ["Smoke marker", "route smoke проверяет оба selector и один anchor"],
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
          data-api-href={aiReviewSchemaApiSmokeMarker.apiHref}
          data-api-route={aiReviewSchemaApiSmokeMarker.apiRoute}
          data-api-selector={aiReviewSchemaApiSmokeMarker.apiSelector}
          data-check-count={aiReviewSchemaApiSmokeMarker.checkCount}
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
          data-anchor={schemaDocsLinkParitySmoke.anchor}
          data-checklist-schema-count={schemaDocsLinkParitySmoke.expectedChecklistSchemaCount}
          data-checklist-selector={schemaDocsLinkParitySmoke.checklistSelector}
          data-docs-href={schemaDocsLinkParitySmoke.docsHref}
          data-link-selector={schemaDocsLinkParitySmoke.linkSelector}
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
