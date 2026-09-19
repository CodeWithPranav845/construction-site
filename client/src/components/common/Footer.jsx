import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import Logo from './Logo.jsx';
import { NAV_LINKS, SITE } from '../../config/site.js';
import { telHref } from '../../utils/helpers.js';

const SOCIALS = [
  { key: 'facebook', label: 'Facebook', Icon: Facebook },
  { key: 'instagram', label: 'Instagram', Icon: Instagram },
  { key: 'linkedin', label: 'LinkedIn', Icon: Linkedin },
  { key: 'twitter', label: 'Twitter', Icon: Twitter },
];

export default function Footer() {
  return (
    <footer className="bg-blueprint-dark text-white/80">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1.4fr]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-sm">{SITE.intro}</p>
          <div className="mt-5 flex gap-3">
            {SOCIALS.map(({ key, label, Icon }) => (
              <a
                key={key}
                href={SITE.social[key]}
                aria-label={label}
                className="rounded-sm border border-white/20 p-2 hover:border-white hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg text-white">Pages</h3>
          <ul className="mt-4 space-y-2">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg text-white">Contact</h3>
          <ul className="mt-4 space-y-3">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-survey" aria-hidden="true" />
              {SITE.address}
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-survey" aria-hidden="true" />
              <a href={telHref(SITE.phone)} className="hover:text-white">
                {SITE.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-survey" aria-hidden="true" />
              <a href={`mailto:${SITE.email}`} className="hover:text-white">
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-wrap items-center justify-between gap-2 py-5 text-sm text-white/60">
          <p>
            &copy; {new Date().getFullYear()} {SITE.name}. Demo project for portfolio use.
          </p>
          <Link to="/admin/login" className="hover:text-white">
            Admin login
          </Link>
        </div>
      </div>
    </footer>
  );
}
