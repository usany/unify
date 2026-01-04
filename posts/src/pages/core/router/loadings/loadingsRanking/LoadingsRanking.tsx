import { Skeleton } from "@/components/ui/skeleton";

function LoadingsRanking() {

  return (
    <div className="flex flex-col space-y-3 pt-3">
      <div className='flex px-3'>
        <Skeleton className={`flex h-[56px] w-full rounded bg-light-2 dark:bg-dark-2`} />
      </div>
      <div className='flex px-3 pt-3'>
        <Skeleton className={`flex h-[250px] w-full rounded bg-light-2 dark:bg-dark-2`} />
      </div>
    </div>
  )
}

export default LoadingsRanking
