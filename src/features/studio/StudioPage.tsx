import { Compass, FolderOpen } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { clearSelectedGeneration } from '../ui/uiSlice'
import { generationSelectors } from '../generations/generationsSlice'
import { GenerationDetail } from './components/GenerationDetail'
import { MediaMasonry, type GalleryTab } from './components/MediaMasonry'
import { PromptComposer } from './components/PromptComposer'
import type { PromptValues } from './promptSchema'
import './studio.css'

const exploreTabs: Array<{ id: Exclude<GalleryTab, 'all'>; label: string }> = [
  { id: 'image', label: 'Image to videos' },
  { id: 'text', label: 'Text to videos' },
  { id: 'avatars', label: 'AI avatars' },
]

const generationTabs: Array<{ id: GalleryTab; label: string }> = [
  { id: 'all', label: 'All' },
  ...exploreTabs,
]

export function StudioPage() {
  const [searchParams] = useSearchParams()
  const [activeExploreTab, setActiveExploreTab] = useState<Exclude<GalleryTab, 'all'>>('image')
  const [activeGenerationTab, setActiveGenerationTab] = useState<GalleryTab>('all')
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeView, setActiveView] = useState<'explore' | 'generations'>('explore')
  const dispatch = useAppDispatch()
  const generations = useAppSelector((state) => generationSelectors.selectAll(state.generations))
  const selectedGenerationId = useAppSelector((state) => state.ui.selectedGenerationId)
  const selectedGeneration = generations.find((generation) => generation.id === selectedGenerationId)
  const requestedTool = searchParams.get('tool')

  useEffect(() => {
    if (requestedTool === 'image' || requestedTool === 'video') setActiveExploreTab('image')
  }, [requestedTool])

  const handleGenerate = (_values: PromptValues) => {
    setIsGenerating(true)
    window.setTimeout(() => setIsGenerating(false), 850)
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
                const isActive = activeView === 'explore' ? activeExploreTab === tab.id : activeGenerationTab === tab.id
                return <button aria-selected={isActive} className={isActive ? 'is-active' : ''} key={tab.id} onClick={() => activeView === 'explore' ? setActiveExploreTab(tab.id as Exclude<GalleryTab, 'all'>) : setActiveGenerationTab(tab.id)} role="tab" type="button">{tab.label}</button>
              })}
            </div>
          </div>
          <div className="view-switcher" role="tablist" aria-label="Studio content view">
            <button aria-selected={activeView === 'explore'} className={activeView === 'explore' ? 'is-active' : ''} onClick={() => setActiveView('explore')} role="tab" type="button"><Compass size={16} /> Explore</button>
            <button aria-selected={activeView === 'generations'} className={activeView === 'generations' ? 'is-active' : ''} onClick={() => setActiveView('generations')} role="tab" type="button"><FolderOpen size={16} /> Generations</button>
          </div>
        </header>

        <MediaMasonry
          generations={generations}
          isLoading={activeView === 'explore' && isGenerating}
          tab={activeView === 'explore' ? activeExploreTab : activeGenerationTab}
          view={activeView}
        />
      </div>
      <PromptComposer mode={activeView === 'explore' ? activeExploreTab : activeGenerationTab === 'avatars' ? 'avatars' : 'image'} onGenerate={handleGenerate} />
      {selectedGeneration && <GenerationDetail generation={selectedGeneration} onClose={() => dispatch(clearSelectedGeneration())} />}
    </section>
  )
}
