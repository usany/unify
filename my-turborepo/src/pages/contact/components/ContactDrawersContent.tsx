import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import { collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore'
import { dbservice } from 'src/baseApi/serverbase'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Divider from '@mui/material/Divider'
import useSelectors from 'src/hooks/useSelectors'
import useTexts from 'src/hooks/useTexts'
import Lists from 'src/pages/search/searchList/searchListViews/Lists'

const ContactDrawersContent = () => {
  const [sendMessages, setSendMessages] = useState([])
  const profile = useSelectors((state) => state.profile.value)
  const {noReport, reportingUser, remove} = useTexts()
  const collectionQuery = query(collection(dbservice, 'violations'))
  const deleteMessage = (value) => {
    const deletedId = value.id
    const deleting = doc(dbservice, `violations/${deletedId}`)
    deleteDoc(deleting)
    const deletedSendMessages = []
    sendMessages.map((element, index) => {
      if (element.id !== deletedId) {
        deletedSendMessages.push(element)
      }
      if (index + 1 === sendMessages.length) {
        setSendMessages(deletedSendMessages)
      }
    })
    alert('지웠습니다')
  }
  useEffect(() => {
    const docs = async () => {
      const messagesArray = []
      const messages = await getDocs(collectionQuery)
      messages.forEach((value) => {
        if (value.data().userUid === profile?.uid) {
          const messageObj = value.data()
          const message = { id: value.id, ...messageObj }
          messagesArray.push(message)
        }
        setSendMessages(messagesArray)
      })
    }
    docs()
  }, [])

  if (sendMessages.length === 0) return (
    <div className="flex justify-center p-5">
      <div className="rounded shadow-md bg-light-1 dark:bg-dark-1 p-5">
        {noReport}
      </div>
    </div>
  )
  return (
    <div className="p-5">
      {sendMessages.map((value, index) => {
        return (
          <div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value={index.toString()}>
                <AccordionTrigger className='bg-light-1/50 dark:bg-dark-1/50 rounded shadow-md'>{value.messageTitle}</AccordionTrigger>
                <AccordionContent>
                  <div>{value.message}</div>
                  {value?.violationUser ? (
                    <div>
                      <div className="pt-5">
                        {reportingUser}
                      </div>
                      <Lists
                        elements={[value.violationUser]}
                        multiple={true}
                        userSearch={true}
                        ranking={true}
                        handleUser={() => {}}
                      />
                    </div>
                  ) : (
                    <Divider variant="inset" />
                  )}
                  <div className="flex pt-3 justify-center">
                    <Button
                      className='colorOne'
                      variant="outlined"
                      onClick={() => deleteMessage(value)}
                    >
                      {remove}
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )
      })}
    </div>
  )
}

export default ContactDrawersContent
