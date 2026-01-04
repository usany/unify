import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
} from 'firebase/firestore'
import { useEffect, useRef, useState } from 'react'
import { dbservice } from 'src/baseApi/serverbase'
import useSelectors from 'src/hooks/useSelectors'
import Avatars from 'src/pages/core/Avatars'
import Popups from 'src/pages/core/Popups'
import { webSocket } from 'src/webSocket.tsx'
import PiazzaDialogsContent from './piazzaDialogs/PiazzaDialogsContent'

const FormatClock = ({messageClock}) => {
  const languages = useSelectors((state) => state.languages.value)
  const clock = new Date(messageClock)
  let messageAmpm
  let messageHours = clock.getHours()
  let messageMonth = (clock.getMonth() + 1).toString()
  let messageDate = clock.getDate().toString()
  if (messageHours >= 13) {
    messageAmpm = '오후'
    if (messageHours !== 12) {
      messageHours = messageHours - 12
    }
  } else {
    messageAmpm = '오전'
    if (messageHours === 0) {
      messageHours = messageHours + 12
    }
  }
  if (clock.getMonth() + 1 < 10) {
    messageMonth = '0' + messageMonth
  }
  if (messageDate.length === 1) {
    messageDate = '0' + messageDate
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

export default FormatClock
