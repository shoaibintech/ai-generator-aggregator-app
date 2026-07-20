# Figma map

Source file: `Video Lab` (`dh0Pfb256yranCJuRw8vwB`)

| Product area | Figma frame/node | Implementation |
| --- | --- | --- |
| Desktop Home | `648:251901` | `features/home/HomePage.tsx` |
| Mobile Home | `690:752117` | Responsive rules in `features/home/home.css` |
| Home generator cards | `717:990976`, `710:972583`, `817:2380`, `690:708761` | `features/home/components/GeneratorCard.tsx` |
| Home card artwork only | `717:990980`, `710:972587`, `817:2384`, `690:708765` | `assets/images/home` (live card copy remains selectable) |
| More tools callout decoration | `648:265845`, `648:268112`, `648:270379` | `features/home/HomePage.tsx` (live heading, description, button) |
| Feedback dialog | `652:337703` | `features/home/components/FeedbackModal.tsx` |
| Desktop Video Creation | `665:359385` | `features/studio/StudioPage.tsx` |
| Prompt composer + setting icons | `665:359439` | `features/studio/components/PromptComposer.tsx`, `assets/images/icons` |
| Desktop tab galleries | `665:359412`, `665:359617`, `665:360617` | `features/generations/components/GenerationGrid.tsx` (individual cards) |
| Mobile tab galleries | `33:2060`, `33:2174`, `33:2281` | Responsive rules in `features/generations/generations.css` |
| Generation process / detail dialog | `665:361833` | `features/generations/components/GenerationDetailDialog.tsx` |
| Sidebar / app mark | `830:37459` | `shared/components/layout/Sidebar.tsx`, `public/favicon.svg` |

The connected Figma account is read-only. Small source artwork exports are versioned under `src/assets/images/` and imported through `src/assets/images/index.ts`. Screen-wide screenshots are intentionally not shipped: headings, labels, prompts, settings, and buttons remain live, selectable DOM content.
