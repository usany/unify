import { useEffect, useState } from 'react'
// import LoadingsSkeletons from 'src/components/recycle/recycleLoadingsSkeletons'
import useSelectors from 'src/hooks/useSelectors'
import Avatars from 'src/pages/core/Avatars'
import Popups from 'src/pages/core/Popups'
import useTexts from 'src/hooks/useTexts'
import ProfileClose from './ProfileClose'
import ProfileDialogs from './profileDialogs/ProfileDialogs'
import ProfileView from './ProfileView'
import { useLocation } from 'react-router-dom'

const ProfileAvatar = () => {
  const { changeProfile } = useTexts()
  const [attachment, setAttachment] = useState(null)
  const changeAttachment = (newValue) => setAttachment(newValue)
  const [changedImage, setChangedImage] = useState({
    attachment: false,
    profileCharacter: '',
    profileImage: false,
    defaultProfile: '',
    profileImageUrl: '',
    profileColor: '',
    initial: true,
    changed: false,
  })
  const {state} = useLocation()
  const profile = useSelectors((state) => state.profile.value)
  const user = state?.element || profile

  useEffect(() => {
    if (changedImage.initial) {
      setChangedImage({
        attachment: false,
        profileCharacter: '',
        profileImage: profile?.profileImage,
        defaultProfile: profile?.defaultProfile,
        profileImageUrl: profile?.profileImageUrl,
        profileColor: profile?.profileColor,
        initial: false,
        changed: false,
      })
    }
  }, [user])
  useEffect(() => {
    if (attachment && !changedImage.attachment) {
      setChangedImage({
        ...changedImage,
        attachment: true,
        profileImage: true,
        profileImageUrl: attachment,
        changed: true,
      })
    }
  }, [attachment])
  const handleChangedImage = (newValue) => setChangedImage(newValue)
  if (profile?.uid === user.uid) {
    return (
      <div className='flex justify-center'>
        <Popups
          trigger={
            <ProfileView
              user={user}
              changeAttachment={changeAttachment}
              changedImage={changedImage}
              handleChangedImage={handleChangedImage}
            />
          }
          title={changeProfile}
          content={
            <ProfileDialogs
              attachment={attachment}
              changeAttachment={changeAttachment}
              changedImage={changedImage}
              handleChangedImage={handleChangedImage}
            />
          }
          close={
            <ProfileClose
              changedImage={changedImage}
              handleChangedImage={handleChangedImage}
              attachment={attachment}
            />
          }
          attachment={changedImage}
        />
      </div>
    )
  }
  return (
    <div className="flex justify-center">
      <Avatars
        element={{
          ...user,
          profileImage: user.profileImage
            ? user.profileImage
            : user.profileImage !== false
            ? true
            : user.profileImage,
          defaultProfile: user.defaultProfile,
          profileImageUrl: user.profileImageUrl,
        }}
        piazza={null}
        profile={true}
      />
      {/* {user?.profileImageUrl ? (
        <Avatars
          element={{
            ...user,
            profileImage: user.profileImage
              ? user.profileImage
              : user.profileImage !== false
              ? true
              : user.profileImage,
            defaultProfile: user.defaultProfile,
            profileImageUrl: user.profileImageUrl,
          }}
          piazza={null}
          profile={true}
        />
      ) : (
        <LoadingsSkeletons height={'[192px]'} width={'[192px]'} />
      )} */}
    </div>
  )
}

export default ProfileAvatar
