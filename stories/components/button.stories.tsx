import type { Meta, StoryObj } from '@storybook/react-vite';
import { componentDocs } from '@/lib/component-docs';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { fn, expect, userEvent, within } from 'storybook/test';
const meta = { title: 'Components/Button', component: Button, tags: ['autodocs'], parameters: { docs: { description: { component: componentDocs('Button') } } }, args: { children: 'Create project', onClick: fn() }, argTypes: { variant: { control: 'select', options: ['default','secondary','outline','ghost','destructive','link'] }, size: { control: 'select', options: ['sm','default','lg','icon','icon-sm'] } }, } satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { play: async ({ canvasElement, args }) => { await userEvent.click(within(canvasElement).getByRole('button', { name: 'Create project' })); await expect(args.onClick).toHaveBeenCalled(); } };
export const Variants: Story = { render: () => <div className="ds-row ds-wrap">{(['default', 'secondary', 'outline', 'ghost', 'destructive', 'link'] as const).map((variant) => <Button key={variant} variant={variant}>{variant}</Button>)}</div> };
export const Sizes: Story = { render: () => <div className="ds-row ds-wrap"><Button size="sm">Compact · 32px</Button><Button>Default · 36px</Button><Button size="lg">Large · 40px</Button></div> };
export const ToolbarRhythm: Story = { render: () => <div className="ds-row"><Button variant="outline">Filter</Button><Button variant="outline">Status</Button><Button>Add New</Button></div>, parameters: { docs: { description: { story: 'Page-level toolbars use the 36px default height. The 32px size is reserved for compact actions inside dense containers.' } } } };
export const CompactContainer: Story = { render: () => <div className="ds-card ds-between" style={{ padding: 'var(--ds-space-2)' }}><span className="ds-label">Marketplace provider</span><Button size="sm" variant="outline">Create</Button></div>, parameters: { docs: { description: { story: 'Inside a dense bordered container, the compact 32px action is intentional.' } } } };
export const WithIcon: Story = { args: { children: <><Plus aria-hidden="true" />Create project</> } };
export const IconOnly: Story = { args: { size: 'icon', 'aria-label': 'Create project', children: <Plus aria-hidden="true" /> } };
export const Loading: Story = { args: { loading: true, children: 'Creating project' } };
export const Disabled: Story = { args: { disabled: true } };
export const AsLink: Story = { args: { asChild: true, children: <a href="#example">Open example section</a> } };
