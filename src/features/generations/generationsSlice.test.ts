import { describe, expect, it } from 'vitest'
import generationsReducer, { addGeneration, completeGeneration, updateGenerationProgress, type Generation } from './generationsSlice'

const mockGeneration: Generation = {
  id: 'test-generation',
  alt: 'Test generation',
  imageUrl: '/test-image.png',
  aspectRatio: 'landscape',
  kind: 'image',
  mediaType: 'video',
  prompt: 'A colorful test scene moving through a warm studio',
  model: 'Nano banana Pro',
  settings: { aspectRatio: '16:9', resolution: '360P', duration: '5s', audio: false, filter: 'None' },
  status: 'generating',
  progress: 12,
  createdAt: '2026-07-20T00:00:00.000Z',
}

describe('generationsSlice', () => {
  it('tracks mock generation progress through completion', () => {
    let state = generationsReducer(undefined, addGeneration(mockGeneration))
    state = generationsReducer(state, updateGenerationProgress({ id: mockGeneration.id, progress: 68 }))
    state = generationsReducer(state, completeGeneration(mockGeneration.id))

    expect(state.entities[mockGeneration.id]).toMatchObject({ status: 'complete', progress: 100 })
  })
})
