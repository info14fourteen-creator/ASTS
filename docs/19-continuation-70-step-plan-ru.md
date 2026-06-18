# Продолженный план разработки ASTS

Дата фиксации: 2026-06-16.

Цель: продолжить разработку ASTS как продаваемого продукта: `app.site.ru` для web/desktop/tablet/mobile, Telegram Mini App, будущие iOS/Android приложения, backend, первоисточники данных, AI-разбор и CRM-интеграции.

## На чем остановились

- Создан отдельный репозиторий `info14fourteen-creator/ASTS`.
- Рабочий PR для кабинета: `#17 Build initial app.site.ru workspace shell`.
- Основная ветка разработки: `codex/app-site-shell`; прямой push в `main` запрещен.
- PR #17 находится в состоянии `CLEAN`, GitHub Actions проходят.
- Есть Next.js web-кабинет `apps/web` с маршрутом `/` и рабочими разделами: `/tenders`, `/tenders/[id]`, `/tenders/demo`, `/sources`, `/documents`, `/ai-review`, `/economics`, `/execution`, `/tasks`, `/integrations`, `/settings`, `/onboarding`, `/login`.
- Восстановлены две отдельные воронки старой B2G-логики: до победы в процедуре и после победы / исполнение.
- Зафиксирована политика данных: только первоисточники, агрегаторы не являются источником истины.
- В workdesk уже есть roadmap, первоисточники, mind map cleanup и правила merge.
- Автоматизация `asts-app-site-ru-12` обновлена на heartbeat каждые 12 минут.

## Правило автоматизации

Каждый 12-минутный цикл делает один маленький проверяемый шаг:

1. Проверить текущую ветку, PR и dirty tree.
2. Выбрать следующий логичный пункт из этого плана.
3. Сделать минимальную реализацию без прямого push в `main`.
4. Запустить релевантную проверку: build, smoke, unit check, DOM check или документационную проверку.
5. Запушить только в рабочую ветку/PR, если есть безопасные изменения.
6. Написать короткий статус: что сделано, что проверено, какой следующий пункт.

Стоп-условия: упал build, смешанный diff, чужие изменения в тех же файлах, нет владельца продуктового решения, сломан smoke.

## План на 80 пунктов

### A. Безопасная совместная работа

1. Проверить и задокументировать текущие открытые PR: #17, #13, #1.
2. Развести зоны ответственности: web-кабинет, backend/API, источники данных, AI, Telegram, mobile.
3. Зафиксировать правило: каждый участник работает в своей `codex/*` ветке.
4. Добавить в workdesk текущий активный PR и ссылку на этот продолженный план.
5. Обновить README, чтобы новый участник начинал с документов 13-19.
6. Добавить короткую инструкцию для партнера: clone, branch, install, build, PR.
7. Проверить GitHub Pages после merge в `main`.
8. Подготовить шаблон PR со строками: что изменено, как проверено, риск, следующий шаг.
9. Добавить checklist перед merge: build, smoke, нет чужих файлов, связь с mind map.
10. Настроить правило ревью: изменение в логике сделки требует второго взгляда.

### B. Продуктовая логика и mind map parity

11. Сверить все этапы старой mind map с документом `docs/16-b2g-mind-map-registry-ru.md`.
12. Разметить каждый этап как `implemented`, `planned`, `needs owner`, `legacy unclear`.
13. Вынести отдельную таблицу статусов первой воронки до победы.
14. Вынести отдельную таблицу статусов второй воронки исполнения.
15. Добавить причины отказа и проигрыша: цена, сроки, документы, риск, экономика.
16. Добавить правила перехода между этапами первой воронки.
17. Добавить правила перехода между этапами второй воронки.
18. Добавить условия, при которых AI обязан звать человека.
19. Добавить реестр ручных override-решений.
20. Добавить журнал причин, почему компания не участвует в процедуре.

### C. Web app `app.site.ru`

21. Разделить большой UI на компоненты: `Sidebar`, `Topline`, `Panel`, `StatusPill`.
22. Вынести mock-данные маршрутов в отдельный файл `apps/web/lib/mock-data.ts`.
23. Добавить единый объект навигации для sidebar и 404.
24. Добавить страницу `/plan` или секцию в dashboard с текущим планом работ.
25. Сделать `/tenders` основным inbox с фильтрами по источнику, сроку, региону, НМЦК, match.
26. Добавить состояние empty/loading/error для tender inbox.
27. Добавить страницу карточки процедуры на динамическом маршруте `/tenders/[id]`.
28. В карточке процедуры показать первоисточник, hash файлов, дедлайн, этап, AI confidence.
29. В `/sources` добавить очередь проблем источников: stale, missing file, parse failed, hash mismatch.
30. В `/documents` добавить lifecycle файла: raw, extracted, parsed, reviewed, attached.
31. В `/ai-review` добавить очередь low-confidence фактов.
32. В `/economics` добавить min/mid/max сценарии и коэффициенты.
33. В `/execution` добавить post-win handoff и закрывающие документы.
34. В `/tasks` добавить SLA, владельцев, стоп-условия и эскалации.
35. В `/integrations` добавить статусы sync для Bitrix24, amoCRM, 1C, Planfix, RetailCRM.
36. В `/settings` добавить readiness по секретам, ролям, источникам и AI policy.
37. В `/onboarding` добавить профиль компании: ИНН, ОКВЭД, регионы, маржа, поставщики, CRM.
38. В `/login` оставить безопасный prototype-login без реальных секретов.
39. Проверить desktop viewport 1440px.
40. Проверить notebook viewport 1280px.
41. Проверить tablet viewport 820px.
42. Проверить mobile viewport 390px.
43. Убрать горизонтальный overflow на всех ключевых маршрутах.
44. Добавить smoke-скрипт для проверки ключевых текстов и маршрутов без ручного браузера.
45. Добавить PWA manifest и иконки для будущего mobile web.

