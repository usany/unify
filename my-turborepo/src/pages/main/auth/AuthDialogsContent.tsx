import { useState } from "react";
import AuthForm from "src/pages/main/auth/AuthForm";
import AuthMethods from "./AuthMethods";
import useLargeMedia from "src/hooks/useLargeMedia";
import useTexts from "src/hooks/useTexts";

function AuthDialogsContent({changeProgress}) {
  const [agreed, setAgreed] = useState(false)

  const changeAgreed = () => {
    setAgreed(!agreed)
  }
  const largeMedia = useLargeMedia()
  return (
    <div className='flex justify-center'>
      <div className={`${!largeMedia ? 'w-[470px]': 'w-full'} flex flex-col`}>
        <AuthMethods agreed={agreed} changeAgreed={changeAgreed} changeProgress={changeProgress}/>
        <AuthForm signIn={false} agreed={agreed} />
      </div>
    </div>
  );
}

export default AuthDialogsContent;
