# DESIGN.md — GA Food Wholesaler | Private Label & Brand Development

Fonte: `briefing/Briefing_Novo_Website_GA_Food_Wholesaler.docx` e `briefing/GA_Food_Private_Label_Brand_Development.pdf`. Este documento é a autoridade visual do projeto — qualquer refinamento de UI deve honrar o que está aqui.

> **Antes de mexer em UI, ler `DIARIO.md`** — registro de execução com os erros já cometidos (mudança invisível, mockup em SVG, formato errado de embalagem, contraste não medido) e o que funcionou. Existe pra não repetir.

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
- Base 16px, line-height 1.5+ no corpo (regra UX crítica, ver `ui-ux-pro-max`).

### Escala tipográfica (registrada em 2026-09-12)

Régua de acabamento adotada: **Linear (linear.app)** — só o nível de precisão (tracking negativo disciplinado em display, hierarquia por peso/tamanho, um ritmo de espaçamento só), nunca a paleta ou o modo escuro (ver `PRODUCT.md`, Brand Commitments). Antes desta escala, cada seção escolhia `text-3xl`/`text-5xl`/tracking no olho — o resultado inconsistente vinha disso, não só de CSS solto.

| Papel | Tamanho | Peso | Line-height | Tracking | Uso |
|---|---|---|---|---|---|
| `display-xl` | `clamp(2.75rem,7vw,6rem)` | **300 (light)** | 0.95 | -0.045em | H1 do hero — único uso |
| `display-lg` | `text-4xl sm:text-5xl` (36→48px) | **300 (light)** | 1.1 | -0.04em | Headline de seção (Método, Contato) |
| `display-md` | `text-3xl sm:text-4xl` (30→36px) | **300 (light)** | 1.15 | -0.03em | Headline de bloco (posicionamento, café) |
| `headline` | `text-lg` a `text-xl` (18–20px) | 500 (medium) | 1.3 | -0.01em | Título de card/etapa (ex. `RouteMethod` stage title) |
| `body-lg` | `text-lg` (18px) | 300–400 | 1.5 | 0 | Subtítulo do hero, parágrafo de abertura |
| `body` | `text-base` (16px) | 400 | 1.5+ | 0 | Corpo padrão |
| `body-sm` | `text-sm` (14px) | 400–500 | 1.5 | 0 | Descrição de etapa/segmento, rótulo de botão |
| `caption` | `text-xs` (12px) | 500 | 1.4 | 0.05em (positivo, só em uppercase labels) | Rótulos tipo "Nossos canais de relacionamento" |

**Peso leve é a assinatura (2026-09-12).** Todo `display-*` é **300**, nunca 600. Foi a mudança de maior impacto visual do projeto: `font-semibold` em tudo era o que dava ao site a cara de template. Subir pra 400+ em display devolve esse problema — o "ar editorial" vem do peso leve em escala grande com tracking apertado. Peso 500 fica reservado a títulos pequenos (`headline`), onde 300 enfraquece demais.

Regra: todo título `display-*` leva tracking negativo — nenhum headline de seção fica com tracking padrão do navegador. Nunca usar `eyebrow`/kicker acima de headline (regra dura do craft floor: o próprio título carrega o peso, um rótulo em cima é enfeite, não hierarquia).

### Espaçamento

- Padding vertical de seção: **`py-28` (112px) em toda `<section>` de página, sem exceção** — um ritmo só, do hero ao contato. Nenhuma seção usa `py-20`, `py-24` ou `py-32` "porque parece melhor" ali.
- Dentro de uma seção: mais espaço acima de um título do que abaixo dele (headline "puxa" o parágrafo pra perto, não o contrário).
- Escala de espaçamento interno segue os tokens padrão do Tailwind (`gap-4`/`gap-6`/`gap-8`/`gap-12`...) — já é uma escala coerente de base 4px, o problema nunca foi falta de tokens, foi a seção fora do ritmo de `py-28`.

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


## Hero (decidido em 2026-09-12)

O hero **não usa fotografia de banco nem de IA nossa**. Percurso até aqui: foto com scrim preto → escultura de luz em SVG → pacote desenhado em SVG (3 tentativas, todas rejeitadas) → **imagem real do cliente com etiqueta ao vivo por cima**.

