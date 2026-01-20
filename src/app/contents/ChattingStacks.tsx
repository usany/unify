import { useLanguage } from '@/context/LanguageContext'
import { AnimatedGroup } from '../../components/motion-primitives/animated-group'
import { Avatar, AvatarImage } from '../../components/ui/avatar'
import { Card, Chip } from '@mui/material'

const ChattingStacks = () => {
  const {language} = useLanguage()
  const colorTwo = '#F5F5F5'
  const staticImage = 'https://ijsfbngiyhgvolsprxeh.supabase.co/storage/v1/object/public/remake/animalprofileRed.png'
  const clockValue = new Date().toLocaleTimeString()
  return (
    <AnimatedGroup className='w-full'>
      <Card
        sx={{
          flexGrow: 1,
          overflow: 'hidden',
          bgcolor: colorTwo,
          ':hover': {
            bgcolor: colorTwo,
          },
        }}
      >
        <Avatar>
          <AvatarImage src={staticImage} />
        </Avatar>
        <div className="truncate w-1/2 px-3 overflow-hidden">
          {language === 'ko' ? '단체 대화' : 'Group Messaging'}
        </div>
        <div className="flex flex-col px-3">
          <div className="truncate flex justify-end">{clockValue}</div>
        </div>
        <Chip
          sx={{ height: '20px' }}
          label={`${language === 'ko' ? '새 대화' : 'New Chats'}`}
          color="primary"
        />
      </Card>
    </AnimatedGroup>
  )
}

export default ChattingStacks
