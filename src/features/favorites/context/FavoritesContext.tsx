'use client'

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'

interface FavoritesState {
  favorites: string[]
}

type FavoritesAction =
  | { type: 'ADD_FAVORITE'; payload: string }
  | { type: 'REMOVE_FAVORITE'; payload: string }
  | { type: 'LOAD_FAVORITES'; payload: string[] }

interface FavoritesContextType {
  favorites: string[]
  addFavorite: (characterName: string) => void
  removeFavorite: (characterName: string) => void
  isFavorite: (characterName: string) => boolean
  toggleFavorite: (characterName: string) => void
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

function favoritesReducer(state: FavoritesState, action: FavoritesAction): FavoritesState {
  switch (action.type) {
    case 'ADD_FAVORITE':
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      }
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter(name => name !== action.payload),
      }
    case 'LOAD_FAVORITES':
      return {
        ...state,
        favorites: action.payload,
      }
    default:
      return state
  }
}

interface FavoritesProviderProps {
  children: ReactNode
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [state, dispatch] = useReducer(favoritesReducer, { favorites: [] })

  const addFavorite = (characterName: string) => {
    if (!state.favorites.includes(characterName)) {
      dispatch({ type: 'ADD_FAVORITE', payload: characterName })
    }
  }

  const removeFavorite = (characterName: string) => {
    dispatch({ type: 'REMOVE_FAVORITE', payload: characterName })
  }

  const isFavorite = (characterName: string) => {
    return state.favorites.includes(characterName)
  }

  const toggleFavorite = (characterName: string) => {
    if (isFavorite(characterName)) {
      removeFavorite(characterName)
    } else {
      addFavorite(characterName)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedFavorites = localStorage.getItem('favoriteCharacters')
      if (savedFavorites) {
        try {
          const parsed = JSON.parse(savedFavorites)
          dispatch({ type: 'LOAD_FAVORITES', payload: parsed })
        } catch (error) {
          console.error('Error parsing favorites from localStorage:', error)
        }
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('favoriteCharacters', JSON.stringify(state.favorites))
    }
  }, [state.favorites])

  return (
    <FavoritesContext.Provider
      value={{
        favorites: state.favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}
