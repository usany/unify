import { Chip } from '@mui/material'
import useTexts from 'src/hooks/useTexts'
import Avatars from '../Avatars'

const CardViewTop = ({ message }) => {
  const {borrowing, lending} = useTexts()
  const profileUrl = message?.creatorUrl
  const item = message.item
  const action = message.text.choose === 1 ? borrowing : lending
  const passingValue = {
    profileImage: message.creatorProfileImage,
    defaultProfile: message.creatorDefaultProfile,
    profileImageUrl: message.creatorProfileImageUrl,
  }

  return (
    <div className="flex justify-between gap-1">
      <Avatars
        element={passingValue}
        uid={message.creatorId}
        profile={false}
        profileUrl={profileUrl}
        piazza={null}
      />
      <div className="flex items-center">
        <Chip
          label={
            <div className="text-xs">
              {item} {action}
            </div>
          }
        />
      </div>
    </div>
  )
}

export default CardViewTop
