import { Sidebar } from "../app-shell";

const fields = [
  ["Компания", "ИНН, ОГРН, юридическое имя"],
  ["География", "регионы работы и исключения"],
  ["Категории", "ОКПД2, ОКВЭД, стоп-темы"],
  ["Экономика", "НМЦК min/max, маржинальность, НДС"],
  ["Команда", "роли, ответственные, эскалации"],
  ["Интеграции", "CRM, 1C, Telegram"],
];

export default function OnboardingPage() {
  return (
    <main className="app-shell">
      <Sidebar active="onboarding" />
      <section className="workspace">
        <header className="topline">
          <div>
            <p className="eyebrow">Company onboarding</p>
            <h1>Профиль компании</h1>
          </div>
          <button className="primary" type="button">
            Сохранить черновик
          </button>
        </header>

        <section className="route-grid">
          {fields.map(([title, text]) => (
            <article className="route-card" key={title}>
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </section>
      </section>
    </main>
  );
}
