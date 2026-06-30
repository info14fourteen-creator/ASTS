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

const roleChangeGuard = [
  ["Reason", "зачем меняем доступ или роль участника", "до изменения"],
  ["Scope", "какие источники, CRM, файлы и ветки будут доступны", "review"],
  ["Secret impact", "нужно ли ротировать пароль, API key или CRM token", "security"],
  ["Audit note", "кто подтвердил и когда изменение вступило в силу", "обязательно"],
];

const approvalMatrix = [
  ["Источники", "Владелец", "добавление API ключей и смена канала импорта"],
  ["AI вывод", "B2G менеджер", "подтверждение допуска процедуры к КП"],
  ["Победа", "Владелец + исполнение", "перевод карточки во вторую воронку"],
  ["Merge", "reviewer", "объединение веток только после build и smoke"],
];

const guardrails = [
  ["GitHub Secrets", "пароли и API ключи не попадают в код, только в секреты репозитория"],
  ["Audit trail", "логируем импорт, AI выводы, загрузку файлов, смену стадии и экспорт в CRM"],
  ["Partner workflow", "партнер работает через отдельную ветку, PR и review перед объединением"],
  ["Human approval", "подача заявки, платежи, смена источников и удаление файлов требуют подтверждения"],
];

const secretRotation = [
  ["Owner password", "личный доступ владельца", "90 дней", "смена при новом партнере"],
  ["Source API keys", "ЕИС, ФНС, ЭТП и file vault", "60 дней", "заморозить импорт при утечке"],
  ["CRM tokens", "Bitrix24, amoCRM, 1C и Telegram", "30 дней", "отключить sync до проверки"],
  ["Emergency revoke", "подозрение на компрометацию", "сразу", "audit export и новый secret"],
];

const environmentSecrets = [
  ["OPENAI_API_KEY", "AI review и разбор документов", "AI выводы заблокированы"],
  ["ZAKUPKI_GOV_API", "импорт ЕИС и файлов процедур", "новые процедуры не импортируются"],
  ["FNS_API_KEY", "проверка ИНН и статуса компаний", "контрагент идет в ручную проверку"],
  ["CRM_SYNC_TOKEN", "экспорт сделок, задач и файлов в CRM", "sync остается в локальной очереди"],
];

const backupPlan = [
  ["Postgres snapshot", "каждые 6 часов", "процедуры, стадии, задачи, настройки"],
  ["File vault mirror", "каждый импорт", "оригиналы ТЗ, протоколы, КП, OCR и hash"],
  ["Search rebuild", "ночью", "индекс можно пересобрать из БД и файлов"],
  ["Audit export", "раз в сутки", "лог решений, AI выводов, CRM выгрузок и доступов"],
];

const domainRollout = [
  ["DNS", "app.site.ru -> production host", "проверить CNAME/A и TTL перед релизом"],
  ["TLS", "HTTPS + HSTS", "сертификат должен обновляться автоматически"],
  ["Runtime env", "GitHub Secrets / hosting env", "ключи API и пароли не попадают в код"],
  ["Go-live smoke", "login, sources, tasks, AI review", "проверка после каждого выката"],
];

