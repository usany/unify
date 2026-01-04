import useSelectors from 'src/hooks/useSelectors'
import useTexts from 'src/hooks/useTexts'
import ConfirmButton from 'src/pages/core/specifics/buttons/ConfirmButton'
import ConfirmReturnButton from 'src/pages/core/specifics/buttons/ConfirmReturnButton'
import DeleteButton from 'src/pages/core/specifics/buttons/DeleteButton'
import ReturningButton from 'src/pages/core/specifics/buttons/ReturningButton'
import StopSupportButton from 'src/pages/core/specifics/buttons/StopSupportButton'
import SupportButton from 'src/pages/core/specifics/buttons/SupportButton'
import ProblemButton from './buttons/ProblemButton'
import ProfileMembersLink from 'src/pages/profile/ProfileMembersLink'
import { doc, getDoc } from 'firebase/firestore'
import { dbservice } from 'src/baseApi/serverbase'
import { useEffect, useState } from 'react'

interface Props {
  message: {}
}

function SpecificsButtons({
  increaseRound,
  decreaseRound,
  message,
  changeConnectedUser,
  toggleOnTransfer,
  handleConnectedClock,
  handleConfirmingClock,
  handleReturningClock,
  handleConfirmedReturnClock,
  issue,
  changeIssue,
  changeMessageValue
}: Props) {
  const profile = useSelectors((state) => state.profile.value)
  const {isBorrowing, askingTheOwnerToConfirm, sharingCompleted} = useTexts()
  const isOwner = message.creatorId === profile?.uid
  const [otherUserProfile, setOtherUserProfile] = useState({uid: ''})
  const {pleaseReportTheIssue} = useTexts()
  useEffect(() => {
    const getOtherUser = async () => {
      if (issue) {
        const otherUser = isOwner ? message.connectedId : message.creatorId
        const ref = doc(dbservice, `members/${otherUser}`)
        const userDoc = await getDoc(ref)
        setOtherUserProfile(userDoc.data())
      }
    }
    getOtherUser()
  }, [issue])
  if (message.round === 1) {
    if (isOwner) {
      return (
        <DeleteButton
          message={message}
          decreaseRound={decreaseRound}
        />
      )
    }
    return (
      <SupportButton
        message={message}
        increaseRound={increaseRound}
        changeConnectedUser={changeConnectedUser}
        toggleOnTransfer={toggleOnTransfer}
        handleConnectedClock={handleConnectedClock}
      />
    )
  } else if (message.round === 2) {
    if (isOwner) {
      return (
        <ConfirmButton
          message={message}
          increaseRound={increaseRound}
          handleConfirmingClock={handleConfirmingClock}
        />
      )
    }
    return (
      <StopSupportButton
        message={message}
        decreaseRound={decreaseRound}
        changeConnectedUser={changeConnectedUser}
        toggleOnTransfer={toggleOnTransfer}
        handleConnectedClock={handleConnectedClock}
      />
    )
  } else if (message.round === 3) {
    if (isOwner) {
      return (
        <div className="flex justify-center">
          {message.text.choose === 1 && (
            <ReturningButton
              message={message}
              increaseRound={increaseRound}
              handleReturningClock={handleReturningClock}
            />
          )}
          {message.text.choose === 2 && (
            <>
              {issue ? pleaseReportTheIssue : `${message.connectedName} ${isBorrowing}`}
              <ProblemButton message={message} issue={issue} changeIssue={changeIssue} changeMessageValue={changeMessageValue}/>
            </>
          )}
        </div>
      )
    }
    return (
      <div className="flex justify-center">
        {message.text.choose === 1 && (
          <div className='flex flex-col'>
            {issue ? pleaseReportTheIssue : `${message.displayName} ${isBorrowing}`}
            <ProblemButton message={message} issue={issue} changeIssue={changeIssue} changeMessageValue={changeMessageValue}/>
          </div>
        )}
        {message.text.choose === 2 && (
          <ReturningButton
            message={message}
            increaseRound={increaseRound}
            handleReturningClock={handleReturningClock}
          />
        )}
      </div>
    )
  } else if (message.round === 4) {
    if (isOwner) {
      return (
        <div className="flex justify-center">
          {message.text.choose === 1 && (
            <>
              {askingTheOwnerToConfirm}
            </>
          )}
          {message.text.choose === 2 && (
            <div className='flex flex-col'>
              {issue && pleaseReportTheIssue}
              <div className='flex'>
                {issue ? <ProblemButton message={message} issue={issue} changeIssue={changeIssue} changeMessageValue={changeMessageValue}/> : <ConfirmReturnButton
                  message={message}
                  increaseRound={increaseRound}
                  handleConfirmedReturnClock={handleConfirmedReturnClock}
                />}
                <ProblemButton message={message} issue={issue} changeIssue={changeIssue} changeMessageValue={changeMessageValue}/>
              </div>
            </div>
          )}
        </div>
      )
    }
    return (
      <div className="flex justify-center">
        {message.text.choose === 1 && (
          <div className='flex flex-col'>
            {issue && pleaseReportTheIssue}
            <div className='flex'>
              {issue ? <ProfileMembersLink otherUserProfile={otherUserProfile} /> : <ConfirmReturnButton
                message={message}
                increaseRound={increaseRound}
                handleConfirmedReturnClock={handleConfirmedReturnClock}
              />}
              <ProblemButton message={message} issue={issue} changeIssue={changeIssue} changeMessageValue={changeMessageValue}/>
            </div>
          </div>
        )}
        {message.text.choose === 2 && (
          <>
            {message.item}{' '}
            {askingTheOwnerToConfirm}
          </>
        )}
      </div>
    )
  }
  return (
    <div className="flex justify-center">
      {sharingCompleted}
    </div>
  )
}

export default SpecificsButtons
