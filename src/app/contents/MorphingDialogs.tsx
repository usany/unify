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

interface Props {
  message: { id: string; text: object }
}
const MorphingDialogs = ({
  message,
}: Props) => {
  const [onTransfer, setOnTransfer] = useState(false)
  const pathname = usePathname()
  return (
    <MorphingDialog
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
      }}
    >
      <MorphingDialogTrigger>
        <Link
          key={message.id}
          href={`${pathname}?card=sample`}
        >
          <CardsViews
            message={message}
            onTransfer={onTransfer}
          />
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
