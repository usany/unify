import { useLanguage } from '@/context/LanguageContext'
import AddItemSelects from 'src/pages/add/AddItemSelects'
import AddStepTitle from 'src/pages/add/AddStepTitle'

interface Props {
  borrow: boolean
  item: string
  changeItem: () => void
}
const AddStepOne = ({ borrow, item, changeItem }: Props) => {
  const { language } = useLanguage()
  const titles = {
    ko: `1. 무엇을 ${borrow ? '빌리세요?' : '빌려주세요?'}`,
    en: `1. What are you ${borrow ? 'borrowing?' : 'lending?'}`,
  }

  return (
    <div className='flex flex-col'>
      <AddStepTitle title={titles[language]} />
      <div className='flex px-5'>
        <AddItemSelects item={item} changeItem={changeItem} />
      </div>
    </div>
  )
}

export default AddStepOne
