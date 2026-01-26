import { AnimatedGroup } from '../../components/motion-primitives/animated-group'
import staticImg from '../../../public/applicationImage.jpg'
import Image from 'next/image'
function Collection() {
  const images = [staticImg, staticImg, staticImg]
  return (
    <>
      <br />
      {images.length > 0 && 
        <AnimatedGroup className="grid grid-cols-[repeat(auto-fit,minmax(80px,1fr))] col-span-full p-5">
          {images.map((element, index) => {
            return (
              <Image
                src={element}
                className="w-[80px] h-[80px]"
                alt='khusan'
              />
            )
          })}
        </AnimatedGroup>
      }
      <br />
    </>
  )
}

export default Collection
