import type { Meta, StoryObj } from '@storybook/react-vite';
import { componentDocs } from '@/lib/component-docs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
const meta = { title: 'Components/Radio Group', component: RadioGroup, tags: ['autodocs'], parameters: { docs: { description: { component: componentDocs('Radio Group') } } },  } satisfies Meta<typeof RadioGroup>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: (args) => <RadioGroup {...args} aria-label="Environment" defaultValue="production"><div className="ds-row"><RadioGroupItem value="production" id="radio-production" /><Label htmlFor="radio-production">Production</Label></div><div className="ds-row"><RadioGroupItem value="preview" id="radio-preview" /><Label htmlFor="radio-preview">Preview</Label></div></RadioGroup> };
export const Disabled: Story = { ...Default, args: { disabled: true } };
