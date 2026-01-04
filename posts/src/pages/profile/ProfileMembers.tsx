import { useLocation } from 'react-router-dom'
import useSelectors from 'src/hooks/useSelectors'
import useTexts from 'src/hooks/useTexts'
import useCardsBackground from '../../hooks/useCardsBackground'
import Popups from '../core/Popups'
import ProfileMembersDrawersContent from './ProfileMembersDrawersContent'
import ProfileMembersDrawersTitle from './ProfileMembersDrawersTitle'
import ProfileMembersDrawersTrigger from './ProfileMembersDrawersTrigger'
import ProfileMembersPasswordContent from './ProfileMembersPasswordContent'
import ProfileMembersLink from './ProfileMembersLink'

const ProfileMembers = () => {
  const {state} = useLocation()
  const profile = useSelectors((state) => state.profile.value)
  const user = state?.element || profile
  return (
    <div className="flex justify-center p-5">
      {user.uid === profile?.uid ? (
        <div className="grid grid-flow-row grid-cols-2 justify-center">
          <Popups
            trigger={<ProfileMembersDrawersTrigger isPassword={true}/>}
            title={<ProfileMembersDrawersTitle isPassword={true}/>}
            content={<ProfileMembersPasswordContent />}
          />
          <Popups
            trigger={<ProfileMembersDrawersTrigger isPassword={false}/>}
            title={<ProfileMembersDrawersTitle isPassword={false}/>}
            content={<ProfileMembersDrawersContent />}
          />
        </div>
      ) : (
        <ProfileMembersLink otherUserProfile={{uid: ''}}/>
      )}
    </div>
  )
}

export default ProfileMembers
