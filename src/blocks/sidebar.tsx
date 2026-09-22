import { Fragment } from 'react';
import { ArrowLeft, Bell, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { TeamSwitcher } from './team-switcher';
import { SidebarSearch } from './sidebar-search';
import type { NavigationGroup, NavigationItem } from './navigation';
export interface SidebarProps { groups: NavigationGroup[]; activeId: string; onNavigate: (id: string) => void; workspace: string; workspacePlan?: string; project: string; userName: string; searchOpen: boolean; onSearchOpenChange: (open: boolean) => void; onAction: (action: string) => void; onClose?: () => void }
export function Sidebar({ groups, activeId, onNavigate, workspace, workspacePlan, project, userName, searchOpen, onSearchOpenChange, onAction, onClose }: SidebarProps) {
  const initials = userName.trim().split(/\s+/).slice(0, 2).map((part) => part.charAt(0)).join('').toUpperCase() || 'U';
  const parent = groups.flatMap((group) => group.items).find((item) => item.children?.some((child) => child.id === activeId));
  const navigate = (id: string) => { onNavigate(id); onClose?.(); };
  const renderItem = (item: NavigationItem) => <a key={item.id} href={item.href ?? `#${item.id}`} className="ds-nav-link" aria-current={activeId === item.id ? 'page' : undefined} onClick={(event) => { if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); navigate(item.children?.[0]?.id ?? item.id); }}><item.icon aria-hidden="true" /><span className="ds-truncate">{item.label}</span>{item.children && <ChevronRight className="ds-nav-chevron" aria-hidden="true" />}</a>;
  return <div className="ds-sidebar-inner">
    <div className="ds-sidebar-head">
      <TeamSwitcher
        team={workspace}
        plan={workspacePlan}
        onOpenTeam={() => onAction(`${workspace} team overview selected.`)}
        onSelectTeam={() => onAction(`${workspace} team selected.`)}
        onCreateTeam={() => onAction('Create Team is a future page pattern.')}
      />
      <SidebarSearch
        groups={groups}
        team={workspace}
        project={project}
        open={searchOpen}
        onOpenChange={onSearchOpenChange}
        onNavigate={(id) => {
          navigate(id);
          onSearchOpenChange(false);
        }}
        onAction={onAction}
      />
    </div>
    <nav aria-label="Main navigation" className="ds-sidebar-nav"><div key={parent?.id ?? 'root'} className="ds-nav-panel">{parent ? <><Button variant="ghost" className="ds-nav-link" onClick={() => navigate('overview')}><ArrowLeft aria-hidden="true" />Back to overview</Button><p className="ds-menu-label">{parent.label}</p>{parent.children?.map(renderItem)}</> : groups.map((group, index) => <Fragment key={group.id}>{index > 0 && <hr className="ds-nav-divider" />}{group.items.map(renderItem)}</Fragment>)}</div></nav>
    <div className="ds-sidebar-foot"><DropdownMenu><DropdownMenuTrigger asChild><button type="button" className="ds-user-trigger" aria-label="Open user menu"><Avatar className="ds-avatar--small"><AvatarFallback aria-hidden="true">{initials}</AvatarFallback></Avatar><span className="ds-truncate ds-grow">{userName}</span><MoreHorizontal aria-hidden="true" /></button></DropdownMenuTrigger><DropdownMenuContent side="top" align="start"><DropdownMenuLabel>{userName} · Demo user</DropdownMenuLabel><DropdownMenuItem onSelect={() => onAction('Account will be designed after approval of this foundation.')}>Account settings</DropdownMenuItem><DropdownMenuItem onSelect={() => onAction('This is a UI demo. There is no authentication session to sign out of.')}>Sign out</DropdownMenuItem></DropdownMenuContent></DropdownMenu><Button variant="ghost" size="icon-sm" aria-label="Notifications" onClick={() => onAction('You are up to date. Notifications are demonstrated locally.')}><Bell aria-hidden="true" /></Button></div>
  </div>;
}
