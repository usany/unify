import { MDXProvider } from '@mdx-js/react'
import { Button } from '@mui/material'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import { Pencil, Presentation, Umbrella } from 'lucide-react'
import { ComponentType } from 'react'

const components = {
  h1: () => <h1 />,
  h2: () => <h2 />,
  p: () => <p />,
  Button: (props: any) => <Button {...props} />,
  BottomNavigation: (props: any) => <BottomNavigation {...props} />,
  BottomNavigationAction: (props: any) => <BottomNavigationAction {...props} />,
}
function ContentLayout({ content }: { content: ComponentType<any> }) {
  const ContentComponent = content
  return (
    <ContentComponent />
  )
}

export default ContentLayout
