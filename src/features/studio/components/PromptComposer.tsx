import { zodResolver } from '@hookform/resolvers/zod'
import { ImagePlus, SlidersHorizontal, Sparkles } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { promptSchema, type PromptValues } from '../promptSchema'
import '../studio.css'

type PromptComposerProps = {
  mode: 'image' | 'text' | 'avatars'
  onGenerate: (values: PromptValues) => void
}

export function PromptComposer({ mode, onGenerate }: PromptComposerProps) {
  const { formState: { errors }, handleSubmit, register } = useForm<PromptValues>({
    defaultValues: { prompt: '' },
    resolver: zodResolver(promptSchema),
  })

  return (
    <form className={`prompt-composer prompt-composer--${mode}`} onSubmit={handleSubmit(onGenerate)}>
      <div className="composer-topline">
        <div className="composer-actions">
          {mode !== 'text' && <button className="composer-utility" type="button"><ImagePlus size={16} /> Add image</button>}
          {mode === 'avatars' && <button className="composer-utility" type="button">◖ Add Audio</button>}
        </div>
        {mode !== 'avatars' && <div className="composer-actions">
          <label className="audio-toggle">Audio <input type="checkbox" /><span aria-hidden="true" /></label>
          <button className="composer-utility" type="button"><SlidersHorizontal size={14} /> Filter</button>
        </div>}
      </div>
      <textarea aria-invalid={Boolean(errors.prompt)} placeholder={mode === 'avatars' ? 'Describe your character to look and behaviour...' : 'Describe the video you want to create...'} {...register('prompt')} />
      <div className="composer-bottomline">
        <div className="prompt-settings" aria-label="Video settings">
          {mode === 'avatars' ? <><button type="button">▥ Voice</button><label className="audio-toggle">Original Audio <input type="checkbox" /><span aria-hidden="true" /></label><button type="button"><SlidersHorizontal size={14} /> Filter</button></> : <><button type="button">▣ 16:9</button><button type="button">◈ 360P</button><button type="button">◷ 5s</button></>}
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
