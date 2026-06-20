import { Sidebar } from "../app-shell";
import aiReviewQueueFixture from "../../../../packages/shared/ai-review-queue.json";
import aiReviewQueueSchema from "../../../../packages/shared/fixture-schemas/ai-review-queue.schema.json";

const reviewItems = [
  ["Техническое задание", "Требования к поставке найдены, 2 позиции требуют ручной проверки", "82%", "review"],
  ["Проект контракта", "Штрафы и сроки исполнения выделены, риски средние", "91%", "ok"],
  ["Смета и КП", "Не хватает подтверждения логистики по двум регионам", "64%", "warning"],
  ["Протоколы", "Победитель и цена определены, нужна связка со второй воронкой", "88%", "ok"],
];

const controls = [
  ["Источник", "каждый вывод связан с файлом, API или карточкой процедуры"],
  ["Confidence", "ниже 75% уходит в задачи человеку"],
  ["Версия", "повторный разбор не затирает прошлый результат"],
  ["Решение", "AI предлагает действие, но финальный статус ставит ответственный"],
];

const aiSteps = [
  ["01", "Извлечь", "лоты, даты, требования, обеспечение, штрафы"],
  ["02", "Сравнить", "профиль компании, стоп-темы, маржинальность"],
  ["03", "Объяснить", "почему брать или отсеять процедуру"],
  ["04", "Поставить задачу", "если данных не хватает или confidence низкий"],
];

const reviewStats = [
  ["В очереди", "18", "документы и процедуры"],
  ["Авто-решений", "11", "confidence выше 85%"],
  ["Эскалаций", "5", "уйдут человеку"],
  ["Средний confidence", "81%", "по текущей пачке"],
];

const evidenceGate = [
  ["Source link", "каждый вывод ведет к ЕИС, ФНС, ЭТП или локальному файлу"],
  ["OCR/file", "текст AI сверяется с оригиналом документа и версией OCR"],
  ["Confidence", "ниже 75% не проходит в авто-решение и создает задачу"],
  ["Fallback", "ответственный подтверждает риск, цену и финальное действие"],
];

const confidenceBands = [
  ["85-100%", "авто-сводка и подготовка действия", "логируем"],
  ["75-84%", "предложить решение ответственному", "review"],
  ["60-74%", "создать задачу ручной проверки", "manual"],
  ["< 60%", "заблокировать вывод до новых данных", "blocked"],
];

const aiReviewSchemaSummary = {
  schemaId: aiReviewQueueSchema.$id,
  checkCount: 14,
  threshold: aiReviewQueueFixture.confidence_threshold,
  blockedBelow: aiReviewQueueFixture.blocked_below_confidence,
  factTypes: aiReviewQueueSchema.definitions.fact_type.enum,
  ownerRoles: aiReviewQueueSchema.definitions.owner_role.enum,
  sourceHost: aiReviewQueueSchema.definitions.source_host.const,
  protectedSurface: "/v1/ai/review-queue + /ai-review",
};

const rawArtifactByTender = {
  "0373100042626000001": "raw-eis-0373100042626000001",
  "322119845710000001": "raw-eis-32211984571",
  "0173200001426000044": "raw-eis-0173200001426000044",
};

const lowConfidenceReviewQueue = aiReviewQueueFixture.queue.map((item) => ({
  fact: item.fact_type,
  title: item.title,
  value: item.extracted_value,
  confidence: `${Math.round(item.confidence * 100)}%`,
  threshold: `${Math.round(aiReviewQueueFixture.confidence_threshold * 100)}%`,
  status: item.confidence < aiReviewQueueFixture.blocked_below_confidence ? "blocked" : "review_required",
  owner: item.owner_role,
  evidence: rawArtifactByTender[item.tender_id as keyof typeof rawArtifactByTender],
  source: item.source_host,
  action: item.required_action,
}));

const lowConfidenceBrowserLoop = {
  status: "armed",
  route: "/ai-review",
  selector: "[data-testid='ai-review-confidence-queue'] [data-status='blocked']",
  expectedReviewRequired: lowConfidenceReviewQueue.filter((item) => item.status === "review_required").length,
  expectedBlocked: lowConfidenceReviewQueue.filter((item) => item.status === "blocked").length,
  expectedSourceEvidence: lowConfidenceReviewQueue.length,
  checks: [
    ["Locate", "найти low-confidence queue по data-testid"],
    ["Assert confidence", "сверить confidence < threshold у каждой строки"],
    ["Assert owner", "сверить owner_role и status review_required/blocked"],
    ["Assert evidence", "сверить raw evidence и source host перед handoff"],
  ],
};

const aiReviewOwnerReceiptRules = [
  {
    fact: "requirement",
    owner: "tender_manager",
    decisions: "confirmed, corrected",
    evidenceFields: ["evidence_ref", "confidence_at_review", "source_checksum_sha256"],
    rule: "подтвердить трактовку требования или исправить AI extraction перед запросом поставщика",
  },
  {
    fact: "supplier_quote",
    owner: "supplier_manager",
    decisions: "confirmed, corrected, blocked",
    evidenceFields: ["evidence_ref", "supplier_clarification_ref", "source_checksum_sha256"],
    rule: "подтвердить логистику поставщика или оставить экономику заблокированной",
  },
  {
    fact: "economics",
    owner: "finance_owner",
    decisions: "confirmed, corrected, blocked",
    evidenceFields: ["evidence_ref", "confidence_at_review", "source_checksum_sha256"],
    rule: "подтвердить маржу, исправить расчет или оставить outcome locked",
  },
];

const aiReviewReceiptBrowserLoop = {
  status: "armed",
  route: "/ai-review",
  apiRoute: "/v1/ai/review-queue",
  apiHref: "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#ai-review-queue-contract",
  selector: "[data-testid='ai-review-owner-receipt-rules'] [data-owner]",
  expectedOwners: aiReviewOwnerReceiptRules.map((rule) => rule.owner),
  expectedRuleCount: aiReviewOwnerReceiptRules.length,
  requiredFields: ["evidence_ref", "confidence_at_review", "source_checksum_sha256"],
  allowedDecisions: "confirmed,corrected,blocked",
  checks: [
    ["Locate", "найти owner receipt rules по data-testid и owner selector"],
    ["Assert owner", "сверить tender_manager, supplier_manager и finance_owner"],
    ["Assert decisions", "закрепить confirmed/corrected/blocked как допустимые решения"],
    ["Assert evidence", "проверить evidence_ref, confidence_at_review и source checksum"],
  ],
};

const aiReviewQueueDocsDeepLink = {
  route: aiReviewReceiptBrowserLoop.route,
  apiRoute: aiReviewReceiptBrowserLoop.apiRoute,
  docsHref: aiReviewReceiptBrowserLoop.apiHref,
  expectedOwnerCount: aiReviewReceiptBrowserLoop.expectedOwners.length,
  expectedRuleCount: aiReviewReceiptBrowserLoop.expectedRuleCount,
  sourceMarkerSelector: "[data-testid='ai-review-receipt-browser-loop']",
  status: aiReviewReceiptBrowserLoop.status,
  checks: [
    ["Locate", "найти queue browser-loop marker и docs deep-link на `/ai-review`"],
    ["Assert href", "сверить ссылку на API README AI Review Queue Contract"],
    ["Assert route", "подтвердить `/v1/ai/review-queue`, 3 owners и 3 review rules"],
    ["Assert copy", "оставить visible link copy рядом с owner receipt browser loop"],
  ],
};

