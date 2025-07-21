import NextLink from 'next/link'
import { cn } from '@/features/ui'

type LinkVariant = 'default' | 'button-primary' | 'button-secondary' | 'unstyled'

interface LinkProps {
  href: string
  children: React.ReactNode
  className?: string
  external?: boolean
  variant?: LinkVariant
  unstyled?: boolean
}

const linkVariants = {
  default: 'text-primary-gold hover:text-primary-light-gold transition-colors',
  'button-primary':
    'px-8 py-4 bg-primary-gold text-black font-bold hover:bg-primary-light-gold transition-all duration-300 transform hover:scale-105',
  'button-secondary':
    'px-8 py-4 bg-black text-primary-gold font-semibold border border-border-primary hover:bg-bg-card transition-all duration-300 transform hover:scale-105',
  unstyled: '',
}

export function Link({
  href,
  children,
  className,
  external = false,
  variant = 'default',
  unstyled = false,
}: LinkProps) {
  const baseStyles = unstyled ? '' : linkVariants[variant]

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(baseStyles, className)}
      >
        {children}
      </a>
    )
  }

  return (
    <NextLink href={href} className={cn(baseStyles, className)}>
      {children}
    </NextLink>
  )
}
