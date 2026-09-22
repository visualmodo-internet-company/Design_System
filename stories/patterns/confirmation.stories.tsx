import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ConfirmationDialog } from '@/blocks/confirmation-dialog';
import { Button } from '@/components/ui/button';
function ConfirmationExample() { const [open,setOpen] = useState(false); return <><Button variant="destructive" onClick={() => setOpen(true)}>Delete example</Button><ConfirmationDialog open={open} onOpenChange={setOpen} title="Delete the example?" description="This interaction is illustrative; no real record will be deleted." confirmLabel="Delete example" destructive onConfirm={() => setOpen(false)} /></>; }
const meta = { title: 'Patterns/Confirmation', component: ConfirmationExample, tags: ['autodocs'] } satisfies Meta<typeof ConfirmationExample>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Destructive: Story = {};
