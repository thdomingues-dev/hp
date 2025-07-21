export const dynamic = 'force-static'
import { getCharactersPaginatedServer } from '@/features/characters/api/server'
import { CharacterFilter } from '@/features/ui/types/api'
import { CharactersClient } from './CharactersClient'

interface CharactersPageProps {
  searchParams?: Promise<{
    page?: string
    search?: string
    filter?: CharacterFilter
  }>
}

const VALID_FILTERS: CharacterFilter[] = ['all', 'students', 'staff']

export default async function CharactersPage({ searchParams }: CharactersPageProps) {
  const resolvedSearchParams = await searchParams
  const page = parseInt(resolvedSearchParams?.page || '1')
  const search = resolvedSearchParams?.search || ''

  const filterParam = resolvedSearchParams?.filter || ''

  const filter: CharacterFilter =
    filterParam && VALID_FILTERS.includes(filterParam) ? filterParam : 'all'

  const data = await getCharactersPaginatedServer({
    page,
    limit: 10,
    search,
    filter: filter === 'all' ? '' : filter,
  })

  return (
    <div className="min-h-screen bg-black">
      <CharactersClient initialData={data} />
    </div>
  )
}
