import { AnimatedGroup } from '../../components/motion-primitives/animated-group'
import staticImg from '../../../public/applicationImage.jpg'
import Image from 'next/image'
function Collection() {
  const images = [staticImg]
  return (
    <div>
      {images.length > 0 && 
        <AnimatedGroup className="grid grid-cols-[repeat(auto-fit,minmax(80px,1fr))] col-span-full p-5">
          {images.map((element, index) => {
            return (
              <Image
                src={staticImg}
                className="w-[80px] h-[80px]"
                alt='khusan'
              />
            )
          })}
        </AnimatedGroup>
      }
    </div>
  )
}

export default Collection
