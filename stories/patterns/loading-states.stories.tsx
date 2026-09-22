import type { Meta, StoryObj } from '@storybook/react-vite';
import { LoadingState } from '@/blocks/loading-state';
const meta = { title: 'Patterns/Loading States', component: LoadingState, tags: ['autodocs'], args: { rows: 5 } } satisfies Meta<typeof LoadingState>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Rows: Story = {};
