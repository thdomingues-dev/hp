'use client'

import { ReactNode } from 'react'
import { HouseProvider } from '@/features/houses/context/HouseContext'
import { FavoritesProvider } from '@/features/favorites/context/FavoritesContext'

interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <HouseProvider>
      <FavoritesProvider>{children}</FavoritesProvider>
    </HouseProvider>
  )
}
