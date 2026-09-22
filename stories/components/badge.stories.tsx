import type { Meta, StoryObj } from '@storybook/react-vite';
import { componentDocs } from '@/lib/component-docs';
import { Badge } from '@/components/ui/badge';
const meta = { title: 'Components/Badge', component: Badge, tags: ['autodocs'], parameters: { docs: { description: { component: componentDocs('Badge') } } },  } satisfies Meta<typeof Badge>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: 'Preview' } };
export const Variants: Story = { render: () => <div className="ds-row ds-wrap">{(['default','outline','info','success','warning','destructive'] as const).map((variant) => <Badge variant={variant} key={variant}>{variant}</Badge>)}</div> };
