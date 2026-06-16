import {
  commandSignals,
  executionStages,
  integrations,
  mindMapParity,
  operatorHandoff,
  participationStages,
  previewReview,
  pwaReadiness,
  releaseReadiness,
  tasks,
  tenders,
} from "../lib/mock-data";

function HomeHeader() {
  return (
    <header className="topline">
      <div>
        <p className="eyebrow">AI tender operations platform</p>
        <h1>Рабочий кабинет тендерного отдела</h1>
      </div>
      <div className="top-actions" aria-label="Быстрые действия">
        <button type="button">Импорт</button>
        <button type="button" className="primary">
          Новая процедура
        </button>
      </div>
    </header>
  );
}

function KpiGrid() {
  return (
    <section className="kpi-grid" aria-label="Операционные показатели">
      <div className="metric">
        <span>Новые процедуры</span>
        <strong>42</strong>
        <small>из ЕИС и ЭТП за сутки</small>
      </div>
      <div className="metric">
        <span>В работе</span>
        <strong>18</strong>
        <small>7 ждут поставщиков</small>
      </div>
      <div className="metric">
        <span>Срок &lt; 10 часов</span>
        <strong>3</strong>
        <small>нужна реакция менеджера</small>
      </div>
      <div className="metric">
        <span>Средний match</span>
        <strong>81%</strong>
        <small>по профилю компании</small>
      </div>
    </section>
  );
}

