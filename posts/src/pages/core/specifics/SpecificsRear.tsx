import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
// import { doc, getDoc } from 'firebase/firestore'
// import { useEffect, useState } from 'react'
// import { dbservice } from 'src/baseApi/serverbase'
import staticImage from 'src/assets/umbrellasfixed.png'
import useSelectors from 'src/hooks/useSelectors'
import useTexts from 'src/hooks/useTexts'
import Avatars from '../Avatars'
import getShadowColor from './getShadowColor'
import FormatClock from '../FormatClock'
import getCard from '../getCard'

interface Props {
  message: {}
  connectedClock: string
  confirmingClock: string
  returningClock: string
  confirmedReturnClock: string
}

function SpecificsRear({
  message,
  connectedClock,
  confirmingClock,
  returningClock,
  confirmedReturnClock,
}: Props) {
  const { borrowing, lending, createdAt, supportedAt, borrowedAt, lendedAt, returnOnProcessAt, returnConfirmedAt, issued } = useTexts()
  const profile = useSelectors((state) => state.profile.value)
  const profileImageUrl = useSelectors((state) => state.profileImageUrl.value)
  const id = message?.id || ''
  const shadowColor = getShadowColor(id)
  // useEffect(() => {
  //   const messages = async () => {
  //     const docRef = doc(dbservice, `num/${message.id}`)
  //     const docSnap = await getDoc(docRef)
  //     const userData = docSnap.data()
  //     setSendingProfile(userData)
  //   }
  //   messages()
  // }, [connectedClock, confirmingClock, returningClock, confirmedReturnClock])
  const sendingProfile = getCard(id)
  const sendedProfileImage = sendingProfile?.connectedProfileImage
  const sendedDefaultProfile = sendingProfile?.connectedDefaultProfile
  const sendedProfileImageUrl = sendingProfile?.connectedProfileImageUrl

  const passingValueCreator = {
    profileImage: message.creatorProfileImage,
    defaultProfile: message.creatorDefaultProfile,
    profileImageUrl: message.creatorProfileImageUrl,
  }
  const passingValueConnected = {
    profileImage: message.connectedProfileImage || sendedProfileImage,
    defaultProfile:
      message.connectedDefaultProfile ||
      sendedDefaultProfile ||
      profile.defaultProfile,
    profileImageUrl:
      message.connectedProfileImageUrl ||
      sendedProfileImageUrl ||
      profileImageUrl,
  }
  const connectedMoment = connectedClock.cancelled
    ? ''
    : message?.connectedClock
    ? message?.connectedClock
    : connectedClock.clock
  const confirmingMoment = message?.confirmingClock
    ? message.confirmingClock
    : confirmingClock
  const returningMoment = message?.returningClock
    ? message.returningClock
    : returningClock
  const confirmedReturnMoment = message?.confirmedReturnClock
    ? message.confirmedReturnClock
    : confirmedReturnClock
  const statusCollection = [
    {
      isBorrowing: message.text.choose === 1,
      passingProfile: passingValueCreator,
      text: createdAt,
      messageClock: message.createdClock
    },
    {
      isBorrowing: message.text.choose !== 1,
      passingProfile: passingValueConnected,
      text: supportedAt,
      messageClock: connectedMoment
    },
    {
      isBorrowing: message.text.choose === 1,
      passingProfile: passingValueCreator,
      text: message.text.choose === 1 ? borrowedAt : lendedAt,
      messageClock: confirmingMoment
    },
    {
      isBorrowing: true,
      passingProfile: message.text.choose === 1 ? passingValueCreator : passingValueConnected,
      text: returnOnProcessAt,
      messageClock: returningMoment
    },
    {
      isBorrowing: false,
      passingProfile: message.text.choose === 1 ? passingValueConnected : passingValueCreator,
      text: returnConfirmedAt,
      messageClock: confirmedReturnMoment
    },
    {
      isBorrowing: false,
      passingProfile: message.text.choose === 1 ? passingValueConnected : passingValueCreator,
      text: issued,
      messageClock: message.issueClock
    }
  ]
  return (
    <div className="backSide">
      <Card
        className="colorTwo"
        sx={{
          height: `${
            document.getElementsByClassName('sides')[0]?.clientHeight
          }px`,
          maxWidth: `${window.screen.width * 0.9}px`,
          border: 1,
          borderWidth: '5px',
          borderColor: shadowColor,
          borderRadius: '10px',
        }}
      >
        <CardContent>
          <div className="flex justify-center">
            <img
              className="absolute w-[50%] top-[25%] opacity-50"
              src={staticImage}
            />
          </div>
          <div className="flex justify-between">
            <div>{borrowing}</div>
            <div>{lending}</div>
          </div>
          <Divider />
          {statusCollection.map((value) => {
            if (value.messageClock) {
              return (
                <div className={`flex ${value.isBorrowing ? 'justify-start' : 'justify-end'} gap-5`}>
                  {value.isBorrowing ?
                    <>
                      <Avatars element={value.passingProfile} />
                      <div className="flex items-center">
                        {value.text}
                        <FormatClock messageClock={value.messageClock} />
                      </div>
                    </>
                    :
                    <>
                      <div className="flex items-center">
                        {value.text}
                        <FormatClock messageClock={value.messageClock} />
                      </div>
                      <Avatars element={value.passingProfile} />
                    </>
                  }
                </div>
              )
            }
            return null
          })}
          {/* {message.text.choose === 1 ? (
            <div className='pt-5'>
              {message.createdClock && (
                <div className="flex justify-start gap-5">
                  <Avatars element={passingValueCreator} />
                  <div className="flex items-center">
                    {createdAt}
                    <FormatClock messageClock={message.createdClock} />
                  </div>
                </div>
              )}
              {connectedMoment && (
                <div className="flex justify-between">
                  <FormatClock messageClock={connectedMoment} />
                  <div className="flex items-center">
                    {connectedMoment}에 지원
                  </div>
                  <Avatars element={passingValueConnected} />
                </div>
              )}
              {confirmingMoment && (
                <div className="flex justify-between">
                  <Avatars element={passingValueCreator} />
                  <FormatClock messageClock={confirmingMoment} />
                  <div className="flex items-center">
                    {confirmingMoment}에 받음
                  </div>
                </div>
              )}
              {returningMoment && (
                <div className="flex justify-between">
                  <Avatars element={passingValueCreator} />
                  <FormatClock messageClock={returningMoment} />
                  <div className="flex items-center">
                    {returningMoment}에 반납 진행
                  </div>
                </div>
              )}
              {confirmedReturnMoment && (
                <div className="flex justify-between">
                  <FormatClock messageClock={confirmedReturnMoment} />
                  <div className="flex items-center">
                    {confirmedReturnMoment}에 반납 확인
                  </div>
                  <Avatars element={passingValueConnected} />
                </div>
              )}
            </div>
          ) : (
            <div className='pt-5'>
              {message.createdClock && (
                <div className="flex justify-between">
                  <div className="flex items-center">
                    {message.createdClock}에 생성
                  </div>
                  <Avatars element={passingValueCreator} />
                </div>
              )}
              {connectedMoment && (
                <div className="flex justify-between">
                  <Avatars element={passingValueConnected} />
                  <div className="flex items-center">
                    {connectedMoment}에 지원
                  </div>
                </div>
              )}
              {confirmingMoment && (
                <div className="flex justify-between">
                  <div className="flex items-center">
                    {confirmingMoment}에 빌려줌
                  </div>
                  <Avatars element={passingValueCreator} />
                </div>
              )}
              {returningMoment && (
                <div className="flex justify-between">
                  <Avatars element={passingValueConnected} />
                  <div className="flex items-center">
                    {returningMoment}에 반납 진행
                  </div>
                </div>
              )}
              {confirmedReturnMoment && (
                <div className="flex justify-between">
                  <div className="flex items-center">
                    {confirmedReturnMoment}에 반납 확인
                  </div>
                  <Avatars element={passingValueCreator} />
                </div>
              )}
            </div>
          )} */}
        </CardContent>
      </Card>
    </div>
  )
}

export default SpecificsRear
