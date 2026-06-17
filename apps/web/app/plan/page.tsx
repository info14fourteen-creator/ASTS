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
  ["1", "Добавить FNS approvals parity check", "сравнить required_approvals API и /sources UI gate"],
  ["2", "Добавить AI review action parity check", "сравнить owner/action matrix API и /ai-review UI"],
  ["3", "Добавить source receipt docs deep link", "показать API README ссылку рядом с history loop"],
  ["4", "Добавить source owner receipt shared fixture", "перенести rules/history в общий JSON для API и web"],
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
    "https://github.com/info14fourteen-creator/ASTS/actions/workflows/shared-validation.yml",
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