function CommandPanel() {
  return (
    <section className="panel command-panel" aria-label="Утренний контрольный слой">
      <div className="panel-head compact">
        <div>
          <p className="eyebrow">Morning control</p>
          <h2>Что требует внимания сейчас</h2>
        </div>
        <span className="status-pill">обновлено 07:40</span>
      </div>
      <div className="command-grid">
        {commandSignals.map(([title, text, status]) => (
          <article className="command-card" key={title}>
            <span>{title}</span>
            <strong>{text}</strong>
            <small>{status}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

function OperatorHandoffPanel() {
  return (
    <section className="panel operator-handoff-panel" aria-label="Утренний handoff команды">
      <div className="panel-head compact">
        <div>
          <p className="eyebrow">Operator handoff</p>
          <h2>Что фиксируем перед началом дня</h2>
        </div>
        <span className="status-pill green">review first</span>
      </div>
      <div className="operator-handoff-grid">
        {operatorHandoff.map(([title, text, scope]) => (
          <article className="operator-handoff-card" key={title}>
            <span>{scope}</span>
            <strong>{title}</strong>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function MindMapParityPanel() {
  return (
    <section className="panel parity-panel" aria-label="Сверка старой mind map">
      <div className="panel-head compact">
        <div>
          <p className="eyebrow">Mind map parity</p>
          <h2>Что уже перенесено из старой логики</h2>
        </div>
        <span className="status-pill">3 implemented</span>
      </div>
      <div className="parity-grid">
        {mindMapParity.map(([title, text, status]) => (
          <article className={`parity-card ${status}`} key={title}>
            <span>{status}</span>
            <strong>{title}</strong>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function PreviewPanel() {
  return (
    <section className="panel preview-panel" aria-label="Где смотреть и что ревьюить">
      <div className="panel-head compact">
        <div>
          <p className="eyebrow">Preview / Review</p>
          <h2>Где смотреть текущую сборку</h2>
        </div>
        <span className="status-pill">PR #17</span>
      </div>
      <div className="preview-grid">
        {previewReview.map(([title, text, status]) => (
          <article className="preview-card" key={title}>
            <span>{status}</span>
            <strong>{title}</strong>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ReleasePanel() {
  return (
    <section className="panel release-panel" aria-label="Готовность к объединению">
      <div className="panel-head compact">
        <div>
          <p className="eyebrow">Release readiness</p>
          <h2>Что должно быть зеленым перед merge</h2>
        </div>
        <span className="status-pill green">main protected</span>
      </div>
      <div className="release-grid">
        {releaseReadiness.map(([title, scope, text]) => (
          <article className="release-card" key={title}>
            <span>{scope}</span>
            <strong>{title}</strong>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function PwaReadinessPanel() {
  return (
    <section className="panel pwa-panel" aria-label="Готовность PWA">
      <div className="panel-head compact">
        <div>
          <p className="eyebrow">PWA readiness</p>
          <h2>Что нужно для web/mobile install</h2>
        </div>
        <span className="status-pill green">manifest live</span>
      </div>
      <div className="pwa-grid">
        {pwaReadiness.map(([title, text, status]) => (
          <article className={`pwa-card ${status}`} key={title}>
            <span>{status}</span>
            <strong>{title}</strong>
            <p>{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function TenderInboxPanel() {
  return (
    <section className="panel span-7" id="inbox">
      <div className="panel-head">
        <div>
          <p className="eyebrow">Tender Inbox</p>
          <h2>Процедуры из первоисточников</h2>
        </div>
        <div className="filters" aria-label="Фильтры">
          <span>ЕИС</span>
          <span>ФНС</span>
          <span>ЭТП</span>
        </div>
      </div>

      <div className="tender-table" role="table" aria-label="Список тендеров">
        <div className="table-row table-head" role="row">
          <span>Процедура</span>
          <span>НМЦК</span>
          <span>Срок</span>
          <span>Match</span>
        </div>
        {tenders.map((tender) => (
          <article className="table-row tender-row" key={tender.id} role="row">
            <div>
              <strong>{tender.title}</strong>
              <small>
                {tender.source} · {tender.id} · {tender.region}
              </small>
            </div>
            <span>{tender.nmck}</span>
            <span>{tender.deadline}</span>
            <span className={`risk ${tender.risk}`}>{tender.match}%</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function OnboardingPanel() {
  return (
    <section className="panel span-5">
      <div className="panel-head compact">
        <div>
          <p className="eyebrow">Onboarding</p>
          <h2>Профиль компании</h2>
        </div>
      </div>
      <div className="progress">
        <div style={{ width: "68%" }} />
      </div>
      <div className="checklist">
        <p className="done">ИНН/ОГРН и регионы</p>
        <p className="done">ОКПД2/ОКВЭД интересов</p>
        <p>Порог маржинальности</p>
        <p>CRM и роли сотрудников</p>
      </div>
    </section>
  );
}

function DealPanel() {
  const selectedTender = tenders[0];

  return (
    <section className="panel" id="deal">
      <div className="panel-head">
        <div>
          <p className="eyebrow">Карточка процедуры</p>
          <h2>{selectedTender.title}</h2>
        </div>
        <span className="status-pill">AI рекомендует: ручная проверка</span>
      </div>

      <div className="deal-grid">
        <div className="decision-card">
          <h3>AI Decision Card</h3>
          <dl>
            <div>
              <dt>Заказчик</dt>
              <dd>{selectedTender.customer}</dd>
            </div>
            <div>
              <dt>НМЦК</dt>
              <dd>{selectedTender.nmck}</dd>
            </div>
            <div>
              <dt>Риск</dt>
              <dd>срок подачи близко, 3 позиции требуют проверки</dd>
            </div>
            <div>
              <dt>Следующий шаг</dt>
              <dd>подтвердить позиции и отправить КП 8 поставщикам</dd>
            </div>
          </dl>
        </div>

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
  );
}

function TasksPanel() {
  return (
    <section className="panel span-6" id="tasks">
      <div className="panel-head compact">
        <div>
          <p className="eyebrow">Tasks</p>
          <h2>Задачи и эскалации</h2>
        </div>
      </div>
      <div className="task-list">
        {tasks.map((task) => (
          <article className={`task ${task.tone}`} key={task.title}>
            <strong>{task.title}</strong>
            <span>
              {task.owner} · {task.due}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}

function IntegrationsPanel() {
  return (
    <section className="panel span-6" id="integrations">
      <div className="panel-head compact">
        <div>
          <p className="eyebrow">CRM hub</p>
          <h2>Интеграции</h2>
        </div>
      </div>
      <div className="integration-grid">
        {integrations.map(([name, status]) => (
          <div className="integration" key={name}>
            <strong>{name}</strong>
            <span>{status}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function OverviewWorkspace() {
  return (
    <section className="workspace">
      <HomeHeader />
      <KpiGrid />
      <CommandPanel />
      <OperatorHandoffPanel />
      <MindMapParityPanel />
      <PreviewPanel />
      <ReleasePanel />
      <PwaReadinessPanel />

      <section className="layout-grid">
        <TenderInboxPanel />
        <OnboardingPanel />
      </section>

      <DealPanel />

      <section className="layout-grid bottom-grid">
        <TasksPanel />
        <IntegrationsPanel />
      </section>
    </section>
  );
}
