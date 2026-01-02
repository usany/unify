import Button from '@mui/material/Button'
import useSelectors from 'src/hooks/useSelectors'
import useTexts from 'src/hooks/useTexts'

interface Props {
  submit: (event: {}) => void
}

const AddRegisterButton = ({ submit }: Props) => {
  const { registerButton, pleaseSignIn } = useTexts()
  const onLine = useSelectors((state) => state.onLine.value)
  return (
    <form className="flex justify-center pt-5" id="selection" onSubmit={submit}>
      {onLine ?
        <Button className='colorTwo' variant="outlined" form="selection" type="submit">
          {registerButton}
        </Button>
        :
        <>{pleaseSignIn}</>
      }
    </form>
  )
}

export default AddRegisterButton
