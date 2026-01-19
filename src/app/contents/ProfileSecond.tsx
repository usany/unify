import Avatars from './Avatars';

const ProfileSecond = () => {
  const element = {
    profileImage: true,
    defaultProfile: 'https://ijsfbngiyhgvolsprxeh.supabase.co/storage/v1/object/public/remake/animalprofileRed.png',
    profileImageUrl: 'https://ijsfbngiyhgvolsprxeh.supabase.co/storage/v1/object/public/remake/animalprofileRed.png',
  }
  return (
    <Avatars element={element} profile={true} />
  )
}

export default ProfileSecond