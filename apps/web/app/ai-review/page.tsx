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

const aiReviewQueueReadmeWorkflowDocsFailureCopy = {
  route: aiReviewQueueReadmeRenderedRouteFailureCopy.route,
  apiRoute: aiReviewQueueReadmeRenderedRouteFailureCopy.apiRoute,
  command: aiReviewQueueReadmeRenderedRouteFailureCopy.command,
  docsHref: aiReviewQueueReadmeRenderedRouteFailureCopy.docsHref,
  docsMarkerSelector: aiReviewQueueReadmeRenderedRouteFailureCopy.docsMarkerSelector,
  expectedOwnerCount: aiReviewQueueReadmeRenderedRouteFailureCopy.expectedOwnerCount,
  expectedRouteCount: aiReviewQueueReadmeRenderedRouteFailureCopy.expectedRouteCount,
  expectedRuleCount: aiReviewQueueReadmeRenderedRouteFailureCopy.expectedRuleCount,
  failingCommand: aiReviewQueueReadmeRenderedRouteFailureCopy.failingCommand,
  linkSelector: aiReviewQueueReadmeRenderedRouteFailureCopy.linkSelector,
  noMergeCopy:
    "Не мержить, пока AI review queue README rendered-route guard и workflow docs guard снова согласованы на живом `/ai-review`",
  ownerRole: "AI workflow owner + API owner + Docs owner + QA owner",
  repairTargets:
    "/ai-review,apps/api/README.md#ai-review-queue-contract,.github/workflows/web-build.yml,apps/web/scripts/smoke.mjs,[data-testid='ai-review-queue-readme-rendered-route-failure-copy'],[data-testid='ai-review-queue-workflow-docs-failure-copy']",
  sourceMarkerSelector: "[data-testid='ai-review-queue-readme-rendered-route-failure-copy']",
  status: aiReviewQueueReadmeRenderedRouteFailureCopy.status,
  workflowCommand: aiReviewQueueReadmeRenderedRouteFailureCopy.workflowCommand,
  workflowDocsCommand: aiReviewQueueWorkflowDocsFailureCopy.command,
  workflowDocsFailureCommand: aiReviewQueueWorkflowDocsFailureCopy.failingCommand,
  workflowFailureCommand: aiReviewQueueReadmeRenderedRouteFailureCopy.workflowFailureCommand,
  workflowHref: aiReviewQueueReadmeRenderedRouteFailureCopy.workflowHref,
  workflowName: aiReviewQueueReadmeRenderedRouteFailureCopy.workflowName,
  workflowPath: aiReviewQueueReadmeRenderedRouteFailureCopy.workflowPath,
  checks: [
    ["Symptom", "README rendered-route guard есть, но workflow docs guard больше не связывает AI queue README anchor и Web build"],
    ["Fix order", "сначала восстановить ai-review-queue-readme-rendered-route-failure-copy, затем workflow docs guard"],
    ["Owner", "AI workflow owner подтверждает README guard, API owner подтверждает README anchor, Docs owner подтверждает workflow docs link"],
    ["No merge", "не мержить, пока AI review queue README workflow docs guard снова не проходит route coverage"],
  ],
};

const aiReviewQueueReadmeWorkflowDocsRenderedRouteCopy = {
  route: aiReviewQueueReadmeWorkflowDocsFailureCopy.route,
  apiRoute: aiReviewQueueReadmeWorkflowDocsFailureCopy.apiRoute,
  command: aiReviewQueueReadmeWorkflowDocsFailureCopy.command,
  docsHref: aiReviewQueueReadmeWorkflowDocsFailureCopy.docsHref,
  docsMarkerSelector: aiReviewQueueReadmeWorkflowDocsFailureCopy.docsMarkerSelector,
  expectedOwnerCount: aiReviewQueueReadmeWorkflowDocsFailureCopy.expectedOwnerCount,
  expectedRouteCount: aiReviewQueueReadmeWorkflowDocsFailureCopy.expectedRouteCount,
  expectedRuleCount: aiReviewQueueReadmeWorkflowDocsFailureCopy.expectedRuleCount,
  failingCommand: aiReviewQueueReadmeWorkflowDocsFailureCopy.command,
  linkSelector: aiReviewQueueReadmeWorkflowDocsFailureCopy.linkSelector,
  noMergeCopy:
    "Не мержить, пока rendered routes smoke снова подтверждает AI review queue README workflow docs guard на живом `/ai-review`",
  ownerRole: "AI workflow owner + API owner + Docs owner + QA owner",
  repairTargets:
    "/ai-review,apps/api/README.md#ai-review-queue-contract,.github/workflows/web-build.yml,apps/web/scripts/smoke.mjs,[data-testid='ai-review-queue-readme-workflow-docs-failure-copy']",
  sourceMarkerSelector: "[data-testid='ai-review-queue-readme-workflow-docs-failure-copy']",
  status: aiReviewQueueReadmeWorkflowDocsFailureCopy.status,
  workflowCommand: aiReviewQueueReadmeWorkflowDocsFailureCopy.workflowCommand,
  workflowDocsCommand: aiReviewQueueReadmeWorkflowDocsFailureCopy.workflowDocsCommand,
  workflowDocsFailureCommand: aiReviewQueueReadmeWorkflowDocsFailureCopy.workflowDocsFailureCommand,
  workflowFailureCommand: aiReviewQueueReadmeWorkflowDocsFailureCopy.workflowFailureCommand,
  workflowHref: aiReviewQueueReadmeWorkflowDocsFailureCopy.workflowHref,
  workflowName: aiReviewQueueReadmeWorkflowDocsFailureCopy.workflowName,
  workflowPath: aiReviewQueueReadmeWorkflowDocsFailureCopy.workflowPath,
  checks: [
    ["Symptom", "README workflow docs guard есть, но rendered routes smoke больше не видит AI review queue workflow docs safety copy"],
    ["Fix order", "сначала восстановить ai-review-queue-readme-workflow-docs-failure-copy, затем queue route smoke expectations"],
    ["Owner", "AI workflow owner подтверждает README guard, API owner подтверждает README anchor, QA owner подтверждает `/ai-review`"],
    ["No merge", "не мержить, пока AI review queue README workflow docs rendered-route guard снова не проходит route coverage"],
  ],
};

