import type { Meta, StoryObj } from '@storybook/react-vite';
import { componentDocs } from '@/lib/component-docs';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
const meta = { title: 'Components/Dropdown Menu', component: DropdownMenu, tags: ['autodocs'], parameters: { docs: { description: { component: componentDocs('Dropdown Menu') } } },  } satisfies Meta<typeof DropdownMenu>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => <DropdownMenu><DropdownMenuTrigger asChild><Button variant="outline">Project actions</Button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuLabel>Example project</DropdownMenuLabel><DropdownMenuItem>View details</DropdownMenuItem><DropdownMenuItem disabled>Transfer unavailable</DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem destructive>Delete example</DropdownMenuItem></DropdownMenuContent></DropdownMenu> };
