import { Card, CardContent } from '@mui/material'
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import { AlarmCheck, PlusCircle, UserRound } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { dbservice } from 'src/baseApi/serverbase'
import { DrawerClose } from 'src/components/ui/drawer'
import useSelectors from 'src/hooks/useSelectors'
import useTexts from 'src/hooks/useTexts'
import { webSocket } from 'src/webSocket.tsx'

function PiazzaFormCallsContent({chattingUser}) {
  const { videoCall, audioCall } = useTexts()
  const calls = [
    {id: 'video', text: videoCall},
    {id: 'audio', text: audioCall},
  ]
  const profile = useSelectors((state) => state.profile.value)
  const conversation = location.search
    ? location.search.slice(location.search.indexOf('=') + 1)
    : 'piazza'
  const [searchParams, setSearchParams] = useSearchParams()
  const userUid = profile?.uid
  const userName = profile?.displayName

  const onCall = async (selection) => {
    document.getElementById(`${selection}Call`)?.click()
    let toUserRef
    let toUser
    let messagingToken
    let preferLanguage
    if (chattingUser) {
      toUserRef = doc(dbservice, `members/${chattingUser.uid}`)
      toUser = await getDoc(toUserRef)
      messagingToken = toUser.data()?.messagingToken
      preferLanguage = toUser.data()?.preferLanguage
    }
    const passingObject = {
      conversation: conversation,
      isVideo: true,
      sendingToken: messagingToken,
      connectedUrl: `/piazza?id=${conversation}&call=${selection}`,
      preferLanguage: preferLanguage,
      userUid: userUid,
      id: userName,
      conversationUid: chattingUser?.uid,
      conversationName: chattingUser?.displayName,
    }
    webSocket.emit('call', passingObject)
    setSearchParams((searchParams) => {
      searchParams.set('call', selection)
      return searchParams
    })
  }

  return (
    <div className="flex justify-center gap-5 p-5">
      {calls.map((value) => {
        return (
          <Card
            key={value.id}
            className="colorOne"
            sx={{
              height: '100%',
            }}
          >
            <CardContent>
              <div
                className="flex flex-col items-center gap-5"
                onClick={() => {
                  onCall(value.id)
                }}
              >
                <DrawerClose>
                  {/* <div className="flex justify-center">
                    <UserRound />
                  </div> */}
                  {value.text}
                </DrawerClose>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export default PiazzaFormCallsContent
