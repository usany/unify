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
import useTexts from 'src/hooks/useTexts'
import Avatars from 'src/pages/core/Avatars'
import Popups from 'src/pages/core/Popups'
import { webSocket } from 'src/webSocket.tsx'
import PiazzaDialogsContent from './piazzaDialogs/PiazzaDialogsContent'
import PiazzaDialogsTitle from './PiazzaDialogsTitle'
import PiazzaScreenClock from './PiazzaScreenClock'

const PiazzaDialogsTitle = ({user, displayedName}) => {
  const languages = useSelectors((state) => state.languages.value)
  return (
    <>
      <div className="flex justify-center">
        {user?.displayName}
      </div>
      {user?.displayName !== displayedName && (
        <>
          {languages === 'ko' ? (
            `(${displayedName}에서 개명)`
          ) : (
            `(Changed name from ${displayedName})`
          )}
        </>
      )}
    </>
  )
}
const PiazzaScreenViewClock = ({ value }) => {
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
interface Props {
  isKeyboardOpen: boolean
  messagesList: []
  handleMessagesList: (newValue: []) => void
  handleChatUid: (newValue: string) => void
  handleChatDisplayName: (newValue: string) => void
}
function PiazzaScreen({
  isKeyboardOpen,
  messagesList,
  handleMessagesList,
  handleChatUid,
  handleChatDisplayName,
}: Props) {
  const messagesEndRef = useRef(null)
  const boxRef = useRef(null)
  const [user, setUser] = useState(null)
  const [displayedName, setDisplayedName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [continuing, setContinuing] = useState(null)
  const [continueNumber, setContinueNumber] = useState(0)
  const [currentConversation, setCurrentConversation] = useState('piazza')
  const profile = useSelectors((state) => state.profile.value)
  const conversation = location.search
    ? location.search.slice(location.search.indexOf('=') + 1)
    : 'piazza'
  useEffect(() => {
    if (currentConversation !== conversation || conversation === 'piazza') {
      handleMessagesList([])
      setContinuing(null)
      setContinueNumber(0)
      setCurrentConversation(conversation)
    }
  }, [conversation])
  const {loading} = useTexts()
  const onDrawer = async ({ userUid, displayName }) => {
    document.getElementById('drawer')?.click()
    const userRef = doc(dbservice, `members/${userUid}`)
    const userDoc = await getDoc(userRef)
    const userElement = userDoc.data()
    setUser(userElement)
    setDisplayedName(displayName)
  }
  const scrollNumber = 20
  useEffect(() => {
    if (!webSocket) return
    function sMessageCallback(message) {
      const {
        msg,
        userUid,
        id,
        target,
        messageClock,
        messageClockNumber,
        profileImageUrl,
        defaultProfile,
        profileImage,
        conversation,
      } = message
      handleMessagesList((prev) => [
        ...prev,
        {
          msg: msg,
          type: target ? 'private' : 'other',
          userUid: userUid,
          id: id,
          messageClock: messageClock,
          messageClockNumber: messageClockNumber,
          conversation: null,
          profileImageUrl: profileImageUrl,
          defaultProfile: defaultProfile,
          profileImage: profileImage,
        },
      ])
    }
    webSocket.on('sMessagePiazza', sMessageCallback)
    return () => {
      webSocket.off('sMessagePiazza', sMessageCallback)
    }
  }, [])
  useEffect(() => {
    if (!webSocket) return
    function sMessageCallback(message) {
      const {
        msg,
        userUid,
        id,
        target,
        messageClock,
        messageClockNumber,
        profileImageUrl,
        defaultProfile,
        profileImage,
        piazzaData,
        conversation,
      } = message
      handleMessagesList((prev) => [
        ...prev,
        {
          msg: msg,
          type: target ? 'private' : 'other',
          userUid: userUid,
          id: id,
          messageClock: messageClock,
          messageClockNumber: messageClockNumber,
          conversation: null,
          profileImageUrl: profileImageUrl,
          defaultProfile: defaultProfile,
          profileImage: profileImage,
          ...piazzaData,
        },
      ])
    }
    webSocket.on(`sMessage${conversation}`, sMessageCallback)
    return () => {
      webSocket.off(`sMessage${conversation}`, sMessageCallback)
    }
  }, [conversation])
  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    })
  }, [])

  useEffect(() => {
    scrollToBottom()
    const checkMessage = async () => {
      if (conversation === 'piazza') {
        const piazzaRef = collection(dbservice, 'chats_group')
        const piazzaCollection = query(
          piazzaRef,
          orderBy('messageClockNumber', 'desc'),
          limit(1),
        )
        const piazzaMessages = await getDocs(piazzaCollection)
        piazzaMessages.forEach(async (document) => {
          const myDocRef = doc(dbservice, `chats_group/${document.id}`)
          const myDocSnap = await getDoc(myDocRef)
          const myChattings = myDocSnap.data()
          const piazzaCheckedList = myChattings.piazzaChecked || []
          if (piazzaCheckedList.indexOf(profile?.uid) === -1) {
            piazzaCheckedList.splice(-1, profile?.uid, 0)
            piazzaCheckedList.push(profile?.uid)
            await updateDoc(myDocRef, {
              ...myChattings,
              piazzaChecked: piazzaCheckedList,
            })
          }
        })
      } else {
        const myDocRef = doc(dbservice, `members/${profile?.uid}`)
        const myDocSnap = await getDoc(myDocRef)
        const myChattings = myDocSnap.data().chattings
        if (myChattings[conversation]) {
          myChattings[conversation].messageCount = 0
        }
        await updateDoc(myDocRef, {
          chattings: myChattings,
        })
      }
    }
    checkMessage()
  }, [messagesList])
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView()
  }
  useEffect(() => {
    const messageList = async () => {
      const messagesArray = []
      const messageRef = collection(dbservice, 'chats_group')
      const messagesCollection = query(
        messageRef,
        orderBy('messageClockNumber', 'desc'),
        limit(scrollNumber),
        startAfter(continuing ? continuing : ''),
      )
      const messages = await getDocs(messagesCollection)
      if (!messages.docs.length) {
        setContinueNumber(messages.docs.length)
      }
      messages.forEach((document) => {
        if (messagesArray.length === messages.docs.length - 1) {
          setContinuing(document)
          setContinueNumber(messages.docs.length - 1)
        }
        const piazzaData = document.data()
        const {
          message,
          userName,
        } = piazzaData

        messagesArray.push({
          msg: message,
          id: userName,
          conversation: null,
          ...piazzaData,
        })
      })
      messagesArray.reverse()
      handleMessagesList([...messagesArray, ...messagesList])
      localStorage.setItem(
        conversation,
        JSON.stringify([...messagesArray, ...messagesList]),
      )
      setIsLoading(false)
    }
    const messageListMembers = async (conversation) => {
      const messageRef = collection(dbservice, `chats_${conversation}`)
      const messagesCollection = query(
        messageRef,
        orderBy('messageClockNumber', 'desc'),
        limit(scrollNumber),
        startAfter(continuing ? continuing : ''),
      )
      const messages = await getDocs(messagesCollection)
      const messagesArray = []
      if (!messages.docs.length) {
        setContinueNumber(messages.docs.length)
      }
      messages.forEach((doc) => {
        if (messagesArray.length === messages.docs.length - 1) {
          setContinuing(doc)
          setContinueNumber(messages.docs.length - 1)
        }
        const piazzaData = doc.data()
        const {
          message,
          userName,
          userOne,
          userOneDisplayName,
          userTwo,
          userTwoDisplayName
        } = piazzaData
        if (userOne !== profile?.uid) {
          handleChatUid(userOne)
          handleChatDisplayName(userOneDisplayName)
        } else {
          handleChatUid(userTwo)
          handleChatDisplayName(userTwoDisplayName)
        }
        messagesArray.push({
          msg: message,
          id: userName,
          conversation: null,
          ...piazzaData,
        })
      })
      messagesArray.reverse()
      handleMessagesList([...messagesArray, ...messagesList])
      localStorage.setItem(
        conversation,
        JSON.stringify([...messagesArray, ...messagesList]),
      )
      setIsLoading(false)
    }
    if (conversation === 'piazza') {
      if (isLoading || (!messagesList.length && navigator.onLine)) {
        messageList()
      }
    } else {
      if (isLoading || (!messagesList.length && navigator.onLine)) {
        messageListMembers(conversation)
      }
    }
  }, [isLoading, currentConversation])
  const handleScroll = () => {
    if (
      boxRef.current.scrollTop !== 0 ||
      isLoading
    ) {
      return
    } else {
      console.log('scroll')
      setIsLoading(true)
    }
  }
  useEffect(() => {
    if (navigator.onLine) {
      boxRef.current?.addEventListener('scroll', handleScroll)
      return () => boxRef.current?.removeEventListener('scroll', handleScroll)
    }
  }, [isLoading])
  const messagesArray = navigator.onLine
    ? messagesList
    : JSON.parse(localStorage.getItem(conversation) || '[]')
  const initiateContinuing = () => {
    setContinuing(null)
    handleMessagesList([])
  }
  return (
    <div className={`fixed w-full bg-light-3 dark:bg-dark-3 flex flex-col ${isKeyboardOpen ? 'bottom-[50px] h-full pt-[120px]' : 'bottom-[110px] h-[60%]'}`}>
      <div ref={boxRef} className='p-1 border-t rounded-xl overflow-auto'>
        {/* <ul>
          {isLoading && (
            <div className="flex justify-center bg-light-2 dark:bg-dark-2 rounded">
              {loading}
            </div>
          )}
          {messagesArray.map((value, index) => {
            let passingValue
            if (conversation === 'piazza') {
              passingValue = value
            } else {
              if (value.userUid === value.userOne) {
                passingValue = {
                  userUid: value.userOne,
                  id: value.userOneDisplayName,
                  profileImage: value.userOneProfileImage || value.profileImage,
                  defaultProfile:
                    value.userOneDefaultProfile || value.defaultProfile,
                  profileImageUrl:
                    value.userOneProfileUrl || value.profileImageUrl,
                }
              } else {
                passingValue = {
                  userUid: value.userTwo,
                  id: value.userTwoDisplayName,
                  profileImage: value.userTwoProfileImage || value.profileImage,
                  defaultProfile:
                    value.userTwoDefaultProfile || value.defaultProfile,
                  profileImageUrl:
                    value.userTwoProfileUrl || value.profileImageUrl,
                }
              }
            }
            const userDirection = value.userUid === profile?.uid ? 'text-right' : 'text-left'
            const previousUid = index > 0 ? messagesArray[index - 1].userUid : ''
            return (
              <li
                key={index}
                ref={index === continueNumber ? messagesEndRef : null}
                className={userDirection}
              >
                {previousUid !== value.userUid && (
                  <div
                    className={`flex justify-${
                      value.userUid !== profile?.uid ? 'start' : 'end'
                    }`}
                  >
                    {userDirection === 'text-left' ? (
                      <div className="flex gap-3 pt-3">
                        <Popups
                          trigger={
                            <button onClick={() => onDrawer({
                              userUid: passingValue.userUid,
                              displayName: passingValue.id,
                            })}>
                              <Avatars
                                element={passingValue}
                                profile={false}
                              />
                            </button>
                          }
                          title={
                            <PiazzaDialogsTitle user={user} displayedName={displayedName}/>
                          }
                          content={
                            <PiazzaDialogsContent
                              initiateContinuing={initiateContinuing}
                              user={user}
                            />
                          }
                        />
                        {value.id}
                      </div>
                    ) : (
                      <div className="flex gap-3 pt-3">
                        {value.id}
                        <Popups
                          trigger={
                            <button onClick={() => onDrawer({
                              userUid: passingValue.userUid,
                              displayName: passingValue.id,
                            })}>
                              <Avatars
                                element={passingValue}
                                profile={false}
                              />
                            </button>
                          }
                          title={
                            <PiazzaDialogsTitle user={user} displayedName={displayedName}/>
                          }
                          content={
                            <PiazzaDialogsContent
                              initiateContinuing={initiateContinuing}
                              user={user}
                            />
                          }
                        />
                      </div>
                    )}
                  </div>
                )}
                {userDirection === 'text-left' ? (
                  <div className="flex gap-3 justify-start">
                    <div className="other rounded-tr-lg rounded-bl-lg rounded-br-lg p-1 bg-light-1 dark:bg-dark-1">
                      {value.msg}
                    </div>
                    <PiazzaScreenClock value={value}/>
                  </div>
                ) : (
                  <div className="flex gap-3 justify-end">
                    <PiazzaScreenClock value={value}/>
                    <div className="me rounded-tl-lg rounded-bl-lg rounded-br-lg p-1 bg-light-1 dark:bg-dark-1">
                      {value.msg}
                    </div>
                  </div>
                )}
              </li>
            )
          })}
          <li ref={messagesEndRef} />
        </ul> */}
      </div>
    </div>
  )
}

export default PiazzaScreen
