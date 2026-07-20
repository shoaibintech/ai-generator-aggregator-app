import { describe, expect, it } from 'vitest'
import { feedbackSchema } from './feedbackSchema'

describe('feedbackSchema', () => {
  it('accepts a rated, useful suggestion', () => {
    expect(feedbackSchema.safeParse({ rating: 5, suggestion: 'Please add an avatar creation workflow.' }).success).toBe(true)
  })

  it('requires a rating and meaningful suggestion', () => {
    expect(feedbackSchema.safeParse({ rating: 0, suggestion: 'no' }).success).toBe(false)
  })
})
