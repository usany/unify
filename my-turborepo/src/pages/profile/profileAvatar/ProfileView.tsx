import BeachAccess from '@mui/icons-material/BeachAccess'
import Badge from '@mui/material/Badge'
import { Pen } from 'lucide-react'
import { useLocation } from 'react-router-dom'
// import LoadingsSkeletons from 'src/components/recycle/recycleLoadingsSkeletons'
import useSelectors from 'src/hooks/useSelectors'
import Avatars from 'src/pages/core/Avatars'

const ProfileView = ({
  changedImage,
  changeAttachment,
  handleChangedImage,
}) => {
  const {state} = useLocation()
  const profile = useSelectors((state) => state.profile.value)
  const user = state?.element || profile
  return (
    <div
      onClick={() => {
        handleChangedImage({
          ...changedImage,
          attachment: '',
          profileColor: profile?.profileColor,
          profileImage: false,
          defaultProfile: profile?.defaultProfile,
          changed: false,
        })
        changeAttachment(null)
      }}
    >
      {user.uid === profile?.uid ? (
        <Badge
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <button className="p-1 bg-transparent border-dashed border-2 rounded-xl">
              {/* <BeachAccess /> */}
              <Pen />
            </button>
          }
        >
          {profile ? (
            <Avatars element={profile} piazza={null} profile={true} />
          ) : (
            <LoadingsSkeletons height={'[192px]'} width={'[192px]'} />
          )}
        </Badge>
      ) : (
        <>
          {user?.profileImageUrl ? (
            <Avatars element={user} piazza={null} profile={true} />
          ) : (
            <LoadingsSkeletons height={'[192px]'} width={'[192px]'} />
          )}
        </>
      )}
    </div>
  )
}

export default ProfileView
