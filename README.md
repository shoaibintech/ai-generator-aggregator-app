# Video Lab UI

A responsive, production-oriented React UI for an AI creation studio. This first milestone implements the Figma-defined Home, Video Creation, Generations, feedback, loading, and detail views with client-side mock data only.

## Stack

- React 19 + TypeScript + Vite
- Redux Toolkit and React Redux
- React Router
- Tailwind CSS foundation with component-scoped CSS
- React Hook Form + Zod validation
- Vitest + Testing Library
- Geist variable font

## Run locally

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run build
npm run lint
npm test
```

## Deployment

Pushing `main` runs the GitHub Actions Pages workflow in `.github/workflows/deploy-pages.yml`. The Vite base path is set automatically for GitHub Pages builds and remains `/` for local development.

## Implemented UI

- Home generator catalogue with category/search controls and responsive cards
- Figma-matched Home and Video Creation visuals using individual local source assets and live DOM content
- Individually rendered generation cards, skeleton loading states, and a generation-process/detail dialog
- Functional prompt composer with validated prompt, image attachment, model/settings dropdowns, and mock progress
- Feedback dialog with validated rating and suggestion form
- Desktop navigation rail, exact mobile card/gallery variants, and responsive layouts

The images and generation objects are intentionally mocked in `src/features/generations/generationsSlice.ts`. Replacing them with an API later should happen behind an RTK Query service layer, without changing feature components.

## Project layout

```text
src/
  app/                    Routing, providers, store, typed hooks
  assets/images/          Local image artwork, exported through a named barrel
  features/
    home/                 Generator catalogue and feedback flow
    studio/               Video creation workspace and prompt validation
    generations/          Mock generation entity state and gallery view
    ui/                   Cross-feature UI state
  shared/
    components/           Reusable layout and UI primitives
    icons/                Named icon exports
  lib/                    Shared utilities
  styles/                 Tokens and global styles
```

See [Architecture notes](docs/ARCHITECTURE.md) and [Figma map](docs/FIGMA_MAP.md) for implementation conventions and source-frame references.
