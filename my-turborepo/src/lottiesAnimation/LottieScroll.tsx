import Lottie from 'react-lottie'
// import Lottie from 'lottie-react'
import scroll from './scroll.json'

function LottieScroll() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: scroll,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  return (
    <div className="flex flex-col justify-center pt-[50px] pb-[250px]">
      <Lottie options={defaultOptions} height={50} width={50} />
    </div>
  )
}
export default LottieScroll
