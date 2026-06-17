import { readFile } from "node:fs/promises";

const defaultBaseUrl = "http://127.0.0.1:3070";
const demoDataUrl = new URL("../../../packages/shared/demo-data/asts-demo.json", import.meta.url);
const demoData = JSON.parse(await readFile(demoDataUrl, "utf8"));
const preWinTenders = demoData.tenders.filter((tender) => tender.funnel === "pre_win");
const executionTenders = demoData.tenders.filter((tender) => tender.funnel === "execution");
const executionDocuments = demoData.documents.filter((document) =>
  executionTenders.some((tender) => tender.tender_id === document.tender_id),
);
const preWinOutcomeCounts = ["suggested", "locked", "approved"]
  .map((outcome) => preWinTenders.filter((tender) => tender.outcome.status === outcome).length)
  .join("/");
const fixtureDriftCheckCount = 4;
const approvedPreWinTender = preWinTenders.find((tender) => tender.outcome.status === "approved");
const lockedPreWinTender = preWinTenders.find((tender) => tender.outcome.status === "locked");

if (!approvedPreWinTender) {
  throw new Error("demo fixture must include approved pre-win owner receipt");
}

if (!lockedPreWinTender) {
  throw new Error("demo fixture must include locked pre-win quarantine source");
}

function htmlAttributeValue(value) {
  return value.replaceAll("&", "&amp;");
}

const tenderDetailRouteChecks = preWinTenders.map((tender) => ({
  path: `/tenders/${tender.tender_id}`,
  status: 200,
  mustInclude: [
    "Карточка процедуры",
    "Outcome / reason",
    "Source-id mismatch hint",
    "tender_id / regNumber",
    "raw artifact нужен только как evidence",
    "Primary source deep link",
    "data-testid=\"source-url-deep-link\"",
    `data-source-url="${htmlAttributeValue(tender.source.source_url)}"`,
    `href="${htmlAttributeValue(tender.source.source_url)}"`,
    "Открыть первоисточник",
    tender.title,
    tender.outcome.owner_role,
    tender.outcome.source_ref,
    tender.source.raw_artifact_id,
  ],
}));

const outcomeFilterRouteChecks = ["suggested", "locked", "approved"].map((outcome) => {
  const tender = preWinTenders.find((item) => item.outcome.status === outcome);
  const visibleCount = preWinTenders.filter((item) => item.outcome.status === outcome).length;

  if (!tender) {
    throw new Error(`demo fixture must include pre-win outcome ${outcome}`);
  }

  return {
    path: `/tenders?outcome=${outcome}`,
    status: 200,
    mustInclude: [
      "Outcome filters",
      "Owner approval receipt",
      "data-testid=\"owner-approval-browser-loop\"",
      `data-active-outcome="${outcome}"`,
      `data-visible-count="${visibleCount}"`,
      outcome,
      tender.tender_id,
      tender.title,
      tender.outcome.note,
    ],
  };
});

const executionDocumentMarkers = executionTenders.flatMap((tender) =>
  demoData.documents
    .filter((document) => document.tender_id === tender.tender_id)
    .flatMap((document) => [document.title, document.raw_artifact.artifact_id, document.raw_artifact.storage_path]),
);

