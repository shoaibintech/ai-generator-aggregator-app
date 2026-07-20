import documentGenerationCard from '../../assets/figma/home/document-generation-card.png'
import imageGenerationCard from '../../assets/figma/home/image-generation-card.png'
import innovationLabCard from '../../assets/figma/home/innovation-lab-card.png'
import mobileImageGenerationCard from '../../assets/figma/home/mobile-image-generation-card.png'
import mobileInnovationLabCard from '../../assets/figma/home/mobile-innovation-lab-card.png'
import mobileThreedGenerationCard from '../../assets/figma/home/mobile-threed-generation-card.png'
import mobileVideoCreationCard from '../../assets/figma/home/mobile-video-creation-card.png'
import slidesGenerationCard from '../../assets/figma/home/slides-generation-card.png'
import threedGenerationCard from '../../assets/figma/home/threed-generation-card.png'
import videoCreationCard from '../../assets/figma/home/video-creation-card.png'

export type GeneratorCategory = 'Create' | 'Engineering' | 'Research' | 'Learning'

export type Generator = {
  id: string
  name: string
  description: string
  category: GeneratorCategory
  previewImage: string
  mobilePreviewImage?: string
}

export const generatorCatalog: Generator[] = [
  { id: 'image', name: 'Image Generation', description: 'Create stunning visuals from text descriptions using advanced AI models', category: 'Create', previewImage: imageGenerationCard, mobilePreviewImage: mobileImageGenerationCard },
  { id: 'video', name: 'Video Generation', description: 'Generate short video clips and animations from prompts', category: 'Create', previewImage: videoCreationCard, mobilePreviewImage: mobileVideoCreationCard },
  { id: '3d', name: '3D Lab', description: 'AI-powered 3D model generation studio for games, printing & design', category: 'Engineering', previewImage: threedGenerationCard, mobilePreviewImage: mobileThreedGenerationCard },
  { id: 'innovation', name: 'Innovation Hub', description: 'Describe an idea and AI will architect the system, features, and code', category: 'Engineering', previewImage: innovationLabCard, mobilePreviewImage: mobileInnovationLabCard },
  { id: 'slides', name: 'Slides & Presentations', description: 'Generate professional slide decks and presentations with AI', category: 'Learning', previewImage: slidesGenerationCard },
  { id: 'docs', name: 'Docs Lab', description: 'Generate READMEs, specs & docs in downloadable Markdown', category: 'Research', previewImage: documentGenerationCard },
]
