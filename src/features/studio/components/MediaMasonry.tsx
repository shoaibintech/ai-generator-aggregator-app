import { useAppDispatch } from '../../../app/hooks'
import type { Generation } from '../../generations/generationsSlice'
import { selectGeneration } from '../../ui/uiSlice'
import { Skeleton } from '../../../components/ui/Skeleton'
import '../studio.css'

type MediaMasonryProps = {
  generations: Generation[]
  isLoading?: boolean
}

export function MediaMasonry({ generations, isLoading = false }: MediaMasonryProps) {
  const dispatch = useAppDispatch()

  if (isLoading) {
    return (
      <div aria-label="Loading generations" className="media-masonry media-masonry--loading">
        {Array.from({ length: 8 }, (_, index) => <Skeleton className={`media-skeleton media-skeleton--${index % 3}`} key={index} />)}
      </div>
    )
  }

  return (
    <div className="media-masonry">
      {generations.map((generation) => (
        <button
          aria-label={`Open ${generation.alt}`}
          className={`media-tile media-tile--${generation.aspectRatio}`}
          key={generation.id}
          onClick={() => dispatch(selectGeneration(generation.id))}
          type="button"
        >
          <img alt={generation.alt} loading="lazy" src={generation.imageUrl} />
        </button>
      ))}
    </div>
  )
}
