'use client'

import { cn } from '@/features/ui'
import { PaginationMeta } from '@/features/ui/types/api'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

interface PaginationProps {
  pagination: PaginationMeta
  onPageChange?: (page: number) => void
  className?: string
}

export function Pagination({ pagination, onPageChange, className }: PaginationProps) {
  const { currentPage, totalPages, hasNextPage, hasPreviousPage } = pagination
  const pathname = usePathname()
  const searchParams = useSearchParams()

  if (totalPages <= 1) return null

  const getVisiblePages = () => {
    const delta = 1
    const range: number[] = []
    const rangeWithDots: (number | string)[] = []

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots.filter((v, i, arr) => arr.indexOf(v) === i)
  }

  const getPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (page === 1) {
      params.delete('page')
    } else {
      params.set('page', page.toString())
    }
    return `${pathname}?${params.toString()}`
  }

  const visiblePages = getVisiblePages()

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <div className="flex items-center space-x-2 mt-4">
        {onPageChange ? (
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={!hasPreviousPage}
            className={cn('px-3 py-2 text-sm font-medium transition-colors border max-sm:hidden', {
              'text-primary-gold cursor-pointer hover:text-primary-light-gold border-border-primary hover:bg-bg-card':
                hasPreviousPage,
              'text-primary-gold/50 cursor-not-allowed border-border-primary/50': !hasPreviousPage,
            })}
          >
            Previous
          </button>
        ) : (
          <Link
            href={getPageUrl(currentPage - 1)}
            className={cn('px-3 py-2 text-sm font-medium transition-colors border max-sm:hidden', {
              'text-primary-gold cursor-pointer hover:text-primary-light-gold border-border-primary hover:bg-bg-card':
                hasPreviousPage,
              'text-primary-gold/50 cursor-not-allowed border-border-primary/50 pointer-events-none':
                !hasPreviousPage,
            })}
          >
            Previous
          </Link>
        )}

        {visiblePages.map((page, index) => (
          <div key={index}>
            {page === '...' ? (
              <span className="px-3 py-2 text-text-muted">...</span>
            ) : onPageChange ? (
              <button
                onClick={() => onPageChange(page as number)}
                className={cn(
                  'px-3 py-2 text-sm font-medium transition-colors min-w-[40px] cursor-pointer',
                  currentPage === page
                    ? 'bg-primary-gold text-black'
                    : 'text-primary-gold hover:text-primary-light-gold border border-border-primary hover:bg-bg-card'
                )}
              >
                {page}
              </button>
            ) : (
              <Link
                href={getPageUrl(page as number)}
                className={cn(
                  'px-3 py-2 text-sm font-medium transition-colors min-w-[40px] cursor-pointer',
                  currentPage === page
                    ? 'bg-primary-gold text-black'
                    : 'text-primary-gold hover:text-primary-light-gold border border-border-primary hover:bg-bg-card'
                )}
              >
                {page}
              </Link>
            )}
          </div>
        ))}

        {onPageChange ? (
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={!hasNextPage}
            className={cn('px-3 py-2 text-sm font-medium transition-colors border max-sm:hidden', {
              'text-primary-gold cursor-pointer hover:text-primary-light-gold border-border-primary hover:bg-bg-card':
                hasNextPage,
              'text-primary-gold/50 cursor-not-allowed border-border-primary/50': !hasNextPage,
            })}
          >
            Next
          </button>
        ) : (
          <Link
            href={getPageUrl(currentPage + 1)}
            className={cn('px-3 py-2 text-sm font-medium transition-colors border max-sm:hidden', {
              'text-primary-gold cursor-pointer hover:text-primary-light-gold border-border-primary hover:bg-bg-card':
                hasNextPage,
              'text-primary-gold/50 cursor-not-allowed border-border-primary/50 pointer-events-none':
                !hasNextPage,
            })}
          >
            Next
          </Link>
        )}
      </div>
    </div>
  )
}
