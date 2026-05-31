import { config } from '../utils/env.js';
import { unwrapStrapiCollection, unwrapStrapiSingle } from '../utils/strapi.js';

async function getJson(path) {
  const response = await fetch(`${config.strapiBaseUrl}/api${path}`);

  if (!response.ok) {
    throw new Error(`Strapi request failed with status ${response.status}`);
  }

  return response.json();
}

export async function getPortfolioContent() {
  const [hero, about, skills, projects, contact] = await Promise.all([
    getJson('/hero'),
    getJson('/about'),
    getJson('/skills?sort=order:asc'),
    getJson('/projects?sort=order:asc'),
    getJson('/contact'),
  ]);

  return {
    hero: unwrapStrapiSingle(hero),
    about: unwrapStrapiSingle(about),
    skills: unwrapStrapiCollection(skills),
    projects: unwrapStrapiCollection(projects),
    contact: unwrapStrapiSingle(contact),
  };
}

export async function getProductsPageContent() {
  const response = await getJson('/products-page');
  return unwrapStrapiSingle(response);
}
