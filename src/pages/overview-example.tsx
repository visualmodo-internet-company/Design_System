import { useState } from 'react';
import { Plus, Route } from 'lucide-react';
import { ApplicationShell } from '@/layouts/application-shell';
import { ContentLayout } from '@/layouts/content-layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ToastProvider, Toast, ToastTitle, ToastDescription, ToastViewport } from '@/components/ui/toast';
import { TooltipProvider } from '@/components/ui/tooltip';
import { EmptyState } from '@/blocks/empty-state';
import { LoadingState } from '@/blocks/loading-state';
import { demoNavigation } from '@/fixtures/navigation';
import data from '@/fixtures/overview.json';
import { OverviewPage, type PageState } from './overview-page';
export function OverviewExample({ initialState = 'ready' }: { initialState?: PageState }) {
  const [state, setState] = useState<PageState>(initialState);
  const [activeId, setActiveId] = useState('overview');
  const [notification, setNotification] = useState<{ id: number; message: string } | null>(null);
  const notify = (message: string) => setNotification({ id: Date.now(), message });
  const isRouting = activeId.startsWith('routing-');
  function navigate(id: string) {
    if (id === 'overview' || id.startsWith('routing-')) { setActiveId(id); return; }
    notify(`${id.replaceAll('-', ' ')} is a future page pattern. This release validates the shared foundation and Overview first.`);
  }
  return <TooltipProvider delayDuration={300}><ToastProvider><ApplicationShell navigation={demoNavigation} activeId={activeId} onNavigate={navigate} title={isRouting ? 'Network / Routing rules' : 'Overview'} workspace={data.workspace} workspacePlan={data.plan} project={data.project} userName={data.user} onAction={notify}>
    {isRouting ? <ContentLayout title="Routing rules" description="An example of contextual navigation, tabs and empty/loading states. No routes are configured."><Tabs value={activeId} onValueChange={setActiveId}><TabsList aria-label="Routing views"><TabsTrigger value="routing-rules">Rules</TabsTrigger><TabsTrigger value="routing-history">History</TabsTrigger></TabsList><TabsContent value="routing-rules"><EmptyState icon={Route} title="No routing rules" description="This is an empty-state pattern, not a networking service. Use the same block for any collection." action={<Button onClick={() => notify('Create action demonstrated. No rule was created.')}><Plus aria-hidden="true" />Create route</Button>} /></TabsContent><TabsContent value="routing-history"><LoadingState label="Example loading state — fixed for inspection" /></TabsContent></Tabs></ContentLayout> : <OverviewPage state={state} onAction={notify} onRetry={() => setState('ready')} />}
  </ApplicationShell>{notification && <Toast key={notification.id} defaultOpen onOpenChange={(open) => { if (!open) setNotification(null); }}><ToastTitle className="ds-label">Design System demo</ToastTitle><ToastDescription className="ds-small ds-muted">{notification.message}</ToastDescription></Toast>}<ToastViewport /></ToastProvider></TooltipProvider>;
}
