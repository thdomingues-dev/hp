import React, { ReactNode } from 'react'
import { renderHook, act } from '@testing-library/react'
import { HouseProvider, useHouse } from '../context/HouseContext'

describe('HouseContext', () => {
  it('should set and clear selected house', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <HouseProvider>{children}</HouseProvider>
    )
    const { result } = renderHook(() => useHouse(), { wrapper })

    act(() => result.current.setSelectedHouse('Gryffindor'))
    expect(result.current.selectedHouse).toBe('Gryffindor')

    act(() => result.current.setSelectedHouse(null))
    expect(result.current.selectedHouse).toBeNull()
  })
})
