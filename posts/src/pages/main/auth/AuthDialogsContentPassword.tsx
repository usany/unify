import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { sendPasswordResetEmail } from 'firebase/auth'
import { useState } from 'react'
import staticMail from 'src/assets/signMail.svg'
import { auth } from 'src/baseApi/serverbase'
import useSelectors from 'src/hooks/useSelectors'
import useTexts from 'src/hooks/useTexts'
function AuthDialogsContentPassword() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')
  const {needNetworkConnection, weWillSendYouAPasswordResetMail, mail, sendMail, sentAConfirmingMail, failed} = useTexts()
  const languages = useSelectors((state) => state.languages.value)
  const onChange = (event) => {
    const {
      target: { value },
    } = event
    setEmail(value)
  }
  const onLine = useSelectors((state) => state.onLine.value)
  const passwordEmail = async (event) => {
    event.preventDefault()
    if (onLine) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          setStatus('sent')
          console.log('sent')
          // Password reset email sent!
          // ..
        })
        .catch((error) => {
          setStatus('error')
          console.log(error)
          // const errorCode = error.code
          // const errorMessage = error.message
          // ..
        })
    } else {
      alert(needNetworkConnection)
    }
  }
  return (
    <div className="flex justify-center p-5">
      <div className="flex flex-col border border-solid w-[470px] rounded-lg pt-5">
        <div className="flex p-3">
          {weWillSendYouAPasswordResetMail}
        </div>
        <form id='password' className="pt-3" onSubmit={passwordEmail}>
          <div className="flex justify-center px-3">
            <TextField
              label={mail}
              value={email}
              onChange={onChange}
              variant="outlined"
              name="email"
              type="email"
              fullWidth
              required
            />
          </div>
          <div className="flex flex-col justify-center p-3">
            <Button
              className='colorOne'
              variant="outlined"
              startIcon={<img src={staticMail} className="w-[20px]" />}
              form={'password'}
              type="submit"
            >
              {sendMail}
            </Button>
            {status === 'sent' && (
              <div className="flex pt-5">
                {languages === 'ko' && email}{sentAConfirmingMail} {languages === 'en' && email}
              </div>
            )}
            {status === 'error' && (
              <div className="flex pt-5">
                {failed}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default AuthDialogsContentPassword
