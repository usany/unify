import useTexts from 'src/hooks/useTexts'

function ContactFormDrawersTitle() {
  const { searchUser } = useTexts()
  return <>{searchUser}</>
}

export default ContactFormDrawersTitle
