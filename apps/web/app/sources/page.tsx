import { Sidebar } from "../app-shell";
import {
  sourceFreshnessBreachQueue,
  sourceFreshnessBrowserLoop,
  sourceQuarantineBrowserLoop,
  sourceUrlHealthStates,
} from "../../lib/mock-data";

const sources = [
  ["ЕИС / zakupki.gov.ru", "44-ФЗ, 223-ФЗ, извещения, протоколы, контракты", "connector stub", "primary"],
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

const sourceIntakeContract = [
  ["Source ID", "официальный идентификатор процедуры, ИНН или файла", "до нормализации"],
  ["Raw artifact", "XML/JSON ответа, PDF или архив из первоисточника", "сохраняем всегда"],
  ["Checksum", "sha256 для ответа и каждого вложенного файла", "для audit trail"],
  ["AI status", "ready, quarantine или manual review", "до скоринга"],
];

const connectorReadiness = [
  ["P0", "ЕИС / zakupki.gov.ru", "зафиксирован skeleton `/v1/sources/connectors`; дальше ключи, лимиты и тесты", "stub готов"],
  ["P0", "ФНС", "зафиксировать метод проверки ИНН и хранение ответа", "нужен доступ"],
  ["P1", "ЭТП", "разделить площадки по API, webhook и ручному импорту", "карта коннекторов"],
  ["P1", "File vault", "хеш, OCR, версии и связь файла с процедурой", "прототип"],
];

const fnsReadiness = {
  connectorId: "fns-egrul-nalog-ru",
  status: "contract-only",
  owner: "Legal",
  aiGate: "manual_review_until_secrets",
  rawTemplate: "raw/fns/{inn}/{artifact_id}",
  requiredSecrets: ["FNS_API_BASE_URL", "FNS_API_TOKEN"],
  checks: [
    ["ИНН", "fetch_by_inn", "поиск компании и статуса юрлица"],
    ["ОГРН", "fetch_by_ogrn", "сверка карточки ЕГРЮЛ"],
    ["Выписка", "fetch_extract", "raw artifact + checksum"],
    ["Freshness", "normalize", "событийная проверка перед AI"],
  ],
};

const fnsConnectorBrowserLoop = {
  route: "/sources",
  selector: "[data-testid='fns-source-readiness-card']",
  expectedStatus: fnsReadiness.status,
  expectedAiGate: fnsReadiness.aiGate,
  expectedSecretCount: fnsReadiness.requiredSecrets.length,
  expectedCapabilityCount: fnsReadiness.checks.length,
  checks: [
    ["Locate", "найти contract-only карточку ФНС по data-testid"],
    ["Assert connector", "сверить connector_id, status и AI gate"],
    ["Assert access", "проверить required secrets без чтения значений секретов"],
    ["Assert capabilities", "закрепить ИНН, ОГРН, выписку и normalize"],
  ],
};

const connectorRunbook = [
  ["ЕИС", "Data", "raw XML/JSON + файлы", "retry 3x / quarantine"],
  ["ФНС", "Legal", "ответ проверки ИНН", "ручное подтверждение при расхождении"],
  ["ЭТП", "Ops", "статус подачи + площадочные файлы", "AI блокируется без статуса площадки"],
  ["Файлы", "Docs", "оригинал, OCR, версия", "AI вывод только с file hash"],
];

const ingestionRetryPolicy = [
  ["API timeout", "повтор 3 раза с backoff, потом freshness breach", "retry"],
  ["Schema drift", "raw payload в quarantine, normalizer не перезаписывает старую схему", "quarantine"],
  ["File missing", "карточка процедуры остается без AI вывода до появления файла", "block AI"],
  ["Duplicate payload", "сравниваем source id и checksum, новый дубль только в audit log", "dedupe"],
];

const freshnessRules = [
  ["ЕИС", "15 мин", "извещения, протоколы и документы не старше окна синхронизации"],
  ["ФНС", "по событию", "проверка ИНН запускается при новой процедуре или поставщике"],
  ["Файлы/OCR", "до 30 мин", "AI не делает вывод без оригинала файла или OCR-версии"],
  ["ЭТП", "webhook/API", "статусы подачи и площадочные файлы требуют подтверждения коннектора"],
];

const sourceFreshnessOwnerReceipts = [
  ["stale", "supplier_manager", "обновить payload из первоисточника и показать новый checksum"],
  ["missing", "tender_manager", "загрузить отсутствующий raw artifact или официальный ответ об отсутствии публикации"],
  ["parse_failed", "data_owner", "отправить payload на ручную схему нормализации, сохранив quarantine"],
  ["hash_mismatch", "execution_owner", "перезапросить первоисточник и сравнить checksum"],
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
  ["zakupki.gov.ru", "Извещения, лоты, протоколы", "каждые 15 мин", "contract-only stub"],
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

const rawCustody = [
  ["Raw payload", "оригинальный XML/JSON ответа API", "нельзя перезаписывать"],
  ["Source timestamp", "время получения из ЕИС, ФНС или ЭТП", "нужно для freshness SLA"],
  ["Checksum", "sha256 для файла и ответа коннектора", "связь с AI доказательством"],
  ["Quarantine", "ошибка схемы, дубль или низкое доверие", "ждет ручного решения"],
];

const evidenceLedger = [
  ["Ingest event", "коннектор, время, источник, статус ответа", "пишется до нормализации"],
  ["Artifact link", "raw payload, файл, OCR и checksum", "связь не редактируется"],
  ["Decision gate", "freshness, confidence, quarantine reason", "AI видит только прошедшее"],
  ["Human override", "кто снял блокировку или принял риск", "обязательно в audit log"],
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

        <section
          className="panel source-url-health-panel"
          data-quarantine-count={sourceUrlHealthStates.filter((state) => state.status === "quarantine").length}
          data-ready-count={sourceUrlHealthStates.filter((state) => state.status === "ready").length}
          data-testid="source-url-health-state"
          data-unavailable-count={sourceUrlHealthStates.filter((state) => state.status === "unavailable").length}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source URL health state</p>
              <h2>Когда первоисточник можно отдавать в AI</h2>
            </div>
            <span className="status-pill amber">quarantine blocks AI</span>
          </div>
          <div className="source-url-health-grid">
            {sourceUrlHealthStates.map((state) => (
              <article className={`source-url-health-card ${state.status}`} data-status={state.status} key={state.id}>
                <div>
                  <span>{state.status}</span>
                  <strong>{state.source}</strong>
                </div>
                <a href={state.sourceUrl} rel="noreferrer" target="_blank">
                  {state.host}
                </a>
                <dl>
                  <div>
                    <dt>Procedure</dt>
                    <dd>{state.id}</dd>
                  </div>
                  <div>
                    <dt>Raw artifact</dt>
                    <dd>{state.rawArtifactId}</dd>
                  </div>
                  <div>
                    <dt>Freshness</dt>
                    <dd>{state.freshness}</dd>
                  </div>
                  <div>
                    <dt>Owner</dt>
                    <dd>{state.owner}</dd>
                  </div>
                </dl>
                <p>{state.reason}</p>
                <em>
                  {state.lastChecked} · {state.action}
                </em>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel source-quarantine-browser-loop-panel"
          data-ai-gate={sourceQuarantineBrowserLoop.expectedAiGate}
          data-action={sourceQuarantineBrowserLoop.expectedAction}
          data-owner={sourceQuarantineBrowserLoop.owner}
          data-raw-artifact-id={sourceQuarantineBrowserLoop.rawArtifactId}
          data-route={sourceQuarantineBrowserLoop.route}
          data-selector={sourceQuarantineBrowserLoop.selector}
          data-status={sourceQuarantineBrowserLoop.expectedStatus}
          data-testid="source-quarantine-browser-loop"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source quarantine browser loop</p>
              <h2>Как браузер сверяет блокировку AI по первоисточнику</h2>
            </div>
            <span className="status-pill amber">{sourceQuarantineBrowserLoop.status}</span>
          </div>
          <div className="source-quarantine-browser-loop-grid">
            {sourceQuarantineBrowserLoop.checks.map(([title, text]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>{sourceQuarantineBrowserLoop.selector}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel source-intake-contract-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source intake contract</p>
              <h2>Что обязано прийти из первоисточника</h2>
            </div>
            <span className="status-pill green">AI blocked until complete</span>
          </div>
          <div className="source-intake-contract-grid">
            {sourceIntakeContract.map(([title, text, gate]) => (
              <article className="source-intake-contract-card" key={title}>
                <span>{gate}</span>
                <strong>{title}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel connector-readiness-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Connector readiness</p>
              <h2>Что должно быть готово до автоматического забора</h2>
            </div>
            <span className="status-pill green">primary source gate</span>
          </div>
          <div className="connector-readiness-grid">
            {connectorReadiness.map(([priority, source, task, status]) => (
              <article className="connector-readiness-card" key={source}>
                <span>{priority}</span>
                <strong>{source}</strong>
                <p>{task}</p>
                <em>{status}</em>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel connector-readiness-panel"
          data-ai-gate={fnsReadiness.aiGate}
          data-connector-id={fnsReadiness.connectorId}
          data-owner={fnsReadiness.owner}
          data-raw-template={fnsReadiness.rawTemplate}
          data-required-secrets={fnsReadiness.requiredSecrets.join(",")}
          data-status={fnsReadiness.status}
          data-testid="fns-source-readiness-card"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">FNS source readiness</p>
              <h2>ФНС / ЕГРЮЛ как первоисточник для ИНН и ОГРН</h2>
            </div>
            <span className="status-pill amber">{fnsReadiness.status}</span>
          </div>
          <div className="connector-readiness-grid">
            {fnsReadiness.checks.map(([title, capability, text]) => (
              <article className="connector-readiness-card" data-capability={capability} key={title}>
                <span>{title}</span>
                <strong>{capability}</strong>
                <p>{text}</p>
                <em>{fnsReadiness.rawTemplate}</em>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel source-quarantine-browser-loop-panel"
          data-ai-gate={fnsConnectorBrowserLoop.expectedAiGate}
          data-capability-count={fnsConnectorBrowserLoop.expectedCapabilityCount}
          data-connector-id={fnsReadiness.connectorId}
          data-route={fnsConnectorBrowserLoop.route}
          data-secret-count={fnsConnectorBrowserLoop.expectedSecretCount}
          data-selector={fnsConnectorBrowserLoop.selector}
          data-status={fnsConnectorBrowserLoop.expectedStatus}
          data-testid="fns-connector-browser-loop"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">FNS connector browser loop</p>
              <h2>Как браузер сверяет readiness ФНС без сетевого вызова</h2>
            </div>
            <span className="status-pill amber">{fnsConnectorBrowserLoop.expectedStatus}</span>
          </div>
          <div className="source-quarantine-browser-loop-grid">
            {fnsConnectorBrowserLoop.checks.map(([title, text]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>{fnsConnectorBrowserLoop.selector}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
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

        <section className="panel ingestion-retry-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Ingestion retry policy</p>
              <h2>Как обрабатываем сбой забора данных</h2>
            </div>
            <span className="status-pill">no silent overwrite</span>
          </div>
          <div className="ingestion-retry-grid">
            {ingestionRetryPolicy.map(([title, text, action]) => (
              <article className="ingestion-retry-card" key={title}>
                <span>{action}</span>
                <strong>{title}</strong>
                <p>{text}</p>
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

        <section
          className="panel freshness-breach-panel"
          data-ai-blocked-count={sourceFreshnessBreachQueue.filter((item) => item.aiGate === "blocked").length}
          data-breach-types={sourceFreshnessBrowserLoop.expectedBreachTypes.join(",")}
          data-testid="source-freshness-breach-queue"
          data-total-count={sourceFreshnessBreachQueue.length}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Freshness breach queue</p>
              <h2>Что делаем, если первоисточник нарушил SLA</h2>
            </div>
            <span className="status-pill amber">AI blocked</span>
          </div>
          <div className="freshness-breach-grid">
            {sourceFreshnessBreachQueue.map((item) => (
              <article
                className="freshness-breach-card"
                data-ai-gate={item.aiGate}
                data-breach-type={item.breachType}
                data-raw-artifact-id={item.rawArtifactId}
                data-source-url={item.sourceUrl}
                key={item.id}
              >
                <span>{item.breachType}</span>
                <strong>{item.source}</strong>
                <p>{item.reason}</p>
                <dl>
                  <div>
                    <dt>Procedure</dt>
                    <dd>{item.tenderId}</dd>
                  </div>
                  <div>
                    <dt>Raw artifact</dt>
                    <dd>{item.rawArtifactId}</dd>
                  </div>
                  <div>
                    <dt>SLA / age</dt>
                    <dd>
                      {item.sla} / {item.age}
                    </dd>
                  </div>
                  <div>
                    <dt>Owner</dt>
                    <dd>{item.owner}</dd>
                  </div>
                </dl>
                <em>{item.action}</em>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel source-freshness-owner-panel"
          data-ai-gate="blocked_until_owner_receipt"
          data-receipt-status="restored"
          data-rule-count={sourceFreshnessOwnerReceipts.length}
          data-testid="source-freshness-owner-receipt-rules"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Freshness owner receipt</p>
              <h2>Кто может снять блокировку первоисточника</h2>
            </div>
            <span className="status-pill amber">owner receipt required</span>
          </div>
          <div className="source-freshness-owner-grid">
            {sourceFreshnessOwnerReceipts.map(([breachType, owner, rule]) => (
              <article
                className="source-freshness-owner-card"
                data-breach-type={breachType}
                data-owner={owner}
                data-required-receipt-status="restored"
                key={breachType}
              >
                <span>{breachType}</span>
                <strong>{owner}</strong>
                <p>{rule}</p>
                <em>AI остается blocked до owner receipt и нового raw artifact</em>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel source-quarantine-browser-loop-panel"
          data-ai-gate={sourceFreshnessBrowserLoop.expectedAiGate}
          data-breach-types={sourceFreshnessBrowserLoop.expectedBreachTypes.join(",")}
          data-expected-count={sourceFreshnessBrowserLoop.expectedCount}
          data-route={sourceFreshnessBrowserLoop.route}
          data-selector={sourceFreshnessBrowserLoop.selector}
          data-status={sourceFreshnessBrowserLoop.status}
          data-testid="source-freshness-browser-loop"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Freshness breach browser loop</p>
              <h2>Как браузер сверяет блокировку AI по freshness</h2>
            </div>
            <span className="status-pill amber">{sourceFreshnessBrowserLoop.status}</span>
          </div>
          <div className="source-quarantine-browser-loop-grid">
            {sourceFreshnessBrowserLoop.checks.map(([title, text]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>{sourceFreshnessBrowserLoop.selector}</strong>
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

        <section className="panel raw-custody-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Raw data custody</p>
              <h2>Что сохраняем до нормализации</h2>
            </div>
            <span className="status-pill green">audit-safe</span>
          </div>
          <div className="raw-custody-grid">
            {rawCustody.map(([title, text, rule]) => (
              <article className="raw-custody-card" key={title}>
                <strong>{title}</strong>
                <p>{text}</p>
                <em>{rule}</em>
              </article>
            ))}
          </div>
        </section>

        <section className="panel evidence-ledger-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Evidence ledger</p>
              <h2>Какие следы оставляет каждый забор данных</h2>
            </div>
            <span className="status-pill green">traceable AI</span>
          </div>
          <div className="evidence-ledger-grid">
            {evidenceLedger.map(([title, text, rule]) => (
              <article className="evidence-ledger-card" key={title}>
                <strong>{title}</strong>
                <p>{text}</p>
                <em>{rule}</em>
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
