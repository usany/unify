import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import { Pencil, Presentation, Umbrella } from 'lucide-react'
// import { useLocation, useNavigate } from 'react-router-dom'

function ContentLayout({onChange, bottomNavigation, tabs}: {onChange: (event: React.SyntheticEvent, value: number) => void, bottomNavigation: number, tabs: boolean}) {
  // const navigate = useNavigate()
  // console.log(window.screen.height)
  // console.log(window.visualViewport?.height)
  return (
     <BottomNavigation
      // sx={{ bgcolor: alpha(colorTwo, 0.8), borderRadius: '10px', borderTop: '1px solid' }}
      showLabels
      value={bottomNavigation}
      onChange={onChange}
    >
      <BottomNavigationAction
        // onClick={() =>
        //   navigate(`/add?action=${tabs ? 'lend' : 'borrow'}`)
        // }
        // label={texts[languages as keyof typeof texts]['register']}
        icon={<Pencil />}
      />
      <BottomNavigationAction
        // onClick={() => navigate('/')}
        // label={
        //   profile?.certificated
        //     ? texts[languages as keyof typeof texts]['myStatus']
        //     : texts[languages as keyof typeof texts]['logIn']
        // }
        icon={<Umbrella />}
      />
      <BottomNavigationAction
        // onClick={() =>
        //   navigate(`/board?action=${tabs ? 'lend' : 'borrow'}`)
        // }
        // label={texts[languages as keyof typeof texts]['board']}
        icon={<Presentation />}
      />
    </BottomNavigation>
  )
}

export default ContentLayout
