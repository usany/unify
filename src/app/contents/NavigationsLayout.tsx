import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import { Pencil, Presentation, Umbrella } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

function NavigationsLayout({value}: {value: string}) {
  const pathname = usePathname()
  const router = useRouter()
  return (
    <BottomNavigation
      showLabels
      value={value}
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
        label="Status"
        value="/status"
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

