import { DocumentData } from "firebase/firestore"


interface Props {
  message: DocumentData
  isCreator: boolean
}
function SpecificsTradesTitle({ message, isCreator }: Props) {
  const displayName = isCreator ? message.displayName : message.connectedName
  return (
    <>{displayName}</>
  )
}

export default SpecificsTradesTitle
