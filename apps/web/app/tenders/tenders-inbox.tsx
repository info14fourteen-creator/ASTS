"use client";

import { useMemo, useState } from "react";

import { ownerApprovalHistoryRows, tenderInboxRows, type OutcomeStatus } from "../../lib/mock-data";
import { Sidebar } from "../app-shell";

export type OutcomeKey = "all" | OutcomeStatus;
type OutcomeTone = "blue" | "amber" | "green" | "neutral";

const rows = tenderInboxRows;
const approvedOwnerReceipt = ownerApprovalHistoryRows.find((row) => row.outcome === "approved");

const outcomeFilterSpecs = [
  ["all", "All", "Все outcome", "полная очередь inbox", "neutral"],
  ["suggested", "Suggested", "AI предложил", "ожидают owner review", "blue"],
  ["locked", "Locked", "Заблокировано", "нет owner approval", "amber"],
  ["approved", "Approved", "Подтверждено", "готово к handoff", "green"],
] satisfies [OutcomeKey, string, string, string, OutcomeTone][];

const outcomeCounts = rows.reduce(
  (counts, row) => ({
    ...counts,
    [row.outcome]: counts[row.outcome] + 1,
  }),
  { all: rows.length, suggested: 0, locked: 0, approved: 0 } satisfies Record<OutcomeKey, number>,
);

function procedureCountLabel(count: number): string {
  if (count % 10 === 1 && count % 100 !== 11) {
    return `${count} процедура`;
  }

  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
    return `${count} процедуры`;
  }

  return `${count} процедур`;
}

function outcomeLabel(outcome: OutcomeKey): string {
  return outcomeFilterSpecs.find(([key]) => key === outcome)?.[2] ?? "выбранному фильтру";
}

const intakeGates = [
  ["Источник", "ЕИС, 223-ФЗ API или ЭТП", "обязателен первоисточник"],
  ["Документы", "ТЗ, извещение, проект контракта", "нужен file hash"],
  ["Компания", "ОКПД2, регионы, стоп-темы", "сверить профиль"],
  ["Экономика", "НМЦК, маржа, обеспечение", "до решения о входе"],
];

const funnelRouting = [
  ["Reject", "стоп-тема, слабая экономика или нет первоисточника", "архив"],
  ["Pre-win", "AI confidence выше порога и есть ответственный", "воронка до победы"],
  ["Manual review", "аналоги, КП или логистика требуют подтверждения", "задачи"],
  ["Execution", "победа подтверждена протоколом и файлами", "вторая воронка"],
];

const executionHandoff = [
  ["Win protocol", "протокол победы сохранен из ЕИС или площадки", "source proof"],
  ["Document pack", "ТЗ, проект контракта, КП и расчет связаны с карточкой", "file hash"],
  ["Economics freeze", "маржа, обеспечение и риски зафиксированы перед исполнением", "no silent math"],
  ["Execution owner", "назначен ответственный за контракт, поставку и оплату", "human owner"],
];

