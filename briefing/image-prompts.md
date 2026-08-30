# Prompts de imagem — GA Food Wholesaler

Pra outro LLM/gerador de imagem (Midjourney, DALL·E, Nano Banana, Ideogram, etc). Cada prompt já inclui o prefixo de estilo — copiar e colar individualmente. O objetivo é todas as imagens parecerem da mesma sessão de fotos, coerente com `DESIGN.md`.

## Prefixo de estilo (base de todos os prompts abaixo)

```
Editorial commercial photography for a premium B2B brand-development company.
Warm neutral color palette: white, warm graphite, soft taupe and brown tones
(#8A6D50 accent range) — no saturated or bright colors anywhere in the scene.
Soft natural window light, shallow depth of field, 50mm lens look, full-frame
camera realism, uncluttered clean composition, generous negative space.
Realistic, diverse, professional but approachable people — not corporate-stock
cliché poses, no exaggerated smiles-to-camera. No visible logos, brand names,
or readable text on any product, package, or screen. No cartoon, no 3D render
look, no illustration — photorealistic only.
```

## Regras gerais

- Sempre pedir **variações sem texto/rótulo legível** nas embalagens (o rótulo real entra depois, em pós-produção ou com a marca do cliente).
- Aspect ratio sugerido: **16:9** para hero/banners largos, **4:5** ou **3:2** para cards/blocos de seção.
- Evitar: café em toda imagem (a empresa não é só torrefação — briefing, seção 10), pessoas olhando pra câmera de forma "vendedora", qualquer cor saturada fora da paleta.

---

## 1. Hero (Home)

```
[prefixo de estilo] +
Two professional partners collaborating at a wooden table, reviewing hand-drawn
packaging sketches and a blank kraft product pouch mockup together. One person
pointing at a sketch, genuine focused expression, notebook and pen visible.
Softly blurred shelving with neutral jars in the background. Warm, calm,
consultative mood — like a strategy session, not a sales pitch. 16:9.
```

## 2. Diagnóstico & Estratégia

```
[prefixo de estilo] +
Small team of three people around a table in a bright minimal office, one
person writing on a notepad, a laptop open showing an abstract chart (no
readable text), warm coffee cups nearby but not the focus. Body language of
active listening and discussion. 3:2.
```

## 3. Desenvolvimento do Produto

```
[prefixo de estilo] +
Close-up of hands carefully inspecting and comparing raw food ingredients
(coffee beans, grains, dried spices) in small tasting bowls on a wooden
surface, soft daylight, shallow focus on the ingredients. Suggests curation
and quality control, not a full commercial kitchen. 4:5.
```

## 4. Branding & Design

```
[prefixo de estilo] +
Overhead shot of a designer's desk: color swatches in warm neutral tones,
a blank packaging mockup, a tablet showing an abstract logo sketch (no
readable text), a cup of coffee. Organized, premium, editorial flat-lay
composition. 4:5.
```

## 5. Embalagem

```
[prefixo de estilo] +
Close-up of a person applying a blank white label onto a matte kraft pouch
bag on a production bench, soft focus background with more blank pouches
stacked neatly. Emphasis on texture and craftsmanship of the packaging
material itself. 3:2.
```

## 6. Registros & Regulatório

```
[prefixo de estilo] +
A person reviewing a clipboard with a checklist and a compliance document
at a clean desk, laptop open beside them, calm and organized mood — conveys
diligence and process, not a legal-office cliché. Warm neutral tones. 3:2.
```

## 7. Produção & Logística

```
[prefixo de estilo] +
Clean, modern small-scale food production facility: neat rows of sealed
blank pouches moving toward packing boxes, one worker in a simple apron
inspecting a pouch, soft industrial daylight. Feels precise and
well-run, not a huge anonymous factory. 16:9.
```

## 8. Lançamento & Suporte

```
[prefixo de estilo] +
Two people shaking hands across a table with a finished blank-label product
displayed between them, warm genuine expressions, bright minimal setting.
Suggests a partnership milestone, not a sales close. 3:2.
```

## 9. Vertical Café

```
[prefixo de estilo] +
A roaster or barista performing a coffee cupping session — several small
bowls of ground coffee in a row, person leaning in to smell one, warm
wooden counter, roasted beans scattered softly in the foreground, blurred
roasting equipment in the background. Sensory and expert, not a coffee-shop
lifestyle shot. 4:5.
```

## 10. Segmentos — 6 cards (Para Quem É)

Cada uma é uma cena separada e curta, mesma luz e paleta:

**Cafeterias e restaurantes**
```
[prefixo de estilo] + A barista's hands preparing a pour-over at a minimalist
cafe counter, blank branded cup nearby, warm ambient light. 4:5.
```

**Empórios e mercados**
```
[prefixo de estilo] + Close shot of a curated grocery shelf with blank-label
jars and pouches neatly arranged, soft daylight through a nearby window. 4:5.
```

**Distribuidores e atacadistas**
```
[prefixo de estilo] + Interior of a clean, organized small warehouse with
labeled shelving (labels blank/blurred) and stacked boxes, one person
checking inventory with a tablet. 4:5.
```

**Redes e supermercados**
```
[prefixo de estilo] + A supermarket aisle shot from a low angle showing rows
of blank-label products on shelves, soft overhead lighting, shallow depth
of field. 4:5.
```

**Empresas e escritórios**
```
[prefixo de estilo] + A modern office pantry corner with a blank-branded
product (coffee bag or snack pouch) next to cups, someone pouring coffee
in the soft blurred background. 4:5.
```

**Criadores e empreendedores**
```
[prefixo de estilo] + A solo entrepreneur at a small home studio desk,
sketching a product label by hand next to a laptop and a blank sample
pouch, warm natural light. 4:5.
```

---

## Depois de gerar

Guardar os arquivos finais em `public/images/` no projeto, nomeados por seção
(ex: `hero.jpg`, `segmento-cafeterias.jpg`) — o Astro otimiza automaticamente
via `astro:assets` quando referenciados no código.
