# Responsive Rules

O shell passa de sidebar fixa para Sheet em 960 px ou menos. Acima de 960 px, o conteúdo desconta a largura da sidebar. Nunca use zoom CSS para tentar imitar uma captura redimensionada.

Abaixo de 1280 px, os três cards passam a duas colunas, com o terceiro ocupando a linha seguinte. Abaixo de 640 px, o conteúdo passa a uma coluna; o preview do deployment se empilha sobre os metadados, ações quebram a linha e metadados secundários da branch são reduzidos.

Gutter de página: 32 px em desktop, 16 px em mobile. Inputs em dispositivos de toque usam 16 px; controles de toque ganham área de 44 px. Textos longos devem quebrar nos metadados ou truncar nos seletores sem alargar a página.

## Validation viewports

390×844, 768×1024, 960×900, 961×900, 1440×1000 e 2048×1100. Teste também menu mobile aberto, dialog, busca sem resultados, conteúdo longo, claro/escuro e reduced motion. O Storybook permite trocar viewport; os testes Playwright cobrem o app quando as dependências estão instaladas.
