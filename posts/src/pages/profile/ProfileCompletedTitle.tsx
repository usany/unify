import { useSelector } from 'react-redux';

const ProfileCompletedTitle = ({
  user,
  card
}) => {
  const completedAction = useSelector(state => state.completedAction.value)
  return (
    <div className='flex justify-center pt-5'>
      완료된 {`${completedAction === 'borrow' ? '빌리기' : '빌려주기'}`}
    </div>
  );
}

export default ProfileCompletedTitle
