import { User } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { getToken } from 'firebase/messaging'
import { useEffect } from 'react'
import { dbservice, messaging } from 'src/baseApi/serverbase'
import useSelectors from 'src/hooks/useSelectors'
const useGetToken = () => {
  const profile = useSelectors((state) => state.profile.value)
  useEffect(() => {
    const requestPermission = async () => {
      try {
        const token = await getToken(messaging, {
          vapidKey:
            'BOEjdiKjNUn1CuyitURLOGBbbE7GaPIM5MCLsVEIwgqXcmiXzp5-BrGzPRuBmlpVEk2SizRb6PXuXy77oJ4kLxA',
        })
        if (token) {
          console.log('Token generated:', token)
          // alert(token)
          // Send this token to your server to store it for later use
          // webSocket.on('messagingToken', token)
          // return (
          //     webSocket.off('messagingToken', token)
          // )
          const myDoc = doc(dbservice, `members/${profile?.uid}`)
          updateDoc(myDoc, { messagingToken: token })
        } else {
          console.log('No registration token available.')
        }
      } catch (err) {
        console.error('Error getting token:', err)
        // alert(err)
      }
    }
    requestPermission()
  }, [profile])
}
export default useGetToken
