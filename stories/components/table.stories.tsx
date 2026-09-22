import type { Meta, StoryObj } from '@storybook/react-vite';
import { componentDocs } from '@/lib/component-docs';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from '@/components/ui/table';
const meta = { title: 'Components/Table', component: Table, tags: ['autodocs'], parameters: { docs: { description: { component: componentDocs('Table') } } },  } satisfies Meta<typeof Table>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { render: () => <Table><TableCaption>Example deployment states.</TableCaption><TableHeader><TableRow><TableHead>Project</TableHead><TableHead>Status</TableHead><TableHead>Branch</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell>example-project</TableCell><TableCell>Ready</TableCell><TableCell>main</TableCell></TableRow><TableRow><TableCell>second-project</TableCell><TableCell>Draft</TableCell><TableCell>preview</TableCell></TableRow></TableBody></Table> };
