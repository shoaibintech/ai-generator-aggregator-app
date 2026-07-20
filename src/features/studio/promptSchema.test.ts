import { describe, expect, it } from 'vitest'
import { promptSchema } from './promptSchema'

describe('promptSchema', () => {
  it('requires enough context to create a video', () => {
    expect(promptSchema.safeParse({ prompt: 'A dragon flying at dawn over a lake' }).success).toBe(true)
    expect(promptSchema.safeParse({ prompt: 'dragon' }).success).toBe(false)
  })
})
