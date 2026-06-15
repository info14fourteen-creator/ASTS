import { Sidebar } from "../app-shell";

const assumptions = [
  ["НМЦК", "4 800 000 ₽", "цена процедуры из ЕИС"],
  ["Целевая цена", "4 080 000 ₽", "НМЦК x коэффициент 0.85"],
  ["Выплаты и налоги", "0.84", "операционная нагрузка из настроек"],
  ["НДС", "20%", "расчет цены и исполнения"],
];

const costs = [
  ["Поставка", "2 940 000 ₽"],
  ["Логистика", "163 200 ₽"],
  ["Обеспечение", "96 000 ₽"],
  ["Операционные", "142 800 ₽"],
];

const checks = [
  ["Маржа до налогов", "738 000 ₽", "ok"],
  ["Резерв риска", "180 000 ₽", "review"],
  ["Порог входа", "пройден", "ok"],
  ["Нужна ручная проверка", "логистика", "warning"],
];

const accessPlans = [
  ["Pilot", "1 команда", "ЕИС, AI разбор, 2 воронки", "проверить ценность на 20 процедурах"],
  ["Team", "тендерный отдел", "CRM, роли, задачи, документы", "подключить Bitrix24/amoCRM"],
  ["Enterprise", "несколько юрлиц", "1C, аудит, SSO, SLA, API", "описать договор и поддержку"],
];

const entitlementGates = [
  ["Seat", "пользователь и роль", "без роли нет действий в воронках"],
  ["Source", "ЕИС, ФНС, ЭТП", "источник включен только после ключа/API"],
  ["AI pack", "разбор, evidence, confidence", "ниже тарифа уходит в preview"],
  ["Export", "CRM, 1C, Telegram", "выгрузка только после access check"],
];

export default function EconomicsPage() {
  return (
    <main className="app-shell">
      <Sidebar active="economics" />
      <section className="workspace">
        <header className="topline">
          <div>
            <p className="eyebrow">Deal economics</p>
            <h1>Экономика процедуры</h1>
          </div>
          <button className="primary" type="button">
            Пересчитать
          </button>
        </header>

        <section className="kpi-grid">
          <article className="metric">
            <span>Плановая маржа</span>
            <strong>18.1%</strong>
            <small>после резервов и операционной нагрузки</small>
          </article>
          <article className="metric">
            <span>Целевая цена</span>
            <strong>4.08M</strong>
            <small>НМЦК x 0.85</small>
          </article>
          <article className="metric">
            <span>Confidence</span>
            <strong>76%</strong>
            <small>логистика требует подтверждения</small>
          </article>
          <article className="metric">
            <span>Решение</span>
            <strong>Top-3</strong>
            <small>можно идти после проверки КП</small>
          </article>
        </section>

        <section className="layout-grid">
          <article className="panel span-7">
            <div className="panel-head compact">
              <div>
                <p className="eyebrow">Calculation</p>
                <h2>Расчет цены и затрат</h2>
              </div>
              <span className="status-pill">коэффициенты из настроек</span>
            </div>
            <div className="economics-grid">
              {assumptions.map(([title, value, text]) => (
                <div className="economics-card" key={title}>
                  <span>{title}</span>
                  <strong>{value}</strong>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="panel span-5">
            <div className="panel-head compact">
              <div>
                <p className="eyebrow">Cost stack</p>
                <h2>Структура затрат</h2>
              </div>
            </div>
            <div className="economics-list">
              {costs.map(([title, value]) => (
                <div className="economics-row" key={title}>
                  <span>{title}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </article>

          <article className="panel span-7">
            <div className="panel-head compact">
              <div>
                <p className="eyebrow">Checks</p>
                <h2>Контрольные выводы</h2>
              </div>
            </div>
            <div className="ai-review-list">
              {checks.map(([title, value, tone]) => (
                <div className={`ai-review-row ${tone}`} key={title}>
                  <div>
                    <strong>{title}</strong>
                    <p>{value}</p>
                  </div>
                  <span>{tone === "ok" ? "ok" : "check"}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="panel span-5">
            <div className="panel-head compact">
              <div>
                <p className="eyebrow">Next action</p>
                <h2>Что сделать перед подачей</h2>
              </div>
            </div>
            <div className="task-list">
              <article className="task warning">
                <strong>Подтвердить логистику</strong>
                <span>запросить КП по двум регионам</span>
              </article>
              <article className="task">
                <strong>Зафиксировать цену поставщика</strong>
                <span>срок действия КП должен покрыть подачу</span>
              </article>
            </div>
          </article>

          <article className="panel span-12">
            <div className="panel-head compact">
              <div>
                <p className="eyebrow">Access revenue</p>
                <h2>Контур продажи доступов</h2>
              </div>
              <span className="status-pill">pricing draft</span>
            </div>
            <div className="pricing-grid">
              {accessPlans.map(([name, scope, includes, next]) => (
                <article className="pricing-card" key={name}>
                  <span>{name}</span>
                  <strong>{scope}</strong>
                  <p>{includes}</p>
                  <em>{next}</em>
                </article>
              ))}
            </div>
            <div className="entitlement-grid">
              {entitlementGates.map(([title, scope, rule]) => (
                <article className="entitlement-card" key={title}>
                  <span>{scope}</span>
                  <strong>{title}</strong>
                  <p>{rule}</p>
                </article>
              ))}
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}
