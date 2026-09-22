# Layouts

## Application Shell

É o contrato principal dos projetos com dashboard. Aceita navigation (grupos de itens), activeId, onNavigate, title, workspace, project, userName, onAction e storageKey. O conteúdo é passado por children. Não depende de React Router ou de Next.js; uma aplicação pode integrar seu router por callbacks e URLs nos itens.

Sidebar fixa desktop, header sticky e uma única área `main`. Header usa três colunas com título centralizado e contexto de projeto à esquerda. Rodapé de usuário permanece no fim da sidebar, enquanto o menu rola de maneira independente.

A largura começa em 256 px; o resizer permite 240–400 px por ponteiro ou setas, Home e End. A sidebar pode recolher. Preferências usam um storageKey próprio e falham de maneira segura quando storage não está disponível. Uma aplicação deve definir seu namespace.


### Team switcher

O seletor de team no topo da sidebar segue um contrato visual específico. O nome, avatar e badge ficam em uma área neutra, sem background de hover. Apenas o botão de chevrons à direita recebe o estado de hover, focus e open.

O painel abre alinhado à esquerda da sidebar com 384 px no desktop. Ele contém, nesta ordem, busca de teams com atalho Esc, team ativo com check, área informativa central e ação Create Team separada por borda. O componente fica em `src/blocks/team-switcher.tsx` e deve ser reutilizado, não recriado dentro de páginas.

A ação do nome do team é separada do botão que abre o seletor, reproduzindo o comportamento de contexto da referência. Consumers podem mapear `onOpenTeam`, `onSelectTeam` e `onCreateTeam` para router ou ações reais sem alterar a composição visual.


### Sidebar search

O botão Find da sidebar abre um painel de busca no mesmo eixo visual do seletor de team. O painel começa sobre a posição do próprio controle de busca, tem largura desktop de 440 px, cabeçalho de 56 px com ícone, input e Esc, e lista de resultados com linhas de 54 px.

O componente canônico fica em `src/blocks/sidebar-search.tsx`. Ele inclui resultados de team, project, navegação e um Navigation Assistant demonstrativo. Busca, Arrow Up, Arrow Down, Enter e Escape funcionam sem mouse. Consumers devem conectar callbacks reais sem recriar o painel.

## Content Layout

Composição de PageHeader e children, para ser usada dentro do shell. Não gera outra sidebar, outro header global nem outro `main`. Pode receber ações junto do título.

## Overview

É a primeira página de exemplo: DeploymentCard, checklist, métricas ilustrativas, empty state de analytics, toolbar e branch. Seus dados ficam em `src/fixtures/overview.json`, nunca no primitive. Network demonstra submenu contextual e os estados vazio/carregamento.

## Next layouts

Account/Settings, Authentication, List, Details e Form serão adicionados depois da aprovação visual desta fundação. Não são entregues como páginas completas nesta etapa.

`workspacePlan` is optional: a consumer decides whether a plan badge is relevant. User avatar initials derive from `userName`; neither an account identity nor a subscription tier is hardcoded into the reusable Sidebar. The example fixture supplies its own name and Hobby label.
