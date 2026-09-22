import type { Meta, StoryObj } from '@storybook/react-vite';
import { componentDocs } from '@/lib/component-docs';
import { Separator } from '@/components/ui/separator';
const meta = { title: 'Components/Separator', component: Separator, tags: ['autodocs'], parameters: { docs: { description: { component: componentDocs('Separator') } } },  } satisfies Meta<typeof Separator>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => <div className="ds-stack ds-example-field"><p>Project</p><Separator /><p>Workspace</p></div> };
