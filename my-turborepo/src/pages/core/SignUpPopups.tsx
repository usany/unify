import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { LinearProgress } from '@mui/material'
import { Scroll } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
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
  onProgress?: boolean
}
const SignUpPopups = ({
  trigger,
  title,
  content,
  close = null,
  attachment = false,
  onLink = false,
  onProgress
}: Props) => {
  const [progress, setProgress] = useState(0)
  const largeMedia = useLargeMedia()
  const docRef = useRef<HTMLDivElement | null>(null)
  const handleScroll = () => {
    const current = docRef.current
    if (!current) return
    const scrollTop = current.scrollTop
    const scrollHeight = current.scrollHeight
    const clientHeight = current.clientHeight
    const scrollPercentage = scrollTop/(scrollHeight-clientHeight)*100
    setProgress(scrollPercentage > 99 ? 100 : scrollPercentage)
  }
  useEffect(() => {
    const current = docRef.current
    if (!current) return
    current.addEventListener('scroll', handleScroll)
    return () => {
      current.removeEventListener('scroll', handleScroll)
    }
  }, [docRef.current])
  console.log(onProgress)
  if (largeMedia) {
    return (
      <div className="flex justify-center">
        <Dialog>
          <DialogTrigger className="w-full">{trigger}</DialogTrigger>
          <DialogContent className="bg-light-2 dark:bg-dark-2 max-h-[75vh] min-w-[850px]">
            {onProgress && <div>
              <LinearProgress sx={{positon: 'fixed', left: 0, width: '100%', height:'10px', borderRadius: '10px'}} variant='determinate' value={progress} />
            </div>}
            <ScrollArea className="overflow-y-scroll absolute" ref={docRef}>
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
          {onProgress && <div>
            <LinearProgress sx={{positon: 'fixed', left: 0, width: '100%', height:'10px', borderRadius: '10px'}} variant='determinate' value={progress} />
          </div>}
          <ScrollArea className="overflow-y-scroll absolute" ref={docRef}>
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

export default SignUpPopups
