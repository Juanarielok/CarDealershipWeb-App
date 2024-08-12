import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Section01 from '../components/section-01'
import '@testing-library/jest-dom/extend-expect'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ Results: [{ MakeId: '1', MakeName: 'Toyota' }, { MakeId: '2', MakeName: 'Ford' }] }),
  })
)

describe('Section01 Component', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  it('renders the component with initial state', () => {
    render(<Section01 />)

    expect(screen.getByLabelText('Vehicle Type')).toBeInTheDocument()
    expect(screen.getByLabelText('Model Year')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Find Cars/i })).toBeDisabled()
  })

  it('fetches and displays vehicle types', async () => {
    render(<Section01 />)

    // Wait for the vehicle types to be loaded
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1))

    const vehicleTypeSelect = screen.getByLabelText('Vehicle Type')
    fireEvent.change(vehicleTypeSelect, { target: { value: '1' } })

    // Assert that vehicle types are displayed
    expect(vehicleTypeSelect).toHaveValue('1')
    expect(screen.getByRole('option', { name: 'Toyota' })).toBeInTheDocument()
  })

  it('enables the Find Cars button when both selections are made', async () => {
    render(<Section01 />)

    const vehicleTypeSelect = screen.getByLabelText('Vehicle Type')
    const modelYearSelect = screen.getByLabelText('Model Year')

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1))

    fireEvent.change(vehicleTypeSelect, { target: { value: '1' } })
    fireEvent.change(modelYearSelect, { target: { value: '2020' } })

    expect(vehicleTypeSelect).toHaveValue('1')
    expect(modelYearSelect).toHaveValue('2020')
    expect(screen.getByRole('button', { name: /Find Cars/i })).toBeEnabled()
  })

  it('handles fetch errors gracefully', async () => {
    fetch.mockImplementationOnce(() => Promise.reject(new Error('API error')))
    render(<Section01 />)

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1))
    expect(console.error).toHaveBeenCalledWith('Error fetching vehicle types:', new Error('API error'))
  })
})