import SendIcon from '@mui/icons-material/Send'
import Button from '@mui/material/Button'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import useSelectors from 'src/hooks/useSelectors'
import useTexts from 'src/hooks/useTexts'
import { webSocket } from 'src/webSocket.tsx'
import specificProcess from './specificProcess'
import { dbservice } from 'src/baseApi/serverbase'

const onConfirm = async ({ message, uid, profileUrl }) => {
  const { messagingToken } = await specificProcess({
    message: message,
    toUid: uid,
  })
  const docRef = doc(dbservice, `num/${message.id}`)
  const document = await getDoc(docRef)
  const passingObject = {
    id: message.id,
    choose: message.text.choose,
    sendingToken: messagingToken,
    creatorId: message.creatorId,
    creatorName: message.displayName,
    connectedId: document.data()?.connectedId,
    connectedName: document.data()?.connectedName,
    connectedUrl: profileUrl,
    preferLanguage: document.data()?.preferLanguage || 'ko',
    confirmingClock: new Date().toString(),
  }
  updateDoc(docRef, {
    round: 3,
    confirmingClock: new Date().toString(),
  })
  webSocket.emit('confirm', passingObject)
}

const ConfirmButton = ({ message, increaseRound, handleConfirmingClock }) => {
  const profile = useSelectors((state) => state.profile.value)
  const {confirmSupportMessage} = useTexts()
  return (
    <Button
      className='colorOne'
      variant="outlined"
      onClick={() => {
        onConfirm({
          message: message,
          uid: profile?.uid,
          profileUrl: profile?.profileImage ? profile?.profileImageUrl : profile?.defaultProfile,
        })
        increaseRound(profile)
        handleConfirmingClock(new Date().toString())
      }}
      startIcon={<SendIcon />}
    >
      {confirmSupportMessage}
    </Button>
  )
}

export default ConfirmButton
