import { getSpellsPaginatedServer } from '@/features/spells/api/server'
import { SpellsClient } from './SpellsClient'

interface SpellsPageProps {
  searchParams?: Promise<{
    page?: string
    search?: string
  }>
}

export default async function SpellsPage({ searchParams }: SpellsPageProps) {
  const resolvedSearchParams = await searchParams
  const page = parseInt(resolvedSearchParams?.page || '1')
  const search = resolvedSearchParams?.search || ''

  const data = await getSpellsPaginatedServer({
    page,
    limit: 12,
    search,
  })

  return (
    <div className="min-h-screen bg-black">
      <SpellsClient initialData={data} initialSearch={search} />
    </div>
  )
}
