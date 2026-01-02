import { Chip } from '@mui/material'
import useSelectors from 'src/hooks/useSelectors'
import useTexts from 'src/hooks/useTexts'
import SpecificsActionsPopups from './SpecificsActionsPopups'
const items = {
  Usan: '우산',
  Parasol: '양산',
}
interface Props {
  message: {}
  drawerOpenTrue: () => void
}

function SpecificsActions({ message, drawerOpenTrue }: Props) {
  const messageDisplayName = message.displayName
  const languages = useSelectors((state) => state.languages.value)
  const profile = useSelectors((state) => state.profile.value)
  const {my, registration, borrowing, lending} = useTexts()
  const messageName =
    messageDisplayName.length > 10
      ? messageDisplayName.slice(0, 10) + '......'
      : messageDisplayName
  const messageItem = languages === 'ko' ? message.item : Object.keys(items).find((key) => items[key] === message.item)
  return (
    <div className="flex justify-between gap-1">
      <div className="flex flex-col items-center">
        <SpecificsActionsPopups message={message} drawerOpenTrue={drawerOpenTrue} />
        <Chip
          className="specific"
          size="small"
          label={`${
            message.creatorId === profile?.uid
              ? my
              : messageName
          } ${registration}`}
        />
      </div>
      <div className="flex items-center">
        <Chip
          className="specific"
          size="small"
          label={`${messageItem} ${
            message.text.choose === 1
              ? borrowing
              : lending
          }`}
        />
      </div>
    </div>
  )
}

export default SpecificsActions
