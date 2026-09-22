import { LayoutGrid, Box, List, ChartNoAxesCombined, Gauge, Eye, Shield, Globe, Shuffle, PanelsTopLeft, Plug, Store, Database, ToggleLeft, Sparkles, Workflow, Image, ChartPie, LifeBuoy, Settings, Route, History } from 'lucide-react';
import type { NavigationGroup } from '@/blocks/navigation';
/** Demo labels only. Consumers supply their own navigation and router integration. */
export const demoNavigation: NavigationGroup[] = [
  { id: 'project', items: [
    { id: 'overview', label: 'Overview', icon: LayoutGrid }, { id: 'deployments', label: 'Deployments', icon: Box },
    { id: 'logs', label: 'Logs', icon: List }, { id: 'analytics', label: 'Analytics', icon: ChartNoAxesCombined },
    { id: 'performance', label: 'Performance', icon: Gauge }, { id: 'observability', label: 'Observability', icon: Eye },
    { id: 'security', label: 'Security', icon: Shield }, { id: 'network', label: 'Network', icon: Globe, children: [
      { id: 'routing-rules', label: 'Routing rules', icon: Route }, { id: 'routing-history', label: 'History', icon: History },
    ] },
  ] },
  { id: 'resources', items: [
    { id: 'environment', label: 'Environment variables', icon: Shuffle }, { id: 'domains', label: 'Domains', icon: PanelsTopLeft },
    { id: 'connections', label: 'Connections', icon: Plug }, { id: 'integrations', label: 'Integrations', icon: Store },
    { id: 'storage', label: 'Storage', icon: Database }, { id: 'flags', label: 'Feature flags', icon: ToggleLeft },
    { id: 'agent', label: 'Agent', icon: Sparkles }, { id: 'workflows', label: 'Workflows', icon: Workflow }, { id: 'media', label: 'Media', icon: Image },
  ] },
  { id: 'workspace', items: [{ id: 'usage', label: 'Usage', icon: ChartPie }, { id: 'support', label: 'Support', icon: LifeBuoy }, { id: 'settings', label: 'Settings', icon: Settings }] },
];
