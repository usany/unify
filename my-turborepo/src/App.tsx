import Lotties from 'src/lottiesAnimation/Lotties'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import Router from 'src/pages/core/router/Router'
import useSelectors from './hooks/useSelectors'
import useColors from './hooks/useColors'
import useUserObject from './hooks/useUserObject'
import useNetwork from './hooks/useNetwork'
import 'src/global.css'
import useGetToken from './pages/main/menu/useGetToken'
import useContextMenu from './pages/main/menu/useContextMenu'

function App() {
  // const [count, setCount] = useState(0)
  const theme = useSelectors((state) => state.theme.value)
  const profile = useSelectors((state) => state.profile.value)
  const { lightTheme, darkTheme } = useColors()
  useUserObject()
  useNetwork()
  useContextMenu()
  useGetToken()
  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      {profile !== undefined ? <Router /> : <Lotties />}
    </ThemeProvider>
  )
}

export default App
