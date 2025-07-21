export interface FilterOption<T = string> {
  value: T
  label: string
  count?: number
}

export interface NavigationCard {
  title: string
  description: string
  href: string
  color: string
  emoji?: string
}
