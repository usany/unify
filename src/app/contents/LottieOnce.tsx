import Lottie from 'react-lottie'
// import Lottie from 'lottie-react'
import blue from './blue.json'

function LottieOnce() {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: blue,
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
