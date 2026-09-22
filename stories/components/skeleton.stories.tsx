import type { Meta, StoryObj } from '@storybook/react-vite';
import { componentDocs } from '@/lib/component-docs';
import { Skeleton } from '@/components/ui/skeleton';
import { LoadingState } from '@/blocks/loading-state';
const meta = { title: 'Components/Skeleton', component: Skeleton, tags: ['autodocs'], parameters: { docs: { description: { component: componentDocs('Skeleton') } } },  } satisfies Meta<typeof Skeleton>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => <LoadingState label="Loading example items" rows={3} /> };
