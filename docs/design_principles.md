# Design Principles

## Dense, not cramped

O dashboard tem navegação compacta, controles contidos e conteúdo principal respirando dentro de uma largura máxima. A densidade vem da escala e da hierarquia, não de diminuir todos os elementos por zoom.

## Neutral first

Preto/branco e cinzas organizam a interface. Azul indica links, foco e informação. Verde/teal, âmbar e vermelho representam estados, sempre acompanhados de texto. Não crie um card colorido só para destacar uma ação comum.

## Quiet surfaces

Bordas finas e contraste entre superfícies estabelecem grupos. Evite sombras grandes em cards; reserve elevação para menus, dialogs e sheets. Use radius 6–8 px na maior parte do dashboard.

## Composition before invention

Primitivos têm uma API pequena. Blocos combinam primitives. Layouts organizam blocos. Páginas demonstram composição e não criam um novo estilo visual. A marca da aplicação é um parâmetro do shell.

## Motion communicates state

Movimentos curtos mostram abertura, foco e contexto. Nada deve saltar, flutuar ou pulsar para decorar. `prefers-reduced-motion` sempre prevalece.

## Truthful states

Dados de demonstração são fictícios e identificados como tais. Loading, vazio, erro e sucesso não são intercambiáveis. Nenhum botão deve fingir que criou infraestrutura ou salvou dados em um backend inexistente.
