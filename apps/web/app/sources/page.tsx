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
const eisRealNetworkApprovalDocsDeepLink = {
  route: "/sources",
  apiRoute: eisRealNetworkSmokeGate.approvalApiCopy.route,
  docsHref:
    "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#eis-real-network-approval-api-copy",
  expectedApprovalCount: eisRealNetworkSmokeGate.requiredApprovals.length,
  owner: eisRealNetworkSmokeGate.owner,
  status: eisRealNetworkSmokeGate.status,
  sourceMarkerSelector: "[data-testid='eis-real-network-approval-api-copy']",
  checks: [
    ["Locate", "найти EIS approval marker и docs deep-link на `/sources`"],
    ["Assert href", "сверить ссылку на API README EIS approval anchor"],
    ["Assert approvals", "подтвердить 5 Data approvals до real-network smoke"],
    ["Assert copy", "оставить visible link copy рядом с EIS approval gate"],
  ],
};

const fnsRealNetworkSmokeGate = {
  status: fnsConnectorGate.status,
  owner: fnsConnectorGate.owner,
  ciPolicy: fnsConnectorGate.ci_policy,
  safeTestPairRequired: fnsConnectorGate.safe_test_pair_required,
  requiredApprovals: fnsConnectorGate.required_approvals,
  approvalApiCopy: fnsConnectorGate.approval_api_copy,
};
const fnsRealNetworkApprovalDocsDeepLink = {
  route: "/sources",
  apiRoute: fnsRealNetworkSmokeGate.approvalApiCopy.route,
  docsHref:
    "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#fns-real-network-approval-api-copy",
  expectedApprovalCount: fnsRealNetworkSmokeGate.requiredApprovals.length,
  owner: fnsRealNetworkSmokeGate.owner,
  status: fnsRealNetworkSmokeGate.status,
  sourceMarkerSelector: "[data-testid='fns-real-network-approval-api-copy']",
  checks: [
    ["Locate", "найти FNS approval marker и docs deep-link на `/sources`"],
    ["Assert href", "сверить ссылку на API README FNS approval anchor"],
    ["Assert approvals", "подтвердить 5 Legal approvals до real-network smoke"],
    ["Assert copy", "оставить visible link copy рядом с FNS approval gate"],
  ],
};

const sourceConnectorsDocsDeepLink = {
  route: "/sources",
  apiRoute: "/v1/sources/connectors",
  docsHref:
    "https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#source-connectors-contract",
  expectedConnectorCount: 2,
  expectedNetworkDisabledCount: 2,
  connectorIds: ["eis-zakupki-gov-ru", fnsReadiness.connectorId],
  mode: "contract_only",
  sourceMarkerSelector: "[data-testid='fns-connector-browser-loop']",
  checks: [
    ["Locate", "найти connectors browser-loop и docs deep-link на `/sources`"],
    ["Assert href", "сверить ссылку на API README Source Connectors Contract"],
    ["Assert registry", "подтвердить 2 contract-only коннектора без network_enabled"],
    ["Assert copy", "оставить visible link copy рядом с source connector gates"],
  ],
};

const sourceConnectorsDocsRenderedRouteFailureCopy = {
  route: sourceConnectorsDocsDeepLink.route,
  apiRoute: sourceConnectorsDocsDeepLink.apiRoute,
  command: "npm run smoke -- --url http://127.0.0.1:4177/",
  connectorIds: sourceConnectorsDocsDeepLink.connectorIds,
  docsHref: sourceConnectorsDocsDeepLink.docsHref,
  expectedConnectorCount: sourceConnectorsDocsDeepLink.expectedConnectorCount,
  expectedNetworkDisabledCount: sourceConnectorsDocsDeepLink.expectedNetworkDisabledCount,
  expectedRouteCount: 16,
  failingCommand: "npm run smoke -- --url http://127.0.0.1:4177/",
  linkSelector: "[data-testid='source-connectors-docs-deep-link-anchor']",
  mode: sourceConnectorsDocsDeepLink.mode,
  noMergeCopy:
    "Не мержить, пока rendered routes smoke снова подтверждает Source Connectors Contract docs deep-link на живом `/sources`",
  ownerRole: "Data owner + API owner + QA owner",
  repairTargets:
    "/sources,apps/api/README.md#source-connectors-contract,apps/web/scripts/smoke.mjs,[data-testid='source-connectors-docs-deep-link']",
  sourceMarkerSelector: "[data-testid='source-connectors-docs-deep-link']",
  checks: [
    ["Symptom", "rendered routes проходят частично, но `/sources` потерял Source Connectors Contract README href или docs anchor"],
    ["Fix order", "сначала восстановить source-connectors-docs-deep-link, затем route smoke expectations"],
    ["Owner", "Data owner подтверждает connectors copy, API owner подтверждает README anchor, QA owner подтверждает `/sources`"],
    ["No merge", "не мержить, пока source connectors docs link снова не проходит rendered route coverage"],
  ],
};

const sourceConnectorsWorkflowDocsFailureCopy = {
  route: sourceConnectorsDocsDeepLink.route,
  apiRoute: sourceConnectorsDocsDeepLink.apiRoute,
  command: sourceConnectorsDocsRenderedRouteFailureCopy.command,
  connectorIds: sourceConnectorsDocsDeepLink.connectorIds,
  docsHref: sourceConnectorsDocsDeepLink.docsHref,
  docsMarkerSelector: "[data-testid='source-connectors-docs-deep-link']",
  expectedConnectorCount: sourceConnectorsDocsDeepLink.expectedConnectorCount,
  expectedNetworkDisabledCount: sourceConnectorsDocsDeepLink.expectedNetworkDisabledCount,
  expectedRouteCount: sourceConnectorsDocsRenderedRouteFailureCopy.expectedRouteCount,
  failingCommand: sourceConnectorsDocsRenderedRouteFailureCopy.failingCommand,
  linkSelector: sourceConnectorsDocsRenderedRouteFailureCopy.linkSelector,
  mode: sourceConnectorsDocsDeepLink.mode,
  noMergeCopy:
    "Не мержить, пока Source Connectors docs deep-link и Web build route smoke снова согласованы на живом `/sources`",
  ownerRole: "Data owner + API owner + Docs owner + QA owner",
  repairTargets:
    "/sources,apps/api/README.md#source-connectors-contract,.github/workflows/web-build.yml,apps/web/scripts/smoke.mjs",
  sourceMarkerSelector: "[data-testid='source-connectors-docs-rendered-route-failure-copy']",
  workflowCommand: "npm run smoke -- --url http://127.0.0.1:4177/",
  workflowHref: "https://github.com/info14fourteen-creator/ASTS/actions/workflows/web-build.yml",
  workflowName: "Web build",
  workflowPath: ".github/workflows/web-build.yml",
  checks: [
    ["Symptom", "connectors docs link виден, но Web build route smoke больше не закрепляет `/sources` docs contract"],
    ["Fix order", "сначала восстановить source-connectors-docs-deep-link, затем rendered route smoke expectations"],
    [
      "Owner",
      "Data owner подтверждает connectors copy, API owner подтверждает README anchor, Docs owner подтверждает deep-link",
    ],
    ["No merge", "не мержить, пока source connectors workflow docs guard снова не проходит route coverage"],
  ],
};

const sourceConnectorsLiveDocsWorkflowCopy = {
  route: sourceConnectorsDocsDeepLink.route,
  apiRoute: sourceConnectorsDocsDeepLink.apiRoute,
  command: sourceConnectorsDocsRenderedRouteFailureCopy.command,
  connectorIds: sourceConnectorsDocsDeepLink.connectorIds,
  docsHref: sourceConnectorsDocsDeepLink.docsHref,
  docsMarkerSelector: sourceConnectorsWorkflowDocsFailureCopy.docsMarkerSelector,
  expectedConnectorCount: sourceConnectorsDocsDeepLink.expectedConnectorCount,
  expectedNetworkDisabledCount: sourceConnectorsDocsDeepLink.expectedNetworkDisabledCount,
  expectedRouteCount: sourceConnectorsDocsRenderedRouteFailureCopy.expectedRouteCount,
  failingCommand: sourceConnectorsWorkflowDocsFailureCopy.workflowCommand,
  linkSelector: sourceConnectorsWorkflowDocsFailureCopy.linkSelector,
  mode: sourceConnectorsDocsDeepLink.mode,
  noMergeCopy:
    "Не мержить, пока Source Connectors live route, API README docs deep-link и Web build route smoke снова согласованы",
  ownerRole: "Data owner + API owner + Docs owner + QA owner",
  repairTargets:
    "/sources,apps/api/README.md#source-connectors-contract,.github/workflows/web-build.yml,apps/web/scripts/smoke.mjs",
  sourceMarkerSelector: "[data-testid='source-connectors-workflow-docs-failure-copy']",
  workflowCommand: sourceConnectorsWorkflowDocsFailureCopy.workflowCommand,
  workflowHref: sourceConnectorsWorkflowDocsFailureCopy.workflowHref,
  workflowName: sourceConnectorsWorkflowDocsFailureCopy.workflowName,
  workflowPath: sourceConnectorsWorkflowDocsFailureCopy.workflowPath,
  checks: [
    ["Symptom", "connectors live route есть, но docs deep-link или Web build route smoke больше не закрепляют Source Connectors"],
    ["Fix order", "сначала восстановить source-connectors-docs-deep-link, затем source-connectors-workflow-docs-failure-copy"],
    ["Owner", "Data owner подтверждает connector ids, API owner подтверждает README anchor, CI owner подтверждает Web build route smoke"],
    ["No merge", "не мержить, пока source connectors live docs workflow guard снова не проходит route coverage"],
  ],
};

const sourceConnectorsReadmeLiveDocsWorkflowCopy = {
  route: sourceConnectorsLiveDocsWorkflowCopy.route,
  apiRoute: sourceConnectorsLiveDocsWorkflowCopy.apiRoute,
  command: sourceConnectorsLiveDocsWorkflowCopy.command,
  connectorIds: sourceConnectorsLiveDocsWorkflowCopy.connectorIds,
  docsHref: sourceConnectorsLiveDocsWorkflowCopy.docsHref,
  docsMarkerSelector: sourceConnectorsLiveDocsWorkflowCopy.docsMarkerSelector,
  expectedConnectorCount: sourceConnectorsLiveDocsWorkflowCopy.expectedConnectorCount,
  expectedNetworkDisabledCount: sourceConnectorsLiveDocsWorkflowCopy.expectedNetworkDisabledCount,
  expectedRouteCount: sourceConnectorsLiveDocsWorkflowCopy.expectedRouteCount,
  failingCommand: sourceConnectorsLiveDocsWorkflowCopy.failingCommand,
  linkSelector: sourceConnectorsLiveDocsWorkflowCopy.linkSelector,
  mode: sourceConnectorsLiveDocsWorkflowCopy.mode,
  noMergeCopy:
    "Не мержить, пока Source Connectors README docs deep-link, live route и Web build route smoke снова согласованы",
  ownerRole: sourceConnectorsLiveDocsWorkflowCopy.ownerRole,
  repairTargets:
    "/sources,apps/api/README.md#source-connectors-contract,.github/workflows/web-build.yml,apps/web/scripts/smoke.mjs,[data-testid='source-connectors-live-docs-workflow-copy']",
  sourceMarkerSelector: "[data-testid='source-connectors-live-docs-workflow-copy']",
  workflowCommand: sourceConnectorsLiveDocsWorkflowCopy.workflowCommand,
  workflowHref: sourceConnectorsLiveDocsWorkflowCopy.workflowHref,
  workflowName: sourceConnectorsLiveDocsWorkflowCopy.workflowName,
  workflowPath: sourceConnectorsLiveDocsWorkflowCopy.workflowPath,
  checks: [
    ["Symptom", "README deep-link есть, но live docs workflow guard больше не связывает Source Connectors с Web build"],
    ["Fix order", "сначала восстановить source-connectors-docs-deep-link, затем source-connectors-live-docs-workflow-copy"],
    ["Owner", "Data owner подтверждает connector ids, API owner подтверждает README anchor, CI owner подтверждает route smoke"],
    ["No merge", "не мержить, пока source connectors README live docs workflow guard снова не проходит route coverage"],
  ],
};

