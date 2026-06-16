import { Sidebar } from "../../app-shell";
import { executionStages, participationStages, tenderDetail } from "../../../lib/mock-data";

const preWinAiGates = [
  ["ТЗ", "нельзя идти дальше без подтверждения аналогов"],
  ["КП", "минимум 3 валидных предложения с источником"],
  ["Экономика", "цена подачи, маржа и риск должны быть зафиксированы"],
  ["Подача", "AI блокирует заявку без полного пакета файлов"],
];
const outcomeStates = [
  ["approved", "Владелец подтвердил исход", "переход разрешен", "green"],
  ["locked", "AI или правило заблокировали закрытие", "нужен owner approval", "amber"],
  ["rejected", "Сделка завершена с причиной отказа", "архив без удаления истории", "red"],
];

export default function TenderCardPage() {
  return (
    <main className="app-shell">
      <Sidebar active="deal" />
      <section className="workspace">
        <header className="topline">
          <div>
            <p className="eyebrow">Карточка процедуры</p>
            <h1>{tenderDetail.title}</h1>
          </div>
          <span className="status-pill">{tenderDetail.statusPill}</span>
        </header>

        <section className="panel">
          <div className="deal-grid">
            <article className="decision-card">
              <h3>AI Decision Card</h3>
              <p>{tenderDetail.decision.summary}</p>
              <dl>
                <div>
                  <dt>Решение</dt>
                  <dd>{tenderDetail.decision.recommendation}</dd>
                </div>
                <div>
                  <dt>Риск</dt>
                  <dd>{tenderDetail.decision.risk}</dd>
                </div>
                <div>
                  <dt>Следующий этап</dt>
                  <dd>{tenderDetail.decision.nextStage}</dd>
                </div>
              </dl>
            </article>
            <div className="funnels">
              <div>
                <h3>Воронка 1: до победы</h3>
                <div className="stage-line">
                  {participationStages.map((stage, index) => (
                    <span
                      className={
                        index < tenderDetail.participationStageIndex
                          ? "complete"
                          : index === tenderDetail.participationStageIndex
                            ? "current"
                            : ""
                      }
                      key={stage}
                    >
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

        <section className="panel prewin-ai-gates-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Pre-win AI gates</p>
              <h2>Где AI останавливает подачу</h2>
            </div>
            <span className="status-pill">до победы</span>
          </div>
          <div className="prewin-ai-gates-grid">
            {preWinAiGates.map(([stage, gate]) => (
              <article className="prewin-ai-gate-card" key={stage}>
                <span>{stage}</span>
                <strong>{gate}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="outcome-audit-grid">
          <article className="panel outcome-reason-panel">
            <div className="panel-head compact">
              <div>
                <p className="eyebrow">Outcome / reason</p>
                <h2>Исход сделки и причина</h2>
              </div>
              <span className="status-pill">AI suggested</span>
            </div>
            <div className="outcome-reason-grid">
              {tenderDetail.outcomeSnapshot.map(([label, value, note]) => (
                <article className="outcome-reason-card" key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                  <p>{note}</p>
                </article>
              ))}
            </div>
          </article>

          <article className="panel outcome-audit-panel">
            <div className="panel-head compact">
              <div>
                <p className="eyebrow">Audit trail</p>
                <h2>Почему карточку нельзя закрыть молча</h2>
              </div>
              <span className="status-pill green">owner required</span>
            </div>
            <div className="outcome-audit-list">
              {tenderDetail.auditTrail.map(([time, action, evidence]) => (
                <article key={`${time}-${action}`}>
                  <span>{time}</span>
                  <strong>{action}</strong>
                  <em>{evidence}</em>
                </article>
              ))}
            </div>
          </article>
        </section>

        <section className="panel outcome-states-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Outcome states</p>
              <h2>Как меняется карточка после решения</h2>
            </div>
            <span className="status-pill">approved / locked / rejected</span>
          </div>
          <div className="outcome-states-grid">
            {outcomeStates.map(([state, rule, gate, tone]) => (
              <article className={`outcome-state-card ${tone}`} key={state}>
                <span>{state}</span>
                <strong>{rule}</strong>
                <p>{gate}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="deal-detail-grid">
          <article className="panel">
            <div className="panel-head compact">
              <div>
                <p className="eyebrow">Первоисточник</p>
                <h2>Паспорт процедуры</h2>
              </div>
              <span className="status-pill green">синхронизировано</span>
            </div>
            <dl className="fact-list">
              {tenderDetail.sourceFacts.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </article>

          <article className="panel">
            <div className="panel-head compact">
              <div>
                <p className="eyebrow">AI разбор</p>
                <h2>Что проверено</h2>
              </div>
            </div>
            <div className="analysis-list">
              {tenderDetail.aiChecks.map(([label, value]) => (
                <div key={label}>
                  <strong>{label}</strong>
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="panel">
            <div className="panel-head compact">
              <div>
                <p className="eyebrow">До победы</p>
                <h2>Следующие действия</h2>
              </div>
              <button type="button">В задачи</button>
            </div>
            <div className="action-list">
              {tenderDetail.nextActions.map(([owner, title, deadline]) => (
                <article key={title}>
                  <span>{owner}</span>
                  <strong>{title}</strong>
                  <em>{deadline}</em>
                </article>
              ))}
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}
