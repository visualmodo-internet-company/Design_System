# Spacing, Radius and Elevation

## Spacing

Escala de 4 px: 4, 8, 12, 16, 20, 24, 32, 40, 48 e 64. Use 4–8 px entre ícone e rótulo, 12–16 px dentro de blocos compactos, 24 px entre grupos e 32–64 px para regiões maiores. Cada valor tem uma variável `--ds-space-*` equivalente à escala usual do Tailwind.

## Control heights

A escala de controles tem três níveis. `--ds-control-sm: 32px` é compacta e deve aparecer apenas dentro de containers densos. `--ds-control-md: 36px` é a altura padrão de forms, toolbars, search, selects e ações principais de página. `--ds-control-lg: 40px` é excepcional e não deve substituir o padrão de 36 px.

Quando input e botão compartilham uma linha, todos os controles dessa linha usam 36 px. Exemplos: Search + Status, Search + filtros, Connect Git + Instant rollback + Visit, Search Projects + filtros + Add New. Dentro de uma linha já delimitada por card ou provider, a ação pode cair para 32 px.

## Radius

Small = 4 px, para indicadores e skeletons. Medium = 6 px, para controles e itens de navegação. Large = 8 px, para cards. Extra Large = 12 px, para menus e dialogs. Full = 9999 px, para badges e avatares. Não use pill em todo botão.

## Elevation

Cards se distinguem por superfície e borda, não por sombra. `shadow-sm` é discreto; `shadow-popover` pertence a menus; `shadow-dialog` a sobreposições modais. Valores exatos vivem em tokens.css. Não invente uma quarta elevação em uma página.

## Widths

A largura da página não deve ser 100vw: use a área restante após a sidebar, com max-width e gutter. Formulários e texto longo têm limites próprios (`--ds-form-width`, `--ds-reading-width`). O max-width de página inicial é 1600 px e está marcado como provisório na auditoria de referência.
