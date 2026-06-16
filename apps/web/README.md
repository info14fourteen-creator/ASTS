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

## AI Review UI Contract

Маршрут `/ai-review` отображает backend contract `GET /v1/ai/review-queue`.
Ключевой блок: `data-testid="ai-review-confidence-queue"`.

Route smoke закрепляет:

- `data-total-count`, `data-review-required-count` и `data-blocked-count`;
- `data-source-evidence-count`, равный числу карточек с первоисточником;
- `data-threshold="0.85"` как текущий автоматический confidence gate;
- `data-status`, `data-evidence-ref` и `data-owner` на каждой карточке;
- `data-testid="ai-review-confidence-browser-loop"` как проверяемый browser-loop selector.

Пока факт ниже confidence threshold, интерфейс может показать подсказку ИИ, но
не должен двигать процедуру без owner review и ссылки на raw artifact.

## Collaboration Rules

- Работать в ветках `codex/*`, не пушить напрямую в `main`.
- Каждый инкремент должен быть маленьким: один экран, один слой логики или один
  инфраструктурный guard.
- Для UI-изменений проверять измененный маршрут на desktop и mobile.
- Перед merge сверять, что две воронки не смешаны: до победы в `/tenders`,
  исполнение после победы в `/execution`.
- AI-выводы в интерфейсе должны ссылаться на первоисточник, файл, hash или
  confidence-правило.
