import { Button, useTheme } from '@mui/material'

export interface ButtonProps {
  label: string
  onClick?: () => void
  color: string
  sx: {}
}

export const Buttons = ({ label, onClick, color, sx, ...props }: ButtonProps) => {
  const theme = useTheme()
  const bgcolor = color === 'one' ? theme.palette.mode === 'light' ? '#f7fafb' : '#5c6778' : theme.palette.mode === 'light' ? '#e2e8f0' : '#2d3848'
  return (
    <Button
      variant="outlined"
      sx={{
        bgcolor: bgcolor,
        ':hover': {
          bgcolor: bgcolor,
        },
      }}
      {...props}
      onClick={onClick}
    >
      {label}
    </Button>
  )
}
