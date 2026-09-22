import type { Meta, StoryObj } from '@storybook/react-vite';
import { componentDocs } from '@/lib/component-docs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
const meta = { title: 'Components/Label', component: Label, tags: ['autodocs'], parameters: { docs: { description: { component: componentDocs('Label') } } },  } satisfies Meta<typeof Label>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => <div className="ds-stack ds-example-field"><Label htmlFor="email-example">Email address</Label><Input id="email-example" type="email" autoComplete="email" placeholder="you@example.com" /></div> };
