import { Skeleton } from "@/components/ui/skeleton";

function LoadingsProfile() {

  return (
    <div className="flex flex-col space-y-3 pt-5">
      <div className='flex justify-center'>
        <Skeleton className={`flex h-[192px] w-[192px] rounded bg-light-2 dark:bg-dark-2`} />
      </div>
      <div className='flex justify-center pt-10'>
        <Skeleton className={`flex h-[50px] w-[250px] rounded bg-light-2 dark:bg-dark-2`} />
      </div>
      <div className='flex justify-center pt-10'>
        <Skeleton className={`flex h-[88px] w-[250px] rounded bg-light-2 dark:bg-dark-2`} />
      </div>
      <div className='flex justify-center pt-10'>
        <Skeleton className={`flex h-[65px] w-[250px] rounded bg-light-2 dark:bg-dark-2`} />
      </div>
    </div>
  )
}

export default LoadingsProfile
