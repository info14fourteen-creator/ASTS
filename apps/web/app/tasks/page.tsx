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
  ["Build", "npm run build", "каждая правка должна собрать 19 static routes", "required"],
  ["Smoke", "changed route", "DOM проверка desktop/mobile и чистая консоль", "required"],
  ["PR update", "codex/app-site-shell", "push только в PR ветку, main не трогаем", "safe"],
];

const automationPausePolicy = [
  ["Failed build", "не пушить дальше, пока npm run build не зеленый", "stop"],
  ["Dirty tree", "не трогать чужие файлы и не мержить смешанный diff", "review"],
  ["Broken smoke", "оставить PR открытым и зафиксировать маршрут/viewport", "block"],
  ["No owner", "AI не принимает продуктовый риск без владельца этапа", "handoff"],
];

const escalationRules = [
  ["Срок подачи", "меньше 10 часов", "B2G специалист", "немедленно"],
  ["AI confidence", "ниже 85%", "закупщик", "до КП"],
  ["Источник", "нет первичного файла или hash", "владелец источника", "до скоринга"],
  ["Исполнение", "оплата или УПД просрочены", "исполнение", "в день риска"],
];

const aiAutomationQueue = [
  ["Собрать документы", "AI скачивает и связывает файлы с процедурой", "нужен file hash"],
  ["Разобрать ТЗ", "AI выделяет требования, сроки, риски и аналоги", "ручная проверка low confidence"],
  ["Сверить компанию", "AI сравнивает профиль, ОКВЭД, опыт и ограничения", "только ФНС/ЕИС"],
  ["Подготовить действие", "AI ставит задачу, дедлайн и ответственного", "человек подтверждает"],
];

const mergeChecklist = [
  ["Build", "npm run build прошел на ветке"],
  ["Smoke", "проверены desktop и mobile ключевого маршрута"],
  ["Mind map", "новая логика привязана к старым этапам"],
  ["Review", "в PR есть статус, риски и следующий шаг"],
];

const reviewPacket = [
  ["Changed route", "какой экран кабинета изменен и зачем", "до review"],
  ["Verification", "build, desktop/mobile smoke, console health", "обязательно"],
  ["Product logic", "какая часть старой логики или новой воронки закрыта", "обязательно"],
  ["Next step", "что брать следующим маленьким инкрементом", "после review"],
];

const mergeRoom = [
  {
    title: "Готово к объединению",
    state: "green",
    owner: "Codex + партнер",
    checklist: ["ветка синхронизирована с main", "нет конфликтов", "PR checks зеленые"],
  },
  {
    title: "Останавливаем merge",
    state: "red",
    owner: "Автор PR",
    checklist: ["упал build", "есть чужие файлы в diff", "нет связи с майнд картой"],
  },
  {
    title: "Сверяем логику",
    state: "amber",
    owner: "Владелец продукта",
    checklist: ["две воронки сохранены", "первоисточник указан", "AI не принимает решение один"],
  },
  {
    title: "После merge",
    state: "blue",
    owner: "Дежурный",
    checklist: ["проверить GitHub Pages", "обновить план", "выдать следующий маленький шаг"],
  },
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

        <section className="panel escalation-rules-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Escalation rules</p>
              <h2>Когда автоматизация зовет человека</h2>
            </div>
            <span className="status-pill">human in loop</span>
          </div>
          <div className="escalation-rules-grid">
            {escalationRules.map(([trigger, threshold, owner, deadline]) => (
              <article className="escalation-rule-card" key={trigger}>
                <span>{threshold}</span>
                <strong>{trigger}</strong>
                <p>{owner}</p>
                <em>{deadline}</em>
              </article>
            ))}
          </div>
        </section>

        <section className="panel ai-automation-queue-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI work queue</p>
              <h2>Что автоматизируем вместо ручной рутины</h2>
            </div>
            <span className="status-pill green">human approval</span>
          </div>
          <div className="ai-automation-queue-grid">
            {aiAutomationQueue.map(([title, action, gate]) => (
              <article className="ai-automation-queue-card" key={title}>
                <strong>{title}</strong>
                <p>{action}</p>
                <em>{gate}</em>
              </article>
            ))}
          </div>
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

        <section className="panel automation-pause-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Automation pause policy</p>
              <h2>Когда 12-минутный цикл должен остановиться</h2>
            </div>
            <span className="status-pill">stop before damage</span>
          </div>
          <div className="automation-pause-grid">
            {automationPausePolicy.map(([title, rule, action]) => (
              <article className="automation-pause-card" key={title}>
                <span>{action}</span>
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

        <section className="panel review-packet-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Review packet</p>
              <h2>Что должно быть понятно перед объединением PR</h2>
            </div>
            <span className="status-pill">review-ready</span>
          </div>
          <div className="review-packet-grid">
            {reviewPacket.map(([title, text, gate]) => (
              <article className="review-packet-card" key={title}>
                <span>{gate}</span>
                <strong>{title}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel merge-room-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Merge room</p>
              <h2>Как объединяем без потери логики</h2>
            </div>
            <span className="status-pill green">two-person safe</span>
          </div>
          <div className="merge-room-grid">
            {mergeRoom.map(({ title, state, owner, checklist }) => (
              <article className={`merge-room-card ${state}`} key={title}>
                <span>{owner}</span>
                <strong>{title}</strong>
                <ul>
                  {checklist.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
