import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

export default function AdminNavbar({ onMenuClick }) {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-line bg-white px-4 sm:px-6">
      <button type="button" onClick={onMenuClick} aria-label="Open menu" className="rounded-sm p-2 hover:bg-concrete md:hidden">
        <Menu className="h-6 w-6" />
      </button>
      <div className="hidden md:block" />
      <div className="flex items-center gap-4">
        <Link to="/" target="_blank" className="text-sm text-steel hover:text-blueprint hover:underline">
          View website
        </Link>
        <span className="hidden text-sm font-medium sm:inline">{admin?.name}</span>
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-sm border border-line px-3 py-1.5 text-sm font-medium hover:border-blueprint"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Log out
        </button>
      </div>
    </header>
  );
}
