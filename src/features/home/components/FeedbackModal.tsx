import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Check, Heart, Meh, Frown, Annoyed, Smile } from 'lucide-react'
import { useAppDispatch } from '../../../app/hooks'
import { closeFeedback } from '../../ui/uiSlice'
import { Modal } from '../../../components/ui/Modal'
import { feedbackSchema, type FeedbackValues } from '../feedbackSchema'
import '../home.css'

const ratingOptions = [
  { value: 1, label: 'Very unhappy', icon: Annoyed },
  { value: 2, label: 'Unhappy', icon: Frown },
  { value: 3, label: 'Neutral', icon: Meh },
  { value: 4, label: 'Happy', icon: Smile },
  { value: 5, label: 'Love it', icon: Heart },
]

export function FeedbackModal() {
  const dispatch = useAppDispatch()
  const { formState: { errors }, handleSubmit, register, setValue, watch } = useForm<FeedbackValues>({
    defaultValues: { rating: 0, suggestion: '' },
    resolver: zodResolver(feedbackSchema),
  })
  const selectedRating = watch('rating')

  const onSubmit = (_values: FeedbackValues) => {
    dispatch(closeFeedback())
  }

  return (
    <Modal title="More tools are coming!" onClose={() => dispatch(closeFeedback())}>
      <form className="feedback-form" onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="feedback-fieldset">
          <legend>Rate us</legend>
          <div className="rating-row">
            {ratingOptions.map(({ icon: Icon, label, value }) => (
              <button
                aria-label={label}
                className={`rating-button ${selectedRating === value ? 'is-selected' : ''}`}
                key={value}
                onClick={() => setValue('rating', value, { shouldValidate: true })}
                type="button"
              >
                <Icon aria-hidden="true" size={30} fill={value === 5 ? 'currentColor' : 'none'} />
              </button>
            ))}
          </div>
          {errors.rating && <p className="form-error">{errors.rating.message}</p>}
        </fieldset>
        <label className="feedback-label" htmlFor="suggestion">Tell us what you want next</label>
        <textarea
          id="suggestion"
          placeholder="What do you want next?"
          {...register('suggestion')}
        />
        {errors.suggestion && <p className="form-error">{errors.suggestion.message}</p>}
        <button className="feedback-submit" type="submit"><Check size={16} /> Leave a suggestion</button>
      </form>
    </Modal>
  )
}
