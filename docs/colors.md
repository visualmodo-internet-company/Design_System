# Colors

`src/styles/tokens.css` é a fonte dos valores. `src/styles/globals.css` publica aliases Tailwind semânticos. Os exemplos de Colors no Storybook mostram as superfícies reais dos dois temas.

## Semantics

`background` é o canvas; `card` é uma superfície agrupada; `popover` é a superfície de menu/dialog. `foreground` é texto principal, `muted-foreground` é texto secundário. `primary` e `primary-foreground` formam o par do botão principal. `secondary` e `accent` representam elevação sutil, hover e seleção, não uma cor de marca independente.

`border` e `border-subtle` são divisórias. `input-border` é intencionalmente mais contrastante, por se tratar de um controle. `ring` é o foco visível. `link`, `info`, `success`, `warning` e `destructive` são estados semânticos, não a paleta arbitrária de uma página.

## Dark baseline

Canvas `#000000`, cards `#0a0a0a`, hover `#181818`, ativo `#1f1f1f`, texto `#ededed`. Os quatro primeiros foram observados nas capturas; a tradução completa em tokens é uma implementação própria. Demais valores e tema claro precisam de aprovação visual; não são uma exportação oficial do Geist.

## Usage

```tsx
<Card className="bg-card text-foreground">
  <p className="text-muted-foreground">Example metadata</p>
  <Button>Save changes</Button>
</Card>
```

Não coloque valores hexadecimais dentro de JSX. Não use `text-gray-500` para substituir uma decisão semântica. Um token deve continuar a fazer sentido no tema claro e no escuro. Teste contraste dos pares efetivamente utilizados, não de cores isoladas.
