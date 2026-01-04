import useTexts from 'src/hooks/useTexts'
import AddStepTitle from 'src/pages/add/AddStepTitle'

const AddStepFour = () => {
  const {registrationComplete, registrationCompleteExplanation} = useTexts()
  const title = [`4. ${registrationComplete}`, `(${registrationCompleteExplanation})`]

  return (
      <div className='pb-52'>
        <div className='flex flex-col text-base px-5 pt-5'>
          {title.map((value) => {
            return (
              <div>{value}</div>
            )
          })}
        </div>
      </div>
  )
}

export default AddStepFour
