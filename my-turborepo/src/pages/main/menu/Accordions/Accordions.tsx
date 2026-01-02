import { Accordion, AccordionItem } from '@/components/ui/accordion'
import { CreditCard, MessageCircleIcon } from 'lucide-react'
import { useDispatch } from 'react-redux'
import useSelectors from 'src/hooks/useSelectors'
import useTexts from 'src/hooks/useTexts'
import CardsStacks from 'src/pages/core/card/CardsStacks'
import MessageStacks from 'src/pages/core/chatting/MessageStacks'
import { cardOff, cardOn } from 'src/stateSlices/cardAccordionSlice'
import { messageOff, messageOn } from 'src/stateSlices/messageAccordionSlice'
import AccordionsContents from './AccordionsContents'
import AccordionsTriggers from './AccordionsTriggers'
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function Accordions() {
  const cardAccordion = useSelectors((state) => state.cardAccordion.value)
  const messageAccordion = useSelectors((state) => state.messageAccordion.value)
  const dispatch = useDispatch()
  const { card, message } = useTexts()
  const accordionItems = [
    {
      value: 'item-1',
      id: 'cardAccordion',
      item: <div className='flex gap-5'>
        <CreditCard />
        {card}
      </div>,
      onClick: () => {
        if (cardAccordion) {
          dispatch(cardOff())
        } else {
          dispatch(cardOn())
        }
      },
      content: <CardsStacks />,
    },
    {
      value: 'item-2',
      id: 'messageAccordion',
      item: <div className='flex gap-5'>
        <MessageCircleIcon />
        {message}
      </div>,
      onClick: () => {
        if (messageAccordion) {
          dispatch(messageOff())
        } else {
          dispatch(messageOn())
        }
      },
      content: <MessageStacks />,
    },
  ]
  return (
    <Accordion value={[cardAccordion, messageAccordion]} type="multiple">
      {accordionItems.map((value, index) => {
        return (
          <AccordionItem key={value.id} value={value.value}>
            <AccordionsTriggers value={value} />
            <AccordionsContents content={value.content} index={index} />
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}

export default Accordions
