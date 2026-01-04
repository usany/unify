import { Chip } from '@mui/material';

interface Props {
  action: string,
  label: string | null
}

function ContactAddress({ action, label }: Props) {
  return (
    <div className='flex gap-5 pt-1 px-5'>
      <div className='flex items-center'>
        {action}:
      </div>
      <Chip label={label} />
    </div>
  )
}

export default ContactAddress
