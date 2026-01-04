import Lottie from 'react-lottie'
// import Lottie from 'lottie-react'
import process from './process.json'

function LottieProcess() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: process,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  return (
    <div className="flex flex-col justify-center">
      <Lottie options={defaultOptions} height={50} width={50} />
    </div>
  )
}
export default LottieProcess
