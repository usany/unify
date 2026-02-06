import Avatars from './Avatars';

const ProfileFirst = () => {
  const element = {
    profileImage: true,
    defaultProfile: 'https://ijsfbngiyhgvolsprxeh.supabase.co/storage/v1/object/public/remake/animalprofileRed.png',
    profileImageUrl: 'https://ijsfbngiyhgvolsprxeh.supabase.co/storage/v1/object/public/remake/animalprofileRed.png',
  }
  return (
    <div className='flex justify-center'>
      <Avatars element={element} profile={true} />
    </div>
  )
}

export default ProfileFirst