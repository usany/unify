import { AnimatedNumber } from "@/components/motion-primitives/animated-number"
import { Card } from "@/components/ui/card"

const ProfileThird = ({isFollowers}) => {
  return (
    <Card
      sx={{
        padding: '20px'
      }}
    >
      <div onClick={usersCollection}>
        <div>{isFollowers ? follower : following}</div>
        <div className="flex justify-center">
          {0}
        </div>
      </div>
    </Card>
  )
}

export default ProfileThird