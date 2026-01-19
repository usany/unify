import { AnimatedNumber } from "@/components/motion-primitives/animated-number"
import { useLanguage } from "@/context/LanguageContext"
import { Card } from "@mui/material"

const ProfileCard = ({allies}: {allies?: string}) => {
  const {language} = useLanguage()
  return (
    <Card
      sx={{
        padding: '20px'
      }}
    >
      <div>{allies ? (allies === 'followers' ? language === 'en' ? 'Followers' : '팔로워' : language === 'en' ? 'Following' : '팔로잉') : language === 'en' ? 'Points' : '포인트'}</div>
      <div className="flex justify-center">0</div>
    </Card>
  )
}
const ProfileThird = () => {
  return (
    <div className='flex'>
      <ProfileCard />
      <ProfileCard allies={'followers'} />
      <ProfileCard allies={'followings'} />
    </div>
  )
}

export default ProfileThird