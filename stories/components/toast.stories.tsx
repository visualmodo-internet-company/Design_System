import type { Meta, StoryObj } from '@storybook/react-vite';
import { componentDocs } from '@/lib/component-docs';
import { useState } from 'react';
import { ToastProvider, Toast, ToastTitle, ToastDescription, ToastViewport } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';
function ToastExample() { const [open, setOpen] = useState(false); return <ToastProvider><Button onClick={() => setOpen(true)}>Show notification</Button><Toast open={open} onOpenChange={setOpen}><ToastTitle>Changes saved</ToastTitle><ToastDescription>Your example preference was updated.</ToastDescription></Toast><ToastViewport /></ToastProvider>; }
const meta = { title: 'Components/Toast', component: Toast, tags: ['autodocs'], parameters: { docs: { description: { component: componentDocs('Toast') } } },  } satisfies Meta<typeof Toast>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => <ToastExample /> };
