const emptyMessages = {
  ko: '진행  메세지가 없습니다',
  en: 'No messages',
}
const EmptyChattingStacks = ({ index }) => {
  return (
    <div className="flex items-center flex-col">
      <div className="flex justify-center rounded w-1/2 p-5 bg-light-2 dark:bg-dark-2 shadow-md">
        {emptyMessages[index]}
      </div>
    </div>
  )
}

export default EmptyChattingStacks