### D. Backend/API foundation

46. Обновить FastAPI health endpoint и добавить версию API.
47. Спроектировать модули API: tenders, sources, documents, ai, tasks, integrations.
48. Добавить Pydantic-схемы для процедуры, источника, документа, этапа сделки, задачи.
49. Добавить in-memory prototype endpoints для tender inbox.
50. Добавить endpoint карточки процедуры.
51. Добавить endpoint списка источников и freshness status.
52. Добавить endpoint задач и эскалаций.
53. Добавить OpenAPI tags и короткие описания.
54. Подготовить структуру под Alembic migrations.
55. Подготовить структуру под сервисный слой ingestion.

### E. Данные и первоисточники

56. Составить точный перечень первоисточников: ЕИС, ФНС, официальные ЭТП, реестр контрактов, РНП, КТРУ.
57. Для каждого источника описать способ доступа: API, open data, XML/JSON, кабинет, выгрузка.
58. Описать raw storage: исходный ответ, файл, timestamp, source_url, checksum.
59. Описать normalized layer: tender, lot, position, customer, supplier, contract, document.
60. Добавить правило: любое AI-утверждение должно ссылаться на source evidence.
61. Подготовить таблицу rate limits и рисков блокировки.
62. Подготовить стратегию повторной загрузки и backfill.
63. Подготовить стратегию дедупликации процедур из разных официальных источников.
64. Подготовить формат storage path для файлов закупки.
65. Подготовить first ingestion spike на маленьком наборе ЕИС-данных.

### F. AI вместо ручной рутины

66. Определить AI-задачи: извлечение фактов, требования, риски, позиции, сроки, вопросы.
67. Разделить AI-ответы на факты, выводы и рекомендации.
68. Добавить confidence model и пороги ручной проверки.
69. Добавить JSON-схемы для извлечения из документации.
70. Добавить prompt policy: первоисточник обязателен, нет источника - нет утверждения.
71. Добавить очередь review для low-confidence результатов.
72. Добавить ledger: кто подтвердил или переопределил AI-вывод.
73. Подготовить RAG-хранилище на pgvector для документов процедуры.
74. Подготовить Q&A по процедуре с цитатами из файлов.
75. Подготовить AI summary для решения участвовать/не участвовать.

### G. Telegram, mobile и интеграции

76. Спроектировать Telegram Bot: уведомления, approvals, задачи, быстрый поиск процедуры.
77. Спроектировать Telegram Mini App как мобильный thin client для ключевых экранов.
78. Зафиксировать стратегию mobile app: Expo, общий API, push, TestFlight, Google Play internal testing.
79. Описать CRM hub: Bitrix24, amoCRM, 1C, Мегаплан, RetailCRM, Planfix, СберCRM, C2CRM, РосБизнесСофт CRM, BPMSoft CRM.
80. Добавить audit sync: что отправлено в CRM, когда, кем, какой ответ API, как откатить.

## Ближайшие маленькие инкременты

Готово в PR #17:

