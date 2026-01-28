import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import { Pencil, Presentation, Umbrella } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useLanguage } from '@/app/context/LanguageContext'

function NavigationsLayout({value}: {value: string}) {
  const router = useRouter()
  const { language } = useLanguage()
  
  const translations = {
    en: {
      register: 'Register',
      status: 'My Status',
      board: 'Board'
    },
    ko: {
      register: '등록',
      status: '내 상태',
      board: '게시판'
    }
  }
  
  const translation = translations[language] || translations.ko
  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        router.push(newValue)
      }}
      sx={{
        border: 'solid',
        borderRadius: '10px'
      }}
    >
      <BottomNavigationAction
        label={translation.register}
        value="/register"
        icon={<Pencil />}
      />
      <BottomNavigationAction
        label={translation.status}
        value="/status"
        icon={<Umbrella />}
      />
      <BottomNavigationAction
        label={translation.board}
        value="/board"
        icon={<Presentation />}
      />
    </BottomNavigation>
  )
}

export default NavigationsLayout


