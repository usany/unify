import { Chip } from '@mui/material'
import Avatars from './Avatars'
import { useLanguage } from '@/context/LanguageContext';

const CardViewTop = ({ message }) => {
  // const {borrowing, lending} = useTexts()
  const { language } = useLanguage();
  
  const profileUrl = message?.creatorUrl
  const item = message.item
  // const action = message.text.choose === 1 ? borrowing : lending
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
              {item} 빌리기
            </div>
          }
        />
      </div>
    </div>
  )
}

export default CardViewTop
