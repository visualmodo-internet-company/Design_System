import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EmptyState } from './empty-state';
export function ErrorState({ onRetry, message = 'Something went wrong. Your work is safe. Please try again.' }: { onRetry: () => void; message?: string }) {
  return <div role="alert"><EmptyState icon={AlertCircle} title="We could not load this view" description={message} action={<Button variant="outline" onClick={onRetry}>Try again</Button>} /></div>;
}