const aiReviewQueueDocsRenderedRouteFailureCopy = {
  route: aiReviewQueueDocsDeepLink.route,
  apiRoute: aiReviewQueueDocsDeepLink.apiRoute,
  command: "npm run smoke -- --url http://127.0.0.1:4177/",
  docsHref: aiReviewQueueDocsDeepLink.docsHref,
  expectedOwnerCount: aiReviewQueueDocsDeepLink.expectedOwnerCount,
  expectedRouteCount: 16,
  expectedRuleCount: aiReviewQueueDocsDeepLink.expectedRuleCount,
  failingCommand: "npm run smoke -- --url http://127.0.0.1:4177/",
  linkSelector: "[data-testid='ai-review-queue-docs-deep-link-anchor']",
  noMergeCopy:
    "Не мержить, пока rendered routes smoke снова подтверждает AI review queue docs deep-link на живом `/ai-review`",
  ownerRole: "AI workflow owner + API owner + QA owner",
  repairTargets:
    "/ai-review,apps/api/README.md#ai-review-queue-contract,apps/web/scripts/smoke.mjs,[data-testid='ai-review-queue-docs-deep-link']",
  sourceMarkerSelector: "[data-testid='ai-review-queue-docs-deep-link']",
  status: aiReviewQueueDocsDeepLink.status,
  checks: [
    ["Symptom", "rendered routes проходят частично, но `/ai-review` потерял AI review queue README href или docs anchor"],
    ["Fix order", "сначала восстановить ai-review-queue-docs-deep-link, затем route smoke expectations"],
    ["Owner", "AI workflow owner подтверждает queue copy, API owner подтверждает README anchor, QA owner подтверждает `/ai-review`"],
    ["No merge", "не мержить, пока AI review queue docs link снова не проходит rendered route coverage"],
  ],
};

const aiReviewQueueWorkflowDocsFailureCopy = {
  route: aiReviewQueueDocsDeepLink.route,
  apiRoute: aiReviewQueueDocsDeepLink.apiRoute,
  command: aiReviewQueueDocsRenderedRouteFailureCopy.command,
  docsHref: aiReviewQueueDocsDeepLink.docsHref,
  docsMarkerSelector: "[data-testid='ai-review-queue-docs-deep-link']",
  expectedOwnerCount: aiReviewQueueDocsDeepLink.expectedOwnerCount,
  expectedRouteCount: aiReviewQueueDocsRenderedRouteFailureCopy.expectedRouteCount,
  expectedRuleCount: aiReviewQueueDocsDeepLink.expectedRuleCount,
  failingCommand: "npm run smoke:ai-review-queue-rendered-route-failure-copy",
  linkSelector: aiReviewQueueDocsRenderedRouteFailureCopy.linkSelector,
  noMergeCopy:
    "Не мержить, пока AI review queue docs deep-link и Web build queue route smoke снова согласованы на живом `/ai-review`",
  ownerRole: "AI workflow owner + API owner + Docs owner + QA owner",
  repairTargets:
    "/ai-review,apps/api/README.md#ai-review-queue-contract,.github/workflows/web-build.yml,apps/web/scripts/smoke.mjs",
  sourceMarkerSelector: "[data-testid='ai-review-queue-docs-rendered-route-failure-copy']",
  status: aiReviewQueueDocsDeepLink.status,
  workflowCommand: "npm run smoke:ai-review-queue-rendered-route-failure-copy",
  workflowHref: "https://github.com/info14fourteen-creator/ASTS/actions/workflows/web-build.yml",
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "queue docs link виден, но Web build больше не закрепляет AI review queue rendered route smoke"],
    ["Fix order", "сначала восстановить ai-review-queue-docs-deep-link, затем Web build workflow command"],
    [
      "Owner",
      "AI workflow owner подтверждает queue copy, API owner подтверждает README anchor, Docs owner подтверждает deep-link",
    ],
    ["No merge", "не мержить, пока AI review queue workflow docs guard снова не проходит route coverage"],
  ],
};

const aiReviewQueueLiveDocsWorkflowCopy = {
  route: aiReviewQueueDocsDeepLink.route,
  apiRoute: aiReviewQueueDocsDeepLink.apiRoute,
  command: aiReviewQueueDocsRenderedRouteFailureCopy.command,
  docsHref: aiReviewQueueDocsDeepLink.docsHref,
  docsMarkerSelector: aiReviewQueueWorkflowDocsFailureCopy.docsMarkerSelector,
  expectedOwnerCount: aiReviewQueueDocsDeepLink.expectedOwnerCount,
  expectedRouteCount: aiReviewQueueDocsRenderedRouteFailureCopy.expectedRouteCount,
  expectedRuleCount: aiReviewQueueDocsDeepLink.expectedRuleCount,
  failingCommand: aiReviewQueueWorkflowDocsFailureCopy.workflowCommand,
  linkSelector: aiReviewQueueWorkflowDocsFailureCopy.linkSelector,
  noMergeCopy:
    "Не мержить, пока AI review queue live route, API README docs deep-link и Web build queue workflow smoke снова согласованы",
  ownerRole: "AI workflow owner + API owner + Docs owner + QA owner",
  repairTargets:
    "/ai-review,apps/api/README.md#ai-review-queue-contract,.github/workflows/web-build.yml,apps/web/scripts/smoke.mjs",
  sourceMarkerSelector: "[data-testid='ai-review-queue-workflow-docs-failure-copy']",
  status: aiReviewQueueDocsDeepLink.status,
  workflowCommand: aiReviewQueueWorkflowDocsFailureCopy.workflowCommand,
  workflowHref: aiReviewQueueWorkflowDocsFailureCopy.workflowHref,
  workflowName: aiReviewQueueWorkflowDocsFailureCopy.workflowName,
  workflowPath: aiReviewQueueWorkflowDocsFailureCopy.workflowPath,
  checks: [
    ["Symptom", "queue live route есть, но docs deep-link или Web build workflow smoke больше не закрепляют AI review queue"],
    ["Fix order", "сначала восстановить ai-review-queue-docs-deep-link, затем ai-review-queue-workflow-docs-failure-copy"],
    ["Owner", "AI workflow owner подтверждает queue copy, API owner подтверждает README anchor, CI owner подтверждает Web build command"],
    ["No merge", "не мержить, пока AI review queue live docs workflow guard снова не проходит route coverage"],
  ],
};

