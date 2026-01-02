import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { collection, getDocs, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { dbservice } from 'src/baseApi/serverbase'
import useSelectors from 'src/hooks/useSelectors'
import useTexts from 'src/hooks/useTexts'
import Cards from 'src/pages/core/card/Cards'

const Carousels = () => {
  const { state } = useLocation()
  const profile = useSelectors((state) => state.profile.value)
  const user = state?.element || profile
  const { borrowing, lending, activitiesCompleted } = useTexts()
  const [messagesList, setMessagesList] = useState([])
  const [cardNumber, setCardNumber] = useState(1)
  const completedAction = useSelectors((state) => state.completedAction.value)
  const handleCardNumber = (newValue) => setCardNumber(newValue)
  useEffect(() => {
    const getMessage = async () => {
      const messagesRef = query(collection(dbservice, 'num'))
      const querySnap = await getDocs(messagesRef)
      const messagesArray = []
      querySnap.forEach((docSnap) => {
        const messageId = docSnap.id
        const messageObj = docSnap.data()
        const message = { id: messageId, ...messageObj }
        if (
          messageObj.creatorId === user.uid ||
          messageObj.connectedId === user.uid
        ) {
          messagesArray.push(message)
        }
      })
      setMessagesList(messagesArray)
    }
    getMessage()
  }, [])

  const borrowList = messagesList
    .map((element) => {
      if (element.round === 5) {
        if (element.creatorId === user.uid && element.text.choose === 1) {
          return (
            <CarouselItem key={element.id} className="flex justify-center">
              <Cards
                message={element}
                isOwner={true}
                num={null}
                points={null}
              />
            </CarouselItem>
          )
        } else if (
          element.creatorId !== user.uid &&
          element.text.choose === 2
        ) {
          return (
            <CarouselItem key={element.id} className="flex justify-center">
              <Cards
                message={element}
                isOwner={false}
                num={null}
                points={null}
              />
            </CarouselItem>
          )
        }
      }
    })
    .filter((element) => {
      if (element) return element
    })
  const lendList = messagesList
    .map((element) => {
      if (element.round === 5) {
        if (element.creatorId === user.uid && element.text.choose === 2) {
          return (
            <CarouselItem key={element.id} className="flex justify-center">
              <Cards
                message={element}
                isOwner={true}
                num={null}
                points={null}
              />
            </CarouselItem>
          )
        } else if (
          element.creatorId !== user.uid &&
          element.text.choose === 1
        ) {
          return (
            <CarouselItem key={element.id} className="flex justify-center">
              <Cards
                message={element}
                isOwner={false}
                num={null}
                points={null}
              />
            </CarouselItem>
          )
        }
      }
    })
    .filter((element) => {
      if (element) return element
    })
  const mergedList = borrowList.concat(lendList)
  const selectedList = completedAction
    ? completedAction === 'borrow'
      ? borrowList
      : lendList
    : mergedList
  useEffect(() => {
    setCardNumber(1)
  }, [completedAction])

  return (
    <div className="flex flex-col gap-5 items-center">
      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full max-w-[60vw]"
        handleCardNumber={handleCardNumber}
      >
        <CarouselContent className="min-w-[260x]">
          {selectedList}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div>
        {completedAction
          ? completedAction === 'borrow'
            ? `${borrowing}: `
            : `${lending}: `
          : `${activitiesCompleted}: `}{' '}
        {cardNumber}/{selectedList.length}
      </div>
    </div>
  )
}

export default Carousels
