import useSelectors from 'src/hooks/useSelectors'
import AddStepTitle from 'src/pages/add/AddStepTitle'
import Selects from 'src/pages/add/Selects'

interface LocationEvent extends EventTarget {
  target: { value: string }
}

interface Props {
  locationState: { locationOne: string | null, locationTwo: string | null, locationThree: string | null, locationInput: string | null }
  changeBuilding: (event: LocationEvent) => void
  changeRoom: (event: LocationEvent) => void
  changeSeat: (event: LocationEvent) => void
  changeLocationInput: (event: LocationEvent) => void
}

const AddStepTwo = ({ locationState, changeBuilding, changeRoom, changeSeat, changeLocationInput }: Props) => {
  const languages = useSelectors((state) => state.languages.value)
  const titles = {
    ko: '2. 장소 입력',
    en: '2. Input Location'
  }
  const index = (languages === 'ko' || languages === 'en') ? languages : 'ko'
  return (
    <div className='flex flex-col'>
      <AddStepTitle title={titles[index]} />
      <Selects
        locationState={locationState}
        changeBuilding={changeBuilding} changeRoom={changeRoom} changeSeat={changeSeat}
        changeLocationInput={changeLocationInput}
      />
    </div>
  )
}

export default AddStepTwo
