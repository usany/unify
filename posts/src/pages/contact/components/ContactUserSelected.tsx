import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Card from '@mui/material/Card';
import useTexts from "src/hooks/useTexts";
import { DocumentData } from "firebase/firestore";
interface Props {
  violationUser: DocumentData | null
  color: string
}

const ContactUserSelected = ({ violationUser, color }: Props) => {
  const profile = violationUser?.profileImage ? violationUser.profileImageUrl : violationUser?.defaultProfile
  const displayName = violationUser?.displayName.slice(0, 10)+'......'
  const {reportingUser} = useTexts()
  return (
    <Card sx={{
      width: '100%',
      bgcolor: color
    }}>
      <div className='flex justify-between p-3 gap-3'>
        <div className='flex items-center'>{reportingUser}</div>
        <Avatar>
          <AvatarImage src={profile} />
        </Avatar>
        <div className='flex items-center'>{displayName}</div>
      </div>
    </Card>
  )
}

export default ContactUserSelected
