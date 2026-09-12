# DESIGN.md — GA Food Wholesaler | Private Label & Brand Development

Fonte: `briefing/Briefing_Novo_Website_GA_Food_Wholesaler.docx` e `briefing/GA_Food_Private_Label_Brand_Development.pdf`. Este documento é a autoridade visual do projeto — qualquer refinamento de UI deve honrar o que está aqui.

## Posicionamento

A GA Food não quer ser vista como torrefação/fabricante. É um **hub de desenvolvimento de marca própria** (Private Label & Brand Development), com café como vertical forte mas não limitadora. Mensagem-mãe: **"Você tem a ideia. Nós cuidamos do resto."**

Modo do site (ver `impeccable/reference/new-work.md`): **Persuade** — B2B institucional, visitante decide e age (vira lead qualificado), não uma ferramenta operacional.

## Logo

A logo (`logomarca/base_logo_transparent_background.png`) é colorida e lúdica (ciano/magenta/azul/laranja lettering) — **decisão do cliente: mantida como está, sem redesenho.**

Regra de uso: a logo é o único elemento com essa saturação de cor no site inteiro. Todo o resto do sistema visual é neutro/quente e contido (ver Paleta) para que a logo tenha espaço pra "estourar" sem competir com blocos coloridos ao redor — nunca reutilizar as cores da logo em botões, ícones, tags ou fundos. Nunca deformar, nunca aplicar em excesso na página (briefing, seção 10).

**Atualizado em 2026-09-01** — regra "fundo branco sempre atrás da logo" foi escrita quando header/footer eram escuros e exigiam um cartão branco isolando a logo colorida. Com a paleta clara (ver Paleta), header (`bg-background/90`) e footer (`bg-secondary`, creme) já são claros o bastante pra logo ir direto neles, sem cartão — cliente reportou que o cartão branco pequeno deixava a logo "apagada e minúscula". Cartão branco isolado continua valendo só se a logo for aplicada sobre fundo escuro ou fotografia (nesse caso usar as variantes monocromáticas abaixo, não a colorida sobre um cartão).

Variantes adicionadas pelo cliente em `logomarca/` (2026-09-01), ainda sem aplicação definida no site — usar quando a colorida não servir (ex.: favicon, ou lockup sobre fundo escuro/foto sem cartão):
- `black_logo_transparent_background.png` — wordmark preto, fundo transparente (fundos claros).
- `white_logo_transparent_background.png` — wordmark branco, fundo transparente (fundos escuros/fotografia).
- `black_logo_white_background.png` / `white_logo_black_background.png` — versões com fundo sólido embutido (badges/selos).

Nenhuma delas tem um símbolo/monograma isolado (só o wordmark completo em duas linhas) — não servem como favicon sem recorte, e recortar um monograma novo é decisão de marca, não foi pedido ainda.

## Paleta

Extraída dos materiais reais já usados pela GA Food (`briefing/PL1.png`, cards bege/marrom do PDF), não inventada — mantém consistência entre site, apresentação e materiais comerciais (briefing, seção 15).

| Token | Valor | Uso |
|---|---|---|
| `--background` | `#FFFFFF` | Fundo base — obrigatório branco (briefing, seção 10) |
| `--foreground` | `#211D18` | Texto principal — grafite quente, não preto puro |
| `--primary` | `#8A6D50` | Marrom/taupe quente — CTAs, headline de destaque, ícones de apoio |
| `--primary-foreground` | `#FFFFFF` | Texto sobre `--primary` |
| `--secondary` / `--accent` | `#F4EFE7` | Fundo bege claro — cards, seções alternadas (o "bloco creme" que já aparece no PDF) |
| `--muted` | `#F7F5F1` | Fundo neutro muito sutil — nunca cinza frio |
| `--muted-foreground` | `#6B6559` | Texto secundário |
| `--border` | `#E7E2D9` | Bordas, divisores |

Nota: `#8A6D50` é um ponto de partida fiel ao tom visto no material do cliente, não uma extração de pixel exata (não há um brand color oficial documentado) — ajustar se o cliente fornecer um hex oficial.

**Proibido:** qualquer cor saturada fora da logo. Nada de gradientes chamativos, nada de paleta genérica de IA (roxo/azul SaaS padrão).

## Tipografia

- Sans: **Geist Variable** (já instalada via `@fontsource-variable/geist`) — limpa, neutra, boa legibilidade em corpo e títulos institucionais.
- Escala: manter hierarquia clara, títulos grandes e diretos (ver exemplos do PDF: "Você tem a ideia." em duas linhas, peso alto).
- Base 16px, line-height 1.5+ no corpo (regra UX crítica, ver `ui-ux-pro-max`).

## Fotografia / Imagens

Direção obrigatória (briefing, seções 10 e 15). **Histórico de correções de estética** — três rodadas já erraram o alvo, registrado aqui pra não repetir:

