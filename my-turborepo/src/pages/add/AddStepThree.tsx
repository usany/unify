import useSelectors from 'src/hooks/useSelectors'
import AddStepTitle from 'src/pages/add/AddStepTitle'
import Pickers from 'src/pages/add/Pickers'

interface Props {
  onChangeFrom: (event: {}) => void
  onChangeTo: (event: {}) => void
}

const AddStepThree = ({ onChangeFrom, onChangeTo }: Props) => {
  const languages = useSelectors((state) => state.languages.value)

  // const title = ['3. 시간 입력']
  const titles = {
    ko: '3. 시간 입력',
    en: '3. Input time'
  }
  const index = (languages === 'ko' || languages === 'en') ? languages : 'ko'
  return (
    <div>
      <AddStepTitle title={titles[index]} />
      <div className='flex flex-col px-5'>
        <Pickers onChange={onChangeFrom} label={`${languages === 'ko' ? '이 때부터' : 'From'}`} />
        <Pickers onChange={onChangeTo} label={`${languages === 'ko' ? '이 때까지' : 'To'}`} />
      </div>
    </div>
  )
}

export default AddStepThree
