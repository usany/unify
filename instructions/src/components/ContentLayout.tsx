import { MDXProvider } from '@mdx-js/react'
import { Button } from '@mui/material'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import { Pencil, Presentation, Umbrella } from 'lucide-react'
import { ComponentType } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'

const components = {
  h1: (props: any) => <h1 variant="h1" {...props} />, 
  h2: (props: any) => <h2 variant="h2" {...props} />, 
  p: (props: any) => <p variant="body1" {...props} />, 
  Button: (props: any) => <Button variant="contained" {...props} />,
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
