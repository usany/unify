import { ClickAwayListener } from '@mui/material'
import Draggable from 'src/pages/main/menu/Draggable'
import CardsViews from './CardsViews'

const CardsLongPressed = ({
  longPressCard,
  message,
  changeLongPressCard,
}) => {
  return (
    <ClickAwayListener
      onClickAway={() => {
        if (longPressCard === message.id) {
          changeLongPressCard('')
        }
      }}
    >
      <div className="flex">
        <Draggable id={message.id}>
          <div
            className="longPress touch-none"
          >
            <CardsViews message={message} />
          </div>
        </Draggable>
      </div>
    </ClickAwayListener>
  )
}

export default CardsLongPressed
