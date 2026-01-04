import { useEffect, useState } from 'react'

export const useConnectedUser = ({ message }) => {
  const [connectedUser, setConnectedUser] = useState({
    uid: '',
    displayName: '',
    url: '',
  })
  const changeConnectedUser = (newValue) => setConnectedUser(newValue)
  useEffect(() => {
    setConnectedUser({
      uid: message.connectedId,
      displayName: message.connectedName,
      url: message.connectedUrl,
    })
  }, [message])
  return {
    connectedUser: connectedUser,
    changeConnectedUser: changeConnectedUser,
  }
}
