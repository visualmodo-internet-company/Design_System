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
export const Sizes: Story = { render: () => <div className="ds-row"><Button size="sm">Small</Button><Button>Default</Button><Button size="lg">Large</Button></div> };
export const WithIcon: Story = { args: { children: <><Plus aria-hidden="true" />Create project</> } };
export const IconOnly: Story = { args: { size: 'icon', 'aria-label': 'Create project', children: <Plus aria-hidden="true" /> } };
export const Loading: Story = { args: { loading: true, children: 'Creating project' } };
export const Disabled: Story = { args: { disabled: true } };
export const AsLink: Story = { args: { asChild: true, children: <a href="#example">Open example section</a> } };
