import TextField from '@mui/material/TextField'
import ContactAddress from './ContactAddress'
import { useLanguage } from '@/context/LanguageContext'

function ContactForm() {
  const { language } = useLanguage()
  return (
    <form id="auth">
      <ContactAddress action={language === 'en' ? 'Sending' : '발신'} label={language === 'en' ? 'Anonymous User' : '익명 유저'} />
      <ContactAddress action={language === 'en' ? 'Receiving' : '수신'} label={language === 'en' ? 'Manager' : '담당자'} />
      <div className="pt-5 px-5">
        <TextField
          name="title"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            color: 'black'
          }}
          label={language === 'en' ? 'Report Title' : '신고 제목'}
          multiline
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
          label={language === 'en' ? 'Report Content' : '신고 내용'}
          multiline
          rows={5}
          variant="outlined"
          fullWidth
        />
      </div>
    </form>
  )
}

export default ContactForm
