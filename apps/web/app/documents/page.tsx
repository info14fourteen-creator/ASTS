import { Sidebar } from "../app-shell";

const documents = [
  ["Техническое задание", "ЕИС", "OCR готов", "AI 82%", "до победы"],
  ["Проект контракта", "ЕИС", "OCR готов", "AI 91%", "до победы"],
  ["Протокол подведения итогов", "ЕИС", "OCR готов", "AI 88%", "результат"],
  ["Счет поставщика", "ручная загрузка", "нужен OCR", "AI ожидает", "исполнение"],
  ["УПД", "1C", "ожидает файл", "AI ожидает", "закрывающие"],
];

const vaultRules = [
  ["Версии", "новая загрузка не затирает прошлый файл и AI вывод"],
  ["Источник", "каждый документ связан с API, площадкой или ручной загрузкой"],
  ["Доступ", "финансы видят платежи, B2G видит процедуру, исполнение видит контракт"],
  ["Аудит", "фиксируем кто загрузил, кто подтвердил и где использован документ"],
];

const queues = [
  ["OCR очередь", "2 файла требуют распознавания", "сегодня"],
  ["AI разбор", "1 файл ожидает извлечения полей", "после OCR"],
  ["Ручная проверка", "2 вывода ниже confidence 85%", "закупщик"],
];

export default function DocumentsPage() {
  return (
    <main className="app-shell">
      <Sidebar active="documents" />
      <section className="workspace">
        <header className="topline">
          <div>
            <p className="eyebrow">File vault</p>
            <h1>Файлы и документы</h1>
          </div>
          <button className="primary" type="button">
            Загрузить файл
          </button>
        </header>

        <section className="panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Procedure package</p>
              <h2>Документы процедуры и исполнения</h2>
            </div>
            <span className="status-pill">5 файлов</span>
          </div>
          <div className="document-table">
            <div className="document-row document-head">
              <span>Документ</span>
              <span>Источник</span>
              <span>OCR</span>
              <span>AI</span>
              <span>Этап</span>
            </div>
            {documents.map(([title, source, ocr, ai, stage]) => (
              <div className="document-row" key={title}>
                <strong>{title}</strong>
                <span>{source}</span>
                <span>{ocr}</span>
                <span>{ai}</span>
                <span>{stage}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="layout-grid bottom-grid">
          <article className="panel span-7">
            <div className="panel-head compact">
              <div>
                <p className="eyebrow">Vault policy</p>
                <h2>Правила файлового сейфа</h2>
              </div>
            </div>
            <div className="sync-rule-grid">
              {vaultRules.map(([title, text]) => (
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
                <p className="eyebrow">Queues</p>
                <h2>Очереди обработки</h2>
              </div>
            </div>
            <div className="ingest-log">
              {queues.map(([title, text, status]) => (
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
