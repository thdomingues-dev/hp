'use client'

import { useFavorites } from '@/features/favorites/context/FavoritesContext'
import { Character, House } from '@/features/ui/types/api'
import { cn, slugify } from '@/features/ui'
import { LAYOUTS } from '@/features/ui/types/theme'
import Link from 'next/link'
import { FavoriteButton } from '@/features/ui/components/FavoriteButton'
import { CharacterImage } from '@/features/ui/components/CharacterImage'

interface HouseMembersListProps {
  characters: Character[]
  house: House
  houseColors: {
    primary: string
    text: string
  }
}

export function HouseMembersList({ characters, house, houseColors }: HouseMembersListProps) {
  const { isFavorite, toggleFavorite } = useFavorites()

  return (
    <ul className={cn(LAYOUTS.grid.fourCol, 'gap-6 mb-8')} role="list">
      {characters.map(
        ({ id, image, name, actor, species, ancestry, hogwartsStudent, hogwartsStaff }) => (
          <li
            key={id}
            className="bg-bg-card border border-border-primary hover:bg-slate-700 transition-all duration-300 hover:scale-105 h-full flex flex-col"
            role="listitem"
          >
            <div className="relative aspect-square md:aspect-[3/4] overflow-hidden">
              <CharacterImage src={image} alt={name} />

              <FavoriteButton
                isFavorite={isFavorite(name)}
                onToggle={() => toggleFavorite(name)}
                className="absolute top-3 right-3 p-2"
                size="sm"
              />

              <div
                className={cn(
                  'absolute top-3 left-3 px-2 py-1 text-xs font-medium text-white',
                  houseColors.primary
                )}
              >
                {house.name}
              </div>
            </div>

            <div className="p-4 flex-grow flex flex-col bg-black">
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-white mb-2 font-decorative">{name}</h3>

                {actor && <p className="text-gray-400 text-sm mb-3">Played by {actor}</p>}

                <div className="space-y-2 text-sm">
                  {species && species !== 'human' && (
                    <div className="text-gray-300">
                      <span className="text-gray-400">Species:</span> {species}
                    </div>
                  )}
                  {ancestry && (
                    <div className="text-gray-300">
                      <span className="text-gray-400">Ancestry:</span> {ancestry}
                    </div>
                  )}
                  {(hogwartsStudent || hogwartsStaff) && (
                    <div className="text-gray-300">
                      <span className="text-gray-400">Type:</span>{' '}
                      {hogwartsStudent && hogwartsStaff
                        ? 'Student & Staff'
                        : hogwartsStudent
                          ? 'Student'
                          : 'Staff'}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <Link
                  href={`/characters/${slugify(name)}`}
                  className="inline-flex items-center text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
                  aria-label={`View details for ${name}`}
                >
                  View Details
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </li>
        )
      )}
    </ul>
  )
}
