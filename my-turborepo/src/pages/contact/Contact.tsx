import { Siren } from 'lucide-react'
import useTexts from 'src/hooks/useTexts'
import PageTitle from 'src/pages/core/pageTitle/PageTitle'
import ContactForm from './components/ContactForm'

function Contact() {
  const {report} = useTexts()
  return (
    <>
      <PageTitle icon={<Siren />} title={report} />
      <ContactForm />
    </>
  )
}

export default Contact
