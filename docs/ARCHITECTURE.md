# Architecture

## Design principles

Feature code owns its UI, schemas, mock data, and state-facing selectors. Shared code belongs in `shared`, `app`, `lib`, or `styles` only when it is reused across two or more features.

## State boundaries

`features/ui` contains application-wide, transient UI state such as the feedback dialog and selected generation. `features/generations` uses Redux Toolkit's entity adapter so a real API can replace the mocked records without changing consumers. Form state remains local in React Hook Form; validated values are the only values promoted to feature actions.

`shared/components` owns UI primitives and application shell composition; `shared/icons` and `assets/images` expose named barrel exports. Feature components import these public entry points rather than reaching into individual image or icon files.

The application is TypeScript-only (`.ts` / `.tsx`) with strict compiler checks enabled. Route labels and browser titles are modelled in `app/pageMetadata.ts`, keeping selected-page names consistent without scattering title strings through feature views.

## Adding a generator

1. Add catalogue metadata in `features/home/generatorCatalog.ts`.
2. Create a feature folder when its workflow has distinct controls or domain models.
3. Reuse `AppShell`, common form patterns, skeletons, and the shared generation entity type where they fit.
4. Keep API calls in a future RTK Query service, not inside React components.

## Styling

Global tokens live in `styles/tokens.css`. Component/feature CSS is deliberately colocated with the corresponding React feature. Tailwind is available for utility-level additions, while composed Figma layouts are expressed through named classes to keep complex visual behavior readable and reviewable.

## Validation and accessibility

- All user-entered feedback and prompts are validated with Zod and React Hook Form.
- Dialogs close on Escape and have dialog semantics.
- Buttons, form controls, navigation, tabs, and image alternatives have accessible names.
- Keyboard focus uses a visible focus ring.
- Prompt setting controls expose button/listbox semantics rather than relying on browser-native select styling.

## Mock-data contract

Mock generation data is typed as `Generation`. It includes status, progress, generation kind, and settings so loading/process states are testable without an API. Keep it aligned with the expected server response shape. Avoid raw untyped objects in components; changes should be isolated to the adapter/service boundary.
