import { ChevronDown, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { openFeedback } from '../ui/uiSlice'
import { FeedbackModal } from './components/FeedbackModal'
import { GeneratorCard } from './components/GeneratorCard'
import { generatorCatalog, type Generator, type GeneratorCategory } from './generatorCatalog'
import moreToolsBanner from '../../assets/figma/home/more-tools-banner.png'
import './home.css'

type Filter = 'All' | GeneratorCategory

const filters: Array<{ label: Filter; count?: number }> = [
  { label: 'All' },
  { label: 'Create', count: 4 },
  { label: 'Engineering', count: 2 },
  { label: 'Research', count: 21 },
  { label: 'Learning', count: 18 },
]

export function HomePage() {
  const dispatch = useAppDispatch()
  const feedbackOpen = useAppSelector((state) => state.ui.feedbackOpen)
  const [activeFilter, setActiveFilter] = useState<Filter>('All')
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const visibleGenerators = useMemo(() => generatorCatalog.filter((generator) => {
    const categoryMatches = activeFilter === 'All' || generator.category === activeFilter
    const queryMatches = generator.name.toLowerCase().includes(query.toLowerCase()) || generator.description.toLowerCase().includes(query.toLowerCase())
    return categoryMatches && queryMatches
  }), [activeFilter, query])

  const handleGenerator = (generator: Generator) => {
    navigate(`/studio?tool=${generator.id}`)
  }

  return (
    <section className="home-page">
      <div className="home-content">
        <header className="home-heading">
          <h1>What would you like to create today?</h1>
          <div className="home-controls">
            <div className="filter-list" role="tablist" aria-label="Generator category">
              {filters.map(({ count, label }) => (
                <button
                  aria-selected={activeFilter === label}
                  className={`filter-chip ${activeFilter === label ? 'is-active' : ''}`}
                  key={label}
                  onClick={() => setActiveFilter(label)}
                  role="tab"
                  type="button"
                >
                  {label} {count && <b>{count}</b>}
                </button>
              ))}
            </div>
            <label className="search-box">
              <Search aria-hidden="true" size={18} />
              <span className="sr-only">Search generators</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search" type="search" />
            </label>
          </div>
        </header>

        <div className="generator-grid">
          {visibleGenerators.map((generator) => <GeneratorCard generator={generator} key={generator.id} onSelect={handleGenerator} />)}
        </div>

        <button className="view-more" type="button"><ChevronDown size={16} /> View More</button>

        <section className="more-tools-callout">
          <h2 className="sr-only">More tools are coming!</h2>
          <p className="sr-only">More tools are being built. Have a suggestion?</p>
          <img alt="" aria-hidden="true" src={moreToolsBanner} />
          <button aria-label="Leave a suggestion" className="more-tools-action" onClick={() => dispatch(openFeedback())} type="button" />
        </section>
      </div>
      {feedbackOpen && <FeedbackModal />}
    </section>
  )
}