- **Imagem**: `src/assets/images/pacote-private-label.jpg` — recorte de `apresentação private label.pdf` (material comercial do próprio GA Food), onde o pacote kraft aparece com a etiqueta em branco. Não entra na discussão da direção V1/V2/V3 e não carrega marca de terceiro. Procedência registrada em `prompt/README.md`.
- **Etiqueta ao vivo** (`HeroPacote.tsx`): avança SEU PROJETO → SUA MARCA → SEU MERCADO, ancorada sobre a etiqueta real (cujo texto está mal renderizado na peça original). A ficha técnica se preenche junto — o que entra "a definir" no diagnóstico termina resolvido na prateleira.
- **Fundo claro obrigatório**: o hero escuro anterior violava a regra de fundo branco do briefing. A escultura de luz (`HeroAtmosphere.astro`) sangra pela direita e deixa a esquerda livre pra tipografia.
- O container do pacote é travado na proporção exata da imagem (`aspect-[1468/2310]`) — sem isso, `object-cover` escala e corta, e a etiqueta ao vivo desalinha da real.

## Movimento (decidido em 2026-09-12)

Quatro camadas, nenhuma repetida em toda seção:

1. **Atmosfera que respira** — deriva de 30s nas camadas de luz. Desliga em `prefers-reduced-motion`.
2. **Régua de progresso de leitura** no header.
3. **Parallax** na peça do hero.
4. **Reveal escalonado** — só no hero. O Método já tem o dele na linha da rota que preenche com o scroll.

Regra dura: *um momento autoral de movimento, não a mesma entrada em toda seção.* Progresso e parallax dividem um único `requestAnimationFrame` em `transform`.

## Elevação e atmosfera

- Sombra sempre **tintada no grafite quente da marca** (`#211D18`), nunca preto puro. Três níveis: `--shadow-lift-1/2/3` em `global.css`. Nada de sombra fora dessa escala.
- Camada atmosférica (`.atmosphere-warm`, `.atmosphere-warm-soft`) derivada só de taupe e creme.
- **Aprendizado que vale pra tudo**: sem cor saturada disponível, presença vem de **amplitude tonal**, não de efeito. Taupe a 10% sobre branco é invisível; a peça precisa percorrer creme → café escuro pra existir.
- Superfícies do navegador (seleção de texto, scrollbar) são tematizadas, não ficam no default.

## Ícones

Lineares, discretos, sem preenchimento pesado (briefing, seção 10). `lucide-react` cobre os ícones de UI (seta, e-mail, chat).

**Ícones autorais das 7 etapas (2026-09-12)** — `src/components/StageIcon.tsx`. Os genéricos de biblioteca (`Compass`, `FlaskConical`, `Rocket`) serviriam a qualquer empresa; os autorais falam o vocabulário do private label e só fazem sentido aqui:

| Etapa | Desenho |
|---|---|
| Diagnóstico & Estratégia | Briefing sob a lente |
| Desenvolvimento de Produto | Funil de blend: matérias-primas distintas entrando, um produto só saindo |
| Branding & Design | Etiqueta com a marca já aplicada |
| Embalagem | **Stand-up pouch** — a forma mais icônica do private label |
| Registros & Regulatório | Documento com selo |
| Produção & Logística | Caixa selada sobre os rolos da esteira |
| Lançamento & Suporte | O produto na prateleira |

Regra: malha 24×24 e traço 1.5 iguais aos da lucide, pra conviverem sem destoar. Cada traço se desenha (`pathLength` animado) quando a etapa entra em cena, escalonado na ordem em que a mão desenharia.

## O que evitar (briefing, seção 10 — regra dura)

- Visual colorido ou genérico fora da logo.
- Excesso de caixas, selos, ícones e textos simultâneos.
- Blocos competindo com a logo.
- Promessas exageradas ("somos os melhores", "faça sua marca hoje" como única mensagem).
- Fotografia de café em todo canto.
- Layout de folder quando a página pede linguagem institucional.

## Tom de voz

**Sem travessão (2026-09-13).** Decisão da cliente: travessão não é pontuação de uso corrente no português do Brasil e não entra em texto visível do site. Onde ele apareceria, usar vírgula, dois-pontos ou ponto final. Isso alterou a mensagem fixa do hero, que antes trazia um travessão antes de "com a margem". Comentário de código não conta.

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