const sourceConnectorsReadmeWorkflowFailureCopy = {
  route: sourceConnectorsReadmeLiveDocsWorkflowCopy.route,
  apiRoute: sourceConnectorsReadmeLiveDocsWorkflowCopy.apiRoute,
  command: sourceConnectorsReadmeLiveDocsWorkflowCopy.command,
  connectorIds: sourceConnectorsReadmeLiveDocsWorkflowCopy.connectorIds,
  docsHref: sourceConnectorsReadmeLiveDocsWorkflowCopy.docsHref,
  docsMarkerSelector: sourceConnectorsReadmeLiveDocsWorkflowCopy.docsMarkerSelector,
  expectedConnectorCount: sourceConnectorsReadmeLiveDocsWorkflowCopy.expectedConnectorCount,
  expectedNetworkDisabledCount: sourceConnectorsReadmeLiveDocsWorkflowCopy.expectedNetworkDisabledCount,
  expectedRouteCount: sourceConnectorsReadmeLiveDocsWorkflowCopy.expectedRouteCount,
  failingCommand: sourceConnectorsReadmeLiveDocsWorkflowCopy.workflowCommand,
  linkSelector: sourceConnectorsReadmeLiveDocsWorkflowCopy.linkSelector,
  mode: sourceConnectorsReadmeLiveDocsWorkflowCopy.mode,
  noMergeCopy:
    "Не мержить, пока Source Connectors README workflow failure guard снова защищает README live docs workflow copy",
  ownerRole: sourceConnectorsReadmeLiveDocsWorkflowCopy.ownerRole,
  readmeWorkflowCommand: sourceConnectorsReadmeLiveDocsWorkflowCopy.workflowCommand,
  repairTargets:
    "/sources,apps/api/README.md#source-connectors-contract,.github/workflows/web-build.yml,apps/web/scripts/smoke.mjs,[data-testid='source-connectors-readme-live-docs-workflow-copy']",
  sourceMarkerSelector: "[data-testid='source-connectors-readme-live-docs-workflow-copy']",
  status: "armed",
  workflowCommand: sourceConnectorsReadmeLiveDocsWorkflowCopy.workflowCommand,
  workflowFailureCommand: sourceConnectorsWorkflowDocsFailureCopy.workflowCommand,
  workflowHref: sourceConnectorsReadmeLiveDocsWorkflowCopy.workflowHref,
  workflowName: sourceConnectorsReadmeLiveDocsWorkflowCopy.workflowName,
  workflowPath: sourceConnectorsReadmeLiveDocsWorkflowCopy.workflowPath,
  checks: [
    ["Symptom", "README live docs workflow copy есть, но failure guard больше не защищает Source Connectors route smoke order"],
    ["Fix order", "сначала восстановить source-connectors-readme-live-docs-workflow-copy, затем route smoke"],
    ["Owner", "Data owner подтверждает connectors copy, API owner подтверждает README anchor, CI owner подтверждает Web build"],
    ["No merge", "не мержить, пока source connectors README workflow failure guard снова не защищает README workflow copy"],
  ],
};

const sourceConnectorsReadmeRenderedRouteFailureCopy = {
  route: sourceConnectorsReadmeWorkflowFailureCopy.route,
  apiRoute: sourceConnectorsReadmeWorkflowFailureCopy.apiRoute,
  command: sourceConnectorsReadmeWorkflowFailureCopy.command,
  connectorIds: sourceConnectorsReadmeWorkflowFailureCopy.connectorIds,
  docsHref: sourceConnectorsReadmeWorkflowFailureCopy.docsHref,
  docsMarkerSelector: sourceConnectorsReadmeWorkflowFailureCopy.docsMarkerSelector,
  expectedConnectorCount: sourceConnectorsReadmeWorkflowFailureCopy.expectedConnectorCount,
  expectedNetworkDisabledCount: sourceConnectorsReadmeWorkflowFailureCopy.expectedNetworkDisabledCount,
  expectedRouteCount: sourceConnectorsReadmeWorkflowFailureCopy.expectedRouteCount,
  failingCommand: sourceConnectorsReadmeWorkflowFailureCopy.command,
  linkSelector: sourceConnectorsReadmeWorkflowFailureCopy.linkSelector,
  mode: sourceConnectorsReadmeWorkflowFailureCopy.mode,
  noMergeCopy:
    "Не мержить, пока rendered routes smoke снова подтверждает Source Connectors README workflow failure guard на живом `/sources`",
  ownerRole: "Data owner + API owner + Docs owner + QA owner",
  repairTargets:
    "/sources,apps/api/README.md#source-connectors-contract,apps/web/scripts/smoke.mjs,[data-testid='source-connectors-readme-workflow-failure-copy']",
  sourceMarkerSelector: "[data-testid='source-connectors-readme-workflow-failure-copy']",
  status: sourceConnectorsReadmeWorkflowFailureCopy.status,
  workflowCommand: sourceConnectorsReadmeWorkflowFailureCopy.workflowCommand,
  workflowFailureCommand: sourceConnectorsReadmeWorkflowFailureCopy.workflowFailureCommand,
  workflowHref: sourceConnectorsReadmeWorkflowFailureCopy.workflowHref,
  workflowName: sourceConnectorsReadmeWorkflowFailureCopy.workflowName,
  workflowPath: sourceConnectorsReadmeWorkflowFailureCopy.workflowPath,
  checks: [
    ["Symptom", "README workflow failure copy есть, но rendered routes smoke больше не видит Source Connectors README guard"],
    ["Fix order", "сначала восстановить source-connectors-readme-workflow-failure-copy, затем route smoke expectations"],
    ["Owner", "Data owner подтверждает README guard, API owner подтверждает README anchor, QA owner подтверждает `/sources`"],
    ["No merge", "не мержить, пока source connectors README rendered-route guard снова не проходит route coverage"],
  ],
};

const sourceConnectorsReadmeWorkflowDocsFailureCopy = {
  route: sourceConnectorsReadmeRenderedRouteFailureCopy.route,
  apiRoute: sourceConnectorsReadmeRenderedRouteFailureCopy.apiRoute,
  command: sourceConnectorsReadmeRenderedRouteFailureCopy.command,
  connectorIds: sourceConnectorsReadmeRenderedRouteFailureCopy.connectorIds,
  docsHref: sourceConnectorsReadmeRenderedRouteFailureCopy.docsHref,
  docsMarkerSelector: sourceConnectorsReadmeRenderedRouteFailureCopy.docsMarkerSelector,
  expectedConnectorCount: sourceConnectorsReadmeRenderedRouteFailureCopy.expectedConnectorCount,
  expectedNetworkDisabledCount: sourceConnectorsReadmeRenderedRouteFailureCopy.expectedNetworkDisabledCount,
  expectedRouteCount: sourceConnectorsReadmeRenderedRouteFailureCopy.expectedRouteCount,
  failingCommand: sourceConnectorsReadmeRenderedRouteFailureCopy.failingCommand,
  linkSelector: sourceConnectorsReadmeRenderedRouteFailureCopy.linkSelector,
  mode: sourceConnectorsReadmeRenderedRouteFailureCopy.mode,
  noMergeCopy:
    "Не мержить, пока Source Connectors README rendered-route guard и workflow docs guard снова согласованы на живом `/sources`",
  ownerRole: "Data owner + API owner + Docs owner + QA owner",
  repairTargets:
    "/sources,apps/api/README.md#source-connectors-contract,.github/workflows/web-build.yml,apps/web/scripts/smoke.mjs,[data-testid='source-connectors-readme-rendered-route-failure-copy'],[data-testid='source-connectors-workflow-docs-failure-copy']",
  sourceMarkerSelector: "[data-testid='source-connectors-readme-rendered-route-failure-copy']",
  status: sourceConnectorsReadmeRenderedRouteFailureCopy.status,
  workflowCommand: sourceConnectorsReadmeRenderedRouteFailureCopy.workflowCommand,
  workflowDocsCommand: sourceConnectorsWorkflowDocsFailureCopy.command,
  workflowDocsFailureCommand: sourceConnectorsWorkflowDocsFailureCopy.failingCommand,
  workflowFailureCommand: sourceConnectorsReadmeRenderedRouteFailureCopy.workflowFailureCommand,
  workflowHref: sourceConnectorsReadmeRenderedRouteFailureCopy.workflowHref,
  workflowName: sourceConnectorsReadmeRenderedRouteFailureCopy.workflowName,
  workflowPath: sourceConnectorsReadmeRenderedRouteFailureCopy.workflowPath,
  checks: [
    ["Symptom", "README rendered-route guard есть, но workflow docs guard больше не связывает Source Connectors README anchor и Web build"],
    ["Fix order", "сначала восстановить source-connectors-readme-rendered-route-failure-copy, затем workflow docs guard"],
    ["Owner", "Data owner подтверждает README guard, API owner подтверждает README anchor, Docs owner подтверждает workflow docs link"],
    ["No merge", "не мержить, пока source connectors README workflow docs guard снова не проходит route coverage"],
  ],
};

const sourceConnectorsReadmeWorkflowDocsRenderedRouteCopy = {
  route: sourceConnectorsReadmeWorkflowDocsFailureCopy.route,
  apiRoute: sourceConnectorsReadmeWorkflowDocsFailureCopy.apiRoute,
  command: sourceConnectorsReadmeWorkflowDocsFailureCopy.command,
  connectorIds: sourceConnectorsReadmeWorkflowDocsFailureCopy.connectorIds,
  docsHref: sourceConnectorsReadmeWorkflowDocsFailureCopy.docsHref,
  docsMarkerSelector: sourceConnectorsReadmeWorkflowDocsFailureCopy.docsMarkerSelector,
  expectedConnectorCount: sourceConnectorsReadmeWorkflowDocsFailureCopy.expectedConnectorCount,
  expectedNetworkDisabledCount: sourceConnectorsReadmeWorkflowDocsFailureCopy.expectedNetworkDisabledCount,
  expectedRouteCount: sourceConnectorsReadmeWorkflowDocsFailureCopy.expectedRouteCount,
  failingCommand: sourceConnectorsReadmeWorkflowDocsFailureCopy.command,
  linkSelector: sourceConnectorsReadmeWorkflowDocsFailureCopy.linkSelector,
  mode: sourceConnectorsReadmeWorkflowDocsFailureCopy.mode,
  noMergeCopy:
    "Не мержить, пока rendered routes smoke снова подтверждает Source Connectors README workflow docs guard на живом `/sources`",
  ownerRole: "Data owner + API owner + Docs owner + QA owner",
  repairTargets:
    "/sources,apps/api/README.md#source-connectors-contract,.github/workflows/web-build.yml,apps/web/scripts/smoke.mjs,[data-testid='source-connectors-readme-workflow-docs-failure-copy']",
  sourceMarkerSelector: "[data-testid='source-connectors-readme-workflow-docs-failure-copy']",
  status: sourceConnectorsReadmeWorkflowDocsFailureCopy.status,
  workflowCommand: sourceConnectorsReadmeWorkflowDocsFailureCopy.workflowCommand,
  workflowDocsCommand: sourceConnectorsReadmeWorkflowDocsFailureCopy.workflowDocsCommand,
  workflowDocsFailureCommand: sourceConnectorsReadmeWorkflowDocsFailureCopy.workflowDocsFailureCommand,
  workflowFailureCommand: sourceConnectorsReadmeWorkflowDocsFailureCopy.workflowFailureCommand,
  workflowHref: sourceConnectorsReadmeWorkflowDocsFailureCopy.workflowHref,
  workflowName: sourceConnectorsReadmeWorkflowDocsFailureCopy.workflowName,
  workflowPath: sourceConnectorsReadmeWorkflowDocsFailureCopy.workflowPath,
  checks: [
    ["Symptom", "README workflow docs guard есть, но rendered routes smoke больше не видит Source Connectors workflow docs safety copy"],
    ["Fix order", "сначала восстановить source-connectors-readme-workflow-docs-failure-copy, затем route smoke expectations"],
    ["Owner", "Data owner подтверждает README guard, API owner подтверждает README anchor, QA owner подтверждает `/sources`"],
    ["No merge", "не мержить, пока source connectors README workflow docs rendered-route guard снова не проходит route coverage"],
  ],
};

const sourceConnectorsReadmeWorkflowDocsBrowserLoopCopy = {
  route: sourceConnectorsReadmeWorkflowDocsRenderedRouteCopy.route,
  apiRoute: sourceConnectorsReadmeWorkflowDocsRenderedRouteCopy.apiRoute,
  browserLoopSelector: "[data-testid='source-connectors-readme-workflow-docs-rendered-route-copy']",
  browserUrl: "/sources",
  command: sourceConnectorsReadmeWorkflowDocsRenderedRouteCopy.command,
  connectorIds: sourceConnectorsReadmeWorkflowDocsRenderedRouteCopy.connectorIds,
  consoleLevels: "error,warn",
  docsHref: sourceConnectorsReadmeWorkflowDocsRenderedRouteCopy.docsHref,
  docsMarkerSelector: sourceConnectorsReadmeWorkflowDocsRenderedRouteCopy.docsMarkerSelector,
  expectedConnectorCount: sourceConnectorsReadmeWorkflowDocsRenderedRouteCopy.expectedConnectorCount,
  expectedNetworkDisabledCount: sourceConnectorsReadmeWorkflowDocsRenderedRouteCopy.expectedNetworkDisabledCount,
  expectedRouteCount: sourceConnectorsReadmeWorkflowDocsRenderedRouteCopy.expectedRouteCount,
  linkSelector: "[data-testid='source-connectors-readme-workflow-docs-workflow-anchor']",
  mode: sourceConnectorsReadmeWorkflowDocsRenderedRouteCopy.mode,
  noMergeCopy:
    "Не мержить, пока Browser QA снова подтверждает Source Connectors README workflow docs rendered-route guard на живом `/sources`",
  ownerRole: "Data owner + API owner + Docs owner + QA owner",
  repairTargets:
    "/sources,apps/web/scripts/smoke.mjs,[data-testid='source-connectors-readme-workflow-docs-rendered-route-copy'],Browser DOM QA",
  screenshotRequired: "true",
  sourceMarkerSelector: "[data-testid='source-connectors-readme-workflow-docs-rendered-route-copy']",
  status: sourceConnectorsReadmeWorkflowDocsRenderedRouteCopy.status,
  workflowCommand: sourceConnectorsReadmeWorkflowDocsRenderedRouteCopy.workflowCommand,
  workflowDocsCommand: sourceConnectorsReadmeWorkflowDocsRenderedRouteCopy.workflowDocsCommand,
  workflowDocsFailureCommand: sourceConnectorsReadmeWorkflowDocsRenderedRouteCopy.workflowDocsFailureCommand,
  workflowFailureCommand: sourceConnectorsReadmeWorkflowDocsRenderedRouteCopy.workflowFailureCommand,
  workflowHref: sourceConnectorsReadmeWorkflowDocsRenderedRouteCopy.workflowHref,
  workflowName: sourceConnectorsReadmeWorkflowDocsRenderedRouteCopy.workflowName,
  workflowPath: sourceConnectorsReadmeWorkflowDocsRenderedRouteCopy.workflowPath,
  checks: [
    ["Page identity", "Browser открывает `/sources` и видит ASTS app.site.ru без framework overlay"],
    ["DOM", "Browser DOM находит source-connectors-readme-workflow-docs-rendered-route-copy ровно один раз"],
    ["Workflow link", "scoped link ведет в Web build GitHub Actions workflow"],
    ["Console", "Browser console не содержит error/warn перед merge"],
  ],
};

