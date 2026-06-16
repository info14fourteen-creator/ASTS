import demoData from "../../../packages/shared/demo-data/asts-demo.json";

export type Tender = {
  id: string;
  title: string;
  source: string;
  customer: string;
  nmck: string;
  deadline: string;
  region: string;
  status: string;
  risk: "low" | "medium" | "high";
  match: number;
};

export type Task = {
  title: string;
  owner: string;
  due: string;
  tone: "neutral" | "warning" | "danger";
};

const sourceLabels = {
  eis: "ЕИС",
  fns: "ФНС",
  etp: "ЭТП",
  gis_torgi: "ГИС Торги",
  fedresurs: "Федресурс",
  file_vault: "Файл",
} as const;

type SourceKind = keyof typeof sourceLabels;
type TenderRisk = Tender["risk"];
type TaskTone = Task["tone"];

function sourceLabel(sourceKind: string): string {
  return sourceLabels[sourceKind as SourceKind] ?? sourceKind;
}

function tenderRisk(risk: string): TenderRisk {
  if (risk === "low" || risk === "medium" || risk === "high") {
    return risk;
  }

  return "medium";
}

function taskTone(tone: string): TaskTone {
  if (tone === "neutral" || tone === "warning" || tone === "danger") {
    return tone;
  }

  return "neutral";
}

export const tenders: Tender[] = demoData.tenders.map((tender) => ({
  id: tender.tender_id,
  title: tender.title,
  source: sourceLabel(tender.source.source_kind),
  customer: tender.customer_name,
  nmck: tender.nmck_label,
  deadline: tender.deadline_label,
  region: tender.region,
  status: tender.stage_label,
  risk: tenderRisk(tender.risk),
  match: tender.match,
}));

export const participationStages = [
  "Входящие",
  "Оценка",
  "Позиции",
  "КП",
  "Top-3",
  "Экономика",
  "Подача",
  "Результат",
];

export const executionStages = [
  "Договор",
  "Оплата",
  "Закупка",
  "Исполнение",
  "Закрывающие",
  "Финальный расчет",
];

export const tasks: Task[] = demoData.tasks.map((task) => ({
  title: task.title,
  owner: task.owner_label,
  due: task.due_label,
  tone: taskTone(task.tone),
}));

export const commandSignals = [
  ["Primary feed", "ЕИС: 42 новых, ФНС: 6 проверок, ЭТП: 11 обновлений", "синхронизация 07:40"],
  ["AI triage", "5 процедур прошли автоскоринг, 3 отправлены на ручную проверку", "confidence threshold 85%"],
  ["Pre-win funnel", "2 карточки на этапе КП, 1 срок подачи меньше 10 часов", "сегодня"],
  ["Execution funnel", "1 контракт ждет УПД, 2 оплаты в контроле", "после победы"],
];

export const operatorHandoff = [
  ["Sources", "проверить freshness breach и ошибки API до AI-разбора", "data"],
  ["Deadlines", "сроки меньше 10 часов требуют владельца и решения", "pre-win"],
  ["Execution", "победы без handoff receipt не переводим во вторую воронку", "post-win"],
  ["Merge", "PR объединяем только после build, browser smoke и review", "delivery"],
];

export const mindMapParity = [
  ["2 воронки", "pre-win и execution уже разделены в UI и API-схемах", "implemented"],
  ["Первоисточники", "SourceEvidence обязателен для tender/document demo API", "implemented"],
  ["Задачи и владельцы", "TaskItem хранит owner, priority и human approval", "implemented"],
  ["AI вместо рутины", "confidence gates есть, extraction-схемы еще впереди", "planned"],
  ["Поставщики и КП", "RFQ, quote lines и top-3 сохранены в registry", "planned"],
  ["Роли MVP", "нужно утвердить права старых ролей в новой команде", "needs-owner"],
];

export const previewReview = [
  ["Preview", "локальный Next preview сейчас, публично через GitHub Pages после merge", "смотреть"],
  ["PR #17", "codex/app-site-shell -> main, рабочая ветка не пушит напрямую в main", "review"],
  ["Routes", "Обзор, Тендеры, Источники, AI разбор, Исполнение, Задачи, Настройки", "click-through"],
  ["Merge gate", "build, browser smoke и сверка старой mind map перед объединением", "guard"],
];

export const releaseReadiness = [
  ["Build", "19 static routes", "последняя сборка проходит"],
  ["Smoke", "desktop + mobile", "проверяем измененный маршрут"],
  ["Data safety", "backup + source ledger", "секреты и восстановление описаны"],
  ["Collaboration", "PR #17", "объединяем только после review"],
];

export const pwaReadiness = [
  ["Manifest", "standalone, scope, theme и language заданы", "ready"],
  ["Icons", "any + maskable SVG добавлены в public/icons", "ready"],
  ["Install", "кнопку установки добавим после UX на mobile", "planned"],
  ["Offline", "service worker включим после API/cache policy", "blocked"],
];

export const integrations = [
  ["Bitrix24", "первая очередь"],
  ["amoCRM", "первая очередь"],
  ["1C", "обмен/импорт"],
  ["Telegram", "bot + mini app"],
  ["ЕИС", "primary source"],
  ["ФНС", "primary source"],
];
