import { Sidebar } from "../app-shell";

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
  ["1", "Добавить fixture coverage count в /plan", "показывать сколько pre-win/post-win rows под smoke"],
  ["2", "Добавить owner approval browser loop", "кликать outcome filter и сверять active state"],
  ["3", "Добавить execution artifact empty guard", "не давать второй воронке стартовать без документов"],
  ["4", "Добавить source_url deep link", "из карточки быстро открыть первоисточник"],
];

const cycleRules = [
  ["Check", "проверить ветку, PR, dirty tree"],
  ["Build", "запустить релевантную проверку"],
  ["Push", "только в PR ветку, не в main"],
  ["Report", "кратко: что сделано, что проверено, что дальше"],
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
