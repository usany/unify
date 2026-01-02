import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { dbservice } from 'src/baseApi/serverbase'
import useSelectors from 'src/hooks/useSelectors'

export const usePiazzaMessage = () => {
  const [piazzaMessage, setPiazzaMessage] = useState<{
    username: string
    message: string
  } | null>(null)
  const changePiazzaMessage = (newValue: string) => setPiazzaMessage(newValue)
  const piazzaSwitch = useSelectors((state) => state.piazzaSwitch.value)
  useEffect(() => {
    const piazza = async () => {
      const piazzaRef = collection(dbservice, 'chats_group')
      const piazzaCollection = query(
        piazzaRef,
        orderBy('messageClockNumber', 'desc'),
        limit(1),
      )
      const piazzaMessages = await getDocs(piazzaCollection)
      piazzaMessages.forEach((doc) => {
        if (!piazzaMessage) {
          const piazzaObject = {
            username: doc.data().userName,
            messageClock: doc.data().messageClock,
            messageClockNumber: doc.data().messageClockNumber,
            message: doc.data().message,
            piazzaChecked: doc.data().piazzaChecked || [],
          }
          localStorage.setItem('group', JSON.stringify(piazzaObject))
          setPiazzaMessage(piazzaObject)
        }
      })
    }
    if (navigator.onLine && piazzaSwitch === 'true') {
      piazza()
    }
  }, [])
  return { piazzaMessage, changePiazzaMessage }
}
