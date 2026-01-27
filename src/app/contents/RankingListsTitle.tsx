import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface Props {
  multiple: boolean
}
function RankingListsTitle({ multiple }: Props) {
  return (
    <div className="flex truncate justify-center">
      <div className={`flex justify-around w-[1000px]`}>
        {true ? (
          <div className="flex items-center justify-center w-[100px]">
            {multiple ? 'User' : 'My'} {multiple ? 'Ranking' : 'Ranking'}
          </div>
        ) : (
          <div className="flex flex-col items-center w-[100px]">
            <div>{multiple ? 'User' : 'My'}</div>
            <div>{multiple ? 'Ranking' : 'Ranking'}</div>
          </div>
        )}
        <div className="flex items-center">
          <Avatar className={`bg-light-2 dark:bg-dark-2 border border-dashed`}>
            <AvatarImage src={''} />
            <AvatarFallback className="text-xl border-none">?</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col justify-center overflow-hidden px-3 w-32">
          <div>
            {multiple ? 'User' : 'My'} {multiple ? 'Name' : 'Name'}
          </div>
          <div>{multiple ? 'Points' : 'Points'}</div>
        </div>
        <div className="flex flex-col justify-center items-center w-[100px]">
          <div>Campus</div>
          <div>Verification</div>
        </div>
      </div>
    </div>
  )
}

export default RankingListsTitle
