import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'


const Avatars = ({ element, profile }: { element: any, profile: boolean }) => {
  const profileImage = element?.profileImage
  const defaultProfile = element?.defaultProfile
  return (
    <Avatar className={profile ? "w-48 h-48":''}>
      <AvatarImage
        src={profileImage ? element.profileImageUrl : defaultProfile}
      />
      <AvatarFallback className="border border-none bg-light-1 dark:bg-dark-1"></AvatarFallback>
    </Avatar>
  )
}

export default Avatars
