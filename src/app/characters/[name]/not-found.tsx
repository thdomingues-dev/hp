import Link from 'next/link'
import { PageLayout } from '@/features/ui'

export default function CharacterNotFound() {
  return (
    <PageLayout>
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Character Not Found</h1>
          <p className="text-gray-400 mb-6">
            The character you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/characters"
            className="inline-flex items-center px-6 py-3 bg-yellow-400 text-slate-900 font-medium hover:bg-yellow-300 transition-colors"
          >
            ← Back to Characters
          </Link>
        </div>
      </div>
    </PageLayout>
  )
}
