import { Card } from "@mui/material";
import useCardsBackground from "src/hooks/useCardsBackground";
import useSelectors from 'src/hooks/useSelectors';

const ProfileMembersPasswordTrigger = () => {
  const { colorTwo } = useCardsBackground()
  const languages = useSelectors((state) => state.languages.value)

  return (
    <Card sx={{ width: "100%", bgcolor: colorTwo }}>
      <div
        className="flex justify-center p-5"
      >
        {languages === 'ko' ?
          '비밀번호 변경'
          :
          'Change Password'
        }
      </div>
    </Card>
  );
};

export default ProfileMembersPasswordTrigger;
