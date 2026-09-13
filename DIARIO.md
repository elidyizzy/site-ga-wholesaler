# Diário de bordo — GA Food Wholesaler

Registro do que foi feito, do que foi decidido e **principalmente dos erros**, pra
não repetir. O `DESIGN.md` é a autoridade visual; aqui fica a memória de execução.

---

## Sessão 2026-09-12

22 commits, de `e049b48` a `e59d613`. Estado ao fim do dia: Home construída, build
e typecheck limpos, detector do `impeccable` sem findings.

### O que mudou, em ordem

**Copy e conteúdo**
- CTA secundário virou **"Fale com um Consultor GA"** (substitui "Falar com um especialista"). Registrado como mensagem fixa em `PRODUCT.md` e `DESIGN.md`.
- Seção Método e grid de segmentos ganharam **descrição por item** — antes eram só título. O texto veio do briefing original (`Briefing_Novo_Website_GA_Food_Wholesaler.docx` seção 3, e `GA_Food_Private_Label_Brand_Development.pdf` p.6), que já tinha isso escrito e nunca foi migrado pro site.
- Abertura do parágrafo de posicionamento trocada pela linha do deck: **"Começamos pela necessidade, não pelo produto."**
- Legendas "Fig. 01 — …" removidas das fotos (pedido da cliente).
- Rodapé reconstruído em três colunas; cards de canal na seção de contato viraram uma linha discreta (eram repetição do rodapé a 500px de distância).

**Sistema visual**
- Escala tipográfica definida com tracking por papel (ver `DESIGN.md`).
- **Display em peso 300** com tracking negativo forte, no lugar de `font-semibold` em tudo. É a mudança que mais alterou a cara do site.
- Sistema de elevação em 3 níveis, com sombra tintada no grafite da marca (nunca preto puro).
- Botões em pill.
- Camada atmosférica derivada só de taupe/creme, respirando em deriva de 30s.
- Header nasce transparente sobre o hero e assenta sólido no scroll.
- Movimento: reveal escalonado (só hero), régua de progresso de leitura, parallax, hover dos segmentos.
- **Ícones autorais das 7 etapas** substituindo os genéricos da lucide (ver `DESIGN.md`).
- Superfícies do navegador (seleção de texto, scrollbar) saíram do default.

**Hero — o que mais custou**
Percurso: foto de IA com scrim preto → escultura de luz em SVG → pacote desenhado
em SVG (3 tentativas) → **imagem real do cliente com etiqueta ao vivo por cima**.
O estado final está em `HeroPacote.tsx`.

**Fato de negócio confirmado com a cliente**
As 7 etapas **são modulares** — dá pra contratar uma só. Isso resolveu uma
contradição entre a p.2 e a p.3 do deck do cliente, e corrigiu a frase do site
que dizia o contrário. Registrado em `PRODUCT.md`.

---

## Erros cometidos — não repetir

### 1. Entregar mudança invisível e chamar de melhoria
Passei duas rodadas ajustando `tracking` em milésimos de em e unificando padding de
`py-24` pra `py-28`. Tecnicamente correto, **visualmente imperceptível**. A cliente
respondeu, com razão, "não mudou nada".

> **Regra:** se a mudança não aparece num screenshot lado a lado, ela não é
> melhoria visível — não anuncie como tal. Rigor de sistema e mudança percebida
> são coisas diferentes; entregue as duas, mas não troque uma pela outra.

### 2. Narrar o próprio trabalho como vitória
"Grande salto", "isso sim tem presença", "muito melhor". A cliente olhava a tela e
não via nada disso. Insistir nisso soa como dizer que ela está vendo errado.

> **Regra:** mostrar e calar. Quem julga se ficou bom é ela.

