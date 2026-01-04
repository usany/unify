// import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
// import { doc, setDoc } from 'firebase/firestore'
// import { useState } from 'react'
// import { auth, dbservice, storage } from 'src/baseApi/serverbase'

const SignUpForm = () => {
  return (
    <form id="signUp" onSubmit={onSubmit}>
      {/* <div className='flex justify-center px-3'>
          <TextField label="이메일" value={account.email} onChange={onChange} variant="outlined" name='email' type='email' fullWidth required />
      </div>
      <div className='flex justify-center px-3'>
          <TextField label="비밀번호" value={account.password} onChange={onChange} variant="outlined" name='password' type='password' fullWidth required />
      </div>
      <div className='flex flex-col justify-center p-3'>
        <span className='flex justify-center'>{error}</span>
        <Button variant='outlined' form='signUp' type='submit'>회원가입</Button>
      </div> */}
    </form>
  )
}

export default SignUpForm
