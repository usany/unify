import { Link } from 'react-router-dom'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';

const Dialogs = ({move, handleClose}) => {
    return (
        <Dialog open={move} onClose={handleClose}>
            <DialogContent>
                로그인이 필요합니다
            </DialogContent>
            <DialogActions>
            <Button variant='outlined' onClick={() => {
                handleClose()
                // setValue(1)
            }}>
                <Link to='/'>로그인 페이지</Link>
            </Button>
            <Button variant='outlined' onClick={handleClose} autoFocus>
                닫기
            </Button>
            </DialogActions>
        </Dialog>
    )
}

export default Dialogs
