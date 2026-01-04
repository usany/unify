import { useMediaQuery } from '@mui/material'
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import { Maximize2, Minimize2 } from 'lucide-react'
import { useEffect, useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { dbservice } from 'src/baseApi/serverbase'
import useSelectors from 'src/hooks/useSelectors'
import AddCards from 'src/pages/add/AddCards'
import AddRegisterButton from 'src/pages/add/AddRegisterButton'
import AddSnackBar from 'src/pages/add/AddSnackBar'
import AddStepFour from 'src/pages/add/AddStepFour'
import AddStepOne from 'src/pages/add/AddStepOne'
import AddSteppers from 'src/pages/add/AddSteppers'
import AddStepThree from 'src/pages/add/AddStepThree'
import AddStepTwo from 'src/pages/add/AddStepTwo'
import PageTitle from 'src/pages/core/pageTitle/PageTitle'
import useTexts from 'src/hooks/useTexts'
// import { locationsBuildingsArray } from './locationsBuildings'

interface Props {
  borrow: boolean
}
interface LocationEvent extends EventTarget {
  target: { value: string }
}

interface Clock {
  gmt: {
    getTime: () => number
  }
  year: number
  month: number
  day: number
  hour: number
  minute: number
}
interface FromTo {
  from: Clock | null
  to: Clock | null
}
function Add({ borrow }: Props) {
  const [addSteps, setAddSteps] = useState(0)
  const [display, setDisplay] = useState({
    id: '',
  })
  const [item, setItem] = useState('')
  const tabs = useSelectors((state) => state.tabs.value)
  const [fromTo, setFromTo] = useState<FromTo>({ from: null, to: null })
  const matches = useMediaQuery('(min-width:850px)')
  const profile = useSelectors((state) => state.profile.value)
  const { pleaseCheckTime, borrowing, lending, card, register, needAnInput } = useTexts()
  const navigate = useNavigate()
  const [locationState, locationDispatch] = useReducer(
    (
      state: {
        locationOne: string
        locationTwo: string
        locationThree: string
        locationInput: string
      },
      action: { type: string; newState: string },
    ) => {
      if (action.type === 'changeBuilding') {
        console.log(action.newState)
        return {
          locationOne: action.newState,
          locationTwo: '',
          locationThree: '',
          locationInput: ''
        }
      } else if (action.type === 'changeRoom') {
        return { ...state, locationTwo: action.newState, locationThree: '' }
      } else if (action.type === 'changeSeat') {
        return { ...state, locationThree: action.newState }
      } else if (action.type === 'changeLocationInput') {
        if (state.locationOne === '직접 입력') {
          return {
            ...state,
            locationTwo: '',
            locationThree: '',
            locationInput: action.newState,
          }
        } else {
          return {
            ...state,
            locationThree: '',
            locationInput: action.newState,
          }
        }
      } else if (action.type === 'changeItem') {
        return {
          locationOne: '',
          locationTwo: '',
          locationThree: '',
          locationInput: '',
        }
      } else {
        return { ...state }
      }
    },
    {
      locationOne: '',
      locationTwo: '',
      locationThree: '',
      locationInput: '',
    },
  )

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant', // Optional if you want to skip the scrolling animation
    })
  }, [])
  useEffect(() => {
    if (!window.location.search) {
      navigate('/add?action=borrow', {replace: true})
    } else if (
      ['?action=borrow', '?action=lend'].indexOf(window.location.search) === -1
    ) {
      navigate('/add?action=borrow', {replace: true})
    }
  }, [])
  useEffect(() => {
    setAddSteps(0)
    setItem('')
  }, [tabs])

  const changeItem = (event: LocationEvent) => {
    const {
      target: { value },
    } = event
    setItem(value)
    locationDispatch({ type: 'changeItem', newState: '' })
    setFromTo({from: null, to: null})
    if (value) {
      setAddSteps(1)
    } else {
      setAddSteps(0)
    }
  }
  const changeLocationInput = (event: LocationEvent) => {
    // event.preventDefault()
    const {
      target: { value },
    } = event
    locationDispatch({ type: 'changeLocationInput', newState: value })
    if (value) {
      setAddSteps(2)
    } else {
      setFromTo({from: null, to: null})
      setAddSteps(1)
    }
  }
  const changeBuilding = (event: LocationEvent) => {
    // event.preventDefault()
    const {
      target: { value },
    } = event
    locationDispatch({ type: 'changeBuilding', newState: value })
    setAddSteps(1)
  }
  const changeRoom = (event: LocationEvent) => {
    // event.preventDefault()
    const {
      target: { value },
    } = event
    locationDispatch({ type: 'changeRoom', newState: value })
    if (
      locationState.locationOne.indexOf('중도') === -1 &&
      locationState.locationOne !== '직접 입력' &&
      value !== '직접 입력'
    ) {
      setAddSteps(2)
    } else if (
      locationState.locationOne.indexOf('중도') !== -1 &&
      ['1열(1F)', '2열(2F)', '3열(2F)', '4열(4F)', '집중열(1F)', '벗터(1F)', '혜움(2F)'].indexOf(
        value,
      ) === -1
    ) {
      setAddSteps(2)
    } else {
      setAddSteps(1)
    }
  }
  const changeSeat = (event: LocationEvent) => {
    //   event.preventDefault()
    const {
      target: { value },
    } = event
    locationDispatch({ type: 'changeSeat', newState: value })
    setAddSteps(2)
  }

  const submit = async (event: EventTarget) => {
    event.preventDefault()
    if (
      (locationState.locationInput !== '' ||
        (['', '직접 입력'].indexOf(locationState.locationOne) === -1 &&
          ['', '직접 입력'].indexOf(locationState.locationTwo) === -1)) &&
      fromTo.from !== null &&
      fromTo.to !== null
    ) {
      if (fromTo.from.gmt.getTime() > fromTo.to.gmt.getTime()) {
        alert(pleaseCheckTime)
      } else if (fromTo.from.gmt.getTime() < Date.now()) {
        alert(pleaseCheckTime)
      } else if (fromTo.to.gmt.getTime() < Date.now()) {
        alert(pleaseCheckTime)
      } else {
        const calculating = () => {
          if (fromTo.from && fromTo.to) {
            if (fromTo.to.year - fromTo .from.year > 0) {
              return (fromTo.to.year - fromTo.from.year) * 366 * 24 * 60
            } else if (fromTo.to.month - fromTo.from.month > 0) {
              return (fromTo.to.month - fromTo.from.month) * 31 * 24 * 60
            } else if (fromTo.to.day - fromTo.from.day > 0) {
              return (fromTo.to.day - fromTo.from.day) * 24 * 60
            } else if (fromTo.to.hour - fromTo.from.hour > 0) {
              return (fromTo.to.hour - fromTo.from.hour) * 60
            } else if (fromTo.to.minute - fromTo.from.minute > 0) {
              return fromTo.to.minute - fromTo.from.minute
            }
          }
          return 0
        }
        const calculatePoint = calculating()
        const location = locationState.locationOne === '직접 입력' ? locationState.locationInput : locationState.locationOne
        const choose = borrow ? 1 : 2
        const user = doc(dbservice, `members/${profile?.uid}`)
        const getDocUser = await getDoc(user)
        const userCreatedCards = getDocUser.data()?.createdCards || []
        const userProfileUrl = getDocUser.data()?.profileImageUrl
        const card = await addDoc(collection(dbservice, 'num'), {
          point: calculatePoint,
          displayName: profile?.displayName,
          text: {
            choose: choose,
            count: location,
            counter: locationState.locationTwo,
            counting: locationState.locationThree,
            clock: fromTo.from,
            clocker: fromTo.to,
          },
          round: 1,
          creatorClock: Date.now(),
          creatorId: profile?.uid,
          creatorUrl: userProfileUrl,
          connectedId: null,
          connectedName: null,
          connectedUrl: null,
          item: item,
          creatorProfileImage: profile?.profileImage,
          creatorDefaultProfile: profile?.defaultProfile,
          creatorProfileImageUrl: profile?.profileImageUrl,
          connectedProfileImage: null,
          connectedDefaultProfile: null,
          connectedProfileImageUrl: null,
          createdClock: new Date().toString(),
          connectedClock: null,
          confirmedClock: null,
          returningClock: null,
          confirmedReturnClock: null,
        })
        await updateDoc(user, { createdCards: [...userCreatedCards, card.id] })
        // const cardObject = await getDoc(doc(dbservice, `num/${card.id}`))
        setDisplay({
          id: card.id,
        })
        setAddSteps(4)
      }
    } else {
      alert(needAnInput)
    }
  }
  const onChangeFrom = (event) => {
    setFromTo({
      ...fromTo,
      from: {
        gmt: event.$d,
        year: event.$y,
        month: event.$M + 1,
        day: event.$D,
        hour: event.$H,
        minute: event.$m,
      },
    })
    if (fromTo?.to && event.$d.getTime() <= fromTo.to?.gmt.getTime()) {
      setAddSteps(3)
    } else {
      setAddSteps(2)
    }
  }
  const onChangeTo = (event) => {
    setFromTo({
      ...fromTo,
      to: {
        gmt: event.$d,
        year: event.$y,
        month: event.$M + 1,
        day: event.$D,
        hour: event.$H,
        minute: event.$m,
      },
    })
    if (fromTo?.from && fromTo.from?.gmt.getTime() <= event.$d.getTime()) {
      setAddSteps(3)
    } else {
      setAddSteps(2)
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <PageTitle
        icon={borrow ? <Minimize2 /> : <Maximize2 />}
        title={`${
          borrow
            ? borrowing
            : lending
        } ${card} ${register}`}
      />
      <AddSteppers addSteps={addSteps} borrow={borrow} />
      <div className={`flex justify-center ${!matches && 'min-w-[400px]' }`}>
        <AddCards
          borrow={borrow}
          item={item}
          fromTo={fromTo}
          locationState={locationState}
          display={display}
        />
        {matches ?
          <div className="flex flex-col w-[624px]">
            <div className="flex">
              <AddStepOne borrow={borrow} item={item} changeItem={changeItem} />
              {addSteps > 0 && (
                <AddStepTwo
                  locationState={locationState}
                  changeBuilding={changeBuilding}
                  changeRoom={changeRoom}
                  changeSeat={changeSeat}
                  changeLocationInput={changeLocationInput}
                />
              )}
            </div>
            {addSteps > 1 && (
              <AddStepThree
                onChangeFrom={onChangeFrom}
                onChangeTo={onChangeTo}
              />
            )}
          </div>
        :
          <div className='flex flex-col'>
            <div className='flex flex-col'>
              <AddStepOne borrow={borrow} item={item} changeItem={changeItem} />
              {addSteps > 0 && (
                <AddStepTwo
                  locationState={locationState}
                  changeBuilding={changeBuilding}
                  changeRoom={changeRoom}
                  changeSeat={changeSeat}
                  changeLocationInput={changeLocationInput}
                />
              )}
            </div>
          </div>
        }
      </div>
      {!matches && addSteps > 1 && (
        <AddStepThree onChangeFrom={onChangeFrom} onChangeTo={onChangeTo} />
      )}
      {addSteps === 2 && fromTo.from && fromTo.to && (
        <div className="flex justify-center">{pleaseCheckTime}</div>
      )}
      {addSteps === 3 && (
        <AddRegisterButton
          submit={submit}
        />
      )}
      {addSteps > 3 && <AddStepFour />}
      {addSteps === 4 && <AddSnackBar />}
    </div>
  )
}

export default Add