const aiReviewQueueReadmeWorkflowDocsBrowserLoopCopy = {
  route: aiReviewQueueReadmeWorkflowDocsRenderedRouteCopy.route,
  apiRoute: aiReviewQueueReadmeWorkflowDocsRenderedRouteCopy.apiRoute,
  browserLoopSelector: "[data-testid='ai-review-queue-readme-workflow-docs-rendered-route-copy']",
  browserUrl: "/ai-review",
  command: aiReviewQueueReadmeWorkflowDocsRenderedRouteCopy.command,
  consoleLevels: "error,warn",
  docsHref: aiReviewQueueReadmeWorkflowDocsRenderedRouteCopy.docsHref,
  docsMarkerSelector: aiReviewQueueReadmeWorkflowDocsRenderedRouteCopy.docsMarkerSelector,
  expectedOwnerCount: aiReviewQueueReadmeWorkflowDocsRenderedRouteCopy.expectedOwnerCount,
  expectedRouteCount: aiReviewQueueReadmeWorkflowDocsRenderedRouteCopy.expectedRouteCount,
  expectedRuleCount: aiReviewQueueReadmeWorkflowDocsRenderedRouteCopy.expectedRuleCount,
  linkSelector: "[data-testid='ai-review-queue-readme-workflow-docs-workflow-anchor']",
  noMergeCopy:
    "Не мержить, пока Browser QA снова подтверждает AI review queue README workflow docs rendered-route guard на живом `/ai-review`",
  ownerRole: "AI workflow owner + API owner + Docs owner + QA owner",
  repairTargets:
    "/ai-review,apps/web/scripts/smoke.mjs,[data-testid='ai-review-queue-readme-workflow-docs-rendered-route-copy'],Browser DOM QA",
  screenshotRequired: "true",
  sourceMarkerSelector: "[data-testid='ai-review-queue-readme-workflow-docs-rendered-route-copy']",
  status: aiReviewQueueReadmeWorkflowDocsRenderedRouteCopy.status,
  workflowCommand: aiReviewQueueReadmeWorkflowDocsRenderedRouteCopy.workflowCommand,
  workflowDocsCommand: aiReviewQueueReadmeWorkflowDocsRenderedRouteCopy.workflowDocsCommand,
  workflowDocsFailureCommand: aiReviewQueueReadmeWorkflowDocsRenderedRouteCopy.workflowDocsFailureCommand,
  workflowFailureCommand: aiReviewQueueReadmeWorkflowDocsRenderedRouteCopy.workflowFailureCommand,
  workflowHref: aiReviewQueueReadmeWorkflowDocsRenderedRouteCopy.workflowHref,
  workflowName: aiReviewQueueReadmeWorkflowDocsRenderedRouteCopy.workflowName,
  workflowPath: aiReviewQueueReadmeWorkflowDocsRenderedRouteCopy.workflowPath,
  checks: [
    ["Page identity", "Browser открывает `/ai-review` и видит ASTS app.site.ru без framework overlay"],
    ["DOM", "Browser DOM находит ai-review-queue-readme-workflow-docs-rendered-route-copy ровно один раз"],
    ["Workflow link", "scoped link ведет в Web build GitHub Actions workflow"],
    ["Console", "Browser console не содержит error/warn перед merge"],
  ],
};

const aiReviewQueueReadmeWorkflowDocsPrCheckCopy = {
  route: aiReviewQueueReadmeWorkflowDocsBrowserLoopCopy.route,
  apiRoute: aiReviewQueueReadmeWorkflowDocsBrowserLoopCopy.apiRoute,
  branch: "codex/app-site-shell",
  baseBranch: "main",
  command: "gh pr checks 17 --watch --interval 10",
  docsHref: aiReviewQueueReadmeWorkflowDocsBrowserLoopCopy.docsHref,
  expectedCheckGroups: ["Web build", "API smoke", "Shared validation"],
  expectedConclusion: "SUCCESS",
  expectedMergeState: "CLEAN",
  expectedOwnerCount: aiReviewQueueReadmeWorkflowDocsBrowserLoopCopy.expectedOwnerCount,
  expectedPrNumber: "17",
  expectedRouteCount: aiReviewQueueReadmeWorkflowDocsBrowserLoopCopy.expectedRouteCount,
  expectedRuleCount: aiReviewQueueReadmeWorkflowDocsBrowserLoopCopy.expectedRuleCount,
  linkSelector: "[data-testid='ai-review-queue-readme-workflow-docs-pr-anchor']",
  noMergeCopy:
    "Не мержить, пока PR #17 снова показывает CLEAN и зеленые Web build, API smoke и Shared validation checks для AI review queue README workflow docs guard",
  ownerRole: "AI workflow owner + API owner + Docs owner + Release owner",
  prHref: "https://github.com/info14fourteen-creator/ASTS/pull/17",
  repairTargets:
    "PR #17,gh pr checks 17,.github/workflows/web-build.yml,apps/web/scripts/smoke.mjs,/ai-review",
  sourceMarkerSelector: "[data-testid='ai-review-queue-readme-workflow-docs-browser-loop-copy']",
  status: aiReviewQueueReadmeWorkflowDocsBrowserLoopCopy.status,
  workflowHref: aiReviewQueueReadmeWorkflowDocsBrowserLoopCopy.workflowHref,
  workflowName: aiReviewQueueReadmeWorkflowDocsBrowserLoopCopy.workflowName,
  workflowPath: aiReviewQueueReadmeWorkflowDocsBrowserLoopCopy.workflowPath,
  checks: [
    ["PR", "PR #17 остается на codex/app-site-shell -> main и mergeStateStatus CLEAN"],
    ["Checks", "gh pr checks 17 подтверждает Web build, API smoke и Shared validation SUCCESS"],
    ["Route guard", "route smoke продолжает видеть AI review queue README workflow docs browser-loop copy"],
    ["No merge", "не мержить, пока PR-check guard снова не подтверждает clean rollup"],
  ],
};

