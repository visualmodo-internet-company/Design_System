import { useMemo, useRef, useState } from 'react';
import { Check, ChevronsUpDown, Globe2, Plus, Users, X } from 'lucide-react';
import { Popover as Primitive } from 'radix-ui';
import { Badge } from '@/components/ui/badge';

export interface TeamSwitcherProps {
  team: string;
  plan?: string;
  onOpenTeam: () => void;
  onSelectTeam: () => void;
  onCreateTeam: () => void;
}

function TeamMark() {
  return (
    <span className="ds-team-avatar-mark" aria-hidden="true">
      <Globe2 />
    </span>
  );
}

export function TeamSwitcher({ team, plan, onOpenTeam, onSelectTeam, onCreateTeam }: TeamSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const matchesTeam = useMemo(() => team.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()), [query, team]);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) setQuery('');
  };

  return (
    <Primitive.Root open={open} onOpenChange={handleOpenChange}>
      <Primitive.Anchor asChild>
        <div className="ds-team-anchor">
          <button type="button" className="ds-team-link" onClick={onOpenTeam} aria-label={`Open ${team} team`}>
            <TeamMark />
            <span className="ds-team-identity">
              <span className="ds-team-name ds-truncate">{team}</span>
              {plan && <Badge className="ds-scope-badge">{plan}</Badge>}
            </span>
          </button>
          <Primitive.Trigger asChild>
            <button type="button" className="ds-team-trigger" aria-label="Switch team">
              <ChevronsUpDown aria-hidden="true" />
            </button>
          </Primitive.Trigger>
        </div>
      </Primitive.Anchor>

      <Primitive.Portal>
        <Primitive.Content
          className="ds-team-popover"
          side="bottom"
          align="start"
          sideOffset={2}
          collisionPadding={8}
          aria-label="Switch team"
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            requestAnimationFrame(() => inputRef.current?.focus());
          }}
        >
          <div className="ds-team-search-row">
            <input
              ref={inputRef}
              type="search"
              aria-label="Search teams"
              className="ds-team-search-input"
              placeholder="Find Team…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button type="button" className="ds-team-close" aria-label="Close team switcher" onClick={() => setOpen(false)}>
              <kbd className="ds-kbd ds-team-close-kbd">Esc</kbd>
              <X className="ds-team-close-x" aria-hidden="true" />
            </button>
          </div>

          <div className="ds-team-results">
            {matchesTeam && (
              <div className="ds-team-option-wrap">
                <button
                  type="button"
                  className="ds-team-option"
                  onClick={() => {
                    onSelectTeam();
                    setOpen(false);
                  }}
                >
                  <TeamMark />
                  <span className="ds-team-option-content">
                    <span className="ds-team-option-name ds-truncate">{team}</span>
                    {plan && <Badge className="ds-scope-badge">{plan}</Badge>}
                  </span>
                  <span className="ds-team-check" aria-label="Selected team">
                    <Check aria-hidden="true" />
                  </span>
                </button>
              </div>
            )}

            <div className="ds-team-empty">
              <span className="ds-team-empty-icon" aria-hidden="true">
                <Users />
              </span>
              <p>Teams you create and join appear here for quick context switching.</p>
            </div>
          </div>

          <div className="ds-team-footer">
            <button
              type="button"
              className="ds-team-create"
              onClick={() => {
                onCreateTeam();
                setOpen(false);
              }}
            >
              <Plus aria-hidden="true" />
              <span>
                <strong>Create Team</strong>
                <small>Collaborate with others in a shared workspace</small>
              </span>
            </button>
          </div>
        </Primitive.Content>
      </Primitive.Portal>
    </Primitive.Root>
  );
}
