import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'
import useTexts from 'src/hooks/useTexts'
import ContactAddress from './ContactAddress'

function ContactForm() {
  
  return (
    <form id="auth">
      <ContactAddress action={'sending'} label={'익명 유저'} />
      <ContactAddress action={'receiving'} label={'담당자'} />
      <div className="pt-5 px-5">
        <TextField
          name="title"
          sx={{
            display: 'flex',
            justifyContent: 'center'
          }}
          label={'신고 제목'}
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
          label={'신고 내용'}
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
