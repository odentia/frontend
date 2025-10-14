# ⚡ Shell

Репозиторий-хост для формирования приложения, поддержвающий SSR для SEO важных данных. 

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

---

## 📂 Структура проекта


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
| `pnpm dev` | Запустить модуль |
| `pnpm build` | Сборка модуля |
| `pnpm typecheck` | Проверка типов TypeScript |
| `pnpm lint` | Проверка линта |
| `pnpm lint:fix` | Автоисправление линта |
| `pnpm format` | Проверка форматирования Prettier’ом |
| `pnpm format:fix` | Автоформатирование |
| `pnpm test` | Запуск тестов Vitest |
