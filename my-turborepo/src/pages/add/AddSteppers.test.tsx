import { screen } from '@testing-library/react'
import { renderWithProviders } from 'src/lib/test-utils'
import { store } from 'src/store'
import AddSteppers from './AddSteppers'

test('renders the component correctly', () => {
  // const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')
  // const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch')
  // beforeEach(() => {
  //   useSelectorMock.mockClear()
  //   useDispatchMock.mockClear()
  // })
  // const languages = useSelectorMock((state) => state.languages.value)
  const { languages } = store.getState()
  renderWithProviders(<AddSteppers addSteps={1} borrow={true} />)
  expect(screen.getByText(languages.value === 'ko' ? '장소 입력' : 'Location'))
})
