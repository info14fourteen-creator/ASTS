import { Sidebar } from "../app-shell";

const sourceRules = [
  ["ЕИС / zakupki.gov.ru", "только официальный API и выгрузки ЕИС"],
  ["ФНС", "проверка контрагентов, ИНН, статуса и рисков"],
  ["ЭТП", "интеграции с площадками как первоисточниками"],
  ["Файлы процедуры", "локальное хранение извещений, ТЗ, протоколов и контрактов"],
];

const coefficients = [
  ["Минимальная маржа", "0.85", "порог для быстрых отсечек до ручной проверки"],
  ["Коэффициент выплат", "0.84", "учет налоговой и операционной нагрузки"],
  ["НДС", "20%", "используется в расчетах цены и исполнения"],
  ["Логистика по умолчанию", "4%", "резерв, если нет точной сметы доставки"],
  ["Дедлайн-стоп", "10 ч", "эскалация при коротком сроке подачи"],
];

const accessRules = [
  ["Владелец", "управляет тарифом, источниками и секретами"],
  ["B2G менеджер", "ведет воронку до победы"],
  ["Исполнение", "видит вторую воронку и задачи по контракту"],
  ["Партнер", "работает в отдельной ветке и через PR"],
];

export default function SettingsPage() {
  return (
    <main className="app-shell">
      <Sidebar active="settings" />
      <section className="workspace">
        <header className="topline">
          <div>
            <p className="eyebrow">Workspace settings</p>
            <h1>Настройки рабочего кабинета</h1>
          </div>
          <button className="primary" type="button">
            Сохранить
          </button>
        </header>

        <section className="layout-grid">
          <article className="panel span-6">
            <div className="panel-head compact">
              <div>
                <p className="eyebrow">Company</p>
                <h2>Профиль организации</h2>
              </div>
              <span className="status-pill">68%</span>
            </div>
            <div className="settings-list">
              <div className="setting-row">
                <span>Юрлицо</span>
                <strong>АО "СВЕТ"</strong>
              </div>
              <div className="setting-row">
                <span>ИНН / ОГРН</span>
                <strong>ожидает заполнение</strong>
              </div>
              <div className="setting-row">
                <span>Регионы участия</span>
                <strong>Москва, ЦФО, ПФО</strong>
              </div>
              <div className="setting-row">
                <span>Стоп-темы</span>
                <strong>непрофильные ОКПД2, низкая маржа, короткий срок</strong>
              </div>
            </div>
          </article>

          <article className="panel span-6">
            <div className="panel-head compact">
              <div>
                <p className="eyebrow">Official sources only</p>
                <h2>Правила первоисточников</h2>
              </div>
            </div>
            <div className="source-grid">
              {sourceRules.map(([title, text]) => (
                <div className="source-rule" key={title}>
                  <strong>{title}</strong>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="panel span-7">
            <div className="panel-head compact">
              <div>
                <p className="eyebrow">Deal math</p>
                <h2>Коммерческие коэффициенты</h2>
              </div>
              <button type="button">История</button>
            </div>
            <div className="coefficient-grid">
              {coefficients.map(([title, value, text]) => (
                <div className="coefficient" key={title}>
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
                <p className="eyebrow">Access</p>
                <h2>Роли и безопасная работа</h2>
              </div>
            </div>
            <div className="settings-list">
              {accessRules.map(([role, text]) => (
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
