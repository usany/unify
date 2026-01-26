import { AlarmCheck, PlusCircle, UserRound } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { useState } from 'react'

function PiazzaForm({ addMessage }: { addMessage: (event: React.FormEvent<HTMLFormElement>) => void }) {
  const [message, setMessage] = useState({
    id: 'user',
    msg: '',
    userUid: '2',
    messageClock: new Date(),
    defaultProfile: 'https://ijsfbngiyhgvolsprxeh.supabase.co/storage/v1/object/public/remake/animalprofileRed.png',
    profileImageUrl: 'https://ijsfbngiyhgvolsprxeh.supabase.co/storage/v1/object/public/remake/animalprofileRed.png',
    profileImage: true,
  })
  const { language } = useLanguage()
  return (
    <form id='piazza' className='flex' onSubmit={addMessage}>
      <div className="flex items-center px-1 rounded bg-light-2 dark:bg-dark-2">
        <PlusCircle />
      </div>
      <input
        type="text"
        name="piazza"
        className="w-full p-3 rounded bg-light-1 dark:bg-dark-1"
        value={message.msg}
        onChange={(event) => setMessage({ ...message, msg: event.target.value })}
      />
      <button className="w-1/6 rounded bg-light-2 dark:bg-dark-2" type="submit" onClick={() => setMessage({ ...message, msg: '' })}>
        {language === 'en' ? 'Send' : '전송'}
      </button>
    </form>
  )
}

export default PiazzaForm
