import type { Meta, StoryObj } from '@storybook/react-vite';
import { componentDocs } from '@/lib/component-docs';
import { Progress } from '@/components/ui/progress';
const meta = { title: 'Components/Progress', component: Progress, tags: ['autodocs'], parameters: { docs: { description: { component: componentDocs('Progress') } } }, argTypes: { value: { control: { type: 'range', min: 0, max: 100 } } }, } satisfies Meta<typeof Progress>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { args: { value: 62, 'aria-label': 'Upload progress' } };
export const Indeterminate: Story = { args: { value: null, 'aria-label': 'Preparing files' } };
