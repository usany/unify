import useSelectors from 'src/hooks/useSelectors'

const ChatsBoxesClock = ({ message }) => {
  const languages = useSelectors((state) => state.languages.value)
  const clock = new Date(message?.messageClock)
  let messageAmpm
  let messageHours = clock.getHours()
  let messageMonth = (clock.getMonth() + 1).toString()
  let messageDate = clock.getDate().toString()
  if (messageHours >= 13) {
    messageAmpm = '오후'
    if (messageHours !== 12) {
      messageHours = messageHours - 12
    }
  } else {
    messageAmpm = '오전'
    if (messageHours === 0) {
      messageHours = messageHours + 12
    }
  }
  if (clock.getMonth() + 1 < 10) {
    messageMonth = '0' + messageMonth
  }
  if (messageDate.length === 1) {
    messageDate = '0' + messageDate
  }
  const clockValue = clock.getFullYear().toString() +
    '-' +
    messageMonth +
    '-' +
    messageDate +
    ' ' +
    (languages === 'ko' ? messageAmpm : '') +
    ' ' +
    messageHours +
    ':' +
    (clock.getMinutes() < 10 ? '0' : '') +
    clock.getMinutes() +
    (languages === 'en' ? (messageAmpm === '오전' ? 'am' : 'pm') : '')
  return (
    <>
      {clockValue[0] !== 'N' && (
        <div className="flex flex-col px-3">
          <div className="truncate flex justify-end">{clockValue}</div>
        </div>
      )}
    </>
  )
}

export default ChatsBoxesClock
