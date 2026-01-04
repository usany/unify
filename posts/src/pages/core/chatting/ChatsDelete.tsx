import DeleteIcon from '@mui/icons-material/Delete'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useDispatch } from 'react-redux'
import { dbservice } from 'src/baseApi/serverbase'
import useSelectors from 'src/hooks/useSelectors'
import { changePiazzaSwitch } from 'src/stateSlices/piazzaSwitchSlice'

const ChatsDelete = ({
  conversation,
  changeLongPressChat,
  changeChattings,
}) => {
  const dispatch = useDispatch()
  const profile = useSelectors((state) => state.profile.value)
  const onDelete = async ({ conversation }) => {
    changeLongPressChat(null)
    const userRef = doc(dbservice, `members/${profile?.uid}`)
    const userDoc = await getDoc(userRef)
    const userChattings = userDoc.data()?.chattings || {}
    const userConversation = userDoc.data()?.conversation || []
    Reflect.deleteProperty(userChattings, conversation)
    if (userConversation.indexOf(conversation) !== -1) {
      userConversation.splice(userConversation.indexOf(conversation), 1)
    }
    changeChattings(userChattings)
    updateDoc(userRef, { chattings: userChattings })
    updateDoc(userRef, { conversation: userConversation })
  }
  return (
    <div
      className="flex h-[60px] rounded items-center justify-center w-1/6 bg-profile-red text-white"
      onClick={() => {
        if (conversation) {
          onDelete({ conversation: conversation })
        } else {
          dispatch(changePiazzaSwitch('false'))
          localStorage.setItem('piazza', 'false')
        }
      }}
    >
      <DeleteIcon />
    </div>
  )
}

export default ChatsDelete
