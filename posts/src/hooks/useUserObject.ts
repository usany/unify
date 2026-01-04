import { useEffect } from 'react'
import { auth, onSocialClick } from 'src/baseApi/serverbase'
import 'src/global.css'
import { useDispatch } from 'react-redux'
import { doc, getDoc } from 'firebase/firestore'
import { dbservice } from 'src/baseApi/serverbase'
import { changeProfile } from 'src/stateSlices/profileSlice'
import useSelectors from './useSelectors'
import { getRedirectResult } from 'firebase/auth'
import { changeLoading } from 'src/stateSlices/loadingSlice'

const useUserObject = () => {
  const profile = useSelectors((state) => state.profile.value)
  const dispatch = useDispatch()
  const setProfile = async (uid: string) => {
    const docRef = doc(dbservice, `members/${uid}`)
    const docSnap = await getDoc(docRef)
    const userData = docSnap.data()
    const profileImage = JSON.parse(localStorage.getItem(userData?.uid) || '{}')
    const newProfile = userData
    if (profileImage?.attachment && newProfile) {
      newProfile.profileImageUrl = profileImage.attachment
    }
    if (newProfile) {
      console.log(newProfile)
      dispatch(changeProfile(newProfile))
    }
  }
  const onLine = useSelectors((state) => state.onLine.value)
  if (!onLine) {
    dispatch(changeProfile(null))
    return null
  }
  console.log(profile)
  const handleRedirectResult = async () => {
    try {
      dispatch(changeLoading(true))
      const result = await getRedirectResult(auth)
      console.log(result)
      if (result) {
        onSocialClick(result)
      }
      // const user = result?.user
      // auth.onAuthStateChanged((user) => {
      //   if (user?.uid) {
      //     console.log(user?.uid)
      //     setTimeout(() => {
      //       setProfile(user?.uid)
      //     }, 1000)
      //   } else {
      //     setTimeout(() => {
      //       dispatch(changeProfile(null))
      //     }, 1000)
      //   }
      // })
      // if (!result) {
      //   dispatch(changeProfile(null))
      // }
      // if (user?.uid) {
      //   await setProfile(user.uid)
      // } else {
      //   dispatch(changeProfile(null))
      // }
    } catch (error) {
      console.error('Error handling redirect result', error)
    }
  }
  useEffect(() => {
    if (location.hostname === 'khusan.co.kr') {
      handleRedirectResult()
    } 
    const delay = profile === undefined ? 1000 : 0
    auth.onAuthStateChanged((user) => {
      if (user?.uid) {
        setTimeout(() => {
          dispatch(changeLoading(false))
          setProfile(user?.uid)
        }, delay)
      } else {
        setTimeout(() => {
          dispatch(changeLoading(false))
          dispatch(changeProfile(null))
        }, delay)
      }
    })
  }, [])
}
export default useUserObject
