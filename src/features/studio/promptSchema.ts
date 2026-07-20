import { z } from 'zod'

export const aspectRatioOptions = ['16:9', '9:16', '1:1'] as const
export const resolutionOptions = ['360P', '720P', '1080P'] as const
export const durationOptions = ['5s', '10s', '15s'] as const
export const modelOptions = ['Nano banana Pro', 'Kling 1.6', 'Runway Gen-4'] as const
export const filterOptions = ['None', 'Cinematic', 'Soft glow'] as const

export const promptSchema = z.object({
  prompt: z
    .string()
    .trim()
    .min(8, 'Describe the video in at least 8 characters')
    .max(800, 'Keep the prompt under 800 characters'),
  aspectRatio: z.enum(aspectRatioOptions),
  resolution: z.enum(resolutionOptions),
  duration: z.enum(durationOptions),
  model: z.enum(modelOptions),
  audio: z.boolean(),
  filter: z.enum(filterOptions),
  attachmentName: z.string().max(120).optional(),
  attachmentPreview: z.string().url().optional(),
})

export type PromptValues = z.infer<typeof promptSchema>

export const promptDefaults: PromptValues = {
  prompt: '',
  aspectRatio: '16:9',
  resolution: '360P',
  duration: '5s',
  model: 'Nano banana Pro',
  audio: false,
  filter: 'None',
}
