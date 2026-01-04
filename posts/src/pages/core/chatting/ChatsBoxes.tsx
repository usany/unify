import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { User } from 'firebase/auth'
import staticImage from 'src/assets/blue.png'
import useSelectors from 'src/hooks/useSelectors'
import Avatars from 'src/pages/core/Avatars'
import ChatsBoxesChips from './ChatsBoxesChips'
import ChatsBoxesClock from './ChatsBoxesClock'
import ChatsBoxesRoom from './ChatsBoxesRoom'
interface Props {
  chattingUid: string
  profileUrl: string
  displayName: string
  multiple: boolean
  clock: Date
  message: {
    message: string
    piazzaChecked: string[]
    messageCount: number
  }
}

const ChatsBoxes = ({
  chattingUid,
  displayName,
  multiple,
  clock,
  message,
}: Props) => {
  const languages = useSelectors((state) => state.languages.value)
  const profile = useSelectors((state) => state.profile.value)
  let messageAmpm
  let messageHours = clock.getHours()
  let messageMonth = (clock.getMonth() + 1).toString()
  let messageDate = clock.getDate().toString()
  if (messageHours >= 13) {
    messageAmpm = '오후'
    if (messageHours !== 12) {
      messageHours = messageHours - 12
    }
  } else {
    messageAmpm = '오전'
    if (messageHours === 0) {
      messageHours = messageHours + 12
    }
  }
  if (clock.getMonth() + 1 < 10) {
    messageMonth = '0' + messageMonth
  }
  if (messageDate.length === 1) {
    messageDate = '0' + messageDate
  }
  const clockValue =
    clock.getFullYear().toString() +
    '-' +
    messageMonth +
    '-' +
    messageDate +
    ' ' +
    (languages === 'ko' ? messageAmpm : '') +
    ' ' +
    messageHours +
    ':' +
    (clock.getMinutes() < 10 ? '0' : '') +
    clock.getMinutes() +
    (languages === 'en' ? (messageAmpm === '오전' ? 'am' : 'pm') : '')
  let messageProfileImage
  let messageProfileImageUrl
  let messageDefaultProfile
  let passingValue
  if (!multiple) {
    if (profile?.uid !== message.userOne) {
      messageProfileImage = message.userOneProfileImage
      messageProfileImageUrl = message.userOneProfileUrl
      messageDefaultProfile = message.userOneDefaultProfile
        ? message.userOneDefaultProfile
        : message.userOneProfileUrl
    } else {
      messageProfileImage = message.userTwoProfileImage
      messageProfileImageUrl = message.userTwoProfileUrl
      messageDefaultProfile = message.userTwoDefaultProfile
        ? message.userTwoDefaultProfile
        : message.userTwoProfileUrl
    }
    passingValue = {
      profileImage: messageProfileImage,
      profileImageUrl: messageProfileImageUrl,
      defaultProfile: messageDefaultProfile,
    }
  }
  return (
    <div>
      {clockValue[0] !== 'N' &&
        <div className="flex p-3">
          {multiple ? (
            <Avatar>
              <AvatarImage src={staticImage} />
            </Avatar>
          ) : (
            <Avatars
              element={passingValue}
              uid={chattingUid}
              profile={false}
              profileColor={''}
              profileUrl={message}
            />
          )}
          <div className="flex flex-col w-full">
            <div className="flex justify-between">
              <ChatsBoxesRoom displayName={displayName} multiple={multiple} />
              <ChatsBoxesClock message={message} />
            </div>
            <div className="flex justify-between px-3">
              <div>{message?.message}</div>
              <ChatsBoxesChips userObj={profile} message={message} />
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default ChatsBoxes
