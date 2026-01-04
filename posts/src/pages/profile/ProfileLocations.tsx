import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button, Chip } from '@mui/material'
import { doc, updateDoc } from 'firebase/firestore'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { dbservice } from 'src/baseApi/serverbase'
import useLargeMedia from 'src/hooks/useLargeMedia'
import useSelectors from 'src/hooks/useSelectors'
import useTexts from 'src/hooks/useTexts'
import { changeProfile } from 'src/stateSlices/profileSlice'
import ProfileLocationsChip from './ProfileLocationsChip'
import LottieOnce from 'src/lottiesAnimation/LottieOnce'
import LottieProcess from 'src/lottiesAnimation/LottieProcess'

const campuses = {
  ko: ['서울캠퍼스', '국제캠퍼스', '광릉캠퍼스'],
  en: ['Seoul Campus', 'Global Campus', 'Gwangneung Campus']
}
// const area = {
//   westSouth: { lat: 37.5927551, lng: 127.047462 },
//   westNorth: { lat: 37.6010743, lng: 127.047462 },
//   eastSouth: { lat: 37.5927551, lng: 127.0571999 },
//   eastNorth: { lat: 37.6010743, lng: 127.0571999 },
// }
const areas = {
  'Seoul': {
    westSouth: { lat: 37.5927551, lng: 127.047462 },
    westNorth: { lat: 37.6010743, lng: 127.047462 },
    eastSouth: { lat: 37.5927551, lng: 127.0571999 },
    eastNorth: { lat: 37.6010743, lng: 127.0571999 },
  },
  'Global': {
    westSouth: { lat: 37.236211, lng: 127.075580 },
    westNorth: { lat: 37.247801, lng: 127.075580 },
    eastSouth: { lat: 37.236211, lng: 127.089419 },
    eastNorth: { lat: 37.247801, lng: 127.089419 },
  },
  'Gwangneung': {
    westSouth: { lat: 37.747516, lng: 127.184923 },
    westNorth: { lat: 37.750271, lng: 127.184923 },
    eastSouth: { lat: 37.747516, lng: 127.188091 },
    eastNorth: { lat: 37.750271, lng: 127.188091 },
  }
}

