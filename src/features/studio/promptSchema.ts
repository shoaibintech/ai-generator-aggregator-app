import { z } from 'zod'

export const promptSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(8, 'Describe the video in at least 8 characters')
    .max(800, 'Keep the prompt under 800 characters'),
})

export type PromptValues = z.infer<typeof promptSchema>
