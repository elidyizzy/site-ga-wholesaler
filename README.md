# GA Food Wholesaler ☕🚀

> Você tem a ideia. Nós cuidamos do resto. Uma rota só, do diagnóstico ao lançamento, pra transformar sua ideia numa marca própria real.

Este é o repositório oficial do site da **GA Food Wholesaler**, focado em conversão B2B e desenvolvimento de marcas próprias (Private Label) de café premium.

Construído sob uma arquitetura de alta performance focada em conversão, SEO agressivo e carregamento instantâneo.

## 🛠 Arquitetura Técnica

- **Framework:** [Astro](https://astro.build/) (v5+ Content Layer)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Componentes React:** Integração pontual para interatividade avançada (ex: Formulário/Chat interativo).
- **Conteúdo:** Markdown processado no build. Zero requisições de banco de dados para velocidade máxima.
- **Animações:** CSS Nativo (`@keyframes`) + Framer Motion (para widgets React).
- **Metodologia de Design:** Mobile First (100% responsivo) alinhado aos padrões estabelecidos em `DESIGN.md`.

## 🚀 Como Rodar Localmente

Certifique-se de ter o Node.js v18+ instalado.

```bash
# Instale as dependências
npm install

# Rode o servidor de desenvolvimento
npm run dev
```

Abra `http://localhost:4321` no seu navegador.

### Sobre o Ambiente de Build:
Devido à arquitetura do Astro v5+ usada aqui, caso o `npm run dev` não reflita instantaneamente mudanças em alguns componentes, recomendamos rodar um build de produção local para testar a fidelidade máxima:

```bash
npm run build
npx serve dist -p 4321
```

## 📝 Gestão do Blog (Evergreen Content)

O site possui um blog B2B de alto impacto projetado para SEO.
Para adicionar novos artigos:

1. Adicione um novo arquivo `.md` dentro de `src/content/blog/`.
2. Certifique-se de preencher a estrutura do Frontmatter:
   ```yaml
   ---
   title: "Título do Artigo"
   description: "Descrição curta otimizada para SEO."
   pubDate: "2024-01-01"
   heroImage: "/images/blog/nome-da-imagem.jpg"
   author: "GA Food Wholesaler"
   ---
   ```
3. Rode `npm run build`. O Astro irá compilar o Markdown, injetar as tags Open Graph dinamicamente e reconstruir o sitemap XML de forma autônoma.

## 📱 Destaques de UX/UI

- **Scroll Atmosférico:** Efeito parallax e régua de leitura de progresso controlados via `requestAnimationFrame` em JavaScript puro para evitar perdas de frames.
- **Magnetic WhatsApp CTA:** Botão pulsante implementado inteiramente em CSS para maximizar engajamento passivo no mobile e desktop sem consumir CPU.
- **Bento Grid Fluído:** Seções desconstruídas que se reestruturam de 1 para 3 colunas baseadas unicamente na matemática fluída do Tailwind.

---

**Desenvolvido com excelência estratégica para dominar o mercado de Private Label.**
