import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import { Pencil, Presentation, Umbrella } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

function NavigationsLayout() {
  const pathname = usePathname()
  const router = useRouter()
  return (
    <BottomNavigation
      showLabels
      value={pathname}
      onChange={(event, newValue) => {
        router.push(newValue)
      }}
    >
      <BottomNavigationAction
        label="Register"
        value="/register"
        icon={<Pencil />}
      />
      <BottomNavigationAction
        label="Login"
        value="/login"
        icon={<Umbrella />}
      />
      <BottomNavigationAction
        label="Board"
        value="/board"
        icon={<Presentation />}
      />
    </BottomNavigation>
  )
}

export default NavigationsLayout

