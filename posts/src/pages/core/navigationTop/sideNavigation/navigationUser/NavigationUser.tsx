import { useEffect, useState } from 'react'
import { AnimatedNumber } from 'src/components/motion-primitives/animated-number'
import useSelectors from 'src/hooks/useSelectors'

const NavigationUser = () => {
  const languages = useSelectors((state) => state.languages.value)
  const profile = useSelectors((state) => state.profile.value)
  const points = profile?.points
  const [animatingPoints, setAnimatingPoints] = useState(0)
  useEffect(() => {
    setAnimatingPoints(points)
  }, [points])
  return (
    <div>
      <div className="max-w-[200px] max-h-[200px] overflow-hidden">
        {languages === 'ko' ? `좋은 날씨네요 ` : `Nice Weather `}
        {profile &&
          profile?.certificated &&
          `${
            profile.displayName.length > 10
              ? profile.displayName.slice(0, 9) + '......'
              : profile.displayName
          } ${languages === 'ko' ? '님' : ''}`}
      </div>
      {profile?.certificated ? (
        <div>
          {languages === 'ko' ? '내 포인트: ' : 'My Points: '}
          <AnimatedNumber value={animatingPoints} />
        </div>
      ) : (
        <div>
          {languages === 'ko' ? '로그인을 해 주세요' : 'Please Sign in'}
        </div>
      )}
    </div>
  )
}

export default NavigationUser
