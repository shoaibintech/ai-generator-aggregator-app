import type { Generator } from '../generatorCatalog'
import '../home.css'

type GeneratorCardProps = {
  generator: Generator
  onSelect: (generator: Generator) => void
}

export function GeneratorCard({ generator, onSelect }: GeneratorCardProps) {
  return (
    <article className="generator-card">
      <img alt="" aria-hidden="true" className="generator-artwork" src={generator.artwork} />
      <div className="generator-copy">
        <strong>{generator.name}</strong>
        <span>{generator.description}</span>
      </div>
      <button aria-label={`Open ${generator.name}`} className="generator-card-action" onClick={() => onSelect(generator)} type="button" />
    </article>
  )
}
