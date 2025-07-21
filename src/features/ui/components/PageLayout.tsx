import { ReactNode } from 'react'
import { cn } from '@/features/ui'

interface PageLayoutProps {
  children: ReactNode
  className?: string
  background?: 'black' | 'gradient'
}

export function PageLayout({ children, className, background = 'black' }: PageLayoutProps) {
  const backgroundClass =
    background === 'gradient' ? 'bg-gradient-to-b from-black via-purple-900 to-black' : 'bg-black'

  return <div className={cn('min-h-screen', backgroundClass, className)}>{children}</div>
}
