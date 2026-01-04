import { Chip } from '@mui/material'
import useSelectors from 'src/hooks/useSelectors'

const ChatsBoxesChips = ({ message }) => {
  const languages = useSelectors((state) => state.languages.value)
  const profile = useSelectors((state) => state.profile.value)

  return (
    <div>
      {message?.piazzaChecked &&
        message?.piazzaChecked.indexOf(profile?.uid) === -1 && (
          <Chip
            sx={{ height: '20px' }}
            label={`${languages === 'ko' ? '새 대화' : 'New Chats'}`}
            color="primary"
          />
        )}
      {message?.messageCount > 0 && (
        <Chip
          sx={{ height: '20px' }}
          label={message.messageCount}
          color="primary"
        />
      )}
    </div>
  )
}

export default ChatsBoxesChips
