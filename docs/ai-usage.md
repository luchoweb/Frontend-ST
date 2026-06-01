# AI Usage

AI was used as an implementation assistant for this assessment.

## Contributions

- Planned a minimal monorepo architecture aligned with the requirements.
- Authored Strapi v4 configuration, content-type schemas, seed content, and local CORS settings.
- Built the React 18 + Vite SPA structure with routes for portfolio and products.
- Implemented a service layer for Strapi and Fake Store API.
- Designed normalized product API errors for 4xx, 5xx, network failures, timeout aborts, and unexpected payloads.
- Created responsive CSS and reusable UI components.
- Added a real unit test for the product service.
- Wrote README and architecture notes.

## Human-review assumptions

The solution is local-only and does not claim deployment. Secrets in `.env.example` are placeholders for development. The product API and Strapi URLs are configurable through environment variables.
