import { Sidebar } from "../app-shell";

const tasks = [
  ["Проверить 3 low-confidence позиции", "Закупщик", "warning"],
  ["Подтвердить список поставщиков", "Менеджер", "neutral"],
  ["Срок подачи меньше 10 часов", "B2G специалист", "danger"],
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
        </header>

        <section className="panel task-list">
          {tasks.map(([title, owner, tone]) => (
            <article className={`task ${tone}`} key={title}>
              <strong>{title}</strong>
              <span>{owner}</span>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
