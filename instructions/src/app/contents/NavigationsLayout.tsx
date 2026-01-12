import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import { Pencil, Presentation, Umbrella } from 'lucide-react'

function NavigationsLayout({ onChange, bottomNavigation }: { onChange: (event: React.SyntheticEvent, value: number) => void, bottomNavigation: number, tabs: boolean }) {
  return (
    <BottomNavigation
      showLabels
      value={bottomNavigation}
      onChange={onChange}
    >
      <BottomNavigationAction
        label="Register"
        icon={<Pencil />}
      />
      <BottomNavigationAction
        label="Login"
        icon={<Umbrella />}
      />
      <BottomNavigationAction
        label="Board"
        icon={<Presentation />}
      />
    </BottomNavigation>
  )
}

export default NavigationsLayout

