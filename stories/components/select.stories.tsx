import type { Meta, StoryObj } from '@storybook/react-vite';
import { componentDocs } from '@/lib/component-docs';
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
const meta = { title: 'Components/Select', component: Select, tags: ['autodocs'], parameters: { docs: { description: { component: componentDocs('Select') } } },  } satisfies Meta<typeof Select>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: (args) => <div className="ds-example-field"><Select {...args}><SelectTrigger aria-label="Environment"><SelectValue placeholder="Choose environment" /></SelectTrigger><SelectContent><SelectItem value="production">Production</SelectItem><SelectItem value="preview">Preview</SelectItem><SelectItem value="development">Development</SelectItem></SelectContent></Select></div> };
export const Disabled: Story = { ...Default, args: { disabled: true } };
