# ⚡ Codentia Frontend Monorepo

Микросервисный фронтенд на **React + TypeScript**, собранный с помощью **Rspack** и управляемый через **Turborepo** и **pnpm**.  
Проект организован по принципу **монорепозитория**, где каждый микрофронт и пакет живёт как независимый модуль, но управляется из одного корня.

---

## 🧱 Стек технологий

| Категория | Технологии |
|------------|-------------|
| Сборка и архитектура | [Rspack](https://rspack.dev), Module Federation |
| Язык | TypeScript 5 |
| Фреймворк | React 18 |
| Состояние | Zustand / Redux |
| Тестирование | Vitest |
| Форматирование | Prettier |
| Линтинг | ESLint (React Hooks, Prettier, TypeScript) |
| Хуки Git | Husky + Lint-staged |
| Версионирование | Changesets |
| Оркестрация | Turborepo + pnpm workspaces |

---

## 📂 Структура проекта

```bash
org
├── apps/ # микрофронты (host + remotes)
│ ├── shell-react/ # главное приложение (host)
│ ├── me-auth/ # пример remote-приложения
│ └── ... # другие микрофронты
│
├── packages/ # общие пакеты
│ ├── ui/ # дизайн-система / компоненты
│ ├── state/ # zustand/redux стора и middleware
│ ├── utils/ # общие утилиты
│ └── config/ # общие конфиги (ts, eslint, rspack)
│
├── turbo.json # конфигурация пайплайна turborepo
├── tsconfig.base.json # базовые правила TypeScript
├── .eslintrc.cjs # общий eslint-конфиг
├── .prettierrc # общий prettier-конфиг
├── package.json # оркестратор команд и dev-зависимости
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
└── README.md
```

## ⚙️ Установка и настройка

### 1. Установка PNPM

```bash
corepack enable
corepack prepare pnpm@10.18.1 --activate
```

### 2. Установка зависимостей

```bash
pnpm install
```

### 3. Запуск проекта

```bash
pnpm dev
```

## 🚀 Основные команды

| Команда | Назначение |
|----------|------------|
| `pnpm dev` | Запустить все микрофронты |
| `pnpm build:repo` | Сборка всех пакетов и приложений |
| `pnpm build:apps` | Сборка только микрофронтов |
| `pnpm build:packages` | Сборка общих пакетов |
| `pnpm typecheck` | Проверка типов TypeScript |
| `pnpm lint` | Проверка линта |
| `pnpm lint:fix` | Автоисправление линта |
| `pnpm format` | Проверка форматирования Prettier’ом |
| `pnpm format:fix` | Автоформатирование |
| `pnpm test` | Запуск тестов Vitest |
| `pnpm changeset` | Создание changelog и bump версий |
| `pnpm release:version` | Проставление версий в пакетах |
| `pnpm release:publish` | Публикация изменений |


## Структура репозитория

**Host-репозиторий**

```bash
FE-SHELL-REACT/
├── .github/
├── .husky/
├── docs/
├── src/
│   ├── app/
│   ├── entities/
│   ├── features/
│   ├── pages/
│   ├── shared/
│   └── widgets/
├── global.d.ts
├── index.server.tsx
├── index.tsx
├── .gitignore
├── .prettierignore
├── .releaserc
├── commitlint.config.cjs
├── eslint.config.js
├── module-federation.config.ts
├── package.json
├── prod-server.mjs
├── README.md
├── rsbuild.config.mjs
├── server.mjs
├── template.html
├── tsconfig.json
└── yarn.lock
```

**Remote-репозиторий**

```bash
FE-{MODULE}/
├── .github/
├── .husky/
├── docs/
├── src/
│   ├── app/
│   ├── entities/
│   ├── features/
│   ├── shared/
│   └── widgets/
├── global.d.ts
├── index.tsx
├── .gitignore
├── .prettierignore
├── .releaserc
├── commitlint.config.js
├── eslint.config.js
├── module-federation.config.ts
├── package.json
├── README.md
├── rsbuild.config.mjs
├── template.html
├── tsconfig.json
└── pnpm-lock.yaml
```

