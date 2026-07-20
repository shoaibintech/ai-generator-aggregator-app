import { describe, expect, it } from 'vitest'
import { promptDefaults, promptSchema } from './promptSchema'

describe('promptSchema', () => {
  it('requires enough context to create a video', () => {
    expect(promptSchema.safeParse({ ...promptDefaults, prompt: 'A dragon flying at dawn over a lake' }).success).toBe(true)
    expect(promptSchema.safeParse({ ...promptDefaults, prompt: 'dragon' }).success).toBe(false)
  })

  it('only accepts supported generation settings', () => {
    expect(promptSchema.safeParse({ ...promptDefaults, prompt: 'A bright character study in a sunlit studio', resolution: '4K' }).success).toBe(false)
  })
})
