import { useLanguage } from '@/context/LanguageContext'
import AddStepTitle from 'src/pages/add/AddStepTitle'
import Pickers from 'src/pages/add/Pickers'

interface Props {
  onChangeFrom: (event: {}) => void
  onChangeTo: (event: {}) => void
}

const AddStepThree = ({ onChangeFrom, onChangeTo }: Props) => {
  const { language } = useLanguage()
  const titles = {
    ko: '3. 시간 입력',
    en: '3. Input time'
  }
  return (
    <div>
      <AddStepTitle title={titles[language]} />
      <div className='flex flex-col px-5'>
        <Pickers onChange={onChangeFrom} label={`${language === 'ko' ? '이 때부터' : 'From'}`} />
        <Pickers onChange={onChangeTo} label={`${language === 'ko' ? '이 때까지' : 'To'}`} />
      </div>
    </div>
  )
}

export default AddStepThree
