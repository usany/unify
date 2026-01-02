import { DrawerClose } from '@/components/ui/drawer'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import useSelectors from 'src/hooks/useSelectors'
import Avatars from 'src/pages/core/Avatars'

interface Props {
  message: {}
}

function SpecificsActionsPopupsContents({ message }: Props) {
  const profile = useSelectors((state) => state.profile.value)
  const uid = profile?.uid
  const conversation = message?.creatorId < uid ? message?.creatorId.slice(0, 6) + uid.slice(0, 6) : uid.slice(0, 6) + message?.creatorId.slice(0, 6)
  const passingProfile = {
    profileImage: message?.creatorProfileImage,
    defaultProfile: message?.creatorDefaultProfile,
    profileImageUrl: message?.creatorProfileImageUrl,
  }

  return (
    <>
      <div className="flex flex-col items-center pt-5">
        <Avatars
          element={passingProfile}
          uid={message.creatorId}
          profile={true}
          profileColor=""
          profileUrl={message.creatorUrl}
          piazza={null}
        />
        <div>{message?.displayName}</div>
      </div>
      <div className="flex justify-center p-5">
        <Link
          to={`/profile${
            uid !== message.creatorId ? `/?id:${message.creatorId}` : ''
          }`}
          state={{
            element: {
              uid: message.creatorId,
              displayName: message.displayName,
              profileImage: passingProfile.profileImage,
              defaultProfile: passingProfile.defaultProfile,
              profileImageUrl: passingProfile.profileImageUrl,
            },
          }}
        >
          <Button
            variant="outlined"
            onClick={() => {
              document.body.classList.remove('overflow-hidden')
            }}
          >
            프로필 확인
          </Button>
        </Link>
        {uid !== message?.creatorId && (
          <Link
            to={`/piazza/?id=${conversation}`}
            state={{
              conversation: conversation,
              displayName: message?.displayName,
              userUid: uid,
              chattingUid: message?.creatorId,
              multiple: false,
              profileUrl: message?.creatorUrl,
            }}
          >
            <DrawerClose>
              <Button
                variant="outlined"
                onClick={() => {
                  document.body.classList.remove('overflow-hidden')
                }}
              >
                개인 대화
              </Button>
            </DrawerClose>
          </Link>
        )}
      </div>
    </>
  )
}

export default SpecificsActionsPopupsContents
