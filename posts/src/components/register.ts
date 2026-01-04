// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   updateProfile,
// } from 'firebase/auth'
// import { doc, setDoc } from 'firebase/firestore'
// import { ref, uploadString } from 'firebase/storage'
// import { useState } from 'react'
// import { auth, dbservice } from 'src/baseApi/serverbase'

const useRegister = async () => {
  // const [account, setAccount] = useState({ email: '', password: '' })
  // const [error, setError] = useState('')
  // try {
  //   const data = await createUserWithEmailAndPassword(auth, account.email, account.password)
  //   await setDoc(doc(dbservice, 'members', `${data.user.uid}`), {
  //     uid: data.user.uid,
  //     displayName: data.user.email,
  //     points: 0,
  //     profileColor: '#2196f3',
  //     profileImage: null,
  //     profileImageUrl: null,
  //     followerNum: 0,
  //     followingNum: 0,
  //     followers: [],
  //     followings: [],
  //     messagingToken: null,
  //     defaultProfile: ''
  //   })
  //   await updateProfile(data.user, {
  //     displayName: data.user.email
  //   }).catch((error) => {
  //     console.log('error')
  //   })
  //   const storageRef = ref(storage, data.user.uid);
  //   uploadString(storageRef, 'null', 'raw').then((snapshot) => {
  //     console.log('Uploaded a blob or file!');
  //   });
  // } catch (error) {
  //   if (error.message === 'Firebase: Error (auth/invalid-credential).') {
  //     const errorMessage = '로그인 실패: 계정을 확인해 주세요'
  //     setError(errorMessage)
  //   } else if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
  //     const errorMessage = '회원가입 실패: 이미 가입된 계정입니다'
  //     setError(errorMessage)
  //   } else if (error.message === 'Firebase: Error (auth/invalid-email).') {
  //     const errorMessage = '회원가입 실패: 계정을 확인해 주세요'
  //     setError(errorMessage)
  //   } else {
  //     console.log(error.message)
  //   }
  // }
  // const onSubmitSignIn = async (event) => {
  //   event.preventDefault()
  //   try {
  //     await signInWithEmailAndPassword(auth, account.email, account.password)
  //   } catch (error) {
  //     if (error.message === 'Firebase: Error (auth/invalid-credential).') {
  //       const errorMessage = '로그인 실패: 계정을 확인해 주세요'
  //       setError(errorMessage)
  //     }
  //   }
  // }
  // if (method === 'email') {
  // }
  // const userSetDoc = async () => {
  //   await setDoc(doc(dbservice, 'members', `${data.user.uid}`), {
  //     uid: data.user.uid,
  //     displayName: data.user.email,
  //     points: 0,
  //     profileColor: '#2196f3',
  //     profileImage: null,
  //     profileImageUrl: null,
  //     followerNum: 0,
  //     followingNum: 0,
  //     followers: [],
  //     followings: [],
  //     messagingToken: null,
  //   })
  // }
  // const onSubmitSignUp = async (event) => {
  //   event.preventDefault()
  //   try {
  //     const data = await createUserWithEmailAndPassword(auth, account.email, account.password)
  //     await setDoc(doc(dbservice, 'members', `${data.user.uid}`), {
  //       uid: data.user.uid,
  //       displayName: data.user.email,
  //       points: 0,
  //       profileColor: '#2196f3',
  //       profileImage: null,
  //       profileImageUrl: null,
  //       followerNum: 0,
  //       followingNum: 0,
  //       followers: [],
  //       followings: [],
  //       messagingToken: null,
  //     })
  //     await updateProfile(data.user, {
  //       displayName: data.user.email
  //     }).catch((error) => {
  //       console.log('error')
  //     })
  //     const storageRef = ref(storage, data.user.uid);
  //     uploadString(storageRef, 'null', 'raw').then((snapshot) => {
  //       console.log('Uploaded a blob or file!');
  //     });
  //   } catch (error) {
  //     if (error.message === 'Firebase: Error (auth/invalid-credential).') {
  //       const errorMessage = '로그인 실패: 계정을 확인해 주세요'
  //       setError(errorMessage)
  //     } else if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
  //       const errorMessage = '회원가입 실패: 이미 가입된 계정입니다'
  //       setError(errorMessage)
  //     } else if (error.message === 'Firebase: Error (auth/invalid-email).') {
  //       const errorMessage = '회원가입 실패: 계정을 확인해 주세요'
  //       setError(errorMessage)
  //     } else {
  //       console.log(error.message)
  //     }
  //   }
  // }
  // const onChange = (event) => {
  //   const {
  //     target: { name, value }
  //   } = event
  //   if (name === 'email') {
  //     setAccount({ email: value, password: account.password })
  //   } else if (name === 'password') {
  //     setAccount({ ...account, password: value })
  //   }
  // }
  // return ([error])
}

export default useRegister
