import { Sidebar } from "../app-shell";
import { executionRows } from "../../lib/mock-data";

const executionStages = ["Договор", "Счет", "Закупка", "Поставка", "Закрывающие", "Финальный расчет"];

const obligations = [
  ["Подписать контракт", "ответственный: B2G менеджер", "done"],
  ["Выставить счет и получить аванс", "финансы, крайний срок 2 дня", "current"],
  ["Зафиксировать поставщиков", "закупщик, 3 КП подтверждены", "current"],
  ["Передать УПД и закрывающие", "после поставки", "pending"],
];

const payments = [
  ["Аванс", "30%", "ожидается"],
  ["Промежуточный акт", "40%", "после поставки"],
  ["Финальный расчет", "30%", "после закрывающих"],
];

const risks = [
  ["Просрочка оплаты", "проверить контакт заказчика и условия договора"],
  ["Замена позиции", "AI должен сверить аналог с ТЗ и протоколом"],
  ["Штрафы", "сроки и пени вынесены из проекта контракта"],
];

const executionStats = [
  ["Дней до поставки", "9", "контроль срока"],
  ["Аванс", "ожидается", "счет выставлен"],
  ["Маржа факт", "10.9%", "после закупки"],
  ["Закрывающие", "0/4", "пока не готовы"],
];

const paymentCollectionGate = [
  ["Invoice proof", "счет, сумма, НДС, реквизиты и дата отправки", "до ожидания оплаты"],
  ["Customer contact", "ответственный заказчика и канал напоминания", "если нет оплаты"],
  ["Document link", "контракт, счет и подтверждение отправки в file vault", "audit trail"],
  ["Escalation timer", "авто-задача при просрочке или молчании заказчика", "SLA payment"],
];

const executionAiGates = [
  ["Договор", "AI сверяет договор с ТЗ, протоколом и ценой победы", "блокирует замену условий"],
  ["Закупка", "AI проверяет КП, аналоги, сроки поставки и маржу", "ручное ok при аналоге"],
  ["Поставка", "AI держит дедлайн, адрес, комплектность и фото/накладные", "эскалация за 48 часов"],
  ["Оплата", "AI сверяет счет, УПД, акты и график платежей", "не закрывать без пакета"],
];

const winHandoff = [
  ["Протокол победы", "номер процедуры, итоговая цена, заказчик", "обязательно"],
  ["Экономика", "плановая маржа, поставщики, резерв риска", "из первой воронки"],
  ["Файлы", "контракт, ТЗ, протокол, КП и версии", "file vault"],
  ["Задачи", "ответственные, сроки, критические условия", "старт исполнения"],
];

const executionStartGate = [
  ["Winner proof", "протокол победы и цена победы связаны с карточкой процедуры", "без этого не открывать"],
  ["Contract baseline", "проект контракта, ТЗ и штрафы сверены до счета", "AI gate"],
  ["Economics lock", "плановая маржа, резерв и поставщики перенесены из pre-win", "owner approval"],
  ["Responsibility map", "финансы, закупка, логистика и бухгалтерия получили задачи", "audit trail"],
];

const documents = [
  ["Контракт", "подписан", "ЕИС", "готово", "Договор"],
  ["Счет на аванс", "выставлен", "1C", "ожидает", "Счет"],
  ["Спецификация", "сверка", "файл", "AI review", "Закупка"],
  ["УПД", "не создан", "1C", "после поставки", "Закрывающие"],
];

const acceptanceGates = [
  ["Поставка", "адрес, срок, комплектность и подтверждение заказчика", "до УПД"],
  ["Документы", "счет, акт, УПД, контракт и версии файлов", "file vault"],
  ["Экономика", "факт закупки, логистика, маржа и резерв риска", "до финального расчета"],
  ["Оплата", "график платежей, просрочка, контакт заказчика", "эскалация"],
];

const controlPoints = [
  ["Счет", "финансы", "сумма, НДС, реквизиты и срок оплаты", "до отправки"],
  ["Закупка", "закупщик", "КП, аналоги, логистика и фактическая маржа", "до заказа"],
  ["Поставка", "исполнение", "адрес, комплектность, фото и накладная", "до закрывающих"],
  ["Закрывающие", "бухгалтерия", "УПД, акт, счет-фактура и hash файлов", "до финального расчета"],
];

