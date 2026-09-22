import type { Meta, StoryObj } from '@storybook/react-vite';
import { Boxes, EyeOff, GitFork, LaptopMinimal, SlidersHorizontal } from 'lucide-react';
import { componentDocs } from '@/lib/component-docs';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const meta = {
  title: 'Components/Dropdown Menu',
  component: DropdownMenu,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: componentDocs('Dropdown Menu') } } },
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild><Button variant="outline">Project actions</Button></DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Example project</DropdownMenuLabel>
        <DropdownMenuItem>View details</DropdownMenuItem>
        <DropdownMenuItem disabled>Transfer unavailable</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem destructive>Delete example</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const SectionedFilter: Story = {
  render: () => (
    <DropdownMenu defaultOpen>
      <DropdownMenuTrigger asChild>
        <Button variant="outline"><SlidersHorizontal aria-hidden="true" />Filters</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent style={{ width: 288 }}>
        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
        <DropdownMenuItem><LaptopMinimal aria-hidden="true" />Repository</DropdownMenuItem>
        <DropdownMenuItem><Boxes aria-hidden="true" />Microfrontend</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Sort by</DropdownMenuLabel>
        <DropdownMenuRadioGroup defaultValue="activity">
          <DropdownMenuRadioItem value="activity">Activity</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="name">Name</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Preferences</DropdownMenuLabel>
        <DropdownMenuCheckboxItem defaultChecked={false}><EyeOff aria-hidden="true" />Hide v0 projects</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem defaultChecked={false}><GitFork aria-hidden="true" />Show only v0 projects</DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
