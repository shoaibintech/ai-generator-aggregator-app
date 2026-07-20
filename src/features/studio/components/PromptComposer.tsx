import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ImagePlus, SlidersHorizontal, Sparkles, X } from '../../../shared/icons'
import {
  aspectRatioOptions,
  durationOptions,
  filterOptions,
  modelOptions,
  promptDefaults,
  promptSchema,
  resolutionOptions,
  type PromptValues,
} from '../promptSchema'
import '../studio.css'

type PromptComposerProps = {
  mode: 'image' | 'text' | 'avatars'
  onGenerate: (values: PromptValues) => void
}

const maxAttachmentSize = 5 * 1024 * 1024

export function PromptComposer({ mode, onGenerate }: PromptComposerProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [attachmentPreview, setAttachmentPreview] = useState<string>()
  const {
    clearErrors,
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setError,
    setValue,
    watch,
  } = useForm<PromptValues>({
    defaultValues: promptDefaults,
    resolver: zodResolver(promptSchema),
  })
  const attachmentName = watch('attachmentName')

  useEffect(() => () => {
    if (attachmentPreview) URL.revokeObjectURL(attachmentPreview)
  }, [attachmentPreview])

  const removeAttachment = () => {
    if (attachmentPreview) URL.revokeObjectURL(attachmentPreview)
    setAttachmentPreview(undefined)
    setValue('attachmentName', undefined)
    setValue('attachmentPreview', undefined)
    clearErrors('attachmentName')
    if (inputRef.current) inputRef.current.value = ''
  }

  const handleAttachment = (file?: File) => {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('attachmentName', { message: 'Choose an image file (PNG, JPG, or WebP).' })
      return
    }
    if (file.size > maxAttachmentSize) {
      setError('attachmentName', { message: 'The image must be 5 MB or smaller.' })
      return
    }

    if (attachmentPreview) URL.revokeObjectURL(attachmentPreview)
    const preview = URL.createObjectURL(file)
    setAttachmentPreview(preview)
    setValue('attachmentName', file.name, { shouldValidate: true })
    setValue('attachmentPreview', preview)
    clearErrors('attachmentName')
  }

  const submit = (values: PromptValues) => {
    onGenerate(values)
    reset(promptDefaults)
    removeAttachment()
  }

  return (
    <form className={`prompt-composer prompt-composer--${mode}`} onSubmit={handleSubmit(submit)}>
      <div className="composer-topline">
        <div className="composer-actions">
          <button className="composer-utility" onClick={() => inputRef.current?.click()} type="button"><ImagePlus size={16} /> Add image</button>
          <input
            accept="image/png,image/jpeg,image/webp"
            aria-label="Attach a reference image"
            className="composer-file-input"
            onChange={(event) => handleAttachment(event.target.files?.[0])}
            ref={inputRef}
            type="file"
          />
          {mode === 'avatars' && <label className="audio-toggle">Add audio<input {...register('audio')} type="checkbox" /><span aria-hidden="true" /></label>}
        </div>
        <div className="composer-actions">
          {mode !== 'avatars' && <label className="audio-toggle">Audio<input {...register('audio')} type="checkbox" /><span aria-hidden="true" /></label>}
          <label className="composer-select composer-select--filter"><SlidersHorizontal size={14} /><span className="sr-only">Filter</span><select aria-label="Filter" {...register('filter')}>{filterOptions.map((filter) => <option key={filter} value={filter}>{filter === 'None' ? 'Filter' : filter}</option>)}</select></label>
        </div>
      </div>

      {attachmentName && (
        <div className="composer-attachment">
          {attachmentPreview && <img alt="Selected reference" src={attachmentPreview} />}
          <span>{attachmentName}</span>
          <button aria-label="Remove reference image" onClick={removeAttachment} type="button"><X size={13} /></button>
        </div>
      )}

      <textarea
        aria-invalid={Boolean(errors.prompt)}
        placeholder={mode === 'avatars' ? 'Describe your character, voice, and behaviour...' : 'Describe the video you want to create...'}
        {...register('prompt')}
      />

      <div className="composer-bottomline">
        <div className="prompt-settings" aria-label="Video settings">
          <label className="composer-select"><span className="sr-only">Aspect ratio</span><select aria-label="Aspect ratio" {...register('aspectRatio')}>{aspectRatioOptions.map((value) => <option key={value} value={value}>{value}</option>)}</select></label>
          <label className="composer-select"><span className="sr-only">Resolution</span><select aria-label="Resolution" {...register('resolution')}>{resolutionOptions.map((value) => <option key={value} value={value}>{value}</option>)}</select></label>
          <label className="composer-select"><span className="sr-only">Duration</span><select aria-label="Duration" {...register('duration')}>{durationOptions.map((value) => <option key={value} value={value}>{value}</option>)}</select></label>
        </div>
        <div className="composer-cta">
          <label className="composer-select composer-select--model"><span className="sr-only">Model</span><select aria-label="Model" {...register('model')}>{modelOptions.map((value) => <option key={value} value={value}>{value}</option>)}</select></label>
          <button className="create-button" type="submit"><Sparkles size={15} /> Create</button>
        </div>
      </div>
      {(errors.prompt || errors.attachmentName) && <p className="composer-error">{errors.prompt?.message ?? errors.attachmentName?.message}</p>}
    </form>
  )
}