const aiReviewQueueReadmeWorkflowDocsMergeStateCopy = {
  route: aiReviewQueueReadmeWorkflowDocsPrCheckCopy.route,
  apiRoute: aiReviewQueueReadmeWorkflowDocsPrCheckCopy.apiRoute,
  branch: aiReviewQueueReadmeWorkflowDocsPrCheckCopy.branch,
  baseBranch: aiReviewQueueReadmeWorkflowDocsPrCheckCopy.baseBranch,
  command: "gh pr view 17 --json headRefName,baseRefName,mergeStateStatus,statusCheckRollup",
  docsHref: aiReviewQueueReadmeWorkflowDocsPrCheckCopy.docsHref,
  expectedCheckGroups: aiReviewQueueReadmeWorkflowDocsPrCheckCopy.expectedCheckGroups,
  expectedConclusion: aiReviewQueueReadmeWorkflowDocsPrCheckCopy.expectedConclusion,
  expectedMergeState: aiReviewQueueReadmeWorkflowDocsPrCheckCopy.expectedMergeState,
  expectedOwnerCount: aiReviewQueueReadmeWorkflowDocsPrCheckCopy.expectedOwnerCount,
  expectedPrNumber: aiReviewQueueReadmeWorkflowDocsPrCheckCopy.expectedPrNumber,
  expectedRouteCount: aiReviewQueueReadmeWorkflowDocsPrCheckCopy.expectedRouteCount,
  expectedRuleCount: aiReviewQueueReadmeWorkflowDocsPrCheckCopy.expectedRuleCount,
  linkSelector: "[data-testid='ai-review-queue-readme-workflow-docs-merge-anchor']",
  noMergeCopy:
    "Не мержить, пока PR #17 снова показывает mergeStateStatus CLEAN для AI review queue README workflow docs guard",
  ownerRole: "AI workflow owner + API owner + Release owner",
  prHref: aiReviewQueueReadmeWorkflowDocsPrCheckCopy.prHref,
  repairTargets:
    "PR #17,gh pr view 17 --json mergeStateStatus,statusCheckRollup,apps/web/scripts/smoke.mjs,/ai-review",
  sourceMarkerSelector: "[data-testid='ai-review-queue-readme-workflow-docs-pr-check-copy']",
  status: aiReviewQueueReadmeWorkflowDocsPrCheckCopy.status,
  workflowHref: aiReviewQueueReadmeWorkflowDocsPrCheckCopy.workflowHref,
  workflowName: aiReviewQueueReadmeWorkflowDocsPrCheckCopy.workflowName,
  workflowPath: aiReviewQueueReadmeWorkflowDocsPrCheckCopy.workflowPath,
  checks: [
    ["Merge state", "PR #17 mergeStateStatus остается CLEAN перед merge"],
    ["Branch", "headRefName codex/app-site-shell и baseRefName main не меняются"],
    ["Checks", "statusCheckRollup остается SUCCESS для Web build, API smoke и Shared validation"],
    ["No merge", "не мержить, пока merge-state guard снова не подтверждает clean PR rollup"],
  ],
};

const aiReviewQueueReadmeWorkflowDocsReleaseNoteCopy = {
  route: aiReviewQueueReadmeWorkflowDocsMergeStateCopy.route,
  apiRoute: aiReviewQueueReadmeWorkflowDocsMergeStateCopy.apiRoute,
  branch: aiReviewQueueReadmeWorkflowDocsMergeStateCopy.branch,
  baseBranch: aiReviewQueueReadmeWorkflowDocsMergeStateCopy.baseBranch,
  command: "gh pr view 17 --json url,headRefName,baseRefName,mergeStateStatus,statusCheckRollup",
  docsHref: aiReviewQueueReadmeWorkflowDocsMergeStateCopy.docsHref,
  expectedCheckGroups: aiReviewQueueReadmeWorkflowDocsMergeStateCopy.expectedCheckGroups,
  expectedConclusion: aiReviewQueueReadmeWorkflowDocsMergeStateCopy.expectedConclusion,
  expectedMergeState: aiReviewQueueReadmeWorkflowDocsMergeStateCopy.expectedMergeState,
  expectedOwnerCount: aiReviewQueueReadmeWorkflowDocsMergeStateCopy.expectedOwnerCount,
  expectedPrNumber: aiReviewQueueReadmeWorkflowDocsMergeStateCopy.expectedPrNumber,
  expectedRouteCount: aiReviewQueueReadmeWorkflowDocsMergeStateCopy.expectedRouteCount,
  expectedRuleCount: aiReviewQueueReadmeWorkflowDocsMergeStateCopy.expectedRuleCount,
  linkSelector: "[data-testid='ai-review-queue-readme-workflow-docs-release-anchor']",
  noMergeCopy:
    "Не выпускать release notes, пока PR #17 снова показывает CLEAN и зеленый statusCheckRollup для AI review queue README workflow docs guard",
  ownerRole: "AI workflow owner + API owner + Release owner",
  prHref: aiReviewQueueReadmeWorkflowDocsMergeStateCopy.prHref,
  releaseNote:
    "AI review queue README workflow docs guard covered by browser-loop, PR-check and merge-state copy on `/ai-review`.",
  releaseScope: "AI review queue README workflow docs",
  repairTargets:
    "PR #17,release notes,apps/web/scripts/smoke.mjs,/ai-review,[data-testid='ai-review-queue-readme-workflow-docs-merge-state-copy']",
  sourceMarkerSelector: "[data-testid='ai-review-queue-readme-workflow-docs-merge-state-copy']",
  status: aiReviewQueueReadmeWorkflowDocsMergeStateCopy.status,
  workflowHref: aiReviewQueueReadmeWorkflowDocsMergeStateCopy.workflowHref,
  workflowName: aiReviewQueueReadmeWorkflowDocsMergeStateCopy.workflowName,
  workflowPath: aiReviewQueueReadmeWorkflowDocsMergeStateCopy.workflowPath,
  checks: [
    ["Release note", "release notes явно упоминают AI review queue README workflow docs guard"],
    ["Evidence", "handoff ссылается на PR #17, CLEAN mergeStateStatus и зеленый statusCheckRollup"],
    ["Scope", "handoff оставляет `/ai-review`, `/v1/ai/review-queue` и Web build workflow в одном контексте"],
    ["No merge", "не выпускать release notes, пока release-note guard снова не подтверждает clean PR evidence"],
  ],
};

