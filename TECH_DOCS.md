# Documentação Técnica: GA Food Wholesaler

Esta documentação serve como o guia definitivo de arquitetura, decisões técnicas e stack do projeto GA Food Wholesaler. O objetivo é permitir que qualquer engenheiro ou agente de IA assuma o projeto imediatamente com contexto total.

---

## 1. Arquitetura Base e Stack
O site foi concebido sob a premissa de **Velocidade Extrema (Core Web Vitals)** e **SEO Implacável**.

- **Framework Core:** [Astro](https://astro.build/) (v5+). Escolhido por sua arquitetura "Zero-JS por padrão" (Island Architecture). As páginas são renderizadas 100% estáticas no servidor.
- **Interatividade (Ilhas):** [React](https://react.dev/). Usado estritamente onde o estado do cliente é vital (Ex: Formulário Multi-Step `ContactChat.tsx` e Componentes SVG Complexos).
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/) (v4 alpha / Vite plugin).
- **Animações Fluidas:** [Framer Motion](https://www.framer.com/motion/) para montagens React (ex: botão de conclusão de chat) e `@keyframes` puros no `global.css` para elementos não interativos (ex: botão flutuante de WhatsApp).

## 2. Padrões de Design e UX/UI (`DESIGN.md`)
O projeto possui regras inegociáveis de interface baseadas no repositório de design B2B:
- **Mobile First:** Todo o CSS é escrito primeiro sem sufixos (celular) e só depois expandido com `sm:`, `md:` e `lg:`.
- **Paleta Travada:** Fundo predominantemente branco/creme, texto grafite denso (`foreground`), e acentos restritos à cor de destaque (um marrom luxuoso/taupe).
- **Sem Travessões:** Proibido o uso de "em-dashes" na copy visível.
- **Micro-interações:** Toda ação possui um *feedback* instantâneo (`hover:scale`, `active:scale-95`, transições suaves).

## 3. Topologia de Arquivos e Componentes-Chave

- `src/pages/index.astro`: O esqueleto central da Home. Agrupa os componentes, define a lógica de IntersectionObserver para animações de fade-in no scroll e o menu mobile.
- `src/layouts/Layout.astro` e `BlogLayout.astro`: Mantêm o invólucro do HTML, injeção de Open Graph tags (SEO), cabeçalho e rodapé.
- `src/components/ContactChat.tsx`: O cérebro da conversão. Um simulador de chat assíncrono que coleta leads e redireciona os dados via parâmetro de URL (`wa.me/?text=...`) direto para o WhatsApp de vendas.
- `src/components/RouteMethod.tsx`: Estrutura visual conectada via SVG dinâmico, guiando os usuários por um percurso (Diagnóstico -> Lançamento) ao invés de usar cards estáticos normais de B2B.

## 4. Arquitetura do Blog e SEO (Content Layer)
Para dominar os motores de busca, abolimos o uso de CMS com banco de dados lento.

- **Astro Content Collections:** O blog consome arquivos `.md` diretamente do disco (`src/content/blog/`).
- O arquivo `src/content.config.ts` valida fortemente os metadados (Frontmatter) como `title`, `description` e `heroImage` usando `Zod`.
- As páginas dinâmicas são geradas em tempo de build por `src/pages/blog/[slug].astro`.
- **Indexação Automatizada:** Sempre que há build, o pacote `@astrojs/sitemap` gera um novo XML nativamente. O arquivo `public/robots.txt` orienta o Google a varrer este sitemap e o `Layout.astro` renderiza `og:image` dinâmico para redes sociais.

## 5. Fluxo de Publicação (CI/CD)
Toda a infraestrutura está automatizada (GitOps).

1. O código-fonte master vive no GitHub (`elidyizzy/site-ga-wholesaler`).
2. A Nuvem **Vercel** está escutando o repositório.
3. Ao rodar `git push origin master`, a Vercel derruba a versão antiga, instala as dependências, comprime as novas imagens em `.webp` ultra-leves e publica a nova versão estática diretamente nas Edge Networks globais.

## 6. Evolução e Troubleshooting

- **"O CSS parou de aplicar!"**: No Tailwind para Astro v5+, o setup requer `import "@/styles/global.css"` no topo do Layout raiz.
- **"Quero adicionar uma nova tag no menu"**: A navegação vive no topo de `index.astro` e `BlogLayout.astro`. Altere em ambos e lembre-se de duplicar o link também no menu mobile (`div#mobile-menu`).
- **"Quero alterar o número do WhatsApp"**: Procure pela constante `whatsappNumber` ou pela URL direta em `Layout.astro` (no botão flutuante) e substitua pelo telefone com DDI (ex: `55319...`).

---
*Manter um código enxuto, estático sempre que possível e obsessivo pela conversão do cliente. Essa é a base de ouro deste projeto.*
