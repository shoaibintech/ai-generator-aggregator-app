import { useAppDispatch } from '../../../app/hooks'
import type { Generation } from '../../generations/generationsSlice'
import { selectGeneration } from '../../ui/uiSlice'
import { Skeleton } from '../../../components/ui/Skeleton'
import avatarsExploreGallery from '../../../assets/figma/references/gallery-avatars-explore.png'
import generationsAllGallery from '../../../assets/figma/references/gallery-generations-all.png'
import imageToVideoGallery from '../../../assets/figma/references/gallery-image-to-video.png'
import textToVideoGallery from '../../../assets/figma/references/gallery-text-to-video.png'
import mobileAvatarsGallery from '../../../assets/figma/references/mobile-gallery-avatars.png'
import mobileImageToVideoGallery from '../../../assets/figma/references/mobile-gallery-image-to-video.png'
import mobileTextToVideoGallery from '../../../assets/figma/references/mobile-gallery-text-to-video.png'
import '../studio.css'

export type GalleryTab = 'all' | 'image' | 'text' | 'avatars'

type MediaMasonryProps = {
  generations: Generation[]
  isLoading?: boolean
  tab: GalleryTab
  view: 'explore' | 'generations'
}

const galleryAssets: Record<Exclude<GalleryTab, 'all'>, { desktop: string; mobile: string }> = {
  image: { desktop: imageToVideoGallery, mobile: mobileImageToVideoGallery },
  text: { desktop: textToVideoGallery, mobile: mobileTextToVideoGallery },
  avatars: { desktop: avatarsExploreGallery, mobile: mobileAvatarsGallery },
}

export function MediaMasonry({ generations, isLoading = false, tab, view }: MediaMasonryProps) {
  const dispatch = useAppDispatch()

  if (isLoading) {
    return (
      <div aria-label="Loading generations" className="media-masonry media-masonry--loading">
        {Array.from({ length: 8 }, (_, index) => <Skeleton className={`media-skeleton media-skeleton--${index % 3}`} key={index} />)}
      </div>
    )
  }

  const selectedGallery = galleryAssets[tab === 'all' ? 'image' : tab]
  const gallery = view === 'generations' && tab !== 'avatars' ? generationsAllGallery : selectedGallery.desktop
  const mobileGallery = view === 'generations' && tab !== 'avatars' ? generationsAllGallery : selectedGallery.mobile
  const firstGeneration = generations[0]

  return <div className={`media-masonry media-masonry--snapshot media-masonry--${view} media-masonry--${tab}`}>
    <button aria-label={`Open ${firstGeneration?.alt ?? 'generation'}`} className="media-snapshot" onClick={() => firstGeneration && dispatch(selectGeneration(firstGeneration.id))} type="button">
      <picture>
        <source media="(max-width: 720px)" srcSet={mobileGallery} />
        <img alt="" src={gallery} />
      </picture>
    </button>
  </div>
}
