import { useLanguage } from "@/context/LanguageContext"

const PiazzaScreenClock = ({ value }) => {
  const { language } = useLanguage()
  const clock = new Date(value.messageClock)
  let messageHours = clock.getHours()
  const messageMonth = (clock.getMonth() + 1 < 10 ? '0':'')+(clock.getMonth() + 1).toString()
  const messageDate = (clock.getDate()<10 ? '0':'') + clock.getDate().toString()
  const messageAmpm = messageHours >= 13 ? '오후' : '오전'
  if (messageHours >= 13) {
    if (messageHours !== 12) {
      messageHours = messageHours - 12
    }
  } else {
    if (messageHours === 0) {
      messageHours = messageHours + 12
    }
  }
  return (
    <>
      {clock.getFullYear()}-{messageMonth}-{messageDate}{' '}
      {language === 'ko' && messageAmpm} {messageHours}:
      {clock.getMinutes() < 10 && '0'}
      {clock.getMinutes()}
      {language === 'en' &&
        (messageAmpm === '오전' ? 'am' : 'pm')}
    </>
  )
}

export default PiazzaScreenClock