const aiReviewQueueReadmeWorkflowDocsFinalQaCopy = {
  route: aiReviewQueueReadmeWorkflowDocsReleaseNoteCopy.route,
  apiRoute: aiReviewQueueReadmeWorkflowDocsReleaseNoteCopy.apiRoute,
  branch: aiReviewQueueReadmeWorkflowDocsReleaseNoteCopy.branch,
  baseBranch: aiReviewQueueReadmeWorkflowDocsReleaseNoteCopy.baseBranch,
  command:
    "npm run build && npm run smoke -- --url http://127.0.0.1:4177/ && gh pr view 17 --json mergeStateStatus,statusCheckRollup",
  docsHref: aiReviewQueueReadmeWorkflowDocsReleaseNoteCopy.docsHref,
  expectedCheckGroups: aiReviewQueueReadmeWorkflowDocsReleaseNoteCopy.expectedCheckGroups,
  expectedConclusion: aiReviewQueueReadmeWorkflowDocsReleaseNoteCopy.expectedConclusion,
  expectedMergeState: aiReviewQueueReadmeWorkflowDocsReleaseNoteCopy.expectedMergeState,
  expectedOwnerCount: aiReviewQueueReadmeWorkflowDocsReleaseNoteCopy.expectedOwnerCount,
  expectedPrNumber: aiReviewQueueReadmeWorkflowDocsReleaseNoteCopy.expectedPrNumber,
  expectedRouteCount: aiReviewQueueReadmeWorkflowDocsReleaseNoteCopy.expectedRouteCount,
  expectedRuleCount: aiReviewQueueReadmeWorkflowDocsReleaseNoteCopy.expectedRuleCount,
  finalQaScope: "AI review queue README workflow docs",
  linkSelector: "[data-testid='ai-review-queue-readme-workflow-docs-final-qa-anchor']",
  noMergeCopy:
    "Не закрывать AI review queue README workflow docs handoff, пока final QA снова не подтверждает build, smoke, Browser DOM и CLEAN PR evidence",
  ownerRole: "AI workflow owner + API owner + QA owner + Release owner",
  prHref: aiReviewQueueReadmeWorkflowDocsReleaseNoteCopy.prHref,
  releaseNote: aiReviewQueueReadmeWorkflowDocsReleaseNoteCopy.releaseNote,
  releaseScope: aiReviewQueueReadmeWorkflowDocsReleaseNoteCopy.releaseScope,
  repairTargets:
    "PR #17,apps/web/scripts/smoke.mjs,/ai-review,Browser DOM QA,[data-testid='ai-review-queue-readme-workflow-docs-release-note-copy']",
  sourceMarkerSelector: "[data-testid='ai-review-queue-readme-workflow-docs-release-note-copy']",
  status: aiReviewQueueReadmeWorkflowDocsReleaseNoteCopy.status,
  workflowHref: aiReviewQueueReadmeWorkflowDocsReleaseNoteCopy.workflowHref,
  workflowName: aiReviewQueueReadmeWorkflowDocsReleaseNoteCopy.workflowName,
  workflowPath: aiReviewQueueReadmeWorkflowDocsReleaseNoteCopy.workflowPath,
  checks: [
    ["Build", "production build проходит перед финальным handoff"],
    ["Smoke", "route smoke видит AI review queue README workflow docs release-note guard"],
    ["Browser QA", "Browser DOM находит final QA и release-note guard без framework overlay и console errors"],
    ["PR", "PR #17 остается CLEAN с зеленым statusCheckRollup перед закрытием handoff"],
  ],
};

