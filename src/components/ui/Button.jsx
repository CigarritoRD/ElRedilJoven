import { cn } from '../../lib/utils';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  loading,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-surface disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'group relative overflow-hidden rounded-full bg-gradient-to-r from-primary-container to-secondary-container px-6 py-3 text-white shadow-lg hover:scale-105 hover:-translate-y-0.5 hover:shadow-neon-purple focus:ring-primary-container',
    secondary: 'rounded-full border border-white/20 bg-white/5 px-6 py-3 text-white backdrop-blur-md hover:bg-white/10 hover:border-white/30 focus:ring-white/20',
    ghost: 'rounded-full px-4 py-2 text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface',
    danger: 'rounded-full bg-error px-6 py-3 text-white shadow-lg hover:scale-105 hover:-translate-y-0.5 focus:ring-error',
  };

  const sizes = {
    sm: 'text-sm px-4 py-2',
    md: 'text-base',
    lg: 'text-lg px-8 py-4',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : (
        <>
          {variant === 'primary' && (
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          )}
          <span className="relative z-10 flex items-center gap-2">{children}</span>
        </>
      )}
    </button>
  );
}
