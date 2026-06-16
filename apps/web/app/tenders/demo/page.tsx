import { Sidebar } from "../../app-shell";

const participationStages = ["Вход", "Оценка", "Позиции", "КП", "Top-3", "Экономика", "Подача", "Результат"];
const executionStages = ["Договор", "Оплата", "Закупка", "Исполнение", "Закрывающие", "Финальный расчет"];
const sourceFacts = [
  ["Источник", "zakupki.gov.ru"],
  ["Закон", "44-ФЗ"],
  ["Способ", "Электронный аукцион"],
  ["Срок подачи", "18 июня, 09:00"],
];
const aiChecks = [
  ["ТЗ", "3 позиции требуют ручного сопоставления с аналогами"],
  ["Поставщики", "7 кандидатов, 4 готовы дать КП до конца дня"],
  ["Экономика", "Маржа 11.8% после логистики и гарантии"],
];
const preWinAiGates = [
  ["ТЗ", "нельзя идти дальше без подтверждения аналогов"],
  ["КП", "минимум 3 валидных предложения с источником"],
  ["Экономика", "цена подачи, маржа и риск должны быть зафиксированы"],
  ["Подача", "AI блокирует заявку без полного пакета файлов"],
];
const nextActions = [
  ["Закупщик", "Получить 2 недостающих КП", "до 13:00"],
  ["Техэксперт", "Подтвердить аналоги по светильникам", "сегодня"],
  ["Финансы", "Зафиксировать минимальную цену подачи", "до подачи"],
];
const outcomeSnapshot = [
  ["Outcome", "manual_management", "AI предложил"],
  ["Reason", "Ручное управление", "не закрывать сделку"],
  ["Approval", "tender_manager", "обязательное подтверждение"],
  ["Evidence", "raw-eis-0373100042626000001", "source proof"],
];
const auditTrail = [
  ["08:00", "AI предложил outcome manual_management", "raw-eis-0373100042626000001"],
  ["08:03", "Создана задача на проверку аналогов", "task-qualification-001"],
  ["08:05", "Закрытие сделки заблокировано до владельца", "owner approval"],
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
            <h1>Поставка светотехнического оборудования</h1>
          </div>
          <span className="status-pill">AI рекомендует: ручная проверка</span>
        </header>

        <section className="panel">
          <div className="deal-grid">
            <article className="decision-card">
              <h3>AI Decision Card</h3>
              <p>Срок близко, 3 позиции требуют проверки, поставщиков достаточно для первичного запроса КП.</p>
              <dl>
                <div>
                  <dt>Решение</dt>
                  <dd>Идем в процедуру после проверки аналогов</dd>
                </div>
                <div>
                  <dt>Риск</dt>
                  <dd>Средний: срок и неполные КП</dd>
                </div>
                <div>
                  <dt>Следующий этап</dt>
                  <dd>Top-3 поставщика и экономика</dd>
                </div>
              </dl>
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
              {outcomeSnapshot.map(([label, value, note]) => (
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
              {auditTrail.map(([time, action, evidence]) => (
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
              {sourceFacts.map(([label, value]) => (
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
              {aiChecks.map(([label, value]) => (
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
              {nextActions.map(([owner, title, deadline]) => (
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
