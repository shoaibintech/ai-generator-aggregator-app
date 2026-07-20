import type { Generator } from '../generatorCatalog'
import '../home.css'

type GeneratorCardProps = {
  generator: Generator
  onSelect: (generator: Generator) => void
}

export function GeneratorCard({ generator, onSelect }: GeneratorCardProps) {
  return (
    <button className="generator-card" onClick={() => onSelect(generator)} type="button">
      <img alt={`${generator.name}: ${generator.description}`} className="generator-card-desktop" src={generator.previewImage} />
      <img alt={`${generator.name}: ${generator.description}`} className="generator-card-mobile" src={generator.mobilePreviewImage ?? generator.previewImage} />
    </button>
  )
}
