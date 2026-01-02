import useSelectors from './useSelectors';

const useCardsBackground = () => {
  const theme = useSelectors((state) => state.theme.value)
  const colorOne = theme === 'dark' ? '#5c6778' : '#f7fafb'
  const colorTwo = theme === 'dark' ? '#2d3848' : '#e2e8f0'
  const colorThree = theme === 'dark' ? '#1a202c' : '#cbd5df'
  // const colorOne = theme === 'dark' ? '#4a5a6a' : '#dde3e8'
  // const colorTwo = theme === 'dark' ? '#6c7a89' : '#c6d0e1'
  // const colorThree = theme === 'dark' ? '#2c3e50' : '#a3c4dc'
  return ({ colorOne, colorTwo, colorThree })
}
export default useCardsBackground
