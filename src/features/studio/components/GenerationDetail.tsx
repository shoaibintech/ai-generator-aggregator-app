import { Download, RotateCcw, X } from 'lucide-react'
import type { Generation } from '../../generations/generationsSlice'
import '../studio.css'

type GenerationDetailProps = {
  generation: Generation
  onClose: () => void
}

export function GenerationDetail({ generation, onClose }: GenerationDetailProps) {
  return (
    <div className="detail-overlay" role="presentation" onMouseDown={onClose}>
      <aside aria-label="Generation details" className="generation-detail" onMouseDown={(event) => event.stopPropagation()}>
        <button aria-label="Close details" className="detail-close" onClick={onClose} type="button"><X size={19} /></button>
        <img alt={generation.alt} className="detail-image" src={generation.imageUrl} />
        <div className="detail-body">
          <span className="detail-eyebrow">Generation</span>
          <h2>{generation.model}</h2>
          <p>{generation.prompt}</p>
          <div className="detail-actions">
            <button type="button"><RotateCcw size={16} /> Remix</button>
            <button type="button"><Download size={16} /> Download</button>
          </div>
        </div>
      </aside>
    </div>
  )
}
