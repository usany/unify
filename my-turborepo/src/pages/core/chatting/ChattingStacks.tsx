import { useEffect, useState } from 'react'
import Chats from 'src/pages/core/chatting/Chats'
import { webSocket } from 'src/webSocket.tsx'
import { usePiazzaMessage } from './usePiazzaMessage'
import useSelectors from 'src/hooks/useSelectors'
import EmptyCard from '../card/EmptyCard'
import { AnimatedGroup } from 'src/components/motion-primitives/animated-group'

const ChattingStacks = ({
  chattings,
  changeChattings,
  sorted,
}) => {
  const [longPressChat, setLongPressChat] = useState(null)
  const [longPressChatsList, setLongPressChatsList] = useState([])
  const changeLongPressChat = (newValue) => setLongPressChat(newValue)
  const changeLongPressChatsList = (newValue) => setLongPressChatsList(newValue)
  const [onLongPress, setOnLongPress] = useState(0)
  const changeOnLongPress = (newValue) => setOnLongPress(newValue)
  const profile = useSelectors((state) => state.profile.value)

  useEffect(() => {
    if (!onLongPress) {
      setLongPressChat(null)
    }
  }, [onLongPress])
  useEffect(() => {
    if (!longPressChat) {
      setOnLongPress(0)
    }
  }, [longPressChat])

  const piazzaSwitch = useSelectors((state) => state.piazzaSwitch.value)
  if (piazzaSwitch === 'true') {
    if (sorted.indexOf('piazza') === -1) {
      sorted.splice(0, 0, 'piazza')
    }
  }
  const { piazzaMessage, changePiazzaMessage } = usePiazzaMessage()

  useEffect(() => {
    if (!webSocket) return
    function sMessageCallback(message) {
      const { msg, id, messageClock } = message
      changePiazzaMessage({
        message: msg,
        messageClock: messageClock,
        username: id,
        piazzaChecked: [id],
      })
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
        messageClock,
        messageClockNumber,
        conversation,
        conversationUid,
        conversationName,
        profileUrl,
      } = message
      let userOne
      let userTwo
      let userOneDisplayName
      let userTwoDisplayName
      let userOneProfileUrl
      let userTwoProfileUrl
      const messageCount = (chattings[conversation]?.messageCount + 1) || 1
      if (userUid < conversationUid) {
        userOne = userUid
        userTwo = conversationUid
        userOneDisplayName = id
        userTwoDisplayName = conversationName
        userOneProfileUrl = profileUrl
      } else {
        userOne = conversationUid
        userTwo = userUid
        userOneDisplayName = conversationName
        userTwoDisplayName = id
        userTwoProfileUrl = profileUrl
      }
      const replaceObj = {
        userUid: userUid,
        userName: id,
        userOne: userOne,
        userOneDisplayName: userOneDisplayName,
        userTwo: userTwo,
        userTwoDisplayName: userTwoDisplayName,
        message: msg,
        messageClock: messageClock,
        messageClockNumber: messageClockNumber,
        userOneProfileUrl: userOneProfileUrl,
        userTwoProfileUrl: userTwoProfileUrl,
        messageCount: messageCount,
      }
      const newChattings = { ...chattings, [conversation]: replaceObj }
      changeChattings(newChattings)
    }
    sorted.map((element) => {
      webSocket.on(`sMessage${element}`, sMessageCallback)
      return () => {
        webSocket.off(`sMessage${element}`, sMessageCallback)
      }
    })
  })
  useEffect(() => {
    if (!webSocket) return
    function sNewMessageCallback(message) {
      const {
        msg,
        userUid,
        id,
        messageClock,
        messageClockNumber,
        conversation,
        conversationUid,
        conversationName,
        profileUrl
      } = message
      if (conversationUid === profile.uid) {
        let userOne
        let userTwo
        let userOneDisplayName
        let userTwoDisplayName
        let userOneProfileUrl
        let userTwoProfileUrl
        const messageCount = chattings[conversation]?.messageCount || 1
        if (userUid < conversationUid) {
          userOne = userUid
          userTwo = conversationUid
          userOneDisplayName = id
          userTwoDisplayName = conversationName
          userOneProfileUrl = profileUrl
        } else {
          userOne = conversationUid
          userTwo = userUid
          userOneDisplayName = conversationName
          userTwoDisplayName = id
          userTwoProfileUrl = profileUrl
        }
        const replaceObj = {
          userUid: userUid,
          userName: id,
          userOne: userOne,
          userOneDisplayName: userOneDisplayName,
          userTwo: userTwo,
          userTwoDisplayName: userTwoDisplayName,
          message: msg,
          messageClock: messageClock,
          messageClockNumber: messageClockNumber,
          userOneProfileUrl: userOneProfileUrl,
          userTwoProfileUrl: userTwoProfileUrl,
          messageCount: messageCount,
        }
        const newChattings = { ...chattings, [conversation]: replaceObj }
        changeChattings(newChattings)
      }
      console.log(conversationUid)
      console.log(profile.uid)
    }
    webSocket.on(`sNewMessage`, sNewMessageCallback)
    return () => {
      webSocket.off(`sNewMessage`, sNewMessageCallback)
    }
  })
  if (!chattings) return (
    <EmptyCard />
  )
  return (
    <AnimatedGroup className='w-full'>
      {sorted.map((element) => {
        if (element === 'piazza') {
          const message = navigator.onLine ? piazzaMessage : JSON.parse(localStorage.getItem('group') || '{}')
          const clock = new Date(message?.messageClock)
          return (
            <>
              <Chats
                profileUrl={''}
                conversation={element}
                displayName={''}
                chattingUid={''}
                multiple={true}
                clock={clock}
                message={message}
                longPressChat={longPressChat}
                longPressChatsList={longPressChatsList}
                changeLongPressChat={changeLongPressChat}
                changeLongPressChatsList={changeLongPressChatsList}
                onLongPress={onLongPress}
                changeOnLongPress={changeOnLongPress}
                sorted={sorted}
                chattings={chattings}
                changeChattings={changeChattings}
              />
            </>
          )
        } else {
          const messages = navigator.onLine ? chattings : JSON.parse(localStorage.getItem('chattings') || '[]')
          const clock = new Date(messages[element].messageClock)
          if (messages[element]) {
            let displayName
            let chattingUid
            let profileUrl
            if (profile?.uid === messages[element].userOne) {
              displayName = messages[element].userTwoDisplayName
              chattingUid = messages[element].userTwo
              profileUrl = messages[element].userTwoProfileUrl
            } else {
              displayName = messages[element].userOneDisplayName
              chattingUid = messages[element].userOne
              profileUrl = messages[element].userOneProfileUrl
            }
            return (
              <>
                <Chats
                  profileUrl={profileUrl}
                  conversation={element}
                  displayName={displayName}
                  chattingUid={chattingUid}
                  multiple={false}
                  clock={clock}
                  message={messages[element]}
                  longPressChat={longPressChat}
                  longPressChatsList={longPressChatsList}
                  changeLongPressChat={changeLongPressChat}
                  changeLongPressChatsList={changeLongPressChatsList}
                  onLongPress={onLongPress}
                  changeOnLongPress={changeOnLongPress}
                  sorted={sorted}
                  chattings={chattings}
                  changeChattings={changeChattings}
                />
              </>
            )
          }
        }
      })}
    </AnimatedGroup>
  )
}

export default ChattingStacks
