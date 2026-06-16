const defaultBaseUrl = "http://127.0.0.1:3070";

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
    ],
  },
  {
    path: "/tenders",
    status: 200,
    mustInclude: [
      "Процедуры",
      "Outcome filters",
      "ожидают owner review",
      "нет owner approval",
      "0373100042626000001",
    ],
  },
  {
    path: "/tenders/0373100042626000001",
    status: 200,
    mustInclude: [
      "Карточка процедуры",
      "Outcome / reason",
      "Owner approval required",
      "tender_manager",
      "raw-eis-0373100042626000001",
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
    path: "/sources",
    status: 200,
    mustInclude: [
      "Источники данных",
      "ЕИС / zakupki.gov.ru",
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