const ProfileLocations = () => {
  const [location, setLocation] = useState({ lat: 0, lng: 0, error: false })
  const {
    // campusLocationConfirmation,
    locationConfirmed,
    locationUnconfirmed,
    failedLocationConfirmation,
    save,
    nothingChanged,
    saved,
    allowLocationAccessToUpdateOnCampusStatusOfYourProfile,
    loading
  } = useTexts()
  const { state } = useLocation()
  const profile = useSelectors((state) => state.profile.value)
  const userUid = state?.element.uid || profile?.uid
  const userCampus = state?.element.campus || profile?.campus
  const locationConfirmNumber = 50000000
  const confirmed = state?.element ? state?.element.locationConfirmed : profile?.locationConfirmed
  const largeMedia = useLargeMedia()
  const languages = useSelectors((state) => state.languages.value)
  const theme = useSelectors((state) => state.theme.value)
  const locationConfirmation =
    confirmed && Date.now() - confirmed < locationConfirmNumber ? true : false
  const dispatch = useDispatch()
  let selectedCampus = profile?.campus
  const onClickSaveCampus = () => {
    if (profile?.campus !== selectedCampus) {
      dispatch(changeProfile({...profile, campus: selectedCampus, locationConfirmed: null }))
      const ref = doc(dbservice, `members/${profile?.uid}`)
      updateDoc(ref, { campus: selectedCampus, locationConfirmed: null })
      setLocation({...location, error: false})
      alert(saved)
    } else {
      alert(nothingChanged)
    }
  }
  const [isLoading, setIsLoading] = useState(false)
  // const onClick = () => {
  //   const myDoc = doc(dbservice, `members/${profile?.uid}`)
  //   if (
  //     location.lat > area.westSouth.lat &&
  //     location.lat < area.westNorth.lat
  //   ) {
  //     if (
  //       location.lng > area.westSouth.lng &&
  //       location.lng < area.eastSouth.lng
  //     ) {
  //       updateDoc(myDoc, { locationConfirmed: Date.now() })
  //       dispatch(changeProfile({ ...profile, locationConfirmed: true }))
  //     }
  //   }
  // }
  // const onLocationBoundary = () => {
  //   const myDoc = doc(dbservice, `members/${profile?.uid}`)
  //   const key = profile?.campus.slice(0, profile?.campus.indexOf(' ')) || 'Seoul'
  //   if (
  //     location.lat > areas[key].westSouth.lat &&
  //     location.lat < areas[key].westNorth.lat
  //   ) {
  //     if (
  //       location.lng > areas[key].westSouth.lng &&
  //       location.lng < areas[key].eastSouth.lng
  //     ) {
  //       updateDoc(myDoc, { locationConfirmed: Date.now() })
  //       dispatch(changeProfile({ ...profile, locationConfirmed: true }))
  //     }
  //   } else {
  //     setLocation({...location, error: true})
  //   }
  // }
  const onClickLocation = () => {
    alert(allowLocationAccessToUpdateOnCampusStatusOfYourProfile)
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position)
      const newLocation = {
        ...location,
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
      const myDoc = doc(dbservice, `members/${profile?.uid}`)
      const key = profile?.campus.slice(0, profile?.campus.indexOf(' ')) || 'Seoul'
      if (
        newLocation.lat > areas[key].westSouth.lat &&
        newLocation.lat < areas[key].westNorth.lat
      ) {
        if (
          newLocation.lng > areas[key].westSouth.lng &&
          newLocation.lng < areas[key].eastSouth.lng
        ) {
          updateDoc(myDoc, { locationConfirmed: Date.now() })
          dispatch(changeProfile({ ...profile, locationConfirmed: Date.now() }))
        }
        setLocation(newLocation)
      } else {
        setLocation({...newLocation, error: true})
      }
      setIsLoading(false)
    }, (error) => {
      console.log(error)
      setLocation({...location, error: true})
      setIsLoading(false)
    })
  }
  return (
    <div className="flex justify-center p-10">
      <div className={`flex ${!largeMedia && 'flex-col'} items-center gap-1`}>
        {userUid === profile?.uid ?
          <div className='flex items-center'>
            <Select defaultValue={campuses.en[campuses.en.indexOf(profile?.campus || 'Seoul Campus')]} onValueChange={(newValue) => {
              selectedCampus = newValue
            }}>
              <SelectTrigger
                className="w-52 bg-light-1 dark:bg-dark-1"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-light-1 dark:bg-dark-1">
                <SelectGroup>
                  {campuses[languages].map((value, index) => {
                    return (
                      <SelectItem key={index} value={campuses.en[index]}>
                        {value}
                      </SelectItem>
                    )
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button onClick={onClickSaveCampus}>{save}</Button>
          </div>
        :
          <div className='flex justify-center'>{campuses[languages][campuses.en.indexOf(userCampus || 'Seoul Campus')]}</div>
        }
        <Chip
          sx={locationConfirmation ? {color: theme === 'light' ? 'black' : 'white' } : undefined}
          color={locationConfirmation ? 'success' : undefined}
          label={
            isLoading ? <div className='flex justify-center items-center gap-1'>
            <LottieProcess />
            {loading}
          </div> : locationConfirmation ? <div className='flex justify-center items-center gap-1'><LottieOnce color={'blue'} />{locationConfirmed}</div> : location.error ? <div className='flex justify-center items-center gap-1'><LottieOnce color={'red'} />{failedLocationConfirmation}</div> : userUid === profile?.uid ?
            <button className='flex justify-center items-center gap-1' onClick={() => {
              setIsLoading(true)
              onClickLocation()
            }}>
              <LottieOnce color={'red'} />
              {locationUnconfirmed}
              <ProfileLocationsChip />
            </button>
            :
            <div className='flex justify-center items-center gap-1'>
              <LottieOnce color={'red'} />
              {locationUnconfirmed}
            </div>
          }
        />
        {/* {isLoading &&
          <div className='flex flex-col items-center'>
            <LottieProcess />
            {loading}
          </div>
        } */}
        {/* {!locationConfirmation && location.error && (
          <div className='flex flex-col'><LottieOnce color={'red'} />{failedLocationConfirmation}</div>
        )} */}
      </div>
    </div>
  )
}

export default ProfileLocations
