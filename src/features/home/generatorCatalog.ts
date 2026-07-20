import {
  docsArtwork,
  imageArtwork,
  innovationArtwork,
  slidesArtwork,
  threeDArtwork,
  videoArtwork,
} from '../../assets/images'

export type GeneratorCategory = 'Create' | 'Engineering' | 'Research' | 'Learning'

export type Generator = {
  id: string
  name: string
  description: string
  category: GeneratorCategory
  artwork: string
}

export const generatorCatalog: Generator[] = [
  { id: 'image', name: 'Image Generation', description: 'Create stunning visuals from text descriptions using advanced AI models', category: 'Create', artwork: imageArtwork },
  { id: 'video', name: 'Video Generation', description: 'Generate short video clips and animations from prompts', category: 'Create', artwork: videoArtwork },
  { id: '3d', name: '3D Lab', description: 'AI-powered 3D model generation studio for games, printing & design', category: 'Engineering', artwork: threeDArtwork },
  { id: 'innovation', name: 'Innovation Hub', description: 'Describe an idea and AI will architect the system, features, and code', category: 'Engineering', artwork: innovationArtwork },
  { id: 'slides', name: 'Slides & Presentations', description: 'Generate professional slide decks and presentations with AI', category: 'Learning', artwork: slidesArtwork },
  { id: 'docs', name: 'Docs Lab', description: 'Generate READMEs, specs & docs in downloadable Markdown', category: 'Research', artwork: docsArtwork },
]
