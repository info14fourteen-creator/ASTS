"use client";

import { useMemo, useState } from "react";

import { tenderInboxRows, type OutcomeStatus } from "../../lib/mock-data";
import { Sidebar } from "../app-shell";

type OutcomeKey = "all" | OutcomeStatus;
type OutcomeTone = "blue" | "amber" | "green" | "neutral";

const rows = tenderInboxRows;

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

export default function TendersPage() {
  const [activeOutcome, setActiveOutcome] = useState<OutcomeKey>("all");
  const filteredRows = useMemo(
    () => rows.filter((row) => activeOutcome === "all" || row.outcome === activeOutcome),
    [activeOutcome],
  );

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
                key={key}
                onClick={() => setActiveOutcome(key)}
                type="button"
              >
                <span>{label}</span>
                <strong>{title}</strong>
                <small>{procedureCountLabel(outcomeCounts[key])}</small>
                <p>{detail}</p>
              </button>
            ))}
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
              <a className="table-row tender-row table-link tender-inbox-row" href="/tenders/demo" key={row.id}>
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
                  Очередь не сломана: shared fixture пока содержит только suggested pre-win процедуры. Следующий
                  шаг - добавить approved/locked примеры или открыть полный inbox через All.
                </p>
              </div>
            ) : null}
          </div>
        </section>
      </section>
    </main>
  );
}
