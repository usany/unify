import { AnimatedNumber } from "@/components/motion-primitives/animated-number"
import { useLanguage } from "@/context/LanguageContext"
import { Card } from "@mui/material"

const ProfileThird = ({isFollowers}) => {
  const {language} = useLanguage()
  return (
    <Card
      sx={{
        padding: '20px'
      }}
    >
      <div>
        <div>{isFollowers ? language === 'en' ? 'Followers' : '팔로워' : language === 'en' ? 'Following' : '팔로잉'}</div>
        <div className="flex justify-center">0</div>
      </div>
    </Card>
  )
}

export default ProfileThird