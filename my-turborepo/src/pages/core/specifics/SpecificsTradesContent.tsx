import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import { DrawerClose } from '@/components/ui/drawer'
import Avatars from 'src/pages/core/Avatars'
import useSelectors from 'src/hooks/useSelectors'
import useTexts from 'src/hooks/useTexts'
import { DocumentData } from 'firebase/firestore'

interface Props {
  isCreator: boolean
  message: DocumentData
}
const SpecificsTradesContent = ({
  isCreator,
  message,
}: Props) => {
  const profile = useSelectors((state) => state.profile.value)
  const {userProfile, chat} = useTexts()
  const passingProfile = {
    profileImage: isCreator
      ? message.creatorProfileImage
      : message.connectedProfileImage,
    defaultProfile: isCreator
      ? message.creatorDefaultProfile
      : message.connectedDefaultProfile,
    profileImageUrl: isCreator
      ? message?.creatorProfileImageUrl
      : message?.connectedProfileImageUrl,
  }
  const uid = isCreator ? message?.creatorId : message?.connectedId
  const displayName = isCreator ? message.displayName : message?.connectedName
  const url = isCreator ? message.creatorUrl : message?.connectedUrl
  const conversation = message?.creatorId < profile?.uid ? message?.creatorId.slice(0, 6) + profile?.uid.slice(0, 6) : profile?.uid.slice(0, 6) + message?.creatorId.slice(0, 6)

  return (
    <>
      <div className="flex flex-col items-center pt-5">
        <Avatars element={passingProfile} profile={true} piazza={null} />
        <>{displayName}</>
      </div>
      <div className="flex justify-center p-5">
        <Link
          to={`/profile${profile?.uid !== uid ? `/?id:${uid}` : ''}`}
          state={{
            element: {
              uid: uid,
              displayName: displayName,
              profileImage: passingProfile.profileImage,
              defaultProfile: passingProfile.defaultProfile,
              profileImageUrl: passingProfile.profileImageUrl,
            },
          }}
        >
          <DrawerClose>
            <Button
              className='colorOne'
              variant="outlined"
              onClick={() => {
                document.body.classList.remove('overflow-hidden')
              }}
            >
              {userProfile}
            </Button>
          </DrawerClose>
        </Link>
        {profile?.uid !== uid && (
          <Link
            to={`/piazza/?id=${conversation}`}
            state={{
              conversation: conversation,
              displayName: displayName,
              userUid: profile?.uid,
              chattingUid: uid,
              multiple: false,
              profileUrl: url,
            }}
          >
            <DrawerClose>
              <Button
                className='colorOne'
                variant="outlined"
                onClick={() => {
                  document.body.classList.remove('overflow-hidden')
                }}
              >
                {chat}
              </Button>
            </DrawerClose>
          </Link>
        )}
      </div>
    </>
  )
}

export default SpecificsTradesContent
