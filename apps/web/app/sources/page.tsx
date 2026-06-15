import { Sidebar } from "../app-shell";

const sources = [
  ["ЕИС / zakupki.gov.ru", "44-ФЗ, 223-ФЗ, извещения, протоколы, контракты", "API contract", "primary"],
  ["ФНС", "ИНН, ЕГРЮЛ, статус компании, налоговые признаки", "legal check", "primary"],
  ["ЭТП", "Сбер АСТ, РТС-тендер, Росэлторг и площадки процедуры", "connector map", "pending"],
  ["ГИС Торги", "имущество, аренда, отдельные типы торгов", "source review", "pending"],
  ["Федресурс", "банкротство, залоги, существенные сообщения", "risk feed", "watch"],
  ["Локальные файлы", "ТЗ, сметы, КП, протоколы, контракты, переписка", "file vault", "primary"],
];

const pipeline = [
  ["01", "Забор", "официальный API, выгрузка или файл"],
  ["02", "Нормализация", "единая схема процедур, лотов и организаций"],
  ["03", "Файлы", "скачивание, OCR, версионирование"],
  ["04", "Индексация", "поиск, фильтры, признаки риска"],
  ["05", "AI разбор", "выводы с confidence и ссылкой на источник"],
];

const queue = [
  ["44-ФЗ за 7 дней", "извещения + документы", "готово к прототипу"],
  ["ФНС проверка участника", "ИНН -> карточка контрагента", "следующий шаг"],
  ["Протоколы после победы", "вторая воронка исполнения", "в плане"],
];

const runStats = [
  ["Последний забор", "04:12", "ЕИС извещения"],
  ["Новых процедур", "128", "за 24 часа"],
  ["Файлов в очереди", "342", "ТЗ, протоколы, КП"],
  ["Ошибок API", "2", "повтор через 15 мин"],
];

const connectorRunbook = [
  ["ЕИС", "Data", "raw XML/JSON + файлы", "retry 3x / quarantine"],
  ["ФНС", "Legal", "ответ проверки ИНН", "ручное подтверждение при расхождении"],
  ["ЭТП", "Ops", "статус подачи + площадочные файлы", "AI блокируется без статуса площадки"],
  ["Файлы", "Docs", "оригинал, OCR, версия", "AI вывод только с file hash"],
];

const freshnessRules = [
  ["ЕИС", "15 мин", "извещения, протоколы и документы не старше окна синхронизации"],
  ["ФНС", "по событию", "проверка ИНН запускается при новой процедуре или поставщике"],
  ["Файлы/OCR", "до 30 мин", "AI не делает вывод без оригинала файла или OCR-версии"],
  ["ЭТП", "webhook/API", "статусы подачи и площадочные файлы требуют подтверждения коннектора"],
];

const evidenceGates = [
  ["Source URL", "ссылка на карточку ЕИС, ФНС или ЭТП", "обязательно"],
  ["File hash", "оригинал документа и версия OCR", "обязательно"],
  ["Freshness", "попадание в SLA первоисточника", "перед AI"],
  ["Confidence", "порог доверия и причина ручной проверки", "audit"],
];

const accessLedger = [
  ["ЕИС API", "GitHub Secret", "Owner", "синхронизация процедур"],
  ["ФНС", "личный ключ/контракт", "Legal", "проверка ИНН и ЕГРЮЛ"],
  ["ЭТП sandbox", "кабинет площадки", "Ops", "статус подачи и площадочные файлы"],
  ["File vault", "service account", "Docs", "OCR, hash и версионирование"],
];

const endpoints = [
  ["zakupki.gov.ru", "Извещения, лоты, протоколы", "каждые 15 мин", "активен"],
  ["ФНС", "ЕГРЮЛ, ИНН, статус юрлица", "по событию", "контракт"],
  ["ЭТП", "статусы подачи и площадочные файлы", "webhook/API", "проект"],
  ["Федресурс", "банкротство, залоги, сообщения", "раз в день", "наблюдение"],
];

const storageRules = [
  ["Postgres", "процедуры, лоты, организации, стадии, задачи"],
  ["Object storage", "оригинальные документы, OCR, версии файлов"],
  ["Search index", "полнотекстовый поиск по ТЗ, протоколам и КП"],
  ["Audit log", "кто и когда принял AI-рекомендацию или изменил этап"],
];

