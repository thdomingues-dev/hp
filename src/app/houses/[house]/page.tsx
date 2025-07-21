import { notFound } from 'next/navigation'
import { Header, Pagination, EmptyState } from '@/features/ui'
import { getHouseWithCharactersServer } from '@/features/houses/api/server'
import { HouseName } from '@/features/ui/types/api'
import { cn, getHouseColors } from '@/features/ui'
import { LAYOUTS } from '@/features/ui/types/theme'
import { HouseMembersList } from './HouseMembersList'
import { getHouseIcon } from '@/features/ui/utils/house'

interface HousePageProps {
  params: Promise<{ house: string }>
  searchParams?: Promise<{ page?: string }>
}

export default async function HousePage({ params, searchParams }: HousePageProps) {
  const resolvedParams = await params
  const houseName = resolvedParams.house as string
  const normalizedHouseName = (houseName.charAt(0).toUpperCase() +
    houseName.slice(1).toLowerCase()) as HouseName
  const resolvedSearchParams = await searchParams
  const page = parseInt(resolvedSearchParams?.page || '1')
  const limit = 12

  const { house, characters } = await getHouseWithCharactersServer(normalizedHouseName)
  if (!house) return notFound()

  const { name, founder, houseColours, animal, element, traits } = house
  const houseColors = getHouseColors(name)

  const totalItems = characters.length
  const totalPages = Math.ceil(totalItems / limit)
  const paginatedCharacters = characters.slice((page - 1) * limit, page * limit)

  const pagination = {
    page,
    currentPage: page,
    totalPages,
    totalItems,
    itemsPerPage: limit,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  }

  const houseInfo = [
    { label: 'Founder', value: founder || '-' },
    { label: 'Colors', value: houseColours || '-' },
    { label: 'Animal', value: animal || '-' },
    { label: 'Element', value: element || '-' },
  ]

  return (
    <div className="min-h-screen bg-black">
      <Header title={`${name} House`} backLink="/houses" backText="← Back to Houses" />

      <main className={cn(LAYOUTS.container, LAYOUTS.section)}>
        <div className="text-center mb-12">
          <div className="text-8xl mb-6" aria-label={`${name} house icon`} role="img">
            {getHouseIcon(name)}
          </div>
          <h1
            className={cn('text-5xl md:text-6xl font-bold mb-6 font-decorative', houseColors.text)}
          >
            {name}
          </h1>
        </div>

        <section
          aria-labelledby="house-info"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {houseInfo.map(({ label, value }) => (
            <div key={label} className="bg-bg-card border border-border-primary p-6">
              <h3 className="text-sm font-medium text-gray-400 mb-2">{label}</h3>
              <p className="text-white font-semibold">{value}</p>
            </div>
          ))}
        </section>

        <section aria-labelledby="house-traits" className="mb-12">
          <h2
            id="house-traits"
            className="text-3xl font-bold text-white text-center mb-8 font-decorative"
          >
            House Traits
          </h2>
          <ul className="flex flex-wrap justify-center gap-4">
            {traits.map((trait, index) => (
              <li
                key={index}
                className={cn(
                  'px-6 py-3 text-white font-medium min-w-[153px] text-center',
                  houseColors.primary
                )}
              >
                {trait}
              </li>
            ))}
          </ul>
        </section>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white text-center mb-8 font-decorative">
            House Members
          </h2>

          {paginatedCharacters.length > 0 ? (
            <HouseMembersList
              characters={paginatedCharacters}
              house={house}
              houseColors={houseColors}
            />
          ) : (
            <EmptyState
              icon="🏰"
              title="No members found"
              description="No members found for this house."
            />
          )}

          <div className="flex justify-center">
            <Pagination pagination={pagination} />
          </div>
        </div>
      </main>
    </div>
  )
}