export function TendersInbox({ initialOutcome }: { initialOutcome: OutcomeKey }) {
  const [activeOutcome, setActiveOutcome] = useState<OutcomeKey>(initialOutcome);
  const filteredRows = useMemo(
    () => rows.filter((row) => activeOutcome === "all" || row.outcome === activeOutcome),
    [activeOutcome],
  );
  const activeOutcomeSpec = outcomeFilterSpecs.find(([key]) => key === activeOutcome) ?? outcomeFilterSpecs[0];
  const [, activeOutcomeLabel, activeOutcomeTitle, activeOutcomeDetail] = activeOutcomeSpec;

  function selectOutcome(outcome: OutcomeKey) {
    setActiveOutcome(outcome);

    const url = new URL(window.location.href);
    if (outcome === "all") {
      url.searchParams.delete("outcome");
    } else {
      url.searchParams.set("outcome", outcome);
    }
    window.history.replaceState(null, "", `${url.pathname}${url.search}`);
  }

  return (
    <main className="app-shell">
      <Sidebar active="tenders" />
      <section className="workspace">
        <header className="topline">
          <div>
            <p className="eyebrow">Tender Inbox</p>
            <h1>Процедуры</h1>
          </div>
          <div className="top-actions">
            <button type="button">Фильтры</button>
            <button className="primary" type="button">
              Импортировать
            </button>
          </div>
        </header>

        <section className="panel tender-intake-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Pre-win intake</p>
              <h2>Что проверяем до первой воронки</h2>
            </div>
            <span className="status-pill green">primary source first</span>
          </div>
          <div className="tender-intake-grid">
            {intakeGates.map(([title, text, rule]) => (
              <article className="tender-intake-card" key={title}>
                <span>{rule}</span>
                <strong>{title}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel tender-routing-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Funnel routing</p>
              <h2>Куда попадает процедура после AI-решения</h2>
            </div>
            <span className="status-pill">two funnels</span>
          </div>
          <div className="tender-routing-grid">
            {funnelRouting.map(([title, rule, target]) => (
              <article className="tender-routing-card" key={title}>
                <span>{target}</span>
                <strong>{title}</strong>
                <p>{rule}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel execution-handoff-receipt-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Pre-win to execution handoff</p>
              <h2>Что должно перейти во вторую воронку</h2>
            </div>
            <span className="status-pill green">handoff locked</span>
          </div>
          <div className="execution-handoff-receipt-grid">
            {executionHandoff.map(([title, text, gate]) => (
              <article className="execution-handoff-receipt-card" key={title}>
                <span>{gate}</span>
                <strong>{title}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Outcome filters</p>
              <h2>Быстрый разбор AI-исходов</h2>
            </div>
            <span className="status-pill">suggested / locked / approved</span>
          </div>
          <div className="outcome-filter-grid">
            {outcomeFilterSpecs.map(([key, label, title, detail, tone]) => (
              <button
                aria-pressed={activeOutcome === key}
                className={`outcome-filter-card ${tone} ${activeOutcome === key ? "active" : ""}`}
                data-testid={`outcome-filter-${key}`}
                key={key}
                onClick={() => selectOutcome(key)}
                type="button"
              >
                <span>{label}</span>
                <strong>{title}</strong>
                <small>{procedureCountLabel(outcomeCounts[key])}</small>
                <p>{detail}</p>
              </button>
            ))}
          </div>
          <div
            aria-live="polite"
            className="owner-approval-browser-loop"
            data-active-outcome={activeOutcome}
            data-testid="owner-approval-browser-loop"
            data-visible-count={filteredRows.length}
          >
            <div>
              <span>Owner approval receipt</span>
              <strong>
                Активный outcome: {activeOutcome} · {procedureCountLabel(filteredRows.length)}
              </strong>
              <p>
                Фильтр, URL и видимые процедуры должны совпадать перед ручным подтверждением и handoff во вторую
                воронку.
              </p>
            </div>
            <dl>
              <div>
                <dt>Filter</dt>
                <dd>{activeOutcomeLabel}</dd>
              </div>
              <div>
                <dt>Gate</dt>
                <dd>{activeOutcomeTitle}</dd>
              </div>
              <div>
                <dt>Owner rule</dt>
                <dd>{activeOutcomeDetail}</dd>
              </div>
            </dl>
          </div>
          <div
            className="owner-approval-history"
            data-history-count={ownerApprovalHistoryRows.length}
            data-last-approved={approvedOwnerReceipt?.id ?? "none"}
            data-testid="owner-approval-receipt-history"
          >
            <div>
              <span>Owner approval receipt history</span>
              <strong>Последние подтверждения перед handoff</strong>
              <p>
                AI может предложить исход, но история хранит, кто подтвердил или заблокировал решение, по какому
                evidence и можно ли переводить процедуру во вторую воронку.
              </p>
            </div>
            <div className="owner-approval-history-list">
              {ownerApprovalHistoryRows.map((receipt) => (
                <article
                  className={`owner-approval-history-row ${receipt.outcome}`}
                  data-evidence={receipt.evidence}
                  data-handoff={receipt.handoff}
                  data-outcome={receipt.outcome}
                  key={receipt.id}
                >
                  <span>{receipt.timestamp}</span>
                  <strong>{receipt.id}</strong>
                  <em>{receipt.owner}</em>
                  <p>{receipt.action}</p>
                  <small>{receipt.evidence}</small>
                  <b>{receipt.handoff}</b>
                </article>
              ))}
            </div>
          </div>
          <div className="tender-table">
            <div className="table-row table-head tender-inbox-row">
              <span>Номер</span>
              <span>Outcome</span>
              <span>Источник</span>
              <span>Предмет</span>
              <span>НМЦК</span>
              <span>Срок</span>
              <span>AI</span>
            </div>
            {filteredRows.map((row) => (
              <a className="table-row tender-row table-link tender-inbox-row" href={`/tenders/${row.id}`} key={row.id}>
                <div>
                  <strong>{row.id}</strong>
                  <small>{row.nextAction}</small>
                </div>
                <span className={`outcome-state-pill ${row.outcome}`}>{row.outcome}</span>
                <span>{row.source}</span>
                <div>
                  <strong>{row.title}</strong>
                  <small>{row.reason}</small>
                </div>
                <span>{row.nmck}</span>
                <span>{row.deadline}</span>
                <span className={`risk ${row.risk}`}>{row.match}</span>
              </a>
            ))}
            {filteredRows.length === 0 ? (
              <div className="tender-empty-state">
                <span>{outcomeLabel(activeOutcome)}</span>
                <strong>По этому outcome сейчас нет процедур</strong>
                <p>
                  Очередь не сломана: выбранный фильтр просто не нашел процедур в текущем наборе. Откройте полный
                  inbox через All или добавьте новый fixture-сценарий.
                </p>
              </div>
            ) : null}
          </div>
        </section>
      </section>
    </main>
  );
}
