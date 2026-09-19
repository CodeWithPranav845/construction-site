import { Link } from 'react-router-dom';

/** Dark banner at the top of inner pages. `crumbs` = [{ label, to }] (last one has no `to`). */
export default function PageHeader({ title, description, crumbs = [] }) {
  return (
    <section className="blueprint-grid text-white">
      <div className="container-x py-14 md:py-20">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-2 text-sm text-white/70">
            <Link to="/" className="hover:text-white">
              Home
            </Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-2">
                <span aria-hidden="true">/</span>
                {c.to ? (
                  <Link to={c.to} className="hover:text-white">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-white">
                    {c.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 className="max-w-3xl text-4xl md:text-5xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-lg text-white/80">{description}</p>}
      </div>
    </section>
  );
}
