import { render, screen } from '@testing-library/react'
import SupportButton from './SupportButton'
import useSelectors from 'src/hooks/useSelectors'
test('renders the component correctly', () => {
  const languages = useSelectors((state) => state.languages.value)
  render(<SupportButton />)
  expect(screen.getByText(languages === 'ko' ? '승낙하기' : 'Confirm'))
  // .toBeInTheDocument()
})
