import type { Metadata } from 'next'
import { PageLayout, ErrorState } from '@/features/ui'

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The magical page you are looking for has vanished into thin air.',
}

export default function NotFound() {
  return (
    <PageLayout>
      <ErrorState title="Page Not Found" description="The magical page you seek has vanished!" />
    </PageLayout>
  )
}
