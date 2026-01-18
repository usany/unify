import { Ban, BanIcon, Delete, Film, PlusCircle, ThumbsDown, ThumbsUp } from 'lucide-react'
import { AnimatedGroup } from '../../components/motion-primitives/animated-group'
import { useLanguage } from '@/context/LanguageContext'
import staticImg from '../../../public/applicationImage.jpg'
import { Button } from '@mui/material'
import Image from 'next/image'
function Collection() {
  const { language } = useLanguage()
  const images = [staticImg]
  return (
    <div>
      <Button
        variant='outlined'
        className="flex gap-5 justify-center"
      >
        <PlusCircle />
        {language === 'en' ? 'Register' : '등록'}
      </Button>
      {images.length > 0 && 
        <AnimatedGroup className="grid grid-cols-[repeat(auto-fit,minmax(80px,1fr))] col-span-full p-5">
          {/* {images.map((element, index) => {
            return (
            )
          })} */}
          <Image
            src={staticImg}
            className="w-[80px] h-[80px]"
            alt='khusan'
          />
        </AnimatedGroup>
      }
    </div>
  )
}

export default Collection
