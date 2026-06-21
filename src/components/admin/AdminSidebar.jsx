import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LayoutDashboard, Calendar, CalendarDays, Images, Megaphone, Settings, LogOut, FileText } from 'lucide-react';
import { cn } from '../../lib/utils';
import { ADMIN_NAV_LINKS, SITE_NAME } from '../../lib/constants';
import { useAuth } from '../../hooks/useAuth';

export function AdminSidebar({ isOpen, onClose }) {
  const location = useLocation();
  const { signOut } = useAuth();

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 glass-card border-r border-white/10 shadow-xl transform transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white overflow-hidden shadow-lg shadow-primary/20 ring-1 ring-white/20">
                <img src="/logo-lamb.png" alt={SITE_NAME} className="w-full h-full object-contain scale-[1.4] origin-center" />
              </div>
              <span className="font-display font-bold text-lg text-white">{SITE_NAME}</span>
            </Link>
            <button
              onClick={onClose}
              className="lg:hidden rounded-lg p-2 text-on-surface-variant hover:bg-surface-container-high transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 space-y-1 p-4">
            {ADMIN_NAV_LINKS.map((link) => {
              const Icon = getIcon(link.icon);
              const isActive = location.pathname === link.href;

              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary-container/30 text-primary border border-primary/20'
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-white'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-white/10">
            <Link
              to="/"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-on-surface-variant hover:bg-surface-container-high transition-colors mb-2"
            >
              <FileText className="h-5 w-5" />
              Ver sitio público
            </Link>
            <button
              onClick={signOut}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-error hover:bg-error/10 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              Cerrar sesión
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

function getIcon(name) {
  const icons = {
    LayoutDashboard,
    Calendar,
    CalendarDays,
    Images,
    Megaphone,
    Settings,
    FileText,
  };
  return icons[name] || LayoutDashboard;
}
