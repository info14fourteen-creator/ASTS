import { Sidebar } from "../app-shell";

const lanes = [
  {
    title: "AI проверка",
    count: "3",
    tasks: [
      ["Проверить 3 low-confidence позиции", "Закупщик", "warning", "до 11:30"],
      ["Подтвердить OCR по счету поставщика", "B2G специалист", "neutral", "сегодня"],
      ["Сверить аналоги с ТЗ", "Технический эксперт", "warning", "сегодня"],
    ],
  },
  {
    title: "До победы",
    count: "3",
    tasks: [
      ["Подтвердить список поставщиков", "Менеджер", "neutral", "2 часа"],
      ["Срок подачи меньше 10 часов", "B2G специалист", "danger", "срочно"],
      ["Пересчитать цену после КП", "Финансы", "warning", "до подачи"],
    ],
  },
  {
    title: "Исполнение",
    count: "3",
    tasks: [
      ["Выставить счет на аванс", "Финансы", "neutral", "завтра"],
      ["Передать УПД и закрывающие", "Исполнение", "neutral", "после поставки"],
      ["Проверить риск просрочки оплаты", "Аккаунт", "warning", "2 дня"],
    ],
  },
];

const collaboration = [
  ["PR #17", "codex/app-site-shell", "готов к review", "не мержить без второго взгляда"],
  ["Партнер", "своя ветка", "ждет первый пуш", "работать через Pull Request"],
  ["Merge window", "после smoke", "утреннее объединение", "main только после проверки"],
  ["Backlog", "mind map parity", "следующий крупный слой", "сверить старую логику"],
];

const handoffLoop = [
  ["Branch", "работаем в codex/* ветках", "main не трогаем напрямую"],
  ["Build", "каждые 12 минут", "фиксируем npm run build или причину блокера"],
  ["Smoke", "desktop + mobile", "проверяем маршрут, который изменяли"],
  ["PR note", "короткий статус", "что изменилось, что проверено, что дальше"],
];

const automationMonitor = [
  ["Heartbeat", "12 мин", "следующий инкремент запускается без ручного пинка", "running"],
  ["Build", "npm run build", "каждая правка должна собрать 16 static routes", "required"],
  ["Smoke", "changed route", "DOM проверка desktop/mobile и чистая консоль", "required"],
  ["PR update", "codex/app-site-shell", "push только в PR ветку, main не трогаем", "safe"],
];

const mergeChecklist = [
  ["Build", "npm run build прошел на ветке"],
  ["Smoke", "проверены desktop и mobile ключевого маршрута"],
  ["Mind map", "новая логика привязана к старым этапам"],
  ["Review", "в PR есть статус, риски и следующий шаг"],
];

export default function TasksPage() {
  return (
    <main className="app-shell">
      <Sidebar active="tasks" />
      <section className="workspace">
        <header className="topline">
          <div>
            <p className="eyebrow">Tasks</p>
            <h1>Задачи и эскалации</h1>
          </div>
          <button className="primary" type="button">
            Создать задачу
          </button>
        </header>

        <section className="task-lane-grid">
          {lanes.map((lane) => (
            <article className="panel task-lane" key={lane.title}>
              <div className="panel-head compact">
                <div>
                  <p className="eyebrow">{lane.count} активных</p>
                  <h2>{lane.title}</h2>
                </div>
              </div>
              <div className="task-list">
                {lane.tasks.map(([title, owner, tone, deadline]) => (
                  <article className={`task ${tone}`} key={title}>
                    <strong>{title}</strong>
                    <span>{owner}</span>
                    <em>{deadline}</em>
                  </article>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="panel automation-monitor-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Automation monitor</p>
              <h2>Что проверяет 12-минутный цикл</h2>
            </div>
            <span className="status-pill green">asts-app-site-ru-12</span>
          </div>
          <div className="automation-monitor-grid">
            {automationMonitor.map(([title, cadence, rule, tone]) => (
              <article className={`automation-monitor-card ${tone}`} key={title}>
                <span>{cadence}</span>
                <strong>{title}</strong>
                <p>{rule}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel collaboration-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Collaboration</p>
              <h2>Параллельная работа и объединение</h2>
            </div>
            <span className="status-pill">PR workflow</span>
          </div>
          <div className="collaboration-grid">
            {collaboration.map(([title, scope, state, rule]) => (
              <article className="collaboration-card" key={title}>
                <span>{scope}</span>
                <strong>{title}</strong>
                <p>{state}</p>
                <em>{rule}</em>
              </article>
            ))}
          </div>
        </section>

        <section className="panel handoff-loop-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">12-minute loop</p>
              <h2>Как передаем работу без потерь</h2>
            </div>
            <span className="status-pill green">safe handoff</span>
          </div>
          <div className="handoff-loop-grid">
            {handoffLoop.map(([title, cadence, rule]) => (
              <article className="handoff-loop-card" key={title}>
                <span>{cadence}</span>
                <strong>{title}</strong>
                <p>{rule}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel merge-readiness-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Merge readiness</p>
              <h2>Когда объединяем</h2>
            </div>
            <span className="status-pill">4 gates</span>
          </div>
          <div className="merge-checklist">
            {mergeChecklist.map(([title, description]) => (
              <article className="merge-check" key={title}>
                <strong>{title}</strong>
                <span>{description}</span>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
