import type { Meta, StoryObj } from '@storybook/react-vite';
import { componentDocs } from '@/lib/component-docs';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
const meta = { title: 'Components/Textarea', component: Textarea, tags: ['autodocs'], parameters: { docs: { description: { component: componentDocs('Textarea') } } }, args: { placeholder: 'example-project' }, } satisfies Meta<typeof Textarea>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: (args) => <div className="ds-stack ds-example-field"><Label htmlFor="textarea-example">Project name</Label><Textarea {...args} id="textarea-example" /></div> };
export const Disabled: Story = { ...Default, args: { disabled: true } };
export const Invalid: Story = { render: () => <div className="ds-stack ds-example-field"><Label htmlFor="textarea-error">Project name</Label><Textarea id="textarea-error" aria-invalid="true" aria-describedby="textarea-message" defaultValue="!" /><p id="textarea-message" className="ds-danger ds-small">Use letters, numbers and hyphens.</p></div> };
