import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { collection, getDocs, query } from 'firebase/firestore'
import { useState } from 'react'
import staticMail from 'src/assets/signMail.svg'
import { auth, dbservice } from 'src/baseApi/serverbase'
import useSelectors from 'src/hooks/useSelectors'
import setDocUser from 'src/pages/core/setDocUser.ts'
import useTexts from 'src/hooks/useTexts'
import supabase from 'src/baseApi/base.tsx'
import { useDispatch } from 'react-redux'
import { changeProfile } from 'src/stateSlices/profileSlice.tsx'
import { changeLoading } from 'src/stateSlices/loadingSlice'

interface Props {
  signIn: boolean
  agreed: boolean
}
const AuthFormInputs = ({ signIn, agreed }: Props) => {
  const [account, setAccount] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const { needToAgreeOnPrivateInformationPolicy, needNetworkConnection, mail, password, logIn, newAccount } = useTexts()
  const onLine = useSelectors((state) => state.onLine.value)
  const onSubmitSignIn = async (event) => {
    event.preventDefault()
    try {
      dispatch(changeLoading(true))
      await signInWithEmailAndPassword(auth, account.email, account.password)
    } catch (error) {
      dispatch(changeLoading(false))
      console.log(error)
      const errorMessage = '로그인 실패: 계정을 확인해 주세요'
      setError(errorMessage)
      if (error.message === 'Firebase: Error (auth/invalid-credential).') {
        const errorMessage = '로그인 실패: 계정을 확인해 주세요'
        setError(errorMessage)
      }
    }
  }

  const onSubmitSignUp = async (event) => {
    event.preventDefault()
    if (agreed) {
      if (onLine) {
        try {
          const data = await createUserWithEmailAndPassword(
            auth,
            account.email,
            account.password,
          )
          const uid = data.user.uid
          const email = data.user.email
          await supabase.storage.from('remake').update(uid, 'null')
          const docsRef = query(collection(dbservice, 'members'))
          const docs = await getDocs(docsRef)
          const docsLength = docs.docs.length
          const newProfile = await setDocUser({
            uid: uid,
            email: email,
            ranking: docsLength,
          })
          dispatch(changeProfile(newProfile))
        } catch (error) {
          console.log(error)
          if (error.message === 'Firebase: Error (auth/invalid-credential).') {
            const errorMessage = '로그인 실패: 계정을 확인해 주세요'
            setError(errorMessage)
          } else if (
            error.message === 'Firebase: Error (auth/email-already-in-use).'
          ) {
            const errorMessage = '회원가입 실패: 이미 가입된 계정입니다'
            setError(errorMessage)
          } else if (
            error.message === 'Firebase: Error (auth/invalid-email).'
          ) {
            const errorMessage = '회원가입 실패: 계정을 확인해 주세요'
            setError(errorMessage)
          } else {
            console.log(error.message)
            setError(errorMessage)
          }
          console.log(error.message)
          setError(errorMessage)
        }
      } else {
        alert(needNetworkConnection)
      }
    }
  }

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event
    if (name === 'email') {
      setAccount({ email: value, password: account.password })
    } else if (name === 'password') {
      setAccount({ ...account, password: value })
    }
  }
  return (
    <form
      id={signIn ? 'auth' : 'signUp'}
      className="pt-3"
      onSubmit={signIn ? onSubmitSignIn : onSubmitSignUp}
    >
      <div className="flex justify-center px-3">
        <TextField
          label={mail}
          value={account.email}
          onChange={onChange}
          variant="outlined"
          name="email"
          type="email"
          fullWidth
          required
        />
      </div>
      <div className="flex justify-center px-3">
        <TextField
          label={password}
          value={account.password}
          onChange={onChange}
          variant="outlined"
          name="password"
          type="password"
          fullWidth
          required
        />
      </div>
      <div className="flex flex-col justify-center p-3">
        {(signIn || agreed) &&
          <Button
            className={signIn
              ? 'colorTwo'
              : 'colorOne'}
            variant="outlined"
            startIcon={<img src={staticMail} className="w-[20px]" />}
            form={signIn ? 'auth' : 'signUp'}
            type="submit"
          >
            {signIn
              ? logIn
              : newAccount}
          </Button>
        }
        {!signIn && !agreed && (
          <div>{needToAgreeOnPrivateInformationPolicy}</div>
        )}
        <span>{error}</span>
      </div>
    </form>
  )
}

export default AuthFormInputs