- **V1 (rejeitada, 2026-08-30/31):** prompt original gerou lifestyle/coworking genérico — potes de cerâmica boho, flores secas, mesa de madeira rústica, sorriso pra câmera. Cliente: "amadoras".
- **V2 (rejeitada, 2026-08-31):** correção pra "industrial" foi longe demais pro lado clínico — jaleco, touca, óculos de proteção, bandeja de inox leram como auditoria de segurança alimentar, não luxo. Cliente: "isso parece premium de luxo?".
- **V3 (atual, 2026-08-31)** — direção validada com referências reais trazidas pelo cliente (campanha Vibe Coffee, pouch preto/dourado em fundo escuro, aperto de mão e equipe em campo, mesa de design de rótulo):
  - **Registro de produto-herói**: pouches private label (preto fosco, kraft, metálico) fotografados como protagonista, luz dramática quente lateral/dourada, fundo escuro, bokeh — registro de campanha de bebida/perfume premium, não still de catálogo.
  - **Registro de negócio genuíno**: pessoas em traje smart-casual/business-casual — nunca jaleco, touca ou óculos de proteção — em interação real (reunião, degustação, aperto de mão, inspeção), luz natural quente ou dramática lateral, nunca lifestyle de coworking genérico.
  - **Cenário sempre dentro da GA Food** (produção própria, sala de degustação, estúdio de design, showroom, escritório) — **nunca fazenda/plantação literal** (a empresa não é produtora rural) e **nunca laboratório clínico/hospitalar**.
  - Tela de laptop, quando aparece, mostra só formas/blocos abstratos — nunca tenta simular texto ou UI legível (fonte recorrente de artefato visual ruim nos geradores de imagem).
  - Segue valendo: nunca só café em todo lugar (a empresa não é só torrefação), sem estoque genérico óbvio, sem selo/badge espalhado pela imagem, sem cor saturada fora da paleta.

- **V3 rejeitada em produção (2026-09-01):** mesmo validada em referência, ao ver o site montado o cliente achou as fotos amadoras/reconhecivelmente geradas por IA — "não dá vontade de ter uma marca de café ou de qualquer outro private label". **Sem direção V4 definida ainda** — cliente pediu pra só registrar o problema por enquanto, sem mexer nas imagens nesta rodada. Opções levantadas e não decididas: (a) nova leva de IA com direção mais específica sobre o que falhou, (b) banco de imagens premium licenciado, (c) ensaio fotográfico real da GA Food. Não gerar nem trocar imagens sem essa decisão.

Como não há banco de fotos real da GA Food, as imagens atuais (V3) foram geradas por IA externa seguindo os prompts em `prompt/` (um arquivo `.txt` por imagem, ver `prompt/README.md`) para manter a mesma "sessão de fotos" visual em todas as páginas — mas essa abordagem está em aberto, ver V3 acima.

## Ícones

Lineares, discretos, sem preenchimento pesado (briefing, seção 10). Usar `lucide-react` (já instalado via shadcn) como base — é o padrão do preset Nova e cobre bem o estilo pedido.

## O que evitar (briefing, seção 10 — regra dura)

- Visual colorido ou genérico fora da logo.
- Excesso de caixas, selos, ícones e textos simultâneos.
- Blocos competindo com a logo.
- Promessas exageradas ("somos os melhores", "faça sua marca hoje" como única mensagem).
- Fotografia de café em todo canto.
- Layout de folder quando a página pede linguagem institucional.

## Tom de voz

Consultivo, seguro, direto, sem jargão, humano mas não informal, orientado a resultado. Mensagens-chave fixas (briefing, seção 13) — reutilizar literalmente, não parafrasear:

- Mãe: "Você tem a ideia. Nós cuidamos do resto."
- Institucional: "Da ideia à marca. Da marca ao mercado."
- Diferencial: "Mais do que produção: uma estrutura integrada para desenvolver sua marca própria."
- Método: "Private Label 360°."
- Produto+marca: "Sua marca. Seu produto. Nossa estrutura."
- CTA principal: "Desenvolver minha marca própria" / CTA secundário: "Fale com um Consultor GA" (atualizado em 2026-09-12 — substitui "Falar com um especialista")

## Stack técnica (decisão registrada em 2026-08-30)

- **Astro** (SSG/hybrid) + **React** só em ilhas interativas (`client:visible`/`client:idle`) — site majoritariamente estático, JS mínimo, SEO nativo.
- **Tailwind CSS v4** + **shadcn/ui** (preset Nova, base radix) como sistema de componentes.
- **Magic UI** para efeitos/animação, **Framer Motion** dentro das ilhas React que precisarem.
- **TypeScript** estrito em tudo.
- Deploy: **Railway** (Nixpacks, sem Dockerfile manual).
- Domínio de produção: `gafood.com.br` (já configurado em `astro.config.mjs`).

## Arquitetura de páginas (briefing, seção 8)

| Página | Função |
|---|---|
| Home | Posicionamento + proposta de valor + CTA |
| Private Label 360° | As 7 etapas da metodologia |
| Serviços | Cada módulo detalhado, integráveis |
| Café Private Label | Vertical específica |
| Para Quem É | Segmentos (6 públicos) |
| Como Funciona | Roteiro diagnóstico → lançamento |
| Por Que GA Food | Diferenciais |
| Cases/Projetos | Antes/depois quando houver material |
| Contato/Diagnóstico | Formulário qualificador + WhatsApp + e-mail |
