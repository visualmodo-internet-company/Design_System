import { useId, type ComponentProps } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
export function SearchBar({ label = 'Search', ...props }: ComponentProps<typeof Input> & { label?: string }) {
  const id = useId();
  return <div className="ds-search"><Search aria-hidden="true" /><label className="ds-sr-only" htmlFor={props.id ?? id}>{label}</label><Input id={id} type="search" placeholder="Search…" {...props} /></div>;
}
