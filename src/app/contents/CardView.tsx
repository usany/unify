import { alpha } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import CardViewLocation from './CardViewLocation'
import CardViewTime from './CardViewTime'
import CardViewTop from './CardViewTop'
import Tilt from 'react-parallax-tilt'
import getShadowColor from './getShadowColor'

const CardView = () => {
  const id = Date.now().toString()
  const shadowColor = getShadowColor(id)

  return (
    <Tilt>

      <div className="flex flex-col gap-5">
        {/* {onTransfer && <CardViewTransfer />} */}
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
            sx={{ padding: '5px', bgcolor: alpha('#000000', 0.5) }}
          >
            <CardViewTop message={message} />
            <div className="flex justify-center pt-1">
              <CardMedia
                sx={{
                  width: 200 * 0.9,
                  height: 141 * 0.9,
                  borderRadius: '10px'
                }}
                image={''}
              />
            </div>
            <div className="flex flex-col pt-1 gap-1 text-xs">
              <CardViewLocation message={message} />
              <CardViewTime message={message} />
            </div>
          </CardContent>
        </Card>
      </div>
    </Tilt>
  )
}
export default CardView
