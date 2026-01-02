import ProfileForm from 'src/pages/profile/ProfileForm'
import ProfileConnects from 'src/pages/profile/ProfileConnects'
import useSelectors from 'src/hooks/useSelectors'
import { useLocation } from 'react-router-dom'

interface Props {
  alliesCollection: {list:string[]}[]
  handleFollowers: () => void
}
const ProfileActions = ({ alliesCollection, handleFollowers }: Props) => {
  const {state} = useLocation()
  const profile = useSelectors((state) => state.profile.value)
  const user = state?.element || profile

  return (
    <div>
      {profile?.uid === user.uid ? (
        <ProfileForm />
      ) : (
        <ProfileConnects
          alliesCollection={alliesCollection}
          handleFollowers={handleFollowers}
        />
      )}
    </div>
  )
}

export default ProfileActions
