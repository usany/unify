import Avatars from 'src/pages/core/Avatars'

const SpecificsTradesTrigger = ({
  onClick,
  isCreator,
  message,
}) => {
  const passingProfile = {
    profileImage: isCreator ? message.creatorProfileImage : message.connectedProfileImage,
    defaultProfile: isCreator ? message.creatorDefaultProfile : message.connectedDefaultProfile,
    profileImageUrl: isCreator ? message.creatorProfileImageUrl : message.connectedProfileImageUrl
  }
  console.log(passingProfile)
  return (
    <div onClick={onClick}>
      <Avatars
        element={passingProfile}
        profile={false}
        piazza={null}
      />
    </div>
  )
}


export default SpecificsTradesTrigger
