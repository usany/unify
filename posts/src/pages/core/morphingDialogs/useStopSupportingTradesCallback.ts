import { useEffect } from 'react'
import { webSocket } from 'src/webSocket'

export const useStopSupportingTradesCallback = ({
  changeConnectedUser,
  message,
}) => {
  useEffect(() => {
    if (!webSocket) return
    function sStopSupportingTradesCallback() {
      const user = {
        uid: '',
        displayName: '',
        url: '',
      }
      changeConnectedUser(user)
    }
    webSocket.on(
      `sStopSupportingTrades${message.id}`,
      sStopSupportingTradesCallback,
    )
    return () => {
      webSocket.off(
        `sStopSupportingTrades${message.id}`,
        sStopSupportingTradesCallback,
      )
    }
  })
}
