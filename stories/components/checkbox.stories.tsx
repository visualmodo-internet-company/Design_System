import type { Meta, StoryObj } from '@storybook/react-vite';
import { componentDocs } from '@/lib/component-docs';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
const meta = { title: 'Components/Checkbox', component: Checkbox, tags: ['autodocs'], parameters: { docs: { description: { component: componentDocs('Checkbox') } } },  } satisfies Meta<typeof Checkbox>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: (args) => <div className="ds-row"><Checkbox {...args} id="checkbox-sample" /><Label htmlFor="checkbox-sample">Accept the example terms</Label></div> };
export const Checked: Story = { ...Default, args: { defaultChecked: true } };
export const Disabled: Story = { ...Default, args: { disabled: true } };
export const Indeterminate: Story = { ...Default, args: { checked: 'indeterminate' } };
