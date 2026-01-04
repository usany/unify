import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PageTitle from 'src/pages/core/pageTitle/PageTitle';
import { changeBottomNavigation } from 'src/stateSlices/bottomNavigationSlice';
import Avatars from '../core/Avatars';
import AddSteppers from './AddSteppers';
import useTexts from 'src/hooks/useTexts'
interface Props {
  borrow: boolean;
}

const Layout = ({ borrow }: Props) => {
  const dispatch = useDispatch()
  const {borrowing, lending, register, emptyCard, itemsTitle, itemOne, itemTwo, pleaseSignIn} = useTexts()
  return (
    <div className='flex flex-col h-screen'>
      <PageTitle title={`${borrow ? borrowing : lending} ${register}`} />
      <div className="blur-md flex flex-col justify-around px-5">
        <AddSteppers addSteps={0} borrow={borrow} />
        <div className='flex justify-around'>
          <Card
            sx={{
              width: 200,
              height: 280,
            }}
          >
            <CardContent sx={{ padding: '5px' }}>
              <div className="flex justify-between gap-1">
                <Avatars
                  profile={false}
                />
              </div>
              <div className="flex justify-center pt-5">{emptyCard}</div>
            </CardContent>
          </Card>
          <div className="flex flex-col">
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel>{itemsTitle}</InputLabel>
              <Select
                disabled
              >
                <MenuItem value={'우산'}>{itemOne}</MenuItem>
                <MenuItem value={'양산'}>{itemTwo}</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      <Link to='/'>
        <div className='flex fixed justify-center top-[30%] left-[10%] right-[10%]' onClick={() => dispatch(changeBottomNavigation(1))}>
          <div className='flex rounded bg-light-1 dark:bg-dark-1 w-1/2 p-5 justify-center shadow-md'>{pleaseSignIn}</div>
        </div>
      </Link>
    </div>
  )
}

export default Layout
