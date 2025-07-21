import Link from 'next/link'

interface ErrorStateProps {
  title: string
  description: string
  backLink?: string
  backText?: string
  className?: string
}

export function ErrorState({
  title,
  description,
  backLink = '/',
  backText = '← Back',
  className = '',
}: ErrorStateProps) {
  return (
    <div className={`min-h-screen bg-black flex items-center justify-center ${className}`}>
      <div className="text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-white mb-4">{title}</h1>
        <p className="text-gray-400 mb-6">{description}</p>
        <Link
          href={backLink}
          className="inline-flex items-center px-6 py-3 bg-yellow-400 text-black font-medium hover:bg-yellow-300 transition-colors"
        >
          {backText}
        </Link>
      </div>
    </div>
  )
}
