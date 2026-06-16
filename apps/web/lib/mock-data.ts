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

export type OutcomeStatus = "suggested" | "approved" | "locked";

export type TenderInboxRow = {
  id: string;
  outcome: OutcomeStatus;
  source: string;
  title: string;
  nmck: string;
  deadline: string;
  match: string;
  reason: string;
  nextAction: string;
  risk: Tender["risk"];
};

export type TenderDetail = {
  title: string;
  statusPill: string;
  decision: {
    summary: string;
    recommendation: string;
    risk: string;
    nextStage: string;
  };
  sourceFacts: [string, string][];
  aiChecks: [string, string][];
  nextActions: [string, string, string][];
  outcomeSnapshot: [string, string, string][];
  auditTrail: [string, string, string][];
  participationStageIndex: number;
};

export type Task = {
  title: string;
  owner: string;
  due: string;
  tone: "neutral" | "warning" | "danger";
};

export type DocumentRow = {
  title: string;
  source: string;
  ocr: string;
  ai: string;
  stage: string;
  blocker: string;
};

export type RawArtifactManifest = {
  title: string;
  artifactId: string;
  source: string;
  storage: string;
  checksum: string;
  contentType: string;
  collectedAt: string;
  custody: string;
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
type DemoDocument = (typeof demoData.documents)[number];
type DemoTender = (typeof demoData.tenders)[number];

function sourceLabel(sourceKind: string): string {
  return sourceLabels[sourceKind as SourceKind] ?? sourceKind;
}

function sourceApiLabel(sourceKind: string): string {
  return `${sourceLabel(sourceKind)} API`;
}

function tenderRisk(risk: string): TenderRisk {
  if (risk === "low" || risk === "medium" || risk === "high") {
    return risk;
  }

  return "medium";
}

function outcomeStatus(status: string): OutcomeStatus {
  if (status === "suggested" || status === "approved" || status === "locked") {
    return status;
  }

  return "suggested";
}

function taskTone(tone: string): TaskTone {
  if (tone === "neutral" || tone === "warning" || tone === "danger") {
    return tone;
  }

  return "neutral";
}

function documentSource(document: DemoDocument) {
  if ("source" in document) {
    return document.source;
  }

  return demoData.tenders.find((tender) => tender.tender_id === document.source_ref)?.source;
}

function documentTender(document: DemoDocument) {
  return demoData.tenders.find((tender) => tender.tender_id === document.tender_id);
}

function tenderTask(tender: DemoTender) {
  return demoData.tasks.find((task) => task.tender_id === tender.tender_id);
}

function documentOcr(document: DemoDocument): string {
  if (document.mime_type === "application/pdf") {
    return document.status === "raw" || document.status === "downloaded" ? "PDF" : "PDF + OCR";
  }

  if (document.mime_type === "application/json") {
    return "JSON";
  }

  return document.mime_type;
}

function documentAi(document: DemoDocument): string {
  if (document.status === "parsed") {
    return "AI готов";
  }

  if (document.status === "reviewed") {
    return "проверено";
  }

  return "AI ожидает";
}

function documentBlocker(status: string): string {
  const labels: Record<string, string> = {
    raw: "нужна загрузка",
    downloaded: "нужен OCR",
    ocr_ready: "ждет AI",
    parsed: "готово",
    reviewed: "проверено",
    attached: "прикреплено",
  };

  return labels[status] ?? status;
}

function formatCollectedAt(value: string): string {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function hostFromUrl(value: string): string {
  try {
    return new URL(value).hostname.replace(/^www\./, "");
  } catch {
    return value;
  }
}

function shortChecksum(value: string): string {
  return `${value.slice(0, 12)}...${value.slice(-6)}`;
}

function formatAuditTime(value: string): string {
  return new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
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

export const tenderInboxRows: TenderInboxRow[] = demoData.tenders
  .filter((tender) => tender.funnel === "pre_win")
  .map((tender) => {
    const task = tenderTask(tender);

    return {
      id: tender.tender_id,
      outcome: outcomeStatus(tender.outcome.status),
      source: sourceApiLabel(tender.source.source_kind),
      title: tender.title,
      nmck: tender.nmck_label,
      deadline: tender.deadline_label,
      match: `${tender.match}%`,
      reason: tender.outcome.note,
      nextAction: task?.title ?? tender.outcome.title,
      risk: tenderRisk(tender.risk),
    };
  });

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

const detailTender = demoData.tenders.find((tender) => tender.funnel === "pre_win") ?? demoData.tenders[0];
const detailTasks = demoData.tasks.filter((task) => task.tender_id === detailTender.tender_id);
const detailDocuments = demoData.documents.filter((document) => document.tender_id === detailTender.tender_id);

export const tenderDetail: TenderDetail = {
  title: detailTender.title,
  statusPill: `AI ${detailTender.outcome.status}: ${detailTender.outcome.title}`,
  decision: {
    summary: detailTender.outcome.note,
    recommendation: detailTender.outcome.title,
    risk: `${detailTender.risk} risk, match ${detailTender.match}%`,
    nextStage: detailTender.stage_label,
  },
  sourceFacts: [
    ["Источник", hostFromUrl(detailTender.source.source_url)],
    ["Raw artifact", detailTender.source.raw_artifact_id],
    ["Checksum", shortChecksum(detailTender.source.checksum_sha256)],
    ["Срок подачи", detailTender.deadline_label],
  ],
  aiChecks: [
    ["Outcome", detailTender.outcome.note],
    ["Confidence", `${Math.round(detailTender.ai_confidence * 100)}%`],
    ["Evidence", detailTender.outcome.source_ref],
    ["Документы", `${detailDocuments.length} raw artifact(s) attached`],
  ],
  nextActions: detailTasks.length
    ? detailTasks.map((task) => [task.owner_label, task.title, task.due_label])
    : [[detailTender.outcome.owner_role, detailTender.outcome.title, "owner approval"]],
  outcomeSnapshot: [
    ["Outcome", detailTender.outcome.code, detailTender.outcome.status],
    ["Reason", detailTender.outcome.title, detailTender.outcome.note],
    ["Approval", detailTender.outcome.owner_role, detailTender.outcome.requires_owner_approval ? "обязательно" : "не требуется"],
    ["Evidence", detailTender.outcome.source_ref, "source proof"],
  ],
  auditTrail: detailTender.audit_events.map((event) => [
    formatAuditTime(event.created_at),
    event.action,
    event.evidence_ref,
  ]),
  participationStageIndex: Math.max(
    0,
    ["intake", "qualification", "positions", "supplier_quotes", "top_3", "economics", "submission", "result"].indexOf(
      detailTender.stage,
    ),
  ),
};

export const tasks: Task[] = demoData.tasks.map((task) => ({
  title: task.title,
  owner: task.owner_label,
  due: task.due_label,
  tone: taskTone(task.tone),
}));

export const documentRows: DocumentRow[] = demoData.documents.map((document) => {
  const source = documentSource(document);
  const tender = documentTender(document);

  return {
    title: document.title,
    source: source ? sourceApiLabel(source.source_kind) : "Источник",
    ocr: documentOcr(document),
    ai: documentAi(document),
    stage: tender?.funnel === "execution" ? "исполнение" : "до победы",
    blocker: documentBlocker(document.status),
  };
});

export const rawArtifactManifests: RawArtifactManifest[] = demoData.documents.map((document) => ({
  title: document.title,
  artifactId: document.raw_artifact.artifact_id,
  source: hostFromUrl(document.raw_artifact.source_url),
  storage: document.raw_artifact.storage_path,
  checksum: document.raw_artifact.checksum_sha256,
  contentType: document.raw_artifact.content_type,
  collectedAt: formatCollectedAt(document.raw_artifact.collected_at),
  custody: document.raw_artifact.custody_status,
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
