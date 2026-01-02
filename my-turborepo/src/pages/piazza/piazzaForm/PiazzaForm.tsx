import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import { AlarmCheck, PlusCircle, UserRound } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { dbservice } from 'src/baseApi/serverbase'
import useSelectors from 'src/hooks/useSelectors'
import Popups from 'src/pages/core/Popups'
import { changeNewMessageTrue } from 'src/stateSlices/newMessageSlice'
import useTexts from 'src/hooks/useTexts'
import { webSocket } from 'src/webSocket.tsx'
import PiazzaFormCallsContent from './PiazzaFormCallsContent'
import { useEffect, useRef } from 'react'

interface Props {
  chattingUser: {
    uid: string
    displayName: string
    profileImage: boolean
    defaulProfile: string
    profileUrl: string
  } | null
  multiple: boolean
  messages: string
  handleMessages: (newValue: string) => void
  messagesList: []
  handleMessagesList: (newValue: []) => void
  isKeyboardOpen: boolean
}
function PiazzaForm({
  chattingUser,
  multiple,
  messages,
  handleMessages,
  messagesList,
  handleMessagesList,
  isKeyboardOpen
}: Props) {
  const piazzaForm = useSelectors((state) => state.piazzaForm.value)
  const profile = useSelectors((state) => state.profile?.value)
  const dispatch = useDispatch()
  const conversation = location.search
    ? location.search.slice(location.search.indexOf('=') + 1)
    : 'piazza'
  const { message, send, selectCall, videoCall, audioCall } = useTexts()
  const userUid = profile?.uid
  const userName = profile?.displayName
  const inputRef = useRef(null)
  const onSendSubmitHandler = async (event) => {
    event.preventDefault()
    const message = messages
    const messageClockNumber = Date.now()
    const messageClock = new Date().toString()
    const profileImageUrl = profile?.profileImageUrl
    const defaultProfile = profile?.defaultProfile
    const profileImage = profile?.profileImage
    let toUserRef
    let toUser
    let messagingToken
    if (chattingUser) {
      toUserRef = doc(dbservice, `members/${chattingUser.uid}`)
      toUser = await getDoc(toUserRef)
      messagingToken = toUser.data()?.messagingToken
    }
    const profileUrl = profile?.profileImage
      ? profile?.profileImageUrl
      : profile?.defaultProfile
    const sendData = {
      msg: message,
      userUid: userUid,
      id: userName,
      messageClockNumber: messageClockNumber,
      messageClock: messageClock,
      // target: privateTarget,
      conversation: conversation,
      conversationUid: chattingUser?.uid,
      conversationName: chattingUser?.displayName,
      profileImage: profileImage,
      defaultProfile: defaultProfile,
      profileImageUrl: profileImageUrl,
      profileUrl: profileUrl,
      sendingToken: messagingToken,
    }
    if (multiple) {
      if (sendData && message) {
        console.log(message)
        webSocket.emit('piazzaMessage', sendData)
        onForm()
      }
    } else {
      if (message) {
        if (messagesList.length !== 0) {
          webSocket.emit('message', sendData)
          console.log('message')
        } else {
          webSocket.emit('messageNew', sendData)
          console.log('messageNew')
        }
        onFormConversation()
      }
    }
    handleMessages('')
  }

  const onChangeMsgHandler = (event) => {
    handleMessages(event.target.value)
  }

  const onForm = async () => {
    try {
      const message = messages
      const messageClock = new Date().toString()
      const messageClockNumber = Date.now()
      const profileImageUrl = profile?.profileImageUrl
      const defaultProfile = profile?.defaultProfile
      const profileImage = profile?.profileImage
      if (message) {
        await addDoc(collection(dbservice, 'chats_group'), {
          userUid: userUid,
          userName: userName,
          message: message,
          messageClock: messageClock,
          messageClockNumber: messageClockNumber,
          profileImageUrl: profileImageUrl,
          defaultProfile: defaultProfile,
          piazzaChecked: [userUid],
          profileImage: profileImage,
        })
        handleMessagesList((prev) => [
          ...prev,
          {
            msg: message,
            type: 'me',
            userUid: userUid,
            id: userName,
            messageClock: messageClock,
            conversation: null,
            messageClockNumber: messageClockNumber,
            defaultProfile: defaultProfile,
            profileImageUrl: profileImageUrl,
            profileImage: profileImage || false,
          },
        ])
      }
    } catch (error) {
      console.log(error)
    }
  }
  const onFormConversation = async () => {
    const message = messages
    try {
      const messageClockNumber = Date.now()
      const messageClock = new Date().toString()
      const profileImageUrl = profile?.profileImageUrl
      const otherProfileUrl = chattingUser.profileImageUrl
      const defaultProfile = profile?.defaultProfile
      const otherDefaultProfile = chattingUser.defaultProfile
            const userOne = userUid < chattingUser.uid ? userUid : chattingUser.uid
      const userTwo = userUid < chattingUser.uid ? chattingUser.uid : userUid
      const userOneDisplayName =
        userUid < chattingUser.uid ? userName : chattingUser.displayName
      const userTwoDisplayName =
        userUid < chattingUser.uid ? chattingUser.displayName : userName
      let userOneProfileUrl =
        userUid < chattingUser.uid ? profileImageUrl : otherProfileUrl
      let userTwoProfileUrl =
        userUid < chattingUser.uid ? otherProfileUrl : profileImageUrl
      const userOneDefaultProfile =
        userUid < chattingUser.uid ? defaultProfile : otherDefaultProfile
      const userTwoDefaultProfile =
        userUid < chattingUser.uid ? otherDefaultProfile : defaultProfile
      const userOneProfileImage =
        userUid < chattingUser.uid ? profile?.profileImage : chattingUser.profileImage
      const userTwoProfileImage =
        userUid < chattingUser.uid ? chattingUser.profileImage : profile?.profileImage
      if (!userOneProfileUrl) {
        const userRef = doc(dbservice, `members/${userOne}`)
        const userSnap = await getDoc(userRef)
        const userUrl = userSnap.data()?.profileImageUrl
        userOneProfileUrl = userUrl
      }
      if (!userTwoProfileUrl) {
        const userRef = doc(dbservice, `members/${userTwo}`)
        const userSnap = await getDoc(userRef)
        const userUrl = userSnap.data()?.profileImageUrl
        userTwoProfileUrl = userUrl
      }
      if (message) {
        const messageObj = {
          userUid: userUid,
          userName: userName,
          message: message,
          messageClock: messageClock,
          messageClockNumber: messageClockNumber,
          userOne: userOne,
          userTwo: userTwo,
          userOneDisplayName: userOneDisplayName,
          userTwoDisplayName: userTwoDisplayName,
          userOneProfileUrl: userOneProfileUrl,
          userTwoProfileUrl: userTwoProfileUrl,
          userOneDefaultProfile: userOneDefaultProfile,
          userTwoDefaultProfile: userTwoDefaultProfile,
          userOneProfileImage: userOneProfileImage,
          userTwoProfileImage: userTwoProfileImage,
        }

        await addDoc(collection(dbservice, `chats_${conversation}`), messageObj)
        const myDocRef = doc(dbservice, `members/${userUid}`)
        const myDocSnap = await getDoc(myDocRef)
        const myChattings = myDocSnap.data().chattings || {}
        const userDocRef = doc(dbservice, `members/${chattingUser.uid}`)
        const userDocSnap = await getDoc(userDocRef)
        const userChattings = userDocSnap.data().chattings || {}
        const myConversation = myDocSnap.data().conversation || []
        const userConversation = userDocSnap.data().conversation || []
        if (myConversation.indexOf(conversation) === -1) {
          await updateDoc(myDocRef, {
            conversation: [...myConversation, conversation],
          })
          dispatch(changeNewMessageTrue())
        }
        if (userConversation.indexOf(conversation) === -1) {
          await updateDoc(userDocRef, {
            conversation: [...userConversation, conversation],
          })
        }
        const userChattingsNumber =
          userChattings[conversation]?.messageCount || 0
        myChattings[conversation] = messageObj
        userChattings[conversation] = {
          ...messageObj,
          messageCount: userChattingsNumber + 1,
        }
        await updateDoc(myDocRef, {
          chattings: myChattings,
        })
        await updateDoc(userDocRef, {
          chattings: userChattings,
        })
        handleMessagesList((prev) => [
          ...prev,
          {
            msg: message,
            type: 'me',
            userUid: userUid,
            id: userName,
            messageClock: messageClock,
            conversation: conversation,
            userName: userName,
            messageClockNumber: messageClockNumber,
            userOne: userOne,
            userTwo: userTwo,
            userOneDisplayName: userOneDisplayName,
            userTwoDisplayName: userTwoDisplayName,
            userOneProfileUrl: userOneProfileUrl,
            userTwoProfileUrl: userTwoProfileUrl,
            userOneDefaultProfile: userOneDefaultProfile,
            userTwoDefaultProfile: userTwoDefaultProfile,
            userOneProfileImage: userOneProfileImage,
            userTwoProfileImage: userTwoProfileImage,
          },
        ])
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (piazzaForm) {
      inputRef.current?.scrollIntoView({behavior: 'smooth'})
    }
  }, [piazzaForm])
  return (
    <form
      className={`fixed w-full ${
        piazzaForm ? 'bottom-0' : 'bottom-[60px]'
      } flex gap-px`}
      onSubmit={(event) => {
        inputRef.current?.focus()
        onSendSubmitHandler(event)
      }}
    >
      {conversation && conversation !== 'piazza' && (
        <Popups
          trigger={
            <div className="flex items-center px-1 h-full rounded bg-light-2 dark:bg-dark-2">
              <PlusCircle />
            </div>
          }
          title={selectCall}
          content={
            <PiazzaFormCallsContent chattingUser={chattingUser}/>
          }
        />
      )}
      <input
        ref={inputRef}
        className="w-full p-3 rounded bg-light-1 dark:bg-dark-1"
        placeholder={message}
        onChange={onChangeMsgHandler}
        value={messages}
        autoFocus
        // onFocus={() => {
        //   window.scrollTo({
        //     top: document.body.scrollHeight,
        //     behavior: 'smooth',
        //   })
        //   inputRef.current?.scrollIntoView()
        //   setTimeout(() => inputRef.current?.scrollIntoView(), 500)
        // }}
      />
      <button className="w-1/6 rounded bg-light-2 dark:bg-dark-2" type="submit">
        {send}
      </button>
    </form>
  )
}

export default PiazzaForm
