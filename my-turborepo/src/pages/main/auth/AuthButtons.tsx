import Button from '@mui/material/Button'
import staticGoogle from 'src/assets/signGoogle.svg'
import staticApple from 'src/assets/signApple.png'
import staticMicrosoft from 'src/assets/signMicrosoft.svg'
import {
  onSocialClick,
  onSocialClickApple,
  onSocialClickGoogle,
  onSocialClickMicrosoft,
} from 'src/baseApi/serverbase'
import useSelectors from 'src/hooks/useSelectors'
import useTexts from 'src/hooks/useTexts'
import supabase from 'src/baseApi/base'
// import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

const AuthButtons = () => {
  const onLine = useSelectors((state) => state.onLine.value)
  const {needNetworkConnection, continueWithMicrosoft, continueWithGoogle, comingSoonWithApple} = useTexts()
  const buttons = [
    {
      id: 'continueWithGoogle',
      image: <img src={staticGoogle} className="w-[20px]" />,
      onClick: () => onSocialClickGoogle(),
      text:continueWithGoogle
    },
    {
      id: 'continueWithApple',
      image: <img src={staticApple} className="w-[20px]" />,
      onClick: () => onSocialClickApple(),
      text: comingSoonWithApple
    },
    {
      id: 'continueWithMicrosoft',
      image: <img src={staticMicrosoft} className="w-[20px]" />,
      onClick: () => onSocialClickMicrosoft(),
      text:continueWithMicrosoft
    },
  ]
  async function handleSignInWithGoogle(response) {
    console.log(response)
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
    console.log(data)
    console.log(error)
  }



  return (
    <div className="flex justify-center">
      <div className="flex flex-col">
        {buttons.map((value) => {
          return (
            <Button
              className='colorTwo'
              startIcon={value.image}
              variant="outlined"
              onClick={() => {
                if (onLine) {
                  value.onClick()
                } else {
                  alert(needNetworkConnection)
                }
              }}
            >
              {value.text}
            </Button>
          )
        })}
      </div>
    </div>
  )
}

export default AuthButtons