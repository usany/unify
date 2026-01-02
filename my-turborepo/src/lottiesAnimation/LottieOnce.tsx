import Lottie from 'react-lottie'
// import Lottie from 'lottie-react'
import blue from './blue.json'
import red from './red.json'

function LottieOnce({color}) {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: color === 'blue' ? blue : red,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  return (
    <div className="flex flex-col justify-center">
      <Lottie options={defaultOptions} height={30} width={30} />
    </div>
  )
}
export default LottieOnce
