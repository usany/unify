import { AlarmCheck, PlusCircle, UserRound } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

function PiazzaForm() {
  const { language } = useLanguage()
  return (
    <form>
      <div className="flex items-center px-1 h-full rounded bg-light-2 dark:bg-dark-2">
        <PlusCircle />
      </div>
      <input
        className="w-full p-3 rounded bg-light-1 dark:bg-dark-1"
      />
      <button className="w-1/6 rounded bg-light-2 dark:bg-dark-2" type="submit">
        {language === 'en' ? 'Send' : '전송'}
      </button>
    </form>
  )
}

export default PiazzaForm
