import { useLanguage } from '@/context/LanguageContext'
import AddStepTitle from './AddStepTitle'
import Pickers from './Pickers'
import { Dayjs } from 'dayjs'

interface Props {
  onChangeFrom: (event: Dayjs) => void
  onChangeTo: (event: Dayjs) => void
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
