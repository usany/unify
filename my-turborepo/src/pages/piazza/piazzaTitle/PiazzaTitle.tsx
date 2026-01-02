import { MessagesSquare } from 'lucide-react'
import useTexts from 'src/hooks/useTexts'
import PageTitle from 'src/pages/core/pageTitle/PageTitle'
import PiazzaSwitch from 'src/pages/piazza/piazzaTitle/piazzaSwitch/PiazzaSwitch'

interface Props {
  displayName: string
}

const PiazzaTitle = ({ displayName }: Props) => {
  const {groupMessaging, privateMessaging} = useTexts()
  const conversation = location.search ? location.search.slice(location.search.indexOf('=') + 1) : 'piazza'
  return (
    <div className='flex w-full justify-between'>
      <PageTitle
        icon={<MessagesSquare />}
        title={conversation === 'piazza' ? groupMessaging : `${privateMessaging} ${displayName.length > 10 ? displayName.slice(0, 10)+'...' : displayName}`} 
      />
      {conversation === 'piazza' &&
        <PiazzaSwitch />
      }
    </div>
  )
}

export default PiazzaTitle
