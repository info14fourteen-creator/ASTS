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

export const tenders: Tender[] = [
  {
    id: "03731000426-26",
    title: "Поставка светотехнического оборудования для учреждения",
    source: "ЕИС",
    customer: "ГБУ Жилищник района",
    nmck: "18.4 млн ₽",
    deadline: "18 июня, 14:00",
    region: "Москва",
    status: "AI-разбор",
    risk: "medium",
    match: 86,
  },
  {
    id: "32211984571",
    title: "Комплексное обслуживание инженерных систем",
    source: "223-ФЗ",
    customer: "АО Теплосеть",
    nmck: "42.8 млн ₽",
    deadline: "21 июня, 09:00",
    region: "Татарстан",
    status: "Поставщики",
    risk: "low",
    match: 78,
  },
  {
    id: "01622000118-26",
    title: "Закупка расходных материалов и комплектующих",
    source: "ЭТП",
    customer: "Минздрав региона",
    nmck: "7.9 млн ₽",
    deadline: "16 июня, 11:30",
    region: "Свердловская область",
    status: "Срок близко",
    risk: "high",
    match: 64,
  },
];

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

export const tasks: Task[] = [
  {
    title: "Проверить 3 low-confidence позиции",
    owner: "Закупщик",
    due: "сегодня, 16:00",
    tone: "warning",
  },
  {
    title: "Подтвердить список поставщиков",
    owner: "Менеджер",
    due: "сегодня, 18:00",
    tone: "neutral",
  },
  {
    title: "Срок подачи меньше 10 часов",
    owner: "B2G специалист",
    due: "критично",
    tone: "danger",
  },
];

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
