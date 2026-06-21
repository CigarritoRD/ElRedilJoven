import { cn } from '../../lib/utils';

export function Card({ children, className, hover = false, glass = false, ...props }) {
  if (glass) {
    return (
      <div
        className={cn(
          'glass-card hover:border-primary/50 transition-all duration-200',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'rounded-2xl bg-surface-container border border-white/5 shadow-card',
        hover && 'transition-shadow hover:shadow-hover hover:border-white/10',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className, ...props }) {
  return (
    <div className={cn('p-6 pb-0', className)} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ children, className, ...props }) {
  return (
    <div className={cn('p-6', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className, ...props }) {
  return (
    <div className={cn('p-6 pt-0', className)} {...props}>
      {children}
    </div>
  );
}
