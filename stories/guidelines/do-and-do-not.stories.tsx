import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
function DoAndDoNot() { return <div className="ds-doc ds-doc-grid"><Card><CardHeader><CardTitle>Do · reuse the primitive</CardTitle></CardHeader><CardContent className="ds-stack"><Button>Save changes</Button><code className="ds-mono">{'<Button>Save changes</Button>'}</code><p className="ds-muted">Focus, size and colors follow the system.</p></CardContent></Card><Card><CardHeader><CardTitle>Do not · invent styling</CardTitle></CardHeader><CardContent className="ds-stack"><pre className="ds-code">{'<button style={{ background: "custom color" }}>Save</button>'}</pre><p className="ds-muted">An anti-pattern shown as text, not a competing interactive implementation. Do not recreate a primitive with arbitrary values.</p></CardContent></Card></div>; }
const meta = { title: 'AI Guidelines/Do and Do Not', component: DoAndDoNot, tags: ['autodocs'] } satisfies Meta<typeof DoAndDoNot>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Comparison: Story = {};
