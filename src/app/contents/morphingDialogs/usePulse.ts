import { useEffect, useState } from 'react'
import useSelectors from 'src/hooks/useSelectors'

export const usePulse = ({ message, round }) => {
  const [onPulse, setOnPulse] = useState(false)
  const changeOnPulse = (newValue) => setOnPulse(newValue)
  const profile = useSelectors((state) => state.profile.value)
  
  useEffect(() => {
    if (message.text?.choose === 1) {
      if (message.creatorId === profile?.uid) {
        if (round === 2 || round === 3) {
          changeOnPulse(true)
        } else {
          changeOnPulse(false)
        }
      } else if (message.connectedId === profile?.uid) {
        if (round === 4) {
          changeOnPulse(true)
        } else {
          changeOnPulse(false)
        }
      }
    } else {
      if (message.creatorId === profile?.uid) {
        if (round === 2 || round === 4) {
          changeOnPulse(true)
        } else {
          changeOnPulse(false)
        }
      } else if (message.connectedId === profile?.uid) {
        if (round === 3) {
          changeOnPulse(true)
        } else {
          changeOnPulse(false)
        }
      }
    }
  }, [round])
  return { onPulse: onPulse, changeOnPulse: changeOnPulse }
}
