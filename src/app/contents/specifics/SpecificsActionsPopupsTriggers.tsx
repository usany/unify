import Avatars from 'src/pages/core/Avatars'

interface Props {
  message: {}
}

function SpecificsActionsPopupsTriggers({ message }: Props) {
  return (
    <>
      <Avatars
        uid={message.creatorId}
        profile={false}
        profileColor={''}
        profileUrl={message.creatorUrl}
      />
    </>
  )
}

export default SpecificsActionsPopupsTriggers
