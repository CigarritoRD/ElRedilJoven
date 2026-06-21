import { cn } from '../../lib/utils';

export function Badge({ children, variant = 'default', className, ...props }) {
  const variants = {
    default: 'bg-surface-container-high text-on-surface-variant border border-white/10',
    primary: 'bg-primary-container/20 text-primary border border-primary-container/30',
    purple: 'bg-primary-container/30 text-primary border border-primary/30',
    cyan: 'bg-secondary-container/20 text-secondary border border-secondary/30',
    lime: 'bg-tertiary/20 text-tertiary border border-tertiary/30',
    gold: 'bg-gold/20 text-gold border border-gold/30',
    coral: 'bg-coral/20 text-coral border border-coral/30',
    muted: 'bg-surface-container text-on-surface-variant border border-outline',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
