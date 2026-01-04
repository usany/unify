import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Link } from 'react-router-dom';

const ChattingDialogs = ({ selectUser, user, handleClose }:
  {
    selectUser: boolean,
    user: { displayName: string } | null,
    handleClose: () => void,
  }
) => {

  return (
    <Dialog open={selectUser} onClose={handleClose}>
      <DialogContent>
        <div>
          {user?.displayName}
        </div>
      </DialogContent>
      <DialogActions>
        <Link to={`/profile${user ? `/?id:${user?.uid}` : ''}`}
          state={{ element: user }}
        >
          <Button variant='outlined' onClick={() => {
            handleClose()
          }}>
            프로필 확인
          </Button>
        </Link>
        <Button variant='outlined' onClick={() => {
          handleClose()
        }}>
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ChattingDialogs
