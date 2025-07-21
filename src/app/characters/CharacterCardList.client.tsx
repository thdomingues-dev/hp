'use client'
import { CharacterCard } from '@/features/ui/components/Card'
import { useFavorites } from '@/features/favorites/context/FavoritesContext'
import { Character } from '@/features/ui/types/api'

export function CharacterCardList({ characters }: { characters: Character[] }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 items-stretch auto-rows-fr">
      {characters.map(character => (
        <CharacterCard
          key={character.id}
          character={character}
          isFavorite={isFavorite(character.name)}
          onToggleFavorite={() => toggleFavorite(character.name)}
        />
      ))}
    </div>
  )
}
