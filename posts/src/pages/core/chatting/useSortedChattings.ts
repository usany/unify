import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { dbservice } from 'src/baseApi/serverbase'
import useSelectors from 'src/hooks/useSelectors'

export const useSortedChattings = () => {
  const profile = useSelectors((state) => state.profile.value)
  const [chattings, setChattings] = useState({})
  const changeChattings = (newValue) => setChattings(newValue)
  const chattingsArray = navigator.onLine ? chattings : JSON.parse(localStorage.getItem('chattings') || '[]')
  const sorted = Object.keys(chattingsArray).sort((elementOne, elementTwo) => {
    return (
      chattingsArray[elementTwo].messageClockNumber -
      chattingsArray[elementOne].messageClockNumber
    )
  })
  useEffect(() => {
    const bringChattings = async () => {
      const docRef = doc(dbservice, `members/${profile?.uid}`)
      const docSnap = await getDoc(docRef)
      const newChattings = docSnap.data()?.chattings || {}
      setChattings(newChattings)
      localStorage.setItem('chattings', JSON.stringify(newChattings))
    }
    if (navigator.onLine) {
      bringChattings()
    }
  }, [])
  return {
    chattings: chattings,
    changeChattings: changeChattings,
    sorted: sorted,
  }
}
