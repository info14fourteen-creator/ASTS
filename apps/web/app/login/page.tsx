const accessModes = [
  ["Владелец", "управляет источниками, секретами, тарифом и участниками"],
  ["Партнер", "получает доступ к рабочей ветке, PR и задачам проекта"],
  ["Команда", "работает в кабинетах B2G, исполнения, документов и CRM"],
];

const accessChecks = ["2FA", "роль", "организация", "audit log"];

const sessionGuards = [
  ["IP/device", "новое устройство открывает только read-only preview"],
  ["Secrets", "источники, API ключи и тариф требуют повторного 2FA"],
  ["Role scope", "доступ к воронкам и файлам зависит от роли"],
  ["Audit", "вход, экспорт и смена стадии пишутся в журнал"],
];

export default function LoginPage() {
  return (
    <main className="auth-shell">
      <section className="auth-card">
        <div className="auth-main">
          <div>
            <p className="eyebrow">ASTS secure access</p>
            <h1>Вход в app.site.ru</h1>
            <p>
              Доступ к рабочему кабинету ASTS для владельца, партнера и тендерной команды. Роли и действия
              пишутся в аудит до подключения боевых источников.
            </p>
            <form className="form-grid">
              <label>
                Email
                <input placeholder="manager@company.ru" type="email" />
              </label>
              <label>
                Пароль
                <input placeholder="••••••••" type="password" />
              </label>
              <button className="primary" type="button">
                Войти
              </button>
            </form>
          </div>

          <aside className="auth-side" aria-label="Режимы доступа">
            <div className="access-checks">
              {accessChecks.map((check) => (
                <span key={check}>{check}</span>
              ))}
            </div>
            <div className="access-mode-list">
              {accessModes.map(([title, text]) => (
                <article className="access-mode" key={title}>
                  <strong>{title}</strong>
                  <small>{text}</small>
                </article>
              ))}
            </div>
            <div className="session-guard-list">
              {sessionGuards.map(([title, text]) => (
                <article className="session-guard" key={title}>
                  <strong>{title}</strong>
                  <small>{text}</small>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