const routeChecks = [
  {
    path: "/",
    status: 200,
    mustInclude: [
      "Рабочий кабинет тендерного отдела",
      "Поставка серверного оборудования для регионального центра",
      "0373100042626000001",
      "Воронка 1: до победы",
      "Воронка 2: исполнение",
      "Bitrix24",
      "19 static routes",
    ],
  },
  {
    path: "/plan",
    status: 200,
    mustInclude: [
      "План разработки ASTS",
      "80-point plan",
      "Next increments",
      "Добавить fixture schema CI path notes",
      "Добавить schema validation summary card",
      "Добавить AI review schema browser summary",
      "Добавить schema docs browser link",
      "asts-app-site-ru-12",
      "19 static routes",
      "Partner quickstart",
      "data-testid=\"partner-quickstart\"",
      "data-branch-prefix=\"codex/\"",
      "data-step-count=\"4\"",
      "git clone git@github.com:info14fourteen-creator/ASTS.git",
      "git checkout -b codex/&lt;short-task-name&gt;",
      "Prompt for partner Codex",
      "не пушь напрямую в main",
      "Fixture coverage",
      "Pre-win rows",
      "Execution rows",
      "Execution artifacts",
      "Outcome states",
      "Fixture drift guard",
      "data-testid=\"fixture-drift-warning\"",
      "data-status=\"aligned\"",
      "Нет дрейфа между smoke и fixture",
      "Fixture drift quarantine copy",
      "data-testid=\"fixture-drift-quarantine-copy\"",
      "data-status=\"standby\"",
      "data-action-count=\"4\"",
      "Quarantine готов, но не включен",
      "AI может читать demo fixture",
      "Merge разрешен только пока Web build",
      "fixture-drift-warning / route smoke / packages/shared/demo-data/asts-demo.json",
      "Freeze",
      "Release",
      `data-aligned-count="${fixtureDriftCheckCount}"`,
      `data-total-count="${fixtureDriftCheckCount}"`,
      `data-expected="${preWinTenders.length}"`,
      `data-actual="${preWinTenders.length}"`,
      `data-expected="${executionTenders.length}"`,
      `data-actual="${executionTenders.length}"`,
      `data-expected="${executionDocuments.length}"`,
      `data-actual="${executionDocuments.length}"`,
      `data-expected="${preWinOutcomeCounts}"`,
      `data-actual="${preWinOutcomeCounts}"`,
      `${preWinTenders.length}`,
      `${executionTenders.length}`,
      `${demoData.documents.length}`,
      `${executionDocuments.length}`,
      `${demoData.tasks.length}`,
      "3/1/1",
    ],
  },
  {
    path: "/tenders",
    status: 200,
    mustInclude: [
      "Процедуры",
      "Outcome filters",
      "Owner approval receipt",
      "data-testid=\"owner-approval-browser-loop\"",
      "Owner approval receipt history",
      "data-testid=\"owner-approval-receipt-history\"",
      "Owner approval handoff lock",
      "data-testid=\"owner-approval-handoff-lock\"",
      "data-approved-count=\"1\"",
      "data-approved-with-receipt=\"1\"",
      "data-approved-without-receipt=\"0\"",
      "data-execution-ready-count=\"1\"",
      "Approved outcome не попадает в execution без receipt",
      "execution handoff allowed",
      "execution handoff locked",
      `data-history-count="${preWinTenders.length}"`,
      `data-last-approved="${approvedPreWinTender.tender_id}"`,
      "Последние подтверждения перед handoff",
      "ready for execution handoff",
      "blocked before handoff",
      "data-active-outcome=\"all\"",
      "data-visible-count=\"4\"",
      "ожидают owner review",
      "нет owner approval",
      "0373100042626000001",
      approvedPreWinTender.outcome.source_ref,
    ],
  },
  ...outcomeFilterRouteChecks,
  ...tenderDetailRouteChecks,
  {
    path: "/tenders/unknown-id",
    status: 404,
    mustInclude: [
      "Карточка процедуры не найдена",
      "unknown tender id",
      "pre-win id из shared fixture",
      "Source-id mismatch hint",
      "raw-eis-*",
      "regNumber",
      "/execution",
    ],
  },
  {
    path: "/tasks",
    status: 200,
    mustInclude: [
      "Задачи и эскалации",
      "Automation pause policy",
      "Когда 12-минутный цикл должен остановиться",
      "каждая правка должна собрать 19 static routes",
    ],
  },
  {
    path: "/ai-review",
    status: 200,
    mustInclude: [
      "AI разбор процедур",
      "Low-confidence owner review",
      "data-testid=\"ai-review-confidence-queue\"",
      "data-total-count=\"3\"",
      "data-review-required-count=\"1\"",
      "data-blocked-count=\"2\"",
      "data-source-evidence-count=\"3\"",
      "data-threshold=\"0.85\"",
      "data-fact-type=\"requirement\"",
      "data-fact-type=\"supplier_quote\"",
      "data-fact-type=\"economics\"",
      "data-required-action=\"confirm requirement interpretation before supplier request\"",
      "data-required-action=\"request supplier clarification and keep economics blocked\"",
      "data-required-action=\"finance owner must approve or keep outcome locked\"",
      "data-status=\"review_required\"",
      "data-status=\"blocked\"",
      "raw-eis-0373100042626000001",
      "raw-eis-32211984571",
      "raw-eis-0173200001426000044",
      "AI review owner receipt",
      "data-testid=\"ai-review-owner-receipt-rules\"",
      "data-rule-count=\"3\"",
      "data-allowed-decisions=\"confirmed,corrected,blocked\"",
      "data-required-fields=\"evidence_ref,confidence_at_review,source_checksum_sha256\"",
      "data-owner=\"tender_manager\"",
      "data-owner=\"supplier_manager\"",
      "data-owner=\"finance_owner\"",
      "supplier_clarification_ref",
      "receipt required",
      "AI review receipt browser loop",
      "data-testid=\"ai-review-receipt-browser-loop\"",
      "data-testid=\"ai-review-receipt-api-link\"",
      "data-api-route=\"/v1/ai/review-queue\"",
      "data-api-href=\"https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#ai-review-queue-contract\"",
      "href=\"https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#ai-review-queue-contract\"",
      "API / AI review queue",
      "confirm requirement interpretation before supplier request",
      "request supplier clarification and keep economics blocked",
      "finance owner must approve or keep outcome locked",
      "data-selector=\"[data-testid=&#x27;ai-review-owner-receipt-rules&#x27;] [data-owner]\"",
      "data-owner-count=\"3\"",
      "data-owners=\"tender_manager,supplier_manager,finance_owner\"",
      "Assert decisions",
      "AI review browser loop",
      "data-testid=\"ai-review-confidence-browser-loop\"",
      "data-selector=\"[data-testid=&#x27;ai-review-confidence-queue&#x27;] [data-status=&#x27;blocked&#x27;]\"",
      "Assert confidence",
      "Assert owner",
      "Assert evidence",
      "owner review required",
    ],
  },
  {
    path: "/execution",
    status: 200,
    mustInclude: [
      "Исполнение после победы",
      "Execution fixture inbox",
      "Execution handoff artifacts",
      "Execution artifact empty guard",
      "data-testid=\"execution-artifact-empty-guard\"",
      "Execution artifact blocked fixture",
      "data-testid=\"execution-artifact-blocked-fixture\"",
      "Execution blocked browser loop",
      "data-testid=\"execution-blocked-browser-loop\"",
      "data-testid=\"execution-browser-ci-note\"",
      "data-fallback=\"route-smoke-html-contract\"",
      "data-selector=\"",
      "execution-artifact-blocked-fixture",
      "CI fallback",
      "Если in-app browser bridge недоступен, route smoke проверяет HTML contract.",
      "Без этих маркеров PR не считается проверенным.",
      `data-contract-count="${executionTenders.length}"`,
      `data-artifact-count="${executionDocuments.length}"`,
      "data-min-artifacts=\"3\"",
      "data-status=\"ready\"",
      "data-status=\"blocked\"",
      "data-artifact-count=\"0\"",
      "data-missing-artifacts=\"3\"",
      "Assert status",
      "Assert evidence",
      "Победа не запускает исполнение без raw artifacts",
      "execution handoff blocked",
      "handoff ready",
      "handoff blocked",
      "Победа не запускает исполнение без raw artifacts",
      "exec-2026-0007",
      "execution_owner",
      "raw-etp-procedure-room-0373100042626000001",
      "raw-eis-0373100099926000012",
      ...executionDocumentMarkers,
    ],
  },
  {
    path: "/sources",
    status: 200,
    mustInclude: [
      "Источники данных",
      "ЕИС / zakupki.gov.ru",
      "Source URL health state",
      "data-testid=\"source-url-health-state\"",
      "data-ready-count=\"1\"",
      "data-quarantine-count=\"1\"",
      "data-unavailable-count=\"1\"",
      "Source quarantine browser loop",
      "data-testid=\"source-quarantine-browser-loop\"",
      "data-status=\"quarantine\"",
      "data-ai-gate=\"blocked\"",
      "FNS source readiness",
      "data-testid=\"fns-source-readiness-card\"",
      "data-connector-id=\"fns-egrul-nalog-ru\"",
      "data-status=\"contract-only\"",
      "data-ai-gate=\"manual_review_until_secrets\"",
      "data-required-secrets=\"FNS_API_BASE_URL,FNS_API_TOKEN\"",
      "raw/fns/{inn}/{artifact_id}",
      "data-capability=\"fetch_by_inn\"",
      "data-capability=\"fetch_by_ogrn\"",
      "data-capability=\"fetch_extract\"",
      "data-capability=\"normalize\"",
      "FNS real-network smoke gate",
      "data-testid=\"fns-real-network-smoke-gate\"",
      "data-network-smoke-status=\"contract_only\"",
      "data-owner=\"Legal\"",
      "data-safe-test-pair-required=\"true\"",
      "data-approval-count=\"5\"",
      "CI must not call FNS until the real-network gate is explicitly approved.",
      "safe test INN and OGRN pair is recorded",
      "FNS network gate browser loop",
      "data-testid=\"fns-network-gate-browser-loop\"",
      "data-testid=\"fns-network-gate-docs-link\"",
      "data-api-route=\"/v1/sources/connectors\"",
      "data-docs-href=\"https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#fns-smoke-contract\"",
      "href=\"https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#fns-smoke-contract\"",
      "API README / Legal gate",
      "data-selector=\"[data-testid=&#x27;fns-real-network-smoke-gate&#x27;] [data-approval]\"",
      "Assert approvals",
      "Assert Legal",
      "FNS connector browser loop",
      "data-testid=\"fns-connector-browser-loop\"",
      "data-selector=\"[data-testid=&#x27;fns-source-readiness-card&#x27;]\"",
      "data-secret-count=\"2\"",
      "data-capability-count=\"4\"",
      "Freshness breach queue",
      "data-testid=\"source-freshness-breach-queue\"",
      "data-total-count=\"4\"",
      "data-ai-blocked-count=\"4\"",
      "data-breach-types=\"stale,missing,parse_failed,hash_mismatch\"",
      "data-breach-type=\"stale\"",
      "data-breach-type=\"missing\"",
      "data-breach-type=\"parse_failed\"",
      "data-breach-type=\"hash_mismatch\"",
      "Freshness breach browser loop",
      "data-testid=\"source-freshness-browser-loop\"",
      "data-expected-count=\"4\"",
      "data-selector=\"[data-testid=&#x27;source-freshness-breach-queue&#x27;] [data-ai-gate=&#x27;blocked&#x27;]\"",
      "Freshness owner receipt",
      "data-testid=\"source-freshness-owner-receipt-rules\"",
      "data-ai-gate=\"blocked_until_owner_receipt\"",
      "data-receipt-status=\"restored\"",
      "data-rule-count=\"4\"",
      "data-required-receipt-status=\"restored\"",
      "owner receipt required",
      "Source owner receipt history",
      "data-testid=\"source-owner-receipt-history\"",
      "data-api-route=\"/v1/sources/owner-receipts\"",
      "data-history-count=\"4\"",
      "data-resolution-statuses=\"restored,accepted_with_note,restored,still_blocked\"",
      "data-resolution-status=\"accepted_with_note\"",
      "data-resolution-status=\"still_blocked\"",
      "data-ai-gate=\"ready_after_receipt\"",
      "data-ai-gate=\"blocked_until_restored\"",
      "raw-eis-32211984571-v2",
      "official-absence-eis-0373100099926000012",
      "normalized-eis-0173200001426000044-v3",
      "raw-etp-procedure-room-0373100042626000001-refetch",
      "Source owner receipt history browser loop",
      "data-testid=\"source-owner-receipt-history-browser-loop\"",
      "data-selector=\"[data-testid=&#x27;source-owner-receipt-history&#x27;] [data-resolution-status]\"",
      "data-api-route=\"/v1/sources/owner-receipts\"",
      "data-docs-href=\"https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#source-owner-receipt-contract\"",
      "data-testid=\"source-owner-receipt-docs-link\"",
      "href=\"https://github.com/info14fourteen-creator/ASTS/blob/codex/app-site-shell/apps/api/README.md#source-owner-receipt-contract\"",
      "API README / owner receipts",
      "data-ai-gates=\"ready_after_receipt,blocked_until_restored\"",
      "data-resolution-statuses=\"restored,accepted_with_note,still_blocked\"",
      "data-blocked-count=\"2\"",
      "Assert history",
      "Assert gates",
      "Source receipt browser loop",
      "data-testid=\"source-receipt-browser-loop\"",
      "data-receipt-status=\"restored\"",
      "data-required-fields=\"new_raw_artifact_id,new_checksum_sha256,audit_note\"",
      "data-selector=\"[data-testid=&#x27;source-freshness-owner-receipt-rules&#x27;] [data-required-receipt-status=&#x27;restored&#x27;]\"",
      "Assert restored",
      "Assert fields",
      "refresh primary-source payload before AI scoring",
      "fetch and store the missing procurement document raw artifact",
      "send the payload to manual schema review and keep AI blocked",
      "quarantine artifact and refetch from official ETP API",
      "data-selector=\"",
      "source-url-health-state",
      "[data-status=&#x27;quarantine&#x27;]",
      "Assert raw",
      "Assert AI gate",
      "quarantine blocks AI",
      "raw-eis-0373100099926000012",
      "raw-eis-0173200001426000044",
      "raw-etp-procedure-room-0373100042626000001",
      lockedPreWinTender.source.raw_artifact_id,
      lockedPreWinTender.outcome.owner_role,
      "connector timeout",
      "manual review before AI",
      "schema drift",
      "Source intake contract",
      "AI blocked until complete",
    ],
  },
  {
    path: "/no-such-route",
    status: 404,
    mustInclude: ["Маршрут не найден", "сверить текущий 80-пунктовый план разработки"],
  },
];

