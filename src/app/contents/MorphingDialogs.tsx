import {
  MorphingDialog,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogTrigger,
} from '../../components/ui/morphing-dialog'
import { useEffect, useState } from 'react'
import CardsViews from './CardsViews'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import getShadowColor from './getShadowColor';
import CardView from './CardView';
import Tilt from 'react-parallax-tilt'

interface Props {
  message: { id: string; text: object }
}
const MorphingDialogs = () => {
  const pathname = usePathname()
  const mockMessage = {
    id: Date.now().toString(),
    action: 1,
    locationOne: '서울 중도',
    locationTwo: '자료열람실',
    startTime: Date.now(),
    finishTime: Date.now(),
  }
  const shadowColor = getShadowColor(mockMessage.id)
  return (
    <MorphingDialog
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
      }}
    >
      <MorphingDialogTrigger>
        <Link
          key={mockMessage.id}
          href={`${pathname}?card=sample`}
        >
          {/* <CardsViews
            message={mockMessage}
          /> */}
          <Tilt>
            <CardView
                // onTransfer={onTransfer}
                message={mockMessage}
                shadowColor={shadowColor}
              />
          </Tilt>
        </Link>
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        {/* <MorphingDialogContent
          drawerOpen={drawerOpen}
          drawerOpenFalse={drawerOpenFalse}
        >
          <Specifics />
        </MorphingDialogContent> */}
      </MorphingDialogContainer>
    </MorphingDialog>
  )
}

export default MorphingDialogs
