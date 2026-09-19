import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, Phone, X } from 'lucide-react';
import Logo from './Logo.jsx';
import Button from './Button.jsx';
import { NAV_LINKS, SITE } from '../../config/site.js';
import { telHref } from '../../utils/helpers.js';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Close the mobile menu whenever the page changes
  useEffect(() => setOpen(false), [pathname]);

  const linkClass = ({ isActive }) =>
    `border-b-2 py-2 text-[15px] font-medium transition-colors ${
      isActive ? 'border-survey text-blueprint' : 'border-transparent text-steel hover:text-blueprint'
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {NAV_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <a href={telHref(SITE.phone)} className="flex items-center gap-2 text-sm font-medium">
            <Phone className="h-4 w-4 text-survey" aria-hidden="true" />
            {SITE.phone}
          </a>
          <Button to="/contact" size="sm">
            Get a quote
          </Button>
        </div>

        <button
          type="button"
          className="rounded-sm p-2 hover:bg-concrete md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-line bg-white md:hidden">
          <div className="container-x flex flex-col py-3">
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `border-l-2 py-3 pl-3 font-medium ${
                    isActive ? 'border-survey text-blueprint' : 'border-transparent text-steel'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Button to="/contact" className="mt-3">
              Get a quote
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
