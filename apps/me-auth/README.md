# ⚡ Auth

Модуль для авторизации пользователей.

---

## 🧱 Стек технологий

| Категория | Технологии |
|------------|-------------|
| Сборка и архитектура | [Rspack](https://rspack.dev), Module Federation |
| Язык | TypeScript 5 |
| Фреймворк | React 18 |
| Состояние | Zustand |
| Тестирование | Vitest |
| Форматирование | Prettier |
| Линтинг | ESLint (React Hooks, Prettier, TypeScript) |

---

## 📂 Структура проекта


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
