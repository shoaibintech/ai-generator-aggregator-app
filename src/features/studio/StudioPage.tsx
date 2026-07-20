import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { Compass, FolderOpen } from '../../shared/icons'
import {
  addGeneration,
  completeGeneration,
  generationSelectors,
  mockGenerationImages,
  updateGenerationProgress,
  type Generation,
  type GenerationAspectRatio,
  type GenerationKind,
} from '../generations/generationsSlice'
import { GenerationDetailDialog } from '../generations/components/GenerationDetailDialog'
import { GenerationGrid } from '../generations/components/GenerationGrid'
import { clearSelectedGeneration, selectGeneration } from '../ui/uiSlice'
import { PromptComposer } from './components/PromptComposer'
import type { PromptValues } from './promptSchema'
import './studio.css'

type GalleryTab = 'all' | GenerationKind

const exploreTabs: Array<{ id: GenerationKind; label: string }> = [
  { id: 'image', label: 'Image to videos' },
  { id: 'text', label: 'Text to videos' },
  { id: 'avatars', label: 'AI avatars' },
]

const generationTabs: Array<{ id: GalleryTab; label: string }> = [
  { id: 'all', label: 'All' },
  ...exploreTabs,
]

const toAspectRatio = (value: PromptValues['aspectRatio']): GenerationAspectRatio => {
  if (value === '9:16') return 'portrait'
  if (value === '1:1') return 'square'
  return 'landscape'
}

export function StudioPage() {
  const [searchParams] = useSearchParams()
  const [activeExploreTab, setActiveExploreTab] = useState<GenerationKind>('image')
  const [activeGenerationTab, setActiveGenerationTab] = useState<GalleryTab>('all')
  const [activeView, setActiveView] = useState<'explore' | 'generations'>('explore')
  const [isGalleryLoading, setIsGalleryLoading] = useState(true)
  const dispatch = useAppDispatch()
  const generations = useAppSelector((state) => generationSelectors.selectAll(state.generations))
  const selectedGenerationId = useAppSelector((state) => state.ui.selectedGenerationId)
  const selectedGeneration = generations.find((generation) => generation.id === selectedGenerationId)
  const requestedTool = searchParams.get('tool')

  useEffect(() => {
    if (requestedTool === 'image' || requestedTool === 'video') setActiveExploreTab('image')
    if (requestedTool === '3d' || requestedTool === 'docs') setActiveView('explore')
  }, [requestedTool])

  useEffect(() => {
    setIsGalleryLoading(true)
    const timeout = window.setTimeout(() => setIsGalleryLoading(false), 520)
    return () => window.clearTimeout(timeout)
  }, [activeExploreTab, activeGenerationTab, activeView])

  const currentTab = activeView === 'explore' ? activeExploreTab : activeGenerationTab
  const visibleGenerations = useMemo(() => (
    currentTab === 'all' ? generations : generations.filter((generation) => generation.kind === currentTab)
  ), [currentTab, generations])

  const handleGenerate = (values: PromptValues) => {
    const kind: GenerationKind = activeView === 'explore' ? activeExploreTab : activeGenerationTab === 'all' ? 'image' : activeGenerationTab
    const id = `mock-${Date.now()}`
    const generation: Generation = {
      id,
      alt: values.prompt,
      imageUrl: mockGenerationImages[generations.length % mockGenerationImages.length],
      aspectRatio: toAspectRatio(values.aspectRatio),
      kind,
      mediaType: 'video',
      prompt: values.prompt,
      model: values.model,
      settings: {
        aspectRatio: values.aspectRatio,
        resolution: values.resolution,
        duration: values.duration,
        audio: values.audio,
        filter: values.filter,
        attachmentName: values.attachmentName,
      },
      status: 'generating',
      progress: 12,
      createdAt: new Date().toISOString(),
      avatarName: kind === 'avatars' ? 'New avatar' : undefined,
    }
    dispatch(addGeneration(generation))
    dispatch(selectGeneration(id))
    window.setTimeout(() => dispatch(updateGenerationProgress({ id, progress: 46 })), 450)
    window.setTimeout(() => dispatch(updateGenerationProgress({ id, progress: 79 })), 950)
    window.setTimeout(() => dispatch(completeGeneration(id)), 1_450)
  }

  return (
    <section className={`studio-page studio-page--${activeView}`}>
      <div className="studio-content">
        <header className="studio-header">
          <div>
            {activeView === 'explore' ? <h1>Turn ideas into videos <span>instantly</span></h1> : <h1>Generations</h1>}
            {activeView === 'explore' && requestedTool && !['video', 'image'].includes(requestedTool) && <p className="studio-context">{requestedTool.replace('-', ' ')} selected</p>}
            <div className="studio-tabs" role="tablist" aria-label={activeView === 'explore' ? 'Video creation type' : 'Generation type'}>
              {(activeView === 'explore' ? exploreTabs : generationTabs).map((tab) => {
                const isActive = currentTab === tab.id
                return <button aria-selected={isActive} className={isActive ? 'is-active' : ''} key={tab.id} onClick={() => activeView === 'explore' ? setActiveExploreTab(tab.id as GenerationKind) : setActiveGenerationTab(tab.id)} role="tab" type="button">{tab.label}</button>
              })}
            </div>
          </div>
          <div className="view-switcher" role="tablist" aria-label="Studio content view">
            <button aria-selected={activeView === 'explore'} className={activeView === 'explore' ? 'is-active' : ''} onClick={() => setActiveView('explore')} role="tab" type="button"><Compass size={16} /> Explore</button>
            <button aria-selected={activeView === 'generations'} className={activeView === 'generations' ? 'is-active' : ''} onClick={() => setActiveView('generations')} role="tab" type="button"><FolderOpen size={16} /> Generations</button>
          </div>
        </header>

        <GenerationGrid generations={visibleGenerations} isLoading={isGalleryLoading} variant={activeView} />
      </div>
      <PromptComposer mode={activeView === 'explore' ? activeExploreTab : activeGenerationTab === 'avatars' ? 'avatars' : 'image'} onGenerate={handleGenerate} />
      {selectedGeneration && <GenerationDetailDialog generation={selectedGeneration} onClose={() => dispatch(clearSelectedGeneration())} />}
    </section>
  )
}
