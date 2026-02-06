import { Watch } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext';

const CardViewTime = ({ message }) => {
  const { language } = useLanguage();
  return (
    <div className="flex gap-1">
      <div className="flex items-center">
        <Watch />
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex">
          {language === 'en' && <div className="flex justify-start w-[40px]">From</div>}
          {/* {message.text.clock?.year}.{message.text.clock?.month}.
          {message.text.clock?.day} {message.text.clock?.hour}:
          {message.text.clock?.minute} {language === 'ko' && ' 부터'} */}
        </div>
        <div className="flex">
          {language === 'en' && <div className="flex justify-start w-[40px]">To</div>}
          {/* {message.text.clocker?.year}.{message.text.clocker?.month}.
          {message.text.clock?.day} {message.text.clocker?.hour}:
          {message.text.clocker?.minute} {language === 'ko' && ' 까지'} */}
        </div>
      </div>
    </div>
  )
}

export default CardViewTime
