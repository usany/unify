import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { addDoc, collection, doc, DocumentData, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { dbservice } from 'src/baseApi/serverbase'
import useSelectors from 'src/hooks/useSelectors'
import useTexts from 'src/hooks/useTexts'
import ContactAddress from './ContactAddress'
import ContactFormDrawers from './ContactFormDrawers'
import ContactDrawers from './ContactDrawers'
import { useSearchParams } from 'react-router-dom'

function ContactForm() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [message, setMessage] = useState({title: '', content: ''})
  const [violationUser, setViolationUser] = useState<DocumentData | null>(null)
  const profile = useSelectors((state) => state.profile.value)
  const {sending, receiving, supervisor, send, reportTitle, reportContent, anonymousUser} = useTexts()
  useEffect(() => {
    const getUser = async () => {
      const ref = doc(dbservice, `members/${searchParams.get('id')}`)
      const getDocUser = await getDoc(ref)
      const userData = getDocUser.data()
      if (userData) {
        setViolationUser(userData)
      }
    }
    getUser()
  }, [searchParams.get('id')])
  const changeViolationUser = (newValue: DocumentData | null) => {
    setViolationUser(newValue)
  }
  const onSubmit = async () => {
    try {
      if (message.title && message.content) {
        await addDoc(collection(dbservice, 'violations'), {
          userUid: profile?.uid || '비로그인',
          userName: profile?.displayName || '비로그인',
          messageTitle: message.title,
          message: message.content,
          violationUser: profile?.certificated ? violationUser : null,
        })
        alert('등록되었습니다')
        setMessage({
          title: '', content: ''
        })
        setViolationUser(null)
      } else {
        alert('내용을 작성해주세요')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onChangeMessage = (event: { target: { value: string, name: string } }) => {
    const {
      target: { value, name },
    } = event
    setMessage({
      ...message, [name]: value
    })
  }

  return (
    <form id="auth">
      <ContactAddress action={sending} label={profile ? profile?.displayName: anonymousUser} />
      <ContactAddress action={receiving} label={supervisor} />
      <div className="pt-5 px-5">
        <TextField
          name="title"
          sx={{
            display: 'flex',
            justifyContent: 'center'
          }}
          label={reportTitle}
          multiline
          value={message.title}
          onChange={onChangeMessage}
          variant="outlined"
          fullWidth
        />
      </div>
      <div className="pt-5 px-5">
        <TextField
          name="content"
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
          label={reportContent}
          multiline
          rows={5}
          value={message.content}
          onChange={onChangeMessage}
          variant="outlined"
          fullWidth
        />
      </div>
      <ContactFormDrawers
        violationUser={violationUser}
        changeViolationUser={changeViolationUser}
      />
      <div className="flex justify-center pt-2.5">
        <ContactDrawers />
        <Button className='colorTwo' variant="outlined" form="auth" onClick={onSubmit}>
          {send}
        </Button>
      </div>
    </form>
  )
}

export default ContactForm
