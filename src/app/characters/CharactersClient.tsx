'use client'

import { useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useFavorites } from '@/features/favorites/context/FavoritesContext'
import { useHouse } from '@/features/houses/context/HouseContext'
import { CharacterCard } from '@/features/ui/components/Card'
import { Pagination, Header } from '@/features/ui'
import { cn } from '@/features/ui'
import { Character, CharacterFilter, PaginatedResponse } from '@/features/ui/types/api'
import { FilterOption } from '@/features/ui/types/app'
import { LAYOUTS } from '@/features/ui/types/theme'

interface CharactersClientProps {
  initialData: PaginatedResponse<Character>
}

const FILTER_OPTIONS: FilterOption<CharacterFilter>[] = [
  { value: 'all', label: 'All Characters' },
  { value: 'students', label: 'Students' },
  { value: 'staff', label: 'Staff' },
]

export function CharactersClient({ initialData }: CharactersClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { isFavorite, toggleFavorite } = useFavorites()
  const { selectedHouse } = useHouse()

  const noDataFound = initialData.data.length === 0

  const searchQuery = searchParams.get('search') || ''
  const filter = (searchParams.get('filter') as CharacterFilter) || 'all'

  const handleFilterChange = useCallback(
    (newFilter: CharacterFilter) => {
      const params = new URLSearchParams(searchParams.toString())
      if (newFilter === 'all') {
        params.delete('filter')
      } else {
        params.set('filter', newFilter)
      }
      params.delete('page')
      router.push(`/characters?${params.toString()}`)
    },
    [router, searchParams]
  )

  const handleSearchChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value.trim()) {
        params.set('search', value)
      } else {
        params.delete('search')
      }
      params.delete('page')
      router.push(`/characters?${params.toString()}`)
    },
    [router, searchParams]
  )

  const handlePageChange = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(searchParams.toString())
      if (newPage === 1) {
        params.delete('page')
      } else {
        params.set('page', newPage.toString())
      }
      router.push(`/characters?${params.toString()}`)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [router, searchParams]
  )

  return (
    <>
      <Header
        title="All Characters"
        selectedHouse={selectedHouse || undefined}
        backLink="/"
        backText="← Back"
      >
        <div className="lg:w-96">
          <label htmlFor="character-search" className="sr-only">
            Search characters
          </label>
          <input
            id="character-search"
            name="character-search"
            type="text"
            placeholder="Search characters..."
            value={searchQuery}
            onChange={e => handleSearchChange(e.target.value)}
            className="w-full px-4 py-2 bg-black text-white placeholder-white border border-border-primary focus:ring-2 focus:ring-yellow-400 focus:border-border-primary"
          />
        </div>
      </Header>

      <main className={cn(LAYOUTS.container, LAYOUTS.section)}>
        <div className="flex flex-wrap gap-4 mb-8">
          {FILTER_OPTIONS.map(option => (
            <button
              key={option.value}
              onClick={() => handleFilterChange(option.value)}
              aria-pressed={filter === option.value}
              className={cn(
                'px-6 py-3 font-medium transition-all duration-200 cursor-pointer',
                filter === option.value
                  ? 'bg-yellow-400 text-black'
                  : 'bg-black text-primary-gold border border-border-primary hover:bg-yellow-400 hover:text-black'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>

        <ul className={cn(LAYOUTS.grid.fiveCol, 'gap-6 mb-8')}>
          {initialData.data.map(character => (
            <li key={character.id}>
              <CharacterCard
                character={character}
                isFavorite={isFavorite(character.name)}
                onToggleFavorite={toggleFavorite}
              />
            </li>
          ))}
        </ul>

        <Pagination pagination={initialData.pagination} onPageChange={handlePageChange} />

        {noDataFound && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-white mb-2">No characters found</h3>
            <p className="text-gray-400">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </main>
    </>
  )
}
