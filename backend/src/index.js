'use strict';

const publicPermissions = {
  hero: ['find'],
  about: ['find'],
  skill: ['find', 'findOne'],
  project: ['find', 'findOne'],
  contact: ['find'],
  'products-page': ['find'],
};

const sampleSingles = [
  {
    uid: 'api::hero.hero',
    data: {
      eyebrow: 'Creative Frontend Engineer',
      headline: 'I design and build polished web experiences with pragmatic engineering.',
      summary:
        'A portfolio powered by Strapi and rendered with React. It highlights product thinking, accessible interfaces, and maintainable architecture.',
      primaryCtaLabel: 'View projects',
      primaryCtaHref: '#projects',
      secondaryCtaLabel: 'Contact',
      secondaryCtaHref: '#contact',
    },
  },
  {
    uid: 'api::about.about',
    data: {
      title: 'About this portfolio',
      body:
        'This assessment demonstrates a clean separation between CMS content, API services, and presentation. The UI is intentionally lightweight, responsive, and ready to grow without large rewrites.',
      location: 'Remote / LATAM',
      availability: 'Available for senior frontend and full-stack roles',
    },
  },
  {
    uid: 'api::contact.contact',
    data: {
      title: 'Let\'s build something useful',
      email: 'hello@example.com',
      message:
        'Open to product teams that value clear communication, maintainable systems, and thoughtful user experiences.',
      socialLinks: [
        { label: 'GitHub', href: 'https://github.com/example' },
        { label: 'LinkedIn', href: 'https://linkedin.com/in/example' },
      ],
    },
  },
  {
    uid: 'api::products-page.products-page',
    data: {
      eyebrow: 'Exercise 2',
      title: 'Products from Fake Store API',
      description:
        'This page combines CMS-managed structure with product titles loaded from an external API through a normalized service layer.',
      emptyStateTitle: 'No products available',
      emptyStateDescription: 'The API returned an empty list. Please try again later.',
    },
  },
];

const sampleSkills = [
  { name: 'React', category: 'frontend', level: 5, order: 1 },
  { name: 'Design Systems', category: 'frontend', level: 4, order: 2 },
  { name: 'Node.js', category: 'backend', level: 4, order: 3 },
  { name: 'Strapi CMS', category: 'backend', level: 4, order: 4 },
  { name: 'Testing Strategy', category: 'tooling', level: 4, order: 5 },
  { name: 'Product Discovery', category: 'product', level: 4, order: 6 },
];

const sampleProjects = [
  {
    title: 'Composable Portfolio CMS',
    description:
      'A content-driven portfolio landing page with reusable sections, responsive layout, and CMS-managed messaging.',
    impact: 'Reduced content update friction by keeping structure in React and editorial copy in Strapi.',
    stack: ['React', 'Strapi', 'CSS'],
    url: 'https://example.com/portfolio',
    order: 1,
  },
  {
    title: 'Product API Integration',
    description:
      'A resilient product listing that normalizes external API errors before they reach the UI layer.',
    impact: 'Improved user feedback for network, client, and server failures.',
    stack: ['React Router', 'Fetch API', 'Node test'],
    url: 'https://example.com/products',
    order: 2,
  },
];

async function upsertSingle(strapi, uid, data) {
  const existing = await strapi.entityService.findMany(uid, {});

  if (existing?.id) {
    await strapi.entityService.update(uid, existing.id, { data });
    return;
  }

  await strapi.entityService.create(uid, { data });
}

async function seedCollectionWhenEmpty(strapi, uid, entries) {
  const existing = await strapi.entityService.findMany(uid, { limit: 1 });

  if (Array.isArray(existing) && existing.length > 0) {
    return;
  }

  await Promise.all(entries.map((data) => strapi.entityService.create(uid, { data })));
}

async function enablePublicPermissions(strapi) {
  const role = await strapi
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!role) {
    return;
  }

  await Promise.all(
    Object.entries(publicPermissions).flatMap(([apiName, actions]) =>
      actions.map((action) =>
        strapi.query('plugin::users-permissions.permission').update({
          where: {
            role: role.id,
            action: `api::${apiName}.${apiName}.${action}`,
          },
          data: { enabled: true },
        })
      )
    )
  );
}

module.exports = {
  async bootstrap({ strapi }) {
    await Promise.all(sampleSingles.map(({ uid, data }) => upsertSingle(strapi, uid, data)));
    await seedCollectionWhenEmpty(strapi, 'api::skill.skill', sampleSkills);
    await seedCollectionWhenEmpty(strapi, 'api::project.project', sampleProjects);
    await enablePublicPermissions(strapi);
  },
};