const sourceConnectorsReadmeWorkflowDocsPrCheckCopy = {
  route: sourceConnectorsReadmeWorkflowDocsBrowserLoopCopy.route,
  apiRoute: sourceConnectorsReadmeWorkflowDocsBrowserLoopCopy.apiRoute,
  branch: "codex/app-site-shell",
  baseBranch: "main",
  command: "gh pr checks 17 --watch --interval 10",
  connectorIds: sourceConnectorsReadmeWorkflowDocsBrowserLoopCopy.connectorIds,
  docsHref: sourceConnectorsReadmeWorkflowDocsBrowserLoopCopy.docsHref,
  expectedCheckGroups: ["Web build", "API smoke", "Shared validation"],
  expectedConclusion: "SUCCESS",
  expectedMergeState: "CLEAN",
  expectedPrNumber: "17",
  expectedRouteCount: sourceConnectorsReadmeWorkflowDocsBrowserLoopCopy.expectedRouteCount,
  linkSelector: "[data-testid='source-connectors-readme-workflow-docs-pr-anchor']",
  mode: sourceConnectorsReadmeWorkflowDocsBrowserLoopCopy.mode,
  noMergeCopy:
    "Не мержить, пока PR #17 снова показывает CLEAN и зеленые Web build, API smoke и Shared validation checks для Source Connectors README workflow docs guard",
  ownerRole: "Data owner + API owner + Docs owner + Release owner",
  prHref: "https://github.com/info14fourteen-creator/ASTS/pull/17",
  repairTargets:
    "PR #17,gh pr checks 17,.github/workflows/web-build.yml,apps/web/scripts/smoke.mjs,/sources",
  sourceMarkerSelector: "[data-testid='source-connectors-readme-workflow-docs-browser-loop-copy']",
  status: sourceConnectorsReadmeWorkflowDocsBrowserLoopCopy.status,
  workflowHref: sourceConnectorsReadmeWorkflowDocsBrowserLoopCopy.workflowHref,
  workflowName: sourceConnectorsReadmeWorkflowDocsBrowserLoopCopy.workflowName,
  workflowPath: sourceConnectorsReadmeWorkflowDocsBrowserLoopCopy.workflowPath,
  checks: [
    ["PR", "PR #17 остается на codex/app-site-shell -> main и mergeStateStatus CLEAN"],
    ["Checks", "gh pr checks 17 подтверждает Web build, API smoke и Shared validation SUCCESS"],
    ["Route guard", "route smoke продолжает видеть Source Connectors README workflow docs browser-loop copy"],
    ["No merge", "не мержить, пока PR-check guard снова не подтверждает clean rollup"],
  ],
};

const sourceConnectorsReadmeWorkflowDocsMergeStateCopy = {
  route: sourceConnectorsReadmeWorkflowDocsPrCheckCopy.route,
  apiRoute: sourceConnectorsReadmeWorkflowDocsPrCheckCopy.apiRoute,
  branch: sourceConnectorsReadmeWorkflowDocsPrCheckCopy.branch,
  baseBranch: sourceConnectorsReadmeWorkflowDocsPrCheckCopy.baseBranch,
  command: "gh pr view 17 --json headRefName,baseRefName,mergeStateStatus,statusCheckRollup",
  connectorIds: sourceConnectorsReadmeWorkflowDocsPrCheckCopy.connectorIds,
  docsHref: sourceConnectorsReadmeWorkflowDocsPrCheckCopy.docsHref,
  expectedCheckGroups: sourceConnectorsReadmeWorkflowDocsPrCheckCopy.expectedCheckGroups,
  expectedConclusion: sourceConnectorsReadmeWorkflowDocsPrCheckCopy.expectedConclusion,
  expectedMergeState: sourceConnectorsReadmeWorkflowDocsPrCheckCopy.expectedMergeState,
  expectedPrNumber: sourceConnectorsReadmeWorkflowDocsPrCheckCopy.expectedPrNumber,
  expectedRouteCount: sourceConnectorsReadmeWorkflowDocsPrCheckCopy.expectedRouteCount,
  linkSelector: "[data-testid='source-connectors-readme-workflow-docs-merge-anchor']",
  mode: sourceConnectorsReadmeWorkflowDocsPrCheckCopy.mode,
  noMergeCopy:
    "Не мержить, пока PR #17 снова показывает mergeStateStatus CLEAN для Source Connectors README workflow docs guard",
  ownerRole: "Data owner + API owner + Release owner",
  prHref: sourceConnectorsReadmeWorkflowDocsPrCheckCopy.prHref,
  repairTargets:
    "PR #17,gh pr view 17 --json mergeStateStatus,statusCheckRollup,apps/web/scripts/smoke.mjs,/sources",
  sourceMarkerSelector: "[data-testid='source-connectors-readme-workflow-docs-pr-check-copy']",
  status: sourceConnectorsReadmeWorkflowDocsPrCheckCopy.status,
  workflowHref: sourceConnectorsReadmeWorkflowDocsPrCheckCopy.workflowHref,
  workflowName: sourceConnectorsReadmeWorkflowDocsPrCheckCopy.workflowName,
  workflowPath: sourceConnectorsReadmeWorkflowDocsPrCheckCopy.workflowPath,
  checks: [
    ["Merge state", "PR #17 mergeStateStatus остается CLEAN перед merge"],
    ["Branch", "headRefName codex/app-site-shell и baseRefName main не меняются"],
    ["Checks", "statusCheckRollup остается SUCCESS для Web build, API smoke и Shared validation"],
    ["No merge", "не мержить, пока merge-state guard снова не подтверждает clean PR rollup"],
  ],
};

const sourceConnectorsReadmeWorkflowDocsReleaseNoteCopy = {
  route: sourceConnectorsReadmeWorkflowDocsMergeStateCopy.route,
  apiRoute: sourceConnectorsReadmeWorkflowDocsMergeStateCopy.apiRoute,
  branch: sourceConnectorsReadmeWorkflowDocsMergeStateCopy.branch,
  baseBranch: sourceConnectorsReadmeWorkflowDocsMergeStateCopy.baseBranch,
  command: "gh pr view 17 --json url,headRefName,baseRefName,mergeStateStatus,statusCheckRollup",
  connectorIds: sourceConnectorsReadmeWorkflowDocsMergeStateCopy.connectorIds,
  docsHref: sourceConnectorsReadmeWorkflowDocsMergeStateCopy.docsHref,
  expectedCheckGroups: sourceConnectorsReadmeWorkflowDocsMergeStateCopy.expectedCheckGroups,
  expectedConclusion: sourceConnectorsReadmeWorkflowDocsMergeStateCopy.expectedConclusion,
  expectedMergeState: sourceConnectorsReadmeWorkflowDocsMergeStateCopy.expectedMergeState,
  expectedPrNumber: sourceConnectorsReadmeWorkflowDocsMergeStateCopy.expectedPrNumber,
  expectedRouteCount: sourceConnectorsReadmeWorkflowDocsMergeStateCopy.expectedRouteCount,
  linkSelector: "[data-testid='source-connectors-readme-workflow-docs-release-anchor']",
  mode: sourceConnectorsReadmeWorkflowDocsMergeStateCopy.mode,
  noMergeCopy:
    "Не выпускать release notes, пока PR #17 снова показывает CLEAN и зеленый statusCheckRollup для Source Connectors README workflow docs guard",
  ownerRole: "Data owner + API owner + Docs owner + Release owner",
  prHref: sourceConnectorsReadmeWorkflowDocsMergeStateCopy.prHref,
  releaseNote:
    "Source Connectors README workflow docs guard covered by browser-loop, PR-check and merge-state copy on `/sources`.",
  releaseScope: "Source Connectors README workflow docs",
  repairTargets:
    "PR #17,release notes,apps/web/scripts/smoke.mjs,/sources,[data-testid='source-connectors-readme-workflow-docs-merge-state-copy']",
  sourceMarkerSelector: "[data-testid='source-connectors-readme-workflow-docs-merge-state-copy']",
  status: sourceConnectorsReadmeWorkflowDocsMergeStateCopy.status,
  workflowHref: sourceConnectorsReadmeWorkflowDocsMergeStateCopy.workflowHref,
  workflowName: sourceConnectorsReadmeWorkflowDocsMergeStateCopy.workflowName,
  workflowPath: sourceConnectorsReadmeWorkflowDocsMergeStateCopy.workflowPath,
  checks: [
    ["Release note", "release notes явно упоминают Source Connectors README workflow docs guard"],
    ["Evidence", "handoff ссылается на PR #17, CLEAN mergeStateStatus и зеленый statusCheckRollup"],
    ["Scope", "handoff оставляет `/sources`, `/v1/sources/connectors` и Web build workflow в одном контексте"],
    ["No merge", "не выпускать release notes, пока release-note guard снова не подтверждает clean PR evidence"],
  ],
};

const sourceConnectorsReadmeWorkflowDocsFinalQaCopy = {
  route: sourceConnectorsReadmeWorkflowDocsReleaseNoteCopy.route,
  apiRoute: sourceConnectorsReadmeWorkflowDocsReleaseNoteCopy.apiRoute,
  branch: sourceConnectorsReadmeWorkflowDocsReleaseNoteCopy.branch,
  baseBranch: sourceConnectorsReadmeWorkflowDocsReleaseNoteCopy.baseBranch,
  command:
    "npm run build && npm run smoke -- --url http://127.0.0.1:4177/ && gh pr view 17 --json mergeStateStatus,statusCheckRollup",
  connectorIds: sourceConnectorsReadmeWorkflowDocsReleaseNoteCopy.connectorIds,
  docsHref: sourceConnectorsReadmeWorkflowDocsReleaseNoteCopy.docsHref,
  expectedCheckGroups: sourceConnectorsReadmeWorkflowDocsReleaseNoteCopy.expectedCheckGroups,
  expectedConclusion: sourceConnectorsReadmeWorkflowDocsReleaseNoteCopy.expectedConclusion,
  expectedMergeState: sourceConnectorsReadmeWorkflowDocsReleaseNoteCopy.expectedMergeState,
  expectedPrNumber: sourceConnectorsReadmeWorkflowDocsReleaseNoteCopy.expectedPrNumber,
  expectedRouteCount: sourceConnectorsReadmeWorkflowDocsReleaseNoteCopy.expectedRouteCount,
  finalQaScope: "Source Connectors README workflow docs",
  linkSelector: "[data-testid='source-connectors-readme-workflow-docs-final-qa-anchor']",
  mode: sourceConnectorsReadmeWorkflowDocsReleaseNoteCopy.mode,
  noMergeCopy:
    "Не закрывать Source Connectors README workflow docs handoff, пока final QA снова не подтверждает build, smoke, Browser DOM и CLEAN PR evidence",
  ownerRole: "Data owner + API owner + QA owner + Release owner",
  prHref: sourceConnectorsReadmeWorkflowDocsReleaseNoteCopy.prHref,
  releaseNote: sourceConnectorsReadmeWorkflowDocsReleaseNoteCopy.releaseNote,
  releaseScope: sourceConnectorsReadmeWorkflowDocsReleaseNoteCopy.releaseScope,
  repairTargets:
    "PR #17,apps/web/scripts/smoke.mjs,/sources,Browser DOM QA,[data-testid='source-connectors-readme-workflow-docs-release-note-copy']",
  sourceMarkerSelector: "[data-testid='source-connectors-readme-workflow-docs-release-note-copy']",
  status: sourceConnectorsReadmeWorkflowDocsReleaseNoteCopy.status,
  workflowHref: sourceConnectorsReadmeWorkflowDocsReleaseNoteCopy.workflowHref,
  workflowName: sourceConnectorsReadmeWorkflowDocsReleaseNoteCopy.workflowName,
  workflowPath: sourceConnectorsReadmeWorkflowDocsReleaseNoteCopy.workflowPath,
  checks: [
    ["Build", "production build проходит перед финальным handoff"],
    ["Smoke", "route smoke видит Source Connectors README workflow docs release-note guard"],
    ["Browser QA", "Browser DOM находит final QA и release-note guard без framework overlay и console errors"],
    ["PR", "PR #17 остается CLEAN с зеленым statusCheckRollup перед закрытием handoff"],
  ],
};

const sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy = {
  route: sourceConnectorsReadmeWorkflowDocsFinalQaCopy.route,
  apiRoute: sourceConnectorsReadmeWorkflowDocsFinalQaCopy.apiRoute,
  branch: sourceConnectorsReadmeWorkflowDocsFinalQaCopy.branch,
  baseBranch: sourceConnectorsReadmeWorkflowDocsFinalQaCopy.baseBranch,
  command: sourceConnectorsReadmeWorkflowDocsFinalQaCopy.command,
  connectorIds: sourceConnectorsReadmeWorkflowDocsFinalQaCopy.connectorIds,
  docsHref: sourceConnectorsReadmeWorkflowDocsFinalQaCopy.docsHref,
  expectedCheckGroups: sourceConnectorsReadmeWorkflowDocsFinalQaCopy.expectedCheckGroups,
  expectedConclusion: sourceConnectorsReadmeWorkflowDocsFinalQaCopy.expectedConclusion,
  expectedMergeState: sourceConnectorsReadmeWorkflowDocsFinalQaCopy.expectedMergeState,
  expectedPrNumber: sourceConnectorsReadmeWorkflowDocsFinalQaCopy.expectedPrNumber,
  expectedRouteCount: sourceConnectorsReadmeWorkflowDocsFinalQaCopy.expectedRouteCount,
  finalQaScope: sourceConnectorsReadmeWorkflowDocsFinalQaCopy.finalQaScope,
  handoffOwners: ["Data owner", "API owner", "QA owner", "Release owner"],
  handoffScope: "Source Connectors README workflow docs owner handoff",
  linkSelector: "[data-testid='source-connectors-readme-workflow-docs-owner-handoff-anchor']",
  mode: sourceConnectorsReadmeWorkflowDocsFinalQaCopy.mode,
  noMergeCopy:
    "Не закрывать Source Connectors README workflow docs owner handoff, пока Data, API, QA и Release owners не приняли final QA evidence",
  ownerRole: sourceConnectorsReadmeWorkflowDocsFinalQaCopy.ownerRole,
  prHref: sourceConnectorsReadmeWorkflowDocsFinalQaCopy.prHref,
  releaseNote: sourceConnectorsReadmeWorkflowDocsFinalQaCopy.releaseNote,
  releaseScope: sourceConnectorsReadmeWorkflowDocsFinalQaCopy.releaseScope,
  repairTargets:
    "PR #17,owner handoff,apps/web/scripts/smoke.mjs,/sources,[data-testid='source-connectors-readme-workflow-docs-final-qa-copy']",
  sourceMarkerSelector: "[data-testid='source-connectors-readme-workflow-docs-final-qa-copy']",
  status: sourceConnectorsReadmeWorkflowDocsFinalQaCopy.status,
  workflowHref: sourceConnectorsReadmeWorkflowDocsFinalQaCopy.workflowHref,
  workflowName: sourceConnectorsReadmeWorkflowDocsFinalQaCopy.workflowName,
  workflowPath: sourceConnectorsReadmeWorkflowDocsFinalQaCopy.workflowPath,
  checks: [
    ["Data", "Data owner принимает connector ids и contract_only mode"],
    ["API", "API owner принимает `/v1/sources/connectors` и README contract link"],
    ["QA", "QA owner принимает build, route smoke и Browser DOM QA evidence"],
    ["Release", "Release owner принимает PR #17 CLEAN и release note text"],
  ],
};

const sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy = {
  route: sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.route,
  apiRoute: sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.apiRoute,
  branch: sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.branch,
  baseBranch: sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.baseBranch,
  command: sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.command,
  checklistOwners: sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.handoffOwners,
  checklistScope: "Source Connectors README workflow docs release checklist",
  connectorIds: sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.connectorIds,
  docsHref: sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.docsHref,
  expectedCheckGroups: sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.expectedCheckGroups,
  expectedConclusion: sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.expectedConclusion,
  expectedMergeState: sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.expectedMergeState,
  expectedPrNumber: sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.expectedPrNumber,
  expectedRouteCount: sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.expectedRouteCount,
  finalQaScope: sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.finalQaScope,
  handoffScope: sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.handoffScope,
  linkSelector: "[data-testid='source-connectors-readme-workflow-docs-release-checklist-anchor']",
  mode: sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.mode,
  noMergeCopy:
    "Не выпускать Source Connectors README workflow docs release, пока Data, API, QA и Release owners не приняли checklist evidence",
  ownerRole: sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.ownerRole,
  prHref: sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.prHref,
  releaseNote: sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.releaseNote,
  releaseScope: sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.releaseScope,
  repairTargets:
    "PR #17,release checklist,apps/web/scripts/smoke.mjs,/sources,[data-testid='source-connectors-readme-workflow-docs-owner-handoff-copy']",
  sourceMarkerSelector: "[data-testid='source-connectors-readme-workflow-docs-owner-handoff-copy']",
  status: sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.status,
  workflowHref: sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.workflowHref,
  workflowName: sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.workflowName,
  workflowPath: sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.workflowPath,
  checks: [
    ["Data", "Data owner отмечает connector ids, contract_only mode и source contract docs"],
    ["API", "API owner отмечает `/v1/sources/connectors`, README contract link и smoke coverage"],
    ["QA", "QA owner отмечает build, route smoke и Browser DOM QA evidence"],
    ["Release", "Release owner отмечает PR #17 CLEAN, release note и owner handoff acceptance"],
  ],
};

const sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy = {
  route: sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.route,
  apiRoute: sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.apiRoute,
  branch: sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.branch,
  baseBranch: sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.baseBranch,
  command: sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.command,
  approvalOwners: sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.checklistOwners,
  approvalScope: "Source Connectors README workflow docs release approval",
  checklistScope: sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.checklistScope,
  connectorIds: sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.connectorIds,
  docsHref: sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.docsHref,
  expectedCheckGroups: sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.expectedCheckGroups,
  expectedConclusion: sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.expectedConclusion,
  expectedMergeState: sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.expectedMergeState,
  expectedPrNumber: sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.expectedPrNumber,
  expectedRouteCount: sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.expectedRouteCount,
  finalQaScope: sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.finalQaScope,
  handoffScope: sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.handoffScope,
  linkSelector: "[data-testid='source-connectors-readme-workflow-docs-release-approval-anchor']",
  mode: sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.mode,
  noMergeCopy:
    "Не утверждать Source Connectors README workflow docs release, пока Data, API, QA и Release owners не приняли approval evidence",
  ownerRole: sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.ownerRole,
  prHref: sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.prHref,
  releaseNote: sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.releaseNote,
  releaseScope: sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.releaseScope,
  repairTargets:
    "PR #17,release approval,apps/web/scripts/smoke.mjs,/sources,[data-testid='source-connectors-readme-workflow-docs-release-checklist-copy']",
  sourceMarkerSelector: "[data-testid='source-connectors-readme-workflow-docs-release-checklist-copy']",
  status: sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.status,
  workflowHref: sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.workflowHref,
  workflowName: sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.workflowName,
  workflowPath: sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.workflowPath,
  checks: [
    ["Data", "Data owner утверждает connector ids, contract_only mode и source contract docs"],
    ["API", "API owner утверждает `/v1/sources/connectors`, README contract link и smoke coverage"],
    ["QA", "QA owner утверждает build, route smoke и Browser DOM QA evidence"],
    ["Release", "Release owner утверждает PR #17 CLEAN, release note и checklist acceptance"],
  ],
};

const sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy = {
  route: sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.route,
  apiRoute: sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.apiRoute,
  branch: sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.branch,
  baseBranch: sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.baseBranch,
  command: sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.command,
  approvalScope: sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.approvalScope,
  connectorIds: sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.connectorIds,
  docsHref: sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.docsHref,
  expectedCheckGroups: sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.expectedCheckGroups,
  expectedConclusion: sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.expectedConclusion,
  expectedMergeState: sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.expectedMergeState,
  expectedPrNumber: sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.expectedPrNumber,
  expectedRouteCount: sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.expectedRouteCount,
  finalQaScope: sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.finalQaScope,
  handoffScope: sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.handoffScope,
  linkSelector: "[data-testid='source-connectors-readme-workflow-docs-release-signoff-anchor']",
  mode: sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.mode,
  noMergeCopy:
    "Не подписывать Source Connectors README workflow docs release, пока Data, API, QA и Release owners не приняли signoff evidence",
  ownerRole: sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.ownerRole,
  prHref: sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.prHref,
  releaseNote: sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.releaseNote,
  releaseScope: sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.releaseScope,
  repairTargets:
    "PR #17,release signoff,apps/web/scripts/smoke.mjs,/sources,[data-testid='source-connectors-readme-workflow-docs-release-approval-copy']",
  signoffOwners: sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.approvalOwners,
  signoffScope: "Source Connectors README workflow docs release signoff",
  sourceMarkerSelector: "[data-testid='source-connectors-readme-workflow-docs-release-approval-copy']",
  status: sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.status,
  workflowHref: sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.workflowHref,
  workflowName: sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.workflowName,
  workflowPath: sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.workflowPath,
  checks: [
    ["Data", "Data owner подписывает connector ids, contract_only mode и source contract docs"],
    ["API", "API owner подписывает `/v1/sources/connectors`, README contract link и smoke coverage"],
    ["QA", "QA owner подписывает build, route smoke и Browser DOM QA evidence"],
    ["Release", "Release owner подписывает PR #17 CLEAN, release note и approval acceptance"],
  ],
};

