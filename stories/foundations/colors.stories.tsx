import type { Meta, StoryObj } from '@storybook/react-vite';
const colorNames = ['background','foreground','card','popover','muted','muted-foreground','hover','active','border','border-subtle','border-strong','input','input-border','ring','primary','primary-foreground','secondary','secondary-foreground','accent','accent-foreground','link','info','info-subtle','success','success-subtle','warning','warning-subtle','destructive','destructive-subtle'];
function ColorTokens() { return <div className="ds-doc"><h1 className="ds-heading-1">Colors</h1><p className="ds-muted">Semantic roles, not one-off colors. Use the theme toolbar to inspect both palettes.</p><div className="ds-doc-grid">{colorNames.map((name) => <div key={name} className="ds-card ds-doc-card ds-stack"><div className="ds-swatch" style={{ background: `var(--ds-${name})` }} /><h2 className="ds-label">{name}</h2><code className="ds-mono ds-muted">--ds-{name}</code></div>)}</div></div>; }
const meta = { title: 'Foundations/Colors', component: ColorTokens, tags: ['autodocs'] } satisfies Meta<typeof ColorTokens>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Tokens: Story = {};