const aiReviewQueueReadmeWorkflowDocsOwnerHandoffCopy = {
  route: aiReviewQueueReadmeWorkflowDocsFinalQaCopy.route,
  apiRoute: aiReviewQueueReadmeWorkflowDocsFinalQaCopy.apiRoute,
  branch: aiReviewQueueReadmeWorkflowDocsFinalQaCopy.branch,
  baseBranch: aiReviewQueueReadmeWorkflowDocsFinalQaCopy.baseBranch,
  command: aiReviewQueueReadmeWorkflowDocsFinalQaCopy.command,
  docsHref: aiReviewQueueReadmeWorkflowDocsFinalQaCopy.docsHref,
  expectedCheckGroups: aiReviewQueueReadmeWorkflowDocsFinalQaCopy.expectedCheckGroups,
  expectedConclusion: aiReviewQueueReadmeWorkflowDocsFinalQaCopy.expectedConclusion,
  expectedMergeState: aiReviewQueueReadmeWorkflowDocsFinalQaCopy.expectedMergeState,
  expectedOwnerCount: aiReviewQueueReadmeWorkflowDocsFinalQaCopy.expectedOwnerCount,
  expectedPrNumber: aiReviewQueueReadmeWorkflowDocsFinalQaCopy.expectedPrNumber,
  expectedRouteCount: aiReviewQueueReadmeWorkflowDocsFinalQaCopy.expectedRouteCount,
  expectedRuleCount: aiReviewQueueReadmeWorkflowDocsFinalQaCopy.expectedRuleCount,
  finalQaScope: aiReviewQueueReadmeWorkflowDocsFinalQaCopy.finalQaScope,
  handoffOwners: ["AI workflow owner", "API owner", "QA owner", "Release owner"],
  handoffScope: "AI review queue README workflow docs owner handoff",
  linkSelector: "[data-testid='ai-review-queue-readme-workflow-docs-owner-handoff-anchor']",
  noMergeCopy:
    "Не закрывать AI review queue README workflow docs owner handoff, пока AI workflow, API, QA и Release owners не приняли final QA evidence",
  ownerRole: aiReviewQueueReadmeWorkflowDocsFinalQaCopy.ownerRole,
  prHref: aiReviewQueueReadmeWorkflowDocsFinalQaCopy.prHref,
  releaseNote: aiReviewQueueReadmeWorkflowDocsFinalQaCopy.releaseNote,
  releaseScope: aiReviewQueueReadmeWorkflowDocsFinalQaCopy.releaseScope,
  repairTargets:
    "PR #17,owner handoff,apps/web/scripts/smoke.mjs,/ai-review,[data-testid='ai-review-queue-readme-workflow-docs-final-qa-copy']",
  sourceMarkerSelector: "[data-testid='ai-review-queue-readme-workflow-docs-final-qa-copy']",
  status: aiReviewQueueReadmeWorkflowDocsFinalQaCopy.status,
  workflowHref: aiReviewQueueReadmeWorkflowDocsFinalQaCopy.workflowHref,
  workflowName: aiReviewQueueReadmeWorkflowDocsFinalQaCopy.workflowName,
  workflowPath: aiReviewQueueReadmeWorkflowDocsFinalQaCopy.workflowPath,
  checks: [
    ["AI", "AI workflow owner принимает queue facts, confidence rules и owner handoff"],
    ["API", "API owner принимает `/v1/ai/review-queue` и README contract link"],
    ["QA", "QA owner принимает build, route smoke и Browser DOM QA evidence"],
    ["Release", "Release owner принимает PR #17 CLEAN и release note text"],
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
          data-api-route={aiReviewQueueReadmeWorkflowDocsFailureCopy.apiRoute}
          data-command={aiReviewQueueReadmeWorkflowDocsFailureCopy.command}
          data-docs-href={aiReviewQueueReadmeWorkflowDocsFailureCopy.docsHref}
          data-docs-marker-selector={aiReviewQueueReadmeWorkflowDocsFailureCopy.docsMarkerSelector}
          data-expected-owner-count={aiReviewQueueReadmeWorkflowDocsFailureCopy.expectedOwnerCount}
          data-expected-route-count={aiReviewQueueReadmeWorkflowDocsFailureCopy.expectedRouteCount}
          data-expected-rule-count={aiReviewQueueReadmeWorkflowDocsFailureCopy.expectedRuleCount}
          data-failing-command={aiReviewQueueReadmeWorkflowDocsFailureCopy.failingCommand}
          data-link-selector={aiReviewQueueReadmeWorkflowDocsFailureCopy.linkSelector}
          data-no-merge-copy={aiReviewQueueReadmeWorkflowDocsFailureCopy.noMergeCopy}
          data-owner-role={aiReviewQueueReadmeWorkflowDocsFailureCopy.ownerRole}
          data-repair-targets={aiReviewQueueReadmeWorkflowDocsFailureCopy.repairTargets}
          data-route={aiReviewQueueReadmeWorkflowDocsFailureCopy.route}
          data-source-marker-selector={aiReviewQueueReadmeWorkflowDocsFailureCopy.sourceMarkerSelector}
          data-status={aiReviewQueueReadmeWorkflowDocsFailureCopy.status}
          data-testid="ai-review-queue-readme-workflow-docs-failure-copy"
          data-workflow-command={aiReviewQueueReadmeWorkflowDocsFailureCopy.workflowCommand}
          data-workflow-docs-command={aiReviewQueueReadmeWorkflowDocsFailureCopy.workflowDocsCommand}
          data-workflow-docs-failure-command={aiReviewQueueReadmeWorkflowDocsFailureCopy.workflowDocsFailureCommand}
          data-workflow-failure-command={aiReviewQueueReadmeWorkflowDocsFailureCopy.workflowFailureCommand}
          data-workflow-href={aiReviewQueueReadmeWorkflowDocsFailureCopy.workflowHref}
          data-workflow-name={aiReviewQueueReadmeWorkflowDocsFailureCopy.workflowName}
          data-workflow-path={aiReviewQueueReadmeWorkflowDocsFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI review queue README workflow docs failure copy</p>
              <h2>Что делать, если AI review queue README workflow docs guard упал</h2>
            </div>
            <a className="primary-link" href={aiReviewQueueReadmeWorkflowDocsFailureCopy.workflowHref}>
              {aiReviewQueueReadmeWorkflowDocsFailureCopy.workflowName}
            </a>
          </div>
          <div className="ai-confidence-browser-loop-grid">
            {aiReviewQueueReadmeWorkflowDocsFailureCopy.checks.map(([title, text]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? "No merge"
                    : title === "Owner"
                      ? "AI + API + Docs"
                      : title === "Fix order"
                        ? "README -> workflow docs"
                        : "Workflow docs"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel ai-confidence-browser-loop-panel"
          data-api-route={aiReviewQueueReadmeWorkflowDocsRenderedRouteCopy.apiRoute}
          data-command={aiReviewQueueReadmeWorkflowDocsRenderedRouteCopy.command}
          data-docs-href={aiReviewQueueReadmeWorkflowDocsRenderedRouteCopy.docsHref}
          data-docs-marker-selector={aiReviewQueueReadmeWorkflowDocsRenderedRouteCopy.docsMarkerSelector}
          data-expected-owner-count={aiReviewQueueReadmeWorkflowDocsRenderedRouteCopy.expectedOwnerCount}
          data-expected-route-count={aiReviewQueueReadmeWorkflowDocsRenderedRouteCopy.expectedRouteCount}
          data-expected-rule-count={aiReviewQueueReadmeWorkflowDocsRenderedRouteCopy.expectedRuleCount}
          data-failing-command={aiReviewQueueReadmeWorkflowDocsRenderedRouteCopy.failingCommand}
          data-link-selector={aiReviewQueueReadmeWorkflowDocsRenderedRouteCopy.linkSelector}
          data-no-merge-copy={aiReviewQueueReadmeWorkflowDocsRenderedRouteCopy.noMergeCopy}
          data-owner-role={aiReviewQueueReadmeWorkflowDocsRenderedRouteCopy.ownerRole}
          data-repair-targets={aiReviewQueueReadmeWorkflowDocsRenderedRouteCopy.repairTargets}
          data-route={aiReviewQueueReadmeWorkflowDocsRenderedRouteCopy.route}
          data-source-marker-selector={aiReviewQueueReadmeWorkflowDocsRenderedRouteCopy.sourceMarkerSelector}
          data-status={aiReviewQueueReadmeWorkflowDocsRenderedRouteCopy.status}
          data-testid="ai-review-queue-readme-workflow-docs-rendered-route-copy"
          data-workflow-command={aiReviewQueueReadmeWorkflowDocsRenderedRouteCopy.workflowCommand}
          data-workflow-docs-command={aiReviewQueueReadmeWorkflowDocsRenderedRouteCopy.workflowDocsCommand}
          data-workflow-docs-failure-command={aiReviewQueueReadmeWorkflowDocsRenderedRouteCopy.workflowDocsFailureCommand}
          data-workflow-failure-command={aiReviewQueueReadmeWorkflowDocsRenderedRouteCopy.workflowFailureCommand}
          data-workflow-href={aiReviewQueueReadmeWorkflowDocsRenderedRouteCopy.workflowHref}
          data-workflow-name={aiReviewQueueReadmeWorkflowDocsRenderedRouteCopy.workflowName}
          data-workflow-path={aiReviewQueueReadmeWorkflowDocsRenderedRouteCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI review queue README workflow docs rendered-route copy</p>
              <h2>Что делать, если AI review queue README workflow docs rendered-route guard упал</h2>
            </div>
            <a className="primary-link" href={aiReviewQueueReadmeWorkflowDocsRenderedRouteCopy.workflowHref}>
              {aiReviewQueueReadmeWorkflowDocsRenderedRouteCopy.workflowName}
            </a>
          </div>
          <div className="ai-confidence-browser-loop-grid">
            {aiReviewQueueReadmeWorkflowDocsRenderedRouteCopy.checks.map(([title, text]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? "No merge"
                    : title === "Owner"
                      ? "AI + API + QA"
                      : title === "Fix order"
                        ? "workflow docs -> smoke"
                        : "Rendered route"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel ai-confidence-browser-loop-panel"
          data-api-route={aiReviewQueueReadmeWorkflowDocsBrowserLoopCopy.apiRoute}
          data-browser-loop-selector={aiReviewQueueReadmeWorkflowDocsBrowserLoopCopy.browserLoopSelector}
          data-browser-url={aiReviewQueueReadmeWorkflowDocsBrowserLoopCopy.browserUrl}
          data-command={aiReviewQueueReadmeWorkflowDocsBrowserLoopCopy.command}
          data-console-levels={aiReviewQueueReadmeWorkflowDocsBrowserLoopCopy.consoleLevels}
          data-docs-href={aiReviewQueueReadmeWorkflowDocsBrowserLoopCopy.docsHref}
          data-docs-marker-selector={aiReviewQueueReadmeWorkflowDocsBrowserLoopCopy.docsMarkerSelector}
          data-expected-owner-count={aiReviewQueueReadmeWorkflowDocsBrowserLoopCopy.expectedOwnerCount}
          data-expected-route-count={aiReviewQueueReadmeWorkflowDocsBrowserLoopCopy.expectedRouteCount}
          data-expected-rule-count={aiReviewQueueReadmeWorkflowDocsBrowserLoopCopy.expectedRuleCount}
          data-link-selector={aiReviewQueueReadmeWorkflowDocsBrowserLoopCopy.linkSelector}
          data-no-merge-copy={aiReviewQueueReadmeWorkflowDocsBrowserLoopCopy.noMergeCopy}
          data-owner-role={aiReviewQueueReadmeWorkflowDocsBrowserLoopCopy.ownerRole}
          data-repair-targets={aiReviewQueueReadmeWorkflowDocsBrowserLoopCopy.repairTargets}
          data-route={aiReviewQueueReadmeWorkflowDocsBrowserLoopCopy.route}
          data-screenshot-required={aiReviewQueueReadmeWorkflowDocsBrowserLoopCopy.screenshotRequired}
          data-source-marker-selector={aiReviewQueueReadmeWorkflowDocsBrowserLoopCopy.sourceMarkerSelector}
          data-status={aiReviewQueueReadmeWorkflowDocsBrowserLoopCopy.status}
          data-testid="ai-review-queue-readme-workflow-docs-browser-loop-copy"
          data-workflow-command={aiReviewQueueReadmeWorkflowDocsBrowserLoopCopy.workflowCommand}
          data-workflow-docs-command={aiReviewQueueReadmeWorkflowDocsBrowserLoopCopy.workflowDocsCommand}
          data-workflow-docs-failure-command={aiReviewQueueReadmeWorkflowDocsBrowserLoopCopy.workflowDocsFailureCommand}
          data-workflow-failure-command={aiReviewQueueReadmeWorkflowDocsBrowserLoopCopy.workflowFailureCommand}
          data-workflow-href={aiReviewQueueReadmeWorkflowDocsBrowserLoopCopy.workflowHref}
          data-workflow-name={aiReviewQueueReadmeWorkflowDocsBrowserLoopCopy.workflowName}
          data-workflow-path={aiReviewQueueReadmeWorkflowDocsBrowserLoopCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI review queue README workflow docs browser-loop copy</p>
              <h2>Как Browser QA подтверждает AI review queue README workflow docs guard</h2>
            </div>
            <a
              className="primary-link"
              data-testid="ai-review-queue-readme-workflow-docs-workflow-anchor"
              href={aiReviewQueueReadmeWorkflowDocsBrowserLoopCopy.workflowHref}
            >
              {aiReviewQueueReadmeWorkflowDocsBrowserLoopCopy.workflowName}
            </a>
          </div>
          <div className="ai-confidence-browser-loop-grid">
            {aiReviewQueueReadmeWorkflowDocsBrowserLoopCopy.checks.map(([title, text]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Console"
                    ? "No errors"
                    : title === "Workflow link"
                      ? "Scoped link"
                      : title === "DOM"
                        ? "One guard"
                        : "Browser QA"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel ai-confidence-browser-loop-panel"
          data-api-route={aiReviewQueueReadmeWorkflowDocsPrCheckCopy.apiRoute}
          data-base-branch={aiReviewQueueReadmeWorkflowDocsPrCheckCopy.baseBranch}
          data-branch={aiReviewQueueReadmeWorkflowDocsPrCheckCopy.branch}
          data-command={aiReviewQueueReadmeWorkflowDocsPrCheckCopy.command}
          data-docs-href={aiReviewQueueReadmeWorkflowDocsPrCheckCopy.docsHref}
          data-expected-check-groups={aiReviewQueueReadmeWorkflowDocsPrCheckCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={aiReviewQueueReadmeWorkflowDocsPrCheckCopy.expectedConclusion}
          data-expected-merge-state={aiReviewQueueReadmeWorkflowDocsPrCheckCopy.expectedMergeState}
          data-expected-owner-count={aiReviewQueueReadmeWorkflowDocsPrCheckCopy.expectedOwnerCount}
          data-expected-pr-number={aiReviewQueueReadmeWorkflowDocsPrCheckCopy.expectedPrNumber}
          data-expected-route-count={aiReviewQueueReadmeWorkflowDocsPrCheckCopy.expectedRouteCount}
          data-expected-rule-count={aiReviewQueueReadmeWorkflowDocsPrCheckCopy.expectedRuleCount}
          data-link-selector={aiReviewQueueReadmeWorkflowDocsPrCheckCopy.linkSelector}
          data-no-merge-copy={aiReviewQueueReadmeWorkflowDocsPrCheckCopy.noMergeCopy}
          data-owner-role={aiReviewQueueReadmeWorkflowDocsPrCheckCopy.ownerRole}
          data-pr-href={aiReviewQueueReadmeWorkflowDocsPrCheckCopy.prHref}
          data-repair-targets={aiReviewQueueReadmeWorkflowDocsPrCheckCopy.repairTargets}
          data-route={aiReviewQueueReadmeWorkflowDocsPrCheckCopy.route}
          data-source-marker-selector={aiReviewQueueReadmeWorkflowDocsPrCheckCopy.sourceMarkerSelector}
          data-status={aiReviewQueueReadmeWorkflowDocsPrCheckCopy.status}
          data-testid="ai-review-queue-readme-workflow-docs-pr-check-copy"
          data-workflow-href={aiReviewQueueReadmeWorkflowDocsPrCheckCopy.workflowHref}
          data-workflow-name={aiReviewQueueReadmeWorkflowDocsPrCheckCopy.workflowName}
          data-workflow-path={aiReviewQueueReadmeWorkflowDocsPrCheckCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI review queue README workflow docs PR-check copy</p>
              <h2>Как PR #17 подтверждает AI review queue README workflow docs guard</h2>
            </div>
            <a
              className="primary-link"
              data-testid="ai-review-queue-readme-workflow-docs-pr-anchor"
              href={aiReviewQueueReadmeWorkflowDocsPrCheckCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="ai-confidence-browser-loop-grid">
            {aiReviewQueueReadmeWorkflowDocsPrCheckCopy.checks.map(([title, text]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? "No merge"
                    : title === "Checks"
                      ? "CI green"
                      : title === "Route guard"
                        ? "Smoke route"
                        : "PR clean"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel ai-confidence-browser-loop-panel"
          data-api-route={aiReviewQueueReadmeWorkflowDocsMergeStateCopy.apiRoute}
          data-base-branch={aiReviewQueueReadmeWorkflowDocsMergeStateCopy.baseBranch}
          data-branch={aiReviewQueueReadmeWorkflowDocsMergeStateCopy.branch}
          data-command={aiReviewQueueReadmeWorkflowDocsMergeStateCopy.command}
          data-docs-href={aiReviewQueueReadmeWorkflowDocsMergeStateCopy.docsHref}
          data-expected-check-groups={aiReviewQueueReadmeWorkflowDocsMergeStateCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={aiReviewQueueReadmeWorkflowDocsMergeStateCopy.expectedConclusion}
          data-expected-merge-state={aiReviewQueueReadmeWorkflowDocsMergeStateCopy.expectedMergeState}
          data-expected-owner-count={aiReviewQueueReadmeWorkflowDocsMergeStateCopy.expectedOwnerCount}
          data-expected-pr-number={aiReviewQueueReadmeWorkflowDocsMergeStateCopy.expectedPrNumber}
          data-expected-route-count={aiReviewQueueReadmeWorkflowDocsMergeStateCopy.expectedRouteCount}
          data-expected-rule-count={aiReviewQueueReadmeWorkflowDocsMergeStateCopy.expectedRuleCount}
          data-link-selector={aiReviewQueueReadmeWorkflowDocsMergeStateCopy.linkSelector}
          data-no-merge-copy={aiReviewQueueReadmeWorkflowDocsMergeStateCopy.noMergeCopy}
          data-owner-role={aiReviewQueueReadmeWorkflowDocsMergeStateCopy.ownerRole}
          data-pr-href={aiReviewQueueReadmeWorkflowDocsMergeStateCopy.prHref}
          data-repair-targets={aiReviewQueueReadmeWorkflowDocsMergeStateCopy.repairTargets}
          data-route={aiReviewQueueReadmeWorkflowDocsMergeStateCopy.route}
          data-source-marker-selector={aiReviewQueueReadmeWorkflowDocsMergeStateCopy.sourceMarkerSelector}
          data-status={aiReviewQueueReadmeWorkflowDocsMergeStateCopy.status}
          data-testid="ai-review-queue-readme-workflow-docs-merge-state-copy"
          data-workflow-href={aiReviewQueueReadmeWorkflowDocsMergeStateCopy.workflowHref}
          data-workflow-name={aiReviewQueueReadmeWorkflowDocsMergeStateCopy.workflowName}
          data-workflow-path={aiReviewQueueReadmeWorkflowDocsMergeStateCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI review queue README workflow docs merge-state copy</p>
              <h2>Как PR #17 держит AI review queue README workflow docs guard в CLEAN</h2>
            </div>
            <a
              className="primary-link"
              data-testid="ai-review-queue-readme-workflow-docs-merge-anchor"
              href={aiReviewQueueReadmeWorkflowDocsMergeStateCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="ai-confidence-browser-loop-grid">
            {aiReviewQueueReadmeWorkflowDocsMergeStateCopy.checks.map(([title, text]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? "No merge"
                    : title === "Checks"
                      ? "Rollup green"
                      : title === "Branch"
                        ? "PR branch"
                        : "CLEAN"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel ai-confidence-browser-loop-panel"
          data-api-route={aiReviewQueueReadmeWorkflowDocsReleaseNoteCopy.apiRoute}
          data-base-branch={aiReviewQueueReadmeWorkflowDocsReleaseNoteCopy.baseBranch}
          data-branch={aiReviewQueueReadmeWorkflowDocsReleaseNoteCopy.branch}
          data-command={aiReviewQueueReadmeWorkflowDocsReleaseNoteCopy.command}
          data-docs-href={aiReviewQueueReadmeWorkflowDocsReleaseNoteCopy.docsHref}
          data-expected-check-groups={aiReviewQueueReadmeWorkflowDocsReleaseNoteCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={aiReviewQueueReadmeWorkflowDocsReleaseNoteCopy.expectedConclusion}
          data-expected-merge-state={aiReviewQueueReadmeWorkflowDocsReleaseNoteCopy.expectedMergeState}
          data-expected-owner-count={aiReviewQueueReadmeWorkflowDocsReleaseNoteCopy.expectedOwnerCount}
          data-expected-pr-number={aiReviewQueueReadmeWorkflowDocsReleaseNoteCopy.expectedPrNumber}
          data-expected-route-count={aiReviewQueueReadmeWorkflowDocsReleaseNoteCopy.expectedRouteCount}
          data-expected-rule-count={aiReviewQueueReadmeWorkflowDocsReleaseNoteCopy.expectedRuleCount}
          data-link-selector={aiReviewQueueReadmeWorkflowDocsReleaseNoteCopy.linkSelector}
          data-no-merge-copy={aiReviewQueueReadmeWorkflowDocsReleaseNoteCopy.noMergeCopy}
          data-owner-role={aiReviewQueueReadmeWorkflowDocsReleaseNoteCopy.ownerRole}
          data-pr-href={aiReviewQueueReadmeWorkflowDocsReleaseNoteCopy.prHref}
          data-release-note={aiReviewQueueReadmeWorkflowDocsReleaseNoteCopy.releaseNote}
          data-release-scope={aiReviewQueueReadmeWorkflowDocsReleaseNoteCopy.releaseScope}
          data-repair-targets={aiReviewQueueReadmeWorkflowDocsReleaseNoteCopy.repairTargets}
          data-route={aiReviewQueueReadmeWorkflowDocsReleaseNoteCopy.route}
          data-source-marker-selector={aiReviewQueueReadmeWorkflowDocsReleaseNoteCopy.sourceMarkerSelector}
          data-status={aiReviewQueueReadmeWorkflowDocsReleaseNoteCopy.status}
          data-testid="ai-review-queue-readme-workflow-docs-release-note-copy"
          data-workflow-href={aiReviewQueueReadmeWorkflowDocsReleaseNoteCopy.workflowHref}
          data-workflow-name={aiReviewQueueReadmeWorkflowDocsReleaseNoteCopy.workflowName}
          data-workflow-path={aiReviewQueueReadmeWorkflowDocsReleaseNoteCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI review queue README workflow docs release-note copy</p>
              <h2>Что release notes должны сказать про AI review queue README workflow docs guard</h2>
            </div>
            <a
              className="primary-link"
              data-testid="ai-review-queue-readme-workflow-docs-release-anchor"
              href={aiReviewQueueReadmeWorkflowDocsReleaseNoteCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="ai-confidence-browser-loop-grid">
            {aiReviewQueueReadmeWorkflowDocsReleaseNoteCopy.checks.map(([title, text]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? "No merge"
                    : title === "Evidence"
                      ? "Clean PR"
                      : title === "Scope"
                        ? "Release scope"
                        : "Release note"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel ai-confidence-browser-loop-panel"
          data-api-route={aiReviewQueueReadmeWorkflowDocsFinalQaCopy.apiRoute}
          data-base-branch={aiReviewQueueReadmeWorkflowDocsFinalQaCopy.baseBranch}
          data-branch={aiReviewQueueReadmeWorkflowDocsFinalQaCopy.branch}
          data-command={aiReviewQueueReadmeWorkflowDocsFinalQaCopy.command}
          data-docs-href={aiReviewQueueReadmeWorkflowDocsFinalQaCopy.docsHref}
          data-expected-check-groups={aiReviewQueueReadmeWorkflowDocsFinalQaCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={aiReviewQueueReadmeWorkflowDocsFinalQaCopy.expectedConclusion}
          data-expected-merge-state={aiReviewQueueReadmeWorkflowDocsFinalQaCopy.expectedMergeState}
          data-expected-owner-count={aiReviewQueueReadmeWorkflowDocsFinalQaCopy.expectedOwnerCount}
          data-expected-pr-number={aiReviewQueueReadmeWorkflowDocsFinalQaCopy.expectedPrNumber}
          data-expected-route-count={aiReviewQueueReadmeWorkflowDocsFinalQaCopy.expectedRouteCount}
          data-expected-rule-count={aiReviewQueueReadmeWorkflowDocsFinalQaCopy.expectedRuleCount}
          data-final-qa-scope={aiReviewQueueReadmeWorkflowDocsFinalQaCopy.finalQaScope}
          data-link-selector={aiReviewQueueReadmeWorkflowDocsFinalQaCopy.linkSelector}
          data-no-merge-copy={aiReviewQueueReadmeWorkflowDocsFinalQaCopy.noMergeCopy}
          data-owner-role={aiReviewQueueReadmeWorkflowDocsFinalQaCopy.ownerRole}
          data-pr-href={aiReviewQueueReadmeWorkflowDocsFinalQaCopy.prHref}
          data-release-note={aiReviewQueueReadmeWorkflowDocsFinalQaCopy.releaseNote}
          data-release-scope={aiReviewQueueReadmeWorkflowDocsFinalQaCopy.releaseScope}
          data-repair-targets={aiReviewQueueReadmeWorkflowDocsFinalQaCopy.repairTargets}
          data-route={aiReviewQueueReadmeWorkflowDocsFinalQaCopy.route}
          data-source-marker-selector={aiReviewQueueReadmeWorkflowDocsFinalQaCopy.sourceMarkerSelector}
          data-status={aiReviewQueueReadmeWorkflowDocsFinalQaCopy.status}
          data-testid="ai-review-queue-readme-workflow-docs-final-qa-copy"
          data-workflow-href={aiReviewQueueReadmeWorkflowDocsFinalQaCopy.workflowHref}
          data-workflow-name={aiReviewQueueReadmeWorkflowDocsFinalQaCopy.workflowName}
          data-workflow-path={aiReviewQueueReadmeWorkflowDocsFinalQaCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI review queue README workflow docs final QA copy</p>
              <h2>Как финально проверить AI review queue README workflow docs handoff</h2>
            </div>
            <a
              className="primary-link"
              data-testid="ai-review-queue-readme-workflow-docs-final-qa-anchor"
              href={aiReviewQueueReadmeWorkflowDocsFinalQaCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="ai-confidence-browser-loop-grid">
            {aiReviewQueueReadmeWorkflowDocsFinalQaCopy.checks.map(([title, text]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>
                  {title === "PR"
                    ? "PR clean"
                    : title === "Browser QA"
                      ? "DOM clean"
                      : title === "Smoke"
                        ? "Smoke green"
                        : "Build green"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel ai-confidence-browser-loop-panel"
          data-api-route={aiReviewQueueReadmeWorkflowDocsOwnerHandoffCopy.apiRoute}
          data-base-branch={aiReviewQueueReadmeWorkflowDocsOwnerHandoffCopy.baseBranch}
          data-branch={aiReviewQueueReadmeWorkflowDocsOwnerHandoffCopy.branch}
          data-command={aiReviewQueueReadmeWorkflowDocsOwnerHandoffCopy.command}
          data-docs-href={aiReviewQueueReadmeWorkflowDocsOwnerHandoffCopy.docsHref}
          data-expected-check-groups={aiReviewQueueReadmeWorkflowDocsOwnerHandoffCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={aiReviewQueueReadmeWorkflowDocsOwnerHandoffCopy.expectedConclusion}
          data-expected-merge-state={aiReviewQueueReadmeWorkflowDocsOwnerHandoffCopy.expectedMergeState}
          data-expected-owner-count={aiReviewQueueReadmeWorkflowDocsOwnerHandoffCopy.expectedOwnerCount}
          data-expected-pr-number={aiReviewQueueReadmeWorkflowDocsOwnerHandoffCopy.expectedPrNumber}
          data-expected-route-count={aiReviewQueueReadmeWorkflowDocsOwnerHandoffCopy.expectedRouteCount}
          data-expected-rule-count={aiReviewQueueReadmeWorkflowDocsOwnerHandoffCopy.expectedRuleCount}
          data-final-qa-scope={aiReviewQueueReadmeWorkflowDocsOwnerHandoffCopy.finalQaScope}
          data-handoff-owners={aiReviewQueueReadmeWorkflowDocsOwnerHandoffCopy.handoffOwners.join(",")}
          data-handoff-scope={aiReviewQueueReadmeWorkflowDocsOwnerHandoffCopy.handoffScope}
          data-link-selector={aiReviewQueueReadmeWorkflowDocsOwnerHandoffCopy.linkSelector}
          data-no-merge-copy={aiReviewQueueReadmeWorkflowDocsOwnerHandoffCopy.noMergeCopy}
          data-owner-role={aiReviewQueueReadmeWorkflowDocsOwnerHandoffCopy.ownerRole}
          data-pr-href={aiReviewQueueReadmeWorkflowDocsOwnerHandoffCopy.prHref}
          data-release-note={aiReviewQueueReadmeWorkflowDocsOwnerHandoffCopy.releaseNote}
          data-release-scope={aiReviewQueueReadmeWorkflowDocsOwnerHandoffCopy.releaseScope}
          data-repair-targets={aiReviewQueueReadmeWorkflowDocsOwnerHandoffCopy.repairTargets}
          data-route={aiReviewQueueReadmeWorkflowDocsOwnerHandoffCopy.route}
          data-source-marker-selector={aiReviewQueueReadmeWorkflowDocsOwnerHandoffCopy.sourceMarkerSelector}
          data-status={aiReviewQueueReadmeWorkflowDocsOwnerHandoffCopy.status}
          data-testid="ai-review-queue-readme-workflow-docs-owner-handoff-copy"
          data-workflow-href={aiReviewQueueReadmeWorkflowDocsOwnerHandoffCopy.workflowHref}
          data-workflow-name={aiReviewQueueReadmeWorkflowDocsOwnerHandoffCopy.workflowName}
          data-workflow-path={aiReviewQueueReadmeWorkflowDocsOwnerHandoffCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI review queue README workflow docs owner handoff copy</p>
              <h2>Кто принимает AI review queue README workflow docs handoff</h2>
            </div>
            <a
              className="primary-link"
              data-testid="ai-review-queue-readme-workflow-docs-owner-handoff-anchor"
              href={aiReviewQueueReadmeWorkflowDocsOwnerHandoffCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="ai-confidence-browser-loop-grid">
            {aiReviewQueueReadmeWorkflowDocsOwnerHandoffCopy.checks.map(([title, text]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Release"
                    ? "Release accepts"
                    : title === "QA"
                      ? "QA accepts"
                      : title === "API"
                        ? "API accepts"
                        : "AI accepts"}
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
