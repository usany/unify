import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { collection, doc, getDocs, query, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { dbservice } from 'src/baseApi/serverbase'
import useCardsBackground from 'src/hooks/useCardsBackground'
import useSelectors from 'src/hooks/useSelectors'
import useTexts from 'src/hooks/useTexts'

const ProfileForm = () => {
  const [profileChangeConfirmed, setProfileChangeConfirmed] = useState(false)
  const [newDisplayName, setNewDisplayName] = useState('')
  const profile = useSelectors((state) => state.profile.value)
  const { colorOne, colorTwo } = useCardsBackground()
  const {
    changeUserName,
    readyToChange,
    currentName,
    existingName,
    needAnInput,
    completedChangingName,
    change,
  } = useTexts()

  useEffect(() => {
    if (profile?.displayName) {
      setNewDisplayName(profile.displayName)
    }
  }, [])
  // let profileConfirmed = true

  const onSubmit = async (event) => {
    event.preventDefault()
    if (!newDisplayName) {
      alert(needAnInput)
    } else {
      if (!profileConfirmed) {
        alert(existingName)
      } else {
        const data = doc(dbservice, `members/${profile?.uid}`)
        await updateDoc(data, { displayName: newDisplayName })
          .then(() => {
            alert(completedChangingName)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }
  }
  const onChange = async (event) => {
    const {
      target: { value },
    } = event
    setNewDisplayName(value)
    // profileConfirmed = true
    if (value && value !== profile?.displayName) {
      setProfileChangeConfirmed(true)
    } else {
      setProfileChangeConfirmed(false)
    }
  }
  return (
    <form id="profile" onSubmit={onSubmit}>
      <div className="flex justify-center pt-10">
        <div className="flex flex-col">
          <TextField
            sx={{ bgcolor: colorOne, borderRadius: '5px' }}
            label={changeUserName}
            placeholder={changeUserName}
            value={newDisplayName}
            type="text"
            onChange={onChange}
          />
          <div className="flex justify-start pt-1">
            {profileChangeConfirmed
              ? readyToChange
              : newDisplayName
                ? (newDisplayName === profile?.displayName
                  ? currentName
                  : existingName)
                : needAnInput}
          </div>
        </div>
        <Button
          sx={{ bgcolor: colorTwo, height: '56px' }}
          variant="outlined"
          form="profile"
          type="submit"
          disabled={!profileChangeConfirmed}
        >
          {change}
        </Button>
      </div>
    </form>
  )
}

export default ProfileForm
