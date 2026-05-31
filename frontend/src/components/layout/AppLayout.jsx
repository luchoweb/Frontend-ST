import { NavLink } from 'react-router-dom';

export function AppLayout({ children }) {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <nav className="nav container" aria-label="Primary navigation">
          <NavLink className="brand" to="/" aria-label="Creative Portfolio home">
            CP
          </NavLink>
          <div className="nav__links">
            <NavLink to="/" className={({ isActive }) => (isActive ? 'nav__link active' : 'nav__link')}>
              Portfolio
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) => (isActive ? 'nav__link active' : 'nav__link')}
            >
              Products
            </NavLink>
          </div>
        </nav>
      </header>
      <main id="main-content">{children}</main>
    </div>
  );
}
