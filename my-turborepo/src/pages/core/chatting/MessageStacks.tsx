import ChattingStacks from './ChattingStacks'
import { useSortedChattings } from './useSortedChattings'

const MessageStacks = () => {
  const { chattings, changeChattings, sorted } = useSortedChattings()
  const chattingsArray = navigator.onLine ? chattings : JSON.parse(localStorage.getItem('chattings') || '[]')
  return (
    <div className="flex flex-col gap-1 w-full">
      <ChattingStacks
        chattings={chattingsArray}
        changeChattings={changeChattings}
        sorted={sorted}
      />
    </div>
  )
}

export default MessageStacks