### 3. Tentar salvar uma seção ruim rearranjando texto — três vezes
A seção de benefícios passou por: ícone + texto centralizado → numeral 01/02/03 +
régua → rótulo + lista em tabela. Continuou ruim porque o problema **não era o
arranjo**: era uma seção 100% texto numa página cuja força é imagem, sem âncora
visual e sem razão de existir separada. A solução foi **apagar a seção** e fundir
os três pontos dentro do posicionamento, que já tinha foto.

> **Regra:** se duas tentativas de rearranjo não resolvem, o defeito é estrutural.
> Pergunte se a seção deveria existir, não como arrumá-la.

### 4. Tirar sem colocar nada no lugar
Removi ícone, numeral e caixa da seção em nome do "menos é mais" e deixei três
frases boiando no branco. "Menos" virou "vazio".

> **Regra:** ao remover um elemento de apoio, verifique o que sustenta a leitura
> no lugar dele.

### 5. Tentar desenhar mockup fotorrealista em SVG
Três tentativas de desenhar a embalagem em SVG. Material, textura de kraft e
profundidade de campo **não se resolvem com gradiente linear** — é limitação da
técnica, não falta de capricho. Cada rodada continuou parecendo o que era.

> **Regra:** SVG serve pra line art, diagrama, ícone, campo de luz abstrato. Não
> serve pra imitar render de produto. Quando o alvo é fotorrealismo, procure
> material real **antes** de desenhar.

### 6. Não procurar o material do cliente primeiro
A imagem perfeita — pacote kraft com etiqueta em branco, 3508×2480 — estava em
`Downloads/.GA - Lucas/apresentação private label.pdf` **o tempo todo**. Gastei
três rodadas desenhando antes de olhar lá.

> **Regra:** antes de produzir asset, varrer o material do cliente. A pasta do
> cliente em `Downloads/.GA - Lucas/` tem apresentações, briefings e PDFs com
> imagens extraíveis.

### 7. Errar o formato de embalagem do mercado brasileiro
Desenhei stand-up pouch com válvula de desgaseificação — formato de specialty
americano/europeu. Café no Brasil é o pacote a vácuo (o "tijolo") ou o kraft de
prateleira. A cliente corrigiu: *"NO BRASIL nosso café não é representado assim"*.

> **Regra:** convenção de produto é específica de mercado. Verificar referência
> local antes de desenhar qualquer coisa que o comprador precise reconhecer.

### 8. Máscara SVG invertida
Fiz a máscara com preto de opacidade crescente. Em SVG a máscara funciona por
**luminância**: preto oculta, branco revela. Estava escondendo justamente o lado
que deveria aparecer, e a peça "sumia" sem erro nenhum no console.

### 9. Não medir contraste
O parágrafo do hero ficou em **3.50:1** no mobile — reprova no WCAG AA (mínimo
4.5:1). Só apareceu porque medi; a olho passava.

> **Regra:** medir contraste no pixel real, compondo o alpha sobre o fundo
> amostrado. Cor com alpha (`text-foreground/75`) não pode ser avaliada sozinha.
> O script está descrito no item "Ferramentas" abaixo.

### 10. Dois `useEffect` concorrentes
Deixei dois efeitos criando `setInterval` pro mesmo rodízio — os timers se somavam
e a troca ia acelerando sozinha.

### 11. `object-cover` desalinhando overlay posicionado em %
A etiqueta ao vivo é posicionada em % **do container**, mas `object-cover` escala e
corta a imagem — os dois sistemas de coordenada divergem. Solução: travar o
container na proporção exata da imagem (`aspect-[1468/2310]`).

### 12. Dev server de 4 horas com aba congelada
A cliente via "nada mudou" porque a conexão de HMR tinha caído e a aba estava presa
numa versão antiga — sem aviso nenhum na tela.

> **Regra:** quando ela disser que não mudou, **verificar o que o servidor entrega**
> (`curl | grep` por uma classe nova) antes de assumir que é percepção. Se o
> servidor está correto, reiniciar e abrir aba nova com cache-buster.

