export function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="section-header">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h1>{title}</h1>
      {description ? <p className="section-header__description">{description}</p> : null}
    </div>
  );
}
