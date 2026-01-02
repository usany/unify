import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Chip } from '@mui/material'
import useTexts from 'src/hooks/useTexts'
import Popups from '../Popups'
import SpecificsTradesContent from './SpecificsTradesContent'
import SpecificsTradesTitle from './SpecificsTradesTitle'
import SpecificsTradesTrigger from './SpecificsTradeTrigger'
import { DocumentData } from 'firebase/firestore'

interface Props {
  isCreator: boolean
  drawerOpenTrue: () => void
  message: DocumentData
}
function SpecificsTradesPopups({ isCreator, drawerOpenTrue, message }: Props) {
  const messageDisplayName = message.displayName
  const connectedDisplayName = message.connectedName
  const {noOneYet} = useTexts()
  const messageName =
    messageDisplayName.length > 10
      ? messageDisplayName.slice(0, 10) + '......'
      : messageDisplayName
  const connectedMessageName = connectedDisplayName?.length > 10 ? connectedDisplayName.slice(0, 10) + '......' : connectedDisplayName
  console.log(message)
  if (isCreator) {
    return (
      <div className="flex flex-col items-center">
        <Popups
          trigger={
            <SpecificsTradesTrigger
              onClick={drawerOpenTrue}
              isCreator={true}
              message={message}
            />
          }
          title={<SpecificsTradesTitle message={message} isCreator={true} />}
          content={
            <SpecificsTradesContent
              isCreator={true}
              message={message}
            />
          }
        />
        <Chip className="specific" size="small" label={messageName} />
      </div>
    )
  }
  return (
    <div className="flex flex-col items-center">
      {message.connectedId ? (
        <Popups
          trigger={
            <SpecificsTradesTrigger
              onClick={drawerOpenTrue}
              isCreator={false}
              message={{
                ...message,
              }}
            />
          }
          title={<SpecificsTradesTitle message={message} isCreator={false} />}
          content={
            <SpecificsTradesContent
              isCreator={false}
              message={{
                ...message,
              }}
            />
          }
        />
      ) : (
        <Avatar
          className={`bg-light-3 dark:bg-dark-3 border border-dashed`}
        >
          <AvatarImage src='' />
          <AvatarFallback className="text-xl border-none">
            ?
          </AvatarFallback>
        </Avatar>
      )}
      <Chip
        className="specific"
        size="small"
        variant={!message.connectedId ? 'outlined' : undefined}
        label={message.connectedId ? connectedMessageName : noOneYet}
      />
    </div>
  )
}

export default SpecificsTradesPopups