1. Связать этот план с README и workdesk.
2. Добавить `/plan` с текущим статусом плана.
3. Вынести mock-данные главного web-кабинета в `apps/web/lib/mock-data.ts`.
4. Добавить smoke-скрипт маршрутов `apps/web/scripts/smoke.mjs`.
5. Начать backend foundation: health/status response models and `/v1/status`.
6. Расширить API-схемы: `TenderSummary`, `SourceEvidence`, `DocumentArtifact`, `TaskItem` and `/v1/contracts`.
7. Добавить prototype endpoints: in-memory `/v1/tenders`, `/v1/documents`, `/v1/tasks`.
8. Сверить mind map registry со статусами `implemented / planned / needs owner`.
9. Разделить главный экран на компоненты `overview-sections.tsx`.
10. Добавить PWA readiness check: manifest icons и install/offline статусы.
11. Подготовить ingestion service layer: retry, quarantine, raw artifacts.
12. Связать demo API с web mock data через `packages/shared/demo-data/asts-demo.json`.
13. Описать JSON-схемы извлечения позиций и КП.
14. Добавить справочник outcome/reason в API.
15. Добавить raw artifact manifest в documents API.
16. Подготовить first connector skeleton для ЕИС.
17. Добавить JSON schema validation script.
18. Привязать outcome/reason к карточке процедуры.
19. Показать raw artifact manifest в web-разделе документов.
20. Добавить smoke-проверку `/v1/sources/connectors` после установки API-зависимостей.
21. Включить shared validation в GitHub Actions.
22. Добавить outcome UI states: approved / locked / rejected.
23. Подключить `/documents` к shared fixture, чтобы убрать ручное дублирование demo-data.
24. Добавить API dependency lock/CI для smoke-проверок.
25. Добавить shared validation badge/status в README или workdesk.
26. Добавить интерактивные outcome filters в tender inbox по статусам suggested / locked / approved.
27. Подключить tender inbox к shared fixture, чтобы убрать ручные rows.
28. Добавить API smoke badge/status в README и workdesk `/plan`.
29. Добавить PR review checklist: merge gates, source evidence, two funnels и owner approval.
30. Добавить empty state для Tender Inbox, когда outcome-фильтр не находит процедур.
31. Подключить карточку `/tenders/demo` к shared fixture, чтобы убрать ручные данные процедуры.
32. Добавить API dependency note: локальный `SKIP` без FastAPI допустим, CI ставит pinned deps.
33. Добавить owner approval marker: видимый статус в карточке outcome.
34. Добавить approved/locked demo rows: fixture-покрытие для outcome filters.
35. Связать `/tenders` row href с detail id: строки inbox ведут на `/tenders/[id]`.
36. Добавить API smoke badge в карточку PR/workdesk: backend gate виден в `/plan`.
37. Добавить owner approval smoke text: route smoke закрепляет marker в inbox и карточке процедуры.
38. Добавить execution fixture row в отдельный экран: post-win запись видна в `/execution`, а не в pre-win inbox.
39. Добавить detail fallback copy для неизвестного tender id: локальный 404 объясняет pre-win/shared fixture и вторую воронку.
40. Добавить tender detail smoke route list: route smoke строит список реальных `/tenders/[id]` из shared fixture.
41. Добавить route smoke для outcome filters: `/tenders?outcome=suggested|locked|approved` проверяются по shared fixture.
42. Добавить execution smoke по документам: post-win handoff artifacts второй воронки выводятся из shared fixture и закреплены route smoke.
43. Добавить source-id mismatch hint: карточка и 404 объясняют разницу между `tender_id/regNumber` и `raw_artifact_id/source_ref`.
44. Добавить fixture coverage count в `/plan`: план показывает pre-win, execution, documents, execution artifacts, tasks и outcome states из shared fixture.
45. Добавить owner approval browser loop: `/tenders` показывает активный outcome receipt, а браузерный цикл кликает фильтры и сверяет `aria-pressed`, URL и visible rows.
46. Добавить execution artifact empty guard: `/execution` не дает второй воронке стартовать без минимального handoff-пакета raw artifacts.
47. Добавить source_url deep link: карточка `/tenders/[id]` открывает первоисточник из shared fixture и закрепляет href в route smoke.
48. Добавить fixture drift warning: `/plan` показывает guard, который сверяет smoke counts с shared fixture и становится warning при расхождении.
49. Добавить owner approval receipt history: `/tenders` хранит последние ручные подтверждения/блокировки перед handoff во вторую воронку.
50. Добавить execution artifact blocked fixture: `/execution` показывает сценарий, где победа подтверждена, но вторая воронка заблокирована без raw artifacts.
51. Добавить source_url health state: `/sources` показывает ready/quarantine/unavailable для первоисточника, raw artifact и AI gate.
52. Добавить fixture drift quarantine copy: `/plan` объясняет владельцу, что блокировать и как снимать quarantine при status=drift.
53. Добавить owner approval handoff lock: `/tenders` не считает approved готовым к execution без owner receipt и source evidence.
54. Добавить execution blocked browser loop: `/execution` фиксирует browser-loop contract для blocked fixture и route smoke.
55. Добавить partner quickstart в `/plan`: второй разработчик видит clone, branch, install, build/smoke и правило не пушить в `main`.
56. Добавить source freshness API endpoint: `/v1/sources/freshness` возвращает очередь `stale`, `missing`, `parse_failed`, `hash_mismatch` и блокирует AI до восстановления evidence.
57. Добавить `/sources` freshness breach browser loop: UI показывает `stale`, `missing`, `parse_failed`, `hash_mismatch`, source evidence и `ai_gate=blocked`; route smoke закрепляет HTML-контракт.
58. Добавить AI review confidence queue API contract: `/v1/ai/review-queue` возвращает low-confidence facts, owner review, threshold и embedded source evidence.
59. Добавить `/ai-review` browser loop для low-confidence owner review: UI показывает `requirement`, `supplier_quote`, `economics`, threshold, owner, source evidence и selector для blocked facts.
60. Добавить source freshness API docs: `docs/05-api-contract.md`, API README и Web README описывают DTO `/v1/sources/freshness`, breach types и связь с `/sources` UI.
61. Добавить FNS source contract spike: `/v1/sources/connectors` содержит `fns-egrul-nalog-ru` для ИНН/ОГРН, ЕГРЮЛ raw artifact, checksum, freshness и required secrets.
62. Добавить AI review API docs: `docs/05-api-contract.md`, API README и Web README описывают `/v1/ai/review-queue`, threshold, owner review gate, source evidence и `/ai-review` UI markers.
63. Добавить FNS UI source card: `/sources` показывает `fns-egrul-nalog-ru`, ИНН/ОГРН capabilities, raw template, required secrets и AI gate до выдачи доступа.
64. Добавить source freshness owner action docs: API docs, API README и Web README описывают ручное снятие `stale`, `missing`, `parse_failed`, `hash_mismatch` через owner receipt.
65. Добавить FNS smoke docs: API README, primary-source policy и Web README описывают contract-only smoke, secrets, лимиты и будущий INN/OGRN network gate.
66. Добавить AI review owner action docs: API docs, API README и Web README описывают owner receipt для `requirement`, `supplier_quote`, `economics`.
67. Добавить FNS connector browser loop: `/sources` показывает browser-loop selector для `fns-source-readiness-card`, expected status, AI gate, secret count и capabilities count.
68. Добавить source freshness owner UI card: `/sources` показывает receipt rules, владельца, restored status и AI gate до ручного решения.
69. Добавить FNS real-network smoke gate: API contract и `/sources` показывают approvals, Legal owner, safe INN/OGRN pair и запрет CI на внешний вызов.
70. Добавить AI review owner UI card: `/ai-review` показывает receipt rules, владельцев, allowed decisions и required evidence fields.
71. Добавить source owner receipt API contract: `/v1/sources/owner-receipts` описывает правила receipt для снятия source freshness blockers.
72. Добавить source receipt browser loop: `/sources` закрепляет restored receipt selector, required fields и AI gate.
73. Добавить FNS network gate browser loop: `/sources` закрепляет approvals selector, Legal owner, safe pair и запрет CI на сетевой smoke.
74. Добавить AI review receipt browser loop: `/ai-review` закрепляет owner receipt selector, allowed decisions и evidence fields.
75. Добавить source owner receipt history seed: `/sources` показывает audit rows ручных freshness решений.
76. Добавить FNS network gate docs link: `/sources` связывает approvals selector с API README и Legal owner gate.
77. Добавить AI review receipt API link: `/ai-review` связывает owner receipt selector с `/v1/ai/review-queue`.
78. Добавить source owner receipt history browser loop: `/sources` закрепляет audit rows ручных freshness решений.
79. Добавить source owner receipt backend fixture: `/v1/sources/owner-receipts` возвращает read-only history fixture для audit rows.
80. Добавить FNS network gate API smoke assertion: web smoke закрепляет `data-api-route="/v1/sources/connectors"`, а API smoke требует точное совпадение Legal approvals.
81. Добавить AI review receipt backend smoke assertion: API smoke закрепляет owner/action matrix и `evidence_ref == raw_artifact_id`, web smoke закрепляет `/v1/ai/review-queue` link.
82. Добавить source owner receipt API smoke assertion: web smoke закрепляет `data-api-route="/v1/sources/owner-receipts"` на history seed и browser loop.
83. Добавить owner receipt history parity check: web CI сравнивает backend history fixture и `/sources` UI seed.
84. Добавить FNS approvals parity check: web CI сравнивает API `REAL_NETWORK_SMOKE_APPROVALS` и `/sources` UI gate.
85. Добавить AI review action parity check: web CI сравнивает backend owner/action matrix и `/ai-review` UI seed.
86. Добавить source receipt docs deep link: `/sources` history loop ведет к API README Source Owner Receipt Contract.
87. Добавить source owner receipt shared fixture: API и web читают `packages/shared/source-owner-receipts.json`.
88. Добавить FNS connector shared fixture: API и web читают `packages/shared/fns-connector-gate.json`.
89. Добавить AI review shared fixture: API и web читают `packages/shared/ai-review-queue.json`.
90. Добавить source receipt docs link browser assertion: live DOM `/sources` проверяет docs href и API route.
91. Добавить source owner receipt fixture schema: `packages/shared/fixture-schemas/source-owner-receipts.schema.json`.
92. Добавить FNS connector fixture schema: `packages/shared/fixture-schemas/fns-connector-gate.schema.json`.
93. Добавить AI review fixture schema: `packages/shared/fixture-schemas/ai-review-queue.schema.json`.
94. Добавить shared schema docs index: `packages/shared/README.md` содержит индекс схем, fixtures и validation-команд.
95. Добавить fixture schema CI path notes: `packages/shared/README.md` описывает paths для shared validation и web parity smoke.
96. Добавить schema validation summary card: `/plan` показывает три fixture schemas и 14 shared checks.
97. Добавить AI review schema browser summary: `/ai-review` показывает schema id, thresholds, fact types и source host.
98. Добавить schema docs browser link: `/plan` связывает schema summary с `packages/shared/README.md#shared-schema-index`.
99. Добавить shared validation browser loop: `/plan` закрепляет 14 checks, CI paths и selector для schema summary.
100. Добавить fixture schema checklist smoke: `/plan` сверяет 5 schema ids и 4 validation commands из shared README.
101. Добавить AI review schema API smoke marker: `/plan` связывает schema summary, `/v1/ai/review-queue`, API README и parity smoke.
102. Добавить schema docs link parity smoke: `/plan` сверяет schema docs href и fixture checklist README anchor.
103. Добавить shared validation CI badge link: `/plan` связывает browser loop с GitHub Actions workflow.
104. Добавить shared README command parity smoke: `apps/web` сверяет `/plan` checklist commands с `packages/shared/README.md`.
105. Добавить AI review API README DOM parity smoke: `apps/web` сверяет `/plan` marker с `/ai-review` API README link.
106. Добавить schema docs README existence smoke: `apps/web` проверяет `## Shared Schema Index` и 5 schema rows в `packages/shared/README.md`.
107. Добавить shared validation workflow file smoke: `apps/web` проверяет `.github/workflows/shared-validation.yml`, trigger paths и `npm run validate`.
108. Добавить shared README command CI note: `web-build.yml` запускает `smoke:shared-readme-commands` и реагирует на `packages/shared/README.md`.
109. Добавить AI review API README CI note: `web-build.yml` запускает `smoke:ai-review-api-readme` на живом `/plan` + `/ai-review`.
110. Добавить schema docs README CI note: `web-build.yml` запускает `smoke:schema-docs-readme` до route smoke.
111. Добавить shared validation workflow CI note: `web-build.yml` запускает `smoke:shared-validation-workflow` до route smoke.
112. Добавить web build workflow file smoke: `web-build.yml` запускает `smoke:web-build-workflow`, который сверяет workflow file и `/plan` CI notes.
113. Добавить API README trigger smoke: `web-build.yml` запускает `smoke:api-readme-trigger`, который сверяет `apps/api/README.md` в pull_request/push paths и `/plan` marker.
114. Добавить schema docs README workflow smoke: `web-build.yml` запускает `smoke:schema-docs-workflow`, который сверяет shared README trigger path, CI step и `/plan` note.
115. Добавить shared validation workflow step smoke: `web-build.yml` запускает `smoke:shared-validation-workflow-step`, который сверяет Shared validation CI note и Web build step.
116. Добавить web build workflow CI self-check note: `web-build.yml` запускает `smoke:web-build-self-check`, который сверяет self-trigger path, workflow file smoke step и `/plan` note.
117. Добавить API README live route gate note: `web-build.yml` запускает `smoke:api-readme-live-route`, который сверяет live `/plan` + `/ai-review` API README parity внутри rendered routes gate.
118. Добавить schema docs README live route gate note: `web-build.yml` запускает `smoke:schema-docs-live-route`, который сверяет shared README note и live route smoke защиту `/plan` schema docs link.
119. Добавить shared validation live route gate note: `web-build.yml` запускает `smoke:shared-validation-live-route`, который сверяет workflow-step note и live route smoke защиту `/plan` shared validation markers.
120. Добавить web build route gate note: `web-build.yml` запускает `smoke:web-build-live-route`, который сверяет self-check note и live route smoke защиту `/plan` Web build markers.
121. Добавить AI review API README failure copy: `web-build.yml` запускает `smoke:ai-review-api-readme-failure-copy`, который закрепляет owner-friendly no-merge текст при live parity drift.
122. Добавить schema docs README failure copy: `web-build.yml` запускает `smoke:schema-docs-readme-failure-copy`, который закрепляет owner-friendly no-merge текст при schema docs parity drift.
123. Добавить shared validation failure copy: `web-build.yml` запускает `smoke:shared-validation-failure-copy`, который закрепляет owner-friendly no-merge текст при shared validation drift.
124. Добавить web build failure copy: `web-build.yml` запускает `smoke:web-build-failure-copy`, который закрепляет owner-friendly no-merge текст при Web build workflow drift.
125. Добавить API README trigger failure copy: `web-build.yml` запускает `smoke:api-readme-trigger-failure-copy`, который закрепляет owner-friendly no-merge текст при trigger path drift.
126. Добавить schema docs workflow failure copy: `web-build.yml` запускает `smoke:schema-docs-workflow-failure-copy`, который закрепляет owner-friendly no-merge текст при schema docs workflow drift.
127. Добавить shared validation workflow failure copy: `web-build.yml` запускает `smoke:shared-validation-workflow-failure-copy`, который закрепляет owner-friendly no-merge текст при shared validation workflow order drift.
128. Добавить web build rendered-route failure copy: `web-build.yml` запускает `smoke:web-build-rendered-route-failure-copy`, который закрепляет owner-friendly no-merge текст при падении rendered routes smoke.
129. Добавить API README live-route failure copy: `web-build.yml` запускает `smoke:api-readme-live-route-failure-copy`, который закрепляет owner-friendly no-merge текст при API README live route order drift.
130. Добавить schema docs live-route failure copy: `web-build.yml` запускает `smoke:schema-docs-live-route-failure-copy`, который закрепляет owner-friendly no-merge текст при schema docs live route order drift.
131. Добавить shared validation rendered-route failure copy: `web-build.yml` запускает `smoke:shared-validation-rendered-route-failure-copy`, который закрепляет owner-friendly no-merge текст при падении shared validation markers в rendered routes smoke.
132. Добавить AI review API README rendered-route failure copy: `web-build.yml` запускает `smoke:ai-review-api-readme-rendered-route-failure-copy`, который закрепляет owner-friendly no-merge текст при падении AI review API README parity внутри rendered routes smoke.
133. Добавить API README trigger rendered-route failure copy: `web-build.yml` запускает `smoke:api-readme-trigger-rendered-route-failure-copy`, который закрепляет owner-friendly no-merge текст при падении API README trigger/live parity chain внутри rendered routes smoke.
134. Добавить schema docs rendered-route failure copy: `web-build.yml` запускает `smoke:schema-docs-rendered-route-failure-copy`, который закрепляет owner-friendly no-merge текст при падении schema docs markers внутри rendered routes smoke.
135. Добавить source owner receipts rendered-route failure copy: `web-build.yml` запускает `smoke:source-owner-receipts-rendered-route-failure-copy`, который закрепляет owner-friendly no-merge текст при падении `/sources` owner receipt history и docs link внутри rendered routes smoke.
136. Добавить FNS approvals rendered-route failure copy: `web-build.yml` запускает `smoke:fns-approvals-rendered-route-failure-copy`, который закрепляет owner-friendly no-merge текст при падении FNS Legal approvals внутри rendered routes smoke.
137. Добавить owner receipt docs rendered-route failure copy: `web-build.yml` запускает `smoke:owner-receipt-docs-rendered-route-failure-copy`, который закрепляет owner-friendly no-merge текст при падении `/sources` owner receipt docs link и browser loop внутри rendered routes smoke.
138. Добавить AI review queue rendered-route failure copy: `web-build.yml` запускает `smoke:ai-review-queue-rendered-route-failure-copy`, который закрепляет owner-friendly no-merge текст при падении `/ai-review` low-confidence queue внутри rendered routes smoke.
139. Добавить source freshness rendered-route failure copy: `web-build.yml` запускает `smoke:source-freshness-rendered-route-failure-copy`, который закрепляет owner-friendly no-merge текст при падении `/sources` freshness queue внутри rendered routes smoke.
140. Добавить FNS approvals docs rendered-route failure copy: `web-build.yml` запускает `smoke:fns-approvals-docs-rendered-route-failure-copy`, который закрепляет owner-friendly no-merge текст при падении `/sources` FNS docs link и API README anchor внутри rendered routes smoke.
141. Добавить owner receipt API rendered-route failure copy: `web-build.yml` запускает `smoke:owner-receipt-api-rendered-route-failure-copy`, который закрепляет owner-friendly no-merge текст при падении FastAPI `/v1/sources/owner-receipts`, shared fixture и `/sources` API markers внутри rendered routes smoke.
142. Добавить AI review receipt API rendered-route failure copy: `web-build.yml` запускает `smoke:ai-review-receipt-api-rendered-route-failure-copy`, который закрепляет owner-friendly no-merge текст при падении FastAPI `/v1/ai/review-queue`, shared fixture и `/ai-review` receipt markers внутри rendered routes smoke.
143. Добавить source freshness docs rendered-route failure copy: `web-build.yml` запускает `smoke:source-freshness-docs-rendered-route-failure-copy`, который закрепляет owner-friendly no-merge текст при падении `/sources` Source Freshness docs link и API README anchor внутри rendered routes smoke.
144. Добавить FNS real-network approval API copy: `web-build.yml` запускает `smoke:fns-real-network-approval-api-copy`, который закрепляет Legal owner-friendly текст для будущего сетевого FNS smoke без включения внешнего вызова в CI.
145. Добавить source owner receipt write API draft: `web-build.yml` запускает `smoke:source-owner-receipt-write-api-draft`, который закрепляет draft POST contract без включения мутации receipt history.