const partnerAccess = [
  ["GitHub", "доступ в репозиторий, работа только через feature-ветку и Pull Request"],
  ["Secrets", "личный пароль, токены API и ключи площадок хранятся в GitHub Secrets"],
  ["Codex prompt", "партнер просит настроить свой GitHub-доступ и не пушить напрямую в main"],
  ["First PR", "первый вклад должен содержать build, smoke и краткий статус"],
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

          <article className="panel span-12 role-change-guard-panel">
            <div className="panel-head compact">
              <div>
                <p className="eyebrow">Role change guard</p>
                <h2>Что фиксируем перед изменением доступа</h2>
              </div>
              <span className="status-pill green">least privilege</span>
            </div>
            <div className="role-change-guard-grid">
              {roleChangeGuard.map(([title, text, gate]) => (
                <article className="role-change-guard-card" key={title}>
                  <span>{gate}</span>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </article>

          <article className="panel span-12 access-approval-panel">
            <div className="panel-head compact">
              <div>
                <p className="eyebrow">Approval matrix</p>
                <h2>Кто подтверждает критичные действия</h2>
              </div>
              <span className="status-pill">no silent changes</span>
            </div>
            <div className="approval-matrix">
              <div className="approval-row approval-head">
                <span>Зона</span>
                <span>Ответственный</span>
                <span>Что нельзя менять без следа</span>
              </div>
              {approvalMatrix.map(([area, owner, action]) => (
                <div className="approval-row" key={area}>
                  <strong>{area}</strong>
                  <span>{owner}</span>
                  <em>{action}</em>
                </div>
              ))}
            </div>
          </article>

          <article className="panel span-12">
            <div className="panel-head compact">
              <div>
                <p className="eyebrow">app.site.ru rollout</p>
                <h2>Что проверяем перед публичным кабинетом</h2>
              </div>
              <span className="status-pill">domain checklist</span>
            </div>
            <div className="domain-rollout-grid">
              {domainRollout.map(([title, scope, text]) => (
                <div className="domain-rollout-card" key={title}>
                  <span>{scope}</span>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="panel span-12">
            <div className="panel-head compact">
              <div>
                <p className="eyebrow">Backup & restore</p>
                <h2>Как не теряем данные кабинета</h2>
              </div>
              <span className="status-pill green">restore-ready</span>
            </div>
            <div className="backup-grid">
              {backupPlan.map(([title, cadence, text]) => (
                <div className="backup-card" key={title}>
                  <span>{cadence}</span>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="panel span-12">
            <div className="panel-head compact">
              <div>
                <p className="eyebrow">Security guardrails</p>
                <h2>Контроль доступа, секретов и аудита</h2>
              </div>
              <span className="status-pill">safe collaboration</span>
            </div>
            <div className="guardrail-grid">
              {guardrails.map(([title, text]) => (
                <div className="guardrail-card" key={title}>
                  <strong>{title}</strong>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="panel span-12">
            <div className="panel-head compact">
              <div>
                <p className="eyebrow">Secret rotation</p>
                <h2>Когда обновляем пароли, токены и API ключи</h2>
              </div>
              <span className="status-pill green">no stale keys</span>
            </div>
            <div className="secret-rotation-grid">
              {secretRotation.map(([title, scope, cadence, action]) => (
                <article className="secret-rotation-card" key={title}>
                  <span>{cadence}</span>
                  <strong>{title}</strong>
                  <p>{scope}</p>
                  <em>{action}</em>
                </article>
              ))}
            </div>
          </article>

          <article className="panel span-12 environment-secrets-panel">
            <div className="panel-head compact">
              <div>
                <p className="eyebrow">Environment readiness</p>
                <h2>Какие секреты должны быть заведены до запуска</h2>
              </div>
              <span className="status-pill">names only</span>
            </div>
            <div className="environment-secrets-grid">
              {environmentSecrets.map(([name, scope, fallback]) => (
                <article className="environment-secret-card" key={name}>
                  <span>{name}</span>
                  <strong>{scope}</strong>
                  <p>{fallback}</p>
                </article>
              ))}
            </div>
          </article>

          <article className="panel span-12">
            <div className="panel-head compact">
              <div>
                <p className="eyebrow">Partner access</p>
                <h2>Пакет подключения партнера</h2>
              </div>
              <span className="status-pill">no main push</span>
            </div>
            <div className="partner-access-grid">
              {partnerAccess.map(([title, text]) => (
                <div className="partner-access-card" key={title}>
                  <strong>{title}</strong>
                  <span>{text}</span>
                </div>
              ))}
            </div>
            <div className="partner-prompt">
              <span>Промпт для партнера</span>
              <p>
                Подключи мой Codex к репозиторию ASTS на GitHub, создай отдельную ветку для
                моей работы, не пушь напрямую в main, все изменения отправляй через Pull Request
                с результатом build/smoke и коротким статусом.
              </p>
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}
