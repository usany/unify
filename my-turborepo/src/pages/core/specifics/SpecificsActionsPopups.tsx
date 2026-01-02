import Avatars from 'src/pages/core/Avatars'
import Popups from '../Popups'
import SpecificsTradesContent from './SpecificsTradesContent'

interface Props {
  message: {}
  drawerOpenTrue: () => void
}

function SpecificsActionsPopups({ message, drawerOpenTrue }: Props) {
  const passingProfile = {
    profileImage: message?.creatorProfileImage,
    defaultProfile: message?.creatorDefaultProfile,
    profileImageUrl: message?.creatorProfileImageUrl,
  }

  return (
    <div onClick={drawerOpenTrue}>
      <Popups
        trigger={
          <Avatars
            element={passingProfile}
            profile={false}
          />
        }
        title={message.displayName}
        content={
          <SpecificsTradesContent
            isCreator={true}
            message={message}
            connectedUser={null}
          />
        }
      />
    </div>
  )
}

export default SpecificsActionsPopups
