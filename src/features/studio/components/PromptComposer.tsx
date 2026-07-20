import { zodResolver } from '@hookform/resolvers/zod'
import { ImagePlus, SlidersHorizontal, Sparkles } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { promptSchema, type PromptValues } from '../promptSchema'
import '../studio.css'

type PromptComposerProps = {
  onGenerate: (values: PromptValues) => void
}

export function PromptComposer({ onGenerate }: PromptComposerProps) {
  const { formState: { errors }, handleSubmit, register } = useForm<PromptValues>({
    defaultValues: { prompt: '' },
    resolver: zodResolver(promptSchema),
  })

  return (
    <form className="prompt-composer" onSubmit={handleSubmit(onGenerate)}>
      <div className="composer-topline">
        <button className="composer-utility" type="button"><ImagePlus size={16} /> Add image</button>
        <div className="composer-actions">
          <label className="audio-toggle">Audio <input type="checkbox" /><span aria-hidden="true" /></label>
          <button className="composer-utility" type="button"><SlidersHorizontal size={14} /> Filter</button>
        </div>
      </div>
      <textarea aria-invalid={Boolean(errors.prompt)} placeholder="Describe the video you want to create..." {...register('prompt')} />
      <div className="composer-bottomline">
        <div className="prompt-settings" aria-label="Video settings">
          <button type="button">▣ 16:9</button>
          <button type="button">◈ 360P</button>
          <button type="button">◷ 5s</button>
        </div>
        <div className="composer-cta">
          <span>Nano banana Pro</span>
          <button className="create-button" type="submit"><Sparkles size={15} /> Create</button>
        </div>
      </div>
      {errors.prompt && <p className="composer-error">{errors.prompt.message}</p>}
    </form>
  )
}
