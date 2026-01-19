import Tilt from 'react-parallax-tilt'
import CardView from './CardView'
import getShadowColor from './getShadowColor'
const CardsViews = ({ message, onTransfer }: { message: any, onTransfer: boolean }) => {
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
