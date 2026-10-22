import { render, screen } from '@testing-library/react'
import { useState } from 'react'

import SelectColor from '@/components/SelectColor'

function SelectColorMock() {
  const [textColor, setTextColor] = useState<string>('')

  return <SelectColor {...{ textColor, setTextColor }} />
}

beforeEach(() => {
  render(<SelectColorMock />)
})

// deinsoftware.testing-library-snippets `itr`, `itue`

describe('static render test', async () => {
  it('should render the select element correctly', async () => {
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/select#technical_summary
    const selectElement = screen.getByRole('combobox')

    expect(selectElement).toBeInTheDocument()
  })

  it('should render the label element correctly', async () => {
    const labelElement = screen.getByText(/text color/i)

    expect(labelElement).toBeInTheDocument()
  })
})

describe('user interactions', async () => {
  it('', async () => {})
})
