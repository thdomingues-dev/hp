export function getHouseColors(house: string) {
  const colors = {
    Gryffindor: {
      primary: 'bg-red-600',
      secondary: 'bg-yellow-500',
      text: 'text-red-600',
      border: 'border-red-600',
    },
    Slytherin: {
      primary: 'bg-green-600',
      secondary: 'bg-gray-400',
      text: 'text-green-600',
      border: 'border-green-600',
    },
    Hufflepuff: {
      primary: 'bg-yellow-500',
      secondary: 'bg-black',
      text: 'text-yellow-600',
      border: 'border-yellow-500',
    },
    Ravenclaw: {
      primary: 'bg-blue-600',
      secondary: 'bg-gray-600',
      text: 'text-blue-600',
      border: 'border-blue-600',
    },
  }

  return (
    colors[house as keyof typeof colors] || {
      primary: 'bg-gray-600',
      secondary: 'bg-gray-400',
      text: 'text-gray-600',
      border: 'border-gray-600',
    }
  )
}
