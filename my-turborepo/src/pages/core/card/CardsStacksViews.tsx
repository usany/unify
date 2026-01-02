import { DndContext } from '@dnd-kit/core';
import { deleteDoc, doc, DocumentData, getDoc, updateDoc } from "firebase/firestore";
import { useState } from 'react';
import { dbservice } from 'src/baseApi/serverbase';
import useSelectors from 'src/hooks/useSelectors';
import CardDroppable from './CardsDroppable';
import CardsStacksViewsCollection from './CardsStacksViewsCollection';
import deleteMessage from './deleteMessage';

const handleDelete = async ({
  id,
  profile,
  changeLongPressCard,
}: {
  id: string
  profile: DocumentData | null | undefined
  changeLongPressCard: (newValue: string) => void
}) => {
  const data = doc(dbservice, `num/${id}`)
  const snap = await getDoc(data)
  if (snap.data().round === 1) {
    const messageId = data.id
    await deleteDoc(doc(dbservice, `num/${id}`));
    const userRef = doc(dbservice, `members/${profile?.uid}`)
    const userSnap = await getDoc(userRef)
    const newMessages = userSnap.data()?.createdCards.filter((element: string) => element !== id)
    updateDoc(userRef, { createdCards: newMessages })
    deleteMessage(messageId)
  } else {
    alert('Processing cards cannot be deleted')
  }
  changeLongPressCard('')
}

const CardsStacksViews = ({
  messages,
}: {
  messages: DocumentData[]
}) => {
  const [longPressCard, setLongPressCard] = useState(undefined)
  const profile = useSelectors((state) => state.profile.value)
  const changeLongPressCard = (newValue: string) => setLongPressCard(newValue)
  return (
    <DndContext
      onDragEnd={(element) => {
        if (element.over) {
          const id = element.active.id.toString()
          handleDelete({ id: id, profile: profile, changeLongPressCard: changeLongPressCard })
        }
      }}
    >
      {longPressCard && <CardDroppable />}
      <CardsStacksViewsCollection
        messages={messages}
        longPressCard={longPressCard}
        changeLongPressCard={changeLongPressCard}
      />
    </DndContext>
  )
}

export default CardsStacksViews
