import { useState } from 'react'
import Tilt from 'react-parallax-tilt'
import { PulsatingButton } from 'src/components/ui/pulsating-button'
import SpecificsRear from './SpecificsRear'
import SpecificsDefault from './SpecificsDefault'
import getShadowColor from './getShadowColor'
import { RotateCcw, Redo } from 'lucide-react';
import { usePulse } from '../morphingDialogs/usePulse'

interface Props {
  message: {}
}

function Specifics({
  increaseRound,
  decreaseRound,
  drawerOpenTrue,
  message,
  connectedUser,
  changeConnectedUser,
  toggleOnTransfer,
  connectedClock,
  confirmingClock,
  returningClock,
  confirmedReturnClock,
  handleConnectedClock,
  handleConfirmingClock,
  handleReturningClock,
  handleConfirmedReturnClock,
  changeMessageValue
}: Props) {
  const [cardFlipped, setCardFlipped] = useState(false)
  const [cardTilt, setCardTilt] = useState(false)
  const [cardTilting, setCardTilting] = useState(null)
  const [onMove, setOnMove] = useState(false)
  const id = message?.id || ''
  const shadowColor = getShadowColor(id)
  const flipCards = () => {
    setCardFlipped(!cardFlipped)
  }
  const { onPulse, changeOnPulse } = usePulse({
    message: message,
    round: message?.round,
  })
  
  return (
    <div
      className="z-50 text-xs"
      onMouseDownCapture={() => {
        setOnMove(true)
      }}
      onTouchStartCapture={() => {
        setOnMove(true)
      }}
      onMouseMove={() => {
        if (onMove) {
          setCardTilting(null)
          setCardTilt(true)
        }
      }}
      onMouseLeave={() => {
        setOnMove(false)
        setTimeout(() => {
          setCardTilt(false)
        }, 10)
      }}
      onTouchMove={() => {
        if (onMove) {
          setCardTilting(null)
          setCardTilt(true)
        }
      }}
      onMouseUp={() => {
        setCardTilting(0)
        setOnMove(false)
        setTimeout(() => {
          setCardTilt(false)
        }, 10)
      }}
      onTouchEndCapture={() => {
        setCardTilting(0)
        setOnMove(false)
        setTimeout(() => {
          setCardTilt(false)
        }, 10)
      }}
    >
      <div className="flex justify-center" onClick={flipCards}>
        <Redo />
      </div>
      <Tilt
        tiltEnable={cardTilt}
        tiltAngleXManual={cardTilting}
        tiltAngleYManual={cardTilting}
      >
        <div className={`cards ${cardFlipped && 'rotatingCards'} z-50`}>
          <div className="sides">
            {onPulse || message.issue ? (
              <PulsatingButton
                pulseColor={shadowColor}
                className="cursor-default"
              >
                <SpecificsDefault
                  drawerOpenTrue={drawerOpenTrue}
                  message={message}
                  connectedUser={connectedUser}
                  increaseRound={increaseRound}
                  decreaseRound={decreaseRound}
                  changeOnPulse={changeOnPulse}
                  changeConnectedUser={changeConnectedUser}
                  toggleOnTransfer={toggleOnTransfer}
                  handleConnectedClock={handleConnectedClock}
                  handleConfirmingClock={handleConfirmingClock}
                  handleReturningClock={handleReturningClock}
                  handleConfirmedReturnClock={handleConfirmedReturnClock}
                  changeMessageValue={changeMessageValue}
                />
              </PulsatingButton>
            ) : (
              <SpecificsDefault
                drawerOpenTrue={drawerOpenTrue}
                message={message}
                connectedUser={connectedUser}
                increaseRound={increaseRound}
                decreaseRound={decreaseRound}
                changeOnPulse={changeOnPulse}
                changeConnectedUser={changeConnectedUser}
                toggleOnTransfer={toggleOnTransfer}
                handleConnectedClock={handleConnectedClock}
                handleConfirmingClock={handleConfirmingClock}
                handleReturningClock={handleReturningClock}
                handleConfirmedReturnClock={handleConfirmedReturnClock}
                changeMessageValue={changeMessageValue}
              />
            )}
          </div>
          <SpecificsRear
            message={message}
            connectedClock={connectedClock}
            confirmingClock={confirmingClock}
            returningClock={returningClock}
            confirmedReturnClock={confirmedReturnClock}
          />
        </div>
      </Tilt>
    </div>
  )
}

export default Specifics
