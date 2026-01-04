import { screen } from '@testing-library/react'
import { renderWithProviders } from 'src/lib/test-utils'
import { store } from 'src/store'
import Board from './Board'

test('renders the component correctly', () => {
  // const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')
  // const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch')
  // beforeEach(() => {
  //   useSelectorMock.mockClear()
  //   useDispatchMock.mockClear()
  // })
  // const languages = useSelectorMock((state) => state.languages.value)
  const { languages } = store.getState()
  renderWithProviders(<Board userObj={null} />)
  expect(screen.getByText(languages.value === 'ko' ? '로그인' : 'Need'))
})
