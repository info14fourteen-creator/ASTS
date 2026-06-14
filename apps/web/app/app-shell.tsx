const navItems = [
  ["overview", "/", "Обзор"],
  ["tenders", "/tenders", "Тендеры"],
  ["deal", "/tenders/demo", "Карточка"],
  ["tasks", "/tasks", "Задачи"],
  ["integrations", "/integrations", "Интеграции"],
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
