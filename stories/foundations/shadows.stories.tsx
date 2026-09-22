import type { Meta, StoryObj } from '@storybook/react-vite';
function Shadows() { return <div className="ds-doc ds-doc-grid">{['sm','popover','dialog'].map((level) => <div className="ds-card ds-doc-card" style={{ boxShadow: `var(--ds-shadow-${level})` }} key={level}><h2 className="ds-label">{level}</h2><p className="ds-muted">Use only at the corresponding surface elevation.</p></div>)}</div>; }
const meta = { title: 'Foundations/Shadows', component: Shadows, tags: ['autodocs'] } satisfies Meta<typeof Shadows>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Levels: Story = {};
