import { Chip } from '@mui/material'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { deleteUser, User } from 'firebase/auth'
import { deleteDoc, doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { auth, dbservice } from 'src/baseApi/serverbase'
import useSelectors from 'src/hooks/useSelectors'
import useTexts from 'src/hooks/useTexts'
import { changeLoading } from 'src/stateSlices/loadingSlice'
import { changeProfile } from 'src/stateSlices/profileSlice'

const ProfileMembersDrawersContent = () => {
  const [confirmEmail, setConfirmEmail] = useState(false)
  const [process, setProcess] = useState(false)
  const {
    mail,
    deleteAccount,
    noProcessingCard,
    processingCard,
    toDeleteAccountInputMail,
    canDeleteAccountWhenYouHaveNoProcessingBorrwingOrLendingCard,
    borrowingOnProcess,
    lendingOnProcess
  } = useTexts()
  const navigate = useNavigate()
  const profile = useSelectors((state) => state.profile.value)
  const {state} = useLocation()
  const dispatch = useDispatch()
  const user = state?.element || profile
  console.log(profile)
  const onChange = (event) => {
    const {
      target: { value },
    } = event
    if (value === profile?.email) {
      setConfirmEmail(true)
    } else {
      setConfirmEmail(false)
    }
  }
  const delist = () => {
    console.log('practice')
    if (process && confirmEmail) {
      if (auth.currentUser) {
        dispatch(changeLoading(true))
        deleteUser(auth.currentUser)
          .then(async () => {
            await deleteDoc(doc(dbservice, `members/${profile?.uid}`))
            // navigate('/')
            dispatch(changeProfile(null))
            console.log(user)
            // User deleted.
          })
          .catch((error) => {
            dispatch(changeLoading(false))
            alert(error)
            console.log(error)
            // An error ocurred
            // ...
          })
        
        // navigate('/')
        // await deleteDoc(doc(dbservice, `members/${profile?.uid}`))
      }
    } else {
      alert('Cannot delete your account. Please fulfill the conditions.')
    }
  }
  useEffect(() => {
    const getUserData = async () => {
      const docRef = doc(dbservice, `members/${profile?.uid}`)
      const userDoc = await getDoc(docRef)
      const createdCards = userDoc.data()?.createdCards
      const connectedCards = userDoc.data()?.connectedCards
      const createdNumber = createdCards?.length || 0
      const connectedNumber = connectedCards?.length || 0
      dispatch(changeProfile({...profile, createdCards: createdCards, connectedNumber: connectedNumber}))
      if (createdNumber === 0 && connectedNumber === 0) {
        setProcess(true)
      } else {
        setProcess(false)
      }
    }
    getUserData()
  }, [user])

  return (
    <>
      <div className="p-5">
        {canDeleteAccountWhenYouHaveNoProcessingBorrwingOrLendingCard}
        <div className="flex justify-center">
          <Chip
            label={process ? 
              noProcessingCard
               : 
              <>
                {borrowingOnProcess}: {profile?.createdCards.length}
                <br />
                {lendingOnProcess}: {profile?.connectedCards.length}
              </>
              //  processingCard
              }
            sx={{ bgcolor: process ? '#7fc4bc' : '#e76e50', color: 'white', paddingY: process ? 0 : 3 }}
          />
        </div>
      </div>
      <div className="flex flex-col justify-center p-5 gap-5">
        <div className='pt-5'>{toDeleteAccountInputMail}</div>
        <TextField label={mail} onChange={onChange} />
        <Button className='colorOne' variant="outlined" onClick={delist}>
          {deleteAccount}
        </Button>
      </div>
    </>
  )
}

export default ProfileMembersDrawersContent
