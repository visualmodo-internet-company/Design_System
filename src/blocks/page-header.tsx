import type { ReactNode } from 'react';
export function PageHeader({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) {
  return <header className="ds-page-header"><div><h1 className="ds-heading-1">{title}</h1>{description && <p className="ds-muted">{description}</p>}</div>{actions && <div className="ds-row ds-wrap">{actions}</div>}</header>;
}
