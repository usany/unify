import { useTheme } from '@/app/context/ThemeContext';
import Avatars from './Avatars';

const ProfileFirst = () => {
  const element = {
    profileImage: true,
    defaultProfile: 'https://ijsfbngiyhgvolsprxeh.supabase.co/storage/v1/object/public/remake/animalprofileRed.png',
    profileImageUrl: 'https://ijsfbngiyhgvolsprxeh.supabase.co/storage/v1/object/public/remake/animalprofileRed.png',
  }
  return (
    <Avatars element={element} profile={true} />
  )
}

export default ProfileFirst