const aiReviewQueueReadmeLiveDocsWorkflowCopy = {
  route: aiReviewQueueLiveDocsWorkflowCopy.route,
  apiRoute: aiReviewQueueLiveDocsWorkflowCopy.apiRoute,
  command: aiReviewQueueLiveDocsWorkflowCopy.command,
  docsHref: aiReviewQueueLiveDocsWorkflowCopy.docsHref,
  docsMarkerSelector: aiReviewQueueLiveDocsWorkflowCopy.docsMarkerSelector,
  expectedOwnerCount: aiReviewQueueLiveDocsWorkflowCopy.expectedOwnerCount,
  expectedRouteCount: aiReviewQueueLiveDocsWorkflowCopy.expectedRouteCount,
  expectedRuleCount: aiReviewQueueLiveDocsWorkflowCopy.expectedRuleCount,
  failingCommand: aiReviewQueueLiveDocsWorkflowCopy.failingCommand,
  linkSelector: aiReviewQueueLiveDocsWorkflowCopy.linkSelector,
  noMergeCopy:
    "Не мержить, пока AI review queue README docs deep-link, live route и Web build queue workflow smoke снова согласованы",
  ownerRole: aiReviewQueueLiveDocsWorkflowCopy.ownerRole,
  repairTargets:
    "/ai-review,apps/api/README.md#ai-review-queue-contract,.github/workflows/web-build.yml,apps/web/scripts/smoke.mjs,[data-testid='ai-review-queue-live-docs-workflow-copy']",
  sourceMarkerSelector: "[data-testid='ai-review-queue-live-docs-workflow-copy']",
  status: aiReviewQueueLiveDocsWorkflowCopy.status,
  workflowCommand: aiReviewQueueLiveDocsWorkflowCopy.workflowCommand,
  workflowHref: aiReviewQueueLiveDocsWorkflowCopy.workflowHref,
  workflowName: aiReviewQueueLiveDocsWorkflowCopy.workflowName,
  workflowPath: aiReviewQueueLiveDocsWorkflowCopy.workflowPath,
  checks: [
    ["Symptom", "README docs link есть, но live docs workflow guard больше не связывает queue contract с Web build"],
    ["Fix order", "сначала восстановить ai-review-queue-docs-deep-link, затем ai-review-queue-live-docs-workflow-copy"],
    ["Owner", "AI workflow owner подтверждает queue copy, API owner подтверждает README anchor, CI owner подтверждает Web build"],
    ["No merge", "не мержить, пока AI review queue README live docs workflow guard снова не проходит route coverage"],
  ],
};

const aiReviewQueueReadmeWorkflowFailureCopy = {
  route: aiReviewQueueReadmeLiveDocsWorkflowCopy.route,
  apiRoute: aiReviewQueueReadmeLiveDocsWorkflowCopy.apiRoute,
  command: aiReviewQueueReadmeLiveDocsWorkflowCopy.command,
  docsHref: aiReviewQueueReadmeLiveDocsWorkflowCopy.docsHref,
  docsMarkerSelector: aiReviewQueueReadmeLiveDocsWorkflowCopy.docsMarkerSelector,
  expectedOwnerCount: aiReviewQueueReadmeLiveDocsWorkflowCopy.expectedOwnerCount,
  expectedRouteCount: aiReviewQueueReadmeLiveDocsWorkflowCopy.expectedRouteCount,
  expectedRuleCount: aiReviewQueueReadmeLiveDocsWorkflowCopy.expectedRuleCount,
  failingCommand: aiReviewQueueWorkflowDocsFailureCopy.workflowCommand,
  linkSelector: aiReviewQueueReadmeLiveDocsWorkflowCopy.linkSelector,
  noMergeCopy:
    "Не мержить, пока AI review queue README workflow failure guard снова защищает README live docs workflow copy",
  ownerRole: aiReviewQueueReadmeLiveDocsWorkflowCopy.ownerRole,
  readmeWorkflowCommand: aiReviewQueueReadmeLiveDocsWorkflowCopy.workflowCommand,
  repairTargets:
    "/ai-review,apps/api/README.md#ai-review-queue-contract,.github/workflows/web-build.yml,apps/web/scripts/smoke.mjs,[data-testid='ai-review-queue-readme-live-docs-workflow-copy']",
  sourceMarkerSelector: "[data-testid='ai-review-queue-readme-live-docs-workflow-copy']",
  status: aiReviewQueueReadmeLiveDocsWorkflowCopy.status,
  workflowCommand: aiReviewQueueReadmeLiveDocsWorkflowCopy.workflowCommand,
  workflowFailureCommand: aiReviewQueueWorkflowDocsFailureCopy.workflowCommand,
  workflowHref: aiReviewQueueReadmeLiveDocsWorkflowCopy.workflowHref,
  workflowName: aiReviewQueueReadmeLiveDocsWorkflowCopy.workflowName,
  workflowPath: aiReviewQueueReadmeLiveDocsWorkflowCopy.workflowPath,
  checks: [
    ["Symptom", "README live docs workflow copy есть, но failure guard больше не защищает queue route smoke order"],
    ["Fix order", "сначала восстановить ai-review-queue-readme-live-docs-workflow-copy, затем queue route smoke"],
    ["Owner", "AI workflow owner подтверждает queue copy, API owner подтверждает README anchor, CI owner подтверждает Web build"],
    ["No merge", "не мержить, пока AI review queue README workflow failure guard снова не защищает README workflow copy"],
  ],
};

const aiReviewQueueReadmeRenderedRouteFailureCopy = {
  route: aiReviewQueueReadmeWorkflowFailureCopy.route,
  apiRoute: aiReviewQueueReadmeWorkflowFailureCopy.apiRoute,
  command: aiReviewQueueReadmeWorkflowFailureCopy.command,
  docsHref: aiReviewQueueReadmeWorkflowFailureCopy.docsHref,
  docsMarkerSelector: aiReviewQueueReadmeWorkflowFailureCopy.docsMarkerSelector,
  expectedOwnerCount: aiReviewQueueReadmeWorkflowFailureCopy.expectedOwnerCount,
  expectedRouteCount: aiReviewQueueReadmeWorkflowFailureCopy.expectedRouteCount,
  expectedRuleCount: aiReviewQueueReadmeWorkflowFailureCopy.expectedRuleCount,
  failingCommand: aiReviewQueueReadmeWorkflowFailureCopy.command,
  linkSelector: aiReviewQueueReadmeWorkflowFailureCopy.linkSelector,
  noMergeCopy:
    "Не мержить, пока rendered routes smoke снова подтверждает AI review queue README workflow failure guard на живом `/ai-review`",
  ownerRole: "AI workflow owner + API owner + Docs owner + QA owner",
  repairTargets:
    "/ai-review,apps/api/README.md#ai-review-queue-contract,apps/web/scripts/smoke.mjs,[data-testid='ai-review-queue-readme-workflow-failure-copy']",
  sourceMarkerSelector: "[data-testid='ai-review-queue-readme-workflow-failure-copy']",
  status: aiReviewQueueReadmeWorkflowFailureCopy.status,
  workflowCommand: aiReviewQueueReadmeWorkflowFailureCopy.workflowCommand,
  workflowFailureCommand: aiReviewQueueReadmeWorkflowFailureCopy.workflowFailureCommand,
  workflowHref: aiReviewQueueReadmeWorkflowFailureCopy.workflowHref,
  workflowName: aiReviewQueueReadmeWorkflowFailureCopy.workflowName,
  workflowPath: aiReviewQueueReadmeWorkflowFailureCopy.workflowPath,
  checks: [
    ["Symptom", "README workflow failure copy есть, но rendered routes smoke больше не видит AI queue README guard"],
    ["Fix order", "сначала восстановить ai-review-queue-readme-workflow-failure-copy, затем queue route smoke expectations"],
    ["Owner", "AI workflow owner подтверждает README guard, API owner подтверждает README anchor, QA owner подтверждает `/ai-review`"],
    ["No merge", "не мержить, пока AI review queue README rendered-route guard снова не проходит route coverage"],
  ],
};