const sourceConnectorsReadmeWorkflowDocsArchiveCopy = {
  route: sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.route,
  apiRoute: sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.apiRoute,
  branch: sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.branch,
  baseBranch: sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.baseBranch,
  command: sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.command,
  approvalScope: sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.approvalScope,
  connectorIds: sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.connectorIds,
  docsHref: sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.docsHref,
  expectedCheckGroups: sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.expectedCheckGroups,
  expectedConclusion: sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.expectedConclusion,
  expectedMergeState: sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.expectedMergeState,
  expectedPrNumber: sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.expectedPrNumber,
  expectedRouteCount: sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.expectedRouteCount,
  finalQaScope: sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.finalQaScope,
  handoffScope: sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.handoffScope,
  linkSelector: "[data-testid='source-connectors-readme-workflow-docs-archive-anchor']",
  mode: sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.mode,
  noMergeCopy:
    "Не архивировать Source Connectors README workflow docs release, пока archive evidence не связывает signoff, release note, CLEAN PR и smoke coverage",
  ownerRole: sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.ownerRole,
  prHref: sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.prHref,
  releaseNote: sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.releaseNote,
  releaseScope: sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.releaseScope,
  repairTargets:
    "PR #17,release archive,apps/web/scripts/smoke.mjs,/sources,[data-testid='source-connectors-readme-workflow-docs-release-signoff-copy']",
  signoffOwners: sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.signoffOwners,
  signoffScope: sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.signoffScope,
  archiveOwners: sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.signoffOwners,
  archiveScope: "Source Connectors README workflow docs archive",
  sourceMarkerSelector: "[data-testid='source-connectors-readme-workflow-docs-release-signoff-copy']",
  status: sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.status,
  workflowHref: sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.workflowHref,
  workflowName: sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.workflowName,
  workflowPath: sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.workflowPath,
  checks: [
    ["Data", "Data owner архивирует connector ids, contract_only mode и source contract docs evidence"],
    ["API", "API owner архивирует `/v1/sources/connectors`, README contract link и smoke coverage"],
    ["QA", "QA owner архивирует build, route smoke и Browser DOM QA evidence"],
    ["Release", "Release owner архивирует PR #17 CLEAN, release note и signoff acceptance"],
  ],
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
          className="panel source-quarantine-browser-loop-panel"
          data-api-route={sourceConnectorsWorkflowDocsFailureCopy.apiRoute}
          data-command={sourceConnectorsWorkflowDocsFailureCopy.command}
          data-connector-ids={sourceConnectorsWorkflowDocsFailureCopy.connectorIds.join(",")}
          data-docs-href={sourceConnectorsWorkflowDocsFailureCopy.docsHref}
          data-docs-marker-selector={sourceConnectorsWorkflowDocsFailureCopy.docsMarkerSelector}
          data-expected-connector-count={sourceConnectorsWorkflowDocsFailureCopy.expectedConnectorCount}
          data-expected-network-disabled-count={sourceConnectorsWorkflowDocsFailureCopy.expectedNetworkDisabledCount}
          data-expected-route-count={sourceConnectorsWorkflowDocsFailureCopy.expectedRouteCount}
          data-failing-command={sourceConnectorsWorkflowDocsFailureCopy.failingCommand}
          data-link-selector={sourceConnectorsWorkflowDocsFailureCopy.linkSelector}
          data-mode={sourceConnectorsWorkflowDocsFailureCopy.mode}
          data-no-merge-copy={sourceConnectorsWorkflowDocsFailureCopy.noMergeCopy}
          data-owner-role={sourceConnectorsWorkflowDocsFailureCopy.ownerRole}
          data-repair-targets={sourceConnectorsWorkflowDocsFailureCopy.repairTargets}
          data-route={sourceConnectorsWorkflowDocsFailureCopy.route}
          data-source-marker-selector={sourceConnectorsWorkflowDocsFailureCopy.sourceMarkerSelector}
          data-testid="source-connectors-workflow-docs-failure-copy"
          data-workflow-command={sourceConnectorsWorkflowDocsFailureCopy.workflowCommand}
          data-workflow-href={sourceConnectorsWorkflowDocsFailureCopy.workflowHref}
          data-workflow-name={sourceConnectorsWorkflowDocsFailureCopy.workflowName}
          data-workflow-path={sourceConnectorsWorkflowDocsFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source connectors workflow docs failure copy</p>
              <h2>Что делать, если source connectors workflow docs drift упал</h2>
            </div>
            <a className="primary-link" href={sourceConnectorsWorkflowDocsFailureCopy.workflowHref}>
              {sourceConnectorsWorkflowDocsFailureCopy.workflowName}
            </a>
          </div>
          <div className="source-quarantine-browser-loop-grid">
            {sourceConnectorsWorkflowDocsFailureCopy.checks.map(([title, text]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? sourceConnectorsWorkflowDocsFailureCopy.noMergeCopy
                    : sourceConnectorsWorkflowDocsFailureCopy.workflowCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel source-quarantine-browser-loop-panel"
          data-api-route={sourceConnectorsLiveDocsWorkflowCopy.apiRoute}
          data-command={sourceConnectorsLiveDocsWorkflowCopy.command}
          data-connector-ids={sourceConnectorsLiveDocsWorkflowCopy.connectorIds.join(",")}
          data-docs-href={sourceConnectorsLiveDocsWorkflowCopy.docsHref}
          data-docs-marker-selector={sourceConnectorsLiveDocsWorkflowCopy.docsMarkerSelector}
          data-expected-connector-count={sourceConnectorsLiveDocsWorkflowCopy.expectedConnectorCount}
          data-expected-network-disabled-count={sourceConnectorsLiveDocsWorkflowCopy.expectedNetworkDisabledCount}
          data-expected-route-count={sourceConnectorsLiveDocsWorkflowCopy.expectedRouteCount}
          data-failing-command={sourceConnectorsLiveDocsWorkflowCopy.failingCommand}
          data-link-selector={sourceConnectorsLiveDocsWorkflowCopy.linkSelector}
          data-mode={sourceConnectorsLiveDocsWorkflowCopy.mode}
          data-no-merge-copy={sourceConnectorsLiveDocsWorkflowCopy.noMergeCopy}
          data-owner-role={sourceConnectorsLiveDocsWorkflowCopy.ownerRole}
          data-repair-targets={sourceConnectorsLiveDocsWorkflowCopy.repairTargets}
          data-route={sourceConnectorsLiveDocsWorkflowCopy.route}
          data-source-marker-selector={sourceConnectorsLiveDocsWorkflowCopy.sourceMarkerSelector}
          data-testid="source-connectors-live-docs-workflow-copy"
          data-workflow-command={sourceConnectorsLiveDocsWorkflowCopy.workflowCommand}
          data-workflow-href={sourceConnectorsLiveDocsWorkflowCopy.workflowHref}
          data-workflow-name={sourceConnectorsLiveDocsWorkflowCopy.workflowName}
          data-workflow-path={sourceConnectorsLiveDocsWorkflowCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source connectors live docs workflow copy</p>
              <h2>Что делать, если source connectors live docs workflow drift упал</h2>
            </div>
            <a className="primary-link" href={sourceConnectorsLiveDocsWorkflowCopy.workflowHref}>
              {sourceConnectorsLiveDocsWorkflowCopy.workflowName}
            </a>
          </div>
          <div className="source-quarantine-browser-loop-grid">
            {sourceConnectorsLiveDocsWorkflowCopy.checks.map(([title, text]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? sourceConnectorsLiveDocsWorkflowCopy.noMergeCopy
                    : sourceConnectorsLiveDocsWorkflowCopy.workflowCommand}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel source-quarantine-browser-loop-panel"
          data-api-route={sourceConnectorsReadmeLiveDocsWorkflowCopy.apiRoute}
          data-command={sourceConnectorsReadmeLiveDocsWorkflowCopy.command}
          data-connector-ids={sourceConnectorsReadmeLiveDocsWorkflowCopy.connectorIds.join(",")}
          data-docs-href={sourceConnectorsReadmeLiveDocsWorkflowCopy.docsHref}
          data-docs-marker-selector={sourceConnectorsReadmeLiveDocsWorkflowCopy.docsMarkerSelector}
          data-expected-connector-count={sourceConnectorsReadmeLiveDocsWorkflowCopy.expectedConnectorCount}
          data-expected-network-disabled-count={sourceConnectorsReadmeLiveDocsWorkflowCopy.expectedNetworkDisabledCount}
          data-expected-route-count={sourceConnectorsReadmeLiveDocsWorkflowCopy.expectedRouteCount}
          data-failing-command={sourceConnectorsReadmeLiveDocsWorkflowCopy.failingCommand}
          data-link-selector={sourceConnectorsReadmeLiveDocsWorkflowCopy.linkSelector}
          data-mode={sourceConnectorsReadmeLiveDocsWorkflowCopy.mode}
          data-no-merge-copy={sourceConnectorsReadmeLiveDocsWorkflowCopy.noMergeCopy}
          data-owner-role={sourceConnectorsReadmeLiveDocsWorkflowCopy.ownerRole}
          data-repair-targets={sourceConnectorsReadmeLiveDocsWorkflowCopy.repairTargets}
          data-route={sourceConnectorsReadmeLiveDocsWorkflowCopy.route}
          data-source-marker-selector={sourceConnectorsReadmeLiveDocsWorkflowCopy.sourceMarkerSelector}
          data-testid="source-connectors-readme-live-docs-workflow-copy"
          data-workflow-command={sourceConnectorsReadmeLiveDocsWorkflowCopy.workflowCommand}
          data-workflow-href={sourceConnectorsReadmeLiveDocsWorkflowCopy.workflowHref}
          data-workflow-name={sourceConnectorsReadmeLiveDocsWorkflowCopy.workflowName}
          data-workflow-path={sourceConnectorsReadmeLiveDocsWorkflowCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source connectors README live docs workflow copy</p>
              <h2>Что делать, если source connectors README live docs workflow drift упал</h2>
            </div>
            <a className="primary-link" href={sourceConnectorsReadmeLiveDocsWorkflowCopy.workflowHref}>
              {sourceConnectorsReadmeLiveDocsWorkflowCopy.workflowName}
            </a>
          </div>
          <div className="source-quarantine-browser-loop-grid">
            {sourceConnectorsReadmeLiveDocsWorkflowCopy.checks.map(([title, text]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? "No merge"
                    : title === "Owner"
                      ? "Data + API + CI"
                      : title === "Fix order"
                        ? "docs -> live guard"
                        : "README link"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel source-quarantine-browser-loop-panel"
          data-api-route={sourceConnectorsReadmeWorkflowFailureCopy.apiRoute}
          data-command={sourceConnectorsReadmeWorkflowFailureCopy.command}
          data-connector-ids={sourceConnectorsReadmeWorkflowFailureCopy.connectorIds.join(",")}
          data-docs-href={sourceConnectorsReadmeWorkflowFailureCopy.docsHref}
          data-docs-marker-selector={sourceConnectorsReadmeWorkflowFailureCopy.docsMarkerSelector}
          data-expected-connector-count={sourceConnectorsReadmeWorkflowFailureCopy.expectedConnectorCount}
          data-expected-network-disabled-count={sourceConnectorsReadmeWorkflowFailureCopy.expectedNetworkDisabledCount}
          data-expected-route-count={sourceConnectorsReadmeWorkflowFailureCopy.expectedRouteCount}
          data-failing-command={sourceConnectorsReadmeWorkflowFailureCopy.failingCommand}
          data-link-selector={sourceConnectorsReadmeWorkflowFailureCopy.linkSelector}
          data-mode={sourceConnectorsReadmeWorkflowFailureCopy.mode}
          data-no-merge-copy={sourceConnectorsReadmeWorkflowFailureCopy.noMergeCopy}
          data-owner-role={sourceConnectorsReadmeWorkflowFailureCopy.ownerRole}
          data-readme-workflow-command={sourceConnectorsReadmeWorkflowFailureCopy.readmeWorkflowCommand}
          data-repair-targets={sourceConnectorsReadmeWorkflowFailureCopy.repairTargets}
          data-route={sourceConnectorsReadmeWorkflowFailureCopy.route}
          data-source-marker-selector={sourceConnectorsReadmeWorkflowFailureCopy.sourceMarkerSelector}
          data-status={sourceConnectorsReadmeWorkflowFailureCopy.status}
          data-testid="source-connectors-readme-workflow-failure-copy"
          data-workflow-command={sourceConnectorsReadmeWorkflowFailureCopy.workflowCommand}
          data-workflow-failure-command={sourceConnectorsReadmeWorkflowFailureCopy.workflowFailureCommand}
          data-workflow-href={sourceConnectorsReadmeWorkflowFailureCopy.workflowHref}
          data-workflow-name={sourceConnectorsReadmeWorkflowFailureCopy.workflowName}
          data-workflow-path={sourceConnectorsReadmeWorkflowFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source connectors README workflow failure copy</p>
              <h2>Что делать, если source connectors README workflow failure guard упал</h2>
            </div>
            <a className="primary-link" href={sourceConnectorsReadmeWorkflowFailureCopy.workflowHref}>
              {sourceConnectorsReadmeWorkflowFailureCopy.workflowName}
            </a>
          </div>
          <div className="source-quarantine-browser-loop-grid">
            {sourceConnectorsReadmeWorkflowFailureCopy.checks.map(([title, text]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? "No merge"
                    : title === "Owner"
                      ? "Data + API + CI"
                      : title === "Fix order"
                        ? "README -> smoke"
                        : "Source README"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel source-quarantine-browser-loop-panel"
          data-api-route={sourceConnectorsReadmeRenderedRouteFailureCopy.apiRoute}
          data-command={sourceConnectorsReadmeRenderedRouteFailureCopy.command}
          data-connector-ids={sourceConnectorsReadmeRenderedRouteFailureCopy.connectorIds.join(",")}
          data-docs-href={sourceConnectorsReadmeRenderedRouteFailureCopy.docsHref}
          data-docs-marker-selector={sourceConnectorsReadmeRenderedRouteFailureCopy.docsMarkerSelector}
          data-expected-connector-count={sourceConnectorsReadmeRenderedRouteFailureCopy.expectedConnectorCount}
          data-expected-network-disabled-count={sourceConnectorsReadmeRenderedRouteFailureCopy.expectedNetworkDisabledCount}
          data-expected-route-count={sourceConnectorsReadmeRenderedRouteFailureCopy.expectedRouteCount}
          data-failing-command={sourceConnectorsReadmeRenderedRouteFailureCopy.failingCommand}
          data-link-selector={sourceConnectorsReadmeRenderedRouteFailureCopy.linkSelector}
          data-mode={sourceConnectorsReadmeRenderedRouteFailureCopy.mode}
          data-no-merge-copy={sourceConnectorsReadmeRenderedRouteFailureCopy.noMergeCopy}
          data-owner-role={sourceConnectorsReadmeRenderedRouteFailureCopy.ownerRole}
          data-repair-targets={sourceConnectorsReadmeRenderedRouteFailureCopy.repairTargets}
          data-route={sourceConnectorsReadmeRenderedRouteFailureCopy.route}
          data-source-marker-selector={sourceConnectorsReadmeRenderedRouteFailureCopy.sourceMarkerSelector}
          data-status={sourceConnectorsReadmeRenderedRouteFailureCopy.status}
          data-testid="source-connectors-readme-rendered-route-failure-copy"
          data-workflow-command={sourceConnectorsReadmeRenderedRouteFailureCopy.workflowCommand}
          data-workflow-failure-command={sourceConnectorsReadmeRenderedRouteFailureCopy.workflowFailureCommand}
          data-workflow-href={sourceConnectorsReadmeRenderedRouteFailureCopy.workflowHref}
          data-workflow-name={sourceConnectorsReadmeRenderedRouteFailureCopy.workflowName}
          data-workflow-path={sourceConnectorsReadmeRenderedRouteFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source connectors README rendered-route failure copy</p>
              <h2>Что делать, если source connectors README rendered-route guard упал</h2>
            </div>
            <a className="primary-link" href={sourceConnectorsReadmeRenderedRouteFailureCopy.workflowHref}>
              {sourceConnectorsReadmeRenderedRouteFailureCopy.workflowName}
            </a>
          </div>
          <div className="source-quarantine-browser-loop-grid">
            {sourceConnectorsReadmeRenderedRouteFailureCopy.checks.map(([title, text]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? "No merge"
                    : title === "Owner"
                      ? "Data + API + QA"
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
          className="panel source-quarantine-browser-loop-panel"
          data-api-route={sourceConnectorsReadmeWorkflowDocsFailureCopy.apiRoute}
          data-command={sourceConnectorsReadmeWorkflowDocsFailureCopy.command}
          data-connector-ids={sourceConnectorsReadmeWorkflowDocsFailureCopy.connectorIds.join(",")}
          data-docs-href={sourceConnectorsReadmeWorkflowDocsFailureCopy.docsHref}
          data-docs-marker-selector={sourceConnectorsReadmeWorkflowDocsFailureCopy.docsMarkerSelector}
          data-expected-connector-count={sourceConnectorsReadmeWorkflowDocsFailureCopy.expectedConnectorCount}
          data-expected-network-disabled-count={sourceConnectorsReadmeWorkflowDocsFailureCopy.expectedNetworkDisabledCount}
          data-expected-route-count={sourceConnectorsReadmeWorkflowDocsFailureCopy.expectedRouteCount}
          data-failing-command={sourceConnectorsReadmeWorkflowDocsFailureCopy.failingCommand}
          data-link-selector={sourceConnectorsReadmeWorkflowDocsFailureCopy.linkSelector}
          data-mode={sourceConnectorsReadmeWorkflowDocsFailureCopy.mode}
          data-no-merge-copy={sourceConnectorsReadmeWorkflowDocsFailureCopy.noMergeCopy}
          data-owner-role={sourceConnectorsReadmeWorkflowDocsFailureCopy.ownerRole}
          data-repair-targets={sourceConnectorsReadmeWorkflowDocsFailureCopy.repairTargets}
          data-route={sourceConnectorsReadmeWorkflowDocsFailureCopy.route}
          data-source-marker-selector={sourceConnectorsReadmeWorkflowDocsFailureCopy.sourceMarkerSelector}
          data-status={sourceConnectorsReadmeWorkflowDocsFailureCopy.status}
          data-testid="source-connectors-readme-workflow-docs-failure-copy"
          data-workflow-command={sourceConnectorsReadmeWorkflowDocsFailureCopy.workflowCommand}
          data-workflow-docs-command={sourceConnectorsReadmeWorkflowDocsFailureCopy.workflowDocsCommand}
          data-workflow-docs-failure-command={sourceConnectorsReadmeWorkflowDocsFailureCopy.workflowDocsFailureCommand}
          data-workflow-failure-command={sourceConnectorsReadmeWorkflowDocsFailureCopy.workflowFailureCommand}
          data-workflow-href={sourceConnectorsReadmeWorkflowDocsFailureCopy.workflowHref}
          data-workflow-name={sourceConnectorsReadmeWorkflowDocsFailureCopy.workflowName}
          data-workflow-path={sourceConnectorsReadmeWorkflowDocsFailureCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source connectors README workflow docs failure copy</p>
              <h2>Что делать, если source connectors README workflow docs guard упал</h2>
            </div>
            <a className="primary-link" href={sourceConnectorsReadmeWorkflowDocsFailureCopy.workflowHref}>
              {sourceConnectorsReadmeWorkflowDocsFailureCopy.workflowName}
            </a>
          </div>
          <div className="source-quarantine-browser-loop-grid">
            {sourceConnectorsReadmeWorkflowDocsFailureCopy.checks.map(([title, text]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? "No merge"
                    : title === "Owner"
                      ? "Data + API + Docs"
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
          className="panel source-quarantine-browser-loop-panel"
          data-api-route={sourceConnectorsReadmeWorkflowDocsRenderedRouteCopy.apiRoute}
          data-command={sourceConnectorsReadmeWorkflowDocsRenderedRouteCopy.command}
          data-connector-ids={sourceConnectorsReadmeWorkflowDocsRenderedRouteCopy.connectorIds.join(",")}
          data-docs-href={sourceConnectorsReadmeWorkflowDocsRenderedRouteCopy.docsHref}
          data-docs-marker-selector={sourceConnectorsReadmeWorkflowDocsRenderedRouteCopy.docsMarkerSelector}
          data-expected-connector-count={sourceConnectorsReadmeWorkflowDocsRenderedRouteCopy.expectedConnectorCount}
          data-expected-network-disabled-count={sourceConnectorsReadmeWorkflowDocsRenderedRouteCopy.expectedNetworkDisabledCount}
          data-expected-route-count={sourceConnectorsReadmeWorkflowDocsRenderedRouteCopy.expectedRouteCount}
          data-failing-command={sourceConnectorsReadmeWorkflowDocsRenderedRouteCopy.failingCommand}
          data-link-selector={sourceConnectorsReadmeWorkflowDocsRenderedRouteCopy.linkSelector}
          data-mode={sourceConnectorsReadmeWorkflowDocsRenderedRouteCopy.mode}
          data-no-merge-copy={sourceConnectorsReadmeWorkflowDocsRenderedRouteCopy.noMergeCopy}
          data-owner-role={sourceConnectorsReadmeWorkflowDocsRenderedRouteCopy.ownerRole}
          data-repair-targets={sourceConnectorsReadmeWorkflowDocsRenderedRouteCopy.repairTargets}
          data-route={sourceConnectorsReadmeWorkflowDocsRenderedRouteCopy.route}
          data-source-marker-selector={sourceConnectorsReadmeWorkflowDocsRenderedRouteCopy.sourceMarkerSelector}
          data-status={sourceConnectorsReadmeWorkflowDocsRenderedRouteCopy.status}
          data-testid="source-connectors-readme-workflow-docs-rendered-route-copy"
          data-workflow-command={sourceConnectorsReadmeWorkflowDocsRenderedRouteCopy.workflowCommand}
          data-workflow-docs-command={sourceConnectorsReadmeWorkflowDocsRenderedRouteCopy.workflowDocsCommand}
          data-workflow-docs-failure-command={sourceConnectorsReadmeWorkflowDocsRenderedRouteCopy.workflowDocsFailureCommand}
          data-workflow-failure-command={sourceConnectorsReadmeWorkflowDocsRenderedRouteCopy.workflowFailureCommand}
          data-workflow-href={sourceConnectorsReadmeWorkflowDocsRenderedRouteCopy.workflowHref}
          data-workflow-name={sourceConnectorsReadmeWorkflowDocsRenderedRouteCopy.workflowName}
          data-workflow-path={sourceConnectorsReadmeWorkflowDocsRenderedRouteCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source connectors README workflow docs rendered-route copy</p>
              <h2>Что делать, если source connectors README workflow docs rendered-route guard упал</h2>
            </div>
            <a className="primary-link" href={sourceConnectorsReadmeWorkflowDocsRenderedRouteCopy.workflowHref}>
              {sourceConnectorsReadmeWorkflowDocsRenderedRouteCopy.workflowName}
            </a>
          </div>
          <div className="source-quarantine-browser-loop-grid">
            {sourceConnectorsReadmeWorkflowDocsRenderedRouteCopy.checks.map(([title, text]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? "No merge"
                    : title === "Owner"
                      ? "Data + API + QA"
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
          className="panel source-quarantine-browser-loop-panel"
          data-api-route={sourceConnectorsReadmeWorkflowDocsBrowserLoopCopy.apiRoute}
          data-browser-loop-selector={sourceConnectorsReadmeWorkflowDocsBrowserLoopCopy.browserLoopSelector}
          data-browser-url={sourceConnectorsReadmeWorkflowDocsBrowserLoopCopy.browserUrl}
          data-command={sourceConnectorsReadmeWorkflowDocsBrowserLoopCopy.command}
          data-connector-ids={sourceConnectorsReadmeWorkflowDocsBrowserLoopCopy.connectorIds.join(",")}
          data-console-levels={sourceConnectorsReadmeWorkflowDocsBrowserLoopCopy.consoleLevels}
          data-docs-href={sourceConnectorsReadmeWorkflowDocsBrowserLoopCopy.docsHref}
          data-docs-marker-selector={sourceConnectorsReadmeWorkflowDocsBrowserLoopCopy.docsMarkerSelector}
          data-expected-connector-count={sourceConnectorsReadmeWorkflowDocsBrowserLoopCopy.expectedConnectorCount}
          data-expected-network-disabled-count={sourceConnectorsReadmeWorkflowDocsBrowserLoopCopy.expectedNetworkDisabledCount}
          data-expected-route-count={sourceConnectorsReadmeWorkflowDocsBrowserLoopCopy.expectedRouteCount}
          data-link-selector={sourceConnectorsReadmeWorkflowDocsBrowserLoopCopy.linkSelector}
          data-mode={sourceConnectorsReadmeWorkflowDocsBrowserLoopCopy.mode}
          data-no-merge-copy={sourceConnectorsReadmeWorkflowDocsBrowserLoopCopy.noMergeCopy}
          data-owner-role={sourceConnectorsReadmeWorkflowDocsBrowserLoopCopy.ownerRole}
          data-repair-targets={sourceConnectorsReadmeWorkflowDocsBrowserLoopCopy.repairTargets}
          data-route={sourceConnectorsReadmeWorkflowDocsBrowserLoopCopy.route}
          data-screenshot-required={sourceConnectorsReadmeWorkflowDocsBrowserLoopCopy.screenshotRequired}
          data-source-marker-selector={sourceConnectorsReadmeWorkflowDocsBrowserLoopCopy.sourceMarkerSelector}
          data-status={sourceConnectorsReadmeWorkflowDocsBrowserLoopCopy.status}
          data-testid="source-connectors-readme-workflow-docs-browser-loop-copy"
          data-workflow-command={sourceConnectorsReadmeWorkflowDocsBrowserLoopCopy.workflowCommand}
          data-workflow-docs-command={sourceConnectorsReadmeWorkflowDocsBrowserLoopCopy.workflowDocsCommand}
          data-workflow-docs-failure-command={sourceConnectorsReadmeWorkflowDocsBrowserLoopCopy.workflowDocsFailureCommand}
          data-workflow-failure-command={sourceConnectorsReadmeWorkflowDocsBrowserLoopCopy.workflowFailureCommand}
          data-workflow-href={sourceConnectorsReadmeWorkflowDocsBrowserLoopCopy.workflowHref}
          data-workflow-name={sourceConnectorsReadmeWorkflowDocsBrowserLoopCopy.workflowName}
          data-workflow-path={sourceConnectorsReadmeWorkflowDocsBrowserLoopCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source connectors README workflow docs browser-loop copy</p>
              <h2>Как Browser QA подтверждает Source Connectors README workflow docs guard</h2>
            </div>
            <a
              className="primary-link"
              data-testid="source-connectors-readme-workflow-docs-workflow-anchor"
              href={sourceConnectorsReadmeWorkflowDocsBrowserLoopCopy.workflowHref}
            >
              {sourceConnectorsReadmeWorkflowDocsBrowserLoopCopy.workflowName}
            </a>
          </div>
          <div className="source-quarantine-browser-loop-grid">
            {sourceConnectorsReadmeWorkflowDocsBrowserLoopCopy.checks.map(([title, text]) => (
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
          className="panel source-quarantine-browser-loop-panel"
          data-api-route={sourceConnectorsReadmeWorkflowDocsPrCheckCopy.apiRoute}
          data-base-branch={sourceConnectorsReadmeWorkflowDocsPrCheckCopy.baseBranch}
          data-branch={sourceConnectorsReadmeWorkflowDocsPrCheckCopy.branch}
          data-command={sourceConnectorsReadmeWorkflowDocsPrCheckCopy.command}
          data-connector-ids={sourceConnectorsReadmeWorkflowDocsPrCheckCopy.connectorIds.join(",")}
          data-docs-href={sourceConnectorsReadmeWorkflowDocsPrCheckCopy.docsHref}
          data-expected-check-groups={sourceConnectorsReadmeWorkflowDocsPrCheckCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={sourceConnectorsReadmeWorkflowDocsPrCheckCopy.expectedConclusion}
          data-expected-merge-state={sourceConnectorsReadmeWorkflowDocsPrCheckCopy.expectedMergeState}
          data-expected-pr-number={sourceConnectorsReadmeWorkflowDocsPrCheckCopy.expectedPrNumber}
          data-expected-route-count={sourceConnectorsReadmeWorkflowDocsPrCheckCopy.expectedRouteCount}
          data-link-selector={sourceConnectorsReadmeWorkflowDocsPrCheckCopy.linkSelector}
          data-mode={sourceConnectorsReadmeWorkflowDocsPrCheckCopy.mode}
          data-no-merge-copy={sourceConnectorsReadmeWorkflowDocsPrCheckCopy.noMergeCopy}
          data-owner-role={sourceConnectorsReadmeWorkflowDocsPrCheckCopy.ownerRole}
          data-pr-href={sourceConnectorsReadmeWorkflowDocsPrCheckCopy.prHref}
          data-repair-targets={sourceConnectorsReadmeWorkflowDocsPrCheckCopy.repairTargets}
          data-route={sourceConnectorsReadmeWorkflowDocsPrCheckCopy.route}
          data-source-marker-selector={sourceConnectorsReadmeWorkflowDocsPrCheckCopy.sourceMarkerSelector}
          data-status={sourceConnectorsReadmeWorkflowDocsPrCheckCopy.status}
          data-testid="source-connectors-readme-workflow-docs-pr-check-copy"
          data-workflow-href={sourceConnectorsReadmeWorkflowDocsPrCheckCopy.workflowHref}
          data-workflow-name={sourceConnectorsReadmeWorkflowDocsPrCheckCopy.workflowName}
          data-workflow-path={sourceConnectorsReadmeWorkflowDocsPrCheckCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source connectors README workflow docs PR-check copy</p>
              <h2>Как PR #17 подтверждает Source Connectors README workflow docs guard</h2>
            </div>
            <a
              className="primary-link"
              data-testid="source-connectors-readme-workflow-docs-pr-anchor"
              href={sourceConnectorsReadmeWorkflowDocsPrCheckCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="source-quarantine-browser-loop-grid">
            {sourceConnectorsReadmeWorkflowDocsPrCheckCopy.checks.map(([title, text]) => (
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
          className="panel source-quarantine-browser-loop-panel"
          data-api-route={sourceConnectorsReadmeWorkflowDocsMergeStateCopy.apiRoute}
          data-base-branch={sourceConnectorsReadmeWorkflowDocsMergeStateCopy.baseBranch}
          data-branch={sourceConnectorsReadmeWorkflowDocsMergeStateCopy.branch}
          data-command={sourceConnectorsReadmeWorkflowDocsMergeStateCopy.command}
          data-connector-ids={sourceConnectorsReadmeWorkflowDocsMergeStateCopy.connectorIds.join(",")}
          data-docs-href={sourceConnectorsReadmeWorkflowDocsMergeStateCopy.docsHref}
          data-expected-check-groups={sourceConnectorsReadmeWorkflowDocsMergeStateCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={sourceConnectorsReadmeWorkflowDocsMergeStateCopy.expectedConclusion}
          data-expected-merge-state={sourceConnectorsReadmeWorkflowDocsMergeStateCopy.expectedMergeState}
          data-expected-pr-number={sourceConnectorsReadmeWorkflowDocsMergeStateCopy.expectedPrNumber}
          data-expected-route-count={sourceConnectorsReadmeWorkflowDocsMergeStateCopy.expectedRouteCount}
          data-link-selector={sourceConnectorsReadmeWorkflowDocsMergeStateCopy.linkSelector}
          data-mode={sourceConnectorsReadmeWorkflowDocsMergeStateCopy.mode}
          data-no-merge-copy={sourceConnectorsReadmeWorkflowDocsMergeStateCopy.noMergeCopy}
          data-owner-role={sourceConnectorsReadmeWorkflowDocsMergeStateCopy.ownerRole}
          data-pr-href={sourceConnectorsReadmeWorkflowDocsMergeStateCopy.prHref}
          data-repair-targets={sourceConnectorsReadmeWorkflowDocsMergeStateCopy.repairTargets}
          data-route={sourceConnectorsReadmeWorkflowDocsMergeStateCopy.route}
          data-source-marker-selector={sourceConnectorsReadmeWorkflowDocsMergeStateCopy.sourceMarkerSelector}
          data-status={sourceConnectorsReadmeWorkflowDocsMergeStateCopy.status}
          data-testid="source-connectors-readme-workflow-docs-merge-state-copy"
          data-workflow-href={sourceConnectorsReadmeWorkflowDocsMergeStateCopy.workflowHref}
          data-workflow-name={sourceConnectorsReadmeWorkflowDocsMergeStateCopy.workflowName}
          data-workflow-path={sourceConnectorsReadmeWorkflowDocsMergeStateCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source connectors README workflow docs merge-state copy</p>
              <h2>Как PR #17 держит Source Connectors README workflow docs guard в CLEAN</h2>
            </div>
            <a
              className="primary-link"
              data-testid="source-connectors-readme-workflow-docs-merge-anchor"
              href={sourceConnectorsReadmeWorkflowDocsMergeStateCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="source-quarantine-browser-loop-grid">
            {sourceConnectorsReadmeWorkflowDocsMergeStateCopy.checks.map(([title, text]) => (
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
          className="panel source-quarantine-browser-loop-panel"
          data-api-route={sourceConnectorsReadmeWorkflowDocsReleaseNoteCopy.apiRoute}
          data-base-branch={sourceConnectorsReadmeWorkflowDocsReleaseNoteCopy.baseBranch}
          data-branch={sourceConnectorsReadmeWorkflowDocsReleaseNoteCopy.branch}
          data-command={sourceConnectorsReadmeWorkflowDocsReleaseNoteCopy.command}
          data-connector-ids={sourceConnectorsReadmeWorkflowDocsReleaseNoteCopy.connectorIds.join(",")}
          data-docs-href={sourceConnectorsReadmeWorkflowDocsReleaseNoteCopy.docsHref}
          data-expected-check-groups={sourceConnectorsReadmeWorkflowDocsReleaseNoteCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={sourceConnectorsReadmeWorkflowDocsReleaseNoteCopy.expectedConclusion}
          data-expected-merge-state={sourceConnectorsReadmeWorkflowDocsReleaseNoteCopy.expectedMergeState}
          data-expected-pr-number={sourceConnectorsReadmeWorkflowDocsReleaseNoteCopy.expectedPrNumber}
          data-expected-route-count={sourceConnectorsReadmeWorkflowDocsReleaseNoteCopy.expectedRouteCount}
          data-link-selector={sourceConnectorsReadmeWorkflowDocsReleaseNoteCopy.linkSelector}
          data-mode={sourceConnectorsReadmeWorkflowDocsReleaseNoteCopy.mode}
          data-no-merge-copy={sourceConnectorsReadmeWorkflowDocsReleaseNoteCopy.noMergeCopy}
          data-owner-role={sourceConnectorsReadmeWorkflowDocsReleaseNoteCopy.ownerRole}
          data-pr-href={sourceConnectorsReadmeWorkflowDocsReleaseNoteCopy.prHref}
          data-release-note={sourceConnectorsReadmeWorkflowDocsReleaseNoteCopy.releaseNote}
          data-release-scope={sourceConnectorsReadmeWorkflowDocsReleaseNoteCopy.releaseScope}
          data-repair-targets={sourceConnectorsReadmeWorkflowDocsReleaseNoteCopy.repairTargets}
          data-route={sourceConnectorsReadmeWorkflowDocsReleaseNoteCopy.route}
          data-source-marker-selector={sourceConnectorsReadmeWorkflowDocsReleaseNoteCopy.sourceMarkerSelector}
          data-status={sourceConnectorsReadmeWorkflowDocsReleaseNoteCopy.status}
          data-testid="source-connectors-readme-workflow-docs-release-note-copy"
          data-workflow-href={sourceConnectorsReadmeWorkflowDocsReleaseNoteCopy.workflowHref}
          data-workflow-name={sourceConnectorsReadmeWorkflowDocsReleaseNoteCopy.workflowName}
          data-workflow-path={sourceConnectorsReadmeWorkflowDocsReleaseNoteCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source connectors README workflow docs release-note copy</p>
              <h2>Что release notes должны сказать про Source Connectors README workflow docs guard</h2>
            </div>
            <a
              className="primary-link"
              data-testid="source-connectors-readme-workflow-docs-release-anchor"
              href={sourceConnectorsReadmeWorkflowDocsReleaseNoteCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="source-quarantine-browser-loop-grid">
            {sourceConnectorsReadmeWorkflowDocsReleaseNoteCopy.checks.map(([title, text]) => (
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
          className="panel source-quarantine-browser-loop-panel"
          data-api-route={sourceConnectorsReadmeWorkflowDocsFinalQaCopy.apiRoute}
          data-base-branch={sourceConnectorsReadmeWorkflowDocsFinalQaCopy.baseBranch}
          data-branch={sourceConnectorsReadmeWorkflowDocsFinalQaCopy.branch}
          data-command={sourceConnectorsReadmeWorkflowDocsFinalQaCopy.command}
          data-connector-ids={sourceConnectorsReadmeWorkflowDocsFinalQaCopy.connectorIds.join(",")}
          data-docs-href={sourceConnectorsReadmeWorkflowDocsFinalQaCopy.docsHref}
          data-expected-check-groups={sourceConnectorsReadmeWorkflowDocsFinalQaCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={sourceConnectorsReadmeWorkflowDocsFinalQaCopy.expectedConclusion}
          data-expected-merge-state={sourceConnectorsReadmeWorkflowDocsFinalQaCopy.expectedMergeState}
          data-expected-pr-number={sourceConnectorsReadmeWorkflowDocsFinalQaCopy.expectedPrNumber}
          data-expected-route-count={sourceConnectorsReadmeWorkflowDocsFinalQaCopy.expectedRouteCount}
          data-final-qa-scope={sourceConnectorsReadmeWorkflowDocsFinalQaCopy.finalQaScope}
          data-link-selector={sourceConnectorsReadmeWorkflowDocsFinalQaCopy.linkSelector}
          data-mode={sourceConnectorsReadmeWorkflowDocsFinalQaCopy.mode}
          data-no-merge-copy={sourceConnectorsReadmeWorkflowDocsFinalQaCopy.noMergeCopy}
          data-owner-role={sourceConnectorsReadmeWorkflowDocsFinalQaCopy.ownerRole}
          data-pr-href={sourceConnectorsReadmeWorkflowDocsFinalQaCopy.prHref}
          data-release-note={sourceConnectorsReadmeWorkflowDocsFinalQaCopy.releaseNote}
          data-release-scope={sourceConnectorsReadmeWorkflowDocsFinalQaCopy.releaseScope}
          data-repair-targets={sourceConnectorsReadmeWorkflowDocsFinalQaCopy.repairTargets}
          data-route={sourceConnectorsReadmeWorkflowDocsFinalQaCopy.route}
          data-source-marker-selector={sourceConnectorsReadmeWorkflowDocsFinalQaCopy.sourceMarkerSelector}
          data-status={sourceConnectorsReadmeWorkflowDocsFinalQaCopy.status}
          data-testid="source-connectors-readme-workflow-docs-final-qa-copy"
          data-workflow-href={sourceConnectorsReadmeWorkflowDocsFinalQaCopy.workflowHref}
          data-workflow-name={sourceConnectorsReadmeWorkflowDocsFinalQaCopy.workflowName}
          data-workflow-path={sourceConnectorsReadmeWorkflowDocsFinalQaCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source connectors README workflow docs final QA copy</p>
              <h2>Как финально проверить Source Connectors README workflow docs handoff</h2>
            </div>
            <a
              className="primary-link"
              data-testid="source-connectors-readme-workflow-docs-final-qa-anchor"
              href={sourceConnectorsReadmeWorkflowDocsFinalQaCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="source-quarantine-browser-loop-grid">
            {sourceConnectorsReadmeWorkflowDocsFinalQaCopy.checks.map(([title, text]) => (
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
          className="panel source-quarantine-browser-loop-panel"
          data-api-route={sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.apiRoute}
          data-base-branch={sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.baseBranch}
          data-branch={sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.branch}
          data-command={sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.command}
          data-connector-ids={sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.connectorIds.join(",")}
          data-docs-href={sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.docsHref}
          data-expected-check-groups={sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.expectedConclusion}
          data-expected-merge-state={sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.expectedMergeState}
          data-expected-pr-number={sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.expectedPrNumber}
          data-expected-route-count={sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.expectedRouteCount}
          data-final-qa-scope={sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.finalQaScope}
          data-handoff-owners={sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.handoffOwners.join(",")}
          data-handoff-scope={sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.handoffScope}
          data-link-selector={sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.linkSelector}
          data-mode={sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.mode}
          data-no-merge-copy={sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.noMergeCopy}
          data-owner-role={sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.ownerRole}
          data-pr-href={sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.prHref}
          data-release-note={sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.releaseNote}
          data-release-scope={sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.releaseScope}
          data-repair-targets={sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.repairTargets}
          data-route={sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.route}
          data-source-marker-selector={sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.sourceMarkerSelector}
          data-status={sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.status}
          data-testid="source-connectors-readme-workflow-docs-owner-handoff-copy"
          data-workflow-href={sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.workflowHref}
          data-workflow-name={sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.workflowName}
          data-workflow-path={sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source connectors README workflow docs owner handoff copy</p>
              <h2>Кто принимает Source Connectors README workflow docs handoff</h2>
            </div>
            <a
              className="primary-link"
              data-testid="source-connectors-readme-workflow-docs-owner-handoff-anchor"
              href={sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="source-quarantine-browser-loop-grid">
            {sourceConnectorsReadmeWorkflowDocsOwnerHandoffCopy.checks.map(([title, text]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Release"
                    ? "Release accepts"
                    : title === "QA"
                      ? "QA accepts"
                      : title === "API"
                        ? "API accepts"
                        : "Data accepts"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel source-quarantine-browser-loop-panel"
          data-api-route={sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.apiRoute}
          data-base-branch={sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.baseBranch}
          data-branch={sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.branch}
          data-checklist-owners={sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.checklistOwners.join(",")}
          data-checklist-scope={sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.checklistScope}
          data-command={sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.command}
          data-connector-ids={sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.connectorIds.join(",")}
          data-docs-href={sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.docsHref}
          data-expected-check-groups={sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.expectedConclusion}
          data-expected-merge-state={sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.expectedMergeState}
          data-expected-pr-number={sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.expectedPrNumber}
          data-expected-route-count={sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.expectedRouteCount}
          data-final-qa-scope={sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.finalQaScope}
          data-handoff-scope={sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.handoffScope}
          data-link-selector={sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.linkSelector}
          data-mode={sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.mode}
          data-no-merge-copy={sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.noMergeCopy}
          data-owner-role={sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.ownerRole}
          data-pr-href={sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.prHref}
          data-release-note={sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.releaseNote}
          data-release-scope={sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.releaseScope}
          data-repair-targets={sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.repairTargets}
          data-route={sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.route}
          data-source-marker-selector={sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.sourceMarkerSelector}
          data-status={sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.status}
          data-testid="source-connectors-readme-workflow-docs-release-checklist-copy"
          data-workflow-href={sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.workflowHref}
          data-workflow-name={sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.workflowName}
          data-workflow-path={sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source connectors README workflow docs release checklist copy</p>
              <h2>Что отметить перед выпуском Source Connectors README workflow docs guard</h2>
            </div>
            <a
              className="primary-link"
              data-testid="source-connectors-readme-workflow-docs-release-checklist-anchor"
              href={sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="source-quarantine-browser-loop-grid">
            {sourceConnectorsReadmeWorkflowDocsReleaseChecklistCopy.checks.map(([title, text]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Release"
                    ? "Release checked"
                    : title === "QA"
                      ? "QA checked"
                      : title === "API"
                        ? "API checked"
                        : "Data checked"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel source-quarantine-browser-loop-panel"
          data-api-route={sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.apiRoute}
          data-approval-owners={sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.approvalOwners.join(",")}
          data-approval-scope={sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.approvalScope}
          data-base-branch={sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.baseBranch}
          data-branch={sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.branch}
          data-checklist-scope={sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.checklistScope}
          data-command={sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.command}
          data-connector-ids={sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.connectorIds.join(",")}
          data-docs-href={sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.docsHref}
          data-expected-check-groups={sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.expectedConclusion}
          data-expected-merge-state={sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.expectedMergeState}
          data-expected-pr-number={sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.expectedPrNumber}
          data-expected-route-count={sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.expectedRouteCount}
          data-final-qa-scope={sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.finalQaScope}
          data-handoff-scope={sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.handoffScope}
          data-link-selector={sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.linkSelector}
          data-mode={sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.mode}
          data-no-merge-copy={sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.noMergeCopy}
          data-owner-role={sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.ownerRole}
          data-pr-href={sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.prHref}
          data-release-note={sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.releaseNote}
          data-release-scope={sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.releaseScope}
          data-repair-targets={sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.repairTargets}
          data-route={sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.route}
          data-source-marker-selector={sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.sourceMarkerSelector}
          data-status={sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.status}
          data-testid="source-connectors-readme-workflow-docs-release-approval-copy"
          data-workflow-href={sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.workflowHref}
          data-workflow-name={sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.workflowName}
          data-workflow-path={sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source connectors README workflow docs release approval copy</p>
              <h2>Кто утверждает выпуск Source Connectors README workflow docs guard</h2>
            </div>
            <a
              className="primary-link"
              data-testid="source-connectors-readme-workflow-docs-release-approval-anchor"
              href={sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="source-quarantine-browser-loop-grid">
            {sourceConnectorsReadmeWorkflowDocsReleaseApprovalCopy.checks.map(([title, text]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Release"
                    ? "Release approved"
                    : title === "QA"
                      ? "QA approved"
                      : title === "API"
                        ? "API approved"
                        : "Data approved"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel source-quarantine-browser-loop-panel"
          data-api-route={sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.apiRoute}
          data-approval-scope={sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.approvalScope}
          data-base-branch={sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.baseBranch}
          data-branch={sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.branch}
          data-command={sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.command}
          data-connector-ids={sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.connectorIds.join(",")}
          data-docs-href={sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.docsHref}
          data-expected-check-groups={sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.expectedConclusion}
          data-expected-merge-state={sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.expectedMergeState}
          data-expected-pr-number={sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.expectedPrNumber}
          data-expected-route-count={sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.expectedRouteCount}
          data-final-qa-scope={sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.finalQaScope}
          data-handoff-scope={sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.handoffScope}
          data-link-selector={sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.linkSelector}
          data-mode={sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.mode}
          data-no-merge-copy={sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.noMergeCopy}
          data-owner-role={sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.ownerRole}
          data-pr-href={sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.prHref}
          data-release-note={sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.releaseNote}
          data-release-scope={sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.releaseScope}
          data-repair-targets={sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.repairTargets}
          data-route={sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.route}
          data-signoff-owners={sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.signoffOwners.join(",")}
          data-signoff-scope={sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.signoffScope}
          data-source-marker-selector={sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.sourceMarkerSelector}
          data-status={sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.status}
          data-testid="source-connectors-readme-workflow-docs-release-signoff-copy"
          data-workflow-href={sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.workflowHref}
          data-workflow-name={sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.workflowName}
          data-workflow-path={sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source connectors README workflow docs release signoff copy</p>
              <h2>Кто подписывает выпуск Source Connectors README workflow docs guard</h2>
            </div>
            <a
              className="primary-link"
              data-testid="source-connectors-readme-workflow-docs-release-signoff-anchor"
              href={sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="source-quarantine-browser-loop-grid">
            {sourceConnectorsReadmeWorkflowDocsReleaseSignoffCopy.checks.map(([title, text]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Release"
                    ? "Release signed"
                    : title === "QA"
                      ? "QA signed"
                      : title === "API"
                        ? "API signed"
                        : "Data signed"}
                </strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel source-quarantine-browser-loop-panel"
          data-api-route={sourceConnectorsReadmeWorkflowDocsArchiveCopy.apiRoute}
          data-approval-scope={sourceConnectorsReadmeWorkflowDocsArchiveCopy.approvalScope}
          data-archive-owners={sourceConnectorsReadmeWorkflowDocsArchiveCopy.archiveOwners.join(",")}
          data-archive-scope={sourceConnectorsReadmeWorkflowDocsArchiveCopy.archiveScope}
          data-base-branch={sourceConnectorsReadmeWorkflowDocsArchiveCopy.baseBranch}
          data-branch={sourceConnectorsReadmeWorkflowDocsArchiveCopy.branch}
          data-command={sourceConnectorsReadmeWorkflowDocsArchiveCopy.command}
          data-connector-ids={sourceConnectorsReadmeWorkflowDocsArchiveCopy.connectorIds.join(",")}
          data-docs-href={sourceConnectorsReadmeWorkflowDocsArchiveCopy.docsHref}
          data-expected-check-groups={sourceConnectorsReadmeWorkflowDocsArchiveCopy.expectedCheckGroups.join(",")}
          data-expected-conclusion={sourceConnectorsReadmeWorkflowDocsArchiveCopy.expectedConclusion}
          data-expected-merge-state={sourceConnectorsReadmeWorkflowDocsArchiveCopy.expectedMergeState}
          data-expected-pr-number={sourceConnectorsReadmeWorkflowDocsArchiveCopy.expectedPrNumber}
          data-expected-route-count={sourceConnectorsReadmeWorkflowDocsArchiveCopy.expectedRouteCount}
          data-final-qa-scope={sourceConnectorsReadmeWorkflowDocsArchiveCopy.finalQaScope}
          data-handoff-scope={sourceConnectorsReadmeWorkflowDocsArchiveCopy.handoffScope}
          data-link-selector={sourceConnectorsReadmeWorkflowDocsArchiveCopy.linkSelector}
          data-mode={sourceConnectorsReadmeWorkflowDocsArchiveCopy.mode}
          data-no-merge-copy={sourceConnectorsReadmeWorkflowDocsArchiveCopy.noMergeCopy}
          data-owner-role={sourceConnectorsReadmeWorkflowDocsArchiveCopy.ownerRole}
          data-pr-href={sourceConnectorsReadmeWorkflowDocsArchiveCopy.prHref}
          data-release-note={sourceConnectorsReadmeWorkflowDocsArchiveCopy.releaseNote}
          data-release-scope={sourceConnectorsReadmeWorkflowDocsArchiveCopy.releaseScope}
          data-repair-targets={sourceConnectorsReadmeWorkflowDocsArchiveCopy.repairTargets}
          data-route={sourceConnectorsReadmeWorkflowDocsArchiveCopy.route}
          data-signoff-owners={sourceConnectorsReadmeWorkflowDocsArchiveCopy.signoffOwners.join(",")}
          data-signoff-scope={sourceConnectorsReadmeWorkflowDocsArchiveCopy.signoffScope}
          data-source-marker-selector={sourceConnectorsReadmeWorkflowDocsArchiveCopy.sourceMarkerSelector}
          data-status={sourceConnectorsReadmeWorkflowDocsArchiveCopy.status}
          data-testid="source-connectors-readme-workflow-docs-archive-copy"
          data-workflow-href={sourceConnectorsReadmeWorkflowDocsArchiveCopy.workflowHref}
          data-workflow-name={sourceConnectorsReadmeWorkflowDocsArchiveCopy.workflowName}
          data-workflow-path={sourceConnectorsReadmeWorkflowDocsArchiveCopy.workflowPath}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source connectors README workflow docs archive copy</p>
              <h2>Что архивирует Source Connectors README workflow docs guard</h2>
            </div>
            <a
              className="primary-link"
              data-testid="source-connectors-readme-workflow-docs-archive-anchor"
              href={sourceConnectorsReadmeWorkflowDocsArchiveCopy.prHref}
            >
              PR #17
            </a>
          </div>
          <div className="source-quarantine-browser-loop-grid">
            {sourceConnectorsReadmeWorkflowDocsArchiveCopy.checks.map(([title, text]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>
                  {title === "Release"
                    ? "Release archived"
                    : title === "QA"
                      ? "QA archived"
                      : title === "API"
                        ? "API archived"
                        : "Data archived"}
                </strong>
                <p>{text}</p>
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
          data-api-route={sourceConnectorsDocsDeepLink.apiRoute}
          data-connector-ids={sourceConnectorsDocsDeepLink.connectorIds.join(",")}
          data-docs-href={sourceConnectorsDocsDeepLink.docsHref}
          data-expected-connector-count={sourceConnectorsDocsDeepLink.expectedConnectorCount}
          data-expected-network-disabled-count={sourceConnectorsDocsDeepLink.expectedNetworkDisabledCount}
          data-mode={sourceConnectorsDocsDeepLink.mode}
          data-route={sourceConnectorsDocsDeepLink.route}
          data-source-marker-selector={sourceConnectorsDocsDeepLink.sourceMarkerSelector}
          data-testid="source-connectors-docs-deep-link"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source connectors API docs deep-link</p>
              <h2>Где проверять общий контракт source connectors</h2>
            </div>
            <a
              className="primary-link"
              data-api-route={sourceConnectorsDocsDeepLink.apiRoute}
              data-testid="source-connectors-docs-deep-link-anchor"
              href={sourceConnectorsDocsDeepLink.docsHref}
            >
              API README / source connectors
            </a>
          </div>
          <div className="source-quarantine-browser-loop-grid">
            {sourceConnectorsDocsDeepLink.checks.map(([title, text]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>{sourceConnectorsDocsDeepLink.sourceMarkerSelector}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel source-quarantine-browser-loop-panel"
          data-api-route={sourceConnectorsDocsRenderedRouteFailureCopy.apiRoute}
          data-command={sourceConnectorsDocsRenderedRouteFailureCopy.command}
          data-connector-ids={sourceConnectorsDocsRenderedRouteFailureCopy.connectorIds.join(",")}
          data-docs-href={sourceConnectorsDocsRenderedRouteFailureCopy.docsHref}
          data-expected-connector-count={sourceConnectorsDocsRenderedRouteFailureCopy.expectedConnectorCount}
          data-expected-network-disabled-count={sourceConnectorsDocsRenderedRouteFailureCopy.expectedNetworkDisabledCount}
          data-expected-route-count={sourceConnectorsDocsRenderedRouteFailureCopy.expectedRouteCount}
          data-failing-command={sourceConnectorsDocsRenderedRouteFailureCopy.failingCommand}
          data-link-selector={sourceConnectorsDocsRenderedRouteFailureCopy.linkSelector}
          data-mode={sourceConnectorsDocsRenderedRouteFailureCopy.mode}
          data-no-merge-copy={sourceConnectorsDocsRenderedRouteFailureCopy.noMergeCopy}
          data-owner-role={sourceConnectorsDocsRenderedRouteFailureCopy.ownerRole}
          data-repair-targets={sourceConnectorsDocsRenderedRouteFailureCopy.repairTargets}
          data-route={sourceConnectorsDocsRenderedRouteFailureCopy.route}
          data-source-marker-selector={sourceConnectorsDocsRenderedRouteFailureCopy.sourceMarkerSelector}
          data-testid="source-connectors-docs-rendered-route-failure-copy"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source connectors docs rendered-route failure copy</p>
              <h2>Что делать, если source connectors docs пропали в rendered routes</h2>
            </div>
            <a className="primary-link" href={sourceConnectorsDocsRenderedRouteFailureCopy.docsHref}>
              API README / source connectors
            </a>
          </div>
          <div className="source-quarantine-browser-loop-grid">
            {sourceConnectorsDocsRenderedRouteFailureCopy.checks.map(([title, text]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>
                  {title === "No merge"
                    ? sourceConnectorsDocsRenderedRouteFailureCopy.noMergeCopy
                    : sourceConnectorsDocsRenderedRouteFailureCopy.sourceMarkerSelector}
                </strong>
                <p>{text}</p>
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
          className="panel source-quarantine-browser-loop-panel"
          data-api-route={eisRealNetworkApprovalDocsDeepLink.apiRoute}
          data-docs-href={eisRealNetworkApprovalDocsDeepLink.docsHref}
          data-expected-approval-count={eisRealNetworkApprovalDocsDeepLink.expectedApprovalCount}
          data-owner={eisRealNetworkApprovalDocsDeepLink.owner}
          data-route={eisRealNetworkApprovalDocsDeepLink.route}
          data-source-marker-selector={eisRealNetworkApprovalDocsDeepLink.sourceMarkerSelector}
          data-status={eisRealNetworkApprovalDocsDeepLink.status}
          data-testid="eis-real-network-approval-docs-deep-link"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">EIS real-network approval API docs deep-link</p>
              <h2>Где проверять Data approval gate для сетевого EIS smoke</h2>
            </div>
            <a
              className="primary-link"
              data-api-route={eisRealNetworkApprovalDocsDeepLink.apiRoute}
              data-owner={eisRealNetworkApprovalDocsDeepLink.owner}
              data-testid="eis-real-network-approval-docs-deep-link-anchor"
              href={eisRealNetworkApprovalDocsDeepLink.docsHref}
            >
              API README / EIS approval gate
            </a>
          </div>
          <div className="source-quarantine-browser-loop-grid">
            {eisRealNetworkApprovalDocsDeepLink.checks.map(([title, text]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>{eisRealNetworkApprovalDocsDeepLink.sourceMarkerSelector}</strong>
                <p>{text}</p>
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
          data-api-route={fnsRealNetworkApprovalDocsDeepLink.apiRoute}
          data-docs-href={fnsRealNetworkApprovalDocsDeepLink.docsHref}
          data-expected-approval-count={fnsRealNetworkApprovalDocsDeepLink.expectedApprovalCount}
          data-owner={fnsRealNetworkApprovalDocsDeepLink.owner}
          data-route={fnsRealNetworkApprovalDocsDeepLink.route}
          data-source-marker-selector={fnsRealNetworkApprovalDocsDeepLink.sourceMarkerSelector}
          data-status={fnsRealNetworkApprovalDocsDeepLink.status}
          data-testid="fns-real-network-approval-docs-deep-link"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">FNS real-network approval API docs deep-link</p>
              <h2>Где проверять Legal approval gate для сетевого FNS smoke</h2>
            </div>
            <a
              className="primary-link"
              data-api-route={fnsRealNetworkApprovalDocsDeepLink.apiRoute}
              data-owner={fnsRealNetworkApprovalDocsDeepLink.owner}
              data-testid="fns-real-network-approval-docs-deep-link-anchor"
              href={fnsRealNetworkApprovalDocsDeepLink.docsHref}
            >
              API README / FNS approval gate
            </a>
          </div>
          <div className="source-quarantine-browser-loop-grid">
            {fnsRealNetworkApprovalDocsDeepLink.checks.map(([title, text]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>{fnsRealNetworkApprovalDocsDeepLink.sourceMarkerSelector}</strong>
                <p>{text}</p>
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
