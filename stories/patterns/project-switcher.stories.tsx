import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { ProjectSwitcher } from '@/blocks/project-switcher';

const meta = {
  title: 'Patterns/Project Switcher',
  component: ProjectSwitcher,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ width: 560, minHeight: 320, padding: 24, background: 'var(--ds-background)' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    project: 'aa-skills-sync',
    triggerLabel: 'All Projects',
    onSelectProject: fn(),
    onCreateProject: fn(),
  },
} satisfies Meta<typeof ProjectSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
