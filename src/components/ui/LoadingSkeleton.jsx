import { cn } from '../../lib/utils';

export function LoadingSkeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-xl bg-surface-container',
        className
      )}
      {...props}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-2xl bg-surface-container border border-white/5">
      <LoadingSkeleton className="h-48 w-full rounded-t-2xl" />
      <div className="p-6 space-y-4">
        <LoadingSkeleton className="h-6 w-3/4" />
        <LoadingSkeleton className="h-4 w-full" />
        <LoadingSkeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}

export function EventCardSkeleton() {
  return (
    <div className="rounded-2xl bg-surface-container border border-white/5 overflow-hidden">
      <LoadingSkeleton className="h-56 w-full" />
      <div className="p-6 space-y-3">
        <LoadingSkeleton className="h-5 w-16" />
        <LoadingSkeleton className="h-7 w-full" />
        <LoadingSkeleton className="h-4 w-full" />
        <div className="flex gap-4 pt-2">
          <LoadingSkeleton className="h-4 w-24" />
          <LoadingSkeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
}

export function AnnouncementSkeleton() {
  return (
    <div className="rounded-2xl bg-surface-container border border-white/5 p-6">
      <div className="flex items-start gap-4">
        <LoadingSkeleton className="h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-3">
          <LoadingSkeleton className="h-5 w-3/4" />
          <LoadingSkeleton className="h-4 w-full" />
          <LoadingSkeleton className="h-4 w-2/3" />
        </div>
      </div>
    </div>
  );
}
