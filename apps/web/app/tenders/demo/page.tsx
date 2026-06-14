import { Sidebar } from "../../app-shell";

const participationStages = ["Вход", "Оценка", "Позиции", "КП", "Top-3", "Экономика", "Подача", "Результат"];
const executionStages = ["Договор", "Оплата", "Закупка", "Исполнение", "Закрывающие", "Финальный расчет"];

export default function TenderCardPage() {
  return (
    <main className="app-shell">
      <Sidebar active="deal" />
      <section className="workspace">
        <header className="topline">
          <div>
            <p className="eyebrow">Карточка процедуры</p>
            <h1>Поставка светотехнического оборудования</h1>
          </div>
          <span className="status-pill">AI рекомендует: ручная проверка</span>
        </header>

        <section className="panel">
          <div className="deal-grid">
            <article className="decision-card">
              <h3>AI Decision Card</h3>
              <p>Срок близко, 3 позиции требуют проверки, поставщиков достаточно для первичного запроса КП.</p>
            </article>
            <div className="funnels">
              <div>
                <h3>Воронка 1: до победы</h3>
                <div className="stage-line">
                  {participationStages.map((stage, index) => (
                    <span className={index < 4 ? "complete" : index === 4 ? "current" : ""} key={stage}>
                      {stage}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3>Воронка 2: исполнение</h3>
                <div className="stage-line muted">
                  {executionStages.map((stage) => (
                    <span key={stage}>{stage}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
