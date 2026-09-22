import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
export function LoadingState({ rows = 5, label = 'Loading items' }: { rows?: number; label?: string }) {
  return <div><p role="status" className="ds-sr-only">{label}</p><Card aria-busy="true" aria-label={label}>{Array.from({ length: Math.min(20, Math.max(1, rows)) }, (_, index) => <div key={index} className="ds-skeleton-row"><Skeleton className="ds-skeleton-short" /><Skeleton className="ds-skeleton-title" /></div>)}</Card></div>;
}
