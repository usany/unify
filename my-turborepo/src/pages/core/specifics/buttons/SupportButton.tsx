import SendIcon from '@mui/icons-material/Send'
import Button from '@mui/material/Button'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { dbservice } from 'src/baseApi/serverbase'
import useSelectors from 'src/hooks/useSelectors'
import useTexts from 'src/hooks/useTexts'
import { webSocket } from 'src/webSocket.tsx'
import specificProcess from './specificProcess'

const onSupporting = async ({ message, profile, profileUrl }) => {
  const docRef = doc(dbservice, `num/${message.id}`)
  const { messagingToken } = await specificProcess({
    message: message,
    toUid: null,
  })
  const userDoc = await getDoc(docRef)
  const passingObject = {
    id: message.id,
    choose: message.text.choose,
    sendingToken: messagingToken,
    creatorId: message.creatorId,
    creatorName: message.displayName,
    connectedId: profile.uid,
    connectedName: profile.displayName,
    connectedUrl: profileUrl,
    preferLanguage: userDoc.data()?.preferLanguage || 'ko',
    connectedClock: new Date().toString(),
  }
  const connectedUserRef = doc(dbservice, `members/${profile.uid}`)
  const connectedUserSnap = await getDoc(connectedUserRef)
  const connectedUserData = connectedUserSnap.data()
  updateDoc(docRef, {
    round: 2,
    connectedId: profile.uid,
    connectedName: profile.displayName,
    connectedUrl: profileUrl,
    connectedProfileImage: connectedUserData.profileImage,
    connectedDefaultProfile: connectedUserData.defaultProfile,
    connectedProfileImageUrl: connectedUserData.profileImageUrl,
    connectedClock: new Date().toString(),
  })
  const connectedUserConnectedCards = connectedUserData?.connectedCards || []
  updateDoc(connectedUserRef, {
    connectedCards: [...connectedUserConnectedCards, message.id],
  })
  webSocket.emit('supporting', passingObject)
}
const SupportButton = ({
  message,
  increaseRound,
  changeConnectedUser,
  toggleOnTransfer,
  handleConnectedClock,
}) => {
  const profile = useSelectors((state) => state.profile.value)
  const { confirm } = useTexts()
  const profileImageUrl = useSelectors((state) => state.profileImageUrl.value)
  const sendingProfile = profile?.profileImage
    ? profileImageUrl
    : profile?.defaultProfile
  return (
    <div className="flex justify-center">
      <Button
        className='colorOne'
        variant="outlined"
        onClick={() => {
          if (profile) {
            const clock = new Date().toString()
            onSupporting({
              message: message,
              profile: { uid: profile?.uid, displayName: profile?.displayName },
              profileUrl: sendingProfile,
            })
            increaseRound(profile)
            changeConnectedUser({
              uid: profile?.uid,
              displayName: profile?.displayName,
              url: sendingProfile,
            })
            toggleOnTransfer()
            handleConnectedClock({ clock: clock, cancelled: false })
          }
        }}
        startIcon={<SendIcon />}
      >
        {confirm}
      </Button>
    </div>
  )
}

export default SupportButton
