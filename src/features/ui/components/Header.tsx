import Link from 'next/link'
import { ReactNode } from 'react'
import { cn, getHouseColors } from '@/features/ui'

interface HeaderProps {
  backLink?: string
  backText?: string
  title: string
  subtitle?: string
  selectedHouse?: string
  className?: string
  children?: ReactNode
}

export function Header({
  backLink = '/',
  backText = '← Back',
  title,
  subtitle,
  selectedHouse,
  className,
  children,
}: HeaderProps) {
  return (
    <header
      className={cn('bg-bg-overlay backdrop-blur-sm border-b border-border-primary', className)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link
              href={backLink}
              className="text-yellow-400 hover:text-yellow-300 transition-colors mb-2 inline-block"
            >
              {backText}
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-white text-center lg:text-left font-decorative">
              <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                {title}
              </span>
            </h1>
            {subtitle && <p className="text-white mt-2 text-center lg:text-left">{subtitle}</p>}
            {selectedHouse && (
              <div className="flex items-center text-white mt-2">
                <p className="">You belong to the house:</p>
                <span
                  className={cn(
                    'ml-2 mt-[0.5px] font-semibold font-heading',
                    getHouseColors(selectedHouse).text
                  )}
                >
                  {selectedHouse}
                </span>
              </div>
            )}
          </div>

          {children && <div className="mt-4 lg:mt-0">{children}</div>}
        </div>
      </div>
    </header>
  )
}
