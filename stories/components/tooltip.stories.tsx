import type { Meta, StoryObj } from '@storybook/react-vite';
import { componentDocs } from '@/lib/component-docs';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
const meta = { title: 'Components/Tooltip', component: Tooltip, tags: ['autodocs'], parameters: { docs: { description: { component: componentDocs('Tooltip') } } },  } satisfies Meta<typeof Tooltip>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => <Tooltip><TooltipTrigger asChild><Button variant="outline" size="icon" aria-label="About usage"><Info aria-hidden="true" /></Button></TooltipTrigger><TooltipContent>Usage updates as requests arrive.</TooltipContent></Tooltip> };
