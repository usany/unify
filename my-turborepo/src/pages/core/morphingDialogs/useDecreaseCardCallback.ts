import { useEffect } from 'react'
import { webSocket } from 'src/webSocket'

export const useDecreaseCardCallback = ({ decreaseRound, message }) => {
  useEffect(() => {
    if (!webSocket) return
    function sDecreaseCardCallback() {
      decreaseRound()
    }
    webSocket.on(`sDecrease${message.id}`, sDecreaseCardCallback)
    return () => {
      webSocket.off(`sDecrease${message.id}`, sDecreaseCardCallback)
    }
  })
}
