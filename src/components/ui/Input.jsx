import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export const Input = forwardRef(({ className, label, error, ...props }, ref) => {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-on-surface-variant">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={cn(
          'w-full rounded-xl border border-outline bg-surface-container px-4 py-3 text-on-surface transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-on-surface-variant/50',
          error && 'border-error focus:border-error focus:ring-error/20',
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-error">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';
