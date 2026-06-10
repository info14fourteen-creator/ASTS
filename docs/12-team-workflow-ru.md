# Командная работа

## Главный принцип

`main` - это стабильная ветка. В нее не пушим напрямую.

Каждая задача делается в отдельной ветке:

```bash
git checkout main
git pull
git checkout -b codex/<short-task-name>
```

Примеры:

```bash
codex/mvp-api-foundation
codex/web-tender-card
codex/xlsx-import
codex/ai-analysis-schema
```

## Локальный предохранитель

В репозитории есть hook `.githooks/pre-push`, который блокирует прямой push в `main` и `master`.

Каждый участник один раз включает его локально:

```bash
git config core.hooksPath .githooks
chmod +x .githooks/pre-push
```

Проверить:

```bash
git config core.hooksPath
```

Должно вывести:

```text
.githooks
```

## Обычный цикл работы

1. Обновить `main`.

```bash
git checkout main
git pull
```

2. Создать ветку.

```bash
git checkout -b codex/<short-task-name>
```

3. Сделать изменения.

4. Проверить локально.

Минимум:

```bash
git status
```

Для API:

```bash
python3 -m py_compile apps/api/app/*.py
```

Для web, когда зависимости установлены:

```bash
npm run build
```

5. Commit.

```bash
git add .
git commit -m "Коротко что сделано"
```

6. Push ветки.

```bash
git push -u origin codex/<short-task-name>
```

7. Создать PR в `main`.

```bash
gh pr create --base main --head codex/<short-task-name>
```

## Когда объединять PR

Объединяем PR только когда:

- задача закончена целиком, а не наполовину;
- PR решает одну понятную задачу;
- нет конфликтов с `main`;
- автор написал, как проверял изменения;
- второй участник посмотрел PR или явно договорились, что review не требуется;
- нет секретов, `.env`, токенов и личных данных;
- `main` после merge останется запускаемым или хотя бы не хуже текущего состояния.

## Когда не объединять

Не merge, если:

- PR смешивает несколько разных задач;
- есть незаконченные TODO в критическом пути;
- непонятно, как проверить изменение;
- затронуты общие схемы/API без согласования;
- есть конфликт с текущей работой второго участника;
- изменения ломают запуск проекта.

## Кто merge делает

На старте merge делает владелец репозитория или тот, кому явно поручили.

Рекомендуемый способ merge:

- `Squash and merge`
- название commit = название PR
- после merge ветку удалить

В GitHub repo уже включен аккуратный режим:

- squash merge разрешен;
- merge commit выключен;
- rebase merge выключен;
- delete branch on merge включен.

## Что делать перед началом новой задачи

Всегда:

```bash
git checkout main
git pull
git checkout -b codex/<new-task>
```

Не продолжать новую задачу в старой ветке после merge.

## Если случайно работаешь в main

Проверить:

```bash
git branch --show-current
```

Если увидел `main` и уже есть изменения:

```bash
git checkout -b codex/rescue-work
```

После этого commit/push делать уже из новой ветки.

## Если нужно забрать работу партнера

```bash
git fetch origin
git checkout codex/<branch-name>
```

Или посмотреть PR без переключения:

```bash
gh pr view <number>
gh pr diff <number>
```

## Текущее правило для АСТС

Пока нас двое:

- каждый делает свою ветку `codex/...`;
- в `main` напрямую не пушим;
- объединяем через PR;
- крупные архитектурные решения сначала фиксируем в `docs/`;
- мелкие MVP-задачи можно делать сразу в ветке и показывать PR.
