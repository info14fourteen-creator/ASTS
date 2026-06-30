const navItems = [
  ["overview", "/", "Обзор"],
  ["tenders", "/tenders", "Тендеры"],
  ["sources", "/sources", "Источники"],
  ["documents", "/documents", "Файлы"],
  ["ai-review", "/ai-review", "AI разбор"],
  ["economics", "/economics", "Экономика"],
  ["deal", "/tenders/demo", "Карточка"],
  ["execution", "/execution", "Исполнение"],
  ["tasks", "/tasks", "Задачи"],
  ["integrations", "/integrations", "Интеграции"],
  ["plan", "/plan", "План"],
  ["settings", "/settings", "Настройки"],
  ["onboarding", "/onboarding", "Onboarding"],
];

export function Sidebar({ active }: { active: string }) {
  return (
    <aside className="sidebar" aria-label="Основная навигация">
      <div className="brand">
        <span>ASTS</span>
        <strong>app.site.ru</strong>
      </div>

      <nav>
        {navItems.map(([id, href, label]) => (
          <a className={active === id ? "active" : ""} href={href} key={id}>
            {label}
          </a>
        ))}
      </nav>

      <div className="tenant">
        <span>Компания</span>
        <strong>АО “СВЕТ”</strong>
        <p>Профиль заполнен на 68%</p>
      </div>
    </aside>
  );
}
