export type GeneratorCategory = 'Create' | 'Engineering' | 'Research' | 'Learning'

export type Generator = {
  id: string
  name: string
  description: string
  category: GeneratorCategory
  accent: 'blue' | 'purple' | 'orange' | 'green' | 'yellow' | 'cyan'
}

export const generatorCatalog: Generator[] = [
  { id: 'image', name: 'Image Generation', description: 'Create stunning visuals from text descriptions using advanced AI models', category: 'Create', accent: 'blue' },
  { id: 'video', name: 'Video Generation', description: 'Generate short video clips and animations from prompts', category: 'Create', accent: 'purple' },
  { id: '3d', name: '3D Lab', description: 'AI-powered 3D model generation studio for games, printing & design', category: 'Engineering', accent: 'orange' },
  { id: 'innovation', name: 'Innovation Hub', description: 'Describe an idea and AI will architect the system, features, and code', category: 'Engineering', accent: 'green' },
  { id: 'slides', name: 'Slides & Presentations', description: 'Generate professional slide decks and presentations with AI', category: 'Learning', accent: 'yellow' },
  { id: 'docs', name: 'Docs Lab', description: 'Generate READMEs, specs & docs in downloadable Markdown', category: 'Research', accent: 'cyan' },
]
