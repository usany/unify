import { useLanguage } from "@/context/LanguageContext"

const FormatClock = ({messageClock}: {messageClock: string}) => {
  const { language } = useLanguage()
  const clock = new Date(messageClock)
  let messageAmpm
  let messageHours = clock.getHours()
  let messageMonth = (clock.getMonth() + 1).toString()
  let messageDate = clock.getDate().toString()
  // if (messageHours >= 13) {
  //   messageAmpm = '오후'
  //   if (messageHours !== 12) {
  //     messageHours = messageHours - 12
  //   }
  // } else {
  //   messageAmpm = '오전'
  //   if (messageHours === 0) {
  //     messageHours = messageHours + 12
  //   }
  // }
  if (clock.getMonth() + 1 < 10) {
    messageMonth = '0' + messageMonth
  }
  if (messageDate.length === 1) {
    messageDate = '0' + messageDate
  }
  return (
    <>
      {clock.getFullYear()}-{messageMonth}-{messageDate}{' '}
      {/* {language === 'ko' && messageAmpm}  */}
      {messageHours}:
      {clock.getMinutes() < 10 && '0'}
      {clock.getMinutes()}
      {/* {language === 'en' &&
        (messageAmpm === '오전' ? 'am' : 'pm')} */}
    </>
  )
}

export default FormatClock
