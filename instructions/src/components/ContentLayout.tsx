import { MDXProvider } from '@mdx-js/react'
import { Button } from '@mui/material'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import { Pencil, Presentation, Umbrella } from 'lucide-react'
import { ComponentType } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'

const components = {
  h1: () => <h1 />, 
  h2: () => <h2 />, 
  p: () => <p />, 
  Button: (props: any) => <Button {...props} />,
  BottomNavigation: (props: any) => <BottomNavigation {...props} />,
  BottomNavigationAction: (props: any) => <BottomNavigationAction {...props} />,
}
function ContentLayout({content}: {content: ComponentType<any>}) {
  const ContentComponent = content
  return (
    <MDXProvider components={components}>
      <ContentComponent />
    </MDXProvider>
  )
}

export default ContentLayout
