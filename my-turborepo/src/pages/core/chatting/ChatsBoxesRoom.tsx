import useSelectors from 'src/hooks/useSelectors'
const ChatsBoxesRoom = ({ displayName, multiple }) => {
  const languages = useSelectors((state) => state.languages.value)
  let displayingUserName
  if (displayName.length > 6) {
    displayingUserName = displayName.slice(0, 6) + '......'
  } else {
    displayingUserName = displayName
  }
  return (
    <div className="truncate w-1/2 px-3 overflow-hidden">
      {multiple
        ? `${languages === 'ko' ? '단체 대화' : 'Group Messaging'}`
        : displayingUserName}
    </div>
  )
}

export default ChatsBoxesRoom
