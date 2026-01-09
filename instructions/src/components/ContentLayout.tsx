import { MDXProvider } from '@mdx-js/react'
import { Button } from '@mui/material'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import { Pencil, Presentation, Umbrella } from 'lucide-react'
// import { useLocation, useNavigate } from 'react-router-dom'

function ContentLayout({onChange, bottomNavigation, tabs}: {onChange: (event: React.SyntheticEvent, value: number) => void, bottomNavigation: number, tabs: boolean}) {
  // const navigate = useNavigate()
  // console.log(window.screen.height)
  // console.log(window.visualViewport?.height)
  const components = {
    h1: (props) => <h1 variant="h1" {...props} />, 
    h2: (props) => <h2 variant="h2" {...props} />, 
    p: (props) => <p variant="body1" {...props} />, 
    Button: (props) => <Button variant="contained" {...props} />,
  }
  return (
    <MDXProvider>
      
    </MDXProvider>
  )
}

export default ContentLayout
