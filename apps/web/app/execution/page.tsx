import { Sidebar } from "../app-shell";

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
