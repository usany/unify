import { useEffect } from 'react'
import useSelectors from 'src/hooks/useSelectors'
import { webSocket } from 'src/webSocket'

export const useOnPulseCallback = ({ round, changeOnPulse, message }) => {
  const profile = useSelectors((state) => state.profile.value)
  useEffect(() => {
    if (!webSocket) return
    function sOnPulseCallback(res) {
      if (res.choose === 1) {
        if (res.creatorId === profile?.uid) {
          if (round === 1 || round === 2) {
            changeOnPulse(true)
          } else {
            changeOnPulse(false)
          }
        } else if (res.connectedId === profile?.uid) {
          if (round === 4) {
            changeOnPulse(true)
          } else {
            changeOnPulse(false)
          }
        }
      } else {
        if (res.creatorId === profile?.uid) {
          if (round === 2 || round === 4) {
            changeOnPulse(true)
          } else {
            changeOnPulse(false)
          }
        } else if (res.connectedId === profile?.uid) {
          if (round === 3) {
            changeOnPulse(true)
          } else {
            changeOnPulse(false)
          }
        }
      }
    }
    webSocket.on(`sOnPulse${message.id}`, sOnPulseCallback)
    return () => {
      webSocket.off(`sOnPulse${message.id}`, sOnPulseCallback)
    }
  })
}
