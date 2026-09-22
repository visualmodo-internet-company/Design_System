import type { Meta, StoryObj } from '@storybook/react-vite';
import { componentDocs } from '@/lib/component-docs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
const meta = { title: 'Components/Input', component: Input, tags: ['autodocs'], parameters: { docs: { description: { component: componentDocs('Input') } } }, args: { placeholder: 'example-project' }, } satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: (args) => <div className="ds-stack ds-example-field"><Label htmlFor="input-example">Project name</Label><Input {...args} id="input-example" /></div> };
export const Disabled: Story = { ...Default, args: { disabled: true } };
export const Invalid: Story = { render: () => <div className="ds-stack ds-example-field"><Label htmlFor="input-error">Project name</Label><Input id="input-error" aria-invalid="true" aria-describedby="input-message" defaultValue="!" /><p id="input-message" className="ds-danger ds-small">Use letters, numbers and hyphens.</p></div> };
