import Button from '@mui/material/Button'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { Link, useLocation } from 'react-router-dom'
import { dbservice } from 'src/baseApi/serverbase'
import useSelectors from 'src/hooks/useSelectors'
import useTexts from 'src/hooks/useTexts'

interface Props {
  alliesCollection: {list:string[]}[]
  handleFollowers: () => void
}
const ProfileConnects = ({ alliesCollection, handleFollowers }: Props) => {
  const { follow, cancelFollow, sendMessage } = useTexts()
  const profile = useSelectors((state) => state.profile.value)
  const { state } = useLocation()
  const user = state?.element || profile

  const followButton = alliesCollection[0].list.indexOf(profile?.uid) === -1
  const followUser = async () => {
    const myDocRef = doc(dbservice, `members/${profile?.uid}`)
    const myDocSnap = await getDoc(myDocRef)
    const otherUserDocRef = doc(dbservice, `members/${user.uid}`)
    const otherUserDocSnap = await getDoc(otherUserDocRef)
    const myFollowingNum = myDocSnap.data()?.followings
      ? myDocSnap.data().followings.length
      : 0
    const otherUserFollowerNum = otherUserDocSnap.data()?.followers
      ? otherUserDocSnap.data().followers.length
      : 0
    const myFollowers = myDocSnap.data().followers || []
    const myFollowings = myDocSnap.data().followings || []
    const otherFollowers = otherUserDocSnap.data().followers || []
    const otherFollowings = otherUserDocSnap.data().followings || []
    if (myFollowingNum) {
      if (myFollowings.indexOf(user.uid) === -1) {
        await updateDoc(myDocRef, {
          followingNum: myFollowingNum + 1,
          followings: [...myFollowings, user.uid],
        })
      }
    } else {
      await updateDoc(myDocRef, {
        followingNum: 1,
        followings: [user.uid],
      })
    }
    if (otherUserFollowerNum) {
      if (otherFollowers.indexOf(profile?.uid) === -1) {
        await updateDoc(otherUserDocRef, {
          followerNum: otherUserFollowerNum + 1,
          followers: [...otherFollowers, profile?.uid],
        })
        handleFollowers({
          list: [...otherFollowers, profile?.uid],
        })
      }
    } else {
      await updateDoc(otherUserDocRef, {
        followerNum: 1,
        followers: [profile?.uid],
      })
      handleFollowers({ list: [profile?.uid] })
    }
  }
  const unfollowUser = async () => {
    const myDocRef = doc(dbservice, `members/${profile?.uid}`)
    const myDocSnap = await getDoc(myDocRef)
    const otherUserDocRef = doc(dbservice, `members/${user.uid}`)
    const otherUserDocSnap = await getDoc(otherUserDocRef)
    const myFollowingNum = myDocSnap.data()?.followings
      ? myDocSnap.data().followings.length
      : 0
    const otherUserFollowerNum = otherUserDocSnap.data()?.followers
      ? otherUserDocSnap.data().followers.length
      : 0
    const myFollowers = myDocSnap.data().followers || []
    const myFollowings = myDocSnap.data().followings || []
    const otherFollowers = otherUserDocSnap.data().followers || []
    const otherFollowings = otherUserDocSnap.data().followings || []
    if (myFollowingNum) {
      if (myFollowings.indexOf(user.uid) !== -1) {
        await updateDoc(myDocRef, {
          followingNum: myFollowingNum - 1,
          followings: myFollowings.filter((element) => element !== user.uid),
        })
      }
    }

    if (otherUserFollowerNum) {
      if (otherFollowers.indexOf(profile?.uid) !== -1) {
        await updateDoc(otherUserDocRef, {
          followerNum: otherUserFollowerNum - 1,
          followers: otherFollowers.filter(
            (element) => element !== profile?.uid,
          ),
        })
        handleFollowers({
          list: otherFollowers.filter((element) => element !== profile?.uid),
        })
      }
    }
  }
  const conversation = user.uid < profile?.uid ? user.uid.slice(0, 5)+profile?.uid.slice(0, 5) : profile?.uid.slice(0, 5)+user.uid.slice(0, 5)
  return (
    <div className="flex justify-center pt-10">
      <Button
        className='colorTwo' 
        variant="outlined"
        onClick={() => {
          if (followButton) {
            followUser()
          } else {
            unfollowUser()
          }
        }}
      >
        {followButton ? follow : cancelFollow}
      </Button>
      <Link
        to={`/piazza?id=${conversation}`}
        state={{
          conversation: conversation,
          displayName: user.displayName,
          userUid: profile?.uid,
          chattingUid: user.uid,
          multiple: false,
          profileUrl: user.profileImageUrl,
        }}
      >
        <Button className='colorTwo' variant="outlined">
          {sendMessage}
        </Button>
      </Link>
    </div>
  )
}

export default ProfileConnects
