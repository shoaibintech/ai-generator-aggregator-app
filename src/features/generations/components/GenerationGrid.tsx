import { useAppDispatch } from '../../../app/hooks'
import { Skeleton } from '../../../shared/components/ui'
import { selectGeneration } from '../../ui/uiSlice'
import type { Generation } from '../generationsSlice'
import '../generations.css'

type GenerationGridProps = {
  generations: Generation[]
  isLoading?: boolean
  variant: 'explore' | 'generations'
}

const loadingShapes = ['portrait', 'landscape', 'portrait', 'square', 'landscape', 'portrait']

export function GenerationGrid({ generations, isLoading = false, variant }: GenerationGridProps) {
  const dispatch = useAppDispatch()

  if (isLoading) {
    return (
      <div aria-busy="true" aria-label="Loading generations" className={`generation-grid generation-grid--${variant} generation-grid--loading`}>
        {loadingShapes.map((shape, index) => <Skeleton className={`generation-skeleton generation-skeleton--${shape}`} key={`${shape}-${index}`} />)}
      </div>
    )
  }

  if (!generations.length) {
    return <p className="generation-empty">No mock generations match that view yet.</p>
  }

  return (
    <div className={`generation-grid generation-grid--${variant}`}>
      {generations.map((generation) => (
        <article className={`generation-card generation-card--${generation.aspectRatio} generation-card--${generation.kind}`} key={generation.id}>
          <button aria-label={`Open generation: ${generation.prompt}`} className="generation-card-media" onClick={() => dispatch(selectGeneration(generation.id))} type="button">
            <img alt={generation.alt} src={generation.imageUrl} />
            {generation.status !== 'complete' && <span className="generation-card-progress"><i style={{ width: `${generation.progress}%` }} /><b>{generation.progress}%</b></span>}
            {generation.kind === 'avatars' && <span className="generation-avatar-name">{generation.avatarName}</span>}
          </button>
          <div className="generation-card-meta">
            <span>{generation.mediaType === 'video' ? 'Video' : 'Image'}</span>
            <p>{generation.prompt}</p>
          </div>
        </article>
      ))}
    </div>
  )
}
