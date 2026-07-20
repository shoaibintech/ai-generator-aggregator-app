import { ArrowUpRight, Image, Play, Sparkles } from 'lucide-react'
import type { Generator } from '../generatorCatalog'
import '../home.css'

type GeneratorCardProps = {
  generator: Generator
  onSelect: (generator: Generator) => void
}

export function GeneratorCard({ generator, onSelect }: GeneratorCardProps) {
  return (
    <button className="generator-card" onClick={() => onSelect(generator)} type="button">
      <span className={`generator-art generator-art--${generator.accent}`} aria-hidden="true">
        <span className="art-grid" />
        {generator.accent === 'blue' && <><span className="art-image-panel"><Image size={15} /><span>Generate</span></span><span className="art-burst art-burst--one" /></>}
        {generator.accent === 'purple' && <><span className="art-browser"><Play fill="currentColor" size={19} /><Play fill="currentColor" size={17} /><Play fill="currentColor" size={19} /></span><span className="art-tag">Generate</span></>}
        {generator.accent === 'orange' && <><span className="art-3d-window"><span>Image to 3D</span><b><Sparkles size={18} /></b><i /><i /><i /><i /></span></>}
        {generator.accent === 'green' && <><span className="art-prompt"><em>Multi-step AI research with citations &amp;<br />PDF export</em><b><ArrowUpRight size={13} /></b></span></>}
        {generator.accent === 'yellow' && <><span className="art-slides"><i /><i /><i /></span></>}
        {generator.accent === 'cyan' && <><span className="art-docs"><span /><span /><span /><span /></span></>}
      </span>
      <span className="generator-copy">
        <strong>{generator.name}</strong>
        <span>{generator.description}</span>
      </span>
    </button>
  )
}
