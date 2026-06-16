"use client";

import { useMemo, useState } from "react";

import { Sidebar } from "../app-shell";

type OutcomeKey = "all" | "suggested" | "locked" | "approved";
type OutcomeTone = "blue" | "amber" | "green" | "neutral";

const rows = [
  [
    "03731000426-26",
    "suggested",
    "ЕИС API",
    "Поставка светотехнического оборудования",
    "18.4 млн ₽",
    "18 июня",
    "86%",
    "совпадает ОКПД2, регион и история поставок",
    "проверить 3 позиции",
    "medium",
  ],
  [
    "32211984571",
    "approved",
    "223-ФЗ API",
    "Обслуживание инженерных систем",
    "42.8 млн ₽",
    "21 июня",
    "78%",
    "подходит по региону и маржинальности",
    "запросить КП",
    "low",
  ],
  [
    "01622000118-26",
    "locked",
    "ЭТП",
    "Расходные материалы и комплектующие",
    "7.9 млн ₽",
    "16 июня",
    "64%",
    "срок близко, часть требований спорная",
    "ручная проверка",
    "high",
  ],
];

const outcomeFilters = [
  ["all", "All", "Все outcome", "3 процедуры", "полная очередь inbox", "neutral"],
  ["suggested", "Suggested", "AI предложил", "2 процедуры", "ожидают owner review", "blue"],
  ["locked", "Locked", "Заблокировано", "1 процедура", "нет owner approval", "amber"],
  ["approved", "Approved", "Подтверждено", "0 процедур", "готово к handoff", "green"],
] satisfies [OutcomeKey, string, string, string, string, OutcomeTone][];

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
    () => rows.filter(([, outcome]) => activeOutcome === "all" || outcome === activeOutcome),
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
            {outcomeFilters.map(([key, label, title, count, detail, tone]) => (
              <button
                aria-pressed={activeOutcome === key}
                className={`outcome-filter-card ${tone} ${activeOutcome === key ? "active" : ""}`}
                key={key}
                onClick={() => setActiveOutcome(key)}
                type="button"
              >
                <span>{label}</span>
                <strong>{title}</strong>
                <small>{count}</small>
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
            {filteredRows.map(([id, outcome, source, title, nmck, deadline, match, reason, nextAction, risk]) => (
              <a className="table-row tender-row table-link tender-inbox-row" href="/tenders/demo" key={id}>
                <div>
                  <strong>{id}</strong>
                  <small>{nextAction}</small>
                </div>
                <span className={`outcome-state-pill ${outcome}`}>{outcome}</span>
                <span>{source}</span>
                <div>
                  <strong>{title}</strong>
                  <small>{reason}</small>
                </div>
                <span>{nmck}</span>
                <span>{deadline}</span>
                <span className={`risk ${risk}`}>{match}</span>
              </a>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
