import { Ban, BanIcon, Delete, Film, PlusCircle, ThumbsDown, ThumbsUp } from 'lucide-react'
import { AnimatedGroup } from 'src/components/motion-primitives/animated-group'
import { useLanguage } from '@/context/LanguageContext'

function Collection() {
  const { language } = useLanguage()
  return (
    <div>
      <button
        className="flex gap-5 justify-center"
      >
        <PlusCircle />
        {language === 'en' ? 'Register' : '등록'}
      </button>
      {images.length > 0 && 
        <AnimatedGroup className="grid grid-cols-[repeat(auto-fit,minmax(80px,1fr))] col-span-full p-5">
          {images.map((element, index) => {
            return (
              <img
                src={element.defaultProfile}
                className="w-[80px] h-[80px]"
              />
            )
          })}
        </AnimatedGroup>
      }
    </div>
  )
}

export default Collection
