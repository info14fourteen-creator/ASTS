import { Sidebar } from "../app-shell";

const rows = [
  ["03731000426-26", "Поставка светотехнического оборудования", "18.4 млн ₽", "18 июня"],
  ["32211984571", "Обслуживание инженерных систем", "42.8 млн ₽", "21 июня"],
  ["01622000118-26", "Расходные материалы и комплектующие", "7.9 млн ₽", "16 июня"],
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

        <section className="panel">
          <div className="tender-table">
            <div className="table-row table-head">
              <span>Номер</span>
              <span>Предмет</span>
              <span>НМЦК</span>
              <span>Срок</span>
            </div>
            {rows.map(([id, title, nmck, deadline]) => (
              <a className="table-row tender-row table-link" href="/tenders/demo" key={id}>
                <strong>{id}</strong>
                <span>{title}</span>
                <span>{nmck}</span>
                <span>{deadline}</span>
              </a>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
