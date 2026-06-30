import { Sidebar } from "../../app-shell";

const tenderRecoveryRoutes = [
  ["/tenders", "Вернуться в pre-win inbox", "проверить существующие карточки первой воронки"],
  ["/execution", "Проверить execution funnel", "post-win контракты живут отдельно от tender inbox"],
  ["/sources", "Сверить первоисточник", "проверить source_url, raw artifact и checksum"],
  ["/plan", "Открыть план", "посмотреть следующий безопасный инкремент"],
];

export default function TenderNotFound() {
  return (
    <main className="app-shell">
      <Sidebar active="tenders" />
      <section className="workspace">
        <header className="topline">
          <div>
            <p className="eyebrow">Tender detail 404</p>
            <h1>Карточка процедуры не найдена</h1>
          </div>
          <a className="primary-link" href="/tenders">
            В tender inbox
          </a>
        </header>

        <section className="panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Fallback reason</p>
              <h2>Почему это не потерянная сделка</h2>
            </div>
            <span className="status-pill">unknown tender id</span>
          </div>
          <p className="route-note">
            Для динамической карточки нужен pre-win id из shared fixture и первоисточника. Если это уже победа или
            исполнение, запись должна открываться во второй воронке `/execution`, а не в `/tenders/[id]`.
          </p>
        </section>

        <section className="panel source-id-mismatch-panel">
          <div className="panel-head compact">
            <div>
              <p className="eyebrow">Source-id mismatch hint</p>
              <h2>Где искать правильный номер процедуры</h2>
            </div>
            <span className="status-pill">regNumber first</span>
          </div>
          <p className="route-note">
            Если в адрес вставили `raw-eis-*`, `raw-etp-*` или другой artifact id, это не номер сделки. Откройте
            `/sources`, найдите `source_url` первоисточника и возьмите `regNumber` / `tender_id`: именно он открывает
            `/tenders/[id]`.
          </p>
        </section>

        <section className="route-grid" aria-label="Куда перейти после неизвестной процедуры">
          {tenderRecoveryRoutes.map(([href, title, text]) => (
            <a className="route-card table-link" href={href} key={href}>
              <span>{href}</span>
              <h2>{title}</h2>
              <p>{text}</p>
            </a>
          ))}
        </section>
      </section>
    </main>
  );
}
