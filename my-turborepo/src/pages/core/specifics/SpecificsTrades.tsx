import BeachAccess from '@mui/icons-material/BeachAccess'
import EastIcon from '@mui/icons-material/East'
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule'
import WestIcon from '@mui/icons-material/West'
import useTexts from 'src/hooks/useTexts'
import SpecificsTradesPopups from './SpecificsTradesPopups'

interface Props {
  drawerOpenTrue: () => void
  message: {}
}
function SpecificsTrades({ drawerOpenTrue, message }: Props) {
  const {borrowing, lending, pointsReward} = useTexts()
  return (
    <div className="flex justify-center pt-3">
      <div className="flex flex-col items-center px-5 gap-1">
        {borrowing}
        {message.text.choose === 1 ? (
          <SpecificsTradesPopups isCreator={true} drawerOpenTrue={drawerOpenTrue} message={message}/>
        ) : (
          <SpecificsTradesPopups isCreator={false} drawerOpenTrue={drawerOpenTrue} message={message}/>
        )}
      </div>
      <div className="flex flex-col">
        <div>
          {message.point} {pointsReward}
        </div>
        <div className="flex justify-start">
          <HorizontalRuleIcon />
          <EastIcon />
          <HorizontalRuleIcon />
          <EastIcon />
        </div>
        <div className="flex justify-end">
          <WestIcon />
          <HorizontalRuleIcon />
          <WestIcon />
          <HorizontalRuleIcon />
        </div>
        <div className="flex justify-end">
          <BeachAccess />
        </div>
      </div>
      <div className="flex flex-col items-center px-5 gap-1">
        {lending}
        {message.text.choose === 1 ? (
          <SpecificsTradesPopups isCreator={false} drawerOpenTrue={drawerOpenTrue} message={message}/>
        ) : (
          <SpecificsTradesPopups isCreator={true} drawerOpenTrue={drawerOpenTrue} message={message}/>
        )}
      </div>
    </div>
  )
}

export default SpecificsTrades
