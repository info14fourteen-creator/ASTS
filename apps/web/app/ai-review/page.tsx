import { Sidebar } from "../app-shell";

const reviewItems = [
  ["Техническое задание", "Требования к поставке найдены, 2 позиции требуют ручной проверки", "82%", "review"],
  ["Проект контракта", "Штрафы и сроки исполнения выделены, риски средние", "91%", "ok"],
  ["Смета и КП", "Не хватает подтверждения логистики по двум регионам", "64%", "warning"],
  ["Протоколы", "Победитель и цена определены, нужна связка со второй воронкой", "88%", "ok"],
];

const controls = [
  ["Источник", "каждый вывод связан с файлом, API или карточкой процедуры"],
  ["Confidence", "ниже 75% уходит в задачи человеку"],
  ["Версия", "повторный разбор не затирает прошлый результат"],
  ["Решение", "AI предлагает действие, но финальный статус ставит ответственный"],
];

const aiSteps = [
  ["01", "Извлечь", "лоты, даты, требования, обеспечение, штрафы"],
  ["02", "Сравнить", "профиль компании, стоп-темы, маржинальность"],
  ["03", "Объяснить", "почему брать или отсеять процедуру"],
  ["04", "Поставить задачу", "если данных не хватает или confidence низкий"],
];

const reviewStats = [
  ["В очереди", "18", "документы и процедуры"],
  ["Авто-решений", "11", "confidence выше 85%"],
  ["Эскалаций", "5", "уйдут человеку"],
  ["Средний confidence", "81%", "по текущей пачке"],
];

const evidenceGate = [
  ["Source link", "каждый вывод ведет к ЕИС, ФНС, ЭТП или локальному файлу"],
  ["OCR/file", "текст AI сверяется с оригиналом документа и версией OCR"],
  ["Confidence", "ниже 75% не проходит в авто-решение и создает задачу"],
  ["Fallback", "ответственный подтверждает риск, цену и финальное действие"],
];

const confidenceBands = [
  ["85-100%", "авто-сводка и подготовка действия", "логируем"],
  ["75-84%", "предложить решение ответственному", "review"],
  ["60-74%", "создать задачу ручной проверки", "manual"],
  ["< 60%", "заблокировать вывод до новых данных", "blocked"],
];

const lowConfidenceReviewQueue = [
  {
    fact: "requirement",
    title: "Требование к поставке серверов",
    value: "2 позиции требуют ручной проверки аналогов",
    confidence: "82%",
    threshold: "85%",
    status: "review_required",
    owner: "tender_manager",
    evidence: "raw-eis-0373100042626000001",
    source: "zakupki.gov.ru",
    action: "confirm requirement interpretation before supplier request",
  },
  {
    fact: "supplier_quote",
    title: "Логистика поставщика по двум регионам",
    value: "нет подтверждения логистики ЦФО",
    confidence: "64%",
    threshold: "85%",
    status: "blocked",
    owner: "supplier_manager",
    evidence: "raw-eis-32211984571",
    source: "zakupki.gov.ru",
    action: "request supplier clarification and keep economics blocked",
  },
  {
    fact: "economics",
    title: "Маржинальность после обеспечения",
    value: "плановая маржа ниже внутреннего порога",
    confidence: "74%",
    threshold: "85%",
    status: "blocked",
    owner: "finance_owner",
    evidence: "raw-eis-0173200001426000044",
    source: "zakupki.gov.ru",
    action: "finance owner must approve or keep outcome locked",
  },
];

const lowConfidenceBrowserLoop = {
  status: "armed",
  route: "/ai-review",
  selector: "[data-testid='ai-review-confidence-queue'] [data-status='blocked']",
  expectedReviewRequired: lowConfidenceReviewQueue.filter((item) => item.status === "review_required").length,
  expectedBlocked: lowConfidenceReviewQueue.filter((item) => item.status === "blocked").length,
  expectedSourceEvidence: lowConfidenceReviewQueue.length,
  checks: [
    ["Locate", "найти low-confidence queue по data-testid"],
    ["Assert confidence", "сверить confidence < threshold у каждой строки"],
    ["Assert owner", "сверить owner_role и status review_required/blocked"],
    ["Assert evidence", "сверить raw evidence и source host перед handoff"],
  ],
};

