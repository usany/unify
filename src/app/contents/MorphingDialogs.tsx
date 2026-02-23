import CardView from './CardView';

const MorphingDialogs = () => {
  const now = Date.now();
  const mockMessage = {
    id: now.toString().slice(-7),
    item: '우산',
    action: 1,
    locationOne: '서울 중도',
    locationTwo: '자료열람실',
    startTime: Date.now(),
    finishTime: Date.now(),
  }
  console.log(mockMessage.id)
  return (
    <CardView message={mockMessage}/>
  )
}

export default MorphingDialogs
