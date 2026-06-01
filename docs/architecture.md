# Architecture

## System overview

The application is split into two runtime apps:

- `backend/`: Strapi v4 CMS. It exposes portfolio and products-page copy through REST endpoints.
- `frontend/`: React 18 SPA. It renders CMS content, calls Fake Store API, and owns all user-facing states.

No server-side rendering or deployment adapters are included because the assessment only requires local execution.

## Backend model

Strapi content types are intentionally explicit:

- `hero`: profile summary and CTA labels/links.
- `about`: narrative, location, and availability.
- `skill`: categorized capabilities with display ordering.
- `project`: selected highlights with impact notes and stack metadata.
- `contact`: email, message, and social links.
- `products-page`: heading, description, and empty-state copy for Exercise 2.

The bootstrap file seeds enough data for immediate visual review and enables public read permissions for these APIs.

## Frontend model

The frontend keeps responsibilities separated:

- `src/services`: all data access and API normalization.
- `src/hooks`: reusable async loading state.
- `src/components`: UI primitives/reusable components.
- `src/pages`: route-level composition.
- `src/utils`: environment and Strapi response helpers.
- `src/styles`: global design system and responsive layout rules.

## Error handling strategy

`fetchProducts` is the boundary between the external API and UI. It returns normalized product objects (`id`, `title`) on success and throws `NormalizedApiError` on failure.

Handled categories:

- `client`: HTTP 400–499.
- `server`: HTTP 500–599.
- `network`: fetch/network failure.
- `timeout`: request aborted by timeout.
- `unknown`: unexpected status or payload shape.

The products page maps those stable error types to clear messages without depending on raw `fetch` exceptions.
