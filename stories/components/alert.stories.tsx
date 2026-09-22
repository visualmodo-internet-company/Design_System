import type { Meta, StoryObj } from '@storybook/react-vite';
import { componentDocs } from '@/lib/component-docs';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
const meta = { title: 'Components/Alert', component: Alert, tags: ['autodocs'], parameters: { docs: { description: { component: componentDocs('Alert') } } },  } satisfies Meta<typeof Alert>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: (args) => <Alert {...args}><AlertTitle>Changes saved</AlertTitle><AlertDescription>Your example settings are up to date.</AlertDescription></Alert> };
export const Destructive: Story = { render: () => <Alert variant="destructive"><AlertTitle>Could not save</AlertTitle><AlertDescription>Check the connection and try again.</AlertDescription></Alert> };
