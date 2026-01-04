import { Skeleton } from "@/components/ui/skeleton";

function LoadingsMain() {

  return (
    <div className="flex flex-col pt-5 space-y-3 px-3">
      <div className='flex'>
        <Skeleton className={`flex h-[50px] w-full rounded bg-light-2 dark:bg-dark-2`} />
      </div>
      <div className='flex'>
        <Skeleton className={`flex h-[50px] w-full rounded bg-light-2 dark:bg-dark-2`} />
      </div>
    </div>
  )
}

export default LoadingsMain
