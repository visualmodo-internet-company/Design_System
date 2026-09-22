import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { TeamSwitcher } from '@/blocks/team-switcher';

const meta = {
  title: 'Patterns/Team Switcher',
  component: TeamSwitcher,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ width: 256, padding: 8, minHeight: 520, background: 'var(--ds-background)' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    team: 'Visualmodo',
    plan: 'Hobby',
    onOpenTeam: fn(),
    onSelectTeam: fn(),
    onCreateTeam: fn(),
  },
} satisfies Meta<typeof TeamSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
