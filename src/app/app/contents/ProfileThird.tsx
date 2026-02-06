import { AnimatedNumber } from "@/components/motion-primitives/animated-number"
import { useLanguage } from "@/context/LanguageContext"
import { Card } from "@mui/material"

const ProfileCard = ({isPassoword}: {isPassoword: boolean}) => {
  const {language} = useLanguage()
  return (
    <Card
      sx={{
        padding: '20px'
      }}
    >
      <div>{isPassoword ? language === 'en' ? 'Password Change' : '비밀번호 변경' : language === 'en' ? 'Delete Account' : '회원 탈퇴'}</div>
    </Card>
  )
}
const ProfileThird = () => {
  return (
    <div className='flex'>
      <ProfileCard isPassoword={true} />
      <ProfileCard isPassoword={false} />
    </div>
  )
}

export default ProfileThird