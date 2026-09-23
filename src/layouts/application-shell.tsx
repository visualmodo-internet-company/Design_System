import { useCallback, useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { ChevronLeft, ChevronsUpDown, Folder, PanelLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel } from '@/components/ui/dropdown-menu';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { Sidebar } from '@/blocks/sidebar';
import { ThemeSwitcher } from '@/blocks/theme-switcher';
import type { NavigationGroup } from '@/blocks/navigation';
import { useSidebar } from '@/hooks/use-sidebar';
export interface ApplicationShellProps { children: ReactNode; navigation: NavigationGroup[]; activeId: string; onNavigate: (id: string) => void; title: string; workspace?: string; workspacePlan?: string; project?: string; userName?: string; userEmail?: string; onAction: (message: string) => void; storageKey?: string; variant?: 'project' | 'account'; onBack?: () => void }
export function ApplicationShell({ children, navigation, activeId, onNavigate, title, workspace = 'Workspace', workspacePlan, project = 'Project', userName = 'User', userEmail = 'user@example.com', onAction, storageKey, variant = 'project', onBack }: ApplicationShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const mobileTrigger = useRef<HTMLButtonElement>(null);
  const mainContent = useRef<HTMLElement>(null);
  const openSearch = useCallback(() => {
    setSearchOpen(true);
  }, []);
  const sidebar = useSidebar(storageKey);
  const contentId = useId();
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      if (target instanceof HTMLElement && (target.isContentEditable || target.closest('input, textarea, select, [role="textbox"]'))) return;
      if ((event.key.toLowerCase() === 'f' && !event.ctrlKey && !event.metaKey && !event.altKey) || (event.key.toLowerCase() === 'k' && (event.ctrlKey || event.metaKey))) { event.preventDefault(); openSearch(); }
    };
    window.addEventListener('keydown', onKeyDown); return () => window.removeEventListener('keydown', onKeyDown);
  }, [openSearch]);
  const sidebarProps = {
    groups: navigation,
    activeId,
    onNavigate,
    workspace,
    workspacePlan,
    project,
    userName,
    userEmail,
    searchOpen,
    onSearchOpenChange: setSearchOpen,
    onAction,
    variant,
    onBack,
  };
  return <div className="ds-shell" data-collapsed={sidebar.collapsed} style={{ '--ds-sidebar-width': `${sidebar.width}px` } as CSSProperties}>
    <a className="ds-skip-link" href={`#${contentId}`}>Skip to content</a>
    <aside className="ds-sidebar" aria-label="Sidebar"><Sidebar {...sidebarProps} /><div role="separator" aria-label="Resize sidebar" aria-orientation="vertical" aria-valuemin={240} aria-valuemax={400} aria-valuenow={sidebar.width} tabIndex={0} className="ds-sidebar-resizer" onKeyDown={(event) => { if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) { event.preventDefault(); sidebar.setWidth(event.key === 'Home' ? 240 : event.key === 'End' ? 400 : sidebar.width + (event.key === 'ArrowRight' ? 16 : -16)); } }} onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); }} onPointerMove={(event) => { if (event.currentTarget.hasPointerCapture(event.pointerId)) sidebar.setWidth(event.clientX); }} /><button className="ds-sidebar-toggle" type="button" aria-label="Collapse sidebar" onClick={() => sidebar.setCollapsed(true)}><ChevronLeft aria-hidden="true" /></button></aside>
    <div className="ds-shell-main"><header className="ds-header" data-variant={variant}><div className="ds-header-left"><Button variant="ghost" size="icon-sm" ref={mobileTrigger} className="ds-mobile-trigger" aria-label="Open sidebar" onClick={() => { if (window.matchMedia('(min-width: 961px)').matches) sidebar.setCollapsed(false); else setMobileOpen(true); }}><PanelLeft aria-hidden="true" /></Button>{variant === 'project' && <DropdownMenu><DropdownMenuTrigger asChild><button type="button" className="ds-project-trigger" aria-label="Switch project"><Folder aria-hidden="true" /><span className="ds-truncate">{project}</span><ChevronsUpDown aria-hidden="true" /></button></DropdownMenuTrigger><DropdownMenuContent align="start"><DropdownMenuLabel>Project context</DropdownMenuLabel><DropdownMenuItem onSelect={() => onAction('Example project selected.')}>{project}</DropdownMenuItem><DropdownMenuItem onSelect={() => onAction('Pass a different project prop to reuse this shell.')}>Reuse in another project</DropdownMenuItem></DropdownMenuContent></DropdownMenu>}</div><div className="ds-header-center"><Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbPage>{title}</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb></div><div className="ds-header-right">{variant === 'project' && <><ThemeSwitcher /><Button variant="ghost" size="sm" onClick={() => onAction('Read AGENTS.md and docs/ai_guidelines.md before creating a new page.')}><Sparkles aria-hidden="true" /><span className="ds-hide-mobile">Agent</span></Button></>}</div></header><main ref={mainContent} id={contentId} tabIndex={-1} className={`ds-page ${variant === 'account' ? 'ds-page--account' : ''}`}>{children}</main></div>
    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}><SheetContent onCloseAutoFocus={(event) => { event.preventDefault(); mobileTrigger.current?.focus(); }} side="left" className="ds-mobile-sheet"><SheetTitle className="ds-sr-only">Navigation</SheetTitle><SheetDescription className="ds-sr-only">Choose a destination or use search. Press Escape to close.</SheetDescription><Sidebar {...sidebarProps} onClose={() => setMobileOpen(false)} /></SheetContent></Sheet>

  </div>;
}
