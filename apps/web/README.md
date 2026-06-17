# ASTS Web App

Next.js shell for `app.site.ru`: рабочий кабинет тендерного отдела, где мы
переносим проверенную B2G-логику в web-интерфейс перед подключением реальных
первоисточников и AI-пайплайна.

## CI Status

[![Web build](https://github.com/info14fourteen-creator/ASTS/actions/workflows/web-build.yml/badge.svg)](https://github.com/info14fourteen-creator/ASTS/actions/workflows/web-build.yml)
[![Shared validation](https://github.com/info14fourteen-creator/ASTS/actions/workflows/shared-validation.yml/badge.svg)](https://github.com/info14fourteen-creator/ASTS/actions/workflows/shared-validation.yml)
[![API smoke](https://github.com/info14fourteen-creator/ASTS/actions/workflows/api-smoke.yml/badge.svg)](https://github.com/info14fourteen-creator/ASTS/actions/workflows/api-smoke.yml)

`API smoke` - обязательный merge gate для FastAPI contracts: GitHub Actions
ставит pinned smoke-зависимости из `apps/api/requirements-smoke.txt`,
компилирует API и проверяет `/v1/sources/connectors`.

## Local Run

```bash
npm ci
npm run dev
```

Production preview, как в smoke-проверках:

```bash
npm run build
npm run start -- --hostname 127.0.0.1 --port 3040
```

## Routes

- `/` - обзор кабинета, утренний контроль, сверка mind map.
- `/tenders` - входящие процедуры и первая воронка до победы.
- `/tenders/[id]` - карточка процедуры из shared fixture.
- `/tenders/demo` - совместимый shortcut на первую demo-карточку.
- `/sources` - первоисточники, freshness SLA, evidence gate.
- `/documents` - файлы, OCR, версии и hash-контроль.
- `/ai-review` - AI-разбор с confidence и guardrails.
- `/economics` - экономика участия и доступы по тарифам.
- `/execution` - отдельная post-win воронка исполнения.
- `/tasks` - задачи, эскалации, 12-минутный рабочий цикл.
- `/integrations` - CRM/1C/Telegram интеграции и field mapping.
- `/settings` - доступы, backup, домен и merge-гейты.
- `/onboarding` - профиль компании и правила подбора процедур.
- `/login` - экран входа.

## Checks Before PR Merge

```bash
npm run build
```

После `next build` Next.js может переписать `next-env.d.ts`. В PR не коммитим
generated-изменение с `.next/types/routes.d.ts`; файл оставляем в стабильной
версии, уже лежащей в репозитории.

GitHub Actions workflow `Web build` повторяет `npm ci` и `npm run build` для
`apps/web` на Pull Request и push в `codex/**`.

Дополнительные merge gates:

- `Shared validation` - проверяет shared schemas, examples и demo fixture.
- `API smoke` - компилирует FastAPI prototype и smoke-проверяет connector contracts.

## Source Freshness UI Contract

Маршрут `/sources` отображает backend contract `GET /v1/sources/freshness`.
Ключевой блок: `data-testid="source-freshness-breach-queue"`.

Route smoke закрепляет:

- `data-breach-types="stale,missing,parse_failed,hash_mismatch"`;
- `data-total-count="4"` и `data-ai-blocked-count="4"`;
- `data-source-url`, `data-raw-artifact-id` и `data-ai-gate="blocked"` на каждой карточке;
- `data-testid="source-freshness-browser-loop"` как проверяемый browser-loop selector.

Пока есть хотя бы одна freshness breach карточка, AI не должен принимать решение
по процедуре без обновленного raw artifact или ручного owner review.

### Freshness Owner Action Rules

Снятие freshness-блокировки должно отображаться как owner action, а не как
автоматическое исчезновение карточки:

- `stale` - обновить payload из первоисточника и показать новый checksum;
- `missing` - загрузить отсутствующий raw artifact или официальный ответ об отсутствии публикации;
- `parse_failed` - отправить payload на ручную схему нормализации, сохранив quarantine;
- `hash_mismatch` - перезапросить первоисточник и сравнить checksum.

UI не должен скрывать карточку и переводить AI в `ready`, пока нет owner receipt
с `resolution_status="restored"` и ссылкой на новый raw artifact.

Маршрут `/sources` закрепляет эти правила в видимом блоке
`data-testid="source-freshness-owner-receipt-rules"`:

- `data-ai-gate="blocked_until_owner_receipt"`;
- `data-receipt-status="restored"`;
- `data-rule-count="4"`;
- каждая строка имеет `data-breach-type`, `data-owner` и
  `data-required-receipt-status="restored"`.

История ручных решений закреплена отдельно:
`data-testid="source-owner-receipt-history"` хранит audit rows, а
`data-testid="source-owner-receipt-history-browser-loop"` проверяет selector
`[data-testid='source-owner-receipt-history'] [data-resolution-status]`,
уникальные resolution statuses, AI gates и count заблокированных receipt. Оба
блока несут `data-api-route="/v1/sources/owner-receipts"`, чтобы web smoke
связывал UI history seed с backend fixture.
- `data-testid="source-owner-receipt-docs-link"` ведет к API README разделу
  `Source Owner Receipt Contract` и несет
  `data-api-route="/v1/sources/owner-receipts"`, чтобы ручные freshness receipt
  были связаны с backend-контрактом прямо из `/sources`.
- `npm run smoke:owner-receipts` сравнивает backend history fixture из
  `packages/shared/source-owner-receipts.json` с API/web подключением, а shared
  validation проверяет owner/action, resolution, raw artifact, checksum, AI gate
  и audit note; web CI запускает этот parity check после `npm run build`.

## FNS Smoke UI Contract

Маршрут `/sources` показывает contract-only карточку ФНС:
`data-testid="fns-source-readiness-card"`.

Route smoke закрепляет:

- `data-connector-id="fns-egrul-nalog-ru"`;
- `data-status="contract-only"` и `data-ai-gate="manual_review_until_secrets"`;
- `data-required-secrets="FNS_API_BASE_URL,FNS_API_TOKEN"`;
- capabilities `fetch_by_inn`, `fetch_by_ogrn`, `fetch_extract`, `normalize`;
- raw template `raw/fns/{inn}/{artifact_id}`.

Пока backend держит `network_enabled=false`, web показывает готовность контракта,
но не обещает реальную сетевую проверку ИНН/ОГРН.

Реальный сетевой smoke закреплен отдельным gate-блоком
`data-testid="fns-real-network-smoke-gate"`:

- `data-network-smoke-status="contract_only"`;
- `data-owner="Legal"`;
- `data-safe-test-pair-required="true"`;
- `data-approval-count="5"`;
- CI policy: `CI must not call FNS until the real-network gate is explicitly approved.`

Browser loop закреплен отдельным блоком
`data-testid="fns-connector-browser-loop"`. Он проверяет selector
`[data-testid='fns-source-readiness-card']`, два required secret имени и четыре
capabilities, не читая сами значения секретов.

FNS network gate browser loop обязан показывать ссылку на API README:
`data-testid="fns-network-gate-docs-link"` и `data-api-route="/v1/sources/connectors"`.
Эта ссылка ведет к разделу `FNS Smoke Contract`, где описаны Legal owner,
approval list, safe INN/OGRN pair и запрет CI на внешний вызов ФНС до явного
разрешения.
- `npm run smoke:fns-approvals` сравнивает API `REAL_NETWORK_SMOKE_APPROVALS`
  замененный на `packages/shared/fns-connector-gate.json`, API подключение и
  `/sources` UI gate по owner, status, CI policy, safe test pair и точному
  порядку approval list; web CI запускает этот parity check после build.

## AI Review UI Contract

Маршрут `/ai-review` отображает backend contract `GET /v1/ai/review-queue`.
Ключевой блок: `data-testid="ai-review-confidence-queue"`.

Route smoke закрепляет:

- `data-total-count`, `data-review-required-count` и `data-blocked-count`;
- `data-source-evidence-count`, равный числу карточек с первоисточником;
- `data-threshold="0.85"` как текущий автоматический confidence gate;
- `data-status`, `data-evidence-ref`, `data-owner` и `data-required-action` на каждой карточке;
- `data-testid="ai-review-confidence-browser-loop"` как проверяемый browser-loop selector.

Пока факт ниже confidence threshold, интерфейс может показать подсказку ИИ, но
не должен двигать процедуру без owner review и ссылки на raw artifact.

### AI Review Owner Action Rules

Ручное подтверждение low-confidence факта должно оставлять owner receipt:

- `requirement` подтверждает или исправляет `tender_manager`;
- `supplier_quote` подтверждает, уточняет или отклоняет `supplier_manager`;
- `economics` подтверждает, исправляет или оставляет заблокированным `finance_owner`.

UI не должен менять статус карточки на проходной без `decision="confirmed"` или
`decision="corrected"`, `evidence_ref`, `confidence_at_review` и checksum
первоисточника. Оригинальный AI extraction остается видимым в audit trail.

Маршрут `/ai-review` показывает эти правила в блоке
`data-testid="ai-review-owner-receipt-rules"`:

- `data-rule-count="3"`;
- `data-allowed-decisions="confirmed,corrected,blocked"`;
- `data-required-fields="evidence_ref,confidence_at_review,source_checksum_sha256"`;
- строки для `tender_manager`, `supplier_manager` и `finance_owner`;
- `supplier_quote` дополнительно требует `supplier_clarification_ref`.

AI review receipt browser loop должен показывать ссылку на backend contract:
`data-testid="ai-review-receipt-api-link"`, `data-api-route="/v1/ai/review-queue"`.
Эта ссылка ведет к API README, где описаны threshold, owner review, evidence
fields и блокировка workflow до `confirmed` или `corrected` receipt.
Route/API smoke также закрепляют owner/action matrix для `requirement`,
`supplier_quote` и `economics`; `evidence_ref` должен совпадать с raw artifact
первоисточника.
`npm run smoke:ai-review-actions` сравнивает
`packages/shared/ai-review-queue.json` с `/ai-review` UI seed и видимым
`data-required-action`; web CI запускает этот parity check после build.

## Collaboration Rules

- Работать в ветках `codex/*`, не пушить напрямую в `main`.
- Каждый инкремент должен быть маленьким: один экран, один слой логики или один
  инфраструктурный guard.
- Для UI-изменений проверять измененный маршрут на desktop и mobile.
- Перед merge сверять, что две воронки не смешаны: до победы в `/tenders`,
  исполнение после победы в `/execution`.
- AI-выводы в интерфейсе должны ссылаться на первоисточник, файл, hash или
  confidence-правило.
