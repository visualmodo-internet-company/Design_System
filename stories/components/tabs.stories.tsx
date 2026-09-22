import type { Meta, StoryObj } from '@storybook/react-vite';
import { componentDocs } from '@/lib/component-docs';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
const meta = { title: 'Components/Tabs', component: Tabs, tags: ['autodocs'], parameters: { docs: { description: { component: componentDocs('Tabs') } } },  } satisfies Meta<typeof Tabs>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: () => <Tabs defaultValue="rules"><TabsList aria-label="Routing examples"><TabsTrigger value="rules">Rules</TabsTrigger><TabsTrigger value="history">History</TabsTrigger><TabsTrigger value="disabled" disabled>Unavailable</TabsTrigger></TabsList><TabsContent value="rules">No routing rules yet.</TabsContent><TabsContent value="history">No changes have been recorded.</TabsContent></Tabs> };
