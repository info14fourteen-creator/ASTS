import { Sidebar } from "./app-shell";

const recoveryRoutes = [
  ["/", "Обзор", "вернуться к утреннему контрольному слою"],
  ["/tenders", "Тендеры", "продолжить работу с первой воронкой до победы"],
  ["/sources", "Источники", "проверить первоисточники, SLA и evidence gate"],
  ["/execution", "Исполнение", "перейти во вторую воронку после победы"],
  ["/tasks", "Задачи", "посмотреть эскалации и 12-минутный цикл"],
  ["/plan", "План", "сверить текущий 80-пунктовый план разработки"],
  ["/settings", "Настройки", "проверить доступы, backup и merge gates"],
];

export default function NotFound() {
  return (
    <main className="app-shell">
      <Sidebar active="" />
      <section className="workspace">
        <header className="topline">
          <div>
            <p className="eyebrow">404</p>
            <h1>Маршрут не найден</h1>
          </div>
          <a className="primary-link" href="/">
            В обзор
          </a>
        </header>

        <section className="route-grid" aria-label="Куда перейти дальше">
          {recoveryRoutes.map(([href, title, text]) => (
            <a className="route-card table-link" href={href} key={href}>
              <span>{href}</span>
              <h2>{title}</h2>
              <p>{text}</p>
            </a>
          ))}
        </section>
      </section>
    </main>
  );
}
