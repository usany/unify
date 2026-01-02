import {
  MorphingDialog,
  MorphingDialogContainer,
  MorphingDialogTrigger,
} from '@/components/ui/morphing-dialog'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { webSocket } from 'src/webSocket'
import CardsViews from '../card/CardsViews'
import Morphings from './Morphings'
import { useConnectedUser } from './useConnectedUser'
import { useDecreaseCardCallback } from './useDecreaseCardCallback'
import { useIncreaseCardCallback } from './useIncreaseCardCallback'
import { useOnPulseCallback } from './useOnPulseCallback'
import { usePulse } from './usePulse'
import { useStopSupportingTradesCallback } from './useStopSupportingTradesCallback'
import { useSupportTradesCallback } from './useSupportTradesCallback'
import useSelectors from 'src/hooks/useSelectors'

interface Props {
  message: { id: string; text: object }
}
const MorphingDialogs = ({
  message,
  changeMessage,
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
  const profile = useSelectors((state) => state.profile.value)
  const round = message?.round
  // useEffect(() => {
  //   if (message?.round > 1 && !message?.connectedProfileImage) {
  //     changeMessage((prev) => {
  //       return {...prev, connectedProfileImage: profile.profileImage, connectedProfileImageUrl: profile.profileImageUrl, connectedDefaultProfile: profile.defaultProfile}
  //     })
  //   }
  // }, [round])
  const changemessage = (newValue) => changeMessage(newValue)
  // const increaseRound = () => {
  //   if (message.round === 1) {
  //     changeMessage((prev) => {
  //       return {...prev, connectedId: profile.uid, connectedProfileImage: profile.profileImage, connectedProfileImageUrl: profile.profileImageUrl, connectedDefaultProfile: profile.defaultProfile, round: prev.round+1}
  //     })
  //   } else {
  //     changeMessage((prev) => {
  //       return (
  //         {...prev, round: prev.round+1}
  //       )
  //     })
  //   }
  // }
  // const decreaseRound = () => {
  //   if (message.round === 2) {
  //     changeMessage((prev) => {
  //       return {...prev, connectedId: '', connectedProfileImage: false, connectedProfileImageUrl: '', connectedDefaultProfile: '', round: prev.round-1}
  //     })
  //   } else {
  //     changeMessage((prev) => {
  //       return (
  //         {...prev, round: prev.round-1}
  //       )
  //     })
  //   }
  // }
  const handleConnectedClock = (newValue) => {
    setConnectedClock(newValue)
  }
  const handleConfirmingClock = (newValue) => {
    setConfirmingClock(newValue)
  }
  const handleReturningClock = (newValue) => {
    setReturningClock(newValue)
  }
  const handleConfirmedReturnClock = (newValue) => {
    setConfirmedReturnClock(newValue)
  }
  const toggleOnTransfer = () => setOnTransfer(!onTransfer)
  const { connectedUser, changeConnectedUser } = useConnectedUser({
    message: message,
  })
  const { onPulse, changeOnPulse } = usePulse({
    message: message,
    round: message?.round,
  })
  useOnPulseCallback({
    round: round,
    changeOnPulse: changeOnPulse,
    message: message,
  })
  useIncreaseCardCallback({ increaseRound, message })
  useDecreaseCardCallback({ decreaseRound, message })
  useSupportTradesCallback({ changeConnectedUser, message })
  useStopSupportingTradesCallback({ changeConnectedUser, message })
  useEffect(() => {
    if (!webSocket) return
    function sConnectedClockCallback(res) {
      setConnectedClock({ ...connectedClock, clock: res.connectedClock })
    }
    webSocket.on(`sConnected${message.id}`, sConnectedClockCallback)
    return () => {
      webSocket.off(`sConnected${message.id}`, sConnectedClockCallback)
    }
  }, [])
  useEffect(() => {
    if (!webSocket) return
    function sConfirmingClockCallback(res) {
      setConfirmingClock(res.confirmingClock)
    }
    webSocket.on(`sConfirming${message.id}`, sConfirmingClockCallback)
    return () => {
      webSocket.off(`sConfirming${message.id}`, sConfirmingClockCallback)
    }
  }, [])
  useEffect(() => {
    if (!webSocket) return
    function sReturningClockCallback(res) {
      setReturningClock(res.returningClock)
    }
    webSocket.on(`sReturning${message.id}`, sReturningClockCallback)
    return () => {
      webSocket.off(`sReturning${message.id}`, sReturningClockCallback)
    }
  }, [])
  useEffect(() => {
    if (!webSocket) return
    function sConfirmedReturnClockCallback(res) {
      setConfirmedReturnClock(res.confirmedReturnClock)
    }
    webSocket.on(`sConfirmedReturn${message.id}`, sConfirmedReturnClockCallback)
    return () => {
      webSocket.off(
        `sConfirmedReturn${message.id}`,
        sConfirmedReturnClockCallback,
      )
    }
  }, [])
  useEffect(() => {
    if (!webSocket) return
    function sIssueTrue(res) {
      changeMessage((prev) => ({...prev, issue: true, issueClock: res.issueClock}))
    }
    webSocket.on(`sIssueTrue${message.id}`, sIssueTrue)
    return () => {
      webSocket.off(
        `sIssueTrue${message.id}`,
        sIssueTrue,
      )
    }
  }, [])
  useEffect(() => {
    if (!webSocket) return
    function sIssueFalse() {
      changeMessage((prev) => ({...prev, issue: false, issueClock: ''}))
    }
    webSocket.on(`sIssueFalse${message.id}`, sIssueFalse)
    return () => {
      webSocket.off(
        `sIssueFalse${message.id}`,
        sIssueFalse,
      )
    }
  }, [])
  console.log(message)
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
          to={`${location.pathname}?card=${message.id}`}
        >
          <CardsViews
            message={message}
            onTransfer={onTransfer}
          />
        </Link>
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <Morphings
          increaseRound={increaseRound}
          decreaseRound={decreaseRound}
          message={message}
          onPulse={onPulse}
          changeOnPulse={changeOnPulse}
          connectedUser={connectedUser}
          changeConnectedUser={changeConnectedUser}
          toggleOnTransfer={toggleOnTransfer}
          connectedClock={connectedClock}
          confirmingClock={confirmingClock}
          returningClock={returningClock}
          confirmedReturnClock={confirmedReturnClock}
          handleConnectedClock={handleConnectedClock}
          handleConfirmingClock={handleConfirmingClock}
          handleReturningClock={handleReturningClock}
          handleConfirmedReturnClock={handleConfirmedReturnClock}
          changeMessageValue={changemessage}
        />
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}

export default MorphingDialogs
