import { useEffect } from 'react'
import { webSocket } from 'src/webSocket'

export const useSupportTradesCallback = ({ changeConnectedUser, message }) => {
  useEffect(() => {
    if (!webSocket) return
    function sSupportTradesCallback(res) {
      const user = {
        uid: res.connectedId,
        displayName: res.connectedName,
        url: res.connectedUrl,
      }
      changeConnectedUser(user)
    }
    webSocket.on(`sSupportTrades${message.id}`, sSupportTradesCallback)
    return () => {
      webSocket.off(`sSupportTrades${message.id}`, sSupportTradesCallback)
    }
  })
}
