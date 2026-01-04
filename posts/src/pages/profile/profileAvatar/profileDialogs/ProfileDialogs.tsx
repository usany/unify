import { Button } from '@mui/material';
import { Check } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import staticBlue01 from "src/assets/blue1.png";
import staticBlue02 from "src/assets/blue2.png";
import staticGold01 from "src/assets/gold1.png";
import staticGold02 from "src/assets/gold2.png";
import staticRed01 from "src/assets/red1.png";
import staticRed02 from "src/assets/red2.png";
import Avatars from 'src/pages/core/Avatars';
import { changeProfileColor } from 'src/stateSlices/profileColorSlice';
import useSelectors from 'src/hooks/useSelectors'
import useTexts from 'src/hooks/useTexts';
import { changeProfile } from 'src/stateSlices/profileSlice';
import FileOpenIcon from '@mui/icons-material/FileOpen';

const images = {
  'profileRed': [staticRed01, staticRed02],
  'profileBlue': [staticBlue01, staticBlue02],
  'profileGold': [staticGold01, staticGold02],
}
const ProfileDialogs = ({ attachment, changeAttachment, changedImage, handleChangedImage }) => {
  const { currentImageWillBeDeletedWhenCharacterImagesAreSelected, uploadMyFile, save } = useTexts()

  const profile = useSelectors((state) => state.profile.value)
  const dispatch = useDispatch()
  const switchColor = (newColor: string) => {
    dispatch(changeProfile({...profile, profileColor: newColor}))
    handleChangedImage({ ...changedImage, profileColor: newColor, changed: false })
  }

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      console.log(theFile)
      console.log(finishedEvent);
      const {
        currentTarget: { result },
      } = finishedEvent;
      console.log(result)
      changeAttachment(result)
    }
    reader.readAsDataURL(theFile)
  }
  const selectedImages = images[changedImage.profileColor] || images['gold']
  return (
    <>
      <div className='flex flex-col items-center gap-5 p-5'>
        <Avatars
          element={changedImage.changed ? changedImage : profile}
          profile={true}
        />
        <div className='flex-col px-5 content-center p-5'>
          <label htmlFor='file' className='flex flex-col p-5 rounded border border-dashed items-center'><FileOpenIcon />{uploadMyFile}</label>
          <input id='file' type='file' onChange={onFileChange} hidden />
        </div>
      </div>
      <div className='flex flex-col gap-1'>
        <div className='flex justify-center'>{currentImageWillBeDeletedWhenCharacterImagesAreSelected}</div>
        <div className='flex justify-center gap-5'>
          {selectedImages.map((value, index) => {
            if (profile?.profileColor === changedImage.profileColor) {
              return (
                <div
                  key={profile.profileColor + index + 1}
                  onClick={() => {
                    const defaultProfile = images[profile?.profileColor][index]
                    handleChangedImage({ ...changedImage, attachment: '', profileCharacter: index ? 'plant' : 'animal', profileImage: false, defaultProfile: defaultProfile, changed: true })
                    changeAttachment(null)
                    const fileInput = document.getElementById('file') || { value: null }
                    fileInput.value = null
                  }}>
                  <Avatars element={{ profileImage: true, defaultProfile: value, profileImageUrl: value }} uid='' profile={false} profileColor={''} profileUrl={value} piazza={null} />
                </div>
              )
            }
            return null
          })}
        </div>
        <div className='flex justify-center h-5'>
          <div className='flex justify-center rounded-xl w-10 bg-profile-red' onClick={() => switchColor('profileRed')}>{profile?.profileColor === 'profileRed' &&
            <Check />}</div>
          <div className='flex justify-center rounded-xl w-10 bg-profile-blue' onClick={() => switchColor('profileBlue')}>{profile?.profileColor === 'profileBlue' &&
            <Check />}</div>
          <div className='flex justify-center rounded-xl w-10 bg-profile-amber' onClick={() => switchColor('profileGold')}>{profile?.profileColor === 'profileGold' &&
            <Check />}</div>
        </div>
      </div>
    </>
  )
}

export default ProfileDialogs
