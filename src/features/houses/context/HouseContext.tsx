'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { HouseName } from '@/features/ui/types/api'

interface HouseContextType {
  selectedHouse: HouseName | null
  setSelectedHouse: (house: HouseName | null) => void
}

const HouseContext = createContext<HouseContextType | undefined>(undefined)

interface HouseProviderProps {
  children: ReactNode
}

export function HouseProvider({ children }: HouseProviderProps) {
  const [selectedHouse, setSelectedHouse] = useState<HouseName | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedHouse = localStorage.getItem('selectedHouse') as HouseName | null
      if (savedHouse) {
        setSelectedHouse(savedHouse)
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (selectedHouse) {
        localStorage.setItem('selectedHouse', selectedHouse)
      } else {
        localStorage.removeItem('selectedHouse')
      }
    }
  }, [selectedHouse])

  return (
    <HouseContext.Provider value={{ selectedHouse, setSelectedHouse }}>
      {children}
    </HouseContext.Provider>
  )
}

export function useHouse() {
  const context = useContext(HouseContext)
  if (context === undefined) {
    throw new Error('useHouse must be used within a HouseProvider')
  }
  return context
}
