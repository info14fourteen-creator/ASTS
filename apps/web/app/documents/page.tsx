import { Sidebar } from "../app-shell";

const documents = [
  ["Техническое задание", "ЕИС API", "PDF + OCR", "AI 82%", "до победы", "подтвердить сроки"],
  ["Проект контракта", "ЕИС API", "PDF + OCR", "AI 91%", "до победы", "готово"],
  ["Протокол подведения итогов", "ЕИС API", "PDF + OCR", "AI 88%", "результат", "сверить победителя"],
  ["Счет поставщика", "ручная загрузка", "нужен OCR", "AI ожидает", "исполнение", "запросить скан"],
  ["УПД", "1C", "ожидает файл", "AI ожидает", "закрывающие", "нет оригинала"],
];

const documentStats = [
  ["13", "файлов в пакете", "ЕИС, площадка, 1C, ручная загрузка"],
  ["9", "связаны с первоисточником", "есть API id или ссылка на исходный файл"],
  ["2", "требуют действия", "OCR и подтверждение победителя"],
  ["85%", "порог автопроверки", "ниже отправляем человеку"],
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

const handoffReceipt = [
  ["Original owner", "кто загрузил или подтвердил первоисточник", "до обработки"],
  ["OCR owner", "кто отвечает за качество распознавания", "до AI"],
  ["Stage binding", "к какой воронке и этапу привязан файл", "до задачи"],
  ["Use history", "где документ уже использован в выводе или решении", "audit"],
];

const integrityChain = [
  ["Original", "PDF/DOCX/XLSX", "храним без изменений"],
  ["OCR", "text layer", "версия связана с оригиналом"],
  ["Hash", "sha256", "AI вывод ссылается на file hash"],
  ["AI-ready", "fields + evidence", "только после source link"],
];

const aiReleaseGates = [
  ["Оригинал", "AI не работает без исходного файла"],
  ["OCR", "низкое качество уходит в ручную проверку"],
  ["Hash", "каждый вывод хранит ссылку на sha256"],
  ["Источник", "нужна связь с ЕИС, ЭТП, 1C или ручной загрузкой"],
];

const manifestFields = [
  ["source_id", "API id, URL или id ручной загрузки", "обязательно"],
  ["file_hash", "sha256 оригинала и OCR версии", "обязательно"],
  ["stage_link", "карточка процедуры и текущая воронка", "обязательно"],
  ["ai_evidence", "страница, confidence и человек, который подтвердил", "до экспорта"],
];

const rawArtifactManifests = [
  {
    title: "Техническое задание",
    artifactId: "raw-eis-0373100042626000001",
    source: "zakupki.gov.ru",
    storage: "raw/eis/0373100042626000001/specification.pdf",
    checksum: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    contentType: "application/pdf",
    collectedAt: "16 июня 2026, 07:40",
    custody: "parsed",
  },
  {
    title: "Проверка заказчика по ФНС",
    artifactId: "raw-fns-customer-profile-7700000000",
    source: "egrul.nalog.ru",
    storage: "raw/fns/7700000000/egrul.json",
    checksum: "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    contentType: "application/json",
    collectedAt: "16 июня 2026, 07:42",
    custody: "checksum_verified",
  },
];

const intakeRules = [
  ["Первоисточник", "сохраняем исходный файл, API id, дату получения и хэш"],
  ["Распознавание", "OCR складывает текст рядом с оригиналом и не меняет PDF"],
  ["Извлечение", "AI вынимает сроки, суммы, требования, штрафы и реквизиты"],
  ["Контроль", "каждый вывод имеет confidence и ссылку на страницу документа"],
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

        <section className="document-stat-grid">
          {documentStats.map(([value, label, hint]) => (
            <article className="document-stat" key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
              <small>{hint}</small>
            </article>
          ))}
        </section>

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
              <span>Блокер</span>
            </div>
            {documents.map(([title, source, ocr, ai, stage, blocker]) => (
              <div className="document-row" key={title}>
                <strong>{title}</strong>
                <span>{source}</span>
                <span>{ocr}</span>
                <span>{ai}</span>
                <span>{stage}</span>
                <em>{blocker}</em>
              </div>
            ))}
          </div>
        </section>

        <section className="panel raw-artifact-manifest-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Raw artifact manifests</p>
              <h2>Исходные файлы, checksum и custody</h2>
            </div>
            <span className="status-pill green">source-linked</span>
          </div>
          <div className="raw-artifact-manifest-grid">
            {rawArtifactManifests.map((artifact) => (
              <article className="raw-artifact-manifest-card" key={artifact.artifactId}>
                <div className="raw-artifact-manifest-head">
                  <div>
                    <span>{artifact.custody}</span>
                    <strong>{artifact.title}</strong>
                  </div>
                  <em>{artifact.contentType}</em>
                </div>
                <dl>
                  <div>
                    <dt>Artifact</dt>
                    <dd>{artifact.artifactId}</dd>
                  </div>
                  <div>
                    <dt>Source</dt>
                    <dd>{artifact.source}</dd>
                  </div>
                  <div>
                    <dt>Storage</dt>
                    <dd>{artifact.storage}</dd>
                  </div>
                  <div>
                    <dt>Checksum</dt>
                    <dd>{artifact.checksum}</dd>
                  </div>
                  <div>
                    <dt>Collected</dt>
                    <dd>{artifact.collectedAt}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section className="panel document-handoff-receipt-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Document handoff receipt</p>
              <h2>Что фиксируем при передаче документа дальше</h2>
            </div>
            <span className="status-pill green">no lost evidence</span>
          </div>
          <div className="document-handoff-receipt-grid">
            {handoffReceipt.map(([title, text, gate]) => (
              <article className="document-handoff-receipt-card" key={title}>
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

        <section className="panel document-integrity-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Integrity chain</p>
              <h2>Как не теряем связь оригинала и AI-вывода</h2>
            </div>
            <span className="status-pill green">hash-linked</span>
          </div>
          <div className="document-integrity-grid">
            {integrityChain.map(([title, format, rule]) => (
              <article className="document-integrity-card" key={title}>
                <span>{format}</span>
                <strong>{title}</strong>
                <p>{rule}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel document-release-gates-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI release gates</p>
              <h2>Когда документ можно отдавать в AI-вывод</h2>
            </div>
            <span className="status-pill">evidence first</span>
          </div>
          <div className="document-release-gates-grid">
            {aiReleaseGates.map(([title, rule]) => (
              <article className="document-release-gate-card" key={title}>
                <span>{title}</span>
                <strong>{rule}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="panel document-manifest-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Manifest export</p>
              <h2>Что кладем в пакет доказательств</h2>
            </div>
            <span className="status-pill">portable evidence</span>
          </div>
          <div className="document-manifest-grid">
            {manifestFields.map(([field, rule, gate]) => (
              <article className="document-manifest-card" key={field}>
                <span>{gate}</span>
                <strong>{field}</strong>
                <p>{rule}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Processing contract</p>
              <h2>Как файл превращается в проверяемые данные</h2>
            </div>
            <span className="status-pill">primary only</span>
          </div>
          <div className="document-flow-grid">
            {intakeRules.map(([title, text], index) => (
              <article className="document-flow-card" key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{title}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
