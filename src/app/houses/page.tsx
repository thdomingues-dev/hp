import { getAllHousesServer } from '@/features/houses/api/server'
import { HousesClient } from './HousesClient'

export default async function HousesPage() {
  const houses = await getAllHousesServer()

  return (
    <div className="min-h-screen bg-black">
      <HousesClient initialHouses={houses} />
    </div>
  )
}
