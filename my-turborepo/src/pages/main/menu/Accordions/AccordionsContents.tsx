import { ReactNode } from 'react'
import { AccordionContent } from 'src/components/ui/accordion'

interface Props {
  content: ReactNode
  index: number
}
function AccordionsContents({ content, index }: Props) {
  return (
    <div className={`flex justify-center ${index && 'px-1'}`}>
      <div className="w-[1000px]">
        <AccordionContent className="text-sm w-full">
          {content}
        </AccordionContent>
      </div>
      {/* {!index ? (
        <div className="w-[1000px]">
          <AccordionContent className="text-sm w-full max-w-[1000px]">
            {content}
          </AccordionContent>
        </div>
      ) : (
        <AccordionContent className="text-sm w-full max-w-[1000px]">
          {content}
        </AccordionContent>
      )} */}
    </div>
  )
}

export default AccordionsContents
