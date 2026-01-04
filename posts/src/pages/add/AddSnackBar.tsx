import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';
import useTexts from 'src/hooks/useTexts';

const AddSnackBar = () => {
  const [isOpen, setIsOpen] = useState(true)
  const {registrationComplete} = useTexts()
  const vertical = 'top'
  const horizontal = 'center'

  return (
    <Snackbar
      open={isOpen}
      sx={{ paddingBottom: '10%' }}
      message={registrationComplete}
      anchorOrigin={{ vertical, horizontal }}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={() => setIsOpen(false)}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    />
  )
}

export default AddSnackBar
