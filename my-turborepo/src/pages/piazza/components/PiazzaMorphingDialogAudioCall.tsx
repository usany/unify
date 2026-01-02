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
import PiazzaAudioCall from '../PiazzaAudioCall'
import useSelectors from 'src/hooks/useSelectors'

interface PiazzaMorphingDialogAudioCallProps {
  chattingUser: any
  conversation: string
}

function PiazzaMorphingDialogAudioCall({
  chattingUser,
  conversation,
}: PiazzaMorphingDialogAudioCallProps) {
  const [, setSearchParams] = useSearchParams()
  const { hangUp } = useTexts()
  const profile = useSelectors((state) => state.profile.value)

  const stopCalls = async () => {
    setSearchParams((searchParams) => {
      searchParams.delete('call')
      return searchParams
    })
    const videoElement = document.getElementById(
      'myScreen',
    ) as HTMLVideoElement | null
    if (videoElement?.srcObject) {
      const mediaStream = videoElement.srcObject as MediaStream
      mediaStream.getTracks().forEach((track) => track.stop())
    }
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
      isVideo: false,
      sendingToken: messagingToken,
      connectedUrl: `/piazza?id=${conversation}&call=audio`,
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
        <div id="audioCall"></div>
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <div>
          <div className="flex gap-5">
            <PiazzaAudioCall />
          </div>
          <MorphingDialogClose>
            <div onClick={stopCalls}>{hangUp}</div>
          </MorphingDialogClose>
        </div>
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}

export default PiazzaMorphingDialogAudioCall
