import React, { ReactNode } from 'react'
import { renderHook, act } from '@testing-library/react'
import { FavoritesProvider, useFavorites } from '../FavoritesContext'

describe('FavoritesContext', () => {
  it('should add and remove favorites', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <FavoritesProvider>{children}</FavoritesProvider>
    )
    const { result } = renderHook(() => useFavorites(), { wrapper })

    act(() => result.current.addFavorite('Harry Potter'))
    expect(result.current.favorites).toContain('Harry Potter')

    act(() => result.current.removeFavorite('Harry Potter'))
    expect(result.current.favorites).not.toContain('Harry Potter')
  })
})
