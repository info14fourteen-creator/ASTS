import { Sidebar } from "../app-shell";

const integrations = [
  ["Bitrix24", "CRM сделки, задачи, компании", "mapping ready", "ready"],
  ["amoCRM", "лиды, воронки, ответственные", "mapping ready", "ready"],
  ["1C", "счета, акты, платежи, номенклатура", "requires sandbox", "warning"],
  ["Telegram", "уведомления, миниапп, задачи", "bot planned", "ready"],
  ["Мегаплан", "задачи и проекты исполнения", "connector backlog", "pending"],
  ["RetailCRM", "клиенты, заказы, коммуникации", "connector backlog", "pending"],
  ["Planfix", "проекты, задачи, регламенты", "connector backlog", "pending"],
  ["СберCRM", "корпоративная CRM интеграция", "source review", "pending"],
  ["BPMSoft CRM", "enterprise процессы и статусы", "source review", "pending"],
];

const syncRules = [
  ["Сделка", "ASTS процедура -> CRM сделка с двумя воронками"],
  ["Компания", "ИНН, роли, контакты, история участия"],
  ["Задачи", "low-confidence, сроки подачи, исполнение контракта"],
  ["Файлы", "ссылки на ТЗ, протоколы, договоры и закрывающие"],
];

const queue = [
  ["Bitrix24", "описать поля сделки и стадии", "первый коннектор"],
  ["1C", "схема счетов, актов и платежей", "после исполнения"],
  ["Telegram mini app", "быстрые статусы и уведомления", "параллельный трек"],
];

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
          {integrations.map(([name, text, status, tone]) => (
            <article className={`integration ${tone}`} key={name}>
              <strong>{name}</strong>
              <p>{text}</p>
              <span>{status}</span>
            </article>
          ))}
        </section>

        <section className="layout-grid bottom-grid">
          <article className="panel span-7">
            <div className="panel-head compact">
              <div>
                <p className="eyebrow">Sync contract</p>
                <h2>Что синхронизируем</h2>
              </div>
            </div>
            <div className="sync-rule-grid">
              {syncRules.map(([title, text]) => (
                <div className="sync-rule" key={title}>
                  <strong>{title}</strong>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="panel span-5">
            <div className="panel-head compact">
              <div>
                <p className="eyebrow">Build queue</p>
                <h2>Очередь коннекторов</h2>
              </div>
            </div>
            <div className="ingest-log">
              {queue.map(([title, text, status]) => (
                <div className="ingest-item" key={title}>
                  <strong>{title}</strong>
                  <span>{text}</span>
                  <em>{status}</em>
                </div>
              ))}
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}
