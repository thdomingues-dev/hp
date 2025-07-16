import { cn, slugify, parseSlug, getHouseColors } from '../index'
import * as utils from '../index'

describe('Utils Index Exports', () => {
  it('should export all utility functions', () => {
    expect(typeof cn).toBe('function')
    expect(typeof slugify).toBe('function')
    expect(typeof parseSlug).toBe('function')
    expect(typeof getHouseColors).toBe('function')
  })

  it('should have exactly the expected exports', () => {
    const exportedKeys = Object.keys(utils).sort()
    const expectedKeys = ['cn', 'getHouseColors', 'parseSlug', 'slugify'].sort()

    expect(exportedKeys).toEqual(expectedKeys)
  })
})