const aiReviewReceiptWriteContract = aiReviewQueueFixture.write_contract;
const aiReviewReceiptWriteDocsDeepLink = {
  route: "/ai-review",
  apiRoute: aiReviewReceiptWriteContract.route,
  docsHref:
    "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#ai-review-receipt-write-api-draft",
  expectedRequestFieldCount: aiReviewReceiptWriteContract.request_schema.length,
  method: aiReviewReceiptWriteContract.method,
  status: aiReviewReceiptWriteContract.status,
  sourceMarkerSelector: "[data-testid='ai-review-receipt-write-api-draft']",
  checks: [
    ["Locate", "найти write draft marker и docs deep-link на `/ai-review`"],
    ["Assert href", "сверить ссылку на API README write draft anchor"],
    ["Assert contract", "подтвердить POST draft, 11 request fields и idempotency key"],
    ["Assert copy", "оставить visible link copy рядом с AI receipt write draft"],
  ],
};

const evidence = [
  ["ТЗ", "Файл: tz_lighting_v4.pdf", "позиции 12-14", "manual"],
  ["Контракт", "ЕИС / проект контракта", "штрафы и сроки", "ok"],
  ["КП", "Локальный файл поставщика", "нет логистики ЦФО", "warning"],
  ["Протокол", "zakupki.gov.ru", "победитель и цена", "ok"],
];

const decisionMatrix = [
  ["Авто", "суммаризация, поиск требований, извлечение сроков", "source + confidence"],
  ["Предложить", "маржа, риск, следующий шаг, задача ответственному", "review required"],
  ["Блокировать", "подача заявки, цена, отказ, смена стадии", "human approval"],
  ["Логировать", "каждый вывод, источник, версия файла и решение", "audit trail"],
];

const auditReceipt = [
  ["AI output", "короткий вывод, версия промпта и модель", "в карточку процедуры"],
  ["Evidence", "source URL, file hash, OCR version и timestamp", "до решения"],
  ["Human action", "кто подтвердил, изменил или заблокировал рекомендацию", "обязательно"],
  ["Rollback", "предыдущий вывод и причина пересчета", "при повторном разборе"],
];

const overrideLedger = [
  ["Manual approve", "ответственный принимает риск при confidence 75-84%", "reason required"],
  ["Block release", "AI вывод не уходит в сделку без source URL и file hash", "evidence first"],
  ["Re-run AI", "новая версия файла или OCR создает новый вывод", "keep previous"],
  ["Escalate owner", "низкая уверенность уходит владельцу этапа", "task created"],
];

