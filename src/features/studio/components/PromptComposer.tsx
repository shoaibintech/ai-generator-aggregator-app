import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { addImageIcon, aspectRatioIcon, durationIcon, filterIcon, resolutionIcon } from '../../../assets/images'
import { DropdownSelect, type DropdownOption } from '../../../shared/components/ui'
import { X } from '../../../shared/icons'
import {
  aspectRatioOptions,
  durationOptions,
  modelOptions,
  promptDefaults,
  promptSchema,
  resolutionOptions,
  type PromptValues,
} from '../promptSchema'
import '../studio.css'

type PromptMode = 'image' | 'text' | 'avatars'

interface PromptComposerProps {
  mode: PromptMode
  onGenerate: (values: PromptValues) => void
}

const maxAttachmentSize = 5 * 1024 * 1024

const toDropdownOptions = <TValue extends string>(values: readonly TValue[]): DropdownOption<TValue>[] => values.map((value) => ({ label: value, value }))

const aspectRatioDropdownOptions = toDropdownOptions(aspectRatioOptions)
const resolutionDropdownOptions = toDropdownOptions(resolutionOptions)
const durationDropdownOptions = toDropdownOptions(durationOptions)
const modelDropdownOptions = toDropdownOptions(modelOptions)
const filterDropdownOptions: DropdownOption<PromptValues['filter']>[] = [
  { label: 'Filter', value: 'None' },
  { label: 'Cinematic', value: 'Cinematic' },
  { label: 'Soft glow', value: 'Soft glow' },
]

export function PromptComposer({ mode, onGenerate }: PromptComposerProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [attachmentPreview, setAttachmentPreview] = useState<string>()
  const {
    clearErrors,
    control,
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
          <button className="composer-utility" onClick={() => inputRef.current?.click()} type="button"><img alt="" aria-hidden="true" className="composer-icon" src={addImageIcon} /> Add image</button>
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
          <Controller control={control} name="filter" render={({ field }) => <DropdownSelect ariaLabel="Filter" className="composer-select composer-select--filter" iconSrc={filterIcon} onValueChange={field.onChange} options={filterDropdownOptions} value={field.value} />} />
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
          <Controller control={control} name="aspectRatio" render={({ field }) => <DropdownSelect ariaLabel="Aspect ratio" className="composer-select" iconSrc={aspectRatioIcon} menuPosition="top" onValueChange={field.onChange} options={aspectRatioDropdownOptions} value={field.value} />} />
          <Controller control={control} name="resolution" render={({ field }) => <DropdownSelect ariaLabel="Resolution" className="composer-select" iconSrc={resolutionIcon} menuPosition="top" onValueChange={field.onChange} options={resolutionDropdownOptions} value={field.value} />} />
          <Controller control={control} name="duration" render={({ field }) => <DropdownSelect ariaLabel="Duration" className="composer-select" iconSrc={durationIcon} menuPosition="top" onValueChange={field.onChange} options={durationDropdownOptions} value={field.value} />} />
        </div>
        <div className="composer-cta">
          <Controller control={control} name="model" render={({ field }) => <DropdownSelect ariaLabel="Model" className="composer-select composer-select--model" menuPosition="top" onValueChange={field.onChange} options={modelDropdownOptions} value={field.value} />} />
          <button className="create-button" type="submit">Create</button>
        </div>
      </div>
      {(errors.prompt || errors.attachmentName) && <p className="composer-error">{errors.prompt?.message ?? errors.attachmentName?.message}</p>}
    </form>
  )
}
