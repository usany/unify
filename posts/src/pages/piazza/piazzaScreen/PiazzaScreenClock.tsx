// import {
//   collection,
//   doc,
//   getDoc,
//   getDocs,
//   limit,
//   orderBy,
//   query,
//   startAfter,
//   updateDoc,
// } from 'firebase/firestore'
// import { useEffect, useRef, useState } from 'react'
// import { dbservice } from 'src/baseApi/serverbase'
// import Avatars from 'src/pages/core/Avatars'
// import Popups from 'src/pages/core/Popups'
// import { webSocket } from 'src/webSocket.tsx'
// import PiazzaDialogsContent from './piazzaDialogs/PiazzaDialogsContent'
import useSelectors from 'src/hooks/useSelectors'
import useTexts from 'src/hooks/useTexts'

const PiazzaScreenClock = ({ value }) => {
  const languages = useSelectors((state) => state.languages.value)
  const clock = new Date(value.messageClock)
  let messageHours = clock.getHours()
  const messageMonth = (clock.getMonth() + 1 < 10 ? '0':'')+(clock.getMonth() + 1).toString()
  const messageDate = (clock.getDate()<10 ? '0':'') + clock.getDate().toString()
  const messageAmpm = messageHours >= 13 ? '오후' : '오전'
  if (messageHours >= 13) {
    if (messageHours !== 12) {
      messageHours = messageHours - 12
    }
  } else {
    if (messageHours === 0) {
      messageHours = messageHours + 12
    }
  }
  return (
    <>
      {clock.getFullYear()}-{messageMonth}-{messageDate}{' '}
      {languages === 'ko' && messageAmpm} {messageHours}:
      {clock.getMinutes() < 10 && '0'}
      {clock.getMinutes()}
      {languages === 'en' &&
        (messageAmpm === '오전' ? 'am' : 'pm')}
    </>
  )
}

export default PiazzaScreenClock
