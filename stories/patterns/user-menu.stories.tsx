import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { SidebarUserMenu } from '@/blocks/user-menu';

const meta = {
  title: 'Patterns/User Menu',
  component: SidebarUserMenu,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ width: 256, minHeight: 560, display: 'flex', alignItems: 'flex-end', padding: 8, background: 'var(--ds-background)' }}>
        <div style={{ width: '100%' }}><Story /></div>
      </div>
    ),
  ],
  args: {
    userName: 'Jamie Doe',
    userEmail: 'user@example.com',
    initials: 'JD',
    onOpenSettings: fn(),
    onAction: fn(),
  },
} satisfies Meta<typeof SidebarUserMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
