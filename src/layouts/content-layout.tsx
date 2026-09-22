import type { ReactNode } from 'react';
import { PageHeader } from '@/blocks/page-header';
/** Use inside ApplicationShell, not around it: one main landmark per page. */
export function ContentLayout({ title, description, actions, children }: { title: string; description?: string; actions?: ReactNode; children: ReactNode }) { return <section><PageHeader title={title} description={description} actions={actions} />{children}</section>; }
