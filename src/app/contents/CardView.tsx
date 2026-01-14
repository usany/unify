import { alpha } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CardViewLocation from './CardViewLocation'
import CardViewTime from './CardViewTime'
import CardViewTop from './CardViewTop'
import CardViewTransfer from './CardViewTransfer'
import { buildingsObj, staticArray } from 'src/pages/add/locationsBuildings'

const CardView = ({ onTransfer, message, shadowColor }) => {
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
  return (
    <div className="flex flex-col gap-5">
      {onTransfer && <CardViewTransfer />}
      <Card
        className='colorTwo'
        sx={{
          width: 200 * 0.9,
          height: 280 * 0.9,
          boxShadow: `1.5px 1.5px 1.5px 1.5px ${shadowColor}`,
          // bgcolor: colorTwo,
        }}
      >
        <CardContent
          sx={{ padding: '5px', bgcolor: onTransfer && alpha('#000000', 0.5) }}
        >
          <CardViewTop message={message} />
          <div className="flex justify-center pt-1">
            <CardMedia
              sx={{
                width: 200 * 0.9,
                height: 141 * 0.9,
                borderRadius: '10px'
              }}
              image={staticImg}
            />
          </div>
          <div className="flex flex-col pt-1 gap-1 text-xs">
            <CardViewLocation message={message} />
            <CardViewTime message={message} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
export default CardView
