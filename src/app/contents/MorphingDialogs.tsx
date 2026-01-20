import CardView from './CardView';

const MorphingDialogs = () => {
  const mockMessage = {
    id: Date.now().toString(),
    action: 1,
    locationOne: '서울 중도',
    locationTwo: '자료열람실',
    startTime: Date.now(),
    finishTime: Date.now(),
  }
  return (
    <CardView message={mockMessage}/>
  )
}

export default MorphingDialogs
