import { Sidebar } from "../app-shell";

const fields = [
  ["Компания", "ИНН, ОГРН, юридическое имя", "готово"],
  ["География", "регионы работы и исключения", "черновик"],
  ["Категории", "ОКПД2, ОКВЭД, стоп-темы", "черновик"],
  ["Экономика", "НМЦК min/max, маржинальность, НДС", "нужно"],
  ["Команда", "роли, ответственные, эскалации", "черновик"],
  ["Интеграции", "CRM, 1C, Telegram", "нужно"],
];

const readiness = [
  ["Профиль заполнен", "68%"],
  ["AI фильтр", "черновик"],
  ["Источники", "6 источников"],
  ["CRM", "не подключено"],
];

const companyDataContract = [
  ["Юрлицо", "ИНН, ОГРН, КПП, НДС", "без этого не запускаем ФНС-проверку"],
  ["Профиль работ", "ОКПД2, бренды, аналоги", "без этого AI не ранжирует тендер"],
  ["Экономика", "маржа, НМЦК, логистика", "без этого нет авто-рекомендации цены"],
  ["Ограничения", "регионы, стоп-заказчики, сроки", "без этого тендер уходит человеку"],
];

const fitRules = [
  ["Берем в работу", "44-ФЗ / 223-ФЗ, светотехника, НМЦК от 2 до 60 млн ₽"],
  ["Отсечь сразу", "срок подачи меньше 10 часов без готового КП, маржа ниже 8%"],
  ["На ручную проверку", "неполное ТЗ, аналоги, нестандартная гарантия, новый заказчик"],
  ["После победы", "договор, счет, закупка, поставка, УПД, финальный расчет"],
];

const teamRoutes = [
  ["B2G менеджер", "ведет воронку до победы, принимает AI-рекомендации"],
  ["Техэксперт", "подтверждает аналоги, ТЗ и спорные позиции"],
  ["Финансы", "считает маржу, НДС, логистику и цену подачи"],
  ["Исполнение", "ведет вторую воронку после победы"],
];

const profileReadiness = [
  ["Юрданные", "ИНН/ОГРН подтверждены через ФНС", "до источников"],
  ["Номенклатура", "ОКПД2, бренды, аналоги и стоп-позиции", "до AI фильтра"],
  ["Порог входа", "маржа, НМЦК, логистика и обеспечение", "до рекомендации"],
  ["Роли", "кто подтверждает риск, цену и подачу", "до автозадач"],
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
          {fields.map(([title, text, status]) => (
            <article className="route-card" key={title}>
              <span>{status}</span>
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </section>

        <section className="onboarding-summary">
          {readiness.map(([label, value]) => (
            <article className="onboarding-stat" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </article>
          ))}
        </section>

        <section className="panel company-contract-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Company data contract</p>
              <h2>Какие данные нужны AI для подбора</h2>
            </div>
            <span className="status-pill green">profile-gated</span>
          </div>
          <div className="company-contract-grid">
            {companyDataContract.map(([title, data, rule]) => (
              <article className="company-contract-card" key={title}>
                <span>{data}</span>
                <strong>{title}</strong>
                <p>{rule}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel profile-readiness-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Profile readiness gate</p>
              <h2>Без чего AI не подбирает процедуры</h2>
            </div>
            <span className="status-pill">minimum profile</span>
          </div>
          <div className="profile-readiness-grid">
            {profileReadiness.map(([title, text, gate]) => (
              <article className="profile-readiness-card" key={title}>
                <span>{gate}</span>
                <strong>{title}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="layout-grid bottom-grid">
          <article className="panel span-7">
            <div className="panel-head compact">
              <div>
                <p className="eyebrow">AI qualification</p>
                <h2>Правила допуска к тендерам</h2>
              </div>
              <span className="status-pill">черновик</span>
            </div>
            <div className="fit-rule-grid">
              {fitRules.map(([title, text]) => (
                <div className="fit-rule" key={title}>
                  <strong>{title}</strong>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="panel span-5">
            <div className="panel-head compact">
              <div>
                <p className="eyebrow">Team routing</p>
                <h2>Кому что уходит</h2>
              </div>
            </div>
            <div className="settings-list">
              {teamRoutes.map(([role, text]) => (
                <div className="setting-row" key={role}>
                  <span>{role}</span>
                  <strong>{text}</strong>
                </div>
              ))}
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}
