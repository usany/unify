import { useMediaQuery } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'
import { useEffect, useReducer, useState } from 'react'
import AddCards from './AddCards'
import AddStepOne from './AddStepOne'
import AddSteppers from './AddSteppers'
import AddStepThree from './AddStepThree'
import AddStepTwo from './AddStepTwo'
import { Dayjs } from 'dayjs'

interface Props {
  borrow: boolean
}

interface Clock {
  gmt: Date
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
  const [item, setItem] = useState('')
  const [fromTo, setFromTo] = useState<FromTo>({ from: null, to: null })
  const matches = useMediaQuery('(min-width:850px)')
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

  const changeItem = (event: SelectChangeEvent<string>) => {
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
  const changeLocationInput = (event: { preventDefault: () => void, target: { value: string } }) => {
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
  const changeBuilding = (event: { preventDefault: () => void, target: { value: string } }) => {
    // event.preventDefault()
    const {
      target: { value },
    } = event
    locationDispatch({ type: 'changeBuilding', newState: value })
    setAddSteps(1)
  }
  const changeRoom = (event: { preventDefault: () => void, target: { value: string } }) => {
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
  const changeSeat = (event: { preventDefault: () => void, target: { value: string } }) => {
    //   event.preventDefault()
    const {
      target: { value },
    } = event
    locationDispatch({ type: 'changeSeat', newState: value })
    setAddSteps(2)
  }

  const onChangeFrom = (event: Dayjs) => {
    setFromTo({
      ...fromTo,
      from: {
        gmt: event.toDate(),
        year: event.year(),
        month: event.month() + 1,
        day: event.date(),
        hour: event.hour(),
        minute: event.minute(),
      },
    })
    if (fromTo?.to && event.toDate().getTime() <= fromTo.to?.gmt.getTime()) {
      setAddSteps(3)
    } else {
      setAddSteps(2)
    }
  }
  const onChangeTo = (event: Dayjs) => {
    setFromTo({
      ...fromTo,
      to: {
        gmt: event.toDate(),
        year: event.year(),
        month: event.month() + 1,
        day: event.date(),
        hour: event.hour(),
        minute: event.minute(),
      },
    })
    if (fromTo?.from && fromTo.from?.gmt.getTime() <= event.toDate().getTime()) {
      setAddSteps(3)
    } else {
      setAddSteps(2)
    }
  }

  return (
    <div className="flex flex-col">
      <br />
      <AddSteppers addSteps={addSteps} borrow={true} />
      <div className={`flex justify-center ${!matches && 'min-w-[400px]' }`}>
        <AddCards
          borrow={true}
          item={item}
          fromTo={fromTo}
          locationState={locationState}
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
      <br />
    </div>
  )
}

export default Add
