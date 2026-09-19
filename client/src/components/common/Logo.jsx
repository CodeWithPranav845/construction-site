import { Link } from 'react-router-dom';
import { SITE } from '../../config/site.js';

export function LogoMark({ className = 'h-8 w-8' }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" fill="currentColor" />
      <path d="M7 25V11h6v14M13 25V6h6v19M19 25V15h6v10" fill="none" stroke="#fff" strokeWidth="1.6" />
      <path d="M5 25.5h22" stroke="#E0561F" strokeWidth="2" />
    </svg>
  );
}

export default function Logo({ light = false, to = '/' }) {
  return (
    <Link to={to} className={`flex items-center gap-2.5 ${light ? 'text-white' : 'text-blueprint'}`}>
      <LogoMark className={`h-8 w-8 ${light ? 'text-white/10' : 'text-blueprint'}`} />
      <span className="font-display text-xl font-extrabold tracking-tight">{SITE.name}</span>
    </Link>
  );
}
