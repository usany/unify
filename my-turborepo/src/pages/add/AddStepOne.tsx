import useSelectors from 'src/hooks/useSelectors'
import AddItemSelects from 'src/pages/add/AddItemSelects'
import AddStepTitle from 'src/pages/add/AddStepTitle'

interface Props {
  borrow: boolean
  item: string
  changeItem: () => void
}
const AddStepOne = ({ borrow, item, changeItem }: Props) => {
  const languages = useSelectors((state) => state.languages.value)
  const titles = {
    ko: `1. 무엇을 ${borrow ? '빌리세요?' : '빌려주세요?'}`,
    en: `1. What are you ${borrow ? 'borrowing?' : 'lending?'}`,
  }
  const index = (languages === 'ko' || languages === 'en') ? languages : 'ko'

  return (
    <div className='flex flex-col'>
      <AddStepTitle title={titles[index]} />
      <div className='flex px-5'>
        <AddItemSelects item={item} changeItem={changeItem} />
      </div>
    </div>
  )
}

export default AddStepOne
