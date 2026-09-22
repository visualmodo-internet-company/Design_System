import type { LucideIcon } from 'lucide-react';
export interface NavigationItem { id: string; label: string; icon: LucideIcon; href?: string; children?: NavigationItem[] }
export interface NavigationGroup { id: string; items: NavigationItem[] }
export function flattenNavigation(groups: NavigationGroup[]): NavigationItem[] { const expand = (items: NavigationItem[]): NavigationItem[] => items.flatMap((item) => [item, ...expand(item.children ?? [])]); return groups.flatMap((group) => expand(group.items)); }
