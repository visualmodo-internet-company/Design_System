import {
  BookOpen,
  House,
  LifeBuoy,
  LogOut,
  MoreHorizontal,
  Pencil,
  Settings,
  SmilePlus,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface SidebarUserMenuProps {
  userName: string;
  userEmail?: string;
  initials: string;
  onOpenSettings: () => void;
  onAction: (message: string) => void;
}

export function SidebarUserMenu({
  userName,
  userEmail = 'user@example.com',
  initials,
  onOpenSettings,
  onAction,
}: SidebarUserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button" className="ds-user-trigger" aria-label="Open user menu">
          <Avatar className="ds-avatar--small">
            <AvatarFallback aria-hidden="true">{initials}</AvatarFallback>
          </Avatar>
          <span className="ds-truncate ds-grow">{userName}</span>
          <MoreHorizontal aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="ds-user-menu" side="top" align="start" sideOffset={8}>
        <div className="ds-user-menu-section ds-user-menu-section--profile">
          <DropdownMenuItem className="ds-user-menu-profile" onSelect={onOpenSettings}>
            <span className="ds-user-menu-profile-copy">
              <strong className="ds-truncate">{userName}</strong>
              <span className="ds-truncate">{userEmail}</span>
            </span>
            <Settings aria-hidden="true" />
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator className="ds-user-menu-separator" />

        <div className="ds-user-menu-section ds-user-menu-section--links">
          <DropdownMenuItem className="ds-user-menu-item" onSelect={() => onAction('Feedback is a visual demo action.')}>
            <span>Feedback</span><SmilePlus aria-hidden="true" />
          </DropdownMenuItem>
          <DropdownMenuItem className="ds-user-menu-item" onSelect={() => onAction('Home Page is a visual demo action.')}>
            <span>Home Page</span><House aria-hidden="true" />
          </DropdownMenuItem>
          <DropdownMenuItem className="ds-user-menu-item" onSelect={() => onAction('Changelog is a visual demo action.')}>
            <span>Changelog</span><Pencil aria-hidden="true" />
          </DropdownMenuItem>
          <DropdownMenuItem className="ds-user-menu-item" onSelect={() => onAction('Help is a visual demo action.')}>
            <span>Help</span><LifeBuoy aria-hidden="true" />
          </DropdownMenuItem>
          <DropdownMenuItem className="ds-user-menu-item" onSelect={() => onAction('Docs is a visual demo action.')}>
            <span>Docs</span><BookOpen aria-hidden="true" />
          </DropdownMenuItem>
          <DropdownMenuItem className="ds-user-menu-item" onSelect={() => onAction('This is a UI demo. There is no authentication session to log out of.')}>
            <span>Log Out</span><LogOut aria-hidden="true" />
          </DropdownMenuItem>

          <DropdownMenuItem className="ds-user-menu-upgrade" onSelect={() => onAction('Upgrade to Pro is a visual demo action.')}>
            Upgrade to Pro
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator className="ds-user-menu-separator" />

        <div className="ds-user-menu-section ds-user-menu-section--status">
          <DropdownMenuItem className="ds-user-menu-status" onSelect={() => onAction('System status is a visual demo action.')}>
            <span>All systems normal.</span>
            <span className="ds-user-menu-status-dot" aria-hidden="true" />
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
