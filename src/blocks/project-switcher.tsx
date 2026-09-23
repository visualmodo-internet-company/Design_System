import { useMemo, useRef, useState } from 'react';
import { ChevronsUpDown, Plus, X } from 'lucide-react';
import { Popover as Primitive } from 'radix-ui';

export interface ProjectSwitcherProps {
  project: string;
  triggerLabel?: string;
  onSelectProject: () => void;
  onCreateProject: () => void;
}

function ProjectMark() {
  return <span className="ds-project-mark" aria-hidden="true" />;
}

export function ProjectSwitcher({
  project,
  triggerLabel = project,
  onSelectProject,
  onCreateProject,
}: ProjectSwitcherProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const matches = useMemo(
    () => project.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()),
    [project, query],
  );

  return (
    <Primitive.Root
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) setQuery('');
      }}
    >
      <Primitive.Trigger asChild>
        <button type="button" className="ds-project-trigger" aria-label="Switch project">
          <span className="ds-truncate">{triggerLabel}</span>
          <ChevronsUpDown aria-hidden="true" />
        </button>
      </Primitive.Trigger>

      <Primitive.Portal>
        <Primitive.Content
          className="ds-project-popover"
          side="bottom"
          align="start"
          sideOffset={2}
          collisionPadding={8}
          aria-label="Switch project"
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            requestAnimationFrame(() => inputRef.current?.focus());
          }}
        >
          <div className="ds-project-search-row">
            <input
              ref={inputRef}
              type="search"
              aria-label="Find Project"
              placeholder="Find Project..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button
              type="button"
              className="ds-project-close"
              aria-label="Close project switcher"
              onClick={() => setOpen(false)}
            >
              <kbd className="ds-kbd ds-project-close-kbd">Esc</kbd>
              <X className="ds-project-close-x" aria-hidden="true" />
            </button>
          </div>

          <div className="ds-project-results">
            {matches && (
              <button
                type="button"
                className="ds-project-option"
                onClick={() => {
                  onSelectProject();
                  setOpen(false);
                }}
              >
                <ProjectMark />
                <span className="ds-truncate">{project}</span>
              </button>
            )}
          </div>

          <div className="ds-project-create-wrap">
            <button
              type="button"
              className="ds-project-create"
              onClick={() => {
                onCreateProject();
                setOpen(false);
              }}
            >
              <Plus aria-hidden="true" />
              <span>Create Project</span>
            </button>
          </div>
        </Primitive.Content>
      </Primitive.Portal>
    </Primitive.Root>
  );
}
