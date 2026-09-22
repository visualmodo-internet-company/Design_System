import type { Meta, StoryObj } from '@storybook/react-vite';
import { componentDocs } from '@/lib/component-docs';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
const meta = { title: 'Components/Card', component: Card, tags: ['autodocs'], parameters: { docs: { description: { component: componentDocs('Card') } } },  } satisfies Meta<typeof Card>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: () => <Card className="ds-example-field"><CardHeader><CardTitle>Project preferences</CardTitle></CardHeader><CardContent><p className="ds-muted">Compose small sections rather than creating a page-sized component.</p></CardContent><CardFooter><Button variant="outline">Manage preferences</Button></CardFooter></Card> };
