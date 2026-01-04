import { useEffect } from 'react'
import { webSocket } from 'src/webSocket'

export const useIncreaseCardCallback = ({ increaseRound, message }) => {
  useEffect(() => {
    if (!webSocket) return
    function sIncreaseCardCallback(res) {
      console.log(res)
      increaseRound(res)
    }
    webSocket.on(`sIncrease${message.id}`, sIncreaseCardCallback)
    return () => {
      webSocket.off(`sIncrease${message.id}`, sIncreaseCardCallback)
    }
  })
}
