import { User } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { useSearchParams } from 'react-router-dom'
import { dbservice } from 'src/baseApi/serverbase'
import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogTrigger,
} from 'src/components/ui/morphing-dialog'
import useTexts from 'src/hooks/useTexts'
import { webSocket } from 'src/webSocket'
import PiazzaCalls from '../PiazzaCalls'
import useSelectors from 'src/hooks/useSelectors'

interface PiazzaMorphingDialogVideoCallProps {
  chattingUser: any
  conversation: string
}

function PiazzaMorphingDialogVideoCall({
  chattingUser,
  conversation,
}: PiazzaMorphingDialogVideoCallProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const { hangUp } = useTexts()
  const profile = useSelectors((state) => state.profile.value)

  const stopCalls = async () => {
    setSearchParams((searchParams) => {
      searchParams.delete('call')
      return searchParams
    })
    document
      .getElementById('myScreen')
      ?.srcObject.getTracks()
      .forEach((track) => track.stop())
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
      connectedUrl: `/piazza?id=${conversation}&call=video`,
      preferLanguage: preferLanguage,
      userUid: profile?.uid,
      id: profile?.displayName,
      conversationUid: chattingUser?.uid,
      conversationName: chattingUser?.displayName,
    }
    console.log(passingObject)
    webSocket.emit('quitCall', passingObject)
  }

  return (
    <MorphingDialog>
      <MorphingDialogTrigger>
        <div id="videoCall"></div>
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <div>
          <div className="flex gap-5">
            <PiazzaCalls />
          </div>
          <MorphingDialogClose>
            <div onClick={stopCalls}>{hangUp}</div>
          </MorphingDialogClose>
        </div>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}

export default PiazzaMorphingDialogVideoCall
