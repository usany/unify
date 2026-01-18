import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import { AlarmCheck, PlusCircle, UserRound } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { dbservice } from 'src/baseApi/serverbase'
import useSelectors from 'src/hooks/useSelectors'
import Popups from 'src/pages/core/Popups'
import { changeNewMessageTrue } from 'src/stateSlices/newMessageSlice'
import useTexts from 'src/hooks/useTexts'
import { webSocket } from 'src/webSocket.tsx'
import PiazzaFormCallsContent from './PiazzaFormCallsContent'
import { useEffect, useRef } from 'react'

interface Props {
  chattingUser: {
    uid: string
    displayName: string
    profileImage: boolean
    defaulProfile: string
    profileUrl: string
  } | null
  multiple: boolean
  messages: string
  handleMessages: (newValue: string) => void
  messagesList: []
  handleMessagesList: (newValue: []) => void
  isKeyboardOpen: boolean
}
function PiazzaForm() {
  return (
    <form
    >
      <div className="flex items-center px-1 h-full rounded bg-light-2 dark:bg-dark-2">
              <PlusCircle />
            </div>
      <input
        className="w-full p-3 rounded bg-light-1 dark:bg-dark-1"
      />
      <button className="w-1/6 rounded bg-light-2 dark:bg-dark-2" type="submit">
        Send
      </button>
    </form>
  )
}

export default PiazzaForm
