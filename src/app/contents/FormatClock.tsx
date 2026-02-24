import { useLanguage } from "@/context/LanguageContext"

const FormatClock = ({messageClock}: {messageClock: string}) => {
  const { language } = useLanguage()
  const clock = new Date(messageClock)
  let messageAmpm
  let messageHours = clock.getHours()
  let messageMonth = (clock.getMonth() + 1).toString()
  let messageDate = clock.getDate().toString()
  if (clock.getMonth() + 1 < 10) {
    messageMonth = '0' + messageMonth
  }
  if (messageDate.length === 1) {
    messageDate = '0' + messageDate
  }
  return (
    <>
      {clock.getFullYear()}-{messageMonth}-{messageDate}{' '}
      {messageHours}:
      {clock.getMinutes() < 10 && '0'}
      {clock.getMinutes()}
    </>
  )
}

export default FormatClock
