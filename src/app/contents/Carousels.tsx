import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { useEffect, useState } from 'react'
import Cards from '@/app/components/Cards'
import { useLanguage } from '@/app/context/LanguageContext'

const Carousels = ({completedAction}) => {
  const [cardNumber, setCardNumber] = useState(1)
  const handleCardNumber = (newValue) => setCardNumber(newValue)
  const {language} = useLanguage()
  const messagesList = [
    {
      id: '1',
      text: {
        choose: 1
      },
      creatorId: '1',
      connectedId: '2',
      round: 5,
    },
    {
      id: '2',
      text: {
        choose: 2
      },
      creatorId: '2',
      connectedId: '1',
      round: 5,
    }
  ]

  const borrowList = messagesList
    .map((element) => {
      if (element.round === 5) {
        if (element.creatorId === user.uid && element.text.choose === 1) {
          return (
            <CarouselItem key={element.id} className="flex justify-center">
              <Cards
                message={element}
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
        completedAction={completedAction}
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
            ? `${language === 'en' ? 'Borrowing' : '빌리기'}: `
            : `${language === 'en' ? 'Lending' : '빌려주기'}: `
          : `${language === 'en' ? 'Activities Completed' : '활동 완료'}: `}{' '}
        {cardNumber}/{selectedList.length}
      </div>
    </div>
  )
}

export default Carousels
