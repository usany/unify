import { DocumentData } from 'firebase/firestore'
import { Skeleton } from 'src/components/ui/skeleton'
import CardsStacksViews from './CardsStacksViews'
import EmptyCard from './EmptyCard'
import { useBringCards } from './useBringCards'

function CardsStacks() {
  const { messages, cardLoaded }: { messages: DocumentData[], cardLoaded: boolean } = useBringCards()
  return (
    <div>
      {!cardLoaded && !messages.length && navigator.onLine &&
        <Skeleton className='w-full h-[260px] rounded bg-light-3 dark:bg-dark-3' />
      }
      {(!navigator.onLine || cardLoaded) && (
        <>
          {navigator.onLine && !messages.length ? (
            <EmptyCard />
          ) : (
            <CardsStacksViews
              messages={messages}
            />
          )}
        </>
      )}
    </div>
  )
}

export default CardsStacks
