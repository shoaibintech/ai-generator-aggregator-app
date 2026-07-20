import { Search } from 'lucide-react'
import { useAppSelector } from '../../app/hooks'
import { generationSelectors } from './generationsSlice'
import { MediaMasonry } from '../studio/components/MediaMasonry'
import './generations.css'

export function GenerationsPage() {
  const generations = useAppSelector((state) => generationSelectors.selectAll(state.generations))

  return (
    <section className="generations-page">
      <header className="generations-header">
        <div>
          <h1>Generations</h1>
          <div className="generation-filters"><button className="is-active" type="button">All</button><button type="button">Images</button><button type="button">Videos</button></div>
        </div>
        <label className="generations-search"><Search size={17} /><span className="sr-only">Search generations</span><input placeholder="Search generations" type="search" /></label>
      </header>
      <MediaMasonry generations={generations} />
    </section>
  )
}
