import { doc, setDoc } from 'firebase/firestore'
import { dbservice } from 'src/baseApi/serverbase'

const setDocUser = async ({ uid, email, ranking }) => {
  const profileImageNumber = Math.random()
  const profileColorNumber = Math.random()
  const profileImage = profileImageNumber < 0.5 ? 'animal' : 'plant'
  const profileColor =
    profileColorNumber < 1 / 3
      ? 'profileRed'
      : profileColorNumber < 2 / 3
        ? 'profileBlue'
        : 'profileGold'
  const userObject = {
    uid: uid,
    email: email,
    displayName: email,
    points: 0,
    profileImage: false,
    profileImageUrl: `https://ijsfbngiyhgvolsprxeh.supabase.co/storage/v1/object/public/remake/${uid}`,
    defaultProfile: `https://ijsfbngiyhgvolsprxeh.supabase.co/storage/v1/object/public/remake/${profileImage}${profileColor}.png`,
    storageName: null,
    followers: [],
    followings: [],
    messagingToken: '',
    ranking: ranking,
    createdCards: [],
    connectedCards: [],
    borrowDoneCount: [],
    lendDoneCount: [],
    locationConfirmed: '',
    conversation: [],
    chattings: {},
    certificated: false,
    done: [],
    campus: 'Seoul Campus',
    profileColor: profileColor,
  }
  await setDoc(doc(dbservice, 'members', `${uid}`), userObject)
  return userObject
}

export default setDocUser
