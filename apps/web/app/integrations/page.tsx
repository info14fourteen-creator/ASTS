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

const fieldMapping = [
  ["Procedure", "id, source, НМЦК, заказчик", "CRM deal fields", "обязательно"],
  ["Pre-win funnel", "этап до победы, дедлайн, match", "CRM pipeline stage", "обязательно"],
  ["Execution funnel", "договор, оплата, поставка, закрывающие", "project/status fields", "после победы"],
  ["Evidence", "source link, file hash, AI confidence", "notes/files", "без этого AI не экспортируем"],
];

const accessChecklist = [
  ["OAuth/API", "токен или приложение хранится в GitHub Secrets"],
  ["Scopes", "только сделки, компании, задачи и файлы"],
  ["Test record", "одна тестовая процедура создает сделку без дублей"],
  ["Rollback", "можно отключить sync и оставить локальные данные ASTS"],
];

const exportGates = [
  ["Source proof", "есть ссылка первоисточника, файл и hash", "block export"],
  ["Stage owner", "назначен ответственный по текущей воронке", "warn"],
  ["AI confidence", "выше порога или есть ручное подтверждение", "block export"],
  ["Rollback path", "CRM запись можно найти и отключить sync", "ready"],
];

const syncFailureQueue = [
  ["Duplicate CRM deal", "найден дубль по source_id или ИНН + процедура", "block"],
  ["Missing evidence", "нет source link, file hash или AI confidence", "return"],
  ["Rate limit", "CRM API вернул limit, retry идет через backoff", "retry"],
  ["Owner conflict", "ответственный в CRM не совпадает с ASTS ролью", "manual"],
];

const sandboxChecklist = [
  ["Sandbox tenant", "отдельный портал/база без боевых клиентов и платежей", "до токена"],
  ["Test procedure", "одна демо-процедура проходит pre-win и execution export", "до wave 1"],
  ["Rate limits", "лимиты API, retry и backoff записаны в runbook", "до scheduler"],
  ["Rollback drill", "удаляем связь CRM и оставляем локальные данные ASTS", "до production"],
];

const launchMatrix = [
  ["Волна 1", "Bitrix24 + amoCRM", "сделки, компании, задачи", "утвердить поля и стадии"],
  ["Волна 2", "1C + Telegram", "счета, платежи, статусы, уведомления", "собрать sandbox и bot token"],
  ["Волна 3", "Мегаплан + Planfix", "проекты исполнения и регламенты", "описать mapping задач"],
  ["Волна 4", "RetailCRM + СберCRM + BPMSoft", "enterprise CRM контуры", "проверить API и права доступа"],
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

        <section className="panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Launch matrix</p>
              <h2>Очередность CRM и каналов</h2>
            </div>
            <span className="status-pill">4 волны</span>
          </div>
          <div className="integration-matrix">
            <div className="integration-matrix-row integration-matrix-head">
              <span>Волна</span>
              <span>Системы</span>
              <span>Данные</span>
              <span>Следующий артефакт</span>
            </div>
            {launchMatrix.map(([wave, systems, data, artifact]) => (
              <div className="integration-matrix-row" key={wave}>
                <strong>{wave}</strong>
                <span>{systems}</span>
                <span>{data}</span>
                <em>{artifact}</em>
              </div>
            ))}
          </div>
        </section>

        <section className="integration-grid">
          {integrations.map(([name, text, status, tone]) => (
            <article className={`integration ${tone}`} key={name}>
              <strong>{name}</strong>
              <p>{text}</p>
              <span>{status}</span>
            </article>
          ))}
        </section>

        <section className="panel field-mapping-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Field mapping</p>
              <h2>Минимальный контракт данных для CRM</h2>
            </div>
            <span className="status-pill">deal contract</span>
          </div>
          <div className="field-mapping-grid">
            {fieldMapping.map(([title, asts, target, rule]) => (
              <article className="field-mapping-card" key={title}>
                <span>{target}</span>
                <strong>{title}</strong>
                <p>{asts}</p>
                <em>{rule}</em>
              </article>
            ))}
          </div>
        </section>

        <section className="panel export-gates-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Export gates</p>
              <h2>Когда можно отправлять данные в CRM</h2>
            </div>
            <span className="status-pill">no blind sync</span>
          </div>
          <div className="export-gates-grid">
            {exportGates.map(([title, rule, state]) => (
              <article className={`export-gate-card ${state === "ready" ? "ready" : ""}`} key={title}>
                <span>{state}</span>
                <strong>{title}</strong>
                <p>{rule}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel sync-failure-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Sync failure queue</p>
              <h2>Что делаем, если CRM export не прошел</h2>
            </div>
            <span className="status-pill">no silent retry</span>
          </div>
          <div className="sync-failure-grid">
            {syncFailureQueue.map(([title, text, action]) => (
              <article className="sync-failure-card" key={title}>
                <span>{action}</span>
                <strong>{title}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel crm-sandbox-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">CRM sandbox gate</p>
              <h2>Что должно быть готово до боевого sync</h2>
            </div>
            <span className="status-pill green">no production first</span>
          </div>
          <div className="crm-sandbox-grid">
            {sandboxChecklist.map(([title, text, gate]) => (
              <article className="crm-sandbox-card" key={title}>
                <span>{gate}</span>
                <strong>{title}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
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

        <section className="panel integration-access-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Access checklist</p>
              <h2>Что проверяем перед включением CRM</h2>
            </div>
            <span className="status-pill green">secret-safe</span>
          </div>
          <div className="integration-access-grid">
            {accessChecklist.map(([title, text]) => (
              <article className="integration-access-card" key={title}>
                <strong>{title}</strong>
                <span>{text}</span>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
