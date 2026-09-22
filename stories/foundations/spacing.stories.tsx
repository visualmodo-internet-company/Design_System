import type { Meta, StoryObj } from '@storybook/react-vite';
function Spacing() { return <div className="ds-doc ds-stack-lg"><h1 className="ds-heading-1">Spacing</h1>{[1,2,3,4,5,6,8,10,12,16].map((step) => <div className="ds-row" key={step}><code className="ds-mono">space-{step} · {step * 4}px</code><div className="ds-space-sample" style={{ width: `var(--ds-space-${step})` }} /></div>)}</div>; }
const meta = { title: 'Foundations/Spacing', component: Spacing, tags: ['autodocs'] } satisfies Meta<typeof Spacing>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Scale: Story = {};
