import {
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  updateProfile,
} from 'firebase/auth'
import {
  collection,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
} from 'firebase/firestore'
import { getMessaging } from 'firebase/messaging'
import { getDownloadURL, getStorage, ref } from 'firebase/storage'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { doc } from 'firebase/firestore'
import setDocUser from 'src/pages/core/setDocUser'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAtraq33KBmaj0rkDAfOdXmEQtVnamrQtc',
  authDomain: 'khusan.co.kr',
  // authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
}
// const firebaseConfig = {
//     apiKey: "AIzaSyD-0xUYIBvDoz5trhrLRCDZZE0kON3qUSc",
//     authDomain: "howling-e1ed9.firebaseapp.com",
//     projectId: "howling-e1ed9",
//     storageBucket: "howling-e1ed9.appspot.com",
//     messagingSenderId: "160882064839",
//     appId: "1:160882064839:web:9409cc44a01176ffcc6de2"
// };
// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const dbservice = getFirestore(app)
// const storage = getStorage(app, 'gs://remake-36fe0.appspot.com');
const storage = getStorage(app)
const messaging = getMessaging(app)

// const providerMicrosoft = new OAuthProvider('microsoft.com');
// providerMicrosoft.setCustomParameters({
//     prompt: "consent",
//     tenant: "723e1730-9623-4a7c-a8ee-b616ecd5e89f",
//     login_hint: 'user@firstadd.onmicrosoft.com',
//     redirect_uri: 'https://remake-36fe0.firebaseapp.com/__/auth/handler'
// })
// auth.languageCode = 'en'
auth.useDeviceLanguage()

const onSocialClick = async (result) => {
  const uid = result.user.uid
  const email = result.user.email
  const docRef = doc(dbservice, `members/${uid}`)
  const docSnap = await getDoc(docRef)
  const userData = docSnap.data()
  const docsRef = query(collection(dbservice, 'members'))
  const docs = await getDocs(docsRef)
  const docsLength = docs.docs.length
  if (!userData) {
    const auth = getAuth()
    if (auth.currentUser) {
      updateProfile(auth.currentUser, {
        displayName: result.user.email,
      })
    }
    setDocUser({ uid: uid, email: email, ranking: docsLength })
    await updateProfile(result.user, {
      displayName: result.user.email,
    }).catch((error) => {
      console.log(error)
    })
    // uploadString(storageRef, 'null', 'raw').then(() => {
    //   console.log('Uploaded a blob or file!')
    //   getDownloadURL(storageRef)
    //     .then((url) => {
    //       updateDoc(docRef, { profileImageUrl: url })
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     })
    // })
    let profileImage
    let profileColor
    const profileImageNumber = Math.random()
    const profileColorNumber = Math.random()
    if (profileColorNumber < 1 / 3) {
      profileColor = 'profileRed'
    } else if (profileImageNumber < 2 / 3) {
      profileColor = 'profileBlue'
    } else {
      profileColor = 'profileGold'
    }
    if (profileImageNumber < 0.5) {
      profileImage = 'animal'
    } else {
      profileImage = 'plant'
    }
    const reference = ref(storage, `${profileImage}${profileColor}.png`)
    console.log(reference)
    getDownloadURL(reference).then((url) => {
      console.log(url)
      updateDoc(docRef, {
        profileImage: false,
        profileColor: profileColor,
        defaultProfile: url,
      })
    })
    // setTimeout(() => {
    //   location.reload()
    // }, 1000)
  }
}
const onSocialClickGoogle = () => {
  const providerGoogle = new GoogleAuthProvider()
  const emails = providerGoogle.addScope(
    'https://www.googleapis.com/auth/contacts.readonly',
  )
  // console.log(location)
  if (location.hostname === 'khusan.co.kr') {
    signInWithRedirect(auth, providerGoogle.addScope('email'))
  } else {
    signInWithPopup(auth, providerGoogle.addScope('email'))
    .then((result) => onSocialClick(result))
    .catch((error) => {
      console.log(error)
    })
  }
}
const onSocialClickMicrosoft = () => {
  const providerMicrosoft = new OAuthProvider('microsoft.com')
  if (location.hostname === 'khusan.co.kr') {
    signInWithRedirect(auth, providerMicrosoft)
  } else {
    signInWithPopup(auth, providerMicrosoft)
    .then((result) => onSocialClick(result))
    .catch((error) => {
      console.log(error)
    })
  }
  // signInWithRedirect(auth, providerMicrosoft)
}
const onSocialClickApple = () => {
  const providerApple = new OAuthProvider('apple.com')
  if (location.hostname === 'khusan.co.kr') {
    signInWithRedirect(auth, providerApple)
  } else {
    signInWithPopup(auth, providerApple)
      .then((result) => onSocialClick(result))
      .catch((error) => {
        console.log(error)
      })
  }
}

export {
  auth,
  dbservice,
  messaging,
  onSocialClick,
  onSocialClickApple,
  onSocialClickGoogle,
  onSocialClickMicrosoft,
  // onSocialClickFacebook,
  // onSocialClickTwitter,
  storage,
}
