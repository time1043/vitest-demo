import { render, screen } from '@testing-library/react'
import { useState } from 'react'

import SelectColor from '@/components/SelectColor'

import { user } from '../setup'

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
  it('should display the correct items after user click the select ', async () => {
    const selectElement = screen.getByRole('combobox')

    await user.click(selectElement) // always run successfully whether clicked or not in jsdom

    // https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/option#technical_summary
    const optionsElement = screen.getAllByRole('option')
    // expect(optionsElement.length).toBe(3)
    expect(optionsElement).toHaveLength(3)
    expect(optionsElement[0]).toHaveTextContent('White')
    expect(optionsElement[1]).toHaveTextContent('Black')
    expect(optionsElement[2]).toHaveTextContent('Orange')
  })

  // https: //vitest.dev/api/test
  // https: //vitest.dev/api/test#test-each
  it.each([
    { optionValue: '', label: 'white' },
    { optionValue: 'text-black', label: 'black' },
    { optionValue: 'text-orange', label: 'orange' },
  ])(
    'should display the $label text after user click the $label option',
    async ({ optionValue }) => {
      const selectElement = screen.getByRole('combobox')

      // https://testing-library.com/docs/user-event/utility#-selectoptions-deselectoptions
      // selectOptions: (select: Element, values: string | HTMLElement | HTMLElement[] | string[]) => Promise<void>
      // await user.selectOptions(selectElement, optionsElement[1])
      await user.selectOptions(selectElement, optionValue)

      expect(selectElement).toHaveValue(optionValue)
    },
  )
})
