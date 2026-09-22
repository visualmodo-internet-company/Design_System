# AI Guidelines

## Introduction

Este Design System é uma referência central compartilhada. Sua aparência segue a direção das capturas do dashboard da Vercel, mas os componentes, nomes, dados e integrações pertencem aos projetos consumidores. O escopo universal é **vários projetos React web**, não uma promessa de compatibilidade automática com todos os frameworks ou aplicativos nativos.

O fluxo visual é: **tokens → componentes → blocos → layouts → páginas**. A documentação textual é a fonte canônica; o Storybook importa estes mesmos arquivos Markdown.

## General Rules

Antes de criar qualquer componente, consulte `docs/component-manifest.json` e o arquivo apontado. Não refaça Button, Input, Card, Dialog, Sheet ou Table. Prefira compor as APIs existentes. Crie uma abstração nova apenas quando há um padrão real, reutilizável e não resolvido por composição.

Não instale bibliotecas de UI concorrentes. Não misture famílias de ícones. Não gere endpoints, autenticação, banco de dados, analytics real ou integrações externas para demonstrar aparência.

## Component Selection

Use Button para uma ação; para navegação use `Button asChild` contendo um link com `href` válido. Use Dropdown Menu para ações e Select para campos de escolha. Use Checkbox para múltiplas opções, Radio Group para uma opção entre poucas, Switch para preferência aplicada imediatamente. Use Card para agrupamento, não como substituto de um botão.

Use Dialog para tarefa focal e Sheet para detalhe lateral ou navegação mobile. Preserve os primitives Radix, Title, Description, foco, Escape e retorno ao trigger. Tooltip complementa informação, nunca fornece o único rótulo de um controle.

Os blocos EmptyState, LoadingState, ErrorState, SearchBar, PageHeader e ConfirmationDialog já existem. Os primitives têm documentação específica no manifesto. Não acrescente variantes sem necessidade demonstrada.

## Layout Rules

Use ApplicationShell com navegação fornecida por props. A identidade do workspace, o projeto, o usuário e os handlers são parâmetros, não dependências de um produto. A página deve ocupar a área de conteúdo do shell; não aninhe outro `main`, outro header global ou uma segunda sidebar desktop.

A sidebar desktop começa em 256 px, com intervalo de 240–400 px; o header tem 56 px e os itens de navegação, 36 px. A breakpoint do shell é 961 CSS px. O conteúdo usa largura máxima e gutters por tokens. Consulte a auditoria antes de tratar medidas estimadas como exatas.

Os exemplos possuem destinos ainda não implementados que anunciam claramente a etapa futura. Em um produto real, forneça rotas efetivas e handlers da aplicação. Não transporte mensagens de demonstração para produção.

## Styling Rules

Mude a identidade global em `src/styles/tokens.css`. Use `bg-background`, `text-foreground`, `bg-card`, `border-border` e outras classes semânticas ou os estilos do componente. Use `cn()` para composição. CSS estruturante reside em `system.css` na layer de componentes, permitindo utilitários Tailwind na layer superior.

Hex, RGB e HSL literais ficam apenas no arquivo de tokens e na configuração de tema do manager Storybook. Estilos inline podem representar dados (percentuais e redimensionamento), valores de tokens ou grid estrutural; não devem inventar uma identidade paralela. `tokens.json` é gerado a partir do CSS.

Use Geist no texto e Geist Mono em identificadores/código. Não importe fontes do computador de alguém para o repositório. As dependências declaradas cuidam da instalação. Não use grandes títulos de marketing em regiões compactas do dashboard.

## Responsive Rules

Verifique no mínimo 390, 768, 1440 e 2048 CSS px, além do limite 960/961. Conteúdo muito longo deve truncar onde apropriado ou quebrar sem extravasar o viewport. Cards passam para uma coluna em telas estreitas; tabelas podem rolar na própria região, nunca alargar a página inteira.

Em mobile, a sidebar é um Sheet modal com semântica e foco preservados. Não apenas esconda o menu sem uma alternativa. Controles em telas de toque ganham área mínima de 44 px, mesmo que isso produza uma diferença intencional em relação à densidade desktop.

## Accessibility Rules

Mantenha um h1 por página e ordem lógica de títulos. Todo campo precisa de rótulo associado. Erros devem explicar como corrigir, usar aria-invalid e aria-describedby. Estados de status também precisam de texto.

LoadingState possui um único anúncio e aria-busy na região. Skeletons são decorativos. Não anuncie continuamente animações. Desabilite animações decorativas com prefers-reduced-motion. Não dependa de hover em dispositivos de toque. Nunca suprima o foco sem um substituto visível.

Acessibilidade automática é parte da validação, não certificação completa. Teste também teclado, zoom e leitura da interface. Inputs usam bordas mais contrastantes que divisórias decorativas; isso é uma decisão intencional documentada.

## Workflow for a New Page

1. Entenda a tarefa, os dados, as ações e todos os estados necessários.
2. Liste os componentes existentes no manifesto e os blocos correspondentes.
3. Selecione ApplicationShell e o padrão de conteúdo adequado.
4. Componha a página com dados fictícios neutros quando for um exemplo.
5. Crie componente novo somente quando a composição existente não atender.
6. Confira tokens, tipografia, densidade, estados de foco e animações.
7. Crie stories para a composição e seus estados relevantes.
8. Valide responsividade, teclado, foco, contraste e reduced motion.
9. Execute typecheck, lint, testes, build Vite, build Storybook e testes de navegador.
10. Compare com a referência e registre diferenças; não invente resultados.
11. Atualize manifesto, documentação, versão e notas de migração.

## Do and Do Not

**Faça:** importe Button; use tokens; use Dialog/Sheet com título e descrição; indique estados vazios e de erro; passe o conteúdo pelo shell existente.

**Não faça:** copie classes de uma captura sem abstração; crie um modal com div fixa; troque o fundo por um hexadecimal isolado; use ícones de outra biblioteca; acrescente Account e outras páginas antes de aprovar a fundação; chame uma prévia estática de build React validado.

## Versioning Across Projects

Consumidores devem fixar uma release ou commit e registrar a versão adotada. Componentes copiados por registry não recebem updates automaticamente. Revise diferenças antes de atualizar, conserve customizações de domínio fora dos primitives e documente migrações quando a API ou um token mudar.

## Theme isolation in Storybook

The toolbar is authoritative for the preview theme. Docs render stories in isolated iframes to avoid shared document theme and fixed-sidebar collisions. In a consuming app, mount ThemeProvider once at the application boundary.
