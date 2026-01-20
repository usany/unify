import { AnimatedGroup } from '../../components/motion-primitives/animated-group'
import { Avatar, AvatarImage } from '../../components/ui/avatar'
import { Card, Chip } from '@mui/material'

const ChattingStacks = () => {
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
          {multiple
            ? `${languages === 'ko' ? '단체 대화' : 'Group Messaging'}`
            : displayingUserName}
        </div>
        <div className="flex flex-col px-3">
          <div className="truncate flex justify-end">{clockValue}</div>
        </div>
        <Chip
          sx={{ height: '20px' }}
          label={`${languages === 'ko' ? '새 대화' : 'New Chats'}`}
          color="primary"
        />
      </Card>
    </AnimatedGroup>
  )
}

export default ChattingStacks
