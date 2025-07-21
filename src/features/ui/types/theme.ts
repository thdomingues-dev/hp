export const LAYOUTS = {
  grid: {
    responsive: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    twoCol: 'grid grid-cols-1 md:grid-cols-2',
    threeCol: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    fourCol: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    fiveCol: 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
  },

  flex: {
    center: 'flex items-center justify-center',
    between: 'flex items-center justify-between',
    start: 'flex items-center justify-start',
    column: 'flex flex-col',
    wrap: 'flex flex-wrap',
  },

  page: 'min-h-screen',
  section: 'py-8',
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
} as const

export const COMPONENTS = {
  card: {
    base: 'bg-black border border-border-primary overflow-hidden transition-all duration-300',
    hover: 'hover:transform hover:scale-105 hover:shadow-2xl',
    interactive:
      'group bg-black border border-border-primary overflow-hidden hover:transform hover:scale-105 transition-all duration-300 hover:shadow-2xl',
  },

  button: {
    primary:
      'px-6 py-3 bg-yellow-400 text-black font-medium transition-all duration-200 hover:bg-yellow-300',
    secondary:
      'px-6 py-3 bg-black text-primary-gold border border-border-primary hover:bg-yellow-400 hover:text-black transition-all duration-200',
    ghost: 'text-yellow-400 hover:text-yellow-300 transition-colors',
  },

  input: {
    base: 'w-full px-4 py-2 bg-white text-black placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-transparent',
  },

  badge: {
    base: 'px-2 py-1 text-xs font-medium text-white',
  },
} as const

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
