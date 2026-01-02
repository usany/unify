import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { dbservice } from 'src/baseApi/serverbase'
import useSelectors from 'src/hooks/useSelectors'
import PiazzaForm from 'src/pages/piazza/piazzaForm/PiazzaForm'
import PiazzaScreen from 'src/pages/piazza/piazzaScreen/PiazzaScreen'
import PiazzaTitle from 'src/pages/piazza/piazzaTitle/PiazzaTitle'
import type { RootState } from 'src/store'
import PiazzaMorphingDialogAudioCall from './components/PiazzaMorphingDialogAudioCall'
import PiazzaMorphingDialogVideoCall from './components/PiazzaMorphingDialogVideoCall'
import { changePiazzaForm } from 'src/stateSlices/piazzaFormSlice'
import { useDispatch } from 'react-redux'

function Piazza() {
  const [messages, setMessages] = useState('')
  const [messagesList, setMessagesList] = useState<[]>([])
  const { state } = useLocation() as any
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)
  const [chattingUser, setChattingUser] = useState<any>(null)
  const [chatUid, setChatUid] = useState('')
  const [chatDisplayName, setChatDisplayName] = useState('')
  const [searchParams] = useSearchParams()
  const piazzaForm = useSelectors((state) => state.piazzaForm.value)
  const handleChatUid = (newValue: string) => {
    setChatUid(newValue)
  }
  const handleChatDisplayName = (newValue: string) => {
    setChatDisplayName(newValue)
  }
  const conversation = location.search.slice(location.search.indexOf('=') + 1)
  useEffect(() => {
    setChatUid(state?.chattingUid ?? '')
    setChatDisplayName(state?.displayName ?? '')
  }, [conversation])
  useEffect(() => {
    const bringChattingUser = async () => {
      if (chatUid) {
        const toUserRef = doc(dbservice, `members/${chatUid}`)
        const toUser = await getDoc(toUserRef)
        const data = toUser.data()
        if (data) {
          setChattingUser(data)
        }
      }
    }
    if (conversation) {
      bringChattingUser()
    }
  }, [conversation, chatUid])
  // const piazzaForm = useSelectors((state: RootState) => state.piazzaForm.value)
  // useEffect(() => {
  //   const listener = () => {
  //     const minKeyboardHeight = 300
  //     const newState = window.screen.height - minKeyboardHeight > (window.visualViewport?.height || window.screen.height)
  //     const newState =
  //       window.screen.height - 300 >
  //       (window.visualViewport?.height || window.screen.height)
  //     if (isKeyboardOpen !== newState) {
  //       setIsKeyboardOpen(newState)
  //       dispatch(changePiazzaForm(newState))
  //     }
  //   }
  //   window.addEventListener('resize', listener)
  //   if (typeof visualViewport !== 'undefined') {
  //     window.visualViewport?.addEventListener('resize', listener)
  //   }
  //   visualViewport?.addEventListener('resize', listener)
  //   if (typeof visualViewport !== 'undefined') {
  //     visualViewport?.addEventListener('resize', listener)
  //   }
  //   return () => {
  //     if (typeof visualViewport !== 'undefined') {
  //       window.visualViewport?.removeEventListener('resize', listener)
  //     }
  //   }
  // }, [isKeyboardOpen])

  // useEffect(() => {
  //   dispatch(changeBottomNavigation(5))
  // })
  useEffect(() => {
    if (searchParams.get('call') === 'video') {
      document.getElementById('videoCall')?.click()
    }
    if (searchParams.get('call') === 'audio') {
      document.getElementById('audioCall')?.click()
    }
  }, [])
  return (
    <>
      {!piazzaForm && <PiazzaTitle displayName={chatDisplayName} />}
      <PiazzaScreen
        isKeyboardOpen={piazzaForm}
        messagesList={messagesList}
        handleMessagesList={(newValue) => setMessagesList(newValue)}
        handleChatUid={handleChatUid}
        handleChatDisplayName={handleChatDisplayName}
      />
      <PiazzaForm
        chattingUser={chattingUser}
        multiple={!conversation}
        messages={messages}
        handleMessages={(newValue) => setMessages(newValue)}
        messagesList={messagesList}
        handleMessagesList={(newValue) => setMessagesList(newValue)}
        isKeyboardOpen={isKeyboardOpen}
      />
      <PiazzaMorphingDialogVideoCall
        chattingUser={chattingUser}
        conversation={conversation}
      />
      <PiazzaMorphingDialogAudioCall
        chattingUser={chattingUser}
        conversation={conversation}
      />
    </>
  )
}

export default Piazza
