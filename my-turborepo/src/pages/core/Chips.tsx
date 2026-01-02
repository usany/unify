import { Chip, useTheme } from '@mui/material'

export interface Props {
  mode: string
  label: string
  // mode: PaletteMode
  /** Optional click handler */
  // onClick?: () => void
}

/** Primary UI component for user interaction */
export const Chips = ({ mode, label, ...props }: Props) => {
  const theme = useTheme()
  const bgcolor = theme.palette.mode === 'light' ? '#f7fafb' : '#5c6778'
  if (mode === 'piazzaNumber') {
    return (
      <Chip color="primary" sx={{ height: '20px' }} label={label} {...props} />
    )
  }
  if (mode === 'location') {
    return <Chip color="success" label={label} {...props} />
  }
  if (mode === 'noProcessing') {
    return (
      <Chip
        sx={{ bgcolor: '#7fc4bc', color: 'white' }}
        label={label}
        {...props}
      />
    )
  }
  if (mode === 'processing') {
    return (
      <Chip
        sx={{
          bgcolor: '#e76e50',
          color: 'white',
        }}
        label={label}
        {...props}
      />
    )
  }
  if (mode === 'specific') {
    return (
      <Chip
        size="small"
        sx={{
          bgcolor: bgcolor,
          ':hover': {
            bgcolor: bgcolor,
          },
          fontSize: '12px',
        }}
        label={label}
        {...props}
      />
    )
  }
  return (
    <>
      <Chip
        sx={{
          bgcolor: bgcolor,
          ':hover': {
            bgcolor: bgcolor,
          },
        }}
        label={label}
        {...props}
      />
    </>
  )
}
