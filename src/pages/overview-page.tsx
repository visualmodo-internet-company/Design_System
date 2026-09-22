import { useId, useState } from 'react';
import { ChartNoAxesCombined, ChevronRight, Filter, GitBranch, Globe, Monitor, MoreHorizontal, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@/components/ui/dropdown-menu';
import { DeploymentCard } from '@/blocks/deployment-card';
import { Sparkline } from '@/blocks/sparkline';
import { SearchBar } from '@/blocks/search-bar';
import { EmptyState } from '@/blocks/empty-state';
import { ErrorState } from '@/blocks/error-state';
import { LoadingState } from '@/blocks/loading-state';
import data from '@/fixtures/overview.json';
export type PageState = 'ready' | 'loading' | 'empty' | 'error';
export function OverviewPage({ state = 'ready', onAction, onRetry }: { state?: PageState; onAction: (message: string) => void; onRetry: () => void }) {
  const branchesId = useId();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [completed, setCompleted] = useState<string[]>([]);
  const matches = data.branch.toLowerCase().includes(query.toLowerCase()) && filter !== 'draft';
  const icons = [Monitor, Globe, Monitor, ChartNoAxesCombined, Plus];
  return <div className="ds-overview"><h1 className="ds-sr-only">Project overview</h1>{state === 'loading' ? <LoadingState label="Loading project overview" /> : state === 'error' ? <ErrorState onRetry={onRetry} /> : state === 'empty' ? <EmptyState title="No projects yet" description="Create your first project to see its overview here." action={<Button onClick={onRetry}><Plus aria-hidden="true" />Create example project</Button>} /> : <>
    <DeploymentCard onAction={onAction} />
    <div className="ds-stat-grid"><Card className="ds-stat-card"><CardHeader><CardTitle>Production checklist <Badge>{completed.length}/5</Badge></CardTitle></CardHeader><CardContent><div className="ds-checklist">{data.checklist.map((label, index) => { const Icon = icons[index] ?? Plus; const done = completed.includes(label); return <Button key={label} variant="secondary" size="sm" aria-pressed={done} onClick={() => setCompleted((current) => done ? current.filter((item) => item !== label) : [...current, label])}><Icon aria-hidden="true" />{label}{done && <Badge variant="success">Done</Badge>}</Button>; })}</div></CardContent></Card>
    <Card className="ds-stat-card"><CardHeader><CardTitle>Observability <span className="ds-muted">6h</span></CardTitle><Button size="icon-sm" variant="ghost" aria-label="About observability example" onClick={() => onAction('These are fixed example metrics, not live observations.')}><ChevronRight aria-hidden="true" /></Button></CardHeader><CardContent>{data.metrics.map((metric, index) => <div className="ds-metric" key={metric.label}><div><p className="ds-muted">{metric.label}</p><p className="ds-label">{metric.value}</p></div><Sparkline flat={index === 2} /></div>)}</CardContent></Card>
    <Card className="ds-stat-card"><CardHeader><CardTitle>Analytics</CardTitle><Badge variant={analyticsEnabled ? 'info' : 'outline'}>Demo</Badge></CardHeader><CardContent><div className="ds-analytics-empty"><div className="ds-empty-icon"><ChartNoAxesCombined aria-hidden="true" /></div><h3 className="ds-label">{analyticsEnabled ? '1,284 example visitors' : 'Track visitors and page views'}</h3><p className="ds-muted ds-small">{analyticsEnabled ? 'Illustrative data only. No tracking script is running.' : 'See traffic, top pages, and audience trends.'}</p><Button variant="outline" size="sm" onClick={() => { setAnalyticsEnabled((value) => !value); onAction(analyticsEnabled ? 'Example analytics disabled.' : 'Example analytics enabled locally. No tracking was installed.'); }}>{analyticsEnabled ? 'Disable example' : 'Enable analytics'}</Button></div></CardContent></Card></div>
    <section className="ds-list-section" aria-labelledby={branchesId}><h2 className="ds-heading-3" id={branchesId}>Active branches</h2><div className="ds-toolbar"><SearchBar label="Search branches" placeholder="Search branches…" value={query} onChange={(event) => setQuery(event.target.value)} /><DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline"><Filter aria-hidden="true" />Status <Badge>{filter === 'all' ? 'All' : filter === 'ready' ? 'Ready' : 'Draft'}</Badge></Button></DropdownMenuTrigger><DropdownMenuContent align="end"><DropdownMenuRadioGroup value={filter} onValueChange={setFilter}><DropdownMenuRadioItem value="all">All statuses</DropdownMenuRadioItem><DropdownMenuRadioItem value="ready">Ready</DropdownMenuRadioItem><DropdownMenuRadioItem value="draft">Draft</DropdownMenuRadioItem></DropdownMenuRadioGroup></DropdownMenuContent></DropdownMenu></div>
    <p role="status" className="ds-sr-only">{matches ? '1 matching branch' : 'No matching branches'}</p>{matches ? <div className="ds-branch"><GitBranch aria-hidden="true" /><span className="ds-mono ds-label">{data.branch}</span><div className="ds-branch-details"><Badge variant="outline">Preview</Badge><span className="ds-status ds-small">Ready</span><span className="ds-mono ds-secondary-detail">{data.commit}</span><span className="ds-muted ds-small ds-secondary-detail">{data.user}</span><span className="ds-muted ds-small">{data.created}</span><Button size="icon-sm" variant="ghost" aria-label="Branch details" onClick={() => onAction('Branch main is ready. Commit a1b2c3d is fictitious.')}><MoreHorizontal aria-hidden="true" /></Button></div></div> : <EmptyState title="No matching branches" description="Try a different name or reset the status filter." action={<Button variant="outline" onClick={() => { setQuery(''); setFilter('all'); }}>Clear filters</Button>} />}</section>
  </>}<footer className="ds-approval-note"><span>Design System · Foundation preview 0.1</span><span>Shared tokens. Reusable blocks. Fictional data.</span></footer></div>;
}
