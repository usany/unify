import {
  MorphingDialog,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogTrigger,
} from '../../components/ui/morphing-dialog'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CardsViews from '../card/CardsViews'
import Morphings from './Morphings'
import Specifics from './specifics/Specifics'

interface Props {
  message: { id: string; text: object }
}
const MorphingDialogs = ({
  message,
  increaseRound,
  decreaseRound
}: Props) => {
  const [onTransfer, setOnTransfer] = useState(false)
  const [connectedClock, setConnectedClock] = useState({
    clock: '',
    cancelled: false,
  })
  const [confirmingClock, setConfirmingClock] = useState('')
  const [returningClock, setReturningClock] = useState('')
  const [confirmedReturnClock, setConfirmedReturnClock] = useState('')
  return (
    <MorphingDialog
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
      }}
    >
      <MorphingDialogTrigger>
        <Link
          key={message.id}
          // Moving to the product page
          to={`${location.pathname}?card=sample`}
        >
          <CardsViews
            message={message}
            onTransfer={onTransfer}
          />
        </Link>
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent
          drawerOpen={drawerOpen}
          drawerOpenFalse={drawerOpenFalse}
        >
          <Specifics />
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}

export default MorphingDialogs
