import type { Meta, StoryObj } from '@storybook/react-vite';
function Radius() { return <div className="ds-doc ds-doc-grid">{['sm','md','lg','xl','full'].map((size) => <div className="ds-card ds-doc-card" style={{ borderRadius: `var(--ds-radius-${size})` }} key={size}><h2 className="ds-label">Radius {size}</h2><code className="ds-mono">--ds-radius-{size}</code></div>)}</div>; }
const meta = { title: 'Foundations/Border Radius', component: Radius, tags: ['autodocs'] } satisfies Meta<typeof Radius>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Scale: Story = {};
