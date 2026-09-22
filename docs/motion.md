# Motion

Controles usam 150 ms / ease-in-out. A navegação contextual e painéis usam 200 ms / ease. Esses intervalos são observáveis no HTML fornecido; o percurso exato de todas as animações da Vercel não está presente no material.

Esta implementação anima menus por uma pequena translação com fade, o submenu contextual por deslocamento de 8 px com fade, sheets a partir da borda e accordions pela altura informada pelo primitive. As curvas e trajetórias são decisões locais até validação comparativa.

Skeletons usam 1500 ms como valor provisório. Spinner de loading é contínuo apenas enquanto a operação está ocupada. `prefers-reduced-motion: reduce` reduz transições e animações a uma atualização praticamente imediata.

Não use `transition: all`. Não anime a página inteira ao trocar um campo. Preserve hitboxes, foco e estabilidade do layout. Animações não podem impedir Escape ou atrasar uma ação necessária.