export default function ExecutionPage() {
  return (
    <main className="app-shell">
      <Sidebar active="execution" />
      <section className="workspace">
        <header className="topline">
          <div>
            <p className="eyebrow">Post-win funnel</p>
            <h1>Исполнение после победы</h1>
          </div>
          <button className="primary" type="button">
            Создать задачу
          </button>
        </header>

        <section className="panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Contract #0348300045126000192</p>
              <h2>Поставка светотехнического оборудования</h2>
            </div>
            <span className="status-pill">текущий этап: счет</span>
          </div>
          <div className="execution-stage-line">
            {executionStages.map((stage, index) => (
              <span className={index === 0 ? "complete" : index === 1 ? "current" : ""} key={stage}>
                {stage}
              </span>
            ))}
          </div>
        </section>

        <section className="panel execution-start-gate-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Execution start gate</p>
              <h2>Что должно быть закрыто до запуска второй воронки</h2>
            </div>
            <span className="status-pill green">win is not execution</span>
          </div>
          <div className="execution-start-gate-grid">
            {executionStartGate.map(([title, text, gate]) => (
              <article className="execution-start-gate-card" key={title}>
                <span>{gate}</span>
                <strong>{title}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel execution-handoff-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Win handoff</p>
              <h2>Что переносим из воронки до победы</h2>
            </div>
            <span className="status-pill green">separate funnel</span>
          </div>
          <div className="execution-handoff-grid">
            {winHandoff.map(([title, text, status]) => (
              <article className="execution-handoff-card" key={title}>
                <span>{status}</span>
                <strong>{title}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel execution-fixture-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Execution fixture inbox</p>
              <h2>Контракты только второй воронки</h2>
            </div>
            <span className="status-pill green">post-win only</span>
          </div>
          <div className="execution-fixture-table">
            <div className="execution-fixture-row execution-fixture-head">
              <span>Контракт</span>
              <span>Outcome</span>
              <span>Владелец</span>
              <span>Evidence</span>
              <span>Срок</span>
              <span>AI</span>
            </div>
            {executionRows.map((row) => (
              <article className="execution-fixture-row" key={row.id}>
                <div>
                  <strong>{row.id}</strong>
                  <small>{row.title}</small>
                  <em>{row.customer}</em>
                </div>
                <span className={`outcome-state-pill ${row.outcome}`}>{row.outcome}</span>
                <span>{row.owner}</span>
                <div>
                  <strong>{row.evidence}</strong>
                  <small>{row.documentCount} raw artifact(s)</small>
                </div>
                <span>{row.deadline}</span>
                <div>
                  <strong>{row.match}</strong>
                  <small>{row.note}</small>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="execution-health-grid">
          {executionStats.map(([label, value, text]) => (
            <article className="execution-health" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <small>{text}</small>
            </article>
          ))}
        </section>

        <section className="panel payment-collection-gate-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Payment collection gate</p>
              <h2>Что проверяем перед ожиданием оплаты</h2>
            </div>
            <span className="status-pill">cash control</span>
          </div>
          <div className="payment-collection-gate-grid">
            {paymentCollectionGate.map(([title, text, gate]) => (
              <article className="payment-collection-gate-card" key={title}>
                <span>{gate}</span>
                <strong>{title}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel execution-ai-gates-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI execution gates</p>
              <h2>Где AI останавливает исполнение</h2>
            </div>
            <span className="status-pill">human approval</span>
          </div>
          <div className="execution-ai-gates-grid">
            {executionAiGates.map(([stage, control, gate]) => (
              <article className="execution-ai-gate-card" key={stage}>
                <span>{stage}</span>
                <strong>{control}</strong>
                <p>{gate}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel execution-control-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Post-win control points</p>
              <h2>Кто подтверждает переходы второй воронки</h2>
            </div>
            <span className="status-pill">owner required</span>
          </div>
          <div className="execution-control-grid">
            {controlPoints.map(([stage, owner, proof, gate]) => (
              <article className="execution-control-card" key={stage}>
                <span>{gate}</span>
                <strong>{stage}</strong>
                <p>{proof}</p>
                <em>{owner}</em>
              </article>
            ))}
          </div>
        </section>

        <section className="panel execution-acceptance-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Acceptance gate</p>
              <h2>Что подтверждаем перед закрытием исполнения</h2>
            </div>
            <span className="status-pill green">post-win only</span>
          </div>
          <div className="execution-acceptance-grid">
            {acceptanceGates.map(([title, text, gate]) => (
              <article className="execution-acceptance-card" key={title}>
                <span>{gate}</span>
                <strong>{title}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="layout-grid bottom-grid">
          <article className="panel span-7">
            <div className="panel-head compact">
              <div>
                <p className="eyebrow">Obligations</p>
                <h2>Контроль обязательств</h2>
              </div>
            </div>
            <div className="execution-list">
              {obligations.map(([title, text, status]) => (
                <div className={`execution-item ${status}`} key={title}>
                  <strong>{title}</strong>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="panel span-5">
            <div className="panel-head compact">
              <div>
                <p className="eyebrow">Payments</p>
                <h2>Платежный график</h2>
              </div>
            </div>
            <div className="payment-grid">
              {payments.map(([title, value, text]) => (
                <div className="payment-card" key={title}>
                  <span>{title}</span>
                  <strong>{value}</strong>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="panel span-7">
            <div className="panel-head compact">
              <div>
                <p className="eyebrow">Closing pack</p>
                <h2>Документы исполнения</h2>
              </div>
              <span className="status-pill">4 документа</span>
            </div>
            <div className="document-table">
              <div className="document-row document-head">
                <span>Документ</span>
                <span>Статус</span>
                <span>Источник</span>
                <span>Контроль</span>
                <span>Этап</span>
              </div>
              {documents.map(([title, status, source, control, stage]) => (
                <div className="document-row" key={title}>
                  <strong>{title}</strong>
                  <span>{status}</span>
                  <span>{source}</span>
                  <span>{control}</span>
                  <span>{stage}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="panel span-7">
            <div className="panel-head compact">
              <div>
                <p className="eyebrow">AI support</p>
                <h2>Что контролирует AI</h2>
              </div>
            </div>
            <div className="quality-grid">
              <div className="quality-card">
                <strong>Договор vs ТЗ</strong>
                <p>сверка сроков, штрафов, объема поставки и условий оплаты</p>
              </div>
              <div className="quality-card">
                <strong>Поставщики</strong>
                <p>проверка КП, сроков доставки и замены позиций</p>
              </div>
              <div className="quality-card">
                <strong>Документы</strong>
                <p>акты, УПД, счет, закрывающие и версии файлов</p>
              </div>
              <div className="quality-card">
                <strong>Маржа</strong>
                <p>контроль фактических затрат против плановой экономики</p>
              </div>
            </div>
          </article>

          <article className="panel span-5">
            <div className="panel-head compact">
              <div>
                <p className="eyebrow">Escalations</p>
                <h2>Риски исполнения</h2>
              </div>
            </div>
            <div className="ingest-log">
              {risks.map(([title, text]) => (
                <div className="ingest-item" key={title}>
                  <strong>{title}</strong>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}
