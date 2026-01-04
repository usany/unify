import { useState } from 'react'
import Popups from '../core/Popups'
import ProfileCardsTitle from './ProfileCardsTitle'
import ProfileCardsTrigger from './ProfileCardsTrigger'
import ProfileDrawersAllies from './ProfileDrawersAllies'
import ProfileDrawersPoints from './ProfileDrawersPoints'

const ProfileCards = ({ alliesCollection, cards }) => {
  const [followers, setFollowers] = useState([])
  const [followings, setFollowings] = useState([])
  const isFollowersList = [true, false]
  
  return (
    <div className="flex justify-center pt-5">
      <Popups
        trigger={<ProfileCardsTrigger cards={cards} />}
        title={<ProfileCardsTitle />}
        content={<ProfileDrawersPoints cards={cards} />}
        close={null}
      />
      {isFollowersList.map((value, index) => {
        return (
          <Popups
            trigger={
              <ProfileCardsTrigger
                isFollowers={value}
                alliesCollectionList={alliesCollection[index].list}
                handleCompanies={(newValue) => {
                  if (index) {
                    setFollowings(newValue)
                  } else {
                    setFollowers(newValue)
                  }
                }}
              />
            }
            title={<ProfileCardsTitle isFollowers={value} />}
            content={
              <ProfileDrawersAllies companies={index ? followings : followers} />
            }
          />
        )
      })}
    </div>
  )
}

export default ProfileCards
