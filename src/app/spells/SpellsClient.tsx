'use client'

import { useState, useEffect, useCallback } from 'react'
import { PageLayout, Header, Pagination } from '@/features/ui'
import { SpellCard } from '@/features/ui/components/Card'
import { LAYOUTS } from '@/features/ui/types/theme'
import { useSearchParams, useRouter } from 'next/navigation'
import { cn } from '@/features/ui'
import { PaginatedResponse, Spell } from '@/features/ui/types/api'

interface SpellsClientProps {
  initialData: PaginatedResponse<Spell>
  initialSearch: string
}

export function SpellsClient({ initialData, initialSearch }: SpellsClientProps) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState(initialSearch)

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchQuery(value)
      const params = new URLSearchParams(searchParams.toString())
      if (value.trim()) {
        params.set('search', value)
      } else {
        params.delete('search')
      }
      params.delete('page')
      router.push(`/spells?${params.toString()}`)
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
      router.push(`/spells?${params.toString()}`)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [router, searchParams]
  )

  useEffect(() => {
    const urlSearch = searchParams.get('search') || ''
    setSearchQuery(urlSearch)
  }, [searchParams])

  return (
    <PageLayout>
      <Header title="✨ Magical Spells" subtitle="Discover the magic of the wizarding world">
        <div className="lg:w-96">
          <label htmlFor="spell-search" className="sr-only">
            Search spells
          </label>
          <input
            id="spell-search"
            name="spell-search"
            type="text"
            placeholder="Search spells..."
            value={searchQuery}
            onChange={e => handleSearchChange(e.target.value)}
            className="w-full px-4 py-2 bg-black text-white placeholder-white border border-border-primary focus:ring-2 focus:ring-yellow-400 focus:border-border-primary"
          />
        </div>
      </Header>

      <main className={cn(LAYOUTS.container, LAYOUTS.section)}>
        <div className={cn(LAYOUTS.grid.threeCol, 'gap-6 mb-8')}>
          {initialData.data.map(spell => (
            <SpellCard key={spell.id} spell={spell} />
          ))}
        </div>

        {initialData.data.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              {searchQuery ? `No spells found for "${searchQuery}"` : 'No spells available'}
            </p>
          </div>
        )}

        {initialData.pagination.totalPages > 1 && (
          <Pagination pagination={initialData.pagination} onPageChange={handlePageChange} />
        )}
      </main>
    </PageLayout>
  )
}
