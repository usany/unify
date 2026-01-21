import AddStepTitle from './AddStepTitle'
import Selects from './Selects'
import { useLanguage } from '@/context/LanguageContext'

interface Props {
  locationState: { locationOne: string | null, locationTwo: string | null, locationThree: string | null, locationInput: string | null }
  changeBuilding: (event: { preventDefault: () => void, target: { value: string } }) => void
  changeRoom: (event: { preventDefault: () => void, target: { value: string } }) => void
  changeSeat: (event: { preventDefault: () => void, target: { value: string } }) => void
  changeLocationInput: (event: { preventDefault: () => void, target: { value: string } }) => void
}

const AddStepTwo = ({ locationState, changeBuilding, changeRoom, changeSeat, changeLocationInput }: Props) => {
  const { language } = useLanguage()
  const titles = {
    ko: '2. 장소 입력',
    en: '2. Input Location'
  }
  return (
    <div className='flex flex-col'>
      <AddStepTitle title={titles[language]} />
      <Selects
        locationState={locationState}
        changeBuilding={changeBuilding} changeRoom={changeRoom} changeSeat={changeSeat}
        changeLocationInput={changeLocationInput}
      />
    </div>
  )
}

export default AddStepTwo
