import { NavLink } from 'react-router-dom';
import { Briefcase, Hammer, Inbox, LayoutDashboard, MessageSquare, Users, X } from 'lucide-react';
import Logo from '../common/Logo.jsx';

const ITEMS = [
  { to: '/admin', label: 'Dashboard', Icon: LayoutDashboard, end: true },
  { to: '/admin/services', label: 'Services', Icon: Hammer },
  { to: '/admin/projects', label: 'Projects', Icon: Briefcase },
  { to: '/admin/testimonials', label: 'Testimonials', Icon: MessageSquare },
  { to: '/admin/team', label: 'Team', Icon: Users },
  { to: '/admin/inquiries', label: 'Inquiries', Icon: Inbox },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-blueprint-dark/60 md:hidden" onClick={onClose} aria-hidden="true" />}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-blueprint transition-transform md:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
          <Logo light to="/admin" />
          <button type="button" onClick={onClose} aria-label="Close menu" className="rounded-sm p-1 text-white hover:bg-white/10 md:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 space-y-1 p-3" aria-label="Admin">
          {ITEMS.map(({ to, label, Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-sm border-l-2 px-3 py-2.5 font-medium transition-colors ${
                  isActive
                    ? 'border-survey bg-white/10 text-white'
                    : 'border-transparent text-white/70 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
