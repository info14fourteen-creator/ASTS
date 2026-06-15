import { Sidebar } from "../app-shell";

const rows = [
  [
    "03731000426-26",
    "ЕИС API",
    "Поставка светотехнического оборудования",
    "18.4 млн ₽",
    "18 июня",
    "86%",
    "совпадает ОКПД2, регион и история поставок",
    "проверить 3 позиции",
    "medium",
  ],
  [
    "32211984571",
    "223-ФЗ API",
    "Обслуживание инженерных систем",
    "42.8 млн ₽",
    "21 июня",
    "78%",
    "подходит по региону и маржинальности",
    "запросить КП",
    "low",
  ],
  [
    "01622000118-26",
    "ЭТП",
    "Расходные материалы и комплектующие",
    "7.9 млн ₽",
    "16 июня",
    "64%",
    "срок близко, часть требований спорная",
    "ручная проверка",
    "high",
  ],
];

const intakeGates = [
  ["Источник", "ЕИС, 223-ФЗ API или ЭТП", "обязателен первоисточник"],
  ["Документы", "ТЗ, извещение, проект контракта", "нужен file hash"],
  ["Компания", "ОКПД2, регионы, стоп-темы", "сверить профиль"],
  ["Экономика", "НМЦК, маржа, обеспечение", "до решения о входе"],
];

export default function TendersPage() {
  return (
    <main className="app-shell">
      <Sidebar active="tenders" />
      <section className="workspace">
        <header className="topline">
          <div>
            <p className="eyebrow">Tender Inbox</p>
            <h1>Процедуры</h1>
          </div>
          <div className="top-actions">
            <button type="button">Фильтры</button>
            <button className="primary" type="button">
              Импортировать
            </button>
          </div>
        </header>

        <section className="panel tender-intake-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Pre-win intake</p>
              <h2>Что проверяем до первой воронки</h2>
            </div>
            <span className="status-pill green">primary source first</span>
          </div>
          <div className="tender-intake-grid">
            {intakeGates.map(([title, text, rule]) => (
              <article className="tender-intake-card" key={title}>
                <span>{rule}</span>
                <strong>{title}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="tender-table">
            <div className="table-row table-head tender-inbox-row">
              <span>Номер</span>
              <span>Источник</span>
              <span>Предмет</span>
              <span>НМЦК</span>
              <span>Срок</span>
              <span>AI</span>
            </div>
            {rows.map(([id, source, title, nmck, deadline, match, reason, nextAction, risk]) => (
              <a className="table-row tender-row table-link tender-inbox-row" href="/tenders/demo" key={id}>
                <div>
                  <strong>{id}</strong>
                  <small>{nextAction}</small>
                </div>
                <span>{source}</span>
                <div>
                  <strong>{title}</strong>
                  <small>{reason}</small>
                </div>
                <span>{nmck}</span>
                <span>{deadline}</span>
                <span className={`risk ${risk}`}>{match}</span>
              </a>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
