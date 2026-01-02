import DeleteIcon from '@mui/icons-material/Delete'
import Button from '@mui/material/Button'
import useSelectors from 'src/hooks/useSelectors'
import useTexts from 'src/hooks/useTexts'
import { useState } from 'react'
import deleteMessage from 'src/pages/core/card/deleteMessage'
import onDelete from './onDelete'

const DeleteButton = ({ message, decreaseRound }) => {
  const {remove} = useTexts()

  return (
    <div className="flex justify-center">
      <Button
        className='colorOne'
        variant="outlined"
        onClick={() => {
          onDelete(message?.id)
          deleteMessage(message?.id)
          decreaseRound()
        }}
        startIcon={<DeleteIcon />}
      >
        {remove}
      </Button>
    </div>
  )
}

export default DeleteButton
