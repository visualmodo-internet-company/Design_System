# Typography

Geist Variable é a fonte da interface; Geist Mono Variable é reservada para código, hashes e identificadores. Ambas são declaradas como dependências npm e importadas no stylesheet. Sem essas dependências, há fallback de sistema: a prévia HTML offline não comprova a renderização final de Geist.

## Scale

- H1: 32/40 px, peso 600, tracking -0.04em, título principal de página.
- H2: 24/32 px, peso 600, tracking -0.04em, grandes seções.
- H3: 20/28 px, peso 600, título de seção ou dialog.
- H4 / Body Large: 16/24 px, peso 600 para título; 400 para texto.
- Body: 14/24 px, peso 400, texto principal do dashboard.
- Label: 14/20 px, peso 500, controles e metadados importantes.
- Body Small: 13/20 px, peso 400, metadados secundários.
- Caption: 12/16 px, peso 400, auxílio curto e badges.
- Code: 13/20 px, Geist Mono, identificadores e trechos de código.

Esses valores pertencem à escala desta implementação. O HTML fornecido confirma texto de 14 px e classes de labels; ele não contém os estilos computados de todas as variantes. A escala pública do Geist foi consultada para os contextos de uso.

Não aumente títulos do dashboard para escala de marketing. Não remova rótulos para ganhar espaço. Trunque apenas valores que podem ser consultados por outra interação, ou permita quebra em conteúdo importante.
