'use client'

import { useEffect } from 'react'
import { PageLayout, ErrorState } from '@/features/ui'

interface ErrorProps {
  error: Error & { digest?: string }
}

export default function Error({ error }: ErrorProps) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <PageLayout>
      <ErrorState
        title="Something Went Wrong!"
        description="It seems like a spell has gone awry in our magical world. Don’t worry, even the best wizards make mistakes sometimes."
        backLink="/"
        backText="Return Home"
      />
    </PageLayout>
  )
}
