import SendIcon from '@mui/icons-material/Send'
import Button from '@mui/material/Button'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import useSelectors from 'src/hooks/useSelectors'
import useTexts from 'src/hooks/useTexts'
import { webSocket } from 'src/webSocket.tsx'
import specificProcess from './specificProcess'
import { dbservice } from 'src/baseApi/serverbase'

const onReturning = async ({ message, uid, profileUrl }) => {
  const docRef = doc(dbservice, `num/${message.id}`)
  const { messagingToken } = await specificProcess({
    message: message,
    toUid: message.text.choose === 1 ? uid : null,
  })
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
    returningClock: new Date().toString(),
  }
  updateDoc(docRef, {
    round: 4,
    returningClock: new Date().toString(),
  })
  webSocket.emit('returning', passingObject)
}

const ReturningButton = ({ message, increaseRound, handleReturningClock }) => {
  const profile = useSelectors((state) => state.profile.value)
  const {returnText} = useTexts()
  return (
    <Button
      className='colorOne'
      variant="outlined"
      onClick={() => {
        increaseRound(profile)
        onReturning({
          message: message,
          uid: profile?.uid,
          profileUrl: profile?.profileImage ? profile?.profileImageUrl : profile?.defaultProfile,
        })
        handleReturningClock(new Date().toString())
      }}
      startIcon={<SendIcon />}
    >
      {returnText}
    </Button>
  )
}

export default ReturningButton