const aiReviewOwnerReceiptRules = [
  {
    fact: "requirement",
    owner: "tender_manager",
    decisions: "confirmed, corrected",
    evidenceFields: ["evidence_ref", "confidence_at_review", "source_checksum_sha256"],
    rule: "подтвердить трактовку требования или исправить AI extraction перед запросом поставщика",
  },
  {
    fact: "supplier_quote",
    owner: "supplier_manager",
    decisions: "confirmed, corrected, blocked",
    evidenceFields: ["evidence_ref", "supplier_clarification_ref", "source_checksum_sha256"],
    rule: "подтвердить логистику поставщика или оставить экономику заблокированной",
  },
  {
    fact: "economics",
    owner: "finance_owner",
    decisions: "confirmed, corrected, blocked",
    evidenceFields: ["evidence_ref", "confidence_at_review", "source_checksum_sha256"],
    rule: "подтвердить маржу, исправить расчет или оставить outcome locked",
  },
];

const evidence = [
  ["ТЗ", "Файл: tz_lighting_v4.pdf", "позиции 12-14", "manual"],
  ["Контракт", "ЕИС / проект контракта", "штрафы и сроки", "ok"],
  ["КП", "Локальный файл поставщика", "нет логистики ЦФО", "warning"],
  ["Протокол", "zakupki.gov.ru", "победитель и цена", "ok"],
];

const decisionMatrix = [
  ["Авто", "суммаризация, поиск требований, извлечение сроков", "source + confidence"],
  ["Предложить", "маржа, риск, следующий шаг, задача ответственному", "review required"],
  ["Блокировать", "подача заявки, цена, отказ, смена стадии", "human approval"],
  ["Логировать", "каждый вывод, источник, версия файла и решение", "audit trail"],
];

const auditReceipt = [
  ["AI output", "короткий вывод, версия промпта и модель", "в карточку процедуры"],
  ["Evidence", "source URL, file hash, OCR version и timestamp", "до решения"],
  ["Human action", "кто подтвердил, изменил или заблокировал рекомендацию", "обязательно"],
  ["Rollback", "предыдущий вывод и причина пересчета", "при повторном разборе"],
];

const overrideLedger = [
  ["Manual approve", "ответственный принимает риск при confidence 75-84%", "reason required"],
  ["Block release", "AI вывод не уходит в сделку без source URL и file hash", "evidence first"],
  ["Re-run AI", "новая версия файла или OCR создает новый вывод", "keep previous"],
  ["Escalate owner", "низкая уверенность уходит владельцу этапа", "task created"],
];

