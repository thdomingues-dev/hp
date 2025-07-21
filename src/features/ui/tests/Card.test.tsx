import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { BaseCard } from '../components/Card'

describe('BaseCard', () => {
  it('renders child content', () => {
    render(
      <BaseCard>
        <div>Card Content</div>
      </BaseCard>
    )
    expect(screen.getByText('Card Content')).toBeInTheDocument()
  })
})
