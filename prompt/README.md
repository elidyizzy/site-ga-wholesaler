# Prompts de imagem — GA Food Wholesaler

Cada `.txt` nesta pasta já é um prompt completo, pronto pra colar direto num
gerador de imagem (Midjourney, DALL·E, Nano Banana, Ideogram, etc). O
prefixo de estilo (paleta, luz, enquadramento) já vem embutido em cada
arquivo — não precisa combinar nada manualmente.

| Arquivo | Onde entra no site |
|---|---|
| `01-hero.txt` | Home — hero |
| `02-diagnostico-estrategia.txt` | Private Label 360° — etapa 1 |
| `03-desenvolvimento-produto.txt` | Private Label 360° — etapa 2 |
| `04-branding-design.txt` | Private Label 360° — etapa 3 |
| `05-embalagem.txt` | Private Label 360° — etapa 4 |
| `06-registros-regulatorio.txt` | Private Label 360° — etapa 5 |
| `07-producao-logistica.txt` | Private Label 360° — etapa 6 |
| `08-lancamento-suporte.txt` | Private Label 360° — etapa 7 |
| `09-vertical-cafe.txt` | Página Café Private Label |
| `10-segmento-cafeterias.txt` | Para Quem É — cafeterias e restaurantes |
| `11-segmento-emporios.txt` | Para Quem É — empórios e mercados |
| `12-segmento-distribuidores.txt` | Para Quem É — distribuidores e atacadistas |
| `13-segmento-redes-supermercados.txt` | Para Quem É — redes e supermercados |
| `14-segmento-empresas-escritorios.txt` | Para Quem É — empresas e escritórios |
| `15-segmento-criadores-empreendedores.txt` | Para Quem É — criadores e empreendedores |

## Regras gerais

- Estética **Agro Premium** (v3, 2026-08-31 — ver histórico completo em `DESIGN.md` seção "Fotografia / Imagens"): mistura de **fotografia de produto-herói** (pouches em fundo escuro, luz dramática quente, estilo campanha de bebida premium) com **fotografia de negócio genuíno** (pessoas smart-casual, luz natural, interação real) — sempre dentro dos ambientes da própria GA Food, nunca fazenda literal, nunca laboratório clínico, nunca lifestyle de coworking genérico, nunca boho-artesanal.
- Sempre pedir **variações sem texto/rótulo legível** nas embalagens (o rótulo real da GA Food entra depois).
- Evitar: café em toda imagem (a empresa não é só torrefação), pessoas "vendedoras" olhando pra câmera, qualquer cor saturada fora da paleta da marca, tela de laptop/celular tentando simular texto ou UI legível (gera artefatos visuais ruins nos geradores de imagem — se aparecer tela, só formas/blocos abstratos).
- Manter a mesma "sessão de fotos" — não misturar estilos diferentes entre as imagens do site.

O hero é imagem estática (`hero.jpg`) — sem animação/vídeo.

## Depois de gerar

Salvar os arquivos finais em `src/assets/` no projeto, nomeados igual ao
slug do prompt (ex: `hero.jpg`, `segmento-cafeterias.jpg`) — o Astro otimiza
automaticamente via `astro:assets` quando importados no código.

## Imagem do pacote no hero (2026-09-12)

`src/assets/images/pacote-private-label.jpg` **não é gerada por nós**: é recorte
de material comercial do próprio cliente — `apresentação private label.pdf`,
página com a logo GA Food Wholesaler, onde o pacote aparece com a etiqueta em
branco ("YOUR BRAND HERE"). Por isso não passa pela discussão de direção V1/V2/V3:
não é foto de banco nossa, é peça do cliente.

O texto da etiqueta original está mal renderizado (artefato de IA na peça
original). No site ele fica coberto pela etiqueta ao vivo do `HeroPacote.tsx`,
que é onde as marcas se alternam.
