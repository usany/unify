import { Card } from "@mui/material"
import useTexts from "src/hooks/useTexts"
import useCardsBackground from "src/hooks/useCardsBackground"

const ProfilePointsTrigger = ({ cards }) => {
  const {points} = useTexts()
  const { colorTwo } = useCardsBackground()

  return (
    <Card
      sx={{
        bgcolor: colorTwo,
        padding: '20px'
      }}
    >
      <div>{points}</div>
      <div className='flex justify-center'>{cards.point}</div>
    </Card>
  )
}

export default ProfilePointsTrigger
