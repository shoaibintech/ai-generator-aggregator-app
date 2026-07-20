import { describe, expect, it } from 'vitest'
import { getPageMetadata } from './pageMetadata'

describe('getPageMetadata', () => {
  it('uses the selected tool name for studio document titles', () => {
    expect(getPageMetadata('/studio', '?tool=3d').title).toBe('3D Lab · Video Lab')
  })

  it('returns the expected page title for top-level routes', () => {
    expect(getPageMetadata('/', '').title).toBe('Home · Video Lab')
    expect(getPageMetadata('/generations', '').title).toBe('Generations · Video Lab')
  })
})
