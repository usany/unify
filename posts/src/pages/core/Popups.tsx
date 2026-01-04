import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { Scroll } from 'lucide-react'
import { useRef } from 'react'
import { ScrollProgress } from 'src/components/motion-primitives/scroll-progress'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from 'src/components/ui/dialog'
import useLargeMedia from 'src/hooks/useLargeMedia'
import DrawersBar from 'src/pages/core/DrawersBar'

interface Props {
  trigger: React.ReactNode
  title: React.ReactNode
  content: React.ReactNode
  close?: React.ReactNode
  attachment?: boolean
  onLink?: boolean
}
const Popups = ({
  trigger,
  title,
  content,
  close = null,
  attachment = false,
  onLink = false,
}: Props) => {
  const largeMedia = useLargeMedia()
  
  if (largeMedia) {
    return (
      <div className="flex justify-center">
        <Dialog>
          <DialogTrigger className="w-full">{trigger}</DialogTrigger>
          <DialogContent className="bg-light-2 dark:bg-dark-2 max-h-[75vh] min-w-[850px]">
            <ScrollArea className="overflow-y-scroll absolute">
              <DrawersBar />
              <DialogTitle className="flex justify-center p-5">
                {title}
              </DialogTitle>
              {content}
              {attachment && (
                <div className="flex justify-center p-5">
                  {onLink ? (
                    <div>{close}</div>
                  ) : (
                    <DialogClose>{close}</DialogClose>
                  )}
                </div>
              )}
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
  return (
    <div className="flex justify-center">
      <Drawer>
        <DrawerTrigger className="w-full">{trigger}</DrawerTrigger>
        <DrawerContent className="bg-light-2 dark:bg-dark-2 max-h-[75vh]">
          <ScrollArea className="overflow-y-scroll absolute">
            <DrawersBar />
            <DrawerTitle className="flex justify-center p-5">
              {title}
            </DrawerTitle>
            {content}
            {attachment && (
              <div className="flex justify-center p-5">
                {onLink ? (
                  <div>{close}</div>
                ) : (
                  <DrawerClose>{close}</DrawerClose>
                )}
              </div>
            )}
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default Popups
