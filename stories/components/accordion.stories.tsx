import type { Meta, StoryObj } from '@storybook/react-vite';
import { componentDocs } from '@/lib/component-docs';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
const meta = { title: 'Components/Accordion', component: Accordion, tags: ['autodocs'], args: { type: 'single' }, parameters: { docs: { description: { component: componentDocs('Accordion') } } },  } satisfies Meta<typeof Accordion>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: () => <Accordion type="single" collapsible><AccordionItem value="details"><AccordionTrigger>Deployment settings</AccordionTrigger><AccordionContent>Prefer the existing tokens, blocks and layouts before creating something new.</AccordionContent></AccordionItem><AccordionItem value="accessibility"><AccordionTrigger>Accessibility</AccordionTrigger><AccordionContent>Keep focus visible and honor reduced motion.</AccordionContent></AccordionItem></Accordion> };
