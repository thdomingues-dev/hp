export function getHouseIcon(houseName: string): string {
  switch (houseName) {
    case 'Gryffindor':
      return '🦁'
    case 'Slytherin':
      return '🐍'
    case 'Hufflepuff':
      return '🦡'
    case 'Ravenclaw':
      return '🦅'
    default:
      return '🏰'
  }
}
