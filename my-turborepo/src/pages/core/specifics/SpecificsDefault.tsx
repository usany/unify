import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Divider from '@mui/material/Divider'
import SpecificsActions from './SpecificsActions'
import SpecificsButtons from './SpecificsButtons'
import SpecificsDimensions from './SpecificsDimensions'
import SpecificsSteppers from './SpecificsSteppers'
import SpecificsTrades from './SpecificsTrades'
import getShadowColor from './getShadowColor'
import { buildingsObj } from 'src/pages/add/locationsBuildings'
import { useEffect, useState } from 'react'
const SpecificsDefault = ({ drawerOpenTrue, message, connectedUser,
  increaseRound, decreaseRound, changeOnPulse, changeConnectedUser, toggleOnTransfer, handleConnectedClock, handleConfirmingClock, handleReturningClock, handleConfirmedReturnClock, changeMessageValue
}) => {
  const [issue, setIssue] = useState(false)
  const changeIssue = () => setIssue((prev) => !prev)
  const id = message?.id || ''
  const shadowColor = getShadowColor(id)
  const locationOne = message.text.count
  const buildingsObject = {
    input: buildingsObj.input,
    ...buildingsObj.se,
    ...buildingsObj.gu,
    ...buildingsObj.gw
  }
  const key = Object.keys(buildingsObject).find((key) => buildingsObject[key].ko.name === locationOne)
  const staticImg = buildingsObject[key]?.image
  // const staticImg = staticArray[message.text.count] || staticArray['building']
  useEffect(() => {
    setIssue(message?.issue)
  }, [message])

  return (
    <Card
      className="colorTwo"
      sx={{
        maxWidth: `${window.screen.width * 0.9}px`,
        boxShadow: `1.9px 1.9px 1.9px 1.9px ${shadowColor}`,
      }}
    >
      <CardContent>
        <SpecificsActions
          message={message}
          drawerOpenTrue={drawerOpenTrue}
        />
        <div className="flex justify-center pt-1">
          <CardMedia
            sx={{
              width: ((200 * 188) / 141) * 0.9,
              height: 188 * 0.9,
              borderRadius: '10px',
            }}
            image={staticImg}
          />
        </div>
        <SpecificsDimensions message={message} />
        <Divider />
        <SpecificsTrades
          drawerOpenTrue={drawerOpenTrue}
          message={message}
        />
        <Divider />
        <SpecificsSteppers message={message} />
        <Divider />
        <SpecificsButtons
          increaseRound={increaseRound}
          decreaseRound={decreaseRound}
          message={message}
          changeOnPulse={changeOnPulse}
          changeConnectedUser={changeConnectedUser}
          toggleOnTransfer={toggleOnTransfer}
          handleConnectedClock={handleConnectedClock}
          handleConfirmingClock={handleConfirmingClock}
          handleReturningClock={handleReturningClock}
          handleConfirmedReturnClock={handleConfirmedReturnClock}
          issue={issue}
          changeIssue={changeIssue}
          changeMessageValue={changeMessageValue}
        />
      </CardContent>
    </Card>
  )
}

export default SpecificsDefault
