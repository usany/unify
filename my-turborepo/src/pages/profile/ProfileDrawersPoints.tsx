import Divider from '@mui/material/Divider'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { dbservice } from 'src/baseApi/serverbase'
import useSelectors from 'src/hooks/useSelectors'
import useTexts from 'src/hooks/useTexts'
import locationsBuildings, { locationsCollectionLetters } from '../add/locationsBuildings'
import locationsCollection from '../add/locationsCollection'

const ProfileDrawersPoints = ({ cards }) => {
  const [messages, setMessages] = useState([])
  const profile = useSelectors((state) => state.profile.value)
  const { state } = useLocation()
  const user = state?.element || profile
  const { borrowedFrom, lendedTo, points, empty, fromReceipt, toReceipt } = useTexts()
  const languages = useSelectors((state) => state.languages.value)
  useEffect(() => {
    const bringMessages = async () => {
      const messagesArray = []
      const messageRef = query(
        collection(dbservice, 'num'),
        orderBy('creatorClock', 'desc'),
      )
      const messageSnap = await getDocs(messageRef)
      messageSnap.forEach((doc) => {
        const cardId = doc.id
        if ((cards?.done || []).indexOf(cardId) !== -1) {
          const card = doc.data()
          messagesArray.push(card)
          setMessages(messagesArray)
        }
      })
    }
    if (cards) {
      bringMessages()
    }
  }, [cards])
  const pointsList = messages.map((element, index) => {
    return (
      <div key={index}>
        <div className="flex flex-col justify-center p-5">
          {user.uid === element.creatorId && (
            <div className="flex justify-center">
              {languages === 'en' && (element.text.choose === 1 ? borrowedFrom : lendedTo)}
              {element.connectedName}
              {languages === 'ko' && (element.text.choose === 1 ? borrowedFrom : lendedTo)}
            </div>
          )}
          {user.uid === element.connectedId && (
            <div className="flex justify-center">
              {languages === 'en' && (element.text.choose === 1 ? borrowedFrom : lendedTo)}
              {element.displayName}
              {languages === 'ko' && (element.text.choose === 1 ? borrowedFrom : lendedTo)}
            </div>
          )}
          <div className="flex justify-center">
            {locationsBuildings[languages][locationsBuildings['ko'].indexOf(element.text.count)]} {locationsCollection[languages][
              Object.keys(locationsCollectionLetters).find(
                (key) =>
                  locationsCollectionLetters[key] === element.text.count
              )
            ][
              locationsCollection['ko'][
                Object.keys(locationsCollectionLetters).find(
                  (key) =>
                    locationsCollectionLetters[key] === element.text.count
                )
              ].indexOf(element.text.counter)
            ]} {element.text.counting}
          </div>
          <div className="flex justify-center">
            {fromReceipt} {element.text.clock.year}-{element.text.clock.month}-{element.text.clock.day} {element.text.clock.hour}:{element.text.clock.minute}
          </div>
          <div className="flex justify-center">
            {toReceipt} {element.text.clocker.year}-{element.text.clocker.month}-{element.text.clocker.day} {element.text.clocker.hour}:{element.text.clocker.minute}
          </div>
          {user.uid === element.creatorId && (
            <div className="flex justify-center">
              {points} {element.text.choose === 1 ? '-' : '+'}
              {element.point}
            </div>
          )}
          {user.uid === element.connectedId && (
            <div className="flex justify-center">
              {points} {element.text.choose === 1 ? '+' : '-'}
              {element.point}
            </div>
          )}
        </div>
        <Divider />
      </div>
    )
  })

  return (
    <div className="p-5">
      {pointsList.length === 0 ? (
        <div className="flex justify-center">
          <div className="rounded shadow-md bg-light-1 dark:bg-dark-1 p-5">
            {empty}
          </div>
        </div>
      ) : (
        <div>{pointsList}</div>
      )}
    </div>
  )
}

export default ProfileDrawersPoints
