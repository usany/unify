import Button from '@mui/material/Button'
import { decode } from 'base64-arraybuffer'
import { User } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'
import supabase from 'src/baseApi/base'
import { dbservice } from 'src/baseApi/serverbase'
import { changeProfile } from 'src/stateSlices/profileSlice'
import { changeProfileUrl } from 'src/stateSlices/profileUrlSlice'
import useTexts from 'src/hooks/useTexts'

interface Props {
  changedImage: object
  handleChangedImage: () => void
  attachment: string
}
const ProfileClose = ({
  changedImage,
  handleChangedImage,
  attachment,
}: Props) => {
  const profile = useSelector((state) => state.profile.value)
  const dispatch = useDispatch()
  const { save } = useTexts()
  const onClick = async () => {
    const docRef = doc(dbservice, `members/${profile?.uid}`)
    const uidCurrent = profile?.uid+Date.now()
    if (attachment) {
      dispatch(changeProfileUrl(attachment))
      // dispatch(
      //   changeProfile({
      //     ...profile,
      //     profileImage: true,
      //     profileImageUrl: attachment,
      //   }),
      // )
      localStorage.setItem(
        `${profile.uid}`,
        JSON.stringify({ uid: profile.uid, attachment: attachment }),
      )
      if (attachment.slice(0, 5) === 'data:') {
        dispatch(
          changeProfile({
            ...profile,
            profileImage: true,
            profileImageUrl: attachment,
            storageName: uidCurrent,
          }),
        )
        updateDoc(docRef, { profileImage: true, profileImageUrl: `https://ijsfbngiyhgvolsprxeh.supabase.co/storage/v1/object/public/remake/${uidCurrent}`, storageName: uidCurrent })
        const splitedArray = attachment.split(';base64,')
        const content = splitedArray[0].slice(5)
        const base64 = splitedArray[1]
        console.log(decode(base64))
        await supabase.storage
          .from('remake')
          .remove([profile?.storageName])
        const { data, error } = await supabase.storage
          .from('remake')
          .update(uidCurrent, decode(base64), {
            contentType: content,
            cacheControl: '1',
            upsert: true,
          })
        if (data) {
          console.log(data)
        } else {
          console.log(error)
        }
      }
    } else {
      dispatch(
        changeProfile({
          ...profile,
          profileImage: false,
          defaultProfile: changedImage.defaultProfile,
          profileImageUrl: changedImage.profileImageUrl,
          storageName: uidCurrent,
        }),
      )
      localStorage.setItem(
        `${profile.uid}`,
        JSON.stringify({ uid: profile.uid, attachment: '' }),
      )
      updateDoc(docRef, {
        profileImage: false,
        profileImageUrl: `https://ijsfbngiyhgvolsprxeh.supabase.co/storage/v1/object/public/remake/${uidCurrent}`,
        profileColor: changedImage.profileColor,
        defaultProfile: changedImage.defaultProfile,
        storageName: uidCurrent
      })
      const removing = await supabase.storage
          .from('remake')
          .remove([profile?.storageName])
        console.log(removing)
      const { data, error } = await supabase.storage
        .from('remake')
        .update(uidCurrent, 'null', {
          upsert: true,
        })
      if (data) {
        console.log(data)
      } else {
        console.log(error)
      }
    }
  }
  
  return (
    <div>
      {changedImage.changed && (
        <Button
          className='colorOne'
          variant="outlined"
          onClick={() => {
            handleChangedImage({ ...changedImage, changed: false })
            onClick()
          }}
        >
          {save}
        </Button>
      )}
    </div>
  )
}

export default ProfileClose
