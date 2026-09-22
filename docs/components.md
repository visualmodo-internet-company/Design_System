# Components

O catálogo implementado está em `component-manifest.json`. Cada registro informa o arquivo, export principal, story, uso, contraindicação e regra de acessibilidade. As stories consomem esse manifesto via `componentDocs()`; não há uma segunda versão das regras.

O conjunto inicial inclui Button, Input, Textarea, Label, Checkbox, Radio Group, Switch, Select, Card, Badge, Alert, Avatar, Separator, Tabs, Accordion, Tooltip, Dropdown Menu, Dialog, Sheet, Table, Skeleton, Progress, Breadcrumb, Pagination e Toast.

## API conventions

Use props nativas e APIs de composição próximas ao shadcn/Radix. `className` passa por `cn`. `Button` aceita default, secondary, outline, ghost, destructive e link; tamanhos sm, default, lg, icon e icon-sm. Loading mantém o texto e desabilita a ação. `asChild` delega semântica a um único filho.

Dialog e Sheet exigem título e descrição. Campos exigem id/Label. Primitives que suportam estado controlado aceitam value/checked/open e handlers; os consumidores devem ser responsáveis por persistência e validação de domínio.

## Additions

Antes de adicionar, verifique se o componente existe. Para inspecionar um novo componente shadcn, use a CLI numa branch e revise a saída. Não execute overwrite global: o CSS, os tokens e os comportamentos aqui foram adaptados. Acrescente a story, o registro no manifesto e testes relevantes no mesmo commit.

A presença de source e story não equivale a runtime validado. Consulte validation.md para o estado desta entrega.
