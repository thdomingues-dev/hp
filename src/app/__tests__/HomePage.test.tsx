import { render, screen } from '@testing-library/react'
import HomePage from '../page'

describe('HomePage', () => {
  it('renders the main title', () => {
    render(<HomePage />)
    const titles = screen.getAllByText(/Harry Potter/i)
    expect(titles.length).toBeGreaterThan(0)
  })

  // TODO: Add more tests for the home page
})
