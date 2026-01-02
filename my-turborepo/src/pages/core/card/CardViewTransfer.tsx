import East from '@mui/icons-material/East'
import West from '@mui/icons-material/West'
import { useLocation } from 'react-router-dom'
import useTexts from 'src/hooks/useTexts'

const CardViewTransfer = () => {
  const locations = useLocation()
  const {haveBeenMovedToMyStatus, haveBeenMovedToMyBoard} = useTexts()
  return (
    <div className="flex justify-center items-center z-30 rounded bg-black/50 text-white w-full h-full absolute">
      <div className="flex flex-col justify-center items-center gap-1 h-full p-5">
        {locations.pathname === '/' ? <East /> : <West />}
        <div className='flex justify-center'>
          {locations.pathname === '/' ? haveBeenMovedToMyBoard : haveBeenMovedToMyStatus}
        </div>
      </div>
    </div>
  )
}

export default CardViewTransfer
