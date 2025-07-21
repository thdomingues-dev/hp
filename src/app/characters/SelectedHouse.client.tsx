'use client'
import { useHouse } from '@/features/houses/context/HouseContext'

export default function SelectedHouse() {
  const { selectedHouse } = useHouse()
  if (!selectedHouse) return null
  return (
    <div className="text-white mt-2 mb-4">
      You belong to the house: <span className="font-bold">{selectedHouse}</span>
    </div>
  )
}
