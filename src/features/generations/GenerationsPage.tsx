import { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { Search } from '../../shared/icons'
import { clearSelectedGeneration } from '../ui/uiSlice'
import { GenerationDetailDialog } from './components/GenerationDetailDialog'
import { GenerationGrid } from './components/GenerationGrid'
import { generationSelectors } from './generationsSlice'
import './generations.css'

type Filter = 'All' | 'Images' | 'Videos'

export function GenerationsPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>('All')
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useAppDispatch()
  const generations = useAppSelector((state) => generationSelectors.selectAll(state.generations))
  const selectedGenerationId = useAppSelector((state) => state.ui.selectedGenerationId)
  const selectedGeneration = generations.find((generation) => generation.id === selectedGenerationId)

  useEffect(() => {
    setIsLoading(true)
    const timeout = window.setTimeout(() => setIsLoading(false), 440)
    return () => window.clearTimeout(timeout)
  }, [activeFilter, query])

  const visibleGenerations = useMemo(() => generations.filter((generation) => {
    const filterMatches = activeFilter === 'All' || (activeFilter === 'Images' ? generation.mediaType === 'image' : generation.mediaType === 'video')
    const normalizedQuery = query.trim().toLowerCase()
    const queryMatches = !normalizedQuery || generation.prompt.toLowerCase().includes(normalizedQuery) || generation.model.toLowerCase().includes(normalizedQuery)
    return filterMatches && queryMatches
  }), [activeFilter, generations, query])

  return (
    <section className="generations-page">
      <header className="generations-header">
        <div>
          <h1>Generations</h1>
          <div className="generation-filters" role="tablist" aria-label="Generation filters">
            {(['All', 'Images', 'Videos'] as Filter[]).map((filter) => <button aria-selected={activeFilter === filter} className={activeFilter === filter ? 'is-active' : ''} key={filter} onClick={() => setActiveFilter(filter)} role="tab" type="button">{filter}</button>)}
          </div>
        </div>
        <label className="generations-search"><Search size={17} /><span className="sr-only">Search generations</span><input onChange={(event) => setQuery(event.target.value)} placeholder="Search generations" type="search" value={query} /></label>
      </header>
      <GenerationGrid generations={visibleGenerations} isLoading={isLoading} variant="generations" />
      {selectedGeneration && <GenerationDetailDialog generation={selectedGeneration} onClose={() => dispatch(clearSelectedGeneration())} />}
    </section>
  )
}
