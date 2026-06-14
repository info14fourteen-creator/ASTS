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
      </section>
    </main>
  );
}
