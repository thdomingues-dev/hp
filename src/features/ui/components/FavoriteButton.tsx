import { cn } from '@/features/ui'
import React from 'react'

interface FavoriteButtonProps {
  isFavorite: boolean
  onToggle: () => void
  className?: string
  size?: 'sm' | 'md'
}

export function FavoriteButton({
  isFavorite,
  onToggle,
  className,
  size = 'md',
}: FavoriteButtonProps) {
  const iconSize = cn({ 'w-5 h-5': size === 'sm', 'w-6 h-6': size === 'md' })
  return (
    <button
      type="button"
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      aria-pressed={isFavorite}
      onClick={onToggle}
      className={cn(
        'transition-all duration-200 shadow-lg cursor-pointer',
        isFavorite
          ? 'bg-red-500 text-white'
          : 'bg-white/20 backdrop-blur-sm text-white hover:bg-red-500',
        className
      )}
    >
      <svg
        className={iconSize}
        fill="currentColor"
        viewBox="0 0 20 20"
        role="img"
        aria-hidden="true"
        focusable="false"
      >
        <title>{isFavorite ? 'Favorited' : 'Not favorited'}</title>
        <path
          fillRule="evenodd"
          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  )
}
