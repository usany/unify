import Lottie from 'react-lottie';
// import Lottie from 'lottie-react'
import rain from 'src/assets/Animation.json';
import { TextScramble } from 'src/components/motion-primitives/text-scramble';
// import { TextRoll } from 'src/components/motion-primitives/text-roll';
function LottieLoading() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: rain,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <div className='fixed z-50 inset-0 h-full w-full bg-black/50'>
      <div className='flex items-center h-full'>
        <Lottie options={defaultOptions} height={200} width={200} />
      </div>
    </div>
  )
}
export default LottieLoading
