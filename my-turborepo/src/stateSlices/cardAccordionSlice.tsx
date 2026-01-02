import { createSlice } from '@reduxjs/toolkit'

interface CardAccordionState {
  value: string
}

const initialState: CardAccordionState = {
  value: 'item-1'
}
const cardAccordionReducer = createSlice({
  name: 'cardAccordion',
  initialState,
  reducers: {
    change: state => {
      state.value = !state.value
    },
    cardOn: state => {
      state.value = 'item-1'
    },
    cardOff: state => {
      state.value = ''
    },
  }
})
const { change, cardOn, cardOff } = cardAccordionReducer.actions

export { cardAccordionReducer, cardOff, cardOn, change }

