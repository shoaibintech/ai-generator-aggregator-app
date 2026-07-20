import { Compass, FolderOpen } from 'lucide-react'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { clearSelectedGeneration } from '../ui/uiSlice'
import { generationSelectors } from '../generations/generationsSlice'
import { GenerationDetail } from './components/GenerationDetail'
import { MediaMasonry } from './components/MediaMasonry'
import { PromptComposer } from './components/PromptComposer'
import type { PromptValues } from './promptSchema'
import './studio.css'

const tabs = ['Image to videos', 'Text to videos', 'AI avatars']

export function StudioPage() {
  const [searchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeView, setActiveView] = useState<'explore' | 'generations'>('explore')
  const dispatch = useAppDispatch()
  const generations = useAppSelector((state) => generationSelectors.selectAll(state.generations))
  const selectedGenerationId = useAppSelector((state) => state.ui.selectedGenerationId)
  const selectedGeneration = generations.find((generation) => generation.id === selectedGenerationId)
  const requestedTool = searchParams.get('tool')

  const handleGenerate = (_values: PromptValues) => {
    setIsGenerating(true)
    window.setTimeout(() => setIsGenerating(false), 850)
  }

  return (
    <section className="studio-page">
      <div className="studio-content">
        <header className="studio-header">
          <div>
            <h1>Turn ideas into videos <span>instantly</span></h1>
            {requestedTool && requestedTool !== 'video' && <p className="studio-context">{requestedTool.replace('-', ' ')} selected</p>}
            <div className="studio-tabs" role="tablist" aria-label="Video creation type">
              {tabs.map((tab, index) => <button aria-selected={activeTab === index} className={activeTab === index ? 'is-active' : ''} key={tab} onClick={() => setActiveTab(index)} role="tab" type="button">{tab}</button>)}
            </div>
          </div>
          <div className="view-switcher" role="tablist" aria-label="Studio content view">
            <button aria-selected={activeView === 'explore'} className={activeView === 'explore' ? 'is-active' : ''} onClick={() => setActiveView('explore')} role="tab" type="button"><Compass size={16} /> Explore</button>
            <button aria-selected={activeView === 'generations'} className={activeView === 'generations' ? 'is-active' : ''} onClick={() => setActiveView('generations')} role="tab" type="button"><FolderOpen size={16} /> Generations</button>
          </div>
        </header>

        {activeView === 'explore' ? <MediaMasonry generations={generations} isLoading={isGenerating} /> : <MediaMasonry generations={generations.slice(0, 5)} />}
      </div>
      <PromptComposer onGenerate={handleGenerate} />
      {selectedGeneration && <GenerationDetail generation={selectedGeneration} onClose={() => dispatch(clearSelectedGeneration())} />}
    </section>
  )
}
