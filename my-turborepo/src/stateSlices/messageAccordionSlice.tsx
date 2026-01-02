import { createSlice } from '@reduxjs/toolkit'

interface MessageAccordionState {
  value: string
}

const initialState: MessageAccordionState = {
  value: 'item-2'
}
const messageAccordionReducer = createSlice({
  name: 'messageAccordion',
  initialState,
  reducers: {
    changeMessageAccordion: state => {
      state.value = 'item-2'
    },
    messageOn: state => {
      state.value = 'item-2'
    },
    messageOff: state => {
      state.value = ''
    },
  }
})
const { changeMessageAccordion, messageOn, messageOff } = messageAccordionReducer.actions

export { changeMessageAccordion, messageAccordionReducer, messageOff, messageOn }

