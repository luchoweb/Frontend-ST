# AI Usage - Exercise 2

This document explains how AI contributed to Exercise 2 (Fake Store API integration + error handling).

## Scope

Exercise 2 requires:

- Integrating with https://fakestoreapi.com/products
- Building a service to fetch products
- Implementing detailed error handling for 5xx, 4xx, and network failures
- Listing product titles in the UI with Strapi-managed page copy

## AI-assisted design decisions

- Suggested placing API calls in a dedicated service (`fetchProducts`) instead of calling fetch in page components.
- Proposed a normalized error contract (`NormalizedApiError`) to keep UI messages deterministic.
- Recommended categorizing failures into `client` (4xx), `server` (5xx), `network`, and extending with `timeout` and `unknown` for resilience.
- Suggested payload normalization to UI-ready data (`id`, `title`) and rejecting invalid payload shapes.
- Suggested unit-test scenarios focused on normalization behavior and representative failures.

## Human review and decisions

- Confirmed service-layer boundary and avoided leaking transport errors into UI.
- Kept only fields required by the exercise UI (`id`, `title`).
- Kept timeout handling explicit through `AbortController`.
- Verified failure mapping produces stable categories for user-facing messages.
- Validated tests for success normalization and failure paths.