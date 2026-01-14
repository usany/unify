import { Watch } from 'lucide-react'
import useSelectors from 'src/hooks/useSelectors'

const CardViewTime = ({ message }) => {
  const languages = useSelectors((state) => state.languages.value)
  return (
    <div className="flex gap-1">
      <div className="flex items-center">
        <Watch />
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex">
          {languages === 'en' && <div className="flex justify-start w-[40px]">From</div>}
          {message.text.clock?.year}.{message.text.clock?.month}.
          {message.text.clock?.day} {message.text.clock?.hour}:
          {message.text.clock?.minute} {languages === 'ko' && ' 부터'}
        </div>
        <div className="flex">
          {languages === 'en' && <div className="flex justify-start w-[40px]">To</div>}
          {message.text.clocker?.year}.{message.text.clocker?.month}.
          {message.text.clock?.day} {message.text.clocker?.hour}:
          {message.text.clocker?.minute} {languages === 'ko' && ' 까지'}
        </div>
      </div>
    </div>
  )
}

export default CardViewTime
