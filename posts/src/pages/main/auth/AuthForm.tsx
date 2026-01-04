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
import AuthDialogs from './AuthDialogs.tsx'
import supabase from 'src/baseApi/base.tsx'
import { useDispatch } from 'react-redux'
import { changeProfile } from 'src/stateSlices/profileSlice.tsx'
import AuthFormInputs from './AuthFormInputs.tsx'
import useLargeMedia from 'src/hooks/useLargeMedia.ts'

interface Props {
  signIn: boolean
  agreed: boolean
}
const AuthForm = ({ signIn, agreed }: Props) => {
  const largeMedia = useLargeMedia()
  return (
    <div className="flex justify-center p-5">
      <div className={`flex flex-col border border-solid rounded-lg pt-5 ${signIn || largeMedia ? 'w-[470px]' : 'w-full'}`}>
        <AuthFormInputs signIn={signIn} agreed={agreed} />
        {signIn && <AuthDialogs />}
      </div>
    </div>
  )
}

export default AuthForm
