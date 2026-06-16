# Продолженный план разработки ASTS

Дата фиксации: 2026-06-16.

Цель: продолжить разработку ASTS как продаваемого продукта: `app.site.ru` для web/desktop/tablet/mobile, Telegram Mini App, будущие iOS/Android приложения, backend, первоисточники данных, AI-разбор и CRM-интеграции.

## На чем остановились

- Создан отдельный репозиторий `info14fourteen-creator/ASTS`.
- Рабочий PR для кабинета: `#17 Build initial app.site.ru workspace shell`.
- Основная ветка разработки: `codex/app-site-shell`; прямой push в `main` запрещен.
- PR #17 находится в состоянии `CLEAN`, GitHub Actions проходят.
- Есть Next.js web-кабинет `apps/web` с маршрутом `/` и рабочими разделами: `/tenders`, `/tenders/demo`, `/sources`, `/documents`, `/ai-review`, `/economics`, `/execution`, `/tasks`, `/integrations`, `/settings`, `/onboarding`, `/login`.
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

Следующими брать:

1. Добавить outcome filters в inbox по статусам suggested / locked / approved.
2. Подключить tender inbox к shared fixture, чтобы убрать ручные rows.
3. Добавить API smoke badge/status в README или workdesk.
4. Добавить PR review checklist: merge gates + owner approval.
