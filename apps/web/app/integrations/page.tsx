import { Sidebar } from "../app-shell";

const integrations = ["Bitrix24", "amoCRM", "1C", "Telegram", "ЕИС", "ФНС", "Мегаплан", "RetailCRM", "Planfix"];

export default function IntegrationsPage() {
  return (
    <main className="app-shell">
      <Sidebar active="integrations" />
      <section className="workspace">
        <header className="topline">
          <div>
            <p className="eyebrow">CRM hub</p>
            <h1>Интеграции</h1>
          </div>
          <button className="primary" type="button">
            Подключить
          </button>
        </header>

        <section className="integration-grid">
          {integrations.map((name) => (
            <article className="integration" key={name}>
              <strong>{name}</strong>
              <span>ожидает коннектор</span>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
