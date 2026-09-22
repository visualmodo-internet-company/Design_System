import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Inbox } from 'lucide-react';
import { Card } from '@/components/ui/card';
export interface EmptyStateProps { title: string; description: string; icon?: LucideIcon; action?: ReactNode }
export function EmptyState({ title, description, icon: Icon = Inbox, action }: EmptyStateProps) {
  return <Card><div className="ds-empty"><div className="ds-empty-icon"><Icon aria-hidden="true" /></div><h2 className="ds-label">{title}</h2><p className="ds-empty-description">{description}</p>{action}</div></Card>;
}
