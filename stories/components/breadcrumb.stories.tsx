import type { Meta, StoryObj } from '@storybook/react-vite';
import { componentDocs } from '@/lib/component-docs';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
const meta = { title: 'Components/Breadcrumb', component: Breadcrumb, tags: ['autodocs'], parameters: { docs: { description: { component: componentDocs('Breadcrumb') } } },  } satisfies Meta<typeof Breadcrumb>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => <Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="#workspace">Workspace</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbLink href="#project">Project</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>Overview</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb> };
