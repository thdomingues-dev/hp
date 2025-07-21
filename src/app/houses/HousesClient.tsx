'use client'

import Link from 'next/link'
import { useHouse } from '@/features/houses/context/HouseContext'
import { cn, getHouseColors, PageLayout, Header } from '@/features/ui'
import { House, HouseName } from '@/features/ui/types/api'
import { LAYOUTS } from '@/features/ui/types/theme'
import { HouseCard } from '@/features/ui/components/Card'

interface HousesClientProps {
  initialHouses: House[]
}

export function HousesClient({ initialHouses }: HousesClientProps) {
  const { selectedHouse, setSelectedHouse } = useHouse()

  return (
    <PageLayout>
      <Header
        title="Choose Your Hogwarts House"
        subtitle="The Sorting Hat has spoken! Which house calls to your heart? Choose wisely, for your house will be your family during your time at Hogwarts."
        selectedHouse={selectedHouse || undefined}
      />

      <main className={cn(LAYOUTS.container, LAYOUTS.section)}>
        <div className={cn(LAYOUTS.grid.fourCol, 'gap-8')}>
          {initialHouses.map(house => (
            <HouseCard
              key={house.id}
              house={house}
              isSelected={selectedHouse === house.name}
              onSelect={houseName => setSelectedHouse(houseName as HouseName)}
            />
          ))}
        </div>

        {selectedHouse && (
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-white mb-4 font-decorative">
              Welcome to <span className={getHouseColors(selectedHouse).text}>{selectedHouse}</span>
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Your house selection has been saved. Explore your fellow house members and discover
              what makes your house special.
            </p>
            <Link
              href={`/houses/${selectedHouse.toLowerCase()}`}
              className={cn(
                'inline-flex items-center px-8 py-4 font-bold text-black transition-all duration-300 transform hover:scale-105',
                'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600'
              )}
            >
              Explore Your House
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        )}
      </main>
    </PageLayout>
  )
}
