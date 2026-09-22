import type { Meta, StoryObj } from '@storybook/react-vite';
import { componentDocs } from '@/lib/component-docs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
const meta = { title: 'Components/Switch', component: Switch, tags: ['autodocs'], parameters: { docs: { description: { component: componentDocs('Switch') } } },  } satisfies Meta<typeof Switch>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: (args) => <div className="ds-row"><Switch {...args} id="switch-sample" /><Label htmlFor="switch-sample">Enable notifications</Label></div> };
export const Checked: Story = { ...Default, args: { defaultChecked: true } };
export const Disabled: Story = { ...Default, args: { disabled: true } };
