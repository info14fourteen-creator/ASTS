import { Sidebar } from "../app-shell";
import {
  sourceFreshnessBreachQueue,
  sourceFreshnessBrowserLoop,
  sourceReceiptBrowserLoop,
  sourceQuarantineBrowserLoop,
  sourceUrlHealthStates,
} from "../../lib/mock-data";
import fnsConnectorGate from "../../../../packages/shared/fns-connector-gate.json";
import sourceOwnerReceiptsFixture from "../../../../packages/shared/source-owner-receipts.json";

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

const eisRealNetworkSmokeGate = {
  status: "contract_only",
  owner: "Data",
  ciPolicy: "CI validates connector contract shape until access terms and secrets are approved.",
  safeTestPairRequired: true,
  requiredApprovals: [
    "approved official EIS access terms",
    "approved request volume limits",
    "GitHub secrets are present in protected environment",
    "safe test EIS procedure is recorded",
    "raw artifact checksum and freshness receipt are asserted",
  ],
  approvalApiCopy: {
    route: "/v1/sources/connectors",
    status: "contract_only",
    owner: "Data",
    request_copy: "Request Data owner approval before enabling real EIS network smoke.",
    blocked_copy: "Do not enable EIS real-network smoke until all five approvals are recorded.",
    next_action: "Create protected environment secrets and record safe test zakupki.gov.ru procedure after Data approval.",
    no_merge_copy:
      "Не мержить real-network EIS smoke, пока approval_api_copy подтверждает Data owner, protected secrets, safe EIS procedure, rate limits и checksum freshness receipt.",
  },
};

const fnsRealNetworkSmokeGate = {
  status: fnsConnectorGate.status,
  owner: fnsConnectorGate.owner,
  ciPolicy: fnsConnectorGate.ci_policy,
  safeTestPairRequired: fnsConnectorGate.safe_test_pair_required,
  requiredApprovals: fnsConnectorGate.required_approvals,
  approvalApiCopy: fnsConnectorGate.approval_api_copy,
};

