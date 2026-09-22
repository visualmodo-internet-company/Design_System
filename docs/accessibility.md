# Accessibility

Semântica e foco vêm antes da fidelidade a uma captura. Primitives interativos usam Radix, sem reimplementar focus trap com divs. Button, links e campos mantêm semântica nativa. Menu, Select, Tabs, Accordion e Dialog preservam suas relações ARIA.

## Required checks

Todo controle icon-only tem aria-label. Todo input possui Label associado. Cada página tem h1 e um único main. `Skip to content` fica visível ao receber foco. O resizer tem role separator, orientação vertical, intervalo anunciado e operação por teclado.

Dialog e Sheet possuem Title e Description, Escape para fechar e retorno ao trigger. ConfirmationDialog destrutivo começa pela ação segura Cancel. Não use aria-hidden sobre um elemento focável ou esconda uma região que contém o foco.

EmptyState explica a ausência de dados e uma próxima ação. ErrorState explica a falha e expõe retry. LoadingState mantém um anúncio fora da região busy; Skeleton é decorativo. Cor acompanha texto em status/badges.

## Contrast and motion

Bordas de controles são mais contrastantes que divisórias de cards. Consulte os pares reais renderizados e verifique WCAG AA quando aplicável. Honre reduced motion e mantenha alvos de toque de 44 px.

O addon a11y é configurado no Storybook; testes Playwright incluem axe. Esses testes ainda precisam rodar no runtime React desta entrega, pois a instalação npm foi bloqueada. Não há declaração de conformidade WCAG ou de auditoria completa de leitor de tela.
