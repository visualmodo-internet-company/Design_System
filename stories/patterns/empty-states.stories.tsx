import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { EmptyState } from '@/blocks/empty-state';
import { Button } from '@/components/ui/button';
const meta = { title: 'Patterns/Empty States', component: EmptyState, tags: ['autodocs'], args: { title: 'No connections yet', description: 'Connect your first integration to see it here.', action: <Button onClick={fn()}>Create connection</Button> } } satisfies Meta<typeof EmptyState>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const LongContent: Story = { args: { title: 'No matching records in this workspace', description: 'The collection is empty for the current filters. Review the workspace, adjust your search terms or reset the active filters to return to the complete collection.' } };
