export default function LoginPage() {
  return (
    <main className="auth-shell">
      <section className="auth-card">
        <p className="eyebrow">ASTS secure access</p>
        <h1>Вход в app.site.ru</h1>
        <p>
          Первый экран авторизации для тендерного отдела. Позже здесь будут SSO, Telegram linking и роли
          организации.
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
      </section>
    </main>
  );
}
