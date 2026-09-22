import type { Meta, StoryObj } from '@storybook/react-vite';
import { componentDocs } from '@/lib/component-docs';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
const meta = { title: 'Components/Sheet', component: Sheet, tags: ['autodocs'], parameters: { docs: { description: { component: componentDocs('Sheet') } } },  } satisfies Meta<typeof Sheet>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: () => <Sheet><SheetTrigger asChild><Button variant="outline">Open panel</Button></SheetTrigger><SheetContent><SheetHeader><SheetTitle>Project details</SheetTitle><SheetDescription>Reusable side panel; Escape closes it and returns focus.</SheetDescription></SheetHeader><p className="ds-muted">Compose this surface with existing components.</p></SheetContent></Sheet> };
