import { User } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { UserRound } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { dbservice } from 'src/baseApi/serverbase'
import useSelectors from 'src/hooks/useSelectors'
import useTexts from 'src/hooks/useTexts'
import PageTitle from 'src/pages/core/pageTitle/PageTitle'
import ProfileActions from 'src/pages/profile/ProfileActions'
import ProfileAvatar from 'src/pages/profile/profileAvatar/ProfileAvatar'
import ProfileCards from 'src/pages/profile/ProfileCards'
import ProfileCompleted from 'src/pages/profile/ProfileCompleted'
import ProfileMembers from 'src/pages/profile/ProfileMembers'
import { changeBottomNavigation } from 'src/stateSlices/bottomNavigationSlice'
import { changeProfileColor } from 'src/stateSlices/profileColorSlice'
import { changeProfileUrl } from 'src/stateSlices/profileUrlSlice'
import { useImmer } from 'use-immer'
import ProfileLocations from './ProfileLocations'
import LottieScroll from 'src/lottiesAnimation/LottieScroll'

function Profile() {
  const { state } = useLocation()
  const [alliesCollection, setAlliesCollection] = useImmer([
    {
      id: 'followers',
      list: [],
    },
    {
      id: 'followings',
      list: [],
    },
  ])
  const [cards, setCards] = useState({
    point: null,
    done: [],
    borrowDone: [],
    lendDone: [],
  })
  const [scrolledToCompleted, setScrolledToCompleted] = useState(false)
  const profile = useSelectors((state) => state.profile.value)
  const userUid = state?.element.uid || profile?.uid
  const userDisplayName = state?.element.displayName || profile?.displayName
  const { my, userProfile } = useTexts()
  const scrollRef = useRef(null)
  useEffect(() => {
    const cards = async () => {
      const docRef = doc(dbservice, `members/${userUid}`)
      const myDocSnap = await getDoc(docRef)
      const { points, done, borrowDoneCount, lendDoneCount } = myDocSnap.data()
      setCards({
        point: points,
        done: done,
        borrowDone: borrowDoneCount || [],
        lendDone: lendDoneCount || [],
      })
    }
    cards()
  }, [state])
  const handleFollowers = ({ list }) => {
    setAlliesCollection((draft) => {
      const followers = draft.find((todo) => todo.id === 'followers')
      followers.list = list
    })
  }
  const dispatch = useDispatch()
  useEffect(() => {
    const setProfile = async () => {
      const docRef = doc(dbservice, `members/${profile?.uid}`)
      const docSnap = await getDoc(docRef)
      const userColor = docSnap.data()?.profileColor || '#2196f3'
      const userImage = docSnap.data()?.profileImageUrl || 'null'
      const userProfileImage = docSnap.data()?.profileImage || false
      const userDefaultProfile = docSnap.data()?.defaultProfile || 'null'
      dispatch(changeProfileColor(userColor))
      if (userProfileImage) {
        dispatch(changeProfileUrl(userImage))
      } else {
        dispatch(changeProfileUrl(userDefaultProfile))
      }
    }
    setProfile()
  }, [profile])
  useEffect(() => {
    const bringAllies = async () => {
      let docRef
      if (profile?.uid === userUid) {
        docRef = doc(dbservice, `members/${profile?.uid}`)
      } else {
        docRef = doc(dbservice, `members/${location.search.slice(4)}`)
      }
      const myDocSnap = await getDoc(docRef)
      const { followers, followings } = myDocSnap.data()
      const alliesObj = [
        { id: 'followers', list: followers || [] },
        { id: 'followings', list: followings || [] },
      ]
      setAlliesCollection(alliesObj)
    }
    bringAllies()
  }, [state])
  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant', // Optional if you want to skip the scrolling animation
    })
  }, [state])
  useEffect(() => {
    dispatch(changeBottomNavigation(5))
  }, [state])
  const shortenName =
    userDisplayName.length > 10
      ? userDisplayName.slice(0, 10) + '......'
      : userDisplayName
  const scrollEffect = () => {
    // console.log(document.documentElement.offsetHeight)
    // console.log(window.innerHeight)
    // console.log(document.documentElement.scrollTop)
    // console.log(document.scrollingElement?.scrollTop)
    const scrollNumber = 250
    if (
      (document.documentElement.offsetHeight -
      (window.innerHeight + Math.round(document.documentElement.scrollTop)) < scrollNumber) 
      || (document.documentElement?.scrollTop &&
      document.documentElement?.scrollTop > scrollNumber)
      // (document.scrollingElement?.scrollTop &&
      // document.scrollingElement?.scrollTop > scrollNumber)
    ) {
      setScrolledToCompleted(true)
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', scrollEffect)
    return () => window.removeEventListener('scroll', scrollEffect)
  }, [])
  console.log(profile)
  return (
    <div ref={scrollRef}>
      <PageTitle
        icon={<UserRound />}
        title={`${userUid === profile?.uid ? my : shortenName} ${userProfile}`}
      />
      <ProfileAvatar />
      <ProfileLocations />
      <ProfileActions
        alliesCollection={alliesCollection}
        handleFollowers={handleFollowers}
      />
      <ProfileCards alliesCollection={alliesCollection} cards={cards} />
      {scrolledToCompleted ? (
        <>
          <ProfileCompleted cards={cards} />
          <ProfileMembers />
        </>
      ) : (
        <LottieScroll />
      )}
    </div>
  )
}

export default Profile
