import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Check } from 'lucide-react'
import { useAppDispatch } from '../../../app/hooks'
import { closeFeedback } from '../../ui/uiSlice'
import { Modal } from '../../../components/ui/Modal'
import { feedbackSchema, type FeedbackValues } from '../feedbackSchema'
import angryRating from '../../../assets/figma/home/rating-angry.png'
import blushRating from '../../../assets/figma/home/rating-blush.png'
import heartEyesRating from '../../../assets/figma/home/rating-heart-eyes.png'
import neutralRating from '../../../assets/figma/home/rating-neutral.png'
import smirkRating from '../../../assets/figma/home/rating-smirk.png'
import '../home.css'

const ratingOptions = [
  { value: 1, label: 'Very unhappy', image: angryRating },
  { value: 2, label: 'Unhappy', image: smirkRating },
  { value: 3, label: 'Neutral', image: neutralRating },
  { value: 4, label: 'Happy', image: blushRating },
  { value: 5, label: 'Love it', image: heartEyesRating },
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
            {ratingOptions.map(({ image, label, value }) => (
              <button
                aria-label={label}
                className={`rating-button ${selectedRating === value ? 'is-selected' : ''}`}
                key={value}
                onClick={() => setValue('rating', value, { shouldValidate: true })}
                type="button"
              >
                <img alt="" aria-hidden="true" src={image} />
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
