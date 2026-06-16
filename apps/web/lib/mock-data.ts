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

export type OwnerApprovalHistoryRow = {
  id: string;
  outcome: OutcomeStatus;
  owner: string;
  action: string;
  timestamp: string;
  evidence: string;
  handoff: string;
  note: string;
};

export type OwnerApprovalHandoffLockRow = {
  id: string;
  outcome: OutcomeStatus;
  owner: string;
  evidence: string;
  receipt: "present" | "missing";
  status: "unlocked" | "locked";
  gate: string;
  rule: string;
};

export type OwnerApprovalHandoffLockSummary = {
  approved: number;
  withReceipt: number;
  withoutReceipt: number;
  executionReady: number;
  blocked: number;
  status: "ready" | "locked";
};

export type ExecutionRow = {
  id: string;
  title: string;
  customer: string;
  stage: string;
  outcome: OutcomeStatus;
  owner: string;
  evidence: string;
  deadline: string;
  nmck: string;
  match: string;
  note: string;
  documentCount: number;
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
  ownerApproval: {
    required: boolean;
    status: string;
    ownerRole: string;
    evidence: string;
    note: string;
  };
  sourceIdHint: {
    tenderId: string;
    rawArtifactId: string;
    sourceRef: string;
    rule: string;
  };
  sourceEvidence: {
    url: string;
    host: string;
    rawArtifactId: string;
    checksum: string;
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

export type ExecutionDocumentRow = {
  title: string;
  artifactId: string;
  source: string;
  custody: string;
  stage: string;
  storage: string;
};

export type BlockedExecutionFixture = {
  id: string;
  title: string;
  owner: string;
  evidence: string;
  status: "blocked";
  artifactCount: number;
  missingArtifacts: number;
  minArtifacts: number;
  decision: string;
  rule: string;
};

export type ExecutionBlockedBrowserLoop = {
  status: "armed";
  route: string;
  selector: string;
  expectedStatus: "blocked";
  expectedArtifactCount: number;
  expectedMissingArtifacts: number;
  evidence: string;
  checks: [string, string][];
};

export type SourceUrlHealthState = {
  id: string;
  source: string;
  host: string;
  sourceUrl: string;
  rawArtifactId: string;
  status: "ready" | "quarantine" | "unavailable";
  lastChecked: string;
  freshness: string;
  owner: string;
  action: string;
  reason: string;
};

export type FixtureDriftQuarantineCopy = {
  status: "standby" | "quarantine";
  owner: string;
  aiGate: string;
  mergeGate: string;
  evidence: string;
  steps: [string, string][];
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

export const ownerApprovalHistoryRows: OwnerApprovalHistoryRow[] = demoData.tenders
  .filter((tender) => tender.funnel === "pre_win")
  .map((tender) => {
    const lastAudit = tender.audit_events.at(-1);

    return {
      id: tender.tender_id,
      outcome: outcomeStatus(tender.outcome.status),
      owner: lastAudit?.actor_role ?? tender.outcome.owner_role,
      action: lastAudit?.action ?? tender.outcome.code,
      timestamp: lastAudit ? formatAuditTime(lastAudit.created_at) : "нет события",
      evidence: lastAudit?.evidence_ref ?? tender.outcome.source_ref,
      handoff: tender.outcome.status === "approved" ? "ready for execution handoff" : "blocked before handoff",
      note: tender.outcome.note,
    };
  })
  .sort((left, right) => right.timestamp.localeCompare(left.timestamp));

export const ownerApprovalHandoffLockRows: OwnerApprovalHandoffLockRow[] = demoData.tenders
  .filter((tender) => tender.funnel === "pre_win")
  .map((tender) => {
    const lastAudit = tender.audit_events.at(-1);
    const hasOwnerReceipt =
      tender.outcome.status === "approved" &&
      lastAudit?.action === "outcome_approved" &&
      lastAudit.actor_role === tender.outcome.owner_role &&
      Boolean(lastAudit.evidence_ref);
    const isExecutionReady = tender.outcome.status === "approved" && hasOwnerReceipt;

    return {
      id: tender.tender_id,
      outcome: outcomeStatus(tender.outcome.status),
      owner: tender.outcome.owner_role,
      evidence: lastAudit?.evidence_ref ?? tender.outcome.source_ref,
      receipt: hasOwnerReceipt ? "present" : "missing",
      status: isExecutionReady ? "unlocked" : "locked",
      gate: isExecutionReady ? "execution handoff allowed" : "execution handoff locked",
      rule: isExecutionReady
        ? "approved outcome имеет owner receipt и source evidence, можно готовить вторую воронку."
        : "approved outcome без owner receipt не попадает в execution; suggested/locked остаются в pre-win.",
    };
  });

export const ownerApprovalHandoffLockSummary: OwnerApprovalHandoffLockSummary = {
  approved: ownerApprovalHandoffLockRows.filter((row) => row.outcome === "approved").length,
  withReceipt: ownerApprovalHandoffLockRows.filter((row) => row.outcome === "approved" && row.receipt === "present").length,
  withoutReceipt: ownerApprovalHandoffLockRows.filter((row) => row.outcome === "approved" && row.receipt === "missing").length,
  executionReady: ownerApprovalHandoffLockRows.filter((row) => row.status === "unlocked").length,
  blocked: ownerApprovalHandoffLockRows.filter((row) => row.status === "locked").length,
  status: ownerApprovalHandoffLockRows.some((row) => row.outcome === "approved" && row.receipt === "missing")
    ? "locked"
    : "ready",
};

export const executionRows: ExecutionRow[] = demoData.tenders
  .filter((tender) => tender.funnel === "execution")
  .map((tender) => ({
    id: tender.tender_id,
    title: tender.title,
    customer: tender.customer_name,
    stage: tender.stage_label,
    outcome: outcomeStatus(tender.outcome.status),
    owner: tender.outcome.owner_role,
    evidence: tender.outcome.source_ref,
    deadline: tender.deadline_label,
    nmck: tender.nmck_label,
    match: `${tender.match}%`,
    note: tender.outcome.note,
    documentCount: demoData.documents.filter((document) => document.tender_id === tender.tender_id).length,
  }));

export const executionDocumentRows: ExecutionDocumentRow[] = demoData.documents
  .filter((document) => documentTender(document)?.funnel === "execution")
  .map((document) => {
    const source = documentSource(document);

    return {
      title: document.title,
      artifactId: document.raw_artifact.artifact_id,
      source: source ? sourceApiLabel(source.source_kind) : "Источник",
      custody: document.raw_artifact.custody_status,
      stage: documentBlocker(document.status),
      storage: document.raw_artifact.storage_path,
    };
  });

const approvedPreWinHandoffTender =
  demoData.tenders.find((tender) => tender.funnel === "pre_win" && tender.outcome.status === "approved") ??
  demoData.tenders[0];
const lockedSourceTender =
  demoData.tenders.find((tender) => tender.funnel === "pre_win" && tender.outcome.status === "locked") ??
  demoData.tenders[1];
const executionSourceTender = demoData.tenders.find((tender) => tender.funnel === "execution") ?? demoData.tenders[0];

export const blockedExecutionFixture: BlockedExecutionFixture = {
  id: approvedPreWinHandoffTender.tender_id,
  title: approvedPreWinHandoffTender.title,
  owner: approvedPreWinHandoffTender.outcome.owner_role,
  evidence: approvedPreWinHandoffTender.outcome.source_ref,
  status: "blocked",
  artifactCount: 0,
  missingArtifacts: 3,
  minArtifacts: 3,
  decision: "execution handoff blocked",
  rule: "Победа подтверждена, но вторая воронка не открывается без протокола, контракта и счета в raw artifacts.",
};

export const executionBlockedBrowserLoop: ExecutionBlockedBrowserLoop = {
  status: "armed",
  route: "/execution",
  selector: "[data-testid='execution-artifact-blocked-fixture']",
  expectedStatus: "blocked",
  expectedArtifactCount: blockedExecutionFixture.artifactCount,
  expectedMissingArtifacts: blockedExecutionFixture.missingArtifacts,
  evidence: blockedExecutionFixture.evidence,
  checks: [
    ["Locate", "найти blocked fixture по data-testid, а не по визуальному порядку блоков"],
    ["Assert status", "сверить data-status=blocked и data-artifact-count=0"],
    ["Assert evidence", "сверить raw evidence и missingArtifacts=3"],
    ["Assert copy", "проверить текст: Победа не запускает исполнение без raw artifacts"],
  ],
};

export const sourceUrlHealthStates: SourceUrlHealthState[] = [
  {
    id: approvedPreWinHandoffTender.tender_id,
    source: sourceApiLabel(approvedPreWinHandoffTender.source.source_kind),
    host: hostFromUrl(approvedPreWinHandoffTender.source.source_url),
    sourceUrl: approvedPreWinHandoffTender.source.source_url,
    rawArtifactId: approvedPreWinHandoffTender.source.raw_artifact_id,
    status: "ready",
    lastChecked: formatAuditTime(approvedPreWinHandoffTender.audit_events.at(-1)?.created_at ?? "2026-06-11T10:00:00+05:00"),
    freshness: "fresh under 15 min",
    owner: approvedPreWinHandoffTender.outcome.owner_role,
    action: "AI scoring allowed",
    reason: "source_url, raw artifact и owner receipt совпали со shared fixture.",
  },
  {
    id: lockedSourceTender.tender_id,
    source: sourceApiLabel(lockedSourceTender.source.source_kind),
    host: hostFromUrl(lockedSourceTender.source.source_url),
    sourceUrl: lockedSourceTender.source.source_url,
    rawArtifactId: lockedSourceTender.source.raw_artifact_id,
    status: "quarantine",
    lastChecked: formatAuditTime(lockedSourceTender.audit_events.at(-1)?.created_at ?? "2026-06-11T10:20:00+05:00"),
    freshness: "schema drift",
    owner: lockedSourceTender.outcome.owner_role,
    action: "manual review before AI",
    reason: "первоисточник доступен, но нормализатор не имеет права перезаписать старую схему без решения владельца.",
  },
  {
    id: executionSourceTender.tender_id,
    source: sourceApiLabel(executionSourceTender.source.source_kind),
    host: hostFromUrl(executionSourceTender.source.source_url),
    sourceUrl: executionSourceTender.source.source_url,
    rawArtifactId: executionSourceTender.source.raw_artifact_id,
    status: "unavailable",
    lastChecked: "нет свежего ответа",
    freshness: "connector timeout",
    owner: executionSourceTender.outcome.owner_role,
    action: "retry 3x then escalate",
    reason: "площадочный status webhook не подтвержден, поэтому execution AI и handoff ждут новый raw response.",
  },
];

export const fixtureCoverage = {
  totalTenders: demoData.tenders.length,
  preWinTenders: demoData.tenders.filter((tender) => tender.funnel === "pre_win").length,
  executionTenders: demoData.tenders.filter((tender) => tender.funnel === "execution").length,
  documents: demoData.documents.length,
  executionArtifacts: demoData.documents.filter((document) => documentTender(document)?.funnel === "execution").length,
  tasks: demoData.tasks.length,
  outcomeStates: {
    suggested: demoData.tenders.filter((tender) => tender.outcome.status === "suggested").length,
    locked: demoData.tenders.filter((tender) => tender.outcome.status === "locked").length,
    approved: demoData.tenders.filter((tender) => tender.outcome.status === "approved").length,
  },
};

const fixturePreWinTenders = demoData.tenders.filter((tender) => tender.funnel === "pre_win");
const fixtureExecutionTenders = demoData.tenders.filter((tender) => tender.funnel === "execution");
const fixtureExecutionDocuments = demoData.documents.filter((document) => documentTender(document)?.funnel === "execution");

function outcomeCountLabel(source: typeof demoData.tenders): string {
  const suggested = source.filter((tender) => tender.outcome.status === "suggested").length;
  const locked = source.filter((tender) => tender.outcome.status === "locked").length;
  const approved = source.filter((tender) => tender.outcome.status === "approved").length;

  return `${suggested}/${locked}/${approved}`;
}

function inboxOutcomeCountLabel(source: TenderInboxRow[]): string {
  const suggested = source.filter((tender) => tender.outcome === "suggested").length;
  const locked = source.filter((tender) => tender.outcome === "locked").length;
  const approved = source.filter((tender) => tender.outcome === "approved").length;

  return `${suggested}/${locked}/${approved}`;
}

export const fixtureDriftChecks = [
  {
    label: "Pre-win detail routes",
    expected: `${fixturePreWinTenders.length}`,
    actual: `${tenderInboxRows.length}`,
    rule: "route smoke должен строить /tenders/[id] только из pre-win fixture",
  },
  {
    label: "Execution rows",
    expected: `${fixtureExecutionTenders.length}`,
    actual: `${executionRows.length}`,
    rule: "вторая воронка не смешивается с pre-win inbox",
  },
  {
    label: "Execution artifacts",
    expected: `${fixtureExecutionDocuments.length}`,
    actual: `${executionDocumentRows.length}`,
    rule: "handoff pack в /execution совпадает с raw documents fixture",
  },
  {
    label: "Outcome filter routes",
    expected: outcomeCountLabel(fixturePreWinTenders),
    actual: inboxOutcomeCountLabel(tenderInboxRows),
    rule: "suggested / locked / approved фильтры сверяются по pre-win rows",
  },
].map((check) => ({
  ...check,
  status: check.expected === check.actual ? "aligned" : "drift",
}));

export const fixtureDriftSummary = {
  status: fixtureDriftChecks.every((check) => check.status === "aligned") ? "aligned" : "drift",
  aligned: fixtureDriftChecks.filter((check) => check.status === "aligned").length,
  total: fixtureDriftChecks.length,
};

export const fixtureDriftQuarantineCopy: FixtureDriftQuarantineCopy = {
  status: fixtureDriftSummary.status === "aligned" ? "standby" : "quarantine",
  owner: "Release owner",
  aiGate:
    fixtureDriftSummary.status === "aligned"
      ? "AI может читать demo fixture, но guard остается перед каждым merge."
      : "AI review, handoff и auto-export блокируются до ручного решения владельца.",
  mergeGate:
    fixtureDriftSummary.status === "aligned"
      ? "Merge разрешен только пока Web build, Shared validation и route smoke считают одинаково."
      : "Merge стоп: сначала обновить shared fixture или smoke markers, затем повторить проверки.",
  evidence: "fixture-drift-warning / route smoke / packages/shared/demo-data/asts-demo.json",
  steps: [
    ["Freeze", "остановить AI выводы, handoff во вторую воронку и экспорт в CRM по затронутому count"],
    ["Locate", "сравнить expected/actual в guard, route smoke и shared fixture"],
    ["Decide", "либо обновить demo-data как источник правды, либо поправить UI/smoke, если ошибся экран"],
    ["Release", "снять quarantine только после green CI и owner approval в PR"],
  ],
};

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
const participationStageOrder = [
  "intake",
  "qualification",
  "positions",
  "supplier_quotes",
  "top_3",
  "economics",
  "submission",
  "result",
];

export const tenderDetailIds = demoData.tenders
  .filter((tender) => tender.funnel === "pre_win")
  .map((tender) => tender.tender_id);

export function getTenderDetail(tenderId: string): TenderDetail | undefined {
  const tender = demoData.tenders.find((item) => item.tender_id === tenderId && item.funnel === "pre_win");

  if (!tender) {
    return undefined;
  }

  const detailTasks = demoData.tasks.filter((task) => task.tender_id === tender.tender_id);
  const detailDocuments = demoData.documents.filter((document) => document.tender_id === tender.tender_id);

  return {
    title: tender.title,
    statusPill: `AI ${tender.outcome.status}: ${tender.outcome.title}`,
    decision: {
      summary: tender.outcome.note,
      recommendation: tender.outcome.title,
      risk: `${tender.risk} risk, match ${tender.match}%`,
      nextStage: tender.stage_label,
    },
    ownerApproval: {
      required: tender.outcome.requires_owner_approval,
      status: tender.outcome.requires_owner_approval ? "Owner approval required" : "Owner approval not required",
      ownerRole: tender.outcome.owner_role,
      evidence: tender.outcome.source_ref,
      note: tender.outcome.requires_owner_approval
        ? "AI предлагает исход, но закрытие сделки требует подтверждения владельца этапа."
        : "Исход можно закрыть без дополнительного владельца по текущей policy.",
    },
    sourceIdHint: {
      tenderId: tender.tender_id,
      rawArtifactId: tender.source.raw_artifact_id,
      sourceRef: tender.outcome.source_ref,
      rule: "Route `/tenders/[id]` принимает tender_id/regNumber, а raw artifact нужен только как evidence.",
    },
    sourceEvidence: {
      url: tender.source.source_url,
      host: hostFromUrl(tender.source.source_url),
      rawArtifactId: tender.source.raw_artifact_id,
      checksum: shortChecksum(tender.source.checksum_sha256),
    },
    sourceFacts: [
      ["Источник", hostFromUrl(tender.source.source_url)],
      ["Raw artifact", tender.source.raw_artifact_id],
      ["Checksum", shortChecksum(tender.source.checksum_sha256)],
      ["Срок подачи", tender.deadline_label],
    ],
    aiChecks: [
      ["Outcome", tender.outcome.note],
      ["Confidence", `${Math.round(tender.ai_confidence * 100)}%`],
      ["Evidence", tender.outcome.source_ref],
      ["Документы", `${detailDocuments.length} raw artifact(s) attached`],
    ],
    nextActions: detailTasks.length
      ? detailTasks.map((task) => [task.owner_label, task.title, task.due_label])
      : [[tender.outcome.owner_role, tender.outcome.title, "owner approval"]],
    outcomeSnapshot: [
      ["Outcome", tender.outcome.code, tender.outcome.status],
      ["Reason", tender.outcome.title, tender.outcome.note],
      ["Approval", tender.outcome.owner_role, tender.outcome.requires_owner_approval ? "обязательно" : "не требуется"],
      ["Evidence", tender.outcome.source_ref, "source proof"],
    ],
    auditTrail: tender.audit_events.map((event) => [
      formatAuditTime(event.created_at),
      event.action,
      event.evidence_ref,
    ]),
    participationStageIndex: Math.max(0, participationStageOrder.indexOf(tender.stage)),
  };
}

const defaultTenderDetail = getTenderDetail(detailTender.tender_id);

if (!defaultTenderDetail) {
  throw new Error("Demo tender detail fixture is missing");
}

export const tenderDetail = defaultTenderDetail;

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
