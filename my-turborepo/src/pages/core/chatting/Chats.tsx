import { ClickAwayListener } from '@mui/material'
import Card from '@mui/material/Card'
import { User } from 'firebase/auth'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import useCardsBackground from 'src/hooks/useCardsBackground'
import useLongPress from 'src/hooks/useLongPress'
import ChatsBoxes from 'src/pages/core/chatting/ChatsBoxes'
import ChatsDelete from './ChatsDelete'
import useSelectors from 'src/hooks/useSelectors'

interface Props {
  profileUrl: string
  conversation: string
  displayName: string
  chattingUid: string
  multiple: boolean
  clock: Date
  message: {
    message: string
    piazzaChecked: string[]
    messageCount: number
  }
}

const Chats = ({
  conversation,
  clock,
  message,
  longPressChat,
  longPressChatsList,
  changeLongPressChat,
  changeLongPressChatsList,
  onLongPress,
  changeOnLongPress,
  chattings,
  changeChattings,
}: Props) => {
  const [longPressed, setLongPressed] = useState(false)
  const profile = useSelectors((state) => state.profile.value)
  const chatsRef = useRef()
  const multiple = conversation === 'piazza' ? true : false
  let displayName
  let chattingUid
  let profileUrl
  if (conversation !== 'piazza') {
    if (profile?.uid === chattings[conversation].userOne) {
      displayName = chattings[conversation].userTwoDisplayName
      chattingUid = chattings[conversation].userTwo
      profileUrl = chattings[conversation].userTwoProfileUrl
    } else {
      displayName = chattings[conversation].userOneDisplayName
      chattingUid = chattings[conversation].userOne
      profileUrl = chattings[conversation].userOneProfileUrl
    }
  } else {
    displayName = ''
    chattingUid = ''
    profileUrl = ''
  }
  useLongPress(chatsRef, () => {
    if (longPressChat && !onLongPress) {
      setLongPressed(true)
      changeOnLongPress(onLongPress + 1)
      changeLongPressChatsList(conversation || 'piazza')
    }
  })
  useEffect(() => {
    if (!longPressChat && !onLongPress) {
      setLongPressed(false)
      changeOnLongPress(0)
    }
  }, [longPressChat, onLongPress])
  const { colorTwo } = useCardsBackground()
  const key = conversation || 'piazza'
  return (
    <ClickAwayListener
      key={key}
      onClickAway={() => {
        if (longPressChat === key) {
          changeLongPressChat(null)
          changeOnLongPress(0)
          changeLongPressChatsList([])
        }
      }}
    >
      <div className={`${longPressed && 'flex w-full'}`}>
        <div
          ref={chatsRef}
          className={`${longPressed && 'longPress flex w-[calc(100%-48px)]'}`}
          onMouseDownCapture={() => {
            const longPress = conversation || 'piazza'
            changeLongPressChat(longPress)
            if (longPressChatsList.length) {
              changeLongPressChatsList([...longPressChatsList, longPress])
            } else {
              changeLongPressChatsList([longPress])
            }
          }}
          onTouchStartCapture={() => {
            const longPress = conversation || 'piazza'
            changeLongPressChat(longPress)
            if (longPressChatsList.length) {
              changeLongPressChatsList([...longPressChatsList, longPress])
            } else {
              changeLongPressChatsList([longPress])
            }
          }}
        >
          <Card
            sx={{
              flexGrow: 1,
              overflow: 'hidden',
              bgcolor: colorTwo,
              ':hover': {
                bgcolor: colorTwo,
              },
            }}
          >
            <>
              {!onLongPress ? (
                <Link
                  to={
                    conversation !== 'piazza'
                      ? `/piazza?id=${conversation}`
                      : '/piazza'
                  }
                  state={{
                    conversation: conversation,
                    displayName: displayName,
                    userUid: profile?.uid,
                    chattingUid: chattingUid,
                    multiple: multiple,
                  }}
                >
                  <ChatsBoxes
                    chattingUid={chattingUid}
                    profileUrl={profileUrl}
                    displayName={displayName}
                    multiple={multiple}
                    clock={clock}
                    message={message}
                  />
                </Link>
              ) : (
                <div
                  onClick={() => {
                    if (onLongPress) {
                      setLongPressed(!longPressed)
                      if (longPressed) {
                        changeOnLongPress(onLongPress - 1)
                      } else {
                        changeOnLongPress(onLongPress + 1)
                      }
                    }
                  }}
                >
                  <ChatsBoxes
                    chattingUid={chattingUid}
                    profileUrl={profileUrl}
                    displayName={displayName}
                    multiple={multiple}
                    clock={clock}
                    message={message}
                  />
                </div>
              )}
            </>
          </Card>
        </div>
        {longPressed && (
          <ChatsDelete
            conversation={conversation}
            changeLongPressChat={changeLongPressChat}
            changeChattings={changeChattings}
          />
        )}
      </div>
    </ClickAwayListener>
  )
}

export default Chats
