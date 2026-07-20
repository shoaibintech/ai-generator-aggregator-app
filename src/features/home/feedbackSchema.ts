import { z } from 'zod'

export const feedbackSchema = z.object({
  rating: z.number().min(1, 'Select a rating'),
  suggestion: z
    .string()
    .trim()
    .min(8, 'Please share at least 8 characters')
    .max(600, 'Keep your suggestion under 600 characters'),
})

export type FeedbackValues = z.infer<typeof feedbackSchema>
