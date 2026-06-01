# Creative Portfolio

Monorepo for a frontend technical assessment with two local exercises:

1. **Personal Creative Portfolio** — Strapi v4 manages portfolio content and a React 18 SPA renders a responsive portfolio landing page.
2. **Products Page** — React consumes `https://fakestoreapi.com/products`, lists product titles, and normalizes client, server, network, timeout, and unexpected payload errors before rendering user-facing states. The page copy/structure also comes from Strapi.

The repository is intentionally simple: one backend app, one frontend app, shared documentation, and no deployment-specific infrastructure.

## Repository architecture

```txt
creative-portfolio/
  backend/      # Strapi v4 CMS, SQLite local database, seed content, public API permissions
  frontend/     # React 18 + Vite SPA, routes, services, components, tests, styles
  docs/         # Architecture and AI usage notes
  README.md
  .gitignore
  package.json  # Convenience scripts only
```

## Tech stack

- **Backend:** Strapi v4, SQLite through `better-sqlite3`, JavaScript configuration.
- **Frontend:** React 18, Vite, React Router, plain CSS with design tokens and mobile-first media queries.
- **Data access:** small service layer around `fetch`, keeping API details out of React components.
- **Testing:** Node's built-in test runner for a real unit test of the product service. This avoids adding test-only framework weight while still validating meaningful behavior.

## Prerequisites

- Node.js **18–22** for Strapi v4 compatibility (Node v20).
- npm 8+.

> The current source is JavaScript-only by design. TypeScript was not introduced to avoid mixing styles or adding setup that is unnecessary for the assessment scope.

## Environment variables

### Backend

Copy the example env file before running Strapi:

```bash
cp backend/.env.example backend/.env
```

For local assessment usage the provided example values are sufficient. In a real project, replace secrets before sharing any environment file.

Important backend variables:

| Variable | Default / example | Purpose |
| --- | --- | --- |
| `HOST` | `0.0.0.0` | Strapi bind host |
| `PORT` | `1337` | Strapi port |
| `FRONTEND_URL` | `http://localhost:5173` | Allowed CORS origin |
| `DATABASE_FILENAME` | `.tmp/data.db` | Optional SQLite database path |

### Frontend

The frontend works with defaults, but these variables can be set in `frontend/.env.local`:

```bash
VITE_STRAPI_URL=http://localhost:1337
VITE_FAKE_STORE_URL=https://fakestoreapi.com
```

## Installation

Install each app independently:

```bash
npm install --prefix backend
npm install --prefix frontend
```

You can also use the root scripts as shortcuts once dependencies are installed.

## Running locally

### 1. Start Strapi

```bash
npm run backend:dev
```

Strapi runs at `http://localhost:1337`. On first boot, Strapi creates the SQLite database and the bootstrap script seeds example content for:

- hero/profile summary
- about
- skills
- projects/highlights
- contact/social links
- products page copy

The bootstrap also enables public `find` permissions for the assessment APIs so the React app can read them locally without manual admin configuration.

### 2. Start React

In another terminal:

```bash
npm run frontend:dev
```

Vite runs at `http://localhost:5173`.

Routes:

- `/` — Portfolio / Home
- `/products` — Fake Store product titles with CMS-managed heading/copy

## Testing and checks

Run unit tests:

```bash
npm run frontend:test
npm run backend:test
```

- Frontend tests cover product service success normalization, 4xx client error normalization, and network failure normalization.
- Backend test covers Strapi bootstrap behavior (content seeding and public permission enablement) through mocked unit boundaries.

Optional checks after installing frontend dependencies:

```bash
npm --prefix frontend run build
npm --prefix frontend run lint
```

## Technical decisions

- **Separate backend and frontend responsibilities:** Strapi owns editable content; React owns layout, routing, interaction states, and external API integration.
- **CMS content model over a single JSON blob:** Portfolio sections are modeled as Strapi content types (`hero`, `about`, `skill`, `project`, `contact`) so evaluators can inspect real CMS structure.
- **Products page still uses Strapi:** The external product data comes from Fake Store API, while page text and fallback empty-state copy come from the `products-page` single type.
- **Normalized API errors:** `fetchProducts` maps 4xx, 5xx, network failures, timeout aborts, and unexpected payloads into consistent `NormalizedApiError` objects. UI components read stable error types instead of raw `fetch` details.
- **Mobile-first CSS:** The layout starts as a single-column experience and progressively enhances to two-column cards/grids for wider screens.
- **Low dependency footprint:** Plain CSS and the platform test runner keep the assessment maintainable without sacrificing structure.

## How the app was verified

- Inspected current repository state and initialized the monorepo structure.
- Added Strapi schemas, config, seed content, and CORS settings.
- Built the React routes, reusable layout/components, Strapi service, and Fake Store service.
- Ran `npm --prefix frontend test` successfully.
- Ran `npm --prefix backend test` successfully.
- Reviewed folder structure, imports, and obvious dead code/warnings in the authored files.

Dependency installation/build commands were not run in this environment because registry access returned a `403 Forbidden` response during an npm metadata lookup. The project remains configured for local installation on a normal npm-enabled machine.

## AI Usage

AI assistance was used to scaffold and implement the solution end-to-end under the requested constraints. Specifically, AI helped with:

- designing the monorepo structure and technical plan;
- creating Strapi content-type schemas, local config, CORS, seed content, and public read permissions;
- implementing the React SPA architecture, responsive UI, routes, and reusable components;
- designing the Fake Store service error normalization strategy;
- writing the product service unit tests and project documentation.

The implementation was reviewed for consistency, unnecessary code, naming, and maintainability before finalizing. No AI-generated claims of deployment or production operation are included because the deliverable is local-only.

## Additional documentation

- [`docs/architecture.md`](docs/architecture.md)
- [`docs/ai-usage.md`](docs/ai-usage.md)
