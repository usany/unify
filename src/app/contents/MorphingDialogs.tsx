import getShadowColor from './getShadowColor';
import CardView from './CardView';
import Tilt from 'react-parallax-tilt'

interface Props {
  message: { id: string; text: object }
}
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
    <CardView />
  )
}

export default MorphingDialogs
