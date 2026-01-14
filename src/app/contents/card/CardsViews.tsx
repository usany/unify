import Tilt from 'react-parallax-tilt'
// import { PulsatingButton } from 'src/components/ui/pulsating-button'
import CardView from './CardView'
// import { DocumentData } from 'firebase/firestore'
import getShadowColor from '../specifics/getShadowColor'
// import { usePulse } from '../morphingDialogs/usePulse'
interface Props {
  message: DocumentData
  onPulse?: boolean
  onTransfer?: boolean
}
const CardsViews = ({ message, onTransfer }: Props) => {
  const id = message?.id || ''
  const shadowColor = getShadowColor(id)
  const issue = message?.issue
  // const { onPulse } = usePulse({
  //   message: message,
  //   round: message?.round,
  // })
  if (!id) return null
  return (
    <Tilt>
      <CardView
        onTransfer={onTransfer}
        message={message}
        shadowColor={shadowColor}
      />
    </Tilt>
  )
}

export default CardsViews
