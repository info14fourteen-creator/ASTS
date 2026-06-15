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
      </section>
    </main>
  );
}
