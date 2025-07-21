import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Header } from '../components/Header'

describe('Header', () => {
  it('renders title and subtitle', () => {
    render(<Header title="Harry Potter" subtitle="Magical World" />)
    expect(screen.getByText('Harry Potter')).toBeInTheDocument()
    expect(screen.getByText('Magical World')).toBeInTheDocument()
  })
})
