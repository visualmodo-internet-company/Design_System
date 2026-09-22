import type { Meta, StoryObj } from '@storybook/react-vite';
import { componentDocs } from '@/lib/component-docs';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext } from '@/components/ui/pagination';
const meta = { title: 'Components/Pagination', component: Pagination, tags: ['autodocs'], parameters: { docs: { description: { component: componentDocs('Pagination') } } },  } satisfies Meta<typeof Pagination>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => <Pagination><PaginationContent><PaginationItem><PaginationLink href="#page-1" isActive>1</PaginationLink></PaginationItem><PaginationItem><PaginationLink href="#page-2">2</PaginationLink></PaginationItem><PaginationItem><PaginationNext href="#page-2" /></PaginationItem></PaginationContent></Pagination> };