export default function AiReviewPage() {
  return (
    <main className="app-shell">
      <Sidebar active="ai-review" />
      <section className="workspace">
        <header className="topline">
          <div>
            <p className="eyebrow">AI review desk</p>
            <h1>AI разбор процедур</h1>
          </div>
          <button className="primary" type="button">
            Запустить разбор
          </button>
        </header>

        <section className="ai-stat-grid">
          {reviewStats.map(([label, value, text]) => (
            <article className="ai-stat" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <small>{text}</small>
            </article>
          ))}
        </section>

        <section className="panel evidence-gate-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Evidence gate</p>
              <h2>Что должно быть до AI-вывода</h2>
            </div>
            <span className="status-pill green">source-linked</span>
          </div>
          <div className="evidence-gate-grid">
            {evidenceGate.map(([title, text]) => (
              <article className="evidence-gate-card" key={title}>
                <strong>{title}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel confidence-policy-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Confidence policy</p>
              <h2>Что делает система при разной уверенности</h2>
            </div>
            <span className="status-pill">no blind AI</span>
          </div>
          <div className="confidence-policy-grid">
            {confidenceBands.map(([band, action, state]) => (
              <article className={`confidence-policy-card ${state}`} key={band}>
                <span>{band}</span>
                <strong>{action}</strong>
                <p>{state}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel ai-confidence-queue-panel"
          data-blocked-count={lowConfidenceBrowserLoop.expectedBlocked}
          data-review-required-count={lowConfidenceBrowserLoop.expectedReviewRequired}
          data-source-evidence-count={lowConfidenceBrowserLoop.expectedSourceEvidence}
          data-testid="ai-review-confidence-queue"
          data-threshold="0.85"
          data-total-count={lowConfidenceReviewQueue.length}
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Low-confidence owner review</p>
              <h2>Какие AI-факты ждут владельца</h2>
            </div>
            <span className="status-pill amber">owner review required</span>
          </div>
          <div className="ai-confidence-queue-grid">
            {lowConfidenceReviewQueue.map((item) => (
              <article
                className={`ai-confidence-queue-card ${item.status}`}
                data-confidence={item.confidence}
                data-evidence-ref={item.evidence}
                data-fact-type={item.fact}
                data-owner={item.owner}
                data-source-host={item.source}
                data-status={item.status}
                data-threshold={item.threshold}
                key={item.fact}
              >
                <span>{item.fact}</span>
                <strong>{item.title}</strong>
                <p>{item.value}</p>
                <dl>
                  <div>
                    <dt>Confidence</dt>
                    <dd>
                      {item.confidence} / {item.threshold}
                    </dd>
                  </div>
                  <div>
                    <dt>Owner</dt>
                    <dd>{item.owner}</dd>
                  </div>
                  <div>
                    <dt>Evidence</dt>
                    <dd>{item.evidence}</dd>
                  </div>
                  <div>
                    <dt>Source</dt>
                    <dd>{item.source}</dd>
                  </div>
                </dl>
                <em>{item.action}</em>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel ai-owner-receipt-panel"
          data-allowed-decisions="confirmed,corrected,blocked"
          data-required-fields="evidence_ref,confidence_at_review,source_checksum_sha256"
          data-rule-count={aiReviewOwnerReceiptRules.length}
          data-testid="ai-review-owner-receipt-rules"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI review owner receipt</p>
              <h2>Что владелец должен оставить после ручного решения</h2>
            </div>
            <span className="status-pill amber">receipt required</span>
          </div>
          <div className="ai-owner-receipt-grid">
            {aiReviewOwnerReceiptRules.map((rule) => (
              <article
                className="ai-owner-receipt-card"
                data-allowed-decisions={rule.decisions}
                data-fact-type={rule.fact}
                data-owner={rule.owner}
                data-required-fields={rule.evidenceFields.join(",")}
                key={rule.fact}
              >
                <span>{rule.fact}</span>
                <strong>{rule.owner}</strong>
                <p>{rule.rule}</p>
                <em>{rule.evidenceFields.join(" + ")}</em>
              </article>
            ))}
          </div>
        </section>

        <section
          className="panel ai-confidence-browser-loop-panel"
          data-blocked-count={lowConfidenceBrowserLoop.expectedBlocked}
          data-review-required-count={lowConfidenceBrowserLoop.expectedReviewRequired}
          data-route={lowConfidenceBrowserLoop.route}
          data-selector={lowConfidenceBrowserLoop.selector}
          data-source-evidence-count={lowConfidenceBrowserLoop.expectedSourceEvidence}
          data-status={lowConfidenceBrowserLoop.status}
          data-testid="ai-review-confidence-browser-loop"
        >
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI review browser loop</p>
              <h2>Как браузер сверяет low-confidence handoff</h2>
            </div>
            <span className="status-pill amber">{lowConfidenceBrowserLoop.status}</span>
          </div>
          <div className="ai-confidence-browser-loop-grid">
            {lowConfidenceBrowserLoop.checks.map(([title, text]) => (
              <article key={title}>
                <span>{title}</span>
                <strong>{lowConfidenceBrowserLoop.selector}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel ai-decision-matrix-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Decision rights</p>
              <h2>Где AI помогает, а где нужен человек</h2>
            </div>
            <span className="status-pill green">human final</span>
          </div>
          <div className="ai-decision-matrix-grid">
            {decisionMatrix.map(([mode, scope, gate]) => (
              <article className="ai-decision-matrix-card" key={mode}>
                <span>{gate}</span>
                <strong>{mode}</strong>
                <p>{scope}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel ai-audit-receipt-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">AI audit receipt</p>
              <h2>Что сохраняем у каждого AI-вывода</h2>
            </div>
            <span className="status-pill green">traceable decision</span>
          </div>
          <div className="ai-audit-receipt-grid">
            {auditReceipt.map(([title, text, gate]) => (
              <article className="ai-audit-receipt-card" key={title}>
                <span>{gate}</span>
                <strong>{title}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="panel ai-override-ledger-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Override ledger</p>
              <h2>Как фиксируем ручное решение поверх AI</h2>
            </div>
            <span className="status-pill">no hidden override</span>
          </div>
          <div className="ai-override-ledger-grid">
            {overrideLedger.map(([title, text, gate]) => (
              <article className="ai-override-ledger-card" key={title}>
                <span>{gate}</span>
                <strong>{title}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="layout-grid">
          <article className="panel span-7">
            <div className="panel-head compact">
              <div>
                <p className="eyebrow">Queue</p>
                <h2>Очередь проверки</h2>
              </div>
              <span className="status-pill">4 документа</span>
            </div>
            <div className="ai-review-list">
              {reviewItems.map(([title, text, confidence, tone]) => (
                <div className={`ai-review-row ${tone}`} key={title}>
                  <div>
                    <strong>{title}</strong>
                    <p>{text}</p>
                  </div>
                  <span>{confidence}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="panel span-5">
            <div className="panel-head compact">
              <div>
                <p className="eyebrow">Guardrails</p>
                <h2>Контроль качества</h2>
              </div>
            </div>
            <div className="quality-grid">
              {controls.map(([title, text]) => (
                <div className="quality-card" key={title}>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="panel span-7">
            <div className="panel-head compact">
              <div>
                <p className="eyebrow">Evidence trail</p>
                <h2>На чем основан вывод</h2>
              </div>
              <span className="status-pill green">ссылки сохранены</span>
            </div>
            <div className="evidence-table">
              <div className="evidence-row evidence-head">
                <span>Блок</span>
                <span>Источник</span>
                <span>Что нашел AI</span>
                <span>Статус</span>
              </div>
              {evidence.map(([block, source, finding, tone]) => (
                <div className="evidence-row" key={block}>
                  <strong>{block}</strong>
                  <span>{source}</span>
                  <span>{finding}</span>
                  <em className={tone}>{tone}</em>
                </div>
              ))}
            </div>
          </article>

          <article className="panel span-7">
            <div className="panel-head compact">
              <div>
                <p className="eyebrow">Decision flow</p>
                <h2>Как AI заменяет рутину</h2>
              </div>
            </div>
            <div className="ai-step-grid">
              {aiSteps.map(([step, title, text]) => (
                <div className="pipeline-step" key={step}>
                  <span>{step}</span>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="panel span-5">
            <div className="panel-head compact">
              <div>
                <p className="eyebrow">Human handoff</p>
                <h2>Что уйдет в задачи</h2>
              </div>
            </div>
            <div className="task-list">
              <article className="task warning">
                <strong>Проверить смету логистики</strong>
                <span>confidence 64%, нужен закупщик</span>
              </article>
              <article className="task">
                <strong>Подтвердить стоп-тему</strong>
                <span>найдено пересечение с исключенными ОКПД2</span>
              </article>
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}
