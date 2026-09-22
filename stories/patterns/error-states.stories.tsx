import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { ErrorState } from '@/blocks/error-state';
const meta = { title: 'Patterns/Error States', component: ErrorState, tags: ['autodocs'], args: { onRetry: fn() } } satisfies Meta<typeof ErrorState>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Recoverable: Story = {};
