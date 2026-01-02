import useTexts from "src/hooks/useTexts";
import Popups from "src/pages/core/Popups";
import AuthDialogsContent from "./AuthDialogsContent";
import AuthDialogsContentPassword from "./AuthDialogsContentPassword";
import AuthDialogsTrigger from "./AuthDialogsTrigger";
import { useState } from "react";
import SignUpPopups from "src/pages/core/SignUpPopups";

function AuthDialogs() {
  const {findPassword, welcomeToKhusan} = useTexts()
  const [onProgress, setOnProgress] = useState(false)
  const changeProgress = (newValue: boolean) => setOnProgress(newValue)
  const progressFalse = () => setOnProgress(false)
  return (
    <div className='flex justify-center text-xs p-5 gap-5'>
      <Popups trigger={findPassword}
        title={findPassword}
        content={<AuthDialogsContentPassword />}
      />
      <div className='flex items-center text-xl'>|</div>
      <SignUpPopups trigger={<AuthDialogsTrigger progressFalse={progressFalse}/>}
        title={welcomeToKhusan}
        content={<AuthDialogsContent changeProgress={changeProgress}/>}
        onProgress={onProgress}
      />
    </div>
  );
}

export default AuthDialogs;
