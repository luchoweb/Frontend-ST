import React from 'react';
import { SectionHeader } from '../components/SectionHeader.jsx';
import { StatusMessage } from '../components/StatusMessage.jsx';
import { useAsyncResource } from '../hooks/useAsyncResource.js';
import { getPortfolioContent } from '../services/strapiService.js';

function SkeletonPortfolio() {
  return (
    <div className="container page-spacing" aria-live="polite">
      <div className="skeleton skeleton--hero" />
      <div className="grid grid--two">
        <div className="skeleton" />
        <div className="skeleton" />
      </div>
    </div>
  );
}

function formatCategory(category) {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

export function PortfolioPage() {
  const { data, error, status } = useAsyncResource(getPortfolioContent, []);

  if (status === 'loading') {
    return <SkeletonPortfolio />;
  }

  if (status === 'error') {
    return (
      <section className="container page-spacing">
        <StatusMessage
          tone="danger"
          title="Portfolio content could not be loaded"
          message={error.message}
        />
      </section>
    );
  }

  const { hero, about, skills, projects, contact } = data;

  return (
    <>
      <section className="hero container">
        <SectionHeader eyebrow={hero.eyebrow} title={hero.headline} description={hero.summary} />
        <div className="hero__actions" aria-label="Hero actions">
          <a className="button button--primary" href={hero.primaryCtaHref}>
            {hero.primaryCtaLabel}
          </a>
          <a className="button button--secondary" href={hero.secondaryCtaHref}>
            {hero.secondaryCtaLabel}
          </a>
        </div>
      </section>

      <section className="container section-grid" id="about">
        <article className="surface-card surface-card--featured">
          <p className="eyebrow">Profile</p>
          <h2>{about.title}</h2>
          <p>{about.body}</p>
          <dl className="meta-list">
            <div>
              <dt>Location</dt>
              <dd>{about.location}</dd>
            </div>
            <div>
              <dt>Availability</dt>
              <dd>{about.availability}</dd>
            </div>
          </dl>
        </article>

        <article className="surface-card">
          <p className="eyebrow">Capabilities</p>
          <h2>Senior toolkit</h2>
          <div className="skill-cloud">
            {skills.map((skill) => (
              <span className="skill-pill" key={skill.id}>
                {skill.name} <small>{formatCategory(skill.category)}</small>
              </span>
            ))}
          </div>
        </article>
      </section>

      <section className="container page-section" id="projects">
        <SectionHeader
          eyebrow="Selected work"
          title="Projects shaped around clarity, resilience, and execution"
          description=""
        />
        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.id}>
              <div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <p className="project-card__impact">{project.impact}</p>
              <ul className="tag-list" aria-label={`${project.title} stack`}>
                {(project.stack ?? []).map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="container page-section" id="contact">
        <article className="contact-card">
          <div>
            <p className="eyebrow">Contact</p>
            <h2>{contact.title}</h2>
            <p>{contact.message}</p>
          </div>
          <div className="contact-card__links">
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            {(contact.socialLinks ?? []).map((link) => (
              <a href={link.href} key={link.href} rel="noreferrer" target="_blank">
                {link.label}
              </a>
            ))}
          </div>
        </article>
      </section>
    </>
  );
}