Следующими брать:

1. [done 2026-06-17] Добавить source health API contract: подготовить backend-модель для ready/quarantine/unavailable.
2. [done 2026-06-17] Добавить fixture quarantine browser loop: проверять quarantine copy в браузере и route smoke.
3. [done 2026-06-17] Добавить owner approval API handoff contract: перенести lock summary в backend DTO.
4. [done 2026-06-17] Добавить execution browser loop CI note: описать fallback, если in-app browser bridge недоступен.
5. [done 2026-06-17] Добавить partner quickstart в `/plan`: clone, codex branch, install, build/smoke и partner prompt.
6. [done 2026-06-17] Добавить source freshness API endpoint: отдельный DTO для stale/missing/parse_failed/hash_mismatch очереди.
7. [done 2026-06-17] Добавить `/sources` freshness breach browser loop: закрепить stale/missing/hash mismatch copy route smoke.
8. [done 2026-06-17] Добавить AI review confidence queue API contract: low-confidence facts с source evidence.
9. [done 2026-06-17] Добавить `/ai-review` browser loop для low-confidence owner review.
10. [done 2026-06-17] Добавить source freshness API docs: описать DTO и связь backend `/v1/sources/freshness` с UI `/sources`.
11. [done 2026-06-17] Добавить FNS source contract spike: ИНН, ЕГРЮЛ, raw artifact и freshness evidence.
12. [done 2026-06-17] Добавить AI review API docs: описать `/v1/ai/review-queue` и owner review gate.
13. [done 2026-06-17] Добавить FNS UI source card: показать ИНН/ЕГРЮЛ readiness на `/sources`.
14. [done 2026-06-17] Добавить source freshness owner action docs: описать ручное снятие stale/missing/hash blockers.
15. [done 2026-06-17] Добавить FNS smoke docs: описать секреты, лимиты и smoke для ИНН/ОГРН.
16. [done 2026-06-17] Добавить AI review owner action docs: описать, кто подтверждает low-confidence fact и как фиксируется решение.
17. [done 2026-06-17] Добавить FNS connector browser loop: закрепить ФНС карточку в browser-проверке `/sources`.
18. [done 2026-06-17] Добавить source freshness owner UI card: показать receipt rules на `/sources`.
19. [done 2026-06-17] Добавить FNS real-network smoke gate: описать условия включения сетевого smoke.
20. [done 2026-06-17] Добавить AI review owner UI card: показать receipt rules на `/ai-review`.
21. [done 2026-06-17] Добавить source owner receipt API contract: описать endpoint для ручных receipt.
22. [done 2026-06-17] Добавить source receipt browser loop: закрепить restored receipt selector на `/sources`.
23. [done 2026-06-17] Добавить FNS network gate browser loop: закрепить approvals selector на `/sources`.
24. [done 2026-06-17] Добавить AI review receipt browser loop: закрепить owner receipt selector на `/ai-review`.
25. [done 2026-06-17] Добавить source owner receipt history seed: подготовить demo rows для ручных решений по freshness blockers.
26. [done 2026-06-17] Добавить FNS network gate docs link: связать approvals selector с API README и Legal owner gate.
27. [done 2026-06-17] Добавить AI review receipt API link: связать owner receipt selector с `/v1/ai/review-queue`.
28. [done 2026-06-17] Добавить source owner receipt history browser loop: закрепить историю ручных freshness решений на `/sources`.
29. [done 2026-06-17] Добавить source owner receipt backend fixture: связать history seed с `/v1/sources/owner-receipts`.
30. [done 2026-06-17] Добавить FNS network gate API smoke assertion: проверить docs link и Legal gate в web smoke.
31. [done 2026-06-17] Добавить AI review receipt backend smoke assertion: закрепить `/v1/ai/review-queue` link в web smoke.
32. [done 2026-06-17] Добавить source owner receipt API smoke assertion: закрепить history loop и backend contract в web smoke.
33. [done 2026-06-17] Добавить owner receipt history parity check: `npm run smoke:owner-receipts` сравнивает backend fixture и `/sources` UI seed.
34. [done 2026-06-17] Добавить FNS approvals parity check: `npm run smoke:fns-approvals` сравнивает API approvals и `/sources` UI gate.
35. [done 2026-06-17] Добавить AI review action parity check: `npm run smoke:ai-review-actions` сравнивает backend owner/action matrix и `/ai-review` UI seed.
36. [done 2026-06-17] Добавить source receipt docs deep link: показать API README ссылку рядом с history loop.
37. [done 2026-06-17] Добавить source owner receipt shared fixture: перенести rules/history в общий JSON для API и web.
38. [done 2026-06-17] Добавить FNS connector shared fixture: перенести network gate approvals в общий JSON для API и web.
39. [done 2026-06-17] Добавить AI review shared fixture: перенести owner/action matrix в общий JSON для API и web.
40. [done 2026-06-17] Добавить source receipt docs link browser assertion: проверить ссылку через Browser DOM loop.
41. [done 2026-06-17] Добавить source owner receipt fixture schema: описать JSON schema для shared owner receipts.
42. [done 2026-06-17] Добавить FNS connector fixture schema: описать JSON schema для FNS network gate.
43. [done 2026-06-17] Добавить AI review fixture schema: описать JSON schema для AI review queue.
44. [done 2026-06-17] Добавить shared schema docs index: собрать ссылки на схемы и validation-команды.
45. [done 2026-06-17] Добавить fixture schema CI path notes: показать какие изменения запускают shared validation.
46. [done 2026-06-17] Добавить schema validation summary card: показать на `/plan` какие fixture schemas уже защищены.
47. [done 2026-06-17] Добавить AI review schema browser summary: показать threshold и fact types в `/ai-review`.
48. [done 2026-06-17] Добавить schema docs browser link: связать `/plan` с `packages/shared/README.md`.
49. [done 2026-06-17] Добавить shared validation browser loop: закрепить 14 checks и CI paths в `/plan`.
50. [done 2026-06-17] Добавить fixture schema checklist smoke: проверить schema ids и команды из shared README.
51. [done 2026-06-17] Добавить AI review schema API smoke marker: связать schema summary с `/v1/ai/review-queue`.
52. [done 2026-06-17] Добавить schema docs link parity smoke: сверить `/plan` link и README anchor.
53. [done 2026-06-17] Добавить shared validation CI badge link: связать browser loop с GitHub Actions workflow.
54. [done 2026-06-17] Добавить shared README command parity smoke: сравнить checklist commands с `packages/shared/README.md`.
55. [done 2026-06-17] Добавить AI review API README DOM parity smoke: сравнить `/plan` marker с `/ai-review` API link.
56. [done 2026-06-17] Добавить schema docs README existence smoke: проверить anchor в `packages/shared/README.md`.
57. [done 2026-06-17] Добавить shared validation workflow file smoke: сверить `/plan` badge с `.github/workflows/shared-validation.yml`.
58. [done 2026-06-17] Добавить shared README command CI note: показать, что command parity smoke входит в Web build.
59. [done 2026-06-17] Добавить AI review API README CI note: показать, что DOM parity smoke входит в Web build.
60. [done 2026-06-17] Добавить schema docs README CI note: показать, что README existence smoke входит в Web build.
61. [done 2026-06-17] Добавить shared validation workflow CI note: показать, что workflow file smoke входит в Web build.
62. [done 2026-06-17] Добавить web build workflow file smoke: сверить `/plan` CI notes с `.github/workflows/web-build.yml`.
63. [done 2026-06-17] Добавить API README trigger smoke: закрепить, что `apps/api/README.md` запускает web parity.
64. [done 2026-06-17] Добавить schema docs README workflow smoke: сверить `/plan` note с Web build step.
65. [done 2026-06-17] Добавить shared validation workflow step smoke: сверить `/plan` note с Web build step.
66. [done 2026-06-17] Добавить web build workflow CI self-check note: показать, что workflow smoke запускает сам себя.
67. [done 2026-06-17] Добавить API README live route gate note: показать, что live DOM parity защищает API docs links.
68. [done 2026-06-17] Добавить schema docs README live route gate note: показать, что schema docs links защищены live route smoke.
69. [done 2026-06-17] Добавить shared validation live route gate note: показать, что shared validation note защищен route smoke.
70. [done 2026-06-17] Добавить web build route gate note: показать, что web build self-check защищен route smoke.
71. [done 2026-06-17] Добавить AI review API README failure copy: показать owner-friendly текст при падении live parity.
72. [done 2026-06-17] Добавить schema docs README failure copy: показать owner-friendly текст при падении schema docs parity.
73. [done 2026-06-17] Добавить shared validation failure copy: показать owner-friendly текст при падении shared validation drift.
74. [done 2026-06-17] Добавить web build failure copy: показать owner-friendly текст при падении workflow drift.
75. [done 2026-06-17] Добавить API README trigger failure copy: показать owner-friendly текст при падении trigger paths.
76. [done 2026-06-17] Добавить schema docs workflow failure copy: показать owner-friendly текст при падении workflow step/order.
77. [done 2026-06-17] Добавить shared validation workflow failure copy: показать owner-friendly текст при падении shared validation workflow order.
78. [done 2026-06-17] Добавить web build rendered-route failure copy: показать owner-friendly текст при падении rendered routes.
79. [done 2026-06-17] Добавить API README live-route failure copy: показать owner-friendly текст при падении live route order.
80. [done 2026-06-17] Добавить schema docs live-route failure copy: показать owner-friendly текст при падении live route order.
81. [done 2026-06-17] Добавить shared validation rendered-route failure copy: показать owner-friendly текст при падении rendered route coverage.
82. [done 2026-06-17] Добавить AI review API README rendered-route failure copy: показать owner-friendly текст при падении API docs live parity.
83. [done 2026-06-17] Добавить API README trigger rendered-route failure copy: показать owner-friendly текст при падении trigger/live parity chain.
84. [done 2026-06-17] Добавить schema docs rendered-route failure copy: показать owner-friendly текст при падении schema docs live parity.
85. [done 2026-06-17] Добавить source owner receipts rendered-route failure copy: показать owner-friendly текст при падении source receipts route coverage.
86. [done 2026-06-17] Добавить FNS approvals rendered-route failure copy: показать owner-friendly текст при падении FNS approvals route coverage.
87. [done 2026-06-17] Добавить owner receipt docs rendered-route failure copy: показать owner-friendly текст при падении owner receipt route coverage.
88. [done 2026-06-17] Добавить AI review queue rendered-route failure copy: показать owner-friendly текст при падении AI review route coverage.
89. [done 2026-06-17] Добавить source freshness rendered-route failure copy: показать owner-friendly текст при падении freshness route coverage.
90. [done 2026-06-18] Добавить FNS approvals docs rendered-route failure copy: показать owner-friendly текст при падении FNS docs route coverage.
91. [done 2026-06-18] Добавить owner receipt API rendered-route failure copy: показать owner-friendly текст при падении owner receipt API route coverage.
92. [done 2026-06-18] Добавить AI review receipt API rendered-route failure copy: показать owner-friendly текст при падении AI review receipt route coverage.
93. [done 2026-06-18] Добавить source freshness docs rendered-route failure copy: показать owner-friendly текст при падении freshness docs route coverage.
94. [done 2026-06-18] Добавить FNS real-network approval API copy: показать Legal owner-friendly текст будущего сетевого FNS smoke в API, `/sources` и `/plan`.
95. [done 2026-06-18] Добавить source owner receipt write API draft: показать draft POST contract с idempotency, checksum evidence и immutable audit append.
96. [done 2026-06-18] Добавить AI review receipt write API draft: показать draft POST contract с owner role, decision, idempotency, source evidence и immutable AI audit append.
97. [done 2026-06-18] Добавить source freshness write API draft: показать draft POST contract с owner role, breach type, idempotency, restored evidence и immutable freshness audit append.
98. [done 2026-06-18] Добавить EIS real-network approval API copy: показать Data owner-friendly текст будущего сетевого EIS smoke в API, `/sources` и `/plan`.
99. [done 2026-06-18] Добавить source owner receipt write smoke failure copy: показать owner-friendly текст при падении draft POST smoke с idempotency, checksum evidence и immutable audit append.
100. [done 2026-06-18] Добавить AI review receipt write smoke failure copy: показать owner-friendly текст при падении draft POST smoke с owner decision, source evidence и immutable AI audit append.
101. [done 2026-06-18] Добавить source freshness write smoke failure copy: показать owner-friendly текст при падении draft POST smoke с breach type, restored evidence и immutable freshness audit append.
102. [done 2026-06-18] Добавить EIS real-network approval smoke failure copy: показать owner-friendly текст при падении EIS approval smoke с Data owner, protected secrets, safe EIS procedure, rate limits и checksum freshness receipt.
103. [done 2026-06-18] Добавить source owner receipt write docs failure copy: показать owner-friendly текст при падении write docs anchor с README, `/plan` и contract-only smoke.
104. [done 2026-06-18] Добавить AI review receipt write docs failure copy: показать owner-friendly текст при падении AI write docs anchor с README, `/plan` и immutable AI audit append.
105. [done 2026-06-18] Добавить source freshness write docs failure copy: показать owner-friendly текст при падении freshness write docs anchor с README, `/plan` и immutable freshness audit append.
106. [done 2026-06-18] Добавить EIS real-network approval docs failure copy: показать owner-friendly текст при падении EIS approval docs anchor с README, `/plan`, Data owner approvals и checksum freshness receipt.
107. [done 2026-06-18] Добавить source owner receipt write rendered-route failure copy: показать owner-friendly текст при падении rendered route coverage для write draft marker, docs href, request schema и immutable audit append.
108. [done 2026-06-18] Добавить AI review receipt write rendered-route failure copy: показать owner-friendly текст при падении rendered route coverage для AI write draft marker, docs href, request schema и immutable AI audit append.
109. [done 2026-06-18] Добавить source freshness write rendered-route failure copy: показать owner-friendly текст при падении rendered route coverage для freshness write draft marker, docs href, request schema и immutable freshness audit append.
110. [done 2026-06-18] Добавить EIS real-network approval rendered-route failure copy: показать owner-friendly текст при падении rendered route coverage для EIS approval marker, docs href, Data owner approvals, safe EIS procedure и checksum freshness receipt.
111. [done 2026-06-18] Добавить source owner receipt write workflow failure copy: показать owner-friendly текст при падении workflow order для source owner write API, smoke, docs и rendered-route checks перед source freshness write.
112. [done 2026-06-18] Добавить AI review receipt write workflow failure copy: показать owner-friendly текст при падении workflow order для AI review write API, smoke, docs и rendered-route checks перед shared README checks.
113. [done 2026-06-18] Добавить source freshness write workflow failure copy: показать owner-friendly текст при падении workflow order для freshness write API, smoke, docs и rendered-route checks перед source freshness rendered checks.
114. [done 2026-06-18] Добавить EIS real-network approval workflow failure copy: показать owner-friendly текст при падении workflow order для EIS approval API, smoke, docs и rendered-route checks перед AI review checks.
115. [done 2026-06-18] Добавить source owner receipt write live-route gate note: показать связь source owner write smoke с live rendered route gate перед workflow failure copy и source freshness checks.
116. [done 2026-06-18] Добавить AI review receipt write live-route gate note: показать связь AI review write smoke с live rendered route gate перед workflow failure copy и shared README checks.
117. [done 2026-06-18] Добавить source freshness write live-route gate note: показать связь freshness write smoke с live rendered route gate перед workflow failure copy и source freshness rendered checks.
118. [done 2026-06-18] Добавить EIS real-network approval live-route gate note: показать связь EIS approval smoke с live rendered route gate перед workflow failure copy и AI review checks.
119. [done 2026-06-18] Добавить source owner receipt write live-route failure copy: показать owner-friendly текст при падении source owner write live gate перед workflow failure copy и source freshness checks.
120. [done 2026-06-18] Добавить AI review receipt write live-route failure copy: показать owner-friendly текст при падении AI write live gate перед workflow failure copy и shared README checks.
121. [done 2026-06-18] Добавить source freshness write live-route failure copy: показать owner-friendly текст при падении freshness write live gate перед workflow failure copy и source freshness rendered checks.
122. [done 2026-06-18] Добавить EIS real-network approval live-route failure copy: показать owner-friendly текст при падении EIS approval live gate перед workflow failure copy и AI review checks.
