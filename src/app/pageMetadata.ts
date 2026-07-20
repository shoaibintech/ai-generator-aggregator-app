export const appPages = {
  generations: 'generations',
  home: 'home',
  studio: 'studio',
} as const

export type AppPage = (typeof appPages)[keyof typeof appPages]

export interface PageMetadata {
  label: string
  page: AppPage
  title: string
}

const pageMetadata: Readonly<Record<AppPage, PageMetadata>> = {
  [appPages.generations]: { label: 'Generations', page: appPages.generations, title: 'Generations · Video Lab' },
  [appPages.home]: { label: 'Home', page: appPages.home, title: 'Home · Video Lab' },
  [appPages.studio]: { label: 'Video Creation', page: appPages.studio, title: 'Video Creation · Video Lab' },
}

const toolPageLabels: Readonly<Record<string, string>> = {
  '3d': '3D Lab',
  docs: 'Docs Lab',
  image: 'Image Generation',
  video: 'Video Creation',
}

export const getPageMetadata = (pathname: string, search: string): PageMetadata => {
  if (pathname === '/generations') return pageMetadata[appPages.generations]
  if (pathname === '/studio') {
    const tool = new URLSearchParams(search).get('tool')
    const label = tool ? toolPageLabels[tool] : undefined
    return label ? { ...pageMetadata[appPages.studio], label, title: `${label} · Video Lab` } : pageMetadata[appPages.studio]
  }
  return pageMetadata[appPages.home]
}
