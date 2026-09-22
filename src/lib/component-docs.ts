import manifest from '../../docs/component-manifest.json';
/** Stories and agents share this catalog; do not fork the prose in CSF files. */
export function componentDocs(name: string): string {
  const item = manifest.components.find((component) => component.name === name);
  if (!item) throw new Error(`Unknown documented component: ${name}`);
  return `${item.description}

### Quando usar
${item.use}

### Quando evitar
${item.avoid}

### Acessibilidade
${item.accessibility}

### Regras para IA
${item.ai}

### Código e estados
Use Show code nos exemplos. As propriedades podem ser exploradas em Controls. Estados sem sentido para o primitive não recebem variantes artificiais.`;
}
