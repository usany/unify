import { DocumentData } from 'firebase/firestore'
import useSelectors from 'src/hooks/useSelectors'
import Cards from './Cards'
import { AnimatedGroup } from 'src/components/motion-primitives/animated-group'

const CardsStacksViewsCollection = ({
  messages,
  longPressCard,
  changeLongPressCard
}: {
  messages: DocumentData[]
  longPressCard: string
  changeLongPressCard: (newValue: string) => void
}) => {
  // const [delayed, setDelayed] = useState(true)
  // const delayedTrue = () => setDelayed(true)
  // const delayedFalse = () => setDelayed(false)
  const onLine = useSelectors(state => state.onLine.value)
  const profile = useSelectors((state) => state.profile.value)

  // useEffect(() => {
  //   if (!delayed) {
  //     setTimeout(() => delayedTrue(), 250)
  //   }
  // })
  if (messages.length) {
    localStorage.setItem('cards', JSON.stringify(messages))
  }
  const messagesArray = onLine ? messages : JSON.parse(localStorage.getItem('cards') || '[]') as DocumentData[]
  return (
    <AnimatedGroup
      id="items"
      className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] col-span-full"
    >
      {messagesArray.map((value) => {
        if (value.round !== 5) {
          if (
            value.creatorId === profile?.uid ||
            (value.connectedId === profile?.uid && value.round !== 1)
          ) {
            return (
              <div
                key={value.id}
                id={value.id}
                className="item-list flex justify-center"
              >
                <Cards
                  message={value}
                  longPressCard={longPressCard}
                  changeLongPressCard={changeLongPressCard}
                  // delayed={delayed}
                  // delayedFalse={delayedFalse}
                />
              </div>
            )
          }
        }
      })}
    </AnimatedGroup>
  )
}

export default CardsStacksViewsCollection
