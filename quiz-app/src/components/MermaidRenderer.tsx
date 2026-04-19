import { createEffect } from 'solid-js';

interface MermaidRendererProps {
  diagram: string;
  type?: 'erDiagram' | 'graph TD' | 'graph LR' | 'sequenceDiagram';
}

let mermaidInstance: typeof import('mermaid') | null = null;

async function loadMermaid() {
  if (mermaidInstance) return mermaidInstance;
  const mod = await import('mermaid');
  mermaidInstance = mod;
  mod.default.initialize({
    startOnLoad: false,
    theme: 'dark',
    themeVariables: {
      primaryColor: '#6c5ce7',
      primaryTextColor: '#fff',
      primaryBorderColor: '#dfe6e9',
      lineColor: '#636e72',
      secondaryColor: '#00b894',
      tertiaryColor: '#e17055',
      fontFamily: 'inherit',
      fontSize: '14px',
    },
    flowchart: {
      htmlLabels: true,
      curve: 'basis',
      nodeSpacing: 50,
      rankSpacing: 50,
    },
    er: {
      diagramPadding: 8,
      layoutDirection: 'TB',
      minEntityWidth: 100,
      minEntityHeight: 75,
      entityPadding: 15,
      stroke: '#dfe6e9',
      fill: '#2d3436',
    },
    sequenceDiagram: {
      actorMargin: 50,
      boxMargin: 10,
      boxTitleMargin: 20,
      diagramPadding: 8,
      messageMargin: 35,
      messageAlign: 'center',
      mirrorActors: true,
    },
  });
  return mermaidInstance;
}

async function renderDiagram(container: HTMLDivElement, diagram: string) {
  const m = await loadMermaid();
  try {
    const id = `mermaid-${Math.random().toString(36).slice(2, 10)}`;
    const { svg } = await m.default.render(id, diagram);
    container.innerHTML = svg;
    const svgEl = container.querySelector('svg');
    if (svgEl) {
      svgEl.style.maxWidth = '100%';
      svgEl.style.height = 'auto';
      svgEl.style.margin = '0 auto';
    }
  } catch (e) {
    console.error('Mermaid render error:', e);
    container.innerHTML = `<pre style="font-size:11px;opacity:0.6;white-space:pre-wrap;">${diagram}</pre>`;
  }
}

export default function MermaidRenderer(props: MermaidRendererProps) {
  let containerRef: HTMLDivElement | undefined;

  createEffect(async () => {
    if (!containerRef) return;
    await renderDiagram(containerRef, props.diagram);
  });

  return <div ref={containerRef} class="mermaid-container" />;
}