const fnsNetworkGateBrowserLoop = {
  route: "/sources",
  apiRoute: "/v1/sources/connectors",
  selector: "[data-testid='fns-real-network-smoke-gate'] [data-approval]",
  docsHref: "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#fns-smoke-contract",
  expectedStatus: fnsRealNetworkSmokeGate.status,
  expectedOwner: fnsRealNetworkSmokeGate.owner,
  expectedApprovalCount: fnsRealNetworkSmokeGate.requiredApprovals.length,
  expectedSafeTestPair: fnsRealNetworkSmokeGate.safeTestPairRequired,
  checks: [
    ["Locate", "найти real-network gate и approval rows по data-testid"],
    ["Assert approvals", "сверить 5 owner approvals до включения сетевого smoke"],
    ["Assert Legal", "подтвердить Legal owner и safe INN/OGRN test pair"],
    ["Assert CI policy", "убедиться, что CI не зовет ФНС до явного разрешения"],
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

const sourceFreshnessOwnerReceipts = sourceOwnerReceiptsFixture.rules.map((rule) => [
  rule.breach_type,
  rule.owner_role,
  rule.evidence_rule,
]);

const sourceOwnerReceiptHistory = sourceOwnerReceiptsFixture.history.map((receipt) => ({
  id: receipt.id,
  breachType: receipt.breach_type,
  owner: receipt.owner_role,
  action: receipt.action,
  resolution: receipt.resolution_status,
  rawArtifact: receipt.raw_artifact_id,
  checksum: receipt.checksum_sha256,
  aiGate: receipt.ai_gate,
  note: receipt.audit_note,
}));

const sourceOwnerReceiptWriteContract = sourceOwnerReceiptsFixture.write_contract;
const sourceOwnerReceiptWriteDocsDeepLink = {
  route: "/sources",
  apiRoute: sourceOwnerReceiptWriteContract.route,
  docsHref:
    "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#source-owner-receipt-write-api-draft",
  expectedRequestFieldCount: sourceOwnerReceiptWriteContract.request_schema.length,
  method: sourceOwnerReceiptWriteContract.method,
  status: sourceOwnerReceiptWriteContract.status,
  sourceMarkerSelector: "[data-testid='source-owner-receipt-write-api-draft']",
  checks: [
    ["Locate", "найти write draft marker и docs deep-link на `/sources`"],
    ["Assert href", "сверить ссылку на API README write draft anchor"],
    ["Assert contract", "подтвердить POST draft, 10 request fields и idempotency key"],
    ["Assert copy", "оставить visible link copy рядом с write draft, а не только в `/plan`"],
  ],
};

const sourceFreshnessWriteContract = {
  route: "/v1/sources/freshness",
  method: "POST",
  status: "draft",
  owner: "Sources owner",
  idempotencyKeyRequired: true,
  requestSchema: [
    "breach_id",
    "tender_id",
    "source_kind",
    "owner_id",
    "owner_role",
    "breach_type",
    "resolution_status",
    "resolved_at",
    "new_raw_artifact_id",
    "new_checksum_sha256",
    "audit_note",
    "idempotency_key",
  ],
  blockedCopy:
    "Write endpoint stays draft until auth, idempotency, owner role validation and immutable freshness audit storage are implemented.",
  noMergeCopy:
    "Не мержить source freshness write endpoint, пока POST не проверяет owner role, breach type, idempotency key, restored evidence и immutable audit append.",
};
const sourceFreshnessWriteDocsDeepLink = {
  route: "/sources",
  apiRoute: sourceFreshnessWriteContract.route,
  docsHref:
    "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#source-freshness-write-api-draft",
  expectedRequestFieldCount: sourceFreshnessWriteContract.requestSchema.length,
  method: sourceFreshnessWriteContract.method,
  status: sourceFreshnessWriteContract.status,
  sourceMarkerSelector: "[data-testid='source-freshness-write-api-draft']",
  checks: [
    ["Locate", "найти freshness write draft marker и docs deep-link на `/sources`"],
    ["Assert href", "сверить ссылку на API README freshness write draft anchor"],
    ["Assert contract", "подтвердить POST draft, 12 request fields и idempotency key"],
    ["Assert audit", "оставить immutable freshness audit copy рядом с write draft"],
  ],
};

const sourceOwnerReceiptHistoryBrowserLoop = {
  route: "/sources",
  apiRoute: "/v1/sources/owner-receipts",
  docsHref: "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#source-owner-receipt-contract",
  selector: "[data-testid='source-owner-receipt-history'] [data-resolution-status]",
  expectedHistoryCount: sourceOwnerReceiptHistory.length,
  expectedAiGates: Array.from(new Set(sourceOwnerReceiptHistory.map((receipt) => receipt.aiGate))),
  expectedResolutionStatuses: Array.from(new Set(sourceOwnerReceiptHistory.map((receipt) => receipt.resolution))),
  expectedBlockedCount: sourceOwnerReceiptHistory.filter((receipt) => receipt.aiGate === "blocked_until_restored").length,
  checks: [
    ["Locate", "найти audit seed ручных freshness решений по data-testid"],
    ["Assert history", "сверить 4 receipt rows и resolution statuses"],
    ["Assert gates", "подтвердить ready_after_receipt и blocked_until_restored"],
    ["Assert evidence", "проверить raw artifact id и checksum на каждой строке"],
  ],
};

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
          className="panel connector-readiness-panel"
          data-approval-count={eisRealNetworkSmokeGate.requiredApprovals.length}
          data-approval-api-blocked-copy={eisRealNetworkSmokeGate.approvalApiCopy.blocked_copy}
          data-approval-api-next-action={eisRealNetworkSmokeGate.approvalApiCopy.next_action}
          data-approval-api-no-merge-copy={eisRealNetworkSmokeGate.approvalApiCopy.no_merge_copy}
          data-approval-api-owner={eisRealNetworkSmokeGate.approvalApiCopy.owner}
          data-approval-api-request-copy={eisRealNetworkSmokeGate.approvalApiCopy.request_copy}
          data-approval-api-route={eisRealNetworkSmokeGate.approvalApiCopy.route}
          data-approval-api-status={eisRealNetworkSmokeGate.approvalApiCopy.status}
          data-ci-policy={eisRealNetworkSmokeGate.ciPolicy}
          data-network-smoke-status={eisRealNetworkSmokeGate.status}
          data-owner={eisRealNetworkSmokeGate.owner}
          data-safe-test-pair-required={String(eisRealNetworkSmokeGate.safeTestPairRequired)}
          data-testid="eis-real-network-smoke-gate"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">EIS real-network smoke gate</p>
              <h2>Когда можно включить сетевой smoke zakupki.gov.ru</h2>
            </div>
            <span className="status-pill amber">{eisRealNetworkSmokeGate.status}</span>
          </div>
          <div className="connector-readiness-grid">
            <article className="connector-readiness-card" data-testid="eis-real-network-approval-api-copy">
              <span>API</span>
              <strong>{eisRealNetworkSmokeGate.approvalApiCopy.request_copy}</strong>
              <p>{eisRealNetworkSmokeGate.approvalApiCopy.blocked_copy}</p>
              <em>{eisRealNetworkSmokeGate.approvalApiCopy.next_action}</em>
            </article>
          </div>
          <div className="connector-readiness-grid">
            {eisRealNetworkSmokeGate.requiredApprovals.map((approval, index) => (
              <article className="connector-readiness-card" data-approval={approval} key={approval}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{approval}</strong>
                <p>{eisRealNetworkSmokeGate.ciPolicy}</p>
                <em>{eisRealNetworkSmokeGate.owner}</em>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel connector-readiness-panel"
          data-approval-count={fnsRealNetworkSmokeGate.requiredApprovals.length}
          data-approval-api-blocked-copy={fnsRealNetworkSmokeGate.approvalApiCopy.blocked_copy}
          data-approval-api-next-action={fnsRealNetworkSmokeGate.approvalApiCopy.next_action}
          data-approval-api-no-merge-copy={fnsRealNetworkSmokeGate.approvalApiCopy.no_merge_copy}
          data-approval-api-owner={fnsRealNetworkSmokeGate.approvalApiCopy.owner}
          data-approval-api-request-copy={fnsRealNetworkSmokeGate.approvalApiCopy.request_copy}
          data-approval-api-route={fnsRealNetworkSmokeGate.approvalApiCopy.route}
          data-approval-api-status={fnsRealNetworkSmokeGate.approvalApiCopy.status}
          data-ci-policy={fnsRealNetworkSmokeGate.ciPolicy}
          data-network-smoke-status={fnsRealNetworkSmokeGate.status}
          data-owner={fnsRealNetworkSmokeGate.owner}
          data-safe-test-pair-required={String(fnsRealNetworkSmokeGate.safeTestPairRequired)}
          data-testid="fns-real-network-smoke-gate"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">FNS real-network smoke gate</p>
              <h2>Когда можно включить сетевой smoke ИНН/ОГРН</h2>
            </div>
            <span className="status-pill amber">{fnsRealNetworkSmokeGate.status}</span>
          </div>
          <div className="connector-readiness-grid">
            <article className="connector-readiness-card" data-testid="fns-real-network-approval-api-copy">
              <span>API</span>
              <strong>{fnsRealNetworkSmokeGate.approvalApiCopy.request_copy}</strong>
              <p>{fnsRealNetworkSmokeGate.approvalApiCopy.blocked_copy}</p>
              <em>{fnsRealNetworkSmokeGate.approvalApiCopy.next_action}</em>
            </article>
          </div>
          <div className="connector-readiness-grid">
            {fnsRealNetworkSmokeGate.requiredApprovals.map((approval, index) => (
              <article className="connector-readiness-card" data-approval={approval} key={approval}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{approval}</strong>
                <p>{fnsRealNetworkSmokeGate.ciPolicy}</p>
                <em>{fnsRealNetworkSmokeGate.owner}</em>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel source-quarantine-browser-loop-panel"
          data-approval-count={fnsNetworkGateBrowserLoop.expectedApprovalCount}
          data-api-route={fnsNetworkGateBrowserLoop.apiRoute}
          data-ci-policy={fnsRealNetworkSmokeGate.ciPolicy}
          data-owner={fnsNetworkGateBrowserLoop.expectedOwner}
          data-docs-href={fnsNetworkGateBrowserLoop.docsHref}
          data-route={fnsNetworkGateBrowserLoop.route}
          data-safe-test-pair-required={String(fnsNetworkGateBrowserLoop.expectedSafeTestPair)}
          data-selector={fnsNetworkGateBrowserLoop.selector}
          data-status={fnsNetworkGateBrowserLoop.expectedStatus}
          data-testid="fns-network-gate-browser-loop"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">FNS network gate browser loop</p>
              <h2>Как браузер сверяет approvals перед сетевым smoke</h2>
            </div>
            <a
              className="primary-link"
              data-api-route={fnsNetworkGateBrowserLoop.apiRoute}
              data-testid="fns-network-gate-docs-link"
              href={fnsNetworkGateBrowserLoop.docsHref}
            >
              API README / Legal gate
            </a>
          </div>
          <div className="source-quarantine-browser-loop-grid">
            {fnsNetworkGateBrowserLoop.checks.map(([title, text]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>{fnsNetworkGateBrowserLoop.selector}</strong>
                <p>{text}</p>
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
          className="panel source-freshness-owner-panel"
          data-api-route={sourceOwnerReceiptHistoryBrowserLoop.apiRoute}
          data-history-count={sourceOwnerReceiptHistory.length}
          data-resolution-statuses={sourceOwnerReceiptHistory.map((receipt) => receipt.resolution).join(",")}
          data-testid="source-owner-receipt-history"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source owner receipt history</p>
              <h2>Демо-история ручных решений по freshness blockers</h2>
            </div>
            <span className="status-pill amber">audit seed</span>
          </div>
          <div className="source-freshness-owner-grid">
            {sourceOwnerReceiptHistory.map((receipt) => (
              <article
                className="source-freshness-owner-card"
                data-action={receipt.action}
                data-ai-gate={receipt.aiGate}
                data-breach-type={receipt.breachType}
                data-checksum={receipt.checksum}
                data-owner={receipt.owner}
                data-raw-artifact-id={receipt.rawArtifact}
                data-resolution-status={receipt.resolution}
                key={receipt.id}
              >
                <span>{receipt.breachType}</span>
                <strong>{receipt.owner}</strong>
                <p>{receipt.note}</p>
                <em>
                  {receipt.resolution} · {receipt.rawArtifact}
                </em>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel source-freshness-owner-panel"
          data-api-route={sourceFreshnessWriteContract.route}
          data-blocked-copy={sourceFreshnessWriteContract.blockedCopy}
          data-idempotency-key-required={String(sourceFreshnessWriteContract.idempotencyKeyRequired)}
          data-method={sourceFreshnessWriteContract.method}
          data-no-merge-copy={sourceFreshnessWriteContract.noMergeCopy}
          data-owner={sourceFreshnessWriteContract.owner}
          data-request-schema={sourceFreshnessWriteContract.requestSchema.join(",")}
          data-status={sourceFreshnessWriteContract.status}
          data-testid="source-freshness-write-api-draft"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source freshness write API draft</p>
              <h2>Как будущий POST снимет freshness blocker без потери audit</h2>
            </div>
            <span className="status-pill amber">{sourceFreshnessWriteContract.status}</span>
          </div>
          <div className="source-freshness-owner-grid">
            {[
              ["Route", `${sourceFreshnessWriteContract.method} ${sourceFreshnessWriteContract.route}`, sourceFreshnessWriteContract.owner],
              ["Idempotency", "idempotency_key required", sourceFreshnessWriteContract.requestSchema.join(", ")],
              ["Blocked", sourceFreshnessWriteContract.blockedCopy, "no freshness mutation until storage is immutable"],
              ["No merge", sourceFreshnessWriteContract.noMergeCopy, "owner role, breach type and restored evidence first"],
            ].map(([title, value, text]) => (
              <article className="source-freshness-owner-card" key={title}>
                <span>{title}</span>
                <strong>{value}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel source-quarantine-browser-loop-panel"
          data-api-route={sourceFreshnessWriteDocsDeepLink.apiRoute}
          data-docs-href={sourceFreshnessWriteDocsDeepLink.docsHref}
          data-expected-request-field-count={sourceFreshnessWriteDocsDeepLink.expectedRequestFieldCount}
          data-method={sourceFreshnessWriteDocsDeepLink.method}
          data-route={sourceFreshnessWriteDocsDeepLink.route}
          data-source-marker-selector={sourceFreshnessWriteDocsDeepLink.sourceMarkerSelector}
          data-status={sourceFreshnessWriteDocsDeepLink.status}
          data-testid="source-freshness-write-docs-deep-link"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source freshness write API docs deep-link</p>
              <h2>Где проверять контракт будущей записи freshness receipt</h2>
            </div>
            <a
              className="primary-link"
              data-api-route={sourceFreshnessWriteDocsDeepLink.apiRoute}
              data-method={sourceFreshnessWriteDocsDeepLink.method}
              data-testid="source-freshness-write-docs-deep-link-anchor"
              href={sourceFreshnessWriteDocsDeepLink.docsHref}
            >
              API README / freshness write draft
            </a>
          </div>
          <div className="source-quarantine-browser-loop-grid">
            {sourceFreshnessWriteDocsDeepLink.checks.map(([title, text]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>{sourceFreshnessWriteDocsDeepLink.sourceMarkerSelector}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel source-freshness-owner-panel"
          data-api-route={sourceOwnerReceiptWriteContract.route}
          data-blocked-copy={sourceOwnerReceiptWriteContract.blocked_copy}
          data-idempotency-key-required={String(sourceOwnerReceiptWriteContract.idempotency_key_required)}
          data-method={sourceOwnerReceiptWriteContract.method}
          data-no-merge-copy={sourceOwnerReceiptWriteContract.no_merge_copy}
          data-owner={sourceOwnerReceiptWriteContract.owner}
          data-request-schema={sourceOwnerReceiptWriteContract.request_schema.join(",")}
          data-status={sourceOwnerReceiptWriteContract.status}
          data-testid="source-owner-receipt-write-api-draft"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source owner receipt write API draft</p>
              <h2>Как будем записывать ручной receipt без потери audit</h2>
            </div>
            <span className="status-pill amber">{sourceOwnerReceiptWriteContract.status}</span>
          </div>
          <div className="source-freshness-owner-grid">
            <article className="source-freshness-owner-card">
              <span>{sourceOwnerReceiptWriteContract.method}</span>
              <strong>{sourceOwnerReceiptWriteContract.owner}</strong>
              <p>{sourceOwnerReceiptWriteContract.blocked_copy}</p>
              <em>{sourceOwnerReceiptWriteContract.no_merge_copy}</em>
            </article>
          </div>
        </section>

        <section
          className="panel source-quarantine-browser-loop-panel"
          data-api-route={sourceOwnerReceiptWriteDocsDeepLink.apiRoute}
          data-docs-href={sourceOwnerReceiptWriteDocsDeepLink.docsHref}
          data-expected-request-field-count={sourceOwnerReceiptWriteDocsDeepLink.expectedRequestFieldCount}
          data-method={sourceOwnerReceiptWriteDocsDeepLink.method}
          data-route={sourceOwnerReceiptWriteDocsDeepLink.route}
          data-source-marker-selector={sourceOwnerReceiptWriteDocsDeepLink.sourceMarkerSelector}
          data-status={sourceOwnerReceiptWriteDocsDeepLink.status}
          data-testid="source-owner-receipt-write-docs-deep-link"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source owner receipt write API docs deep-link</p>
              <h2>Где проверять контракт будущей записи receipt</h2>
            </div>
            <a
              className="primary-link"
              data-api-route={sourceOwnerReceiptWriteDocsDeepLink.apiRoute}
              data-method={sourceOwnerReceiptWriteDocsDeepLink.method}
              data-testid="source-owner-receipt-write-docs-deep-link-anchor"
              href={sourceOwnerReceiptWriteDocsDeepLink.docsHref}
            >
              API README / write draft
            </a>
          </div>
          <div className="source-quarantine-browser-loop-grid">
            {sourceOwnerReceiptWriteDocsDeepLink.checks.map(([title, text]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>{sourceOwnerReceiptWriteDocsDeepLink.sourceMarkerSelector}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel source-quarantine-browser-loop-panel"
          data-ai-gates={sourceOwnerReceiptHistoryBrowserLoop.expectedAiGates.join(",")}
          data-api-route={sourceOwnerReceiptHistoryBrowserLoop.apiRoute}
          data-blocked-count={sourceOwnerReceiptHistoryBrowserLoop.expectedBlockedCount}
          data-docs-href={sourceOwnerReceiptHistoryBrowserLoop.docsHref}
          data-history-count={sourceOwnerReceiptHistoryBrowserLoop.expectedHistoryCount}
          data-resolution-statuses={sourceOwnerReceiptHistoryBrowserLoop.expectedResolutionStatuses.join(",")}
          data-route={sourceOwnerReceiptHistoryBrowserLoop.route}
          data-selector={sourceOwnerReceiptHistoryBrowserLoop.selector}
          data-testid="source-owner-receipt-history-browser-loop"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source owner receipt history browser loop</p>
              <h2>Как браузер сверяет историю ручных freshness-решений</h2>
            </div>
            <a
              className="primary-link"
              data-api-route={sourceOwnerReceiptHistoryBrowserLoop.apiRoute}
              data-testid="source-owner-receipt-docs-link"
              href={sourceOwnerReceiptHistoryBrowserLoop.docsHref}
            >
              API README / owner receipts
            </a>
          </div>
          <div className="source-quarantine-browser-loop-grid">
            {sourceOwnerReceiptHistoryBrowserLoop.checks.map(([title, text]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>{sourceOwnerReceiptHistoryBrowserLoop.selector}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel source-quarantine-browser-loop-panel"
          data-ai-gate={sourceReceiptBrowserLoop.expectedAiGate}
          data-receipt-status={sourceReceiptBrowserLoop.expectedReceiptStatus}
          data-required-fields={sourceReceiptBrowserLoop.requiredFields.join(",")}
          data-route={sourceReceiptBrowserLoop.route}
          data-rule-count={sourceReceiptBrowserLoop.expectedRuleCount}
          data-selector={sourceReceiptBrowserLoop.selector}
          data-testid="source-receipt-browser-loop"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source receipt browser loop</p>
              <h2>Как браузер сверяет ручное снятие freshness-блокера</h2>
            </div>
            <span className="status-pill amber">{sourceReceiptBrowserLoop.status}</span>
          </div>
          <div className="source-quarantine-browser-loop-grid">
            {sourceReceiptBrowserLoop.checks.map(([title, text]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>{sourceReceiptBrowserLoop.selector}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel source-quarantine-browser-loop-panel"
          data-ai-gate={sourceFreshnessBrowserLoop.expectedAiGate}
          data-api-route={sourceFreshnessBrowserLoop.apiRoute}
          data-breach-types={sourceFreshnessBrowserLoop.expectedBreachTypes.join(",")}
          data-docs-href={sourceFreshnessBrowserLoop.docsHref}
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
            <div className="panel-actions">
              <span className="status-pill amber">{sourceFreshnessBrowserLoop.status}</span>
              <a
                className="primary-link"
                data-api-route={sourceFreshnessBrowserLoop.apiRoute}
                data-testid="source-freshness-docs-link"
                href={sourceFreshnessBrowserLoop.docsHref}
              >
                API README / freshness
              </a>
            </div>
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