export default function AiReviewPage() {
  return (
    <main className="app-shell">
      <Sidebar active="ai-review" />
      <section className="workspace">
        <header className="topline">
          <div>
            <p className="eyebrow">AI review desk</p>
            <h1>AI разбор процедур</h1>
          </div>
          <button className="primary" type="button">
            Запустить разбор
          </button>
        </header>

        <section className="ai-stat-grid">
          {reviewStats.map(([label, value, text]) => (
            <article className="ai-stat" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <small>{text}</small>
            </article>
          ))}
        </section>

        <section className="panel evidence-gate-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Evidence gate</p>
              <h2>Что должно быть до AI-вывода</h2>
            </div>
            <span className="status-pill green">source-linked</span>
          </div>
          <div className="evidence-gate-grid">
            {evidenceGate.map(([title, text]) => (
              <article className="evidence-gate-card" key={title}>
                <strong>{title}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel confidence-policy-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Confidence policy</p>
              <h2>Что делает система при разной уверенности</h2>
            </div>
            <span className="status-pill">no blind AI</span>
          </div>
          <div className="confidence-policy-grid">
            {confidenceBands.map(([band, action, state]) => (
              <article className={`confidence-policy-card ${state}`} key={band}>
                <span>{band}</span>
                <strong>{action}</strong>
                <p>{state}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel ai-confidence-browser-loop-panel"
          data-api-route={aiReviewQueueReadmeWorkflowFailureCopy.apiRoute}
          data-command={aiReviewQueueReadmeWorkflowFailureCopy.command}
          data-docs-href={aiReviewQueueReadmeWorkflowFailureCopy.docsHref}
          data-docs-marker-selector={aiReviewQueueReadmeWorkflowFailureCopy.docsMarkerSelector}
          data-expected-owner-count={aiReviewQueueReadmeWorkflowFailureCopy.expectedOwnerCount}
          data-expected-route-count={aiReviewQueueReadmeWorkflowFailureCopy.expectedRouteCount}
          data-expected-rule-count={aiReviewQueueReadmeWorkflowFailureCopy.expectedRuleCount}
          data-failing-command={aiReviewQueueReadmeWorkflowFailureCopy.failingCommand}
          data-link-selector={aiReviewQueueReadmeWorkflowFailureCopy.linkSelector}
          data-no-merge-copy={aiReviewQueueReadmeWorkflowFailureCopy.noMergeCopy}
          data-owner-role={aiReviewQueueReadmeWorkflowFailureCopy.ownerRole}
          data-readme-workflow-command={aiReviewQueueReadmeWorkflowFailureCopy.readmeWorkflowCommand}
          data-repair-targets={aiReviewQueueReadmeWorkflowFailureCopy.repairTargets}
          data-route={aiReviewQueueReadmeWorkflowFailureCopy.route}
          data-source-marker-selector={aiReviewQueueReadmeWorkflowFailureCopy.sourceMarkerSelector}
          data-status={aiReviewQueueReadmeWorkflowFailureCopy.status}
          data-testid="ai-review-queue-readme-workflow-failure-copy"
          data-workflow-command={aiReviewQueueReadmeWorkflowFailureCopy.workflowCommand}
          data-workflow-failure-command={aiReviewQueueReadmeWorkflowFailureCopy.workflowFailureCommand}
          data-workflow-href={aiReviewQueueReadmeWorkflowFailureCopy.workflowHref}
          data-workflow-name={aiReviewQueueReadmeWorkflowFailureCopy.workflowName}
          data-workflow-path={aiReviewQueueReadmeWorkflowFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI review queue README workflow failure copy</p>
              <h2>Что делать, если AI review queue README workflow failure guard упал</h2>
            </div>
            <a className="primary-link" href={aiReviewQueueReadmeWorkflowFailureCopy.workflowHref}>
              {aiReviewQueueReadmeWorkflowFailureCopy.workflowName}
            </a>
          </div>
          <div className="ai-confidence-browser-loop-grid">
            {aiReviewQueueReadmeWorkflowFailureCopy.checks.map(([title, text]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? "No merge"
                    : title === "Owner"
                      ? "AI + API + CI"
                      : title === "Fix order"
                        ? "README -> smoke"
                        : "Queue README"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel ai-confidence-browser-loop-panel"
          data-api-route={aiReviewQueueReadmeRenderedRouteFailureCopy.apiRoute}
          data-command={aiReviewQueueReadmeRenderedRouteFailureCopy.command}
          data-docs-href={aiReviewQueueReadmeRenderedRouteFailureCopy.docsHref}
          data-docs-marker-selector={aiReviewQueueReadmeRenderedRouteFailureCopy.docsMarkerSelector}
          data-expected-owner-count={aiReviewQueueReadmeRenderedRouteFailureCopy.expectedOwnerCount}
          data-expected-route-count={aiReviewQueueReadmeRenderedRouteFailureCopy.expectedRouteCount}
          data-expected-rule-count={aiReviewQueueReadmeRenderedRouteFailureCopy.expectedRuleCount}
          data-failing-command={aiReviewQueueReadmeRenderedRouteFailureCopy.failingCommand}
          data-link-selector={aiReviewQueueReadmeRenderedRouteFailureCopy.linkSelector}
          data-no-merge-copy={aiReviewQueueReadmeRenderedRouteFailureCopy.noMergeCopy}
          data-owner-role={aiReviewQueueReadmeRenderedRouteFailureCopy.ownerRole}
          data-repair-targets={aiReviewQueueReadmeRenderedRouteFailureCopy.repairTargets}
          data-route={aiReviewQueueReadmeRenderedRouteFailureCopy.route}
          data-source-marker-selector={aiReviewQueueReadmeRenderedRouteFailureCopy.sourceMarkerSelector}
          data-status={aiReviewQueueReadmeRenderedRouteFailureCopy.status}
          data-testid="ai-review-queue-readme-rendered-route-failure-copy"
          data-workflow-command={aiReviewQueueReadmeRenderedRouteFailureCopy.workflowCommand}
          data-workflow-failure-command={aiReviewQueueReadmeRenderedRouteFailureCopy.workflowFailureCommand}
          data-workflow-href={aiReviewQueueReadmeRenderedRouteFailureCopy.workflowHref}
          data-workflow-name={aiReviewQueueReadmeRenderedRouteFailureCopy.workflowName}
          data-workflow-path={aiReviewQueueReadmeRenderedRouteFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI review queue README rendered-route failure copy</p>
              <h2>Что делать, если AI review queue README rendered-route guard упал</h2>
            </div>
            <a className="primary-link" href={aiReviewQueueReadmeRenderedRouteFailureCopy.workflowHref}>
              {aiReviewQueueReadmeRenderedRouteFailureCopy.workflowName}
            </a>
          </div>
          <div className="ai-confidence-browser-loop-grid">
            {aiReviewQueueReadmeRenderedRouteFailureCopy.checks.map(([title, text]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? "No merge"
                    : title === "Owner"
                      ? "AI + API + QA"
                      : title === "Fix order"
                        ? "README -> smoke"
                        : "Rendered route"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel ai-confidence-browser-loop-panel"
          data-blocked-below={aiReviewSchemaSummary.blockedBelow}
          data-check-count={aiReviewSchemaSummary.checkCount}
          data-fact-types={aiReviewSchemaSummary.factTypes.join(",")}
          data-owner-roles={aiReviewSchemaSummary.ownerRoles.join(",")}
          data-protected-surface={aiReviewSchemaSummary.protectedSurface}
          data-schema-id={aiReviewSchemaSummary.schemaId}
          data-source-host={aiReviewSchemaSummary.sourceHost}
          data-testid="ai-review-schema-summary"
          data-threshold={aiReviewSchemaSummary.threshold}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI review schema summary</p>
              <h2>Как shared schema защищает low-confidence очередь</h2>
            </div>
            <span className="status-pill green">schema protected</span>
          </div>
          <div className="ai-confidence-browser-loop-grid">
            {[
              ["Schema", aiReviewSchemaSummary.schemaId, aiReviewSchemaSummary.protectedSurface],
              [
                "Thresholds",
                `${aiReviewSchemaSummary.threshold} / ${aiReviewSchemaSummary.blockedBelow}`,
                "auto threshold / blocked below confidence",
              ],
              ["Fact types", aiReviewSchemaSummary.factTypes.join(", "), "requirement, supplier quote, economics"],
              ["Source host", aiReviewSchemaSummary.sourceHost, "только официальный zakupki.gov.ru"],
            ].map(([title, value, text]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>{value}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel ai-confidence-queue-panel"
          data-blocked-count={lowConfidenceBrowserLoop.expectedBlocked}
          data-review-required-count={lowConfidenceBrowserLoop.expectedReviewRequired}
          data-source-evidence-count={lowConfidenceBrowserLoop.expectedSourceEvidence}
          data-testid="ai-review-confidence-queue"
          data-threshold="0.85"
          data-total-count={lowConfidenceReviewQueue.length}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Low-confidence owner review</p>
              <h2>Какие AI-факты ждут владельца</h2>
            </div>
            <span className="status-pill amber">owner review required</span>
          </div>
          <div className="ai-confidence-queue-grid">
            {lowConfidenceReviewQueue.map((item) => (
              <article
                className={`ai-confidence-queue-card ${item.status}`}
                data-confidence={item.confidence}
                data-evidence-ref={item.evidence}
                data-fact-type={item.fact}
                data-owner={item.owner}
                data-required-action={item.action}
                data-source-host={item.source}
                data-status={item.status}
                data-threshold={item.threshold}
                key={item.fact}
              >
                <span>{item.fact}</span>
                <strong>{item.title}</strong>
                <p>{item.value}</p>
                <dl>
                  <div>
                    <dt>Confidence</dt>
                    <dd>
                      {item.confidence} / {item.threshold}
                    </dd>
                  </div>
                  <div>
                    <dt>Owner</dt>
                    <dd>{item.owner}</dd>
                  </div>
                  <div>
                    <dt>Evidence</dt>
                    <dd>{item.evidence}</dd>
                  </div>
                  <div>
                    <dt>Source</dt>
                    <dd>{item.source}</dd>
                  </div>
                </dl>
                <em>{item.action}</em>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel ai-owner-receipt-panel"
          data-allowed-decisions="confirmed,corrected,blocked"
          data-required-fields="evidence_ref,confidence_at_review,source_checksum_sha256"
          data-rule-count={aiReviewOwnerReceiptRules.length}
          data-testid="ai-review-owner-receipt-rules"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI review owner receipt</p>
              <h2>Что владелец должен оставить после ручного решения</h2>
            </div>
            <span className="status-pill amber">receipt required</span>
          </div>
          <div className="ai-owner-receipt-grid">
            {aiReviewOwnerReceiptRules.map((rule) => (
              <article
                className="ai-owner-receipt-card"
                data-allowed-decisions={rule.decisions}
                data-fact-type={rule.fact}
                data-owner={rule.owner}
                data-required-fields={rule.evidenceFields.join(",")}
                key={rule.fact}
              >
                <span>{rule.fact}</span>
                <strong>{rule.owner}</strong>
                <p>{rule.rule}</p>
                <em>{rule.evidenceFields.join(" + ")}</em>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel ai-confidence-browser-loop-panel"
          data-api-route={aiReviewReceiptWriteContract.route}
          data-blocked-copy={aiReviewReceiptWriteContract.blocked_copy}
          data-idempotency-key-required={String(aiReviewReceiptWriteContract.idempotency_key_required)}
          data-method={aiReviewReceiptWriteContract.method}
          data-no-merge-copy={aiReviewReceiptWriteContract.no_merge_copy}
          data-owner={aiReviewReceiptWriteContract.owner}
          data-request-schema={aiReviewReceiptWriteContract.request_schema.join(",")}
          data-status={aiReviewReceiptWriteContract.status}
          data-testid="ai-review-receipt-write-api-draft"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI review receipt write API draft</p>
              <h2>Как будущий POST сохранит ручное решение AI без потери audit</h2>
            </div>
            <span className="status-pill amber">{aiReviewReceiptWriteContract.status}</span>
          </div>
          <div className="ai-confidence-browser-loop-grid">
            {[
              ["Route", `${aiReviewReceiptWriteContract.method} ${aiReviewReceiptWriteContract.route}`, aiReviewReceiptWriteContract.owner],
              ["Idempotency", "idempotency_key required", aiReviewReceiptWriteContract.request_schema.join(", ")],
              ["Blocked", aiReviewReceiptWriteContract.blocked_copy, "no mutation until storage is immutable"],
              ["No merge", aiReviewReceiptWriteContract.no_merge_copy, "owner role, decision and evidence first"],
            ].map(([title, value, text]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>{value}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel ai-confidence-browser-loop-panel"
          data-api-route={aiReviewReceiptWriteDocsDeepLink.apiRoute}
          data-docs-href={aiReviewReceiptWriteDocsDeepLink.docsHref}
          data-expected-request-field-count={aiReviewReceiptWriteDocsDeepLink.expectedRequestFieldCount}
          data-method={aiReviewReceiptWriteDocsDeepLink.method}
          data-route={aiReviewReceiptWriteDocsDeepLink.route}
          data-source-marker-selector={aiReviewReceiptWriteDocsDeepLink.sourceMarkerSelector}
          data-status={aiReviewReceiptWriteDocsDeepLink.status}
          data-testid="ai-review-receipt-write-docs-deep-link"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI review receipt write API docs deep-link</p>
              <h2>Где проверять контракт будущего AI receipt POST</h2>
            </div>
            <a
              className="primary-link"
              data-api-route={aiReviewReceiptWriteDocsDeepLink.apiRoute}
              data-method={aiReviewReceiptWriteDocsDeepLink.method}
              data-testid="ai-review-receipt-write-docs-deep-link-anchor"
              href={aiReviewReceiptWriteDocsDeepLink.docsHref}
            >
              API README / AI write draft
            </a>
          </div>
          <div className="ai-confidence-browser-loop-grid">
            {aiReviewReceiptWriteDocsDeepLink.checks.map(([title, text]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>{aiReviewReceiptWriteDocsDeepLink.sourceMarkerSelector}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel ai-confidence-browser-loop-panel"
          data-api-route={aiReviewQueueDocsDeepLink.apiRoute}
          data-docs-href={aiReviewQueueDocsDeepLink.docsHref}
          data-expected-owner-count={aiReviewQueueDocsDeepLink.expectedOwnerCount}
          data-expected-rule-count={aiReviewQueueDocsDeepLink.expectedRuleCount}
          data-route={aiReviewQueueDocsDeepLink.route}
          data-source-marker-selector={aiReviewQueueDocsDeepLink.sourceMarkerSelector}
          data-status={aiReviewQueueDocsDeepLink.status}
          data-testid="ai-review-queue-docs-deep-link"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI review queue API docs deep-link</p>
              <h2>Где проверять контракт очереди AI review</h2>
            </div>
            <a
              className="primary-link"
              data-api-route={aiReviewQueueDocsDeepLink.apiRoute}
              data-testid="ai-review-queue-docs-deep-link-anchor"
              href={aiReviewQueueDocsDeepLink.docsHref}
            >
              API README / AI review queue
            </a>
          </div>
          <div className="ai-confidence-browser-loop-grid">
            {aiReviewQueueDocsDeepLink.checks.map(([title, text]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>{aiReviewQueueDocsDeepLink.sourceMarkerSelector}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel ai-confidence-browser-loop-panel"
          data-api-route={aiReviewQueueDocsRenderedRouteFailureCopy.apiRoute}
          data-command={aiReviewQueueDocsRenderedRouteFailureCopy.command}
          data-docs-href={aiReviewQueueDocsRenderedRouteFailureCopy.docsHref}
          data-expected-owner-count={aiReviewQueueDocsRenderedRouteFailureCopy.expectedOwnerCount}
          data-expected-route-count={aiReviewQueueDocsRenderedRouteFailureCopy.expectedRouteCount}
          data-expected-rule-count={aiReviewQueueDocsRenderedRouteFailureCopy.expectedRuleCount}
          data-failing-command={aiReviewQueueDocsRenderedRouteFailureCopy.failingCommand}
          data-link-selector={aiReviewQueueDocsRenderedRouteFailureCopy.linkSelector}
          data-no-merge-copy={aiReviewQueueDocsRenderedRouteFailureCopy.noMergeCopy}
          data-owner-role={aiReviewQueueDocsRenderedRouteFailureCopy.ownerRole}
          data-repair-targets={aiReviewQueueDocsRenderedRouteFailureCopy.repairTargets}
          data-route={aiReviewQueueDocsRenderedRouteFailureCopy.route}
          data-source-marker-selector={aiReviewQueueDocsRenderedRouteFailureCopy.sourceMarkerSelector}
          data-status={aiReviewQueueDocsRenderedRouteFailureCopy.status}
          data-testid="ai-review-queue-docs-rendered-route-failure-copy"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI review queue docs rendered-route failure copy</p>
              <h2>Что делать, если AI review queue docs пропали в rendered routes</h2>
            </div>
            <a className="primary-link" href={aiReviewQueueDocsRenderedRouteFailureCopy.docsHref}>
              API README / AI review queue
            </a>
          </div>
          <div className="ai-confidence-browser-loop-grid">
            {aiReviewQueueDocsRenderedRouteFailureCopy.checks.map(([title, text]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? aiReviewQueueDocsRenderedRouteFailureCopy.noMergeCopy
                    : aiReviewQueueDocsRenderedRouteFailureCopy.sourceMarkerSelector}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel ai-confidence-browser-loop-panel"
          data-api-route={aiReviewQueueWorkflowDocsFailureCopy.apiRoute}
          data-command={aiReviewQueueWorkflowDocsFailureCopy.command}
          data-docs-href={aiReviewQueueWorkflowDocsFailureCopy.docsHref}
          data-docs-marker-selector={aiReviewQueueWorkflowDocsFailureCopy.docsMarkerSelector}
          data-expected-owner-count={aiReviewQueueWorkflowDocsFailureCopy.expectedOwnerCount}
          data-expected-route-count={aiReviewQueueWorkflowDocsFailureCopy.expectedRouteCount}
          data-expected-rule-count={aiReviewQueueWorkflowDocsFailureCopy.expectedRuleCount}
          data-failing-command={aiReviewQueueWorkflowDocsFailureCopy.failingCommand}
          data-link-selector={aiReviewQueueWorkflowDocsFailureCopy.linkSelector}
          data-no-merge-copy={aiReviewQueueWorkflowDocsFailureCopy.noMergeCopy}
          data-owner-role={aiReviewQueueWorkflowDocsFailureCopy.ownerRole}
          data-repair-targets={aiReviewQueueWorkflowDocsFailureCopy.repairTargets}
          data-route={aiReviewQueueWorkflowDocsFailureCopy.route}
          data-source-marker-selector={aiReviewQueueWorkflowDocsFailureCopy.sourceMarkerSelector}
          data-status={aiReviewQueueWorkflowDocsFailureCopy.status}
          data-testid="ai-review-queue-workflow-docs-failure-copy"
          data-workflow-command={aiReviewQueueWorkflowDocsFailureCopy.workflowCommand}
          data-workflow-href={aiReviewQueueWorkflowDocsFailureCopy.workflowHref}
          data-workflow-name={aiReviewQueueWorkflowDocsFailureCopy.workflowName}
          data-workflow-path={aiReviewQueueWorkflowDocsFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI review queue workflow docs failure copy</p>
              <h2>Что делать, если AI review queue workflow docs drift упал</h2>
            </div>
            <a className="primary-link" href={aiReviewQueueWorkflowDocsFailureCopy.workflowHref}>
              {aiReviewQueueWorkflowDocsFailureCopy.workflowName}
            </a>
          </div>
          <div className="ai-confidence-browser-loop-grid">
            {aiReviewQueueWorkflowDocsFailureCopy.checks.map(([title, text]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? aiReviewQueueWorkflowDocsFailureCopy.noMergeCopy
                    : aiReviewQueueWorkflowDocsFailureCopy.workflowCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel ai-confidence-browser-loop-panel"
          data-api-route={aiReviewQueueLiveDocsWorkflowCopy.apiRoute}
          data-command={aiReviewQueueLiveDocsWorkflowCopy.command}
          data-docs-href={aiReviewQueueLiveDocsWorkflowCopy.docsHref}
          data-docs-marker-selector={aiReviewQueueLiveDocsWorkflowCopy.docsMarkerSelector}
          data-expected-owner-count={aiReviewQueueLiveDocsWorkflowCopy.expectedOwnerCount}
          data-expected-route-count={aiReviewQueueLiveDocsWorkflowCopy.expectedRouteCount}
          data-expected-rule-count={aiReviewQueueLiveDocsWorkflowCopy.expectedRuleCount}
          data-failing-command={aiReviewQueueLiveDocsWorkflowCopy.failingCommand}
          data-link-selector={aiReviewQueueLiveDocsWorkflowCopy.linkSelector}
          data-no-merge-copy={aiReviewQueueLiveDocsWorkflowCopy.noMergeCopy}
          data-owner-role={aiReviewQueueLiveDocsWorkflowCopy.ownerRole}
          data-repair-targets={aiReviewQueueLiveDocsWorkflowCopy.repairTargets}
          data-route={aiReviewQueueLiveDocsWorkflowCopy.route}
          data-source-marker-selector={aiReviewQueueLiveDocsWorkflowCopy.sourceMarkerSelector}
          data-status={aiReviewQueueLiveDocsWorkflowCopy.status}
          data-testid="ai-review-queue-live-docs-workflow-copy"
          data-workflow-command={aiReviewQueueLiveDocsWorkflowCopy.workflowCommand}
          data-workflow-href={aiReviewQueueLiveDocsWorkflowCopy.workflowHref}
          data-workflow-name={aiReviewQueueLiveDocsWorkflowCopy.workflowName}
          data-workflow-path={aiReviewQueueLiveDocsWorkflowCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI review queue live docs workflow copy</p>
              <h2>Что делать, если AI review queue live docs workflow drift упал</h2>
            </div>
            <a className="primary-link" href={aiReviewQueueLiveDocsWorkflowCopy.workflowHref}>
              {aiReviewQueueLiveDocsWorkflowCopy.workflowName}
            </a>
          </div>
          <div className="ai-confidence-browser-loop-grid">
            {aiReviewQueueLiveDocsWorkflowCopy.checks.map(([title, text]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? aiReviewQueueLiveDocsWorkflowCopy.noMergeCopy
                    : aiReviewQueueLiveDocsWorkflowCopy.workflowCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel ai-confidence-browser-loop-panel"
          data-api-route={aiReviewQueueReadmeLiveDocsWorkflowCopy.apiRoute}
          data-command={aiReviewQueueReadmeLiveDocsWorkflowCopy.command}
          data-docs-href={aiReviewQueueReadmeLiveDocsWorkflowCopy.docsHref}
          data-docs-marker-selector={aiReviewQueueReadmeLiveDocsWorkflowCopy.docsMarkerSelector}
          data-expected-owner-count={aiReviewQueueReadmeLiveDocsWorkflowCopy.expectedOwnerCount}
          data-expected-route-count={aiReviewQueueReadmeLiveDocsWorkflowCopy.expectedRouteCount}
          data-expected-rule-count={aiReviewQueueReadmeLiveDocsWorkflowCopy.expectedRuleCount}
          data-failing-command={aiReviewQueueReadmeLiveDocsWorkflowCopy.failingCommand}
          data-link-selector={aiReviewQueueReadmeLiveDocsWorkflowCopy.linkSelector}
          data-no-merge-copy={aiReviewQueueReadmeLiveDocsWorkflowCopy.noMergeCopy}
          data-owner-role={aiReviewQueueReadmeLiveDocsWorkflowCopy.ownerRole}
          data-repair-targets={aiReviewQueueReadmeLiveDocsWorkflowCopy.repairTargets}
          data-route={aiReviewQueueReadmeLiveDocsWorkflowCopy.route}
          data-source-marker-selector={aiReviewQueueReadmeLiveDocsWorkflowCopy.sourceMarkerSelector}
          data-status={aiReviewQueueReadmeLiveDocsWorkflowCopy.status}
          data-testid="ai-review-queue-readme-live-docs-workflow-copy"
          data-workflow-command={aiReviewQueueReadmeLiveDocsWorkflowCopy.workflowCommand}
          data-workflow-href={aiReviewQueueReadmeLiveDocsWorkflowCopy.workflowHref}
          data-workflow-name={aiReviewQueueReadmeLiveDocsWorkflowCopy.workflowName}
          data-workflow-path={aiReviewQueueReadmeLiveDocsWorkflowCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI review queue README live docs workflow copy</p>
              <h2>Что делать, если AI review queue README live docs workflow drift упал</h2>
            </div>
            <a className="primary-link" href={aiReviewQueueReadmeLiveDocsWorkflowCopy.workflowHref}>
              {aiReviewQueueReadmeLiveDocsWorkflowCopy.workflowName}
            </a>
          </div>
          <div className="ai-confidence-browser-loop-grid">
            {aiReviewQueueReadmeLiveDocsWorkflowCopy.checks.map(([title, text]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? "No merge"
                    : title === "Owner"
                      ? "AI + API + CI"
                      : title === "Fix order"
                        ? "docs -> live guard"
                        : "Queue README"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel ai-confidence-browser-loop-panel"
          data-allowed-decisions={aiReviewReceiptBrowserLoop.allowedDecisions}
          data-api-href={aiReviewReceiptBrowserLoop.apiHref}
          data-api-route={aiReviewReceiptBrowserLoop.apiRoute}
          data-owner-count={aiReviewReceiptBrowserLoop.expectedOwners.length}
          data-owners={aiReviewReceiptBrowserLoop.expectedOwners.join(",")}
          data-required-fields={aiReviewReceiptBrowserLoop.requiredFields.join(",")}
          data-route={aiReviewReceiptBrowserLoop.route}
          data-rule-count={aiReviewReceiptBrowserLoop.expectedRuleCount}
          data-selector={aiReviewReceiptBrowserLoop.selector}
          data-status={aiReviewReceiptBrowserLoop.status}
          data-testid="ai-review-receipt-browser-loop"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI review receipt browser loop</p>
              <h2>Как браузер сверяет owner receipt после ручного решения</h2>
            </div>
            <a
              className="primary-link"
              data-api-route={aiReviewReceiptBrowserLoop.apiRoute}
              data-testid="ai-review-receipt-api-link"
              href={aiReviewReceiptBrowserLoop.apiHref}
            >
              API / AI review queue
            </a>
          </div>
          <div className="ai-confidence-browser-loop-grid">
            {aiReviewReceiptBrowserLoop.checks.map(([title, text]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>{aiReviewReceiptBrowserLoop.selector}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel ai-confidence-browser-loop-panel"
          data-blocked-count={lowConfidenceBrowserLoop.expectedBlocked}
          data-review-required-count={lowConfidenceBrowserLoop.expectedReviewRequired}
          data-route={lowConfidenceBrowserLoop.route}
          data-selector={lowConfidenceBrowserLoop.selector}
          data-source-evidence-count={lowConfidenceBrowserLoop.expectedSourceEvidence}
          data-status={lowConfidenceBrowserLoop.status}
          data-testid="ai-review-confidence-browser-loop"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI review browser loop</p>
              <h2>Как браузер сверяет low-confidence handoff</h2>
            </div>
            <span className="status-pill amber">{lowConfidenceBrowserLoop.status}</span>
          </div>
          <div className="ai-confidence-browser-loop-grid">
            {lowConfidenceBrowserLoop.checks.map(([title, text]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>{lowConfidenceBrowserLoop.selector}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel ai-decision-matrix-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Decision rights</p>
              <h2>Где AI помогает, а где нужен человек</h2>
            </div>
            <span className="status-pill green">human final</span>
          </div>
          <div className="ai-decision-matrix-grid">
            {decisionMatrix.map(([mode, scope, gate]) => (
              <article className="ai-decision-matrix-card" key={mode}>
                <span>{gate}</span>
                <strong>{mode}</strong>
                <p>{scope}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel ai-audit-receipt-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI audit receipt</p>
              <h2>Что сохраняем у каждого AI-вывода</h2>
            </div>
            <span className="status-pill green">traceable decision</span>
          </div>
          <div className="ai-audit-receipt-grid">
            {auditReceipt.map(([title, text, gate]) => (
              <article className="ai-audit-receipt-card" key={title}>
                <span>{gate}</span>
                <strong>{title}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel ai-override-ledger-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Override ledger</p>
              <h2>Как фиксируем ручное решение поверх AI</h2>
            </div>
            <span className="status-pill">no hidden override</span>
          </div>
          <div className="ai-override-ledger-grid">
            {overrideLedger.map(([title, text, gate]) => (
              <article className="ai-override-ledger-card" key={title}>
                <span>{gate}</span>
                <strong>{title}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="layout-grid">
          <article className="panel span-7">
            <div className="panel-head compact">
              <div>
                <p className="eyebrow">Queue</p>
                <h2>Очередь проверки</h2>
              </div>
              <span className="status-pill">4 документа</span>
            </div>
            <div className="ai-review-list">
              {reviewItems.map(([title, text, confidence, tone]) => (
                <div className={`ai-review-row ${tone}`} key={title}>
                  <div>
                    <strong>{title}</strong>
                    <p>{text}</p>
                  </div>
                  <span>{confidence}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="panel span-5">
            <div className="panel-head compact">
              <div>
                <p className="eyebrow">Guardrails</p>
                <h2>Контроль качества</h2>
              </div>
            </div>
            <div className="quality-grid">
              {controls.map(([title, text]) => (
                <div className="quality-card" key={title}>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="panel span-7">
            <div className="panel-head compact">
              <div>
                <p className="eyebrow">Evidence trail</p>
                <h2>На чем основан вывод</h2>
              </div>
              <span className="status-pill green">ссылки сохранены</span>
            </div>
            <div className="evidence-table">
              <div className="evidence-row evidence-head">
                <span>Блок</span>
                <span>Источник</span>
                <span>Что нашел AI</span>
                <span>Статус</span>
              </div>
              {evidence.map(([block, source, finding, tone]) => (
                <div className="evidence-row" key={block}>
                  <strong>{block}</strong>
                  <span>{source}</span>
                  <span>{finding}</span>
                  <em className={tone}>{tone}</em>
                </div>
              ))}
            </div>
          </article>

          <article className="panel span-7">
            <div className="panel-head compact">
              <div>
                <p className="eyebrow">Decision flow</p>
                <h2>Как AI заменяет рутину</h2>
              </div>
            </div>
            <div className="ai-step-grid">
              {aiSteps.map(([step, title, text]) => (
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
                <p className="eyebrow">Human handoff</p>
                <h2>Что уйдет в задачи</h2>
              </div>
            </div>
            <div className="task-list">
              <article className="task warning">
                <strong>Проверить смету логистики</strong>
                <span>confidence 64%, нужен закупщик</span>
              </article>
              <article className="task">
                <strong>Подтвердить стоп-тему</strong>
                <span>найдено пересечение с исключенными ОКПД2</span>
              </article>
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}
