import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchBar } from '@/blocks/search-bar';
const meta = { title: 'Patterns/Search', component: SearchBar, tags: ['autodocs'], args: { label: 'Search projects', placeholder: 'Search projects…' } } satisfies Meta<typeof SearchBar>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
