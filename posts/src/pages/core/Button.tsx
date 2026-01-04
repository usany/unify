import { Button, useTheme } from '@mui/material'

export interface ButtonProps {
  label: string
  // mode: PaletteMode
  // bgcolor: string
  /** Optional click handler */
  onClick?: () => void
}

/** Primary UI component for user interaction */
export const Buttons = ({ label, ...props }: ButtonProps) => {
  const theme = useTheme()
  const bgcolor = theme.palette.mode === 'light' ? '#e2e8f0' : '#2d3848'
  return (
    <>
      <Button
        variant="outlined"
        sx={{
          bgcolor: bgcolor,
          ':hover': {
            bgcolor: bgcolor,
          },
        }}
        {...props}
      >
        {label}
      </Button>
    </>
  )
}
