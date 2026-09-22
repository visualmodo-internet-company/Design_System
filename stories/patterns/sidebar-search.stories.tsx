import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { SidebarSearch } from '@/blocks/sidebar-search';
import { demoNavigation } from '@/fixtures/navigation';

function Demo(args: Omit<React.ComponentProps<typeof SidebarSearch>, 'open' | 'onOpenChange'>) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ width: 256, minHeight: 520, padding: 8, background: 'var(--ds-background)' }}>
      <SidebarSearch {...args} open={open} onOpenChange={setOpen} />
    </div>
  );
}

const meta = {
  title: 'Patterns/Sidebar Search',
  component: SidebarSearch,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  render: (args) => (
    <Demo
      groups={args.groups}
      team={args.team}
      project={args.project}
      onNavigate={args.onNavigate}
      onAction={args.onAction}
    />
  ),
  args: {
    groups: demoNavigation,
    team: 'Visualmodo',
    project: 'example-project',
    open: true,
    onOpenChange: fn(),
    onNavigate: fn(),
    onAction: fn(),
  },
} satisfies Meta<typeof SidebarSearch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