export default function SourcesPage() {
  return (
    <main className="app-shell">
      <Sidebar active="sources" />
      <section className="workspace">
        <header className="topline">
          <div>
            <p className="eyebrow">Data ingestion</p>
            <h1>Источники данных</h1>
          </div>
          <button className="primary" type="button">
            Добавить источник
          </button>
        </header>

        <section className="source-monitor">
          {sources.map(([name, text, status, tone]) => (
            <article className={`source-card ${tone}`} key={name}>
              <div>
                <strong>{name}</strong>
                <p>{text}</p>
              </div>
              <span>{status}</span>
            </article>
          ))}
        </section>

        <section className="source-health-grid">
          {runStats.map(([label, value, text]) => (
            <article className="source-health" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <small>{text}</small>
            </article>
          ))}
        </section>

        <section className="panel connector-runbook-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Connector runbook</p>
              <h2>Кто отвечает за первоисточник</h2>
            </div>
            <span className="status-pill green">no aggregator</span>
          </div>
          <div className="connector-runbook-grid">
            {connectorRunbook.map(([source, owner, artifact, guard]) => (
              <article className="connector-runbook-card" key={source}>
                <div>
                  <strong>{source}</strong>
                  <span>{owner}</span>
                </div>
                <p>{artifact}</p>
                <em>{guard}</em>
              </article>
            ))}
          </div>
        </section>

        <section className="panel freshness-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Freshness SLA</p>
              <h2>Когда данные можно отдавать в AI разбор</h2>
            </div>
            <span className="status-pill">primary only</span>
          </div>
          <div className="freshness-grid">
            {freshnessRules.map(([title, cadence, text]) => (
              <article className="freshness-card" key={title}>
                <span>{cadence}</span>
                <strong>{title}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel evidence-gate-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI evidence gate</p>
              <h2>Без каких доказательств AI не делает вывод</h2>
            </div>
            <span className="status-pill">source-backed only</span>
          </div>
          <div className="evidence-gate-grid">
            {evidenceGates.map(([title, text, rule]) => (
              <article className="evidence-gate-card" key={title}>
                <span>{rule}</span>
                <strong>{title}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel access-ledger-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Access ledger</p>
              <h2>Какие доступы нужны для первоисточников</h2>
            </div>
            <span className="status-pill green">secret registry</span>
          </div>
          <div className="access-ledger">
            <div className="access-ledger-row access-ledger-head">
              <span>Доступ</span>
              <span>Где хранится</span>
              <span>Владелец</span>
              <span>Что блокирует</span>
            </div>
            {accessLedger.map(([name, storage, owner, blocker]) => (
              <div className="access-ledger-row" key={name}>
                <strong>{name}</strong>
                <span>{storage}</span>
                <span>{owner}</span>
                <em>{blocker}</em>
              </div>
            ))}
          </div>
        </section>

        <section className="layout-grid bottom-grid">
          <article className="panel span-7">
            <div className="panel-head compact">
              <div>
                <p className="eyebrow">Pipeline</p>
                <h2>Как данные попадают в ASTS</h2>
              </div>
            </div>
            <div className="pipeline">
              {pipeline.map(([step, title, text]) => (
                <div className="pipeline-step" key={step}>
                  <span>{step}</span>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="panel span-5">
            <div className="panel-head compact">
              <div>
                <p className="eyebrow">Next connectors</p>
                <h2>Очередь разработки</h2>
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

        <section className="layout-grid bottom-grid">
          <article className="panel span-7">
            <div className="panel-head compact">
              <div>
                <p className="eyebrow">Primary API map</p>
                <h2>Контроль первоисточников</h2>
              </div>
            </div>
            <div className="endpoint-table">
              <div className="endpoint-row endpoint-head">
                <span>Источник</span>
                <span>Данные</span>
                <span>Частота</span>
                <span>Статус</span>
              </div>
              {endpoints.map(([name, data, cadence, status]) => (
                <div className="endpoint-row" key={name}>
                  <strong>{name}</strong>
                  <span>{data}</span>
                  <span>{cadence}</span>
                  <em>{status}</em>
                </div>
              ))}
            </div>
          </article>

          <article className="panel span-5">
            <div className="panel-head compact">
              <div>
                <p className="eyebrow">Server storage</p>
                <h2>Куда складываем</h2>
              </div>
            </div>
            <div className="source-grid">
              {storageRules.map(([title, text]) => (
                <div className="source-rule" key={title}>
                  <strong>{title}</strong>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}
