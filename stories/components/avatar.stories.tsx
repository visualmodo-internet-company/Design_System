import type { Meta, StoryObj } from '@storybook/react-vite';
import { componentDocs } from '@/lib/component-docs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
const meta = { title: 'Components/Avatar', component: Avatar, tags: ['autodocs'], parameters: { docs: { description: { component: componentDocs('Avatar') } } },  } satisfies Meta<typeof Avatar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: () => <div className="ds-row"><Avatar><AvatarFallback aria-hidden="true">JD</AvatarFallback></Avatar><span>Jamie Doe</span></div> };
export const Small: Story = { render: () => <div className="ds-row"><Avatar className="ds-avatar--small"><AvatarFallback aria-hidden="true">JD</AvatarFallback></Avatar><span>Jamie Doe</span></div> };
