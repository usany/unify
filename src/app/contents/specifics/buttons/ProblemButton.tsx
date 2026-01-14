import { Button } from '@mui/material'
import specificProcess from './specificProcess'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { dbservice } from 'src/baseApi/serverbase'
import { webSocket } from 'src/webSocket'
import useSelectors from 'src/hooks/useSelectors'
import useTexts from 'src/hooks/useTexts'

function ProblemButton({ message, issue, changeIssue, changeMessageValue }) {
  const profile = useSelectors((state) => state.profile.value)
  const {issueOccured, issueCancel} = useTexts()
  const uid = profile.uid
  const profileUrl = profile.profileImage ? profile.profileImageUrl : profile.defaultProfile
  const onIssue = async () => {
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
      issue: issue ? false : true,
      issueClock: issue ? '' : new Date().toString(),
    }
    updateDoc(docRef, {
      issue: issue ? false : true,
      issueClock: issue ? '' : new Date().toString(),
    })
    webSocket.emit(issue ? 'issueFalse' : 'issueTrue', passingObject)
  }
  return (
    <Button
      className='colorOne'
      variant='outlined'
      onClick={() => {
        onIssue()
        changeIssue()
        changeMessageValue((prev) => ({...prev, issue: !prev.issue, issueClock: prev.issue ? '' : new Date().toString()}))
      }}
    >
      {issue ? issueCancel : issueOccured}
    </Button>
  )
}

export default ProblemButton
