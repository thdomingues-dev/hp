import { ReactNode } from 'react'
import Link from 'next/link'
import { cn, getHouseColors, slugify } from '@/features/ui'
import { COMPONENTS } from '@/features/ui/types/theme'
import { Character, House, Spell } from '@/features/ui/types/api'
import { FavoriteButton } from '@/features/ui/components/FavoriteButton'
import { CharacterImage } from '@/features/ui/components/CharacterImage'
import { getHouseIcon } from '@/features/ui/utils/house'

interface BaseCardProps {
  className?: string
  children: ReactNode
}

export function BaseCard({ className, children }: BaseCardProps) {
  return <div className={cn(COMPONENTS.card.interactive, className)}>{children}</div>
}

interface CharacterCardProps {
  character: Character
  isFavorite: boolean
  onToggleFavorite: (name: string) => void
}

export function CharacterCard({ character, isFavorite, onToggleFavorite }: CharacterCardProps) {
  const { name, image, house, alternate_names, actor } = character
  const houseColors = character.house ? getHouseColors(character.house) : null

  return (
    <BaseCard className="flex flex-col justify-between h-full">
      <div>
        <div className="relative aspect-square md:aspect-[3/4] overflow-hidden">
          <CharacterImage src={image} alt={name} containerClassName="" />

          <FavoriteButton
            isFavorite={isFavorite}
            onToggle={() => onToggleFavorite(name)}
            className="absolute top-3 right-3 p-2"
            size="sm"
          />

          {house && houseColors && (
            <div
              className={cn(
                'absolute top-3 left-3 px-2 py-1 text-xs font-medium',
                houseColors.primary,
                'text-white'
              )}
            >
              {house}
            </div>
          )}
        </div>

        <div className="p-4 pb-0">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors font-decorative">
            {name}
          </h3>

          {alternate_names && alternate_names.length > 0 && (
            <p className="text-white text-sm mb-2">“{alternate_names[0]}”</p>
          )}

          {actor && <p className="text-gray-400 text-sm mb-2">Played by {actor}</p>}
        </div>
      </div>

      <Link
        href={`/characters/${slugify(name)}`}
        aria-label={`View details for ${name}`}
        className="p-4 pt-0 inline-flex items-center text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
      >
        View Details
        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </BaseCard>
  )
}

interface HouseCardProps {
  house: House
  isSelected: boolean
  onSelect: (houseName: string) => void
}

export function HouseCard({ house, isSelected, onSelect }: HouseCardProps) {
  const { name, founder, traits } = house

  const houseColors = getHouseColors(name)
  const houseIcon = getHouseIcon(name)

  return (
    <div
      className={cn(
        'group relative overflow-hidden p-6 transition-all duration-300 cursor-pointer',
        'hover:scale-105 hover:shadow-2xl border border-border-primary',
        isSelected
          ? 'ring-4 ring-yellow-400 shadow-2xl scale-105 bg-bg-card'
          : 'bg-bg-card hover:bg-slate-700'
      )}
      onClick={() => onSelect(name)}
    >
      <div
        className={cn(
          'absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity',
          houseColors.primary
        )}
      ></div>

      <div className="relative z-10">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4" aria-label={`${name} house icon`} role="img">
            {houseIcon}
          </div>
          <h3 className={cn('font-bold mb-2 harry-potter-title', houseColors.text)}>{name}</h3>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {traits.slice(0, 3).map(trait => (
            <span
              key={trait}
              className={cn('px-3 py-1 text-xs font-medium text-white', houseColors.primary)}
            >
              {trait}
            </span>
          ))}
        </div>

        <div className="text-center">
          <div className="text-xs text-gray-400">Founded by</div>
          <div className="font-semibold text-white">{founder}</div>
        </div>
      </div>
    </div>
  )
}

interface SpellCardProps {
  spell: Spell
}

export function SpellCard({ spell }: SpellCardProps) {
  const { name, description } = spell

  return (
    <BaseCard>
      <div className="flex items-start justify-between mb-4 p-6 pb-0">
        <div className="flex-1">
          <h3 className="text-xl font-decorative font-bold text-purple-400 mb-2 group-hover:text-purple-300 transition-colors">
            {name}
          </h3>
        </div>
        <div className="text-2xl">✨</div>
      </div>

      <div className="px-6 pb-6">
        <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
      </div>
    </BaseCard>
  )
}
