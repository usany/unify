import { useEffect, useState } from 'react'

export const useRound = (message) => {
  const [round, setRound] = useState(0)
  const increaseRound = () => {
    setRound(round + 1)
  }
  const decreaseRound = () => {
    setRound(round - 1)
  }
  useEffect(() => {
    if (!round) {
      setRound(message.round)
    }
  })
  return {
    round: round,
    increaseRound: increaseRound,
    decreaseRound: decreaseRound,
  }
}
