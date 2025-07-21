'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useFavorites } from '@/features/favorites/context/FavoritesContext'
import { cn, getHouseColors } from '@/features/ui'
import { PageLayout } from '@/features/ui'
import { LAYOUTS } from '@/features/ui/types/theme'
import { Header } from '@/features/ui/components/Header'
import { Character } from '@/features/ui/types/api'
import { FavoriteButton } from '@/features/ui/components/FavoriteButton'

interface CharacterDetailClientProps {
  character: Character
}

const HOUSE_TRAITS: Record<string, string> = {
  Gryffindor: 'Known for bravery, courage, and chivalry.',
  Slytherin: 'Known for ambition, cunning, and resourcefulness.',
  Hufflepuff: 'Known for loyalty, patience, and hard work.',
  Ravenclaw: 'Known for intelligence, wisdom, and creativity.',
}

export function CharacterDetailClient({ character }: CharacterDetailClientProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const { name, alternate_names, house, image, actor, dateOfBirth, species, wand } = character

  const houseColors = house ? getHouseColors(house) : null
  const isCharacterFavorite = isFavorite(name)

  const alternateNames = alternate_names ? alternate_names.join(', ') : ''
  const hasCharacterDetails = actor || dateOfBirth || species
  const hasWandDetails = wand.wood || wand.core || wand.length

  return (
    <PageLayout>
      <Header title="Character Details" backLink="/characters" backText="← Back to Characters" />

      <main className={cn(LAYOUTS.container, 'py-12 !max-w-4xl')}>
        <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] md:gap-8">
          <div className="relative md:max-w-xs">
            <div className="aspect-[2/3] overflow-hidden bg-bg-card border border-border-primary">
              {image ? (
                <Image
                  src={image}
                  alt={name}
                  width={320}
                  height={480}
                  className="w-full h-full object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-6xl">🧙‍♂️</span>
                </div>
              )}
            </div>

            <FavoriteButton
              isFavorite={isFavorite(name)}
              onToggle={() => toggleFavorite(name)}
              className="absolute top-4 right-4 p-3"
              size="md"
            />
          </div>

          <div className="space-y-8">
            <div className="bg-black lg:border lg:border-border-primary max-sm:mt-8 md:p-6">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-decorative">
                {name}
              </h1>

              {alternateNames && alternateNames.length > 0 && (
                <p className="text-lg md:text-xl text-gray-300 mb-4">“{alternateNames}“</p>
              )}

              {house && houseColors && (
                <div className="inline-flex items-center gap-2">
                  <div className={cn('px-4 py-2 font-medium text-white', houseColors.primary)}>
                    {house}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-black border border-border-primary p-6 space-y-8">
              {hasCharacterDetails && (
                <div>
                  <h3 className="text-lg font-semibold text-yellow-400 mb-4">Character Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {actor && (
                      <div>
                        <span className="text-gray-400 text-sm">Portrayed By</span>
                        <p className="text-white font-medium">{actor}</p>
                      </div>
                    )}
                    {dateOfBirth && (
                      <div>
                        <span className="text-gray-400 text-sm">Birth Date</span>
                        <p className="text-white font-medium">{dateOfBirth}</p>
                      </div>
                    )}
                    {species && (
                      <div>
                        <span className="text-gray-400 text-sm">Species</span>
                        <p className="text-white font-medium">{species}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {hasWandDetails && (
                <div>
                  <h3 className="text-lg font-semibold text-yellow-400 mb-4">Wand Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {wand.wood && (
                      <div>
                        <span className="text-gray-400 text-sm">Wood</span>
                        <p className="text-white font-medium">{wand.wood}</p>
                      </div>
                    )}
                    {wand.core && (
                      <div>
                        <span className="text-gray-400 text-sm">Core</span>
                        <p className="text-white font-medium">{wand.core}</p>
                      </div>
                    )}
                    {wand.length && (
                      <div>
                        <span className="text-gray-400 text-sm">Length</span>
                        <p className="text-white font-medium">{wand.length} inches</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {house && houseColors && (
                <div>
                  <h3 className="text-lg font-semibold text-yellow-400 mb-4">House Information</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-400 text-sm">House</span>
                      <p className="text-white font-medium">{house}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">House Traits</span>
                      <p className="text-white text-sm">{house && HOUSE_TRAITS[house]}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between flex-wrap gap-4">
                <button
                  onClick={() => toggleFavorite(name)}
                  className={cn(
                    'px-6 py-3 font-bold transition-all duration-200 cursor-pointer transform max-sm:w-full',
                    isCharacterFavorite
                      ? 'bg-black text-primary-gold border border-border-primary hover:bg-bg-card'
                      : 'bg-primary-gold text-black border hover:bg-primary-light-gold'
                  )}
                >
                  {isCharacterFavorite ? 'Unfavorite' : 'Add to Favorites'}
                </button>

                {house && (
                  <Link
                    href={`/houses/${house.toLowerCase()}`}
                    className={cn(
                      'px-6 py-3 font-bold text-white text-center transition-all duration-200 max-sm:w-full',
                      houseColors?.primary,
                      'hover:opacity-90'
                    )}
                  >
                    View {house}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  )
}
