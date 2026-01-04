// import { useState, useEffect, useLayoutEffect } from 'react'
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
// import { collection, query, QuerySnapshot, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc, limit } from 'firebase/firestore';
// import { webSocket, onClick } from 'src/webSocket.tsx'
// import { useSelector, useDispatch } from 'react-redux'
import { User } from 'firebase/auth';
// import { changeNewMessage, changeNewMessageTrue, changeNewMessageFalse } from 'src/stateSlices/newMessageSlice'
// import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
// import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc, limit } from 'firebase/firestore';

interface Props {
  userObj: User
  profileUrl: string
  conversation: string
  displayName: string
  chattingUid: string
  multiple: boolean
  clock: Date
  message: {
    message: string
    piazzaChecked: string[],
    messageCount: number,
  }
}

const PiazzaChats = ({ userObj, profileUrl, conversation, displayName, chattingUid, multiple, clock, message }: Props) => {
  let messageAmpm
  let messageHours = clock.getHours()
  let messageMonth = (clock.getMonth() + 1).toString()
  let messageDate = (clock.getDate()).toString()
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

  const piazzaRef = useRef()
  useLongPress(piazzaRef, () => {
    document.getElementById('piazzaDrawer')?.click()
    const rootElement = document.getElementById('sample');
    rootElement.addEventListener('contextmenu', (event) => event.preventDefault());
    return () => {
      rootElement.removeEventListener('contextmenu', (event) => event.preventDefault());
    };
  })


  return (
    <div>
      {/* <Chats id='piazza' ref={piazzaRef} userObj={userObj} profileUrl={''} conversation={''} displayName={''} chattingUid={''} multiple={true} clock={clock} message={piazzaMessage} /> */}
    </div>
  );
}

export default PiazzaChats
