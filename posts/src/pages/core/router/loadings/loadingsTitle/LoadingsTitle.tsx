import { Skeleton } from "@/components/ui/skeleton";

function LoadingsTitle() {

  return (
    <div className='flex flex-col pt-5 px-3'>
      <Skeleton className={`flex h-[32px] w-1/5 rounded bg-light-2 dark:bg-dark-2`} />
    </div>
  )
}

export default LoadingsTitle
