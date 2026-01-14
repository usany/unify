import Tilt from 'react-parallax-tilt'
import CardView from './CardView'
import { DocumentData } from 'firebase/firestore'
import getShadowColor from './getShadowColor'
interface Props {
  message: DocumentData
  onPulse?: boolean
  onTransfer?: boolean
}
const CardsViews = ({ message, onTransfer }: Props) => {
  const id = Date.now().toString()
  const shadowColor = getShadowColor(id)
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
