export const dynamic = 'force-static'
import { notFound } from 'next/navigation'
import { getCharacterByNameServer } from '@/features/characters/api/server'
import { CharacterDetailClient } from './CharacterDetailClient'
import { parseSlug } from '@/features/ui'

interface CharacterDetailPageProps {
  params: Promise<{
    name: string
  }>
}

export default async function CharacterDetailPage({ params }: CharacterDetailPageProps) {
  const resolvedParams = await params
  const characterName = parseSlug(resolvedParams.name)

  const character = await getCharacterByNameServer(characterName)

  if (!character) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-black">
      <CharacterDetailClient character={character} />
    </div>
  )
}
