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

if (!approvedPreWinTender) {
  throw new Error("demo fixture must include approved pre-win owner receipt");
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
      "asts-app-site-ru-12",
      "19 static routes",
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
      `data-contract-count="${executionTenders.length}"`,
      `data-artifact-count="${executionDocuments.length}"`,
      "data-min-artifacts=\"3\"",
      "data-status=\"ready\"",
      "data-status=\"blocked\"",
      "data-artifact-count=\"0\"",
      "data-missing-artifacts=\"3\"",
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
      "quarantine blocks AI",
      "raw-eis-0373100099926000012",
      "raw-eis-0173200001426000044",
      "raw-etp-procedure-room-0373100042626000001",
      "connector timeout",
      "manual review before AI",
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
