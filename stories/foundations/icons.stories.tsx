import type { Meta, StoryObj } from '@storybook/react-vite';
import { Plus, Search, Settings, Globe, GitBranch, Bell, Layers, Shield } from 'lucide-react';
function Icons() { return <div className="ds-doc"><h1 className="ds-heading-1">Icons</h1><p className="ds-muted">Lucide only. Default 16 px, decorative icons aria-hidden, icon-only controls labelled.</p><div className="ds-row ds-wrap">{[Plus,Search,Settings,Globe,GitBranch,Bell,Layers,Shield].map((Icon,index) => <span className="ds-empty-icon" key={index}><Icon aria-hidden="true" /></span>)}</div></div>; }
const meta = { title: 'Foundations/Icons', component: Icons, tags: ['autodocs'] } satisfies Meta<typeof Icons>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Library: Story = {};
