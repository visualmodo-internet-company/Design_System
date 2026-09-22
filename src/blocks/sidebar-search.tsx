import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { Box, Globe2, Search, Sparkles, X } from 'lucide-react';
import { Popover as Primitive } from 'radix-ui';
import { flattenNavigation, type NavigationGroup } from './navigation';

export interface SidebarSearchProps {
  groups: NavigationGroup[];
  team: string;
  project: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (id: string) => void;
  onAction: (message: string) => void;
}

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  icon: typeof Search;
  action: () => void;
}

function normalize(value: string) {
  return value.trim().toLocaleLowerCase();
}

export function SidebarSearch({
  groups,
  team,
  project,
  open,
  onOpenChange,
  onNavigate,
  onAction,
}: SidebarSearchProps) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo<SearchResult[]>(() => {
    const needle = normalize(query);
    const navigation = flattenNavigation(groups).map<SearchResult>((item) => ({
      id: `nav:${item.id}`,
      title: item.label,
      subtitle: 'Navigation',
      icon: item.icon,
      action: () => onNavigate(item.children?.[0]?.id ?? item.id),
    }));

    const base: SearchResult[] = [
      {
        id: 'team',
        title: team,
        subtitle: 'Team',
        icon: Globe2,
        action: () => onAction(`${team} team selected from search.`),
      },
      {
        id: 'project',
        title: project,
        subtitle: 'Project',
        icon: Box,
        action: () => onAction(`${project} project selected from search.`),
      },
      ...navigation,
    ];

    const filtered = needle
      ? base.filter((item) => normalize(`${item.title} ${item.subtitle}`).includes(needle))
      : base;

    const visible = filtered.slice(0, 6);
    const assistantTitle = query.trim() ? `“${query.trim()}”` : '“what did we deploy today?”';

    return [
      ...visible,
      {
        id: 'assistant',
        title: assistantTitle,
        subtitle: 'Navigation Assistant',
        icon: Sparkles,
        action: () => onAction('Navigation Assistant is a visual demo. No AI request was sent.'),
      },
    ];
  }, [groups, onAction, onNavigate, project, query, team]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  const activate = (index: number) => {
    const result = results[index];
    if (!result) return;
    result.action();
    onOpenChange(false);
    setQuery('');
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, results.length - 1));
      return;
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
      return;
    }
    if (event.key === 'Enter') {
      event.preventDefault();
      activate(activeIndex);
      return;
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      onOpenChange(false);
    }
  };

  return (
    <Primitive.Root
      open={open}
      onOpenChange={(nextOpen) => {
        onOpenChange(nextOpen);
        if (!nextOpen) setQuery('');
      }}
    >
      <Primitive.Trigger asChild>
        <button className="ds-find" type="button" aria-label="Find">
          <Search aria-hidden="true" />
          <span>Find</span>
          <kbd className="ds-kbd">F</kbd>
        </button>
      </Primitive.Trigger>

      <Primitive.Portal>
        <Primitive.Content
          className="ds-sidebar-search-popover"
          side="bottom"
          align="start"
          sideOffset={-36}
          collisionPadding={8}
          aria-label="Find"
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            requestAnimationFrame(() => inputRef.current?.focus());
          }}
        >
          <div className="ds-sidebar-search-head">
            <Search aria-hidden="true" />
            <input
              ref={inputRef}
              type="search"
              aria-label="Find"
              placeholder="Find"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={handleInputKeyDown}
            />
            <button
              type="button"
              className="ds-sidebar-search-close"
              aria-label="Close search"
              onClick={() => onOpenChange(false)}
            >
              <kbd className="ds-kbd ds-sidebar-search-close-kbd">Esc</kbd>
              <X className="ds-sidebar-search-close-x" aria-hidden="true" />
            </button>
          </div>

          <div className="ds-sidebar-search-results" role="listbox" aria-label="Search results">
            {results.map((result, index) => {
              const Icon = result.icon;
              return (
                <button
                  key={result.id}
                  type="button"
                  role="option"
                  aria-selected={activeIndex === index}
                  className="ds-sidebar-search-result"
                  data-active={activeIndex === index ? 'true' : undefined}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => activate(index)}
                >
                  <span className="ds-sidebar-search-result-icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <span className="ds-sidebar-search-result-copy">
                    <strong className="ds-truncate">{result.title}</strong>
                    <span className="ds-truncate">{result.subtitle}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </Primitive.Content>
      </Primitive.Portal>
    </Primitive.Root>
  );
}
