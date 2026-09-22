import type { Meta, StoryObj } from '@storybook/react-vite';
import { componentDocs } from '@/lib/component-docs';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { expect, userEvent, within } from 'storybook/test';
const meta = { title: 'Components/Dialog', component: Dialog, tags: ['autodocs'], parameters: { docs: { description: { component: componentDocs('Dialog') } } },  } satisfies Meta<typeof Dialog>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: () => <Dialog><DialogTrigger asChild><Button variant="outline">Open dialog</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Project preferences</DialogTitle><DialogDescription>A focused task with a title, description and a safe way to close.</DialogDescription></DialogHeader><DialogFooter><DialogClose asChild><Button>Done</Button></DialogClose></DialogFooter></DialogContent></Dialog>, play: async ({ canvasElement }) => { const button = within(canvasElement).getByRole('button', { name: 'Open dialog' }); await userEvent.click(button); await expect(within(canvasElement.ownerDocument.body).getByRole('dialog')).toBeVisible(); await userEvent.keyboard('{Escape}'); await expect(button).toHaveFocus(); } };