const staleMarkers = ["16 static routes", "18 static routes"];

function parseBaseUrl() {
  const urlFlag = process.argv.find((arg) => arg.startsWith("--url="));

  if (urlFlag) {
    return urlFlag.slice("--url=".length).replace(/\/$/, "");
  }

  const urlIndex = process.argv.indexOf("--url");
  if (urlIndex !== -1 && process.argv[urlIndex + 1]) {
    return process.argv[urlIndex + 1].replace(/\/$/, "");
  }

  return (process.env.ASTS_WEB_BASE_URL || defaultBaseUrl).replace(/\/$/, "");
}

async function checkRoute(baseUrl, check) {
  const response = await fetch(`${baseUrl}${check.path}`);
  const html = await response.text();
  const failures = [];

  if (response.status !== check.status) {
    failures.push(`expected HTTP ${check.status}, got ${response.status}`);
  }

  for (const marker of check.mustInclude) {
    if (!html.includes(marker)) {
      failures.push(`missing marker: ${marker}`);
    }
  }

  for (const staleMarker of staleMarkers) {
    if (html.includes(staleMarker)) {
      failures.push(`stale marker present: ${staleMarker}`);
    }
  }

  return {
    failures,
    path: check.path,
    status: response.status,
  };
}

const baseUrl = parseBaseUrl();
const results = [];

for (const check of routeChecks) {
  results.push(await checkRoute(baseUrl, check));
}

const failed = results.filter((result) => result.failures.length > 0);

for (const result of results) {
  const state = result.failures.length > 0 ? "FAIL" : "PASS";
  console.log(`${state} ${result.path} HTTP ${result.status}`);
  for (const failure of result.failures) {
    console.log(`  - ${failure}`);
  }
}

if (failed.length > 0) {
  console.error(`Smoke failed for ${failed.length} route(s) at ${baseUrl}`);
  process.exit(1);
}

console.log(`Smoke passed for ${results.length} route(s) at ${baseUrl}`);
