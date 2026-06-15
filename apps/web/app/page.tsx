import { Sidebar } from "./app-shell";

type Tender = {
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

type Task = {
  title: string;
  owner: string;
  due: string;
  tone: "neutral" | "warning" | "danger";
};

const tenders: Tender[] = [
  {
    id: "03731000426-26",
    title: "Поставка светотехнического оборудования для учреждения",
    source: "ЕИС",
    customer: "ГБУ Жилищник района",
    nmck: "18.4 млн ₽",
    deadline: "18 июня, 14:00",
    region: "Москва",
    status: "AI-разбор",
    risk: "medium",
    match: 86,
  },
  {
    id: "32211984571",
    title: "Комплексное обслуживание инженерных систем",
    source: "223-ФЗ",
    customer: "АО Теплосеть",
    nmck: "42.8 млн ₽",
    deadline: "21 июня, 09:00",
    region: "Татарстан",
    status: "Поставщики",
    risk: "low",
    match: 78,
  },
  {
    id: "01622000118-26",
    title: "Закупка расходных материалов и комплектующих",
    source: "ЭТП",
    customer: "Минздрав региона",
    nmck: "7.9 млн ₽",
    deadline: "16 июня, 11:30",
    region: "Свердловская область",
    status: "Срок близко",
    risk: "high",
    match: 64,
  },
];

const participationStages = [
  "Входящие",
  "Оценка",
  "Позиции",
  "КП",
  "Top-3",
  "Экономика",
  "Подача",
  "Результат",
];

const executionStages = [
  "Договор",
  "Оплата",
  "Закупка",
  "Исполнение",
  "Закрывающие",
  "Финальный расчет",
];

const tasks: Task[] = [
  {
    title: "Проверить 3 low-confidence позиции",
    owner: "Закупщик",
    due: "сегодня, 16:00",
    tone: "warning",
  },
  {
    title: "Подтвердить список поставщиков",
    owner: "Менеджер",
    due: "сегодня, 18:00",
    tone: "neutral",
  },
  {
    title: "Срок подачи меньше 10 часов",
    owner: "B2G специалист",
    due: "критично",
    tone: "danger",
  },
];

const commandSignals = [
  ["Primary feed", "ЕИС: 42 новых, ФНС: 6 проверок, ЭТП: 11 обновлений", "синхронизация 07:40"],
  ["AI triage", "5 процедур прошли автоскоринг, 3 отправлены на ручную проверку", "confidence threshold 85%"],
  ["Pre-win funnel", "2 карточки на этапе КП, 1 срок подачи меньше 10 часов", "сегодня"],
  ["Execution funnel", "1 контракт ждет УПД, 2 оплаты в контроле", "после победы"],
];

const mindMapParity = [
  ["2 воронки", "до победы и исполнение разделены в карточке процедуры", "covered"],
  ["Первоисточники", "ЕИС, ФНС и ЭТП отмечены как обязательные каналы", "covered"],
  ["AI вместо рутины", "скоринг, OCR и low-confidence проверки вынесены в задачи", "covered"],
  ["Старая схема", "оставить сверку PDF/mind map перед merge в main", "review"],
];

const previewReview = [
  ["Preview", "локальный Next preview сейчас, публично через GitHub Pages после merge", "смотреть"],
  ["PR #17", "codex/app-site-shell -> main, рабочая ветка не пушит напрямую в main", "review"],
  ["Routes", "Обзор, Тендеры, Источники, AI разбор, Исполнение, Задачи, Настройки", "click-through"],
  ["Merge gate", "build, browser smoke и сверка старой mind map перед объединением", "guard"],
];

const releaseReadiness = [
  ["Build", "16 static routes", "последняя сборка проходит"],
  ["Smoke", "desktop + mobile", "проверяем измененный маршрут"],
  ["Data safety", "backup + source ledger", "секреты и восстановление описаны"],
  ["Collaboration", "PR #17", "объединяем только после review"],
];

const integrations = [
  ["Bitrix24", "первая очередь"],
  ["amoCRM", "первая очередь"],
  ["1C", "обмен/импорт"],
  ["Telegram", "bot + mini app"],
  ["ЕИС", "primary source"],
  ["ФНС", "primary source"],
];

export default function Home() {
  const selectedTender = tenders[0];

  return (
    <main className="app-shell">
      <Sidebar active="overview" />

      <section className="workspace">
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

        <section className="panel parity-panel" aria-label="Сверка старой mind map">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Mind map parity</p>
              <h2>Что уже перенесено из старой логики</h2>
            </div>
            <span className="status-pill">3 / 4 covered</span>
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

        <section className="layout-grid">
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
        </section>

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

        <section className="layout-grid bottom-grid">
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
        </section>
      </section>
    </main>
  );
}
