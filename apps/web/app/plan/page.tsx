import { Sidebar } from "../app-shell";

const currentState = [
  ["PR", "#17 codex/app-site-shell", "CLEAN, checks green"],
  ["Build", "19 static routes", "Next production build проходит"],
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
  ["1", "Включить shared validation", "GitHub Actions gate"],
  ["2", "Добавить outcome UI states", "approved / locked / rejected variants"],
  ["3", "Подключить documents к shared fixture", "убрать ручное дублирование demo-data"],
  ["4", "Добавить API dependency lock", "CI для smoke-проверок"],
];

const cycleRules = [
  ["Check", "проверить ветку, PR, dirty tree"],
  ["Build", "запустить релевантную проверку"],
  ["Push", "только в PR ветку, не в main"],
  ["Report", "кратко: что сделано, что проверено, что дальше"],
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
