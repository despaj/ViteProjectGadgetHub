# Gadget Hub

A React registry app for tracking gadgets and their health ratings. Register devices through a validated form, then browse, search, sort, edit, and export them from a paginated table.

**Live demo:** _add your deployed link here_

![Gadget Hub screenshot](./docs/screenshot.png)

## Features

- Validated registration form with per-field errors on blur and on submit
- Registry table with sorting, pagination, and keyboard-accessible rows
- Search by name, brand, or manufacturer, plus category filter chips
- Color-coded health ratings (Good, Fair, Poor) and summary stats
- Edit and delete gadgets, with an inline delete confirmation
- Data persists in `localStorage`, so it survives a page refresh
- One-click sample data and CSV export of the current view
- Responsive layout with ARIA labels and visible focus states

## Tech stack

React 19, Vite, Tailwind CSS v4, TanStack Table v8

## Getting started

```bash
npm install
npm run dev
```

Other scripts:

```bash
npm run build
npm run preview
npm run lint
```

## Project structure

```
src/
  components/   RegisterForm, GadgetTable, ItemDetailCard, StatsBar, HealthBadge
  lib/          constants, health rating helpers, localStorage hook, CSV export
  App.jsx       app state and layout
```

## Design notes

- The selected row is stored as an ID rather than a copy of the object, so the detail card never shows stale data after an edit.
- Filtering and searching happen in `App`, while the table handles only sorting and pagination.
- Form validation is a pure function, which keeps it easy to unit test.

## Roadmap

- Unit tests for validation and CSV export
- Backend persistence with an API and database
- Deploy to Vercel or Netlify
