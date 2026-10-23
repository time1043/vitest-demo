import { useState } from 'react'
import { render } from 'vitest-browser-react'
import { page, userEvent } from 'vitest/browser'

import SelectColor from '@/components/SelectColor'

function SelectColorMock() {
  const [textColor, setTextColor] = useState<string>('')

  return <SelectColor {...{ textColor, setTextColor }} />
}

beforeEach(async () => {
  await render(<SelectColorMock />)
})

// deinsoftware.testing-library-snippets `itr`, `itue`

describe('static render test', async () => {
  it('should render the select element correctly', async () => {
    // Arrange / Act
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/select#technical_summary
    const selectLocator = page.getByRole('combobox')

    // Assert
    expect(selectLocator).toBeInTheDocument()
  })

  it('should render the label element correctly', async () => {
    // Arrange / Act
    const labelLocator = page.getByText(/text color/i)

    // Assert
    expect(labelLocator).toBeInTheDocument()
  })
})

describe('user interactions', async () => {
  it.skip('should display the correct items after user click the select ', async () => {
    // Arrange / Act
    const user = userEvent.setup()
    const selectLocator = page.getByRole('combobox')

    await user.click(selectLocator) // always run successfully whether clicked or not in jsdom

    // Assert
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/option#technical_summary
    const optionsElement = page.getAllByRole('option')
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
      // Arrange
      const user = userEvent.setup()
      const selectLocator = page.getByRole('combobox')

      // Act
      // https://testing-library.com/docs/user-event/utility#-selectoptions-deselectoptions
      // selectOptions: (select: Element, values: string | HTMLElement | HTMLElement[] | string[]) => Promise<void>
      // await user.selectOptions(selectElement, optionsElement[1])
      await user.selectOptions(selectLocator, optionValue)

      // Assert
      expect(selectLocator).toHaveValue(optionValue)
    },
  )
})