### 13. Scripts de substituição em massa quebrando JSX
Usei `python replace` em lote e produzi `variants={{draw(1.05, 1)}}` (chave dupla
inválida) e um `clipPath` vazio. O `astro check` passou mesmo assim.

> **Regra:** depois de substituição em massa, conferir o arquivo renderizado no
> browser, não só o typecheck.

---

## O que funcionou — manter

- **Peso 300 no display com tracking negativo.** Foi a mudança de maior impacto visual do dia.
- **Amplitude tonal como substituto de saturação.** Sem cor saturada disponível, a presença vem do intervalo creme → café escuro. Taupe a 10% sobre branco é invisível.
- **Header transparente → sólido.** Faz o hero virar peça inteira.
- **Reveal seletivo.** Só no hero. A mesma entrada repetida em toda seção achata a página; o Método já tem seu próprio movimento na linha da rota.
- **Ícones autorais.** Pouch, funil de blend, esteira, produto na prateleira — falam do negócio, não servem pra qualquer empresa.
- **A coreografia de construção do pacote.** Foi a única coisa que a cliente elogiou sem ressalva: *"a animação ficou boa"*.
- **Etiqueta ao vivo sobre imagem real.** Combina qualidade fotográfica com o argumento do site.

---

## Estado atual e onde retomar

**Hero:** `HeroPacote.tsx` — imagem real do cliente, etiqueta avançando
SEU PROJETO → SUA MARCA → SEU MERCADO, ficha técnica se preenchendo junto,
rotação seguindo o cursor, prancha de projeto na entrada. Aparece de `lg` pra cima.

**Aberto para amanhã:**

1. **O pacote não aparece em mobile/tablet** (`hidden lg:flex`). Decidir se entra e como.
2. **A ficha técnica que se preenche** foi iniciativa minha — validar ou cortar.
3. **`HeroPouch.tsx` está órfão** no repositório (o pacote desenhado em SVG, substituído pela imagem real). Decidir se apaga.
4. **Direção fotográfica V4 segue indefinida** desde 01/09. As 15 imagens da V3 continuam no site (método, segmentos, café) e continuam sendo o elo mais fraco agora que o resto subiu de patamar.
5. **Estruturas alternativas de Home** que cheguei a desenhar e não foram usadas: segmento-primeiro e diagnóstico-primeiro. Disponíveis se quiser retomar.
6. **Demais páginas** do `DESIGN.md` não existem: Private Label 360°, Serviços, Café Private Label, Para Quem É, Como Funciona, Por Que GA Food, Cases, Contato.

---

## Ferramentas e comandos úteis

```bash
# servidor (em background, com controle)
npx astro dev --background      # sobe
npx astro dev status            # confere
npx astro dev stop              # derruba
npx astro dev logs              # logs

# depois de adicionar componente novo, se a hidratação falhar com
# "504 Outdated Optimize Dep": limpar o cache de deps do Vite
rm -rf node_modules/.vite && npx astro dev --background

# verificação
npx astro check && npm run build
node "$HOME/.claude/skills/impeccable/scripts/detect.mjs" --json src/pages/index.astro

# conferir o que o servidor REALMENTE entrega (antes de discutir percepção)
curl -s http://localhost:4321 | grep -o "classe-nova" | head
```

**Screenshots e medição** ficam no scratchpad da sessão, via Playwright instalado
fora do projeto (`npm install --no-save playwright` numa pasta temporária). Para
página com scroll-reveal, **simular scroll em passos** antes de capturar — o
`fullPage: true` sozinho não dispara os `IntersectionObserver` e elementos
aparecem em branco, o que parece bug e não é.

**Extrair imagens de PDF sem poppler:** varrer os streams `/Subtype /Image` do
arquivo e gravar os blobs; os JPEG saem crus (magic `ffd8`). Foi assim que a
imagem do pacote foi recuperada da apresentação do cliente.
