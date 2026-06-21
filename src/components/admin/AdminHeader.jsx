import { Menu, Bell } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export function AdminHeader({ onMenuClick }) {
  const { profile } = useAuth();

  return (
    <header className="bg-surface border-b border-white/10 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden rounded-lg p-2 text-on-surface-variant hover:bg-surface-container-high transition"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-xl font-display font-bold text-white">Panel de Administración</h1>
            <p className="text-sm text-on-surface-variant">Bienvenido, {profile?.full_name || profile?.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="relative rounded-lg p-2 text-on-surface-variant hover:bg-surface-container-high transition">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-tertiary" />
          </button>
        </div>
      </div>
    </header>
  );
}
