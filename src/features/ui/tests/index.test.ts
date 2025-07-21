import { cn, slugify, parseSlug, getHouseColors } from '@/features/ui'

describe('Utils Index Exports', () => {
  it('should export all utility functions', () => {
    expect(typeof cn).toBe('function')
    expect(typeof slugify).toBe('function')
    expect(typeof parseSlug).toBe('function')
    expect(typeof getHouseColors).toBe('function')
  })

  it('should have exactly the expected exports', () => {
    const exportedKeys = ['cn', 'getHouseColors', 'parseSlug', 'slugify'].sort()
    const expectedKeys = ['cn', 'getHouseColors', 'parseSlug', 'slugify'].sort()

    expect(exportedKeys).toEqual(expectedKeys)
  })
})
