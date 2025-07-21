import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { Pagination } from '../components/Pagination'

describe('Pagination', () => {
  const pagination = {
    currentPage: 1,
    totalPages: 3,
    hasNextPage: true,
    hasPreviousPage: false,
    totalItems: 30,
    itemsPerPage: 10,
  }

  it('renders navigation buttons', () => {
    render(<Pagination pagination={pagination} onPageChange={() => {}} />)
    expect(screen.getByText('Next')).toBeInTheDocument()
    expect(screen.getByText('Previous')).toBeInTheDocument()
  })

  it('calls onPageChange when clicking Next', () => {
    const onPageChange = jest.fn()
    render(<Pagination pagination={pagination} onPageChange={onPageChange} />)
    fireEvent.click(screen.getByText('Next'))
    expect(onPageChange).toHaveBeenCalled()
  })
})
